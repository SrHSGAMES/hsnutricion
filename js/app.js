/* HSNutrición — Lógica de la aplicación */

(function () {
  "use strict";

  /* ---------------- Escalas para las barras de macros (valores de referencia altos) ---------------- */
  const ESCALAS = { kcal: 900, carbs: 100, proteinas: 40, grasas: 100, fibra: 12 };
  const ETIQUETAS_MACRO = {
    kcal: "Calorías", carbs: "Carbohidratos", azucares: "  de los cuales azúcares",
    proteinas: "Proteínas", grasas: "Grasas", grasasSat: "  de las cuales saturadas",
    fibra: "Fibra", sodio: "Sodio"
  };

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

  function crearTablaMacros(food) {
    const cont = document.createElement("div");
    cont.className = "macro-table";
    ["kcal", "carbs", "proteinas", "grasas", "fibra"].forEach(clave => {
      cont.appendChild(crearBarraMacro(clave, food[clave]));
    });
    const extra = document.createElement("p");
    extra.className = "food-motivo";
    extra.style.marginTop = "0";
    extra.innerHTML = `De las grasas, <b>${food.grasasSat} g</b> son saturadas · de los carbohidratos, <b>${food.azucares} g</b> son azúcares · sodio: <b>${food.sodio} mg</b> <span style="color:var(--ink-faint)">(por 100 g)</span>`;
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

  function crearTarjetaAlimento(food, { conSustitutos = true, estudios = null } = {}) {
    const card = document.createElement("article");
    card.className = "food-card";
    card.innerHTML = `
      <div class="food-card-head">
        <span class="food-emoji">${food.emoji}</span>
        <div class="food-title">
          <h4>${formatearNombre(food.nombre)}</h4>
          <span class="food-cat">${food.categorias.join(" · ")}</span>
        </div>
        <span class="badge badge-${food.rating}" title="Calificación nutricional">${food.rating}</span>
      </div>
      <p class="food-motivo food-motivo-principal clamped">${food.motivo}</p>
      <button class="leer-mas-toggle" type="button" hidden>Leer más</button>
    `;

    // El texto de descripción se trunca a 3 líneas por defecto (como en WhatsApp)
    // y solo mostramos el botón "Leer más" si de verdad hace falta, comprobando
    // en el siguiente frame si el texto real ocupa más de lo que cabe truncado.
    const motivoP = card.querySelector(".food-motivo-principal");
    const leerMasBtn = card.querySelector(".leer-mas-toggle");
    requestAnimationFrame(() => {
      if (motivoP.scrollHeight > motivoP.clientHeight + 2) {
        leerMasBtn.hidden = false;
      }
    });
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
  const MACROS_SUMABLES = ["kcal", "carbs", "azucares", "proteinas", "grasas", "grasasSat", "fibra", "sodio"];

  // Suma los macros de cada ingrediente (proporcional a su cantidad en gramos)
  // para obtener el total de la receta completa. Si un ingrediente aún no se
  // ha resuelto (p.ej. un alimento de la comunidad que todavía está cargando),
  // se omite su aporte y se marca la receta como "incompleta" para no mostrar
  // un total engañoso.
  function calcularMacrosReceta(receta) {
    const totales = {};
    MACROS_SUMABLES.forEach(k => { totales[k] = 0; });
    let completo = true;
    receta.ingredientes.forEach(ing => {
      const food = FOODS.find(f => f.id === ing.foodId);
      if (!food) { completo = false; return; }
      const factor = ing.cantidad / 100;
      MACROS_SUMABLES.forEach(k => { totales[k] += (food[k] || 0) * factor; });
    });
    MACROS_SUMABLES.forEach(k => { totales[k] = Math.round(totales[k] * 10) / 10; });
    return { totales, completo };
  }

  function crearListaIngredientes(receta) {
    const ul = document.createElement("ul");
    ul.className = "receta-ingredientes";
    receta.ingredientes.forEach(ing => {
      const food = FOODS.find(f => f.id === ing.foodId);
      const li = document.createElement("li");
      if (food) {
        li.innerHTML = `<button type="button" class="ingrediente-link" data-food-id="${food.id}">
            <span class="food-emoji">${food.emoji}</span> ${formatearNombre(food.nombre)}
          </button>
          <span class="ingrediente-cantidad">${ing.cantidad} g</span>`;
      } else {
        // Todavía no ha llegado de /api/community-foods: se muestra sin enlace,
        // window.__refrescarRecetas() lo completará en cuanto esté disponible.
        li.innerHTML = `<span class="ingrediente-pendiente">${ing.foodId} (cargando…)</span>
          <span class="ingrediente-cantidad">${ing.cantidad} g</span>`;
      }
      ul.appendChild(li);
    });
    return ul;
  }

  function crearTarjetaReceta(receta) {
    const card = document.createElement("article");
    card.className = "receta-card";

    const foto = document.createElement("div");
    foto.className = "receta-foto";
    foto.innerHTML = `<span class="receta-foto-emoji">${receta.emojiPortada}</span>`;

    const body = document.createElement("div");
    body.className = "receta-body";
    body.innerHTML = `
      <div class="receta-head">
        <h3>${receta.nombre}</h3>
        <span class="badge badge-${receta.rating}" title="Calificación nutricional de la receta">${receta.rating}</span>
      </div>
      <p class="receta-meta">⏱️ ${receta.tiempo} · 🍽️ ${receta.raciones} ración${receta.raciones > 1 ? "es" : ""}</p>
      <p class="receta-desc">${receta.descripcion}</p>
      <p class="food-motivo">${receta.motivo}</p>
      <h4>Ingredientes <span class="receta-hint">(toca el nombre para ver su ficha)</span></h4>
    `;
    body.appendChild(crearListaIngredientes(receta));

    if (receta.pasos && receta.pasos.length) {
      const pasosTitulo = document.createElement("h4");
      pasosTitulo.textContent = "Elaboración";
      const ol = document.createElement("ol");
      ol.className = "receta-pasos";
      receta.pasos.forEach(paso => {
        const li = document.createElement("li");
        li.textContent = paso;
        ol.appendChild(li);
      });
      body.appendChild(pasosTitulo);
      body.appendChild(ol);
    }

    const macrosTitulo = document.createElement("h4");
    macrosTitulo.textContent = `Información nutricional (receta completa${receta.raciones > 1 ? ", " + receta.raciones + " raciones" : ""})`;
    body.appendChild(macrosTitulo);

    const { totales, completo } = calcularMacrosReceta(receta);
    const tablaMacros = document.createElement("div");
    tablaMacros.className = "macro-table";
    ["kcal", "carbs", "proteinas", "grasas", "fibra"].forEach(clave => {
      tablaMacros.appendChild(crearBarraMacro(clave, totales[clave]));
    });
    const extra = document.createElement("p");
    extra.className = "food-motivo";
    extra.style.marginTop = "0";
    extra.innerHTML = `De las grasas, <b>${totales.grasasSat} g</b> son saturadas · de los carbohidratos, <b>${totales.azucares} g</b> son azúcares · sodio: <b>${totales.sodio} mg</b>${!completo ? ' <span style="color:var(--ink-faint)">(recalculando…)</span>' : ""}`;
    tablaMacros.appendChild(extra);
    body.appendChild(tablaMacros);

    card.appendChild(foto);
    card.appendChild(body);
    animarBarras(tablaMacros);
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
  function seguro(nombre, fn) {
    try {
      fn();
    } catch (err) {
      console.error(`[HSNutrición] Fallo en "${nombre}":`, err);
    }
  }

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

  /* ================= Guía completa (contenido visible por defecto) ================= */
  seguro("guia-completa", () => {
    const guiaGrid = document.getElementById("guiaGrid");
    const buscadorGuia = document.getElementById("buscadorGuia");
    const filtroCategoria = document.getElementById("filtroCategoria");
    const filtroRating = document.getElementById("filtroRating");

    function actualizarCategorias() {
      const valorActual = filtroCategoria.value;
      const categorias = [...new Set(FOODS.flatMap(f => f.categorias))].sort();
      filtroCategoria.innerHTML = '<option value="">Todas las categorías</option>' +
        categorias.map(c => `<option value="${c}">${c}</option>`).join("");
      filtroCategoria.value = categorias.includes(valorActual) ? valorActual : "";
    }

    function renderGuia() {
      const q = normalizar(buscadorGuia.value);
      const cat = filtroCategoria.value;
      const rating = filtroRating.value;
      const lista = FOODS.filter(f =>
        (!q || normalizar(f.nombre).includes(q)) &&
        (!cat || f.categorias.includes(cat)) &&
        (!rating || f.rating === rating)
      );
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
    [buscadorGuia, filtroCategoria, filtroRating].forEach(el => el.addEventListener("input", renderGuia));
    renderGuia();

    // Otros bloques (p.ej. la carga de alimentos de la comunidad) llaman a
    // esto cuando añaden alimentos nuevos a FOODS, para refrescar la vista.
    window.__refrescarGuia = () => { actualizarCategorias(); renderGuia(); };
  });

  /* ================= Recetas saludables: render ================= */
  seguro("recetas", () => {
    const recetasGrid = document.getElementById("recetasGrid");

    function renderRecetas() {
      recetasGrid.innerHTML = "";
      RECETAS.forEach((receta, i) => {
        const card = crearTarjetaReceta(receta);
        card.style.animationDelay = Math.min(i * 0.06, 0.3) + "s";
        recetasGrid.appendChild(card);
      });
    }
    renderRecetas();

    // Cuando lleguen alimentos nuevos de la comunidad, volvemos a renderizar
    // por si alguna receta usaba un ingrediente que aún no se había cargado.
    window.__refrescarRecetas = renderRecetas;
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
      if (btn) abrirFicha(btn.dataset.foodId);
    });
    document.getElementById("fichaModalClose").addEventListener("click", cerrarFicha);
    overlay.addEventListener("click", e => { if (e.target === overlay) cerrarFicha(); });
  });

  /* ================= Alimentos generados por la comunidad ================= */
  // Carga los alimentos que la IA ya generó para otras personas y los añade a
  // FOODS/INDICE_ALIAS, para que la guía y la detección por texto/imagen los
  // reconozcan sin volver a llamar a la IA.
  seguro("alimentos-comunidad", () => {
    fetch("/api/community-foods")
      .then(r => (r.ok ? r.json() : { alimentos: [] }))
      .then(({ alimentos }) => {
        if (!Array.isArray(alimentos) || !alimentos.length) return;
        const idsExistentes = new Set(FOODS.map(f => f.id));
        let nuevos = 0;
        alimentos.forEach(({ food, estudios }) => {
          if (!food || !food.id || idsExistentes.has(food.id)) return;
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
          if (typeof window.__refrescarRecetas === "function") window.__refrescarRecetas();
          const statFoods = document.getElementById("statFoods");
          if (statFoods) statFoods.textContent = FOODS.length;
        }
      })
      .catch(err => console.error("[HSNutrición] No se pudieron cargar los alimentos de la comunidad:", err));
  });

  /* ================= Contador hero ================= */
  seguro("contador-hero", () => {
    const statFoods = document.getElementById("statFoods");
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
  });

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
  });

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
          if (typeof window.__refrescarRecetas === "function") window.__refrescarRecetas();
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
  });

})();
