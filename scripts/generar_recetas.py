# -*- coding: utf-8 -*-
"""Genera una página HTML estática por receta (receta-<id-con-guiones>.html)
a partir de js/data.js y js/recetas.js, para que cada receta tenga su propia
URL indexable por buscadores (en vez de vivir solo dentro de una SPA).

Uso: py scripts/generar_recetas.py
Requiere conexión a internet (consulta /api/community-foods en producción
para resolver ingredientes generados por la IA, p.ej. "ia_tomate").
"""
import datetime
import glob
import json
import os
import re
import subprocess
import urllib.request

SITE_URL = "https://www.hsnutricion.com"

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_JS = os.path.join(ROOT, "js", "data.js")
RECETAS_JS = os.path.join(ROOT, "js", "recetas.js")
COMMUNITY_URL = f"{SITE_URL}/api/community-foods"

MACRO_KEYS = ["kcal", "carbs", "azucares", "proteinas", "grasas", "grasasSat", "fibra", "sodio"]
ESCALAS = {"kcal": 900, "carbs": 100, "proteinas": 40, "grasas": 100, "fibra": 12}
ETIQUETAS = {"kcal": "Calorías", "carbs": "Carbohidratos", "proteinas": "Proteínas", "grasas": "Grasas", "fibra": "Fibra"}
CONECTORES = {"de", "del", "la", "el", "los", "las", "y", "e", "o", "u", "en", "a", "al", "con", "sin", "por", "para", "un", "una", "unos", "unas"}


def formatear_nombre(nombre):
    idx = nombre.find("(")
    principal = (nombre[:idx] if idx != -1 else nombre).strip()
    parentesis = (nombre[idx:] if idx != -1 else "").lower()
    palabras = []
    for i, palabra in enumerate(p for p in principal.split(" ") if p):
        es_sigla = len(palabra) >= 2 and palabra == palabra.upper() and palabra != palabra.lower()
        if es_sigla:
            palabras.append(palabra)
        else:
            low = palabra.lower()
            palabras.append(low if (i > 0 and low in CONECTORES) else low[0].upper() + low[1:])
    resultado = " ".join(palabras)
    return f"{resultado} {parentesis}" if parentesis else resultado


def _chunk_between_ids(text, start_marker="const FOODS = [", end_marker="\n];"):
    start = text.index(start_marker) + len(start_marker)
    end = text.index(end_marker, start)
    body = text[start:end]
    ids = [m.start() for m in re.finditer(r'\bid: "', body)]
    ids.append(len(body))
    return [body[ids[i]:ids[i + 1]] for i in range(len(ids) - 1)]


def parse_foods(path):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    foods = {}
    for chunk in _chunk_between_ids(text):
        food_id = re.search(r'id: "([^"]+)"', chunk).group(1)
        nombre = re.search(r'nombre: "((?:[^"\\]|\\.)*)"', chunk).group(1)
        emoji = re.search(r'emoji: "([^"]*)"', chunk).group(1)
        rating = re.search(r'rating: "([A-E])"', chunk).group(1)
        macros = {}
        for key in MACRO_KEYS:
            m = re.search(rf'\b{key}: (-?[\d.]+)', chunk)
            macros[key] = float(m.group(1)) if m else 0.0
        foods[food_id] = {"id": food_id, "nombre": nombre, "emoji": emoji, "rating": rating, **macros}
    return foods


def fetch_community_foods():
    req = urllib.request.Request(COMMUNITY_URL, headers={"User-Agent": "hsnutricion-build"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    out = {}
    for item in data.get("alimentos", []):
        f = item.get("food") or {}
        if not f.get("id"):
            continue
        macros = {k: float(f.get(k) or 0) for k in MACRO_KEYS}
        out[f["id"]] = {"id": f["id"], "nombre": f.get("nombre", f["id"]), "emoji": f.get("emoji", "🍽️"), "rating": f.get("rating", "?"), **macros}
    return out


def _extract_str(chunk, key, required=True):
    m = re.search(rf'{key}: "((?:[^"\\]|\\.)*)"', chunk)
    if m:
        return m.group(1).replace('\\"', '"')
    if required:
        raise ValueError(f"No se encontró {key} en: {chunk[:80]}")
    return None


def parse_recetas(path):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    start = text.index("const RECETAS = [") + len("const RECETAS = [")
    end = text.rindex("];")
    body = text[start:end]

    # Divide por objetos de receta de nivel superior (contando llaves).
    recetas = []
    depth = 0
    obj_start = None
    for i, ch in enumerate(body):
        if ch == "{":
            if depth == 0:
                obj_start = i
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0 and obj_start is not None:
                recetas.append(body[obj_start:i + 1])
                obj_start = None

    out = []
    for chunk in recetas:
        receta_id = _extract_str(chunk, "id")
        ingredientes_block = re.search(r"ingredientes: \[(.*?)\n\s*\],", chunk, re.S).group(1)
        ingredientes = []
        for im in re.finditer(r'\{\s*foodId: "([^"]+)", cantidad: ([\d.]+)(, opcional: true)?\s*\}', ingredientes_block):
            ingredientes.append({"foodId": im.group(1), "cantidad": float(im.group(2)), "opcional": bool(im.group(3))})

        pasos_block = re.search(r"pasos: \[(.*?)\n\s*\]", chunk, re.S).group(1)
        pasos = [m.group(1).replace('\\"', '"') for m in re.finditer(r'"((?:[^"\\]|\\.)*)"', pasos_block)]

        faqs = []
        faqs_match = re.search(r"faqs: \[(.*?)\n\s*\]", chunk, re.S)
        if faqs_match:
            for fm in re.finditer(
                r'\{\s*pregunta: "((?:[^"\\]|\\.)*)",\s*respuesta: "((?:[^"\\]|\\.)*)"\s*\}',
                faqs_match.group(1), re.S
            ):
                faqs.append({
                    "pregunta": fm.group(1).replace('\\"', '"'),
                    "respuesta": fm.group(2).replace('\\"', '"'),
                })

        out.append({
            "id": receta_id,
            "nombre": _extract_str(chunk, "nombre"),
            "imagen": _extract_str(chunk, "imagen", required=False),
            "emojiPortada": _extract_str(chunk, "emojiPortada"),
            "rating": _extract_str(chunk, "rating"),
            "tiempo": _extract_str(chunk, "tiempo"),
            "raciones": int(re.search(r"raciones: (\d+)", chunk).group(1)),
            "mostrarPorRacion": bool(re.search(r"mostrarPorRacion: true", chunk)),
            "descripcion": _extract_str(chunk, "descripcion"),
            "motivo": _extract_str(chunk, "motivo"),
            "ingredientes": ingredientes,
            "pasos": pasos,
            "faqs": faqs,
        })
    return out


def calcular_macros(receta, foods):
    totales = {k: 0.0 for k in MACRO_KEYS}
    completo = True
    for ing in receta["ingredientes"]:
        food = foods.get(ing["foodId"])
        if not food:
            completo = False
            continue
        factor = ing["cantidad"] / 100
        for k in MACRO_KEYS:
            totales[k] += food[k] * factor
    for k in MACRO_KEYS:
        totales[k] = round(totales[k] * 10) / 10
    return totales, completo


def pct(clave, valor):
    maximo = ESCALAS.get(clave, 100)
    return max(2, min(100, (valor / maximo) * 100))


def esc(s):
    return (s or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def slug(receta_id):
    return receta_id.replace("_", "-")


def parse_duration_iso(tiempo):
    """Convierte "10 min" / "1 h" (tal y como se escriben en recetas.js) al
    formato de duración ISO 8601 que espera Schema.org (p.ej. "PT10M")."""
    m = re.search(r"(\d+)\s*h", tiempo)
    if m:
        return f"PT{m.group(1)}H"
    m = re.search(r"(\d+)\s*min", tiempo)
    if m:
        return f"PT{m.group(1)}M"
    return None


def fecha_publicacion_git(receta_id):
    """Fecha real (AAAA-MM-DD) del primer commit que añadió esta receta a
    recetas.js — se usa tal cual para datePublished, sin inventar fechas."""
    try:
        out = subprocess.run(
            ["git", "log", "--format=%ad", "--date=short", "--reverse",
             "-S", f'id: "{receta_id}"', "--", RECETAS_JS],
            cwd=ROOT, capture_output=True, text=True, timeout=15
        )
        lineas = [l for l in out.stdout.strip().splitlines() if l]
        return lineas[0] if lineas else None
    except Exception:
        return None


def build_recipe_jsonld(receta, foods, totales):
    ingredientes_txt = []
    for ing in receta["ingredientes"]:
        food = foods.get(ing["foodId"])
        nombre = formatear_nombre(food["nombre"]) if food else ing["foodId"]
        sufijo = " (opcional)" if ing["opcional"] else ""
        ingredientes_txt.append(f'{ing["cantidad"]:g} g de {nombre}{sufijo}')

    data = {
        "@context": "https://schema.org",
        "@type": "Recipe",
        "name": receta["nombre"],
        "description": receta["descripcion"],
        "recipeYield": f'{receta["raciones"]:g} {"raciones" if receta["raciones"] > 1 else "ración"}',
        "recipeIngredient": ingredientes_txt,
        "recipeInstructions": [{"@type": "HowToStep", "text": p} for p in receta["pasos"]],
        "author": {"@type": "Organization", "name": "HSNutrición", "url": SITE_URL},
        "nutrition": {
            "@type": "NutritionInformation",
            "calories": f'{totales["kcal"]:g} kcal',
            "carbohydrateContent": f'{totales["carbs"]:g} g',
            "proteinContent": f'{totales["proteinas"]:g} g',
            "fatContent": f'{totales["grasas"]:g} g',
            "saturatedFatContent": f'{totales["grasasSat"]:g} g',
            "sugarContent": f'{totales["azucares"]:g} g',
            "fiberContent": f'{totales["fibra"]:g} g',
            "sodiumContent": f'{totales["sodio"]:g} mg',
        },
    }
    if receta["imagen"]:
        data["image"] = [f'{SITE_URL}/{receta["imagen"]}']
    duracion = parse_duration_iso(receta["tiempo"])
    if duracion:
        data["totalTime"] = duracion
    fecha = fecha_publicacion_git(receta["id"])
    if fecha:
        data["datePublished"] = fecha
    return data


def construir_faqs(receta, totales):
    """Primera FAQ calculada a partir de los macros reales (para que no quede
    desactualizada si se ajusta la receta), seguida de las FAQ escritas a mano
    en recetas.js."""
    if receta["mostrarPorRacion"] and receta["raciones"] > 1:
        por_racion_kcal = round(totales["kcal"] / receta["raciones"], 1)
        respuesta_cal = (
            f'Toda la receta de {receta["nombre"]} tiene {totales["kcal"]:g} kcal repartidas en '
            f'{receta["raciones"]} raciones, es decir, unas {por_racion_kcal:g} kcal por ración.'
        )
    else:
        raciones_txt = f'{receta["raciones"]} raciones' if receta["raciones"] > 1 else "1 ración"
        respuesta_cal = f'Esta receta tiene {totales["kcal"]:g} kcal en total ({raciones_txt}).'

    faq_calorias = {
        "pregunta": f'¿Cuántas calorías tiene la receta de {receta["nombre"]}?',
        "respuesta": respuesta_cal,
    }
    return [faq_calorias] + receta["faqs"]


def build_faq_jsonld(faqs):
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": faq["pregunta"],
                "acceptedAnswer": {"@type": "Answer", "text": faq["respuesta"]},
            }
            for faq in faqs
        ],
    }


def render_ingrediente(ing, foods):
    food = foods.get(ing["foodId"])
    li_class = ' class="ingrediente-opcional"' if ing["opcional"] else ""
    if food:
        opcional_tag = '<span class="ingrediente-opcional-tag">Opcional</span>' if ing["opcional"] else ""
        return f'''      <li{li_class}>
        <button type="button" class="ingrediente-link" data-food-id="{esc(food["id"])}">
          <span class="food-emoji">{food["emoji"]}</span> {esc(formatear_nombre(food["nombre"]))}
          {opcional_tag}
        </button>
        <span class="ingrediente-cantidad">{ing["cantidad"]:g} g</span>
      </li>'''
    return f'''      <li{li_class}>
        <span class="ingrediente-pendiente">{esc(ing["foodId"])} (cargando…)</span>
        <span class="ingrediente-cantidad">{ing["cantidad"]:g} g</span>
      </li>'''


def render_macro_row(clave, valor):
    unidad = "kcal" if clave == "kcal" else "g"
    return f'''      <div class="macro-row">
        <div class="macro-row-head"><b>{ETIQUETAS[clave]}</b><span>{valor:g} {unidad}</span></div>
        <div class="macro-track"><div class="macro-fill fill-{clave}" style="width:{pct(clave, valor):.1f}%"></div></div>
      </div>'''


def elegir_relacionadas(receta, todas_recetas, n=3):
    """Prioriza otras recetas que comparten ingredientes (misma comunidad de
    sabores/dieta); si no hay suficientes, completa con el resto en orden."""
    propios = {i["foodId"] for i in receta["ingredientes"]}
    otras = [r for r in todas_recetas if r["id"] != receta["id"]]

    def puntuacion(r):
        return len(propios & {i["foodId"] for i in r["ingredientes"]})

    otras.sort(key=puntuacion, reverse=True)
    return otras[:n]


def render_receta_teaser(receta):
    if receta["imagen"]:
        foto_html = f'<img src="{esc(receta["imagen"])}" alt="{esc(receta["nombre"])}" loading="lazy">'
    else:
        foto_html = f'<span class="receta-foto-emoji">{receta["emojiPortada"]}</span>'
    return f'''      <a class="receta-teaser-card" href="receta-{slug(receta["id"])}.html">
        <div class="receta-teaser-foto">
          {foto_html}
          <span class="badge badge-{receta["rating"]} receta-teaser-badge" title="Calificación nutricional">{receta["rating"]}</span>
        </div>
        <div class="receta-teaser-info">
          <h3>{esc(receta["nombre"])}</h3>
          <span class="receta-meta">⏱️ {esc(receta["tiempo"])}</span>
        </div>
      </a>'''


def render_pagina(receta, foods, todas_recetas):
    totales, completo = calcular_macros(receta, foods)
    raciones_txt = f'{receta["raciones"]} {"raciones" if receta["raciones"] > 1 else "ración"}'

    if receta["imagen"]:
        foto_html = f'<img src="{esc(receta["imagen"])}" alt="{esc(receta["nombre"])}" loading="lazy">'
    else:
        foto_html = f'<span class="receta-foto-emoji">{receta["emojiPortada"]}</span>'

    ingredientes_html = "\n".join(render_ingrediente(i, foods) for i in receta["ingredientes"])
    pasos_html = "\n".join(f'      <li>{esc(p)}</li>' for p in receta["pasos"])
    macros_html = "\n".join(render_macro_row(k, totales[k]) for k in ["kcal", "carbs", "proteinas", "grasas", "fibra"])
    incompleto_txt = ' <span style="color:var(--ink-faint)">(recalculando…)</span>' if not completo else ""

    por_racion_html = ""
    if receta["mostrarPorRacion"] and receta["raciones"] > 1:
        por_racion = {k: round(totales[k] / receta["raciones"], 1) for k in MACRO_KEYS}
        macros_racion_html = "\n".join(render_macro_row(k, por_racion[k]) for k in ["kcal", "carbs", "proteinas", "grasas", "fibra"])
        por_racion_html = f'''
            <h4>Información nutricional (por ración)</h4>
            <div class="macro-table">
{macros_racion_html}
              <p class="food-motivo" style="margin-top:0">De las grasas, <b>{por_racion["grasasSat"]:g} g</b> son saturadas · de los carbohidratos, <b>{por_racion["azucares"]:g} g</b> son azúcares · sodio: <b>{por_racion["sodio"]:g} mg</b></p>
            </div>'''

    faqs = construir_faqs(receta, totales)
    faq_html = "\n".join(
        f'''      <details>
        <summary>{esc(faq["pregunta"])}</summary>
        <p>{esc(faq["respuesta"])}</p>
      </details>'''
        for faq in faqs
    )
    faq_jsonld = json.dumps(build_faq_jsonld(faqs), ensure_ascii=False, indent=2).replace("</", "<\\/")

    og_image = f'{SITE_URL}/{receta["imagen"]}' if receta["imagen"] else f'{SITE_URL}/img/banner-hsnutricion.jpg'
    page_url = f'{SITE_URL}/receta-{slug(receta["id"])}.html'

    jsonld = json.dumps(build_recipe_jsonld(receta, foods, totales), ensure_ascii=False, indent=2)
    jsonld = jsonld.replace("</", "<\\/")  # por si algún texto contuviera "</script>" literal

    relacionadas = elegir_relacionadas(receta, todas_recetas)
    relacionadas_html = "\n".join(render_receta_teaser(r) for r in relacionadas)

    return f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(receta["nombre"])} — Receta Saludable | HSNutrición</title>
<meta name="description" content="{esc(receta["descripcion"])}">
<link rel="canonical" href="{page_url}">
<meta property="og:type" content="article">
<meta property="og:title" content="{esc(receta["nombre"])} — HSNutrición">
<meta property="og:description" content="{esc(receta["descripcion"])}">
<meta property="og:image" content="{og_image}">
<meta property="og:url" content="{page_url}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/styles.css">
<script type="application/ld+json">
{jsonld}
</script>
<script type="application/ld+json">
{faq_jsonld}
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
      <p class="reveal receta-breadcrumb"><a href="recetas.html">← Todas las recetas</a></p>

      <div class="recetas-grid">
        <article class="receta-card" id="{esc(receta["id"])}">
          <div class="receta-foto">{foto_html}</div>
          <div class="receta-body">
            <div class="receta-head">
              <h1>{esc(receta["nombre"])}</h1>
              <span class="badge badge-{receta["rating"]}" title="Calificación nutricional de la receta">{receta["rating"]}</span>
            </div>
            <p class="receta-meta">⏱️ {esc(receta["tiempo"])} · 🍽️ {raciones_txt}</p>
            <p class="receta-desc">{esc(receta["descripcion"])}</p>
            <p class="food-motivo">{esc(receta["motivo"])}</p>

            <div class="receta-columnas">
              <div>
                <h4>Ingredientes <span class="receta-hint">(toca el nombre para ver su ficha)</span></h4>
                <ul class="receta-ingredientes">
{ingredientes_html}
                </ul>
              </div>
              <div>
                <h4>Elaboración</h4>
                <ol class="receta-pasos">
{pasos_html}
                </ol>
              </div>
            </div>

            <h4>Información nutricional (receta completa{", " + str(receta["raciones"]) + " raciones" if receta["raciones"] > 1 else ""})</h4>
            <div class="macro-table">
{macros_html}
              <p class="food-motivo" style="margin-top:0">De las grasas, <b>{totales["grasasSat"]:g} g</b> son saturadas · de los carbohidratos, <b>{totales["azucares"]:g} g</b> son azúcares · sodio: <b>{totales["sodio"]:g} mg</b>{incompleto_txt}</p>
            </div>{por_racion_html}

            <h4>Preguntas frecuentes</h4>
            <div class="receta-faq">
{faq_html}
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section section-tinted">
    <div class="container">
      <h2 class="section-title reveal">Recetas relacionadas</h2>
      <div class="recetas-teaser-grid">
{relacionadas_html}
      </div>
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

<!-- MODAL FICHA DE INGREDIENTE -->
<div class="modal-overlay" id="fichaModalOverlay" hidden>
  <div class="modal modal-ficha" role="dialog" aria-modal="true">
    <button class="modal-close" id="fichaModalClose" aria-label="Cerrar">✕</button>
    <div id="fichaModalContenido"></div>
  </div>
</div>

<script src="js/data.js"></script>
<script src="js/recetas.js"></script>
<script src="js/app.js"></script>
</body>
</html>
'''


def render_sitemap(recetas, extra_urls=None):
    hoy = datetime.date.today().isoformat()
    urls = [
        {"loc": f"{SITE_URL}/", "prioridad": "1.0"},
        {"loc": f"{SITE_URL}/recetas.html", "prioridad": "0.8"},
    ]
    for receta in recetas:
        urls.append({"loc": f'{SITE_URL}/receta-{slug(receta["id"])}.html', "prioridad": "0.7"})
    if extra_urls:
        urls.extend(extra_urls)

    entradas = "\n".join(
        f'  <url>\n'
        f'    <loc>{u["loc"]}</loc>\n'
        f'    <lastmod>{hoy}</lastmod>\n'
        f'    <priority>{u["prioridad"]}</priority>\n'
        f'  </url>'
        for u in urls
    )
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{entradas}
</urlset>
'''


def main():
    foods = parse_foods(DATA_JS)
    print(f"Alimentos base: {len(foods)}")
    try:
        comunidad = fetch_community_foods()
        print(f"Alimentos de la comunidad: {len(comunidad)}")
        foods.update(comunidad)
    except Exception as e:
        print(f"AVISO: no se pudieron cargar los alimentos de la comunidad ({e}). Algunos ingredientes pueden faltar.")

    recetas = parse_recetas(RECETAS_JS)
    print(f"Recetas: {len(recetas)}")

    for receta in recetas:
        html = render_pagina(receta, foods, recetas)
        filename = f'receta-{slug(receta["id"])}.html'
        path = os.path.join(ROOT, filename)
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        faltantes = [i["foodId"] for i in receta["ingredientes"] if i["foodId"] not in foods]
        estado = f"FALTAN: {faltantes}" if faltantes else "OK"
        print(f"  {filename} — {estado}")

    # Las páginas de sustitutos las genera un script aparte (generar_sustitutos.py);
    # se detectan aquí por archivo para que el sitemap quede completo sin importar
    # qué script se ejecute último ni en qué orden.
    urls_sustitutos = [
        {"loc": f"{SITE_URL}/{os.path.basename(p)}", "prioridad": "0.6"}
        for p in sorted(glob.glob(os.path.join(ROOT, "sustituto-*.html")))
    ]

    sitemap_path = os.path.join(ROOT, "sitemap.xml")
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(render_sitemap(recetas, extra_urls=urls_sustitutos))
    print(f"  sitemap.xml — {len(recetas) + 2 + len(urls_sustitutos)} URLs")


if __name__ == "__main__":
    main()
