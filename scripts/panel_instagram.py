# -*- coding: utf-8 -*-
"""Genera pines/panel-instagram.html (el panel de carruseles) y pines/inicio.html (menú de los dos paneles).

Lee pines/instagram/manifest.json, que crea generar_carruseles.py. Cada carrusel muestra sus
diapositivas, el texto para copiar, un .zip con todas las imágenes y una casilla de "Hecho".
Se abre con pines/abrir-panel.bat (necesita el servidor local, no funciona como archivo suelto).

Uso: py scripts/panel_instagram.py
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PLANTILLA = """<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Panel de Instagram</title>
<style>
:root{--bg:#f4f8f5;--card:#fff;--tx:#12211a;--sub:#5c7064;--line:#dbe6de;--acc:#196f3c;--acc2:#e26444}
@media (prefers-color-scheme:dark){:root{--bg:#10201a;--card:#17302a;--tx:#eaf5ee;--sub:#9db8a8;--line:#27463b;--acc:#5fd08d;--acc2:#ff9a7a}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--tx);font:16px/1.45 "Segoe UI",system-ui,sans-serif}
header{position:sticky;top:0;z-index:5;background:var(--bg);border-bottom:1px solid var(--line);padding:14px 20px;display:flex;gap:16px;align-items:center;flex-wrap:wrap}
h1{font:700 22px Georgia,serif;margin:0}.cont{color:var(--sub);font-size:15px}header a{color:var(--acc);font-weight:600}
label.f{display:flex;gap:8px;align-items:center;margin-left:auto;font-size:15px}
main{max-width:1100px;margin:0 auto;padding:10px 20px 80px}
h2{font:700 20px Georgia,serif;margin:30px 0 10px}
.car{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px;margin:12px 0}
.car.hecho{opacity:.45}
.cab{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}.cab b{font:700 18px Georgia,serif}
.tipo{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--acc2);font-weight:700}
.tira{display:flex;gap:10px;overflow-x:auto;padding:12px 0}
.tira img{height:240px;width:auto;border-radius:10px;display:block;border:1px solid var(--line)}
.campo b{display:block;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--sub);margin-top:6px}
pre{white-space:pre-wrap;word-break:break-word;font:15px/1.5 "Segoe UI",system-ui,sans-serif;margin:4px 0 0}
button,a.btn{font:600 14px "Segoe UI",sans-serif;border:1px solid var(--acc);background:transparent;color:var(--acc);border-radius:999px;padding:5px 14px;cursor:pointer;text-decoration:none;display:inline-block;margin:6px 6px 0 0}
button.ok{background:var(--acc);color:var(--bg)}
.fila{display:flex;flex-wrap:wrap;align-items:center;gap:4px;margin-top:8px}
.fila label{margin-left:auto;font-size:15px;display:flex;gap:6px;align-items:center}
</style></head><body>
<header><h1>Panel de Instagram</h1><span class="cont" id="cont"></span><a href="inicio.html">← Inicio</a>
<label class="f"><input type="checkbox" id="solo"> Ocultar los ya publicados</label></header>
<main id="lista"></main>
<script>
const CARR = __DATOS__;
let hechos = {};
try { hechos = JSON.parse(localStorage.getItem("igHechos") || "{}"); } catch (e) {}
function guardar(){ try { localStorage.setItem("igHechos", JSON.stringify(hechos)); } catch (e) {} }
function fecha(d){ const t = new Date(d + "T12:00:00").toLocaleDateString("es-ES", {weekday:"long", day:"numeric", month:"long", year:"numeric"}); return t.charAt(0).toUpperCase() + t.slice(1); }
function copiar(t, b){ navigator.clipboard.writeText(t).then(() => { const o = b.textContent; b.textContent = "¡Copiado!"; b.classList.add("ok"); setTimeout(() => { b.textContent = o; b.classList.remove("ok"); }, 1200); }); }
const TIPOS = {notas:"Presentación", top:"Top 5", versus:"Comparativa", receta:"Receta", frase:"Dato con estudio"};
function pintar(){
  const solo = document.getElementById("solo").checked, cont = document.getElementById("lista");
  cont.innerHTML = "";
  CARR.forEach(c => {
    if (solo && hechos[c.id]) return;
    const h = document.createElement("h2"); h.textContent = fecha(c.dia); cont.appendChild(h);
    const el = document.createElement("div"); el.className = "car" + (hechos[c.id] ? " hecho" : "");
    const cab = document.createElement("div"); cab.className = "cab";
    cab.innerHTML = '<span class="tipo"></span><b></b>'; cab.firstChild.textContent = (TIPOS[c.tipo] || c.tipo) + " · " + c.slides.length + " diapositivas"; cab.lastChild.textContent = c.titulo;
    el.appendChild(cab);
    const tira = document.createElement("div"); tira.className = "tira";
    c.slides.forEach(s => { const a = document.createElement("a"); a.href = s; a.target = "_blank"; a.innerHTML = '<img loading="lazy" src="' + s + '" alt="">'; tira.appendChild(a); });
    el.appendChild(tira);
    const campo = document.createElement("div"); campo.className = "campo";
    campo.innerHTML = "<b>Texto de la publicación</b><pre></pre>"; campo.querySelector("pre").textContent = c.caption;
    const bc = document.createElement("button"); bc.textContent = "Copiar texto"; bc.onclick = () => copiar(c.caption, bc); campo.appendChild(bc);
    const bz = document.createElement("a"); bz.className = "btn"; bz.href = c.zip; bz.download = ""; bz.textContent = "Descargar las " + c.slides.length + " imágenes (.zip)"; campo.appendChild(bz);
    el.appendChild(campo);
    const f = document.createElement("div"); f.className = "fila";
    f.innerHTML = '<label><input type="checkbox"> Hecho</label>';
    const ck = f.querySelector("input"); ck.checked = !!hechos[c.id];
    ck.onchange = () => { if (ck.checked) hechos[c.id] = 1; else delete hechos[c.id]; guardar(); pintar(); };
    el.appendChild(f); cont.appendChild(el);
  });
  document.getElementById("cont").textContent = CARR.filter(c => hechos[c.id]).length + " de " + CARR.length + " publicados";
}
document.getElementById("solo").onchange = pintar;
pintar();
</script></body></html>
"""

INICIO = """<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Paneles de redes</title>
<style>
:root{--bg:#f4f8f5;--card:#fff;--tx:#12211a;--sub:#5c7064;--line:#dbe6de;--acc:#196f3c}
@media (prefers-color-scheme:dark){:root{--bg:#10201a;--card:#17302a;--tx:#eaf5ee;--sub:#9db8a8;--line:#27463b;--acc:#5fd08d}}
body{margin:0;background:var(--bg);color:var(--tx);font:17px/1.5 "Segoe UI",system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;padding:20px}
.w{max-width:560px;width:100%}h1{font:700 28px Georgia,serif;margin:0 0 6px}p{color:var(--sub);margin:0 0 22px}
a.b{display:block;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:20px 22px;margin:12px 0;text-decoration:none;color:var(--tx)}
a.b b{display:block;font:700 20px Georgia,serif;color:var(--acc)}a.b span{color:var(--sub);font-size:15px}
</style></head><body><div class="w"><h1>Paneles de redes</h1><p>Elige dónde vas a publicar hoy.</p>
<a class="b" href="panel.html"><b>Pinterest</b><span>1 pin al día: imagen, título, descripción y enlace listos para copiar.</span></a>
<a class="b" href="panel-instagram.html"><b>Instagram</b><span>1-2 carruseles a la semana: diapositivas, texto y zip para descargar.</span></a>
</div></body></html>
"""


def main():
    ruta = os.path.join(ROOT, "pines", "instagram", "manifest.json")
    with open(ruta, encoding="utf-8") as fh:
        manifest = json.load(fh)
    datos = json.dumps(manifest, ensure_ascii=False).replace("</", "<\\/")
    with open(os.path.join(ROOT, "pines", "panel-instagram.html"), "w", encoding="utf-8") as fh:
        fh.write(PLANTILLA.replace("__DATOS__", datos))
    with open(os.path.join(ROOT, "pines", "inicio.html"), "w", encoding="utf-8") as fh:
        fh.write(INICIO)
    print(f"{len(manifest)} carruseles en pines/panel-instagram.html")


if __name__ == "__main__":
    main()
