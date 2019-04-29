var JsonTest = JsonTest || {},
    window = window || {},
    document = document || {},
    console = console || {};

JsonTest.contenedor = "vacio";
JsonTest.test = {};

JsonTest.onLoadWindow = function (contenedor) {
  JsonTest.contenedor = contenedor;
  window.addEventListener("DOMContentLoaded", function () {
    if (typeof JsonTest.contenedor === "string") {
      JsonTest.contenedor = document.getElementById(JsonTest.contenedor);
    var section = document.createElement("section");
    section.id = "JsonTest";
    JsonTest.contenedor.appendChild(section);
    JsonTest.getTest();
    }
  });
}

JsonTest.getTest = function (){


    var xhttp = new XMLHttpRequest();


    xhttp.open("GET","data/test.json",true);
    xhttp.send();

    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {
        JsonTest.test = JSON.parse(this.responseText);
        JsonTest.generate();
      }
    }

  }

  JsonTest.generate = function(){
    var section = document.getElementById("JsonTest");

    let p = document.createElement("p");

    p.innerHTML = JSON.stringify(JsonTest.test);

    console.log(JsonTest.test);

    section.appendChild(p);

}
