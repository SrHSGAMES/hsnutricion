# HSNutrición

Guía nutricional que detecta alimentos por texto o imagen, los califica de A a E
y recomienda sustitutos más saludables. Los alimentos que no están en la guía
local se generan al momento con IA, respaldados por estudios reales de PubMed.

## Estructura

- `index.html`, `css/styles.css`, `js/` — sitio estático (sin build).
- `js/data.js` — base de datos nutricional local (41 alimentos).
- `api/analyze-image.js` — función serverless: detecta alimentos en una foto.
- `api/food-lookup.js` — función serverless: busca en PubMed y genera con IA
  la ficha de un alimento que no está en `js/data.js`. Si ya se generó antes
  (para cualquier visitante), la devuelve al instante desde el almacén
  compartido sin volver a llamar a la IA.
- `api/community-foods.js` — función serverless: devuelve todos los alimentos
  que la IA ha generado hasta ahora, para que la guía y la detección por
  texto/imagen los reconozcan en cualquier visita.

Las funciones usan `GEMINI_API_KEY` (API gratuita de Google Gemini)
**solo en el servidor**; el navegador nunca ve la clave.

## Alimentos generados por la comunidad (opcional, recomendado)

Cuando alguien busca un alimento que no está en `js/data.js`, la ficha que
genera la IA se guarda en un almacén compartido (Upstash Redis, nivel
gratuito). Así, la siguiente persona que busque ese mismo alimento —o lo
mencione en un texto o una foto— lo recibe al instante, sin gastar cuota de
la IA ni esperar. La guía completa también se actualiza para todo el mundo.

Es opcional: sin esto configurado, la búsqueda con IA sigue funcionando
igual, pero cada persona la repite para sí misma en su propia sesión.

**Cómo activarlo (2 minutos, sin salir de Vercel):**

1. En tu proyecto de Vercel, ve a la pestaña **Storage**.
2. **Create Database** → elige la opción de Redis (Upstash u otra similar
   del Marketplace) → sigue el asistente y conéctala al proyecto.
3. Vercel añade automáticamente las variables de entorno necesarias
   (`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`, o `KV_REST_API_URL`
   / `KV_REST_API_TOKEN` según el proveedor). Si usa otros nombres, cópialos
   con los nombres de `.env.example` o ajusta `api/_lib/store.js`.
4. Redeploy para que se apliquen.

## Conseguir la clave gratuita de Gemini

1. Entra en [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
   con tu cuenta de Google.
2. Pulsa **Create API key** y cópiala (empieza distinto según el proyecto,
   no tiene un prefijo fijo).
3. El nivel gratuito tiene límites de peticiones por minuto/día, pero no
   requiere tarjeta de crédito ni caduca.

## Desplegar en Vercel

1. Sube este proyecto a un repositorio de GitHub/GitLab/Bitbucket (o usa
   `vercel` directamente desde esta carpeta).
2. En [vercel.com](https://vercel.com), importa el repositorio (framework
   preset: "Other" — no necesita build command ni output directory, es estático).
3. En **Project Settings → Environment Variables**, añade:
   - `GEMINI_API_KEY` (obligatoria) — tu clave gratuita de Google AI Studio.
   - `GEMINI_MODEL` (opcional) — por defecto `gemini-2.5-flash`.
   - `NCBI_API_KEY` y `NCBI_EMAIL` (opcionales) — para tener más cuota al
     consultar PubMed.
   - `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN` (opcionales) —
     para que los alimentos generados por IA se compartan entre todas las
     visitas (ver sección siguiente).
4. Despliega. La web y las funciones `/api/*` quedan servidas juntas.

### Con la CLI de Vercel

```bash
npm i -g vercel
vercel login
vercel            # despliegue de prueba
vercel env add GEMINI_API_KEY
vercel --prod     # despliegue a producción
```

## Desarrollo local

Para probar solo la interfaz (sin las funciones de IA), sirve la carpeta con
cualquier servidor estático, por ejemplo `python -m http.server`.

Para probar también `/api/analyze-image` y `/api/food-lookup` necesitas la
CLI de Vercel y la variable de entorno configurada en un archivo `.env.local`
(basado en `.env.example`):

```bash
vercel dev
```

## Aviso

La información nutricional es orientativa y educativa (valores de referencia
por 100 g). No sustituye la valoración de un dietista-nutricionista o médico.
