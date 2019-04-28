var window = window || {},
document = document || {},
console = console || {},
Juego = Juego || {};

Juego.generarMenuJugadores = function (section){

    var form = document.createElement("form");//Creo form
    form.classList.add("tatetiForm");
    section.appendChild(form);

    var mensaje = document.createElement("p");
    form.appendChild(mensaje);
    mensaje.classList.add("tatetiMensajeInicio");//Le añado una clase
    
    var label1 = document.createElement("label");//Creo label
    label1.classList.add("tatetiFormLabel1");
    label1.setAttribute("for","nombreX");
    label1.textContent = "Nombre jugador X: ";
    form.appendChild(label1);

    var input1 = document.createElement("input");//Creo input
    input1.classList.add("tatetiFormInput1");
    input1.setAttribute("type","text");
    input1.setAttribute("name","nombreX");
    input1.setAttribute("maxlength",10);
    input1.setAttribute("required",true);
    form.appendChild(input1);
    
    var label2 = document.createElement("label");//Creo label
    label2.classList.add("tatetiFormLabel2");
    label2.setAttribute("for","nombreO");
    label2.textContent = "Nombre jugador O: ";
    form.appendChild(label2);

    var input2 = document.createElement("input");//Creo label
    input2.classList.add("tatetiFormInput2");
    input2.setAttribute("type","text");
    input2.setAttribute("name","nombreO");
    input2.setAttribute("maxlength",10);
    input2.setAttribute("required",true);
    form.appendChild(input2);

    var boton = document.createElement("div");//Creo input enviar
    boton.classList.add("tatetiFormBoton");
    boton.textContent = "Siguiente";
    boton.addEventListener("click",Juego.siguiente);
    form.appendChild(boton);
}

Juego.siguiente = function(e){
    if(e.target && e.target.matches("div.tatetiFormBoton")){
        var section = document.querySelector("section.tatetiSectionJugadores"),
        mensaje = document.querySelector("p.tatetiMensajeInicio");
        
        nombreX = document.querySelector("input.tatetiFormInput1");
        nombreX = nombreX.value;
        nombreO = document.querySelector("input.tatetiFormInput2");
        nombreO = nombreO.value;
        if(nombreX != "" && nombreO != ""){
            if(nombreX != nombreO){
                Juego.jugadores = {'x':nombreX , 'o': nombreO};
                var form = document.querySelector("form.tatetiForm");
                section.removeChild(form);
                Juego.contenedor.classList.remove("tatetiInicio");//Le quito una clase
                Juego.contenedor.classList.add("tatetiDimension");//Le añado una clase
                section.classList.remove("tatetiSectionJugadores");//Le quito una clase
                section.classList.add("tatetiSectionConf");//Le añado una clase
                Juego.generarMenuSeleccion(section);
            }else{
                mensaje.textContent = "Los nombres deben ser distintos!";
            }
        }else{
            mensaje.textContent = "Los nombres son obligatorios!";
        }
    }
}  