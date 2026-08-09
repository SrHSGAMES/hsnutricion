// GET /api/user-profile?usuario=<username>
//
// Datos públicos de un usuario, para la página de perfil (perfil.html).
// Nunca expone el hash de contraseña ni el email.

import { almacenDisponible, obtenerUsuario } from "./_lib/store.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido." });
  }
  if (!almacenDisponible()) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  }

  const usernameLower = (req.query?.usuario || "").toString().trim().toLowerCase().slice(0, 24);
  if (!usernameLower) {
    return res.status(400).json({ error: "Falta el usuario." });
  }

  try {
    const usuario = await obtenerUsuario(usernameLower);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    res.status(200).json({ username: usuario.username, createdAt: usuario.createdAt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
