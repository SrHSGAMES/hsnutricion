// Cookie de sesión, escrita a mano (sin el paquete "cookie") porque el
// proyecto no tiene dependencias npm. El token es opaco y aleatorio, se
// valida contra Redis (ver store.js) — no es un JWT firmado, así que no hace
// falta ningún secreto de firma.

const NOMBRE_COOKIE = "hsn_session";

// Trata localhost como no-seguro: así una prueba local con "vercel dev" (que
// sirve por HTTP en localhost) no rompe el login por exigir HTTPS. En
// producción/preview de Vercel el host nunca es localhost, así que ahí
// siempre se añade "Secure".
function esLocal(req) {
  const host = (req.headers.host || "").split(":")[0];
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

export function serializarCookieSesion(req, token, maxAgeSegundos) {
  const partes = [`${NOMBRE_COOKIE}=${token}`, "Path=/", "HttpOnly", "SameSite=Lax", `Max-Age=${maxAgeSegundos}`];
  if (!esLocal(req)) partes.push("Secure");
  return partes.join("; ");
}

export function serializarCookieBorrado(req) {
  const partes = [`${NOMBRE_COOKIE}=`, "Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=0"];
  if (!esLocal(req)) partes.push("Secure");
  return partes.join("; ");
}

export function leerTokenSesion(req) {
  const raw = req.headers.cookie;
  if (!raw) return null;
  for (const parte of raw.split(";")) {
    const idx = parte.indexOf("=");
    if (idx === -1) continue;
    if (parte.slice(0, idx).trim() === NOMBRE_COOKIE) return decodeURIComponent(parte.slice(idx + 1).trim());
  }
  return null;
}
