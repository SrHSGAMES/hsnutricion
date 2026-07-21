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
  }
];
