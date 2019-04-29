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

    var title, article, divpregunta, ulrespuestas ,lirespuesta, divtimer,sectionp;

    title = document.createElement("h2");
    article = document.createElement("article");
    sectionp = document.createElement("section");
    divtimer =  document.createElement("div");

    JsonTest.test.preguntas.forEach(pregunta => {
      divpregunta = document.createElement("div");
      let p = document.createElement("span");      
      ulrespuestas =  document.createElement("ul");
      p.innerHTML = pregunta.pregunta;
      pregunta.respuestas.forEach( respuesta => {

        lirespuesta =  document.createElement("li");

        lirespuesta.innerHTML = respuesta;
        ulrespuestas.appendChild(lirespuesta);

      });

      divpregunta.appendChild(p);
      divpregunta.appendChild(ulrespuestas);
      sectionp.appendChild(divpregunta);
    });

    title.innerHTML = JsonTest.test.titulo;

    article.appendChild(title);
    article.appendChild(sectionp);
    article.appendChild(divtimer);
    section.appendChild(article);

}
