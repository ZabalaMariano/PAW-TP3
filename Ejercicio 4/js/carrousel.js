var JsonTest = JsonTest || {},
    window = window || {},
    document = document || {},
    console = console || {};

JsonTest.contenedor = "vacio";


JsonTest.onLoadWindow = function (contenedor) {
  JsonTest.contenedor = contenedor;
  window.addEventListener("DOMContentLoaded", function () {
    if (typeof JsonTest.contenedor === "string") {
      JsonTest.contenedor = document.getElementById(JsonTest.contenedor);
    var section = document.createElement("section");
    JsonTest.contenedor.appendChild(section);
    JsonTest.generate(section);
    }
  });
}
