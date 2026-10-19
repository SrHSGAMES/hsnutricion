# -*- coding: utf-8 -*-
"""Genera las páginas de rankings de alimentos (alimentos-con-mas-proteinas.html, frutas-con-menos-calorias.html...)
y la página índice rankings.html, a partir de js/data.js.

Uso: py scripts/generar_rankings.py
Ejecútalo DESPUÉS de generar_alimentos.py: el marco de la página (cabecera, menú, pie y ventanas) se toma de
alimento-merluza.html para que los rankings lleven siempre el mismo menú que el resto del sitio.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from generar_recetas import SITE_URL, ROOT, DATA_JS, es, esc, formatear_nombre, slug  # noqa: E402
from generar_sustitutos import parse_foods_full  # noqa: E402
import rankings_lib as RL  # noqa: E402

NOMBRE_METRICA = {"proteinas": "proteína", "kcal": "calorías", "fibra": "fibra", "azucares": "azúcar", "grasas": "grasa", "carbs": "carbohidratos"}
NOTA_METRICA = {
    "proteinas": "La proteína por 100 g depende de si el alimento está seco, crudo o cocido: 100 g de legumbres secas aportan mucha más que 100 g de legumbres cocidas, porque estas llevan agua. Compara siempre con la ración que realmente comes.",
    "kcal": "Las calorías por 100 g bajan cuanta más agua lleva el alimento, por eso las verduras y frutas frescas encabezan estas listas. Lo que importa es la ración y cómo se cocina: freír o añadir aceite cambia mucho las cifras.",
    "fibra": "La fibra por 100 g es mayor en los alimentos secos (legumbres, semillas, frutos secos), pero también se toman en menos cantidad. Una ración de verdura o fruta aporta menos fibra por gramo y mucha más por plato.",
    "azucares": "Los azúcares de la fruta entera vienen con fibra y agua, y no se consideran igual que el azúcar añadido. Esta lista solo ordena por gramos de azúcar por 100 g.",
    "grasas": "Esta lista ordena por gramos de grasa total por 100 g. Para valorar la calidad también importan la grasa saturada y el tipo de carne o de corte, que puedes ver en cada ficha.",
}


def cargar_marco():
    ruta = os.path.join(ROOT, "alimento-merluza.html")
    with open(ruta, encoding="utf-8") as f:
        html = f.read()
    return html[html.index('<div class="bg-decor"'): html.index("<main>") + len("<main>")], html[html.index("</main>"):]


def fmt_valor(clave, v):
    return f"{round(v):g}" if clave == "kcal" else es(round(v, 1))


def badge(rating):
    return f'<span class="badge badge-{rating}" title="Calificación {rating}" style="width:28px;height:28px;font-size:.85rem">{rating}</span>'


def cabecera(titulo, descripcion, url, jsonld):
    return f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="js/analytics.js" defer></script>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9500680534035396"
     crossorigin="anonymous"></script>
<title>{esc(titulo)}</title>
<meta name="description" content="{esc(descripcion)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:title" content="{esc(titulo)}">
<meta property="og:description" content="{esc(descripcion)}">
<meta property="og:image" content="{SITE_URL}/img/banner-hsnutricion.jpg">
<meta property="og:url" content="{url}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="img/favicon.png">
<link rel="preload" href="fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/plus-jakarta-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="css/styles.css">
<script type="application/ld+json">
{json.dumps(jsonld, ensure_ascii=False, indent=2).replace("</", "<\\/")}
</script>
</head>
<body>

'''


def breadcrumb_ld(items):
    return {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": i, "name": nombre, "item": url}
            for i, (nombre, url) in enumerate(items, 1)
        ],
    }


def render_ranking(r, lista, marco, todos_rankings):
    metrica = r["metrica"]
    sentido_desc = r["orden"] == "desc"
    nombre_m = NOMBRE_METRICA[metrica]
    unidad = RL.UNIDAD[metrica]
    primero, ultimo = lista[0], lista[-1]
    n = len(lista)
    url = f'{SITE_URL}/{r["slug"]}.html'
    nombres = [formatear_nombre(f["nombre"]) for f in lista]
    sig = [f"{nombres[i]} ({fmt_valor(metrica, lista[i][metrica])} {unidad})" for i in range(1, min(3, n))]
    top = " y ".join(sig)
    buenos = sum(1 for f in lista if f["rating"] in ("A", "B"))
    orden_txt = "de mayor a menor" if sentido_desc else "de menor a mayor"

    titulo = f'{r["h1"]}: ranking por 100 g | HSNutrición'
    if len(titulo) > 70:
        titulo = f'{r["h1"]}: ranking por 100 g'
    descripcion = (
        f'{r["h1"]}: los {n} {r["sujeto"]} {r["grupo"]} ordenados por {nombre_m} por 100 g, de {nombres[0]} '
        f'({fmt_valor(metrica, primero[metrica])} {unidad}) a {nombres[-1]} ({fmt_valor(metrica, ultimo[metrica])} {unidad}).'
    )
    if len(descripcion) > 160:
        descripcion = f'{r["h1"]}: los {n} {r["sujeto"]} {r["grupo"]} ordenados por {nombre_m} por 100 g, con su calificación nutricional.'

    intro = (
        f'Estos son los {n} {r["sujeto"]} {r["grupo"]} ordenados {orden_txt} {nombre_m} por 100 g. '
        f'{nombres[0]} encabeza la lista con {fmt_valor(metrica, primero[metrica])} {unidad}'
        f'{", seguido de " + top if top else ""}. '
        f'{buenos} de los {n} tienen calificación A o B en HSNutrición.'
    )

    extras = [k for k in ("kcal", "proteinas", "fibra", "carbs") if k != metrica][:2]
    cols = [metrica] + extras
    cabeceras = "".join(f'<th scope="col">{RL.ETIQUETA[k]}</th>' for k in cols)
    filas = []
    for i, f in enumerate(lista, 1):
        celdas = "".join(
            f'<td class="{"ranking-principal" if k == metrica else ""}">{fmt_valor(k, f[k])}</td>' for k in cols
        )
        filas.append(
            f'<tr><th scope="row">{i}</th>'
            f'<td class="ranking-nombre"><a href="alimento-{slug(f["id"])}.html"><span aria-hidden="true">{f.get("emoji", "")}</span> {esc(nombres[i - 1])}</a></td>'
            f'{celdas}<td>{badge(f["rating"])}</td></tr>'
        )

    otros = [x for x in RL.RANKINGS if x["slug"] != r["slug"]]
    chips = "\n".join(f'        <a class="filtro-chip" href="{x["slug"]}.html">{esc(x["h1"])}</a>' for x in otros)

    jsonld = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ItemList",
                "name": r["h1"],
                "description": descripcion,
                "numberOfItems": n,
                "itemListElement": [
                    {"@type": "ListItem", "position": i, "name": nombres[i - 1], "url": f'{SITE_URL}/alimento-{slug(f["id"])}.html'}
                    for i, f in enumerate(lista[:10], 1)
                ],
            },
            breadcrumb_ld([("Inicio", SITE_URL + "/"), ("Rankings", SITE_URL + "/rankings.html"), (r["h1"], url)]),
        ],
    }

    cuerpo = f'''
  <section class="section">
    <div class="container">
      <p class="reveal receta-breadcrumb"><a href="index.html">Inicio</a> › <a href="rankings.html">Rankings de alimentos</a> › {esc(r["h1"])}</p>
      <h1 class="ficha-titulo reveal">{esc(r["h1"])}</h1>
      <p class="section-sub reveal" style="text-align:left;margin:0 0 20px">{esc(intro)}</p>

      <div class="ranking-tabla-wrap reveal">
        <table class="ranking-tabla">
          <caption class="sr-only">{esc(r["h1"])}: valores por 100 g</caption>
          <thead><tr><th scope="col">#</th><th scope="col">Alimento</th>{cabeceras}<th scope="col">Nota</th></tr></thead>
          <tbody>
{chr(10).join(filas)}
          </tbody>
        </table>
      </div>

      <p class="food-motivo">{esc(NOTA_METRICA[metrica])} Todos los valores son por 100 g del alimento tal como aparece en su ficha (crudo, cocido o seco según el caso). La nota A-E de HSNutrición resume la calidad nutricional global, no solo este nutriente.</p>

      <h2 class="ficha-sub">Otros rankings de alimentos</h2>
      <div class="filtro-chips">
{chips}
      </div>
    </div>
  </section>
'''
    prefijo, sufijo = marco
    return cabecera(titulo, descripcion, url, jsonld) + prefijo + cuerpo + sufijo


GRUPOS_HUB = [
    ("Todos los alimentos", lambda r: r["destacado"] if "destacado" in r else False),
    ("Verduras y hortalizas", lambda r: r["slug"].startswith("verduras")),
    ("Frutas", lambda r: r["slug"].startswith("frutas")),
    ("Carnes", lambda r: r["slug"].startswith("carnes")),
    ("Pescados y mariscos", lambda r: r["slug"].startswith("pescados")),
    ("Frutos secos", lambda r: r["slug"].startswith("frutos-secos")),
    ("Legumbres y proteína vegetal", lambda r: r["slug"].startswith("legumbres")),
    ("Lácteos", lambda r: r["slug"].startswith("lacteos")),
    ("Cereales", lambda r: r["slug"].startswith("cereales")),
]


def render_hub(rankings, marco):
    url = f"{SITE_URL}/rankings.html"
    titulo = "Rankings de alimentos: más proteínas, menos calorías y más fibra | HSNutrición"
    if len(titulo) > 70:
        titulo = "Rankings de alimentos por proteínas, calorías y fibra | HSNutrición"
    descripcion = f"{len(RL.RANKINGS)} rankings de alimentos por 100 g: los que tienen más proteínas, menos calorías o más fibra, por categoría y con calificación nutricional."
    secciones = []
    for nombre, pertenece in GRUPOS_HUB:
        items = [r for r in RL.RANKINGS if pertenece(r)]
        if not items:
            continue
        lis = "\n".join(
            f'          <li><a href="{r["slug"]}.html"><b>{esc(r["h1"])}</b></a>'
            f'<span> — {len(rankings[r["slug"]])} alimentos, de {esc(formatear_nombre(rankings[r["slug"]][0]["nombre"]))} '
            f'({fmt_valor(r["metrica"], rankings[r["slug"]][0][r["metrica"]])} {RL.UNIDAD[r["metrica"]]}) a '
            f'{esc(formatear_nombre(rankings[r["slug"]][-1]["nombre"]))} ({fmt_valor(r["metrica"], rankings[r["slug"]][-1][r["metrica"]])} {RL.UNIDAD[r["metrica"]]})</span></li>'
            for r in items
        )
        secciones.append(f'''
      <h2 class="ficha-sub">{esc(nombre)}</h2>
      <ul class="ranking-indice">
{lis}
      </ul>''')
    jsonld = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "name": "Rankings de alimentos",
                "description": descripcion,
                "url": url,
                "hasPart": [{"@type": "ItemList", "name": r["h1"], "url": f'{SITE_URL}/{r["slug"]}.html'} for r in RL.RANKINGS],
            },
            breadcrumb_ld([("Inicio", SITE_URL + "/"), ("Rankings de alimentos", url)]),
        ],
    }
    cuerpo = f'''
  <section class="section">
    <div class="container">
      <p class="reveal receta-breadcrumb"><a href="index.html">Inicio</a> › Rankings de alimentos</p>
      <h1 class="ficha-titulo reveal">Rankings de alimentos</h1>
      <p class="section-sub reveal" style="text-align:left;margin:0 0 20px">¿Qué alimentos tienen más proteínas? ¿Cuáles tienen menos calorías o más fibra? Estas listas ordenan los alimentos de la guía de HSNutrición por 100 g, con la calificación nutricional de cada uno y un enlace a su ficha completa con estudios científicos.</p>
{"".join(secciones)}
    </div>
  </section>
'''
    prefijo, sufijo = marco
    return cabecera(titulo, descripcion, url, jsonld) + prefijo + cuerpo + sufijo


def actualizar_indice_portada(foods):
    """Enlaces rastreables desde la portada a los rankings y a todas las fichas (la guía de la portada se pinta con JS)."""
    ruta = os.path.join(ROOT, "index.html")
    with open(ruta, encoding="utf-8", newline="") as f:
        html = f.read()
    nl = "\r\n" if "\r\n" in html else "\n"
    ini, fin = "<!-- INDICE-ALIMENTOS:INICIO", "<!-- INDICE-ALIMENTOS:FIN -->"
    chips = "\n".join(
        f'        <a class="filtro-chip" href="{r["slug"]}.html">{esc(r["h1"])}</a>' for r in RL.RANKINGS if r.get("destacado")
    )
    orden = sorted(foods.values(), key=lambda f: formatear_nombre(f["nombre"]).lower())
    lis = "\n".join(
        f'          <li><a href="alimento-{slug(f["id"])}.html">{esc(formatear_nombre(f["nombre"]))}</a></li>' for f in orden
    )
    bloque = f'''{ini} (generado por scripts/generar_rankings.py) -->
      <div class="indice-alimentos">
        <h3 class="ficha-sub">Rankings de alimentos</h3>
        <div class="filtro-chips">
{chips}
        <a class="filtro-chip" href="rankings.html">Todos los rankings →</a>
        </div>
        <details class="indice-alimentos-det">
          <summary>Índice de todos los alimentos (A-Z)</summary>
          <ul class="indice-alimentos-lista">
{lis}
          </ul>
        </details>
      </div>
      {fin}'''.replace("\n", nl)
    if ini in html:
        i = html.index(ini)
        j = html.index(fin) + len(fin)
        html = html[:i] + bloque + html[j:]
    else:
        ancla = '<div class="guia-grid" id="guiaGrid"></div>'
        assert html.count(ancla) == 1
        html = html.replace(ancla, ancla + nl + nl + "      " + bloque)
    with open(ruta, "w", encoding="utf-8", newline="") as f:
        f.write(html)


def main():
    foods = parse_foods_full(DATA_JS)
    rankings = RL.calcular(foods)
    marco = cargar_marco()
    for r in RL.RANKINGS:
        lista = rankings[r["slug"]]
        if len(lista) < 8:
            print(f"  AVISO: {r['slug']} tiene solo {len(lista)} alimentos")
            continue
        with open(os.path.join(ROOT, f'{r["slug"]}.html'), "w", encoding="utf-8") as f:
            f.write(render_ranking(r, lista, marco, rankings))
        print(f'  {r["slug"]}.html — {len(lista)} alimentos')
    with open(os.path.join(ROOT, "rankings.html"), "w", encoding="utf-8") as f:
        f.write(render_hub(rankings, marco))
    actualizar_indice_portada(foods)
    print(f"Total: {len(RL.RANKINGS)} rankings + índice")


if __name__ == "__main__":
    main()
