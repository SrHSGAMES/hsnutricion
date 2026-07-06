// GET /api/enrich-one?alimento=...&rating=A&kcal=&carbs=&azucares=&proteinas=&grasas=&grasasSat=&fibra=&sodio=
//
// Herramienta TEMPORAL para enriquecer los alimentos base de js/data.js:
// busca evidencia real en PubMed y pide a la IA un texto explicativo más
// completo que justifique la calificación YA asignada (no la cambia), citando
// los estudios reales encontrados. No guarda nada en el almacén compartido de
// la comunidad — es solo para generar contenido que luego se integra a mano
// en data.js. Se retira en cuanto termina ese trabajo de contenido.

import { callGemini, extraerJSON } from "./_lib/gemini.js";
import { buscarEvidenciaPubMed, formatearEstudiosParaPrompt } from "./_lib/evidencia-pubmed.js";

const MOTIVO_SCHEMA = {
  type: "object",
  properties: { motivo: { type: "string" } },
  required: ["motivo"]
};
const MOTIVO_EJEMPLO = `{"motivo":"..."}`;

export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Falta configurar GEMINI_API_KEY en las variables de entorno de Vercel." });
  }

  const q = req.query || {};
  const alimento = (q.alimento || "").toString().trim().slice(0, 80);
  if (!alimento) {
    return res.status(400).json({ error: "Falta ?alimento=" });
  }

  try {
    const estudios = await buscarEvidenciaPubMed(apiKey, alimento);
    const estudiosTexto = formatearEstudiosParaPrompt(estudios);

    const datos = `Calificación ya asignada en la guía (no la cambies, tu texto debe justificarla): ${q.rating || "?"}.
Datos nutricionales de referencia por 100 g: ${q.kcal ?? "?"} kcal, ${q.carbs ?? "?"} g carbohidratos (de los cuales ${q.azucares ?? "?"} g azúcares), ${q.proteinas ?? "?"} g proteínas, ${q.grasas ?? "?"} g grasas (de las cuales ${q.grasasSat ?? "?"} g saturadas), ${q.fibra ?? "?"} g fibra, ${q.sodio ?? "?"} mg sodio.`;

    const motivoTexto = await callGemini(apiKey, {
      input: `Eres un dietista-nutricionista escribiendo la ficha de un alimento para una guía nutricional dirigida al público general, en español.

Alimento: "${alimento}"
${datos}

Estudios científicos reales encontrados en PubMed:
${estudiosTexto}

Escribe un texto explicativo de 3 a 5 frases que explique con claridad por qué este alimento merece esa calificación, mencionando los nutrientes o compuestos relevantes y sus efectos conocidos. Cita los estudios recibidos entre corchetes (p.ej. [1], [2]) SOLO cuando respalden de verdad una afirmación concreta que estés haciendo; si ninguno es realmente relevante para lo que dices, no fuerces ninguna cita. No inventes estudios ni cites uno que no venga en la lista anterior.

Responde ÚNICAMENTE con un objeto JSON, sin texto adicional ni bloques de código markdown, con EXACTAMENTE esta forma (no cambies la clave): ${MOTIVO_EJEMPLO}`,
      responseSchema: MOTIVO_SCHEMA
    });

    const { motivo } = extraerJSON(motivoTexto);
    res.status(200).json({ motivo, estudios });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
