// POST /api/change-password   body: { passwordActual, passwordNueva }
//
// Requiere sesión activa y volver a escribir la contraseña actual (aunque ya
// haya sesión iniciada), para proteger la cuenta si el navegador quedó
// abierto en un dispositivo compartido.

import { almacenDisponible, obtenerUsuarioDeSesion, actualizarUsuario } from "./_lib/store.js";
import { hashPassword, verificarPassword } from "./_lib/auth.js";

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

  const passwordActual = (req.body?.passwordActual || "").toString();
  const passwordNueva = (req.body?.passwordNueva || "").toString();

  if (!(await verificarPassword(passwordActual, usuario.passwordHash))) {
    return res.status(401).json({ error: "La contraseña actual no es correcta." });
  }
  if (passwordNueva.length < 8 || passwordNueva.length > 200) {
    return res.status(400).json({ error: "La contraseña nueva debe tener entre 8 y 200 caracteres." });
  }

  try {
    const passwordHash = await hashPassword(passwordNueva);
    await actualizarUsuario(usuario.username.toLowerCase(), { ...usuario, passwordHash });
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
