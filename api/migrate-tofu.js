// GET /api/migrate-tofu
//
// Herramienta TEMPORAL de un solo uso: recategoriza el Tofu ya guardado por
// la comunidad de "Proteínas" a "Proteína vegetal" (categoría separada, como
// se hizo con "Bebidas vegetales"). Se retira en cuanto se confirma.

import { obtenerAlimentoComunidad, guardarAlimentoComunidad } from "./_lib/store.js";

export default async function handler(req, res) {
  try {
    const entrada = await obtenerAlimentoComunidad("ia_tofu");
    if (!entrada) {
      return res.status(404).json({ error: "No se encontró ia_tofu en el almacén." });
    }
    entrada.food.categorias = ["Proteína vegetal"];
    await guardarAlimentoComunidad("ia_tofu", entrada);
    res.status(200).json({ estado: "migrado", food: entrada.food });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
