var window = window || {},
  document = document || {},
  console = console || {};

Juego.nivelActual = {};


/*METODO DE INICIALIZACION*/
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


/*METODO PARA INICIALIZAR EL BUSCAMINAS*/
Juego.generarJuego = function(modo){
  var nivel = Juego.niveles.filter(n => n.modo === modo),
      section = document.querySelector(".juego-buscaminas"),
      div, cuadrados, asignado, img, divfila, divjuego, boton;
  Juego.nivelActual = nivel[0];

  divjuego = document.createElement("div");
  divjuego.classList.add("contenedor-juego-bm");

  div = document.createElement("div");
  img = document.createElement("img");
  img.setAttribute("src","images/play.svg");
  div.appendChild(img);
  div.addEventListener("click", Juego.reiniciar);

  div.classList.add("imagen-juego");

  divjuego.appendChild(div);

  for(var i = 0; i < Juego.nivelActual.alto; i++){

    divfila = document.createElement("div");
    divfila.classList.add("fila-buscaminas");
    for(var j = 0; j < Juego.nivelActual.ancho; j++){
      div = document.createElement("div");
      div.setAttribute("data-x",j);
      div.setAttribute("data-y",i);
      div.addEventListener("click", Juego.buscarMina);
      div.classList.add("cuadrado");
      div.classList.add("sin-descubrir");
      img = document.createElement("img");
      img.setAttribute("src","images/blanco.svg");
      div.appendChild(img);
      div.setAttribute("value","blank");

      divfila.appendChild(div);
    }
    divjuego.appendChild(divfila);
  }

  boton = document.createElement("input");
  boton.setAttribute("type","button");
  boton.setAttribute("value","volver al menu anterior");
  boton.addEventListener("click",Juego.mostrarMenu);

  divjuego.appendChild(boton);

  section.appendChild(divjuego);
  cuadrados = document.querySelectorAll("div.fila-buscaminas div.cuadrado");

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

Juego.mostrarMenu = function(){
  let juego = document.querySelector("div.contenedor-juego-bm");
  juego.parentNode.removeChild(juego);
  let menu = document.getElementById("buscaminas-lista-opciones");
  menu.classList.remove("disabled");
}

/*METODO QUE PARA LOS DIV:CUADRADO*/
Juego.buscarMina = function(e){
  var target = e.target.localName == "img" ? e.target.parentNode: e.target ;

  if(target.getAttribute("value") === "bomb"){
      target.classList.remove("sin-descubrir");
      perdiste();

  }
  else
  {
      var x = parseInt(target.getAttribute("data-x")),
          y = parseInt(target.getAttribute("data-y")),
          cuadrados = Array.prototype.slice.call(document.querySelectorAll("div.fila-buscaminas div.cuadrado"));
      descubrir(x, y, cuadrados);

      if(juegoTerminado(cuadrados)){
        ganaste();
      }

  }

}


/*FUNCION PARA DETERMINAR SI YA DESCUBRIO TODOS LOS CUADRADOS*/
function juegoTerminado(array){
  const ar = array.filter( c => c.getAttribute("value") == "blank" || (c.classList.contains("sin-descubrir") && c.getAttribute("value") != "bomb"));
  return ar.length == 0;
}


/*FUNCION PARA DESCUBRIR LOS CUADRADOS HASTA QUE LLEGA A UN LIMITE*/
function descubrir(x,y,array){

  if(!(x < 0 || x >= Juego.nivelActual.ancho ||
      y < 0 || y >= Juego.nivelActual.alto))
  {
    var  actual = document.querySelector("div.fila-buscaminas div[data-x='"+x+"'][data-y='"+y+"']");
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

      actual.classList.remove("sin-descubrir");
      actual.classList.add("descubierto");
    }
  }
}

/*FUNCION PPARA CARGAR LOS LIMITES CON LAS IMAGENES DE CUANTAS BOMBAS
ALEDAÑAS TIENE */
function cargarLimites(x,y,array){

  if(!(x < 0 || x >= Juego.nivelActual.ancho ||
      y < 0 || y >= Juego.nivelActual.alto))
  {

  var  actual = document.querySelector("div.fila-buscaminas div[data-x='"+x+"'][data-y='"+y+"']");
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



/*FUNCION PARA DETERMINAR SI UN CUADRADO ES BOMBA O NO*/
function minasAledañas(x,y,array){

  if( x < 0 || x >= Juego.nivelActual.ancho  ||
      y < 0 || y >= Juego.nivelActual.alto ){

        return 0;
      }
      else{
          var  actual = document.querySelector("div.fila-buscaminas div[data-x='"+x+"'][data-y='"+y+"']");
          if(actual.getAttribute("value") == "bomb"){
            return 1;
          }else{
            return 0;
        }
  }
}



/*METODO QUE VA CON LOS ITEMS DE LA LISTA*/
Juego.seleccion = function(e){
  if(e.target && e.target.matches("li.opcion")){
      Juego.generarJuego(e.target.innerHTML);
  }
}



/*GENERO EL MENU CON LOS MODOS DE JUEGO*/
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

/*FUNCION PARA REINICIAR EL JUEGO APRETANDO LA CARITA*/
Juego.reiniciar = function(){
  let juego = document.querySelector("div.contenedor-juego-bm");
  juego.parentNode.removeChild(juego);
  Juego.generarJuego(Juego.nivelActual.modo);
}

/*FUNCION PARA DESHABILITAR EL EVENTLISTENER*/
function inhabilitarOpcionYmostrar(){

  let cuadrados = document.querySelectorAll("div.fila-buscaminas div.cuadrado");

  cuadrados.forEach( c => {
    c.removeEventListener("click",Juego.buscarMina)
    c.classList.remove("sin-descubrir");
  });

}

/*FUNCION CON LOGICA CUANDO PIERDE*/
function perdiste(){
  document.querySelector("div.imagen-juego img").setAttribute("src", "images/lose.svg");
  inhabilitarOpcionYmostrar();
}
/*FUNCION CON LOGICA CUANDO GANA*/
function ganaste(){
  document.querySelector("div.imagen-juego img").setAttribute("src", "images/win.svg");
  inhabilitarOpcionYmostrar();
}
