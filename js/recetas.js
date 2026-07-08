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
  }
];
