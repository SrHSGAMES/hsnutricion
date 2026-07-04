// GET /api/community-foods
//
// Devuelve todos los alimentos que la IA ha generado hasta ahora para otras
// personas (guardados en el almacén compartido), para que cualquier visitante
// los vea en la guía y se puedan detectar por texto/imagen sin volver a
// llamar a la IA para el mismo alimento.

import { listarAlimentosComunidad } from "./_lib/store.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido." });
  }
  try {
    const alimentos = await listarAlimentosComunidad();
    res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    res.status(200).json({ alimentos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
