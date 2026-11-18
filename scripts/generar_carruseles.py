# -*- coding: utf-8 -*-
"""Genera los carruseles de Instagram (diapositivas de 1080x1350, formato 4:5) y su calendario.

Salida (todo dentro de pines/, que está en .gitignore: Instagram se sube desde tu equipo, no hace
falta publicar nada en la web):
  pines/instagram/<carrusel>/01.jpg, 02.jpg...   las diapositivas
  pines/instagram/zips/<carrusel>.zip            todas las diapositivas juntas
  pines/instagram/manifest.json                  lista con calendario y texto de cada publicación

Tipos de carrusel (todo sale de js/data.js, js/recetas.js y las guías):
  notas    cómo puntuamos de la A a la E (el de presentación)
  top      Top 5 de un ranking, en cuenta atrás
  versus   dos alimentos comparados
  receta   foto, ingredientes, pasos, valores por ración
  frase    una afirmación con estudio de las guías y su fuente

Uso: py scripts/generar_carruseles.py [fecha_inicio AAAA-MM-DD]   (publica martes y viernes)
"""
import json
import os
import shutil
import sys
import zipfile
from datetime import date, timedelta

from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from generar_recetas import ROOT, DATA_JS, calcular_macros, es, formatear_nombre, parse_foods, parse_recetas, slug  # noqa: E402
from generar_sustitutos import parse_foods_full  # noqa: E402
from generar_tarjetas import NOTA, dibujar_emoji, fuente  # noqa: E402
from generar_pines import (FRASES, LOGO, PALETAS, TOPS, VERSUS, ajustar, bloque, buscar, chip_receta, cubrir,  # noqa: E402
                           leer_extras_recetas, pastilla, sello_nota, texto)
import rankings_lib  # noqa: E402

W, H, K = 1080, 1350, 2
SALIDA = os.path.join(ROOT, "pines", "instagram")
BLANCO, TINTA, VERDE_OSC = (255, 255, 255), (18, 33, 26), (14, 66, 36)
ORDEN_PALETAS = ["verde", "crema", "coral", "amarillo", "menta", "noche"]
AVISO = "Información educativa, no sustituye el consejo de un profesional sanitario."


# ------------------------------------------------------------------ dibujo común
def lienzo(color):
    img = Image.new("RGB", (W * K, H * K), color)
    return img, ImageDraw.Draw(img)


def pie(img, d, tx, suave, n, total):
    """Logo y nombre abajo a la izquierda, y el número de diapositiva a la derecha."""
    logo = Image.open(LOGO).convert("RGBA")
    alto = 56 * K
    logo = logo.resize((int(logo.width * alto / logo.height), alto), Image.LANCZOS)
    img.paste(logo, (60 * K, 1252 * K), logo)
    d.text(((60 + logo.width / K + 12) * K, 1258 * K), "HSNutrición", font=fuente("georgiab.ttf", 36), fill=tx)
    texto(d, W - 60, 1262, f"{n}/{total}", fuente("segoeuib.ttf", 30), suave, "r")


def desliza(d, acc, y=1150):
    texto(d, W - 60, y, "Desliza  →", fuente("segoeuib.ttf", 40), acc, "r")


def cierre(paleta, titulo, sub, cta, n, total):
    fondo, tx, acc, suave = PALETAS[paleta]
    img, d = lienzo(fondo)
    f, px, ln = ajustar(d, titulo, "georgiab.ttf", (110, 100, 90, 80), 900, 3)
    y = bloque(d, ln, 90, 250, f, px, tx, 1.08)
    d.rounded_rectangle([90 * K, (y + 24) * K, 260 * K, (y + 32) * K], radius=4 * K, fill=acc)
    f2, p2, l2 = ajustar(d, sub, "segoeui.ttf", (46, 42, 38), 880, 5)
    y = bloque(d, l2, 90, y + 70, f2, p2, tx, 1.3)
    fc = fuente("segoeuib.ttf", 40)
    f3, p3, l3 = ajustar(d, cta, "segoeuib.ttf", (40, 36, 32), 800, 3)
    alto = len(l3) * int(p3 * 1.3) + 56
    y0 = max(y + 70, 880)
    d.rounded_rectangle([90 * K, y0 * K, (W - 90) * K, (y0 + alto) * K], radius=30 * K, fill=acc)
    bloque(d, l3, 130, y0 + 28, f3, p3, fondo, 1.3)
    texto(d, 90, 1190, AVISO, fuente("segoeui.ttf", 24), suave)
    pie(img, d, tx, suave, n, total)
    return img


def cierre_estandar(paleta, n, total):
    return cierre(paleta, "¿Te ha servido?", "Guárdalo para cuando lo necesites y compártelo con quien lo vaya a agradecer.",
                  "Notas de la A a la E y estudios citados: enlace en la bio, hsnutricion.com", n, total)


# ------------------------------------------------------------------ carruseles
def car_notas(foods):
    candidatos = ["lentejas_cocidas", "salmon", "aguacate", "brocoli", "avena", "pan_integral", "huevo", "pechuga_de_pollo", "queso_fresco", "pavo",
                  "pan_blanco", "arroz_blanco", "pasta_blanca", "miel", "atun", "chocolate_leche", "helado", "mantequilla", "mayonesa", "zumo_envasado",
                  "jamon_cocido", "embutido", "refresco", "patatas_fritas", "bolleria_industrial", "cerveza"]
    ejemplos = {r: [] for r in "ABCDE"}
    for k in candidatos:
        f = buscar(foods, k)
        if len(ejemplos[f["rating"]]) < 3:
            ejemplos[f["rating"]].append(f)
    assert all(len(v) == 3 for v in ejemplos.values()), {k: len(v) for k, v in ejemplos.items()}
    total = 7
    s = []
    fondo, tx, acc, suave = PALETAS["verde"]
    img, d = lienzo(fondo)
    texto(d, 90, 130, "SIN MITOS", fuente("segoeuib.ttf", 44), acc)
    f, px, ln = ajustar(d, "Cómo puntuamos los alimentos de la A a la E", "georgiab.ttf", (112, 100, 92, 84), 900, 5)
    bloque(d, ln, 90, 200, f, px, tx, 1.08)
    for i, r in enumerate("ABCDE"):
        c, _ = NOTA[r]
        d.ellipse([(90 + i * 190) * K, 900 * K, (90 + i * 190 + 150) * K, 1050 * K], fill=c)
        fl = fuente("georgiab.ttf", 100)
        w = d.textlength(r, font=fl) / K
        d.text(((90 + i * 190 + 75 - w / 2) * K, 920 * K), r, font=fl, fill=BLANCO)
    desliza(d, acc)
    pie(img, d, tx, suave, 1, total)
    s.append(img)
    for i, r in enumerate("ABCDE"):
        c, etq = NOTA[r]
        pal = ["crema", "menta", "amarillo", "coral", "noche"][i]
        fondo, tx, acc, suave = PALETAS[pal]
        img, d = lienzo(fondo)
        d.ellipse([90 * K, 120 * K, 400 * K, 430 * K], fill=c)
        fl = fuente("georgiab.ttf", 250)
        w = d.textlength(r, font=fl) / K
        d.text(((245 - w / 2) * K, 150 * K), r, font=fl, fill=BLANCO)
        texto(d, 450, 190, f"Nota {r}", fuente("georgiab.ttf", 90), tx)
        texto(d, 450, 300, etq, fuente("segoeuib.ttf", 56), acc if pal != "crema" else c)
        texto(d, 90, 520, "Ejemplos de nuestra guía:", fuente("segoeui.ttf", 38), suave)
        y = 600
        for fd in ejemplos[r]:
            d.rounded_rectangle([90 * K, y * K, (W - 90) * K, (y + 150) * K], radius=30 * K, fill=BLANCO if pal in ("crema", "menta", "amarillo") else tuple(min(255, v + 24) for v in fondo))
            dibujar_emoji(img, fd.get("emoji"), 175, y + 75, 80)
            fnn, pxn, lnn = ajustar(d, formatear_nombre(fd["nombre"]), "georgiab.ttf", (46, 40, 36, 32, 28), 720, 1)
            texto(d, 250, y + 75 - int(pxn * 0.62), lnn[0], fnn, TINTA if pal in ("crema", "menta", "amarillo") else tx)
            y += 180
        pie(img, d, tx, suave, i + 2, total)
        s.append(img)
    s.append(cierre("coral", "Cada nota tiene sus estudios", "Todos los alimentos de la guía llevan su nota y los estudios de PubMed que la explican, para que no tengas que fiarte de nadie.",
                    "Busca cualquier alimento en el enlace de la bio: hsnutricion.com", total, total))
    cap = ("¿Cómo decidimos si un alimento es una A o una E? 🍎➡️🍟\n\nEn HSNutrición cada alimento tiene una nota de la A a la E, con los estudios científicos (PubMed) que la respaldan. "
           "Desliza para ver qué significa cada nota y ejemplos reales.\n\nGuárdalo 📌 y compártelo con quien siempre pregunta “¿esto es sano?”.\n\nTodas las fichas, en el enlace de la bio.\n\n"
           f"{AVISO}\n\n#nutricion #alimentacionsaludable #comersano #nutricionhumana #hsnutricion #notasnutricionales")
    return "notas-a-e", "Cómo puntuamos de la A a la E", s, cap


def car_top(sl, rank):
    r = rankings_lib.ranking_de(sl)
    lista = [f for f in rank[sl] if f["rating"] in ("A", "B")][:5]
    assert len(lista) == 5, sl
    pal = ORDEN_PALETAS[hash(sl) % 6] if False else ORDEN_PALETAS[sum(map(ord, sl)) % 6]
    fondo, tx, acc, suave = PALETAS[pal]
    unidad = rankings_lib.UNIDAD[r["metrica"]]
    total = 7
    s = []
    img, d = lienzo(fondo)
    texto(d, 90, 120, "TOP 5", fuente("segoeuib.ttf", 48), acc)
    f, px, ln = ajustar(d, r["h1"], "georgiab.ttf", (120, 110, 100, 90, 80), 900, 4)
    y = bloque(d, ln, 90, 190, f, px, tx, 1.06)
    texto(d, 90, y + 14, "por 100 g · solo alimentos con nota A o B", fuente("segoeui.ttf", 36), suave)
    for i, fd in enumerate(lista):
        dibujar_emoji(img, fd.get("emoji"), 150 + i * 195, 960, 130)
    desliza(d, acc)
    pie(img, d, tx, suave, 1, total)
    s.append(img)
    for k, fd in reversed(list(enumerate(lista, 1))):
        img, d = lienzo(fondo)
        texto(d, 90, 80, f"PUESTO {k}", fuente("segoeuib.ttf", 44), acc)
        dibujar_emoji(img, fd.get("emoji"), W / 2, 380, 300)
        f, px, ln = ajustar(d, formatear_nombre(fd["nombre"]), "georgiab.ttf", (100, 90, 80, 70, 60), 900, 2)
        y = bloque(d, ln, W / 2, 600, f, px, tx, 1.06, "c")
        texto(d, W / 2, y + 10, f"{es(fd[r['metrica']])} {unidad}", fuente("georgiab.ttf", 150), acc, "c")
        texto(d, W / 2, y + 190, rankings_lib.ETIQUETA[r["metrica"]].split(" (")[0].lower() + " por 100 g", fuente("segoeui.ttf", 38), suave, "c")
        color, etq = NOTA[fd["rating"]]
        d.ellipse([(W / 2 - 250) * K, 1068 * K, (W / 2 - 170) * K, 1148 * K], fill=color)
        fr = fuente("georgiab.ttf", 56)
        w = d.textlength(fd["rating"], font=fr) / K
        d.text(((W / 2 - 210 - w / 2) * K, 1074 * K), fd["rating"], font=fr, fill=BLANCO)
        texto(d, W / 2 - 150, 1085, f"Nota {fd['rating']} · {etq}", fuente("segoeuib.ttf", 40), tx)
        texto(d, W / 2, 1180, f"{es(fd['kcal'])} kcal · {es(fd['proteinas'])} g proteínas · {es(fd['fibra'])} g fibra", fuente("segoeui.ttf", 30), suave, "c")
        pie(img, d, tx, suave, 7 - k, total)
        s.append(img)
    s.append(cierre_estandar(pal, total, total))
    cap = (f"Top 5: {r['h1'].lower()} 🏆\n\nSegún los datos de nuestra guía (por 100 g), y quedándonos solo con los de nota A o B. Desliza para ver la cuenta atrás hasta el nº 1.\n\n"
           f"Guárdalo 📌 para tu próxima compra. La lista completa, con notas de la A a la E y estudios, está en el enlace de la bio.\n\n{AVISO}\n\n"
           "#nutricion #alimentacionsaludable #comersano #proteinas #dietasaludable #hsnutricion")
    return f"top-{sl}", f"Top 5: {r['h1']}", s, cap


def car_versus(foods, v, idx):
    ia, ib, met, etq, uni, menor = v
    a, b = buscar(foods, ia), buscar(foods, ib)
    pal = ORDEN_PALETAS[(idx + 3) % 6]
    fondo, tx, acc, suave = PALETAS[pal]
    total = 4
    s = []
    na, nb = formatear_nombre(a["nombre"]), formatear_nombre(b["nombre"])
    img, d = lienzo(fondo)
    dibujar_emoji(img, a.get("emoji"), 300, 330, 230)
    dibujar_emoji(img, b.get("emoji"), 780, 330, 230)
    texto(d, W / 2, 330 - 60, "o", fuente("georgiab.ttf", 90), acc, "c")
    f, px, ln = ajustar(d, f"{na} o {nb}", "georgiab.ttf", (100, 90, 80, 70, 62), 900, 4)
    y = bloque(d, ln, W / 2, 560, f, px, tx, 1.06, "c")
    texto(d, W / 2, y + 30, "¿Cuál eliges?", fuente("georgiab.ttf", 70), acc, "c")
    texto(d, W / 2, y + 140, etq.lower(), fuente("segoeui.ttf", 38), suave, "c")
    desliza(d, acc)
    pie(img, d, tx, suave, 1, total)
    s.append(img)
    img, d = lienzo(fondo)
    texto(d, 90, 80, "POR 100 G", fuente("segoeuib.ttf", 40), acc)
    dibujar_emoji(img, a.get("emoji"), 690, 190, 90)
    dibujar_emoji(img, b.get("emoji"), 900, 190, 90)
    filas = [("Calorías", "kcal", "kcal"), ("Proteínas", "proteinas", "g"), ("Grasas", "grasas", "g"), ("Grasa saturada", "grasasSat", "g"),
             ("Azúcares", "azucares", "g"), ("Fibra", "fibra", "g"), ("Sodio", "sodio", "mg")]
    y = 280
    for et, k, u in filas:
        if k == met:
            d.rounded_rectangle([60 * K, (y - 8) * K, (W - 60) * K, (y + 100) * K], radius=26 * K, fill=acc)
            colt = fondo
        else:
            colt = tx
        texto(d, 90, y + 22, et, fuente("segoeuib.ttf", 42), colt)
        texto(d, 690, y + 14, f"{es(a[k])} {u}", fuente("georgiab.ttf", 36), colt, "c")
        texto(d, 900, y + 14, f"{es(b[k])} {u}", fuente("georgiab.ttf", 36), colt, "c")
        y += 118
    pie(img, d, tx, suave, 2, total)
    s.append(img)
    img, d = lienzo(fondo)
    texto(d, 90, 90, "EL VEREDICTO", fuente("segoeuib.ttf", 40), acc)
    gana_a = (a[met] < b[met]) if menor else (a[met] > b[met])
    for i, fd in enumerate((a, b)):
        cx = 300 + i * 480
        c, etq_n = NOTA[fd["rating"]]
        d.ellipse([(cx - 150) * K, 200 * K, (cx + 150) * K, 500 * K], fill=c)
        fl = fuente("georgiab.ttf", 240)
        w = d.textlength(fd["rating"], font=fl) / K
        d.text(((cx - w / 2) * K, 225 * K), fd["rating"], font=fl, fill=BLANCO)
        fn, pxn, lnn = ajustar(d, formatear_nombre(fd["nombre"]), "georgiab.ttf", (46, 40, 36), 400, 2)
        bloque(d, lnn, cx, 540, fn, pxn, tx, 1.1, "c")
    ganador = na if gana_a else nb
    f, px, ln = ajustar(d, f"En {etq.lower().replace(' por 100 g', '')}, gana {ganador}: {es(a[met])} frente a {es(b[met])} {uni.split(' de ')[0] if ' de ' in uni else uni}.", "georgiab.ttf", (60, 54, 50), 900, 4)
    y = bloque(d, ln, 90, 760, f, px, tx, 1.2)
    fs, ps, ls = ajustar(d, "Una sola cifra no lo dice todo: la nota A-E tiene en cuenta el conjunto del alimento y los estudios.", "segoeui.ttf", (36, 32), 900, 3)
    bloque(d, ls, 90, y + 40, fs, ps, suave, 1.3)
    pie(img, d, tx, suave, 3, total)
    s.append(img)
    s.append(cierre_estandar(pal, 4, total))
    cap = (f"{na} o {nb}: ¿cuál eliges? 🤔\n\nComparamos los dos por 100 g y con su nota de la A a la E. Desliza para ver todos los números y el veredicto.\n\n"
           f"Guárdalo 📌 y cuéntame en comentarios cuál sueles elegir tú.\n\nMás comparativas y notas con estudios, en el enlace de la bio.\n\n{AVISO}\n\n"
           "#nutricion #alimentacionsaludable #comersano #dietasaludable #hsnutricion #saludable")
    return f"versus-{ia}-vs-{ib}", f"{na} o {nb}", s, cap


def car_receta(rec, ext, foods, idx):
    pal_inner = "crema"
    fondo, tx, acc, suave = PALETAS[pal_inner]
    base = formatear_nombre(rec["nombre"])
    totales, _ = calcular_macros(rec, foods)
    n = max(rec["raciones"], 1)
    por = {k: totales[k] / n for k in ("kcal", "proteinas", "carbs", "grasas", "fibra")}
    # ingredientes
    ings = []
    for ing in rec["ingredientes"]:
        fd = foods.get(ing["foodId"])
        nom = formatear_nombre(fd["nombre"]) if fd else ing["foodId"]
        ings.append((f"{es(ing['cantidad'])} g", nom + (" (opcional)" if ing["opcional"] else "")))
    pag_ing = [ings[i:i + 11] for i in range(0, len(ings), 11)]
    # pasos: reparto en páginas según la altura estimada
    probe = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    fpaso = fuente("segoeui.ttf", 40)
    paginas, actual, alto = [], [], 0
    from generar_tarjetas import partir  # noqa: E402
    for i, p in enumerate(rec["pasos"], 1):
        lineas = partir(probe, p, fpaso, 800, 20)
        h = len(lineas) * 56 + 40
        if actual and alto + h > 880:
            paginas.append(actual)
            actual, alto = [], 0
        actual.append((i, lineas))
        alto += h
    if actual:
        paginas.append(actual)
    total = 1 + len(pag_ing) + len(paginas) + 1 + 1
    s = []
    # portada
    pal_c = "crema" if idx % 2 == 0 else "verde"
    fc, tc, ac, sc = PALETAS[pal_c]
    img, d = lienzo(fc)
    img.paste(cubrir(os.path.join(ROOT, rec["imagen"]), W, 800), (0, 0))
    chip = chip_receta(ext)
    f = fuente("segoeuib.ttf", 32)
    w = d.textlength(chip, font=f) / K
    d.rounded_rectangle([44 * K, 44 * K, (44 + w + 56) * K, 108 * K], radius=32 * K, fill=BLANCO)
    d.text((72 * K, 57 * K), chip, font=f, fill=VERDE_OSC)
    sello_nota(d, 940, 800, 80, rec["rating"])
    f, px, ln = ajustar(d, base, "georgiab.ttf", (76, 70, 64, 58, 52), 880, 3)
    y = bloque(d, ln, 60, 880, f, px, tc, 1.06)
    kc = es(round(por["kcal"]))
    x = pastilla(img, d, 60, 1128, "⏱️", rec["tiempo"], ac if pal_c == "crema" else (247, 200, 70), BLANCO if pal_c == "crema" else TINTA) + 18
    pastilla(img, d, x, 1128, "🔥", f"{kc} kcal/ración", ac if pal_c == "crema" else (247, 200, 70), BLANCO if pal_c == "crema" else TINTA)
    texto(d, W - 60, 1150, "Desliza  →", fuente("segoeuib.ttf", 40), tc, "r")
    pie(img, d, tc, sc, 1, total)
    s.append(img)
    k = 2
    for pi, pagina in enumerate(pag_ing):
        img, d = lienzo(fondo)
        texto(d, 90, 80, "INGREDIENTES" + (f" ({pi + 1}/{len(pag_ing)})" if len(pag_ing) > 1 else ""), fuente("segoeuib.ttf", 44), acc)
        texto(d, 90, 150, f"Para {rec['raciones']} {'ración' if rec['raciones'] == 1 else 'raciones'}", fuente("segoeui.ttf", 38), suave)
        y = 250
        for cant, nom in pagina:
            d.rounded_rectangle([60 * K, y * K, (W - 60) * K, (y + 80) * K], radius=22 * K, fill=BLANCO)
            texto(d, 90, y + 17, cant, fuente("georgiab.ttf", 40), acc)
            fnn, pxn, lnn = ajustar(d, nom, "segoeuib.ttf", (40, 36, 32, 28), 650, 1)
            texto(d, 290, y + 18, lnn[0], fnn, TINTA)
            y += 92
        pie(img, d, tx, suave, k, total)
        s.append(img)
        k += 1
    for pi, pagina in enumerate(paginas):
        img, d = lienzo(fondo)
        texto(d, 90, 80, "PREPARACIÓN" + (f" ({pi + 1}/{len(paginas)})" if len(paginas) > 1 else ""), fuente("segoeuib.ttf", 44), acc)
        y = 190
        for num, lineas in pagina:
            d.ellipse([70 * K, (y + 4) * K, 134 * K, (y + 68) * K], fill=acc)
            fn = fuente("georgiab.ttf", 40)
            w = d.textlength(str(num), font=fn) / K
            d.text(((102 - w / 2) * K, (y + 12) * K), str(num), font=fn, fill=BLANCO)
            for ln in lineas:
                texto(d, 170, y + 6, ln, fpaso, TINTA)
                y += 56
            y += 40
        pie(img, d, tx, suave, k, total)
        s.append(img)
        k += 1
    # valores por ración
    img, d = lienzo(PALETAS["verde"][0])
    fv, tv, av, sv = PALETAS["verde"]
    texto(d, 90, 80, "POR RACIÓN", fuente("segoeuib.ttf", 44), av)
    texto(d, 90, 150, f"1 de {rec['raciones']} {'ración' if rec['raciones'] == 1 else 'raciones'}", fuente("segoeui.ttf", 38), sv)
    texto(d, W / 2, 250, kc, fuente("georgiab.ttf", 250), av, "c")
    texto(d, W / 2, 530, "kcal", fuente("georgiab.ttf", 70), tv, "c")
    cajas = [("Proteínas", por["proteinas"]), ("Hidratos", por["carbs"]), ("Grasas", por["grasas"]), ("Fibra", por["fibra"])]
    for i, (et, v) in enumerate(cajas):
        x0, y0 = 60 + (i % 2) * 480, 650 + (i // 2) * 250
        d.rounded_rectangle([x0 * K, y0 * K, (x0 + 450) * K, (y0 + 220) * K], radius=36 * K, fill=tuple(min(255, c + 22) for c in fv))
        texto(d, x0 + 225, y0 + 30, f"{es(round(v, 1))} g", fuente("georgiab.ttf", 80), av, "c")
        texto(d, x0 + 225, y0 + 140, et, fuente("segoeui.ttf", 40), tv, "c")
    pie(img, d, tv, sv, k, total)
    s.append(img)
    s.append(cierre("coral", "¿Te animas a hacerla?", "Guarda la receta para cuando te toque cocinar y cuéntame qué tal te sale.",
                    "Receta completa, calorías y estudios: enlace en la bio, hsnutricion.com", total, total))
    cap = (f"{base} 🍽️\n\n{ext_desc(rec)}\n⏱️ {rec['tiempo']} · 🔥 {kc} kcal por ración · Nota {rec['rating']} en HSNutrición.\n\n"
           f"Desliza para ver los ingredientes, la preparación y los valores por ración. Guárdala 📌 para cuando te toque cocinar.\n\nReceta completa en el enlace de la bio.\n\n"
           f"{AVISO}\n\n#recetassaludables #comidasana #recetasfaciles #nutricion #comersano #hsnutricion")
    return f"receta-{slug(rec['id'])}", base, s, cap


def ext_desc(rec):
    import re
    t = re.sub(r"\s+", " ", rec["descripcion"]).strip()
    m = re.match(r"(.+?[.!?])(\s|$)", t)
    return m.group(1) if m else t


def car_frase(frase, fuente_txt, etiqueta, i):
    pal = ORDEN_PALETAS[i % 6]
    fondo, tx, acc, suave = PALETAS[pal]
    total = 2
    img, d = lienzo(fondo)
    d.text((70 * K, 70 * K), "“", font=fuente("georgiab.ttf", 420), fill=acc)
    f, px, ln = ajustar(d, frase, "georgiab.ttf", (92, 84, 76, 70, 64, 58, 52), 900, 10)
    alto = len(ln) * int(px * 1.16)
    bloque(d, ln, 90, max(380, 700 - alto // 2), f, px, tx, 1.16)
    fe = fuente("segoeuib.ttf", 30)
    w = d.textlength(etiqueta, font=fe) / K
    d.rounded_rectangle([90 * K, 1100 * K, (90 + w + 52) * K, 1164 * K], radius=32 * K, fill=acc)
    d.text((116 * K, 1113 * K), etiqueta, font=fe, fill=fondo)
    desliza(d, acc, 1100)
    pie(img, d, tx, suave, 1, total)
    img2 = cierre(pal, "Con estudios citados", f"Fuente: {fuente_txt}. Lo explicamos con detalle y con las referencias en HSNutrición.",
                  "Lee la guía completa: enlace en la bio, hsnutricion.com", 2, total)
    cap = (f"{frase} 📌\n\nFuente: {fuente_txt}.\n\nLo explicamos con todos los estudios citados en HSNutrición (enlace en la bio). Guárdalo y compártelo.\n\n{AVISO}\n\n"
           "#nutricion #alimentacionsaludable #datosnutricion #saludable #hsnutricion")
    return f"frase-{i + 1:02d}", frase[:80], [img, img2], cap


# ------------------------------------------------------------------ principal
def main():
    foods = parse_foods_full(DATA_JS)
    foods_rec = parse_foods(DATA_JS)
    recetas = [r for r in parse_recetas(os.path.join(ROOT, "js", "recetas.js")) if r["imagen"]]
    extras = leer_extras_recetas()
    rank = rankings_lib.calcular(foods)
    if os.path.isdir(SALIDA):
        shutil.rmtree(SALIDA)
    os.makedirs(os.path.join(SALIDA, "zips"))
    colas = {"notas": [car_notas(foods)], "top": [], "versus": [], "receta": [], "frase": []}
    for sl in TOPS:
        colas["top"].append(car_top(sl, rank))
    for i, v in enumerate(VERSUS):
        colas["versus"].append(car_versus(foods, v, i))
    for i, r in enumerate(recetas):
        colas["receta"].append(car_receta(r, extras[r["id"]], foods_rec, i))
    for i, (fr, fu, et, pag) in enumerate(FRASES):
        colas["frase"].append(car_frase(fr, fu, et, i))
    patron = ["notas", "top", "receta", "frase", "versus", "receta", "top", "receta", "frase", "versus", "receta", "top"]
    orden = []
    while any(colas.values()):
        for t in patron:
            if colas[t]:
                orden.append((t, colas[t].pop(0)))
    inicio = date.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else date(2026, 11, 20)
    while inicio.weekday() not in (1, 4):  # martes y viernes
        inicio += timedelta(days=1)
    dias, dia = [], inicio
    while len(dias) < len(orden):
        if dia.weekday() in (1, 4):
            dias.append(dia)
        dia += timedelta(days=1)
    manifest = []
    for (tipo, (nombre, titulo, slides, cap)), dia in zip(orden, dias):
        carpeta = os.path.join(SALIDA, nombre)
        os.makedirs(carpeta)
        rutas = []
        for j, im in enumerate(slides, 1):
            ruta = os.path.join(carpeta, f"{j:02d}.jpg")
            im.resize((W, H), Image.LANCZOS).save(ruta, "JPEG", quality=84, optimize=True, progressive=True, subsampling=0)
            rutas.append(f"instagram/{nombre}/{j:02d}.jpg")
        with zipfile.ZipFile(os.path.join(SALIDA, "zips", nombre + ".zip"), "w", zipfile.ZIP_STORED) as z:
            for j in range(1, len(slides) + 1):
                z.write(os.path.join(carpeta, f"{j:02d}.jpg"), f"{nombre}-{j:02d}.jpg")
        manifest.append(dict(id=nombre, tipo=tipo, titulo=titulo, dia=dia.isoformat(), slides=rutas, zip=f"instagram/zips/{nombre}.zip", caption=cap))
        print("  ", dia.isoformat(), tipo, nombre, len(slides), "diapositivas")
    with open(os.path.join(SALIDA, "manifest.json"), "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, ensure_ascii=False, indent=1)
    n = sum(len(m["slides"]) for m in manifest)
    print(f"{len(manifest)} carruseles, {n} diapositivas en pines/instagram/")


if __name__ == "__main__":
    main()
