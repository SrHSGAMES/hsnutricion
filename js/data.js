/* HSNutrición — Base de datos nutricional
   Valores de referencia por 100 g (aproximados, fuentes tipo USDA/BEDCA).
   Uso educativo: no sustituye la valoración de un profesional sanitario. */

const FOODS = [
  {
    id: "mantequilla",
    nombre: "Mantequilla",
    aliases: ["mantequilla", "manteca de leche", "butter"],
    categoria: "Grasas",
    emoji: "🧈",
    rating: "D",
    kcal: 717, carbs: 0.1, azucares: 0.1, proteinas: 0.9, grasas: 81, grasasSat: 51, fibra: 0, sodio: 11,
    motivo: "La mantequilla se clasifica con una 'D' principalmente por su muy alto contenido calórico y su elevado porcentaje de grasas saturadas, que representan más del 60% de sus grasas totales (51 g por cada 100 g). El consumo excesivo de estas grasas se ha asociado con un aumento de los niveles de colesterol LDL ('malo'), un factor de riesgo conocido para enfermedades cardiovasculares [3, 4]. Además, su densidad nutricional es baja, con aportes mínimos de proteínas y fibra. Por estas razones, se recomienda moderar su ingesta y priorizar la sustitución por alternativas de origen vegetal con perfiles de grasas más saludables para favorecer la salud cardiometabólica [1].",
    estudios: [
        {
            "pmid": "37968628",
            "titulo": "Substitution of animal-based with plant-based foods on cardiometabolic health and all-cause mortality: a systematic review and meta-analysis of prospective studies.",
            "revista": "BMC medicine",
            "anio": "2023",
            "url": "https://pubmed.ncbi.nlm.nih.gov/37968628/"
        },
        {
            "pmid": "35299247",
            "titulo": "Associations Between Dietary Patterns and Incident Type 2 Diabetes: Prospective Cohort Study of 120,343 UK Biobank Participants.",
            "revista": "Diabetes care",
            "anio": "2022",
            "url": "https://pubmed.ncbi.nlm.nih.gov/35299247/"
        },
        {
            "pmid": "29511019",
            "titulo": "Randomised trial of coconut oil, olive oil or butter on blood lipids and other cardiovascular risk factors in healthy men and women.",
            "revista": "BMJ open",
            "anio": "2018",
            "url": "https://pubmed.ncbi.nlm.nih.gov/29511019/"
        },
        {
            "pmid": "9180239",
            "titulo": "Butter, margarine and serum lipoproteins.",
            "revista": "Atherosclerosis",
            "anio": "1997",
            "url": "https://pubmed.ncbi.nlm.nih.gov/9180239/"
        }
    ],
    sustitutos: [
      {
        nombre: "AOVE (aceite de oliva virgen extra)",
        emoji: "🫒",
        mejor: true,
        kcal: 884, carbs: 0, azucares: 0, proteinas: 0, grasas: 100, grasasSat: 14, fibra: 0, sodio: 0,
        porque: "Es la mejor opción: grasa mayoritariamente monoinsaturada, rica en polifenoles antioxidantes y con muchas menos grasas saturadas. Cambia el sabor y no sirve igual para untar en frío, pero es ideal para cocinar, aliños y tostadas."
      },
      {
        nombre: "Margarina vegetal (sin grasas trans)",
        emoji: "🧂",
        mejor: false,
        kcal: 717, carbs: 1, azucares: 1, proteinas: 0.2, grasas: 80, grasasSat: 15, fibra: 0, sodio: 40,
        porque: "Reduce mucho las grasas saturadas frente a la mantequilla (de 51 g a ~15 g) manteniendo una textura para untar muy parecida. Elige una etiquetada 'sin aceites hidrogenados' para evitar grasas trans."
      }
    ]
  },
  {
    id: "margarina",
    nombre: "Margarina (convencional)",
    aliases: ["margarina"],
    categoria: "Grasas",
    emoji: "🧂",
    rating: "C",
    kcal: 717, carbs: 1, azucares: 1, proteinas: 0.2, grasas: 80, grasasSat: 25, fibra: 0, sodio: 60,
    motivo: "La margarina convencional es un alimento muy calórico y rico en grasas, lo que requiere un consumo moderado para evitar un exceso en la ingesta energética. Contiene una cantidad significativa de grasas saturadas y, en sus formulaciones tradicionales, ha sido una fuente importante de grasas trans [2]. Estas grasas trans son conocidas por elevar el colesterol y aumentar el riesgo cardiovascular, justificando precaución en su consumo [2]. Además, su aporte de proteínas, fibra o micronutrientes esenciales es muy bajo, lo que la convierte principalmente en una fuente de energía densa. Por estas razones, se le asigna una calificación C, recomendando su uso ocasional y en pequeñas cantidades.",
    estudios: [
        {
            "pmid": "27071971",
            "titulo": "Re-evaluation of the traditional diet-heart hypothesis: analysis of recovered data from Minnesota Coronary Experiment (1968-73).",
            "revista": "BMJ (Clinical research ed.)",
            "anio": "2016",
            "url": "https://pubmed.ncbi.nlm.nih.gov/27071971/"
        },
        {
            "pmid": "9430386",
            "titulo": "Trans fatty acids and cardiovascular risk.",
            "revista": "Prostaglandins, leukotrienes, and essential fatty acids",
            "anio": "1997",
            "url": "https://pubmed.ncbi.nlm.nih.gov/9430386/"
        },
        {
            "pmid": "12975030",
            "titulo": "Nutrition therapy for dyslipidemia.",
            "revista": "Current diabetes reports",
            "anio": "2003",
            "url": "https://pubmed.ncbi.nlm.nih.gov/12975030/"
        },
        {
            "pmid": "9322581",
            "titulo": "Health effects of trans fatty acids.",
            "revista": "The American journal of clinical nutrition",
            "anio": "1997",
            "url": "https://pubmed.ncbi.nlm.nih.gov/9322581/"
        }
    ],
    sustitutos: [
      {
        nombre: "AOVE (aceite de oliva virgen extra)",
        emoji: "🫒", mejor: true,
        kcal: 884, carbs: 0, azucares: 0, proteinas: 0, grasas: 100, grasasSat: 14, fibra: 0, sodio: 0,
        porque: "La mejor opción global por su perfil graso y antioxidantes, aunque no sirve para untar en frío como la margarina."
      },
      {
        nombre: "Margarina 100% vegetal sin grasas trans",
        emoji: "🌿", mejor: false,
        kcal: 690, carbs: 1, azucares: 0.5, proteinas: 0.2, grasas: 78, grasasSat: 16, fibra: 0, sodio: 40,
        porque: "Misma textura para untar, pero con un perfil de grasas más saludable si se elige sin aceite de palma ni hidrogenados."
      }
    ]
  },
  {
    id: "aceite_girasol",
    nombre: "Aceite de girasol",
    aliases: ["aceite de girasol", "aceite girasol"],
    categoria: "Grasas",
    emoji: "🌻",
    rating: "B",
    kcal: 884, carbs: 0, azucares: 0, proteinas: 0, grasas: 100, grasasSat: 11, fibra: 0, sodio: 0,
    motivo: "El aceite de girasol es una fuente concentrada de energía, compuesto principalmente por grasas insaturadas, incluyendo una elevada proporción de ácidos grasos poliinsaturados omega-6. También es una buena fuente de vitamina E, un antioxidante que contribuye a la protección celular. Estas grasas, cuando se consumen en sustitución de las grasas saturadas, son beneficiosas para la salud cardiovascular. No obstante, su alta densidad calórica y el predominio de omega-6, en comparación con otras grasas saludables, justifican su calificación 'B', lo que implica consumirlo con moderación y en el contexto de una dieta equilibrada.",
    estudios: [
        {
            "pmid": "34924350",
            "titulo": "Mustard oil and cardiovascular health: Why the controversy?",
            "revista": "Journal of clinical lipidology",
            "anio": "2022",
            "url": "https://pubmed.ncbi.nlm.nih.gov/34924350/"
        },
        {
            "pmid": "31521398",
            "titulo": "Mediterranean diet: The role of long-chain ω-3 fatty acids in fish; polyphenols in fruits, vegetables, cereals, coffee, tea, cacao and wine; probiotics and vitamins in prevention of stroke, age-related cognitive decline, and Alzheimer disease.",
            "revista": "Revue neurologique",
            "anio": "2019",
            "url": "https://pubmed.ncbi.nlm.nih.gov/31521398/"
        },
        {
            "pmid": "33127255",
            "titulo": "The effects of Canola oil on cardiovascular risk factors: A systematic review and meta-analysis with dose-response analysis of controlled clinical trials.",
            "revista": "Nutrition, metabolism, and cardiovascular diseases : NMCD",
            "anio": "2020",
            "url": "https://pubmed.ncbi.nlm.nih.gov/33127255/"
        },
        {
            "pmid": "38890092",
            "titulo": "Lutein, zeaxanthin, and meso-zeaxanthin supplementation attenuates inflammatory cytokines and markers of oxidative cardiovascular processes in humans.",
            "revista": "Nutrition, metabolism, and cardiovascular diseases : NMCD",
            "anio": "2024",
            "url": "https://pubmed.ncbi.nlm.nih.gov/38890092/"
        }
    ],
    sustitutos: [
      {
        nombre: "AOVE (aceite de oliva virgen extra)",
        emoji: "🫒", mejor: true,
        kcal: 884, carbs: 0, azucares: 0, proteinas: 0, grasas: 100, grasasSat: 14, fibra: 0, sodio: 0,
        porque: "Mejor equilibrio omega-6/omega-3 y mayor contenido en polifenoles con propiedades antiinflamatorias. Aguanta bien la fritura moderada."
      }
    ]
  },
  {
    id: "aove",
    nombre: "AOVE (aceite de oliva virgen extra)",
    aliases: ["aove", "aceite de oliva virgen extra", "aceite de oliva"],
    categoria: "Grasas",
    emoji: "🫒",
    rating: "A",
    kcal: 884, carbs: 0, azucares: 0, proteinas: 0, grasas: 100, grasasSat: 14, fibra: 0, sodio: 0,
    motivo: "El Aceite de Oliva Virgen Extra (AOVE) recibe una calificación 'A' por su sobresaliente perfil nutricional como grasa saludable, siendo un pilar fundamental de la dieta Mediterránea. Aunque es un alimento rico en calorías y grasa (100g por 100g), destaca por su bajo contenido en grasas saturadas (solo 14g) y su elevada concentración de grasas monoinsaturadas. Además, es una fuente importante de compuestos bioactivos como polifenoles y vitamina E, conocidos por sus propiedades antioxidantes y antiinflamatorias. La evidencia científica asocia la incorporación del AOVE en patrones alimentarios como la dieta Mediterránea con importantes beneficios para la salud cardiovascular, el control del colesterol y la prevención de enfermedades crónicas [1, 2, 3]. Su consumo moderado y habitual es clave para una alimentación equilibrada.",
    estudios: [
        {
            "pmid": "36479477",
            "titulo": "Modern vision of the Mediterranean diet.",
            "revista": "Journal of preventive medicine and hygiene",
            "anio": "2022",
            "url": "https://pubmed.ncbi.nlm.nih.gov/36479477/"
        },
        {
            "pmid": "37432307",
            "titulo": "The Effects of the Mediterranean Diet on Health and Gut Microbiota.",
            "revista": "Nutrients",
            "anio": "2023",
            "url": "https://pubmed.ncbi.nlm.nih.gov/37432307/"
        },
        {
            "pmid": "25940230",
            "titulo": "Benefits of the Mediterranean Diet: Insights From the PREDIMED Study.",
            "revista": "Progress in cardiovascular diseases",
            "anio": "2015",
            "url": "https://pubmed.ncbi.nlm.nih.gov/25940230/"
        },
        {
            "pmid": "40087038",
            "titulo": "Mediterranean diet: Why a new pyramid? An updated representation of the traditional Mediterranean diet by the Italian Society of Human Nutrition (SINU).",
            "revista": "Nutrition, metabolism, and cardiovascular diseases : NMCD",
            "anio": "2025",
            "url": "https://pubmed.ncbi.nlm.nih.gov/40087038/"
        }
    ],
    sustitutos: []
  },
  {
    id: "pan_blanco",
    nombre: "Pan blanco",
    aliases: ["pan blanco", "pan de molde blanco", "pan"],
    categoria: "Cereales",
    emoji: "🍞",
    rating: "C",
    kcal: 265, carbs: 49, azucares: 4, proteinas: 9, grasas: 3.2, grasasSat: 0.7, fibra: 2.7, sodio: 490,
    motivo: "El pan blanco obtiene una calificación C debido a su perfil nutricional menos óptimo. Es un alimento rico en carbohidratos refinados, lo que le confiere un alto índice glucémico, provocando picos rápidos de azúcar en sangre [3]. Además, su bajo contenido en fibra (2.7 g por 100 g) lo hace menos saciante en comparación con opciones integrales, y su aporte de sodio (490 mg por 100 g) es considerable. Un consumo frecuente y elevado de pan blanco podría relacionarse con un mayor riesgo de sobrepeso y obesidad [2], por lo que se recomienda un consumo moderado y priorizar alternativas con mayor contenido de fibra.",
    estudios: [
        {
            "pmid": "30958719",
            "titulo": "Meta-Analysis of Randomized Controlled Trials of Red Meat Consumption in Comparison With Various Comparison Diets on Cardiovascular Risk Factors.",
            "revista": "Circulation",
            "anio": "2019",
            "url": "https://pubmed.ncbi.nlm.nih.gov/30958719/"
        },
        {
            "pmid": "26148919",
            "titulo": "Relationship between bread and obesity.",
            "revista": "The British journal of nutrition",
            "anio": "2015",
            "url": "https://pubmed.ncbi.nlm.nih.gov/26148919/"
        },
        {
            "pmid": "14714013",
            "titulo": "[Glycaemic index].",
            "revista": "Tidsskrift for den Norske laegeforening : tidsskrift for praktisk medicin, ny raekke",
            "anio": "2003",
            "url": "https://pubmed.ncbi.nlm.nih.gov/14714013/"
        },
        {
            "pmid": "38892603",
            "titulo": "Understanding the Impact of Different Doses of Reducose(®) Mulberry Leaf Extract on Blood Glucose and Insulin Responses after Eating a Complex Meal: Results from a Double-Blind, Randomised, Crossover Trial.",
            "revista": "Nutrients",
            "anio": "2024",
            "url": "https://pubmed.ncbi.nlm.nih.gov/38892603/"
        }
    ],
    sustitutos: [
      {
        nombre: "Pan integral / de masa madre",
        emoji: "🌾", mejor: true,
        kcal: 250, carbs: 41, azucares: 3, proteinas: 9, grasas: 3.3, grasasSat: 0.6, fibra: 7, sodio: 450,
        porque: "Casi el triple de fibra, misma textura para untar o hacer tostadas, y libera la energía más despacio (menor índice glucémico)."
      }
    ]
  },
  {
    id: "pan_integral",
    nombre: "Pan integral",
    aliases: ["pan integral", "pan de centeno", "pan de masa madre"],
    categoria: "Cereales",
    emoji: "🌾",
    rating: "A",
    kcal: 250, carbs: 41, azucares: 3, proteinas: 9, grasas: 3.3, grasasSat: 0.6, fibra: 7, sodio: 450,
    motivo: "El pan integral merece una calificación 'A' por su excepcional aporte de fibra dietética, con 7 gramos por cada 100g. Este alto contenido de fibra es crucial para la salud digestiva, contribuye a una mayor saciedad y ayuda a mantener estables los niveles de glucosa en sangre. Además, su perfil nutricional es muy favorable al ser bajo en azúcares y grasas saturadas, mientras que aporta carbohidratos complejos y una cantidad significativa de proteínas. Integrar el pan integral en tu alimentación es una estrategia efectiva para mejorar la salud general y contribuir a la prevención de enfermedades crónicas, como el síndrome metabólico [1].",
    estudios: [
        {
            "pmid": "29480368",
            "titulo": "The Global Epidemic of the Metabolic Syndrome.",
            "revista": "Current hypertension reports",
            "anio": "2018",
            "url": "https://pubmed.ncbi.nlm.nih.gov/29480368/"
        },
        {
            "pmid": "27886704",
            "titulo": "Position of the Academy of Nutrition and Dietetics: Vegetarian Diets.",
            "revista": "Journal of the Academy of Nutrition and Dietetics",
            "anio": "2016",
            "url": "https://pubmed.ncbi.nlm.nih.gov/27886704/"
        },
        {
            "pmid": "29496410",
            "titulo": "Plant-based diets and cardiovascular health.",
            "revista": "Trends in cardiovascular medicine",
            "anio": "2018",
            "url": "https://pubmed.ncbi.nlm.nih.gov/29496410/"
        },
        {
            "pmid": "25447615",
            "titulo": "The Mediterranean diet, its components, and cardiovascular disease.",
            "revista": "The American journal of medicine",
            "anio": "2015",
            "url": "https://pubmed.ncbi.nlm.nih.gov/25447615/"
        }
    ],
    sustitutos: []
  },
  {
    id: "arroz_blanco",
    nombre: "Arroz blanco (cocido)",
    aliases: ["arroz blanco", "arroz"],
    categoria: "Cereales",
    emoji: "🍚",
    rating: "C",
    kcal: 130, carbs: 28, azucares: 0.1, proteinas: 2.7, grasas: 0.3, grasasSat: 0.1, fibra: 0.4, sodio: 1,
    motivo: "Índice glucémico alto y muy poca fibra al haber perdido el salvado.",
    sustitutos: [
      {
        nombre: "Arroz integral (cocido)",
        emoji: "🌾", mejor: true,
        kcal: 123, carbs: 25.8, azucares: 0.2, proteinas: 2.6, grasas: 1, grasasSat: 0.2, fibra: 1.8, sodio: 4,
        porque: "Conserva el salvado: más fibra, más saciante y con menor impacto en el azúcar en sangre, con una textura similar."
      },
      {
        nombre: "Quinoa (cocida)",
        emoji: "🌾", mejor: false,
        kcal: 120, carbs: 21, azucares: 0.9, proteinas: 4.4, grasas: 1.9, grasasSat: 0.2, fibra: 2.8, sodio: 7,
        porque: "Aporta proteína completa (todos los aminoácidos esenciales) y más fibra que el arroz blanco."
      }
    ]
  },
  {
    id: "arroz_integral",
    nombre: "Arroz integral (cocido)",
    aliases: ["arroz integral"],
    categoria: "Cereales",
    emoji: "🌾",
    rating: "A",
    kcal: 123, carbs: 25.8, azucares: 0.2, proteinas: 2.6, grasas: 1, grasasSat: 0.2, fibra: 1.8, sodio: 4,
    motivo: "Cereal integral con fibra conservada: buena opción de referencia.",
    sustitutos: []
  },
  {
    id: "pasta_blanca",
    nombre: "Pasta blanca (cocida)",
    aliases: ["pasta blanca", "pasta", "macarrones", "espaguetis"],
    categoria: "Cereales",
    emoji: "🍝",
    rating: "C",
    kcal: 131, carbs: 25, azucares: 0.6, proteinas: 5, grasas: 1.1, grasasSat: 0.2, fibra: 1.3, sodio: 1,
    motivo: "Refinada y con poca fibra frente a su versión integral.",
    sustitutos: [
      {
        nombre: "Pasta integral (cocida)",
        emoji: "🌾", mejor: true,
        kcal: 124, carbs: 25, azucares: 0.8, proteinas: 5.3, grasas: 1.1, grasasSat: 0.2, fibra: 3.9, sodio: 3,
        porque: "El triple de fibra con el mismo tiempo de cocción y una textura muy similar una vez cocinada 'al dente'."
      }
    ]
  },
  {
    id: "pasta_integral",
    nombre: "Pasta integral (cocida)",
    aliases: ["pasta integral"],
    categoria: "Cereales",
    emoji: "🌾",
    rating: "A",
    kcal: 124, carbs: 25, azucares: 0.8, proteinas: 5.3, grasas: 1.1, grasasSat: 0.2, fibra: 3.9, sodio: 3,
    motivo: "Buena densidad de fibra y nutrientes conservados del grano completo.",
    sustitutos: []
  },
  {
    id: "azucar",
    nombre: "Azúcar blanco",
    aliases: ["azucar blanco", "azucar", "azucar de mesa"],
    categoria: "Dulces",
    emoji: "🍬",
    rating: "E",
    kcal: 387, carbs: 100, azucares: 100, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 0,
    motivo: "Calorías vacías: 100% azúcares simples sin ningún micronutriente ni fibra que module su absorción.",
    sustitutos: [
      {
        nombre: "Eritritol o estevia",
        emoji: "🌿", mejor: true,
        kcal: 0, carbs: 0, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 0,
        porque: "Endulzan sin aportar calorías ni elevar la glucemia. La estevia es de origen vegetal y el eritritol se tolera muy bien en dosis normales."
      },
      {
        nombre: "Miel cruda (con moderación)",
        emoji: "🍯", mejor: false,
        kcal: 304, carbs: 82, azucares: 82, proteinas: 0.3, grasas: 0, grasasSat: 0, fibra: 0.2, sodio: 4,
        porque: "Sigue siendo azúcar, pero aporta pequeñas cantidades de antioxidantes y enzimas. Úsala en menor cantidad que el azúcar por ser más dulce."
      }
    ]
  },
  {
    id: "miel",
    nombre: "Miel",
    aliases: ["miel"],
    categoria: "Dulces",
    emoji: "🍯",
    rating: "C",
    kcal: 304, carbs: 82, azucares: 82, proteinas: 0.3, grasas: 0, grasasSat: 0, fibra: 0.2, sodio: 4,
    motivo: "Sigue siendo mayoritariamente azúcar; solo aporta ventaja frente al azúcar de mesa en pequeñas cantidades de antioxidantes.",
    sustitutos: [
      {
        nombre: "Fruta fresca entera",
        emoji: "🍎", mejor: true,
        kcal: 52, carbs: 14, azucares: 10, proteinas: 0.3, grasas: 0.2, grasasSat: 0, fibra: 2.4, sodio: 1,
        porque: "El azúcar de la fruta va acompañado de fibra y agua, lo que ralentiza su absorción y aumenta la saciedad."
      }
    ]
  },
  {
    id: "leche_entera",
    nombre: "Leche entera",
    aliases: ["leche entera", "leche"],
    categoria: "Lácteos",
    emoji: "🥛",
    rating: "C",
    kcal: 61, carbs: 4.8, azucares: 4.8, proteinas: 3.2, grasas: 3.3, grasasSat: 1.9, fibra: 0, sodio: 44,
    motivo: "Buena fuente de proteína y calcio, pero con más grasa saturada de la necesaria para consumo diario elevado.",
    sustitutos: [
      {
        nombre: "Leche desnatada / semidesnatada",
        emoji: "🥛", mejor: true,
        kcal: 34, carbs: 5, azucares: 5, proteinas: 3.4, grasas: 0.1, grasasSat: 0.1, fibra: 0, sodio: 42,
        porque: "Mantiene casi toda la proteína y el calcio con una fracción de la grasa saturada."
      },
      {
        nombre: "Bebida de almendra sin azúcar",
        emoji: "🌰", mejor: false,
        kcal: 13, carbs: 0.3, azucares: 0.1, proteinas: 0.4, grasas: 1.1, grasasSat: 0.1, fibra: 0.3, sodio: 40,
        porque: "Muy baja en calorías; útil si buscas reducir lácteos, aunque aporta mucha menos proteína, así que compénsala en otra comida."
      }
    ]
  },
  {
    id: "leche_desnatada",
    nombre: "Leche desnatada",
    aliases: ["leche desnatada", "leche semidesnatada"],
    categoria: "Lácteos",
    emoji: "🥛",
    rating: "A",
    kcal: 34, carbs: 5, azucares: 5, proteinas: 3.4, grasas: 0.1, grasasSat: 0.1, fibra: 0, sodio: 42,
    motivo: "Buena fuente de proteína y calcio con muy poca grasa.",
    sustitutos: []
  },
  {
    id: "yogur_azucarado",
    nombre: "Yogur de sabores azucarado",
    aliases: ["yogur azucarado", "yogur de sabores", "yogur de fresa", "yogur azucarado con frutas"],
    categoria: "Lácteos",
    emoji: "🍮",
    rating: "D",
    kcal: 105, carbs: 17, azucares: 16, proteinas: 3.5, grasas: 3, grasasSat: 2, fibra: 0, sodio: 55,
    motivo: "El azúcar añadido casi duplica las calorías de un yogur natural sin aportar más nutrientes.",
    sustitutos: [
      {
        nombre: "Yogur natural (o griego) sin azúcar + fruta",
        emoji: "🍓", mejor: true,
        kcal: 59, carbs: 3.6, azucares: 3.6, proteinas: 10, grasas: 0.4, grasasSat: 0.3, fibra: 0, sodio: 36,
        porque: "Mucha más proteína y menos azúcar; añade fruta fresca troceada para conseguir dulzor natural y fibra."
      }
    ]
  },
  {
    id: "yogur_natural",
    nombre: "Yogur natural sin azúcar",
    aliases: ["yogur natural", "yogur natural sin azucar", "yogur griego natural"],
    categoria: "Lácteos",
    emoji: "🥣",
    rating: "A",
    kcal: 59, carbs: 3.6, azucares: 3.6, proteinas: 10, grasas: 0.4, grasasSat: 0.3, fibra: 0, sodio: 36,
    motivo: "Alto en proteína, bajo en azúcar y con probióticos beneficiosos para la microbiota.",
    sustitutos: []
  },
  {
    id: "queso_curado",
    nombre: "Queso curado",
    aliases: ["queso curado", "queso manchego curado"],
    categoria: "Lácteos",
    emoji: "🧀",
    rating: "C",
    kcal: 400, carbs: 1.3, azucares: 0.5, proteinas: 25, grasas: 33, grasasSat: 21, fibra: 0, sodio: 700,
    motivo: "Muy nutritivo en proteína y calcio, pero denso en grasas saturadas y sodio, por lo que conviene moderar la ración.",
    sustitutos: [
      {
        nombre: "Queso fresco batido 0%",
        emoji: "🧀", mejor: true,
        kcal: 60, carbs: 3.5, azucares: 3.5, proteinas: 8, grasas: 0.2, grasasSat: 0.1, fibra: 0, sodio: 300,
        porque: "Gran reducción de grasa saturada y sodio manteniendo un buen aporte de proteína, ideal para el día a día."
      }
    ]
  },
  {
    id: "queso_fresco",
    nombre: "Queso fresco batido 0%",
    aliases: ["queso fresco", "queso fresco batido"],
    categoria: "Lácteos",
    emoji: "🧀",
    rating: "A",
    kcal: 60, carbs: 3.5, azucares: 3.5, proteinas: 8, grasas: 0.2, grasasSat: 0.1, fibra: 0, sodio: 300,
    motivo: "Alto en proteína y muy bajo en grasa, buena opción habitual.",
    sustitutos: []
  },
  {
    id: "nata_cocinar",
    nombre: "Nata para cocinar",
    aliases: ["nata para cocinar", "nata"],
    categoria: "Lácteos",
    emoji: "🍦",
    rating: "D",
    kcal: 340, carbs: 3, azucares: 3, proteinas: 2.2, grasas: 35, grasasSat: 22, fibra: 0, sodio: 43,
    motivo: "Muy concentrada en grasas saturadas; usada con frecuencia en salsas eleva mucho la ingesta calórica.",
    sustitutos: [
      {
        nombre: "Yogur griego natural o leche evaporada desnatada",
        emoji: "🥛", mejor: true,
        kcal: 65, carbs: 4, azucares: 4, proteinas: 6, grasas: 2, grasasSat: 1.2, fibra: 0, sodio: 50,
        porque: "Aporta cremosidad a salsas y guisos con una fracción de las grasas saturadas de la nata."
      }
    ]
  },
  {
    id: "mayonesa",
    nombre: "Mayonesa",
    aliases: ["mayonesa"],
    categoria: "Salsas",
    emoji: "🥫",
    rating: "D",
    kcal: 680, carbs: 1, azucares: 1, proteinas: 1, grasas: 75, grasasSat: 11, fibra: 0, sodio: 550,
    motivo: "Muy densa en calorías y grasa; fácil de consumir en exceso al acompañar otros platos.",
    sustitutos: [
      {
        nombre: "Yogur griego + mostaza + AOVE",
        emoji: "🥗", mejor: true,
        kcal: 90, carbs: 3, azucares: 2, proteinas: 6, grasas: 5, grasasSat: 1, fibra: 0, sodio: 200,
        porque: "Textura cremosa similar con muchísimas menos calorías y grasa, aportando además algo de proteína."
      }
    ]
  },
  {
    id: "refresco",
    nombre: "Refresco azucarado",
    aliases: ["refresco", "refresco azucarado", "coca cola", "cola", "gaseosa azucarada"],
    categoria: "Bebidas",
    emoji: "🥤",
    rating: "E",
    kcal: 42, carbs: 10.6, azucares: 10.6, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 5,
    motivo: "Azúcar líquido de absorción muy rápida sin ningún nutriente adicional; principal fuente de azúcar añadido en muchas dietas.",
    sustitutos: [
      {
        nombre: "Agua con gas + limón / infusión fría",
        emoji: "💧", mejor: true,
        kcal: 1, carbs: 0.2, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 5,
        porque: "Mantiene la sensación refrescante y con burbujas sin aportar azúcar ni calorías."
      }
    ]
  },
  {
    id: "zumo_envasado",
    nombre: "Zumo de fruta envasado",
    aliases: ["zumo envasado", "zumo de naranja envasado", "zumo de fruta", "zumo"],
    categoria: "Bebidas",
    emoji: "🧃",
    rating: "D",
    kcal: 45, carbs: 10.4, azucares: 9.8, proteinas: 0.5, grasas: 0.1, grasasSat: 0, fibra: 0.2, sodio: 5,
    motivo: "Al exprimir y filtrar la fruta se pierde casi toda la fibra, por lo que el azúcar se absorbe casi tan rápido como en un refresco.",
    sustitutos: [
      {
        nombre: "Fruta entera (por ejemplo naranja)",
        emoji: "🍊", mejor: true,
        kcal: 47, carbs: 12, azucares: 9, proteinas: 0.9, grasas: 0.1, grasasSat: 0, fibra: 2.4, sodio: 0,
        porque: "Misma fruta pero con la fibra intacta: sacia más y modera el pico de glucosa en sangre."
      }
    ]
  },
  {
    id: "patatas_fritas",
    nombre: "Patatas fritas (chips de bolsa)",
    aliases: ["patatas fritas", "papas fritas", "chips", "patatas chips"],
    categoria: "Snacks",
    emoji: "🍟",
    rating: "E",
    kcal: 536, carbs: 53, azucares: 0.5, proteinas: 7, grasas: 34, grasasSat: 15, fibra: 4.4, sodio: 700,
    motivo: "Fritas en aceite a alta temperatura y muy saladas: mucha densidad calórica y sodio en poca cantidad de producto.",
    sustitutos: [
      {
        nombre: "Patata al horno con piel",
        emoji: "🥔", mejor: true,
        kcal: 93, carbs: 21, azucares: 1, proteinas: 2.1, grasas: 0.1, grasasSat: 0, fibra: 2.2, sodio: 6,
        porque: "Misma base (patata) pero sin fritura: una fracción de las calorías y la grasa, conservando la fibra de la piel."
      }
    ]
  },
  {
    id: "embutido",
    nombre: "Embutido curado (chorizo/salchichón)",
    aliases: ["chorizo", "salchichon", "embutido", "salami"],
    categoria: "Cárnicos",
    emoji: "🌭",
    rating: "D",
    kcal: 455, carbs: 2, azucares: 0.5, proteinas: 24, grasas: 38, grasasSat: 14, fibra: 0, sodio: 1200,
    motivo: "Carne procesada rica en grasas saturadas y sodio; su consumo frecuente se asocia a mayor riesgo cardiovascular.",
    sustitutos: [
      {
        nombre: "Pechuga de pavo o pollo a la plancha",
        emoji: "🍗", mejor: true,
        kcal: 135, carbs: 0, azucares: 0, proteinas: 29, grasas: 3, grasasSat: 1, fibra: 0, sodio: 70,
        porque: "Mismo aporte de proteína con muchísima menos grasa saturada y sodio."
      }
    ]
  },
  {
    id: "bacon",
    nombre: "Bacon / panceta",
    aliases: ["bacon", "panceta", "beicon"],
    categoria: "Cárnicos",
    emoji: "🥓",
    rating: "E",
    kcal: 541, carbs: 1.4, azucares: 0, proteinas: 37, grasas: 42, grasasSat: 14, fibra: 0, sodio: 1700,
    motivo: "Muy alto en grasas saturadas y sodio, además de ser carne procesada; se recomienda un consumo ocasional.",
    sustitutos: [
      {
        nombre: "Jamón cocido bajo en sal o salmón ahumado (ración moderada)",
        emoji: "🍖", mejor: true,
        kcal: 145, carbs: 1.5, azucares: 0.5, proteinas: 21, grasas: 6, grasasSat: 2, fibra: 0, sodio: 650,
        porque: "Aporta el sabor ahumado/salado que se busca con bastante menos grasa saturada y sodio."
      }
    ]
  },
  {
    id: "jamon_serrano",
    nombre: "Jamón serrano",
    aliases: ["jamon serrano", "jamon iberico", "jamon curado"],
    categoria: "Cárnicos",
    emoji: "🍖",
    rating: "C",
    kcal: 241, carbs: 0.4, azucares: 0, proteinas: 30, grasas: 14, grasasSat: 5, fibra: 0, sodio: 2200,
    motivo: "Buena fuente de proteína y grasa mayoritariamente insaturada (sobre todo el ibérico), pero muy rico en sodio: modera la ración.",
    sustitutos: []
  },
  {
    id: "huevo",
    nombre: "Huevo",
    aliases: ["huevo", "huevos"],
    categoria: "Proteínas",
    emoji: "🥚",
    rating: "B",
    kcal: 155, carbs: 1.1, azucares: 1.1, proteinas: 13, grasas: 11, grasasSat: 3.3, fibra: 0, sodio: 124,
    motivo: "Proteína de alto valor biológico, vitaminas y minerales; buena opción dentro de una dieta variada.",
    sustitutos: []
  },
  {
    id: "chocolate_leche",
    nombre: "Chocolate con leche",
    aliases: ["chocolate con leche", "chocolate"],
    categoria: "Dulces",
    emoji: "🍫",
    rating: "D",
    kcal: 535, carbs: 59, azucares: 51, proteinas: 7.6, grasas: 30, grasasSat: 18, fibra: 3.4, sodio: 79,
    motivo: "Alto contenido en azúcar y grasa saturada, con poco cacao real en comparación con el chocolate negro.",
    sustitutos: [
      {
        nombre: "Chocolate negro ≥ 85% cacao",
        emoji: "🍫", mejor: true,
        kcal: 598, carbs: 22, azucares: 7, proteinas: 8, grasas: 43, grasasSat: 25, fibra: 11, sodio: 20,
        porque: "Mucho menos azúcar y más fibra y antioxidantes (flavonoides). Es igual de calórico, así que la clave es comer una porción pequeña (1-2 onzas)."
      }
    ]
  },
  {
    id: "chocolate_negro",
    nombre: "Chocolate negro ≥ 85%",
    aliases: ["chocolate negro", "chocolate 85", "chocolate amargo"],
    categoria: "Dulces",
    emoji: "🍫",
    rating: "B",
    kcal: 598, carbs: 22, azucares: 7, proteinas: 8, grasas: 43, grasasSat: 25, fibra: 11, sodio: 20,
    motivo: "Bajo en azúcar y rico en antioxidantes, aunque calórico: la ración recomendada es pequeña (1-2 onzas).",
    sustitutos: []
  },
  {
    id: "galletas",
    nombre: "Galletas tipo María / rellenas",
    aliases: ["galletas", "galletas maria", "galletas rellenas"],
    categoria: "Dulces",
    emoji: "🍪",
    rating: "D",
    kcal: 480, carbs: 65, azucares: 25, proteinas: 6.5, grasas: 20, grasasSat: 9, fibra: 2, sodio: 400,
    motivo: "Harina refinada, azúcar y grasas de baja calidad combinadas en un producto muy calórico y poco saciante.",
    sustitutos: [
      {
        nombre: "Avena + fruta + un poco de canela",
        emoji: "🥣", mejor: true,
        kcal: 200, carbs: 34, azucares: 8, proteinas: 6, grasas: 4, grasasSat: 0.6, fibra: 5, sodio: 5,
        porque: "Mucha más fibra y menos azúcar añadido, con un efecto saciante muy superior."
      }
    ]
  },
  {
    id: "cereales_azucarados",
    nombre: "Cereales de desayuno azucarados",
    aliases: ["cereales azucarados", "cereales de desayuno", "cereales infantiles"],
    categoria: "Cereales",
    emoji: "🥣",
    rating: "E",
    kcal: 380, carbs: 84, azucares: 37, proteinas: 6, grasas: 3, grasasSat: 1, fibra: 3, sodio: 500,
    motivo: "Gran cantidad de azúcar añadido y poca fibra pese a la apariencia de producto 'integral'.",
    sustitutos: [
      {
        nombre: "Avena integral sin azúcar",
        emoji: "🌾", mejor: true,
        kcal: 389, carbs: 66, azucares: 0.8, proteinas: 17, grasas: 7, grasasSat: 1.2, fibra: 10, sodio: 2,
        porque: "Muchísima más fibra y proteína, sin azúcares añadidos; endulza con fruta fresca si lo necesitas."
      }
    ]
  },
  {
    id: "avena",
    nombre: "Avena integral",
    aliases: ["avena", "copos de avena"],
    categoria: "Cereales",
    emoji: "🌾",
    rating: "A",
    kcal: 389, carbs: 66, azucares: 0.8, proteinas: 17, grasas: 7, grasasSat: 1.2, fibra: 10, sodio: 2,
    motivo: "Excelente aporte de fibra soluble (beta-glucanos) y proteína vegetal.",
    sustitutos: []
  },
  {
    id: "ketchup",
    nombre: "Kétchup",
    aliases: ["ketchup", "catsup"],
    categoria: "Salsas",
    emoji: "🍅",
    rating: "D",
    kcal: 112, carbs: 27, azucares: 22, proteinas: 1.2, grasas: 0.2, grasasSat: 0, fibra: 0.4, sodio: 900,
    motivo: "Buena parte de su peso es azúcar añadido, además de ser rico en sodio.",
    sustitutos: [
      {
        nombre: "Salsa de tomate casera sin azúcar añadido",
        emoji: "🍅", mejor: true,
        kcal: 32, carbs: 6, azucares: 3.9, proteinas: 1.3, grasas: 0.4, grasasSat: 0.1, fibra: 1.4, sodio: 50,
        porque: "Conserva el sabor a tomate con una fracción del azúcar y el sodio."
      }
    ]
  },
  {
    id: "crema_cacahuete_azucarada",
    nombre: "Crema de cacao y avellanas azucarada",
    aliases: ["nutella", "crema de cacao", "crema de cacao y avellanas"],
    categoria: "Dulces",
    emoji: "🍫",
    rating: "E",
    kcal: 539, carbs: 57, azucares: 56.8, proteinas: 6, grasas: 31, grasasSat: 10.6, fibra: 3.4, sodio: 40,
    motivo: "El azúcar es el primer ingrediente, con grasas de baja calidad y muy poco cacao real.",
    sustitutos: [
      {
        nombre: "Crema de cacahuete 100% natural",
        emoji: "🥜", mejor: true,
        kcal: 588, carbs: 20, azucares: 4.5, proteinas: 25, grasas: 50, grasasSat: 9, fibra: 8, sodio: 5,
        porque: "Sin azúcares añadidos ni aceite de palma, con mucha más proteína y fibra. Sigue siendo calórica: usa una cucharada, no un bote."
      }
    ]
  },
  {
    id: "frutos_secos_salados",
    nombre: "Frutos secos fritos y salados",
    aliases: ["frutos secos fritos", "frutos secos salados", "cacahuetes fritos"],
    categoria: "Snacks",
    emoji: "🥜",
    rating: "C",
    kcal: 607, carbs: 19, azucares: 3, proteinas: 22, grasas: 52, grasasSat: 8, fibra: 6, sodio: 500,
    motivo: "La fritura y la sal añaden calorías y sodio innecesarios a un alimento que ya es saludable en su versión natural.",
    sustitutos: [
      {
        nombre: "Frutos secos crudos o tostados sin sal",
        emoji: "🌰", mejor: true,
        kcal: 580, carbs: 16, azucares: 4, proteinas: 21, grasas: 50, grasasSat: 5, fibra: 8, sodio: 3,
        porque: "Mismo aperitivo saciante y rico en grasas saludables, sin el exceso de sodio ni el aceite de fritura."
      }
    ]
  },
  {
    id: "helado",
    nombre: "Helado de crema",
    aliases: ["helado", "helado de crema", "helado de vainilla"],
    categoria: "Dulces",
    emoji: "🍨",
    rating: "D",
    kcal: 207, carbs: 24, azucares: 21, proteinas: 3.5, grasas: 11, grasasSat: 7, fibra: 0.7, sodio: 80,
    motivo: "Combinación de azúcar y grasa saturada en un formato muy fácil de comer en exceso.",
    sustitutos: [
      {
        nombre: "Yogur griego helado con fruta congelada",
        emoji: "🍧", mejor: true,
        kcal: 100, carbs: 12, azucares: 9, proteinas: 8, grasas: 2, grasasSat: 1, fibra: 1.5, sodio: 40,
        porque: "Textura cremosa similar, con más proteína y menos grasa saturada y azúcar."
      }
    ]
  },
  {
    id: "harina_blanca",
    nombre: "Harina de trigo blanca",
    aliases: ["harina blanca", "harina de trigo", "harina refinada"],
    categoria: "Cereales",
    emoji: "🌾",
    rating: "C",
    kcal: 364, carbs: 76, azucares: 0.3, proteinas: 10, grasas: 1, grasasSat: 0.2, fibra: 2.7, sodio: 2,
    motivo: "Al refinarse pierde la mayor parte de la fibra y los micronutrientes del grano original.",
    sustitutos: [
      {
        nombre: "Harina integral",
        emoji: "🌾", mejor: true,
        kcal: 340, carbs: 72, azucares: 0.4, proteinas: 13, grasas: 2.5, grasasSat: 0.4, fibra: 10.7, sodio: 2,
        porque: "Cuatro veces más fibra que la harina blanca, con más proteína y micronutrientes, para el mismo tipo de recetas."
      }
    ]
  },
  {
    id: "mermelada",
    nombre: "Mermelada azucarada",
    aliases: ["mermelada", "confitura"],
    categoria: "Dulces",
    emoji: "🍓",
    rating: "D",
    kcal: 278, carbs: 69, azucares: 65, proteinas: 0.4, grasas: 0.1, grasasSat: 0, fibra: 1, sodio: 20,
    motivo: "Gran parte del peso es azúcar añadido, muy por encima del que tendría la fruta original.",
    sustitutos: [
      {
        nombre: "Mermelada 100% fruta sin azúcar añadido",
        emoji: "🍓", mejor: true,
        kcal: 120, carbs: 27, azucares: 20, proteinas: 0.6, grasas: 0.1, grasasSat: 0, fibra: 1.8, sodio: 5,
        porque: "El dulzor viene solo de la fruta: menos de la mitad de azúcar que la versión convencional."
      }
    ]
  },
  {
    id: "salmon",
    nombre: "Salmón (pescado azul)",
    aliases: ["salmon", "pescado azul"],
    categoria: "Proteínas",
    emoji: "🐟",
    rating: "A",
    kcal: 208, carbs: 0, azucares: 0, proteinas: 20, grasas: 13, grasasSat: 3.1, fibra: 0, sodio: 59,
    motivo: "Excelente fuente de proteína y de ácidos grasos omega-3 con propiedades antiinflamatorias.",
    sustitutos: []
  },
  {
    id: "aguacate",
    nombre: "Aguacate",
    aliases: ["aguacate", "palta"],
    categoria: "Grasas",
    emoji: "🥑",
    rating: "A",
    kcal: 160, carbs: 8.5, azucares: 0.7, proteinas: 2, grasas: 15, grasasSat: 2.1, fibra: 6.7, sodio: 7,
    motivo: "Grasa mayoritariamente monoinsaturada acompañada de mucha fibra y potasio.",
    sustitutos: []
  },
  {
    id: "bebida_energetica",
    nombre: "Bebida energética",
    aliases: ["bebida energetica", "energy drink"],
    categoria: "Bebidas",
    emoji: "⚡",
    rating: "E",
    kcal: 45, carbs: 11, azucares: 11, proteinas: 0.4, grasas: 0, grasasSat: 0, fibra: 0, sodio: 20,
    motivo: "Azúcar rápido combinado con altas dosis de cafeína y otros estimulantes.",
    sustitutos: [
      {
        nombre: "Café solo o té verde",
        emoji: "☕", mejor: true,
        kcal: 1, carbs: 0, azucares: 0, proteinas: 0.1, grasas: 0, grasasSat: 0, fibra: 0, sodio: 2,
        porque: "Aporta el efecto estimulante de la cafeína sin azúcar ni calorías añadidas."
      }
    ]
  }
];

// Normaliza texto: minúsculas y sin acentos, para poder comparar alias e input del usuario.
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

// Índice alias normalizado -> alimento, ordenado por longitud de alias descendente
// para que "pan integral" se detecte antes que "pan".
const INDICE_ALIAS = FOODS.flatMap(food =>
  food.aliases.map(alias => ({ alias: normalizar(alias), food }))
).sort((a, b) => b.alias.length - a.alias.length);
