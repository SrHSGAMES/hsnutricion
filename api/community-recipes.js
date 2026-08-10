// GET  /api/community-recipes            → { recetas: [...] }
// POST /api/community-recipes  body: { nombre, descripcion, raciones, elaboracion, ingredientes, macros }
//
// Lista o crea recetas de la comunidad. Los macros los calcula el navegador
// (ver api/_lib/recetas-comunidad.js); la IA solo asigna la calificación A-E,
// el motivo y las etiquetas (vegano, proteico...), igual que ya hace con los
// alimentos nuevos de la guía.

import { almacenDisponible, listarRecetasComunidad, guardarRecetaComunidad, obtenerUsuarioDeSesion } from "./_lib/store.js";
import { validarCamposReceta, calificarReceta } from "./_lib/recetas-comunidad.js";
import { randomBytes } from "node:crypto";

function normalizarSlug(nombre) {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 40);
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const recetas = await listarRecetasComunidad();
      res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=120");
      return res.status(200).json({ recetas });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido." });
  }
  if (!almacenDisponible()) {
    return res.status(500).json({ error: "Falta configurar el almacén compartido (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN) en las variables de entorno de Vercel: es necesario para publicar recetas." });
  }
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Falta configurar GEMINI_API_KEY en las variables de entorno de Vercel." });
  }

  const usuario = await obtenerUsuarioDeSesion(req).catch(() => null);
  if (!usuario) {
    return res.status(401).json({ error: "Inicia sesión para publicar una receta." });
  }

  let campos;
  try {
    campos = validarCamposReceta(req.body);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  try {
    const { rating, motivo, etiquetas } = await calificarReceta(apiKey, campos);

    const id = `receta_${normalizarSlug(campos.nombre)}_${randomBytes(4).toString("hex")}`;
    const ahora = new Date().toISOString();
    const receta = {
      id,
      ...campos,
      rating,
      motivo,
      etiquetas,
      reportes: [],
      autor: usuario.username,
      autorLower: usuario.username.toLowerCase(),
      creadoEn: ahora,
      actualizadoEn: ahora
    };

    await guardarRecetaComunidad(id, receta);
    res.status(200).json({ receta });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
