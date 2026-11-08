# -*- coding: utf-8 -*-
"""Genera las páginas de lista que responden a búsquedas por intención, con el número en el título:

  recetas-bajas-en-calorias.html, recetas-para-cenar.html, recetas-altas-en-proteinas.html, recetas-veganas.html,
  recetas-vegetarianas.html, recetas-para-desayunar.html, recetas-rapidas.html, recetas-con-legumbres.html,
  recetas-con-pescado.html, alimentos-saludables.html y alimentos-poco-saludables.html.

Todo sale de js/recetas.js y js/data.js (los números del título cambian solos si cambia el catálogo) y cada
lista indica su criterio. También escribe las tarjetas de imagen (img/listas/*.jpg) y enlaza las listas desde
recetas.html e index.html.

Uso: py scripts/generar_listas.py
Ejecútalo DESPUÉS de generar_alimentos.py (el marco de la página se toma de alimento-merluza.html).
"""
import json
import os
import re
import statistics
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from generar_recetas import (  # noqa: E402
    SITE_URL, ROOT, DATA_JS, RECETAS_JS, LINEA_REVISION, REVISION_ISO, es, esc, formatear_nombre, slug,
    parse_recetas, parse_foods, calcular_macros, render_recetas_paginadas,
)
from generar_sustitutos import parse_foods_full  # noqa: E402
from generar_alimentos import render_faq  # noqa: E402
import generar_rankings as GR  # noqa: E402
import generar_tarjetas as GT  # noqa: E402

LEGUMBRES = {"lentejas", "lentejas_cocidas", "garbanzos", "alubias", "judias_pintas", "habas", "edamame"}
PESCADO = {
    "merluza", "salmon", "atun", "bacalao", "sardina", "caballa", "trucha", "dorada", "lubina", "anchoas", "lenguado", "rape",
    "gambas", "mejillones", "almejas", "calamar", "pulpo", "sepia", "salmon_ahumado", "boquerones", "langostinos", "mero", "pez_espada",
}
EXCLUIR_SECOS = re.compile(r"_seco$|_seca$")
ORDEN_NOTA = {"A": 0, "B": 1, "C": 2, "D": 3, "E": 4}


def _base(food_id):
    return food_id[3:] if food_id.startswith("ia_") else food_id


# ---------- datos de recetas ----------
def minutos(tiempo):
    h = re.search(r"(\d+)\s*h", tiempo)
    m = re.search(r"(\d+)\s*min", tiempo)
    return (int(h.group(1)) * 60 if h else 0) + (int(m.group(1)) if m else 0)


def cargar_recetas():
    js = ("const fs=require('fs'),vm=require('vm');const c={window:{}};vm.createContext(c);"
          "vm.runInContext(fs.readFileSync(process.argv[1],'utf8')+';this.R=RECETAS',c);"
          "console.log(JSON.stringify(c.R.map(r=>({id:r.id,etiquetas:r.etiquetas||[],momento:r.momento||[]}))))")
    salida = subprocess.run(["node", "-e", js, RECETAS_JS], capture_output=True, text=True, encoding="utf-8", check=True).stdout
    extras = {e["id"]: e for e in json.loads(salida)}
    foods = parse_foods(DATA_JS)
    recetas = parse_recetas(RECETAS_JS)
    for r in recetas:
        r["etiquetas"] = extras[r["id"]]["etiquetas"]
        r["momento"] = extras[r["id"]]["momento"]
        tot, _ = calcular_macros(r, foods)
        n = max(r["raciones"], 1)
        r["kcal_r"] = tot["kcal"] / n
        r["prot_r"] = tot["proteinas"] / n
        r["fibra_r"] = tot["fibra"] / n
        r["min"] = minutos(r["tiempo"])
        r["ids"] = {_base(i["foodId"]) for i in r["ingredientes"]}
    return recetas


def kcal_txt(r):
    return f'{round(r["kcal_r"]):g} kcal'


def prot_txt(r):
    return f'{es(round(r["prot_r"]))} g de proteína'


def min_txt(r):
    return r["tiempo"]


# ---------- listas de recetas ----------
def _nota_y_nombre(r):
    return (ORDEN_NOTA[r["rating"]], r["nombre"])


LISTAS_RECETAS = [
    dict(
        slug="recetas-bajas-en-calorias", h1="Recetas bajas en calorías", emoji="🥗",
        titulo=lambda n: f"{n} recetas bajas en calorías (350 kcal o menos por ración)",
        desc="recetas bajas en calorías", crit_corto="350 kcal o menos por ración",
        filtro=lambda r: r["kcal_r"] <= 350, orden=lambda r: (r["kcal_r"], r["nombre"]), metrica=kcal_txt,
        criterio=("Consideramos baja en calorías una receta de 350 kcal o menos por ración. Las calorías salen de sumar los ingredientes de cada receta "
                  "(cantidad × valores por 100 g de su ficha) y dividir entre las raciones. No existe un umbral oficial para platos: en el etiquetado europeo, "
                  "«bajo en calorías» se aplica a alimentos con 40 kcal o menos por 100 g."),
        faqs=lambda L: [
            ("¿Qué recetas bajas en calorías hay en HSNutrición?",
             f'Hay {len(L)} con 350 kcal o menos por ración, desde {L[0]["nombre"]} ({kcal_txt(L[0])}) hasta {L[-1]["nombre"]} ({kcal_txt(L[-1])}).'),
            ("¿Una receta baja en calorías es siempre saludable?",
             "No necesariamente. Las calorías son solo una parte: la nota de la A a la E también valora la fibra, la calidad de las grasas, los azúcares y el sodio, "
             "por eso junto a cada receta verás su nota."),
        ],
    ),
    dict(
        slug="recetas-para-cenar", h1="Recetas saludables para cenar", emoji="🌙",
        titulo=lambda n: f"{n} recetas saludables para cenar, con macros por ración",
        desc="recetas saludables para cenar", crit_corto="platos pensados para la cena",
        filtro=lambda r: "cena" in r["momento"], orden=_nota_y_nombre, metrica=None,
        criterio=("Incluimos las recetas pensadas para la cena (cada receta indica en qué momentos del día encaja), con sus calorías por ración y su nota "
                  "de la A a la E. Los macros salen de sumar los ingredientes de cada receta y dividir entre las raciones."),
        faqs=lambda L: [
            ("¿Cuántas calorías tienen las recetas para cenar?",
             f'Van de {round(min(r["kcal_r"] for r in L)):g} a {round(max(r["kcal_r"] for r in L)):g} kcal por ración; la mediana es '
             f'{round(statistics.median(r["kcal_r"] for r in L)):g} kcal. Si buscas algo más ligero, tienes nuestra lista de recetas bajas en calorías.'),
            ("¿Cuántas recetas para cenar tienen nota A?",
             f'{sum(1 for r in L if r["rating"] == "A")} de las {len(L)} tienen nota A; la nota valora la fibra, las grasas, los azúcares y el sodio del plato.'),
        ],
    ),
    dict(
        slug="recetas-altas-en-proteinas", h1="Recetas altas en proteínas", emoji="💪",
        titulo=lambda n: f"{n} recetas altas en proteínas (25 g o más por ración)",
        desc="recetas altas en proteínas", crit_corto="25 g o más de proteína por ración",
        filtro=lambda r: r["prot_r"] >= 25, orden=lambda r: (-r["prot_r"], r["nombre"]), metrica=prot_txt,
        criterio=("Consideramos alta en proteínas una receta con 25 g o más de proteína por ración, calculada sumando los ingredientes de cada ficha. "
                  "La referencia europea para un adulto sano es de 0,83 g de proteína por kg de peso y día (unos 58 g para 70 kg); "
                  "cada receta de esta lista aporta una parte importante de esa cantidad."),
        faqs=lambda L: [
            ("¿Cuánta proteína tiene una receta alta en proteínas?",
             f'Aquí consideramos 25 g o más por ración: de {es(round(L[-1]["prot_r"]))} g ({L[-1]["nombre"]}) a {es(round(L[0]["prot_r"]))} g ({L[0]["nombre"]}).'),
            ("¿Cuánta proteína necesito al día?",
             "Para un adulto sano, la referencia europea es de 0,83 g por kg de peso al día. Las necesidades cambian con la edad, el deporte y las enfermedades "
             "(por ejemplo, en la enfermedad renal conviene consultar antes): tienes los detalles y los riesgos en nuestra guía de proteínas."),
        ],
        extra=('<p class="food-motivo">Más información: <a href="guia-proteinas.html">guía de proteínas: cuánta necesitas, de dónde sacarla y cuándo tener cuidado</a> · '
               '<a href="alimentos-con-mas-proteinas.html">alimentos con más proteínas</a>.</p>'),
    ),
    dict(
        slug="recetas-veganas", h1="Recetas veganas saludables", emoji="🌱",
        titulo=lambda n: f"{n} recetas veganas saludables, con macros por ración",
        desc="recetas veganas saludables", crit_corto="sin ingredientes de origen animal",
        filtro=lambda r: "vegano" in r["etiquetas"], orden=_nota_y_nombre, metrica=None,
        criterio=("Marcamos como vegana la receta cuyos ingredientes no son de origen animal. Los macros salen de sumar los ingredientes de cada ficha "
                  "y dividir entre las raciones, y cada receta lleva su nota de la A a la E."),
        faqs=lambda L: [
            ("¿Cuántas recetas veganas hay en HSNutrición?",
             f'Hay {len(L)}, de {round(min(r["kcal_r"] for r in L)):g} a {round(max(r["kcal_r"] for r in L)):g} kcal por ración; '
             f'{sum(1 for r in L if r["rating"] == "A")} tienen nota A.'),
            ("¿Las recetas veganas son más saludables?",
             "No por ser veganas: depende de los ingredientes. La nota de la A a la E valora cada receta por su contenido en fibra, grasas, azúcares y sodio, "
             "sea o no vegana."),
        ],
    ),
    dict(
        slug="recetas-vegetarianas", h1="Recetas vegetarianas saludables", emoji="🥦",
        titulo=lambda n: f"{n} recetas vegetarianas saludables (incluye las veganas)",
        desc="recetas vegetarianas saludables", crit_corto="sin carne ni pescado",
        filtro=lambda r: "vegetariano" in r["etiquetas"] or "vegano" in r["etiquetas"], orden=_nota_y_nombre, metrica=None,
        criterio=("Incluimos las recetas sin carne ni pescado: las vegetarianas, que pueden llevar huevo o lácteos, y las veganas, que no llevan ningún ingrediente animal. "
                  "Los macros salen de sumar los ingredientes de cada ficha y dividir entre las raciones."),
        faqs=lambda L: [
            ("¿Cuántas recetas vegetarianas hay en HSNutrición?",
             f'Hay {len(L)} (de ellas, {sum(1 for r in L if "vegano" in r["etiquetas"])} son además veganas), de {round(min(r["kcal_r"] for r in L)):g} '
             f'a {round(max(r["kcal_r"] for r in L)):g} kcal por ración.'),
            ("¿Qué diferencia hay entre vegetariana y vegana?",
             "La receta vegetariana no lleva carne ni pescado pero puede llevar huevo o lácteos; la vegana no lleva ningún ingrediente de origen animal."),
        ],
    ),
    dict(
        slug="recetas-para-desayunar", h1="Recetas saludables para desayunar", emoji="🌅",
        titulo=lambda n: f"{n} recetas saludables para desayunar, con macros por ración",
        desc="recetas saludables para desayunar", crit_corto="platos pensados para el desayuno",
        filtro=lambda r: "desayuno" in r["momento"], orden=_nota_y_nombre, metrica=None,
        criterio=("Incluimos las recetas pensadas para el desayuno (cada receta indica en qué momentos del día encaja), con sus calorías por ración y su nota "
                  "de la A a la E. Hay gachas y overnight oats, bowls de fruta con yogur y tostadas, entre otras."),
        faqs=lambda L: [
            ("¿Cuántas calorías tienen los desayunos saludables?",
             f'Las {len(L)} recetas van de {round(min(r["kcal_r"] for r in L)):g} a {round(max(r["kcal_r"] for r in L)):g} kcal por ración; '
             f'la mediana es {round(statistics.median(r["kcal_r"] for r in L)):g} kcal.'),
            ("¿Cuáles son los desayunos más rápidos?",
             f'{sum(1 for r in L if r["min"] <= 10)} de las {len(L)} recetas se preparan en 10 minutos o menos.'),
        ],
    ),
    dict(
        slug="recetas-rapidas", h1="Recetas rápidas y saludables", emoji="⏱️",
        titulo=lambda n: f"{n} recetas rápidas y saludables (15 minutos o menos)",
        desc="recetas rápidas y saludables", crit_corto="15 minutos o menos",
        filtro=lambda r: 0 < r["min"] <= 15, orden=lambda r: (r["min"], r["nombre"]), metrica=min_txt,
        criterio=("Incluimos las recetas que se preparan en 15 minutos o menos (el tiempo total que indica cada receta). "
                  "Los macros salen de sumar los ingredientes de cada ficha y dividir entre las raciones."),
        faqs=lambda L: [
            ("¿Cuántas recetas rápidas hay en HSNutrición?",
             f'Hay {len(L)} que se preparan en 15 minutos o menos; {sum(1 for r in L if r["min"] <= 10)} de ellas, en 10 minutos o menos.'),
            ("¿Las recetas rápidas son saludables?",
             f'Sí, entran todas las recetas de la guía con ese tiempo, y {sum(1 for r in L if r["rating"] == "A")} de las {len(L)} tienen nota A. '
             "La nota valora la fibra, las grasas, los azúcares y el sodio del plato."),
        ],
    ),
    dict(
        slug="recetas-con-legumbres", h1="Recetas con legumbres", emoji="🫘",
        titulo=lambda n: f"{n} recetas con legumbres: lentejas, garbanzos y alubias",
        desc="recetas con legumbres", crit_corto="con lentejas, garbanzos, alubias, judías pintas, habas o edamame",
        filtro=lambda r: bool(r["ids"] & LEGUMBRES), orden=_nota_y_nombre, metrica=None,
        criterio=("Incluimos las recetas con lentejas, garbanzos, alubias, judías pintas, habas o edamame entre sus ingredientes. "
                  "Los macros salen de sumar los ingredientes de cada ficha y dividir entre las raciones."),
        faqs=lambda L: [
            ("¿Cuánta fibra tienen las recetas con legumbres?",
             f'Las {len(L)} recetas aportan de media {es(round(statistics.mean(r["fibra_r"] for r in L), 1))} g de fibra por ración, '
             f'de {es(round(min(r["fibra_r"] for r in L)))} a {es(round(max(r["fibra_r"] for r in L)))} g.'),
            ("¿Qué aportan las legumbres?",
             "Fibra y proteína vegetal. En nuestros rankings puedes ver cuáles tienen más proteína y más fibra por 100 g."),
        ],
        extra=('<p class="food-motivo">Más información: <a href="legumbres-y-proteina-vegetal-con-mas-proteinas.html">legumbres y proteína vegetal con más proteínas</a> · '
               '<a href="legumbres-y-proteina-vegetal-ricas-en-fibra.html">legumbres y proteína vegetal ricas en fibra</a>.</p>'),
    ),
    dict(
        slug="recetas-con-pescado", h1="Recetas con pescado y marisco", emoji="🐟",
        titulo=lambda n: f"{n} recetas con pescado y marisco, con macros por ración",
        desc="recetas con pescado y marisco", crit_corto="con pescado o marisco",
        filtro=lambda r: bool(r["ids"] & PESCADO), orden=_nota_y_nombre, metrica=None,
        criterio=("Incluimos las recetas que llevan pescado o marisco entre sus ingredientes. "
                  "Los macros salen de sumar los ingredientes de cada ficha y dividir entre las raciones."),
        faqs=lambda L: [
            ("¿Cuánta proteína tienen las recetas con pescado?",
             f'Las {len(L)} recetas aportan de media {es(round(statistics.mean(r["prot_r"] for r in L)))} g de proteína por ración, '
             f'de {es(round(min(r["prot_r"] for r in L)))} a {es(round(max(r["prot_r"] for r in L)))} g.'),
            ("¿Qué pescados tienen más proteínas?",
             "Puedes compararlos por 100 g en nuestro ranking de pescados con más proteínas."),
        ],
        extra='<p class="food-motivo">Más información: <a href="pescados-con-mas-proteinas.html">pescados con más proteínas</a> · <a href="pescados-con-menos-calorias.html">pescados con menos calorías</a>.</p>',
    ),
]


# ---------- listas de alimentos ----------
CATEGORIAS_SALUDABLES = [
    ("Verduras y Hortalizas", "Verduras y hortalizas"), ("Frutas", "Frutas"), ("Proteína vegetal", "Legumbres y proteína vegetal"),
    ("Cereales", "Cereales"), ("Frutos Secos", "Frutos secos y semillas"), ("Proteínas", "Pescados y huevos"),
    ("Lácteos", "Lácteos"), ("Grasas", "Grasas y aceites"), ("Bebidas", "Bebidas"), ("Bebidas vegetales", "Bebidas vegetales"),
    ("Snacks", "Snacks"), ("Condimentos y Aditivos", "Condimentos y especias"),
]


def fila_alimento(f, columnas):
    nombre = esc(formatear_nombre(f["nombre"]))
    celdas = "".join(f"<td>{c(f)}</td>" for c in columnas)
    return (f'            <tr><td class="ranking-nombre"><a href="alimento-{slug(f["id"])}.html">{nombre}</a></td>{celdas}'
            f'<td>{GR.badge(f["rating"])}</td></tr>')


def tabla(titulo_h2, filas, cabeceras, extra_clase=""):
    ths = "".join(f'<th scope="col">{c}</th>' for c in cabeceras)
    return f'''
      <h2 class="ficha-sub">{esc(titulo_h2)}</h2>
      <div class="ranking-tabla-wrap reveal">
        <table class="ranking-tabla{extra_clase}">
          <caption class="sr-only">{esc(titulo_h2)}: valores por 100 g</caption>
          <thead><tr><th scope="col" class="col-nombre">Alimento</th>{ths}<th scope="col">Nota</th></tr></thead>
          <tbody>
{chr(10).join(filas)}
          </tbody>
        </table>
      </div>'''


def lista_alimentos_saludables(foods):
    sel = [f for f in foods.values() if f["rating"] == "A" and not EXCLUIR_SECOS.search(f["id"])
           and not (set(f["categorias"]) & {"Suplemento Alimenticio", "Dulces", "Insectos Comestibles"})]
    por_cat = {}
    for f in sel:
        por_cat.setdefault(f["categorias"][0], []).append(f)
    return sel, por_cat


def lista_alimentos_poco_saludables(foods):
    sel = [f for f in foods.values() if f["rating"] in ("D", "E") and not EXCLUIR_SECOS.search(f["id"])]
    por_cat = {}
    for f in sel:
        por_cat.setdefault(f["categorias"][0], []).append(f)
    return sel, por_cat


def primera_frase(txt):
    m = re.match(r"(.+?[.!?])(\s|$)", txt)
    frase = m.group(1) if m else txt
    return frase if len(frase) <= 170 else frase[:167].rsplit(" ", 1)[0] + "…"


def render_pagina_alimentos_saludables(foods, marco, otras):
    sel, por_cat = lista_alimentos_saludables(foods)
    n = len(sel)
    slug_p = "alimentos-saludables"
    h1 = "Alimentos saludables"
    titulo = f"Alimentos saludables: lista de {n} alimentos con nota A"
    cols = [lambda f: f'{round(f["kcal"]):g}', lambda f: es(f["proteinas"]), lambda f: es(f["fibra"])]
    bloques = []
    for cat, etiqueta in CATEGORIAS_SALUDABLES:
        lista = sorted(por_cat.get(cat, []), key=lambda f: formatear_nombre(f["nombre"]).lower())
        if lista:
            bloques.append(tabla(f"{etiqueta} ({len(lista)})", [fila_alimento(f, cols) for f in lista], ["kcal", "Proteínas (g)", "Fibra (g)"]))
    ejemplos = ", ".join(formatear_nombre(f["nombre"]).lower() for f in sorted(por_cat.get("Verduras y Hortalizas", []), key=lambda f: -f["fibra"])[:3])
    respuesta = (f'En la guía de HSNutrición hay {n} alimentos con nota A, la máxima: verduras y hortalizas ({len(por_cat.get("Verduras y Hortalizas", []))}), '
                 f'frutas ({len(por_cat.get("Frutas", []))}), legumbres, cereales integrales, frutos secos, aceite de oliva virgen extra, pescado azul y más.')
    criterio = ("La nota A significa que el alimento encaja muy bien en una alimentación saludable consumido con normalidad dentro de una dieta variada. "
                "No se calcula solo por calorías: valoramos juntas la calidad de las grasas, la fibra y la densidad de nutrientes, los azúcares añadidos, el sodio, "
                "el grado de procesado y lo que dice la evidencia científica. Cada ficha enlaza los estudios en los que se apoya. "
                "Los valores son por 100 g tal como aparece en la ficha (crudo, cocido o seco según el caso).")
    faqs = [
        ("¿Cuáles son los alimentos más saludables?",
         f'No hay un único alimento: la guía califica {n} alimentos con nota A, y casi todos son de origen vegetal (verduras, frutas, legumbres, cereales integrales, frutos secos) '
         "junto con el aceite de oliva virgen extra y algunos pescados. Lo que más importa es el conjunto de la dieta."),
        ("¿Qué significa tener nota A en HSNutrición?",
         "Que el alimento encaja muy bien en una alimentación saludable dentro de una dieta variada. La nota va de la A (excelente) a la E (poco recomendable) y "
         "se explica en la metodología."),
        ("¿Un alimento con nota A se puede comer sin límite?",
         "No. La nota resume la calidad del alimento, no la cantidad adecuada: los frutos secos y el aceite, por ejemplo, tienen nota A pero son muy calóricos, "
         "y algunas personas (alergias, enfermedades renales, tratamientos) deben consultar antes con un profesional."),
    ]
    jsonld_items = [(f["nombre"], f'{SITE_URL}/alimento-{slug(f["id"])}.html') for f in sorted(sel, key=lambda f: -f["fibra"])[:30]]
    cuerpo = envolver_pagina(h1, respuesta, criterio, "".join(bloques), faqs, otras, slug_p,
                             crumbs=[("Inicio", "index.html"), ("Alimentos", "index.html#alimentos")], extra="")
    return dict(slug=slug_p, h1=h1, titulo=titulo, n=n, emoji="🥦", unidad="alimentos", faqs=faqs, cuerpo=cuerpo,
                items=jsonld_items, desc_meta=f"Lista de {n} alimentos saludables con nota A: verduras, frutas, legumbres, cereales integrales, frutos secos y más, con calorías, proteínas y fibra por 100 g.",
                crit_card="con nota A")


def render_pagina_alimentos_poco_saludables(foods, marco, otras):
    sel, por_cat = lista_alimentos_poco_saludables(foods)
    n = len(sel)
    slug_p = "alimentos-poco-saludables"
    h1 = "Alimentos poco saludables"
    titulo = f"Alimentos poco saludables: lista de {n} con nota D o E"
    cols = [lambda f: f'{round(f["kcal"]):g}', lambda f: es(f["azucares"]), lambda f: es(f["grasasSat"]), lambda f: f'{round(f["sodio"]):,}'.replace(",", ".")]
    orden_cats = sorted(por_cat, key=lambda c: -len(por_cat[c]))
    nombres_cat = {"Cárnicos": "Carnes y embutidos", "Dulces": "Dulces", "Bebidas": "Bebidas", "Lácteos": "Lácteos", "Grasas": "Grasas",
                   "Salsas": "Salsas", "Snacks": "Snacks", "Cereales": "Cereales", "Condimentos y Aditivos": "Condimentos y aditivos",
                   "Platos Preparados": "Platos preparados"}
    bloques = []
    for cat in orden_cats:
        lista = sorted(por_cat[cat], key=lambda f: (-ORDEN_NOTA[f["rating"]], formatear_nombre(f["nombre"]).lower()))
        bloques.append(tabla(f"{nombres_cat.get(cat, cat)} ({len(lista)})", [fila_alimento(f, cols) for f in lista],
                             ["kcal", "Azúcares (g)", "Grasa sat. (g)", "Sodio (mg)"]))
    nE = sum(1 for f in sel if f["rating"] == "E")
    respuesta = (f'En la guía de HSNutrición hay {n} alimentos con nota D (mejorable) o E (poco recomendable): {nE} con nota E y {n - nE} con nota D. '
                 "Son sobre todo carnes procesadas, bebidas alcohólicas y azucaradas, dulces y bollería, snacks y algunos ultraprocesados.")
    criterio = ("Una nota D significa que el alimento tiene una alternativa claramente mejor; no hace falta prohibirlo, sí no abusar. Una nota E indica que conviene dejarlo "
                "como consumo ocasional. Aplicamos reglas explícitas: carne roja D, carne procesada E, todas las bebidas alcohólicas E, ultraprocesados D o E según su contenido en azúcar, "
                "grasas y sodio. Puedes leerlas en la metodología. Los valores son por 100 g (o 100 ml) tal como aparecen en la ficha de cada alimento.")
    faqs = [
        ("¿Cuáles son los alimentos menos saludables?",
         f'Los que tienen nota E en la guía ({nE}): carnes procesadas y embutidos, bebidas alcohólicas, bebidas azucaradas, bollería y otros ultraprocesados con mucho azúcar, grasa o sodio.'),
        ("¿Hay alimentos prohibidos?",
         "No. Una nota D o E no prohíbe nada: indica que conviene limitar ese alimento, y lo que importa es la cantidad, la frecuencia y el conjunto de la dieta."),
        ("¿Por qué la carne procesada tiene nota E?",
         "Porque la IARC la clasifica como carcinógena para las personas y los metaanálisis asocian su consumo con más riesgo de cáncer colorrectal y de mortalidad. "
         "Tienes los estudios en la ficha de cada embutido y en nuestra guía de ultraprocesados."),
    ]
    jsonld_items = [(f["nombre"], f'{SITE_URL}/alimento-{slug(f["id"])}.html') for f in sorted(sel, key=lambda f: (-ORDEN_NOTA[f["rating"]], f["nombre"]))[:30]]
    extra = '<p class="food-motivo">Más información: <a href="guia-ultraprocesados.html">guía de ultraprocesados</a> · <a href="guia-alcohol.html">guía del alcohol</a>.</p>'
    cuerpo = envolver_pagina(h1, respuesta, criterio, "".join(bloques), faqs, otras, slug_p,
                             crumbs=[("Inicio", "index.html"), ("Alimentos", "index.html#alimentos")], extra=extra)
    return dict(slug=slug_p, h1=h1, titulo=titulo, n=n, emoji="🍟", unidad="alimentos", faqs=faqs, cuerpo=cuerpo,
                items=jsonld_items, desc_meta=f"Lista de {n} alimentos poco saludables con nota D o E (carnes procesadas, alcohol, dulces, ultraprocesados), con su contenido en azúcar, grasa saturada y sodio.",
                crit_card="con nota D o E")


# ---------- páginas ----------
def chips_otras(listas_info, actual):
    return "\n".join(f'        <a class="filtro-chip" href="{s}.html">{esc(h)}</a>' for s, h in listas_info if s != actual)


def envolver_pagina(h1, respuesta, criterio, contenido, faqs, otras, slug_p, crumbs, extra, linea_revision=True):
    migas = " › ".join(f'<a href="{u}">{esc(t)}</a>' for t, u in crumbs)
    return f'''
  <section class="section">
    <div class="container">
      <p class="reveal receta-breadcrumb">{migas} › {esc(h1)}</p>
      <h1 class="ficha-titulo reveal">{esc(h1)}</h1>
      <p class="section-sub reveal" style="text-align:left;margin:0 0 20px">{esc(respuesta)}</p>
      <p class="food-motivo">{esc(criterio)} <a href="metodologia.html">Ver metodología</a>.</p>
{contenido}
      {extra}
      {LINEA_REVISION if linea_revision else ""}

      <h2 class="ficha-sub">Preguntas frecuentes</h2>
      <div class="ficha-faq">
{render_faq(faqs)}
      </div>

      <h2 class="ficha-sub">Más listas y rankings</h2>
      <div class="filtro-chips">
{otras}
        <a class="filtro-chip" href="rankings.html">Rankings de alimentos →</a>
        <a class="filtro-chip" href="recetas.html">Todas las recetas →</a>
        <a class="filtro-chip" href="guias.html">Guías →</a>
      </div>
    </div>
  </section>
'''


def render_pagina_receta_lista(cfg, lista, otras):
    n = len(lista)
    if cfg["metrica"]:
        respuesta = (f'Hay {n} {cfg["desc"]} en HSNutrición ({cfg["crit_corto"]}): de {lista[0]["nombre"]} ({cfg["metrica"](lista[0])}) '
                     f'a {lista[-1]["nombre"]} ({cfg["metrica"](lista[-1])}).')
    else:
        nA = sum(1 for r in lista if r["rating"] == "A")
        respuesta = (f'Hay {n} {cfg["desc"]} en HSNutrición ({cfg["crit_corto"]}); {nA} tienen nota A. '
                     f'Todas llevan los macros por ración calculados y una nota de la A a la E.')
    faqs = cfg["faqs"](lista)
    contenido = render_recetas_paginadas(lista, por_pagina=12)
    cuerpo = envolver_pagina(cfg["h1"], respuesta, cfg["criterio"], contenido, faqs, otras, cfg["slug"],
                             crumbs=[("Inicio", "index.html"), ("Recetas", "recetas.html")], extra=cfg.get("extra", ""))
    items = [(r["nombre"], f'{SITE_URL}/receta-{slug(r["id"])}.html') for r in lista]
    dm = f'Las {n} {cfg["desc"]} de HSNutrición ({cfg["crit_corto"]}), con macros por ración calculados y nota de la A a la E.'
    return dict(slug=cfg["slug"], h1=cfg["h1"], titulo=cfg["titulo"](n), n=n, emoji=cfg["emoji"], unidad="recetas", faqs=faqs,
                cuerpo=cuerpo, items=items, desc_meta=dm, crit_card=cfg["crit_corto"])


def pagina_completa(p, marco):
    url = f'{SITE_URL}/{p["slug"]}.html'
    titulo = p["titulo"] + (" | HSNutrición" if len(p["titulo"]) + 14 <= 70 else "")
    desc = p["desc_meta"] if len(p["desc_meta"]) <= 160 else p["desc_meta"][:157].rsplit(" ", 1)[0] + "…"
    jsonld = {
        "@context": "https://schema.org",
        "@graph": [
            {"@type": "CollectionPage", "name": p["titulo"], "url": url, "inLanguage": "es", "description": desc,
             "dateModified": REVISION_ISO,
             "image": f'{SITE_URL}/img/listas/{p["slug"]}.jpg',
             "mainEntity": {"@type": "ItemList", "numberOfItems": p["n"],
                            "itemListElement": [{"@type": "ListItem", "position": i, "name": nombre, "url": u}
                                                for i, (nombre, u) in enumerate(p["items"][:30], 1)]}},
            {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in p["faqs"]]},
            GR.breadcrumb_ld([("Inicio", SITE_URL + "/"), (p["h1"], url)]),
        ],
    }
    html = GR.cabecera(titulo, desc, url, jsonld)
    html = html.replace(f'{SITE_URL}/img/banner-hsnutricion.jpg', f'{SITE_URL}/img/listas/{p["slug"]}.jpg')
    prefijo, sufijo = marco
    return html + prefijo + p["cuerpo"] + sufijo


def inyectar(ruta_rel, ini, fin, bloque, ancla):
    ruta = os.path.join(ROOT, ruta_rel)
    with open(ruta, encoding="utf-8", newline="") as f:
        html = f.read()
    nl = "\r\n" if "\r\n" in html else "\n"
    bloque = bloque.replace("\n", nl)
    if ini in html:
        i = html.index(ini)
        j = html.index(fin) + len(fin)
        html = html[:i] + bloque + html[j:]
    else:
        assert html.count(ancla) == 1, (ruta_rel, ancla)
        html = html.replace(ancla, ancla + nl + bloque, 1)
    with open(ruta, "w", encoding="utf-8", newline="") as f:
        f.write(html)


def main():
    foods = parse_foods_full(DATA_JS)
    recetas = cargar_recetas()
    marco = GR.cargar_marco()

    # 1) listas de recetas (solo las que tienen al menos 6)
    seleccion = []
    for cfg in LISTAS_RECETAS:
        lista = sorted((r for r in recetas if cfg["filtro"](r)), key=cfg["orden"])
        if len(lista) >= 6:
            seleccion.append((cfg, lista))
        else:
            print(f'  (se omite {cfg["slug"]}: solo {len(lista)} recetas)')

    # 2) índice de enlaces entre listas
    info = [(cfg["slug"], cfg["h1"]) for cfg, _ in seleccion] + [("alimentos-saludables", "Alimentos saludables"), ("alimentos-poco-saludables", "Alimentos poco saludables")]
    paginas = []
    for cfg, lista in seleccion:
        paginas.append(render_pagina_receta_lista(cfg, lista, chips_otras(info, cfg["slug"])))
    paginas.append(render_pagina_alimentos_saludables(foods, marco, chips_otras(info, "alimentos-saludables")))
    paginas.append(render_pagina_alimentos_poco_saludables(foods, marco, chips_otras(info, "alimentos-poco-saludables")))

    for p in paginas:
        GT.tarjeta_lista(p["h1"], p["n"], p["unidad"], p["emoji"], os.path.join(ROOT, "img", "listas", f'{p["slug"]}.jpg'), p["crit_card"])
        with open(os.path.join(ROOT, f'{p["slug"]}.html'), "w", encoding="utf-8", newline="") as f:
            f.write(pagina_completa(p, marco))
        print(f'  {p["slug"]}.html — {p["n"]} {p["unidad"]}')

    # 3) enlaces rastreables desde recetas.html y la portada
    chips_recetas = "\n".join(f'          <a class="filtro-chip" href="{cfg["slug"]}.html">{esc(cfg["h1"])} ({len(lista)})</a>' for cfg, lista in seleccion)
    bloque_recetas = f'''<!-- LISTAS-RECETAS:INICIO (generado por scripts/generar_listas.py) -->
      <div class="listas-enlaces reveal">
        <span class="filtro-grupo-label">Explora por tipo</span>
        <div class="filtro-chips">
{chips_recetas}
        </div>
      </div>
      <!-- LISTAS-RECETAS:FIN -->'''
    inyectar("recetas.html", "<!-- LISTAS-RECETAS:INICIO", "<!-- LISTAS-RECETAS:FIN -->", bloque_recetas,
             '<p class="section-sub reveal">' + _subtitulo_recetas())

    chips_portada = "\n".join(f'          <a class="filtro-chip" href="{s}.html">{esc(h)}</a>' for s, h in info)
    bloque_portada = f'''<!-- LISTAS:INICIO (generado por scripts/generar_listas.py) -->
      <div class="indice-alimentos">
        <h3 class="ficha-sub">Listas de alimentos y recetas</h3>
        <div class="filtro-chips">
{chips_portada}
        </div>
      </div>
      <!-- LISTAS:FIN -->'''
    inyectar("index.html", "<!-- LISTAS:INICIO", "<!-- LISTAS:FIN -->", bloque_portada, "<!-- INDICE-ALIMENTOS:FIN -->")


def _subtitulo_recetas():
    with open(os.path.join(ROOT, "recetas.html"), encoding="utf-8") as f:
        html = f.read()
    m = re.search(r'<p class="section-sub reveal">(.*?)</p>', html, re.S)
    return m.group(1) + "</p>"


if __name__ == "__main__":
    main()
