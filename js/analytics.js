// Google Analytics (gtag.js). Se carga cuando la página ya ha terminado de
// cargar: gtag.js pesa ~500 KB y, cargado antes, competía por la red con el
// contenido y retrasaba el primer pintado. Las llamadas a gtag() se encolan en
// dataLayer y se procesan al cargarse el script, así que no se pierde ninguna
// visita. Se omite en desarrollo local (localhost) para no ensuciar las
// estadísticas con pruebas.
(function () {
  var ID = "G-JHY1PHMCWD";
  var host = location.hostname;
  if (host === "localhost" || host === "127.0.0.1") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", ID);

  function cargar() {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
    document.head.appendChild(s);
  }
  if (document.readyState === "complete") setTimeout(cargar, 0);
  else window.addEventListener("load", function () { setTimeout(cargar, 0); });
})();
