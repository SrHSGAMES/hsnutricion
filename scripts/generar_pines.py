# -*- coding: utf-8 -*-
"""Genera los pines de Pinterest (1000x1500) y el CSV de subida masiva.

Tipos de pin (todo sale de js/data.js, js/recetas.js y las guías: nada se inventa):
  receta   foto de la receta + título, tiempo, calorías por ración y nota
  foto     solo la foto de la receta, con el nombre discreto
  frase    una afirmación con estudio de nuestras guías/fichas, sobre fondo de color
  top      "Top 5": los 5 primeros de un ranking de alimentos
  dato     una cifra grande calculada con los datos de la guía
  versus   dos alimentos frente a frente en un nutriente
  nota     la nota A-E de un alimento con sus macros

Las imágenes van a img/pines/. El CSV (pines/pines-loteN.csv) sigue el formato de
subida masiva de Pinterest y apunta a https://www.hsnutricion.com/img/pines/...
(hay que desplegar la web antes de subirlo).

Uso: py scripts/generar_pines.py [fecha_inicio AAAA-MM-DD] [pines_por_dia]
"""
import csv
import os
import re
import sys
from datetime import date, datetime, timedelta

from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from generar_recetas import ROOT, DATA_JS, es, formatear_nombre, kcal_tarjeta, parse_recetas, slug  # noqa: E402
from generar_sustitutos import parse_foods_full  # noqa: E402
from generar_tarjetas import NOTA, dibujar_emoji, fuente, partir  # noqa: E402
import rankings_lib  # noqa: E402

W, H, K = 1000, 1500, 2
DOMINIO = "https://www.hsnutricion.com"
SALIDA = os.path.join(ROOT, "img", "pines")
LOGO = os.path.join(ROOT, "img", "logo-header.png")

VERDE, VERDE_OSC = (25, 111, 60), (14, 66, 36)
CREMA, TINTA = (250, 243, 228), (18, 33, 26)
AMARILLO, CORAL, MENTA, BLANCO = (247, 200, 70), (226, 100, 68), (214, 238, 222), (255, 255, 255)
PALETAS = {  # fondo, texto, acento, texto suave
    "verde": (VERDE_OSC, BLANCO, AMARILLO, (190, 225, 200)),
    "crema": (CREMA, TINTA, VERDE, (92, 112, 100)),
    "coral": (CORAL, BLANCO, (255, 237, 200), (255, 222, 205)),
    "amarillo": (AMARILLO, TINTA, VERDE_OSC, (84, 72, 20)),
    "menta": (MENTA, (20, 60, 38), CORAL, (64, 100, 80)),
    "noche": ((18, 43, 32), CREMA, AMARILLO, (170, 200, 180)),
}
ORDEN_PALETAS = ["verde", "crema", "coral", "amarillo", "menta", "noche"]


# ------------------------------------------------------------------ utilidades de dibujo
def lienzo(color):
    img = Image.new("RGB", (W * K, H * K), color)
    return img, ImageDraw.Draw(img)


def cubrir(ruta, w, h):
    im = Image.open(ruta).convert("RGB")
    s = max(w * K / im.width, h * K / im.height)
    im = im.resize((int(im.width * s) + 1, int(im.height * s) + 1), Image.LANCZOS)
    x, y = (im.width - w * K) // 2, (im.height - h * K) // 2
    return im.crop((x, y, x + w * K, y + h * K))


def texto(d, x, y, t, fnt, color, ancla="l"):
    w = d.textlength(t, font=fnt) / K
    if ancla == "c":
        x -= w / 2
    elif ancla == "r":
        x -= w
    d.text((x * K, y * K), t, font=fnt, fill=color)
    return w


def ajustar(d, t, nombre, tamanos, ancho, max_lineas):
    """Mayor cuerpo de la lista con el que t cabe en max_lineas; devuelve (fuente, px, lineas)."""
    for px in tamanos:
        f = fuente(nombre, px)
        ln = partir(d, t, f, ancho, max_lineas)
        if ln:
            return f, px, ln
    f = fuente(nombre, tamanos[-1])
    return f, tamanos[-1], partir(d, t, f, ancho, 99)[:max_lineas]


def bloque(d, lineas, x, y, fnt, px, color, interlineado=1.12, ancla="l"):
    for ln in lineas:
        texto(d, x, y, ln, fnt, color, ancla)
        y += int(px * interlineado)
    return y


def pastilla(img, d, x, y, emoji, t, fondo, color_txt, px=34):
    """Pastilla redondeada con emoji y texto; devuelve el x donde acaba."""
    fnt = fuente("segoeuib.ttf", px)
    w = d.textlength(t, font=fnt) / K
    ancho = w + px * 2.3
    alto = px * 1.9
    d.rounded_rectangle([x * K, y * K, (x + ancho) * K, (y + alto) * K], radius=int(alto / 2 * K), fill=fondo)
    dibujar_emoji(img, emoji, x + px * 0.95, y + alto / 2, int(px * 0.95))
    d.text(((x + px * 1.6) * K, (y + alto / 2 - px * 0.68) * K), t, font=fnt, fill=color_txt)
    return x + ancho


def marca(img, d, y, color, color_url):
    """Pie con el logo y la web."""
    logo = Image.open(LOGO).convert("RGBA")
    alto = 64 * K
    logo = logo.resize((int(logo.width * alto / logo.height), alto), Image.LANCZOS)
    cx = W / 2
    f1, f2 = fuente("georgiab.ttf", 40), fuente("segoeui.ttf", 28)
    w1 = d.textlength("HSNutrición", font=f1) / K
    total = logo.width / K + 14 + w1
    x0 = cx - total / 2
    img.paste(logo, (int(x0 * K), int(y * K)), logo)
    d.text(((x0 + logo.width / K + 14) * K, (y + 8) * K), "HSNutrición", font=f1, fill=color)
    texto(d, cx, y + 76, "hsnutricion.com", f2, color_url, "c")


def sello_nota(d, cx, cy, r, nota, fnt_px=None):
    color, _ = NOTA[nota]
    d.ellipse([(cx - r - 8) * K, (cy - r - 8) * K, (cx + r + 8) * K, (cy + r + 8) * K], fill=BLANCO)
    d.ellipse([(cx - r) * K, (cy - r) * K, (cx + r) * K, (cy + r) * K], fill=color)
    px = fnt_px or int(r * 1.5)
    f = fuente("georgiab.ttf", px)
    w = d.textlength(nota, font=f) / K
    d.text(((cx - w / 2) * K, (cy - px * 0.62) * K), nota, font=f, fill=BLANCO)


def guardar(img, nombre):
    os.makedirs(SALIDA, exist_ok=True)
    ruta = os.path.join(SALIDA, nombre + ".jpg")
    img.resize((W, H), Image.LANCZOS).save(ruta, "JPEG", quality=74, optimize=True, progressive=True, subsampling=2)
    return ruta


# ------------------------------------------------------------------ datos de recetas
def leer_extras_recetas():
    """id -> (etiquetas, momento) de js/recetas.js (parse_recetas no los extrae)."""
    txt = open(os.path.join(ROOT, "js", "recetas.js"), encoding="utf-8").read()
    extras = {}
    for m in re.finditer(r'id: "([^"]+)",(.*?)(?=\n  \{\n    id: |\Z)', txt, flags=re.S):
        cuerpo = m.group(2)
        et = re.search(r"etiquetas: \[([^\]]*)\]", cuerpo)
        mo = re.search(r"momento: \[([^\]]*)\]", cuerpo)
        extras[m.group(1)] = (re.findall(r'"([^"]+)"', et.group(1)) if et else [], re.findall(r'"([^"]+)"', mo.group(1)) if mo else [])
    return extras


ETIQUETA_TXT = {"vegano": ("VEGANA", "🌱"), "proteico": ("ALTA EN PROTEÍNA", "💪"), "bajo-en-calorias": ("LIGERA", "🥗"), "vegetariano": ("VEGETARIANA", "🥦")}
MOMENTO_TXT = {"desayuno": "DESAYUNO", "comida": "COMIDA", "cena": "CENA", "snack": "SNACK"}


def chip_receta(extras):
    et, mo = extras
    for k in ("proteico", "vegano", "bajo-en-calorias", "vegetariano"):
        if k in et:
            return ETIQUETA_TXT[k][0]
    return MOMENTO_TXT.get(mo[0], "RECETA SALUDABLE") if mo else "RECETA SALUDABLE"


# ------------------------------------------------------------------ plantillas
def pin_receta(rec, extras, variante):
    fondo, tx, acc, suave = PALETAS["crema" if variante % 2 == 0 else "verde"]
    img, d = lienzo(fondo)
    foto = cubrir(os.path.join(ROOT, rec["imagen"]), W, 860)
    img.paste(foto, (0, 0))
    # etiqueta sobre la foto
    ch = chip_receta(extras)
    f = fuente("segoeuib.ttf", 30)
    w = d.textlength(ch, font=f) / K
    d.rounded_rectangle([40 * K, 40 * K, (40 + w + 52) * K, 100 * K], radius=30 * K, fill=BLANCO)
    d.text((66 * K, 52 * K), ch, font=f, fill=VERDE_OSC)
    sello_nota(d, 878, 860, 78, rec["rating"])
    # título
    f, px, ln = ajustar(d, formatear_nombre(rec["nombre"]), "georgiab.ttf", (80, 72, 66, 60, 54), 830, 3)
    y = bloque(d, ln, 56, 945, f, px, tx, 1.06)
    # datos clave
    kc = kcal_tarjeta(rec).replace(" por ración", "")
    x = 56
    yy = 1232
    x = pastilla(img, d, x, yy, "⏱️", rec["tiempo"], acc if variante % 2 == 0 else AMARILLO, BLANCO if variante % 2 == 0 else TINTA) + 18
    pastilla(img, d, x, yy, "🔥", kc + "/ración", acc if variante % 2 == 0 else AMARILLO, BLANCO if variante % 2 == 0 else TINTA)
    # llamada a la acción y marca
    texto(d, W / 2, 1318, "Receta completa con ingredientes y pasos  →", fuente("segoeuib.ttf", 30), tx, "c")
    marca(img, d, 1382, tx, suave)
    return img


def pin_foto(rec, extras):
    img, d = lienzo(CREMA)
    img.paste(cubrir(os.path.join(ROOT, rec["imagen"]), W, 1130), (0, 0))
    sello_nota(d, 900, 1130, 66, rec["rating"])
    f, px, ln = ajustar(d, formatear_nombre(rec["nombre"]), "georgiaz.ttf", (62, 56, 50, 46), 820, 2)
    y = bloque(d, ln, 60, 1190, f, px, TINTA, 1.08)
    texto(d, 62, 1190 + len(ln) * int(px * 1.08) + 6, "Receta saludable · hsnutricion.com", fuente("segoeui.ttf", 28), (92, 112, 100))
    logo = Image.open(LOGO).convert("RGBA")
    alto = 70 * K
    logo = logo.resize((int(logo.width * alto / logo.height), alto), Image.LANCZOS)
    img.paste(logo, ((W - 60) * K - logo.width, 1370 * K), logo)
    return img


def pin_frase(frase, fuente_txt, etiqueta, paleta):
    fondo, tx, acc, suave = PALETAS[paleta]
    img, d = lienzo(fondo)
    d.text((54 * K, 70 * K), "“", font=fuente("georgiab.ttf", 420), fill=acc)
    f, px, ln = ajustar(d, frase, "georgiab.ttf", (86, 78, 70, 64, 58, 52, 48), 820, 11)
    alto = len(ln) * int(px * 1.16)
    y0 = max(380, 740 - alto // 2)
    y = bloque(d, ln, 90, y0, f, px, tx, 1.16)
    d.rounded_rectangle([90 * K, (y + 34) * K, 250 * K, (y + 42) * K], radius=4 * K, fill=acc)
    texto(d, 90, y + 70, fuente_txt, fuente("segoeui.ttf", 32), suave)
    fe = fuente("segoeuib.ttf", 28)
    w = d.textlength(etiqueta, font=fe) / K
    d.rounded_rectangle([90 * K, 1190 * K, (90 + w + 48) * K, 1250 * K], radius=30 * K, fill=acc)
    d.text((114 * K, 1203 * K), etiqueta, font=fe, fill=fondo)
    marca(img, d, 1330, tx, suave)
    return img


def pin_top(titulo, items, unidad, etiqueta_metrica, paleta):
    fondo, tx, acc, suave = PALETAS[paleta]
    img, d = lienzo(fondo)
    texto(d, 70, 60, "TOP 5", fuente("segoeuib.ttf", 40), acc)
    f, px, ln = ajustar(d, titulo, "georgiab.ttf", (90, 82, 74, 66), 860, 3)
    y = bloque(d, ln, 70, 112, f, px, tx, 1.06)
    texto(d, 70, y + 6, etiqueta_metrica, fuente("segoeui.ttf", 30), suave)
    maximo = max(v for _, _, v in items) or 1
    y = 520
    fila = 150
    for i, (nombre, emoji, v) in enumerate(items, 1):
        d.rounded_rectangle([60 * K, y * K, (W - 60) * K, (y + fila - 16) * K], radius=26 * K, fill=BLANCO if paleta in ("crema", "menta", "amarillo") else tuple(min(255, c + 22) for c in fondo))
        d.ellipse([84 * K, (y + 28) * K, 148 * K, (y + 92) * K], fill=acc)
        fn = fuente("georgiab.ttf", 40)
        w = d.textlength(str(i), font=fn) / K
        d.text(((116 - w / 2) * K, (y + 33) * K), str(i), font=fn, fill=fondo if paleta not in ("crema",) else BLANCO)
        dibujar_emoji(img, emoji, 208, y + 60, 56)
        fnom, pxn, lnn = ajustar(d, formatear_nombre(nombre), "segoeuib.ttf", (38, 34, 30, 27), 400, 2)
        yn = y + 60 - len(lnn) * int(pxn * 1.1) // 2 - 4
        bloque(d, lnn, 252, yn, fnom, pxn, tx if paleta not in ("crema", "menta", "amarillo") else TINTA, 1.1)
        # barra + valor
        bx0, bx1 = 690, 940
        d.rounded_rectangle([bx0 * K, (y + 84) * K, bx1 * K, (y + 100) * K], radius=8 * K, fill=tuple(int(c * 0.5 + f2 * 0.5) for c, f2 in zip(fondo, acc)))
        d.rounded_rectangle([bx0 * K, (y + 84) * K, (bx0 + (bx1 - bx0) * max(0.08, v / maximo)) * K, (y + 100) * K], radius=8 * K, fill=acc)
        fv = fuente("georgiab.ttf", 44)
        texto(d, bx0, y + 24, f"{es(v)} {unidad}", fv, tx if paleta not in ("crema", "menta", "amarillo") else TINTA)
        y += fila
    texto(d, W / 2, 1288, "Lista completa con notas A-E y estudios  →", fuente("segoeuib.ttf", 30), tx, "c")
    marca(img, d, 1356, tx, suave)
    return img


def pin_dato(cifra, unidad, texto_dato, detalle, paleta):
    fondo, tx, acc, suave = PALETAS[paleta]
    img, d = lienzo(fondo)
    texto(d, W / 2, 110, "¿SABÍAS QUE…?", fuente("segoeuib.ttf", 42), acc, "c")
    fc = fuente("georgiab.ttf", 330 if len(cifra) <= 3 else 250 if len(cifra) <= 5 else 190)
    texto(d, W / 2, 250, cifra, fc, acc, "c")
    texto(d, W / 2, 250 + (330 if len(cifra) <= 3 else 250 if len(cifra) <= 5 else 190) * 1.08, unidad, fuente("georgiab.ttf", 64), tx, "c")
    f, px, ln = ajustar(d, texto_dato, "georgiab.ttf", (70, 64, 58, 52), 820, 4)
    y = bloque(d, ln, W / 2, 790, f, px, tx, 1.16, "c")
    if detalle:
        fd, pxd, lnd = ajustar(d, detalle, "segoeui.ttf", (32, 30, 28), 800, 3)
        bloque(d, lnd, W / 2, y + 30, fd, pxd, suave, 1.3, "c")
    marca(img, d, 1330, tx, suave)
    return img


def pin_versus(a, b, valor_a, valor_b, etiqueta, unidad, paleta, menor_gana=True):
    fondo, tx, acc, suave = PALETAS[paleta]
    img, d = lienzo(fondo)
    texto(d, W / 2, 80, etiqueta.upper(), fuente("segoeuib.ttf", 36), acc, "c")
    gana_a = (valor_a < valor_b) if menor_gana else (valor_a > valor_b)
    for i, (food, v, gana) in enumerate(((a, valor_a, gana_a), (b, valor_b, not gana_a))):
        x0 = 40 + i * 480
        d.rounded_rectangle([x0 * K, 170 * K, (x0 + 440) * K, 1140 * K], radius=40 * K,
                            fill=tuple(min(255, c + 24) if paleta in ("verde", "noche") else max(0, c - 14) for c in fondo), outline=acc if gana else None, width=8 * K if gana else 0)
        cx = x0 + 220
        dibujar_emoji(img, food.get("emoji"), cx, 330, 160)
        fn, pxn, lnn = ajustar(d, formatear_nombre(food["nombre"]), "georgiab.ttf", (50, 44, 40, 36), 350, 2)
        bloque(d, lnn, cx, 470, fn, pxn, tx, 1.12, "c")
        texto(d, cx, 660, es(v), fuente("georgiab.ttf", 150 if len(es(v)) <= 4 else 110), acc if gana else suave, "c")
        texto(d, cx, 850, unidad, fuente("segoeuib.ttf", 34), tx, "c")
        sello = fuente("segoeuib.ttf", 32)
        etq = "MEJOR OPCIÓN" if gana else "MENOS RECOMENDABLE"
        if gana:
            w = d.textlength(etq, font=sello) / K
            d.rounded_rectangle([(cx - w / 2 - 24) * K, 960 * K, (cx + w / 2 + 24) * K, 1020 * K], radius=30 * K, fill=acc)
            d.text(((cx - w / 2) * K, 971 * K), etq, font=sello, fill=fondo)
        color, _ = NOTA[food["rating"]]
        d.ellipse([(cx - 40) * K, 1050 * K, (cx + 40) * K, 1130 * K], fill=color)
        fr = fuente("georgiab.ttf", 56)
        w = d.textlength(food["rating"], font=fr) / K
        d.text(((cx - w / 2) * K, 1056 * K), food["rating"], font=fr, fill=BLANCO)
    f, px, ln = ajustar(d, "¿Cuál eliges?", "georgiab.ttf", (70,), 800, 1)
    texto(d, W / 2, 1190, "¿Cuál eliges?", f, tx, "c")
    marca(img, d, 1330, tx, suave)
    return img


def pin_nota(food, paleta):
    fondo, tx, acc, suave = PALETAS[paleta]
    img, d = lienzo(fondo)
    color, etq = NOTA[food["rating"]]
    texto(d, W / 2, 80, "¿QUÉ NOTA TIENE?", fuente("segoeuib.ttf", 40), acc, "c")
    f, px, ln = ajustar(d, formatear_nombre(food["nombre"]), "georgiab.ttf", (104, 94, 84, 74, 64), 860, 2)
    y = bloque(d, ln, W / 2, 150, f, px, tx, 1.08, "c")
    dibujar_emoji(img, food.get("emoji"), 330, 600, 230)
    cx, cy, r = 700, 620, 170
    d.ellipse([(cx - r - 12) * K, (cy - r - 12) * K, (cx + r + 12) * K, (cy + r + 12) * K], fill=BLANCO)
    d.ellipse([(cx - r) * K, (cy - r) * K, (cx + r) * K, (cy + r) * K], fill=color)
    fl = fuente("georgiab.ttf", 270)
    w = d.textlength(food["rating"], font=fl) / K
    d.text(((cx - w / 2) * K, (cy - 170) * K), food["rating"], font=fl, fill=BLANCO)
    texto(d, W / 2, 860, f"Nota {food['rating']}: {etq.lower()}", fuente("georgiab.ttf", 56), tx, "c")
    texto(d, W / 2, 940, "Por 100 g", fuente("segoeui.ttf", 30), suave, "c")
    cols = [("kcal", "kcal", ""), ("proteinas", "proteínas", " g"), ("grasas", "grasas", " g"), ("fibra", "fibra", " g")]
    for i, (k, etqm, suf) in enumerate(cols):
        cx2 = 140 + i * 240
        texto(d, cx2, 990, es(food[k]) + suf, fuente("segoeuib.ttf", 48), acc, "c")
        texto(d, cx2, 1052, etqm, fuente("segoeui.ttf", 28), suave, "c")
    texto(d, W / 2, 1210, "Mira por qué en la guía  →", fuente("segoeuib.ttf", 32), tx, "c")
    marca(img, d, 1330, tx, suave)
    return img


# ------------------------------------------------------------------ contenido
# (frase, fuente, etiqueta, página). Cada afirmación sale de nuestras guías y fichas, con sus estudios citados.
FRASES = [
    ("No existe un nivel de consumo de alcohol que no afecte a la salud.", "OMS, Oficina para Europa (2023)", "GUÍA DEL ALCOHOL", "guia-alcohol.html"),
    ("El alcohol causa cáncer de boca, faringe, laringe, esófago, hígado, colon y mama. Y el riesgo sube con la cantidad.", "Guía del alcohol · HSNutrición", "GUÍA DEL ALCOHOL", "guia-alcohol.html"),
    ("Durante años se creyó que una copa de vino al día protegía el corazón. Los estudios genéticos más sólidos no respaldan ese efecto.", "Guía del alcohol · HSNutrición", "GUÍA DEL ALCOHOL", "guia-alcohol.html"),
    ("Evidentemente, lo recomendable son 0 g de alcohol al día. Cualquier otra cifra es peligrosa.", "Guía del alcohol · HSNutrición", "GUÍA DEL ALCOHOL", "guia-alcohol.html"),
    ("Una gran revisión de revisiones del BMJ (2024) halló peor salud asociada a los ultraprocesados en 32 de 45 resultados.", "BMJ, 2024 · Guía de ultraprocesados", "GUÍA DE ULTRAPROCESADOS", "guia-ultraprocesados.html"),
    ("Cada 10 % más de ultraprocesados en la dieta supone un 12 % más de riesgo de diabetes tipo 2.", "Metaanálisis · Guía de ultraprocesados", "GUÍA DE ULTRAPROCESADOS", "guia-ultraprocesados.html"),
    ("Sustituir carne roja y procesada por legumbres, frutos secos o pescado se asocia con menos riesgo.", "Guía de proteínas · HSNutrición", "GUÍA DE PROTEÍNAS", "guia-proteinas.html"),
    ("Las legumbres, los frutos secos y los cereales integrales se asocian con menos mortalidad. La carne roja y la procesada, con más.", "Guía de proteínas · HSNutrición", "GUÍA DE PROTEÍNAS", "guia-proteinas.html"),
    ("Por cada ración diaria, los frutos secos se asociaron con un 24 % menos de mortalidad y el pescado con un 7 % menos.", "Metaanálisis · Guía de proteínas", "GUÍA DE PROTEÍNAS", "guia-proteinas.html"),
    ("La carne procesada es carcinógena del grupo 1 de la IARC: hay evidencia suficiente de que causa cáncer colorrectal.", "IARC (OMS) · Fichas de HSNutrición", "NOTA E", "alimento-embutido.html"),
    ("La carne roja es probablemente carcinógena para las personas (grupo 2A de la IARC).", "IARC (OMS) · Fichas de HSNutrición", "NOTA D", "alimento-ternera-filete.html"),
    ("Por cada 250 ml al día de bebidas azucaradas, el riesgo de diabetes tipo 2 aumenta un 19 %.", "Metaanálisis · Ficha del refresco", "NOTA E", "alimento-refresco.html"),
    ("Un consumo habitual alto de sal, frente a uno bajo, se asocia con un 68 % más de riesgo de cáncer de estómago.", "Metaanálisis · Ficha de la sal", "NOTA E", "alimento-sal.html"),
    ("Una revisión de revisiones del BMJ recomienda mantener los azúcares libres por debajo de 25 g al día.", "BMJ · Ficha de la leche condensada", "AZÚCAR", "alimento-leche-condensada.html"),
    ("Cada alimento de nuestra guía tiene una nota de la A a la E y estudios de PubMed citados.", "HSNutrición", "SIN MITOS", "metodologia.html"),
]

TOPS = [  # slug del ranking, emoji de reserva
    "alimentos-con-mas-proteinas", "alimentos-con-menos-calorias", "alimentos-ricos-en-fibra", "alimentos-vegetales-con-mas-proteinas",
    "verduras-con-mas-proteinas", "verduras-ricas-en-fibra", "frutas-ricas-en-fibra", "frutas-con-menos-azucar",
    "pescados-con-mas-proteinas", "frutos-secos-con-mas-proteinas", "legumbres-y-proteina-vegetal-ricas-en-fibra", "lacteos-con-mas-proteinas",
    "cereales-ricos-en-fibra", "cereales-con-mas-proteinas",
]

VERSUS = [  # (id A, id B, métrica, etiqueta, unidad, menor gana)
    ("yogur_natural", "yogur_azucarado", "azucares", "Azúcar por 100 g", "g de azúcar", True),
    ("pan_integral", "pan_blanco", "fibra", "Fibra por 100 g", "g de fibra", False),
    ("arroz_integral", "arroz_blanco", "fibra", "Fibra por 100 g", "g de fibra", False),
    ("aove", "mantequilla", "grasasSat", "Grasa saturada por 100 g", "g de grasa saturada", True),
    ("patata_cocida", "patatas_fritas", "kcal", "Calorías por 100 g", "kcal", True),
    ("chocolate_negro_70", "chocolate_leche", "azucares", "Azúcar por 100 g", "g de azúcar", True),
    ("avena", "cereales_azucarados", "azucares", "Azúcar por 100 g", "g de azúcar", True),
    ("pechuga_de_pollo", "salchichas", "grasasSat", "Grasa saturada por 100 g", "g de grasa saturada", True),
    ("lentejas_cocidas", "ternera_filete", "fibra", "Fibra por 100 g", "g de fibra", False),
]

NOTAS = ["lentejas_cocidas", "salmon", "aguacate", "avena", "brocoli", "aove", "huevo", "nueces", "garbanzos", "sardina", "yogur_natural",
         "espinacas", "arandanos", "tofu", "quinoa", "manzana", "embutido", "refresco", "patatas_fritas", "cerveza", "bolleria_industrial",
         "mantequilla", "bacon", "galletas", "azucar"]


def buscar(foods, base):
    for k in (base, "ia_" + base):
        if k in foods:
            return foods[k]
    raise KeyError(base)


def construir_datos(foods):
    """Lista de cifras grandes calculadas con los datos de la guía."""
    datos = []
    refresco = buscar(foods, "refresco")
    datos.append((es(round(refresco["azucares"] * 3.3, 1)), "g de azúcar", "tiene una lata de refresco de 330 ml.",
                  "Más del tope de 25 g de azúcares libres al día que recomienda una revisión del BMJ.", "coral", "alimento-refresco.html", "Lo que lleva una lata de refresco"))
    aove = buscar(foods, "aove")
    datos.append((es(round(aove["kcal"] * 0.1)), "kcal", "tiene una cucharada sopera (10 g) de aceite de oliva virgen extra.",
                  "Es una grasa saludable, pero concentrada: mide la cantidad.", "verde", "alimento-aove.html", "Calorías de una cucharada de aceite de oliva"))
    huevo = buscar(foods, "huevo")
    datos.append((es(round(huevo["proteinas"] * 0.6, 1)), "g de proteína", "aporta un huevo mediano (60 g).",
                  "Además de la proteína completa, un huevo cuesta pocas calorías.", "amarillo", "alimento-huevo.html", "Proteína de un huevo"))
    lc = buscar(foods, "lentejas_cocidas")
    datos.append((es(round(lc["fibra"] * 2, 1)), "g de fibra", "tiene un plato de lentejas cocidas (200 g).",
                  "Las legumbres son de los alimentos con más fibra de la guía.", "crema", "alimento-lentejas-cocidas.html", "Fibra de un plato de lentejas"))
    sal = buscar(foods, "sal")
    datos.append((str(len(foods)), "alimentos", "analizados en HSNutrición, con nota de la A a la E y estudios citados.", "Sin patrocinios y con las fuentes a la vista.", "noche", "index.html", "Guía de alimentos con nota A-E"))
    nA = sum(1 for f in foods.values() if f["rating"] == "A")
    datos.append((str(nA), "alimentos con nota A", "en nuestra guía: los que más suman a tu dieta.", "Verduras, legumbres, pescados azules, frutos secos…", "verde", "alimentos-saludables.html", "Alimentos con nota A"))
    pf = buscar(foods, "patatas_fritas")
    datos.append((es(pf["kcal"]), "kcal", "por 100 g tienen las patatas fritas de bolsa.", "Y mucha sal: un puñado pequeño ya es un buen aporte de sodio.", "coral", "alimento-patatas-fritas.html", "Calorías de las patatas fritas de bolsa"))
    return datos


# ------------------------------------------------------------------ descripción y CSV
def tablero_receta(rec, extras):
    et, mo = extras
    if "vegano" in et:
        return "Recetas veganas y vegetarianas"
    if "proteico" in et:
        return "Recetas altas en proteína"
    if mo and mo[0] == "desayuno":
        return "Desayunos saludables"
    if mo and mo[0] == "cena":
        return "Cenas ligeras y saludables"
    if mo and mo[0] == "snack":
        return "Snacks saludables"
    return "Recetas saludables y fáciles"


def primera_frase(t, n=170):
    t = re.sub(r"\s+", " ", t).strip()
    p = re.match(r"(.+?[.!?])(\s|$)", t)
    s = p.group(1) if p else t
    return s if len(s) <= n else s[:n].rsplit(" ", 1)[0] + "…"


def main():
    foods = parse_foods_full(DATA_JS)
    recetas = [r for r in parse_recetas(os.path.join(ROOT, "js", "recetas.js")) if r["imagen"]]
    extras = leer_extras_recetas()
    rank = rankings_lib.calcular(foods)
    if os.path.isdir(SALIDA):
        for f in os.listdir(SALIDA):
            if f.endswith(".jpg"):
                os.remove(os.path.join(SALIDA, f))
    pines = {"receta": [], "foto": [], "frase": [], "top": [], "dato": [], "versus": [], "nota": []}

    for i, r in enumerate(recetas):
        url = f"{DOMINIO}/receta-{slug(r['id'])}.html"
        kc = kcal_tarjeta(r).replace(" por ración", "")
        base = formatear_nombre(r["nombre"])
        guardar(pin_receta(r, extras[r["id"]], i), f"receta-{slug(r['id'])}")
        pines["receta"].append(dict(
            archivo=f"receta-{slug(r['id'])}", titulo=f"{base}: receta saludable en {r['tiempo']}"[:100],
            desc=f"{base}. {primera_frase(r['descripcion'])} {r['tiempo']} · {kc} por ración. Receta completa con ingredientes, pasos y valores nutricionales en hsnutricion.com. #recetassaludables #comidasana #nutricion",
            link=url, tablero=tablero_receta(r, extras[r["id"]])))
        guardar(pin_foto(r, extras[r["id"]]), f"foto-{slug(r['id'])}")
        pines["foto"].append(dict(
            archivo=f"foto-{slug(r['id'])}", titulo=f"{base} | Receta saludable"[:100],
            desc=f"{base}: una receta saludable, con nota {r['rating']} en HSNutrición. Ingredientes, pasos y calorías por ración en hsnutricion.com. #recetassaludables #comerbien #nutricion",
            link=url, tablero=tablero_receta(r, extras[r["id"]])))
        print("  receta", r["id"])

    for i, (fr, fu, et, pag) in enumerate(FRASES):
        nombre = f"frase-{i + 1:02d}"
        guardar(pin_frase(fr, fu, et, ORDEN_PALETAS[i % len(ORDEN_PALETAS)]), nombre)
        assert os.path.exists(os.path.join(ROOT, pag)), pag
        pines["frase"].append(dict(archivo=nombre, titulo=fr[:100], desc=f"{fr} Fuente: {fu}. Con los estudios citados en hsnutricion.com. #nutricion #saludable #datosnutricion",
                                   link=f"{DOMINIO}/{pag}", tablero="Datos y frases de nutrición"))

    for i, sl in enumerate(TOPS):
        r = rankings_lib.ranking_de(sl)
        lista = [f for f in rank[sl] if f["rating"] in ("A", "B")][:5]
        assert len(lista) == 5, sl
        items = [(f["nombre"], f.get("emoji") or "🍽️", f[r["metrica"]]) for f in lista]
        titulo = r["h1"]
        nombre = f"top-{sl}"
        guardar(pin_top(titulo, items, rankings_lib.UNIDAD[r["metrica"]], "por 100 g · solo alimentos con nota A o B", ORDEN_PALETAS[(i + 2) % len(ORDEN_PALETAS)]), nombre)
        assert os.path.exists(os.path.join(ROOT, sl + ".html")), sl
        pines["top"].append(dict(archivo=nombre, titulo=f"Top 5: {titulo.lower()}"[:100],
                                 desc=f"Los 5 {titulo.lower()} por 100 g, según nuestra guía. Lista completa con nota de la A a la E y estudios citados en hsnutricion.com. #alimentossaludables #nutricion #comersano",
                                 link=f"{DOMINIO}/{sl}.html", tablero="Alimentos: notas de la A a la E"))

    for i, (cifra, unidad, tx, det, pal, pag, tit) in enumerate(construir_datos(foods)):
        nombre = f"dato-{i + 1:02d}"
        guardar(pin_dato(cifra, unidad, tx, det, pal), nombre)
        assert os.path.exists(os.path.join(ROOT, pag)), pag
        pines["dato"].append(dict(archivo=nombre, titulo=tit[:100], desc=f"{cifra} {unidad} {tx} {det} Más datos en hsnutricion.com. #datosnutricion #nutricion #saludable",
                                  link=f"{DOMINIO}/{pag}", tablero="Datos y frases de nutrición"))

    for i, (ia, ib, met, etq, uni, menor) in enumerate(VERSUS):
        a, b = buscar(foods, ia), buscar(foods, ib)
        nombre = f"versus-{ia}-vs-{ib}"
        guardar(pin_versus(a, b, a[met], b[met], etq, uni, ORDEN_PALETAS[(i + 3) % len(ORDEN_PALETAS)], menor), nombre)
        pagina = f"alimento-{slug(a['id'])}.html"
        assert os.path.exists(os.path.join(ROOT, pagina)), pagina
        pines["versus"].append(dict(archivo=nombre, titulo=f"{formatear_nombre(a['nombre'])} o {formatear_nombre(b['nombre'])}: ¿cuál es mejor?"[:100],
                                    desc=f"{etq}: {formatear_nombre(a['nombre'])} {es(a[met])} frente a {formatear_nombre(b['nombre'])} {es(b[met])}. Compara más alimentos con nota de la A a la E en hsnutricion.com. #alimentacionsaludable #nutricion",
                                    link=f"{DOMINIO}/{pagina}", tablero="Alimentos: notas de la A a la E"))

    for i, base in enumerate(NOTAS):
        f = buscar(foods, base)
        nombre = f"nota-{slug(f['id'])}"
        guardar(pin_nota(f, ORDEN_PALETAS[i % len(ORDEN_PALETAS)]), nombre)
        pagina = f"alimento-{slug(f['id'])}.html"
        assert os.path.exists(os.path.join(ROOT, pagina)), pagina
        pines["nota"].append(dict(archivo=nombre, titulo=f"¿Qué nota tiene {formatear_nombre(f['nombre']).lower()}? Nota {f['rating']}"[:100],
                                  desc=f"{formatear_nombre(f['nombre'])}: nota {f['rating']} en HSNutrición, con los estudios que lo explican. {es(f['kcal'])} kcal y {es(f['proteinas'])} g de proteína por 100 g. #nutricion #alimentacionsaludable",
                                  link=f"{DOMINIO}/{pagina}", tablero="Alimentos: notas de la A a la E"))

    # ---- orden intercalado y calendario
    colas = {k: list(v) for k, v in pines.items()}
    colas["foto"].reverse()
    patron = ["receta", "frase", "foto", "top", "receta", "versus", "foto", "nota", "receta", "dato", "foto", "top", "receta", "frase", "foto", "nota"]
    orden = []
    while any(colas.values()):
        for t in patron:
            if colas[t]:
                orden.append((t, colas[t].pop(0)))
        if not any(colas[t] for t in patron):
            break
    inicio = date.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else date(2026, 11, 17)
    por_dia = int(sys.argv[2]) if len(sys.argv) > 2 else 4
    horas = {3: ["08:00", "13:00", "19:00"], 4: ["08:00", "12:00", "17:00", "20:00"], 5: ["07:00", "10:00", "13:00", "17:00", "20:00"]}[por_dia]
    os.makedirs(os.path.join(ROOT, "pines"), exist_ok=True)
    lote_tam = por_dia * 25  # Pinterest permite programar hasta 30 días y 200 pines por CSV
    for n in range(0, len(orden), lote_tam):
        trozo = orden[n:n + lote_tam]
        ruta = os.path.join(ROOT, "pines", f"pines-lote{n // lote_tam + 1}.csv")
        with open(ruta, "w", encoding="utf-8-sig", newline="") as fh:
            w = csv.writer(fh)
            w.writerow(["Title", "Media URL", "Pinterest board", "Thumbnail", "Description", "Link", "Publish date", "Keywords"])
            for j, (tipo, p) in enumerate(trozo):
                dia = inicio + timedelta(days=(n + j) // por_dia)
                hora = horas[(n + j) % por_dia]
                w.writerow([p["titulo"], f"{DOMINIO}/img/pines/{p['archivo']}.jpg", p["tablero"], "", p["desc"][:500], p["link"], f"{dia.isoformat()}T{hora}:00", ""])
        print(f"  {ruta}: {len(trozo)} pines")
    total = sum(os.path.getsize(os.path.join(SALIDA, f)) for f in os.listdir(SALIDA)) // 1024
    print(f"{len(orden)} pines en img/pines/ ({total} KB)")


if __name__ == "__main__":
    main()
