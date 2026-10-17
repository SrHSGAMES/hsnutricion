# -*- coding: utf-8 -*-
"""Definición y cálculo de los rankings de alimentos (alimentos con más proteínas,
frutas con menos calorías, etc.). Lo comparten generar_rankings.py (que escribe las
páginas) y generar_alimentos.py (que enlaza cada ficha con los rankings en los que
aparece). Todo sale de js/data.js: nada se inventa.

Los rankings responden a lo que la gente busca (Search Console: "merluza proteínas",
"alimentos con más proteínas"...) y llevan a las fichas de alimento.
"""

# Categorías que distorsionan las listas "por 100 g": las especias tienen mucha fibra y
# proteína por gramo pero se comen en cantidades mínimas; las bebidas no son alimentos sólidos.
EXCLUIR_GENERAL = {"Condimentos y Aditivos", "Suplemento Alimenticio", "Bebidas", "Bebidas vegetales", "Salsas", "Insectos Comestibles"}
# Ingredientes que se usan en cantidades mínimas (levaduras, cacao en polvo): por 100 g salen altísimos y engañan.
EXCLUIR_IDS = {"levadura_panaderia", "levadura", "ia_levadura", "levadura_quimica", "ia_levadura_quimica", "cacao_puro", "ia_cacao_puro"}
CATEGORIAS_VEGETALES = {"Verduras y Hortalizas", "Frutas", "Frutos Secos", "Proteína vegetal", "Cereales"}
PESCADOS = {
    "merluza", "salmon", "atun", "bacalao", "sardina", "caballa", "trucha", "dorada", "lubina", "anchoas",
    "lenguado", "rape", "gambas", "mejillones", "almejas", "calamar", "pulpo", "sepia", "salmon_ahumado", "surimi",
}

ETIQUETA = {"proteinas": "Proteínas (g)", "kcal": "Calorías (kcal)", "fibra": "Fibra (g)", "azucares": "Azúcares (g)",
            "grasas": "Grasas (g)", "carbs": "Carbohidratos (g)"}
UNIDAD = {"proteinas": "g", "kcal": "kcal", "fibra": "g", "azucares": "g", "grasas": "g", "carbs": "g"}


def _base(food_id):
    return food_id[3:] if food_id.startswith("ia_") else food_id


def _general(f):
    return not (set(f["categorias"]) & EXCLUIR_GENERAL) and f["id"] not in EXCLUIR_IDS


def _cat(nombre):
    return lambda f: nombre in f["categorias"] and f["id"] not in EXCLUIR_IDS and not (set(f["categorias"]) & {"Condimentos y Aditivos", "Suplemento Alimenticio"})


def _vegetal(f):
    return _general(f) and bool(set(f["categorias"]) & CATEGORIAS_VEGETALES) and not (set(f["categorias"]) & {"Cárnicos", "Lácteos"})


def _pescado(f):
    return _base(f["id"]) in PESCADOS


# slug, nombre del grupo, métrica, orden ("desc" = de más a menos), filtro, máximo de filas, sujeto para el texto
# frase: "los N {sujeto} con {más/menos} {métrica}"
RANKINGS = [
    # --- Globales
    dict(slug="alimentos-con-mas-proteinas", h1="Alimentos con más proteínas", metrica="proteinas", orden="desc", filtro=_general, n=50,
         sujeto="alimentos", grupo="de la guía", destacado=True),
    dict(slug="alimentos-con-menos-calorias", h1="Alimentos con menos calorías", metrica="kcal", orden="asc", filtro=_general, n=50,
         sujeto="alimentos", grupo="de la guía", destacado=True),
    dict(slug="alimentos-ricos-en-fibra", h1="Alimentos ricos en fibra", metrica="fibra", orden="desc", filtro=_general, n=50,
         sujeto="alimentos", grupo="de la guía", destacado=True),
    dict(slug="alimentos-vegetales-con-mas-proteinas", h1="Alimentos vegetales con más proteínas", metrica="proteinas", orden="desc", filtro=_vegetal, n=40,
         sujeto="alimentos vegetales", grupo="de la guía", destacado=True),
    # --- Verduras
    dict(slug="verduras-con-mas-proteinas", h1="Verduras con más proteínas", metrica="proteinas", orden="desc", filtro=_cat("Verduras y Hortalizas"), n=40,
         sujeto="verduras y hortalizas", grupo="de la guía"),
    dict(slug="verduras-ricas-en-fibra", h1="Verduras ricas en fibra", metrica="fibra", orden="desc", filtro=_cat("Verduras y Hortalizas"), n=40,
         sujeto="verduras y hortalizas", grupo="de la guía"),
    dict(slug="verduras-con-menos-calorias", h1="Verduras con menos calorías", metrica="kcal", orden="asc", filtro=_cat("Verduras y Hortalizas"), n=40,
         sujeto="verduras y hortalizas", grupo="de la guía"),
    # --- Frutas
    dict(slug="frutas-ricas-en-fibra", h1="Frutas ricas en fibra", metrica="fibra", orden="desc", filtro=_cat("Frutas"), n=40,
         sujeto="frutas", grupo="de la guía"),
    dict(slug="frutas-con-menos-calorias", h1="Frutas con menos calorías", metrica="kcal", orden="asc", filtro=_cat("Frutas"), n=40,
         sujeto="frutas", grupo="de la guía"),
    dict(slug="frutas-con-menos-azucar", h1="Frutas con menos azúcar", metrica="azucares", orden="asc", filtro=_cat("Frutas"), n=40,
         sujeto="frutas", grupo="de la guía"),
    dict(slug="frutas-con-mas-proteinas", h1="Frutas con más proteínas", metrica="proteinas", orden="desc", filtro=_cat("Frutas"), n=40,
         sujeto="frutas", grupo="de la guía"),
    # --- Carnes
    dict(slug="carnes-con-mas-proteinas", h1="Carnes con más proteínas", metrica="proteinas", orden="desc", filtro=_cat("Cárnicos"), n=30,
         sujeto="carnes y embutidos", grupo="de la guía"),
    dict(slug="carnes-mas-magras", h1="Carnes más magras", metrica="grasas", orden="asc", filtro=_cat("Cárnicos"), n=30,
         sujeto="carnes y embutidos", grupo="de la guía"),
    # --- Pescados y mariscos
    dict(slug="pescados-con-mas-proteinas", h1="Pescados y mariscos con más proteínas", metrica="proteinas", orden="desc", filtro=_pescado, n=30,
         sujeto="pescados y mariscos", grupo="de la guía"),
    dict(slug="pescados-con-menos-calorias", h1="Pescados y mariscos con menos calorías", metrica="kcal", orden="asc", filtro=_pescado, n=30,
         sujeto="pescados y mariscos", grupo="de la guía"),
    # --- Frutos secos
    dict(slug="frutos-secos-con-mas-proteinas", h1="Frutos secos con más proteínas", metrica="proteinas", orden="desc", filtro=_cat("Frutos Secos"), n=30,
         sujeto="frutos secos", grupo="de la guía"),
    dict(slug="frutos-secos-con-menos-calorias", h1="Frutos secos con menos calorías", metrica="kcal", orden="asc", filtro=_cat("Frutos Secos"), n=30,
         sujeto="frutos secos", grupo="de la guía"),
    # --- Legumbres y proteína vegetal
    dict(slug="legumbres-y-proteina-vegetal-con-mas-proteinas", h1="Legumbres y proteína vegetal con más proteínas", metrica="proteinas", orden="desc", filtro=_cat("Proteína vegetal"), n=30,
         sujeto="legumbres y alimentos de proteína vegetal", grupo="de la guía"),
    dict(slug="legumbres-y-proteina-vegetal-ricas-en-fibra", h1="Legumbres y proteína vegetal ricas en fibra", metrica="fibra", orden="desc", filtro=_cat("Proteína vegetal"), n=30,
         sujeto="legumbres y alimentos de proteína vegetal", grupo="de la guía"),
    # --- Lácteos
    dict(slug="lacteos-con-mas-proteinas", h1="Lácteos con más proteínas", metrica="proteinas", orden="desc", filtro=_cat("Lácteos"), n=30,
         sujeto="lácteos", grupo="de la guía"),
    dict(slug="lacteos-con-menos-calorias", h1="Lácteos con menos calorías", metrica="kcal", orden="asc", filtro=_cat("Lácteos"), n=30,
         sujeto="lácteos", grupo="de la guía"),
    # --- Cereales
    dict(slug="cereales-con-mas-proteinas", h1="Cereales con más proteínas", metrica="proteinas", orden="desc", filtro=_cat("Cereales"), n=30,
         sujeto="cereales y derivados", grupo="de la guía"),
    dict(slug="cereales-ricos-en-fibra", h1="Cereales ricos en fibra", metrica="fibra", orden="desc", filtro=_cat("Cereales"), n=30,
         sujeto="cereales y derivados", grupo="de la guía"),
]

_ORDEN_RATING = {"A": 0, "B": 1, "C": 2, "D": 3, "E": 4}


def calcular(foods):
    """foods: dict id -> alimento (parse_foods_full). Devuelve slug -> lista ordenada de alimentos."""
    resultado = {}
    for r in RANKINGS:
        candidatos = [f for f in foods.values() if r["filtro"](f)]
        signo = -1 if r["orden"] == "desc" else 1
        candidatos.sort(key=lambda f: (signo * f[r["metrica"]], _ORDEN_RATING.get(f["rating"], 9), f["nombre"].lower()))
        resultado[r["slug"]] = candidatos[: r["n"]]
    return resultado


def posiciones(foods, rankings=None):
    """food_id -> lista de (ranking, puesto) ordenada por mejor puesto relativo."""
    rankings = rankings or calcular(foods)
    por_id = {}
    for r in RANKINGS:
        lista = rankings[r["slug"]]
        for i, f in enumerate(lista, 1):
            por_id.setdefault(f["id"], []).append((r, i, len(lista)))
    for lst in por_id.values():
        lst.sort(key=lambda t: (t[1], -t[2]))
    return por_id


def ranking_de(slug_):
    return next(r for r in RANKINGS if r["slug"] == slug_)
