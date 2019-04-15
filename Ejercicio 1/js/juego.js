var window = window || {},
  document = document || {},
  console = console || {};

  console.log(Juego);



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
  var nivel = Juego.niveles.filter(n => n.modo === modo);

  


  document.getElementById("buscaminas-lista-opciones").classList.add("disabled");
}

Juego.cargarOpciones = function(modo){


  Juego.generarJuego(modo);
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
