// GET /api/me — indica si hay sesión activa. A diferencia de register/login,
// no falla si el almacén no está configurado (se llama en cada carga de
// página, debe degradar con suavidad a "sin sesión").

import { almacenDisponible, obtenerSesion, obtenerUsuario, esAdmin } from "./_lib/store.js";
import { leerTokenSesion } from "./_lib/cookies.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido." });
  }
  try {
    if (!almacenDisponible()) {
      return res.status(200).json({ username: null, esAdmin: false });
    }
    const token = leerTokenSesion(req);
    if (!token) {
      return res.status(200).json({ username: null, esAdmin: false });
    }
    const sesion = await obtenerSesion(token);
    if (!sesion) {
      return res.status(200).json({ username: null, esAdmin: false });
    }
    const usuario = await obtenerUsuario(sesion.usernameLower);
    res.status(200).json({
      username: usuario ? usuario.username : null,
      esAdmin: usuario ? esAdmin(sesion.usernameLower) : false
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
