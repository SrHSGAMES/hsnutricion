/* HSNutrición — Recetas saludables
   Solo incluimos recetas genuinamente saludables, o versiones "arregladas"
   de recetas clásicas poco saludables. No es una lista exhaustiva como la
   guía de alimentos: aquí seleccionamos, no documentamos todo lo que existe.

   Cada ingrediente referencia un alimento ya existente en la guía (FOODS o
   alimentos de la comunidad) mediante "foodId", con su cantidad en gramos. */

const RECETAS = [
  {
    id: "tostada_aguacate_huevo",
    nombre: "Tostada de Aguacate con Huevo",
    imagen: "img/recetas/tostada-aguacate.jpg",
    emojiPortada: "🥑🍞🥚",
    rating: "A",
    tiempo: "10 min",
    raciones: 1,
    descripcion: "Un desayuno o snack rápido que combina grasas saludables, proteína de calidad y fibra en un solo plato — sencillo, saciante y con base científica.",
    motivo: "Reúne tres pilares de una alimentación saludable en un solo plato: la grasa monoinsaturada del aguacate y el AOVE, que ayuda a mejorar el perfil de colesterol; la proteína completa del huevo; y la fibra del pan integral, que ralentiza la absorción de los carbohidratos y aumenta la saciedad. Es exactamente el tipo de sustitución que buscamos en HSNutrición: cambia una tostada con mantequilla y mermelada por un plato igual de cómodo pero con un perfil nutricional muy superior.",
    ingredientes: [
      { foodId: "pan_integral", cantidad: 60 },
      { foodId: "aguacate", cantidad: 100 },
      { foodId: "huevo", cantidad: 60 },
      { foodId: "aove", cantidad: 5 },
      // Opcional: incluso la sal baja en sodio conviene usarla con
      // moderación, así que la marcamos como añadido opcional, no esencial.
      { foodId: "ia_sal_baja_en_sodio", cantidad: 1, opcional: true }
    ],
    pasos: [
      "Tuesta dos rebanadas de pan integral hasta que estén doradas y crujientes.",
      "Machaca el aguacate con un tenedor en un bol. Si quieres, sazona con una pizca opcional de sal baja en sodio — con moderación.",
      "Cocina el huevo a la plancha, escalfado o poché, al gusto — evita frituras con exceso de aceite.",
      "Unta el aguacate machacado sobre las tostadas, coloca el huevo encima y termina con un chorrito de AOVE."
    ]
  },
  {
    id: "espaguetis_integrales_tomate",
    nombre: "Espaguetis Integrales con Tomate y Albahaca",
    imagen: "img/recetas/spaghetti-integral-tomate-albahaca.jpg",
    emojiPortada: "🍝🍅🌿",
    rating: "A",
    tiempo: "20 min",
    raciones: 2,
    descripcion: "El clásico italiano reinventado: pasta integral con una salsa de tomate fresco rica en licopeno, ajo y albahaca, y un chorrito de AOVE en vez de mantequilla o nata.",
    motivo: "Tres cambios simples convierten un plato de pasta corriente en uno realmente saludable: la pasta integral aporta mucha más fibra y un índice glucémico más bajo que la blanca; la salsa se hace con tomate fresco en vez de salsas envasadas con azúcares añadidos, aprovechando el licopeno del tomate, un antioxidante asociado a la salud cardiovascular; y la grasa viene del AOVE, no de mantequilla ni nata. Nada de sal añadida: la albahaca fresca y el ajo ya aportan todo el sabor que necesita. El queso rallado queda como toque opcional, con moderación por su grasa saturada.",
    ingredientes: [
      { foodId: "pasta_integral", cantidad: 370 },
      { foodId: "ia_tomate", cantidad: 300 },
      { foodId: "aove", cantidad: 12 },
      { foodId: "ia_albahaca", cantidad: 8 },
      { foodId: "queso_curado", cantidad: 20, opcional: true }
    ],
    pasos: [
      "Pon a hervir agua (sin sal) y cuece los espaguetis integrales el tiempo indicado en el envase, hasta que estén al dente.",
      "Mientras tanto, trocea el tomate y sofríelo a fuego medio con un diente de ajo picado y el AOVE, removiendo hasta que se deshaga en una salsa espesa (10-12 min).",
      "Añade las hojas de albahaca fresca troceadas y remueve un par de minutos más.",
      "Escurre la pasta, mézclala con la salsa y sirve. Si quieres, termina con un poco de queso curado rallado — opcional, con moderación."
    ]
  },
  {
    id: "bowl_arroz_aguacate_tomate",
    nombre: "Bowl Vegetal de Arroz Integral, Aguacate y Tomate",
    imagen: "img/recetas/Bowl-Vegetal-ArrozIntegral-Aguacate-Tomate.jpg",
    emojiPortada: "🥑🍚🍅",
    rating: "A",
    tiempo: "15 min",
    raciones: 1,
    descripcion: "Un bowl 100% vegetal, sin ningún ingrediente de origen animal: carbohidrato complejo del arroz integral, grasa monoinsaturada del aguacate y antioxidantes del tomate fresco, en un plato tan sencillo como saciante.",
    motivo: "Todos los ingredientes de este bowl son de origen vegetal y ya forman parte de nuestra guía con calificación A: el arroz integral aporta fibra y un índice glucémico bajo frente al arroz blanco; el aguacate y el AOVE cubren la grasa saludable que da saciedad; y el tomate fresco suma licopeno, un antioxidante ligado a la salud cardiovascular. Ni rastro de sal añadida — la albahaca fresca y el propio AOVE ya aportan todo el sabor que necesita.",
    ingredientes: [
      { foodId: "arroz_integral", cantidad: 150 },
      { foodId: "aguacate", cantidad: 80 },
      { foodId: "ia_tomate", cantidad: 150 },
      { foodId: "aove", cantidad: 8 },
      { foodId: "ia_albahaca", cantidad: 5 }
    ],
    pasos: [
      "Cuece el arroz integral según las instrucciones del envase (unos 20-25 min) y déjalo templar unos minutos.",
      "Mientras tanto, trocea el tomate y el aguacate en dados.",
      "Sirve el arroz de base en un bowl y coloca encima el tomate y el aguacate.",
      "Termina con un chorrito de AOVE y unas hojas de albahaca fresca troceadas."
    ]
  },
  {
    id: "katsu_curry_vegano",
    nombre: "Katsu Curry Vegano",
    imagen: "img/recetas/Katsu-Curry-Vegano.jpg",
    emojiPortada: "🍛🍚⬜",
    rating: "A",
    tiempo: "1 h",
    raciones: 2,
    descripcion: "Una versión 100% vegetal del clásico katsu curry japonés: verduras de raíz, un curry cremoso hecho con roux casero y tofu rebozado y cocinado al aire (no frito) — sin ningún ingrediente de origen animal.",
    motivo: "El katsu curry tradicional se sirve con carne empanada y frita en abundante aceite. Aquí la proteína es tofu, rebozado con bebida de soja en vez de huevo y cocinado en air fryer o con muy poco aceite, así que se mantiene crujiente sin freír. La salsa se hace en casa con verduras, curry y un roux de harina integral y margarina vegetal, en vez de tabletas de curry comerciales, que suelen llevar aceite de palma y mucho sodio — así controlamos ambos. El arroz integral aporta la fibra que le falta al arroz blanco habitual del katsu. La margarina vegetal es el único ingrediente que conviene usar con moderación por su grasa saturada; el resto son todo verduras, legumbres y cereales integrales.",
    ingredientes: [
      { foodId: "ia_cebolla", cantidad: 150 },
      { foodId: "ia_patata", cantidad: 400 },
      { foodId: "ia_zanahoria", cantidad: 160 },
      { foodId: "aove", cantidad: 20 },
      { foodId: "ia_tomate", cantidad: 200 },
      { foodId: "ia_caldo_de_verduras", cantidad: 500 },
      { foodId: "ia_margarina_vegetal_sin_grasas_trans", cantidad: 40 },
      { foodId: "ia_curry_en_polvo", cantidad: 15 },
      { foodId: "ia_harina_de_trigo_integral", cantidad: 25 },
      { foodId: "arroz_integral", cantidad: 560 },
      { foodId: "ia_tofu", cantidad: 400 },
      { foodId: "ia_bebida_de_soja_sin_azucar", cantidad: 30 },
      { foodId: "ia_pan_rallado_integral", cantidad: 50 }
    ],
    pasos: [
      "Corta la cebolla, las patatas y las zanahorias en trozos y sofríelos en una olla con un poco de AOVE y un par de dientes de ajo picados, a fuego medio.",
      "Añade el tomate triturado y pimienta recién molida, y deja que se cocine todo junto unos minutos.",
      "Cubre con el caldo de verduras y deja cocer a fuego medio, removiendo de vez en cuando, hasta que las verduras estén tiernas.",
      "Mientras tanto, prepara el roux: en una sartén aparte, derrite la margarina vegetal y ve incorporando el curry en polvo y la harina de trigo integral, añadiendo poco a poco caldo de la olla hasta conseguir una crema espesa y sin grumos.",
      "Vierte el roux en la olla y remueve hasta que la salsa quede homogénea.",
      "Cuece el arroz integral aparte, con la cantidad de agua que indique el envase.",
      "Para la proteína, corta el tofu en cubos y pásalo primero por bebida de soja y después por pan rallado integral — si prefieres una versión sin gluten, puedes usar harina de garbanzos en su lugar.",
      "Cocina el tofu rebozado en air fryer o en una sartén con un poco de AOVE, hasta que quede dorado y crujiente por fuera.",
      "Sirve el arroz integral en un plato hondo, coloca el tofu encima y termina con la salsa de curry y verduras."
    ]
  },
  {
    id: "tortitas_platano_avena",
    nombre: "Tortitas de Plátano y Avena",
    imagen: "img/recetas/Tortitas-Plátano-y-Avena.jpg",
    emojiPortada: "🍌🥞🌾",
    rating: "A",
    tiempo: "15 min",
    raciones: 1,
    descripcion: "Un desayuno hecho puré con la batidora: plátano, avena, huevo y una mezcla de semillas que aportan fibra, proteína y grasas saludables — sin azúcar añadido y sin harinas refinadas.",
    motivo: "El plátano maduro aporta todo el dulzor que necesita la receta, así que no hace falta azúcar añadido. La avena sustituye a la harina blanca de unas tortitas convencionales, sumando fibra y un índice glucémico más bajo. El huevo y la mezcla de semillas —lino, chía, sésamo y pipas de calabaza— convierten un desayuno típicamente solo de carbohidratos en un plato con proteína completa, grasas omega-3 y minerales como magnesio y zinc. Cocinadas en una sartén con poco AOVE, no con mantequilla, se mantienen ligeras sin perder ese punto crujiente por fuera y tierno por dentro.",
    ingredientes: [
      { foodId: "ia_platano", cantidad: 120 },
      { foodId: "avena", cantidad: 75 },
      { foodId: "huevo", cantidad: 60 },
      { foodId: "ia_bebida_de_avena", cantidad: 50 },
      { foodId: "ia_canela", cantidad: 1 },
      { foodId: "ia_semillas_de_lino", cantidad: 5 },
      { foodId: "ia_semillas_de_chia", cantidad: 5 },
      { foodId: "ia_semillas_de_sesamo", cantidad: 5 },
      { foodId: "ia_pipas_de_calabaza", cantidad: 5 },
      { foodId: "aove", cantidad: 5 }
    ],
    pasos: [
      "Bate el plátano, la avena (o los copos de avena, si no tienes harina de avena ya hecha), el huevo, la bebida de avena y la canela hasta conseguir una masa homogénea.",
      "Añade las semillas de lino, chía y sésamo, y las pipas de calabaza, y mezcla bien.",
      "Calienta una sartén con un poco de AOVE a fuego medio.",
      "Vierte la mitad de la masa en la sartén y espera a que la tortita se despegue sola del fondo antes de darle la vuelta.",
      "Cuando se despegue también por el otro lado, retírala del fuego. Repite con el resto de la masa.",
      "Sirve con un topping opcional al gusto, como crema de cacahuete 100% natural o fruta fresca."
    ]
  },
  {
    id: "gachas_de_avena",
    nombre: "Gachas de Avena",
    emojiPortada: "🥣🌾🌱",
    rating: "A",
    tiempo: "10 min",
    raciones: 1,
    descripcion: "Un desayuno calentito y sin prisas: avena cocida con bebida de avena, rematada con una mezcla de semillas ricas en omega-3, fibra y minerales.",
    motivo: "La avena aporta carbohidratos de absorción lenta y betaglucanos, una fibra soluble asociada a la mejora del perfil de colesterol. Cocerla con bebida de avena en vez de leche entera o nata mantiene la receta ligera y apta para quien evita lácteos, y el agua ayuda a dar la textura justa sin sumar calorías de más. La mezcla de semillas —lino, chía, sésamo y pipas de calabaza— convierte unas gachas corrientes en un desayuno con grasas omega-3, proteína vegetal y minerales como magnesio y zinc, sin necesidad de azúcar añadido.",
    ingredientes: [
      { foodId: "avena", cantidad: 75 },
      { foodId: "ia_bebida_de_avena", cantidad: 300 },
      { foodId: "ia_semillas_de_lino", cantidad: 5 },
      { foodId: "ia_semillas_de_chia", cantidad: 5 },
      { foodId: "ia_semillas_de_sesamo", cantidad: 5 },
      { foodId: "ia_pipas_de_calabaza", cantidad: 5 }
    ],
    pasos: [
      "Pon los copos de avena en un bol o sartén junto con la bebida de avena y 200 ml de agua.",
      "Cuece la mezcla unos 8 minutos —al microondas o a fuego medio en una sartén, removiendo de vez en cuando— hasta que espese.",
      "Añade las semillas de lino, chía y sésamo, y las pipas de calabaza, y remueve bien.",
      "Sirve con fruta fresca como topping opcional."
    ]
  }
];
