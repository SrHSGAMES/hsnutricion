/* HSNutrición — Base de datos nutricional
   Valores de referencia por 100 g (aproximados, fuentes tipo USDA/BEDCA).
   Uso educativo: no sustituye la valoración de un profesional sanitario. */

const FOODS = [
  {
    id: "mantequilla",
    nombre: "Mantequilla",
    aliases: ["mantequilla", "manteca de leche", "butter"],
    categorias: ["Grasas"],
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
    categorias: ["Grasas"],
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
    categorias: ["Grasas"],
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
    categorias: ["Grasas"],
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
    categorias: ["Cereales"],
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
    categorias: ["Cereales"],
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
    categorias: ["Cereales"],
    emoji: "🍚",
    rating: "C",
    kcal: 130, carbs: 28, azucares: 0.1, proteinas: 2.7, grasas: 0.3, grasasSat: 0.1, fibra: 0.4, sodio: 1,
    motivo: "El arroz blanco cocido obtiene una calificación C debido a que, al ser un cereal refinado, pierde la mayor parte de su fibra (aportando apenas 0.4 g por 100 g) y micronutrientes, lo que resulta en un aporte mayoritario de carbohidratos de rápida asimilación. Su consumo habitual y aislado puede elevar rápidamente la glucemia, a diferencia de las opciones integrales cuyo consumo se asocia con una reducción del riesgo de enfermedades cardiovasculares [3] y diabetes [4]. No obstante, representa un alimento básico muy importante para la nutrición global [2] y su respuesta glucémica se puede mejorar significativamente mediante su enfriamiento previo al consumo, proceso que aumenta el almidón resistente [1]. Por ello, se considera una opción neutra que se aconseja combinar con verduras, grasas saludables y proteínas para equilibrar el plato.",
    estudios: [
      {
        "pmid": "26693746",
        "titulo": "Effect of cooling of cooked white rice on resistant starch content and glycemic response.",
        "revista": "Asia Pacific journal of clinical nutrition",
        "anio": "2015",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26693746/"
      },
      {
        "pmid": "31619630",
        "titulo": "Rice: Importance for Global Nutrition.",
        "revista": "Journal of nutritional science and vitaminology",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31619630/"
      },
      {
        "pmid": "27301975",
        "titulo": "Whole grain consumption and risk of cardiovascular disease, cancer, and all cause and cause specific mortality: systematic review and dose-response meta-analysis of prospective studies.",
        "revista": "BMJ (Clinical research ed.)",
        "anio": "2016",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27301975/"
      },
      {
        "pmid": "21617109",
        "titulo": "Globalization of diabetes: the role of diet, lifestyle, and genes.",
        "revista": "Diabetes care",
        "anio": "2011",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21617109/"
      }
    ],
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
    categorias: ["Cereales"],
    emoji: "🌾",
    rating: "A",
    kcal: 123, carbs: 25.8, azucares: 0.2, proteinas: 2.6, grasas: 1, grasasSat: 0.2, fibra: 1.8, sodio: 4,
    motivo: "El arroz integral cocido recibe la calificación A porque es una fuente excelente de carbohidratos complejos que aporta energía sostenida con un contenido casi nulo de azúcares, sodio y grasas saturadas. Al conservar el grano entero, destaca por su perfil fitoquímico [3] y por ser una fuente de nutrientes esenciales como el magnesio, fósforo, selenio, tiamina y niacina [1]. Además, su consumo regular frente al arroz blanco se asocia con un menor riesgo de desarrollar diabetes tipo 2 [4]. Su aporte de fibra y su densidad nutricional lo consolidan como un alimento básico y muy saludable para el día a día.",
    estudios: [
      {
        "pmid": "31619630",
        "titulo": "Rice: Importance for Global Nutrition.",
        "revista": "Journal of nutritional science and vitaminology",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31619630/"
      },
      {
        "pmid": "37521417",
        "titulo": "Arsenic in brown rice: do the benefits outweigh the risks?",
        "revista": "Frontiers in nutrition",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37521417/"
      },
      {
        "pmid": "29789516",
        "titulo": "Phytochemical Profile of Brown Rice and Its Nutrigenomic Implications.",
        "revista": "Antioxidants (Basel, Switzerland)",
        "anio": "2018",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29789516/"
      },
      {
        "pmid": "36167362",
        "titulo": "White rice, brown rice and the risk of type 2 diabetes: a systematic review and meta-analysis.",
        "revista": "BMJ open",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36167362/"
      }
    ],
    sustitutos: []
  },
  {
    id: "pasta_blanca",
    nombre: "Pasta blanca (cocida)",
    aliases: ["pasta blanca", "pasta", "macarrones", "espaguetis"],
    categorias: ["Cereales"],
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
    categorias: ["Cereales"],
    emoji: "🌾",
    rating: "A",
    kcal: 124, carbs: 25, azucares: 0.8, proteinas: 5.3, grasas: 1.1, grasasSat: 0.2, fibra: 3.9, sodio: 3,
    motivo: "La pasta integral cocida merece la calificación A gracias a su excelente perfil nutricional, aportando energía de forma saludable mediante carbohidratos complejos con un contenido mínimo de grasas y sodio. Destaca especialmente por su aporte de fibra (3.9 g por 100 g) y proteínas, nutrientes esenciales para la salud digestiva y la regulación del tránsito intestinal. Además, se ha demostrado científicamente que el consumo de pasta integral ayuda a reducir el apetito de manera aguda [4]. Todo esto la convierte en una opción idónea, altamente saciante y nutritiva para incorporar de forma habitual en nuestra dieta.",
    estudios: [
      {
        "pmid": "37628038",
        "titulo": "Algae Incorporation and Nutritional Improvement: The Case of a Whole-Wheat Pasta.",
        "revista": "Foods (Basel, Switzerland)",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37628038/"
      },
      {
        "pmid": "31162597",
        "titulo": "Glucose- and Lipid-Related Biomarkers Are Affected in Healthy Obese or Hyperglycemic Adults Consuming a Whole-Grain Pasta Enriched in Prebiotics and Probiotics: A 12-Week Randomized Controlled Trial.",
        "revista": "The Journal of nutrition",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31162597/"
      },
      {
        "pmid": "30888310",
        "titulo": "Ingredient bundles and recipe tastings in food pantries: a pilot study to increase the selection of healthy foods.",
        "revista": "Public health nutrition",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30888310/"
      },
      {
        "pmid": "26863235",
        "titulo": "Whole-grain pasta reduces appetite and meal-induced thermogenesis acutely: a pilot study.",
        "revista": "Applied physiology, nutrition, and metabolism = Physiologie appliquee, nutrition et metabolisme",
        "anio": "2016",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26863235/"
      }
    ],
    sustitutos: []
  },
  {
    id: "azucar",
    nombre: "Azúcar blanco",
    aliases: ["azucar blanco", "azucar", "azucar de mesa"],
    categorias: ["Dulces"],
    emoji: "🍬",
    rating: "E",
    kcal: 387, carbs: 100, azucares: 100, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 0,
    motivo: "El azúcar blanco recibe la calificación E debido a que está compuesto en su totalidad por hidratos de carbono simples, aportando una alta densidad energética (387 kcal por 100 g) sin ningún valor nutricional añadido como fibra, proteínas o grasas. Su consumo excesivo favorece el desarrollo de procesos inflamatorios sistémicos [2] y está fuertemente vinculado con el aumento de patologías cardiovasculares, obesidad y diabetes [3]. Además, la ingesta elevada de azúcares se asocia directamente con el desarrollo de hígado graso no alcohólico [4]. Por estas razones, y considerando también el impacto de los azúcares añadidos en el desarrollo de la obesidad y otras afecciones crónicas [1], se recomienda evitar o reducir drásticamente su consumo.",
    estudios: [
      {
        "pmid": "35064240",
        "titulo": "The role of sugar-sweetened beverages in the global epidemics of obesity and chronic diseases.",
        "revista": "Nature reviews. Endocrinology",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35064240/"
      },
      {
        "pmid": "36119103",
        "titulo": "Excessive intake of sugar: An accomplice of inflammation.",
        "revista": "Frontiers in immunology",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36119103/"
      },
      {
        "pmid": "26746178",
        "titulo": "Dietary and Policy Priorities for Cardiovascular Disease, Diabetes, and Obesity: A Comprehensive Review.",
        "revista": "Circulation",
        "anio": "2016",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26746178/"
      },
      {
        "pmid": "29408694",
        "titulo": "Fructose and sugar: A major mediator of non-alcoholic fatty liver disease.",
        "revista": "Journal of hepatology",
        "anio": "2018",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29408694/"
      }
    ],
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
    categorias: ["Dulces"],
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
    categorias: ["Lácteos"],
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
    categorias: ["Lácteos"],
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
    categorias: ["Lácteos"],
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
    categorias: ["Lácteos"],
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
    categorias: ["Lácteos"],
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
    categorias: ["Lácteos"],
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
    categorias: ["Lácteos"],
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
    categorias: ["Salsas"],
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
    categorias: ["Bebidas"],
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
    categorias: ["Bebidas"],
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
    categorias: ["Snacks"],
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
    categorias: ["Cárnicos"],
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
    categorias: ["Cárnicos"],
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
    categorias: ["Cárnicos", "Proteínas"],
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
    categorias: ["Proteínas"],
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
    categorias: ["Dulces"],
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
    categorias: ["Dulces"],
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
    categorias: ["Dulces"],
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
    categorias: ["Cereales"],
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
    categorias: ["Cereales"],
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
    categorias: ["Salsas"],
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
    categorias: ["Dulces", "Untables"],
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
    categorias: ["Frutos Secos"],
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
    categorias: ["Dulces"],
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
    categorias: ["Cereales"],
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
    categorias: ["Dulces"],
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
    categorias: ["Proteínas"],
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
    categorias: ["Grasas", "Frutas"],
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
    categorias: ["Bebidas"],
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
  },
  {
    id: "remolacha",
    nombre: "Remolacha",
    aliases: ["remolacha", "remolachas"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🫜",
    rating: "A",
    kcal: 43, carbs: 9.6, azucares: 6.8, proteinas: 1.6, grasas: 0.2, grasasSat: 0.03, fibra: 2.8, sodio: 78,
    motivo: "Raíz muy baja en calorías y rica en fibra, con un contenido natural de nitratos dietéticos asociado a la mejora de la función vascular y la presión arterial, y de betalaínas —los pigmentos responsables de su color— con capacidad antioxidante. Su azúcar es propio de la hortaliza, no añadido, y va acompañado de fibra que modera su absorción.",
    sustitutos: []
  },
  {
    id: "arandanos",
    nombre: "Arándanos",
    aliases: ["arandanos", "arándano", "arandano"],
    categorias: ["Frutas"],
    emoji: "🫐",
    rating: "A",
    kcal: 57, carbs: 14.5, azucares: 10, proteinas: 0.7, grasas: 0.3, grasasSat: 0.03, fibra: 2.4, sodio: 1,
    motivo: "Una de las frutas con mayor densidad de antocianinas, los polifenoles responsables de su color y de buena parte de su capacidad antioxidante, asociada a beneficios cardiovasculares y cognitivos. Su azúcar es propio de la fruta, no añadido, y viene acompañado de fibra que ayuda a moderar su absorción.",
    sustitutos: []
  },
  {
    id: "fresas",
    nombre: "Fresas",
    aliases: ["fresas", "fresa", "frutillas"],
    categorias: ["Frutas"],
    emoji: "🍓",
    rating: "A",
    kcal: 32, carbs: 7.7, azucares: 4.9, proteinas: 0.7, grasas: 0.3, grasasSat: 0.02, fibra: 2, sodio: 1,
    motivo: "Muy baja en calorías y azúcar para tratarse de una fruta, con un aporte destacado de vitamina C y polifenoles antioxidantes. Su dulzor natural, junto a la fibra que aporta, la convierte en una alternativa excelente a postres y toppings con azúcar añadido.",
    sustitutos: []
  },
  {
    id: "frambuesas",
    nombre: "Frambuesas",
    aliases: ["frambuesas", "frambuesa"],
    categorias: ["Frutas"],
    emoji: "🍒",
    rating: "A",
    kcal: 52, carbs: 11.9, azucares: 4.4, proteinas: 1.2, grasas: 0.7, grasasSat: 0.02, fibra: 6.5, sodio: 1,
    motivo: "Destaca por su altísimo contenido en fibra para ser una fruta (6.5 g/100 g), muy por encima de otros frutos rojos, lo que modera aún más la absorción de su ya bajo contenido en azúcar. Aporta también vitamina C y antioxidantes de la familia de los elagitaninos.",
    sustitutos: []
  },
  {
    id: "cacao_puro",
    nombre: "Cacao puro en polvo",
    aliases: ["cacao puro", "cacao en polvo", "cacao puro en polvo", "cacao desgrasado"],
    categorias: ["Dulces"],
    emoji: "🍫",
    rating: "A",
    kcal: 228, carbs: 58, azucares: 1.8, proteinas: 19.6, grasas: 13.7, grasasSat: 8.1, fibra: 33, sodio: 21,
    motivo: "Sin azúcar añadido (a diferencia de los cacaos solubles comerciales) y con una cantidad de fibra excepcional para cualquier alimento, no solo para un dulce. Es muy rico en flavonoides, unos antioxidantes asociados a la salud cardiovascular, y aporta hierro y magnesio en cantidades destacables.",
    sustitutos: []
  },
  {
    id: "lechuga",
    nombre: "Lechuga",
    aliases: ["lechuga", "lechuga romana", "lechuga iceberg"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🥬",
    rating: "A",
    kcal: 15, carbs: 2.9, azucares: 1.2, proteinas: 1.4, grasas: 0.2, grasasSat: 0.03, fibra: 1.3, sodio: 8,
    motivo: "Prácticamente solo agua y fibra, con muy pocas calorías: aporta volumen y textura crujiente sin apenas impacto calórico. Suma también folato y vitamina K.",
    sustitutos: []
  },
  {
    id: "levadura_panaderia",
    nombre: "Levadura de panadería",
    aliases: ["levadura de panaderia", "levadura fresca", "levadura seca de panaderia", "levadura de pan"],
    categorias: ["Cereales"],
    emoji: "🍞",
    rating: "A",
    kcal: 325, carbs: 41, azucares: 0, proteinas: 40, grasas: 7.6, grasasSat: 1.5, fibra: 27, sodio: 51,
    motivo: "Se usa en cantidades tan pequeñas (unos pocos gramos por receta) que su aporte real de calorías y nutrientes es insignificante frente al resto de ingredientes; su función aquí es fermentar la masa, no nutrir.",
    sustitutos: []
  },
  {
    id: "edamame",
    nombre: "Edamame",
    aliases: ["edamame", "soja verde", "habas de soja"],
    categorias: ["Proteína vegetal"],
    emoji: "🫛",
    rating: "A",
    kcal: 121, carbs: 10, azucares: 2.2, proteinas: 12, grasas: 5, grasasSat: 0.6, fibra: 5, sodio: 6,
    motivo: "Legumbre inmadura muy rica en proteína vegetal completa para tratarse de una verdura, además de fibra y ácido fólico. Su perfil de grasas es mayoritariamente insaturado.",
    sustitutos: []
  },
  {
    id: "pepino",
    nombre: "Pepino",
    aliases: ["pepino", "pepinos"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🥒",
    rating: "A",
    kcal: 15, carbs: 3.6, azucares: 1.7, proteinas: 0.7, grasas: 0.1, grasasSat: 0.02, fibra: 0.5, sodio: 2,
    motivo: "Prácticamente solo agua, con muy pocas calorías y carbohidratos: aporta frescura y volumen sin apenas impacto calórico. Contiene también pequeñas cantidades de vitamina K.",
    sustitutos: []
  },
  {
    id: "salsa_soja_baja_sodio",
    nombre: "Salsa de soja (baja en sodio)",
    aliases: ["salsa de soja baja en sodio", "salsa soja light", "soja baja en sodio"],
    categorias: ["Salsas"],
    emoji: "🍶",
    rating: "B",
    kcal: 53, carbs: 4.9, azucares: 0.4, proteinas: 8, grasas: 0.1, grasasSat: 0, fibra: 0.8, sodio: 3300,
    motivo: "Incluso en su versión \"baja en sodio\", la salsa de soja sigue siendo uno de los condimentos más concentrados en sodio que existen, así que un poco da mucho sabor: se usa en cantidades pequeñas (una cucharada aporta ya un tercio de su sodio por 100 g). Preferible siempre a la versión normal, que puede duplicar esa cifra.",
    sustitutos: []
  },
  {
    id: "matcha",
    nombre: "Matcha en polvo",
    aliases: ["matcha", "te matcha", "té matcha en polvo"],
    categorias: ["Bebidas"],
    emoji: "🍵",
    rating: "A",
    kcal: 324, carbs: 39, azucares: 0, proteinas: 30, grasas: 5, grasasSat: 1, fibra: 38, sodio: 6,
    motivo: "Al tomarse la hoja de té entera molida, el matcha concentra mucha más cafeína y antioxidantes (catequinas, especialmente EGCG) que un té verde infusionado normal. Se usa en cantidades muy pequeñas (1-2 g por taza), así que su aporte calórico real en la bebida es mínimo.",
    sustitutos: []
  },
  {
    id: "pistachos",
    nombre: "Pistachos",
    aliases: ["pistachos", "pistacho"],
    categorias: ["Frutos Secos"],
    emoji: "🥜",
    rating: "A",
    kcal: 560, carbs: 28, azucares: 7.7, proteinas: 20, grasas: 45, grasasSat: 5.4, fibra: 10, sodio: 1,
    motivo: "Fruto seco con un perfil graso mayoritariamente insaturado, buena fuente de proteína vegetal y fibra, y uno de los frutos secos con más potasio y luteína (un antioxidante). Como cualquier fruto seco, es denso en calorías, así que conviene medir la ración.",
    sustitutos: []
  },
  {
    id: "kataifi",
    nombre: "Kataifi (pasta filo en hebras)",
    aliases: ["kataifi", "kadayif", "cabello de angel pasta filo"],
    categorias: ["Cereales"],
    emoji: "🍜",
    rating: "B",
    kcal: 356, carbs: 58, azucares: 2, proteinas: 9, grasas: 9, grasasSat: 2, fibra: 2, sodio: 540,
    motivo: "Es esencialmente harina de trigo en hebras muy finas, similar a la pasta filo: no aporta nada nutricionalmente destacable por sí sola, y concentra bastante sodio propio de la masa. Su papel aquí es dar textura crujiente, no nutrir; se usa en poca cantidad y siempre tostada con muy poco aceite en vez de la mantequilla abundante habitual.",
    sustitutos: []
  },
  {
    id: "tortilla_maiz",
    nombre: "Tortilla de maíz",
    aliases: ["tortilla de maiz", "tortillas de maiz", "tortita de maiz"],
    categorias: ["Cereales"],
    emoji: "🌽",
    rating: "A",
    kcal: 218, carbs: 44.6, azucares: 0.9, proteinas: 5.7, grasas: 2.9, grasasSat: 0.4, fibra: 6.4, sodio: 15,
    motivo: "Al ser de maíz entero nixtamalizado y no de trigo refinado, no contiene gluten de forma natural y aporta más fibra que una tortilla de trigo blanca. Es también mucho más baja en sodio que la mayoría de panes y tortillas de trigo comerciales.",
    sustitutos: []
  },
  {
    id: "lima",
    nombre: "Lima",
    aliases: ["lima", "limas", "zumo de lima"],
    categorias: ["Frutas"],
    emoji: "🍋",
    rating: "A",
    kcal: 30, carbs: 10.5, azucares: 1.7, proteinas: 0.7, grasas: 0.2, grasasSat: 0.02, fibra: 2.8, sodio: 2,
    motivo: "Muy baja en calorías, aporta un aporte notable de vitamina C y compuestos ácidos que realzan el sabor de un plato sin necesidad de añadir sal ni azúcar.",
    sustitutos: []
  },
  {
    id: "cilantro",
    nombre: "Cilantro",
    aliases: ["cilantro", "culantro"],
    categorias: ["Condimentos y Aditivos", "Verduras y Hortalizas"],
    emoji: "🌿",
    rating: "A",
    kcal: 23, carbs: 3.7, azucares: 0.9, proteinas: 2.1, grasas: 0.5, grasasSat: 0.01, fibra: 2.8, sodio: 46,
    motivo: "Hierba aromática muy baja en calorías, con vitaminas A, C y K, y compuestos antioxidantes. Se usa en cantidades pequeñas como toque final de sabor, no como fuente relevante de nutrientes.",
    sustitutos: []
  },
  {
    id: "calabacin",
    nombre: "Calabacín",
    aliases: ["calabacin", "calabacines"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🥒",
    rating: "A",
    kcal: 17, carbs: 3.1, azucares: 2.5, proteinas: 1.2, grasas: 0.3, grasasSat: 0.1, fibra: 1, sodio: 8,
    motivo: "Hortaliza muy baja en calorías, compuesta mayoritariamente por agua, con un aporte destacable de vitamina C y potasio. Aporta volumen y textura a guisos y cremas sin apenas impacto calórico.",
    sustitutos: []
  },
  {
    id: "puerro",
    nombre: "Puerro",
    aliases: ["puerro", "puerros"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🧅",
    rating: "A",
    kcal: 61, carbs: 14.2, azucares: 3.9, proteinas: 1.5, grasas: 0.3, grasasSat: 0.04, fibra: 1.8, sodio: 20,
    motivo: "De la misma familia que la cebolla y el ajo, aporta compuestos organosulfurados y flavonoides con propiedades antioxidantes, junto con vitamina K y folato. Da mucho sabor de base a sofritos, caldos y cremas.",
    sustitutos: []
  },
  {
    id: "curcuma",
    nombre: "Cúrcuma",
    aliases: ["curcuma", "cúrcuma en polvo"],
    categorias: ["Condimentos y Aditivos"],
    emoji: "🌕",
    rating: "A",
    kcal: 312, carbs: 67, azucares: 3.2, proteinas: 9.7, grasas: 3.3, grasasSat: 2.1, fibra: 23, sodio: 27,
    motivo: "Debe su color y buena parte de sus propiedades a la curcumina, un compuesto con potencial antiinflamatorio y antioxidante ampliamente estudiado. Su absorción mejora notablemente cuando se combina con pimienta negra, por la piperina que esta contiene. Se usa en cantidades muy pequeñas, así que su aporte calórico real en un plato es insignificante.",
    sustitutos: []
  },
  {
    id: "pimienta_negra",
    nombre: "Pimienta negra",
    aliases: ["pimienta negra", "pimienta molida", "pimienta"],
    categorias: ["Condimentos y Aditivos"],
    emoji: "🌶️",
    rating: "A",
    kcal: 251, carbs: 64, azucares: 0.6, proteinas: 10, grasas: 3.3, grasasSat: 1.4, fibra: 25, sodio: 20,
    motivo: "Aporta piperina, un compuesto que potencia notablemente la absorción de la curcumina de la cúrcuma y de otros compuestos bioactivos. Se usa en cantidades tan pequeñas que su aporte nutricional real es insignificante frente a su función de realzar sabor y absorción de otros ingredientes.",
    sustitutos: []
  },
  {
    id: "tahini",
    nombre: "Tahini (pasta de sésamo)",
    aliases: ["tahini", "pasta de sesamo", "tahina"],
    categorias: ["Untables"],
    emoji: "🌰",
    rating: "B",
    kcal: 595, carbs: 18, azucares: 0.5, proteinas: 17, grasas: 54, grasasSat: 7.5, fibra: 9.3, sodio: 115,
    motivo: "Al ser semillas de sésamo molidas sin nada añadido, aporta grasas mayoritariamente insaturadas, proteína vegetal y minerales como calcio y hierro. Es denso en calorías como cualquier fruto seco o semilla en pasta, así que conviene medir la cantidad.",
    sustitutos: []
  },
  {
    id: "limon",
    nombre: "Limón",
    aliases: ["limon", "limones", "zumo de limon"],
    categorias: ["Frutas"],
    emoji: "🍋",
    rating: "A",
    kcal: 29, carbs: 9.3, azucares: 2.5, proteinas: 1.1, grasas: 0.3, grasasSat: 0.03, fibra: 2.8, sodio: 2,
    motivo: "Muy bajo en calorías, con un aporte notable de vitamina C. Su acidez realza el sabor de un plato sin necesidad de añadir sal.",
    sustitutos: []
  },
  {
    id: "comino",
    nombre: "Comino",
    aliases: ["comino", "comino molido"],
    categorias: ["Condimentos y Aditivos"],
    emoji: "🌿",
    rating: "A",
    kcal: 375, carbs: 44, azucares: 2.3, proteinas: 18, grasas: 22, grasasSat: 1.5, fibra: 11, sodio: 168,
    motivo: "Especia con compuestos bioactivos (cuminaldehído) estudiados por su posible efecto beneficioso sobre la digestión y el control de la glucemia. Se usa en cantidades muy pequeñas, así que su aporte calórico real en un plato es insignificante.",
    sustitutos: []
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
