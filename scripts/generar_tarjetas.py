# -*- coding: utf-8 -*-
"""Genera las tarjetas de imagen (1200x630) que usan como miniatura y para compartir:
  - img/alimentos/<slug>.jpg: una por ficha de alimento (nombre, nota A-E y macros por 100 g).
  - img/listas/<slug>.jpg: una por página de lista (recetas por intención, alimentos saludables...).

Las imágenes se dibujan con Pillow y fuentes del sistema (Georgia, Segoe UI y Segoe UI Emoji,
de Windows) y se guardan en el repositorio: el sitio no las genera en producción.
Es seguro repetirlo: el resultado es el mismo para los mismos datos.

Uso: py scripts/generar_tarjetas.py            (fichas de alimento)
     py scripts/generar_tarjetas.py listas     (también las tarjetas de listas: las llama generar_listas.py)
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from generar_recetas import ROOT, DATA_JS, es, formatear_nombre, slug  # noqa: E402
from generar_sustitutos import parse_foods_full  # noqa: E402

FUENTES = r"C:\Windows\Fonts"
W, H, K = 1200, 630, 2          # tamaño final y factor de supersampling
VERDE_800, VERDE_700, VERDE_50 = (20, 87, 48), (25, 111, 60), (241, 250, 243)
TINTA, TINTA_SUAVE, LINEA = (18, 33, 26), (74, 98, 84), (227, 236, 229)
NOTA = {"A": ((31, 138, 73), "Excelente"), "B": ((99, 169, 47), "Buena"), "C": ((201, 154, 30), "Moderada"),
        "D": ((217, 122, 43), "Mejorable"), "E": ((208, 64, 47), "Poco recomendable")}
LOGO = os.path.join(ROOT, "img", "logo-header.png")


def fuente(nombre, px):
    return ImageFont.truetype(os.path.join(FUENTES, nombre), px * K)


def emoji_disponible(emoji):
    """False si Segoe UI Emoji no tiene el glifo (se dibujaría un cuadrado vacío)."""
    f = fuente("seguiemj.ttf", 60)
    ref = f.getmask("\U0010FFFF")
    m = f.getmask(emoji)
    return m.size != ref.size or bytes(m) != bytes(ref)


def texto_centrado(d, cx, y, txt, fnt, color):
    w = d.textlength(txt, font=fnt)
    d.text((cx * K - w / 2, y * K), txt, font=fnt, fill=color)


def partir(d, txt, fnt, ancho_px, max_lineas):
    """Parte el texto en líneas de como mucho ancho_px; devuelve None si no caben en max_lineas."""
    lineas, actual = [], ""
    for palabra in txt.split():
        prueba = (actual + " " + palabra).strip()
        if d.textlength(prueba, font=fnt) <= ancho_px * K:
            actual = prueba
        else:
            if actual:
                lineas.append(actual)
            actual = palabra
    lineas.append(actual)
    return lineas if len(lineas) <= max_lineas else None


def lienzo():
    img = Image.new("RGB", (W * K, H * K), VERDE_50)
    d = ImageDraw.Draw(img)
    # Degradado vertical suave de verde muy claro a blanco
    for y in range(H * K):
        t = y / (H * K)
        c = tuple(int(VERDE_50[i] + (255 - VERDE_50[i]) * t) for i in range(3))
        d.line([(0, y), (W * K, y)], fill=c)
    # Marco fino
    d.rounded_rectangle([14 * K, 14 * K, (W - 14) * K, (H - 14) * K], radius=34 * K, outline=LINEA, width=3 * K)
    # Marca arriba a la izquierda
    logo = Image.open(LOGO).convert("RGBA")
    alto = 54 * K
    logo = logo.resize((int(logo.width * alto / logo.height), alto), Image.LANCZOS)
    img.paste(logo, (64 * K, 46 * K), logo)
    d.text((64 * K + logo.width + 16 * K, 52 * K), "HSNutrición", font=fuente("georgiab.ttf", 40), fill=VERDE_800)
    return img, d


def dibujar_emoji(img, emoji, cx, cy, px):
    if not emoji or not emoji_disponible(emoji):
        return
    capa = Image.new("RGBA", (px * 2 * K, px * 2 * K), (0, 0, 0, 0))
    ImageDraw.Draw(capa).text((px * K // 2, px * K // 4), emoji, font=fuente("seguiemj.ttf", px), embedded_color=True)
    caja = capa.getbbox()
    if caja:
        capa = capa.crop(caja)
        img.paste(capa, (int(cx * K - capa.width / 2), int(cy * K - capa.height / 2)), capa)


def guardar(img, ruta):
    os.makedirs(os.path.dirname(ruta), exist_ok=True)
    img.resize((W, H), Image.LANCZOS).save(ruta, "JPEG", quality=76, optimize=True, progressive=True, subsampling=2)


def tarjeta_alimento(food, ruta):
    img, d = lienzo()
    nombre = formatear_nombre(food["nombre"])
    color, etiqueta = NOTA[food["rating"]]
    # Nombre: el cuerpo más grande que quepa en 2 líneas (columna de 700 px)
    for px in (88, 80, 72, 64, 56, 50):
        fnt = fuente("georgiab.ttf", px)
        lineas = partir(d, nombre, fnt, 700, 2)
        if lineas:
            break
    else:
        px = 46
        fnt = fuente("georgiab.ttf", px)
        lineas = partir(d, nombre, fnt, 700, 3)
    y = 168
    for ln in lineas:
        d.text((64 * K, y * K), ln, font=fnt, fill=TINTA)
        y += int(px * 1.12) if px else 56
    d.text((64 * K, (y + 6) * K), "Información nutricional por 100 g", font=fuente("segoeui.ttf", 30), fill=TINTA_SUAVE)
    # Macros en 5 columnas
    columnas = [("kcal", "kcal"), ("carbs", "carbohidratos"), ("proteinas", "proteínas"), ("grasas", "grasas"), ("fibra", "fibra")]
    x0, ancho = 64, 154
    for i, (k, etq) in enumerate(columnas):
        x = x0 + i * ancho
        valor = es(food[k]) + ("" if k == "kcal" else " g")
        d.text((x * K, 418 * K), valor, font=fuente("segoeuib.ttf", 46), fill=TINTA if k not in ("kcal",) else VERDE_800)
        d.text((x * K, 480 * K), etq, font=fuente("segoeui.ttf", 22), fill=TINTA_SUAVE)
    d.text((64 * K, 566 * K), "hsnutricion.com · notas de la A a la E con estudios citados", font=fuente("segoeui.ttf", 24), fill=TINTA_SUAVE)
    # Columna derecha: emoji y sello de la nota
    cx = 980
    dibujar_emoji(img, food.get("emoji"), cx, 168, 128)
    r = 98
    d.ellipse([(cx - r) * K, (372 - r) * K, (cx + r) * K, (372 + r) * K], fill=color)
    fl = fuente("georgiab.ttf", 150)
    w = d.textlength(food["rating"], font=fl)
    d.text((cx * K - w / 2, (372 - 108) * K), food["rating"], font=fl, fill=(255, 255, 255))
    texto_centrado(d, cx, 490, f"Nota {food['rating']}", fuente("segoeuib.ttf", 36), TINTA)
    texto_centrado(d, cx, 534, etiqueta, fuente("segoeui.ttf", 30), TINTA_SUAVE)
    guardar(img, ruta)


def tarjeta_lista(titulo, cifra, unidad, emoji, ruta, linea_extra=""):
    """Tarjeta para una página de lista: título, un número grande ("12 recetas") y un emoji."""
    img, d = lienzo()
    for px in (76, 68, 60, 54, 48):
        fnt = fuente("georgiab.ttf", px)
        lineas = partir(d, titulo, fnt, 700, 3)
        if lineas:
            break
    y = 160
    for ln in lineas:
        d.text((64 * K, y * K), ln, font=fnt, fill=TINTA)
        y += int(px * 1.14)
    if linea_extra:
        d.text((64 * K, (y + 10) * K), linea_extra, font=fuente("segoeui.ttf", 30), fill=TINTA_SUAVE)
    d.text((64 * K, 566 * K), "hsnutricion.com · listas con datos y estudios citados", font=fuente("segoeui.ttf", 24), fill=TINTA_SUAVE)
    cx = 980
    dibujar_emoji(img, emoji, cx, 175, 140)
    r = 120
    d.ellipse([(cx - r) * K, (395 - r) * K, (cx + r) * K, (395 + r) * K], fill=VERDE_700)
    texto_centrado(d, cx, 395 - 74, str(cifra), fuente("georgiab.ttf", 112), (255, 255, 255))
    texto_centrado(d, cx, 395 + 38, unidad, fuente("segoeuib.ttf", 34), (255, 255, 255))
    guardar(img, ruta)


def main():
    foods = parse_foods_full(DATA_JS)
    carpeta = os.path.join(ROOT, "img", "alimentos")
    for fid, food in foods.items():
        tarjeta_alimento(food, os.path.join(carpeta, f"{slug(fid)}.jpg"))
    total = sum(os.path.getsize(os.path.join(carpeta, f)) for f in os.listdir(carpeta)) // 1024
    print(f"  {len(foods)} tarjetas en img/alimentos/ ({total} KB)")


if __name__ == "__main__":
    main()
