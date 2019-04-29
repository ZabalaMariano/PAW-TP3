var JsonTest = JsonTest || {},
    window = window || {},
    document = document || {},
    console = console || {};

JsonTest.contenedor = "vacio";
JsonTest.test = {};
JsonTest.tiempo = 0;
JsonTest.interval = {};

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

    var title, article, divpregunta, ulrespuestas ,lirespuesta, divtimer,sectionp,check,labelc;

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

        check = document.createElement("input");
        labelc = document.createElement("label");
        check.type = "checkbox";
        lirespuesta.classList.add("not-selected");
        lirespuesta.addEventListener("click",JsonTest.onClickRespuesta);
        lirespuesta.innerText = respuesta;

        //lirespuesta.appendChild( check);
        //lirespuesta.appendChild(labelc);
        ulrespuestas.appendChild(lirespuesta);

      });

      divpregunta.appendChild(p);
      divpregunta.appendChild(ulrespuestas);
      sectionp.appendChild(divpregunta);

    });

    title.innerHTML = JsonTest.test.titulo;
    divtimer.classList.add("timer");
    article.appendChild(title);
    sectionp.appendChild(divtimer);
    article.appendChild(sectionp);
    section.appendChild(article);
    JsonTest.tiempo = JsonTest.test.tiempo / 1000;
    JsonTest.interval = window.setInterval(JsonTest.contador,1000);
    window.setTimeout(function(interval){
      alert("paso el tiempo!");
      window.clearInterval(JsonTest.interval ,10);
    },JsonTest.test.tiempo);
}

JsonTest.onClickRespuesta = function(e){

  console.log(e);
  console.log(e.target.classList.contains("not-selected"));
  if(e.target.classList.contains("not-selected")){
    e.target.classList.remove("not-selected");
    e.target.classList.add("selected");
  }else{
    e.target.classList.remove("selected");
    e.target.classList.add("not-selected");
  }

}
JsonTest.contador = function(){
  let div = document.querySelector("div.timer");

  --JsonTest.tiempo;
  div.innerHTML = JsonTest.tiempo;
}
