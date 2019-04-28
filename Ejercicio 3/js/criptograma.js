var window = window || {},
document = document || {},
console = console || {},
Criptograma = Criptograma || {};

Criptograma.armarCriptograma = function (contenedor) 
{
    Criptograma.contenedor = contenedor;
    window.addEventListener("DOMContentLoaded", function () 
    {
        if (typeof Criptograma.contenedor === "string") {
            Criptograma.contenedor = document.getElementById(Criptograma.contenedor);
        }

        var principal = document.createElement("section");
        principal.classList.add("principalVentanaOpciones");
        Criptograma.contenedor.appendChild(principal);

        Criptograma.generarMenu();
    });
}
    
Criptograma.generarMenu = function(){
    //TIPO CRIPTOGRAFO: LETRA, NUMERO o SIMBOLO
    var articleTipoCriptografo = document.createElement("article"),
    pTipoCriptografo = document.createElement("p");

    articleTipoCriptografo.classList.add("articleTipoCriptografo");
    pTipoCriptografo.classList.add("textoCriptografo");
    pTipoCriptografo.innerHTML = "Elija un criptográfo";

    var ul = document.createElement("ul");
     
    ul.classList.add("listaTipoCriptografo");
      
    Criptograma.tipoCriptografo.forEach(n => {
        var li = document.createElement("li"),
        opcion = document.createElement("input");
        li.classList.add("liTipoCriptografo");
        opcion.classList.add("opcionTipoCriptografo");
        opcion.setAttribute("type","radio");
        opcion.setAttribute("name","tipoCriptograma");
        opcion.setAttribute("value", n.nombre);
        opcion.setAttribute("id", n.id);

        if(n.id==0){
            opcion.setAttribute("checked","checked");
        }

        li.appendChild(opcion);
        li.innerHTML +=  n.texto;
        
        ul.appendChild(li); 
    });
    
    articleTipoCriptografo.appendChild(pTipoCriptografo);
    articleTipoCriptografo.appendChild(ul);

    var principal = document.querySelector("section.principalVentanaOpciones");
    principal.appendChild(articleTipoCriptografo);

    //FRASES
    var articleFrases = document.createElement("article"),
    pFrase = document.createElement("p");

    articleFrases.classList.add("articleFrases");
    pFrase.classList.add("textoFrase");
    pFrase.innerHTML = "Elija una frase";

    var ulFrases = document.createElement("ul");
     
    ulFrases.classList.add("listaFrases");
      
    Criptograma.frases.forEach(n => {
        var li = document.createElement("li"),
        opcion = document.createElement("input");
        li.classList.add("liFrase");
        opcion.classList.add("opcionFrase");
        opcion.setAttribute("type","radio");
        opcion.setAttribute("name","frase");
        opcion.setAttribute("value", n.frase);
        opcion.setAttribute("id", n.id);

        if(n.id==0){
            opcion.setAttribute("checked","checked");
        }

        li.appendChild(opcion);
        li.innerHTML +=  n.frase;
        
        ulFrases.appendChild(li); 
    });
      
    articleFrases.appendChild(pFrase);
    articleFrases.appendChild(ulFrases);
    principal.appendChild(articleFrases);

    //Boton siguiente
    var siguiente = document.createElement("p");
    siguiente.classList.add("pSiguiente");
    siguiente.innerHTML = "Siguiente";
    siguiente.addEventListener("click",Criptograma.jugar);
    principal.appendChild(siguiente);
}

Criptograma.jugar = function(){
    var principal = document.querySelector("section.principalVentanaOpciones");
    var articleTipoCriptografo = principal.querySelector(".articleTipoCriptografo"),
    articleFrases = principal.querySelector(".articleFrases"),
    pSiguiente = principal.querySelector(".pSiguiente");

    var criptografo = articleTipoCriptografo.querySelector('input[name="tipoCriptograma"]:checked').id,
    frase = articleFrases.querySelector('input[name="frase"]:checked').id;

    var principal = document.querySelector("section.principalVentanaOpciones");
    principal.removeChild(articleTipoCriptografo);
    principal.removeChild(articleFrases);
    principal.removeChild(pSiguiente);

    principal.classList.remove("principalVentanaOpciones");
    principal.classList.add("principalVentanaJuego");

    Criptograma.generarJuego(criptografo,frase);
}     

Criptograma.generarJuego = function(criptografo,frase){
    var divTabla = document.createElement("div"),
    pOK = document.createElement("p"),
    pMal = document.createElement("p"),
    divFrase = document.createElement("div");

    divTabla.classList.add("divTabla");
    pOK.classList.add("pOK");
    pOK.addEventListener("click",Criptograma.evaluarRespuesta);
    pMal.classList.add("pMal");
    divFrase.classList.add("divFrase");

    pOK.innerHTML = "¿OK?";
    pMal.innerHTML = "Intentos Incorrectos: 0";

    //Array para conocer imagenes usadas y que no se repitan
    var arrayUsado = [];
    for(var i = 0; i < 26; i++){
        arrayUsado[i]=0;
    }   

    var carpeta = (criptografo==0) ? "numeros" : (criptografo==1) ? "letras" : "simbolos", 
    extension = (criptografo==2) ? ".svg" : ".png";

    //Creo tabla con los simbolos (fila superior)
    for(var i = 0; i < 26; i++){   
        var div = document.createElement("div"),
        img = document.createElement("img"),
        encontre = false,
        nombreImagen;

        while(!encontre)
        {
            nombreImagen = Math.floor(Math.random()*26);
            if(arrayUsado[nombreImagen]==0){
                arrayUsado[nombreImagen]=1;
                encontre = true;
            }
        }
        
        div.classList.add("cuadrado");
        div.setAttribute("data-x",i+1);
        img.setAttribute("imagen",nombreImagen);
        img.setAttribute("src","multimedia/"+carpeta+"/"+(nombreImagen+1)+extension);
        div.appendChild(img);

        divTabla.appendChild(div);
    }

    //Creo tabla con espacios para que el user ponga las letras (fila del medio)
    for(var i = 0; i < 26; i++){   
        var div = document.createElement("div"),
        input = document.createElement("input");
        
        div.classList.add("divRespuesta");
        input.classList.add("respuesta");
        input.setAttribute("data-x",i+1);
        input.setAttribute("type","text");
        input.setAttribute("maxlength",1);
        div.appendChild(input);

        divTabla.appendChild(div);
    }

    //Creo tabla con la numeracion de las casillas para facilitar encontrarlas cuando las menciona un mensaje
    for(var i = 0; i < 26; i++){   
        var div = document.createElement("div"),
        p = document.createElement("p");
        div.classList.add("casilla");
        p.innerHTML = i+1;
        div.appendChild(p);

        divTabla.appendChild(div);
    }

    //Asigno Letra a criptografo
    var arrayAsignacion = [],
    encontre = false,
    simbolo;

    for(var i = 0; i < 26; i++){
        arrayAsignacion[i]=0;
    } 

    for(var i = 0; i < 26; i++){   
        while(!encontre)
        {
            simbolo = Math.floor(Math.random()*26);
            if(arrayAsignacion[simbolo]==0){
                arrayAsignacion[simbolo]=Criptograma.letras[i];
                encontre = true;
            }
        }
        encontre = false;
    }

    Criptograma.asignacion = arrayAsignacion;

    //Creo divFrase
    for(var i = 0; i < Criptograma.frases[frase].texto.length; i++){   
        var divElemento = document.createElement("div"),
        imgUp = document.createElement("p"),
        pGuion = document.createElement("p"),
        imgDown = document.createElement("img");

        divElemento.classList.add("divElemento");

        pGuion.classList.add("pGuion");
        pGuion.innerHTML = "_";

        imgUp.classList.add("imgUp");
        imgDown.classList.add("imgDown");

        var letra = Criptograma.frases[frase].texto[i],
        simboloCorrespondiente = -1;

        for(var j = 0; j < 26; j++){ 
            if(Criptograma.asignacion[j]==letra.toUpperCase()){
                simboloCorrespondiente = j;
            }
        }

        //Si simboloCorrespondiente se quedo en 0 no es una letra
        if(simboloCorrespondiente==-1){
            pGuion.innerHTML = letra;
        }else{
            //Busco posicion letra
            /*
            var pos = -1;
            for(var j = 0; j < 26; j++){ 
                if(Criptograma.letras[j]==letra.toUpperCase()){
                    pos = j;
                }
            }*/
            imgUp.classList.add("noDisplay");
            imgUp.innerHTML = letra;
            //imgUp.setAttribute("src","multimedia/letras/"+(pos+1)+extension);
            imgDown.setAttribute("src","multimedia/"+carpeta+"/"+(simboloCorrespondiente+1)+extension);
        }
        
        divElemento.appendChild(imgUp);
        divElemento.appendChild(pGuion);
        divElemento.appendChild(imgDown);
        divFrase.appendChild(divElemento);
    }
    var principal = document.querySelector("section.principalVentanaJuego");
    principal.appendChild(divTabla);
    principal.appendChild(pOK);
    principal.appendChild(pMal);
    principal.appendChild(divFrase);
}

Criptograma.evaluarRespuesta = function(){
    var principal = document.querySelector("section.principalVentanaJuego");
    var inputs = principal.querySelectorAll(".respuesta"),
    
    //Veo donde hay una respuesta
    i = 0;
    while(i<inputs.length)
    {   
        //Si es correcto y ya lo corregi lo salto
        var d = inputs[i].getAttribute("disabled");
        if(d!="disabled"){
            if(inputs[i].value!=""){
                var dataX = inputs[i].getAttribute("data-x");
                //Valido que sea una letra
                if(/^[a-zA-Z]$/g.test(inputs[i].value)){
                    var encontre = false,
                    j = 0,              
                    //Busco la imagen superior al input para luego preguntar la letra que le corresponde
                    imagenes = principal.querySelectorAll(".cuadrado");
    
                    while(!encontre && j<imagenes.length){
                        if(dataX==imagenes[j].getAttribute("data-x")){
                            encontre = true;
                        }
                        j++;
                    }
    
                    if(encontre){    
                        j--;
                        var imagen = imagenes[j].querySelector("img"),                 
                        numeroImagen = imagen.getAttribute("imagen"),
    
                        //Recupero a que letra corresponde este numeroImagen
                        letraCorrecta = Criptograma.asignacion[numeroImagen];;
    
                        //Comparo letra correcta con la escrita por usuario
                        if(inputs[i].value.toUpperCase() == letraCorrecta){
                            alert("Respuesta correcta en la casilla "+dataX+"!");
                            //Bloquear input
                            inputs[i].setAttribute("disabled","disabled");
                            //Hacer visible letras
                            var letrasEscondidas = principal.querySelectorAll(".noDisplay");
                            for(var j=0; j<letrasEscondidas.length; j++){
                                if(letrasEscondidas[j].textContent.toUpperCase() == letraCorrecta){
                                    letrasEscondidas[j].classList.remove("noDisplay");
                                }
                            }
                        }else{
                            alert("Respuesta incorrecta en la casilla "+dataX+"!");
                            inputs[i].focus();   
                            //Sumar 1 en <pMal> 
                            var pMal = principal.querySelector(".pMal"),
                            pMalCuenta = pMal.textContent.split(" ");
                            pMalCuenta = pMalCuenta[pMalCuenta.length-1];
                            pMalCuenta = parseInt(pMalCuenta)+1;
                            pMal.innerHTML = "Intentos Incorrectos: "+pMalCuenta;
                        }
                    }
                }else{
                    alert("Ingrese una letra en la casilla "+dataX+"!");
                    inputs[i].focus();
                }
            }
        }
        i++;
    }

    //Gano?
    var letrasEscondidas = principal.querySelectorAll(".noDisplay");
    if(letrasEscondidas.length==0)
        alert("¡Ganaste!");
}