// POST /api/logout

import { borrarSesion } from "./_lib/store.js";
import { leerTokenSesion, serializarCookieBorrado } from "./_lib/cookies.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido." });
  }
  try {
    const token = leerTokenSesion(req);
    if (token) await borrarSesion(token).catch(() => {});
  } finally {
    res.setHeader("Set-Cookie", serializarCookieBorrado(req));
    res.status(200).json({ ok: true });
  }
}
