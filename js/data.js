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
  },
  {
    id: "laurel",
    nombre: "Laurel",
    aliases: ["laurel", "hojas de laurel", "hoja de laurel"],
    categorias: ["Condimentos y Aditivos"],
    emoji: "🌿",
    rating: "A",
    kcal: 313, carbs: 75, azucares: 0, proteinas: 7.6, grasas: 8.4, grasasSat: 2.3, fibra: 26, sodio: 23,
    motivo: "Se usa entera (1-2 hojas) solo para aromatizar durante la cocción y luego se retira, así que su aporte nutricional real en el plato es prácticamente nulo.",
    sustitutos: []
  },
  {
    id: "pimenton",
    nombre: "Pimentón",
    aliases: ["pimenton", "pimentón dulce", "pimentón de la vera", "paprika"],
    categorias: ["Condimentos y Aditivos"],
    emoji: "🌶️",
    rating: "A",
    kcal: 282, carbs: 54, azucares: 10, proteinas: 14, grasas: 13, grasasSat: 2, fibra: 35, sodio: 68,
    motivo: "Elaborado a partir de pimientos secos y molidos, conserva buena parte de los carotenoides y la capsantina responsables de su color, con capacidad antioxidante. Se usa en cantidades muy pequeñas, así que su aporte calórico real en un plato es insignificante.",
    sustitutos: []
  },
  {
    id: "soja_texturizada",
    nombre: "Soja texturizada (deshidratada)",
    aliases: ["soja texturizada", "proteina de soja texturizada", "tvp"],
    categorias: ["Proteína vegetal"],
    emoji: "🫘",
    rating: "A",
    kcal: 337, carbs: 30, azucares: 8, proteinas: 52, grasas: 1, grasasSat: 0.1, fibra: 18, sodio: 8,
    motivo: "Se obtiene de la harina de soja desgrasada, así que concentra muchísima proteína vegetal completa y fibra con muy poca grasa. Se vende deshidratada y se rehidrata en agua o caldo antes de cocinarla, absorbiendo el sabor del plato al que se añade.",
    sustitutos: []
  },
  {
    id: "apio",
    nombre: "Apio",
    aliases: ["apio", "apios"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🥬",
    rating: "A",
    kcal: 16, carbs: 3, azucares: 1.8, proteinas: 0.7, grasas: 0.2, grasasSat: 0.04, fibra: 1.6, sodio: 80,
    motivo: "Hortaliza muy baja en calorías, compuesta mayoritariamente por agua. Es uno de los tres ingredientes clásicos del sofrito base (junto con cebolla y zanahoria) en muchas cocinas, aportando un sabor característico.",
    sustitutos: []
  },
  {
    id: "oregano",
    nombre: "Orégano",
    aliases: ["oregano", "oregano seco"],
    categorias: ["Condimentos y Aditivos"],
    emoji: "🌿",
    rating: "A",
    kcal: 265, carbs: 69, azucares: 4.1, proteinas: 9, grasas: 4.3, grasasSat: 1.6, fibra: 42.5, sodio: 25,
    motivo: "Hierba aromática con compuestos fenólicos (como el carvacrol) de capacidad antioxidante. Se usa en cantidades muy pequeñas, así que su aporte calórico real en un plato es insignificante.",
    sustitutos: []
  },
  {
    id: "setas",
    nombre: "Setas",
    aliases: ["setas", "champiñones", "champinones", "champiñon"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🍄",
    rating: "A",
    kcal: 22, carbs: 3.3, azucares: 2, proteinas: 3.1, grasas: 0.3, grasasSat: 0.05, fibra: 1, sodio: 5,
    motivo: "Muy bajas en calorías, con un perfil de aminoácidos poco habitual entre las verduras y compuestos como los betaglucanos, con posible efecto beneficioso sobre el sistema inmunitario. Aportan también vitaminas del grupo B y minerales como el selenio.",
    sustitutos: []
  },
  {
    id: "espinacas",
    nombre: "Espinacas",
    aliases: ["espinacas", "espinaca"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🥬",
    rating: "A",
    kcal: 23, carbs: 3.6, azucares: 0.4, proteinas: 2.9, grasas: 0.4, grasasSat: 0.06, fibra: 2.2, sodio: 79,
    motivo: "Verdura de hoja verde muy densa en nutrientes para su escaso aporte calórico: hierro, folato y vitaminas A y K en cantidades destacables, además de luteína, un antioxidante relacionado con la salud ocular.",
    sustitutos: []
  },
  {
    id: "nuez_moscada",
    nombre: "Nuez moscada",
    aliases: ["nuez moscada", "nuez moscada molida"],
    categorias: ["Condimentos y Aditivos"],
    emoji: "🌰",
    rating: "A",
    kcal: 525, carbs: 49, azucares: 28, proteinas: 5.8, grasas: 36, grasasSat: 26, fibra: 21, sodio: 16,
    motivo: "Se usa siempre en cantidades mínimas (una pizca), así que su aporte nutricional real en un plato es insignificante; su función aquí es aromatizar salsas cremosas con verduras de hoja verde, un maridaje clásico.",
    sustitutos: []
  },
  {
    id: "yogur_soja",
    nombre: "Yogur de soja",
    aliases: ["yogur de soja", "yogur soja sin azucar", "yogur vegetal de soja"],
    categorias: ["Bebidas"],
    emoji: "🥛",
    rating: "A",
    kcal: 51, carbs: 3.4, azucares: 2.8, proteinas: 3.9, grasas: 2.1, grasasSat: 0.3, fibra: 0.5, sodio: 40,
    motivo: "Alternativa vegetal al yogur natural, elaborada a partir de bebida de soja fermentada. Aporta proteína vegetal completa y probióticos, con menos grasa saturada que un yogur de leche entera. Elige siempre la versión sin azúcares añadidos.",
    sustitutos: []
  },
  {
    id: "manzana",
    nombre: "Manzana",
    aliases: ["manzana", "manzanas"],
    categorias: ["Frutas"],
    emoji: "🍎",
    rating: "A",
    kcal: 52, carbs: 13.8, azucares: 10.4, proteinas: 0.3, grasas: 0.2, grasasSat: 0.03, fibra: 2.4, sodio: 1,
    motivo: "Fruta con un contenido notable de fibra soluble (pectina), que ayuda a moderar la absorción de su propio azúcar. Su piel concentra buena parte de los polifenoles antioxidantes, así que conviene comerla sin pelar cuando sea posible.",
    sustitutos: []
  },
  {
    id: "mango",
    nombre: "Mango",
    aliases: ["mango", "mangos"],
    categorias: ["Frutas"],
    emoji: "🥭",
    rating: "A",
    kcal: 60, carbs: 15, azucares: 13.7, proteinas: 0.8, grasas: 0.4, grasasSat: 0.1, fibra: 1.6, sodio: 1,
    motivo: "Fruta con un aporte destacable de vitamina C y betacarotenos (precursores de vitamina A), además de polifenoles antioxidantes. Su azúcar es propio de la fruta, no añadido.",
    sustitutos: []
  },
  {
    id: "pina",
    nombre: "Piña",
    aliases: ["piña", "pina", "pinas"],
    categorias: ["Frutas"],
    emoji: "🍍",
    rating: "A",
    kcal: 50, carbs: 13.1, azucares: 9.9, proteinas: 0.5, grasas: 0.1, grasasSat: 0.01, fibra: 1.4, sodio: 1,
    motivo: "Rica en vitamina C y en bromelina, una enzima con posibles propiedades antiinflamatorias y digestivas. Baja en calorías para su dulzor característico.",
    sustitutos: []
  },
  {
    id: "papaya",
    nombre: "Papaya",
    aliases: ["papaya", "papayas", "lechosa"],
    categorias: ["Frutas"],
    emoji: "🍈",
    rating: "A",
    kcal: 43, carbs: 10.8, azucares: 7.8, proteinas: 0.5, grasas: 0.3, grasasSat: 0.1, fibra: 1.7, sodio: 8,
    motivo: "Muy rica en vitamina C y betacarotenos, y contiene papaína, una enzima digestiva característica de esta fruta. Baja en calorías y muy jugosa.",
    sustitutos: []
  },
  {
    id: "cafe",
    nombre: "Café solo",
    aliases: ["cafe", "cafe solo", "cafe negro", "espresso", "cafe americano"],
    categorias: ["Bebidas"],
    emoji: "☕",
    rating: "A",
    kcal: 1, carbs: 0, azucares: 0, proteinas: 0.1, grasas: 0, grasasSat: 0, fibra: 0, sodio: 2,
    motivo: "Prácticamente sin calorías ni macronutrientes relevantes. Sin azúcar añadido, aporta antioxidantes (ácido clorogénico) y cafeína, asociada en dosis moderadas a beneficios cognitivos y metabólicos.",
    sustitutos: []
  },
  {
    id: "ia_aceite_de_coco",
    nombre: "Aceite de coco",
    aliases: ["aceite de coco"],
    categorias: ["Grasas"],
    emoji: "🥥",
    rating: "D",
    kcal: 862, carbs: 0, azucares: 0, proteinas: 0, grasas: 100, grasasSat: 82.5, fibra: 0, sodio: 0,
    motivo: "El aceite de coco contiene más de un 80% de grasas saturadas. Aunque incluye ácidos grasos de cadena media, las revisiones científicas sobre el impacto de los aceites vegetales en la salud [1][2] y el riesgo cardiovascular [3][4] muestran que eleva el colesterol LDL en comparación con las grasas insaturadas, por lo que se recomienda limitar su uso culinario habitual.",
    estudios: [
      {
        "pmid": "39053603",
        "titulo": "Health Effects of Various Edible Vegetable Oil: An Umbrella Review.",
        "revista": "Advances in nutrition (Bethesda, Md.)",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39053603/"
      },
      {
        "pmid": "33022082",
        "titulo": "Chemical composition and health benefits of coconut oil: an overview.",
        "revista": "Journal of the science of food and agriculture",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33022082/"
      },
      {
        "pmid": "30395784",
        "titulo": "Health Effects of Coconut Oil-A Narrative Review of Current Evidence.",
        "revista": "Journal of the American College of Nutrition",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30395784/"
      },
      {
        "pmid": "33945244",
        "titulo": "The Effect of Diet on Cardiovascular Disease and Lipid and Lipoprotein Levels.",
        "revista": "",
        "anio": "2000",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33945244/"
      }
    ],
    sustitutos: [
      {
        nombre: "Aceite de oliva virgen extra (AOVE)",
        emoji: "🫒", mejor: true,
        kcal: 884, carbs: 0, azucares: 0, proteinas: 0, grasas: 100, grasasSat: 14, fibra: 0, sodio: 0,
        porque: "El AOVE es rico en grasas monoinsaturadas (ácido oleico) y polifenoles antioxidantes, ofreciendo una sólida protección cardiovascular y reduciendo el colesterol LDL en comparación con las grasas saturadas del aceite de coco."
      }
    ]
  },
  {
    id: "ia_aceite_de_nabina",
    nombre: "Aceite de nabina",
    aliases: ["aceite de nabina"],
    categorias: ["Grasas"],
    emoji: "🌱",
    rating: "B",
    kcal: 884, carbs: 0, azucares: 0, proteinas: 0, grasas: 100, grasasSat: 7, fibra: 0, sodio: 0,
    motivo: "El aceite de nabina (o canola) tiene un perfil lipídico cardiosaludable, destacando por su muy bajo nivel de grasas saturadas y un buen aporte de omega-3 y grasas monoinsaturadas. Diversos análisis respaldan sus beneficios sobre los factores de riesgo cardiovascular [1] y la salud lipídica [2], [3]. No obstante, al ser generalmente un aceite refinado, carece de la elevada cantidad de polifenoles y antioxidantes presentes en aceites virgen extra.",
    estudios: [
      {
        "pmid": "33127255",
        "titulo": "The effects of Canola oil on cardiovascular risk factors: A systematic review and meta-analysis with dose-response analysis of controlled clinical trials.",
        "revista": "Nutrition, metabolism, and cardiovascular diseases : NMCD",
        "anio": "2020",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33127255/"
      },
      {
        "pmid": "23731447",
        "titulo": "Evidence of health benefits of canola oil.",
        "revista": "Nutrition reviews",
        "anio": "2013",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23731447/"
      },
      {
        "pmid": "38999751",
        "titulo": "The Lipid-Metabolism-Associated Anti-Obesity Properties of Rapeseed Diacylglycerol Oil.",
        "revista": "Nutrients",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38999751/"
      }
    ],
    sustitutos: [
      {
        nombre: "Aceite de oliva virgen extra (AOVE)",
        emoji: "🫒", mejor: true,
        kcal: 884, carbs: 0, azucares: 0, proteinas: 0, grasas: 100, grasasSat: 14, fibra: 0, sodio: 0,
        porque: "Es la opción de grasa principal de elección por su riqueza en polifenoles, vitamina E y antioxidantes bioactivos, además de ofrecer una mayor resistencia a la oxidación durante el cocinado."
      }
    ]
  },
  {
    id: "ia_aceite_de_palma",
    nombre: "Aceite de palma",
    aliases: ["aceite de palma"],
    categorias: ["Grasas"],
    emoji: "🌴",
    rating: "D",
    kcal: 884, carbs: 0, azucares: 0, proteinas: 0, grasas: 100, grasasSat: 49.3, fibra: 0, sodio: 0,
    motivo: "Contiene aproximadamente un 50% de ácidos grasos saturados (principalmente ácido palmítico), cuyo consumo habitual está ligado al incremento del colesterol LDL y al riesgo cardiovascular [1]. Aunque existen investigaciones acerca de los efectos metabólicos de diferentes aceites vegetales [2], el refinado habitual y el perfil lipídico del aceite de palma lo hacen poco aconsejable en el marco de una alimentación equilibrada [3].",
    estudios: [
      {
        "pmid": "26393565",
        "titulo": "Biological and Nutritional Properties of Palm Oil and Palmitic Acid: Effects on Health.",
        "revista": "Molecules (Basel, Switzerland)",
        "anio": "2015",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26393565/"
      },
      {
        "pmid": "24111621",
        "titulo": "Antidiabetic oils.",
        "revista": "Current diabetes reviews",
        "anio": "2013",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24111621/"
      },
      {
        "pmid": "31454938",
        "titulo": "Palm Oil on the Edge.",
        "revista": "Nutrients",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31454938/"
      }
    ],
    sustitutos: [
      {
        nombre: "Aceite de oliva virgen extra (AOVE)",
        emoji: "🫒", mejor: true,
        kcal: 884, carbs: 0, azucares: 0, proteinas: 0, grasas: 100, grasasSat: 14, fibra: 0, sodio: 0,
        porque: "Es rico en ácidos grasos monoinsaturados (ácido oleico) y antioxidantes como los polifenoles, promoviendo la salud cardiovascular frente al alto contenido de saturadas del aceite de palma."
      },
      {
        nombre: "Aceite de girasol alto oleico",
        emoji: "🌻", mejor: true,
        kcal: 884, carbs: 0, azucares: 0, proteinas: 0, grasas: 100, grasasSat: 10, fibra: 0, sodio: 0,
        porque: "Aporta una proporción significativamente menor de grasas saturadas y un mayor porcentaje de grasas monoinsaturadas saludables para el corazón."
      }
    ]
  },
  {
    id: "ia_agave",
    nombre: "Agave",
    aliases: ["agave"],
    categorias: ["Dulces"],
    emoji: "🍯",
    rating: "D",
    kcal: 310, carbs: 76, azucares: 68, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 0,
    motivo: "El sirope de agave es un edulcorante concentrado, compuesto principalmente por fructosa (a menudo en proporciones superiores al 70%). Aunque se comercializa como una alternativa 'natural' al azúcar, su alto contenido de azúcares libres, especialmente fructosa, lo equipara a otros edulcorantes concentrados en cuanto a su impacto metabólico. El consumo excesivo de fructosa se ha asociado con potenciales efectos negativos para la salud, como la resistencia a la insulina, dislipidemia y el hígado graso no alcohólico. Además, debido a su alto contenido en fructanos y fructosa, es considerado un alimento alto en FODMAP, lo que lo hace inadecuado para personas con síndrome del intestino irritable (SII) [1]. Su valor nutricional es prácticamente nulo más allá de las calorías.",
    estudios: [
      {
        "pmid": "38337655",
        "titulo": "The Role of the FODMAP Diet in IBS.",
        "revista": "Nutrients",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38337655/"
      }
    ],
    sustitutos: [
      {
        nombre: "Dátiles (frescos o secos)",
        emoji: "🌴", mejor: true,
        kcal: 280, carbs: 75, azucares: 63, proteinas: 2.5, grasas: 0.4, grasasSat: 0, fibra: 8, sodio: 2,
        porque: "Aportan dulzor natural junto con fibra dietética, vitaminas y minerales (como potasio y magnesio), lo que los convierte en una opción más nutritiva y de digestión más lenta que los azúcares concentrados como el agave. Su fibra ayuda a moderar la absorción de azúcares."
      },
      {
        nombre: "Eritritol (edulcorante)",
        emoji: "🍬", mejor: true,
        kcal: 20, carbs: 100, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 0,
        porque: "Es un polialcohol con un sabor dulce muy similar al azúcar, pero prácticamente sin calorías y no eleva los niveles de glucosa ni insulina en sangre, siendo una excelente opción para reducir drásticamente la ingesta de azúcares libres sin aportar calorías."
      }
    ]
  },
  {
    id: "ia_agua",
    nombre: "Agua",
    aliases: ["agua"],
    categorias: ["Bebidas"],
    emoji: "💧",
    rating: "A",
    kcal: 0, carbs: 0, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 5,
    motivo: "El agua es el pilar fundamental de la hidratación y es esencial para el correcto funcionamiento de todos los procesos fisiológicos del organismo [1]. Mantener un estado de hidratación óptimo es vital para preservar el rendimiento cognitivo y físico, mientras que la deshidratación, incluso leve, se ha asociado con un impacto negativo en la salud y la función cardiovascular [2]. Carece de calorías, grasas y azúcares, por lo que es la bebida más saludable disponible.",
    estudios: [
      {
        "pmid": "20646222",
        "titulo": "Water, hydration, and health.",
        "revista": "Nutrition reviews",
        "anio": "2010",
        "url": "https://pubmed.ncbi.nlm.nih.gov/20646222/"
      },
      {
        "pmid": "31405195",
        "titulo": "Hydration Status and Cardiovascular Function.",
        "revista": "Nutrients",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31405195/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_ajo",
    nombre: "Ajo",
    aliases: ["ajo"],
    categorias: ["Verduras y Hortalizas", "Condimentos y Aditivos"],
    emoji: "🧄",
    rating: "A",
    kcal: 149, carbs: 33, azucares: 1, proteinas: 6.36, grasas: 0.5, grasasSat: 0.1, fibra: 2.1, sodio: 17,
    motivo: "El ajo es un alimento excepcionalmente saludable con propiedades cardioprotectoras e inmunomoduladoras demostradas. Su consumo regular contribuye de forma significativa a reducir la presión arterial en personas con hipertensión y a regular el colesterol sérico [1][2]. Asimismo, se asocia positivamente con la reducción del colesterol LDL [3]. Dado que ya representa una de las opciones más saludables y nutritivas en su categoría, no requiere de sustitutos.",
    estudios: [
      {
        "pmid": "26764326",
        "titulo": "Garlic Lowers Blood Pressure in Hypertensive Individuals, Regulates Serum Cholesterol, and Stimulates Immunity: An Updated Meta-analysis and Review.",
        "revista": "The Journal of nutrition",
        "anio": "2016",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26764326/"
      },
      {
        "pmid": "35193446",
        "titulo": "Garlic: A systematic review of the effects on cardiovascular diseases.",
        "revista": "Critical reviews in food science and nutrition",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35193446/"
      },
      {
        "pmid": "39203947",
        "titulo": "LDL-Cholesterol-Lowering Effects of a Dietary Supplement Containing Onion and Garlic Extract Used in Healthy Volunteers.",
        "revista": "Nutrients",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39203947/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_albahaca",
    nombre: "Albahaca",
    aliases: ["albahaca"],
    categorias: ["Condimentos y Aditivos", "Verduras y Hortalizas"],
    emoji: "🌿",
    rating: "A",
    kcal: 23, carbs: 2.65, azucares: 0.3, proteinas: 3.15, grasas: 0.64, grasasSat: 0.04, fibra: 1.6, sodio: 4,
    motivo: "La albahaca es una hierba aromática excepcionalmente saludable, muy baja en calorías, carbohidratos, azúcares, grasas y sodio. Es una fuente notable de vitaminas K y A, así como de antioxidantes y compuestos con propiedades antiinflamatorias. Su consumo regular en la dieta mediterránea se asocia con beneficios para la salud. Estudios han indicado que las hierbas aromáticas y especias pueden tener un efecto positivo en el perfil glucémico en sujetos con diabetes tipo 2 [1]. Aunque se refiere a una especie diferente (albahaca santa), se han investigado propiedades adaptogénicas en el género Ocimum, que pueden influir positivamente en el estrés y el estado de ánimo [2], lo que refuerza el valor de estas plantas para el bienestar.",
    estudios: [
      {
        "pmid": "38542668",
        "titulo": "Effect of Aromatic Herbs and Spices Present in the Mediterranean Diet on the Glycemic Profile in Type 2 Diabetes Subjects: A Systematic Review and Meta-Analysis.",
        "revista": "Nutrients",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38542668/"
      },
      {
        "pmid": "36185698",
        "titulo": "A randomized, double-blind, placebo-controlled trial investigating the effects of an Ocimum tenuiflorum (Holy Basil) extract (Holixer(TM)) on stress, mood, and sleep in adults experiencing stress.",
        "revista": "Frontiers in nutrition",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36185698/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_almendras",
    nombre: "Almendras",
    aliases: ["almendras"],
    categorias: ["Frutos Secos", "Grasas"],
    emoji: "🌰",
    rating: "A",
    kcal: 579, carbs: 21.55, azucares: 4.35, proteinas: 21.22, grasas: 49.93, grasasSat: 3.8, fibra: 12.5, sodio: 1,
    motivo: "Las almendras son un alimento de alta densidad nutricional, ricas en grasas saludables (principalmente monoinsaturadas y poliinsaturadas), fibra y proteína vegetal. Contribuyen positivamente a la salud cardiovascular al ayudar a reducir los niveles de colesterol LDL [1] y se asocian con un menor riesgo de enfermedades cardiovasculares cuando se incluyen como parte de patrones dietéticos saludables, como la Dieta Portfolio [2] y la Dieta Mediterránea [3]. Su alto contenido de fibra favorece la saciedad, la salud digestiva y ayuda a mantener estables los niveles de glucosa en sangre. Además, son una excelente fuente de vitamina E, magnesio y otros antioxidantes.",
    estudios: [
      {
        "pmid": "33762150",
        "titulo": "The effects of foods on LDL cholesterol levels: A systematic review of the accumulated evidence from systematic reviews and meta-analyses of randomized controlled trials.",
        "revista": "Nutrition, metabolism, and cardiovascular diseases : NMCD",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33762150/"
      },
      {
        "pmid": "37877288",
        "titulo": "Portfolio Diet Score and Risk of Cardiovascular Disease: Findings From 3 Prospective Cohort Studies.",
        "revista": "Circulation",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37877288/"
      },
      {
        "pmid": "37775736",
        "titulo": "Yearly attained adherence to Mediterranean diet and incidence of diabetes in a large randomized trial.",
        "revista": "Cardiovascular diabetology",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37775736/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_alubias",
    nombre: "Alubias",
    aliases: ["alubias"],
    categorias: ["Proteína vegetal"],
    emoji: "🫘",
    rating: "A",
    kcal: 307, carbs: 34.7, azucares: 2.5, proteinas: 21.1, grasas: 1.6, grasasSat: 0.2, fibra: 25.4, sodio: 12,
    motivo: "Las alubias son una legumbre con un perfil nutricional excelente, destacando por su alto contenido en fibra y proteínas de origen vegetal, y su bajo aporte de grasas saturadas. Además, se ha evidenciado que compuestos presentes en la alubia blanca (como los inhibidores de la alfa-amilasa) pueden tener efectos beneficiosos en el control de peso y la reducción de grasa corporal [1].",
    estudios: [
      {
        "pmid": "38830962",
        "titulo": "Proprietary alpha-amylase inhibitor formulation from white kidney bean (Phaseolus vulgaris L.) promotes weight and fat loss: a 12-week, double-blind, placebo-controlled, randomized trial.",
        "revista": "Scientific reports",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38830962/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_anacardo",
    nombre: "Anacardo",
    aliases: ["anacardo"],
    categorias: ["Frutos Secos"],
    emoji: "🌰",
    rating: "A",
    kcal: 553, carbs: 30.2, azucares: 5.9, proteinas: 18.2, grasas: 43.8, grasasSat: 7.8, fibra: 3.3, sodio: 12,
    motivo: "El anacardo es un alimento altamente nutritivo que califica con una 'A' debido a su excelente perfil de grasas saludables, predominantemente monoinsaturadas, que son beneficiosas para la salud cardiovascular. Es una buena fuente de proteína vegetal, fibra, y una gran variedad de minerales esenciales como el magnesio, cobre, zinc, hierro y selenio, así como vitaminas del grupo B. Estos nutrientes contribuyen al bienestar general y al funcionamiento óptimo del organismo. Aunque son calóricos, su densidad nutricional los convierte en una opción muy saludable cuando se consumen en porciones adecuadas. Es crucial tener en cuenta que los anacardos son un alérgeno alimentario común y pueden provocar reacciones alérgicas IgE-mediadas en individuos sensibles [1], [2]. Para maximizar sus beneficios, se recomienda elegir versiones naturales, sin tostar y sin sal añadida, para evitar un exceso de sodio.",
    estudios: [
      {
        "pmid": "37815205",
        "titulo": "EAACI guidelines on the diagnosis of IgE-mediated food allergy.",
        "revista": "Allergy",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37815205/"
      },
      {
        "pmid": "34658691",
        "titulo": "Tree nut allergy.",
        "revista": "Postepy dermatologii i alergologii",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34658691/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_aroma_de_vainilla",
    nombre: "Aroma de vainilla",
    aliases: ["aroma de vainilla"],
    categorias: ["Condimentos y Aditivos"],
    emoji: "🌿",
    rating: "B",
    kcal: 288, carbs: 14, azucares: 14, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 1,
    motivo: "El aroma de vainilla se utiliza en cantidades muy pequeñas (gotas), por lo que su aporte nutricional al plato final es prácticamente nulo. Aunque 100g de un extracto o aroma de vainilla estándar puede contener alcohol y algo de azúcar, su rol principal es potenciar el sabor y la percepción de dulzor, permitiendo reducir azúcares añadidos en recetas sin sacrificar el gusto. La vanilina es el compuesto clave para su sabor y aroma, cuya biosíntesis en plantas ha sido objeto de estudio [1, 2]. Por esta capacidad de realzar el sabor sin añadir calorías significativas en su uso práctico, se considera una opción saludable para aromatizar.",
    estudios: [
      {
        "pmid": "12809710",
        "titulo": "Vanillin.",
        "revista": "Phytochemistry",
        "anio": "2003",
        "url": "https://pubmed.ncbi.nlm.nih.gov/12809710/"
      },
      {
        "pmid": "28357540",
        "titulo": "Vanillin biosynthetic pathways in plants.",
        "revista": "Planta",
        "anio": "2017",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28357540/"
      }
    ],
    sustitutos: [
      {
        nombre: "Vaina de Vainilla Natural",
        emoji: "🌿", mejor: true,
        kcal: 287, carbs: 65, azucares: 3, proteinas: 1.2, grasas: 3.2, grasasSat: 0.8, fibra: 12, sodio: 9,
        porque: "La vaina de vainilla natural ofrece un sabor más complejo y auténtico. Al ser la fuente original de la vanilina y otros compuestos aromáticos [4], no contiene alcohol ni aditivos artificiales que a veces se encuentran en los aromas comerciales. Aunque sus valores nutricionales por 100g son más altos, se utiliza en cantidades aún menores que el extracto, y aporta una pequeña cantidad de fibra y micronutrientes inherentes a la vaina."
      }
    ]
  },
  {
    id: "ia_atun",
    nombre: "Atún",
    aliases: ["atún"],
    categorias: ["Proteínas"],
    emoji: "🐟",
    rating: "A",
    kcal: 130, carbs: 0, azucares: 0, proteinas: 23, grasas: 3.3, grasasSat: 0.9, fibra: 0, sodio: 47,
    motivo: "El atún es un pescado de excelente calidad nutricional, destacado por su elevado aporte de proteínas de alto valor biológico y un bajo contenido en grasas saturadas. Es una fuente natural importante de ácidos grasos omega-3 (como el DHA), que contribuyen significativamente a la salud cardiovascular y al bienestar general [1].",
    estudios: [
      {
        "pmid": "29494205",
        "titulo": "How does high DHA fish oil affect health? A systematic review of evidence.",
        "revista": "Critical reviews in food science and nutrition",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29494205/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_avellanas",
    nombre: "Avellanas",
    aliases: ["avellanas"],
    categorias: ["Frutos Secos", "Grasas"],
    emoji: "🌰",
    rating: "A",
    kcal: 628, carbs: 16.7, azucares: 4.3, proteinas: 15, grasas: 60.8, grasasSat: 4.5, fibra: 9.7, sodio: 1,
    motivo: "Las avellanas son un alimento altamente nutritivo y denso en energía. Destacan por su elevado contenido en ácidos grasos monoinsaturados, fibra, proteína vegetal de calidad, vitamina E y fitosteroles. Su consumo favorece la fisiología metabólica y vascular, atenuando el riesgo cardiovascular [1]. Su perfil fitoquímico y antioxidante apoya la salud cardiovascular y metabólica integral [2].",
    estudios: [
      {
        "pmid": "34579146",
        "titulo": "Nuts: Natural Pleiotropic Nutraceuticals.",
        "revista": "Nutrients",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34579146/"
      },
      {
        "pmid": "18296370",
        "titulo": "Phytochemical composition of nuts.",
        "revista": "Asia Pacific journal of clinical nutrition",
        "anio": "2008",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18296370/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_bebida_de_almendras",
    nombre: "Bebida de almendras (sin azúcares añadidos)",
    aliases: ["bebida de almendras", "bebida de almendras (sin azúcares añadidos)"],
    categorias: ["Bebidas vegetales"],
    emoji: "🥛",
    rating: "B",
    kcal: 13, carbs: 0.1, azucares: 0, proteinas: 0.4, grasas: 1.1, grasasSat: 0.1, fibra: 0.3, sodio: 50,
    motivo: "La bebida de almendras sin azúcares añadidos es una opción baja en calorías y grasas saturadas. Es una alternativa adecuada para personas con intolerancia a la lactosa o que siguen dietas veganas, y presenta un menor impacto ambiental en comparación con la leche de vaca [1]. Sin embargo, su contenido proteico es significativamente bajo en comparación con la leche de vaca o la bebida de soja [1]. Su perfil nutricional mejora considerablemente cuando está fortificada con calcio y vitaminas como la D y B12.",
    estudios: [
      {
        "pmid": "37300651",
        "titulo": "Dairy and Plant-Based Milks: Implications for Nutrition and Planetary Health.",
        "revista": "Current environmental health reports",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37300651/"
      }
    ],
    sustitutos: [
      {
        nombre: "Bebida de soja (sin azúcares añadidos)",
        emoji: "🥛", mejor: true,
        kcal: 38, carbs: 1.5, azucares: 0, proteinas: 3.3, grasas: 1.8, grasasSat: 0.2, fibra: 0.6, sodio: 45,
        porque: "Aporta un contenido significativamente mayor de proteínas de alto valor biológico, comparable a la leche de vaca en este aspecto, y es rica en isoflavonas. Suele estar fortificada con calcio y vitaminas, ofreciendo un perfil nutricional más completo para la ingesta diaria de macronutrientes esenciales [1]."
      },
      {
        nombre: "Bebida de avena (sin azúcares añadidos)",
        emoji: "🥛", mejor: true,
        kcal: 48, carbs: 6.5, azucares: 0, proteinas: 1, grasas: 1.5, grasasSat: 0.2, fibra: 0.8, sodio: 50,
        porque: "Contiene beta-glucanos, un tipo de fibra soluble que contribuye a mantener niveles normales de colesterol sanguíneo y a una mejor salud intestinal. Aunque su contenido proteico es moderado, es superior al de la bebida de almendras y aporta más hidratos de carbono complejos."
      }
    ]
  },
  {
    id: "ia_bebida_de_avena",
    nombre: "Bebida de avena",
    aliases: ["bebida de avena"],
    categorias: ["Bebidas vegetales"],
    emoji: "🥛",
    rating: "B",
    kcal: 45, carbs: 6.5, azucares: 0.5, proteinas: 1, grasas: 1.5, grasasSat: 0.2, fibra: 0.8, sodio: 0.04,
    motivo: "La bebida de avena, especialmente en su versión sin azúcares añadidos y fortificada, es una alternativa vegetal con un perfil bajo en grasas saturadas y naturalmente libre de colesterol. Es una opción que contribuye a la salud planetaria con un menor impacto ambiental comparado con la leche de origen animal [1]. Sin embargo, su contenido proteico es significativamente inferior al de la leche de vaca o la bebida de soja [1], lo cual es una consideración importante, especialmente para asegurar un crecimiento y nutrición adecuados en niños y adolescentes [2]. Es crucial seleccionar productos sin azúcares añadidos y enriquecidos con calcio, vitamina D y vitamina B12 para compensar la menor densidad nutricional intrínseca y asegurar un aporte adecuado de micronutrientes, especialmente en dietas vegetarianas o veganas.",
    estudios: [
      {
        "pmid": "37300651",
        "titulo": "Dairy and Plant-Based Milks: Implications for Nutrition and Planetary Health.",
        "revista": "Current environmental health reports",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37300651/"
      },
      {
        "pmid": "39332772",
        "titulo": "A Systematic Review on the Impact of Plant-Based Milk Consumption on Growth and Nutrition in Children and Adolescents.",
        "revista": "The Journal of nutrition",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39332772/"
      }
    ],
    sustitutos: [
      {
        nombre: "bebida de soja (sin azúcares añadidos, fortificada)",
        emoji: "🥛", mejor: true,
        kcal: 35, carbs: 1.5, azucares: 0.5, proteinas: 3.5, grasas: 1.8, grasasSat: 0.25, fibra: 0.6, sodio: 0.04,
        porque: "Aporta significativamente más proteínas (aproximadamente 3 veces más) que la bebida de avena, con un contenido similar de grasas saludables (bajo en grasas saturadas) y menos carbohidratos. La evidencia sugiere beneficios para la salud cardiometabólica [2] y es una opción robusta para el crecimiento y la nutrición en todas las edades si está fortificada [3]."
      }
    ]
  },
  {
    id: "ia_bebida_de_soja",
    nombre: "Bebida de soja (sin azúcares añadidos)",
    aliases: ["bebida de soja", "bebida de soja (sin azúcares añadidos)"],
    categorias: ["Bebidas vegetales"],
    emoji: "🥛",
    rating: "A",
    kcal: 33, carbs: 1.6, azucares: 0.5, proteinas: 3.3, grasas: 1.8, grasasSat: 0.3, fibra: 0.6, sodio: 40,
    motivo: "La bebida de soja sin azúcares añadidos es una excelente alternativa vegetal a la leche de vaca, valorada por su buen aporte proteico y un perfil lipídico favorable, con bajo contenido en grasas saturadas y sin colesterol. Estudios recientes, como una revisión sistemática y metaanálisis [1], sugieren beneficios cardiometabólicos al sustituir la leche de vaca por bebida de soja. Además, es frecuentemente fortificada con vitaminas (como D y B12) y minerales (como calcio), lo que mejora su perfil nutricional. Es fundamental elegir siempre la versión sin azúcares añadidos para mantenerla como una opción muy saludable.",
    estudios: [
      {
        "pmid": "39169353",
        "titulo": "A systematic review and meta-analysis of randomized trials of substituting soymilk for cow's milk and intermediate cardiometabolic outcomes: understanding the impact of dairy alternatives in the transition to plant-based diets on cardiometabolic health.",
        "revista": "BMC medicine",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39169353/"
      }
    ],
    sustitutos: [
      {
        nombre: "Agua",
        emoji: "💧", mejor: true,
        kcal: 0, carbs: 0, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 5,
        porque: "La opción más saludable y esencial para la hidratación diaria, sin aporte calórico, azúcares ni grasas. Es la bebida por excelencia."
      },
      {
        nombre: "Bebida de Almendras (sin azúcares añadidos)",
        emoji: "🥛", mejor: true,
        kcal: 13, carbs: 0.1, azucares: 0, proteinas: 0.4, grasas: 1.1, grasasSat: 0.1, fibra: 0.3, sodio: 45,
        porque: "Aunque con menor aporte proteico que la bebida de soja, es una alternativa con un contenido calórico y de carbohidratos aún más bajo, ideal para quienes buscan reducir calorías o una opción con menos impacto en los niveles de azúcar en sangre. A menudo está fortificada con vitaminas y minerales."
      }
    ]
  },
  {
    id: "ia_bebida_de_soja_sin_azucar",
    nombre: "Bebida de soja sin azúcar",
    aliases: ["bebida de soja sin azucar", "bebida de soja sin azúcar"],
    categorias: ["Bebidas vegetales"],
    emoji: "🥛",
    rating: "A",
    kcal: 35, carbs: 1.6, azucares: 0.2, proteinas: 3.3, grasas: 1.8, grasasSat: 0.2, fibra: 0.6, sodio: 45,
    motivo: "Calificación A debido a su excelente perfil nutricional. Es una fuente vegetal de proteínas de alta calidad, con un contenido de grasas bajo y, al ser sin azúcares añadidos, evita el aporte de azúcares libres. Su bajo contenido en grasas saturadas contribuye a la salud cardiovascular [1]. Además, su consumo se asocia con una respuesta glucémica e insulinémica favorable [2]. Es una excelente alternativa a la leche de vaca, especialmente para dietas plant-based o personas con intolerancia a la lactosa, y suele estar fortificada con calcio y vitamina D.",
    estudios: [
      {
        "pmid": "39169353",
        "titulo": "A systematic review and meta-analysis of randomized trials of substituting soymilk for cow's milk and intermediate cardiometabolic outcomes: understanding the impact of dairy alternatives in the transition to plant-based diets on cardiometabolic health.",
        "revista": "BMC medicine",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39169353/"
      },
      {
        "pmid": "29617350",
        "titulo": "Co-Ingestion of Rice Bran Soymilk or Plain Soymilk with White Bread: Effects on the Glycemic and Insulinemic Response.",
        "revista": "Nutrients",
        "anio": "2018",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29617350/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_bicarbonato",
    nombre: "Bicarbonato de sodio",
    aliases: ["bicarbonato", "bicarbonato de sodio"],
    categorias: ["Condimentos y Aditivos"],
    emoji: "🧪",
    rating: "D",
    kcal: 0, carbs: 0, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 27360,
    motivo: "No aporta calorías ni macronutrientes, pero su contenido de sodio es extremadamente elevado (más de 27 g por 100 g). Aunque es un aditivo útil en cocina y un agente terapéutico clave para el equilibrio ácido-base [1] y la acidosis metabólica en el ámbito clínico [2][3], su consumo habitual o excesivo conlleva riesgos importantes de sobrecarga de sodio y complicaciones cardiovasculares o renales [4].",
    estudios: [
      {
        "pmid": "33039418",
        "titulo": "The therapeutic importance of acid-base balance.",
        "revista": "Biochemical pharmacology",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33039418/"
      },
      {
        "pmid": "40493225",
        "titulo": "Sodium bicarbonate administration for metabolic acidosis in the intensive care unit: a target trial emulation.",
        "revista": "Intensive care medicine",
        "anio": "2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40493225/"
      },
      {
        "pmid": "37442665",
        "titulo": "A Review of Bicarbonate Use in Common Clinical Scenarios.",
        "revista": "The Journal of emergency medicine",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37442665/"
      },
      {
        "pmid": "39768744",
        "titulo": "Complexities, Benefits, Risks, and Clinical Implications of Sodium Bicarbonate Administration in Critically Ill Patients: A State-of-the-Art Review.",
        "revista": "Journal of clinical medicine",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39768744/"
      }
    ],
    sustitutos: [
      {
        nombre: "Bicarbonato de potasio",
        emoji: "🧂", mejor: true,
        kcal: 0, carbs: 0, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 0,
        porque: "Actúa de manera equivalente como gasificante en recetas de repostería, pero sustituye el sodio por potasio, ayudando a reducir la presión arterial y evitar la retención de líquidos."
      }
    ]
  },
  {
    id: "ia_boniato",
    nombre: "Boniato",
    aliases: ["boniato"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🍠",
    rating: "A",
    kcal: 86, carbs: 20.1, azucares: 4.2, proteinas: 1.6, grasas: 0.1, grasasSat: 0.02, fibra: 3, sodio: 55,
    motivo: "El boniato es una hortaliza excepcionalmente nutritiva, calificada con una 'A' por su sobresaliente perfil. Es una excelente fuente de carbohidratos complejos y fibra dietética, lo que contribuye a la saciedad, la regulación del tránsito intestinal y el mantenimiento de niveles estables de glucosa en sangre. Es notablemente rico en provitamina A (betacarotenos), vitamina C y varias vitaminas del grupo B, además de minerales esenciales como el potasio. Contiene diversos compuestos bioactivos, como carotenoides, antocianinas y ácidos fenólicos, que le otorgan propiedades antioxidantes y beneficios funcionales significativos para la salud [1]. Su impacto en la gestión de la diabetes tipo 2 también ha sido objeto de estudios y revisiones sistemáticas [2, 3], destacando su potencial en dietas para esta condición. Su bajo contenido en grasas y sodio complementa su perfil altamente saludable.",
    estudios: [
      {
        "pmid": "28460992",
        "titulo": "Chemical constituents and health effects of sweet potato.",
        "revista": "Food research international (Ottawa, Ont.)",
        "anio": "2016",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28460992/"
      },
      {
        "pmid": "24000051",
        "titulo": "Sweet potato for type 2 diabetes mellitus.",
        "revista": "The Cochrane database of systematic reviews",
        "anio": "2013",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24000051/"
      },
      {
        "pmid": "22336861",
        "titulo": "Sweet potato for type 2 diabetes mellitus.",
        "revista": "The Cochrane database of systematic reviews",
        "anio": "2012",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22336861/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_cacahuetes",
    nombre: "Cacahuetes",
    aliases: ["cacahuetes"],
    categorias: ["Frutos Secos", "Proteína vegetal"],
    emoji: "🥜",
    rating: "A",
    kcal: 567, carbs: 16.1, azucares: 4.7, proteinas: 25.8, grasas: 49.2, grasasSat: 6.8, fibra: 8.5, sodio: 18,
    motivo: "Los cacahuetes son una excelente fuente de proteína vegetal, fibra y ácidos grasos saludables. Contienen fitonutrientes como el resveratrol, el cual ejerce efectos beneficiosos sobre el sistema vascular [1]. Asimismo, la inclusión de frutos secos en la alimentación habitual demuestra un papel protector frente a enfermedades cardiovasculares, diabetes tipo 2 y mortalidad general [2][3].",
    estudios: [
      {
        "pmid": "30934670",
        "titulo": "Resveratrol and Its Effects on the Vascular System.",
        "revista": "International journal of molecular sciences",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30934670/"
      },
      {
        "pmid": "36041171",
        "titulo": "Consumption of Nuts and Seeds and Health Outcomes Including Cardiovascular Disease, Diabetes and Metabolic Disease, Cancer, and Mortality: An Umbrella Review.",
        "revista": "Advances in nutrition (Bethesda, Md.)",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36041171/"
      },
      {
        "pmid": "30094487",
        "titulo": "Nuts and Cardiovascular Disease Prevention.",
        "revista": "Current atherosclerosis reports",
        "anio": "2018",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30094487/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_caldo_de_verduras",
    nombre: "Caldo de verduras",
    aliases: ["caldo de verduras"],
    categorias: ["Bebidas", "Condimentos y Aditivos"],
    emoji: "🥣",
    rating: "A",
    kcal: 7, carbs: 1, azucares: 0.5, proteinas: 0.5, grasas: 0.1, grasasSat: 0, fibra: 0.2, sodio: 30,
    motivo: "El caldo de verduras es una opción muy saludable, especialmente si es bajo en sodio o casero. Su alto contenido de agua lo convierte en una excelente fuente de hidratación y contribuye a la saciedad, lo que puede ser beneficioso en el manejo del peso y la salud metabólica general [1], [2]. Aunque los nutrientes están diluidos, aporta algunas vitaminas, minerales y compuestos bioactivos de origen vegetal que pueden apoyar la función intestinal [3]. Es bajo en calorías, grasas y azúcares, lo que lo hace ideal para diversas dietas. Es crucial optar por versiones con bajo contenido de sodio para evitar un consumo excesivo.",
    estudios: [
      {
        "pmid": "39270816",
        "titulo": "The role of dietary modification in the prevention and management of metabolic dysfunction-associated fatty liver disease: An international multidisciplinary expert consensus.",
        "revista": "Metabolism: clinical and experimental",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39270816/"
      },
      {
        "pmid": "34684528",
        "titulo": "Dietary Intake, Eating Behavior, Physical Activity, and Quality of Life in Infertile Women with PCOS and Obesity Compared with Non-PCOS Obese Controls.",
        "revista": "Nutrients",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34684528/"
      },
      {
        "pmid": "33105549",
        "titulo": "Dietary Plant-Origin Bio-Active Compounds, Intestinal Functionality, and Microbiome.",
        "revista": "Nutrients",
        "anio": "2020",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33105549/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_canela",
    nombre: "Canela",
    aliases: ["canela"],
    categorias: ["Condimentos y Aditivos"],
    emoji: "🌿",
    rating: "A",
    kcal: 247, carbs: 80.6, azucares: 2.2, proteinas: 4, grasas: 1.2, grasasSat: 0.3, fibra: 53.1, sodio: 0.01,
    motivo: "La canela es una especia excelente y muy saludable (Clasificación A). Numerosos estudios científicos demuestran su eficacia terapéutica complementaria, especialmente en la mejora del control de la glucemia y de los niveles de lípidos en personas con diabetes tipo 2 [1, 2, 3, 4]. Su uso como endulzante natural ayuda a reducir el consumo de azúcares añadidos, aportando además una gran cantidad de compuestos antioxidantes y fibra.",
    estudios: [
      {
        "pmid": "37818728",
        "titulo": "The effect of cinnamon supplementation on glycemic control in patients with type 2 diabetes mellitus: An updated systematic review and dose-response meta-analysis of randomized controlled trials.",
        "revista": "Phytotherapy research : PTR",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37818728/"
      },
      {
        "pmid": "35807953",
        "titulo": "Cinnamon as a Complementary Therapeutic Approach for Dysglycemia and Dyslipidemia Control in Type 2 Diabetes Mellitus and Its Molecular Mechanism of Action: A Review.",
        "revista": "Nutrients",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35807953/"
      },
      {
        "pmid": "14633804",
        "titulo": "Cinnamon improves glucose and lipids of people with type 2 diabetes.",
        "revista": "Diabetes care",
        "anio": "2003",
        "url": "https://pubmed.ncbi.nlm.nih.gov/14633804/"
      },
      {
        "pmid": "24019277",
        "titulo": "Cinnamon use in type 2 diabetes: an updated systematic review and meta-analysis.",
        "revista": "Annals of family medicine",
        "anio": "2013",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24019277/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_carne_de_cerdo",
    nombre: "Carne de cerdo",
    aliases: ["carne de cerdo"],
    categorias: ["Cárnicos", "Proteínas"],
    emoji: "🥩",
    rating: "C",
    kcal: 160, carbs: 0, azucares: 0, proteinas: 20, grasas: 8.5, grasasSat: 3, fibra: 0, sodio: 65,
    motivo: "La carne de cerdo está clasificada dentro de las carnes rojas. Aunque representa una fuente importante de proteínas de alto valor biológico, aminoácidos esenciales, vitaminas (como la B12) y minerales, un consumo elevado de carne roja se ha asociado de manera consistente con un incremento en el riesgo de padecer diversas enfermedades crónicas [1].",
    estudios: [
      {
        "pmid": "27597529",
        "titulo": "Potential health hazards of eating red meat.",
        "revista": "Journal of internal medicine",
        "anio": "2017",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27597529/"
      }
    ],
    sustitutos: [
      {
        nombre: "Pechuga de pollo",
        emoji: "🐔", mejor: true,
        kcal: 110, carbs: 0, azucares: 0, proteinas: 23, grasas: 1.2, grasasSat: 0.3, fibra: 0, sodio: 65,
        porque: "Se trata de una carne blanca con un contenido lipídico y de grasas saturadas drásticamente inferior, lo que disminuye el riesgo cardiovascular asociado al consumo regular de carnes rojas [1]."
      },
      {
        nombre: "Lentejas cocidas",
        emoji: "🧆", mejor: true,
        kcal: 116, carbs: 20, azucares: 0.3, proteinas: 9, grasas: 0.4, grasasSat: 0.1, fibra: 7.9, sodio: 10,
        porque: "Aportan proteínas de origen vegetal y un alto contenido en fibra alimentaria, careciendo por completo de grasas saturadas y colesterol."
      }
    ]
  },
  {
    id: "ia_cebolla",
    nombre: "Cebolla",
    aliases: ["cebolla"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🧅",
    rating: "A",
    kcal: 40, carbs: 9.34, azucares: 4.24, proteinas: 1.1, grasas: 0.1, grasasSat: 0.04, fibra: 1.7, sodio: 4,
    motivo: "La cebolla es una hortaliza con un perfil nutricional excelente, caracterizada por su bajo aporte calórico y su riqueza en fibra, vitaminas (como la vitamina C y B6) y minerales (potasio, manganeso). Es especialmente valorada por su contenido en compuestos bioactivos, como los flavonoides (por ejemplo, la quercetina) y los compuestos azufrados, a los que se atribuyen gran parte de sus beneficios para la salud. Estudios sugieren que extractos de cebolla pueden contribuir a la reducción del colesterol LDL en voluntarios sanos [1]. Además, es una fuente rica en flavonoides, compuestos vegetales asociados con la salud cardiovascular [2]. Su perfil fitoquímico y farmacológico ha sido ampliamente revisado, destacando sus propiedades beneficiosas [3].",
    estudios: [
      {
        "pmid": "39203947",
        "titulo": "LDL-Cholesterol-Lowering Effects of a Dietary Supplement Containing Onion and Garlic Extract Used in Healthy Volunteers.",
        "revista": "Nutrients",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39203947/"
      },
      {
        "pmid": "18296359",
        "titulo": "Vegetable flavonoids and cardiovascular disease.",
        "revista": "Asia Pacific journal of clinical nutrition",
        "anio": "2008",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18296359/"
      },
      {
        "pmid": "38262524",
        "titulo": "An ethnopharmacological, phytochemical, and pharmacological overview of onion (Allium cepa L.).",
        "revista": "Journal of ethnopharmacology",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38262524/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_cerezas",
    nombre: "Cerezas",
    aliases: ["cerezas"],
    categorias: ["Frutas"],
    emoji: "🍒",
    rating: "A",
    kcal: 63, carbs: 16, azucares: 12.8, proteinas: 1.1, grasas: 0.2, grasasSat: 0.04, fibra: 2.1, sodio: 1,
    motivo: "Las cerezas son una fruta con alta densidad nutricional, rica en fibra, potasio y antioxidantes como las antocianinas. Su consumo se asocia con una reducción del estrés oxidativo y la inflamación, e incluso contienen fitomelatonina que puede favorecer el descanso y la recuperación [1][2].",
    estudios: [
      {
        "pmid": "30979048",
        "titulo": "Sleep and Nutrition Interactions: Implications for Athletes.",
        "revista": "Nutrients",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30979048/"
      },
      {
        "pmid": "28696985",
        "titulo": "Tart Cherry Juice in Athletes: A Literature Review and Commentary.",
        "revista": "Current sports medicine reports",
        "anio": "2017",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28696985/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_chorizo",
    nombre: "Chorizo",
    aliases: ["chorizo"],
    categorias: ["Cárnicos", "Proteínas"],
    emoji: "🥓",
    rating: "E",
    kcal: 455, carbs: 1.9, azucares: 0.8, proteinas: 24.1, grasas: 38.3, grasasSat: 14.5, fibra: 0, sodio: 1600,
    motivo: "El chorizo es una carne procesada de alto valor calórico, rica en grasas saturadas y sodio. Su consumo habitual se enmarca en patrones de dieta occidental [1] y el consumo de carne procesada y roja está asociado a un mayor riesgo de enfermedades cardiovasculares y diabetes [2], además de otros riesgos para la salud [3].",
    estudios: [
      {
        "pmid": "37375654",
        "titulo": "Global Impacts of Western Diet and Its Effects on Metabolism and Health: A Narrative Review.",
        "revista": "Nutrients",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37375654/"
      },
      {
        "pmid": "37264855",
        "titulo": "Red meat consumption, cardiovascular diseases, and diabetes: a systematic review and meta-analysis.",
        "revista": "European heart journal",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37264855/"
      },
      {
        "pmid": "26780279",
        "titulo": "Health Risks Associated with Meat Consumption: A Review of Epidemiological Studies.",
        "revista": "International journal for vitamin and nutrition research. Internationale Zeitschrift fur Vitamin- und Ernahrungsforschung. Journal international de vitaminologie et de nutrition",
        "anio": "2015",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26780279/"
      }
    ],
    sustitutos: [
      {
        nombre: "Lomo embuchado",
        emoji: "🥩", mejor: true,
        kcal: 225, carbs: 0.8, azucares: 0.5, proteinas: 38, grasas: 8, grasasSat: 2.8, fibra: 0, sodio: 1200,
        porque: "Aporta un nivel de proteína significativamente mayor y casi un 80% menos de grasas totales y saturadas en comparación con el chorizo."
      },
      {
        nombre: "Pechuga de pavo extra",
        emoji: "🍗", mejor: true,
        kcal: 105, carbs: 1.2, azucares: 0.8, proteinas: 22, grasas: 1.5, grasasSat: 0.5, fibra: 0, sodio: 700,
        porque: "Es una opción cárnica magra, con mínimo aporte de grasas saturadas y la mitad de sodio que el chorizo."
      }
    ]
  },
  {
    id: "ia_coco",
    nombre: "Coco",
    aliases: ["coco"],
    categorias: ["Frutas", "Grasas"],
    emoji: "🥥",
    rating: "C",
    kcal: 354, carbs: 15.2, azucares: 6.2, proteinas: 3.3, grasas: 33.5, grasasSat: 29.7, fibra: 9, sodio: 20,
    motivo: "El coco fresco aporta un excelente contenido de fibra dietética y minerales, pero destaca por una densidad calórica muy alta y un contenido de grasas saturadas superior al 85% de su grasa total [1]. Aunque incluye triglicéridos de cadena media como el ácido láurico [1], la evidencia actual sugiere moderación en su consumo debido a sus potenciales efectos sobre el perfil lipídico cardiometabólico [2].",
    estudios: [
      {
        "pmid": "33022082",
        "titulo": "Chemical composition and health benefits of coconut oil: an overview.",
        "revista": "Journal of the science of food and agriculture",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33022082/"
      },
      {
        "pmid": "37364144",
        "titulo": "Coconut oil: an overview of cardiometabolic effects and the public health burden of misinformation.",
        "revista": "Archives of endocrinology and metabolism",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37364144/"
      }
    ],
    sustitutos: [
      {
        nombre: "Aguacate",
        emoji: "🥑", mejor: true,
        kcal: 160, carbs: 8.5, azucares: 0.7, proteinas: 2, grasas: 14.7, grasasSat: 2.1, fibra: 6.7, sodio: 7,
        porque: "Aporta grasas monoinsaturadas cardiosaludables, rica cantidad de fibra y un contenido de grasas saturadas sensiblemente menor."
      },
      {
        nombre: "Almendras",
        emoji: "🥜", mejor: true,
        kcal: 579, carbs: 21.6, azucares: 4.4, proteinas: 21.2, grasas: 49.9, grasasSat: 3.8, fibra: 12.5, sodio: 1,
        porque: "Ofrecen un perfil lipídico más favorable rico en grasas insaturadas, además de aportar mayor cantidad de proteínas y fibra."
      }
    ]
  },
  {
    id: "ia_crema_de_cacahuete",
    nombre: "Crema de cacahuete (100% cacahuete natural)",
    aliases: ["crema de cacahuete", "crema de cacahuete (100% cacahuete natural)"],
    categorias: ["Untables"],
    emoji: "🥜",
    rating: "B",
    kcal: 588, carbs: 20, azucares: 5, proteinas: 25, grasas: 50, grasasSat: 10, fibra: 8, sodio: 5,
    motivo: "La crema de cacahuete natural (100% cacahuete, sin azúcares ni aceites añadidos) es una excelente fuente de proteínas vegetales [1], fibra dietética y grasas saludables, principalmente monoinsaturadas y poliinsaturadas, que son beneficiosas para la salud cardiovascular y el perfil lipídico [2]. Los cacahuetes, aunque legumbres, comparten muchas propiedades nutricionales con los frutos secos y poseen compuestos bioactivos con potencial nutracéutico [3]. Aporta vitaminas como la E y del grupo B, y minerales como el magnesio, fósforo y zinc. Sin embargo, su alta densidad calórica exige moderación en las porciones. Es crucial destacar que esta calificación se refiere a la crema de cacahuete 100% natural; las versiones comerciales con azúcares añadidos, aceites hidrogenados (como el de palma) o alto contenido de sodio verían su calificación reducida significativamente, ya que el consumo excesivo de azúcares y grasas de baja calidad puede tener efectos negativos en la salud metabólica [4, 2].",
    estudios: [
      {
        "pmid": "38626029",
        "titulo": "Common questions and misconceptions about protein supplementation: what does the scientific evidence really show?",
        "revista": "Journal of the International Society of Sports Nutrition",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38626029/"
      },
      {
        "pmid": "33945244",
        "titulo": "The Effect of Diet on Cardiovascular Disease and Lipid and Lipoprotein Levels.",
        "revista": "",
        "anio": "2000",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33945244/"
      },
      {
        "pmid": "34579146",
        "titulo": "Nuts: Natural Pleiotropic Nutraceuticals.",
        "revista": "Nutrients",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34579146/"
      },
      {
        "pmid": "30122560",
        "titulo": "Dietary carbohydrate intake and mortality: a prospective cohort study and meta-analysis.",
        "revista": "The Lancet. Public health",
        "anio": "2018",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30122560/"
      }
    ],
    sustitutos: [
      {
        nombre: "Aceite de Oliva Virgen Extra (AOVE)",
        emoji: "🫒", mejor: true,
        kcal: 884, carbs: 0, azucares: 0, proteinas: 0, grasas: 100, grasasSat: 14, fibra: 0, sodio: 0,
        porque: "Es una grasa monoinsaturada pura, pilar de la dieta mediterránea. Muy rico en ácido oleico y antioxidantes (polifenoles), con demostrados beneficios cardiovasculares y antiinflamatorios [2]. A diferencia de la crema de cacahuete, carece de azúcares y sodio. Si bien no es un sustituto directo en textura o sabor, es una opción superior para incorporar grasas saludables en la dieta como aderezo o para untar."
      },
      {
        nombre: "Crema de almendras natural (100% almendras)",
        emoji: "🌰", mejor: false,
        kcal: 600, carbs: 20, azucares: 5, proteinas: 21, grasas: 53, grasasSat: 4, fibra: 12, sodio: 5,
        porque: "Ofrece un perfil nutricional similar, pero a menudo con menos grasas saturadas y una mayor cantidad de fibra. Es rica en vitamina E y otros micronutrientes. Al igual que la crema de cacahuete, es una excelente fuente de grasas saludables, proteínas y fibra, y es fundamental elegir versiones 100% almendras sin aditivos."
      }
    ]
  },
  {
    id: "ia_curry_en_polvo",
    nombre: "Curry en polvo",
    aliases: ["curry en polvo"],
    categorias: ["Condimentos y Aditivos"],
    emoji: "🌶️",
    rating: "A",
    kcal: 325, carbs: 58, azucares: 3.1, proteinas: 12.7, grasas: 13.8, grasasSat: 2.3, fibra: 33.2, sodio: 52,
    motivo: "El curry en polvo es una mezcla de especias con un perfil nutricional muy interesante cuando se consume en las cantidades habituales. Aunque su valor calórico por 100g pueda parecer alto, se utiliza en pequeñas dosis. Destaca por su alto contenido en fibra. Uno de sus componentes principales es la cúrcuma, cuya sustancia activa, la curcumina, ha sido objeto de numerosos estudios por sus propiedades antioxidantes y antiinflamatorias, y su potencial en la prevención y tratamiento del cáncer en estudios de laboratorio [1], [2], [3], [4]. Sin embargo, sus efectos en humanos aún requieren confirmación en estudios clínicos [1]. Su bajo aporte de sodio (si no tiene sal añadida) y la riqueza en compuestos bioactivos lo convierten en un excelente condimento para mejorar el sabor y valor nutricional de las comidas.",
    estudios: [
      {
        "pmid": "27837604",
        "titulo": "Curcumin (Turmeric) and cancer.",
        "revista": "Journal of B.U.ON. : official journal of the Balkan Union of Oncology",
        "anio": "2016",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27837604/"
      },
      {
        "pmid": "20955148",
        "titulo": "The targets of curcumin.",
        "revista": "Current drug targets",
        "anio": "2011",
        "url": "https://pubmed.ncbi.nlm.nih.gov/20955148/"
      },
      {
        "pmid": "22566109",
        "titulo": "Curcumin--from molecule to biological function.",
        "revista": "Angewandte Chemie (International ed. in English)",
        "anio": "2012",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22566109/"
      },
      {
        "pmid": "6993103",
        "titulo": "Turmeric--chemistry, technology, and quality.",
        "revista": "Critical reviews in food science and nutrition",
        "anio": "1980",
        "url": "https://pubmed.ncbi.nlm.nih.gov/6993103/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_datiles",
    nombre: "Dátiles",
    aliases: ["datiles", "dátiles"],
    categorias: ["Frutas"],
    emoji: "🌴",
    rating: "B",
    kcal: 282, carbs: 75, azucares: 66, proteinas: 2.5, grasas: 0.4, grasasSat: 0.04, fibra: 8, sodio: 2,
    motivo: "Los dátiles son una fuente natural de energía, ricos en azúcares naturales pero también en fibra dietética, lo que ayuda a moderar la absorción de dichos azúcares. Aportan vitaminas, minerales y son notablemente ricos en polifenoles, especialmente flavonoides, que pueden tener efectos beneficiosos sobre la salud vascular [1]. Su valor nutricional y potencial terapéutico son bien documentados [2, 3]. Dada su alta concentración de azúcares y calorías, se recomienda un consumo moderado, especialmente para personas con diabetes o aquellas que buscan controlar su ingesta calórica.",
    estudios: [
      {
        "pmid": "33925062",
        "titulo": "Date Palm Fruit (Phoenix dactylifera): Effects on Vascular Health and Future Research Directions.",
        "revista": "International journal of molecular sciences",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33925062/"
      },
      {
        "pmid": "38611330",
        "titulo": "An Overview of Date (Phoenix dactylifera) Fruits as an Important Global Food Resource.",
        "revista": "Foods (Basel, Switzerland)",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38611330/"
      },
      {
        "pmid": "42011224",
        "titulo": "Nutraceuticals of Phoenix dactylifera L.: Physicochemistry, Nutritional Value and Therapeutic Potential.",
        "revista": "Drug design, development and therapy",
        "anio": "2026",
        "url": "https://pubmed.ncbi.nlm.nih.gov/42011224/"
      }
    ],
    sustitutos: [
      {
        nombre: "Manzana",
        emoji: "🍎", mejor: true,
        kcal: 52, carbs: 14, azucares: 10, proteinas: 0.3, grasas: 0.2, grasasSat: 0, fibra: 2.4, sodio: 1,
        porque: "Ofrece dulzor y fibra con un contenido calórico y de azúcares significativamente menor por cada 100g, contribuyendo a la saciedad. Es una excelente opción para quienes buscan reducir la ingesta de azúcares concentrados pero desean disfrutar de una fruta dulce y nutritiva."
      }
    ]
  },
  {
    id: "ia_garbanzos",
    nombre: "Garbanzos (cocidos)",
    aliases: ["garbanzos", "garbanzos (cocidos)"],
    categorias: ["Proteína vegetal"],
    emoji: "🫘",
    rating: "A",
    kcal: 164, carbs: 27.4, azucares: 4.8, proteinas: 8.9, grasas: 2.6, grasasSat: 0.3, fibra: 7.6, sodio: 0.01,
    motivo: "Los garbanzos son un alimento de perfil nutricional excelente (calificación A). Destacan por ser una gran fuente de proteínas de origen vegetal con un buen balance de aminoácidos esenciales, carbohidratos de absorción lenta y un alto contenido en fibra dietética [1]. Además, su contenido en grasas es bajo y consiste principalmente en ácidos grasos insaturados cardiosaludables [1].",
    estudios: [
      {
        "pmid": "22916806",
        "titulo": "Nutritional quality and health benefits of chickpea (Cicer arietinum L.): a review.",
        "revista": "The British journal of nutrition",
        "anio": "2012",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22916806/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_granada",
    nombre: "Granada",
    aliases: ["granada"],
    categorias: ["Frutas"],
    emoji: "🍇",
    rating: "A",
    kcal: 83, carbs: 19, azucares: 14, proteinas: 1.7, grasas: 1.2, grasasSat: 0.1, fibra: 4, sodio: 3,
    motivo: "La granada es una fruta excepcionalmente saludable, rica en fibra, vitaminas (como la vitamina C y K), y minerales esenciales (potasio, fósforo, magnesio, calcio). Su alto contenido en polifenoles, incluyendo flavonoides, ácidos fenólicos y taninos, le confiere potentes propiedades antioxidantes y antiinflamatorias, contribuyendo a la categoría de 'alimento funcional' con efectos terapéuticos [1]. Estudios sugieren que su consumo puede ofrecer beneficios cardiovasculares, como la reducción del grosor de la íntima-media carotídea, la presión arterial y la oxidación del colesterol LDL [2]. Es una excelente opción para una dieta equilibrada y la prevención del envejecimiento inflamatorio [1].",
    estudios: [
      {
        "pmid": "39275022",
        "titulo": "Pomegranate (Punica granatum L.) Extract Effects on Inflammaging.",
        "revista": "Molecules (Basel, Switzerland)",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39275022/"
      },
      {
        "pmid": "15158307",
        "titulo": "Pomegranate juice consumption for 3 years by patients with carotid artery stenosis reduces common carotid intima-media thickness, blood pressure and LDL oxidation.",
        "revista": "Clinical nutrition (Edinburgh, Scotland)",
        "anio": "2004",
        "url": "https://pubmed.ncbi.nlm.nih.gov/15158307/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_harina_de_avena_integral",
    nombre: "Harina de avena integral",
    aliases: ["harina de avena integral"],
    categorias: ["Cereales"],
    emoji: "🌾",
    rating: "A",
    kcal: 361, carbs: 62, azucares: 1.1, proteinas: 13.5, grasas: 6.5, grasasSat: 1.2, fibra: 10, sodio: 0,
    motivo: "La harina de avena integral es un alimento de excelente calidad nutricional. Destaca por tener un bajo índice glucémico en comparación con otros cereales refinados, gracias a la presencia de fibra soluble (especialmente betaglucanos), proteínas y compuestos fenólicos que mitigan la respuesta glucémica [1]. Asimismo, la ingesta de betaglucanos procedentes de la avena está clínicamente respaldada por sus efectos beneficiosos en la salud cardiovascular y la regulación del colesterol [2].",
    estudios: [
      {
        "pmid": "34200160",
        "titulo": "Oat-Based Foods: Chemical Constituents, Glycemic Index, and the Effect of Processing.",
        "revista": "Foods (Basel, Switzerland)",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34200160/"
      },
      {
        "pmid": "32728751",
        "titulo": "Global review of heart health claims for oat beta-glucan products.",
        "revista": "Nutrition reviews",
        "anio": "2020",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32728751/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_harina_de_garbanzo",
    nombre: "Harina de garbanzo",
    aliases: ["harina de garbanzo"],
    categorias: ["Proteína vegetal"],
    emoji: "🧆",
    rating: "A",
    kcal: 367, carbs: 58, azucares: 10, proteinas: 22, grasas: 6, grasasSat: 0.6, fibra: 10, sodio: 0.06,
    motivo: "La harina de garbanzo es una excelente fuente de proteínas y fibra vegetal de alta calidad. Su consumo generalizado ha experimentado un notable aumento como reflejo de sus beneficios nutricionales [1]. Además, su adición o uso sustitutivo en productos horneados destaca por optimizar las propiedades glucémicas de las preparaciones en comparación con las harinas de cereales convencionales [2].",
    estudios: [
      {
        "pmid": "38004178",
        "titulo": "UK Chickpea Consumption Doubled from 2008/09-2018/19.",
        "revista": "Nutrients",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38004178/"
      },
      {
        "pmid": "25829607",
        "titulo": "Organoleptic and glycemic properties of chickpea-wheat composite breads.",
        "revista": "Journal of food science and technology",
        "anio": "2015",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25829607/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_harina_de_maiz",
    nombre: "Harina de maíz",
    aliases: ["harina de maíz"],
    categorias: ["Cereales"],
    emoji: "🌽",
    rating: "B",
    kcal: 361, carbs: 76.8, azucares: 0.6, proteinas: 6.9, grasas: 1.8, grasasSat: 0.3, fibra: 3.9, sodio: 5,
    motivo: "La harina de maíz es una fuente básica de energía a base de carbohidratos complejos y es naturalmente libre de gluten [1]. Aunque el procesamiento tradicional o refinado reduce la fibra del grano entero [2], las políticas de fortificación de la harina de maíz con nutrientes esenciales como el ácido fólico son ampliamente reconocidas para prevenir defectos del tubo neural [3]. Mantiene un buen perfil nutricional por su reducido contenido de grasas saturadas, azúcares añadidos y sodio.",
    estudios: [
      {
        "pmid": "24650320",
        "titulo": "Global maize production, utilization, and consumption.",
        "revista": "Annals of the New York Academy of Sciences",
        "anio": "2014",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24650320/"
      },
      {
        "pmid": "24329576",
        "titulo": "Processing maize flour and corn meal food products.",
        "revista": "Annals of the New York Academy of Sciences",
        "anio": "2014",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24329576/"
      },
      {
        "pmid": "36882610",
        "titulo": "Neural tube defects: a review of global prevalence, causes, and primary prevention.",
        "revista": "Child's nervous system : ChNS : official journal of the International Society for Pediatric Neurosurgery",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36882610/"
      }
    ],
    sustitutos: [
      {
        nombre: "Harina de avena integral",
        emoji: "🌾", mejor: true,
        kcal: 370, carbs: 60, azucares: 1.1, proteinas: 14, grasas: 6.9, grasasSat: 1.2, fibra: 10, sodio: 2,
        porque: "Aporta un mayor contenido de fibra soluble (beta-glucanos) y casi el doble de proteína, favoreciendo un mejor control del índice glucémico y la saciedad."
      },
      {
        nombre: "Harina de garbanzo",
        emoji: "🧆", mejor: true,
        kcal: 387, carbs: 58, azucares: 10.7, proteinas: 22, grasas: 6.7, grasasSat: 0.7, fibra: 10, sodio: 6,
        porque: "Proporciona una cantidad considerablemente superior de proteína vegetal y fibra, ideal para enriquecer nutricionalmente las elaboraciones y mantener niveles estables de glucosa."
      }
    ]
  },
  {
    id: "ia_harina_de_trigo",
    nombre: "Harina de trigo",
    aliases: ["harina de trigo"],
    categorias: ["Cereales"],
    emoji: "🌾",
    rating: "C",
    kcal: 364, carbs: 76.3, azucares: 0.3, proteinas: 10.3, grasas: 1, grasasSat: 0.2, fibra: 2.7, sodio: 2,
    motivo: "La harina de trigo refinada es una fuente concentrada de carbohidratos, pero su proceso de molienda elimina gran parte de la fibra, vitaminas y minerales presentes en el grano entero. Esto resulta en un menor aporte de fibra y un índice glucémico más elevado en comparación con las opciones integrales. Aunque puede estar fortificada con nutrientes como el ácido fólico, importante para la prevención de defectos del tubo neural [1, 2], carece de los beneficios digestivos y de saciedad que ofrece la fibra presente en las harinas integrales [3].",
    estudios: [
      {
        "pmid": "36882610",
        "titulo": "Neural tube defects: a review of global prevalence, causes, and primary prevention.",
        "revista": "Child's nervous system : ChNS : official journal of the International Society for Pediatric Neurosurgery",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36882610/"
      },
      {
        "pmid": "31554122",
        "titulo": "Flour fortification for nutritional and health improvement: A review.",
        "revista": "Food research international (Ottawa, Ont.)",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31554122/"
      },
      {
        "pmid": "33337058",
        "titulo": "Understanding whole-wheat flour and its effect in breads: A review.",
        "revista": "Comprehensive reviews in food science and food safety",
        "anio": "2020",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33337058/"
      }
    ],
    sustitutos: [
      {
        nombre: "Harina integral de trigo",
        emoji: "🌾", mejor: true,
        kcal: 340, carbs: 70, azucares: 0.4, proteinas: 13, grasas: 2.5, grasasSat: 0.4, fibra: 12, sodio: 2,
        porque: "Contiene el grano de trigo completo, lo que significa que aporta significativamente más fibra dietética, vitaminas del grupo B, antioxidantes y minerales como hierro y magnesio. Esto mejora la digestión, prolonga la saciedad y ayuda a mantener niveles de glucosa en sangre más estables en comparación con la harina refinada [3]."
      },
      {
        nombre: "Harina de avena",
        emoji: "🥣", mejor: true,
        kcal: 389, carbs: 68, azucares: 1.1, proteinas: 13.5, grasas: 7, grasasSat: 1.2, fibra: 10, sodio: 3,
        porque: "Es rica en fibra soluble, especialmente betaglucanos, que contribuyen a reducir el colesterol LDL y a regular los niveles de azúcar en sangre. Además, ofrece un mayor aporte de proteínas y grasas saludables que la harina de trigo refinada, y es una buena opción para aquellos que buscan alternativas sin gluten (si está certificada)."
      }
    ]
  },
  {
    id: "ia_harina_de_trigo_integral",
    nombre: "Harina de trigo integral",
    aliases: ["harina de trigo integral"],
    categorias: ["Cereales", "Proteína vegetal"],
    emoji: "🌾",
    rating: "A",
    kcal: 340, carbs: 65, azucares: 1, proteinas: 13, grasas: 2.5, grasasSat: 0.4, fibra: 12, sodio: 3,
    motivo: "La harina de trigo integral es una excelente fuente de fibra dietética, que es crucial para la salud digestiva, el control del azúcar en sangre y la sensación de saciedad. A diferencia de la harina refinada, conserva el salvado y el germen, lo que la hace rica en vitaminas del grupo B, minerales como hierro, magnesio y zinc, y antioxidantes. Su consumo se asocia con un patrón dietético más saludable y se alinea con dietas con efectos antiinflamatorios y beneficios para la salud cardiovascular [1, 2]. Además, su perfil nutricional es beneficioso para la nutrición general, incluyendo periodos como el embarazo y la lactancia, donde los cereales integrales son recomendados [3].",
    estudios: [
      {
        "pmid": "39411832",
        "titulo": "Overview of anti-inflammatory diets and their promising effects on non-communicable diseases.",
        "revista": "The British journal of nutrition",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39411832/"
      },
      {
        "pmid": "29496410",
        "titulo": "Plant-based diets and cardiovascular health.",
        "revista": "Trends in cardiovascular medicine",
        "anio": "2018",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29496410/"
      },
      {
        "pmid": "34968458",
        "titulo": "The importance of nutrition in pregnancy and lactation: lifelong consequences.",
        "revista": "American journal of obstetrics and gynecology",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34968458/"
      }
    ],
    sustitutos: [
      {
        nombre: "Harina de avena integral",
        emoji: "🥣", mejor: true,
        kcal: 389, carbs: 66, azucares: 1.7, proteinas: 16.9, grasas: 6.9, grasasSat: 1.2, fibra: 10.6, sodio: 4,
        porque: "La harina de avena integral es otra excelente opción de cereal completo, conocida por su alto contenido de beta-glucanos, un tipo de fibra soluble que contribuye a la salud cardiovascular y a la regulación del colesterol. Ofrece un perfil nutricional similar al trigo integral, siendo una buena fuente de proteínas, vitaminas y minerales."
      },
      {
        nombre: "Harina de espelta integral",
        emoji: "🍞", mejor: true,
        kcal: 338, carbs: 63, azucares: 1, proteinas: 14.6, grasas: 2.4, grasasSat: 0.4, fibra: 10.7, sodio: 5,
        porque: "La espelta es un grano antiguo con un perfil nutricional muy similar al trigo, pero a menudo se percibe como más fácil de digerir para algunas personas. Como harina integral, mantiene todos sus nutrientes, incluyendo fibra, proteínas y micronutrientes, siendo una alternativa muy saludable para la panificación y otras preparaciones."
      }
    ]
  },
  {
    id: "ia_huevo_de_codorniz",
    nombre: "Huevo de codorniz",
    aliases: ["huevo de codorniz"],
    categorias: ["Proteínas"],
    emoji: "🥚",
    rating: "A",
    kcal: 158, carbs: 0.4, azucares: 0.4, proteinas: 13.1, grasas: 11.1, grasasSat: 3.6, fibra: 0, sodio: 0.14,
    motivo: "El huevo de codorniz es un alimento de excelente calidad nutricional gracias a su gran aporte de proteínas de alto valor biológico y ácidos grasos esenciales. La literatura científica destaca su elevado potencial nutricional, funcional y terapéutico [1], convirtiéndolo en una opción excelente y sumamente saludable dentro de una alimentación equilibrada.",
    estudios: [
      {
        "pmid": "36564868",
        "titulo": "Characterization of quail egg powders obtained by liquid egg drying and foam-mat drying.",
        "revista": "Journal of the science of food and agriculture",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36564868/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_jamon_cocido",
    nombre: "Jamón cocido",
    aliases: ["jamón cocido"],
    categorias: ["Cárnicos", "Proteínas"],
    emoji: "🥓",
    rating: "C",
    kcal: 105, carbs: 1.5, azucares: 1, proteinas: 17.5, grasas: 3, grasasSat: 1.1, fibra: 0, sodio: 900,
    motivo: "Aunque aporta proteínas de buen valor biológico y un nivel moderado de calorías y grasas, el jamón cocido se clasifica como carne procesada. Suele contener una elevada cantidad de sodio y aditivos como nitritos y fosfatos, cuyo consumo habitual se vincula con diversos riesgos para la salud [1][2], por lo que conviene limitar su ingesta dentro de la calidad global de la dieta [3].",
    estudios: [
      {
        "pmid": "27597529",
        "titulo": "Potential health hazards of eating red meat.",
        "revista": "Journal of internal medicine",
        "anio": "2017",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27597529/"
      },
      {
        "pmid": "26621069",
        "titulo": "Processed meat: the real villain?",
        "revista": "The Proceedings of the Nutrition Society",
        "anio": "2016",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26621069/"
      },
      {
        "pmid": "34836809",
        "titulo": "Review: Quality of animal-source foods.",
        "revista": "Animal : an international journal of animal bioscience",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34836809/"
      }
    ],
    sustitutos: [
      {
        nombre: "Pechuga de pollo a la plancha",
        emoji: "🍗", mejor: true,
        kcal: 120, carbs: 0, azucares: 0, proteinas: 23, grasas: 2.5, grasasSat: 0.7, fibra: 0, sodio: 70,
        porque: "Es una carne fresca y magra con un aporte proteico superior, totalmente libre de aditivos nitrificantes y con un contenido de sodio notablemente menor."
      },
      {
        nombre: "Lomo de cerdo a la plancha",
        emoji: "🥩", mejor: true,
        kcal: 140, carbs: 0, azucares: 0, proteinas: 22, grasas: 5, grasasSat: 1.8, fibra: 0, sodio: 65,
        porque: "Proporciona la misma fuente de proteína animal que el jamón cocido pero en su forma fresca y no procesada, evitando conservantes, azúcares añadidos y exceso de sal."
      }
    ]
  },
  {
    id: "ia_jengibre",
    nombre: "Jengibre",
    aliases: ["jengibre"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🫚",
    rating: "A",
    kcal: 80, carbs: 18, azucares: 1.7, proteinas: 1.8, grasas: 0.8, grasasSat: 0.2, fibra: 2, sodio: 13,
    motivo: "El jengibre es un alimento de calificación A por su excepcional perfil nutricional y sus múltiples beneficios para la salud. Es bajo en calorías y grasas, y aporta una cantidad moderada de fibra. Su principal valor reside en sus compuestos bioactivos, como los gingeroles y shogaoles [1], responsables de sus potentes propiedades antioxidantes y antiinflamatorias [2]. Estudios demuestran su potencial para mejorar la calidad de vida en pacientes con enfermedades inflamatorias como la colitis ulcerosa, la enfermedad de Crohn y la artritis reumatoide [2]. Además, se le reconoce como una fuente prometedora de agentes beneficiosos para la salud [3] y se ha investigado su uso en el manejo de la diabetes mellitus [4].",
    estudios: [
      {
        "pmid": "26228533",
        "titulo": "Gingerols and shogaols: Important nutraceutical principles from ginger.",
        "revista": "Phytochemistry",
        "anio": "2015",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26228533/"
      },
      {
        "pmid": "36364048",
        "titulo": "Effect of Ginger on Inflammatory Diseases.",
        "revista": "Molecules (Basel, Switzerland)",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36364048/"
      },
      {
        "pmid": "32954562",
        "titulo": "Ginger (Zingiber officinale Rosc.) and its bioactive components are potential resources for health beneficial agents.",
        "revista": "Phytotherapy research : PTR",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32954562/"
      },
      {
        "pmid": "37240430",
        "titulo": "The Management of Diabetes Mellitus Using Medicinal Plants and Vitamins.",
        "revista": "International journal of molecular sciences",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37240430/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_lentejas",
    nombre: "Lentejas",
    aliases: ["lentejas"],
    categorias: ["Proteína vegetal"],
    emoji: "🫘",
    rating: "A",
    kcal: 352, carbs: 63.4, azucares: 2, proteinas: 24.6, grasas: 1.1, grasasSat: 0.2, fibra: 10.7, sodio: 0.01,
    motivo: "Las lentejas son un alimento excelente de origen vegetal, con un perfil nutricional excepcional rico en proteínas y fibra. Destacan por su gran aporte de fitoquímicos como polifenoles, saponinas y fitosteroles con amplios beneficios para la salud [1]. Además, se ha demostrado que poseen efectos antiinflamatorios y antimicrobianos [2], siendo una de las legumbres clave en las estrategias de biofortificación proteica para mejorar la salud humana global [3].",
    estudios: [
      {
        "pmid": "36297337",
        "titulo": "Polyphenols, Saponins and Phytosterols in Lentils and Their Health Benefits: An Overview.",
        "revista": "Pharmaceuticals (Basel, Switzerland)",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36297337/"
      },
      {
        "pmid": "38501131",
        "titulo": "Health-promoting benefits of lentils: Anti-inflammatory and anti-microbial effects.",
        "revista": "Current research in physiology",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38501131/"
      },
      {
        "pmid": "35449893",
        "titulo": "Protein Biofortification in Lentils (Lens culinaris Medik.) Toward Human Health.",
        "revista": "Frontiers in plant science",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35449893/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_levadura",
    nombre: "Levadura nutricional",
    aliases: ["levadura", "levadura nutricional"],
    categorias: ["Suplemento Alimenticio"],
    emoji: "🌱",
    rating: "A",
    kcal: 370, carbs: 38, azucares: 0, proteinas: 50, grasas: 4, grasasSat: 1, fibra: 23, sodio: 50,
    motivo: "La levadura nutricional es una fuente excepcional de nutrientes, lo que le otorga una calificación 'A'. Destaca por su alto contenido de proteínas completas, esenciales para la reparación y crecimiento muscular, y su elevado aporte de fibra, que favorece la salud digestiva y la saciedad. Es particularmente valorada por ser una excelente fuente de vitaminas del grupo B, incluyendo la vitamina B12 (a menudo fortificada), crucial para dietas veganas y vegetarianas. Es baja en grasas saturadas y azúcares. Sin embargo, es importante señalar que la levadura es una fuente significativa de purinas [1], por lo que su consumo debe ser moderado o evitado por personas con gota o hiperuricemia, bajo la supervisión de un profesional de la salud. Para la población general, es un alimento altamente nutritivo y versátil.",
    estudios: [
      {
        "pmid": "24553148",
        "titulo": "Total purine and purine base content of common foodstuffs for facilitating nutritional therapy for gout and hyperuricemia.",
        "revista": "Biological & pharmaceutical bulletin",
        "anio": "2014",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24553148/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_levadura_quimica",
    nombre: "Levadura química",
    aliases: ["levadura química"],
    categorias: ["Condimentos y Aditivos"],
    emoji: "🥐",
    rating: "E",
    kcal: 98, carbs: 23.5, azucares: 0, proteinas: 0.1, grasas: 0.1, grasasSat: 0, fibra: 0, sodio: 10400,
    motivo: "La levadura química es un ingrediente que, por cada 100g, presenta un contenido extremadamente alto de sodio (aproximadamente 10,400 mg), lo cual excede con creces las recomendaciones diarias de ingesta y representa un riesgo para la salud cardiovascular al contribuir a la hipertensión arterial. Aunque se utiliza en pequeñas cantidades en la cocina, su perfil nutricional por 100g es muy desfavorable. Algunas formulaciones pueden incluir bitartrato de potasio (cremor tártaro), aportando potasio, un mineral vital para la salud cardiovascular, con una ingesta recomendada por la OMS de al menos 3,510 mg al día [1]. No obstante, el aporte de potasio en la levadura química tradicional es generalmente inferior al de sodio, y el alto contenido de este último es la principal preocupación nutricional. Mantener un equilibrio adecuado de electrolitos como el potasio es crucial, ya que tanto la deficiencia (hipopotasemia) como el exceso (hiperpotasemia) pueden tener graves consecuencias para la salud [1].",
    estudios: [
      {
        "pmid": "36689973",
        "titulo": "Potassium Disorders: Hypokalemia and Hyperkalemia.",
        "revista": "American family physician",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36689973/"
      }
    ],
    sustitutos: [
      {
        nombre: "Levadura química baja en sodio",
        emoji: "🧂⬇️", mejor: true,
        kcal: 50, carbs: 20, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 500,
        porque: "Reduce drásticamente el contenido de sodio, un factor de riesgo para la hipertensión y enfermedades cardiovasculares, mientras mantiene la capacidad de leudado. Algunas versiones reemplazan parte del sodio con potasio, un mineral esencial para la salud cardiovascular [1]."
      },
      {
        nombre: "Mezcla casera de cremor tártaro, bicarbonato de sodio y maicena",
        emoji: "🥣", mejor: true,
        kcal: 220, carbs: 53, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 6700,
        porque: "Permite un control preciso sobre los ingredientes y las proporciones. Al usar cremor tártaro (bitartrato de potasio), se introduce un aporte significativo de potasio (aproximadamente 8,000 mg por 100g), un electrolito crucial para la salud cardiovascular y el equilibrio hídrico, conforme a las recomendaciones de la OMS [1], a la vez que se puede ajustar la cantidad de sodio."
      }
    ]
  },
  {
    id: "ia_lichi",
    nombre: "Lichi",
    aliases: ["lichi"],
    categorias: ["Frutas"],
    emoji: "🍒",
    rating: "A",
    kcal: 66, carbs: 16.5, azucares: 15.2, proteinas: 0.8, grasas: 0.4, grasasSat: 0.1, fibra: 1.3, sodio: 1,
    motivo: "El lichi es una fruta tropical con un alto valor nutritivo y rica en compuestos bioactivos con propiedades medicinales y antioxidantes [1]. Diversas revisiones científicas destacan sus potenciales beneficios en el control glucémico [2] y en la prevención de enfermedades crónicas como el cáncer [3]. Dado que es una fruta fresca y natural rica en vitamina C, constituye una opción excelente y muy saludable dentro de una dieta equilibrada.",
    estudios: [
      {
        "pmid": "33337091",
        "titulo": "Nutrient components, health benefits, and safety of litchi (Litchi chinensis Sonn.): A review.",
        "revista": "Comprehensive reviews in food science and food safety",
        "anio": "2020",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33337091/"
      },
      {
        "pmid": "34874786",
        "titulo": "Chemical Characterization and Evaluation of the Antihyperglycemic Effect of Lychee (Litchi chinensis Sonn.) cv. Brewster.",
        "revista": "Journal of medicinal food",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34874786/"
      },
      {
        "pmid": "38936122",
        "titulo": "Litchi (Litchi chinensis Sonn.): A comprehensive and critical review on cancer prevention and intervention.",
        "revista": "Food chemistry",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38936122/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_margarina_100_vegetal",
    nombre: "Margarina 100% vegetal",
    aliases: ["margarina 100% vegetal"],
    categorias: ["Grasas", "Untables"],
    emoji: "🧈",
    rating: "C",
    kcal: 717, carbs: 0.5, azucares: 0.5, proteinas: 0.5, grasas: 80, grasasSat: 18, fibra: 0, sodio: 380,
    motivo: "La margarina 100% vegetal, aunque a menudo se presenta como una alternativa más saludable a la mantequilla por su origen vegetal y, en ocasiones, por su menor contenido en grasas saturadas, es un producto ultraprocesado [1]. A pesar de que las formulaciones modernas han reducido o eliminado las grasas trans industriales, los aceites vegetales que la componen suelen estar refinados e hidrogenados o interesterificados, lo que afecta su perfil lipídico y la convierte en una opción menos ideal que las grasas sin procesar. Un análisis comparativo de la margarina con otras grasas destaca la importancia de elegir opciones más saludables [2]. Las dietas cardiosaludables, como la mediterránea, priorizan grasas monoinsaturadas de fuentes enteras y sin procesar como el aceite de oliva virgen extra [3], [4].",
    estudios: [
      {
        "pmid": "41129036",
        "titulo": "Ultra-processed Plant Foods: Are They Worse than their Unprocessed Animal-Based Counterparts?",
        "revista": "Current nutrition reports",
        "anio": "2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41129036/"
      },
      {
        "pmid": "39723069",
        "titulo": "A Comparative Analysis of Butter, Ghee, and Margarine and Its Implications for Healthier Fat and Oil Group Choices: SWOT Analysis.",
        "revista": "Food science & nutrition",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39723069/"
      },
      {
        "pmid": "30864165",
        "titulo": "Mediterranean-style diet for the primary and secondary prevention of cardiovascular disease.",
        "revista": "The Cochrane database of systematic reviews",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30864165/"
      },
      {
        "pmid": "32883047",
        "titulo": "The Role of Specific Components of a Plant-Based Diet in Management of Dyslipidemia and the Impact on Cardiovascular Risk.",
        "revista": "Nutrients",
        "anio": "2020",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32883047/"
      }
    ],
    sustitutos: [
      {
        nombre: "Aceite de Oliva Virgen Extra (AOVE)",
        emoji: "🫒", mejor: true,
        kcal: 884, carbs: 0, azucares: 0, proteinas: 0, grasas: 100, grasasSat: 14, fibra: 0, sodio: 0,
        porque: "Es una grasa virgen, pilar de la dieta mediterránea [1], rico en grasas monoinsaturadas y antioxidantes, sin procesar. Ideal para cocinar y como aderezo, ofreciendo beneficios cardiovasculares."
      },
      {
        nombre: "Aguacate",
        emoji: "🥑", mejor: true,
        kcal: 160, carbs: 8.5, azucares: 0.7, proteinas: 2, grasas: 14.6, grasasSat: 2.1, fibra: 6.7, sodio: 7,
        porque: "Es una fruta entera, fuente de grasas monoinsaturadas saludables, fibra y una amplia gama de vitaminas y minerales. Es un alimento mínimamente procesado, ideal para untar y añadir a ensaladas."
      }
    ]
  },
  {
    id: "ia_margarina_vegetal_sin_grasas_trans",
    nombre: "Margarina vegetal sin grasas trans",
    aliases: ["margarina vegetal sin grasas trans"],
    categorias: ["Grasas", "Untables"],
    emoji: "🧈",
    rating: "C",
    kcal: 720, carbs: 0.5, azucares: 0, proteinas: 0.5, grasas: 80, grasasSat: 18, fibra: 0, sodio: 500,
    motivo: "La margarina vegetal sin grasas trans es una opción mejorada respecto a las margarinas tradicionales con alto contenido de grasas trans, que han demostrado ser perjudiciales para la salud cardiovascular [1]. Sin embargo, sigue siendo un producto procesado a base de aceites vegetales. Aunque la ausencia de grasas trans es positiva, su perfil lipídico puede variar significativamente, conteniendo aún grasas saturadas, que deben consumirse con moderación para prevenir enfermedades cardiometabólicas [2, 3]. El proceso de interesterificación enzimática [4], común en la fabricación de estas margarinas, busca mejorar su textura sin crear grasas trans, pero no la convierte en una opción tan beneficiosa como las grasas insaturadas presentes en alimentos mínimamente procesados.",
    estudios: [
      {
        "pmid": "10983247",
        "titulo": "Trans fatty acid isomers in human health and in the food industry.",
        "revista": "Biological research",
        "anio": "1999",
        "url": "https://pubmed.ncbi.nlm.nih.gov/10983247/"
      },
      {
        "pmid": "19032965",
        "titulo": "Dietary fats and prevention of type 2 diabetes.",
        "revista": "Progress in lipid research",
        "anio": "2009",
        "url": "https://pubmed.ncbi.nlm.nih.gov/19032965/"
      },
      {
        "pmid": "33853582",
        "titulo": "Cooking oil/fat consumption and deaths from cardiometabolic diseases and other causes: prospective analysis of 521,120 individuals.",
        "revista": "BMC medicine",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33853582/"
      },
      {
        "pmid": "36336342",
        "titulo": "Enzymatic Interesterification of Vegetable Oil:A Review on Physicochemical and Functional Properties, and Its Health Effects.",
        "revista": "Journal of oleo science",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36336342/"
      }
    ],
    sustitutos: [
      {
        nombre: "Aceite de Oliva Virgen Extra",
        emoji: "🫒", mejor: true,
        kcal: 900, carbs: 0, azucares: 0, proteinas: 0, grasas: 100, grasasSat: 14, fibra: 0, sodio: 0,
        porque: "Es la mejor opción para cocinar y untar debido a su alto contenido de grasas monoinsaturadas (especialmente ácido oleico), polifenoles y antioxidantes. Su consumo se asocia con numerosos beneficios para la salud cardiovascular y un menor riesgo de enfermedades crónicas [2]. Es una grasa mínimamente procesada."
      },
      {
        nombre: "Aguacate",
        emoji: "🥑", mejor: true,
        kcal: 160, carbs: 8.5, azucares: 0.7, proteinas: 2, grasas: 14.7, grasasSat: 2.1, fibra: 6.7, sodio: 7,
        porque: "Una fruta rica en grasas monoinsaturadas saludables, fibra y una variedad de vitaminas y minerales. Ofrece saciedad y beneficios cardiovasculares, además de ser un alimento integral y no procesado que puede usarse como untable."
      }
    ]
  },
  {
    id: "ia_maiz",
    nombre: "Maíz",
    aliases: ["maíz"],
    categorias: ["Cereales", "Verduras y Hortalizas"],
    emoji: "🌽",
    rating: "A",
    kcal: 86, carbs: 19, azucares: 3.2, proteinas: 3.2, grasas: 1.2, grasasSat: 0.2, fibra: 2.7, sodio: 15,
    motivo: "El maíz es un alimento muy completo e integral, considerado tanto cereal como hortaliza. Aporta energía mediante carbohidratos de absorción compleja, fibra dietética y antioxidantes como la luteína y zeaxantina. Además de su alta calidad nutricional, constituye una fuente clave de biomasa para la alimentación global [1].",
    estudios: [
      {
        "pmid": "28349257",
        "titulo": "Corn-based vaccines: current status and prospects.",
        "revista": "Planta",
        "anio": "2017",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28349257/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_nueces",
    nombre: "Nueces",
    aliases: ["nueces"],
    categorias: ["Frutos Secos", "Grasas"],
    emoji: "🥜",
    rating: "A",
    kcal: 654, carbs: 13.7, azucares: 2.6, proteinas: 15.2, grasas: 65.2, grasasSat: 6.1, fibra: 6.7, sodio: 2,
    motivo: "Las nueces destacan por su elevado perfil nutricional y son una de las mejores fuentes vegetales de ácido alfa-linolénico (ALA), un omega-3 beneficioso para la salud cardiovascular y cognitiva [1]. Además, la evidencia científica respalda que su consumo ayuda a reducir el colesterol LDL [2], convirtiéndolas en un alimento altamente saludable.",
    estudios: [
      {
        "pmid": "35170723",
        "titulo": "Impact of α-Linolenic Acid, the Vegetable ω-3 Fatty Acid, on Cardiovascular Disease and Cognition.",
        "revista": "Advances in nutrition (Bethesda, Md.)",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35170723/"
      },
      {
        "pmid": "33762150",
        "titulo": "The effects of foods on LDL cholesterol levels: A systematic review of the accumulated evidence from systematic reviews and meta-analyses of randomized controlled trials.",
        "revista": "Nutrition, metabolism, and cardiovascular diseases : NMCD",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33762150/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_pan_rallado_integral",
    nombre: "Pan rallado integral",
    aliases: ["pan rallado integral"],
    categorias: ["Cereales"],
    emoji: "🍞",
    rating: "A",
    kcal: 360, carbs: 65, azucares: 4, proteinas: 13, grasas: 3.5, grasasSat: 0.7, fibra: 9, sodio: 450,
    motivo: "El pan rallado integral es una excelente opción debido a su alto contenido de fibra dietética, que contribuye a la salud digestiva, la saciedad y la regulación del azúcar en sangre. Al estar elaborado con grano entero, aporta más vitaminas, minerales y fitoquímicos en comparación con el pan rallado blanco. Su perfil nutricional lo convierte en una alternativa saludable para dar textura y volumen a diversos platos [1].",
    estudios: [
      {
        "pmid": "30200180",
        "titulo": "Evaluation of Nutritional and Technological Attributes of Whole Wheat Based Bread Fortified with Chia Flour.",
        "revista": "Foods (Basel, Switzerland)",
        "anio": "2018",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30200180/"
      }
    ],
    sustitutos: [
      {
        nombre: "copos de avena triturados",
        emoji: "🥣", mejor: true,
        kcal: 370, carbs: 60, azucares: 1, proteinas: 13, grasas: 7, grasasSat: 1.2, fibra: 10, sodio: 2,
        porque: "Aportan una cantidad similar de calorías pero con un perfil de fibra aún más alto (especialmente beta-glucanos), grasas saludables y un contenido de sodio significativamente menor. Son ideales para rebozados y añaden un toque crujiente."
      },
      {
        nombre: "pan rallado integral casero con semillas de lino y chía",
        emoji: "🍞", mejor: true,
        kcal: 390, carbs: 59, azucares: 3.4, proteinas: 13.9, grasas: 10.1, grasasSat: 1.3, fibra: 13.3, sodio: 360,
        porque: "Al añadir semillas de lino y chía al pan rallado integral casero, se potencia considerablemente el aporte de fibra y se añaden ácidos grasos omega-3 esenciales, mejorando el perfil nutricional y la densidad de nutrientes de forma similar a como se ha explorado en estudios para panes integrales [1]."
      }
    ]
  },
  {
    id: "ia_patata",
    nombre: "Patata",
    aliases: ["patata"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🥔",
    rating: "B",
    kcal: 87, carbs: 20.13, azucares: 0.82, proteinas: 1.87, grasas: 0.1, grasasSat: 0.03, fibra: 2.2, sodio: 6,
    motivo: "La patata es un tubérculo nutritivo, fuente de carbohidratos complejos, potasio y vitamina C, y bajo en grasas cuando se cocina de forma saludable (hervida o al vapor). Sin embargo, su índice glucémico puede ser elevado, afectando la respuesta de glucosa en sangre [1]. Estudios sugieren una asociación entre el consumo de patatas y el riesgo de diabetes tipo 2, especialmente en preparaciones menos saludables como las fritas [2]. Es importante controlar el tamaño de la porción y priorizar métodos de cocción saludables para maximizar sus beneficios y minimizar riesgos. No se ha encontrado evidencia directa en los estudios proporcionados sobre su relación con la prevención de endometriosis [3] o la mortalidad general [4].",
    estudios: [
      {
        "pmid": "40467897",
        "titulo": "Individual variations in glycemic responses to carbohydrates and underlying metabolic physiology.",
        "revista": "Nature medicine",
        "anio": "2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40467897/"
      },
      {
        "pmid": "40769531",
        "titulo": "Total and specific potato intake and risk of type 2 diabetes: results from three US cohort studies and a substitution meta-analysis of prospective cohorts.",
        "revista": "BMJ (Clinical research ed.)",
        "anio": "2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40769531/"
      },
      {
        "pmid": "38047410",
        "titulo": "[The importance of nutrition in the prevention of endometriosis - Systematic review].",
        "revista": "Nutricion hospitalaria",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38047410/"
      },
      {
        "pmid": "32076944",
        "titulo": "Dietary protein intake and all-cause and cause-specific mortality: results from the Rotterdam Study and a meta-analysis of prospective cohort studies.",
        "revista": "European journal of epidemiology",
        "anio": "2020",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32076944/"
      }
    ],
    sustitutos: [
      {
        nombre: "Boniato",
        emoji: "🍠", mejor: true,
        kcal: 76, carbs: 17.7, azucares: 3.3, proteinas: 1.6, grasas: 0.1, grasasSat: 0, fibra: 2.5, sodio: 10,
        porque: "El boniato tiene un índice glucémico generalmente más bajo que la patata, un mayor contenido de fibra y es una excelente fuente de betacarotenos (precursor de vitamina A), lo que lo convierte en una opción más favorable para el control de la glucemia."
      },
      {
        nombre: "Lentejas",
        emoji: "🥣", mejor: true,
        kcal: 116, carbs: 20.1, azucares: 0.3, proteinas: 9, grasas: 0.4, grasasSat: 0.1, fibra: 7.9, sodio: 2,
        porque: "Las lentejas son una legumbre con un índice glucémico muy bajo, un contenido significativamente mayor de proteínas y fibra, lo que contribuye a una mayor saciedad, un mejor control de la glucosa en sangre y un aporte nutricional más completo."
      }
    ]
  },
  {
    id: "ia_patata_cocida",
    nombre: "Patata cocida",
    aliases: ["patata cocida"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🥔",
    rating: "A",
    kcal: 77, carbs: 17.5, azucares: 0.8, proteinas: 2, grasas: 0.1, grasasSat: 0.03, fibra: 2, sodio: 6,
    motivo: "La patata cocida es una excelente fuente de carbohidratos complejos, fibra, vitaminas (como la C y B6) y minerales (especialmente potasio), siendo naturalmente baja en grasas y sodio. Contribuye a la saciedad y aporta energía sostenida. Además, es una fuente importante de antioxidantes, como se ha investigado en relación con sus beneficios para la salud humana [1]. El método de cocción, como el hervido, es una forma saludable de prepararla, preservando sus nutrientes y beneficios, a diferencia de otras preparaciones con grasas añadidas [2].",
    estudios: [
      {
        "pmid": "25674927",
        "titulo": "Metabolic Biosynthesis of Potato (Solanum tuberosum l.) Antioxidants and Implications for Human Health.",
        "revista": "Critical reviews in food science and nutrition",
        "anio": "2016",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25674927/"
      },
      {
        "pmid": "26920281",
        "titulo": "Health benefits of the potato affected by domestic cooking: A review.",
        "revista": "Food chemistry",
        "anio": "2016",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26920281/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_pavo",
    nombre: "Pavo",
    aliases: ["pavo"],
    categorias: ["Cárnicos", "Proteínas"],
    emoji: "🦃",
    rating: "A",
    kcal: 114, carbs: 0, azucares: 0, proteinas: 24.1, grasas: 1.5, grasasSat: 0.4, fibra: 0, sodio: 60,
    motivo: "La carne fresca de pavo es una excelente fuente de proteínas de alto valor biológico, muy baja en grasas totales y saturadas, y libre de carbohidratos. Es una opción sumamente saludable e idónea para la preservación de la masa muscular y el control calórico.",
    sustitutos: []
  },
  {
    id: "ia_pechuga_de_pollo",
    nombre: "Pechuga de pollo",
    aliases: ["pechuga de pollo"],
    categorias: ["Cárnicos", "Proteínas"],
    emoji: "🍗",
    rating: "A",
    kcal: 165, carbs: 0, azucares: 0, proteinas: 31, grasas: 3.6, grasasSat: 1, fibra: 0, sodio: 74,
    motivo: "La pechuga de pollo, especialmente sin piel y cocinada de forma saludable (a la plancha, asada), es una excelente fuente de proteínas de alto valor biológico (aproximadamente 31g por 100g), esencial para el mantenimiento y crecimiento muscular, y para la saciedad. Es notablemente baja en grasas totales y, especialmente, en grasas saturadas, lo que la convierte en una opción magra y cardiosaludable [1, 2]. No contiene carbohidratos ni azúcares, lo que la hace adecuada para diversas dietas. Además, es una buena fuente de diversas vitaminas del grupo B (como niacina y B6) y minerales esenciales como fósforo y selenio [3].",
    estudios: [
      {
        "pmid": "9429649",
        "titulo": "[Cholesterol content in chicken meat and chicken products].",
        "revista": "Archivos latinoamericanos de nutricion",
        "anio": "1997",
        "url": "https://pubmed.ncbi.nlm.nih.gov/9429649/"
      },
      {
        "pmid": "37931395",
        "titulo": "Concentration of lipids, cholesterol, and fatty acid profile in chicken breast meat affected by wooden breast myopathy frozen for up to 12 mo.",
        "revista": "Poultry science",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37931395/"
      },
      {
        "pmid": "31508593",
        "titulo": "Comparison of Functional Compounds and Micronutrients of Chicken Breast Meat by Breeds.",
        "revista": "Food science of animal resources",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31508593/"
      }
    ],
    sustitutos: [
      {
        nombre: "Bacalao (fresco, cocido)",
        emoji: "🐟", mejor: true,
        kcal: 82, carbs: 0, azucares: 0, proteinas: 18, grasas: 0.7, grasasSat: 0.1, fibra: 0, sodio: 54,
        porque: "El bacalao es un pescado blanco extremadamente magro, con un contenido calórico y graso significativamente menor que la pechuga de pollo. Aporta proteínas de alto valor biológico y, aunque en menor medida que los pescados azules, contiene ácidos grasos omega-3 beneficiosos para la salud cardiovascular."
      }
    ]
  },
  {
    id: "ia_pera",
    nombre: "Pera",
    aliases: ["pera"],
    categorias: ["Frutas"],
    emoji: "🍐",
    rating: "A",
    kcal: 57, carbs: 15.2, azucares: 9.8, proteinas: 0.4, grasas: 0.1, grasasSat: 0.02, fibra: 3.1, sodio: 0,
    motivo: "La pera es una fruta excelente gracias a su alto contenido de agua, potasio y fibra soluble como la pectina, ideal para la salud intestinal. El consumo regular de frutas frescas se asocia directamente con una disminución en el riesgo de enfermedades cardiovasculares y mortalidad general [1]. Al ser un alimento natural, denso en nutrientes y de baja densidad calórica, obtiene la máxima calificación.",
    estudios: [
      {
        "pmid": "28338764",
        "titulo": "Fruit and vegetable intake and the risk of cardiovascular disease, total cancer and all-cause mortality-a systematic review and dose-response meta-analysis of prospective studies.",
        "revista": "International journal of epidemiology",
        "anio": "2017",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28338764/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_pimiento_rojo",
    nombre: "Pimiento rojo",
    aliases: ["pimiento rojo"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🫑",
    rating: "A",
    kcal: 31, carbs: 6, azucares: 4.2, proteinas: 1, grasas: 0.3, grasasSat: 0.05, fibra: 2.1, sodio: 4,
    motivo: "El pimiento rojo es una hortaliza con una densidad nutricional excepcional, muy baja en calorías y rica en fibra, vitamina C y potentes compuestos antioxidantes. La evidencia científica resalta sus efectos beneficiosos frente a factores del síndrome metabólico [1], sus elevadas potencialidades biomédicas y antioxidantes [2], sus cualidades para aliviar y prevenir diversas dolencias [3] y la actividad biológica de sus principios activos [4].",
    estudios: [
      {
        "pmid": "29922422",
        "titulo": "A review of the effects of Capsicum annuum L. and its constituent, capsaicin, in metabolic syndrome.",
        "revista": "Iranian journal of basic medical sciences",
        "anio": "2018",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29922422/"
      },
      {
        "pmid": "36234927",
        "titulo": "Biomedical and Antioxidant Potentialities in Chilli: Perspectives and Way Forward.",
        "revista": "Molecules (Basel, Switzerland)",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36234927/"
      },
      {
        "pmid": "39346723",
        "titulo": "Sweet Bell Pepper: A Focus on Its Nutritional Qualities and Illness-Alleviated Properties.",
        "revista": "Indian journal of clinical biochemistry : IJCB",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39346723/"
      },
      {
        "pmid": "25675368",
        "titulo": "Biological Activities of Red Pepper (Capsicum annuum) and Its Pungent Principle Capsaicin: A Review.",
        "revista": "Critical reviews in food science and nutrition",
        "anio": "2016",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25675368/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_pimiento_verde",
    nombre: "Pimiento verde",
    aliases: ["pimiento verde"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🫑",
    rating: "A",
    kcal: 20, carbs: 4.6, azucares: 2.4, proteinas: 0.9, grasas: 0.2, grasasSat: 0.05, fibra: 1.7, sodio: 3,
    motivo: "El pimiento verde obtiene la máxima calificación por su bajísimo aporte calórico y su alta densidad nutricional. Es una fuente excelente de agua, fibra, antioxidantes carotenoides y vitaminas esenciales como A, C y E [1].",
    estudios: [
      {
        "pmid": "29304200",
        "titulo": "Nitro-oxidative metabolism during fruit ripening.",
        "revista": "Journal of experimental botany",
        "anio": "2018",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29304200/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_pipas_de_calabaza",
    nombre: "Pipas de calabaza",
    aliases: ["pipas de calabaza"],
    categorias: ["Frutos Secos", "Snacks", "Proteína vegetal"],
    emoji: "🎃",
    rating: "A",
    kcal: 559, carbs: 10.7, azucares: 1.4, proteinas: 30.2, grasas: 49, grasasSat: 8.7, fibra: 6, sodio: 0.01,
    motivo: "Las pipas de calabaza son un excelente alimento (calificación A) gracias a su densidad nutricional, destacando por su alto contenido en proteínas vegetales, fibra y grasas insaturadas cardiosaludables. Además, son una fuente magnífica de minerales como el zinc y el magnesio. En el ámbito de la salud dermo-capilar, el aceite de semilla de calabaza y otros suplementos naturales han sido objeto de estudio como alternativas o complementos terapéuticos frente a la caída del cabello [1][2][3] y para el manejo de afecciones dermatológicas como la psoriasis [4].",
    estudios: [
      {
        "pmid": "36449274",
        "titulo": "Evaluation of the Safety and Effectiveness of Nutritional Supplements for Treating Hair Loss: A Systematic Review.",
        "revista": "JAMA dermatology",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36449274/"
      },
      {
        "pmid": "33544448",
        "titulo": "Pumpkin seed oil vs. minoxidil 5% topical foam for the treatment of female pattern hair loss: A randomized comparative trial.",
        "revista": "Journal of cosmetic dermatology",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33544448/"
      },
      {
        "pmid": "40654553",
        "titulo": "Topical Alternatives for Hair Loss: Beyond the Conventional.",
        "revista": "International journal of trichology",
        "anio": "2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40654553/"
      },
      {
        "pmid": "40210174",
        "titulo": "Herbal medicine for treating psoriasis: A systematic review.",
        "revista": "Complementary therapies in medicine",
        "anio": "2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40210174/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_pitaya",
    nombre: "Pitaya",
    aliases: ["pitaya"],
    categorias: ["Frutas"],
    emoji: "🐉",
    rating: "A",
    kcal: 60, carbs: 13, azucares: 7.7, proteinas: 1.2, grasas: 0.5, grasasSat: 0.1, fibra: 2.9, sodio: 1,
    motivo: "La pitaya es una fruta tropical de excelente calidad nutricional, baja en calorías y con un alto contenido de agua, fibra y fitoquímicos [1]. Cuenta con notables propiedades antioxidantes y antiinflamatorias que favorecen la salud metabólica y digestiva [1, 2]. Al ser una opción muy saludable, no necesita sustitutos.",
    estudios: [
      {
        "pmid": "37762287",
        "titulo": "Pitaya Nutrition, Biology, and Biotechnology: A Review.",
        "revista": "International journal of molecular sciences",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37762287/"
      },
      {
        "pmid": "36678789",
        "titulo": "Anti-Inflammatory, Antioxidant, and Other Health Effects of Dragon Fruit and Potential Delivery Systems for Its Bioactive Compounds.",
        "revista": "Pharmaceutics",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36678789/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_platano",
    nombre: "Plátano",
    aliases: ["plátano"],
    categorias: ["Frutas"],
    emoji: "🍌",
    rating: "A",
    kcal: 89, carbs: 22.84, azucares: 12.23, proteinas: 1.09, grasas: 0.33, grasasSat: 0.11, fibra: 2.6, sodio: 1,
    motivo: "El plátano es una fruta excepcional con un alto valor nutricional. Es una excelente fuente de carbohidratos complejos y azúcares naturales que proporcionan energía rápida y sostenida. Aporta una cantidad considerable de fibra dietética (2.6g/100g), lo que favorece la salud digestiva y ayuda a regular la absorción de azúcares. Es rico en potasio, esencial para la función muscular y el equilibrio de líquidos, y vitaminas como la B6 (clave en el metabolismo) y la C (antioxidante). Como alimento integral, se alinea con una dieta basada en alimentos vegetales, que ha demostrado beneficios en la gestión de condiciones como la obesidad, enfermedades cardíacas isquémicas y diabetes [1]. Aunque su contenido de azúcares es notable, su perfil nutricional denso y la presencia de fibra lo convierten en una opción muy saludable. Para personas con diabetes, se recomienda moderación y considerar el estado de madurez (los plátanos menos maduros tienen un índice glucémico más bajo debido a su mayor contenido de almidón resistente) [2, 3].",
    estudios: [
      {
        "pmid": "28319109",
        "titulo": "The BROAD study: A randomised controlled trial using a whole food plant-based diet in the community for obesity, ischaemic heart disease or diabetes.",
        "revista": "Nutrition & diabetes",
        "anio": "2017",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28319109/"
      },
      {
        "pmid": "31622319",
        "titulo": "Plantains: Gluco-friendly usage.",
        "revista": "JPMA. The Journal of the Pakistan Medical Association",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31622319/"
      },
      {
        "pmid": "11991041",
        "titulo": "Diabetes and diet.",
        "revista": "Tropical doctor",
        "anio": "2002",
        "url": "https://pubmed.ncbi.nlm.nih.gov/11991041/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_repollo",
    nombre: "Repollo",
    aliases: ["repollo"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🥬",
    rating: "A",
    kcal: 25, carbs: 5.8, azucares: 3.2, proteinas: 1.3, grasas: 0.1, grasasSat: 0.02, fibra: 2.5, sodio: 18,
    motivo: "El repollo es una hortaliza crucífera con un excelente perfil nutricional, muy bajo en calorías y rico en fibra. Pertenece al género Brassica, ampliamente respaldado por sus propiedades fitoterapéuticas y su papel activo en la prevención de enfermedades [1, 2]. Contiene glucosinolatos que se transforman en isotiocianatos como el sulforafano, un compuesto con potentes efectos antioxidantes y protectores celulares [3]. Además, sirve como base para alimentos fermentados como el kimchi, aportando excelentes propiedades probióticas para la salud digestiva [4].",
    estudios: [
      {
        "pmid": "33666283",
        "titulo": "Phytotherapy and food applications from Brassica genus.",
        "revista": "Phytotherapy research : PTR",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33666283/"
      },
      {
        "pmid": "10736624",
        "titulo": "Brassica vegetables and cancer prevention. Epidemiology and mechanisms.",
        "revista": "Advances in experimental medicine and biology",
        "anio": "1999",
        "url": "https://pubmed.ncbi.nlm.nih.gov/10736624/"
      },
      {
        "pmid": "30372361",
        "titulo": "Isothiocyanate from Broccoli, Sulforaphane, and Its Properties.",
        "revista": "Journal of medicinal food",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30372361/"
      },
      {
        "pmid": "24456350",
        "titulo": "Health benefits of kimchi (Korean fermented vegetables) as a probiotic food.",
        "revista": "Journal of medicinal food",
        "anio": "2014",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24456350/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_sacarina",
    nombre: "Sacarina",
    aliases: ["sacarina"],
    categorias: ["Condimentos y Aditivos"],
    emoji: "🧪",
    rating: "D",
    kcal: 0, carbs: 0, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 0,
    motivo: "Aunque la sacarina no aporta calorías ni azúcares, los edulcorantes artificiales pueden alterar la microbiota intestinal e inducir intolerancia a la glucosa [1]. Además, sus beneficios metabólicos y en personas con diabetes siguen siendo debatidos a largo plazo [2][3].",
    estudios: [
      {
        "pmid": "25231862",
        "titulo": "Artificial sweeteners induce glucose intolerance by altering the gut microbiota.",
        "revista": "Nature",
        "anio": "2014",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25231862/"
      },
      {
        "pmid": "36364710",
        "titulo": "Is the Use of Artificial Sweeteners Beneficial for Patients with Diabetes Mellitus? The Advantages and Disadvantages of Artificial Sweeteners.",
        "revista": "Nutrients",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36364710/"
      },
      {
        "pmid": "38977130",
        "titulo": "Long-term metabolic effects of non-nutritive sweeteners.",
        "revista": "Molecular metabolism",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38977130/"
      }
    ],
    sustitutos: [
      {
        nombre: "Stevia",
        emoji: "🌿", mejor: true,
        kcal: 0, carbs: 0, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 0,
        porque: "Es un edulcorante de origen natural sin calorías que altera en menor medida la microbiota intestinal en comparación con la sacarina sintética."
      },
      {
        nombre: "Canela en polvo",
        emoji: "🪵", mejor: true,
        kcal: 247, carbs: 81, azucares: 2.2, proteinas: 4, grasas: 1.2, grasasSat: 0.3, fibra: 53, sodio: 10,
        porque: "Aporta dulzor y aroma de forma totalmente natural, con un alto contenido en antioxidantes y fibra, evitando el uso de edulcorantes artificiales."
      }
    ]
  },
  {
    id: "ia_sal",
    nombre: "Sal",
    aliases: ["sal"],
    categorias: ["Condimentos y Aditivos"],
    emoji: "🧂",
    rating: "E",
    kcal: 0, carbs: 0, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 38750,
    motivo: "La sal de mesa es prácticamente cloruro de sodio puro, aportando una cantidad extremadamente alta de sodio (aproximadamente 38.750 mg por cada 100 g). Un consumo excesivo de sodio es un factor de riesgo principal para la hipertensión arterial, la cual es la principal causa de muertes prevenibles a nivel global [1]. Dietas ricas en sodio contribuyen a la presión arterial elevada y al riesgo de enfermedades cardiovasculares [2, 1, 3]. La Organización Mundial de la Salud (OMS) recomienda reducir la ingesta media de sodio en la población para disminuir la carga de enfermedades asociadas a la hipertensión [1]. Aunque el sodio es un mineral esencial para el cuerpo, la mayoría de la población consume muy por encima de las recomendaciones diarias, lo que convierte a la sal en un ingrediente a limitar drásticamente en la dieta.",
    estudios: [
      {
        "pmid": "35944931",
        "titulo": "Replacing salt with low-sodium salt substitutes (LSSS) for cardiovascular health in adults, children and pregnant women.",
        "revista": "The Cochrane database of systematic reviews",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35944931/"
      },
      {
        "pmid": "35388704",
        "titulo": "Effect of sodium reduction based on the DASH diet on blood pressure in hypertensive patients with type 2 diabetes.",
        "revista": "Nutricion hospitalaria",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35388704/"
      },
      {
        "pmid": "11986896",
        "titulo": "Hypertension and diabetes.",
        "revista": "Journal of human hypertension",
        "anio": "2002",
        "url": "https://pubmed.ncbi.nlm.nih.gov/11986896/"
      }
    ],
    sustitutos: [
      {
        nombre: "Sustituto de sal bajo en sodio",
        emoji: "🧂", mejor: true,
        kcal: 0, carbs: 0, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 20000,
        porque: "Estos sustitutos reemplazan una parte del cloruro de sodio con otros compuestos, como el cloruro de potasio, reduciendo significativamente el contenido de sodio (aproximadamente a la mitad). Son reconocidos como una estrategia efectiva para la reducción de sodio y la mejora de la salud cardiovascular [2]."
      },
      {
        nombre: "Mezcla de hierbas y especias sin sal",
        emoji: "🌿🌶️", mejor: true,
        kcal: 0, carbs: 0, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 0,
        porque: "Aportan una gran variedad de sabores y aromas intensos a los alimentos sin añadir nada de sodio, lo que permite disfrutar de comidas sabrosas mientras se reduce drásticamente la ingesta de sal, contribuyendo a una dieta más saludable."
      }
    ]
  },
  {
    id: "ia_sal_baja_en_sodio",
    nombre: "Sal baja en sodio",
    aliases: ["sal baja en sodio"],
    categorias: ["Condimentos y Aditivos"],
    emoji: "🧂",
    rating: "B",
    kcal: 0, carbs: 0, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 25000,
    motivo: "La sal baja en sodio es una alternativa más saludable a la sal común, ya que reduce significativamente el aporte de sodio. La disminución del consumo de sodio es una estrategia clave para la prevención y el manejo de la hipertensión arterial y enfermedades cardiovasculares, como demuestran varios estudios [1, 2, 3, 4]. Al reemplazar parte del cloruro de sodio por otros minerales como el cloruro de potasio, ayuda a mantener el sabor salado mientras se reduce la ingesta de sodio. Aunque es una opción mejor que la sal tradicional, su consumo debe seguir siendo moderado, ya que no elimina completamente el sodio de la dieta y un exceso de potasio también podría ser perjudicial para ciertas poblaciones.",
    estudios: [
      {
        "pmid": "35388704",
        "titulo": "Effect of sodium reduction based on the DASH diet on blood pressure in hypertensive patients with type 2 diabetes.",
        "revista": "Nutricion hospitalaria",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35388704/"
      },
      {
        "pmid": "39505584",
        "titulo": "Lifestyle modifications and non-pharmacological management in elderly hypertension.",
        "revista": "Journal of the Formosan Medical Association = Taiwan yi zhi",
        "anio": "2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39505584/"
      },
      {
        "pmid": "35944931",
        "titulo": "Replacing salt with low-sodium salt substitutes (LSSS) for cardiovascular health in adults, children and pregnant women.",
        "revista": "The Cochrane database of systematic reviews",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35944931/"
      },
      {
        "pmid": "37534516",
        "titulo": "Effect of low-sodium salt applied to Chinese modified DASH diet on arterial stiffness in older patients with hypertension and type 2 diabetes.",
        "revista": "Nutricion hospitalaria",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37534516/"
      }
    ],
    sustitutos: [
      {
        nombre: "Hierbas aromáticas y especias",
        emoji: "🌿🌶️", mejor: true,
        kcal: 0, carbs: 0, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 0,
        porque: "Utilizar hierbas aromáticas (como orégano, albahaca, tomillo, romero) y especias (como pimienta negra, pimentón, curry, ajo en polvo) para sazonar los alimentos permite realzar el sabor de forma natural, sin añadir sodio. Esta es la opción más saludable para reducir la dependencia de la sal en la dieta y explorar una mayor variedad de sabores, contribuyendo a una alimentación más equilibrada y baja en sodio."
      }
    ]
  },
  {
    id: "ia_salmon_ahumado",
    nombre: "Salmón ahumado",
    aliases: ["salmón ahumado"],
    categorias: ["Proteínas"],
    emoji: "🐟",
    rating: "C",
    kcal: 142, carbs: 0, azucares: 0, proteinas: 21.3, grasas: 6.3, grasasSat: 1, fibra: 0, sodio: 1200,
    motivo: "Aunque es una excelente fuente de proteínas de alto valor biológico y ácidos grasos omega-3, se califica con una 'C' debido a su elevado contenido en sodio derivado del proceso de curado tradicional [1]. Adicionalmente, por su método de elaboración sin cocción completa, existe un riesgo microbiológico persistente asociado a Listeria monocytogenes [2][3], y su procesado puede influir de manera variable en la retención de contaminantes ambientales [4].",
    estudios: [
      {
        "pmid": "35627053",
        "titulo": "Microbial Safety and Sensory Analyses of Cold-Smoked Salmon Produced with Sodium-Reduced Mineral Salts and Organic Acid Salts.",
        "revista": "Foods (Basel, Switzerland)",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35627053/"
      },
      {
        "pmid": "31071821",
        "titulo": "Listeria monocytogenes in Fish Products.",
        "revista": "Journal of food protection",
        "anio": "1991",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31071821/"
      },
      {
        "pmid": "38472829",
        "titulo": "A Critical Review of Risk Assessment Models for Listeria monocytogenes in Seafood.",
        "revista": "Foods (Basel, Switzerland)",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38472829/"
      },
      {
        "pmid": "34015427",
        "titulo": "Effect of processing smoked salmon on contaminant contents.",
        "revista": "Food and chemical toxicology : an international journal published for the British Industrial Biological Research Association",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34015427/"
      }
    ],
    sustitutos: [
      {
        nombre: "Salmón fresco",
        emoji: "🐟", mejor: true,
        kcal: 206, carbs: 0, azucares: 0, proteinas: 20, grasas: 13, grasasSat: 2.1, fibra: 0, sodio: 59,
        porque: "Aporta los mismos ácidos grasos esenciales omega-3 y proteínas de alta calidad pero sin el exceso de sodio del procesado y con un riesgo microbiológico drásticamente menor tras su cocinado."
      },
      {
        nombre: "Trucha fresca",
        emoji: "🐟", mejor: true,
        kcal: 141, carbs: 0, azucares: 0, proteinas: 20.8, grasas: 6.2, grasasSat: 1.2, fibra: 0, sodio: 40,
        porque: "Es una alternativa local de pescado azul muy saludable, rica en grasas insaturadas, de bajo aporte calórico y prácticamente libre de sodio añadido."
      }
    ]
  },
  {
    id: "ia_salsa_barbacoa_zero",
    nombre: "Salsa barbacoa zero",
    aliases: ["salsa barbacoa zero"],
    categorias: ["Salsas"],
    emoji: "🥫",
    rating: "C",
    kcal: 25, carbs: 6, azucares: 0, proteinas: 0.8, grasas: 0.2, grasasSat: 0, fibra: 1.5, sodio: 450,
    motivo: "Aunque es una opción baja en calorías y libre de azúcares añadidos, su principal preocupación reside en la presencia de edulcorantes artificiales. La investigación sugiere que estos edulcorantes pueden tener un impacto negativo, como inducir intolerancia a la glucosa al alterar la microbiota intestinal [1, 2]. Además, se ha explorado su posible relación con el riesgo cardiovascular [3]. Si bien el uso crónico de edulcorantes artificiales tiene pros (como en el control de peso o glucemia), también conlleva contras y preocupaciones a largo plazo para la salud metabólica que aún se investigan [4]. El contenido de sodio también suele ser considerable en este tipo de salsas comerciales.",
    estudios: [
      {
        "pmid": "25231862",
        "titulo": "Artificial sweeteners induce glucose intolerance by altering the gut microbiota.",
        "revista": "Nature",
        "anio": "2014",
        "url": "https://pubmed.ncbi.nlm.nih.gov/25231862/"
      },
      {
        "pmid": "37111090",
        "titulo": "Effect of Non-Nutritive Sweeteners on the Gut Microbiota.",
        "revista": "Nutrients",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37111090/"
      },
      {
        "pmid": "37115819",
        "titulo": "Artificial sweeteners and cardiovascular risk.",
        "revista": "Current opinion in cardiology",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37115819/"
      },
      {
        "pmid": "39339762",
        "titulo": "Chronic Use of Artificial Sweeteners: Pros and Cons.",
        "revista": "Nutrients",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39339762/"
      }
    ],
    sustitutos: [
      {
        nombre: "Salsa barbacoa casera (con endulzantes naturales)",
        emoji: "🍅", mejor: true,
        kcal: 80, carbs: 18, azucares: 12, proteinas: 2, grasas: 0.5, grasasSat: 0.1, fibra: 3, sodio: 300,
        porque: "Preparar tu propia salsa permite un control total sobre los ingredientes. Puedes usar una base de tomate natural, vinagre, especias (pimentón, ajo en polvo, cebolla en polvo) y endulzar con pequeñas cantidades de miel, sirope de arce puro, puré de dátiles o manzana. Esto evita los edulcorantes artificiales y el exceso de sodio, aportando fibra y nutrientes de alimentos reales. Aunque contiene más calorías y azúcares (naturales), son de mayor calidad y en cantidades que puedes ajustar a tus necesidades."
      }
    ]
  },
  {
    id: "ia_saltamontes_frito",
    nombre: "Saltamontes frito",
    aliases: ["saltamontes frito"],
    categorias: ["Insectos Comestibles"],
    emoji: "🦗",
    rating: "C",
    kcal: 430, carbs: 8, azucares: 0, proteinas: 35, grasas: 30, grasasSat: 10, fibra: 7, sodio: 350,
    motivo: "Los saltamontes son una fuente prometedora de proteína de alto valor biológico y fibra dietética [1, 2, 3, 4], y su consumo es una alternativa sostenible [1]. Sin embargo, la preparación 'frita' aumenta significativamente el contenido de grasas, especialmente grasas saturadas, y las calorías, lo que lo convierte en una opción menos saludable que otras preparaciones. El alto contenido de sodio también puede ser una preocupación.",
    estudios: [
      {
        "pmid": "33916741",
        "titulo": "Possibilities of the Development of Edible Insect-Based Foods in Europe.",
        "revista": "Foods (Basel, Switzerland)",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33916741/"
      },
      {
        "pmid": "41174406",
        "titulo": "Functional properties of cricket and grasshopper protein isolates.",
        "revista": "Food research international (Ottawa, Ont.)",
        "anio": "2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41174406/"
      },
      {
        "pmid": "31976553",
        "titulo": "Nutritional and safety evaluation of locust (Caelifera) powder as a novel food material.",
        "revista": "Journal of food science",
        "anio": "2020",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31976553/"
      },
      {
        "pmid": "35882087",
        "titulo": "Edible insect Locusta migratoria shows intestinal protein digestibility and improves plasma and hepatic lipid metabolism in male rats.",
        "revista": "Food chemistry",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35882087/"
      }
    ],
    sustitutos: [
      {
        nombre: "Saltamontes Tostados/Asados",
        emoji: "🦗", mejor: true,
        kcal: 280, carbs: 8, azucares: 0, proteinas: 35, grasas: 15, grasasSat: 3, fibra: 7, sodio: 200,
        porque: "Conservan el alto valor proteico y la fibra de los saltamontes, pero con una cantidad significativamente menor de grasas y calorías al evitar la fritura. Es una opción más saludable para disfrutar de este alimento [1, 2, 3, 4]."
      },
      {
        nombre: "Edamame (al vapor, sin sal añadida)",
        emoji: "🌿", mejor: true,
        kcal: 122, carbs: 10, azucares: 2, proteinas: 12, grasas: 5, grasasSat: 1, fibra: 5, sodio: 6,
        porque: "Una excelente fuente de proteína vegetal completa y fibra. Bajo en calorías y grasas, ideal como snack o acompañamiento saludable. Aporta diversos micronutrientes y es una opción vegetal."
      }
    ]
  },
  {
    id: "ia_sardina",
    nombre: "Sardina",
    aliases: ["sardina"],
    categorias: ["Proteínas", "Grasas"],
    emoji: "🐟",
    rating: "A",
    kcal: 208, carbs: 0, azucares: 0, proteinas: 24.6, grasas: 11.5, grasasSat: 2.3, fibra: 0, sodio: 387,
    motivo: "Las sardinas son un pescado azul con un perfil nutricional excepcional. Son una fuente sobresaliente de proteína de alto valor biológico, esencial para la construcción y reparación de tejidos. Destacan especialmente por su alto contenido en ácidos grasos omega-3 (EPA y DHA), que son cruciales para la salud cardiovascular, cerebral y antiinflamatoria [1]. Además, aportan una cantidad significativa de vitamina D (esencial para la salud ósea e inmunológica), vitamina B12 y minerales como el calcio (si se consumen con espinas), fósforo y selenio. Su densidad nutricional las convierte en un alimento muy recomendable para una dieta equilibrada.",
    estudios: [
      {
        "pmid": "38068783",
        "titulo": "Athletes Can Benefit from Increased Intake of EPA and DHA-Evaluating the Evidence.",
        "revista": "Nutrients",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38068783/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_semillas_de_chia",
    nombre: "Semillas de chía",
    aliases: ["semillas de chía"],
    categorias: ["Proteína vegetal", "Grasas"],
    emoji: "🌱",
    rating: "A",
    kcal: 486, carbs: 42.1, azucares: 0.8, proteinas: 16.5, grasas: 30.7, grasasSat: 3.33, fibra: 34.4, sodio: 0.02,
    motivo: "Las semillas de chía obtienen la calificación A por su excelente perfil nutricional. Son una fuente sobresaliente de fibra soluble, proteínas de origen vegetal y ácidos grasos poliinsaturados omega-3 (ácido alfa-linolénico). La evidencia científica respalda su uso como alimento funcional gracias a sus propiedades terapéuticas frente a desórdenes metabólicos [1], sus amplios beneficios promotores de la salud [2][3] y su potencial para modular positivamente la inflamación y el metabolismo [4].",
    estudios: [
      {
        "pmid": "36655089",
        "titulo": "Chia seeds (Salvia hispanica L.): A therapeutic weapon in metabolic disorders.",
        "revista": "Food science & nutrition",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36655089/"
      },
      {
        "pmid": "28646829",
        "titulo": "Chia seeds (Salvia hispanica): health promoting properties and therapeutic applications – a review.",
        "revista": "Roczniki Panstwowego Zakladu Higieny",
        "anio": "2017",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28646829/"
      },
      {
        "pmid": "37507952",
        "titulo": "Nutritional and Functional New Perspectives and Potential Health Benefits of Quinoa and Chia Seeds.",
        "revista": "Antioxidants (Basel, Switzerland)",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37507952/"
      },
      {
        "pmid": "33506690",
        "titulo": "Functional foods modulating inflammation and metabolism in chronic diseases: a systematic review.",
        "revista": "Critical reviews in food science and nutrition",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33506690/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_semillas_de_girasol",
    nombre: "Semillas de girasol",
    aliases: ["semillas de girasol"],
    categorias: ["Frutos Secos", "Grasas", "Proteína vegetal"],
    emoji: "🌻",
    rating: "A",
    kcal: 584, carbs: 20, azucares: 2.6, proteinas: 20.8, grasas: 51.5, grasasSat: 4.5, fibra: 8.6, sodio: 9,
    motivo: "Las semillas de girasol son un alimento de alta calidad nutricional, rico en grasas poliinsaturadas, proteína vegetal, fibra, vitamina E y minerales como el magnesio y el selenio. Su consumo regular dentro de pautas dietéticas que incluyen semillas contribuye a la salud cardiovascular e incluso se estudia su integración en protocolos dietéticos para el equilibrio hormonal femenino [1].",
    estudios: [
      {
        "pmid": "41018334",
        "titulo": "Efficacy of Seed Cycling as an Integrative Therapy for Premenstrual Syndrome and Polycystic Ovary Syndrome in Reproductive-Aged Women: A Systematic Review.",
        "revista": "Cureus",
        "anio": "2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41018334/"
      }
    ],
    sustitutos: [
      {
        nombre: "Semillas de chía",
        emoji: "🌱", mejor: true,
        kcal: 486, carbs: 42.1, azucares: 0.8, proteinas: 16.5, grasas: 30.7, grasasSat: 3.3, fibra: 34.4, sodio: 16,
        porque: "Ofrecen un perfil lipídico superior con un alto contenido de ácidos grasos omega-3 (ALA) frente al omega-6 del girasol, además de una cantidad significativamente mayor de fibra soluble."
      }
    ]
  },
  {
    id: "ia_semillas_de_lino",
    nombre: "Semillas de lino",
    aliases: ["semillas de lino"],
    categorias: ["Grasas", "Proteína vegetal"],
    emoji: "🌱",
    rating: "A",
    kcal: 534, carbs: 28.9, azucares: 1.5, proteinas: 18.3, grasas: 42.2, grasasSat: 3.7, fibra: 27.3, sodio: 0.03,
    motivo: "Las semillas de lino tienen una excelente calidad nutricional (Calificación A). Son una de las fuentes vegetales más ricas en ácido alfa-linolénico (omega-3), fibra dietética y lignanos, compuestos clave para mejorar la salud cardiovascular, digestiva y reducir la inflamación [1]. Además, su consumo habitual aporta beneficios metabólicos importantes en el control de la glucemia y la diabetes [2], su aceite destaca por sus propiedades bioactivas protectoras en comparación con otras grasas [3] y se consideran un alimento funcional de gran relevancia para la salud [4].",
    estudios: [
      {
        "pmid": "31130604",
        "titulo": "Dietary Flaxseed as a Strategy for Improving Human Health.",
        "revista": "Nutrients",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31130604/"
      },
      {
        "pmid": "26561065",
        "titulo": "Flaxseed and Diabetes.",
        "revista": "Current pharmaceutical design",
        "anio": "2016",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26561065/"
      },
      {
        "pmid": "37464425",
        "titulo": "A comprehensive review of the health benefits of flaxseed oil in relation to its chemical composition and comparison with other omega-3-rich oils.",
        "revista": "European journal of medical research",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37464425/"
      },
      {
        "pmid": "17011474",
        "titulo": "Flaxseed.",
        "revista": "Advances in food and nutrition research",
        "anio": "2006",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17011474/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_semillas_de_sesamo",
    nombre: "Semillas de sésamo",
    aliases: ["semillas de sésamo"],
    categorias: ["Grasas", "Proteína vegetal"],
    emoji: "🌱",
    rating: "A",
    kcal: 573, carbs: 23.4, azucares: 0.3, proteinas: 17.7, grasas: 49.7, grasasSat: 7, fibra: 11.8, sodio: 11,
    motivo: "Las semillas de sésamo son un alimento altamente nutritivo debido a su excelente perfil de ácidos grasos insaturados, proteínas vegetales y fibra dietética. Destacan por su excepcional densidad de fitoquímicos y antioxidantes con efectos cardioprotectores y metabólicos positivos [1], además de contribuir a la mejora del perfil lipídico y el control de la glucemia [2].",
    estudios: [
      {
        "pmid": "36235731",
        "titulo": "Sesame (Sesamum indicum L.): A Comprehensive Review of Nutritional Value, Phytochemical Composition, Health Benefits, Development of Food, and Industrial Applications.",
        "revista": "Nutrients",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36235731/"
      },
      {
        "pmid": "39996006",
        "titulo": "Evaluating the effects of seed oils on lipid profile, inflammatory and oxidative markers, and glycemic control of diabetic and dyslipidemic patients: a systematic review of clinical studies.",
        "revista": "Frontiers in nutrition",
        "anio": "2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39996006/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_tempeh",
    nombre: "Tempeh",
    aliases: ["tempeh"],
    categorias: ["Proteína vegetal", "Proteínas"],
    emoji: "🫘",
    rating: "A",
    kcal: 192, carbs: 7.6, azucares: 0.8, proteinas: 20.3, grasas: 10.8, grasasSat: 2.2, fibra: 6, sodio: 10,
    motivo: "El tempeh es un alimento de excelente calidad nutricional, con un alto contenido de proteína vegetal y fibra, además de un bajo aporte de sodio y grasas saturadas. Al ser soja fermentada, aporta beneficios digestivos e inmunológicos [1]. Asimismo, el consumo de isoflavonas de soja cuenta con un perfil seguro a nivel metabólico y hormonal [2].",
    estudios: [
      {
        "pmid": "33569911",
        "titulo": "Tempeh: A semicentennial review on its health benefits, fermentation, safety, processing, sustainability, and affordability.",
        "revista": "Comprehensive reviews in food science and food safety",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33569911/"
      },
      {
        "pmid": "39433088",
        "titulo": "Effect of Soy Isoflavones on Measures of Estrogenicity: A Systematic Review and Meta-Analysis of Randomized Controlled Trials.",
        "revista": "Advances in nutrition (Bethesda, Md.)",
        "anio": "2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39433088/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_ternera_magra_picada_5",
    nombre: "Ternera magra picada (5%)",
    aliases: ["ternera magra picada (5%)"],
    categorias: ["Cárnicos", "Proteínas"],
    emoji: "🥩",
    rating: "A",
    kcal: 125, carbs: 0, azucares: 0, proteinas: 21, grasas: 5, grasasSat: 2.1, fibra: 0, sodio: 65,
    motivo: "Excelente fuente de proteínas de alto valor biológico con elevada capacidad para estimular la síntesis proteica muscular [1]. Su bajo porcentaje de materia grasa (5%) permite beneficiarse de sus micronutrientes clave como hierro hemo, zinc y vitamina B12 [2] integrándose perfectamente en un patrón de alimentación cardioprotector [3][4].",
    estudios: [
      {
        "pmid": "37972895",
        "titulo": "Higher Muscle Protein Synthesis Rates Following Ingestion of an Omnivorous Meal Compared with an Isocaloric and Isonitrogenous Vegan Meal in Healthy, Older Adults.",
        "revista": "The Journal of nutrition",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37972895/"
      },
      {
        "pmid": "26643369",
        "titulo": "The role of red meat in the diet: nutrition and health benefits.",
        "revista": "The Proceedings of the Nutrition Society",
        "anio": "2016",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26643369/"
      },
      {
        "pmid": "15927927",
        "titulo": "Lean meat and heart health.",
        "revista": "Asia Pacific journal of clinical nutrition",
        "anio": "2005",
        "url": "https://pubmed.ncbi.nlm.nih.gov/15927927/"
      },
      {
        "pmid": "39125421",
        "titulo": "Healthy Dietary Patterns with and without Meat Improved Cardiometabolic Disease Risk Factors in Adults: A Randomized Crossover Controlled Feeding Trial.",
        "revista": "Nutrients",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39125421/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_tofu",
    nombre: "Tofu",
    aliases: ["tofu"],
    categorias: ["Proteína vegetal"],
    emoji: "⬜",
    rating: "A",
    kcal: 76, carbs: 1.9, azucares: 0.7, proteinas: 8, grasas: 4.8, grasasSat: 0.7, fibra: 0.3, sodio: 7,
    motivo: "El tofu es una fuente de proteína vegetal de alto valor biológico, completa y baja en grasas saturadas, además de ser naturalmente libre de colesterol. Es un alimento muy versátil y nutritivo, ideal para dietas vegetarianas, veganas o para quienes buscan reducir el consumo de proteínas animales. Contiene isoflavonas de soja, compuestos bioactivos que han sido estudiados por sus potenciales beneficios para la salud [1, 2], como su efecto en la salud ósea y cardiovascular, así como su papel en la modulación hormonal. Su bajo aporte calórico y su riqueza en nutrientes lo convierten en una opción excelente para una dieta equilibrada y saludable.",
    estudios: [
      {
        "pmid": "27886135",
        "titulo": "Soy and Health Update: Evaluation of the Clinical and Epidemiologic Literature.",
        "revista": "Nutrients",
        "anio": "2016",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27886135/"
      },
      {
        "pmid": "39433088",
        "titulo": "Effect of Soy Isoflavones on Measures of Estrogenicity: A Systematic Review and Meta-Analysis of Randomized Controlled Trials.",
        "revista": "Advances in nutrition (Bethesda, Md.)",
        "anio": "2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39433088/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_tomate",
    nombre: "Tomate",
    aliases: ["tomate"],
    categorias: ["Frutas", "Verduras y Hortalizas"],
    emoji: "🍅",
    rating: "A",
    kcal: 18, carbs: 3.9, azucares: 2.6, proteinas: 0.9, grasas: 0.2, grasasSat: 0.03, fibra: 1.2, sodio: 5,
    motivo: "El tomate es un alimento de muy bajo valor calórico, compuesto principalmente por agua y una excelente fuente de vitaminas (C, A, K), potasio y antioxidantes. Destaca por su alto contenido en licopeno, el carotenoide con mayor potencial antioxidante, que contribuye a la prevención de enfermedades cardiovasculares al combatir el estrés oxidativo y la inflamación [1]. También se ha investigado su papel en la salud de la próstata [2, 3] y sus beneficios generales para la salud debido a sus propiedades antioxidantes [3]. Su aporte de fibra contribuye a la salud digestiva y su bajo contenido en sodio y grasas lo convierte en un alimento ideal para una dieta equilibrada.",
    estudios: [
      {
        "pmid": "35216071",
        "titulo": "Lycopene in the Prevention of Cardiovascular Diseases.",
        "revista": "International journal of molecular sciences",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35216071/"
      },
      {
        "pmid": "29311132",
        "titulo": "The Epidemiology of Prostate Cancer.",
        "revista": "Cold Spring Harbor perspectives in medicine",
        "anio": "2018",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29311132/"
      },
      {
        "pmid": "34840666",
        "titulo": "Lycopene: Food Sources, Biological Activities, and Human Health Benefits.",
        "revista": "Oxidative medicine and cellular longevity",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34840666/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_tomate_frito",
    nombre: "Tomate frito",
    aliases: ["tomate frito"],
    categorias: ["Salsas", "Verduras y Hortalizas"],
    emoji: "🥫",
    rating: "C",
    kcal: 80, carbs: 7.5, azucares: 5.5, proteinas: 1.2, grasas: 4.5, grasasSat: 0.6, fibra: 1.3, sodio: 400,
    motivo: "Obtiene una calificación C debido a la presencia habitual de azúcares añadidos para corregir la acidez, el uso de aceites vegetales refinados y un contenido moderado de sodio. Sin embargo, el cocinado térmico del tomate incrementa la liberación y biodisponibilidad de los carotenoides (como el licopeno) frente al tomate crudo y favorece la composición de la microbiota intestinal [1][2].",
    estudios: [
      {
        "pmid": "37902310",
        "titulo": "Effects of different processed tomatoes on carotenoid release and microbiota composition during in vitro gastrointestinal digestion and colonic fermentation.",
        "revista": "Food & function",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37902310/"
      },
      {
        "pmid": "11137895",
        "titulo": "Estimation of carotenoid bioavailability from fresh stir-fried vegetables using an in vitro digestion/Caco-2 cell culture model.",
        "revista": "The Journal of nutritional biochemistry",
        "anio": "2000",
        "url": "https://pubmed.ncbi.nlm.nih.gov/11137895/"
      }
    ],
    sustitutos: [
      {
        nombre: "Tomate tamizado (Passata)",
        emoji: "🍅", mejor: true,
        kcal: 30, carbs: 4.5, azucares: 3.5, proteinas: 1.5, grasas: 0.2, grasasSat: 0.05, fibra: 1.5, sodio: 20,
        porque: "Es tomate natural cocido y triturado sin aceites ni azúcares añadidos, con un nivel de sodio mínimo y conservando los beneficios del licopeno."
      },
      {
        nombre: "Tomate frito casero con AOVE",
        emoji: "🍳", mejor: true,
        kcal: 65, carbs: 4, azucares: 3, proteinas: 1.1, grasas: 4.5, grasasSat: 0.6, fibra: 1.2, sodio: 120,
        porque: "Permite utilizar Aceite de Oliva Virgen Extra (AOVE) en lugar de aceites refinados, evitando el uso de azúcares añadidos y reduciendo el contenido de sal."
      }
    ]
  },
  {
    id: "ia_tomate_triturado",
    nombre: "Tomate triturado",
    aliases: ["tomate triturado"],
    categorias: ["Verduras y Hortalizas", "Salsas"],
    emoji: "🍅",
    rating: "A",
    kcal: 19, carbs: 3.8, azucares: 3.1, proteinas: 1.1, grasas: 0.2, grasasSat: 0.04, fibra: 1.2, sodio: 15,
    motivo: "El tomate triturado es un alimento excelente por su baja densidad calórica, aporte de agua, fibra y vitaminas. El proceso de homogenización y triturado favorece sustancialmente la biodisponibilidad del licopeno y otros nutrientes beneficiosos para la salud cardiovascular [1].",
    estudios: [
      {
        "pmid": "12587984",
        "titulo": "Tomatoes and cardiovascular health.",
        "revista": "Critical reviews in food science and nutrition",
        "anio": "2003",
        "url": "https://pubmed.ncbi.nlm.nih.gov/12587984/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_tortilla_de_patata",
    nombre: "Tortilla de patata",
    aliases: ["tortilla de patata"],
    categorias: ["Platos Preparados"],
    emoji: "🥔🍳",
    rating: "C",
    kcal: 190, carbs: 18, azucares: 0.8, proteinas: 10, grasas: 13, grasasSat: 2.5, fibra: 1.5, sodio: 380,
    motivo: "Alimento con un buen aporte de proteínas de alto valor biológico provenientes del huevo y carbohidratos complejos de la patata. No obstante, su calificación 'C' se debe a su significativo contenido calórico y de grasa, principalmente por el aceite absorbido durante la fritura de las patatas, y a un contenido de sodio que puede ser elevado dependiendo de la sal añadida. La fibra es moderada. Su perfil nutricional puede mejorar sustancialmente con cambios en el método de cocción.",
    sustitutos: [
      {
        nombre: "Tortilla de patata al horno",
        emoji: "🥔🍳🔥", mejor: true,
        kcal: 130, carbs: 18, azucares: 0.8, proteinas: 10, grasas: 6, grasasSat: 2, fibra: 1.5, sodio: 300,
        porque: "Reduce significativamente el contenido calórico y de grasa al cocinar las patatas al horno o con mínima cantidad de aceite de oliva virgen extra (AOVE), en lugar de freírlas. Mantiene el aporte de proteínas y carbohidratos complejos."
      },
      {
        nombre: "Frittata de verduras y patata",
        emoji: "🥚🥦🥕", mejor: true,
        kcal: 110, carbs: 10, azucares: 2, proteinas: 9, grasas: 5, grasasSat: 1.5, fibra: 3, sodio: 250,
        porque: "Incrementa el aporte de fibra, vitaminas y minerales al incorporar una mayor variedad de vegetales, reduciendo a su vez el contenido de carbohidratos de la patata y las calorías si se cocina con poco aceite. El AOVE es siempre la mejor opción para cocinar y aliñar."
      }
    ]
  },
  {
    id: "ia_tortitas_de_avena",
    nombre: "Tortitas de avena",
    aliases: ["tortitas de avena"],
    categorias: ["Cereales", "Snacks"],
    emoji: "🌾",
    rating: "B",
    kcal: 388, carbs: 66, azucares: 1.2, proteinas: 12.5, grasas: 6.8, grasasSat: 1.2, fibra: 8.5, sodio: 0.15,
    motivo: "Aportan buena cantidad de fibra y carbohidratos complejos con un contenido muy bajo de azúcares sencillos. No obstante, el procesado y horneado a altas temperaturas en productos a base de cereales inflados o horneados puede desencadenar la formación de acrilamida [1] e incrementar su índice glucémico en comparación con el grano entero.",
    estudios: [
      {
        "pmid": "30730568",
        "titulo": "Acrylamide Content of Experimental and Commercial Flatbreads.",
        "revista": "Journal of food science",
        "anio": "2019",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30730568/"
      }
    ],
    sustitutos: [
      {
        nombre: "Copos de avena integrales",
        emoji: "🥣", mejor: true,
        kcal: 370, carbs: 59, azucares: 1, proteinas: 13.5, grasas: 6.9, grasasSat: 1.2, fibra: 10, sodio: 0.01,
        porque: "Conservan la estructura del grano entero intacta, proporcionando mayor saciedad, menor índice glucémico y evitando el procesado térmico severo que forma acrilamida."
      }
    ]
  },
  {
    id: "ia_te",
    nombre: "Té",
    aliases: ["té"],
    categorias: ["Bebidas"],
    emoji: "🍵",
    rating: "A",
    kcal: 1, carbs: 0.2, azucares: 0, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 0,
    motivo: "El té es una infusión con un aporte calórico prácticamente nulo, ideal para la hidratación diaria. Destaca por su gran cantidad de compuestos bioactivos con efectos antioxidantes y saludables para el organismo [1, 2]. Contiene L-teanina, un aminoácido único con propiedades beneficiosas para la salud mental y física [3], además de catequinas altamente activas como el EGCG, cuya concentración es especialmente destacable en variedades preparadas de forma tradicional como el té matcha [4].",
    estudios: [
      {
        "pmid": "16582024",
        "titulo": "Beneficial effects of green tea--a review.",
        "revista": "Journal of the American College of Nutrition",
        "anio": "2006",
        "url": "https://pubmed.ncbi.nlm.nih.gov/16582024/"
      },
      {
        "pmid": "38056775",
        "titulo": "Biological potential and mechanisms of Tea's bioactive compounds: An Updated review.",
        "revista": "Journal of advanced research",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38056775/"
      },
      {
        "pmid": "35445053",
        "titulo": "L-Theanine: A Unique Functional Amino Acid in Tea (Camellia sinensis L.) With Multiple Health Benefits and Food Applications.",
        "revista": "Frontiers in nutrition",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35445053/"
      },
      {
        "pmid": "33375458",
        "titulo": "Health Benefits and Chemical Composition of Matcha Green Tea: A Review.",
        "revista": "Molecules (Basel, Switzerland)",
        "anio": "2020",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33375458/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_uva",
    nombre: "Uva",
    aliases: ["uva"],
    categorias: ["Frutas"],
    emoji: "🍇",
    rating: "A",
    kcal: 69, carbs: 18.1, azucares: 15.5, proteinas: 0.7, grasas: 0.2, grasasSat: 0.05, fibra: 0.9, sodio: 2,
    motivo: "La uva es una fruta altamente saludable, rica en polifenoles, potasio y fitoquímicos. Su contenido en antocianinas y flavonoides contribuye a la prevención de enfermedades cardiovasculares y neurodegenerativas [1], [2]. Asimismo, el consumo regular de frutas en la dieta se vincula con un menor riesgo de hipertensión y una mejor salud vascular [3], [4].",
    estudios: [
      {
        "pmid": "32825684",
        "titulo": "Anthocyanins: A Comprehensive Review of Their Chemical Properties and Health Effects on Cardiovascular and Neurodegenerative Diseases.",
        "revista": "Molecules (Basel, Switzerland)",
        "anio": "2020",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32825684/"
      },
      {
        "pmid": "19625699",
        "titulo": "Grapes and cardiovascular disease.",
        "revista": "The Journal of nutrition",
        "anio": "2009",
        "url": "https://pubmed.ncbi.nlm.nih.gov/19625699/"
      },
      {
        "pmid": "37106252",
        "titulo": "Fruit and vegetable consumption and the risk of hypertension: a systematic review and meta-analysis of prospective studies.",
        "revista": "European journal of nutrition",
        "anio": "2023",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37106252/"
      },
      {
        "pmid": "34242131",
        "titulo": "A Comprehensive Review on Varicose Veins: Preventive Measures and Different Treatments.",
        "revista": "Journal of the American Nutrition Association",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34242131/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_vinagre_de_manzana",
    nombre: "Vinagre de manzana",
    aliases: ["vinagre de manzana"],
    categorias: ["Condimentos y Aditivos"],
    emoji: "🍎",
    rating: "A",
    kcal: 21, carbs: 0.9, azucares: 0.4, proteinas: 0, grasas: 0, grasasSat: 0, fibra: 0, sodio: 5,
    motivo: "El vinagre de manzana es una opción excelente y acalórica para aliñar alimentos. La evidencia científica muestra sus efectos beneficiosos en el control glucémico y la sensibilidad a la insulina [1], la mejora de los perfiles lipídicos [2] y el apoyo en el control de peso corporal [3].",
    estudios: [
      {
        "pmid": "39949546",
        "titulo": "Effects of apple cider vinegar on glycemic control and insulin sensitivity in patients with type 2 diabetes: A GRADE-assessed systematic review and dose-response meta-analysis of controlled clinical trials.",
        "revista": "Frontiers in nutrition",
        "anio": "2025",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39949546/"
      },
      {
        "pmid": "34187442",
        "titulo": "The effect of apple cider vinegar on lipid profiles and glycemic parameters: a systematic review and meta-analysis of randomized clinical trials.",
        "revista": "BMC complementary medicine and therapies",
        "anio": "2021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34187442/"
      },
      {
        "pmid": "38966098",
        "titulo": "Apple cider vinegar for weight management in Lebanese adolescents and young adults with overweight and obesity: a randomised, double-blind, placebo-controlled study.",
        "revista": "BMJ nutrition, prevention & health",
        "anio": "2024",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38966098/"
      }
    ],
    sustitutos: []
  },
  {
    id: "ia_zanahoria",
    nombre: "Zanahoria",
    aliases: ["zanahoria"],
    categorias: ["Verduras y Hortalizas"],
    emoji: "🥕",
    rating: "A",
    kcal: 41, carbs: 9.6, azucares: 4.7, proteinas: 0.9, grasas: 0.2, grasasSat: 0.03, fibra: 2.8, sodio: 69,
    motivo: "La zanahoria es una verdura de raíz altamente nutritiva, caracterizada por su riqueza en fibra dietética, vitaminas (especialmente betacarotenos, precursores de la vitamina A, y vitamina C), y minerales. Contiene importantes compuestos bioactivos como polifenoles y flavonoides, que le confieren un potente potencial antioxidante [1]. Su consumo está asociado a múltiples beneficios para la salud, incluyendo la mejora de la salud cardiovascular como parte de una ingesta adecuada de frutas y verduras [2]. Es un alimento bajo en calorías, grasas y sodio, lo que la convierte en una opción excelente y esencial para una dieta equilibrada.",
    estudios: [
      {
        "pmid": "36497603",
        "titulo": "Root Vegetables-Composition, Health Effects, and Contaminants.",
        "revista": "International journal of environmental research and public health",
        "anio": "2022",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36497603/"
      },
      {
        "pmid": "33000670",
        "titulo": "Relation of Different Fruit and Vegetable Sources With Incident Cardiovascular Outcomes: A Systematic Review and Meta-Analysis of Prospective Cohort Studies.",
        "revista": "Journal of the American Heart Association",
        "anio": "2020",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33000670/"
      }
    ],
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
