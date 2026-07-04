// GET /api/_debug-store — diagnóstico TEMPORAL, se borra tras confirmar que
// el almacén compartido (Upstash) está bien conectado. No expone secretos.

import { almacenDisponible, guardarAlimentoComunidad, obtenerAlimentoComunidad } from "./_lib/store.js";

export default async function handler(req, res) {
  const disponible = almacenDisponible();
  const envVistos = {
    UPSTASH_REDIS_REST_URL: Boolean(process.env.UPSTASH_REDIS_REST_URL),
    UPSTASH_REDIS_REST_TOKEN: Boolean(process.env.UPSTASH_REDIS_REST_TOKEN),
    KV_REST_API_URL: Boolean(process.env.KV_REST_API_URL),
    KV_REST_API_TOKEN: Boolean(process.env.KV_REST_API_TOKEN)
  };

  if (!disponible) {
    return res.status(200).json({ disponible, envVistos, mensaje: "Ninguna variable de entorno reconocida está configurada." });
  }

  try {
    const idPrueba = "diagnostico_test";
    await guardarAlimentoComunidad(idPrueba, { ok: true, ts: Date.now() });
    const leido = await obtenerAlimentoComunidad(idPrueba);
    res.status(200).json({ disponible, envVistos, escrituraLecturaOk: Boolean(leido), leido });
  } catch (err) {
    res.status(200).json({ disponible, envVistos, error: err.message });
  }
}
