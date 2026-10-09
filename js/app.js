/* HSNutrición — Lógica de la aplicación */

(function () {
  "use strict";

  /* ---------------- Escalas para las barras de macros (valores de referencia altos) ---------------- */
  const MACRO_KEYS = ["kcal", "carbs", "azucares", "proteinas", "grasas", "grasasSat", "fibra", "sodio"];
  const ESCALAS = { kcal: 900, carbs: 100, proteinas: 40, grasas: 100, fibra: 12 };
  const ETIQUETAS_MACRO = {
    kcal: "Calorías", carbs: "Carbohidratos", azucares: "  de los cuales azúcares",
    proteinas: "Proteínas", grasas: "Grasas", grasasSat: "  de las cuales saturadas",
    fibra: "Fibra", sodio: "Sodio"
  };

  // Ids que ya tienen página propia (alimento-<id>.html / sustituto-<id>.html)
  // en el momento de cargar la página: son los alimentos base de data.js, que
  // scripts/generar_alimentos.py y generar_sustitutos.py generan a partir de
  // ese mismo archivo. Los alimentos que la IA resuelve en vivo (antes de que
  // alguien los "promueva" a data.js) todavía no tienen esas páginas.
  const IDS_CON_PAGINA_PROPIA = new Set(FOODS.map(f => f.id));

  function slugAlimento(foodId) {
    return foodId.replace(/^ia_/, "").replace(/_/g, "-");
  }

  /* ================= Detección de alimentos en texto ================= */
  function detectarAlimentos(texto) {
    const norm = normalizar(texto);
    const encontrados = [];
    const usados = new Set();
    let restante = norm;

    for (const { alias, food } of INDICE_ALIAS) {
      if (usados.has(food.id)) continue;
      const patron = new RegExp("(^|[^a-z0-9áéíóúñ])" + escapeRegExp(alias) + "($|[^a-z0-9áéíóúñ])");
      if (patron.test(restante)) {
        encontrados.push(food);
        usados.add(food.id);
        // Evita que un alias corto (p.ej. "pan") vuelva a machacar uno largo ya usado
        restante = restante.replace(new RegExp(escapeRegExp(alias), "g"), " ");
      }
    }
    return encontrados;
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Da formato consistente a los nombres de alimentos (vengan de data.js o de
  // la IA): "Primera Letra De Cada Palabra En Mayúscula" salvo conectores
  // (de, la, el...), y todo el contenido entre paréntesis en minúsculas.
  // Preserva siglas ya escritas en mayúsculas (p. ej. "AOVE").
  const CONECTORES_MINUSCULA = new Set([
    "de", "del", "la", "el", "los", "las", "y", "e", "o", "u",
    "en", "a", "al", "con", "sin", "por", "para", "un", "una", "unos", "unas"
  ]);
  function formatearNombre(nombre) {
    if (!nombre) return nombre;
    const idxParen = nombre.indexOf("(");
    const principal = (idxParen === -1 ? nombre : nombre.slice(0, idxParen)).trim();
    const parentesis = (idxParen === -1 ? "" : nombre.slice(idxParen)).toLowerCase();

    const resultado = principal.split(" ").filter(Boolean).map((palabra, i) => {
      const esSigla = palabra.length >= 2 && palabra === palabra.toUpperCase() && palabra !== palabra.toLowerCase();
      if (esSigla) return palabra;
      const min = palabra.toLowerCase();
      if (i > 0 && CONECTORES_MINUSCULA.has(min)) return min;
      return min.charAt(0).toUpperCase() + min.slice(1);
    }).join(" ");

    return parentesis ? `${resultado} ${parentesis}` : resultado;
  }

  /* ================= Render de tarjetas ================= */
  function crearBarraMacro(clave, valor) {
    const max = ESCALAS[clave] || 100;
    const pct = Math.max(2, Math.min(100, (valor / max) * 100));
    const unidad = clave === "kcal" ? "kcal" : "g";
    const wrap = document.createElement("div");
    wrap.className = "macro-row";
    wrap.innerHTML = `
      <div class="macro-row-head"><b>${ETIQUETAS_MACRO[clave]}</b><span>${valor} ${unidad}</span></div>
      <div class="macro-track"><div class="macro-fill fill-${clave}" data-pct="${pct}"></div></div>`;
    return wrap;
  }

  // Suma los macros reales de una lista de ingredientes {foodId, cantidad},
  // gemela exacta de calcular_macros() en scripts/generar_recetas.py: mismo
  // factor (cantidad/100) y mismo redondeo a 1 decimal, para que una receta
  // creada aquí dé los mismos números que si la generara el script Python.
  function calcularMacrosReceta(ingredientes) {
    const totales = MACRO_KEYS.reduce((acc, k) => (acc[k] = 0, acc), {});
    ingredientes.forEach(ing => {
      const food = FOODS.find(f => f.id === ing.foodId);
      if (!food) return;
      const factor = ing.cantidad / 100;
      MACRO_KEYS.forEach(k => { totales[k] += (food[k] || 0) * factor; });
    });
    MACRO_KEYS.forEach(k => { totales[k] = Math.round(totales[k] * 10) / 10; });
    return totales;
  }

  // Minutos totales del campo "tiempo" de una receta (p.ej. "1 h 30 min",
  // "10 min + congelación"): suma las horas y los minutos que encuentre,
  // ignorando el resto del texto ("+ reposo", "(con reposo)"...).
  function minutosDeTiempo(tiempo) {
    const horas = tiempo.match(/(\d+)\s*h/);
    const minutos = tiempo.match(/(\d+)\s*min/);
    return (horas ? Number(horas[1]) * 60 : 0) + (minutos ? Number(minutos[1]) : 0);
  }

  function crearTablaMacros(food, { caption = "(por 100 g)" } = {}) {
    const cont = document.createElement("div");
    cont.className = "macro-table";
    ["kcal", "carbs", "proteinas", "grasas", "fibra"].forEach(clave => {
      cont.appendChild(crearBarraMacro(clave, food[clave]));
    });
    const extra = document.createElement("p");
    extra.className = "food-motivo";
    extra.style.marginTop = "0";
    extra.innerHTML = `De las grasas, <b>${food.grasasSat} g</b> son saturadas · de los carbohidratos, <b>${food.azucares} g</b> son azúcares · sodio: <b>${food.sodio} mg</b> ${caption ? `<span style="color:var(--ink-faint)">${caption}</span>` : ""}`;
    cont.appendChild(extra);
    return cont;
  }

  function crearSustituto(sub) {
    const el = document.createElement("div");
    el.className = "sub-item";
    el.innerHTML = `
      <div class="sub-head">
        <span class="food-emoji">${sub.emoji}</span>
        <strong>${formatearNombre(sub.nombre)}</strong>
        ${sub.mejor ? '<span class="sub-best">Mejor opción</span>' : ""}
      </div>
      <p class="sub-porque">${sub.porque}</p>
      <div class="sub-macros">
        <span><b>${sub.kcal}</b> kcal</span>
        <span><b>${sub.grasas}</b> g grasas</span>
        <span><b>${sub.grasasSat}</b> g saturadas</span>
        <span><b>${sub.carbs}</b> g carbs</span>
        <span><b>${sub.proteinas}</b> g proteína</span>
        <span><b>${sub.fibra}</b> g fibra</span>
      </div>`;
    return el;
  }

  function crearCitas(estudios) {
    const cont = document.createElement("div");
    cont.className = "citas";
    cont.innerHTML = estudios.map((e, i) =>
      `<a class="cita-item" href="${e.url}" target="_blank" rel="noopener noreferrer">[${i + 1}] ${e.titulo}${e.revista ? " — " + e.revista : ""}${e.anio ? " (" + e.anio + ")" : ""}</a>`
    ).join("");
    return cont;
  }

  // Botón "Ver X" que muestra/oculta un bloque de contenido — usado tanto para
  // los sustitutos recomendados como para los estudios de PubMed, así la ficha
  // no se alarga de golpe con todo visible a la vez.
  function crearDesplegable(etiqueta, contenido) {
    const frag = document.createDocumentFragment();
    const toggle = document.createElement("button");
    toggle.className = "food-card-footer-toggle";
    toggle.innerHTML = `<span>${etiqueta}</span>
      <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>`;
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      contenido.classList.toggle("open");
    });
    frag.appendChild(toggle);
    frag.appendChild(contenido);
    return frag;
  }

  // Saber si el texto de una tarjeta se corta ("Leer más") obliga al navegador a
  // calcular el diseño; hacerlo al crear las 161 fichas de la guía a la vez era
  // lo más caro de la carga. Se mide solo cuando la tarjeta se acerca a la
  // pantalla (se observa la propia tarjeta, que siempre tiene caja aunque el
  // navegador omita el diseño de su interior) y una vez cargadas las tipografías,
  // para no medir con la fuente provisional (más estrecha, que no se corta igual).
  const fuentesListas = (document.fonts && document.fonts.load)
    ? Promise.all([
        document.fonts.load('400 14px "Plus Jakarta Sans"'),
        document.fonts.load('600 16px "Fraunces"')
      ]).catch(() => {})
    : Promise.resolve();
  function actualizarLeerMas(motivoP) {
    const boton = motivoP.parentElement && motivoP.parentElement.querySelector(".leer-mas-toggle");
    if (!boton || motivoP.classList.contains("expandido")) return;
    boton.hidden = !(motivoP.scrollHeight > motivoP.clientHeight + 2);
  }
  const observadorLeerMas = "IntersectionObserver" in window
    ? new IntersectionObserver(entradas => {
        entradas.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          observadorLeerMas.unobserve(target);
          const motivoP = target.querySelector(".food-motivo-principal");
          if (motivoP) fuentesListas.then(() => actualizarLeerMas(motivoP));
        });
      }, { rootMargin: "300px" })
    : null;
  function medirLeerMas(motivoP, boton) {
    if (observadorLeerMas) {
      observadorLeerMas.observe(motivoP.parentElement);
    } else {
      requestAnimationFrame(() => {
        if (motivoP.scrollHeight > motivoP.clientHeight + 2) boton.hidden = false;
      });
    }
  }

  function crearTarjetaAlimento(food, { conSustitutos = true, estudios = null } = {}) {
    const card = document.createElement("article");
    card.className = "food-card";
    card.innerHTML = `
      <div class="food-card-head">
        <span class="food-emoji">${food.emoji}</span>
        <div class="food-title">
          <h3>${formatearNombre(food.nombre)}</h3>
          <span class="food-cat">${food.categorias.join(" · ")}</span>
        </div>
        <span class="badge badge-${food.rating}" title="Calificación nutricional">${food.rating}</span>
      </div>
      <p class="food-motivo food-motivo-principal clamped">${food.motivo}</p>
      <button class="leer-mas-toggle" type="button" hidden>Leer más</button>
      ${IDS_CON_PAGINA_PROPIA.has(food.id) ? `<a class="food-page-link" href="alimento-${slugAlimento(food.id)}.html">Ver ficha completa <span aria-hidden="true">→</span></a>` : ""}
    `;

    // El texto de descripción se trunca a 3 líneas por defecto (como en WhatsApp)
    // y solo mostramos el botón "Leer más" si de verdad hace falta, comprobando
    // en el siguiente frame si el texto real ocupa más de lo que cabe truncado.
    const motivoP = card.querySelector(".food-motivo-principal");
    const leerMasBtn = card.querySelector(".leer-mas-toggle");
    medirLeerMas(motivoP, leerMasBtn);
    leerMasBtn.addEventListener("click", () => {
      const expandido = motivoP.classList.toggle("expandido");
      motivoP.classList.toggle("clamped", !expandido);
      leerMasBtn.textContent = expandido ? "Leer menos" : "Leer más";
    });

    card.appendChild(crearTablaMacros(food));

    if (conSustitutos && food.sustitutos.length) {
      const subCont = document.createElement("div");
      subCont.className = "substitutes";
      food.sustitutos.forEach(s => subCont.appendChild(crearSustituto(s)));
      // Solo los alimentos que ya tienen página propia cuentan con su página
      // "sustituto-<id>.html" generada (scripts/generar_sustitutos.py); el
      // enlace solo se muestra cuando de verdad existe esa página.
      if (IDS_CON_PAGINA_PROPIA.has(food.id)) {
        const verMas = document.createElement("a");
        verMas.className = "btn btn-primary btn-sm";
        verMas.style.marginTop = "10px";
        verMas.href = `sustituto-${slugAlimento(food.id)}.html`;
        verMas.textContent = "Ver comparativa completa →";
        subCont.appendChild(verMas);
      }
      const etiqueta = `Ver sustituto${food.sustitutos.length > 1 ? "s" : ""} recomendado${food.sustitutos.length > 1 ? "s" : ""}`;
      card.appendChild(crearDesplegable(etiqueta, subCont));
    } else if (conSustitutos) {
      const ok = document.createElement("p");
      ok.className = "food-motivo";
      ok.style.background = "var(--green-50)";
      ok.style.borderColor = "var(--green-400)";
      ok.textContent = "✅ Este alimento ya es una excelente elección: no necesita sustituto.";
      card.appendChild(ok);
    }
    if (estudios !== null) {
      if (estudios.length) {
        card.appendChild(crearDesplegable(`Ver estudios de PubMed consultados (${estudios.length})`, crearCitas(estudios)));
      } else {
        const sinEstudios = document.createElement("p");
        sinEstudios.className = "food-motivo";
        sinEstudios.style.marginTop = "12px";
        sinEstudios.textContent = "📚 No se encontraron estudios de PubMed específicos para este alimento; la ficha se basa en tablas de composición estándar.";
        card.appendChild(sinEstudios);
      }
    }
    return card;
  }

  // Un alimento puede traer estudios de dos formas: "estudios" (fijo, en los
  // alimentos base de data.js) o "__estudios" (añadido en runtime a los
  // alimentos de la comunidad al fusionarlos). Devuelve el que corresponda.
  function estudiosDe(food) {
    return food.__estudios || food.estudios || null;
  }

  /* ================= Recetas saludables ================= */
  // La ficha completa de cada receta ahora vive en su propia página estática
  // (receta-<id>.html, generada por scripts/generar_recetas.py) para que
  // Google pueda indexar y posicionar cada receta por separado. Aquí en el
  // sitio solo se generan tarjetas-teaser que enlazan a esa página.
  function urlReceta(receta) {
    return `receta-${receta.id.replace(/_/g, "-")}.html`;
  }

  function crearTarjetaRecetaTeaser(receta, i) {
    const a = document.createElement("a");
    a.className = "receta-teaser-card";
    a.href = urlReceta(receta);
    a.style.animationDelay = Math.min(i * 0.06, 0.3) + "s";

    const foto = document.createElement("div");
    foto.className = "receta-teaser-foto";
    if (receta.imagen) {
      const img = document.createElement("img");
      // Las tarjetas usan la miniatura (img/recetas/thumbs/, ver
      // scripts/generar_miniaturas.py); si no existiera, se usa la foto original.
      const miniatura = receta.imagen.replace("img/recetas/", "img/recetas/thumbs/").replace(/\.[^./]+$/, ".jpg");
      img.src = miniatura;
      img.alt = receta.nombre;
      img.loading = "lazy";
      img.addEventListener("error", () => {
        if (img.getAttribute("src") !== receta.imagen) {
          img.src = receta.imagen;
          return;
        }
        img.remove();
        foto.insertAdjacentHTML("afterbegin", `<span class="receta-foto-emoji">${receta.emojiPortada}</span>`);
      });
      foto.appendChild(img);
    } else {
      foto.innerHTML = `<span class="receta-foto-emoji">${receta.emojiPortada}</span>`;
    }
    foto.insertAdjacentHTML("beforeend", `<span class="badge badge-${receta.rating} receta-teaser-badge" title="Calificación nutricional">${receta.rating}</span>`);

    const info = document.createElement("div");
    info.className = "receta-teaser-info";
    // Siempre calorías por ración (con 1 ración, las de la receta entera).
    const kcalRacion = Math.round(calcularMacrosReceta(receta.ingredientes).kcal / Math.max(receta.raciones || 1, 1));
    info.innerHTML = `<h3>${receta.nombre}</h3><span class="receta-meta">⏱️ ${receta.tiempo}</span><span class="receta-meta">🔥 ${kcalRacion} kcal por ración</span>`;

    a.appendChild(foto);
    a.appendChild(info);
    return a;
  }

  // Receta de comunidad: sin foto (no hay subida de imágenes en esta
  // versión), así que la tarjeta es de texto en vez de foto-primero. Abre un
  // modal de detalle en vez de navegar (no tiene página estática propia: es
  // contenido dinámico, editable y borrable). Los enlaces reales a las
  // acciones (detalle/editar/borrar) los rellenan los bloques
  // "recetas-comunidad" y "constructor-receta" vía window.__*, definidos más
  // abajo — así esta función no depende de en qué orden se ejecuten.
  function crearTarjetaRecetaComunidad(receta, i) {
    const card = document.createElement("article");
    card.className = "comunidad-card";
    card.style.animationDelay = Math.min(i * 0.05, 0.3) + "s";
    const propia = Boolean(window.__usuarioActual) && receta.autorLower === window.__usuarioActual.toLowerCase();
    // El admin puede editar y borrar cualquier receta (moderación), igual
    // que el propio autor — ver api/community-recipe.js.
    const puedeModificar = propia || Boolean(window.__esAdmin);
    card.innerHTML = `
      <div class="comunidad-card-head">
        <h3>${receta.nombre}</h3>
        <span class="badge badge-${receta.rating}" title="Calificación nutricional">${receta.rating}</span>
      </div>
      <a class="comunidad-card-autor" href="perfil.html?usuario=${encodeURIComponent(receta.autorLower)}">por @${receta.autor}</a>
      <p class="comunidad-card-desc">${receta.descripcion}</p>
      <div class="comunidad-card-chips">
        <span>${receta.macros.kcal} kcal</span>
        <span>${receta.macros.proteinas} g prot.</span>
        <span>${receta.ingredientes.length} ingrediente${receta.ingredientes.length > 1 ? "s" : ""}</span>
      </div>
      ${puedeModificar ? `<div class="comunidad-card-owner-actions">
        <button type="button" class="btn btn-ghost btn-sm" data-accion="editar">Editar</button>
        <button type="button" class="btn btn-ghost btn-sm" data-accion="borrar">Eliminar</button>
      </div>` : ""}
      ${(!propia && window.__usuarioActual) ? `<button type="button" class="comunidad-card-reportar" data-accion="reportar">⚠ Reportar</button>` : ""}
    `;
    card.addEventListener("click", e => {
      if (e.target.closest("[data-accion], a")) return;
      window.__abrirDetalleComunidad?.(receta);
    });
    if (puedeModificar) {
      card.querySelector('[data-accion="editar"]').addEventListener("click", () => window.__abrirBuilderComunidad?.(receta));
      card.querySelector('[data-accion="borrar"]').addEventListener("click", () => window.__borrarRecetaComunidad?.(receta));
    }
    const btnReportar = card.querySelector('[data-accion="reportar"]');
    if (btnReportar) {
      btnReportar.addEventListener("click", () => window.__reportarRecetaComunidad?.(receta, btnReportar));
    }
    return card;
  }

  function animarBarras(root) {
    root.querySelectorAll(".macro-fill").forEach(el => {
      const pct = el.dataset.pct;
      requestAnimationFrame(() => { el.style.width = pct + "%"; });
    });
  }

  // Ejecuta cada bloque de forma aislada: si uno falla (p.ej. por un elemento que
  // no existe tras una caché desincronizada entre HTML y JS), el resto de la
  // página sigue funcionando en vez de quedar completamente en blanco.
  // "requiere" son los ids que el bloque necesita para su página: si alguno no
  // existe (p. ej. el analizador en una receta) se omite en silencio, sin
  // ensuciar la consola con un error que no es tal.
  function seguro(nombre, fn, requiere = []) {
    if (requiere.some(id => !document.getElementById(id))) return;
    try {
      fn();
    } catch (err) {
      console.error(`[HSNutrición] Fallo en "${nombre}":`, err);
    }
  }

  /* ================= "Ver más / Ver menos" recetas en páginas de alimento y sustituto ================= */
  // Cada clic muestra u oculta un bloque de "data-por-pagina" tarjetas; el
  // botón "Ver más" desaparece cuando ya se ven todas, y "Ver menos" cuando
  // solo queda el primer bloque.
  seguro("recetas-paginadas", () => {
    function actualizar(cont, visibles) {
      const porPagina = Number(cont.dataset.porPagina) || 3;
      const tarjetas = cont.querySelectorAll(".receta-teaser-card");
      tarjetas.forEach((card, i) => { card.hidden = i >= visibles; });
      cont.querySelector(".ver-mas-recetas").hidden = visibles >= tarjetas.length;
      cont.querySelector(".ver-menos-recetas").hidden = visibles <= porPagina;
    }
    document.addEventListener("click", e => {
      const mas = e.target.closest(".ver-mas-recetas");
      const menos = e.target.closest(".ver-menos-recetas");
      if (!mas && !menos) return;
      const cont = (mas || menos).closest(".recetas-paginadas");
      const porPagina = Number(cont.dataset.porPagina) || 3;
      const visibles = cont.querySelectorAll(".receta-teaser-card:not([hidden])").length;
      if (mas) actualizar(cont, visibles + porPagina);
      // Al bajar se vuelve al bloque anterior (p. ej. 20 visibles -> 16), nunca por debajo del primero.
      else actualizar(cont, Math.max(porPagina, Math.ceil(visibles / porPagina) * porPagina - porPagina));
    });
  });

  /* ================= Reveal on scroll (va primero: es lo que hace visible el contenido) ================= */
  seguro("reveal-on-scroll", () => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  });

  /* ================= Filtros: grupo de chips (selección múltiple) ================= */
  // Construye un grupo de botones-chip dentro de "contenedor" a partir de
  // "opciones" ([{valor, etiqueta}]); cada clic añade/quita ese valor de un
  // Set y llama a onChange(seleccion) para que quien lo use vuelva a
  // filtrar. Se usa tanto para listas fijas (calificación, momento del día)
  // como dinámicas (categorías de la guía, que dependen de FOODS).
  function crearFiltroChips(contenedor, opciones, onChange, seleccionPrevia) {
    const seleccion = new Set(
      seleccionPrevia ? [...seleccionPrevia].filter(v => opciones.some(o => o.valor === v)) : []
    );
    contenedor.innerHTML = "";
    opciones.forEach(({ valor, etiqueta }) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filtro-chip";
      btn.textContent = etiqueta;
      const activo = seleccion.has(valor);
      btn.classList.toggle("activo", activo);
      btn.setAttribute("aria-pressed", activo ? "true" : "false");
      btn.addEventListener("click", () => {
        if (seleccion.has(valor)) seleccion.delete(valor); else seleccion.add(valor);
        const ahoraActivo = seleccion.has(valor);
        btn.classList.toggle("activo", ahoraActivo);
        btn.setAttribute("aria-pressed", ahoraActivo ? "true" : "false");
        onChange(seleccion);
      });
      contenedor.appendChild(btn);
    });
    return {
      seleccion,
      limpiar() {
        seleccion.clear();
        contenedor.querySelectorAll(".filtro-chip").forEach(b => {
          b.classList.remove("activo");
          b.setAttribute("aria-pressed", "false");
        });
      }
    };
  }

  /* ================= Alérgenos y alimentos excluidos (filtros de recetas y menú) ================= */
  // Los 14 alérgenos de declaración obligatoria en la UE. Se deducen del NOMBRE de
  // cada ingrediente (sin lo que va entre paréntesis), así que un alimento nuevo en
  // una receta queda clasificado solo. Es orientativo: no cuenta trazas ni los
  // ingredientes ocultos de productos envasados (revisa siempre la etiqueta).
  const ALERGENOS = [
    { id: "gluten", etiqueta: "Gluten", re: /\b(trigo|avena|cebada|centeno|espelta|kamut|seitan|bulgur|cuscus|pasta|pan|galletas?|croissant|granola|kataifi|tortitas de (avena|trigo)|rallado|cerveza|salsa de soja|cereales de desayuno|pizza|nuggets|crepes?)\b/, sin: /trigo sarraceno/ },
    { id: "crustaceos", etiqueta: "Crustáceos", re: /\b(gambas?|langostinos?|cangrejo|bogavante|langosta|camarones?|cigalas?|surimi)\b/ },
    { id: "huevo", etiqueta: "Huevo", re: /\b(huevos?|clara|yema|mayonesa|tortilla de patata)\b/ },
    { id: "pescado", etiqueta: "Pescado", re: /\b(salmon|atun|merluza|bacalao|sardinas?|caballa|trucha|dorada|lubina|anchoas?|surimi|pescado)\b/ },
    { id: "cacahuete", etiqueta: "Cacahuete", re: /cacahuete/ },
    { id: "soja", etiqueta: "Soja", re: /\b(soja|tofu|tempeh|edamame|miso)\b/ },
    { id: "lacteos", etiqueta: "Lácteos", re: /\b(leche|yogur|yogurt|queso|nata|mantequilla|kefir|skyr|requeson|cottage|whey|suero|mozzarella|feta|brie|parmesano|helado|natillas|cuajada|chocolate blanco)\b/, sin: /soja|coco|almendra|avena|vegetal|vegan|cacahuete|margarina/ },
    { id: "frutos-cascara", etiqueta: "Frutos de cáscara", re: /\b(almendras?|nueces|nuez|avellanas?|anacardos?|pistachos?|pinones|pacanas?|macadamia)\b/, sin: /nuez moscada/ },
    { id: "apio", etiqueta: "Apio", re: /\b(apio|caldo)\b/ },
    { id: "mostaza", etiqueta: "Mostaza", re: /\bmostaza\b/ },
    { id: "sesamo", etiqueta: "Sésamo", re: /\b(sesamo|tahini|tahin)\b/ },
    { id: "sulfitos", etiqueta: "Sulfitos", re: /\b(vino|vinagre balsamico|cerveza|orejones|higos secos|ciruelas pasas|pasas)\b/ },
    { id: "altramuces", etiqueta: "Altramuces", re: /\b(altramuz|altramuces|lupino)\b/ },
    { id: "moluscos", etiqueta: "Moluscos", re: /\b(almejas?|mejillones?|pulpo|calamar(es)?|sepia|ostras?|vieiras?|caracoles?|berberechos?)\b/ }
  ];
  const alergenosPorAlimento = new Map();
  function alergenosDeAlimento(foodId) {
    if (!alergenosPorAlimento.has(foodId)) {
      const food = FOODS.find(f => f.id === foodId);
      const texto = food ? normalizar(food.nombre.replace(/\([^)]*\)/g, " ")) : "";
      alergenosPorAlimento.set(foodId, ALERGENOS.filter(a => a.re.test(texto) && !(a.sin && a.sin.test(texto))).map(a => a.id));
    }
    return alergenosPorAlimento.get(foodId);
  }
  const alergenosPorReceta = new Map();
  function alergenosDeReceta(receta) {
    if (!alergenosPorReceta.has(receta.id)) {
      alergenosPorReceta.set(receta.id, [...new Set(receta.ingredientes.flatMap(i => alergenosDeAlimento(i.foodId)))]);
    }
    return alergenosPorReceta.get(receta.id);
  }

  // Buscador para excluir alimentos concretos: se escribe, se elige de la lista y
  // queda como chip que se quita con un clic. Una receta que lleve cualquiera de
  // los alimentos elegidos (opcionales incluidos) deja de salir.
  function crearFiltroExcluirAlimentos(contenedor, onChange) {
    const seleccion = new Set();
    let opciones = []; // [{ valor, etiqueta, norm }]
    contenedor.innerHTML = `
      <div class="excluir-buscador">
        <input type="search" class="excluir-input" placeholder="Escribe un alimento que no quieras (p. ej. cilantro)…" autocomplete="off" aria-label="Buscar un alimento para excluirlo">
        <ul class="excluir-sugerencias" role="listbox" hidden></ul>
      </div>
      <div class="filtro-chips excluir-elegidos"></div>`;
    const input = contenedor.querySelector(".excluir-input");
    const lista = contenedor.querySelector(".excluir-sugerencias");
    const elegidos = contenedor.querySelector(".excluir-elegidos");

    function pintarElegidos() {
      elegidos.innerHTML = "";
      seleccion.forEach(id => {
        const op = opciones.find(o => o.valor === id);
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "filtro-chip activo excluir-chip";
        chip.textContent = (op ? op.etiqueta : id) + " ✕";
        chip.setAttribute("aria-label", "Dejar de excluir " + (op ? op.etiqueta : id));
        chip.addEventListener("click", () => { seleccion.delete(id); pintarElegidos(); onChange(seleccion); });
        elegidos.appendChild(chip);
      });
    }
    function sugerencias() {
      const q = normalizar(input.value.trim());
      lista.innerHTML = "";
      if (!q) { lista.hidden = true; return []; }
      const encontradas = opciones
        .filter(o => !seleccion.has(o.valor) && o.norm.includes(q))
        .sort((a, b) => (b.norm.startsWith(q) - a.norm.startsWith(q)) || a.etiqueta.localeCompare(b.etiqueta, "es"))
        .slice(0, 8);
      encontradas.forEach(o => {
        const li = document.createElement("li");
        li.setAttribute("role", "option");
        li.textContent = o.etiqueta;
        // mousedown (y no click) para que se elija antes de que el campo pierda el foco
        li.addEventListener("mousedown", e => { e.preventDefault(); elegir(o.valor); });
        lista.appendChild(li);
      });
      lista.hidden = encontradas.length === 0;
      return encontradas;
    }
    function elegir(id) {
      seleccion.add(id);
      input.value = "";
      lista.hidden = true;
      pintarElegidos();
      onChange(seleccion);
    }
    input.addEventListener("input", sugerencias);
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") { e.preventDefault(); const [primera] = sugerencias(); if (primera) elegir(primera.valor); }
      else if (e.key === "Escape") lista.hidden = true;
    });
    input.addEventListener("blur", () => { lista.hidden = true; });

    return {
      seleccion,
      // Las opciones se pueden fijar más tarde (el menú añade sus alimentos sueltos).
      fijarOpciones(lista_) {
        opciones = lista_.map(o => ({ ...o, norm: normalizar(o.etiqueta) }));
        pintarElegidos();
      },
      limpiar() { seleccion.clear(); input.value = ""; lista.hidden = true; pintarElegidos(); }
    };
  }

  /* ================= Filtros: rango doble (barra de dos tiradores + cajas numéricas) ================= */
  // min/max delimitan la barra visual; las cajas numéricas no tienen tope, así
  // que se puede escribir un valor mayor del que alcanza la barra (p.ej. para
  // no perderse recetas con más calorías de las que cubre el tirador). Cuando
  // el valor real se sale de [min, max], el tirador se queda pegado al extremo.
  function crearFiltroRango({ etiqueta, min, max, step = 1, onChange }) {
    const wrap = document.createElement("div");
    wrap.className = "filtro-rango";
    wrap.innerHTML = `
      <span class="filtro-rango-etiqueta">${etiqueta}</span>
      <div class="filtro-rango-track">
        <div class="filtro-rango-fill"></div>
        <button type="button" class="filtro-rango-tirador filtro-rango-tirador-min" role="slider"
          aria-label="${etiqueta} — mínimo" aria-valuemin="${min}" aria-valuemax="${max}" tabindex="0"></button>
        <button type="button" class="filtro-rango-tirador filtro-rango-tirador-max" role="slider"
          aria-label="${etiqueta} — máximo" aria-valuemin="${min}" aria-valuemax="${max}" tabindex="0"></button>
      </div>
      <div class="filtro-rango-cajas">
        <input type="number" class="filtro-rango-num" data-limite="min" min="0" step="${step}" aria-label="${etiqueta} — mínimo exacto">
        <span class="filtro-rango-guion" aria-hidden="true">–</span>
        <input type="number" class="filtro-rango-num" data-limite="max" min="0" step="${step}" aria-label="${etiqueta} — máximo exacto">
      </div>`;

    const track = wrap.querySelector(".filtro-rango-track");
    const fill = wrap.querySelector(".filtro-rango-fill");
    const tirMin = wrap.querySelector(".filtro-rango-tirador-min");
    const tirMax = wrap.querySelector(".filtro-rango-tirador-max");
    const numMin = wrap.querySelector('[data-limite="min"]');
    const numMax = wrap.querySelector('[data-limite="max"]');

    let valMin = min, valMax = max;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const aPaso = v => Math.round(v / step) * step;

    function pintar() {
      const pctMin = clamp((valMin - min) / (max - min), 0, 1) * 100;
      const pctMax = clamp((valMax - min) / (max - min), 0, 1) * 100;
      tirMin.style.left = pctMin + "%";
      tirMax.style.left = pctMax + "%";
      fill.style.left = pctMin + "%";
      fill.style.width = Math.max(0, pctMax - pctMin) + "%";
      tirMin.setAttribute("aria-valuenow", valMin);
      tirMax.setAttribute("aria-valuenow", valMax);
      if (document.activeElement !== numMin) numMin.value = valMin;
      if (document.activeElement !== numMax) numMax.value = valMax;
    }

    function fijar(nuevoMin, nuevoMax, { disparar = true } = {}) {
      valMin = Math.max(0, nuevoMin);
      valMax = Math.max(0, nuevoMax);
      pintar();
      if (disparar) onChange({ min: valMin, max: valMax });
    }

    function valorDesdeX(clientX) {
      const rect = track.getBoundingClientRect();
      const frac = clamp((clientX - rect.left) / rect.width, 0, 1);
      return aPaso(min + frac * (max - min));
    }

    function activarArrastre(tirador, esMin) {
      tirador.addEventListener("pointerdown", e => {
        e.preventDefault();
        tirador.setPointerCapture(e.pointerId);
        tirador.focus();
        mover(e);
      });
      tirador.addEventListener("pointermove", e => {
        if (tirador.hasPointerCapture && tirador.hasPointerCapture(e.pointerId)) mover(e);
      });
      function mover(e) {
        const v = valorDesdeX(e.clientX);
        if (esMin) fijar(Math.min(v, valMax), valMax);
        else fijar(valMin, Math.max(v, valMin));
      }
      tirador.addEventListener("keydown", e => {
        let delta = 0;
        if (e.key === "ArrowRight" || e.key === "ArrowUp") delta = step;
        else if (e.key === "ArrowLeft" || e.key === "ArrowDown") delta = -step;
        else if (e.key === "Home") delta = -Infinity;
        else if (e.key === "End") delta = Infinity;
        else return;
        e.preventDefault();
        if (esMin) {
          const v = delta === -Infinity ? min : delta === Infinity ? valMax : clamp(valMin + delta, min, valMax);
          fijar(v, valMax);
        } else {
          const v = delta === -Infinity ? valMin : delta === Infinity ? max : clamp(valMax + delta, valMin, max);
          fijar(valMin, v);
        }
      });
    }
    activarArrastre(tirMin, true);
    activarArrastre(tirMax, false);

    numMin.addEventListener("input", () => {
      if (numMin.value === "") return;
      const v = Math.max(0, Number(numMin.value));
      fijar(v, Math.max(v, valMax));
    });
    numMax.addEventListener("input", () => {
      if (numMax.value === "") return;
      const v = Math.max(0, Number(numMax.value));
      fijar(Math.min(v, valMin), v);
    });

    pintar();
    return {
      el: wrap,
      obtener: () => ({ min: valMin, max: valMax }),
      activo: () => valMin !== min || valMax !== max,
      reset: () => fijar(min, max, { disparar: false })
    };
  }

  // Botón "Filtros": despliega/esconde el panel de filtros (cerrado por
  // defecto para no abrumar) y muestra cuántos filtros hay activos.
  function conectarBotonFiltros(boton, panel) {
    boton.addEventListener("click", () => {
      const abrir = panel.hidden;
      panel.hidden = !abrir;
      boton.setAttribute("aria-expanded", abrir ? "true" : "false");
    });
    const num = boton.querySelector(".btn-filtros-num");
    return function actualizarNumero(n) {
      num.textContent = n;
      num.hidden = n === 0;
    };
  }

  /* ================= Guía completa (contenido visible por defecto) ================= */
  seguro("guia-completa", () => {
    const guiaGrid = document.getElementById("guiaGrid");
    const buscadorGuia = document.getElementById("buscadorGuia");
    const contCategoria = document.getElementById("filtroCategoria");
    const contRating = document.getElementById("filtroRating");
    const btnLimpiar = document.getElementById("limpiarFiltrosGuia");
    const actualizarNumFiltros = conectarBotonFiltros(
      document.getElementById("btnFiltrosGuia"), document.getElementById("panelFiltrosGuia")
    );

    let chipsCategoria = crearFiltroChips(contCategoria, [], renderGuia);
    const chipsRating = crearFiltroChips(contRating, [
      { valor: "A", etiqueta: "A — Excelente" },
      { valor: "B", etiqueta: "B — Buena" },
      { valor: "C", etiqueta: "C — Moderada" },
      { valor: "D", etiqueta: "D — Mejorable" },
      { valor: "E", etiqueta: "E — Poco recomendable" }
    ], renderGuia);

    // Las categorías dependen de FOODS (crece con los alimentos de la
    // comunidad), así que se reconstruyen los chips manteniendo lo ya
    // marcado cuando aparecen categorías nuevas.
    function actualizarCategorias() {
      const categorias = [...new Set(FOODS.flatMap(f => f.categorias))].sort();
      chipsCategoria = crearFiltroChips(
        contCategoria,
        categorias.map(c => ({ valor: c, etiqueta: c })),
        renderGuia,
        chipsCategoria.seleccion
      );
    }

    function renderGuia() {
      const q = normalizar(buscadorGuia.value);
      const cats = chipsCategoria.seleccion;
      const ratings = chipsRating.seleccion;
      actualizarNumFiltros(cats.size + ratings.size);
      const lista = FOODS.filter(f =>
        (!q || normalizar(f.nombre).includes(q)) &&
        (cats.size === 0 || f.categorias.some(c => cats.has(c))) &&
        (ratings.size === 0 || ratings.has(f.rating))
      ).sort((a, b) => formatearNombre(a.nombre).localeCompare(formatearNombre(b.nombre), "es", { sensitivity: "base" }));
      guiaGrid.innerHTML = "";
      if (!lista.length) {
        guiaGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--ink-faint)">No se han encontrado alimentos con ese filtro.</p>';
        return;
      }
      lista.forEach((food, i) => {
        const estudios = estudiosDe(food);
        const card = crearTarjetaAlimento(food, estudios ? { estudios } : {});
        card.style.animationDelay = Math.min(i * 0.04, 0.4) + "s";
        guiaGrid.appendChild(card);
      });
      animarBarras(guiaGrid);
    }
    actualizarCategorias();
    buscadorGuia.addEventListener("input", renderGuia);
    btnLimpiar?.addEventListener("click", () => {
      buscadorGuia.value = "";
      chipsCategoria.limpiar();
      chipsRating.limpiar();
      renderGuia();
    });
    renderGuia();

    // Otros bloques (p.ej. la carga de alimentos de la comunidad) llaman a
    // esto cuando añaden alimentos nuevos a FOODS, para refrescar la vista.
    window.__refrescarGuia = () => { actualizarCategorias(); renderGuia(); };
  }, ["guiaGrid"]);

  /* ================= Filtros de recetas (compartidos: recetas.html y menu.html) ================= */
  // Monta los chips (momento opcional, categoría, calificación) y los rangos
  // (tiempo y macros de la receta completa) en los contenedores dados, y
  // devuelve pasa(receta) para filtrar, activos() para el contador del botón
  // "Filtros" y limpiar(). Así el menú diario usa exactamente los mismos
  // filtros que el listado de recetas, sin duplicar lógica.
  function crearFiltrosRecetas({ contMomento, contCategoria, contRating, contRangos, contAlergenos, contExcluir, onChange, sinBajoEnCalorias = false }) {
    // Macros totales de cada receta completa (no por ración): se calculan una
    // sola vez y se reutilizan en cada filtrado por rango.
    const macrosPorReceta = new Map(RECETAS.map(r => [r.id, calcularMacrosReceta(r.ingredientes)]));

    const chipsMomento = contMomento ? crearFiltroChips(contMomento, [
      { valor: "desayuno", etiqueta: "Desayuno" },
      { valor: "comida", etiqueta: "Comida" },
      { valor: "cena", etiqueta: "Cena" },
      { valor: "snack", etiqueta: "Snack o postre" }
    ], onChange) : null;
    const chipsCategoria = crearFiltroChips(contCategoria, [
      { valor: "vegano", etiqueta: "Vegano" },
      { valor: "vegetariano", etiqueta: "Vegetariano" },
      { valor: "proteico", etiqueta: "Proteico" },
      ...(sinBajoEnCalorias ? [] : [{ valor: "bajo-en-calorias", etiqueta: "Bajo en calorías" }])
    ], onChange);
    const chipsRating = crearFiltroChips(contRating, [
      { valor: "A", etiqueta: "A" }, { valor: "B", etiqueta: "B" }, { valor: "C", etiqueta: "C" },
      { valor: "D", etiqueta: "D" }, { valor: "E", etiqueta: "E" }
    ], onChange);

    // Exclusiones: alérgenos (chips) y alimentos concretos (buscador). Opcionales: solo si la página trae el contenedor.
    const chipsAlergenos = contAlergenos
      ? crearFiltroChips(contAlergenos, ALERGENOS.map(a => ({ valor: a.id, etiqueta: a.etiqueta })), onChange)
      : null;
    const excluirAlimentos = contExcluir ? crearFiltroExcluirAlimentos(contExcluir, onChange) : null;
    // Alimentos que se pueden excluir: los que aparecen como ingrediente en alguna receta (más los extra que pase la página).
    function fijarAlimentos(extra = []) {
      if (!excluirAlimentos) return;
      const ids = new Set([...RECETAS.flatMap(r => r.ingredientes.map(i => i.foodId)), ...extra]);
      ids.delete("ia_agua");
      excluirAlimentos.fijarOpciones(
        [...ids].map(id => FOODS.find(f => f.id === id)).filter(Boolean).map(f => ({ valor: f.id, etiqueta: formatearNombre(f.nombre) }))
      );
    }
    fijarAlimentos();

    const rangoTiempo = crearFiltroRango({ etiqueta: "Tiempo de preparación (min)", min: 0, max: 180, step: 5, onChange });
    const rangoKcal = crearFiltroRango({ etiqueta: "Calorías (receta completa)", min: 0, max: 5000, step: 10, onChange });
    const rangoCarbs = crearFiltroRango({ etiqueta: "Carbohidratos (g, receta completa)", min: 0, max: 1000, step: 5, onChange });
    const rangoProteinas = crearFiltroRango({ etiqueta: "Proteínas (g, receta completa)", min: 0, max: 1000, step: 5, onChange });
    const rangoGrasas = crearFiltroRango({ etiqueta: "Grasas (g, receta completa)", min: 0, max: 1000, step: 5, onChange });
    const rangos = [rangoTiempo, rangoKcal, rangoCarbs, rangoProteinas, rangoGrasas];
    rangos.forEach(r => contRangos.appendChild(r.el));

    function dentroDeRango(valor, rango) {
      const { min, max } = rango.obtener();
      return valor >= min && valor <= max;
    }

    return {
      pasa(r) {
        // Los alimentos sueltos del menú no están en RECETAS: sus macros se calculan al vuelo.
        const macros = macrosPorReceta.get(r.id) || calcularMacrosReceta(r.ingredientes);
        const momentos = chipsMomento ? chipsMomento.seleccion : new Set();
        const cats = chipsCategoria.seleccion;
        const ratings = chipsRating.seleccion;
        if (chipsAlergenos && chipsAlergenos.seleccion.size && alergenosDeReceta(r).some(a => chipsAlergenos.seleccion.has(a))) return false;
        if (excluirAlimentos && excluirAlimentos.seleccion.size && r.ingredientes.some(i => excluirAlimentos.seleccion.has(i.foodId))) return false;
        return (momentos.size === 0 || (r.momento || []).some(m => momentos.has(m))) &&
          (cats.size === 0 || (r.etiquetas || []).some(c => cats.has(c))) &&
          (ratings.size === 0 || ratings.has(r.rating)) &&
          dentroDeRango(minutosDeTiempo(r.tiempo), rangoTiempo) &&
          dentroDeRango(macros.kcal, rangoKcal) &&
          dentroDeRango(macros.carbs, rangoCarbs) &&
          dentroDeRango(macros.proteinas, rangoProteinas) &&
          dentroDeRango(macros.grasas, rangoGrasas);
      },
      activos() {
        return (chipsMomento ? chipsMomento.seleccion.size : 0) + chipsCategoria.seleccion.size +
          chipsRating.seleccion.size + rangos.filter(r => r.activo()).length +
          (chipsAlergenos ? chipsAlergenos.seleccion.size : 0) + (excluirAlimentos ? excluirAlimentos.seleccion.size : 0);
      },
      fijarAlimentos,
      limpiar() {
        if (chipsAlergenos) chipsAlergenos.limpiar();
        if (excluirAlimentos) excluirAlimentos.limpiar();
        if (chipsMomento) chipsMomento.limpiar();
        chipsCategoria.limpiar();
        chipsRating.limpiar();
        rangos.forEach(r => r.reset());
      }
    };
  }

  /* ================= Recetas saludables: galería completa en recetas.html ================= */
  seguro("recetas", () => {
    const grid = document.getElementById("recetasGrid");
    const buscador = document.getElementById("buscadorRecetas");
    const btnLimpiar = document.getElementById("limpiarFiltrosRecetas");
    const actualizarNumFiltros = conectarBotonFiltros(
      document.getElementById("btnFiltrosRecetas"), document.getElementById("panelFiltrosRecetas")
    );
    const sinResultados = document.getElementById("recetasSinResultados");

    const filtros = crearFiltrosRecetas({
      contMomento: document.getElementById("filtroMomentoRecetas"),
      contCategoria: document.getElementById("filtroCategoriaRecetas"),
      contRating: document.getElementById("filtroRatingRecetas"),
      contRangos: document.getElementById("filtroRangosRecetas"),
      contAlergenos: document.getElementById("filtroAlergenosRecetas"),
      contExcluir: document.getElementById("filtroExcluirRecetas"),
      onChange: renderRecetas
    });

    function renderRecetas() {
      const q = normalizar(buscador.value);
      actualizarNumFiltros(filtros.activos());
      const lista = RECETAS
        .filter(r => (!q || normalizar(r.nombre).includes(q)) && filtros.pasa(r))
        .sort((a, b) => a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" }));
      grid.innerHTML = "";
      sinResultados.hidden = lista.length > 0;
      lista.forEach((receta, i) => grid.appendChild(crearTarjetaRecetaTeaser(receta, i)));
      grid.dataset.listo = "1"; // quita el espacio reservado (ver css: #recetasGrid)
    }
    buscador.addEventListener("input", renderRecetas);
    btnLimpiar?.addEventListener("click", () => {
      buscador.value = "";
      filtros.limpiar();
      renderRecetas();
    });
    renderRecetas();
  }, ["recetasGrid"]);

  /* ================= Menú diario (menu.html, solo usuarios registrados) ================= */
  // Reparte las calorías pedidas entre desayuno, comida, cena (y snacks) usando
  // las recetas que pasan los mismos filtros que el listado de recetas. Si una
  // receta no llega a las calorías de su comida, se suman más platos o raciones.
  // Todo ocurre en el navegador: no usa ninguna función del servidor, la
  // sesión solo decide si se muestra la herramienta o la invitación a entrar.
  seguro("menu-diario", () => {
    const bloqueo = document.getElementById("menuBloqueo");
    const herramienta = document.getElementById("menuHerramienta");
    const inputKcal = document.getElementById("menuKcal");
    const chkSnacks = document.getElementById("menuSnacks");
    const btnGenerar = document.getElementById("menuGenerar");
    const btnLimpiar = document.getElementById("limpiarFiltrosMenu");
    const aviso = document.getElementById("menuAviso");
    const resultado = document.getElementById("menuResultado");
    const actualizarNumFiltros = conectarBotonFiltros(
      document.getElementById("btnFiltrosMenu"), document.getElementById("panelFiltrosMenu")
    );

    // --- Sesión: sin ella solo se ve la invitación a registrarse.
    function aplicarSesion() {
      const dentro = Boolean(window.__usuarioActual);
      bloqueo.hidden = dentro;
      herramienta.hidden = !dentro;
    }
    document.addEventListener("hsn:auth-cambio", aplicarSesion);
    if (window.__usuarioActual !== undefined) aplicarSesion();
    // Si /api/me no llega a responder, no dejar la página en blanco.
    setTimeout(() => { if (bloqueo.hidden && herramienta.hidden) aplicarSesion(); }, 4000);
    document.getElementById("menuBtnAcceder").addEventListener("click", () => document.getElementById("btnAuth").click());

    // --- Filtros: los mismos que en recetas.html (menos "momento", que aquí lo decide el reparto del día).
    const filtros = crearFiltrosRecetas({
      contMomento: null,
      contCategoria: document.getElementById("filtroCategoriaMenu"),
      contRating: document.getElementById("filtroRatingMenu"),
      contRangos: document.getElementById("filtroRangosMenu"),
      contAlergenos: document.getElementById("filtroAlergenosMenu"),
      contExcluir: document.getElementById("filtroExcluirMenu"),
      onChange: () => actualizarNumFiltros(filtros.activos()),
      sinBajoEnCalorias: true // depende de las calorías que se pidan, así que aquí no tiene sentido
    });

    const COMIDAS = {
      desayuno: { titulo: "Desayuno", emoji: "🌅" },
      comida: { titulo: "Comida", emoji: "🍽️" },
      cena: { titulo: "Cena", emoji: "🌙" },
      snack: { titulo: "Snacks", emoji: "🍎" }
    };
    // Parte de las calorías del día que le toca a cada comida.
    const REPARTO_SIN_SNACKS = { desayuno: 0.25, comida: 0.40, cena: 0.35 };
    const REPARTO_CON_SNACKS = { desayuno: 0.22, comida: 0.35, cena: 0.30, snack: 0.13 };

    // Alimentos que se pueden comer tal cual (no arroz crudo, pero sí un plátano).
    // Cada uno lleva una ración realista y la medida casera para que se entienda.
    const SUELTOS_DEF = [
      // [id, gramos, medida, momentos, etiquetas]
      ["ia_platano", 120, "1 plátano mediano", "dscp", "vegano"], ["manzana", 180, "1 manzana mediana", "dscp", "vegano"],
      ["ia_pera", 170, "1 pera mediana", "dscp", "vegano"], ["naranja", 200, "1 naranja", "dscp", "vegano"],
      ["mandarina", 150, "2 mandarinas", "dscp", "vegano"], ["kiwi", 150, "2 kiwis", "dscp", "vegano"],
      ["fresas", 150, "un plato de fresas", "dscp", "vegano"], ["arandanos", 100, "un puñado grande", "dscp", "vegano"],
      ["frambuesas", 100, "un puñado grande", "dscp", "vegano"], ["moras", 100, "un puñado grande", "dscp", "vegano"],
      ["melocoton", 150, "1 melocotón", "dscp", "vegano"], ["albaricoque", 120, "3 albaricoques", "dscp", "vegano"],
      ["sandia", 250, "1 tajada grande", "dscp", "vegano"], ["melon", 200, "1 tajada", "dscp", "vegano"],
      ["mango", 150, "medio mango", "dscp", "vegano"], ["pina", 150, "unas rodajas", "dscp", "vegano"],
      ["papaya", 150, "1 trozo grande", "dscp", "vegano"], ["ia_uva", 120, "un racimo pequeño", "dscp", "vegano"],
      ["ia_cerezas", 100, "un puñado", "dscp", "vegano"], ["ia_granada", 100, "media granada", "dscp", "vegano"],
      ["ia_chirimoya", 150, "1 chirimoya pequeña", "dscp", "vegano"], ["caqui", 150, "1 caqui", "dscp", "vegano"],
      ["ia_datiles", 30, "3 dátiles", "ds", "vegano"],
      ["ia_almendras", 30, "un puñado", "ds", "vegano"], ["ia_nueces", 30, "un puñado", "ds", "vegano"],
      ["ia_anacardo", 30, "un puñado", "ds", "vegano"], ["pistachos", 30, "un puñado", "ds", "vegano"],
      ["ia_avellanas", 30, "un puñado", "ds", "vegano"],
      ["yogur_natural", 125, "1 yogur", "ds", "vegetariano"], ["yogur_griego", 125, "1 yogur", "ds", "vegetariano,proteico"],
      ["yogur_soja", 125, "1 yogur", "ds", "vegano"], ["skyr", 150, "1 tarrina", "ds", "vegetariano,proteico"],
      ["queso_fresco", 125, "1 tarrina", "ds", "vegetariano,proteico"], ["kefir", 200, "1 vaso", "ds", "vegetariano"],
      ["requeson", 100, "1 ración", "ds", "vegetariano,proteico"], ["queso_cottage", 125, "1 tarrina", "ds", "vegetariano,proteico"],
      ["huevo", 60, "1 huevo cocido", "ds", "vegetariano,proteico"],
      ["ia_zanahoria", 100, "1 zanahoria en bastones", "s", "vegano"], ["pepino", 150, "medio pepino en bastones", "s", "vegano"]
    ];
    const LETRA_MOMENTO = { d: "desayuno", s: "snack", c: "comida", p: "cena" };
    // Se disfrazan de receta (1 ración = la porción) para reutilizar filtros y reparto.
    const SUELTOS = SUELTOS_DEF.map(([foodId, gramos, medida, momentos, etiquetas]) => {
      const food = FOODS.find(f => f.id === foodId);
      return food && {
        id: "suelto:" + foodId, suelto: true, nombre: formatearNombre(food.nombre), emojiPortada: food.emoji,
        rating: food.rating, medida, gramos, raciones: 1, tiempo: "0 min",
        etiquetas: etiquetas.split(","), momento: momentos.split("").map(l => LETRA_MOMENTO[l]),
        ingredientes: [{ foodId, cantidad: gramos }],
        href: IDS_CON_PAGINA_PROPIA.has(foodId) ? `alimento-${slugAlimento(foodId)}.html` : null
      };
    }).filter(Boolean);
    const TODOS = [...RECETAS, ...SUELTOS];
    filtros.fijarAlimentos(SUELTOS.map(s => s.ingredientes[0].foodId)); // los alimentos sueltos también se pueden excluir

    const macrosDe = new Map(TODOS.map(r => [r.id, calcularMacrosReceta(r.ingredientes)]));
    const racionesDe = r => Math.max(r.raciones || 1, 1);
    const kcalRacion = r => macrosDe.get(r.id).kcal / racionesDe(r);

    let menu = null;       // { desayuno: [{receta, raciones}], ... }
    let objetivo = 0;
    let comidasActivas = [];

    const aleatorio = n => Math.floor(Math.random() * n);
    function barajar(lista) {
      const a = lista.slice();
      for (let i = a.length - 1; i > 0; i--) { const j = aleatorio(i + 1); [a[i], a[j]] = [a[j], a[i]]; }
      return a;
    }
    const kcalPlatos = platos => platos.reduce((t, p) => t + kcalRacion(p.receta) * p.raciones, 0);

    // Recetas candidatas para una comida: etiquetadas para ella y que pasen los filtros.
    function candidatas(comida, excluir) {
      return TODOS.filter(r => (r.momento || []).includes(comida) && !excluir.has(r.id) && kcalRacion(r) >= 40 && filtros.pasa(r));
    }

    // Busca una combinación de platos cuyas calorías se acerquen a "objetivoComida".
    function resolverComida(comida, objetivoComida, excluir) {
      const pool = candidatas(comida, excluir);
      if (!pool.length) return [];
      const maxPlatos = objetivoComida > 1100 ? 4 : 3;
      const principales = comida !== "snack";
      const poolRecetas = pool.filter(r => !r.suelto);
      // Una comida principal necesita al menos una receta; si los filtros no dejan ninguna, se resuelve con lo que haya.
      const exigeReceta = principales && poolRecetas.length > 0;
      let mejores = [];
      for (let i = 0; i < 700; i++) {
        const n = Math.min(1 + aleatorio(maxPlatos), pool.length);
        let elegidos = barajar(pool).slice(0, n);
        if (exigeReceta && !elegidos.some(r => !r.suelto)) elegidos[0] = poolRecetas[aleatorio(poolRecetas.length)];
        if (principales) {
          // como mucho 2 alimentos sueltos junto a las recetas
          let sueltos = 0;
          elegidos = elegidos.filter(r => !r.suelto || ++sueltos <= 2);
        }
        elegidos = [...new Set(elegidos)];
        const platos = elegidos.map(receta => ({ receta, raciones: !receta.suelto && Math.random() < 0.3 ? 2 : (receta.suelto && Math.random() < 0.2 ? 2 : 1) }));
        const error = Math.abs(kcalPlatos(platos) - objetivoComida) / objetivoComida + 0.012 * n;
        mejores.push({ platos, error });
      }
      mejores.sort((a, b) => a.error - b.error);
      // Entre las mejores se elige al azar para que cada pulsación dé un menú distinto.
      const cota = mejores[0].error + 0.04;
      const top = mejores.filter(m => m.error <= cota).slice(0, 8);
      return top[aleatorio(top.length)].platos;
    }

    function generar() {
      const kcal = Number(inputKcal.value);
      if (!Number.isFinite(kcal) || kcal < 500 || kcal > 10000) {
        aviso.textContent = "Escribe unas calorías entre 500 y 10.000 kcal.";
        return;
      }
      objetivo = kcal;
      const reparto = chkSnacks.checked ? REPARTO_CON_SNACKS : REPARTO_SIN_SNACKS;
      comidasActivas = Object.keys(reparto);
      // La cena (o la última comida) absorbe lo que falte, para cerrar el día en el objetivo.
      const orden = ["desayuno", "comida", ...(chkSnacks.checked ? ["snack"] : []), "cena"];
      const usadas = new Set();
      menu = {};
      let acumulado = 0;
      orden.forEach((comida, i) => {
        const ultima = i === orden.length - 1;
        const objetivoComida = ultima ? Math.max(objetivo - acumulado, objetivo * 0.12) : objetivo * reparto[comida];
        menu[comida] = resolverComida(comida, objetivoComida, usadas);
        menu[comida].forEach(p => usadas.add(p.receta.id));
        acumulado += kcalPlatos(menu[comida]);
      });
      pintar();
    }

    // Cambia solo una comida, ajustándola a lo que falta para el objetivo del día.
    function cambiarComida(comida) {
      const resto = comidasActivas.filter(c => c !== comida).reduce((t, c) => t + kcalPlatos(menu[c]), 0);
      const usadasOtras = new Set(comidasActivas.filter(c => c !== comida).flatMap(c => menu[c].map(p => p.receta.id)));
      const objetivoComida = Math.max(objetivo - resto, objetivo * 0.1);
      const previos = new Set(menu[comida].map(p => p.receta.id));
      let nuevos = resolverComida(comida, objetivoComida, new Set([...usadasOtras, ...previos]));
      if (!nuevos.length) nuevos = resolverComida(comida, objetivoComida, usadasOtras); // pocas recetas: se permite repetir
      menu[comida] = nuevos;
      pintar();
    }

    // Cambia un único plato de una comida y deja el resto como estaba. El nuevo plato se
    // ajusta a lo que falta para el objetivo del día y no repite nada que ya esté en el menú.
    function cambiarPlato(comida, indice) {
      const platos = menu[comida];
      const actual = platos[indice];
      if (!actual) return;
      const total = comidasActivas.reduce((t, c) => t + kcalPlatos(menu[c]), 0);
      const objetivoPlato = Math.max(objetivo - (total - kcalPlatos([actual])), 60);
      const resto = platos.filter((_, i) => i !== indice);
      const principales = comida !== "snack";
      const sueltosEnResto = resto.filter(p => p.receta.suelto).length;
      const hayOtraReceta = resto.some(p => !p.receta.suelto);
      const enMenu = new Set(comidasActivas.flatMap(c => menu[c].map(p => p.receta.id)));
      const soloEstaComida = new Set(resto.map(p => p.receta.id).concat(actual.receta.id));

      const buscar = excluir => {
        let pool = candidatas(comida, excluir);
        // una comida principal conserva al menos una receta y como mucho 2 alimentos sueltos
        if (principales && !hayOtraReceta && pool.some(r => !r.suelto)) pool = pool.filter(r => !r.suelto);
        if (principales && sueltosEnResto >= 2) pool = pool.filter(r => !r.suelto);
        const opciones = [];
        pool.forEach(receta => [1, 2].forEach(raciones => {
          const plato = { receta, raciones };
          opciones.push({ plato, error: Math.abs(kcalPlatos([plato]) - objetivoPlato) / objetivoPlato });
        }));
        opciones.sort((a, b) => a.error - b.error);
        // Una opción por receta (la mejor ración) y, entre las más cercanas, una al azar.
        const vistas = new Set();
        const unicas = opciones.filter(o => !vistas.has(o.plato.receta.id) && vistas.add(o.plato.receta.id));
        const top = unicas.slice(0, 6);
        return top.length ? top[aleatorio(top.length)].plato : null;
      };
      // Primero algo que no esté en ninguna parte del menú; si no queda nada, se permite repetir otra comida.
      const nuevo = buscar(enMenu) || buscar(soloEstaComida);
      if (!nuevo) {
        aviso.textContent = "No hay más alternativas para este plato con los filtros actuales.";
        return;
      }
      aviso.textContent = "";
      platos[indice] = nuevo;
      pintar();
      const boton = resultado.querySelector(`[data-cambiar-plato="${comida}:${indice}"]`);
      if (boton) boton.focus({ preventScroll: true });
    }

    // --- Menús guardados: varios, con nombre, en este navegador y ligados al usuario.
    const MAX_MENUS = 20;
    const claveMenus = () => "hsn:menus:" + String(window.__usuarioActual || "").toLowerCase();
    function leerMenus() {
      try {
        const lista = JSON.parse(localStorage.getItem(claveMenus()) || "[]");
        return Array.isArray(lista) ? lista : [];
      } catch (_) { return []; }
    }
    function escribirMenus(lista) {
      try { localStorage.setItem(claveMenus(), JSON.stringify(lista)); return true; } catch (_) { return false; }
    }

    function guardarMenuActual(nombre) {
      if (!menu || !window.__usuarioActual) return "Inicia sesión para guardar menús.";
      const lista = leerMenus();
      if (lista.length >= MAX_MENUS) return `Ya tienes ${MAX_MENUS} menús guardados. Borra alguno para guardar otro.`;
      lista.unshift({
        id: Date.now().toString(36) + aleatorio(1e6).toString(36),
        nombre: nombre.trim().slice(0, 40),
        fecha: new Date().toISOString(),
        objetivo,
        kcal: Math.round(comidasActivas.reduce((t, c) => t + kcalPlatos(menu[c]), 0)),
        comidas: comidasActivas.slice(),
        menu: Object.fromEntries(comidasActivas.map(c => [c, menu[c].map(p => ({ id: p.receta.id, raciones: p.raciones }))]))
      });
      if (!escribirMenus(lista)) return "Tu navegador no deja guardar datos (¿modo privado?).";
      renderGuardados();
      return "";
    }

    function abrirMenuGuardado(m) {
      const porId = new Map(TODOS.map(r => [r.id, r]));
      const comidas = (m.comidas || Object.keys(m.menu || {})).filter(c => COMIDAS[c]);
      let perdidos = 0;
      const nuevo = {};
      comidas.forEach(c => {
        nuevo[c] = ((m.menu || {})[c] || []).map(p => {
          const receta = porId.get(p.id);
          if (!receta) { perdidos++; return null; }
          return { receta, raciones: p.raciones || 1 };
        }).filter(Boolean);
      });
      if (!comidas.length) return;
      menu = nuevo;
      objetivo = Number(m.objetivo) || objetivo;
      comidasActivas = comidas;
      inputKcal.value = objetivo;
      chkSnacks.checked = comidas.includes("snack");
      aviso.textContent = perdidos ? `${perdidos} ${perdidos === 1 ? "plato ya no existe" : "platos ya no existen"} en la web y se ha quitado del menú.` : "";
      pintar();
      resultado.scrollIntoView({ block: "start" });
    }

    function renderGuardados() {
      const cont = document.getElementById("menuGuardados");
      if (!cont) return;
      const lista = window.__usuarioActual ? leerMenus() : [];
      cont.hidden = lista.length === 0;
      cont.innerHTML = "";
      if (!lista.length) return;
      const cab = document.createElement("div");
      cab.className = "menu-guardados-cab";
      cab.innerHTML = `<h3>📌 Mis menús guardados</h3><span class="menu-guardados-nota">Se guardan en este navegador, con tu usuario (${lista.length}/${MAX_MENUS}).</span>`;
      const ul = document.createElement("ul");
      ul.className = "menu-guardados-lista";
      lista.forEach(m => {
        const li = document.createElement("li");
        const info = document.createElement("div");
        info.className = "menu-guardado-info";
        const nombre = document.createElement("b");
        nombre.textContent = m.nombre || "Menú sin nombre";
        const meta = document.createElement("span");
        const fecha = m.fecha ? new Date(m.fecha).toLocaleDateString("es-ES") : "";
        meta.textContent = `${fmt(m.kcal || m.objetivo || 0)} kcal · ${(m.comidas || []).length} comidas${fecha ? " · " + fecha : ""}`;
        info.append(nombre, meta);
        const abrir = document.createElement("button");
        abrir.type = "button"; abrir.className = "btn btn-primary btn-sm"; abrir.textContent = "Abrir";
        abrir.addEventListener("click", () => abrirMenuGuardado(m));
        const borrar = document.createElement("button");
        borrar.type = "button"; borrar.className = "btn btn-ghost btn-sm"; borrar.textContent = "Borrar";
        let temporizador = null;
        borrar.addEventListener("click", () => {
          if (!borrar.classList.contains("confirmar")) {
            // primer clic: pide confirmación y la retira sola a los 3 s
            borrar.classList.add("confirmar"); borrar.textContent = "¿Seguro?";
            temporizador = setTimeout(() => { borrar.classList.remove("confirmar"); borrar.textContent = "Borrar"; }, 3000);
            return;
          }
          clearTimeout(temporizador);
          escribirMenus(leerMenus().filter(x => x.id !== m.id));
          renderGuardados();
        });
        li.append(info, abrir, borrar);
        ul.appendChild(li);
      });
      cont.append(cab, ul);
    }

    const fmt = n => Math.round(n).toLocaleString("es-ES");
    const fmt1 = n => (Math.round(n * 10) / 10).toLocaleString("es-ES");

    function crearPlato({ receta, raciones }, comida, indice) {
      const item = document.createElement("div");
      item.className = "menu-plato-item";
      const a = document.createElement("a");
      a.className = "menu-plato";
      if (receta.suelto) { if (receta.href) a.href = receta.href; } else a.href = urlReceta(receta);
      const foto = receta.imagen
        ? `<img src="${receta.imagen.replace("img/recetas/", "img/recetas/thumbs/").replace(/\.[^./]+$/, ".jpg")}" alt="" loading="lazy" width="64" height="48">`
        : `<span class="menu-plato-emoji" aria-hidden="true">${receta.emojiPortada}</span>`;
      a.innerHTML = `
        <span class="menu-plato-foto">${foto}</span>
        <span class="menu-plato-info">
          <b>${receta.nombre}${receta.suelto ? ' <span class="menu-plato-tipo">alimento</span>' : ""}</b>
          <span class="receta-meta">${receta.suelto
            ? `${raciones === 1 ? receta.medida : raciones + " raciones"} (${receta.gramos * raciones} g)`
            : `${raciones} ${raciones === 1 ? "ración" : "raciones"}`} · ${fmt(kcalRacion(receta) * raciones)} kcal</span>
        </span>
        <span class="badge badge-${receta.rating}" title="Calificación nutricional">${receta.rating}</span>`;
      const cambiar = document.createElement("button");
      cambiar.type = "button";
      cambiar.className = "menu-plato-cambiar";
      cambiar.dataset.cambiarPlato = comida + ":" + indice;
      cambiar.title = "Cambiar solo este plato";
      cambiar.setAttribute("aria-label", "Cambiar solo este plato: " + receta.nombre);
      cambiar.innerHTML = '<span aria-hidden="true">↻</span><span class="menu-plato-cambiar-txt">Cambiar</span>';
      item.append(a, cambiar);
      return item;
    }

    // --- Lista de la compra: suma los ingredientes de todo el menú, escalados a las raciones elegidas.
    const SECCIONES_COMPRA = [
      { clave: "verduras", titulo: "🥬 Verduras y hortalizas" },
      { clave: "frutas", titulo: "🍎 Frutas" },
      { clave: "carnes", titulo: "🥩 Carne, pescado y huevos" },
      { clave: "lacteos", titulo: "🥛 Lácteos y bebidas vegetales" },
      { clave: "secos", titulo: "🌰 Frutos secos y semillas" },
      { clave: "cereales", titulo: "🌾 Cereales, pan y pasta" },
      { clave: "legumbres", titulo: "🫘 Legumbres y proteína vegetal" },
      { clave: "grasas", titulo: "🫒 Aceites, grasas y untables" },
      { clave: "dulces", titulo: "🍫 Dulces y endulzantes" },
      { clave: "especias", titulo: "🧂 Especias, salsas y caldos" },
      { clave: "bebidas", titulo: "☕ Bebidas" },
      { clave: "otros", titulo: "🛒 Otros" }
    ];
    // La primera categoría de la guía que coincida (en este orden) decide la sección.
    const SECCION_POR_CATEGORIA = [
      ["Verduras y Hortalizas", "verduras"], ["Frutas", "frutas"], ["Cárnicos", "carnes"], ["Proteínas", "carnes"],
      ["Lácteos", "lacteos"], ["Bebidas vegetales", "lacteos"], ["Frutos Secos", "secos"], ["Cereales", "cereales"],
      ["Proteína vegetal", "legumbres"], ["Grasas", "grasas"], ["Untables", "grasas"], ["Dulces", "dulces"],
      ["Condimentos y Aditivos", "especias"], ["Salsas", "especias"], ["Bebidas", "bebidas"]
    ];
    function seccionDe(food) {
      if (/semillas/.test(food.id)) return "secos";
      if (food.id === "yogur_soja") return "lacteos";
      for (const [categoria, clave] of SECCION_POR_CATEGORIA) if (food.categorias.includes(categoria)) return clave;
      return "otros";
    }
    const cantidadTexto = g => (g >= 1000 ? fmt1(g / 1000) + " kg" : fmt(Math.max(g, 1)) + " g");

    function calcularCompra() {
      const total = new Map(); // foodId -> { gramos, soloOpcional }
      comidasActivas.forEach(c => menu[c].forEach(({ receta, raciones }) => {
        const factor = raciones / racionesDe(receta);
        receta.ingredientes.forEach(ing => {
          if (ing.foodId === "ia_agua") return; // el agua no se compra
          const prev = total.get(ing.foodId) || { gramos: 0, soloOpcional: true };
          prev.gramos += ing.cantidad * factor;
          if (!ing.opcional) prev.soloOpcional = false;
          total.set(ing.foodId, prev);
        });
      }));
      const secciones = new Map(SECCIONES_COMPRA.map(sec => [sec.clave, []]));
      total.forEach((v, foodId) => {
        const food = FOODS.find(f => f.id === foodId);
        if (!food) return;
        secciones.get(seccionDe(food)).push({ nombre: formatearNombre(food.nombre), gramos: v.gramos, opcional: v.soloOpcional });
      });
      secciones.forEach(lista => lista.sort((a, b) => a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })));
      return secciones;
    }

    function textoCompra(secciones) {
      const lineas = [`Lista de la compra — menú de ${fmt(objetivo)} kcal`, ""];
      SECCIONES_COMPRA.forEach(sec => {
        const items = secciones.get(sec.clave);
        if (!items.length) return;
        lineas.push(sec.titulo.replace(/^\S+\s/, "").toUpperCase());
        items.forEach(i => lineas.push(`- ${i.nombre}: ${cantidadTexto(i.gramos)}${i.opcional ? " (opcional)" : ""}`));
        lineas.push("");
      });
      lineas.push("Cantidades de las recetas, tal y como figuran en ellas. Generada en hsnutricion.com");
      return lineas.join("\n");
    }

    function crearCompra() {
      const secciones = calcularCompra();
      const productos = [...secciones.values()].reduce((t, l) => t + l.length, 0);
      const sec = document.createElement("section");
      sec.className = "menu-comida menu-compra";
      sec.innerHTML = `
        <header class="menu-comida-cab">
          <h3>🛒 Lista de la compra</h3>
          <span class="menu-comida-kcal">${productos} productos</span>
          <button type="button" class="btn btn-ghost btn-sm" data-compra="copiar">Copiar</button>
          <button type="button" class="btn btn-ghost btn-sm" data-compra="imprimir">Imprimir</button>
        </header>
        <p class="menu-compra-nota">Suma de los ingredientes de todo el menú, con las raciones elegidas. Las cantidades son las de cada receta: el arroz, la pasta y los cereales van en seco, tal y como se compran, y las legumbres de bote (como los garbanzos) ya cocidas. Las especias van en gramos aunque las compres por envase.</p>
        <div class="menu-compra-grupos"></div>`;
      const grupos = sec.querySelector(".menu-compra-grupos");
      SECCIONES_COMPRA.forEach(def => {
        const items = secciones.get(def.clave);
        if (!items.length) return;
        const g = document.createElement("div");
        g.className = "menu-compra-grupo";
        g.innerHTML = `<h4>${def.titulo}</h4><ul>${items.map(i =>
          `<li><label><input type="checkbox"><span class="menu-compra-nombre">${i.nombre}${i.opcional ? ' <em>(opcional)</em>' : ""}</span><span class="menu-compra-cant">${cantidadTexto(i.gramos)}</span></label></li>`
        ).join("")}</ul>`;
        grupos.appendChild(g);
      });

      sec.querySelector('[data-compra="copiar"]').addEventListener("click", async e => {
        const boton = e.currentTarget;
        const texto = textoCompra(secciones);
        try {
          await navigator.clipboard.writeText(texto);
        } catch (_) {
          const ta = document.createElement("textarea");
          ta.value = texto; ta.style.position = "fixed"; ta.style.opacity = "0";
          document.body.appendChild(ta); ta.select();
          try { document.execCommand("copy"); } catch (_) { /* sin portapapeles */ }
          ta.remove();
        }
        boton.textContent = "¡Copiada!";
        setTimeout(() => { boton.textContent = "Copiar"; }, 2000);
      });
      sec.querySelector('[data-compra="imprimir"]').addEventListener("click", () => {
        document.body.classList.add("imprimiendo-compra");
        window.addEventListener("afterprint", () => document.body.classList.remove("imprimiendo-compra"), { once: true });
        window.print();
      });
      return sec;
    }

    function pintar() {
      resultado.hidden = false;
      resultado.innerHTML = "";
      const total = comidasActivas.reduce((t, c) => t + kcalPlatos(menu[c]), 0);
      const macros = { proteinas: 0, carbs: 0, grasas: 0, fibra: 0 };
      comidasActivas.forEach(c => menu[c].forEach(p => {
        Object.keys(macros).forEach(k => { macros[k] += macrosDe.get(p.receta.id)[k] / racionesDe(p.receta) * p.raciones; });
      }));
      const dif = total - objetivo;
      const pct = objetivo ? (dif / objetivo) * 100 : 0;
      const sinPlatos = comidasActivas.filter(c => menu[c].length === 0);

      const resumen = document.createElement("div");
      resumen.className = "menu-resumen reveal in-view";
      resumen.innerHTML = `
        <div class="menu-resumen-principal">
          <span class="menu-resumen-num">${fmt(total)} kcal</span>
          <span class="menu-resumen-sub">de ${fmt(objetivo)} kcal pedidas · ${dif === 0 ? "justo en el objetivo" : (dif > 0 ? "+" : "−") + fmt(Math.abs(dif)) + " kcal (" + (Math.abs(pct) < 0.1 ? "<0,1" : fmt1(Math.abs(pct))) + " %)"}</span>
        </div>
        <div class="menu-resumen-macros">
          <span><b>${fmt1(macros.proteinas)} g</b> proteínas</span>
          <span><b>${fmt1(macros.carbs)} g</b> carbohidratos</span>
          <span><b>${fmt1(macros.grasas)} g</b> grasas</span>
          <span><b>${fmt1(macros.fibra)} g</b> fibra</span>
        </div>`;
      // Guardar este menú (con nombre) en la lista de "Mis menús guardados".
      const acciones = document.createElement("div");
      acciones.className = "menu-resumen-acciones";
      acciones.innerHTML = `
        <button type="button" class="btn btn-ghost btn-sm" data-guardar="abrir">💾 Guardar este menú</button>
        <form class="menu-guardar-form" hidden>
          <input type="text" maxlength="40" required aria-label="Nombre del menú" placeholder="Nombre del menú">
          <button type="submit" class="btn btn-primary btn-sm">Guardar</button>
          <button type="button" class="btn btn-ghost btn-sm" data-guardar="cancelar">Cancelar</button>
        </form>
        <span class="menu-guardar-msg" role="status"></span>`;
      const formGuardar = acciones.querySelector(".menu-guardar-form");
      const msgGuardar = acciones.querySelector(".menu-guardar-msg");
      const btnAbrirGuardar = acciones.querySelector('[data-guardar="abrir"]');
      btnAbrirGuardar.addEventListener("click", () => {
        formGuardar.hidden = false; btnAbrirGuardar.hidden = true; msgGuardar.textContent = "";
        const campo = formGuardar.querySelector("input");
        campo.value = `Menú de ${fmt(objetivo)} kcal`;
        campo.focus(); campo.select();
      });
      acciones.querySelector('[data-guardar="cancelar"]').addEventListener("click", () => {
        formGuardar.hidden = true; btnAbrirGuardar.hidden = false;
      });
      formGuardar.addEventListener("submit", e => {
        e.preventDefault();
        const error = guardarMenuActual(formGuardar.querySelector("input").value);
        formGuardar.hidden = true; btnAbrirGuardar.hidden = false;
        msgGuardar.classList.toggle("error", Boolean(error));
        msgGuardar.textContent = error || "✓ Menú guardado";
      });
      resumen.appendChild(acciones);
      resultado.appendChild(resumen);

      if (sinPlatos.length) {
        const p = document.createElement("p");
        p.className = "recetas-sin-resultados";
        p.textContent = "Con estos filtros no hay recetas para: " + sinPlatos.map(c => COMIDAS[c].titulo.toLowerCase()).join(", ") + ". Prueba a quitar alguno.";
        resultado.appendChild(p);
      } else if (Math.abs(pct) > 8) {
        const p = document.createElement("p");
        p.className = "modal-hint";
        p.textContent = "Con las recetas que pasan los filtros no se puede acercar más al objetivo. Prueba a relajar algún filtro" + (chkSnacks.checked ? "." : " o a incluir snacks.");
        resultado.appendChild(p);
      }

      comidasActivas.forEach(comida => {
        const sec = document.createElement("section");
        sec.className = "menu-comida";
        const kcalComida = kcalPlatos(menu[comida]);
        sec.innerHTML = `
          <header class="menu-comida-cab">
            <h3>${COMIDAS[comida].emoji} ${COMIDAS[comida].titulo}</h3>
            <span class="menu-comida-kcal">${fmt(kcalComida)} kcal</span>
            <button type="button" class="btn btn-ghost btn-sm" data-cambiar="${comida}">Cambiar</button>
          </header>`;
        const lista = document.createElement("div");
        lista.className = "menu-platos";
        menu[comida].forEach((p, i) => lista.appendChild(crearPlato(p, comida, i)));
        if (!menu[comida].length) lista.innerHTML = '<p class="recetas-sin-resultados">Sin recetas disponibles con estos filtros.</p>';
        sec.appendChild(lista);
        resultado.appendChild(sec);
      });
      if (comidasActivas.some(c => menu[c].length)) resultado.appendChild(crearCompra());
      resultado.querySelectorAll("[data-cambiar]").forEach(b => b.addEventListener("click", () => cambiarComida(b.dataset.cambiar)));
      resultado.querySelectorAll("[data-cambiar-plato]").forEach(b => b.addEventListener("click", () => {
        const [comida, indice] = b.dataset.cambiarPlato.split(":");
        cambiarPlato(comida, Number(indice));
      }));
    }

    btnGenerar.addEventListener("click", () => { aviso.textContent = ""; generar(); });
    inputKcal.addEventListener("keydown", e => { if (e.key === "Enter") btnGenerar.click(); });
    btnLimpiar.addEventListener("click", () => { filtros.limpiar(); actualizarNumFiltros(0); });
    document.addEventListener("hsn:auth-cambio", renderGuardados);
    renderGuardados();
  }, ["menuApp"]);

  /* ================= Recetas saludables: teaser en el índice ================= */
  // Portada: solo unas pocas recetas con foto, de tipos variados (la lista
  // completa vive en recetas.html). Se completa con las siguientes si alguna falta.
  const RECETAS_DESTACADAS = [
    "tostada_aguacate_huevo", "poke_bowl_salmon", "bowl_arroz_aguacate_tomate", "tortitas_platano_avena",
    "katsu_curry_vegano", "hamburguesa_garbanzos", "crumbl_cookies_saludables", "pizza_saludable"
  ];
  seguro("recetas-teaser", () => {
    const grid = document.getElementById("recetasTeaserGrid");
    const elegidas = RECETAS_DESTACADAS.map(id => RECETAS.find(r => r.id === id)).filter(Boolean);
    RECETAS.forEach(r => { if (elegidas.length < 8 && r.imagen && !elegidas.includes(r)) elegidas.push(r); });
    elegidas.forEach((receta, i) => grid.appendChild(crearTarjetaRecetaTeaser(receta, i)));
  }, ["recetasTeaserGrid"]);

  /* ================= Cifras dinámicas (alimentos y recetas) ================= */
  // Elementos con data-total="alimentos" o "recetas" se rellenan con el total real,
  // para que portada y "Sobre" nunca queden desactualizados.
  function actualizarTotales() {
    document.querySelectorAll("[data-total]").forEach(el => {
      if (el.dataset.total === "alimentos") el.textContent = FOODS.length;
      else if (el.dataset.total === "recetas" && typeof RECETAS !== "undefined") el.textContent = RECETAS.length;
    });
  }
  seguro("totales", actualizarTotales);

  /* ================= Recetas de la comunidad: teaser en el índice ================= */
  seguro("comunidad-teaser", () => {
    const grid = document.getElementById("comunidadTeaserGrid");
    if (!grid) return; // solo existe en index.html
    const seccion = document.getElementById("comunidad-teaser");

    let recetas = [];

    function render() {
      grid.innerHTML = "";
      recetas.forEach((receta, i) => grid.appendChild(crearTarjetaRecetaComunidad(receta, i)));
    }

    fetch("/api/community-recipes")
      .then(r => (r.ok ? r.json() : { recetas: [] }))
      .then(({ recetas: lista }) => {
        recetas = (Array.isArray(lista) ? lista : [])
          .sort((a, b) => new Date(b.creadoEn) - new Date(a.creadoEn))
          .slice(0, 3);
        seccion.hidden = recetas.length === 0;
        render();
      })
      .catch(() => {});

    document.addEventListener("hsn:auth-cambio", render);
  });

  /* ================= Ficha de un ingrediente en modal ================= */
  seguro("modal-ficha-ingrediente", () => {
    const overlay = document.getElementById("fichaModalOverlay");
    const contenido = document.getElementById("fichaModalContenido");

    function abrirFicha(foodId) {
      const food = FOODS.find(f => f.id === foodId);
      if (!food) return;
      contenido.innerHTML = "";
      const estudios = estudiosDe(food);
      const card = crearTarjetaAlimento(food, estudios ? { estudios } : {});
      contenido.appendChild(card);
      animarBarras(contenido);
      overlay.hidden = false;
    }
    function cerrarFicha() { overlay.hidden = true; }

    // Delegación de eventos: las tarjetas de receta se crean dinámicamente,
    // así que escuchamos el clic en un contenedor estable en vez de en cada botón.
    document.addEventListener("click", e => {
      const btn = e.target.closest(".ingrediente-link");
      if (!btn) return;
      // Ctrl/Cmd/Shift/clic central: comportamiento normal del enlace (nueva pestaña).
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      abrirFicha(btn.dataset.foodId);
    });
    document.getElementById("fichaModalClose").addEventListener("click", cerrarFicha);
    overlay.addEventListener("click", e => { if (e.target === overlay) cerrarFicha(); });
  }, ["fichaModalOverlay"]);

  /* ================= Alimentos generados por la comunidad ================= */
  // Carga los alimentos que la IA ya generó para otras personas y los añade a
  // FOODS/INDICE_ALIAS, para que la guía y la detección por texto/imagen los
  // reconozcan sin volver a llamar a la IA.
  // Alimentos que la IA generó dos veces (o que ya existen en la guía con otro id) y
  // que siguen guardados en la base de datos de la comunidad: no se vuelven a mostrar.
  // Su versión buena vive en js/data.js (ia_semillas_de_chia, ia_curry_en_polvo,
  // "edamame" y "cafe").
  const IDS_COMUNIDAD_DUPLICADOS = new Set(["ia_semillas_de_ch_a", "ia_curry", "ia_edamame", "ia_cafe"]);
  seguro("alimentos-comunidad", () => {
    fetch("/api/community-foods")
      .then(r => (r.ok ? r.json() : { alimentos: [] }))
      .then(({ alimentos }) => {
        if (!Array.isArray(alimentos) || !alimentos.length) return;
        const idsExistentes = new Set(FOODS.map(f => f.id));
        let nuevos = 0;
        alimentos.forEach(({ food, estudios }) => {
          if (!food || !food.id || idsExistentes.has(food.id) || IDS_COMUNIDAD_DUPLICADOS.has(food.id)) return;
          food.__estudios = estudios || [];
          FOODS.push(food);
          idsExistentes.add(food.id);
          (food.aliases || []).forEach(alias => {
            INDICE_ALIAS.push({ alias: normalizar(alias), food });
          });
          nuevos++;
        });
        if (nuevos > 0) {
          INDICE_ALIAS.sort((a, b) => b.alias.length - a.alias.length);
          if (typeof window.__refrescarGuia === "function") window.__refrescarGuia();
          const statFoods = document.getElementById("statFoods");
          if (statFoods) statFoods.textContent = FOODS.length;
          actualizarTotales();
        }
      })
      .catch(err => console.error("[HSNutrición] No se pudieron cargar los alimentos de la comunidad:", err));
  });

  /* ================= Contador hero ================= */
  seguro("contador-hero", () => {
    const statFoods = document.getElementById("statFoods");
    if (!statFoods) return; // solo existe en index.html
    const inicio = Date.now();
    let n = 0;
    // Lee FOODS.length en cada paso (no un total fijo al empezar): así, si los
    // alimentos de la comunidad llegan mientras cuenta (o justo después), el
    // número final ya los incluye en vez de quedarse congelado en el valor
    // que había antes de que terminara esa petición.
    const iv = setInterval(() => {
      const total = FOODS.length;
      const step = Math.max(1, Math.round(total / 30));
      n = Math.min(n + step, total);
      statFoods.textContent = n;
      if (n >= total && Date.now() - inicio > 2500) clearInterval(iv);
    }, 30);
  });

  /* ================= Menú móvil ================= */
  seguro("menu-movil", () => {
    document.getElementById("navToggle").addEventListener("click", () => {
      document.getElementById("mainNav").classList.toggle("open-mobile");
    });
  });

  // El logo del header enlaza a "#top" en el índice; forzamos el scroll al
  // inicio explícitamente (en vez de depender solo del salto de ancla nativo,
  // que con la cabecera fija a veces no se nota si ya estaba cerca del tope).
  seguro("logo-scroll-arriba", () => {
    const brand = document.querySelector('a.brand[href="#top"]');
    if (!brand) return;
    brand.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  /* ================= Pestañas del analizador ================= */
  let analyzerStatus;
  seguro("pestanas-analizador", () => {
    analyzerStatus = document.getElementById("analyzerStatus");
    document.querySelectorAll(".tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
        document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        document.querySelector(`.tab-panel[data-panel="${tab.dataset.tab}"]`).classList.add("active");
        if (analyzerStatus) analyzerStatus.textContent = "";
      });
    });
  });

  /* ================= Analizador: texto ================= */
  seguro("analizador-texto", () => {
    const resultsSection = document.getElementById("results");
    const resultsGrid = document.getElementById("resultsGrid");
    const resultsCount = document.getElementById("resultsCount");
    const emptyState = document.getElementById("emptyState");

    window.__mostrarResultados = function mostrarResultados(alimentos, origen) {
      resultsGrid.innerHTML = "";
      if (!alimentos.length) {
        if (analyzerStatus) analyzerStatus.textContent = "No hemos reconocido ningún alimento de nuestra guía local en " + origen + ". Prueba a ser más específico, o búscalo con IA + PubMed más abajo 👇";
        resultsSection.hidden = true;
        emptyState.hidden = false;
        return;
      }
      if (analyzerStatus) analyzerStatus.textContent = "";
      emptyState.hidden = true;
      resultsSection.hidden = false;
      resultsCount.textContent = `${alimentos.length} alimento${alimentos.length > 1 ? "s" : ""} detectado${alimentos.length > 1 ? "s" : ""}`;
      alimentos.forEach((food, i) => {
        const estudios = estudiosDe(food);
        const card = crearTarjetaAlimento(food, estudios ? { estudios } : {});
        card.style.animationDelay = (i * 0.06) + "s";
        resultsGrid.appendChild(card);
      });
      animarBarras(resultsGrid);
      resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.getElementById("btnAnalizarTexto").addEventListener("click", () => {
      const texto = document.getElementById("inputTexto").value.trim();
      if (!texto) {
        if (analyzerStatus) analyzerStatus.textContent = "Escribe primero qué has comido.";
        return;
      }
      const alimentos = detectarAlimentos(texto);
      window.__mostrarResultados(alimentos, "el texto");
    });
  }, ["resultsGrid"]);

  /* ================= Analizador: imagen ================= */
  seguro("analizador-imagen", () => {
    const dropzone = document.getElementById("dropzone");
    const inputImagen = document.getElementById("inputImagen");
    const dropzoneEmpty = document.getElementById("dropzoneEmpty");
    const previewImagen = document.getElementById("previewImagen");
    const btnAnalizarImagen = document.getElementById("btnAnalizarImagen");
    let imagenBase64 = null;
    let imagenMime = null;

    dropzone.addEventListener("click", () => inputImagen.click());
    ["dragover", "dragenter"].forEach(evt =>
      dropzone.addEventListener(evt, e => { e.preventDefault(); dropzone.classList.add("drag-over"); })
    );
    ["dragleave", "drop"].forEach(evt =>
      dropzone.addEventListener(evt, e => { e.preventDefault(); dropzone.classList.remove("drag-over"); })
    );
    dropzone.addEventListener("drop", e => {
      const file = e.dataTransfer.files[0];
      if (file) cargarImagen(file);
    });
    inputImagen.addEventListener("change", () => {
      if (inputImagen.files[0]) cargarImagen(inputImagen.files[0]);
    });

    // Redimensiona la imagen en el propio navegador (máx. 1024px) antes de enviarla,
    // para que el payload sea pequeño y rápido de subir.
    function redimensionarImagen(dataUrl, maxDim = 1024, calidad = 0.85) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            const ratio = Math.min(maxDim / width, maxDim / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d").drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", calidad));
        };
        img.onerror = reject;
        img.src = dataUrl;
      });
    }

    function cargarImagen(file) {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = await redimensionarImagen(reader.result);
        imagenMime = "image/jpeg";
        imagenBase64 = dataUrl.split(",")[1];
        previewImagen.src = dataUrl;
        previewImagen.hidden = false;
        dropzoneEmpty.hidden = true;
        btnAnalizarImagen.disabled = false;
      };
      reader.readAsDataURL(file);
    }

    async function detectarAlimentosEnImagen(base64, mime) {
      const resp = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mimeType: mime })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || ("respuesta " + resp.status));
      return data.texto || "";
    }

    btnAnalizarImagen.addEventListener("click", async () => {
      if (!imagenBase64) return;

      btnAnalizarImagen.disabled = true;
      btnAnalizarImagen.textContent = "Analizando imagen…";
      if (analyzerStatus) analyzerStatus.textContent = "Consultando al modelo de visión…";

      try {
        const nombres = await detectarAlimentosEnImagen(imagenBase64, imagenMime);
        const alimentos = detectarAlimentos(nombres);
        window.__mostrarResultados(alimentos, "la imagen");
      } catch (err) {
        console.error(err);
        if (analyzerStatus) analyzerStatus.textContent = "No se pudo analizar la imagen (" + err.message + "). Puedes describir la comida en la pestaña de texto.";
      } finally {
        btnAnalizarImagen.disabled = false;
        btnAnalizarImagen.innerHTML = 'Analizar imagen <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M13 5l7 7-7 7-1.41-1.41L16.17 13H4v-2h12.17l-4.58-4.59L13 5z"/></svg>';
      }
    });
  }, ["dropzone"]);

  /* ================= Modal informativo sobre la IA ================= */
  seguro("modal-info-ia", () => {
    const modalOverlay = document.getElementById("modalOverlay");
    function abrirModal() { modalOverlay.hidden = false; }
    function cerrarModal() { modalOverlay.hidden = true; }

    document.getElementById("btnSettings").addEventListener("click", abrirModal);
    document.getElementById("modalClose").addEventListener("click", cerrarModal);
    document.getElementById("modalOk").addEventListener("click", cerrarModal);
    modalOverlay.addEventListener("click", e => { if (e.target === modalOverlay) cerrarModal(); });
  });

  /* ================= Cuenta: registro, inicio de sesión, sesión activa ================= */
  seguro("auth", () => {
    const btnAuth = document.getElementById("btnAuth");
    const authModalOverlay = document.getElementById("authModalOverlay");
    const authModalClose = document.getElementById("authModalClose");
    const authFormLogin = document.getElementById("authFormLogin");
    const authFormRegister = document.getElementById("authFormRegister");
    const authLoginStatus = document.getElementById("authLoginStatus");
    const authRegisterStatus = document.getElementById("authRegisterStatus");

    let usuarioActual = null;
    let esAdminActual = false;

    function abrirModal() { authModalOverlay.hidden = false; }
    function cerrarModal() { authModalOverlay.hidden = true; }

    function actualizarUI() {
      // Expuesto para que otros bloques (p.ej. recetas de la comunidad y el
      // propio perfil) sepan quién ha iniciado sesión, y si es admin, sin
      // duplicar la llamada a /api/me.
      window.__usuarioActual = usuarioActual;
      window.__esAdmin = esAdminActual;
      document.dispatchEvent(new CustomEvent("hsn:auth-cambio", { detail: { usuario: usuarioActual, esAdmin: esAdminActual } }));
      if (usuarioActual) {
        btnAuth.title = "Tu perfil";
        btnAuth.setAttribute("aria-label", "Tu perfil");
      } else {
        btnAuth.title = "Iniciar sesión";
        btnAuth.setAttribute("aria-label", "Iniciar sesión");
      }
    }

    // Con sesión, el icono lleva directo al perfil; sin sesión, abre el
    // modal de inicio de sesión/registro.
    btnAuth.addEventListener("click", () => {
      if (usuarioActual) {
        window.location.href = `perfil.html?usuario=${encodeURIComponent(usuarioActual)}`;
      } else {
        abrirModal();
      }
    });
    authModalClose.addEventListener("click", cerrarModal);
    authModalOverlay.addEventListener("click", e => { if (e.target === authModalOverlay) cerrarModal(); });

    // Pestañas login/registro, con su propio espacio de nombres (.auth-tab)
    // para no interferir con las pestañas del analizador (.tab).
    authModalOverlay.querySelectorAll(".auth-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        authModalOverlay.querySelectorAll(".auth-tab").forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
        authModalOverlay.querySelectorAll(".auth-tab-panel").forEach(p => p.classList.remove("active"));
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        authModalOverlay.querySelector(`.auth-tab-panel[data-auth-panel="${tab.dataset.authTab}"]`).classList.add("active");
      });
    });

    authFormLogin.addEventListener("submit", async e => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value;
      const btn = document.getElementById("authLoginSubmit");
      btn.disabled = true;
      authLoginStatus.textContent = "Entrando...";
      try {
        const resp = await fetch("/api/login", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ username, password })
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || ("respuesta " + resp.status));
        usuarioActual = data.username;
        esAdminActual = Boolean(data.esAdmin);
        authLoginStatus.textContent = "";
        authFormLogin.reset();
        actualizarUI();
      } catch (err) {
        authLoginStatus.textContent = err.message;
      } finally {
        btn.disabled = false;
      }
    });

    authFormRegister.addEventListener("submit", async e => {
      e.preventDefault();
      const username = document.getElementById("registerUsername").value.trim();
      const email = document.getElementById("registerEmail").value.trim();
      const password = document.getElementById("registerPassword").value;
      const btn = document.getElementById("authRegisterSubmit");
      btn.disabled = true;
      authRegisterStatus.textContent = "Creando cuenta...";
      try {
        const resp = await fetch("/api/register", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ username, email, password })
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || ("respuesta " + resp.status));
        usuarioActual = data.username;
        esAdminActual = Boolean(data.esAdmin);
        authRegisterStatus.textContent = "";
        authFormRegister.reset();
        actualizarUI();
      } catch (err) {
        authRegisterStatus.textContent = err.message;
      } finally {
        btn.disabled = false;
      }
    });

    fetch("/api/me")
      .then(r => (r.ok ? r.json() : { username: null, esAdmin: false }))
      .then(({ username, esAdmin: admin }) => { usuarioActual = username; esAdminActual = Boolean(admin); actualizarUI(); })
      .catch(() => {});
  });

  /* ================= Recetas de la comunidad: listado y detalle ================= */
  // Modal de detalle + borrado: compartido entre comunidad.html y
  // perfil.html (ambas páginas incluyen #comunidadDetalleOverlay). Cada
  // página registra su propio window.__refrescarListaRecetas para que,
  // tras borrar, se refresque la lista que corresponda (el grid completo en
  // comunidad.html, o solo las recetas de ese usuario en perfil.html).
  seguro("comunidad-detalle", () => {
    const detalleOverlay = document.getElementById("comunidadDetalleOverlay");
    if (!detalleOverlay) return;

    const detalleContenido = document.getElementById("comunidadDetalleContenido");
    const detalleClose = document.getElementById("comunidadDetalleClose");

    function abrirDetalle(receta) {
      const raciones = receta.raciones > 1 ? `, ${receta.raciones} raciones` : "";
      const ingredientesHtml = receta.ingredientes.map(ing => `
        <li>
          <button type="button" class="ingrediente-link" data-food-id="${ing.foodId}">
            <span class="food-emoji">${ing.emoji}</span> ${formatearNombre(ing.nombre)}
          </button>
          <span class="ingrediente-cantidad">${ing.cantidad} g</span>
        </li>`).join("");
      const pasosHtml = receta.elaboracion.map(p => `<li>${p}</li>`).join("");

      detalleContenido.innerHTML = `
        <div class="comunidad-card-head">
          <h3>${receta.nombre}</h3>
          <span class="badge badge-${receta.rating}" title="Calificación nutricional">${receta.rating}</span>
        </div>
        <a class="comunidad-card-autor" href="perfil.html?usuario=${encodeURIComponent(receta.autorLower)}">por @${receta.autor}</a>
        <p class="food-motivo">${receta.descripcion}</p>
        <div class="receta-columnas">
          <div>
            <h4>Ingredientes <span class="receta-hint">(toca el nombre para ver su ficha)</span></h4>
            <ul class="receta-ingredientes">${ingredientesHtml}</ul>
          </div>
          <div>
            <h4>Elaboración</h4>
            <ol class="receta-pasos">${pasosHtml}</ol>
          </div>
        </div>
        <h4>Información nutricional (receta completa${raciones})</h4>
        <div id="comunidadDetalleMacros"></div>
        <p class="food-motivo" style="margin-top:14px"><b>Motivo de la calificación:</b> ${receta.motivo}</p>
      `;
      document.getElementById("comunidadDetalleMacros").appendChild(crearTablaMacros(receta.macros, { caption: "" }));
      animarBarras(detalleContenido);
      detalleOverlay.hidden = false;
    }
    function cerrarDetalle() { detalleOverlay.hidden = true; }
    detalleClose.addEventListener("click", cerrarDetalle);
    detalleOverlay.addEventListener("click", e => { if (e.target === detalleOverlay) cerrarDetalle(); });

    async function borrar(receta) {
      if (!confirm(`¿Eliminar "${receta.nombre}"? Esta acción no se puede deshacer.`)) return;
      try {
        const resp = await fetch("/api/community-recipe", {
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id: receta.id })
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || ("respuesta " + resp.status));
        await window.__refrescarListaRecetas?.();
      } catch (err) {
        alert("No se pudo eliminar: " + err.message);
      }
    }

    async function reportar(receta, boton) {
      if (!confirm(`¿Reportar "${receta.nombre}" para que un administrador la revise?`)) return;
      boton.disabled = true;
      try {
        const resp = await fetch("/api/community-recipe", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id: receta.id })
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || ("respuesta " + resp.status));
        boton.textContent = "Reportada ✓";
      } catch (err) {
        alert("No se pudo reportar: " + err.message);
        boton.disabled = false;
      }
    }

    window.__abrirDetalleComunidad = abrirDetalle;
    window.__borrarRecetaComunidad = borrar;
    window.__reportarRecetaComunidad = reportar;
  });

  /* ================= Recetas de la comunidad: grid con buscador y filtro ================= */
  seguro("comunidad-grid", () => {
    const grid = document.getElementById("comunidadGrid");
    if (!grid) return; // solo existe en comunidad.html

    const buscador = document.getElementById("buscadorComunidad");
    const filtroCategoria = document.getElementById("filtroCategoriaComunidad");
    const filtroRating = document.getElementById("filtroRatingComunidad");
    const filtroReportadasWrap = document.getElementById("filtroReportadasWrap");
    const filtroReportadas = document.getElementById("filtroReportadasComunidad");
    const sinResultados = document.getElementById("comunidadSinResultados");

    let recetas = [];

    function render() {
      // El filtro de reportadas solo se ofrece al admin (los datos de
      // reportes viajan igualmente para todos, pero no tiene sentido que
      // nadie más lo use ni lo vea).
      const esAdminActual = Boolean(window.__esAdmin);
      filtroReportadasWrap.hidden = !esAdminActual;
      if (!esAdminActual) filtroReportadas.checked = false;

      const q = normalizar(buscador.value);
      const categoria = filtroCategoria.value;
      const rating = filtroRating.value;
      const soloReportadas = esAdminActual && filtroReportadas.checked;
      const lista = recetas.filter(r =>
        (!q || normalizar(r.nombre).includes(q)) &&
        (!categoria || (r.etiquetas || []).includes(categoria)) &&
        (!rating || r.rating === rating) &&
        (!soloReportadas || (r.reportes || []).length > 0)
      ).sort((a, b) => new Date(b.creadoEn) - new Date(a.creadoEn));
      grid.innerHTML = "";
      sinResultados.hidden = lista.length > 0;
      lista.forEach((receta, i) => grid.appendChild(crearTarjetaRecetaComunidad(receta, i)));
    }

    function cargar() {
      return fetch("/api/community-recipes")
        .then(r => (r.ok ? r.json() : { recetas: [] }))
        .then(({ recetas: lista }) => { recetas = Array.isArray(lista) ? lista : []; render(); })
        .catch(() => {});
    }

    window.__refrescarListaRecetas = cargar;

    [buscador, filtroCategoria, filtroRating, filtroReportadas].forEach(el => el.addEventListener("input", render));
    document.addEventListener("hsn:auth-cambio", render);
    cargar();
  });

  /* ================= Perfil de usuario: sus recetas publicadas ================= */
  seguro("perfil", () => {
    const grid = document.getElementById("perfilGrid");
    if (!grid) return; // solo existe en perfil.html

    const nombreEl = document.getElementById("perfilNombre");
    const metaEl = document.getElementById("perfilMeta");
    const badgeEl = document.getElementById("perfilBadge");
    const sinResultados = document.getElementById("perfilSinResultados");
    const btnLogout = document.getElementById("btnCerrarSesionPerfil");
    const btnAjustes = document.getElementById("btnAjustesPerfil");
    const ajustesCuenta = document.getElementById("ajustesCuenta");

    // Insignia según el número de recetas publicadas — un único escalón, el
    // más alto alcanzado, para no saturar el perfil con varias a la vez.
    function insigniaDe(n) {
      if (n >= 20) return "🏆 Pilar de la comunidad";
      if (n >= 5) return "⭐ Colaborador activo";
      if (n >= 1) return "🌱 Primera receta";
      return null;
    }

    const usuarioLower = (new URLSearchParams(window.location.search).get("usuario") || "").trim().toLowerCase();

    if (!usuarioLower) {
      nombreEl.textContent = "Perfil no encontrado";
      metaEl.textContent = "Falta indicar qué usuario quieres ver.";
      return;
    }

    let propias = [];

    function render() {
      grid.innerHTML = "";
      const esPropio = Boolean(window.__usuarioActual) && window.__usuarioActual.toLowerCase() === usuarioLower;
      btnLogout.hidden = !esPropio;
      btnAjustes.hidden = !esPropio;
      if (!esPropio) ajustesCuenta.hidden = true;

      const insignia = insigniaDe(propias.length);
      badgeEl.hidden = !insignia;
      badgeEl.textContent = insignia || "";

      sinResultados.hidden = propias.length > 0;
      if (!propias.length) {
        sinResultados.textContent = esPropio
          ? "Aún no has publicado ninguna receta — anímate a crear la primera."
          : "Esta persona aún no ha publicado ninguna receta.";
      }
      propias.forEach((receta, i) => grid.appendChild(crearTarjetaRecetaComunidad(receta, i)));
    }

    function cargar() {
      return Promise.all([
        fetch(`/api/user-profile?usuario=${encodeURIComponent(usuarioLower)}`).then(r => (r.ok ? r.json() : null)).catch(() => null),
        fetch("/api/community-recipes").then(r => (r.ok ? r.json() : { recetas: [] })).catch(() => ({ recetas: [] }))
      ]).then(([perfil, { recetas }]) => {
        if (!perfil) {
          nombreEl.textContent = "Usuario no encontrado";
          metaEl.textContent = "Ese nombre de usuario no existe.";
          return;
        }
        document.title = `@${perfil.username} — HSNutrición`;
        nombreEl.textContent = `@${perfil.username}`;
        const fecha = new Date(perfil.createdAt).toLocaleDateString("es-ES", { year: "numeric", month: "long" });
        propias = (Array.isArray(recetas) ? recetas : []).filter(r => r.autorLower === usuarioLower);
        metaEl.textContent = `Miembro desde ${fecha} · ${propias.length} receta${propias.length === 1 ? "" : "s"} publicada${propias.length === 1 ? "" : "s"}`;
        render();
      }).catch(() => {
        nombreEl.textContent = "Error al cargar el perfil";
      });
    }

    window.__refrescarListaRecetas = cargar;
    document.addEventListener("hsn:auth-cambio", render);
    cargar();

    btnLogout.addEventListener("click", async () => {
      btnLogout.disabled = true;
      try {
        await fetch("/api/logout", { method: "POST" });
      } catch (err) {
        console.error("[HSNutrición] Error al cerrar sesión:", err);
      } finally {
        window.location.href = "index.html";
      }
    });

    btnAjustes.addEventListener("click", () => {
      ajustesCuenta.hidden = !ajustesCuenta.hidden;
    });

    const formCambiarPassword = document.getElementById("formCambiarPassword");
    const cambiarPasswordStatus = document.getElementById("cambiarPasswordStatus");
    formCambiarPassword.addEventListener("submit", async e => {
      e.preventDefault();
      const passwordActual = document.getElementById("passwordActual").value;
      const passwordNueva = document.getElementById("passwordNueva").value;
      const btn = formCambiarPassword.querySelector("button[type=submit]");
      btn.disabled = true;
      cambiarPasswordStatus.textContent = "Guardando...";
      try {
        const resp = await fetch("/api/change-password", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ passwordActual, passwordNueva })
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || ("respuesta " + resp.status));
        cambiarPasswordStatus.textContent = "Contraseña actualizada.";
        formCambiarPassword.reset();
      } catch (err) {
        cambiarPasswordStatus.textContent = err.message;
      } finally {
        btn.disabled = false;
      }
    });

    const btnMostrarBorrarCuenta = document.getElementById("btnMostrarBorrarCuenta");
    const formBorrarCuenta = document.getElementById("formBorrarCuenta");
    const borrarCuentaStatus = document.getElementById("borrarCuentaStatus");
    btnMostrarBorrarCuenta.addEventListener("click", () => {
      formBorrarCuenta.hidden = !formBorrarCuenta.hidden;
    });
    formBorrarCuenta.addEventListener("submit", async e => {
      e.preventDefault();
      if (!confirm("Esta acción no se puede deshacer y borrará también todas tus recetas publicadas. ¿Seguro que quieres continuar?")) return;
      const password = document.getElementById("passwordBorrar").value;
      const btn = document.getElementById("btnConfirmarBorrarCuenta");
      btn.disabled = true;
      borrarCuentaStatus.textContent = "Borrando...";
      try {
        const resp = await fetch("/api/delete-account", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ password })
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || ("respuesta " + resp.status));
        window.location.href = "index.html";
      } catch (err) {
        borrarCuentaStatus.textContent = err.message;
        btn.disabled = false;
      }
    });
  });

  /* ================= Constructor de recetas de la comunidad ================= */
  seguro("constructor-receta", () => {
    const overlay = document.getElementById("builderModalOverlay");
    if (!overlay) return; // solo existe en comunidad.html

    const btnCrear = document.getElementById("btnCrearReceta");
    const modalClose = document.getElementById("builderModalClose");
    const titulo = document.getElementById("builderModalTitle");
    const form = document.getElementById("builderForm");
    const inputId = document.getElementById("builderId");
    const inputNombre = document.getElementById("builderNombre");
    const inputDescripcion = document.getElementById("builderDescripcion");
    const inputRaciones = document.getElementById("builderRaciones");
    const inputBusqueda = document.getElementById("builderIngredienteBusqueda");
    const resultadosEl = document.getElementById("builderIngredienteResultados");
    const cantidadWrap = document.getElementById("builderCantidadWrap");
    const candidatoNombreEl = document.getElementById("builderCandidatoNombre");
    const inputGramos = document.getElementById("builderIngredienteGramos");
    const btnAnadir = document.getElementById("builderAnadirIngrediente");
    const listaEl = document.getElementById("builderIngredientesLista");
    const textareaElaboracion = document.getElementById("builderElaboracion");
    const previewEl = document.getElementById("builderMacroPreview");
    const status = document.getElementById("builderStatus");
    const submitBtn = document.getElementById("builderSubmit");

    let ingredientesElegidos = [];
    let candidato = null;

    function renderLista() {
      listaEl.innerHTML = "";
      ingredientesElegidos.forEach((ing, i) => {
        const row = document.createElement("div");
        row.className = "ingrediente-picker-row";
        row.innerHTML = `<span class="food-emoji">${ing.emoji}</span>
          <span class="ingrediente-picker-nombre">${formatearNombre(ing.nombre)}</span>
          <span class="ingrediente-picker-gramos">${ing.cantidad} g</span>
          <button type="button" class="ingrediente-picker-quitar" aria-label="Quitar">✕</button>`;
        row.querySelector(".ingrediente-picker-quitar").addEventListener("click", () => {
          ingredientesElegidos.splice(i, 1);
          renderLista();
        });
        listaEl.appendChild(row);
      });
      previewEl.innerHTML = "";
      if (ingredientesElegidos.length) {
        previewEl.appendChild(crearTablaMacros(calcularMacrosReceta(ingredientesElegidos), { caption: "(receta completa)" }));
        animarBarras(previewEl);
      }
    }

    function abrirModal(receta) {
      form.reset();
      ingredientesElegidos = receta ? receta.ingredientes.map(ing => ({ ...ing })) : [];
      candidato = null;
      cantidadWrap.hidden = true;
      resultadosEl.hidden = true;
      if (receta) {
        titulo.textContent = "Editar receta";
        submitBtn.textContent = "Guardar cambios";
        inputId.value = receta.id;
        inputNombre.value = receta.nombre;
        inputDescripcion.value = receta.descripcion;
        inputRaciones.value = receta.raciones;
        textareaElaboracion.value = receta.elaboracion.join("\n");
      } else {
        titulo.textContent = "Crear receta";
        submitBtn.textContent = "Publicar receta";
        inputId.value = "";
      }
      status.textContent = "";
      renderLista();
      overlay.hidden = false;
    }
    function cerrarModal() { overlay.hidden = true; }

    // btnCrear no existe en perfil.html (solo se puede editar desde ahí, no
    // crear una receta nueva) — el resto del bloque sigue funcionando igual.
    if (btnCrear) {
      btnCrear.addEventListener("click", () => {
        if (!window.__usuarioActual) { document.getElementById("btnAuth").click(); return; }
        abrirModal(null);
      });
    }
    modalClose.addEventListener("click", cerrarModal);
    overlay.addEventListener("click", e => { if (e.target === overlay) cerrarModal(); });

    inputBusqueda.addEventListener("input", () => {
      const q = normalizar(inputBusqueda.value);
      resultadosEl.innerHTML = "";
      if (!q) { resultadosEl.hidden = true; return; }
      const coincidencias = FOODS.filter(f => normalizar(f.nombre).includes(q)).slice(0, 8);
      resultadosEl.hidden = !coincidencias.length;
      coincidencias.forEach(f => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "ingrediente-picker-item";
        item.innerHTML = `<span class="food-emoji">${f.emoji}</span> ${formatearNombre(f.nombre)}`;
        item.addEventListener("click", () => seleccionarCandidato(f));
        resultadosEl.appendChild(item);
      });
    });

    function seleccionarCandidato(food) {
      candidato = food;
      candidatoNombreEl.textContent = `${food.emoji} ${formatearNombre(food.nombre)}`;
      inputBusqueda.value = "";
      resultadosEl.hidden = true;
      cantidadWrap.hidden = false;
      inputGramos.value = "";
      inputGramos.focus();
    }

    function anadirIngrediente() {
      const gramos = Number(inputGramos.value);
      if (!candidato || !gramos || gramos <= 0) return;
      ingredientesElegidos.push({ foodId: candidato.id, nombre: candidato.nombre, emoji: candidato.emoji, cantidad: gramos });
      candidato = null;
      cantidadWrap.hidden = true;
      renderLista();
    }
    btnAnadir.addEventListener("click", anadirIngrediente);
    inputGramos.addEventListener("keydown", e => {
      if (e.key === "Enter") { e.preventDefault(); anadirIngrediente(); }
    });

    form.addEventListener("submit", async e => {
      e.preventDefault();
      if (!ingredientesElegidos.length) { status.textContent = "Añade al menos un ingrediente."; return; }
      submitBtn.disabled = true;
      status.textContent = "Publicando y calificando con IA… puede tardar unos segundos.";
      const editando = Boolean(inputId.value);
      try {
        const cuerpo = {
          nombre: inputNombre.value.trim(),
          descripcion: inputDescripcion.value.trim(),
          raciones: Number(inputRaciones.value) || 1,
          elaboracion: textareaElaboracion.value.split("\n").map(l => l.trim()).filter(Boolean),
          ingredientes: ingredientesElegidos,
          macros: calcularMacrosReceta(ingredientesElegidos)
        };
        if (editando) cuerpo.id = inputId.value;
        const resp = await fetch(editando ? "/api/community-recipe" : "/api/community-recipes", {
          method: editando ? "PUT" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(cuerpo)
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || ("respuesta " + resp.status));
        cerrarModal();
        await window.__refrescarListaRecetas?.();
      } catch (err) {
        status.textContent = err.message;
      } finally {
        submitBtn.disabled = false;
      }
    });

    window.__abrirBuilderComunidad = abrirModal;
  });

  /* ================= Búsqueda de alimentos con IA + PubMed ================= */
  seguro("busqueda-ia-pubmed", () => {
    const inputAiLookup = document.getElementById("inputAiLookup");
    const btnAiLookup = document.getElementById("btnAiLookup");
    const aiLookupStatus = document.getElementById("aiLookupStatus");
    const aiLookupResult = document.getElementById("aiLookupResult");

    async function buscarConIA(alimento) {
      const clave = "hsn_ai_" + normalizar(alimento);
      const cache = sessionStorage.getItem(clave);
      if (cache) return JSON.parse(cache);

      const resp = await fetch("/api/food-lookup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ alimento })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || ("respuesta " + resp.status));
      sessionStorage.setItem(clave, JSON.stringify(data));
      return data;
    }

    async function ejecutarBusquedaIA() {
      const alimento = inputAiLookup.value.trim();
      if (!alimento) {
        aiLookupStatus.textContent = "Escribe primero el nombre de un alimento.";
        return;
      }
      btnAiLookup.disabled = true;
      aiLookupStatus.textContent = "Consultando PubMed y generando la ficha… puede tardar unos segundos.";
      aiLookupResult.innerHTML = "";
      try {
        const { food, estudios } = await buscarConIA(alimento);
        aiLookupStatus.textContent = "";
        const card = crearTarjetaAlimento(food, { estudios });
        aiLookupResult.appendChild(card);
        animarBarras(aiLookupResult);
        card.scrollIntoView({ behavior: "smooth", block: "center" });

        // Lo añadimos también a la detección de esta misma sesión: a partir de
        // ahora, mencionarlo en texto o imagen ya lo reconoce sin volver a buscar.
        if (food && food.id && !FOODS.some(f => f.id === food.id)) {
          food.__estudios = estudios || [];
          FOODS.push(food);
          (food.aliases || []).forEach(alias => {
            INDICE_ALIAS.push({ alias: normalizar(alias), food });
          });
          INDICE_ALIAS.sort((a, b) => b.alias.length - a.alias.length);
          if (typeof window.__refrescarGuia === "function") window.__refrescarGuia();
          const statFoods = document.getElementById("statFoods");
          if (statFoods) statFoods.textContent = FOODS.length;
        }
      } catch (err) {
        console.error(err);
        aiLookupStatus.textContent = "No se pudo completar la búsqueda (" + err.message + "). Prueba de nuevo en unos segundos.";
      } finally {
        btnAiLookup.disabled = false;
      }
    }

    btnAiLookup.addEventListener("click", ejecutarBusquedaIA);
    inputAiLookup.addEventListener("keydown", e => { if (e.key === "Enter") ejecutarBusquedaIA(); });
  }, ["inputAiLookup"]);

})();
