# -*- coding: utf-8 -*-
"""Genera una página estática por alimento con sustitutos documentados
(sustituto-<id-con-guiones>.html), a partir de js/data.js, para captar
búsquedas del tipo "sustituto saludable de X" / "alternativa a X".

Uso: py scripts/generar_sustitutos.py            (genera todas)
     py scripts/generar_sustitutos.py mantequilla (genera solo esa, para probar)
"""
import datetime
import json
import os
import re
import subprocess
import sys

from generar_recetas import (
    SITE_URL, ROOT, DATA_JS, RECETAS_JS, MACRO_KEYS, ESCALAS, ETIQUETAS,
    formatear_nombre, fetch_community_foods, pct, esc, render_macro_row, slug,
    parse_recetas, render_sitemap,
)


def _chunks_by_id(text, start_marker, end_marker):
    start = text.index(start_marker) + len(start_marker)
    end = text.index(end_marker, start)
    body = text[start:end]
    ids = [m.start() for m in re.finditer(r'\bid: "', body)]
    ids.append(len(body))
    return [body[ids[i]:ids[i + 1]] for i in range(len(ids) - 1)]


def _extract_str(chunk, key, required=True):
    m = re.search(rf'{key}: "((?:[^"\\]|\\.)*)"', chunk)
    if m:
        return m.group(1).replace('\\"', '"')
    if required:
        raise ValueError(f"No se encontró {key} en: {chunk[:80]}")
    return None


def _extract_object_list(text, key):
    """Extrae una lista de objetos { ... } (sintaxis JS, claves sin comillas)
    contando llaves, para bloques como "sustitutos: [ {...}, {...} ]"."""
    m = re.search(rf"{key}: \[", text)
    if not m:
        return []
    start = m.end()
    depth = 0
    objs = []
    obj_start = None
    i = start
    # localizar el cierre del array de nivel superior
    array_depth = 1
    while i < len(text) and array_depth > 0:
        ch = text[i]
        if ch == "[":
            array_depth += 1
        elif ch == "]":
            array_depth -= 1
            if array_depth == 0:
                break
        elif ch == "{":
            if depth == 0:
                obj_start = i
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0 and obj_start is not None:
                objs.append(text[obj_start:i + 1])
                obj_start = None
        i += 1
    return objs


def parse_foods_full(path):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    foods = {}
    for chunk in _chunks_by_id(text, "const FOODS = [", "\n];"):
        food_id = _extract_str(chunk, "id")
        categorias_m = re.search(r"categorias: \[([^\]]*)\]", chunk)
        categorias = re.findall(r'"([^"]*)"', categorias_m.group(1)) if categorias_m else []

        macros = {}
        for k in MACRO_KEYS:
            m = re.search(rf'\b{k}: (-?[\d.]+)', chunk)
            macros[k] = float(m.group(1)) if m else 0.0

        estudios_m = re.search(r"estudios: (\[.*?\n    \])", chunk, re.S)
        estudios = json.loads(estudios_m.group(1)) if estudios_m else []

        sustitutos = []
        for sub_chunk in _extract_object_list(chunk, "sustitutos"):
            sub_macros = {}
            for k in MACRO_KEYS:
                m = re.search(rf'\b{k}: (-?[\d.]+)', sub_chunk)
                sub_macros[k] = float(m.group(1)) if m else 0.0
            sustitutos.append({
                "nombre": _extract_str(sub_chunk, "nombre"),
                "emoji": _extract_str(sub_chunk, "emoji", required=False) or "🍽️",
                "mejor": "mejor: true" in sub_chunk,
                "porque": _extract_str(sub_chunk, "porque"),
                **sub_macros,
            })

        foods[food_id] = {
            "id": food_id,
            "nombre": _extract_str(chunk, "nombre"),
            "categorias": categorias,
            "emoji": _extract_str(chunk, "emoji", required=False) or "🍽️",
            "rating": _extract_str(chunk, "rating"),
            "motivo": _extract_str(chunk, "motivo"),
            "estudios": estudios,
            "sustitutos": sustitutos,
            **macros,
        }
    return foods


def normalizar(s):
    import unicodedata
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"[()]", " ", s)  # quita los paréntesis pero conserva su contenido
    return re.sub(r"\s+", " ", s).strip()


def emparejar_con_ficha_real(sustituto, todos_los_foods):
    """Si el nombre del sustituto coincide con un alimento real de la guía
    (base o comunidad), lo devuelve — para poder enlazar recetas que lo usan."""
    objetivo = normalizar(sustituto["nombre"])
    for food in todos_los_foods.values():
        if normalizar(food["nombre"]) == objetivo:
            return food
    return None


def render_food_card(food, con_link_categoria=True):
    citas_html = ""
    if food.get("estudios"):
        items = "\n".join(
            f'<a class="cita-item" href="{esc(e["url"])}" target="_blank" rel="noopener noreferrer">'
            f'[{i+1}] {esc(e["titulo"])}{" — " + esc(e["revista"]) if e.get("revista") else ""}'
            f'{" (" + esc(str(e["anio"])) + ")" if e.get("anio") else ""}</a>'
            for i, e in enumerate(food["estudios"])
        )
        citas_html = f'<div class="citas open">{items}</div>'

    macros_html = "\n".join(render_macro_row(k, food[k]) for k in ["kcal", "carbs", "proteinas", "grasas", "fibra"])

    return f'''<article class="food-card">
      <div class="food-card-head">
        <span class="food-emoji">{food["emoji"]}</span>
        <div class="food-title">
          <h4>{esc(formatear_nombre(food["nombre"]))}</h4>
          <span class="food-cat">{esc(" · ".join(food.get("categorias", [])))}</span>
        </div>
        <span class="badge badge-{food["rating"]}" title="Calificación nutricional">{food["rating"]}</span>
      </div>
      <p class="food-motivo">{esc(food["motivo"])}</p>
      <div class="macro-table">
{macros_html}
        <p class="food-motivo" style="margin-top:0">De las grasas, <b>{food["grasasSat"]:g} g</b> son saturadas · de los carbohidratos, <b>{food["azucares"]:g} g</b> son azúcares · sodio: <b>{food["sodio"]:g} mg</b></p>
      </div>
      {citas_html}
    </article>'''


def render_tabla_comparativa(original, sustituto):
    filas = [
        ("Calorías", f'{original["kcal"]:g} kcal', f'{sustituto["kcal"]:g} kcal'),
        ("Grasas", f'{original["grasas"]:g} g', f'{sustituto["grasas"]:g} g'),
        ("— saturadas", f'{original["grasasSat"]:g} g', f'{sustituto["grasasSat"]:g} g'),
        ("Carbohidratos", f'{original["carbs"]:g} g', f'{sustituto["carbs"]:g} g'),
        ("— azúcares", f'{original["azucares"]:g} g', f'{sustituto["azucares"]:g} g'),
        ("Proteínas", f'{original["proteinas"]:g} g', f'{sustituto["proteinas"]:g} g'),
        ("Fibra", f'{original["fibra"]:g} g', f'{sustituto["fibra"]:g} g'),
        ("Sodio", f'{original["sodio"]:g} mg', f'{sustituto["sodio"]:g} mg'),
    ]
    filas_html = "\n".join(
        f'          <tr><td>{nombre}</td><td>{a}</td><td>{b}</td></tr>' for nombre, a, b in filas
    )
    return f'''<table class="tabla-comparativa">
        <thead>
          <tr><th>Por 100 g</th><th>{esc(formatear_nombre(original["nombre"]))}</th><th>{esc(formatear_nombre(sustituto["nombre"]))}</th></tr>
        </thead>
        <tbody>
{filas_html}
        </tbody>
      </table>'''


def render_sustituto_card(sustituto, original, recetas_relacionadas):
    etiqueta_mejor = '<span class="sub-best">Mejor opción</span>' if sustituto["mejor"] else ""
    recetas_html = ""
    if recetas_relacionadas:
        items = "\n".join(
            f'<a class="receta-teaser-card" href="receta-{slug(r["id"])}.html">'
            f'<div class="receta-teaser-info"><h3>{esc(r["nombre"])}</h3>'
            f'<span class="receta-meta">⏱️ {esc(r["tiempo"])}</span></div></a>'
            for r in recetas_relacionadas
        )
        recetas_html = f'''
      <p class="receta-hint" style="margin:14px 0 8px">Recetas que ya usan {esc(formatear_nombre(sustituto["nombre"]))}:</p>
      <div class="recetas-teaser-grid">{items}</div>'''

    return f'''<article class="food-card" style="margin-bottom:20px">
      <div class="food-card-head">
        <span class="food-emoji">{sustituto["emoji"]}</span>
        <div class="food-title">
          <h4>{esc(formatear_nombre(sustituto["nombre"]))}</h4>
        </div>
        {etiqueta_mejor}
      </div>
      <p class="food-motivo">{esc(sustituto["porque"])}</p>
      {render_tabla_comparativa(original, sustituto)}
      {recetas_html}
    </article>'''


def fecha_publicacion_git(food_id):
    try:
        out = subprocess.run(
            ["git", "log", "--format=%ad", "--date=short", "--reverse",
             "-S", f'id: "{food_id}"', "--", DATA_JS],
            cwd=ROOT, capture_output=True, text=True, timeout=15
        )
        lineas = [l for l in out.stdout.strip().splitlines() if l]
        return lineas[0] if lineas else None
    except Exception:
        return None


def build_article_jsonld(food, page_url):
    data = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": f'Sustitutos saludables de {formatear_nombre(food["nombre"])}',
        "description": f'Alternativas más saludables a {formatear_nombre(food["nombre"])}, con comparativa nutricional y la razón científica de cada una.',
        "author": {"@type": "Organization", "name": "HSNutrición", "url": SITE_URL},
        "publisher": {"@type": "Organization", "name": "HSNutrición", "url": SITE_URL},
        "mainEntityOfPage": page_url,
    }
    fecha = fecha_publicacion_git(food["id"])
    if fecha:
        data["datePublished"] = fecha
    return data


def render_pagina(food, todos_los_foods, todas_recetas):
    nombre_fmt = formatear_nombre(food["nombre"])
    page_url = f'{SITE_URL}/sustituto-{slug(food["id"])}.html'
    descripcion = f'{nombre_fmt} tiene calificación {food["rating"]} en HSNutrición. Te explicamos sus mejores alternativas más saludables, con comparativa nutricional y la evidencia científica detrás de cada una.'

    sustitutos_ordenados = sorted(food["sustitutos"], key=lambda s: not s["mejor"])
    tarjetas = []
    for sub in sustitutos_ordenados:
        real = emparejar_con_ficha_real(sub, todos_los_foods)
        recetas_relacionadas = []
        if real:
            recetas_relacionadas = [r for r in todas_recetas if any(i["foodId"] == real["id"] for i in r["ingredientes"])]
        tarjetas.append(render_sustituto_card(sub, food, recetas_relacionadas))
    sustitutos_html = "\n".join(tarjetas)

    jsonld = json.dumps(build_article_jsonld(food, page_url), ensure_ascii=False, indent=2)
    jsonld = jsonld.replace("</", "<\\/")

    return f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>¿Cuál es el mejor sustituto de {nombre_fmt}? — HSNutrición</title>
<meta name="description" content="{esc(descripcion)}">
<link rel="canonical" href="{page_url}">
<meta property="og:type" content="article">
<meta property="og:title" content="Sustitutos saludables de {nombre_fmt} — HSNutrición">
<meta property="og:description" content="{esc(descripcion)}">
<meta property="og:image" content="{SITE_URL}/img/banner-hsnutricion.jpg">
<meta property="og:url" content="{page_url}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
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

      <h1 class="section-title reveal" style="text-align:left">¿Cuál es el mejor sustituto de {nombre_fmt}?</h1>
      <p class="section-sub reveal" style="text-align:left;margin:0 0 30px">{esc(descripcion)}</p>

      <h2 style="font-family:var(--font-display);font-size:1.3rem;font-weight:600;margin-bottom:14px">Por qué buscar una alternativa</h2>
      {render_food_card(food)}

      <h2 style="font-family:var(--font-display);font-size:1.3rem;font-weight:600;margin:30px 0 14px">Mejores alternativas</h2>
      {sustitutos_html}
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="container footer-inner">
    <div class="brand">
      <img class="brand-mark" src="img/logo-header.png" alt="" width="33" height="40">
      <span class="brand-name">HS<span>Nutrición</span></span>
    </div>
    <p>Hecho con criterio nutricional y mucho verde 🌿 — Información educativa, no un consejo médico.</p>
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

<!-- MODAL CUENTA -->
<div class="modal-overlay" id="authModalOverlay" hidden>
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="authModalTitle">
    <button class="modal-close" id="authModalClose" aria-label="Cerrar">✕</button>

    <div id="authViewGuest">
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

    <div id="authViewUser" hidden>
      <h3>Hola, <span id="authUserName"></span> 👋</h3>
      <p class="modal-hint">Pronto podrás guardar aquí tus preferencias y herramientas personalizadas.</p>
      <div class="modal-actions">
        <button class="btn btn-ghost" id="authLogoutBtn">Cerrar sesión</button>
      </div>
    </div>
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
    try:
        comunidad = fetch_community_foods()
        # fetch_community_foods() del otro script no trae motivo/estudios/sustitutos
        # completos; para el emparejamiento por nombre nos basta con lo que trae.
        for fid, f in comunidad.items():
            if fid not in foods:
                foods[fid] = {**f, "categorias": [], "motivo": "", "estudios": [], "sustitutos": []}
    except Exception as e:
        print(f"AVISO: no se pudieron cargar los alimentos de la comunidad ({e}).")

    todas_recetas = parse_recetas(RECETAS_JS)

    objetivo_ids = sys.argv[1:] if len(sys.argv) > 1 else None

    generadas = 0
    urls_sustitutos = []
    for food_id, food in foods.items():
        if not food.get("sustitutos"):
            continue
        urls_sustitutos.append({"loc": f'{SITE_URL}/sustituto-{slug(food_id)}.html', "prioridad": "0.6"})
        if objetivo_ids and food_id not in objetivo_ids:
            continue
        html = render_pagina(food, foods, todas_recetas)
        filename = f'sustituto-{slug(food_id)}.html'
        path = os.path.join(ROOT, filename)
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"  {filename} — {len(food['sustitutos'])} sustituto(s)")
        generadas += 1

    print(f"Total generadas: {generadas}")

    # El sitemap solo se actualiza en una pasada completa (sin filtro por id),
    # para no truncarlo a un subconjunto cuando se prueba con un alimento suelto.
    if not objetivo_ids:
        sitemap_path = os.path.join(ROOT, "sitemap.xml")
        with open(sitemap_path, "w", encoding="utf-8") as f:
            f.write(render_sitemap(todas_recetas, extra_urls=urls_sustitutos))
        print(f"  sitemap.xml actualizado con {len(urls_sustitutos)} páginas de sustitutos")


if __name__ == "__main__":
    main()
