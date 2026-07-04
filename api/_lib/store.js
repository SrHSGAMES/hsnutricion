// Cliente mínimo para Upstash Redis (REST API), usado para compartir entre
// todas las visitas los alimentos que la IA genera: así solo se consulta una
// vez por alimento nuevo, y el resto de personas lo reciben al instante sin
// gastar cuota de la IA.
//
// Es opcional: si no se configuran las variables de entorno, la búsqueda con
// IA sigue funcionando igual que antes, simplemente sin memoria compartida.

const BASE = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

export function almacenDisponible() {
  return Boolean(BASE && TOKEN);
}

async function comando(cmd) {
  const r = await fetch(BASE, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "content-type": "application/json"
    },
    body: JSON.stringify(cmd)
  });
  if (!r.ok) {
    throw new Error(`Almacén compartido ${r.status}: ${(await r.text()).slice(0, 200)}`);
  }
  const data = await r.json();
  return data.result;
}

export async function obtenerAlimentoComunidad(id) {
  if (!almacenDisponible()) return null;
  const raw = await comando(["GET", `hsn:alimento:${id}`]);
  return raw ? JSON.parse(raw) : null;
}

export async function guardarAlimentoComunidad(id, entrada) {
  if (!almacenDisponible()) return;
  await comando(["SET", `hsn:alimento:${id}`, JSON.stringify(entrada)]);
  await comando(["SADD", "hsn:indice", id]);
}

export async function listarAlimentosComunidad() {
  if (!almacenDisponible()) return [];
  const ids = (await comando(["SMEMBERS", "hsn:indice"])) || [];
  if (!ids.length) return [];
  const entradas = await Promise.all(ids.map(id => obtenerAlimentoComunidad(id).catch(() => null)));
  return entradas.filter(Boolean);
}
