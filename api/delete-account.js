// POST /api/delete-account   body: { password }
//
// Borra la cuenta del usuario y, con ella, todas las recetas de comunidad
// que había publicado (decisión explícita: borrar la cuenta borra también
// tu rastro). Requiere volver a escribir la contraseña para confirmar.

import {
  almacenDisponible,
  obtenerUsuarioDeSesion,
  borrarUsuario,
  borrarSesion,
  listarRecetasComunidad,
  borrarRecetaComunidad
} from "./_lib/store.js";
import { verificarPassword } from "./_lib/auth.js";
import { leerTokenSesion, serializarCookieBorrado } from "./_lib/cookies.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido." });
  }
  if (!almacenDisponible()) {
    return res.status(500).json({ error: "Falta configurar el almacén compartido en las variables de entorno de Vercel." });
  }

  const usuario = await obtenerUsuarioDeSesion(req).catch(() => null);
  if (!usuario) {
    return res.status(401).json({ error: "Inicia sesión primero." });
  }

  const password = (req.body?.password || "").toString();
  if (!(await verificarPassword(password, usuario.passwordHash))) {
    return res.status(401).json({ error: "La contraseña no es correcta." });
  }

  try {
    const usernameLower = usuario.username.toLowerCase();

    const recetas = await listarRecetasComunidad();
    const propias = recetas.filter(r => r.autorLower === usernameLower);
    await Promise.all(propias.map(r => borrarRecetaComunidad(r.id)));

    const token = leerTokenSesion(req);
    if (token) await borrarSesion(token).catch(() => {});

    await borrarUsuario(usernameLower);

    res.setHeader("Set-Cookie", serializarCookieBorrado(req));
    res.status(200).json({ ok: true, recetasBorradas: propias.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
