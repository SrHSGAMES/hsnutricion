# -*- coding: utf-8 -*-
"""Genera guias.html y guia-*.html a partir de guias/*.md.

Markdown admitido: ## / ### (títulos), párrafos, listas con "- " (un nivel de anidación),
listas numeradas, tablas con "|", citas con "> ", **negrita**, *cursiva*, [texto](url),
citas bibliográficas [^PMID] o [^clave], y @alimento:id (enlace a la ficha con su nota).
Las referencias @ref clave | texto | url definen fuentes que no son de PubMed.
Los datos de los PMID se guardan en guias/refs.json (se descargan de PubMed la primera vez)."""
import html
import json
import os
import re
import sys
import time
import unicodedata
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from generar_recetas import SITE_URL, ROOT, DATA_JS, esc, slug  # noqa: E402
from generar_sustitutos import parse_foods_full  # noqa: E402
from guias_lib import GUIAS_DIR, leer_guias  # noqa: E402

AUTOR_NOMBRE = "Nicolás Hernández Sánchez"
AUTOR_CARGO = "estudiante de Nutrición Humana y Dietética (Universidad de Alicante)"
REFS_JSON = os.path.join(GUIAS_DIR, "refs.json")
MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
EFETCH = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"


def fecha_es(iso):
    y, m, d = iso.split("-")
    return f"{int(d)} de {MESES[int(m) - 1]} de {y}"


def id_seccion(texto):
    s = unicodedata.normalize("NFKD", texto).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


# ---------- referencias de PubMed ----------
def _txt(e):
    return "".join(e.itertext()).strip() if e is not None else ""


def descargar_pmids(pmids):
    url = EFETCH + "?" + urllib.parse.urlencode({"db": "pubmed", "id": ",".join(pmids), "retmode": "xml"})
    for i in range(4):
        try:
            with urllib.request.urlopen(url, timeout=40) as r:
                return ET.fromstring(r.read())
        except Exception:
            time.sleep(2 * (i + 1))
    raise RuntimeError("No se pudo descargar de PubMed: " + ",".join(pmids))


def cargar_refs(pmids):
    cache = {}
    if os.path.exists(REFS_JSON):
        with open(REFS_JSON, encoding="utf-8") as f:
            cache = json.load(f)
    faltan = [p for p in pmids if p not in cache]
    for i in range(0, len(faltan), 8):
        raiz = descargar_pmids(faltan[i:i + 8])
        for art in raiz.findall(".//PubmedArticle"):
            pmid = _txt(art.find(".//PMID"))
            autores = art.findall(".//AuthorList/Author")
            if autores:
                a = autores[0]
                primero = _txt(a.find("CollectiveName")) or f'{_txt(a.find("LastName"))} {_txt(a.find("Initials"))}'.strip()
            else:
                primero = ""
            año = _txt(art.find(".//JournalIssue/PubDate/Year")) or _txt(art.find(".//JournalIssue/PubDate/MedlineDate"))[:4]
            cache[pmid] = {
                "autor": primero,
                "varios": len(autores) > 1,
                "titulo": _txt(art.find(".//ArticleTitle")).rstrip("."),
                "revista": _txt(art.find(".//Journal/ISOAbbreviation")) or _txt(art.find(".//Journal/Title")),
                "año": año,
            }
        time.sleep(0.4)
    if faltan:
        with open(REFS_JSON, "w", encoding="utf-8") as f:
            json.dump(cache, f, ensure_ascii=False, indent=1, sort_keys=True)
    return cache


# ---------- Markdown -> HTML ----------
class Contexto:
    def __init__(self, foods):
        self.foods = foods
        self.orden = []          # claves de citas en orden de aparición
        self.web = {}            # clave -> (texto, url)

    def num(self, clave):
        if clave not in self.orden:
            self.orden.append(clave)
        return self.orden.index(clave) + 1


def enlace_alimento(m, ctx):
    fid = m.group(1)
    food = ctx.foods.get(fid)
    if not food:
        raise KeyError("Alimento desconocido en la guía: " + fid)
    nombre = food["nombre"]
    if not os.path.exists(os.path.join(ROOT, f"alimento-{slug(fid)}.html")):
        raise FileNotFoundError(f"No existe la ficha de {fid}")
    return (f'<a href="alimento-{slug(fid)}.html">{esc(nombre)}</a> '
            f'<span class="badge badge-{food["rating"]} guia-nota" title="Nota {food["rating"]}">{food["rating"]}</span>')


def inline(texto, ctx):
    t = html.escape(texto, quote=False)

    def citas(m):
        claves = re.findall(r"\[\^([^\]]+)\]", m.group(0))
        enlaces = ", ".join(f'<a href="#ref-{ctx.num(c)}">{ctx.num(c)}</a>' for c in claves)
        return f'<sup class="cita">[{enlaces}]</sup>'

    t = re.sub(r"\[\^[^\]]+\](?:\s+\[\^[^\]]+\])*", citas, t)
    t = re.sub(r"\[([^\]^][^\]]*)\]\(([^)]+)\)",
               lambda m: f'<a href="{m.group(2)}"' + (' rel="noopener" target="_blank"' if m.group(2).startswith("http") else "") + f'>{m.group(1)}</a>', t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"(?<!\*)\*(?!\s)([^*]+?)\*(?!\*)", r"<em>\1</em>", t)
    t = re.sub(r"@alimento:([a-z0-9_]+)", lambda m: enlace_alimento(m, ctx), t)
    return t


def texto_plano(texto, ctx):
    t = re.sub(r"\[\^[^\]]+\]", "", texto)
    t = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", t)
    t = re.sub(r"\*+", "", t)
    t = re.sub(r"@alimento:([a-z0-9_]+)", lambda m: ctx.foods[m.group(1)]["nombre"], t)
    return re.sub(r"\s+", " ", t).strip()


def render_lista(items, ctx, tag="ul"):
    """items: lista de (texto, [hijos]) ya anidada."""
    out = [f"<{tag}>"]
    for texto, hijos in items:
        out.append(f"<li>{inline(texto, ctx)}")
        if hijos:
            out.append(render_lista(hijos, ctx))
        out.append("</li>")
    out.append(f"</{tag}>")
    return "\n".join(out)


def md_a_html(cuerpo, ctx):
    lineas = cuerpo.split("\n")
    out, toc, faq = [], [], []
    seccion, abierto_resumen, faq_activo, q_actual = None, False, False, None
    i = 0

    def cerrar_resumen():
        nonlocal abierto_resumen
        if abierto_resumen:
            out.append("</section>")
            abierto_resumen = False

    while i < len(lineas):
        l = lineas[i]
        if not l.strip():
            i += 1
            continue
        if l.startswith("@ref "):
            clave, texto, url = [p.strip() for p in l[5:].split("|")]
            ctx.web[clave] = (texto, url)
            i += 1
            continue
        if l.startswith("## "):
            cerrar_resumen()
            titulo = l[3:].strip()
            seccion = titulo
            faq_activo = titulo.lower().startswith("preguntas frecuentes")
            q_actual = None
            sid = id_seccion(titulo)
            toc.append((sid, titulo))
            if titulo.lower() == "en resumen":
                out.append(f'<section class="guia-resumen" id="{sid}">')
                abierto_resumen = True
                out.append(f"<h2>{inline(titulo, ctx)}</h2>")
            else:
                out.append(f'<h2 id="{sid}">{inline(titulo, ctx)}</h2>')
            i += 1
            continue
        if l.startswith("### "):
            titulo = l[4:].strip()
            out.append(f"<h3>{inline(titulo, ctx)}</h3>")
            if faq_activo:
                q_actual = {"q": texto_plano(titulo, ctx), "a": []}
                faq.append(q_actual)
            i += 1
            continue
        if l.startswith("|"):
            filas = []
            while i < len(lineas) and lineas[i].startswith("|"):
                filas.append([c.strip() for c in lineas[i].strip().strip("|").split("|")])
                i += 1
            cab, cuerpo_t = filas[0], [f for f in filas[2:]]
            h = "".join(f"<th>{inline(c, ctx)}</th>" for c in cab)
            b = "".join("<tr>" + "".join(f"<td>{inline(c, ctx)}</td>" for c in f) + "</tr>" for f in cuerpo_t)
            out.append(f'<div class="guia-tabla-wrap"><table class="guia-tabla"><thead><tr>{h}</tr></thead><tbody>{b}</tbody></table></div>')
            continue
        if l.startswith("> "):
            partes = []
            while i < len(lineas) and lineas[i].startswith(">"):
                partes.append(lineas[i][1:].strip())
                i += 1
            out.append(f'<aside class="guia-aviso">{inline(" ".join(partes), ctx)}</aside>')
            if faq_activo:
                q_actual = None
            continue
        if re.match(r"^- ", l):
            raiz = []
            while i < len(lineas) and re.match(r"^(  )?- ", lineas[i]):
                if lineas[i].startswith("  - "):
                    raiz[-1][1].append((lineas[i][4:], []))
                else:
                    raiz.append((lineas[i][2:], []))
                i += 1
            out.append(render_lista(raiz, ctx))
            continue
        if re.match(r"^\d+\. ", l):
            items = []
            while i < len(lineas) and re.match(r"^\d+\. ", lineas[i]):
                items.append((re.sub(r"^\d+\. ", "", lineas[i]), []))
                i += 1
            out.append(render_lista(items, ctx, "ol"))
            continue
        parrafo = [l]
        i += 1
        while i < len(lineas) and lineas[i].strip() and not re.match(r"^(#|\||> |- |\d+\. |@ref )", lineas[i]):
            parrafo.append(lineas[i])
            i += 1
        texto = " ".join(parrafo)
        out.append(f"<p>{inline(texto, ctx)}</p>")
        if faq_activo and q_actual is not None:
            q_actual["a"].append(texto_plano(texto, ctx))
    cerrar_resumen()
    return "\n".join(out), toc, faq


# ---------- páginas ----------
def marco():
    base = open(os.path.join(ROOT, "privacidad.html"), encoding="utf-8", newline="").read().replace("\r\n", "\n")
    ini = base.index("<main>") + len("<main>")
    fin = base.index("</main>")
    return base[:ini], base[fin:]


def cabecera(prefijo, titulo, descripcion, ruta, jsonld):
    p = prefijo
    p = re.sub(r"<title>.*?</title>", lambda m: f"<title>{esc(titulo)}</title>", p, count=1)
    p = re.sub(r'<meta name="description" content=".*?">', lambda m: f'<meta name="description" content="{esc(descripcion)}">', p, count=1)
    p = re.sub(r'<link rel="canonical" href=".*?">', lambda m: f'<link rel="canonical" href="{SITE_URL}/{ruta}">', p, count=1)
    p = re.sub(r'<meta property="og:title" content=".*?">', lambda m: f'<meta property="og:title" content="{esc(titulo)}">', p, count=1)
    p = re.sub(r'<meta property="og:description" content=".*?">', lambda m: f'<meta property="og:description" content="{esc(descripcion)}">', p, count=1)
    p = re.sub(r'<meta property="og:url" content=".*?">', lambda m: f'<meta property="og:url" content="{SITE_URL}/{ruta}">', p, count=1)
    bloques = "".join(
        '<script type="application/ld+json">\n' + json.dumps(d, ensure_ascii=False).replace("</", "<\\/") + "\n</script>\n"
        for d in jsonld)
    return p.replace("</head>", bloques + "</head>", 1)


def render_refs(ctx, cache):
    items = []
    for n, clave in enumerate(ctx.orden, 1):
        if clave in ctx.web:
            texto, url = ctx.web[clave]
            items.append((n, f'{esc(texto)} <a href="{url}" rel="noopener" target="_blank">Ver fuente</a>', texto, url))
        else:
            r = cache[clave]
            autor = r["autor"] + (" et al." if r["varios"] else "")
            texto = f'{autor}. {r["titulo"]}. {r["revista"]}. {r["año"]}'
            url = f"https://pubmed.ncbi.nlm.nih.gov/{clave}/"
            items.append((n, f'{esc(autor)}. {esc(r["titulo"])}. <em>{esc(r["revista"])}</em>. {r["año"]}. '
                             f'<a href="{url}" rel="noopener" target="_blank">PubMed {clave}</a>', r["titulo"], url))
    lis = "\n".join(f'<li id="ref-{n}">{h}</li>' for n, h, _, _ in items)
    return f'<section class="guia-fuentes"><h2 id="fuentes">Fuentes</h2>\n<ol>\n{lis}\n</ol></section>', items


def render_guia(guia, guias, foods, prefijo, sufijo):
    ctx = Contexto(foods)
    cuerpo, toc, faq = md_a_html(guia["cuerpo"], ctx)
    pmids = []
    for clave in ctx.orden:
        if clave not in ctx.web:
            pmids.append(clave)
    cache = cargar_refs(pmids)
    refs_html, refs = render_refs(ctx, cache)
    ruta = f'{guia["slug"]}.html'
    url = f"{SITE_URL}/{ruta}"
    fecha = guia["revisado"]
    toc.append(("fuentes", "Fuentes"))
    indice = "".join(f'<li><a href="#{sid}">{esc(t)}</a></li>' for sid, t in toc)
    otras = "".join(
        f'<li><a href="{g["slug"]}.html">{esc(g["titulo"])}</a></li>' for g in guias if g["slug"] != guia["slug"])

    autor_ld = {"@type": "Person", "name": AUTOR_NOMBRE, "url": f"{SITE_URL}/autor.html"}
    articulo = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": guia["titulo"], "description": guia["descripcion"], "inLanguage": "es",
        "datePublished": fecha, "dateModified": fecha, "mainEntityOfPage": url,
        "image": f"{SITE_URL}/img/banner-hsnutricion.jpg",
        "author": autor_ld,
        "publisher": {"@type": "Organization", "name": "HSNutrición", "url": SITE_URL,
                      "logo": {"@type": "ImageObject", "url": f"{SITE_URL}/img/logo-header.png"}},
        "citation": [{"@type": "CreativeWork", "name": nombre, "url": u} for _, _, nombre, u in refs],
    }
    migas = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Inicio", "item": f"{SITE_URL}/"},
            {"@type": "ListItem", "position": 2, "name": "Guías", "item": f"{SITE_URL}/guias.html"},
            {"@type": "ListItem", "position": 3, "name": guia["titulo"], "item": url},
        ],
    }
    jsonld = [articulo, migas]
    if faq:
        jsonld.append({
            "@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [{"@type": "Question", "name": q["q"],
                            "acceptedAnswer": {"@type": "Answer", "text": " ".join(q["a"])}} for q in faq],
        })

    pagina = f'''
  <section class="section guia" id="guia">
    <div class="container">
      <p class="receta-breadcrumb"><a href="guias.html">← Todas las guías</a></p>
      <p class="eyebrow">Guía</p>
      <h1 class="section-title guia-titulo">{esc(guia["titulo"])}</h1>
      <p class="guia-firma">Por <a href="autor.html">{AUTOR_NOMBRE}</a>, {AUTOR_CARGO} · Revisada el {fecha_es(fecha)} · Redactada con ayuda de IA y contrastada con las fuentes citadas (<a href="metodologia.html#guias">cómo trabajamos</a>).</p>
      <nav class="guia-indice" aria-label="Contenido de la guía">
        <p>En esta guía</p>
        <ol>{indice}</ol>
      </nav>
      <div class="legal-content guia-contenido">
{cuerpo}
{refs_html}
        <section class="guia-mas">
          <h2 id="mas-guias">Otras guías</h2>
          <ul>{otras}</ul>
          <p><a href="metodologia.html">Metodología y política editorial</a> · <a href="autor.html">Sobre el autor</a></p>
        </section>
      </div>
    </div>
  </section>
'''
    html_final = cabecera(prefijo, f'{guia["titulo"]} — HSNutrición', guia["descripcion"], ruta, jsonld) + pagina + sufijo
    with open(os.path.join(ROOT, ruta), "w", encoding="utf-8", newline="") as f:
        f.write(html_final)
    return len(refs), len(re.sub(r"<[^>]+>", " ", cuerpo).split())


def render_indice(guias, prefijo, sufijo):
    cartas = "\n".join(f'''        <a class="guia-carta" href="{g["slug"]}.html">
          <h2>{esc(g["titulo"])}</h2>
          <p>{esc(g["resumen_corto"])}</p>
          <span>Revisada el {fecha_es(g["revisado"])} · Leer la guía →</span>
        </a>''' for g in guias)
    descripcion = "Guías de nutrición basadas en estudios de PubMed: ultraprocesados, proteínas y alcohol, con sus riesgos, las limitaciones de la evidencia y consejos prácticos."
    ld = [{
        "@context": "https://schema.org", "@type": "CollectionPage", "name": "Guías de nutrición", "url": f"{SITE_URL}/guias.html",
        "inLanguage": "es", "description": descripcion,
        "mainEntity": {"@type": "ItemList", "itemListElement": [
            {"@type": "ListItem", "position": n, "url": f'{SITE_URL}/{g["slug"]}.html', "name": g["titulo"]} for n, g in enumerate(guias, 1)]},
    }]
    pagina = f'''
  <section class="section" id="guias">
    <div class="container">
      <p class="eyebrow">Guías</p>
      <h1 class="section-title" style="text-align:left">Guías de nutrición</h1>
      <p class="section-sub" style="text-align:left;margin:0 0 30px">Artículos explicados con calma, apoyados en estudios que puedes consultar. Cada guía dice qué se sabe, qué no se sabe y quién debe tener cuidado. Si quieres saber cómo las elaboramos, lee la <a href="metodologia.html#guias">metodología</a>.</p>
      <div class="guia-cartas">
{cartas}
      </div>
    </div>
  </section>
'''
    html_final = cabecera(prefijo, "Guías de nutrición — HSNutrición", descripcion, "guias.html", ld) + pagina + sufijo
    with open(os.path.join(ROOT, "guias.html"), "w", encoding="utf-8", newline="") as f:
        f.write(html_final)


def main():
    foods = parse_foods_full(DATA_JS)
    guias = leer_guias()
    prefijo, sufijo = marco()
    for g in guias:
        n_refs, palabras = render_guia(g, guias, foods, prefijo, sufijo)
        print(f'  {g["slug"]}.html — {palabras} palabras, {n_refs} fuentes')
    render_indice(guias, prefijo, sufijo)
    print("  guias.html")


if __name__ == "__main__":
    main()
