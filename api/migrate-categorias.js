// GET /api/migrate-categorias
//
// Herramienta TEMPORAL de un solo uso: migra los alimentos ya guardados por
// la comunidad del campo antiguo "categoria" (texto único) al nuevo
// "categorias" (lista), aplicando la taxonomía unificada acordada. Se retira
// en cuanto se confirma que la migración se ha aplicado correctamente.

import { listarAlimentosComunidad, guardarAlimentoComunidad } from "./_lib/store.js";

// id del alimento -> nuevas categorías
const MAPA = {
  ia_patata: ["Verduras y Hortalizas"],
  ia_pechuga_de_pollo: ["Cárnicos", "Proteínas"],
  ia_sal: ["Condimentos y Aditivos"],
  ia_tofu: ["Proteínas"],
  ia_tortilla_de_patata: ["Platos Preparados"],
  ia_bebida_de_avena: ["Bebidas vegetales"],
  ia_crema_de_cacahuete: ["Untables"],
  ia_aroma_de_vainilla: ["Condimentos y Aditivos"],
  ia_granada: ["Frutas"],
  ia_platano: ["Frutas"],
  ia_bebida_de_soja: ["Bebidas vegetales"],
  ia_boniato: ["Verduras y Hortalizas"],
  ia_levadura_quimica: ["Condimentos y Aditivos"],
  ia_salsa_barbacoa_zero: ["Salsas"],
  ia_saltamontes_frito: ["Insectos Comestibles"],
  ia_anacardo: ["Frutos Secos"],
  ia_jengibre: ["Verduras y Hortalizas"],
  ia_levadura: ["Suplemento Alimenticio"]
};

export default async function handler(req, res) {
  try {
    const actuales = await listarAlimentosComunidad();
    const resultado = [];

    for (const entrada of actuales) {
      const food = entrada.food;
      const nuevasCategorias = MAPA[food.id];
      if (!nuevasCategorias) {
        resultado.push({ id: food.id, estado: "sin mapeo, no tocado", categoriaOriginal: food.categoria });
        continue;
      }
      delete food.categoria;
      food.categorias = nuevasCategorias;
      await guardarAlimentoComunidad(food.id, entrada);
      resultado.push({ id: food.id, estado: "migrado", categorias: nuevasCategorias });
    }

    res.status(200).json({ total: actuales.length, resultado });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
