// Menús diarios guardados por cada usuario (menu.html). Se guardan en el almacén
// compartido como una lista por usuario. Aquí vive la validación: lo que llega
// del navegador nunca se guarda tal cual, se reconstruye campo a campo.

export const MAX_MENUS = 20;
const COMIDAS = ["desayuno", "comida", "cena", "snack"];
const ID_VALIDO = /^[A-Za-z0-9_:.-]{1,80}$/; // ids de receta ("hummus_casero") y de alimento suelto ("suelto:ia_platano")

function numero(valor, min, max, defecto) {
  const n = Number(valor);
  return Number.isFinite(n) ? Math.min(Math.max(n, min), max) : defecto;
}

// Devuelve el menú saneado o lanza un Error con un mensaje apto para el usuario.
export function validarMenu(entrada) {
  if (!entrada || typeof entrada !== "object") throw new Error("El menú no es válido.");

  const nombre = String(entrada.nombre ?? "").trim().slice(0, 40);
  if (!nombre) throw new Error("Ponle un nombre al menú.");

  const id = String(entrada.id ?? "");
  if (!/^[A-Za-z0-9]{1,24}$/.test(id)) throw new Error("El menú no es válido.");

  const comidas = Array.isArray(entrada.comidas) ? entrada.comidas.filter(c => COMIDAS.includes(c)) : [];
  const unicas = [...new Set(comidas)];
  if (!unicas.length) throw new Error("El menú no tiene comidas.");

  const menu = {};
  for (const comida of unicas) {
    const platos = Array.isArray(entrada.menu?.[comida]) ? entrada.menu[comida].slice(0, 8) : [];
    menu[comida] = platos
      .filter(p => p && typeof p.id === "string" && ID_VALIDO.test(p.id))
      .map(p => ({ id: p.id, raciones: Math.round(numero(p.raciones, 1, 4, 1)) }));
  }

  const fecha = new Date(entrada.fecha);
  return {
    id,
    nombre,
    fecha: Number.isNaN(fecha.getTime()) ? new Date().toISOString() : fecha.toISOString(),
    objetivo: Math.round(numero(entrada.objetivo, 500, 10000, 2000)),
    kcal: Math.round(numero(entrada.kcal, 0, 20000, 0)),
    comidas: unicas,
    menu
  };
}

// Añade un menú a la lista (ordenada de más reciente a más antiguo). Falla si ya hay MAX_MENUS.
export function anadirMenu(lista, menu) {
  if (lista.some(m => m.id === menu.id)) return lista;
  if (lista.length >= MAX_MENUS) {
    throw new Error(`Ya tienes ${MAX_MENUS} menús guardados. Borra alguno para guardar otro.`);
  }
  return [menu, ...lista].sort((a, b) => b.fecha.localeCompare(a.fecha)); // más recientes primero
}

// Importa los menús que estaban solo en el navegador: ignora los inválidos y
// los repetidos, y se detiene al llegar al máximo. No lanza error.
export function importarMenus(lista, candidatos) {
  let resultado = lista;
  for (const c of Array.isArray(candidatos) ? candidatos.slice(0, MAX_MENUS) : []) {
    try {
      if (resultado.length >= MAX_MENUS) break;
      resultado = anadirMenu(resultado, validarMenu(c));
    } catch (_) { /* menú inválido: se omite */ }
  }
  return resultado;
}
