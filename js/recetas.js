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
    etiquetas: ["vegetariano"],
    momento: ["desayuno"],
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
    ],
    faqs: [
      { pregunta: "¿Es apta para vegetarianos?", respuesta: "Sí, es apta para vegetarianos porque lleva huevo pero ningún otro producto animal. No es apta para veganos por el huevo." },
      { pregunta: "¿Es apta para personas con intolerancia al gluten?", respuesta: "No tal cual: el pan integral de trigo contiene gluten. Puedes sustituirlo por pan integral sin gluten certificado sin que cambie el resto de la receta." },
      { pregunta: "¿Se puede preparar con antelación?", respuesta: "El aguacate machacado se oxida y pierde color en poco tiempo, así que lo ideal es prepararlo justo antes de comer. Puedes adelantar el huevo cocinado y tostar el pan en el momento." }
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
    etiquetas: ["vegano", "bajo-en-calorias"],
    momento: ["comida", "cena"],
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
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, si no añades el queso curado opcional. Sin él, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Se puede hacer sin gluten?", respuesta: "La pasta integral de trigo contiene gluten. Sustitúyela por pasta sin gluten (de arroz, maíz o legumbres); el resto de ingredientes ya no llevan gluten." },
      { pregunta: "¿Cuánto aguanta en la nevera?", respuesta: "2-3 días en un recipiente hermético. Recalienta con un chorrito de agua para que la salsa no se seque." }
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
    etiquetas: ["vegano"],
    momento: ["comida", "cena"],
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
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana y sin gluten?", respuesta: "Sí a ambas: todos los ingredientes son vegetales y el arroz integral no contiene gluten." },
      { pregunta: "¿Se puede comer frío, tipo tartera?", respuesta: "Sí, funciona igual de bien templado o frío, así que es una buena opción para preparar con antelación y llevar de tartera." },
      { pregunta: "¿Cuánto dura en la nevera?", respuesta: "El arroz cocido aguanta 2-3 días en un recipiente hermético; añade el aguacate justo antes de comer para que no se oxide." }
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
    etiquetas: ["vegano", "proteico"],
    momento: ["comida", "cena"],
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
    ],
    faqs: [
      { pregunta: "¿Es una receta 100% vegana?", respuesta: "Sí, ningún ingrediente es de origen animal: la proteína es tofu y la salsa se hace con verduras y caldo vegetal." },
      { pregunta: "¿Se puede hacer sin gluten?", respuesta: "El roux lleva harina de trigo integral y el rebozado del tofu, pan rallado integral; ambos se pueden sustituir por harina de garbanzo y pan rallado sin gluten, tal y como se indica en el paso 7." },
      { pregunta: "¿Se puede congelar?", respuesta: "La salsa de curry con verduras se congela muy bien hasta 2-3 meses. El tofu rebozado es mejor prepararlo fresco para que se mantenga crujiente." }
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
    etiquetas: ["vegetariano", "proteico"],
    momento: ["desayuno"],
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
      "Tritura las semillas de lino, chía y sésamo, y las pipas de calabaza —con un molinillo o mortero— y añádelas a la masa, mezclando bien.",
      "Calienta una sartén con un poco de AOVE a fuego medio.",
      "Vierte la mitad de la masa en la sartén y espera a que la tortita se despegue sola del fondo antes de darle la vuelta.",
      "Cuando se despegue también por el otro lado, retírala del fuego. Repite con el resto de la masa.",
      "Sirve con un topping opcional al gusto, como crema de cacahuete 100% natural o fruta fresca."
    ],
    faqs: [
      { pregunta: "¿Son aptas para vegetarianos?", respuesta: "Sí, llevan huevo pero ningún otro producto animal. No son aptas para veganos por el huevo." },
      { pregunta: "¿Se pueden hacer sin gluten?", respuesta: "La avena no contiene gluten de forma natural, pero suele haber contaminación cruzada en su procesado; usa copos de avena certificados sin gluten si lo necesitas." },
      { pregunta: "¿Puedo sustituir el huevo para hacerlas veganas?", respuesta: "Puedes probar con una cucharada de semillas de lino molidas mezcladas con 3 cucharadas de agua (deja reposar 5 minutos), aunque no hemos probado esta variante en la receta." }
    ]
  },
  {
    id: "gachas_de_avena",
    nombre: "Gachas de Avena",
    imagen: "img/recetas/gachas-de-avena.jpg",
    emojiPortada: "🥣🌾🌱",
    rating: "A",
    tiempo: "10 min",
    raciones: 1,
    etiquetas: ["vegano"],
    momento: ["desayuno"],
    descripcion: "Un desayuno calentito y sin prisas: avena cocida con bebida de avena, rematada con una mezcla de semillas ricas en omega-3, fibra y minerales.",
    motivo: "La avena aporta carbohidratos de absorción lenta y betaglucanos, una fibra soluble asociada a la mejora del perfil de colesterol. Cocerla con bebida de avena en vez de leche entera o nata mantiene la receta ligera y apta para quien evita lácteos, y el agua ayuda a dar la textura justa sin sumar calorías de más. La mezcla de semillas —lino, chía, sésamo y pipas de calabaza— convierte unas gachas corrientes en un desayuno con grasas omega-3, proteína vegetal y minerales como magnesio y zinc, sin necesidad de azúcar añadido.",
    ingredientes: [
      { foodId: "avena", cantidad: 75 },
      { foodId: "ia_bebida_de_avena", cantidad: 300 },
      { foodId: "ia_agua", cantidad: 200 },
      { foodId: "ia_semillas_de_lino", cantidad: 5 },
      { foodId: "ia_semillas_de_chia", cantidad: 5 },
      { foodId: "ia_semillas_de_sesamo", cantidad: 5 },
      { foodId: "ia_pipas_de_calabaza", cantidad: 5 }
    ],
    pasos: [
      "Pon los copos de avena en un bol o sartén junto con la bebida de avena y el agua.",
      "Cuece la mezcla unos 8 minutos —al microondas o a fuego medio en una sartén, removiendo de vez en cuando— hasta que espese.",
      "Tritura las semillas de lino, chía y sésamo, y las pipas de calabaza —con un molinillo o mortero— y añádelas, removiendo bien.",
      "Sirve con fruta fresca como topping opcional."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "La avena no contiene gluten de forma natural, pero conviene comprarla certificada sin gluten si hay sensibilidad, por la contaminación cruzada habitual en su procesado." },
      { pregunta: "¿Se puede preparar la noche antes (overnight oats)?", respuesta: "Sí, puedes dejar los copos de avena en remojo con la bebida de avena en la nevera toda la noche, sin necesidad de cocerlos al día siguiente." }
    ]
  },
  {
    id: "crumbl_cookies_saludables",
    nombre: "Crumbl Cookies Saludables",
    imagen: "img/recetas/Crumbl-Cookies.jpg",
    emojiPortada: "🍪🌴🍫",
    rating: "B",
    tiempo: "35 min",
    raciones: 8,
    mostrarPorRacion: true,
    etiquetas: ["vegetariano"],
    momento: [],
    descripcion: "La versión sana de las galletas gigantes que arrasan en redes: sin azúcar añadido —el dulzor viene solo de los dátiles—, con harina integral y chocolate negro. Mismo gusto, perfil nutricional muy distinto.",
    motivo: "Las Crumbl originales llevan harina blanca, mantequilla y una mezcla de azúcar blanco y moreno que puede superar los 30 g de azúcar añadido por galleta, más coberturas extra que disparan aún más esa cifra. Aquí el dulzor viene entero de los dátiles, que aportan fibra junto a su azúcar natural en vez de azúcar libre sin más; la harina integral suma fibra frente a la blanca; y el chocolate negro ≥85% aporta antioxidantes con mucha menos azúcar que unas pepitas de chocolate con leche. La margarina vegetal sin grasas trans mantiene la textura blanda característica de estas galletas — es el ingrediente a disfrutar con moderación, como en cualquier repostería.",
    ingredientes: [
      { foodId: "ia_harina_de_trigo_integral", cantidad: 220 },
      { foodId: "ia_datiles", cantidad: 150 },
      { foodId: "ia_margarina_vegetal_sin_grasas_trans", cantidad: 80 },
      { foodId: "huevo", cantidad: 60 },
      { foodId: "chocolate_negro", cantidad: 100 }
    ],
    pasos: [
      "Precalienta el horno a 180 °C y prepara una bandeja con papel de horno.",
      "Deshuesa los dátiles y ponlos en remojo con agua caliente 10 minutos para ablandarlos; escúrrelos y tritúralos hasta conseguir una pasta homogénea.",
      "Bate la margarina vegetal con la pasta de dátiles hasta integrarlas bien.",
      "Añade el huevo y mezcla de nuevo.",
      "Incorpora la harina integral (con una pizca de levadura química, no bicarbonato — necesita un ácido que esta masa no tiene) poco a poco, hasta formar una masa consistente pero blanda.",
      "Añade el chocolate negro troceado y repártelo por toda la masa con una espátula.",
      "Forma 8 bolas grandes (unos 75 g cada una), colócalas separadas en la bandeja y aplástalas ligeramente.",
      "Hornea 12-14 minutos, hasta que los bordes estén dorados y el centro siga blando — así se consigue la textura tierna característica de las Crumbl.",
      "Deja templar sobre la bandeja unos minutos antes de moverlas: se terminan de asentar fuera del horno."
    ],
    faqs: [
      { pregunta: "¿Son aptas para veganos?", respuesta: "No, llevan huevo. Si quieres probar una versión vegana, puedes sustituirlo por una cucharada de semillas de lino molidas con 3 cucharadas de agua, aunque no está testado en esta receta." },
      { pregunta: "¿Se pueden hacer sin gluten?", respuesta: "La harina de trigo integral contiene gluten. Sustitúyela por una mezcla de harinas sin gluten (avena certificada, arroz o almendra); puede que necesites ajustar ligeramente la cantidad de líquido." },
      { pregunta: "¿Se puede congelar la masa?", respuesta: "Sí, forma las bolas de masa y congélalas; hornea directamente desde congelado añadiendo 2-3 minutos más al tiempo de horneado." }
    ]
  },
  {
    id: "gachas_de_avena_dulce",
    nombre: "Gachas Dulces de Avena",
    imagen: "img/recetas/Gachas-Dulces-de-Avena.jpg",
    emojiPortada: "🥣🫜🍌",
    rating: "B",
    tiempo: "15 min",
    raciones: 1,
    etiquetas: ["vegetariano"],
    momento: ["desayuno"],
    descripcion: "Una versión más golosa y colorida de las gachas clásicas: remolacha y dátiles triturados aportan un dulzor natural intenso, rematada con plátano y un toque de miel. Un desayuno muy completo y saciante.",
    motivo: "Esta versión suma remolacha y dátiles triturados a la base de avena, lo que aporta un dulzor natural muy marcado junto con fibra, folato y nitratos dietéticos —estos últimos relacionados con una mejor función vascular—, además de betalaínas antioxidantes propias del color de la remolacha. El plátano en rodajas y la miel por encima suman más azúcares, naturales en el caso del plátano y libres en el de la miel, así que aunque sigue siendo un desayuno muy nutritivo y saciante gracias a sus más de 25 g de fibra, conviene tenerlo en cuenta si se está vigilando el azúcar total del día. La canela, opcional, no aporta calorías relevantes y se ha asociado además a una mejor regulación de la glucemia.",
    ingredientes: [
      { foodId: "avena", cantidad: 75 },
      { foodId: "ia_bebida_de_avena", cantidad: 300 },
      { foodId: "ia_agua", cantidad: 350 },
      { foodId: "ia_semillas_de_lino", cantidad: 5 },
      { foodId: "ia_semillas_de_chia", cantidad: 5 },
      { foodId: "ia_semillas_de_sesamo", cantidad: 5 },
      { foodId: "ia_pipas_de_calabaza", cantidad: 5 },
      { foodId: "remolacha", cantidad: 100 },
      { foodId: "ia_platano", cantidad: 120 },
      { foodId: "ia_datiles", cantidad: 60 },
      { foodId: "miel", cantidad: 20 },
      { foodId: "ia_canela", cantidad: 1, opcional: true }
    ],
    pasos: [
      "Pon los copos de avena en un bol o sartén junto con la bebida de avena y 200 g de agua (reserva los 150 g restantes para el paso 4).",
      "Cuece la mezcla unos 8 minutos —al microondas o a fuego medio en una sartén, removiendo de vez en cuando— hasta que espese.",
      "Tritura las semillas de lino, chía y sésamo, y las pipas de calabaza —con un molinillo o mortero— y añádelas a la avena, removiendo bien.",
      "Lava bien la remolacha y tritúrala (con piel) junto con los dátiles deshuesados y los 150 g de agua reservados, hasta conseguir una crema fina.",
      "Añade la crema de remolacha y dátiles al bol de avena y mezcla bien.",
      "Corta el plátano en rodajas y repártelo por encima.",
      "Añade la miel por encima.",
      "Espolvorea canela al gusto (opcional)."
    ],
    faqs: [
      { pregunta: "¿Es apta para veganos?", respuesta: "No estrictamente, por la miel. Para una versión vegana, sustitúyela por sirope de agave o por dátiles extra triturados con la crema de remolacha." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "La avena no contiene gluten de forma natural, pero conviene comprarla certificada sin gluten si hay sensibilidad, por la contaminación cruzada habitual en su procesado." },
      { pregunta: "¿Puedo preparar la crema de remolacha y dátiles con antelación?", respuesta: "Sí, se conserva 2-3 días en la nevera en un bote hermético; solo tendrás que mezclarla con la avena recién hecha." }
    ]
  },
  {
    id: "crepes_caseros",
    nombre: "Crepes Caseros",
    imagen: "img/recetas/Crepes-Caseros.jpg",
    emojiPortada: "🥞🌾🫒",
    rating: "A",
    tiempo: "30 min",
    raciones: 10,
    mostrarPorRacion: true,
    etiquetas: ["vegetariano"],
    momento: ["desayuno"],
    descripcion: "La versión integral y sin lácteos de los crepes clásicos: harina de avena en vez de harina blanca, bebida de soja en vez de leche, y AOVE en vez de mantequilla. Una base neutra y nutritiva que sirve igual para relleno dulce o salado.",
    motivo: "Esta versión sustituye la harina blanca por harina de avena integral, rica en fibra soluble (betaglucanos) que ayuda a moderar la respuesta glucémica; la leche entera por bebida de soja sin azúcares añadidos, que aporta proteína vegetal completa sin la grasa saturada ni el colesterol de la leche animal; y la mantequilla por AOVE, aportando grasa mayoritariamente monoinsaturada en vez de saturada. Al no llevar azúcar ni sal añadidos en la masa, el perfil final depende por completo del relleno que elijas, dulce o salado.",
    ingredientes: [
      { foodId: "ia_harina_de_avena_integral", cantidad: 250 },
      { foodId: "huevo", cantidad: 150 },
      { foodId: "ia_bebida_de_soja", cantidad: 500 },
      { foodId: "aove", cantidad: 40 }
    ],
    pasos: [
      "Bate los huevos en un bol grande.",
      "Añade la bebida de soja poco a poco, sin dejar de batir.",
      "Incorpora la harina de avena integral tamizada, mezclando hasta que no queden grumos, y deja reposar la masa 15 minutos.",
      "Añade el AOVE a la masa y remueve para integrarlo.",
      "Calienta una sartén antiadherente a fuego medio y engrásala con un poco de AOVE.",
      "Vierte un cucharón de masa, reparte bien por toda la sartén con movimientos circulares y cuece 1-2 minutos por cada lado, hasta que se dore.",
      "Repite con el resto de la masa, engrasando ligeramente la sartén entre crepe y crepe.",
      "Rellena o cubre al gusto: dulce (fruta, chocolate negro, crema de cacahuete) o salado (verduras, queso, pollo)."
    ],
    faqs: [
      { pregunta: "¿Son aptos para veganos?", respuesta: "No, llevan huevo. Puedes probar a sustituirlo por una mezcla de harina de garbanzo con agua, aunque cambiará ligeramente la textura y el sabor." },
      { pregunta: "¿Son aptos sin gluten?", respuesta: "La harina de avena no contiene gluten de forma natural, pero elige una certificada sin gluten si hay sensibilidad, por la posible contaminación cruzada en su procesado." },
      { pregunta: "¿Se pueden conservar hechos con antelación?", respuesta: "Sí, apílalos con papel vegetal entre cada crepe y guárdalos en la nevera 2-3 días, o congélalos hasta 1 mes." }
    ]
  },
  {
    id: "gachas_de_avena_proteicas",
    nombre: "Gachas de Avena Proteicas",
    imagen: "img/recetas/Gachas-de-Avena-Proteicas.jpg",
    emojiPortada: "🥣💪🥜",
    rating: "A",
    tiempo: "15 min",
    raciones: 1,
    etiquetas: ["vegetariano", "proteico"],
    momento: ["desayuno"],
    descripcion: "La versión con más proteína de nuestras gachas: bebida de soja, yogur natural, crema de cacahuete y pipas de calabaza suman más de 35 g de proteína en un único bol, sin recurrir a proteína en polvo.",
    motivo: "Esta variante prioriza la proteína usando solo alimentos reales: la bebida de soja aporta más proteína que otras bebidas vegetales; el yogur natural suma cremosidad, probióticos y otros 10 g de proteína; y la crema de cacahuete junto con las pipas de calabaza completan el perfil con proteína vegetal, grasas saludables y minerales como magnesio y zinc. El resultado son más de 35 g de proteína en un desayuno, sin necesidad de suplementos.",
    ingredientes: [
      { foodId: "avena", cantidad: 60 },
      { foodId: "ia_bebida_de_soja", cantidad: 250 },
      { foodId: "yogur_natural", cantidad: 100 },
      { foodId: "ia_crema_de_cacahuete", cantidad: 15 },
      { foodId: "ia_pipas_de_calabaza", cantidad: 10 },
      { foodId: "ia_canela", cantidad: 1, opcional: true }
    ],
    pasos: [
      "Cuece la avena con la bebida de soja a fuego medio 5-6 minutos, removiendo, hasta que espese.",
      "Retira del fuego, añade la canela y deja templar un par de minutos.",
      "Incorpora el yogur natural, removiendo hasta que quede cremoso.",
      "Sirve con la crema de cacahuete y las pipas de calabaza por encima."
    ],
    faqs: [
      { pregunta: "¿Es apta para veganos?", respuesta: "No, lleva yogur natural (lácteo). Para una versión vegana, sustitúyelo por yogur de soja o de coco sin azúcares añadidos, aunque la proteína total bajará algo." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "La avena no contiene gluten de forma natural, pero conviene comprarla certificada sin gluten si hay sensibilidad, por la contaminación cruzada habitual en su procesado." },
      { pregunta: "¿Puedo sustituir la crema de cacahuete si tengo alergia a los frutos secos?", respuesta: "Sí, puedes usar tahini (crema de sésamo) o simplemente omitirla y añadir un poco más de pipas de calabaza para compensar parte de la proteína." }
    ]
  },
  {
    id: "gachas_de_avena_frutos_rojos",
    nombre: "Gachas de Avena con Frutos Rojos",
    imagen: "img/recetas/Gachas-de-Avena-con-Frutos-Rojos.jpg",
    emojiPortada: "🥣🫐🍓",
    rating: "A",
    tiempo: "15 min",
    raciones: 1,
    etiquetas: ["vegano"],
    momento: ["desayuno"],
    descripcion: "Una versión antioxidante de las gachas clásicas: arándanos, fresas y frambuesas aportan todo el dulzor, sin azúcar añadido, junto a semillas de chía para completar el clásico dúo con frutos rojos.",
    motivo: "Esta variante prioriza la fibra y los antioxidantes por encima de todo: los arándanos destacan por sus antocianinas, las fresas por su vitamina C, y las frambuesas por un contenido en fibra excepcionalmente alto para ser una fruta. Al machacar parte de la fruta en una compota rápida y dejar el resto entera, se consigue dulzor y textura sin necesidad de miel ni dátiles, a diferencia de las Gachas Dulces. Las semillas de chía, además de sumar omega-3, son el acompañante clásico de los frutos rojos.",
    ingredientes: [
      { foodId: "avena", cantidad: 75 },
      { foodId: "ia_bebida_de_avena", cantidad: 300 },
      { foodId: "ia_agua", cantidad: 150 },
      { foodId: "arandanos", cantidad: 50 },
      { foodId: "fresas", cantidad: 50 },
      { foodId: "frambuesas", cantidad: 50 },
      { foodId: "ia_semillas_de_chia", cantidad: 10 }
    ],
    pasos: [
      "Cuece la avena con la bebida de avena y el agua, 8 minutos a fuego medio, removiendo.",
      "Mientras tanto, machaca la mitad de los arándanos, las fresas y las frambuesas con un tenedor hasta conseguir una especie de compota rápida.",
      "Retira la avena del fuego e incorpora la compota de frutos rojos, removiendo bien.",
      "Sirve con el resto de la fruta entera o troceada por encima, y espolvorea las semillas de chía."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "La avena no contiene gluten de forma natural, pero conviene comprarla certificada sin gluten si hay sensibilidad, por la contaminación cruzada habitual en su procesado." },
      { pregunta: "¿Puedo usar fruta congelada en vez de fresca?", respuesta: "Sí, los frutos rojos congelados funcionan igual de bien e incluso facilitan machacar la compota; solo tardarán un poco más en atemperarse." }
    ]
  },
  {
    id: "gachas_de_avena_chocolate",
    nombre: "Gachas de Avena al Chocolate",
    imagen: "img/recetas/Gachas-de-Avena-al-Chocolate.jpg",
    emojiPortada: "🥣🍫🍌",
    rating: "B",
    tiempo: "15 min",
    raciones: 1,
    etiquetas: ["vegano"],
    momento: ["desayuno"],
    descripcion: "La versión chocolatera de las gachas clásicas: cacao puro sin azúcar, plátano, crema de cacahuete y unos trocitos de chocolate negro. Sabor a golosina, sin azúcar añadido.",
    motivo: "El cacao puro en polvo aporta todo el sabor a chocolate sin nada de azúcar añadido, y con una cantidad de fibra excepcional. El plátano machacado endulza la mezcla de forma natural, sin necesidad de azúcar ni miel. La crema de cacahuete y el chocolate negro por encima son el toque más indulgente de la receta —por eso la calificamos con B, igual que las Crumbl Cookies o las Gachas Dulces—, pero siguen siendo comida real: nada de chocolate con leche ni cacaos solubles azucarados.",
    ingredientes: [
      { foodId: "avena", cantidad: 75 },
      { foodId: "ia_bebida_de_avena", cantidad: 300 },
      { foodId: "ia_agua", cantidad: 100 },
      { foodId: "cacao_puro", cantidad: 15 },
      { foodId: "ia_platano", cantidad: 60 },
      { foodId: "ia_crema_de_cacahuete", cantidad: 15 },
      { foodId: "chocolate_negro", cantidad: 15 }
    ],
    pasos: [
      "Cuece la avena con la bebida de avena y el agua, 6-7 minutos a fuego medio, removiendo.",
      "Añade el cacao en polvo y remueve hasta que se disuelva bien.",
      "Machaca la mitad del plátano e incorpóralo a la avena para endulzarla; corta el resto en rodajas.",
      "Sirve con el plátano en rodajas, la crema de cacahuete y el chocolate negro troceado por encima."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "La avena no contiene gluten de forma natural, pero conviene comprarla certificada sin gluten si hay sensibilidad, por la contaminación cruzada habitual en su procesado." },
      { pregunta: "¿Puedo sustituir la crema de cacahuete si tengo alergia a los frutos secos?", respuesta: "Sí, puedes usar tahini (crema de sésamo) o simplemente omitirla; el sabor a chocolate seguirá estando presente por el cacao puro." }
    ]
  },
  {
    id: "gachas_de_avena_overnight",
    nombre: "Gachas de Avena Overnight",
    imagen: "img/recetas/Overnight-Oats.jpg",
    emojiPortada: "🥣🌙🍌",
    rating: "A",
    tiempo: "5 min + reposo",
    raciones: 1,
    etiquetas: ["vegetariano"],
    momento: ["desayuno"],
    descripcion: "La versión sin cocinar de las gachas: se prepara la noche antes en un bote con tapa y reposa en la nevera, sin fuego ni microondas. Ideal para dejar lista la noche antes y llevar al trabajo.",
    motivo: "Aquí la textura no la da la cocción, sino las semillas de chía: en contacto con el líquido durante varias horas forman un gel que espesa la mezcla igual que lo haría el calor. El yogur natural aporta la cremosidad y la proteína extra que en la versión caliente pone la cocción, y el plátano se añade en el momento de comer para que no pierda textura. El resultado es un desayuno tan nutritivo como las gachas clásicas, pero listo para llevar sin pasar por la cocina por la mañana.",
    ingredientes: [
      { foodId: "avena", cantidad: 60 },
      { foodId: "ia_bebida_de_avena", cantidad: 200 },
      { foodId: "yogur_natural", cantidad: 100 },
      { foodId: "ia_semillas_de_chia", cantidad: 10 },
      { foodId: "ia_platano", cantidad: 60 },
      { foodId: "ia_canela", cantidad: 1, opcional: true }
    ],
    pasos: [
      "En un bote o tarro con tapa, mezcla la avena, la bebida de avena, el yogur natural y las semillas de chía.",
      "Añade la canela si quieres, y remueve bien.",
      "Tapa y deja reposar en la nevera toda la noche (mínimo 6-8 horas).",
      "Por la mañana, remueve y corta el plátano en rodajas por encima antes de servir, frío, directo de la nevera."
    ],
    faqs: [
      { pregunta: "¿Es apta para veganos?", respuesta: "No, lleva yogur natural (lácteo). Para una versión vegana, sustitúyelo por yogur de soja o de coco sin azúcares añadidos." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "La avena no contiene gluten de forma natural, pero conviene comprarla certificada sin gluten si hay sensibilidad, por la contaminación cruzada habitual en su procesado." },
      { pregunta: "¿Cuánto tiempo se puede guardar en la nevera ya preparada?", respuesta: "Hasta 3-4 días en un bote con tapa hermética; el plátano es mejor añadirlo justo antes de comer para que no se oxide." }
    ]
  },
  {
    id: "overnight_oats_proteicos",
    nombre: "Overnight Oats Proteicos",
    imagen: "img/recetas/Overnight-Oats-Proteicos.jpg",
    emojiPortada: "🥣🌙💪",
    rating: "A",
    tiempo: "5 min + reposo",
    raciones: 1,
    etiquetas: ["vegetariano", "proteico"],
    momento: ["desayuno"],
    descripcion: "La versión sin cocinar y con más proteína de nuestra avena: yogur natural, crema de cacahuete y pipas de calabaza suman más de 35 g de proteína, lista de la noche a la mañana sin encender el fuego.",
    motivo: "Igual que en la versión caliente, aquí la proteína viene entera de comida real: la bebida de soja aporta más proteína que otras bebidas vegetales, el yogur natural suma otros 10 g y cremosidad, y la crema de cacahuete junto con las pipas de calabaza completan el perfil con proteína vegetal y grasas saludables. Las semillas de chía, además de sumar omega-3, son las que espesan la mezcla en la nevera sin necesidad de cocción.",
    ingredientes: [
      { foodId: "avena", cantidad: 60 },
      { foodId: "ia_bebida_de_soja", cantidad: 200 },
      { foodId: "yogur_natural", cantidad: 100 },
      { foodId: "ia_semillas_de_chia", cantidad: 10 },
      { foodId: "ia_crema_de_cacahuete", cantidad: 15 },
      { foodId: "ia_pipas_de_calabaza", cantidad: 10 },
      { foodId: "ia_canela", cantidad: 1, opcional: true }
    ],
    pasos: [
      "En un bote o tarro con tapa, mezcla la avena, la bebida de soja, el yogur natural y las semillas de chía.",
      "Añade la canela si quieres, y remueve bien.",
      "Tapa y deja reposar en la nevera toda la noche (mínimo 6-8 horas).",
      "Por la mañana, remueve y sirve con la crema de cacahuete y las pipas de calabaza por encima."
    ],
    faqs: [
      { pregunta: "¿Es apta para veganos?", respuesta: "No, lleva yogur natural (lácteo). Para una versión vegana, sustitúyelo por yogur de soja o de coco sin azúcares añadidos, aunque la proteína total bajará algo." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "La avena no contiene gluten de forma natural, pero conviene comprarla certificada sin gluten si hay sensibilidad, por la contaminación cruzada habitual en su procesado." },
      { pregunta: "¿Cuánto tiempo se puede guardar en la nevera ya preparada?", respuesta: "Hasta 3-4 días en un bote con tapa hermética; añade la crema de cacahuete y las pipas de calabaza justo antes de comer para que mantengan su textura." }
    ]
  },
  {
    id: "overnight_oats_chocolate",
    nombre: "Overnight Oats de Chocolate",
    imagen: "img/recetas/Overnight-Oats-Chocolate.jpg",
    emojiPortada: "🥣🌙🍫",
    rating: "B",
    tiempo: "5 min + reposo",
    raciones: 1,
    etiquetas: ["vegano"],
    momento: ["desayuno"],
    descripcion: "La versión sin cocinar de las gachas al chocolate: cacao puro, plátano y semillas de chía se mezclan en frío la noche antes, sin necesidad de derretir ni cocinar nada.",
    motivo: "El cacao puro se disuelve perfectamente en frío con un poco de remover, así que no hace falta calor para conseguir el sabor a chocolate. El plátano machacado endulza toda la mezcla de forma natural, y las semillas de chía son las que espesan la avena durante la noche en la nevera. La crema de cacahuete y el chocolate negro por encima son el toque más indulgente —por eso la calificamos con B, igual que la versión caliente—, pero sigue siendo cacao puro sin azúcar y chocolate ≥85%, no un cacao soluble azucarado.",
    ingredientes: [
      { foodId: "avena", cantidad: 60 },
      { foodId: "ia_bebida_de_avena", cantidad: 200 },
      { foodId: "cacao_puro", cantidad: 15 },
      { foodId: "ia_semillas_de_chia", cantidad: 10 },
      { foodId: "ia_platano", cantidad: 60 },
      { foodId: "ia_crema_de_cacahuete", cantidad: 15 },
      { foodId: "chocolate_negro", cantidad: 15 }
    ],
    pasos: [
      "En un bote con tapa, machaca el plátano y mézclalo con la avena, la bebida de avena, el cacao en polvo y las semillas de chía.",
      "Remueve bien hasta que el cacao se disuelva sin grumos.",
      "Tapa y deja reposar en la nevera toda la noche (mínimo 6-8 horas).",
      "Por la mañana, remueve y sirve con la crema de cacahuete y el chocolate negro troceado por encima."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "La avena no contiene gluten de forma natural, pero conviene comprarla certificada sin gluten si hay sensibilidad, por la contaminación cruzada habitual en su procesado." },
      { pregunta: "¿Puedo usar cacao en polvo azucarado en vez de cacao puro?", respuesta: "No te lo recomendamos: el cacao soluble azucarado (tipo Cola Cao) añade azúcar libre innecesario. Con cacao puro sin azúcar y el dulzor del plátano es más que suficiente." }
    ]
  },
  {
    id: "overnight_oats_frutos_rojos",
    nombre: "Overnight Oats con Frutos Rojos",
    imagen: "img/recetas/Overnight-Oats-Frutos-Rojos.jpg",
    emojiPortada: "🥣🌙🫐",
    rating: "A",
    tiempo: "5 min + reposo",
    raciones: 1,
    etiquetas: ["vegetariano", "proteico"],
    momento: ["desayuno"],
    descripcion: "La versión sin cocinar de las gachas con frutos rojos: arándanos, fresas y frambuesas machacados en frío la noche antes, con yogur natural y chía para conseguir una textura cremosa sin pasar por el fuego.",
    motivo: "Al igual que en la versión caliente, el dulzor viene entero de la fruta —sin miel ni dátiles—, y las semillas de chía espesan la mezcla durante la noche en la nevera. El yogur natural suma la cremosidad que aquí no aporta la cocción, además de proteína extra. El resultado combina la fibra y los antioxidantes de los frutos rojos (antocianinas, vitamina C) con la comodidad de tenerlo listo de un día para otro.",
    ingredientes: [
      { foodId: "avena", cantidad: 60 },
      { foodId: "ia_bebida_de_avena", cantidad: 200 },
      { foodId: "yogur_natural", cantidad: 100 },
      { foodId: "ia_semillas_de_chia", cantidad: 10 },
      { foodId: "arandanos", cantidad: 50 },
      { foodId: "fresas", cantidad: 50 },
      { foodId: "frambuesas", cantidad: 50 }
    ],
    pasos: [
      "En un bote con tapa, machaca la mitad de los arándanos, las fresas y las frambuesas con un tenedor.",
      "Mézclalos con la avena, la bebida de avena, el yogur natural y las semillas de chía.",
      "Tapa y deja reposar en la nevera toda la noche (mínimo 6-8 horas).",
      "Por la mañana, remueve y sirve con el resto de la fruta entera o troceada por encima."
    ],
    faqs: [
      { pregunta: "¿Es apta para veganos?", respuesta: "No, lleva yogur natural (lácteo). Para una versión vegana, sustitúyelo por yogur de soja o de coco sin azúcares añadidos." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "La avena no contiene gluten de forma natural, pero conviene comprarla certificada sin gluten si hay sensibilidad, por la contaminación cruzada habitual en su procesado." },
      { pregunta: "¿Puedo usar fruta congelada en vez de fresca?", respuesta: "Sí, funciona igual de bien; si la añades directamente congelada sobre la mezcla ya reposada, incluso ayuda a mantenerla más fría por la mañana." }
    ]
  },
  {
    id: "hamburguesa_garbanzos",
    nombre: "Hamburguesa Saludable de Garbanzos",
    imagen: "img/recetas/Hamburguesa-Saludable.jpg",
    emojiPortada: "🍔🫘🥑",
    rating: "A",
    tiempo: "25 min",
    raciones: 1,
    etiquetas: ["vegano", "proteico"],
    momento: ["comida", "cena"],
    descripcion: "La versión 100% vegetal de la hamburguesa clásica: una hamburguesa casera de garbanzos, pan integral y aguacate en vez de mayonesa. Sin carne, sin salsas ultraprocesadas y con una cantidad de fibra excepcional.",
    motivo: "Esta hamburguesa cambia la carne por garbanzos cocidos, una legumbre rica en proteína vegetal que deja el plato completo con casi 26 g de fibra, muy por encima de cualquier hamburguesa con carne. El pan integral suma más fibra frente al pan blanco habitual, y el aguacate machacado hace de \"mayonesa saludable\", aportando grasa monoinsaturada en vez de la grasa de una salsa comercial. El queso curado queda como topping opcional, a disfrutar con moderación como en cualquier otra receta.",
    ingredientes: [
      { foodId: "pan_integral", cantidad: 80 },
      { foodId: "ia_garbanzos", cantidad: 180 },
      { foodId: "ia_cebolla", cantidad: 30 },
      { foodId: "ia_pan_rallado_integral", cantidad: 20 },
      { foodId: "aove", cantidad: 10 },
      { foodId: "aguacate", cantidad: 50 },
      { foodId: "ia_tomate", cantidad: 40 },
      { foodId: "lechuga", cantidad: 20 },
      { foodId: "queso_curado", cantidad: 15, opcional: true }
    ],
    pasos: [
      "Escurre y aplasta los garbanzos con un tenedor o batidora hasta conseguir una pasta gruesa (deja algunos trozos enteros para dar textura).",
      "Mezcla con la cebolla picada muy fina, el pan rallado integral y pimienta al gusto.",
      "Forma una hamburguesa con la mezcla y déjala reposar 10 minutos en la nevera para que compacte.",
      "Cocínala en una sartén con el AOVE a fuego medio, 3-4 minutos por cada lado, hasta que esté dorada.",
      "Machaca el aguacate con un tenedor y tuesta ligeramente el pan integral.",
      "Monta: pan, aguacate machacado, la hamburguesa de garbanzos, tomate y lechuga. Añade el queso curado si quieres, opcional."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, si no añades el queso curado opcional. Sin él, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Se puede hacer sin gluten?", respuesta: "El pan integral y el pan rallado integral contienen gluten. Sustitúyelos por sus versiones sin gluten certificadas; el resto de ingredientes ya no llevan gluten." },
      { pregunta: "¿Se pueden congelar las hamburguesas de garbanzos?", respuesta: "Sí, forma las hamburguesas crudas y congélalas entre papel vegetal; cocínalas directamente desde congeladas añadiendo 1-2 minutos más por cada lado." }
    ]
  },
  {
    id: "pizza_saludable",
    nombre: "Pizza Saludable",
    imagen: "img/recetas/Pizza-Casera-Saludable.jpg",
    emojiPortada: "🍕🌾🍅",
    rating: "A",
    tiempo: "1 h 30 min",
    raciones: 2,
    etiquetas: ["vegano"],
    momento: ["comida", "cena"],
    descripcion: "La versión integral de la pizza clásica: masa de harina integral fermentada en casa, con tomate y albahaca fresca, sin queso — estilo pizza marinara napolitana. Menos de 4 g de grasa saturada en toda la pizza.",
    motivo: "Esta pizza cambia la masa refinada por harina de trigo integral, mucho más rica en fibra, y se hornea con tomate fresco en vez de una salsa comercial con azúcares añadidos. Al no llevar queso, evita la grasa saturada que suele dominar el perfil nutricional de una pizza normal — en este formato sin queso, estilo marinara napolitana, apenas hay grasa saturada en el plato. Si prefieres una versión con queso, puedes añadir mozzarella con moderación, teniendo en cuenta que subirá bastante esa cifra.",
    ingredientes: [
      { foodId: "ia_harina_de_trigo_integral", cantidad: 250 },
      { foodId: "levadura_panaderia", cantidad: 5 },
      { foodId: "ia_agua", cantidad: 150 },
      { foodId: "aove", cantidad: 20 },
      { foodId: "ia_tomate", cantidad: 200 },
      { foodId: "ia_albahaca", cantidad: 5 }
    ],
    pasos: [
      "Disuelve la levadura en el agua templada y deja reposar 5 minutos.",
      "Mezcla la harina integral con el agua con levadura y el AOVE; amasa hasta conseguir una masa lisa y elástica (unos 8-10 min).",
      "Forma una bola, tápala y deja fermentar en un lugar cálido 1 hora, hasta que doble su volumen.",
      "Precalienta el horno a 220°C.",
      "Estira la masa sobre una bandeja con papel de horno y reparte el tomate triturado con un chorrito de AOVE.",
      "Hornea 12-15 minutos, hasta que los bordes estén dorados.",
      "Termina con hojas de albahaca fresca antes de servir."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Se puede hacer sin gluten?", respuesta: "La harina de trigo integral contiene gluten. Sustitúyela por una mezcla de harinas sin gluten para pizza (arroz, maíz, trigo sarraceno); la fermentación y el amasado pueden variar algo." },
      { pregunta: "¿Puedo añadir queso?", respuesta: "Sí, un poco de mozzarella (unos 75 g para toda la pizza) le da el toque más clásico, aunque subirá la grasa saturada de forma notable — con moderación." }
    ]
  },
  {
    id: "poke_bowl_salmon",
    nombre: "Poke Bowl de Salmón",
    imagen: "img/recetas/Poke-Bowl-de-Salmón.jpg",
    emojiPortada: "🍚🐟🥑",
    rating: "A",
    tiempo: "20 min",
    raciones: 1,
    etiquetas: ["proteico"],
    momento: ["comida", "cena"],
    descripcion: "Un bowl completo estilo poke hawaiano: salmón sellado, arroz integral, edamame y verduras frescas, con un toque de salsa de soja baja en sodio y sésamo. Proteína, fibra y grasas saludables en un solo plato.",
    motivo: "Este bowl combina el salmón, rico en omega-3, con arroz integral (más fibra que el blanco) y edamame, una legumbre con una cantidad de proteína inusualmente alta para ser una verdura. El pepino y la zanahoria aportan frescura y volumen con muy pocas calorías, y el aguacate suma grasa monoinsaturada. Usamos salsa de soja baja en sodio y en poca cantidad, ya que es uno de los condimentos más concentrados en sodio que existen — así conseguimos el sabor umami característico sin disparar el sodio del plato.",
    ingredientes: [
      { foodId: "salmon", cantidad: 120 },
      { foodId: "arroz_integral", cantidad: 150 },
      { foodId: "aguacate", cantidad: 60 },
      { foodId: "ia_zanahoria", cantidad: 40 },
      { foodId: "edamame", cantidad: 60 },
      { foodId: "pepino", cantidad: 50 },
      { foodId: "salsa_soja_baja_sodio", cantidad: 10 },
      { foodId: "ia_semillas_de_sesamo", cantidad: 5 }
    ],
    pasos: [
      "Cuece el arroz integral según las instrucciones del envase y déjalo templar.",
      "Marca el salmón en una sartén muy caliente sin aceite, 1-2 minutos por cada lado, para que quede dorado por fuera y jugoso por dentro (estilo poke sellado).",
      "Corta el pepino y el aguacate en dados, y la zanahoria en juliana.",
      "Sirve el arroz de base en un bowl y coloca encima el salmón, el edamame, el pepino, el aguacate y la zanahoria en secciones separadas.",
      "Riega con la salsa de soja baja en sodio y espolvorea las semillas de sésamo."
    ],
    faqs: [
      { pregunta: "¿Puedo usar salmón crudo en vez de sellarlo?", respuesta: "Solo si es salmón etiquetado específicamente como apto para consumo crudo (congelado previamente para eliminar parásitos, según la normativa). Sellarlo brevemente en la sartén, como en esta receta, es la opción más segura para prepararlo en casa." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "La salsa de soja tradicional suele contener trigo; busca una versión sin gluten (tamari) si lo necesitas. El resto de ingredientes no llevan gluten." },
      { pregunta: "¿Puedo sustituir el salmón por otra proteína?", respuesta: "Sí, el tofu o el pollo a la plancha funcionan igual de bien si prefieres no comer pescado." }
    ]
  },
  {
    id: "bolitas_energeticas",
    nombre: "Bolitas Energéticas",
    imagen: "img/recetas/Bolitas-Energéticas.jpg",
    emojiPortada: "🌴🥜🍫",
    rating: "B",
    tiempo: "20 min + reposo",
    raciones: 12,
    mostrarPorRacion: true,
    etiquetas: ["vegano"],
    momento: [],
    descripcion: "El snack sin horno de moda: dátiles, avena, crema de cacahuete y cacao puro triturados juntos y formados en bolitas. Sin azúcar añadido, listo en 20 minutos y aguanta toda la semana en la nevera.",
    motivo: "El dulzor viene entero de los dátiles, que aportan fibra junto a su azúcar natural en vez de azúcar libre. La avena y las pipas de calabaza dan cuerpo y proteína vegetal, la crema de cacahuete aporta grasas saludables, y las semillas de chía suman omega-3. Al llevar bastante dátil por bolita, la calificamos con B, igual criterio que con las Crumbl Cookies — sigue siendo un snack de comida real, para disfrutar con moderación.",
    ingredientes: [
      { foodId: "ia_datiles", cantidad: 150 },
      { foodId: "avena", cantidad: 100 },
      { foodId: "ia_crema_de_cacahuete", cantidad: 60 },
      { foodId: "cacao_puro", cantidad: 20 },
      { foodId: "ia_semillas_de_chia", cantidad: 15 },
      { foodId: "ia_pipas_de_calabaza", cantidad: 20 }
    ],
    pasos: [
      "Deshuesa los dátiles y ponlos en remojo con agua caliente 10 minutos para ablandarlos; escúrrelos.",
      "Tritura los dátiles junto con la avena, la crema de cacahuete, el cacao en polvo, las semillas de chía y las pipas de calabaza en un robot de cocina, hasta conseguir una pasta homogénea y pegajosa.",
      "Forma 12 bolitas iguales con las manos (puedes humedecerlas un poco para que no se peguen).",
      "Guarda en la nevera al menos 30 minutos antes de comer, para que compacten. Se conservan hasta una semana en un recipiente hermético."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "La avena no contiene gluten de forma natural, pero conviene comprarla certificada sin gluten si hay sensibilidad, por la contaminación cruzada habitual en su procesado." },
      { pregunta: "¿Cuánto tiempo se conservan?", respuesta: "Hasta una semana en la nevera en un recipiente hermético, o hasta 2-3 meses congeladas." }
    ]
  },
  {
    id: "te_matcha_casero",
    nombre: "Té Matcha Casero",
    imagen: "img/recetas/Te-Matcha-Casero.jpg",
    emojiPortada: "🍵🌿🥛",
    rating: "A",
    tiempo: "10 min",
    raciones: 1,
    etiquetas: ["vegano", "bajo-en-calorias"],
    momento: [],
    descripcion: "El matcha latte que arrasa en redes, hecho en casa: matcha en polvo batido con bebida de avena, sin los azúcares añadidos habituales de la versión de cafetería.",
    motivo: "El matcha se elabora con la hoja de té entera molida, así que concentra muchos más antioxidantes (catequinas) y cafeína que una infusión de té verde normal. Al prepararlo en casa controlamos el dulzor por completo: la miel queda como opcional y en poca cantidad, muy lejos de los siropes azucarados que suelen llevar los matcha latte comerciales.",
    ingredientes: [
      { foodId: "matcha", cantidad: 2 },
      { foodId: "ia_bebida_de_avena", cantidad: 250 },
      { foodId: "ia_aroma_de_vainilla", cantidad: 1 },
      { foodId: "miel", cantidad: 10, opcional: true }
    ],
    pasos: [
      "Tamiza el matcha en un bol para evitar grumos.",
      "Añade un poco de bebida de avena caliente (no hirviendo) y bate enérgicamente con un batidor de bambú o unas varillas, hasta conseguir una crema espumosa sin grumos.",
      "Añade la vainilla y la miel si quieres, y remueve.",
      "Llena un vaso con hielo y vierte el resto de la bebida de avena.",
      "Añade la mezcla de matcha por encima y remueve antes de beber."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, si no añades la miel opcional (o la sustituyes por sirope de agave). Sin ella, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Lleva cafeína?", respuesta: "Sí, el matcha es rico en cafeína —más que una infusión de té verde normal, aunque menos que un café—; si eres sensible a la cafeína, empieza con menos cantidad." },
      { pregunta: "¿Puedo tomarlo caliente en vez de frío?", respuesta: "Sí, simplemente sirve la bebida de avena caliente en vez de con hielo, sin cambiar el resto de la receta." }
    ]
  },
  {
    id: "chocolate_de_dubai",
    nombre: "Chocolate de Dubái",
    emojiPortada: "🍫🥜🌿",
    rating: "B",
    tiempo: "1 h (con reposo)",
    raciones: 8,
    mostrarPorRacion: true,
    etiquetas: ["vegano"],
    momento: [],
    descripcion: "La versión casera del chocolate viral con pistacho y kataifi crujiente: chocolate negro ≥85% en vez de chocolate con leche, y una crema de pistacho sin azúcar añadido en vez de pasta de pistacho comercial.",
    motivo: "El chocolate negro sustituye al chocolate con leche de la receta original, aportando antioxidantes y mucha menos azúcar. La crema de relleno se hace triturando pistachos enteros con un poco de dátil para el dulzor, en vez de una pasta de pistacho comercial que suele llevar azúcar y aceite de palma. El kataifi se tuesta con un chorrito de AOVE en vez de la mantequilla abundante habitual. Sigue siendo un chocolate con bastante grasa —por eso lo calificamos con B, igual que las Crumbl Cookies—, pero muy por encima del original en calidad de ingredientes.",
    ingredientes: [
      { foodId: "chocolate_negro", cantidad: 150 },
      { foodId: "pistachos", cantidad: 80 },
      { foodId: "kataifi", cantidad: 40 },
      { foodId: "aove", cantidad: 10 },
      { foodId: "ia_datiles", cantidad: 20 }
    ],
    pasos: [
      "Tuesta el kataifi troceado en una sartén con el AOVE a fuego medio, removiendo, hasta que quede dorado y crujiente (unos 5 minutos). Deja enfriar.",
      "Tritura los pistachos junto con los dátiles hasta conseguir una pasta gruesa.",
      "Mezcla la pasta de pistacho con el kataifi tostado ya frío.",
      "Funde el chocolate negro al baño María o en el microondas en intervalos cortos, removiendo entre cada uno.",
      "Vierte la mitad del chocolate fundido en moldes de barrita (o uno grande) y reparte bien por las paredes; deja enfriar en la nevera 5 minutos hasta que solidifique.",
      "Rellena con la mezcla de pistacho y kataifi, dejando un margen en el borde.",
      "Cubre con el resto del chocolate fundido, sellando bien los bordes.",
      "Deja enfriar en la nevera al menos 30 minutos antes de desmoldar y cortar en 8 porciones."
    ],
    faqs: [
      { pregunta: "¿Es apta para veganos?", respuesta: "Sí, todos los ingredientes son de origen vegetal, siempre que uses un chocolate negro sin leche añadida (la mayoría de los ≥85% cacao ya lo son)." },
      { pregunta: "¿Se puede hacer sin gluten?", respuesta: "El kataifi está hecho de harina de trigo, así que contiene gluten. No hemos encontrado una alternativa sin gluten que reproduzca bien su textura; si lo necesitas, puedes probar con copos de maíz sin azúcar troceados, aunque el resultado cambiará." },
      { pregunta: "¿Cuánto tiempo se conserva?", respuesta: "Hasta 2 semanas en la nevera en un recipiente hermético; el chocolate puede blanquear un poco por el frío, pero sigue siendo seguro comerlo." }
    ]
  },
  {
    id: "brownie_saludable",
    nombre: "Brownie Saludable",
    imagen: "img/recetas/Brownie-Saludable.jpg",
    emojiPortada: "🍫🍠🌾",
    rating: "B",
    tiempo: "45 min",
    raciones: 9,
    mostrarPorRacion: true,
    etiquetas: ["vegetariano"],
    momento: [],
    descripcion: "El brownie de siempre, pero con boniato en vez de harina y mantequilla en cantidad, y dátiles como único endulzante. Jugoso por dentro, sin azúcar añadido.",
    motivo: "El boniato triturado sustituye a gran parte de la harina y la grasa de un brownie normal, aportando humedad, fibra y betacarotenos, sin apenas grasa saturada propia. El dulzor viene entero de los dátiles, que suman fibra junto a su azúcar natural en vez de azúcar libre sin más. El cacao puro y el chocolate negro ≥85% dan el sabor característico con mucha menos azúcar que un brownie con chocolate con leche. Sigue siendo un postre con bastante dátil y chocolate por porción —por eso lo calificamos con B, igual criterio que las Crumbl Cookies—, pero con un perfil muy superior al de un brownie normal.",
    ingredientes: [
      { foodId: "ia_boniato", cantidad: 200 },
      { foodId: "cacao_puro", cantidad: 40 },
      { foodId: "ia_datiles", cantidad: 100 },
      { foodId: "huevo", cantidad: 60 },
      { foodId: "ia_harina_de_avena_integral", cantidad: 60 },
      { foodId: "chocolate_negro", cantidad: 50 }
    ],
    pasos: [
      "Precalienta el horno a 180°C y forra un molde cuadrado con papel de horno.",
      "Cuece el boniato (con piel o pelado) hasta que esté muy tierno, unos 15-20 minutos al vapor o hervido; escúrrelo y hazlo puré.",
      "Deshuesa los dátiles y ponlos en remojo con agua caliente 10 minutos para ablandarlos; escúrrelos y tritúralos hasta conseguir una pasta.",
      "Mezcla el puré de boniato con la pasta de dátiles, el huevo y el cacao en polvo hasta conseguir una masa homogénea.",
      "Incorpora la harina de avena integral y una pizca de levadura química, y mezcla bien.",
      "Añade el chocolate negro troceado y repártelo por toda la masa.",
      "Vierte la masa en el molde y hornea 20-25 minutos, hasta que al pinchar con un palillo salga con algunas migas húmedas (para que quede jugoso, no seco).",
      "Deja enfriar por completo antes de cortar en 9 porciones."
    ],
    faqs: [
      { pregunta: "¿Es apta para vegetarianos?", respuesta: "Sí, lleva huevo pero ningún otro producto animal. No es apta para veganos por el huevo." },
      { pregunta: "¿Se puede hacer sin gluten?", respuesta: "La harina de avena no contiene gluten de forma natural, pero elige una certificada sin gluten si hay sensibilidad, por la posible contaminación cruzada en su procesado." },
      { pregunta: "¿Se puede congelar?", respuesta: "Sí, corta las porciones y congélalas por separado; se conservan hasta 2-3 meses. Descongela a temperatura ambiente o unos segundos en el microondas." }
    ]
  },
  {
    id: "wrap_tofu_saludable",
    nombre: "Wrap de Tofu Saludable",
    imagen: "img/recetas/Wrap-de-Tofu.jpg",
    emojiPortada: "🌾🫘🥑",
    rating: "A",
    tiempo: "15 min",
    raciones: 1,
    etiquetas: ["vegano", "proteico"],
    momento: ["comida", "cena"],
    descripcion: "La versión vegetal y sin gluten (opcional) del wrap de siempre: tofu dorado, alubias, aguacate y verduras frescas sobre tortitas de avena crujientes, en vez de una tortilla de trigo blanda.",
    motivo: "El tofu aporta proteína vegetal completa con muy poca grasa saturada, y las alubias suman todavía más proteína junto a una cantidad de fibra excepcional. El aguacate machacado hace de \"mayonesa saludable\", y el tomate, el pimiento y la cebolla aportan frescura y antioxidantes. Las tortitas de avena están calificadas B en tu guía por ser un producto horneado, pero el resto del plato compensa de sobra: el conjunto sale con más de 23 g de fibra y muy poca grasa saturada.",
    ingredientes: [
      { foodId: "ia_tortitas_de_avena", cantidad: 30 },
      { foodId: "ia_tofu", cantidad: 120 },
      { foodId: "aove", cantidad: 5 },
      { foodId: "ia_alubias", cantidad: 60 },
      { foodId: "aguacate", cantidad: 50 },
      { foodId: "ia_tomate", cantidad: 40 },
      { foodId: "lechuga", cantidad: 20 },
      { foodId: "ia_pimiento_rojo", cantidad: 30 },
      { foodId: "ia_cebolla", cantidad: 20 }
    ],
    pasos: [
      "Escurre el tofu y córtalo en dados; cocínalo en una sartén con el AOVE hasta que quede dorado por fuera (unos 5-6 minutos), sazonado con especias al gusto.",
      "Machaca el aguacate con un tenedor.",
      "Reparte el aguacate machacado sobre las tortitas de avena.",
      "Añade el tofu, las alubias, el tomate, el pimiento, la cebolla y la lechuga por encima de cada tortita.",
      "Sirve enseguida, para que las tortitas se mantengan crujientes."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "Las tortitas de avena están hechas de avena, que no contiene gluten de forma natural, pero conviene comprobar que estén certificadas sin gluten si hay sensibilidad, por la contaminación cruzada habitual en su procesado." },
      { pregunta: "¿Se puede preparar con antelación?", respuesta: "El tofu se puede cocinar con antelación, pero monta las tortitas justo antes de comer para que no pierdan el punto crujiente." }
    ]
  },
  {
    id: "tacos_saludables",
    nombre: "Tacos Saludables",
    imagen: "img/recetas/Tacos-Saludables.jpg",
    emojiPortada: "🌮🥑🌿",
    rating: "A",
    tiempo: "20 min",
    raciones: 1,
    etiquetas: ["vegano", "bajo-en-calorias"],
    momento: ["comida", "cena"],
    descripcion: "Tacos con tortilla de maíz (sin gluten de forma natural), tofu dorado, guacamole rápido y pico de gallo fresco. Sin salsas ultraprocesadas ni queso fundido en exceso.",
    motivo: "La tortilla de maíz aporta más fibra y menos sodio que una tortilla de trigo comercial, y no contiene gluten de forma natural. El tofu dorado con especias sustituye a la carne, y el pico de gallo (tomate, cebolla y cilantro frescos) y el aguacate machacado con lima aportan todo el sabor sin necesidad de salsas envasadas ni sal añadida.",
    ingredientes: [
      { foodId: "tortilla_maiz", cantidad: 60 },
      { foodId: "ia_tofu", cantidad: 120 },
      { foodId: "aove", cantidad: 5 },
      { foodId: "aguacate", cantidad: 50 },
      { foodId: "ia_tomate", cantidad: 50 },
      { foodId: "ia_cebolla", cantidad: 20 },
      { foodId: "lechuga", cantidad: 20 },
      { foodId: "lima", cantidad: 15 },
      { foodId: "cilantro", cantidad: 5 }
    ],
    pasos: [
      "Escurre el tofu y córtalo en dados; cocínalo en una sartén con el AOVE hasta que quede dorado por fuera (unos 5-6 minutos), sazonado con especias al gusto (comino, pimentón, sin sal añadida).",
      "Machaca el aguacate con un tenedor y mézclalo con un chorrito de zumo de lima.",
      "Trocea el tomate y la cebolla en dados pequeños para hacer un pico de gallo rápido; añade el cilantro picado.",
      "Calienta las tortillas de maíz ligeramente en una sartén seca o directamente sobre la llama, unos segundos por cada lado.",
      "Rellena cada tortilla con el tofu, el aguacate machacado, el pico de gallo y la lechuga.",
      "Termina con un chorrito extra de lima antes de servir."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "Sí, la tortilla de maíz no contiene gluten de forma natural, a diferencia de la de trigo; el resto de ingredientes tampoco llevan." },
      { pregunta: "¿Cuántos tacos salen con esta cantidad?", respuesta: "Con 60 g de tortilla de maíz salen unos 3 tacos pequeños; ajusta la cantidad según el tamaño de tortilla que uses." }
    ]
  },
  {
    id: "crema_de_verduras",
    nombre: "Crema de Verduras",
    imagen: "img/recetas/Crema-de-Verduras.jpg",
    emojiPortada: "🥣🥕🍠",
    rating: "A",
    tiempo: "40 min",
    raciones: 2,
    etiquetas: ["vegano", "bajo-en-calorias"],
    momento: ["comida", "cena"],
    descripcion: "Un plato de cuchara ligero y reconfortante: boniato, zanahoria, calabacín y puerro, con jengibre, cúrcuma y pimienta negra. Sin nata ni patata blanca, con toda la cremosidad de las propias verduras.",
    motivo: "El boniato aporta la cremosidad que en una crema de verduras normal suele venir de la nata o la patata blanca, con más fibra y un índice glucémico más bajo. El jengibre y la cúrcuma suman compuestos antiinflamatorios, y la pimienta negra no es un capricho: su piperina multiplica la absorción de la curcumina de la cúrcuma, así que juntas funcionan mucho mejor que por separado. Nada de sal añadida — el caldo de verduras, el puerro y las especias ya aportan todo el sabor que necesita.",
    ingredientes: [
      { foodId: "ia_boniato", cantidad: 200 },
      { foodId: "ia_zanahoria", cantidad: 100 },
      { foodId: "calabacin", cantidad: 150 },
      { foodId: "puerro", cantidad: 80 },
      { foodId: "ia_cebolla", cantidad: 50 },
      { foodId: "ia_jengibre", cantidad: 10 },
      { foodId: "curcuma", cantidad: 3 },
      { foodId: "pimienta_negra", cantidad: 1 },
      { foodId: "ia_caldo_de_verduras", cantidad: 500 },
      { foodId: "aove", cantidad: 15 }
    ],
    pasos: [
      "Pela y trocea el boniato, la zanahoria, el calabacín, el puerro y la cebolla.",
      "Sofríe la cebolla, el puerro, el jengibre rallado y la cúrcuma en una olla con el AOVE a fuego medio, hasta que la cebolla esté blanda (5 minutos).",
      "Añade el resto de las verduras y el caldo de verduras, y deja cocer a fuego medio 20-25 minutos, hasta que todas las verduras estén muy tiernas.",
      "Tritura todo con la batidora hasta conseguir una crema fina y homogénea.",
      "Ajusta el punto con más caldo si la quieres más ligera, añade la pimienta negra y sirve caliente."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "Sí, ningún ingrediente contiene gluten; solo comprueba que el caldo de verduras que uses no tenga trazas si tienes celiaquía." },
      { pregunta: "¿Por qué lleva pimienta negra junto con la cúrcuma?", respuesta: "Porque la piperina de la pimienta negra multiplica la absorción de la curcumina, el compuesto activo de la cúrcuma — juntas funcionan mucho mejor que por separado." }
    ]
  },
  {
    id: "hummus_casero",
    nombre: "Hummus Casero",
    imagen: "img/recetas/Hummus-Casero.jpg",
    emojiPortada: "🫘🍋🌰",
    rating: "A",
    tiempo: "10 min",
    raciones: 6,
    etiquetas: ["vegano", "bajo-en-calorias"],
    momento: [],
    descripcion: "El clásico dip de garbanzos hecho en casa: garbanzos, tahini, limón, ajo y comino, sin conservantes ni aceites de baja calidad. Perfecto para untar o acompañar verduras crudas.",
    motivo: "El tahini (sésamo molido) aporta grasas mayoritariamente insaturadas, calcio y proteína vegetal, y junto con los garbanzos suma una cantidad de fibra excepcional para un simple dip. El limón y el comino dan todo el sabor sin necesidad de sal añadida. Es mucho más denso en nutrientes que un hummus comercial, que suele llevar aceites de girasol refinados y conservantes.",
    ingredientes: [
      { foodId: "ia_garbanzos", cantidad: 300 },
      { foodId: "tahini", cantidad: 40 },
      { foodId: "aove", cantidad: 30 },
      { foodId: "limon", cantidad: 20 },
      { foodId: "ia_ajo", cantidad: 6 },
      { foodId: "comino", cantidad: 2 }
    ],
    pasos: [
      "Escurre los garbanzos, reservando un poco del líquido de cocción.",
      "Tritura los garbanzos junto con el tahini, el AOVE, el zumo de limón, el ajo y el comino en un robot de cocina o batidora potente.",
      "Añade un poco del líquido reservado de los garbanzos (o agua) poco a poco, hasta conseguir la textura cremosa deseada.",
      "Prueba y ajusta de limón o comino al gusto.",
      "Sirve con un chorrito de AOVE por encima."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "Sí, ningún ingrediente contiene gluten." },
      { pregunta: "¿Cuánto tiempo se conserva?", respuesta: "Hasta 4-5 días en la nevera en un recipiente hermético, con un chorrito de AOVE por encima para que no se seque la superficie." }
    ]
  },
  {
    id: "lentejas_estofadas",
    nombre: "Lentejas Estofadas",
    imagen: "img/recetas/Lentejas-Estofadas.jpg",
    emojiPortada: "🫘🥕🍅",
    rating: "A",
    tiempo: "1 h",
    raciones: 4,
    etiquetas: ["vegano", "bajo-en-calorias"],
    momento: ["comida", "cena"],
    descripcion: "El guiso de lentejas de toda la vida: sofrito de verduras, pimentón y laurel, cociendo despacio hasta que las lentejas quedan tiernas. Un plato de cuchara con más de 70 g de proteína vegetal en la olla completa.",
    motivo: "Las lentejas son de las legumbres con mejor perfil de proteína y fibra combinadas, y aquí se cuecen junto a un sofrito real de cebolla, ajo, pimiento y tomate, sin sobres de sopa ni caldos concentrados con exceso de sodio. El pimentón aporta sabor y carotenoides antioxidantes, y el laurel se retira antes de servir —su función es aromatizar durante la cocción, no nutrir—. Nada de sal añadida: el caldo de verduras y el sofrito ya dan todo el sabor que necesita.",
    ingredientes: [
      { foodId: "ia_lentejas", cantidad: 250 },
      { foodId: "ia_cebolla", cantidad: 100 },
      { foodId: "ia_zanahoria", cantidad: 100 },
      { foodId: "ia_pimiento_rojo", cantidad: 80 },
      { foodId: "ia_tomate", cantidad: 150 },
      { foodId: "ia_ajo", cantidad: 10 },
      { foodId: "laurel", cantidad: 1 },
      { foodId: "pimenton", cantidad: 5 },
      { foodId: "aove", cantidad: 20 },
      { foodId: "ia_caldo_de_verduras", cantidad: 800 }
    ],
    pasos: [
      "Pela y trocea la cebolla, la zanahoria, el pimiento y el ajo.",
      "Sofríe la cebolla, el ajo y el pimiento en una olla con el AOVE a fuego medio, hasta que estén blandos (8-10 minutos).",
      "Añade el tomate troceado y el pimentón, y remueve un par de minutos.",
      "Incorpora las lentejas, la zanahoria, el laurel y el caldo de verduras.",
      "Deja cocer a fuego medio-bajo, tapado, 35-40 minutos, removiendo de vez en cuando, hasta que las lentejas estén tiernas.",
      "Retira las hojas de laurel antes de servir."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "Sí, ningún ingrediente contiene gluten de forma natural; solo comprueba que el caldo de verduras que uses no tenga trazas si tienes celiaquía." },
      { pregunta: "¿Se puede congelar?", respuesta: "Sí, se congela muy bien hasta 3 meses en porciones individuales." }
    ]
  },
  {
    id: "dal_de_lentejas",
    nombre: "Dal de Lentejas",
    imagen: "img/recetas/Dal-de-Lentejas.jpg",
    emojiPortada: "🫘🌿🍅",
    rating: "A",
    tiempo: "50 min",
    raciones: 4,
    etiquetas: ["vegano", "bajo-en-calorias"],
    momento: ["comida", "cena"],
    descripcion: "El curry indio de lentejas de toda la vida: jengibre, cúrcuma, comino y curry en polvo, sin leche de coco para mantener la grasa saturada al mínimo. Más de 55 g de proteína vegetal en la olla completa.",
    motivo: "Las especias son las protagonistas: la cúrcuma y la pimienta que suele acompañarla en otros platos, el jengibre y el comino aportan compuestos antiinflamatorios además de todo el sabor característico del dal. Al prescindir de la leche de coco —habitual en esta receta pero muy rica en grasa saturada—, el plato queda con menos de 3 g de grasa saturada en toda la olla, sin perder cremosidad gracias a cómo las lentejas se deshacen ligeramente durante la cocción.",
    ingredientes: [
      { foodId: "ia_lentejas", cantidad: 200 },
      { foodId: "ia_cebolla", cantidad: 80 },
      { foodId: "ia_ajo", cantidad: 8 },
      { foodId: "ia_jengibre", cantidad: 10 },
      { foodId: "curcuma", cantidad: 3 },
      { foodId: "comino", cantidad: 2 },
      { foodId: "ia_curry_en_polvo", cantidad: 5 },
      { foodId: "ia_tomate", cantidad: 150 },
      { foodId: "aove", cantidad: 15 },
      { foodId: "ia_caldo_de_verduras", cantidad: 500 },
      { foodId: "cilantro", cantidad: 5 }
    ],
    pasos: [
      "Pica la cebolla, el ajo y el jengibre finamente.",
      "Sofríe la cebolla, el ajo, el jengibre, la cúrcuma, el comino y el curry en polvo en una olla con el AOVE a fuego medio, hasta que la cebolla esté blanda (5 minutos).",
      "Añade el tomate troceado y cocina 3-4 minutos más.",
      "Incorpora las lentejas y el caldo de verduras.",
      "Deja cocer a fuego medio-bajo, sin tapar, 30-35 minutos, removiendo de vez en cuando, hasta que las lentejas estén tiernas y la salsa haya espesado.",
      "Sirve caliente con cilantro fresco picado por encima."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "Sí, ningún ingrediente contiene gluten de forma natural." },
      { pregunta: "¿Se puede congelar?", respuesta: "Sí, se congela muy bien hasta 3 meses en porciones individuales." }
    ]
  },
  {
    id: "falafel_al_horno",
    nombre: "Falafel al Horno",
    imagen: "img/recetas/Falafel-al-Horno.jpg",
    emojiPortada: "🧆🌿🫘",
    rating: "A",
    tiempo: "45 min",
    raciones: 12,
    mostrarPorRacion: true,
    etiquetas: ["vegano", "bajo-en-calorias"],
    momento: ["comida", "cena"],
    descripcion: "El clásico de garbanzos, cilantro y comino, pero al horno en vez de frito. Exterior dorado y crujiente con muchísima menos grasa que la versión tradicional.",
    motivo: "Freír el falafel en abundante aceite prácticamente duplica su contenido en grasa; aquí se hornea con solo un pincelado de AOVE, así que se mantiene el exterior crujiente característico sin ese aporte extra. Los garbanzos y la harina de garbanzo aportan proteína vegetal y una cantidad de fibra excepcional para tratarse de un aperitivo, y el cilantro y el comino dan todo el sabor sin necesidad de sal añadida.",
    ingredientes: [
      { foodId: "ia_garbanzos", cantidad: 300 },
      { foodId: "ia_cebolla", cantidad: 60 },
      { foodId: "ia_ajo", cantidad: 8 },
      { foodId: "cilantro", cantidad: 15 },
      { foodId: "comino", cantidad: 3 },
      { foodId: "ia_harina_de_garbanzo", cantidad: 40 },
      { foodId: "aove", cantidad: 20 }
    ],
    pasos: [
      "Escurre bien los garbanzos y sécalos con papel de cocina.",
      "Tritura los garbanzos junto con la cebolla, el ajo, el cilantro y el comino en un robot de cocina, hasta conseguir una pasta con textura (no del todo lisa).",
      "Incorpora la harina de garbanzo poco a poco, mezclando bien, hasta que la masa se pueda moldear sin pegarse a las manos.",
      "Precalienta el horno a 200°C y forra una bandeja con papel de horno.",
      "Forma 12 bolitas con las manos, aplánalas ligeramente y colócalas en la bandeja.",
      "Pincélalas con el AOVE y hornea 25-30 minutos, dándoles la vuelta a mitad de cocción, hasta que estén doradas y crujientes por fuera."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Es apta sin gluten?", respuesta: "Sí, tanto los garbanzos como la harina de garbanzo no contienen gluten de forma natural." },
      { pregunta: "¿Por qué al horno y no fritos?", respuesta: "Freír el falafel en abundante aceite prácticamente duplica su contenido en grasa; horneándolo con solo un pincelado de AOVE se consigue un exterior crujiente sin ese aporte extra de grasa." }
    ]
  },
  {
    id: "pasta_integral_pesto",
    nombre: "Pasta Integral al Pesto Casero",
    imagen: "img/recetas/Pasta-Integral-Pesto.jpg",
    emojiPortada: "🍝🌿🌰",
    rating: "A",
    tiempo: "20 min",
    raciones: 2,
    etiquetas: ["vegano"],
    momento: ["comida", "cena"],
    descripcion: "Pasta integral con un pesto genuino de albahaca, almendras, ajo y AOVE, sin los aceites de girasol refinados ni conservantes del pesto envasado.",
    motivo: "El pesto casero se hace solo con albahaca fresca, un fruto seco (aquí almendras, en vez de los piñones tradicionales, más caros y con un perfil nutricional similar), ajo y AOVE, así que toda la grasa es mayoritariamente insaturada, muy distinta de los aceites refinados que suelen llevar los pestos comerciales. La pasta integral aporta mucha más fibra que la blanca. El queso curado queda como toque opcional, con moderación.",
    ingredientes: [
      { foodId: "pasta_integral", cantidad: 370 },
      { foodId: "ia_albahaca", cantidad: 40 },
      { foodId: "ia_almendras", cantidad: 30 },
      { foodId: "aove", cantidad: 40 },
      { foodId: "ia_ajo", cantidad: 6 },
      { foodId: "queso_curado", cantidad: 20, opcional: true }
    ],
    pasos: [
      "Cuece la pasta integral según las instrucciones del envase, hasta que esté al dente.",
      "Mientras tanto, tritura la albahaca, las almendras, el ajo y el AOVE en un robot de cocina o batidora, hasta conseguir una pasta homogénea (puedes dejar algo de textura).",
      "Añade el queso curado rallado al pesto si quieres, y mezcla bien.",
      "Escurre la pasta, reservando un poco del agua de cocción.",
      "Mezcla la pasta con el pesto, añadiendo un poco del agua reservada si queda muy espeso, hasta que quede bien integrado."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, si no añades el queso curado opcional. Sin él, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Se puede hacer sin gluten?", respuesta: "La pasta integral de trigo contiene gluten. Sustitúyela por pasta sin gluten (de arroz, maíz o legumbres); el resto de ingredientes no llevan gluten." },
      { pregunta: "¿Cuánto tiempo se conserva el pesto ya hecho?", respuesta: "Hasta 4-5 días en la nevera en un bote hermético, con un poco de AOVE por encima para que no se oxide; también se puede congelar en cubitos hasta 3 meses." }
    ]
  },
  {
    id: "pasta_integral_bolonesa",
    nombre: "Pasta Integral a la Boloñesa Saludable",
    imagen: "img/recetas/Pasta-Integral-Bolognesa-Saludable.jpg",
    emojiPortada: "🍝🫘🍅",
    rating: "A",
    tiempo: "45 min",
    raciones: 2,
    etiquetas: ["vegano", "proteico"],
    momento: ["comida", "cena"],
    descripcion: "La boloñesa de siempre, pero 100% vegetal: soja texturizada en vez de carne picada, con el sofrito clásico de cebolla, zanahoria y apio. Más de 87 g de proteína y 45 g de fibra en el plato completo.",
    motivo: "La soja texturizada se obtiene de harina de soja desgrasada, así que aporta muchísima proteína vegetal completa y fibra con muy poca grasa, muy por encima de lo que aportaría la carne picada que sustituye. El sofrito de cebolla, zanahoria y apio es la base clásica de cualquier boloñesa, y el orégano y el ajo dan todo el sabor sin necesidad de sal añadida.",
    ingredientes: [
      { foodId: "pasta_integral", cantidad: 370 },
      { foodId: "soja_texturizada", cantidad: 120 },
      { foodId: "ia_cebolla", cantidad: 80 },
      { foodId: "ia_zanahoria", cantidad: 60 },
      { foodId: "apio", cantidad: 60 },
      { foodId: "ia_tomate", cantidad: 300 },
      { foodId: "ia_ajo", cantidad: 8 },
      { foodId: "oregano", cantidad: 3 },
      { foodId: "aove", cantidad: 15 }
    ],
    pasos: [
      "Pica finamente la cebolla, la zanahoria, el apio y el ajo.",
      "Rehidrata la soja texturizada en agua caliente o caldo durante 10 minutos; escúrrela bien apretando con las manos para quitar el exceso de líquido.",
      "Sofríe la cebolla, la zanahoria, el apio y el ajo en una sartén grande con el AOVE a fuego medio, hasta que estén blandos (8-10 minutos).",
      "Añade la soja texturizada escurrida y cocina unos minutos, removiendo.",
      "Incorpora el tomate troceado y el orégano, y deja cocer a fuego medio-bajo 20-25 minutos, removiendo de vez en cuando, hasta que la salsa espese.",
      "Mientras tanto, cuece la pasta integral según las instrucciones del envase.",
      "Escurre la pasta y mézclala con la salsa boloñesa, o sírvela con la salsa por encima."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Se puede hacer sin gluten?", respuesta: "La pasta integral de trigo contiene gluten, y algunas marcas de soja texturizada también pueden llevarlo. Comprueba la etiqueta de la soja texturizada y sustituye la pasta por una versión sin gluten si lo necesitas." },
      { pregunta: "¿Se puede congelar la salsa?", respuesta: "Sí, se congela muy bien hasta 3 meses en porciones individuales, separada de la pasta (que es mejor cocer fresca cada vez)." }
    ]
  },
  {
    id: "pasta_integral_carbonara",
    nombre: "Pasta Integral Carbonara Saludable",
    imagen: "img/recetas/Pasta-Integral-Carbonara.jpg",
    emojiPortada: "🍝🥚🧀",
    rating: "C",
    tiempo: "25 min",
    raciones: 2,
    etiquetas: ["proteico"],
    momento: ["comida", "cena"],
    descripcion: "La carbonara italiana real, sin nata (nunca la lleva), con pechuga de pollo en vez de panceta o guanciale para bajar la grasa saturada.",
    motivo: "Esta carbonara sustituye la panceta o el guanciale tradicionales por pechuga de pollo, mucho más magra, y prescinde de la nata que muchas versiones caseras añaden por error —la carbonara italiana real nunca lleva nata—. Aun así, la calificamos con C: entre el huevo, el queso curado y el propio pollo, el plato concentra bastante colesterol y grasa saturada, y no lleva ninguna verdura que equilibre el conjunto. Es una opción razonable de vez en cuando, pero no de las recetas más ligeras de la guía.",
    ingredientes: [
      { foodId: "pasta_integral", cantidad: 370 },
      { foodId: "huevo", cantidad: 150 },
      { foodId: "queso_curado", cantidad: 40 },
      { foodId: "ia_pechuga_de_pollo", cantidad: 150 },
      { foodId: "pimienta_negra", cantidad: 2 },
      { foodId: "aove", cantidad: 10 }
    ],
    pasos: [
      "Cuece la pasta integral según las instrucciones del envase, hasta que esté al dente.",
      "Mientras tanto, corta la pechuga de pollo en tiras finas y cocínala en una sartén con el AOVE a fuego medio-alto, hasta que quede dorada y crujiente por fuera.",
      "Bate los huevos en un bol junto con el queso curado rallado y la pimienta negra.",
      "Escurre la pasta, reservando un poco del agua de cocción, y añádela a la sartén con el pollo, fuera del fuego.",
      "Vierte la mezcla de huevo y queso sobre la pasta caliente, removiendo rápido y sin volver a poner al fuego directo, para que el huevo cuaje suave y cremoso sin hacerse en trozos (usa un poco del agua reservada si hace falta para aligerar la salsa).",
      "Sirve enseguida con más pimienta negra al gusto."
    ],
    faqs: [
      { pregunta: "¿Por qué lleva pollo en vez de panceta o beicon?", respuesta: "Para mantener la grasa saturada bajo control: el pollo aporta la misma sensación crujiente con muchísima menos grasa que el guanciale o el beicon tradicionales." },
      { pregunta: "¿Es una receta con nata?", respuesta: "No, y no debería llevarla nunca: la carbonara tradicional italiana nunca lleva nata, la cremosidad viene solo del huevo y el queso." },
      { pregunta: "¿Se puede hacer sin gluten?", respuesta: "La pasta integral de trigo contiene gluten. Sustitúyela por pasta sin gluten (de arroz, maíz o legumbres); el resto de ingredientes no llevan gluten." }
    ]
  },
  {
    id: "pasta_integral_setas_espinacas",
    nombre: "Pasta Integral con Setas y Espinacas",
    imagen: "img/recetas/Pasta-Integral-Setas-y-Espinacas.jpg",
    emojiPortada: "🍝🍄🥬",
    rating: "A",
    tiempo: "30 min",
    raciones: 2,
    etiquetas: ["vegetariano", "proteico"],
    momento: ["comida", "cena"],
    descripcion: "Pasta integral con una salsa cremosa de setas y espinacas, con yogur natural en vez de nata y un toque de nuez moscada. Cremosidad real sin la grasa saturada de una salsa de nata.",
    motivo: "El yogur natural aporta la misma cremosidad que la nata en una salsa clásica de setas y espinacas, con muchísima menos grasa saturada y sin el aporte calórico extra. Las setas suman betaglucanos y las espinacas hierro, folato y luteína, dos verduras de hoja que rara vez protagonizan un plato de pasta. La nuez moscada es el maridaje clásico de las salsas cremosas con verdura de hoja verde, y se usa en una pizca tan pequeña que su aporte nutricional real es insignificante.",
    ingredientes: [
      { foodId: "pasta_integral", cantidad: 370 },
      { foodId: "setas", cantidad: 200 },
      { foodId: "espinacas", cantidad: 150 },
      { foodId: "yogur_natural", cantidad: 150 },
      { foodId: "ia_cebolla", cantidad: 60 },
      { foodId: "ia_ajo", cantidad: 8 },
      { foodId: "aove", cantidad: 15 },
      { foodId: "nuez_moscada", cantidad: 1 },
      { foodId: "queso_curado", cantidad: 20, opcional: true }
    ],
    pasos: [
      "Limpia y lamina las setas. Trocea la cebolla y pica el ajo.",
      "Sofríe la cebolla y el ajo en una sartén grande con el AOVE a fuego medio, hasta que estén blandos.",
      "Añade las setas y cocina a fuego medio-alto hasta que suelten su agua y se doren (8-10 minutos).",
      "Incorpora las espinacas y cocina 2-3 minutos más, hasta que se reduzcan.",
      "Baja el fuego, añade el yogur natural y la nuez moscada, y remueve hasta conseguir una salsa cremosa. No dejes que hierva fuerte, para que el yogur no se corte.",
      "Mientras tanto, cuece la pasta integral según las instrucciones del envase.",
      "Escurre la pasta y mézclala con la salsa. Sirve con el queso curado rallado por encima, si quieres."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, si sustituyes el yogur natural por uno de soja o coco sin azúcares añadidos y no añades el queso curado opcional." },
      { pregunta: "¿Se puede hacer sin gluten?", respuesta: "La pasta integral de trigo contiene gluten. Sustitúyela por pasta sin gluten (de arroz, maíz o legumbres); el resto de ingredientes no llevan gluten." },
      { pregunta: "¿Por qué se usa yogur natural en vez de nata?", respuesta: "Aporta la misma cremosidad con muchísima menos grasa saturada y sin el aporte calórico extra de la nata; solo hay que evitar que hierva fuerte para que no se corte." }
    ]
  },
  {
    id: "bowl_frutos_rojos",
    nombre: "Bowl de Frutos Rojos",
    imagen: "img/recetas/Bowl-Fruta-Frutos-Rojos.jpg",
    emojiPortada: "🫐🍓🍇",
    rating: "A",
    tiempo: "10 min",
    raciones: 1,
    etiquetas: ["vegano", "bajo-en-calorias"],
    momento: ["desayuno"],
    descripcion: "Un bowl de fruta sobre una base de yogur de soja: arándanos, fresas, frambuesas y granada, todo antioxidantes. Sin azúcar añadido.",
    motivo: "Los arándanos, las fresas, las frambuesas y la granada comparten un perfil rico en polifenoles y antioxidantes, cada una con su propio matiz (antocianinas, vitamina C, elagitaninos...). El yogur de soja da consistencia y cuerpo al bowl, aportando proteína vegetal y probióticos, y las semillas de chía suman omega-3 y el crujiente característico de estos bowls.",
    ingredientes: [
      { foodId: "yogur_soja", cantidad: 150 },
      { foodId: "arandanos", cantidad: 80 },
      { foodId: "fresas", cantidad: 80 },
      { foodId: "frambuesas", cantidad: 80 },
      { foodId: "ia_granada", cantidad: 60 },
      { foodId: "ia_semillas_de_chia", cantidad: 10 }
    ],
    pasos: [
      "Vierte el yogur de soja en la base de un bowl.",
      "Lava bien los arándanos, las fresas y las frambuesas. Corta las fresas por la mitad.",
      "Desgrana la granada para sacar los arilos.",
      "Reparte toda la fruta sobre el yogur de soja.",
      "Espolvorea las semillas de chía por encima antes de servir."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Se puede preparar con antelación?", respuesta: "La granada y las semillas de chía se pueden preparar con antelación, pero es mejor cortar las fresas y montar el bowl justo antes de comer para que la fruta no se oxide." },
      { pregunta: "¿Puedo usar fruta congelada?", respuesta: "Los arándanos y las frambuesas funcionan bien congelados y descongelados, pero la fresa y la granada es mejor tomarlas frescas para que no pierdan textura." }
    ]
  },
  {
    id: "bowl_manzana_pera_granada",
    nombre: "Bowl Otoñal de Manzana, Pera y Granada",
    imagen: "img/recetas/Bowl-Frutas-Otoñal.jpg",
    emojiPortada: "🍎🍐🍇",
    rating: "A",
    tiempo: "10 min",
    raciones: 1,
    etiquetas: ["vegano", "bajo-en-calorias"],
    momento: ["desayuno"],
    descripcion: "Un bowl de fruta de temporada fría sobre una base de yogur de soja: manzana, pera y granada, con un toque de canela. Sin azúcar añadido.",
    motivo: "La manzana y la pera aportan fibra soluble (pectina) que modera la absorción de su propio azúcar, y la granada suma polifenoles antioxidantes con un matiz distinto al resto de la fruta. La canela es el maridaje clásico con manzana y pera, y se ha asociado además con una mejora en la regulación de la glucemia. El yogur de soja da consistencia al bowl con proteína vegetal y probióticos.",
    ingredientes: [
      { foodId: "yogur_soja", cantidad: 150 },
      { foodId: "manzana", cantidad: 100 },
      { foodId: "ia_pera", cantidad: 100 },
      { foodId: "ia_granada", cantidad: 60 },
      { foodId: "ia_canela", cantidad: 1 }
    ],
    pasos: [
      "Vierte el yogur de soja en la base de un bowl.",
      "Lava la manzana y la pera, y córtalas en dados, dejando la piel si quieres más fibra.",
      "Desgrana la granada para sacar los arilos.",
      "Reparte la manzana, la pera y los arilos de granada sobre el yogur de soja.",
      "Espolvorea la canela por encima antes de servir."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Se puede preparar con antelación?", respuesta: "Es mejor cortar la manzana y la pera justo antes de comer, ya que se oxidan y oscurecen rápido; puedes rociarlas con un poco de zumo de limón si necesitas adelantar el trabajo." },
      { pregunta: "¿Por qué lleva canela?", respuesta: "Es el maridaje clásico con manzana y pera, y se ha asociado además con una mejora en la regulación de la glucemia." }
    ]
  },
  {
    id: "bowl_energetico_platano_datiles",
    nombre: "Bowl Energético de Plátano, Dátiles y Frutos Secos",
    imagen: "img/recetas/Bowl-Frutas-Energético.jpg",
    emojiPortada: "🍌🌴🥜",
    rating: "B",
    tiempo: "10 min",
    raciones: 1,
    etiquetas: ["vegano"],
    momento: ["desayuno"],
    descripcion: "Un bowl pensado para antes o después de entrenar: plátano, dátiles, crema de cacahuete, almendras y pipas de calabaza sobre una base de yogur de soja. Energía concentrada, sin azúcar añadido.",
    motivo: "El plátano y los dátiles aportan carbohidratos de rápida disponibilidad junto con fibra, ideales para reponer energía. Las almendras y las pipas de calabaza suman grasas saludables, proteína vegetal y minerales como magnesio y zinc, y la crema de cacahuete completa el perfil de grasas insaturadas. Al llevar bastante dátil y plátano, concentra un azúcar natural notable —por eso lo calificamos con B, igual criterio que con las Gachas Dulces—, así que es mejor reservarlo para momentos de mayor gasto energético.",
    ingredientes: [
      { foodId: "yogur_soja", cantidad: 150 },
      { foodId: "ia_platano", cantidad: 100 },
      { foodId: "ia_datiles", cantidad: 40 },
      { foodId: "ia_crema_de_cacahuete", cantidad: 20 },
      { foodId: "ia_almendras", cantidad: 15 },
      { foodId: "ia_pipas_de_calabaza", cantidad: 10 }
    ],
    pasos: [
      "Vierte el yogur de soja en la base de un bowl.",
      "Corta el plátano en rodajas.",
      "Deshuesa los dátiles y trocéalos.",
      "Reparte el plátano, los dátiles, las almendras y las pipas de calabaza sobre el yogur de soja.",
      "Termina con un chorrito de crema de cacahuete por encima."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Cuándo es mejor tomarlo?", respuesta: "Por su aporte calórico y de carbohidratos, es ideal antes o después de entrenar, cuando el cuerpo aprovecha mejor esa energía." },
      { pregunta: "¿Se puede preparar con antelación?", respuesta: "El plátano se oxida rápido una vez cortado, así que es mejor montarlo justo antes de comer." }
    ]
  },
  {
    id: "bowl_tropical_mango_pina_papaya",
    nombre: "Bowl Tropical de Mango, Piña y Papaya",
    imagen: "img/recetas/Bowl-Frutas-Tropical-Mango.jpg",
    emojiPortada: "🥭🍍🍈",
    rating: "A",
    tiempo: "10 min",
    raciones: 1,
    etiquetas: ["vegano", "bajo-en-calorias"],
    momento: ["desayuno"],
    descripcion: "Un bowl de fruta tropical sobre base de yogur de soja: mango, piña y papaya, con un chorrito de lima. Sin azúcar añadido y con muy poca grasa saturada.",
    motivo: "El mango, la piña y la papaya comparten un perfil rico en vitamina C y antioxidantes, cada una aportando además algo propio: betacarotenos el mango, bromelina la piña, y papaína la papaya, dos enzimas con propiedades digestivas. La lima realza el dulzor de la fruta sin necesidad de azúcar añadido, y el yogur de soja da consistencia al bowl con proteína vegetal.",
    ingredientes: [
      { foodId: "yogur_soja", cantidad: 150 },
      { foodId: "mango", cantidad: 100 },
      { foodId: "pina", cantidad: 100 },
      { foodId: "papaya", cantidad: 100 },
      { foodId: "lima", cantidad: 10 }
    ],
    pasos: [
      "Vierte el yogur de soja en la base de un bowl.",
      "Pela y corta el mango, la piña y la papaya en dados.",
      "Reparte toda la fruta sobre el yogur de soja.",
      "Termina con un chorrito de zumo de lima."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, todos los ingredientes son de origen vegetal." },
      { pregunta: "¿Se puede preparar con antelación?", respuesta: "El mango y la piña aguantan bien un par de días en la nevera ya cortados; la papaya y la lima es mejor añadirlas justo antes de servir." },
      { pregunta: "¿Por qué lleva lima?", respuesta: "Su acidez realza el dulzor de la fruta tropical sin necesidad de añadir azúcar." }
    ]
  },
  {
    id: "tiramisu_yogur_saludable",
    nombre: "Tiramisú de Yogur Saludable",
    imagen: "img/recetas/Tiramisu-de-Yogur-Saludable.jpg",
    emojiPortada: "☕🍰🥄",
    rating: "A",
    tiempo: "20 min + reposo",
    raciones: 4,
    mostrarPorRacion: true,
    etiquetas: ["vegetariano"],
    momento: [],
    descripcion: "La versión viral del tiramisú sin mascarpone ni nata: yogur de soja en vez de la crema clásica, y las Tortitas de Avena de la guía en vez de bizcochos o galletas Biscoff empapados en café. Mucha menos grasa saturada y azúcar que el original.",
    motivo: "El mascarpone, la nata y las yemas de huevo del tiramisú clásico se sustituyen aquí por yogur de soja, que aporta cremosidad con muchísima menos grasa saturada. Las Tortitas de Avena hacen de base crujiente-esponjosa en vez de bizcochos o galletas industriales, con mucho menos azúcar añadido. El cacao puro suma fibra y antioxidantes, y la miel se usa en una cantidad moderada solo como toque de dulzor — se puede omitir sin problema.",
    ingredientes: [
      { foodId: "yogur_soja", cantidad: 500 },
      { foodId: "ia_tortitas_de_avena", cantidad: 80 },
      { foodId: "cafe", cantidad: 150 },
      { foodId: "cacao_puro", cantidad: 10 },
      { foodId: "miel", cantidad: 20, opcional: true }
    ],
    pasos: [
      "Prepara un café solo y déjalo enfriar por completo.",
      "Trocea las Tortitas de Avena en trozos irregulares y reparte la mitad en la base de un molde o de vasos individuales.",
      "Moja los trozos con parte del café frío, sin empaparlos en exceso.",
      "Mezcla el yogur de soja con la miel hasta que quede homogéneo, y vierte la mitad sobre la primera capa.",
      "Repite una segunda capa de tortitas mojadas en café y yogur con miel.",
      "Espolvorea el cacao puro por encima justo antes de servir.",
      "Deja reposar en la nevera al menos 2 horas —mejor de un día para otro— para que las tortitas se ablanden."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Con miel no, solo vegetariana. Para hacerla vegana, sustituye la miel por sirope de agave o simplemente omítela." },
      { pregunta: "¿Se puede hacer sin gluten?", respuesta: "Depende de las Tortitas de Avena: la avena en sí no tiene gluten, pero puede llevar trazas por contaminación cruzada salvo que compres una marca certificada sin gluten." },
      { pregunta: "¿Cuánto tiempo se conserva en la nevera?", respuesta: "2-3 días en un recipiente hermético; el sabor mejora si lo dejas reposar de un día para otro." }
    ]
  },
  {
    id: "crema_calabaza_jengibre",
    nombre: "Crema de Calabaza y Jengibre",
    imagen: "img/recetas/Crema-de-Calabaza-y-Jengibre.jpg",
    emojiPortada: "🎃🥣🫚",
    rating: "A",
    tiempo: "40 min",
    raciones: 4,
    mostrarPorRacion: true,
    etiquetas: ["vegano", "bajo-en-calorias"],
    momento: ["comida", "cena"],
    descripcion: "Una crema de otoño sedosa y reconfortante: calabaza, zanahoria y jengibre, sin nata ni patata. La cremosidad viene de las propias verduras, y las pipas de calabaza tostadas por encima aportan el toque crujiente.",
    motivo: "La cremosidad viene de la propia calabaza y la zanahoria, sin nata, mantequilla ni patata, así que la grasa saturada es mínima (1,3 g por ración) y las calorías, muy contenidas. El jengibre y el ajo aportan sabor sin necesidad de sal añadida, y la calabaza y la zanahoria son ricas en betacarotenos, precursores de la vitamina A. Las pipas de calabaza del final suman zinc, magnesio y grasas insaturadas.",
    ingredientes: [
      { foodId: "calabaza", cantidad: 800 },
      { foodId: "ia_cebolla", cantidad: 150 },
      { foodId: "ia_zanahoria", cantidad: 100 },
      { foodId: "ia_jengibre", cantidad: 15 },
      { foodId: "aove", cantidad: 20 },
      { foodId: "ia_caldo_de_verduras", cantidad: 500 },
      { foodId: "ia_ajo", cantidad: 6 },
      { foodId: "pimienta_negra", cantidad: 1 },
      { foodId: "ia_pipas_de_calabaza", cantidad: 20 }
    ],
    pasos: [
      "Pela y trocea la calabaza y la zanahoria; pica la cebolla y el ajo, y ralla el jengibre.",
      "Sofríe la cebolla y el ajo en el AOVE 5 minutos a fuego medio, sin que se doren.",
      "Añade la calabaza, la zanahoria y el jengibre, y rehoga 3 minutos.",
      "Vierte el caldo de verduras caliente, tapa y cuece a fuego suave unos 25 minutos, hasta que la calabaza esté tierna.",
      "Tritura hasta obtener una crema fina; si la prefieres más ligera, añade un poco de agua o de caldo.",
      "Sirve con pimienta negra y las pipas de calabaza por encima, tostadas 2 minutos en una sartén seca."
    ],
    faqs: [
      { pregunta: "¿Es una receta vegana?", respuesta: "Sí, es 100 % vegetal: solo lleva verduras, caldo de verduras, AOVE y pipas." },
      { pregunta: "¿Se puede congelar?", respuesta: "Sí, hasta 3 meses en recipientes herméticos. Descongélala en la nevera y recaliéntala removiendo." },
      { pregunta: "¿Qué tipo de calabaza es mejor?", respuesta: "Cualquiera de pulpa naranja; la calabaza de cacahuete (butternut) es dulce y sin hilos, y queda especialmente cremosa." }
    ]
  },
  {
    id: "salmon_horno_brocoli_quinoa",
    nombre: "Salmón al Horno con Brócoli y Quinoa",
    imagen: "img/recetas/Salmon-al-Horno-con-Brocoli-y-Quinoa.jpg",
    emojiPortada: "🐟🥦🌾",
    rating: "B",
    tiempo: "30 min",
    raciones: 2,
    mostrarPorRacion: true,
    etiquetas: ["proteico"],
    momento: ["comida", "cena"],
    descripcion: "Un plato completo en una sola bandeja: salmón jugoso al horno con limón, brócoli asado y quinoa. Proteína, omega-3 y fibra en una cena de 30 minutos y sin apenas fregar.",
    motivo: "El salmón aporta proteína completa y grasas omega-3 (EPA y DHA), y el brócoli y la quinoa suman fibra, vitamina C y proteína vegetal: 40 g de proteína y más de 8 g de fibra por ración. La calificamos B y no A porque es un plato calórico (unas 590 kcal por ración) y el salmón junto al aceite eleva la grasa hasta los 30 g, con 6 g de saturada. Es muy nutritivo, pero encaja mejor como plato principal ocasional que como comida diaria en raciones grandes.",
    ingredientes: [
      { foodId: "salmon", cantidad: 300 },
      { foodId: "brocoli", cantidad: 300 },
      { foodId: "quinoa", cantidad: 240 },
      { foodId: "aove", cantidad: 15 },
      { foodId: "limon", cantidad: 60 },
      { foodId: "ia_ajo", cantidad: 5 },
      { foodId: "pimienta_negra", cantidad: 1 }
    ],
    pasos: [
      "Precalienta el horno a 200 °C. Si no tienes quinoa cocida, cuece unos 80 g en seco (bien aclarada) con el doble de agua durante 15 minutos y resérvala.",
      "Mezcla en una bandeja el brócoli en ramilletes con la mitad del AOVE, el ajo laminado y la pimienta; hornea 10 minutos.",
      "Haz hueco en la bandeja, coloca los lomos de salmón con rodajas de limón encima y el resto del AOVE, y hornea 12-15 minutos según el grosor.",
      "Sirve el salmón y el brócoli sobre la quinoa, con un chorrito del jugo de la bandeja y un poco de zumo de limón."
    ],
    faqs: [
      { pregunta: "¿Puedo usar salmón congelado?", respuesta: "Sí. Descongélalo en la nevera y sécalo bien con papel de cocina antes de hornearlo, para que no suelte agua." },
      { pregunta: "¿Cómo sé que el salmón está en su punto?", respuesta: "Cuando la parte más gruesa se separa en lascas al presionar con un tenedor, pero sigue jugosa por dentro. Suele ser entre 12 y 15 minutos." },
      { pregunta: "¿Y si no tengo quinoa?", respuesta: "Sirve igual de bien con arroz integral o con cuscús integral, aunque cambiarán algo los valores nutricionales." }
    ]
  },
  {
    id: "ensalada_quinoa_garbanzos_aguacate",
    nombre: "Ensalada de Quinoa, Garbanzos y Aguacate",
    imagen: "img/recetas/Ensalada-de-Quinoa-Garbanzos-y-Aguacate.jpg",
    emojiPortada: "🥗🌾🥑",
    rating: "A",
    tiempo: "20 min",
    raciones: 2,
    mostrarPorRacion: true,
    etiquetas: ["vegano"],
    momento: ["comida", "cena"],
    descripcion: "Una ensalada saciante y 100 % vegetal: quinoa, garbanzos, aguacate y verduras frescas con aliño de limón. Casi 17 g de fibra por ración y lista en 20 minutos; aguanta bien en la nevera para llevártela al trabajo.",
    motivo: "Combina proteína vegetal completa (quinoa y garbanzos), casi 17 g de fibra por ración y grasas insaturadas del aguacate y del AOVE, con solo 2,7 g de grasa saturada y prácticamente nada de sodio, porque el sabor viene del limón, el cilantro y la cebolla y no de la sal. Las legumbres y los cereales integrales son la base de los patrones de alimentación más saludables, y esta ensalada los reúne en un solo plato.",
    ingredientes: [
      { foodId: "quinoa", cantidad: 240 },
      { foodId: "ia_garbanzos", cantidad: 200 },
      { foodId: "aguacate", cantidad: 100 },
      { foodId: "ia_tomate", cantidad: 200 },
      { foodId: "pepino", cantidad: 150 },
      { foodId: "ia_cebolla", cantidad: 40 },
      { foodId: "cilantro", cantidad: 10 },
      { foodId: "limon", cantidad: 40 },
      { foodId: "aove", cantidad: 15 }
    ],
    pasos: [
      "Escurre y enjuaga los garbanzos si son de bote.",
      "Corta el tomate y el pepino en dados, la cebolla en juliana fina y pica el cilantro.",
      "Mezcla en un bol la quinoa, los garbanzos, el tomate, el pepino, la cebolla y el cilantro.",
      "Aliña con el zumo de limón y el AOVE, y remueve bien.",
      "Añade el aguacate en dados justo antes de servir para que no se oxide."
    ],
    faqs: [
      { pregunta: "¿Se puede preparar con antelación?", respuesta: "Sí, hasta 2 días en la nevera. Guarda aparte el aguacate y el aliño, y añádelos justo antes de comer." },
      { pregunta: "¿Es apta para celíacos?", respuesta: "La quinoa, los garbanzos y las verduras no llevan gluten; comprueba la etiqueta si compras la quinoa o los garbanzos ya envasados." },
      { pregunta: "¿Puedo usar garbanzos de bote?", respuesta: "Sí, pero escúrrelos y enjuágalos bien: así se elimina buena parte del sodio del líquido de la conserva." }
    ]
  },
  {
    id: "berenjenas_rellenas_lentejas",
    nombre: "Berenjenas Rellenas de Lentejas",
    imagen: "img/recetas/Berenjenas-Rellenas-de-Lentejas.jpg",
    emojiPortada: "🍆🫘🍅",
    rating: "A",
    tiempo: "1 h",
    raciones: 2,
    mostrarPorRacion: true,
    etiquetas: ["vegano"],
    momento: ["comida", "cena"],
    descripcion: "Berenjenas asadas rellenas de un guiso de lentejas con tomate, comino y pimentón: un plato de cuchara servido al horno. Vegano, con casi 20 g de proteína y 18 g de fibra por ración.",
    motivo: "Une una verdura muy ligera con una legumbre: casi 20 g de proteína vegetal y 18 g de fibra por ración, con solo 12 g de grasa (1,8 g saturada) y prácticamente nada de sodio. Las berenjenas se hornean en lugar de freírse, porque al freír absorben mucho aceite y multiplican sus calorías; el comino, el pimentón y el ajo dan el sabor sin necesidad de sal. Las lentejas aportan además hierro y folato.",
    ingredientes: [
      { foodId: "berenjena", cantidad: 600 },
      { foodId: "ia_lentejas", cantidad: 120 },
      { foodId: "ia_tomate", cantidad: 200 },
      { foodId: "ia_cebolla", cantidad: 120 },
      { foodId: "ia_ajo", cantidad: 6 },
      { foodId: "aove", cantidad: 20 },
      { foodId: "pimenton", cantidad: 3 },
      { foodId: "comino", cantidad: 2 }
    ],
    pasos: [
      "Cuece las lentejas (unos 120 g en seco) en agua sin sal durante 20-25 minutos, hasta que estén tiernas, y escúrrelas.",
      "Precalienta el horno a 200 °C. Abre las berenjenas por la mitad a lo largo, marca la pulpa con cortes en rombo, píntalas con la mitad del AOVE y hornéalas 25-30 minutos con la pulpa hacia arriba.",
      "Mientras tanto, sofríe la cebolla y el ajo picados en el resto del AOVE durante 5 minutos; añade el tomate rallado, el pimentón y el comino, y cocina 8 minutos más.",
      "Incorpora las lentejas al sofrito y mezcla.",
      "Vacía con una cuchara parte de la pulpa de las berenjenas (deja un borde de 1 cm), pícala y mézclala con el relleno.",
      "Rellena las mitades, gratina 8-10 minutos y sirve."
    ],
    faqs: [
      { pregunta: "¿Puedo usar lentejas de bote?", respuesta: "Sí: unos 300 g de lentejas ya cocidas, escurridas y enjuagadas, y te ahorras el primer paso." },
      { pregunta: "¿Se pueden congelar?", respuesta: "Sí, ya rellenas y antes de gratinar, hasta 2 meses. Descongélalas en la nevera y gratínalas directamente." },
      { pregunta: "¿Es necesario freír la berenjena?", respuesta: "No, y es mejor no hacerlo: al horno queda tierna y jugosa sin absorber el aceite que se llevaría al freírla." }
    ]
  },
  {
    id: "tacos_cottage_huevo_aguacate",
    nombre: "Tacos de Queso Cottage con Huevo y Aguacate",
    imagen: "img/recetas/Tacos-de-Queso-Cottage-con-Huevo-y-Aguacate.jpg",
    emojiPortada: "🌮🥑🥚",
    rating: "C",
    tiempo: "15 min",
    raciones: 2,
    mostrarPorRacion: true,
    etiquetas: ["proteico", "vegetariano"],
    momento: ["desayuno", "comida"],
    descripcion: "La tendencia del queso cottage, en versión taco: huevo revuelto cremoso con cottage, aguacate y pico de gallo sobre tortillas de maíz. Cerca de 30 g de proteína por ración y sin gluten de forma natural.",
    motivo: "Tiene una proteína excelente (unos 30 g por ración) y casi 10 g de fibra, pero la calificamos C por dos motivos: el sodio (unos 500 mg por ración, sobre todo del queso cottage) y una grasa saturada algo alta (6,8 g) al sumar huevo, cottage y aguacate. Es un desayuno o cena rápido y saciante, no un plato para todos los días. Elegir un cottage bajo en sal y usar solo la mitad del queso baja bastante el sodio.",
    ingredientes: [
      { foodId: "tortilla_maiz", cantidad: 120 },
      { foodId: "queso_cottage", cantidad: 200 },
      { foodId: "huevo", cantidad: 200 },
      { foodId: "aguacate", cantidad: 150 },
      { foodId: "ia_tomate", cantidad: 100 },
      { foodId: "cilantro", cantidad: 10 },
      { foodId: "limon", cantidad: 20 }
    ],
    pasos: [
      "Bate los huevos con la mitad del queso cottage.",
      "Cuájalos a fuego bajo en una sartén antiadherente, removiendo suavemente 3-4 minutos, para que queden cremosos.",
      "Calienta las tortillas de maíz unos 30 segundos por cada lado.",
      "Pica el tomate y el cilantro, y aplasta el aguacate con el zumo de limón.",
      "Monta cada taco con el aguacate, el huevo, el queso cottage restante y el pico de gallo."
    ],
    faqs: [
      { pregunta: "¿Cómo puedo reducir el sodio?", respuesta: "Elige un queso cottage bajo en sal o sustituye la mitad por yogur natural sin azúcar; el resto de ingredientes apenas aportan sodio." },
      { pregunta: "¿Es apta para celíacos?", respuesta: "Sí, siempre que las tortillas sean 100 % de maíz: revisa la etiqueta, porque algunas llevan harina de trigo." },
      { pregunta: "¿Se puede triturar el cottage?", respuesta: "Sí; si lo pasas por la batidora antes de mezclarlo con el huevo, el resultado es más cremoso y sin grumos." }
    ]
  },
  {
    id: "racimos_fruta_congelada_yogur",
    nombre: "Racimos de Fruta Congelada con Yogur",
    imagen: "img/recetas/Racimo-de-Fruta-Congelada-con-Yogur.jpg",
    emojiPortada: "🍓🫐🥛",
    rating: "A",
    tiempo: "10 min + congelación",
    raciones: 4,
    mostrarPorRacion: true,
    etiquetas: ["vegetariano"],
    momento: [],
    descripcion: "El snack viral del verano que también funciona en otoño: pequeños racimos de yogur natural con frutos rojos, congelados. Sin azúcar añadido (la miel es opcional), unos 10 g de proteína por ración y solo unas 100 kcal.",
    motivo: "Se basa en yogur natural sin azúcar (10 g de proteína por 100 g y casi nada de grasa) y en frutos rojos, ricos en fibra y antocianinas. Así, casi todo el azúcar de la receta viene de la propia fruta y el yogur; la miel es opcional y, sin ella, es todavía más ligera. Es una alternativa sencilla al helado o a los snacks dulces industriales.",
    ingredientes: [
      { foodId: "yogur_natural", cantidad: 400 },
      { foodId: "arandanos", cantidad: 100 },
      { foodId: "fresas", cantidad: 100 },
      { foodId: "frambuesas", cantidad: 50 },
      { foodId: "miel", cantidad: 15, opcional: true }
    ],
    pasos: [
      "Forra una bandeja o un plato que quepa en el congelador con papel de horno.",
      "Si usas miel, mézclala con el yogur.",
      "Reparte unas 12 cucharadas de yogur sobre el papel, dejando espacio entre ellas.",
      "Coloca encima los arándanos, trozos de fresa y las frambuesas, presionando ligeramente para que se sujeten.",
      "Congela como mínimo 2 horas. Guarda los racimos en un recipiente hermético en el congelador hasta 1 mes y tómalos directamente del congelador."
    ],
    faqs: [
      { pregunta: "¿Puedo usar yogur vegetal?", respuesta: "Sí, con un yogur de soja espeso y sin azúcar; quedarán algo menos firmes que con yogur natural o griego." },
      { pregunta: "¿Cuánto duran en el congelador?", respuesta: "Hasta un mes en un recipiente hermético; sepáralos con papel de horno para que no se peguen entre sí." },
      { pregunta: "¿Puedo usar otras frutas?", respuesta: "Sí: mango, kiwi o plátano en trozos funcionan bien. Evita las muy acuosas, como la sandía, porque al congelarse quedan duras." }
    ]
  },
  {
    id: "ensalada_griega",
    nombre: "Ensalada Griega",
    emojiPortada: "🥗🫒🧀",
    rating: "B",
    tiempo: "15 min",
    raciones: 2,
    mostrarPorRacion: true,
    etiquetas: ["vegetariano"],
    momento: ["comida", "cena"],
    descripcion: "El clásico griego sin trucos: pepino, tomate, feta y aceitunas con un aliño sencillo de AOVE y orégano. Fresca, rápida y sin cocción.",
    motivo: "La combinación de verduras frescas, grasa monoinsaturada del AOVE y las aceitunas, y proteína del feta la hace muy nutritiva, pero tanto el feta como las aceitunas son ingredientes salados: la ración ronda los 975 mg de sodio, la mitad de lo recomendable en todo el día. La calificamos B por eso, no por sus verduras ni su grasa, que son excelentes.",
    ingredientes: [
      { foodId: "pepino", cantidad: 200 },
      { foodId: "ia_tomate", cantidad: 250 },
      { foodId: "queso_feta", cantidad: 100 },
      { foodId: "aceitunas", cantidad: 60 },
      { foodId: "ia_cebolla", cantidad: 40 },
      { foodId: "aove", cantidad: 20 },
      { foodId: "oregano", cantidad: 1 },
      { foodId: "limon", cantidad: 20 }
    ],
    pasos: [
      "Corta el pepino, el tomate y la cebolla en trozos grandes; mézclalos en un bol.",
      "Añade la feta en dados o desmenuzada y las aceitunas.",
      "Alíñalo con el AOVE, el zumo de limón y el orégano justo antes de servir, para que las verduras no suelten agua."
    ],
    faqs: [
      { pregunta: "¿Puedo dejarla preparada con antelación?", respuesta: "Corta las verduras y guárdalas en la nevera, pero añade el feta, las aceitunas y el aliño justo antes de comer para que no se ablande." },
      { pregunta: "¿Cómo reduzco el sodio?", respuesta: "Usa la mitad de feta y aclara las aceitunas bajo el grifo antes de añadirlas; pierdes algo de sabor pero bajas bastante el sodio." },
      { pregunta: "¿Qué aceitunas van mejor?", respuesta: "Las kalamata son las más tradicionales, pero cualquier aceituna negra o verde de buena calidad funciona." }
    ]
  },
  {
    id: "pollo_horno_guisantes_trigo_sarraceno",
    nombre: "Pollo al Horno con Guisantes y Trigo Sarraceno",
    emojiPortada: "🍗🟢🌾",
    rating: "B",
    tiempo: "45 min",
    raciones: 2,
    mostrarPorRacion: true,
    etiquetas: ["proteico"],
    momento: ["comida", "cena"],
    descripcion: "Un plato único de bandeja: muslos de pollo al horno, guisantes salteados y trigo sarraceno, un cereal sin gluten con mucha fibra. Casi 49 g de proteína por ración.",
    motivo: "El muslo de pollo aporta más hierro y sabor que la pechuga, y el trigo sarraceno suma fibra y minerales sin gluten: 49 g de proteína y más de 9 g de fibra por ración. La calificamos B y no A porque es un plato calórico (583 kcal por ración) y el muslo con piel eleva algo más la grasa saturada que si fuera pechuga; sigue siendo un plato muy recomendable, pero mejor como plato principal que en raciones extragrandes.",
    ingredientes: [
      { foodId: "muslo_pollo", cantidad: 300 },
      { foodId: "guisantes", cantidad: 200 },
      { foodId: "trigo_sarraceno", cantidad: 240 },
      { foodId: "aove", cantidad: 15 },
      { foodId: "ia_ajo", cantidad: 6 },
      { foodId: "limon", cantidad: 20 },
      { foodId: "pimienta_negra", cantidad: 1 }
    ],
    pasos: [
      "Precalienta el horno a 200 °C. Si no tienes trigo sarraceno cocido, cuece unos 80 g en seco con el doble de agua durante 12-15 minutos y resérvalo.",
      "Coloca los muslos de pollo en una bandeja con el AOVE, el ajo laminado, el zumo de limón y la pimienta; hornea 35-40 minutos hasta que la piel esté dorada.",
      "En los últimos 8 minutos, añade los guisantes a la bandeja para que se hagan con el jugo del pollo.",
      "Sirve el pollo y los guisantes sobre el trigo sarraceno."
    ],
    faqs: [
      { pregunta: "¿Puedo usar pechuga en vez de muslo?", respuesta: "Sí, pero reduce el tiempo de horno a unos 20-25 minutos para que no se seque, y ganarás en magro lo que pierdes en jugosidad." },
      { pregunta: "¿Los guisantes pueden ser congelados?", respuesta: "Sí, sin descongelar; añádelos directamente a la bandeja." },
      { pregunta: "¿Con qué sustituyo el trigo sarraceno?", respuesta: "Quinoa o arroz integral funcionan igual de bien, aunque cambiarán algo los valores nutricionales." }
    ]
  },
  {
    id: "bol_yogur_soja_higos_nueces",
    nombre: "Bol de Yogur de Soja con Higos y Nueces",
    emojiPortada: "🥣🟤🌰",
    rating: "A",
    tiempo: "5 min",
    raciones: 2,
    mostrarPorRacion: true,
    etiquetas: ["vegano"],
    momento: ["desayuno"],
    descripcion: "Un desayuno o postre de 5 minutos: yogur de soja natural con higos secos troceados, nueces y un hilo de sirope de arce. 100 % vegetal y con unos 11 g de proteína por ración.",
    motivo: "El yogur de soja aporta proteína vegetal con muy poca grasa saturada, y los higos y las nueces suman fibra, minerales y grasa insaturada. Con unos 11 g de proteína y solo 1,6 g de grasa saturada por ración, y sin azúcar añadido si omites el sirope, lo calificamos A.",
    ingredientes: [
      { foodId: "yogur_soja", cantidad: 400 },
      { foodId: "higos_secos", cantidad: 60 },
      { foodId: "ia_nueces", cantidad: 30 },
      { foodId: "sirope_arce", cantidad: 20, opcional: true }
    ],
    pasos: [
      "Reparte el yogur de soja en dos boles.",
      "Trocea los higos secos y repártelos por encima junto con las nueces.",
      "Termina con un hilo de sirope de arce al gusto."
    ],
    faqs: [
      { pregunta: "¿Puedo prepararlo la noche antes?", respuesta: "Mejor monta el yogur base y añade los higos, las nueces y el sirope justo antes de comer, para que las nueces no pierdan el crujiente." },
      { pregunta: "¿Puedo usar yogur de leche?", respuesta: "Sí, el natural o el griego funcionan igual; el griego aportará más proteína, pero ya no será una receta vegana." },
      { pregunta: "¿Cómo bajo el azúcar?", respuesta: "Omite el sirope de arce; los higos ya aportan dulzor de sobra." }
    ]
  },
  {
    id: "salteado_seitan_verduras",
    nombre: "Salteado de Seitán con Verduras",
    emojiPortada: "🌾🫑🧅",
    rating: "A",
    tiempo: "20 min",
    raciones: 2,
    mostrarPorRacion: true,
    etiquetas: ["vegano", "proteico"],
    momento: ["comida", "cena"],
    descripcion: "Un salteado rápido tipo wok: seitán troceado con pimientos, cebolla, ajo y jengibre, ligado con un poco de salsa de soja baja en sodio. 40 g de proteína vegetal por ración.",
    motivo: "El seitán aporta casi tanta proteína como la carne con muy poca grasa, y las verduras suman fibra, vitamina C y color. Con 40 g de proteína, apenas 1.6 g de grasa saturada y sin ningún ingrediente que penalice, lo calificamos A.",
    ingredientes: [
      { foodId: "seitan", cantidad: 300 },
      { foodId: "ia_pimiento_rojo", cantidad: 150 },
      { foodId: "ia_pimiento_verde", cantidad: 100 },
      { foodId: "ia_cebolla", cantidad: 100 },
      { foodId: "salsa_soja_baja_sodio", cantidad: 20 },
      { foodId: "aove", cantidad: 15 },
      { foodId: "ia_ajo", cantidad: 6 },
      { foodId: "ia_jengibre", cantidad: 6 }
    ],
    pasos: [
      "Corta el seitán en tiras y los pimientos y la cebolla en juliana.",
      "Calienta el AOVE en una sartén o wok a fuego fuerte y saltea el seitán 3-4 minutos hasta que se dore; resérvalo.",
      "En la misma sartén, saltea la cebolla, los pimientos, el ajo y el jengibre 4-5 minutos.",
      "Vuelve a añadir el seitán, incorpora la salsa de soja y saltea 1-2 minutos más hasta que todo esté bien integrado."
    ],
    faqs: [
      { pregunta: "¿Dónde compro seitán?", respuesta: "En la sección de proteína vegetal de la mayoría de supermercados grandes, o en tiendas de dietética; también se puede hacer casero con gluten de trigo." },
      { pregunta: "¿Es apto para celíacos?", respuesta: "No: el seitán es gluten de trigo puro, así que no es apto para celíacos ni para quien evite el gluten." },
      { pregunta: "¿Puedo añadir más verduras?", respuesta: "Sí, brócoli, zanahoria o champiñones combinan muy bien en este salteado." }
    ]
  },
  {
    id: "ensalada_bulgur_rucula_albaricoque",
    nombre: "Ensalada de Bulgur con Rúcula, Albaricoque y Queso de Cabra",
    emojiPortada: "🥗🍑🧀",
    rating: "B",
    tiempo: "20 min",
    raciones: 2,
    mostrarPorRacion: true,
    etiquetas: ["vegetariano"],
    momento: ["comida", "cena"],
    descripcion: "Una ensalada templada y muy completa: bulgur, rúcula, albaricoque fresco, queso de cabra y piñones con un aliño de AOVE y limón. Dulce, salada y crujiente a la vez, lista en 20 minutos.",
    motivo: "El bulgur aporta fibra y carbohidrato de absorción lenta, la rúcula y el albaricoque suman antioxidantes y frescura, y los piñones y el AOVE, grasa insaturada. Se queda en B por el queso de cabra: sus 60 g aportan colesterol y unos 13 g de grasa saturada (casi 8 g por ración contando el resto). Con menos queso, o cambiándolo por queso fresco, sube fácilmente a A.",
    ingredientes: [
      { foodId: "bulgur", cantidad: 240 },
      { foodId: "rucula", cantidad: 60 },
      { foodId: "albaricoque", cantidad: 120 },
      { foodId: "queso_cabra", cantidad: 60 },
      { foodId: "pinones", cantidad: 20 },
      { foodId: "aove", cantidad: 15 },
      { foodId: "limon", cantidad: 20 }
    ],
    pasos: [
      "Si no tienes bulgur cocido, cuece unos 90 g en seco con el doble de agua durante 10-12 minutos, escúrrelo y déjalo templar.",
      "Tuesta los piñones unos 2 minutos en una sartén seca, sin dejar de moverlos.",
      "Corta el albaricoque en gajos y desmenuza el queso de cabra.",
      "Mezcla el bulgur con la rúcula, el albaricoque y el queso; aliña con el AOVE y el zumo de limón y termina con los piñones por encima."
    ],
    faqs: [
      { pregunta: "¿Puedo hacerla sin albaricoque?", respuesta: "Sí, en otras estaciones funcionan bien el melocotón, el higo fresco o la granada; cambiarán algo las calorías." },
      { pregunta: "¿Cómo la hago más ligera?", respuesta: "Usa la mitad de queso de cabra o sustitúyelo por queso fresco batido 0%; bajará mucho la grasa saturada." },
      { pregunta: "¿Es apta para celíacos?", respuesta: "No: el bulgur es trigo y contiene gluten. Con quinoa o mijo cocido queda igual de bien y sin gluten." }
    ]
  },
  {
    id: "pulpo_gallega_ligero",
    nombre: "Pulpo a la Gallega Ligero",
    emojiPortada: "🐙🥔🌶️",
    rating: "B",
    tiempo: "40 min",
    raciones: 2,
    mostrarPorRacion: true,
    etiquetas: ["proteico"],
    momento: ["comida", "cena"],
    descripcion: "El pulpo a feira de siempre, pero con menos aceite: pulpo cocido sobre cachelos, con AOVE y pimentón. Casi 48 g de proteína por ración con muy poca grasa.",
    motivo: "El pulpo es una de las proteínas más magras que existen y la patata cocida aporta carbohidrato saciante sin apenas grasa, con solo 15 g de AOVE para toda la receta. Lo calificamos B por el sodio: el propio pulpo ya aporta unos 460 mg por 100 g y, con la sal del agua de cocción y del plato, cada ración ronda los 700 mg.",
    ingredientes: [
      { foodId: "pulpo", cantidad: 300 },
      { foodId: "ia_patata_cocida", cantidad: 300 },
      { foodId: "aove", cantidad: 15 },
      { foodId: "pimenton", cantidad: 3 }
    ],
    pasos: [
      "Si el pulpo ya viene cocido, córtalo en rodajas de 1 cm; si es fresco, cuécelo entero en agua sin sal unos 45 minutos (asústalo tres veces) y déjalo reposar en su agua.",
      "Cuece las patatas con piel en agua durante 20-25 minutos, pélalas y córtalas en rodajas gruesas.",
      "Coloca las patatas en el plato y el pulpo encima.",
      "Aliña con el AOVE y espolvorea el pimentón. Prueba antes de añadir sal: probablemente no haga falta."
    ],
    faqs: [
      { pregunta: "¿Puedo usar pulpo congelado?", respuesta: "Sí, y de hecho es habitual: al congelarse las fibras se ablandan. Descongélalo en la nevera y cuécelo como el fresco." },
      { pregunta: "¿Cómo bajo el sodio?", respuesta: "No salar el agua de cocción ni el plato, y usar pimentón picante o un chorrito de limón para dar sabor." },
      { pregunta: "¿Con qué acompañarlo?", respuesta: "Una ensalada verde o verduras a la plancha le dan fibra y equilibran el plato." }
    ]
  },
  {
    id: "bol_skyr_moras_granola",
    nombre: "Bol de Skyr con Moras y Granola",
    emojiPortada: "🥣🫐🌾",
    rating: "B",
    tiempo: "5 min",
    raciones: 1,
    mostrarPorRacion: true,
    etiquetas: ["vegetariano", "proteico"],
    momento: ["desayuno"],
    descripcion: "Un desayuno de 5 minutos con casi 32 g de proteína: skyr natural bien frío, moras frescas y un puñado de granola crujiente por encima.",
    motivo: "El skyr aporta mucha proteína casi sin grasa y las moras, fibra y antocianinas con poco azúcar. Lo calificamos B por la granola: 30 g de una granola comercial suman unos 8 g de azúcar, y con el de la fruta y el skyr la ración llega a unos 23 g. Con granola casera o con avena tostada, sube a A.",
    ingredientes: [
      { foodId: "skyr", cantidad: 250 },
      { foodId: "moras", cantidad: 100 },
      { foodId: "granola", cantidad: 30 }
    ],
    pasos: [
      "Pon el skyr en un bol.",
      "Añade las moras, lavadas y escurridas.",
      "Termina con la granola justo antes de comer, para que no se ablande."
    ],
    faqs: [
      { pregunta: "¿Puedo usar moras congeladas?", respuesta: "Sí; déjalas descongelar 10 minutos en el bol y soltarán un jugo que endulza el skyr de forma natural." },
      { pregunta: "¿Qué granola elijo?", respuesta: "Mira la etiqueta: cuanto menos azúcar y más avena y frutos secos, mejor. Si puedes, hazla en casa." },
      { pregunta: "¿Puedo sustituir el skyr?", respuesta: "El yogur griego natural funciona igual, con algo menos de proteína y más grasa." }
    ]
  }
];
