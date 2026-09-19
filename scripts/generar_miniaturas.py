# -*- coding: utf-8 -*-
"""Genera las miniaturas de las fotos de recetas (img/recetas/thumbs/<nombre>.jpg,
720 px de ancho) que usan las tarjetas de receta, en vez de la foto completa
de 1408 px: una tarjeta se muestra a ~330 px de ancho, así que descargar la
grande era un desperdicio (el listado de recetas pesaba 10 MB).

Uso: py scripts/generar_miniaturas.py

Es seguro repetirlo: regenera todas desde los originales. Ejecútalo DESPUÉS de
scripts/tapar_marca_ia.py cuando añadas fotos nuevas, para que la miniatura
ya lleve el sello. La foto principal de cada receta sigue usando el original.
"""
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARPETA = os.path.join(ROOT, "img", "recetas")
SALIDA = os.path.join(CARPETA, "thumbs")
ANCHO = 720


def main():
    os.makedirs(SALIDA, exist_ok=True)
    total_orig = total_mini = 0
    for nombre in sorted(os.listdir(CARPETA)):
        ruta = os.path.join(CARPETA, nombre)
        if not os.path.isfile(ruta) or not nombre.lower().endswith((".jpg", ".jpeg", ".png")):
            continue
        with Image.open(ruta) as im:
            im = im.convert("RGB")
            alto = round(im.height * ANCHO / im.width)
            mini = im.resize((ANCHO, alto), Image.LANCZOS)
        destino = os.path.join(SALIDA, os.path.splitext(nombre)[0] + ".jpg")
        mini.save(destino, "JPEG", quality=80, optimize=True, progressive=True)
        total_orig += os.path.getsize(ruta)
        total_mini += os.path.getsize(destino)
    print(f"Miniaturas en img/recetas/thumbs/: {total_orig // 1024} KB de originales -> {total_mini // 1024} KB")


if __name__ == "__main__":
    main()
