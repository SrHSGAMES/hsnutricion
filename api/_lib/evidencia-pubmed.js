// Genera una consulta de búsqueda en inglés para PubMed a partir del nombre
// de un alimento, y descarga los resúmenes de los estudios más relevantes.
// Compartido entre food-lookup.js (fichas nuevas de la comunidad) y las
// herramientas de enriquecimiento de contenido de la guía base.

import { callGemini, extraerJSON } from "./gemini.js";
import { buscarPMIDs, obtenerMetadatos, obtenerAbstract } from "./pubmed.js";

const PLAN_SCHEMA = {
  type: "object",
  properties: {
    foodEn: { type: "string" },
    query: { type: "string" }
  },
  required: ["foodEn", "query"]
};
const PLAN_EJEMPLO = `{"foodEn":"<nombre del alimento en inglés>","query":"<consulta de PubMed en inglés>"}`;

export async function buscarEvidenciaPubMed(apiKey, alimento) {
  const plan = extraerJSON(await callGemini(apiKey, {
    input: `Traduces alimentos al inglés y generas consultas de búsqueda para PubMed sobre sus efectos en la salud.

Alimento: "${alimento}". Genera una query de PubMed en inglés (con operadores AND/OR si procede) para encontrar estudios sobre sus efectos nutricionales o en la salud cardiovascular/metabólica.

Responde ÚNICAMENTE con un objeto JSON, sin texto adicional ni bloques de código markdown, usando EXACTAMENTE estos nombres de clave (no los traduzcas ni los cambies): ${PLAN_EJEMPLO}`,
    responseSchema: PLAN_SCHEMA
  }));

  if (!plan.query) {
    throw new Error("La IA no generó una consulta de búsqueda válida para PubMed.");
  }

  const pmids = await buscarPMIDs(plan.query, 5);
  const metadatos = await obtenerMetadatos(pmids);
  return Promise.all(
    metadatos.slice(0, 4).map(async m => ({ ...m, abstract: await obtenerAbstract(m.pmid) }))
  );
}

export function formatearEstudiosParaPrompt(estudios) {
  return estudios.length
    ? estudios.map((e, i) =>
        `[${i + 1}] ${e.titulo} (${e.revista}, ${e.anio}) — PMID ${e.pmid}\nResumen: ${e.abstract || "no disponible"}`
      ).join("\n\n")
    : "No se encontraron estudios relevantes en PubMed para este alimento.";
}
