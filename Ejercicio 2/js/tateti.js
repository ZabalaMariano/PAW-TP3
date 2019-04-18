var window = window || {},
document = document || {},
console = console || {},
Juego = Juego || {},

mensaje = document.createElement("p"),//Creo paragraph 
restart = document.createElement("div");//Creo boton

Juego.contenedor = "default";//Inicializo contenedor
Juego.armarJuego = function (contenedor) 
{
    Juego.contenedor = contenedor;
    window.addEventListener("DOMContentLoaded", function () 
    {
        if (typeof Juego.contenedor === "string") {
            Juego.contenedor = document.getElementById(Juego.contenedor);
        }
        var section = document.createElement("section");//Creo cuerpo
        section.classList.add("tatetiSectionJugadores");//Le añado una clase
        Juego.contenedor.appendChild(section);
        Juego.contenedor.classList.add("tateti");//Le añado una clase

        Juego.generarMenuJugadores(section);//En jugadores.js
    });
}
    
Juego.generarMenuSeleccion = function(section){
    var ul = document.createElement("ul");
     
    ul.classList.add("lista-opciones");
    ul.id = "lista-opciones";
    ul.addEventListener("click",Juego.seleccion);
      
    Juego.niveles.forEach(n => {
        let opcion = document.createElement("li");
        opcion.classList.add("opcion");
        opcion.innerHTML =  n.modo;
      
        ul.appendChild(opcion); 
    });
      
section.appendChild(ul);
}

Juego.seleccion = function(e){
    if(e.target && e.target.matches("li.opcion")){
        Juego.generarJuego(e.target.innerHTML);
    }
}     

Juego.generarJuego = function(modo){
    var section = document.querySelector(".tatetiSectionConf");
  
    section.classList.remove("tatetiSectionConf");//Le quito una clase
    section.classList.add("tatetiSectionJuego");//Le añado una clase

    var nivel = Juego.niveles.filter(n => n.modo === modo),
        section = document.querySelector(".tatetiSectionJuego"),
        div, img;

    Juego.nivelActual = nivel[0];

    if(Juego.nivelActual.ancho==3){
        section.classList.add("dimension3");//Le añado una clase
    }else if(Juego.nivelActual.ancho==4){
        section.classList.add("dimension4");//Le añado una clase
    }else if(Juego.nivelActual.ancho==5){
        section.classList.add("dimension5");//Le añado una clase
    }else{
        section.classList.add("dimension6");//Le añado una clase
    }

    Juego.contenedor.appendChild(mensaje);
    mensaje.classList.add("tatetiMensajeFin");//Le añado una clase
    mensaje.textContent = "Ganador ?";
    Juego.contenedor.appendChild(restart);
    restart.classList.add("tatetiRestart");//Le añado una clase
    restart.textContent = "Restart";

    Juego.crearTabla();

    for(var i = 0; i < Juego.nivelActual.ancho; i++){
        for(var j = 0; j < Juego.nivelActual.alto; j++){
            div = document.createElement("div");
            div.setAttribute("data-x",i);
            div.setAttribute("data-y",j);
            div.addEventListener("click", Juego.dibujar);
            div.classList.add("cuadrado");
            div.classList.add("sin-descubrir");
            img = document.createElement("img");
            img.setAttribute("src","img/blanco.svg");
            div.appendChild(img);
            div.setAttribute("value","blanco");

            section.appendChild(div);
        }
    }

  document.getElementById("lista-opciones").classList.add("disabled");
}

Juego.dibujar = function(e){
    var target = e.target.localName == "img" ? e.target.parentNode: e.target ;

    if(target.getAttribute("value") == "blanco"){
        target.classList.remove("sin-descubrir");
        var img = target.querySelector('img');

        if(Juego.jugador=='x'){
            img.setAttribute("src","img/x.svg");
            target.setAttribute("value","x");
            target.classList.add("descubierto");
        }
        else{
            img.setAttribute("src","img/o.svg");
            target.setAttribute("value","o");
            target.classList.add("descubierto");
        }

        if (!Juego.ganador){//Si no hay ganador
            if(preguntoSiGano()){
                gano = (Juego.jugador=='x') ? Juego.jugadores.x : Juego.jugadores.o;
                mensaje.textContent = 'Ganó el jugador ' + gano;

                //Sumo puntos a la tabla
                if(Juego.jugador=='x'){
                    xganadas = Juego.contenedor.querySelector("#xganadas");
                    puntos = parseInt(xganadas.textContent)+1;
                    xganadas.textContent = puntos;
                }else{
                    oganadas = Juego.contenedor.querySelector("#oganadas");
                    puntos = parseInt(oganadas.textContent)+1;
                    oganadas.textContent = puntos;
                }
            
                Juego.ganador = true;
            }
        }

        Juego.jugador = (Juego.jugador=='x')?'o':'x';
    }  
}

function preguntoSiGano(){
    if(ganoFila())
        return true;
    if(ganoColumna())
        return true;
    if(ganoDiagonal())
        return true;

    return false;
}    

function ganoFila(){
    //Cuento 3,4,5 o 6 en Fila
    cuadrados = document.querySelectorAll("div.cuadrado");
    meta = Juego.nivelActual.ancho;
    var contador = 0;
    for(var i=0;i<cuadrados.length;i++){
        if(i%meta==0){//Reinicio la cuenta al cambiar de fila   
            contador = 0;
        }
        if(cuadrados[i].getAttribute("value") == Juego.jugador){
            contador++;
            if(contador==meta){
                return true;
            }
        }else{
            contador = 0;//Se corta la racha
        }
    }
    return false;
}
    
function ganoColumna(){
    //Cuento 3,4,5 o 6 en Columna
    cuadrados = document.querySelectorAll("div.cuadrado");
    meta = Juego.nivelActual.ancho;
    var contador = 0;
    for(var i=0;i<meta;i++){ //Identifico columna segun resto          
        contador = 0;
        for(var j=0;j<cuadrados.length;j++){
            if(j%meta==i){//Estoy en la columna indicada por el for externo  
                if(cuadrados[j].getAttribute("value") == Juego.jugador){
                    contador++;
                    if(contador==meta){
                        return true;
                    }
                }else{
                    contador = 0;//Se corta la racha
                }
            }
        }
    }
    return false;
}

function ganoDiagonal(){
    //Cuento 3,4,5 o 6 en diagonal
    cuadrados = document.querySelectorAll("div.cuadrado");
    meta = Juego.nivelActual.ancho;

    var matriz = [],
    x = 0;
    for(var i=0; i<meta; i++) {
        matriz[i] = [];
        for(var j=0; j<meta; j++) {
            matriz[i][j] = cuadrados[x].getAttribute("value");
            x++;
        }
    }

    var contador = 0;
    for(i=0;i<meta;i++){//Diagonal principal
        if(matriz[i][i]==Juego.jugador){
            contador++;
            if(contador==meta){
                return true;
            }
        }else{
            contador = 0;
        }
    }

    for(i=0;i<meta;i++){//Diagonal inversa
        if(matriz[meta-i-1][i]==Juego.jugador){
            contador++;
            if(contador==meta){
                return true;
            }
        }else{
            contador = 0;
        }
    }

    return false;
}

restart.addEventListener("click", function(event){
    Juego.jugador = 'x';
    Juego.ganador = false;
    mensaje.textContent = "Ganador ?";
    var cuadrados = document.querySelectorAll("div.cuadrado");

    for(var i=0;i<cuadrados.length;i++){
        cuadrados[i].setAttribute("value","blanco");
        cuadrados[i].classList.remove("descubierto");
        cuadrados[i].classList.add("sin-descubrir");
        var img = cuadrados[i].querySelector("img");
        img.setAttribute("src","img/blanco.svg");
    }
});

Juego.crearTabla = function(){
    table = document.createElement("table");//Creo table
    table.classList.add("tatetiTabla");
    thead = document.createElement("thead");
    tr1 = document.createElement("tr");
    td = document.createElement("td");
    thx = document.createElement("th");
    tho = document.createElement("th");

    thx.textContent = Juego.jugadores.x;
    tho.textContent = Juego.jugadores.o;

    tr1.appendChild(td);
    tr1.appendChild(thx);
    tr1.appendChild(tho);
    thead.appendChild(tr1);
    table.appendChild(thead);

    tbody = document.createElement("tbody");
    tr2 = document.createElement("tr");
    thpartidasganadas = document.createElement("th");
    tdxganadas = document.createElement("td");
    tdxganadas.setAttribute("id","xganadas");
    tdoganadas = document.createElement("td");
    tdoganadas.setAttribute("id","oganadas");

    thpartidasganadas.textContent = "Partidas Ganadas";
    tdxganadas.textContent = 0;
    tdoganadas.textContent = 0;

    tr2.appendChild(thpartidasganadas);
    tr2.appendChild(tdxganadas);
    tr2.appendChild(tdoganadas);
    tbody.appendChild(tr2);
    table.appendChild(tbody);

    Juego.contenedor.appendChild(table);
}