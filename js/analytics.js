// Consentimiento de cookies + Google Analytics (gtag.js).
//
// Google Analytics usa cookies (_ga, _ga_<ID>), así que NO se carga hasta que la
// persona lo acepta en el aviso de cookies (LSSI art. 22.2). "Aceptar" y
// "Rechazar" tienen el mismo peso visual y la decisión se puede cambiar en
// cualquier momento desde el enlace "Cookies" del pie de página. La decisión
// se guarda en localStorage (clave hsn_cookies): es una preferencia técnica del
// propio navegador, no una cookie de seguimiento.
//
// Una vez aceptado, gtag.js (~500 KB) se descarga al terminar de cargar la
// página para no competir con el contenido; las llamadas a gtag() se encolan en
// dataLayer y se procesan al cargarse, así que no se pierde ninguna visita.
// En desarrollo local (localhost) nunca se carga, para no ensuciar las estadísticas.
(function () {
  "use strict";

  var ID = "G-JHY1PHMCWD";
  var CLAVE = "hsn_cookies";
  var host = location.hostname;
  var enDesarrollo = host === "localhost" || host === "127.0.0.1";

  function leerDecision() {
    try {
      var v = localStorage.getItem(CLAVE);
      return v === "aceptadas" || v === "rechazadas" ? v : null;
    } catch (e) {
      return null;
    }
  }
  function guardarDecision(v) {
    try { localStorage.setItem(CLAVE, v); } catch (e) { /* navegación privada, etc. */ }
  }

  var analyticsCargado = false;
  function cargarAnalytics() {
    if (enDesarrollo || analyticsCargado) return;
    analyticsCargado = true;
    window["ga-disable-" + ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", ID);

    function inyectar() {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
      document.head.appendChild(s);
    }
    if (document.readyState === "complete") setTimeout(inyectar, 0);
    else window.addEventListener("load", function () { setTimeout(inyectar, 0); });
  }

  // Si se retira el consentimiento: se desactiva GA en esta página y se borran
  // las cookies que ya hubiera puesto (_ga y _ga_<ID>) en el dominio y sus padres.
  function retirarAnalytics() {
    window["ga-disable-" + ID] = true;
    var nombres = document.cookie.split(";").map(function (c) { return c.split("=")[0].trim(); })
      .filter(function (n) { return n === "_ga" || n.indexOf("_ga_") === 0; });
    if (!nombres.length) return;
    var partes = host.split(".");
    var dominios = [""];
    for (var i = 0; i < partes.length - 1; i++) dominios.push("; domain=." + partes.slice(i).join("."));
    nombres.forEach(function (n) {
      dominios.forEach(function (d) {
        document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + d;
      });
    });
  }

  function cerrarAviso() {
    var b = document.getElementById("cookieBanner");
    if (b) b.remove();
  }

  function decidir(valor, origen) {
    guardarDecision(valor);
    cerrarAviso();
    if (valor === "aceptadas") cargarAnalytics();
    else retirarAnalytics();
    if (origen && origen.focus) origen.focus();
  }

  function mostrarAviso(origen) {
    if (document.getElementById("cookieBanner")) return;
    var actual = leerDecision();
    var b = document.createElement("div");
    b.id = "cookieBanner";
    b.className = "cookie-banner";
    b.setAttribute("role", "region");
    b.setAttribute("aria-label", "Aviso de cookies");
    b.innerHTML =
      '<p><strong>Tu privacidad importa.</strong> Usamos cookies de analítica (Google Analytics) para saber ' +
      'qué contenidos resultan útiles y mejorar la web; <strong>solo se activan si las aceptas</strong>. ' +
      'La cookie de tu sesión es imprescindible y no necesita permiso. ' +
      '<a href="privacidad.html#cookies">Política de cookies</a>' +
      (actual ? ' <span class="cookie-banner-estado">Ahora mismo: ' + actual + '.</span>' : "") + "</p>" +
      '<div class="cookie-banner-acciones">' +
      '<button type="button" class="btn btn-ghost btn-sm" data-cookies="rechazadas">Rechazar</button>' +
      '<button type="button" class="btn btn-ghost btn-sm" data-cookies="aceptadas">Aceptar</button>' +
      "</div>";
    b.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-cookies]");
      if (btn) decidir(btn.getAttribute("data-cookies"), origen);
    });
    document.body.appendChild(b);
  }

  function iniciar() {
    // Enlace "Cookies" en el pie (y en cualquier elemento con data-abrir-cookies)
    var meta = document.querySelector(".footer-meta");
    if (meta && !meta.querySelector("[data-abrir-cookies]")) {
      var a = document.createElement("a");
      a.href = "privacidad.html#cookies";
      a.className = "footer-link";
      a.setAttribute("data-abrir-cookies", "");
      a.textContent = "Cookies";
      meta.appendChild(a);
    }
    document.addEventListener("click", function (e) {
      var el = e.target.closest("[data-abrir-cookies]");
      if (!el) return;
      e.preventDefault();
      mostrarAviso(el);
    });

    var decision = leerDecision();
    if (decision === "aceptadas") cargarAnalytics();
    else if (decision === null) mostrarAviso(null);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
