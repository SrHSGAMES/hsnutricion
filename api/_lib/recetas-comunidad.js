// Validación de campos + calificación por IA de las recetas de la comunidad,
// compartido entre api/community-recipes.js (crear) y api/community-recipe.js
// (editar), para no duplicar la misma lógica en los dos endpoints.

import { callGemini, extraerJSON } from "./gemini.js";

export const MACRO_KEYS = ["kcal", "carbs", "azucares", "proteinas", "grasas", "grasasSat", "fibra", "sodio"];

const RATING_SCHEMA = {
  type: "object",
  properties: {
    rating: { type: "string", enum: ["A", "B", "C", "D", "E"] },
    motivo: { type: "string" }
  },
  required: ["rating", "motivo"]
};

// Los macros los calcula el navegador (a partir de los datos reales de
// FOODS, que solo existen en el cliente: el servidor no tiene acceso a esa
// base en tiempo de ejecución, solo el script Python la parsea en el build).
// Se confían tal cual — riesgo bajo, es información propia del autor, no hay
// terceros afectados si alguien "se engaña" en su propia ficha nutricional.
export function validarCamposReceta(body) {
  const nombre = (body?.nombre || "").toString().trim().slice(0, 100);
  const descripcion = (body?.descripcion || "").toString().trim().slice(0, 600);
  const raciones = Math.min(20, Math.max(1, Math.round(Number(body?.raciones) || 1)));

  const elaboracionRaw = Array.isArray(body?.elaboracion) ? body.elaboracion : [];
  const elaboracion = elaboracionRaw.map(p => (p || "").toString().trim()).filter(Boolean).slice(0, 30);

  const ingredientesRaw = Array.isArray(body?.ingredientes) ? body.ingredientes : [];
  const ingredientes = ingredientesRaw
    .map(i => ({
      foodId: (i?.foodId || "").toString().slice(0, 60),
      nombre: (i?.nombre || "").toString().trim().slice(0, 100),
      emoji: (i?.emoji || "🍽️").toString().slice(0, 8),
      cantidad: Math.min(5000, Math.max(0.1, Number(i?.cantidad) || 0))
    }))
    .filter(i => i.foodId && i.nombre && i.cantidad > 0)
    .slice(0, 30);

  if (!nombre) throw new Error("Falta el nombre de la receta.");
  if (!descripcion) throw new Error("Falta la descripción.");
  if (!ingredientes.length) throw new Error("Añade al menos un ingrediente.");
  if (!elaboracion.length) throw new Error("Falta la elaboración.");

  const macrosRaw = body?.macros || {};
  const macros = {};
  for (const k of MACRO_KEYS) {
    macros[k] = Math.round(Math.min(20000, Math.max(0, Number(macrosRaw[k]) || 0)) * 10) / 10;
  }

  return { nombre, descripcion, raciones, elaboracion, ingredientes, macros };
}

export async function calificarReceta(apiKey, receta) {
  const ingredientesTexto = receta.ingredientes.map(i => `- ${i.nombre}: ${i.cantidad} g`).join("\n");
  const pasosTexto = receta.elaboracion.map((p, i) => `${i + 1}. ${p}`).join("\n");

  const texto = await callGemini(apiKey, {
    input: `Eres un dietista-nutricionista evaluando una receta enviada por un usuario de una comunidad de nutrición. Los macros ya están calculados correctamente a partir de datos reales por ingrediente: NO los recalcules, solo emite tu juicio.

Evalúa de forma holística, no solo por calorías: considera la calidad de los ingredientes (procesados vs. enteros), el equilibrio de macronutrientes, la presencia o ausencia de verduras/fibra, el contenido de grasas saturadas/colesterol/sodio, y el método de elaboración. Por ejemplo, un plato con calorías moderadas pero mucho colesterol y ninguna verdura (como una carbonara clásica con huevo, queso y pollo) debería calificarse con más severidad (p.ej. C) que uno con calorías similares pero ingredientes íntegros y verdura.

Receta: "${receta.nombre}"
Descripción: ${receta.descripcion}
Raciones: ${receta.raciones}
Ingredientes:
${ingredientesTexto}
Elaboración:
${pasosTexto}

Macros totales de la receta completa (no por ración): ${MACRO_KEYS.map(k => `${k}: ${receta.macros[k]}`).join(", ")}.

Responde ÚNICAMENTE con un objeto JSON: {"rating":"A|B|C|D|E","motivo":"..."}. El motivo debe ser breve (1-3 frases), en español, explicando la calificación.`,
    responseSchema: RATING_SCHEMA
  });

  return extraerJSON(texto);
}
