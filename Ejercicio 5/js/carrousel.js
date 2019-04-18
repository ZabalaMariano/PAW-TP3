var Carrousel = Carrousel || {},
    window = window || {},
    document = document || {},
    console = console || {};

Carrousel.contenedor = "vacio";


Carrousel.onLoadWindow = function (contenedor) {
  Carrousel.contenedor = contenedor;
  window.addEventListener("DOMContentLoaded", function () {
    if (typeof Carrousel.contenedor === "string") {
      Carrousel.contenedor = document.getElementById(Carrousel.contenedor);
    var section = document.createElement("section");
    section.classList.add("precarga");
    Carrousel.contenedor.appendChild(section);
    Carrousel.generate(section);
    }
  });
}


Carrousel.generate = function(section){
  var images = ["beach","glass","path","wall"],
      ext = ".jpeg",
      dir = "images/",

      img, divprimary, divcontent, input, label, divprev, divnext, divradios, span;
  divprimary  = document.createElement("div");
  divcontent  = document.createElement("div");
  divprev     = document.createElement("div");
  divnext     = document.createElement("div");
  divradios   = document.createElement("div");

  divprimary.classList.add("container-slider");
  divcontent.classList.add("slider-content");
  divprev.classList.add("prev-img");
  divnext.classList.add("next-img");
  divradios.classList.add("image-thumbs");

  divprimary.appendChild(divcontent);

  images.forEach(image => {
    img = document.createElement("img");
    img.setAttribute("src", dir + image + ext);
    img.classList.add("disabled-image");
    img.classList.add("responsive-image");


    divcontent.appendChild(img);
  });

  divcontent.firstChild.classList.remove("disabled-image");

  for(let i = 0 ; i < images.length; i++){
    label = document.createElement("label");
    input = document.createElement("input");
    span  = document.createElement("span");
    input.setAttribute("type","radio");
    input.setAttribute("image",i);

    label.appendChild(input);
    label.appendChild(span);
    divradios.appendChild(label);
  }

  divcontent.appendChild(divradios);
  divcontent.appendChild(divnext);
  divcontent.appendChild(divprev);

  section.appendChild(divprimary);

}
