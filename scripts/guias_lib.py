# -*- coding: utf-8 -*-
"""Lectura de las guías (guias/*.md): cabecera de metadatos y cuerpo en Markdown."""
import glob
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GUIAS_DIR = os.path.join(ROOT, "guias")

# Orden en el que se muestran las guías (índice, enlaces entre guías y sitemap).
ORDEN = ["guia-ultraprocesados", "guia-proteinas", "guia-alcohol"]


def leer_guia(ruta):
    with open(ruta, encoding="utf-8") as f:
        texto = f.read().replace("\r\n", "\n")
    _, cabecera, cuerpo = texto.split("---\n", 2)
    meta = {}
    for linea in cabecera.strip().split("\n"):
        clave, _, valor = linea.partition(":")
        meta[clave.strip()] = valor.strip()
    meta["cuerpo"] = cuerpo
    return meta


def leer_guias():
    guias = [leer_guia(p) for p in sorted(glob.glob(os.path.join(GUIAS_DIR, "*.md")))]
    guias.sort(key=lambda g: ORDEN.index(g["slug"]) if g["slug"] in ORDEN else len(ORDEN))
    return guias
