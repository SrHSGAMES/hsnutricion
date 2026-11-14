# -*- coding: utf-8 -*-
"""Ración orientativa de cada alimento.

- RACIONES: tamaño habitual de una ración (g o ml) y su medida casera. Son estimaciones de HSNutrición
  (raciones habituales en España, en peso neto), no una tabla oficial: cada ficha las llama «orientativas».
  Los alimentos que no se toman por raciones (bicarbonato, sacarina, insectos...) no llevan.
- ALCOHOL: la cantidad recomendable es 0 g al día. Las raciones de las bebidas alcohólicas solo sirven para saber
  cuántas calorías y cuánto alcohol contienen, nunca como cantidad aconsejada.
"""

RACIONES = {}


def _r(ids, gramos, medida):
    for i in ids.split():
        RACIONES[i] = (gramos, medida)


# ---------- Verduras y hortalizas
_r("lechuga rucula canonigos escarola endibia espinacas kale", 80, "1 plato de ensalada")
_r("acelgas repollo col_lombarda coliflor brocoli calabacin berenjena calabaza judias_verdes esparragos setas puerro hinojo nabo apio coles_bruselas", 150, "1 plato de guarnición")
_r("pepino", 100, "medio pepino")
_r("tomate", 150, "1 tomate grande")
_r("zanahoria", 100, "1 zanahoria mediana")
_r("cebolla", 80, "media cebolla")
_r("ajo", 5, "1 diente")
_r("jengibre", 5, "1 trozo pequeño")
_r("patata patata_cocida", 200, "1 patata mediana")
_r("boniato", 150, "1 boniato pequeño")
_r("pimiento_rojo pimiento_verde", 100, "medio pimiento")
_r("remolacha", 100, "1 remolacha pequeña")
_r("rabano", 50, "5-6 rábanos")
_r("calcots", 150, "6 calçots")
_r("alcachofa", 150, "2-3 alcachofas")
_r("guisantes habas edamame", 100, "medio plato")
_r("maiz", 100, "media mazorca")
_r("tomate_frito", 50, "2 cucharadas")
_r("tomate_triturado", 100, "medio vaso")
_r("cilantro albahaca perejil", 5, "un puñado de hojas")
# ---------- Frutas
_r("manzana pera", 180, "1 pieza mediana")
_r("naranja melocoton nectarina pina mango papaya chirimoya caqui pitaya pomelo", 150, "1 pieza mediana")
_r("platano", 120, "1 plátano mediano")
_r("mandarina", 80, "1 mandarina")
_r("kiwi", 75, "1 kiwi")
_r("albaricoque ciruela", 100, "2-3 piezas")
_r("fresas", 150, "8-10 fresas")
_r("arandanos frambuesas moras cerezas uva granada", 100, "un puñado generoso")
_r("melon sandia", 200, "1 tajada")
_r("higos_frescos nispero guayaba", 100, "2-3 piezas")
_r("lichi", 60, "6 lichis")
_r("maracuya", 40, "1 maracuyá")
_r("limon lima", 30, "el zumo de medio limón")
_r("pasas datiles higos_secos ciruelas_pasas", 30, "un puñado pequeño")
_r("coco", 30, "un trozo pequeño")
_r("aguacate", 100, "medio aguacate")
# ---------- Frutos secos y semillas
_r("almendras avellanas nueces pistachos anacardo pinones macadamia frutos_secos_salados cacahuetes", 30, "un puñado")
_r("nueces_brasil", 10, "2 nueces")
_r("castanas", 100, "5-6 castañas")
_r("semillas_de_chia semillas_de_lino semillas_de_sesamo", 10, "1 cucharada")
_r("semillas_de_girasol pipas_de_calabaza", 25, "un puñado pequeño")
# ---------- Cereales (peso cocinado salvo los «_seco/_seca»)
_r("pan_blanco pan_integral pan_centeno", 50, "2 rebanadas")
_r("pan_de_molde", 40, "2 rebanadas")
_r("pan_pita", 60, "1 pan de pita")
_r("pan_rallado_integral", 15, "1 cucharada sopera")
_r("tortilla_maiz", 50, "2 tortillas")
_r("tortilla_trigo", 60, "1 tortilla tipo wrap")
_r("arroz_blanco arroz_integral pasta_blanca pasta_integral cuscus", 180, "1 plato cocinado")
_r("quinoa trigo_sarraceno bulgur mijo cebada espelta", 150, "1 plato cocinado")
_r("arroz_blanco_seco arroz_integral_seco pasta_blanca_seca pasta_integral_seca", 70, "1 plato en crudo")
_r("quinoa_seca cuscus_seco bulgur_seco mijo_seco trigo_sarraceno_seco cebada_seca", 60, "1 plato en crudo")
_r("avena", 40, "4 cucharadas soperas")
_r("harina_blanca harina_de_trigo harina_de_trigo_integral harina_de_avena_integral harina_de_maiz harina_de_garbanzo", 30, "3 cucharadas soperas")
_r("cereales_azucarados copos_maiz", 30, "1 bol pequeño")
_r("granola muesli", 40, "1 bol pequeño")
_r("tortitas_de_avena tortitas_arroz", 20, "2 tortitas")
_r("fideos_instantaneos", 80, "1 bloque")
_r("kataifi", 50, "1 porción")
# ---------- Dulces
_r("azucar", 5, "1 cucharadita")
_r("miel agave sirope_arce", 15, "1 cucharada")
_r("chocolate_leche chocolate_negro chocolate_negro_70 chocolate_blanco", 20, "2 onzas")
_r("galletas", 30, "4 galletas")
_r("helado", 100, "2 bolas")
_r("mermelada", 20, "1 cucharada")
_r("cacao_puro", 10, "1 cucharada")
_r("cacao_soluble crema_cacahuete_azucarada", 15, "1 cucharada")
_r("croissant bolleria_industrial", 60, "1 pieza")
_r("turron_duro gominolas", 30, "una porción pequeña")
_r("leche_condensada", 20, "1 cucharada sopera")
# ---------- Lácteos (ml para las leches)
_r("leche_entera leche_desnatada leche_semidesnatada", 200, "1 vaso")
_r("kefir", 200, "1 vaso")
_r("yogur_natural yogur_azucarado yogur_griego", 125, "1 yogur")
_r("skyr", 150, "1 tarrina")
_r("queso_fresco", 80, "1 porción")
_r("queso_cottage requeson", 100, "4 cucharadas")
_r("mozzarella", 60, "media bola")
_r("queso_feta queso_cabra queso_brie", 40, "1 porción")
_r("queso_curado queso_manchego queso_azul", 30, "2 cuñas finas")
_r("queso_parmesano", 15, "1 cucharada colmada")
_r("queso_crema", 20, "2 cucharadas")
_r("nata_cocinar", 30, "2 cucharadas")
# ---------- Grasas, salsas y untables
_r("aove aceite_girasol aceite_de_nabina aceite_de_palma aceite_de_coco", 10, "1 cucharada sopera")
_r("mantequilla margarina margarina_100_vegetal margarina_vegetal_sin_grasas_trans", 10, "1 cucharada rasa")
_r("aceitunas", 30, "8-10 aceitunas")
_r("mayonesa ketchup salsa_barbacoa_zero salsa_soja salsa_soja_baja_sodio", 15, "1 cucharada")
_r("tahini crema_de_cacahuete", 15, "1 cucharada")
# ---------- Bebidas (ml)
_r("agua agua_coco kombucha", 250, "1 vaso")
_r("refresco refresco_zero", 330, "1 lata")
_r("bebida_energetica", 250, "1 lata")
_r("zumo_envasado zumo_naranja_natural", 200, "1 vaso")
_r("cafe", 150, "1 taza")
_r("te caldo_de_verduras", 200, "1 taza")
_r("cerveza", 200, "1 caña")
_r("vino_tinto vino_blanco cava vermut", 100, "1 vaso pequeño")
_r("sidra", 200, "1 vaso")
_r("destilados", 50, "1 copa")
_r("matcha", 2, "1 cucharadita")
_r("bebida_de_almendras bebida_de_avena bebida_de_soja bebida_de_soja_sin_azucar", 200, "1 vaso")
_r("yogur_soja", 125, "1 yogur")
_r("leche_coco", 50, "un cuarto de taza")
# ---------- Cárnicos
_r("embutido chorizo lomo_embuchado", 30, "4 lonchas finas")
_r("jamon_serrano jamon_iberico jamon_cocido fiambre_pavo", 40, "3-4 lonchas")
_r("bacon", 30, "3 lonchas")
_r("salchichas", 100, "2 salchichas")
_r("morcilla", 60, "1 rodaja gruesa")
_r("carne_de_cerdo pavo pechuga_de_pollo ternera_magra_picada_5 ternera_filete muslo_pollo solomillo_cerdo conejo cordero", 120, "1 filete o ración")
_r("hamburguesa_ternera", 120, "1 hamburguesa")
_r("higado_ternera", 100, "1 filete pequeño")
# ---------- Pescado, marisco y huevos
_r("salmon atun bacalao merluza lubina dorada trucha rape lenguado mero pez_espada boquerones caballa", 150, "1 filete o ración")
_r("sardina", 100, "4 sardinas")
_r("salmon_ahumado", 50, "3-4 lonchas")
_r("gambas langostinos mejillones almejas", 100, "1 ración sin cáscara")
_r("calamar pulpo sepia", 150, "1 ración")
_r("surimi", 80, "4 palitos")
_r("anchoas", 30, "5 anchoas")
_r("huevo", 60, "1 huevo")
_r("huevo_de_codorniz", 45, "5 huevos")
_r("clara_huevo", 33, "1 clara")
# ---------- Proteína vegetal
_r("lentejas alubias", 70, "1 plato en crudo")
_r("lentejas_cocidas garbanzos judias_pintas", 200, "1 plato cocinado")
_r("soja_texturizada", 30, "un puñado en seco")
_r("tofu seitan tempeh", 100, "1 porción")
# ---------- Platos preparados, snacks y otros
_r("tortilla_de_patata", 150, "1 porción")
_r("pizza_congelada", 150, "media pizza")
_r("nuggets_pollo", 100, "5 nuggets")
_r("patatas_fritas", 30, "1 bolsa pequeña")
_r("palomitas", 25, "1 bol pequeño")
_r("proteina_whey", 30, "1 cacito")
_r("levadura", 10, "1 cucharada")
# ---------- Condimentos
_r("curcuma comino canela bicarbonato", 2, "1 cucharadita")
_r("pimienta_negra oregano nuez_moscada laurel", 1, "1 pizca")
_r("pimenton curry_en_polvo", 3, "1 cucharadita")
_r("aroma_de_vainilla", 5, "1 cucharadita")
_r("vinagre_de_manzana vinagre_balsamico miso", 15, "1 cucharada")
_r("mostaza alcaparras", 10, "1 cucharadita")

# Alimentos sin ración (no se toman por raciones o no aportan nada que comparar)
SIN_RACION = {"sacarina", "stevia", "levadura_quimica", "levadura_panaderia", "saltamontes_frito", "sal", "sal_baja_en_sodio"}

# Graduación habitual (% vol.) de las bebidas alcohólicas, para calcular los gramos de alcohol de una ración (ml x % x 0,8 / 100).
ALCOHOL = {"cerveza": 5, "vino_tinto": 13, "vino_blanco": 12, "cava": 11.5, "destilados": 40, "sidra": 5.5, "vermut": 15}


def _base(food_id):
    return food_id[3:] if food_id.startswith("ia_") else food_id


def racion(food):
    """(cantidad, medida casera, unidad) de la ración orientativa o None. La unidad es 'ml' en bebidas."""
    b = _base(food["id"])
    if b in SIN_RACION or b not in RACIONES:
        return None
    gramos, medida = RACIONES[b]
    unidad = "ml" if "Bebidas" in food["categorias"] or "Bebidas vegetales" in food["categorias"] else "g"
    if b in ("matcha", "yogur_soja", "cacao_soluble"):
        unidad = "g"
    return gramos, medida, unidad


