// POST /api/register   body: { username, password, email? }
//
// Crea una cuenta nueva y arranca sesión al momento (misma cookie que login).

import { almacenDisponible, crearUsuario, guardarSesion } from "./_lib/store.js";
import { hashPassword, generarTokenSesion } from "./_lib/auth.js";
import { serializarCookieSesion } from "./_lib/cookies.js";

const SESION_TTL_SEGUNDOS = 60 * 60 * 24 * 30; // 30 días
const USERNAME_RE = /^[a-z0-9_.-]{3,24}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido." });
  }
  if (!almacenDisponible()) {
    return res.status(500).json({
      error: "Falta configurar el almacén compartido (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN) en las variables de entorno de Vercel: es necesario para crear cuentas."
    });
  }

  const username = (req.body?.username || "").toString().trim().slice(0, 24);
  const usernameLower = username.toLowerCase();
  const password = (req.body?.password || "").toString();
  const email = (req.body?.email || "").toString().trim().slice(0, 254);

  if (!USERNAME_RE.test(usernameLower)) {
    return res.status(400).json({ error: "El usuario debe tener 3-24 caracteres: letras, números, puntos, guiones o guiones bajos." });
  }
  if (password.length < 8 || password.length > 200) {
    return res.status(400).json({ error: "La contraseña debe tener entre 8 y 200 caracteres." });
  }
  if (email && !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "El correo no parece válido." });
  }

  try {
    const passwordHash = await hashPassword(password);
    const creado = await crearUsuario(usernameLower, {
      username,
      email,
      passwordHash,
      createdAt: new Date().toISOString()
    });
    if (!creado) {
      return res.status(409).json({ error: "Ese nombre de usuario ya existe." });
    }

    const token = generarTokenSesion();
    await guardarSesion(token, { usernameLower }, SESION_TTL_SEGUNDOS);
    res.setHeader("Set-Cookie", serializarCookieSesion(req, token, SESION_TTL_SEGUNDOS));
    res.status(200).json({ username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
