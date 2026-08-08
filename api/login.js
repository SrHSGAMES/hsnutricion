// POST /api/login   body: { username, password }

import { almacenDisponible, obtenerUsuario, guardarSesion, esAdmin } from "./_lib/store.js";
import { verificarPassword, generarTokenSesion } from "./_lib/auth.js";
import { serializarCookieSesion } from "./_lib/cookies.js";

const SESION_TTL_SEGUNDOS = 60 * 60 * 24 * 30; // 30 días
const ERROR_CREDENCIALES = "Usuario o contraseña incorrectos.";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido." });
  }
  if (!almacenDisponible()) {
    return res.status(500).json({
      error: "Falta configurar el almacén compartido (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN) en las variables de entorno de Vercel: es necesario para iniciar sesión."
    });
  }

  const usernameLower = (req.body?.username || "").toString().trim().toLowerCase().slice(0, 24);
  const password = (req.body?.password || "").toString();

  if (!usernameLower || !password) {
    return res.status(400).json({ error: ERROR_CREDENCIALES });
  }

  try {
    const usuario = await obtenerUsuario(usernameLower);
    // Mismo error genérico si el usuario no existe o si la contraseña es
    // incorrecta, para no revelar qué nombres de usuario están registrados.
    if (!usuario || !(await verificarPassword(password, usuario.passwordHash))) {
      return res.status(401).json({ error: ERROR_CREDENCIALES });
    }

    const token = generarTokenSesion();
    await guardarSesion(token, { usernameLower }, SESION_TTL_SEGUNDOS);
    res.setHeader("Set-Cookie", serializarCookieSesion(req, token, SESION_TTL_SEGUNDOS));
    res.status(200).json({ username: usuario.username, esAdmin: esAdmin(usernameLower) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
