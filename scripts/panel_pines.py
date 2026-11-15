# -*- coding: utf-8 -*-
"""Genera pines/panel.html: un panel local para publicar los pines a mano en Pinterest.

Lee pines/pines-lote*.csv (los crea generar_pines.py) y muestra, por día, cada pin con su imagen,
título, descripción, enlace, tablero y hora, con botones de "Copiar" y una casilla de "Hecho"
(se guarda en el navegador). El panel no se sube a la web: pines/ está en .gitignore.

Uso: py scripts/panel_pines.py      y abrir pines/panel.html con doble clic.
"""
import csv
import glob
import json
import os
from datetime import datetime, timedelta

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMINIO = "https://www.hsnutricion.com/"


def cargar():
    filas = []
    for ruta in sorted(glob.glob(os.path.join(ROOT, "pines", "pines-lote*.csv"))):
        with open(ruta, encoding="utf-8-sig", newline="") as fh:
            for r in csv.DictReader(fh):
                utc = datetime.fromisoformat(r["Publish date"])
                local = utc + timedelta(hours=1)  # España peninsular de noviembre a marzo (CET)
                filas.append({
                    "id": os.path.basename(r["Media URL"]).replace(".jpg", ""),
                    "img": "../img/pines/" + os.path.basename(r["Media URL"]),
                    "titulo": r["Title"], "desc": r["Description"], "link": r["Link"], "tablero": r["Pinterest board"],
                    "dia": local.strftime("%Y-%m-%d"), "hora": local.strftime("%H:%M"),
                })
    return filas


PLANTILLA = """<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Panel de pines</title>
<style>
:root{--bg:#f4f8f5;--card:#fff;--tx:#12211a;--sub:#5c7064;--line:#dbe6de;--acc:#196f3c;--acc2:#e26444}
@media (prefers-color-scheme:dark){:root{--bg:#10201a;--card:#17302a;--tx:#eaf5ee;--sub:#9db8a8;--line:#27463b;--acc:#5fd08d;--acc2:#ff9a7a}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--tx);font:16px/1.45 "Segoe UI",system-ui,sans-serif}
header{position:sticky;top:0;z-index:5;background:var(--bg);border-bottom:1px solid var(--line);padding:14px 20px;display:flex;gap:16px;align-items:center;flex-wrap:wrap}
h1{font:700 22px Georgia,serif;margin:0}.cont{color:var(--sub);font-size:15px}
label.f{display:flex;gap:8px;align-items:center;margin-left:auto;font-size:15px}
main{max-width:1000px;margin:0 auto;padding:10px 20px 80px}
h2{font:700 20px Georgia,serif;margin:30px 0 10px}
.pin{display:grid;grid-template-columns:150px 1fr;gap:18px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px;margin:12px 0}
.pin.hecho{opacity:.45}
.pin img{width:150px;height:225px;object-fit:cover;border-radius:10px;display:block}
.hora{font-weight:700;color:var(--acc2);font-size:15px}
.campo{margin:8px 0}.campo b{display:block;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--sub)}
.campo span{display:block;word-break:break-word}
button,a.btn{font:600 14px "Segoe UI",sans-serif;border:1px solid var(--acc);background:transparent;color:var(--acc);border-radius:999px;padding:5px 14px;cursor:pointer;text-decoration:none;display:inline-block;margin:4px 6px 0 0}
button.ok{background:var(--acc);color:var(--bg)}
.fila{display:flex;flex-wrap:wrap;align-items:center;gap:4px;margin-top:6px}
.fila label{margin-left:auto;font-size:15px;display:flex;gap:6px;align-items:center}
@media (max-width:640px){.pin{grid-template-columns:1fr}.pin img{width:100%;height:auto;aspect-ratio:2/3}}
</style></head><body>
<header><h1>Panel de pines</h1><span class="cont" id="cont"></span>
<label class="f"><input type="checkbox" id="solo"> Ocultar los ya publicados</label></header>
<main id="lista"></main>
<script>
const PINES = __DATOS__;
let hechos = {};
try { hechos = JSON.parse(localStorage.getItem("pinesHechos") || "{}"); } catch (e) {}
function guardar(){ try { localStorage.setItem("pinesHechos", JSON.stringify(hechos)); } catch (e) {} }
function fecha(d){ const t = new Date(d + "T12:00:00").toLocaleDateString("es-ES", {weekday:"long", day:"numeric", month:"long"}); return t.charAt(0).toUpperCase() + t.slice(1); }
function copiar(t, b){ navigator.clipboard.writeText(t).then(() => { const o = b.textContent; b.textContent = "¡Copiado!"; b.classList.add("ok"); setTimeout(() => { b.textContent = o; b.classList.remove("ok"); }, 1200); }); }
function pintar(){
  const solo = document.getElementById("solo").checked, cont = document.getElementById("lista");
  cont.innerHTML = "";
  let dia = "", n = 0;
  PINES.forEach((p, i) => {
    if (solo && hechos[p.id]) return;
    if (p.dia !== dia) { dia = p.dia; const h = document.createElement("h2"); h.textContent = fecha(dia); cont.appendChild(h); }
    const el = document.createElement("div"); el.className = "pin" + (hechos[p.id] ? " hecho" : "");
    const campos = [["Título", p.titulo, "titulo"], ["Descripción", p.desc, "desc"], ["Enlace de destino", p.link, "link"], ["Tablero", p.tablero, "tablero"]];
    el.innerHTML = '<a href="' + p.img + '" target="_blank"><img loading="lazy" src="' + p.img + '" alt=""></a><div><div class="hora">Programar a las ' + p.hora + '</div></div>';
    const der = el.lastElementChild;
    campos.forEach(([et, val]) => {
      const c = document.createElement("div"); c.className = "campo";
      c.innerHTML = "<b></b><span></span>"; c.firstChild.textContent = et; c.lastChild.textContent = val;
      const b = document.createElement("button"); b.textContent = "Copiar"; b.onclick = () => copiar(val, b); c.appendChild(b); der.appendChild(c);
    });
    const f = document.createElement("div"); f.className = "fila";
    f.innerHTML = '<a class="btn" download href="' + p.img + '">Descargar imagen</a><label><input type="checkbox"> Hecho</label>';
    const ck = f.querySelector("input"); ck.checked = !!hechos[p.id];
    ck.onchange = () => { if (ck.checked) hechos[p.id] = 1; else delete hechos[p.id]; guardar(); pintar(); };
    der.appendChild(f); cont.appendChild(el); n++;
  });
  const hec = PINES.filter(p => hechos[p.id]).length;
  document.getElementById("cont").textContent = hec + " de " + PINES.length + " publicados";
}
document.getElementById("solo").onchange = pintar;
pintar();
</script></body></html>
"""


def main():
    filas = cargar()
    datos = json.dumps(filas, ensure_ascii=False).replace("</", "<\\/")
    ruta = os.path.join(ROOT, "pines", "panel.html")
    with open(ruta, "w", encoding="utf-8") as fh:
        fh.write(PLANTILLA.replace("__DATOS__", datos))
    print(f"{len(filas)} pines en {ruta}")


if __name__ == "__main__":
    main()
