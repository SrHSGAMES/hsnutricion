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

    // Limpieza: quitamos la entrada de prueba para no mezclarla con alimentos reales.
    const base = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    async function comandoLimpieza(cmd) {
      await fetch(base, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify(cmd)
      });
    }
    await comandoLimpieza(["DEL", `hsn:alimento:${idPrueba}`]);
    await comandoLimpieza(["SREM", "hsn:indice", idPrueba]);

    res.status(200).json({ disponible, envVistos, escrituraLecturaOk: Boolean(leido), leido, limpiado: true });
  } catch (err) {
    res.status(200).json({ disponible, envVistos, error: err.message });
  }
}
