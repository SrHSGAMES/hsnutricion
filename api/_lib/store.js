// Cliente mínimo para Upstash Redis (REST API). Se usa para dos cosas:
//
// 1) Compartir entre todas las visitas los alimentos que la IA genera: así
//    solo se consulta una vez por alimento nuevo, y el resto de personas lo
//    reciben al instante sin gastar cuota de la IA. Esto es opcional: si no
//    se configuran las variables de entorno, la búsqueda con IA sigue
//    funcionando igual, simplemente sin memoria compartida.
//
// 2) Guardar las cuentas de usuario (registro/login) y sus sesiones. Esto NO
//    es opcional: sin el almacén configurado, el registro y el inicio de
//    sesión fallan con un error explícito (ver api/register.js y api/login.js).

import { leerTokenSesion } from "./cookies.js";

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

// --- Cuentas de usuario y sesiones ---

export async function crearUsuario(usernameLower, datos) {
  const ok = await comando(["SET", `hsn:user:${usernameLower}`, JSON.stringify(datos), "NX"]);
  return ok === "OK"; // false = el usuario ya existía (atómico, sin condición de carrera)
}

export async function obtenerUsuario(usernameLower) {
  const raw = await comando(["GET", `hsn:user:${usernameLower}`]);
  return raw ? JSON.parse(raw) : null;
}

export async function guardarSesion(token, datos, ttlSegundos) {
  await comando(["SET", `hsn:session:${token}`, JSON.stringify(datos), "EX", String(ttlSegundos)]);
}

export async function obtenerSesion(token) {
  const raw = await comando(["GET", `hsn:session:${token}`]);
  return raw ? JSON.parse(raw) : null;
}

export async function borrarSesion(token) {
  await comando(["DEL", `hsn:session:${token}`]);
}

// Administradores del sitio: lista fija por variable de entorno (no editable
// desde la propia web), para poder moderar contenido de la comunidad (p.ej.
// borrar una receta con un nombre inapropiado) sin tocar la base de datos a
// mano. Comparación insensible a mayúsculas.
const ADMIN_USERNAMES = (process.env.ADMIN_USERNAMES || "")
  .split(",")
  .map(u => u.trim().toLowerCase())
  .filter(Boolean);

export function esAdmin(usernameLower) {
  return ADMIN_USERNAMES.includes((usernameLower || "").toLowerCase());
}

// Deduce el usuario que hace la petición a partir de su cookie de sesión, o
// null si no hay sesión válida. Usado por cualquier endpoint que requiera
// estar identificado (recetas de la comunidad, y antes solo inline en me.js).
export async function obtenerUsuarioDeSesion(req) {
  if (!almacenDisponible()) return null;
  const token = leerTokenSesion(req);
  if (!token) return null;
  const sesion = await obtenerSesion(token);
  if (!sesion) return null;
  return obtenerUsuario(sesion.usernameLower);
}

// --- Recetas de la comunidad ---

export async function guardarRecetaComunidad(id, entrada) {
  if (!almacenDisponible()) return;
  await comando(["SET", `hsn:receta:${id}`, JSON.stringify(entrada)]);
  await comando(["SADD", "hsn:recetas:indice", id]);
}

export async function obtenerRecetaComunidad(id) {
  if (!almacenDisponible()) return null;
  const raw = await comando(["GET", `hsn:receta:${id}`]);
  return raw ? JSON.parse(raw) : null;
}

export async function listarRecetasComunidad() {
  if (!almacenDisponible()) return [];
  const ids = (await comando(["SMEMBERS", "hsn:recetas:indice"])) || [];
  if (!ids.length) return [];
  const entradas = await Promise.all(ids.map(id => obtenerRecetaComunidad(id).catch(() => null)));
  return entradas.filter(Boolean);
}

export async function borrarRecetaComunidad(id) {
  if (!almacenDisponible()) return;
  await comando(["DEL", `hsn:receta:${id}`]);
  await comando(["SREM", "hsn:recetas:indice", id]);
}
