var window = window || {},
  document = document || {},
  console = console || {};

Juego.nivelActual = {};



Juego.armarJuego = function (contenedor) {
  Juego.contenedor = contenedor;
  window.addEventListener("DOMContentLoaded", function () {
    if (typeof Juego.contenedor === "string") {
      Juego.contenedor = document.getElementById(Juego.contenedor);

    var section = document.createElement("section");
    section.classList.add("juego-buscaminas");
    Juego.contenedor.appendChild(section);
    Juego.generarMenuSeleccion(section);
    }
  });
}


Juego.generarJuego = function(modo){
  var nivel = Juego.niveles.filter(n => n.modo === modo),
      section = document.querySelector(".juego-buscaminas"),
      div, cuadrados, asignado, img;
  Juego.nivelActual = nivel[0];

  for(var i = 0; i < Juego.nivelActual.ancho; i++){
    for(var j = 0; j < Juego.nivelActual.alto; j++){
      div = document.createElement("div");
      div.setAttribute("data-x",i);
      div.setAttribute("data-y",j);
      div.addEventListener("click", Juego.buscarMina);
      div.classList.add("cuadrado");
      div.classList.add("sin-descubrir");
      img = document.createElement("img");
      img.setAttribute("src","images/blanco.svg");
      div.appendChild(img);
      div.setAttribute("value","blank");

      section.appendChild(div);
    }
  }

  cuadrados = document.querySelectorAll("div.cuadrado");

  for(var k = 0; k < Juego.nivelActual.minas; k++){

    asignado = false;
    while(!asignado){
      let random = parseInt(Math.random() * cuadrados.length);
      if(cuadrados[random].firstChild.getAttribute("src") === "images/blanco.svg" ){
        cuadrados[random].firstChild.setAttribute("src","images/bomb.svg");
        cuadrados[random].setAttribute("value","bomb");
        asignado = true;
      }
    }
  }
  for( i = 0; i < Juego.nivelActual.ancho; i++){
    for( j = 0; j < Juego.nivelActual.alto; j++){
      cargarLimites(i, j, Array.prototype.slice.call(cuadrados));
    }
  }
  document.getElementById("buscaminas-lista-opciones").classList.add("disabled");
}



Juego.cargarOpciones = function(modo){

  Juego.generarJuego(modo);
}



Juego.buscarMina = function(e){
  var target = e.target.localName == "img" ? e.target.parentNode: e.target ;

  if(target.getAttribute("value") === "bomb"){
      target.classList.remove("sin-descubrir");
      alert("perdiste");

  }
  else
  {
      var x = parseInt(target.getAttribute("data-x")),
          y = parseInt(target.getAttribute("data-y")),
          cuadrados = Array.prototype.slice.call(document.querySelectorAll("div.cuadrado"));
      descubrir(x, y, cuadrados);

      if(juegoTerminado(cuadrados)){
        alert("ganaste");
      }

  }

}

function juegoTerminado(array){
  const ar = array.filter( c => c.getAttribute("value") == "blank");
  return ar.length == 0;
}

function descubrir(x,y,array){
  console.log("descubrir "+ x +" "+ y  );
  if(!(x < 0 || x >= Juego.nivelActual.ancho ||
      y < 0 || y >= Juego.nivelActual.alto))
  {
    var  actual = array.filter( c => c.getAttribute("data-x") == x && c.getAttribute("data-y") == y)[0];
    if(actual.getAttribute("value") == "blank"){

      actual.setAttribute("value","descubierto");
      actual.classList.remove("sin-descubrir");
      actual.classList.add("descubierto");


      descubrir(x+1, y+1, array);
      descubrir(x-1, y+1, array);
      descubrir(x ,  y+1, array);
      descubrir(x+1, y-1, array);
      descubrir(x-1, y-1, array);
      descubrir(x , y-1, array);
      descubrir(x+1, y, array);
      descubrir(x-1, y, array);

    }else if(actual.getAttribute("value") == "limite"){
      console.log("asdasdas");
      actual.classList.remove("sin-descubrir");
      actual.classList.add("descubierto");
    }
  }
}

function cargarLimites(x,y,array){

  if(!(x < 0 || x >= Juego.nivelActual.ancho ||
      y < 0 || y >= Juego.nivelActual.alto))
  {

  var  actual = array.filter( c => c.getAttribute("data-x") == x && c.getAttribute("data-y") == y)[0];
  if(actual.getAttribute("value") != "bomb"){
        let minas = minasAledañas(x+1, y+1, array)+
                    minasAledañas(x-1, y+1, array)+
                    minasAledañas(x  , y+1, array)+
                    minasAledañas(x+1, y-1, array)+
                    minasAledañas(x-1, y-1, array)+
                    minasAledañas(x  , y-1, array)+
                    minasAledañas(x+1, y, array)+
                    minasAledañas(x-1, y, array);
        if(minas != 0){
          actual.firstChild.setAttribute("src","images/"+minas+".svg");
          actual.setAttribute("value","limite");
        }

    }
  }
}




function minasAledañas(x,y,array){
  console.log(x + "  "+ y);
    if( x < 0 || x >= Juego.nivelActual.ancho  ||
        y < 0 || y >= Juego.nivelActual.alto ){

          return 0;
        }
        else{
            var  actual = array.filter( c => c.getAttribute("data-x") == x && c.getAttribute("data-y") == y)[0];

            if(actual.getAttribute("value") == "bomb"){
              return 1;
            }else{
              return 0;
          }
  }
}




Juego.seleccion = function(e){
  if(e.target && e.target.matches("li.opcion")){

    if(e.target.innerHTML != "Personalizado")
      Juego.generarJuego(e.target.innerHTML);
    else
      Juego.cargarOpciones(e.target.innerHTML);
  }
}




Juego.generarMenuSeleccion = function(section){

  var ul = document.createElement("ul");

  ul.classList.add("lista-opciones");
  ul.id = "buscaminas-lista-opciones";
  ul.addEventListener("click",Juego.seleccion);

  Juego.niveles.forEach(n => {
    let opcion = document.createElement("li");


    opcion.classList.add("opcion");

    opcion.innerHTML =  n.modo;

    ul.appendChild(opcion);

  });

  section.appendChild(ul);
}
