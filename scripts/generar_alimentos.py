# -*- coding: utf-8 -*-
"""Genera una página HTML estática por alimento de la guía curada
(alimento-<id-con-guiones>.html), a partir de js/data.js, para que cada
alimento tenga su propia URL indexable por buscadores.

Uso: py scripts/generar_alimentos.py            (genera todas)
     py scripts/generar_alimentos.py cafe        (genera solo esa, para probar)

Solo genera página para los alimentos que ya viven en js/data.js (la guía
curada) — los que la IA resuelve en vivo para una búsqueda puntual no tienen
página propia hasta que se "promueven" (se copian a mano) a data.js.
"""
import glob
import json
import os
import sys

from generar_recetas import (
    SITE_URL, ROOT, DATA_JS, RECETAS_JS, MACRO_KEYS, ETIQUETAS,
    formatear_nombre, esc, render_macro_row, pct, parse_recetas, render_sitemap, slug,
)
from generar_sustitutos import (
    parse_foods_full, fecha_publicacion_git as _fecha_publicacion_generica,
)


def fecha_publicacion_git(food_id):
    try:
        return _fecha_publicacion_generica(food_id)
    except Exception:
        return None


def render_citas(estudios):
    if not estudios:
        return ""
    items = "\n".join(
        f'<a class="cita-item" href="{esc(e["url"])}" target="_blank" rel="noopener noreferrer">'
        f'[{i+1}] {esc(e["titulo"])}{" — " + esc(e["revista"]) if e.get("revista") else ""}'
        f'{" (" + esc(str(e["anio"])) + ")" if e.get("anio") else ""}</a>'
        for i, e in enumerate(estudios)
    )
    return f'''
      <h4>Estudios científicos consultados</h4>
      <div class="citas open">{items}</div>'''


def build_article_jsonld(food, page_url, nombre_fmt):
    data = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": f'{nombre_fmt} — Ficha nutricional y calificación',
        "description": f'Valor nutricional de {nombre_fmt} por 100 g, calificación {food["rating"]} y la razón nutricional detrás de esa calificación.',
        "author": {"@type": "Organization", "name": "HSNutrición", "url": SITE_URL},
        "publisher": {"@type": "Organization", "name": "HSNutrición", "url": SITE_URL},
        "mainEntityOfPage": page_url,
    }
    fecha = fecha_publicacion_git(food["id"])
    if fecha:
        data["datePublished"] = fecha
    return data


def render_pagina(food, todas_recetas, ids_con_sustituto):
    nombre_fmt = formatear_nombre(food["nombre"])
    page_url = f'{SITE_URL}/alimento-{slug(food["id"])}.html'
    categorias_txt = " · ".join(food.get("categorias", []))
    descripcion = f'{nombre_fmt} tiene calificación {food["rating"]} en HSNutrición: {food["kcal"]:g} kcal, {food["proteinas"]:g} g de proteína y {food["grasas"]:g} g de grasa por 100 g. Te explicamos el porqué.'

    macros_html = "\n".join(render_macro_row(k, food[k]) for k in ["kcal", "carbs", "proteinas", "grasas", "fibra"])
    citas_html = render_citas(food.get("estudios") or [])

    sustituto_html = ""
    if food["id"] in ids_con_sustituto:
        sustituto_html = f'''
      <div class="food-motivo" style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
        <span>¿Buscas algo más saludable todavía?</span>
        <a class="btn btn-primary btn-sm" href="sustituto-{slug(food["id"])}.html">Ver sustitutos de {nombre_fmt} →</a>
      </div>'''

    recetas_relacionadas = [r for r in todas_recetas if any(i["foodId"] == food["id"] for i in r["ingredientes"])]
    recetas_html = ""
    if recetas_relacionadas:
        items = "\n".join(
            f'<a class="receta-teaser-card" href="receta-{slug(r["id"])}.html">'
            f'<div class="receta-teaser-info"><h3>{esc(r["nombre"])}</h3>'
            f'<span class="receta-meta">⏱️ {esc(r["tiempo"])}</span></div></a>'
            for r in recetas_relacionadas[:6]
        )
        recetas_html = f'''
  <section class="section section-tinted">
    <div class="container">
      <h2 class="section-title reveal">Recetas que usan {esc(nombre_fmt)}</h2>
      <div class="recetas-teaser-grid">
{items}
      </div>
    </div>
  </section>'''

    jsonld = json.dumps(build_article_jsonld(food, page_url, nombre_fmt), ensure_ascii=False, indent=2)
    jsonld = jsonld.replace("</", "<\\/")

    return f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-JHY1PHMCWD"></script>
<script src="js/analytics.js"></script>
<title>{esc(nombre_fmt)} — Ficha nutricional | HSNutrición</title>
<meta name="description" content="{esc(descripcion)}">
<link rel="canonical" href="{page_url}">
<meta property="og:type" content="article">
<meta property="og:title" content="{esc(nombre_fmt)} — HSNutrición">
<meta property="og:description" content="{esc(descripcion)}">
<meta property="og:image" content="{SITE_URL}/img/banner-hsnutricion.jpg">
<meta property="og:url" content="{page_url}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/styles.css">
<script type="application/ld+json">
{jsonld}
</script>
</head>
<body>

<div class="bg-decor" aria-hidden="true">
  <span class="blob blob-1"></span>
  <span class="blob blob-2"></span>
  <span class="blob blob-3"></span>
</div>

<header class="site-header" id="top">
  <div class="container header-inner">
    <a href="index.html" class="brand">
      <img class="brand-mark" src="img/logo-header.png" alt="" width="33" height="40">
      <span class="brand-name">HS<span>Nutrición</span></span>
    </a>
    <nav class="main-nav" id="mainNav">
      <a href="index.html#como-funciona">Cómo funciona</a>
      <a href="index.html#analizar">Analizar alimentos</a>
      <a href="index.html#alimentos">Guía de alimentos</a>
      <a href="index.html#recetas">Recetas Saludables</a>
      <a href="comunidad.html">Recetas de la Comunidad</a>
      <a href="index.html#sobre">Sobre HSNutrición</a>
      <a href="index.html#contacto">Contacto</a>
    </nav>
    <div class="header-actions">
      <button class="btn-icon" id="btnSettings" title="Cómo funciona la IA" aria-label="Cómo funciona la IA">
        <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19.14 12.94a7.14 7.14 0 0 0 .06-.94 7.14 7.14 0 0 0-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.3 7.3 0 0 0-1.63-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54c-.59.24-1.13.56-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.65 8.84a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.62-.06.94s.02.63.06.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.14.24.42.32.6.22l2.39-.96c.5.38 1.04.7 1.63.94l.36 2.54c.05.24.26.42.5.42h3.84c.24 0 .45-.18.5-.42l.36-2.54c.59-.24 1.13-.56 1.63-.94l2.39.96c.24.1.46 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7Z"/></svg>
      </button>
      <button class="btn-icon" id="btnAuth" title="Iniciar sesión" aria-label="Iniciar sesión">
        <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-9 2.24-9 5v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2c0-2.76-4.58-5-9-5Z"/></svg>
      </button>
      <a href="index.html#analizar" class="btn btn-primary btn-sm">Analizar ahora</a>
    </div>
    <button class="nav-toggle" id="navToggle" aria-label="Abrir menú">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<main>
  <section class="section">
    <div class="container">
      <p class="reveal receta-breadcrumb"><a href="index.html#alimentos">← Volver a la guía</a></p>

      <div class="food-card-head reveal" style="margin-bottom:18px">
        <span class="food-emoji" style="font-size:2.4rem;width:70px;height:70px">{food["emoji"]}</span>
        <div class="food-title">
          <h1 style="margin:0 0 4px;font-family:var(--font-display);font-size:1.9rem;font-weight:600">{esc(nombre_fmt)}</h1>
          <span class="food-cat">{esc(categorias_txt)}</span>
        </div>
        <span class="badge badge-{food["rating"]}" title="Calificación nutricional" style="width:44px;height:44px;font-size:1.3rem">{food["rating"]}</span>
      </div>

      <p class="section-sub reveal" style="text-align:left;margin:0 0 20px">{esc(descripcion)}</p>

      <p class="food-motivo">{esc(food["motivo"])}</p>

      <h4>Información nutricional (por 100 g)</h4>
      <div class="macro-table">
{macros_html}
        <p class="food-motivo" style="margin-top:0">De las grasas, <b>{food["grasasSat"]:g} g</b> son saturadas · de los carbohidratos, <b>{food["azucares"]:g} g</b> son azúcares · sodio: <b>{food["sodio"]:g} mg</b></p>
      </div>
      {citas_html}
      {sustituto_html}
    </div>
  </section>
{recetas_html}
</main>

<footer class="site-footer">
  <div class="container footer-inner">
    <div class="brand">
      <img class="brand-mark" src="img/logo-header.png" alt="" width="33" height="40">
      <span class="brand-name">HS<span>Nutrición</span></span>
    </div>
    <div class="footer-meta">
      <p>Hecho con criterio nutricional y mucho verde 🌿 — Información educativa, no un consejo médico.</p>
      <a href="privacidad.html" class="footer-link">Privacidad</a>
    </div>
  </div>
</footer>

<!-- MODAL INFO IA -->
<div class="modal-overlay" id="modalOverlay" hidden>
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <button class="modal-close" id="modalClose" aria-label="Cerrar">✕</button>
    <h3 id="modalTitle">🔬 Cómo funciona la IA de HSNutrición</h3>
    <p><strong>Análisis de imagen:</strong> tu foto se envía a una función segura de nuestro servidor, que la analiza con un modelo de visión y detecta los alimentos. La imagen no se almacena.</p>
    <p><strong>Búsqueda con evidencia científica:</strong> cuando buscas un alimento que no está en nuestra guía, HSNutrición consulta PubMed (la base de datos de estudios biomédicos de EE. UU.) y pide a la IA que redacte la ficha nutricional citando esos estudios reales.</p>
    <p class="modal-hint">Ninguna de estas funciones necesita que introduzcas una clave propia: usamos el nivel gratuito de Google Gemini, y la clave vive únicamente en el servidor del sitio, nunca en tu navegador.</p>
    <div class="modal-actions">
      <button class="btn btn-primary" id="modalOk">Entendido</button>
    </div>
  </div>
</div>

<!-- MODAL CUENTA (solo invitados: con sesión, el icono lleva directo al perfil) -->
<div class="modal-overlay" id="authModalOverlay" hidden>
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="authModalTitle">
    <button class="modal-close" id="authModalClose" aria-label="Cerrar">✕</button>
    <h3 id="authModalTitle">Tu cuenta en HSNutrición</h3>
    <div class="auth-tabs" role="tablist">
      <button class="auth-tab active" data-auth-tab="login" role="tab" aria-selected="true">Iniciar sesión</button>
      <button class="auth-tab" data-auth-tab="registro" role="tab" aria-selected="false">Crear cuenta</button>
    </div>

    <form class="auth-tab-panel active" id="authFormLogin" data-auth-panel="login">
      <label for="loginUsername">Usuario</label>
      <input type="text" id="loginUsername" autocomplete="username" required maxlength="24">
      <label for="loginPassword">Contraseña</label>
      <input type="password" id="loginPassword" autocomplete="current-password" required maxlength="200">
      <p class="modal-hint" id="authLoginStatus"></p>
      <div class="modal-actions">
        <button type="submit" class="btn btn-primary" id="authLoginSubmit">Entrar</button>
      </div>
    </form>

    <form class="auth-tab-panel" id="authFormRegister" data-auth-panel="registro">
      <label for="registerUsername">Usuario</label>
      <input type="text" id="registerUsername" autocomplete="username" required minlength="3" maxlength="24">
      <label for="registerEmail">Email (opcional)</label>
      <input type="email" id="registerEmail" autocomplete="email" maxlength="254">
      <label for="registerPassword">Contraseña</label>
      <input type="password" id="registerPassword" autocomplete="new-password" required minlength="8" maxlength="200">
      <p class="modal-hint" id="authRegisterStatus"></p>
      <div class="modal-actions">
        <button type="submit" class="btn btn-primary" id="authRegisterSubmit">Crear cuenta</button>
      </div>
    </form>
  </div>
</div>

<script src="js/data.js"></script>
<script src="js/recetas.js"></script>
<script src="js/app.js"></script>
</body>
</html>
'''


def main():
    foods = parse_foods_full(DATA_JS)
    todas_recetas = parse_recetas(RECETAS_JS)
    ids_con_sustituto = {fid for fid, f in foods.items() if f.get("sustitutos")}

    objetivo_ids = sys.argv[1:] if len(sys.argv) > 1 else None

    generadas = 0
    for food_id, food in foods.items():
        if objetivo_ids and food_id not in objetivo_ids:
            continue
        html = render_pagina(food, todas_recetas, ids_con_sustituto)
        filename = f'alimento-{slug(food_id)}.html'
        path = os.path.join(ROOT, filename)
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"  {filename}")
        generadas += 1

    print(f"Total generadas: {generadas}")

    if not objetivo_ids:
        urls_alimentos = [
            {"loc": f'{SITE_URL}/alimento-{slug(fid)}.html', "prioridad": "0.5"}
            for fid in foods
        ]
        urls_sustitutos = [
            {"loc": f"{SITE_URL}/{os.path.basename(p)}", "prioridad": "0.6"}
            for p in sorted(glob.glob(os.path.join(ROOT, "sustituto-*.html")))
        ]
        sitemap_path = os.path.join(ROOT, "sitemap.xml")
        with open(sitemap_path, "w", encoding="utf-8") as f:
            f.write(render_sitemap(todas_recetas, extra_urls=urls_alimentos + urls_sustitutos))
        print(f"  sitemap.xml actualizado con {len(urls_alimentos)} páginas de alimentos + {len(urls_sustitutos)} de sustitutos")


if __name__ == "__main__":
    main()
