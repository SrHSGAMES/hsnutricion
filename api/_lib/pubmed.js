// Cliente mínimo para NCBI E-utilities (PubMed), usado solo desde el servidor.

const EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

function credenciales() {
  const params = new URLSearchParams();
  if (process.env.NCBI_API_KEY) params.set("api_key", process.env.NCBI_API_KEY);
  if (process.env.NCBI_EMAIL) params.set("email", process.env.NCBI_EMAIL);
  params.set("tool", "hsnutricion");
  return params;
}

export async function buscarPMIDs(query, retmax = 5) {
  const params = credenciales();
  params.set("db", "pubmed");
  params.set("retmode", "json");
  params.set("retmax", String(retmax));
  params.set("sort", "relevance");
  params.set("term", query);
  const r = await fetch(`${EUTILS}/esearch.fcgi?${params.toString()}`);
  if (!r.ok) throw new Error("Error consultando PubMed (esearch).");
  const data = await r.json();
  return data?.esearchresult?.idlist || [];
}

export async function obtenerMetadatos(pmids) {
  if (!pmids.length) return [];
  const params = credenciales();
  params.set("db", "pubmed");
  params.set("retmode", "json");
  params.set("id", pmids.join(","));
  const r = await fetch(`${EUTILS}/esummary.fcgi?${params.toString()}`);
  if (!r.ok) throw new Error("Error consultando PubMed (esummary).");
  const data = await r.json();
  const result = data.result || {};
  return pmids
    .filter(id => result[id])
    .map(id => {
      const it = result[id];
      return {
        pmid: id,
        titulo: (it.title || "Sin título").replace(/<[^>]+>/g, ""),
        revista: it.fulljournalname || it.source || "",
        anio: (it.pubdate || "").slice(0, 4),
        url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`
      };
    });
}

export async function obtenerAbstract(pmid) {
  const params = credenciales();
  params.set("db", "pubmed");
  params.set("id", pmid);
  params.set("rettype", "abstract");
  params.set("retmode", "text");
  const r = await fetch(`${EUTILS}/efetch.fcgi?${params.toString()}`);
  if (!r.ok) return "";
  const texto = await r.text();
  return texto.replace(/\s+/g, " ").trim().slice(0, 1000);
}
