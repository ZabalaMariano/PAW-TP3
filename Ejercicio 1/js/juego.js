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
      var x = target.getAttribute("data-x"),
          y = target.getAttribute("data-y"),
          cuadrados = Array.prototype.slice.call(document.querySelectorAll("div.cuadrado"));
      console.log(x + " " + y);
      console.log(minar(x,y,cuadrados));
  }

}



function minar(x,y,array){

  if( x < 0 || x > Juego.nivelActual.ancho  ||
      y < 0 || y > Juego.nivelActual.alto ){

        return 0;

  }else{

        var count = 0,
          actual = array.filter( c => c.getAttribute("data-x") == x && c.getAttribute("data-y") == y)[0];

        console.log(actual);
        console.log(x);
        console.log(y);


        console.log(actual.getAttribute("value") == "bomb");
        if(actual.getAttribute("value") == "bomb"){
          return 1;
        }else{
          let minas = minar(x  , y-1, array) +
                        minar(x-1, y-1, array) +
                        minar(x+1, y-1, array) +
                        minar(x-1, y  , array) +
                        minar(x+1, y  , array) +
                        minar(x  , y+1, array) +
                        minar(x-1, y+1, array) +
                        minar(x+1, y+1, array);

          console.log("minar " + minas);
        }

  }

}
function factorial( n ) {
  if ( n === 1 ) {
    return 1;
  }
  return n * factorial( n - 1 );
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

// Juego.generarTarjetas = function (contenedor) {
//   var ancho = Juego.niveles[Juego.nivelActual].ancho,
//     alto = Juego.niveles[Juego.nivelActual].alto,
//     tarjeta, imagen, imagen2, nombreImagen, bandera;
//   for (var i = 0; i < ancho; i = i + 1) {
//     for (var j = 0; j < alto; j++) {
//       tarjeta = document.createElement("div");
//       tarjeta.classList.add("tarjeta");
//       tarjeta.classList.add("bocaAbajo");
//       tarjeta.setAttribute("data-x", i);
//       tarjeta.setAttribute("data-y", j);
//       tarjeta.addEventListener("click", Juego.darVueltaTarjeta);
//       contenedor.appendChild(tarjeta);
//     }
//   }
//   var tarjetas = document.querySelectorAll(".tarjeta");
//   console.log(tarjetas);
//   for (i = 0; i < tarjetas.length / 2; i++) {
//
//     imagen = document.createElement("img");
//     nombreImagen = Juego.imagenes[parseInt(Math.random() * Juego.imagenes.length)];
//     imagen.setAttribute("src", "images/" + nombreImagen + ".svg");
//     imagen2 = imagen.cloneNode();
//     bandera = true;
//     while (bandera) {
//       var posicion = parseInt(Math.random() * tarjetas.length);
//       if (!tarjetas[posicion].hasChildNodes()) {
//         tarjetas[posicion].appendChild(imagen);
//         bandera = false;
//       }
//     }
//
//     bandera = true;
//     while (bandera) {
//       posicion = parseInt(Math.random() * tarjetas.length);
//       if (!tarjetas[posicion].hasChildNodes()) {
//         tarjetas[posicion].appendChild(imagen2);
//         bandera = false;
//       }
//     }
//
//   }
// }
//
// Juego.darVueltaTarjeta = function (event) {
//   var tarjeta = event.target,
//     bocaArriba = document.querySelector(".bocaArriba:not(.marcada)");
//   tarjeta.classList.remove("bocaAbajo");
//   tarjeta.classList.add("bocaArriba");
//   if (bocaArriba) {
//     if (bocaArriba.getElementsByTagName("img")[0].getAttribute("src") === tarjeta.getElementsByTagName("img")[0].getAttribute("src")) {
//       Juego.parEncontrado();
//       tarjeta.classList.add("marcada");
//       bocaArriba.classList.add("marcada");
//       tarjeta.removeEventListener("click", Juego.darVueltaTarjeta);
//       bocaArriba.removeEventListener("click", Juego.darVueltaTarjeta);
//     } else {
//       window.setTimeout(function () {
//         tarjeta.classList.remove("bocaArriba");
//         bocaArriba.classList.remove("bocaArriba");
//         tarjeta.classList.add("bocaAbajo");
//         bocaArriba.classList.add("bocaAbajo");
//       }, 1000);
//     }
//   }
// }
//
// Juego.parEncontrado = function () {
//
// };
