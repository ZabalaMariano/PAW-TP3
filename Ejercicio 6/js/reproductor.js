var window = window || {},
document = document || {},
console = console || {},
Reproductor = Reproductor || {},
principal = document.createElement("section");
principal.classList.add("principal");

Reproductor.armarReproductor = function (contenedor) 
{
    Reproductor.contenedor = contenedor;
    window.addEventListener("DOMContentLoaded", function () 
    {
        if (typeof Reproductor.contenedor === "string") {
            Reproductor.contenedor = document.getElementById(Reproductor.contenedor);
        }

        Reproductor.contenedor.appendChild(principal);

        var idVideo = 0;//Muestro el id=0 por default
        Reproductor.generarMenu(idVideo);
    });
}
    
Reproductor.generarMenu = function(idVideo){
    var videoElegido = Reproductor.videos.filter(n => n.id == idVideo)[0];    

    var section = document.createElement("section"),
    video = document.createElement("video"),
    pTitulo = document.createElement("p"),
    pReproducciones = document.createElement("p"),
    addressAutor = document.createElement("address"),
    imgAutor = document.createElement("img"),
    pNombreAutor = document.createElement("p"),
    fchPublicado = document.createElement("time");

    section.classList.add("videoPrincipal");
    video.setAttribute("src","../multimedia/videos/"+videoElegido.nombreVideo);//auto
    video.setAttribute("controls",true);
    pTitulo.classList.add("titulo");
    pTitulo.textContent = videoElegido.tituloVideo;//auto
    pReproducciones.classList.add("reproducciones");
    videoElegido.reproduccionesVideo+=1;
    pReproducciones.textContent = videoElegido.reproduccionesVideo + " visualizaciones";//auto
    addressAutor.classList.add("addressAutor");
    imgAutor.classList.add("imgAutor");
    imgAutor.setAttribute("src","../multimedia/img/"+videoElegido.imgAutor);//auto
    pNombreAutor.classList.add("nombreAutor");
    pNombreAutor.textContent = videoElegido.nombreAutor;//auto
    fchPublicado.setAttribute("datetime",videoElegido.datetime);//auto
    fchPublicado.textContent = videoElegido.fchPublicacion;//auto

    addressAutor.appendChild(imgAutor);
    addressAutor.appendChild(pNombreAutor);
    addressAutor.appendChild(fchPublicado);
    section.appendChild(video);
    section.appendChild(pTitulo);
    section.appendChild(pReproducciones);
    section.appendChild(addressAutor);
    principal.appendChild(section);

    var asideLista = document.createElement("aside"),
    lista = document.createElement("ul");

    asideLista.classList.add("listaReproduccion");
    lista.classList.add("lista");
    lista.addEventListener("click",Reproductor.seleccion);
    
    Reproductor.videos.forEach(n => {
        var videoLista = document.createElement("li"),
        imgVideoLista = document.createElement("img"),
        pTituloVideoLista = document.createElement("p"),
        pNombreAutorLista = document.createElement("p");

        videoLista.classList.add("liVideoLista");
        videoLista.setAttribute("id",n.id);
        imgVideoLista.classList.add("imgVideoLista");
        imgVideoLista.setAttribute("src","../multimedia/thumbnail/"+n.imgthumbnail);//auto
        pTituloVideoLista.classList.add("tituloVideoLista");
        pTituloVideoLista.textContent = n.tituloVideo;//auto
        pNombreAutorLista.classList.add("nombreAutorLista");
        pNombreAutorLista.textContent = n.nombreAutor;//auto

        if(n.id == idVideo){//Si es el video reproduciendose lo marco
            imgVideoLista.classList.add("imgVideoListaReproduciendose");
        }

        videoLista.appendChild(imgVideoLista);
        videoLista.appendChild(pTituloVideoLista);
        videoLista.appendChild(pNombreAutorLista);
        lista.appendChild(videoLista);
    });
      
    asideLista.appendChild(lista);
    principal.appendChild(asideLista);
}

Reproductor.seleccion = function(e){
    if(e.target.matches("li.liVideoLista")){

        var section = principal.querySelector(".videoPrincipal");
        var asideLista = principal.querySelector(".listaReproduccion");

        principal.removeChild(section);
        principal.removeChild(asideLista);
        
        Reproductor.generarMenu(e.target.id);
    }else if(e.target.matches("p.tituloVideoLista") || e.target.matches("p.nombreAutorLista") || e.target.matches("img.imgVideoLista")){
        var section = principal.querySelector(".videoPrincipal");
        var asideLista = principal.querySelector(".listaReproduccion");

        principal.removeChild(section);
        principal.removeChild(asideLista);
        
        Reproductor.generarMenu(e.target.parentNode.id);
    }
}     