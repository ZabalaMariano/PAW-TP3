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

    var title, article, divpregunta, ulrespuestas ,lirespuesta, divtimer,sectionp;

    title = document.createElement("h2");
    article = document.createElement("article");
    sectionp = document.createElement("section");
    divtimer =  document.createElement("div");

    for(let j = 0 ; j< JsonTest.test.preguntas.length; j++) {

      divpregunta = document.createElement("div");
      let p = document.createElement("span");
      ulrespuestas =  document.createElement("ul");
      ulrespuestas.classList.add("unlisted");

      let pregunta = JsonTest.test.preguntas[j];
      p.innerHTML = pregunta.pregunta;

      for(let i= 0; i<pregunta.respuestas.length ;i++) {

        lirespuesta =  document.createElement("li");
        lirespuesta.setAttribute("data-r", i);
        lirespuesta.setAttribute("data-p",j);
        lirespuesta.classList.add("not-selected");
        lirespuesta.classList.add("respuesta");
        lirespuesta.addEventListener("click",JsonTest.onClickRespuesta);
        lirespuesta.innerText = pregunta.respuestas[i];

        ulrespuestas.appendChild(lirespuesta);

      }


      divpregunta.appendChild(p);
      divpregunta.appendChild(ulrespuestas);
      sectionp.appendChild(divpregunta);

    }

    title.innerHTML = JsonTest.test.titulo;
    divtimer.classList.add("timer");
    article.appendChild(title);
    sectionp.appendChild(divtimer);
    article.appendChild(sectionp);
    section.appendChild(article);
    JsonTest.tiempo = JsonTest.test.tiempo / 1000;

    divtimer.innerHTML = JsonTest.tiempo + " segundos";
    JsonTest.interval = window.setInterval(JsonTest.contador,1000);
    window.setTimeout(JsonTest.finalizar,JsonTest.test.tiempo);
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
  div.innerHTML = JsonTest.tiempo + " segundos";
}

JsonTest.finalizar = function(interval){
  window.clearInterval(JsonTest.interval ,10);

  let respuestas = Array.prototype.slice.call(document.querySelectorAll("ul li.respuesta"));

  respuestas.forEach(r => r.removeEventListener("click",JsonTest.onClickRespuesta));

  JsonTest.validar();
}

JsonTest.validar = function(){

  let preguntas = JsonTest.test.preguntas;
  console.log(preguntas);
  for(let i = 0 ; i < preguntas.length; i++){

    let ul = Array.prototype.slice.call(document.querySelectorAll("li[data-p='"+i+"'].selected"));

    for(let j = 0; j < ul.length ; j++) {
      console.log(preguntas[i].correctas);
      if(preguntas[i].correctas.indexOf(parseInt(ul[j].getAttribute("data-r"))) > -1  ){
        ul[j].classList.remove("selected");
        ul[j].classList.add("correct");
      }else{
        ul[j].classList.remove("selected");
        ul[j].classList.add("incorrect");
      }
    }

  }


}
