// POST   /api/community-recipe   body: { id }   → reportar (cualquier usuario logueado)
// PUT    /api/community-recipe   body: { id, nombre, descripcion, raciones, elaboracion, ingredientes, macros }
// DELETE /api/community-recipe   body o query: { id }
//
// Reportar, editar o borrar una receta de la comunidad. Reportar solo
// requiere sesión activa; editar/borrar requiere además ser el autor, o
// tener permisos de administrador (moderación).

import { almacenDisponible, obtenerRecetaComunidad, guardarRecetaComunidad, borrarRecetaComunidad, obtenerUsuarioDeSesion, esAdmin } from "./_lib/store.js";
import { validarCamposReceta, calificarReceta } from "./_lib/recetas-comunidad.js";

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "PUT" && req.method !== "DELETE") {
    return res.status(405).json({ error: "Método no permitido." });
  }
  if (!almacenDisponible()) {
    return res.status(500).json({ error: "Falta configurar el almacén compartido (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN) en las variables de entorno de Vercel." });
  }

  const id = (req.body?.id || req.query?.id || "").toString().slice(0, 80);
  if (!id) {
    return res.status(400).json({ error: "Falta el identificador de la receta." });
  }

  const usuario = await obtenerUsuarioDeSesion(req).catch(() => null);
  if (!usuario) {
    return res.status(401).json({ error: "Inicia sesión primero." });
  }

  try {
    const existente = await obtenerRecetaComunidad(id);
    if (!existente) {
      return res.status(404).json({ error: "Esa receta ya no existe." });
    }

    if (req.method === "POST") {
      const usernameLower = usuario.username.toLowerCase();
      const reportes = Array.isArray(existente.reportes) ? existente.reportes : [];
      if (!reportes.includes(usernameLower)) {
        reportes.push(usernameLower);
        await guardarRecetaComunidad(id, { ...existente, reportes });
      }
      return res.status(200).json({ ok: true });
    }

    const esAutor = existente.autorLower === usuario.username.toLowerCase();
    const puedeModificar = esAutor || esAdmin(usuario.username.toLowerCase());
    if (!puedeModificar) {
      return res.status(403).json({ error: "Solo el autor puede modificar esta receta." });
    }

    if (req.method === "DELETE") {
      await borrarRecetaComunidad(id);
      return res.status(200).json({ ok: true });
    }

    // PUT: los ingredientes pueden haber cambiado, así que se vuelve a pedir
    // la calificación (y las etiquetas) a la IA en vez de conservar las anteriores.
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Falta configurar GEMINI_API_KEY en las variables de entorno de Vercel." });
    }

    let campos;
    try {
      campos = validarCamposReceta(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const { rating, motivo, etiquetas } = await calificarReceta(apiKey, campos);
    const actualizada = {
      ...existente,
      ...campos,
      rating,
      motivo,
      etiquetas,
      actualizadoEn: new Date().toISOString()
    };
    await guardarRecetaComunidad(id, actualizada);
    res.status(200).json({ receta: actualizada });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
