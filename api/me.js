// GET  /api/me                 — indica si hay sesión activa. A diferencia de
//   register/login, no falla si el almacén no está configurado (se llama en cada
//   carga de página, debe degradar con suavidad a "sin sesión").
//
// Los menús diarios guardados del usuario viven aquí también (así no hace falta
// una función serverless más: el plan de Vercel permite un máximo de 12):
//   GET  /api/me?recurso=menus  → { menus: [...] }
//   POST /api/me  body: { accion: "guardar", menu }      → { menus }
//   POST /api/me  body: { accion: "borrar", id }         → { menus }
//   POST /api/me  body: { accion: "importar", menus }    → { menus }   (los que había solo en el navegador)

import {
  almacenDisponible,
  obtenerSesion,
  obtenerUsuario,
  obtenerUsuarioDeSesion,
  obtenerMenusUsuario,
  guardarMenusUsuario,
  esAdmin
} from "./_lib/store.js";
import { leerTokenSesion } from "./_lib/cookies.js";
import { validarMenu, anadirMenu, importarMenus } from "./_lib/menus.js";

async function gestionarMenus(req, res) {
  if (!almacenDisponible()) {
    return res.status(500).json({ error: "Falta configurar el almacén compartido en las variables de entorno de Vercel." });
  }
  const usuario = await obtenerUsuarioDeSesion(req).catch(() => null);
  if (!usuario) {
    return res.status(401).json({ error: "Inicia sesión primero." });
  }
  const usernameLower = usuario.username.toLowerCase();
  res.setHeader("Cache-Control", "private, no-store");

  try {
    let lista = await obtenerMenusUsuario(usernameLower);

    if (req.method === "POST") {
      const accion = (req.body?.accion || "").toString();
      if (accion === "guardar") {
        let menu;
        try { menu = validarMenu(req.body?.menu); } catch (err) { return res.status(400).json({ error: err.message }); }
        try { lista = anadirMenu(lista, menu); } catch (err) { return res.status(409).json({ error: err.message }); }
      } else if (accion === "borrar") {
        const id = (req.body?.id || "").toString().slice(0, 40);
        lista = lista.filter(m => m.id !== id);
      } else if (accion === "importar") {
        lista = importarMenus(lista, req.body?.menus);
      } else {
        return res.status(400).json({ error: "Acción no válida." });
      }
      await guardarMenusUsuario(usernameLower, lista);
    }

    res.status(200).json({ menus: lista });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default async function handler(req, res) {
  const quiereMenus = req.method === "POST" || (req.method === "GET" && req.query?.recurso === "menus");
  if (quiereMenus) return gestionarMenus(req, res);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido." });
  }
  try {
    if (!almacenDisponible()) {
      return res.status(200).json({ username: null, esAdmin: false });
    }
    const token = leerTokenSesion(req);
    if (!token) {
      return res.status(200).json({ username: null, esAdmin: false });
    }
    const sesion = await obtenerSesion(token);
    if (!sesion) {
      return res.status(200).json({ username: null, esAdmin: false });
    }
    const usuario = await obtenerUsuario(sesion.usernameLower);
    res.status(200).json({
      username: usuario ? usuario.username : null,
      esAdmin: usuario ? esAdmin(sesion.usernameLower) : false
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
