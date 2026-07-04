// Cliente mínimo para la API de Gemini (Google AI), usado solo desde el servidor.
// Se usa el nivel gratuito (modelos "flash"), suficiente para este proyecto personal/educativo.

const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/interactions";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export async function callGemini(apiKey, { input, responseSchema }) {
  const body = { model: GEMINI_MODEL, input };
  if (responseSchema) {
    body.response_format = { type: "text", mime_type: "application/json", schema: responseSchema };
  }

  const r = await fetch(GEMINI_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify(body)
  });

  if (!r.ok) {
    const t = await r.text();
    throw new Error(`Gemini API ${r.status}: ${t.slice(0, 300)}`);
  }
  const data = await r.json();

  // La respuesta trae un array "steps": puede incluir pasos internos de
  // razonamiento (type: "thought", sin contenido de texto útil) antes del
  // paso final con el texto de respuesta en content[].text.
  const texto = typeof data.output_text === "string"
    ? data.output_text
    : extraerTextoDePasos(data.steps);

  if (!texto) {
    throw new Error("Respuesta vacía o con formato inesperado de Gemini: " + JSON.stringify(data).slice(0, 500));
  }
  return texto;
}

function extraerTextoDePasos(steps) {
  if (!Array.isArray(steps)) return "";
  for (let i = steps.length - 1; i >= 0; i--) {
    const contenido = steps[i]?.content;
    if (Array.isArray(contenido)) {
      const texto = contenido.map(c => c.text || "").join("").trim();
      if (texto) return texto;
    }
  }
  return "";
}

// Extrae el primer objeto JSON de un texto, tolerando bloques ```json envolventes
// (red de seguridad por si el modelo no respeta el response_format al 100%).
export function extraerJSON(texto) {
  const limpio = texto.trim().replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();
  const inicio = limpio.indexOf("{");
  const fin = limpio.lastIndexOf("}");
  if (inicio === -1 || fin === -1) throw new Error("La IA no devolvió un JSON válido.");
  return JSON.parse(limpio.slice(inicio, fin + 1));
}
