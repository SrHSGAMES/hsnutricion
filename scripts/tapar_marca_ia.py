# -*- coding: utf-8 -*-
"""Tapa la marca visible del generador de imágenes (la estrella de Gemini en
la esquina inferior derecha) con un sello circular del logo de HSNutrición,
en las fotos de img/recetas/.

Uso: py scripts/tapar_marca_ia.py            (procesa las fotos aún no marcadas)
     py scripts/tapar_marca_ia.py Foto.jpg   (solo esas, dentro de img/recetas/)

Modifica las fotos EN SITIO (el original queda en el historial de git), y
anota en scripts/fotos_marcadas.txt cuáles ya lleva el sello para no
estampar dos veces. Con fotos nuevas de IA: súbelas a img/recetas/ y
ejecútalo. Si algún día una foto es real (sin marca), simplemente no lo
ejecutes para ella.
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARPETA = os.path.join(ROOT, "img", "recetas")
LOGO = os.path.join(ROOT, "img", "logo-header.png")
MANIFIESTO = os.path.join(ROOT, "scripts", "fotos_marcadas.txt")

# La estrella de Gemini queda centrada en estas fracciones de la imagen
# (medido en fotos de 1408x768: centro en x=1288, y=648, ~50 px de ancho).
CX, CY = 0.9147, 0.8438
DIAMETRO = 104   # px en una foto de 1408 de ancho (la estrella mide ~50)
ALTO_LOGO = 80


def crear_sello(escala):
    ss = 4  # supersampling para bordes suaves
    d = round(DIAMETRO * escala)
    margen = round(8 * escala)
    lado = d + margen * 2
    capa = Image.new("RGBA", (lado * ss, lado * ss), (0, 0, 0, 0))

    sombra = Image.new("RGBA", capa.size, (0, 0, 0, 0))
    ImageDraw.Draw(sombra).ellipse(
        [margen * ss, (margen + 3 * escala) * ss, (margen + d) * ss, (margen + d + 3 * escala) * ss],
        fill=(0, 0, 0, 70),
    )
    sombra = sombra.filter(ImageFilter.GaussianBlur(3 * escala * ss))
    capa.alpha_composite(sombra)

    ImageDraw.Draw(capa).ellipse(
        [margen * ss, margen * ss, (margen + d) * ss, (margen + d) * ss],
        fill=(255, 255, 255, 240),
    )
    capa = capa.resize((lado, lado), Image.LANCZOS)

    logo = Image.open(LOGO).convert("RGBA")
    alto = round(ALTO_LOGO * escala)
    logo = logo.resize((round(logo.width * alto / logo.height), alto), Image.LANCZOS)
    capa.alpha_composite(logo, ((lado - logo.width) // 2, (lado - logo.height) // 2))
    return capa


def marcar(ruta):
    with Image.open(ruta) as im:
        formato = im.format
        base = im.convert("RGBA")
    sello = crear_sello(base.width / 1408)
    x = round(base.width * CX - sello.width / 2)
    y = round(base.height * CY - sello.height / 2)
    base.alpha_composite(sello, (x, y))
    if formato == "PNG":
        base.save(ruta, "PNG", optimize=True)
    else:
        base.convert("RGB").save(ruta, "JPEG", quality=90, optimize=True)


def main():
    hechas = set()
    if os.path.exists(MANIFIESTO):
        hechas = {l.strip() for l in open(MANIFIESTO, encoding="utf-8") if l.strip()}

    if len(sys.argv) > 1:
        candidatas = sys.argv[1:]
    else:
        candidatas = sorted(
            f for f in os.listdir(CARPETA) if f.lower().endswith((".jpg", ".jpeg", ".png"))
        )

    nuevas = []
    for nombre in candidatas:
        if nombre in hechas:
            print(f"  (ya marcada) {nombre}")
            continue
        marcar(os.path.join(CARPETA, nombre))
        nuevas.append(nombre)
        print(f"  marcada: {nombre}")

    if nuevas:
        with open(MANIFIESTO, "a", encoding="utf-8") as f:
            f.write("".join(n + "\n" for n in nuevas))
    print(f"Total marcadas ahora: {len(nuevas)}")


if __name__ == "__main__":
    main()
