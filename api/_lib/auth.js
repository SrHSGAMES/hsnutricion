// Hash de contraseñas con scrypt (módulo nativo de Node, sin dependencias
// nuevas): sal aleatoria por usuario y comparación en tiempo constante para
// no filtrar información por temporización.

import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const LONGITUD_CLAVE = 64;

export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivada = await scryptAsync(password, salt, LONGITUD_CLAVE);
  return `${salt}:${derivada.toString("hex")}`;
}

export async function verificarPassword(password, hashGuardado) {
  const [salt, hashHex] = (hashGuardado || "").split(":");
  if (!salt || !hashHex) return false;
  const esperado = Buffer.from(hashHex, "hex");
  const candidata = await scryptAsync(password, salt, esperado.length);
  return candidata.length === esperado.length && timingSafeEqual(candidata, esperado);
}

export function generarTokenSesion() {
  return randomBytes(32).toString("hex");
}
