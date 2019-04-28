var Carrousel = Carrousel || {},
    window = window || {},
    document = document || {},
    console = console || {};

Carrousel.contenedor = "vacio";
Carrousel.images = ["beach","glass","path","wall"];
Carrousel.animations = ["animation1","animation2","animation3"];

Carrousel.onLoadWindow = function (contenedor) {
  Carrousel.contenedor = contenedor;
  window.addEventListener("DOMContentLoaded", function () {
    if (typeof Carrousel.contenedor === "string") {
      Carrousel.contenedor = document.getElementById(Carrousel.contenedor);
    var section = document.createElement("section");
    Carrousel.contenedor.appendChild(section);
    Carrousel.generate(section);
    }
  });
}


Carrousel.generate = function(section){
  var ext = ".jpeg",
      dir = "images/",

      img, divprimary, divcontent, input, label, divprev, divnext, divradios;
  divprimary  = document.createElement("div");
  divcontent  = document.createElement("div");
  divprev     = document.createElement("div");
  divnext     = document.createElement("div");
  divradios   = document.createElement("div");

  divprimary.classList.add("container-slider");
  divcontent.classList.add("slider-content");
  divprev.classList.add("prev-img");

  divprev.addEventListener("click",Carrousel.prev);
  divnext.classList.add("next-img");

  divnext.addEventListener("click",Carrousel.next);
  divradios.classList.add("buttons");

  divprimary.appendChild(divcontent);

  for(let i = 0; i< Carrousel.images.length; i++){
    img = document.createElement("img");
    img.setAttribute("src", dir + Carrousel.images[i] + ext);
    img.classList.add("disabled-image");
    img.classList.add("responsive-image");
    img.classList.add("precarga");
    img.setAttribute("img-number",i);


    divcontent.appendChild(img);
  }

  divcontent.firstChild.classList.remove("disabled-image");
  divcontent.firstChild.classList.add("current");

  for(let i = 0 ; i < Carrousel.images.length; i++){
    label = document.createElement("label");
    input = document.createElement("input");

    input.setAttribute("type","radio");
    input.setAttribute("img-number",i);

    input.addEventListener("click",Carrousel.buttonCheck);

    label.classList.add("button-container");

    label.appendChild(input);
    divradios.appendChild(label);
  }

  divcontent.appendChild(divradios);
  divcontent.appendChild(divnext);
  divcontent.appendChild(divprev);

  section.appendChild(divprimary);

}

/*CUENTA ADELANTE CON EL MOD*/
Carrousel.next = function(e){

  let img = document.querySelector("div.slider-content img.current");
  let images = Carrousel.images.length ;
  let current = parseInt(img.getAttribute("img-number")) +1 ;
  let nextImg = current % images;

  let next = document.querySelector("div.slider-content img[img-number='"+nextImg+"']");

  img.classList.remove("current");
  img.classList.add("disabled-image");
  next.classList.remove("disabled-image");
  next.classList.add("current");
  Carrousel.insertAnimation(next);
}

Carrousel.insertAnimation = function(element){

Carrousel.animations.forEach( a => element.classList.remove(a));
console.log(parseInt(Math.random() * Carrousel.animations.length));
  element.classList.add(Carrousel.animations[parseInt(Math.random() * Carrousel.animations.length)]);

}

/*CUENTA ATRAS CON MOD*/
Carrousel.prev = function(e){

  let img = document.querySelector("div.slider-content img.current");
  let images = Carrousel.images.length ;
  let current = parseInt(img.getAttribute("img-number")) + images -1 ;
  let prevImg = current % images;

  let prev = document.querySelector("div.slider-content img[img-number='"+prevImg+"']");

  img.classList.remove("current");
  img.classList.add("disabled-image");
  prev.classList.remove("disabled-image");
  prev.classList.add("current");
  Carrousel.insertAnimation(prev);
}


/*LOGICA PARA LOS BOTONES*/
Carrousel.buttonCheck = function(e){
  let input = e.target;
  if(input.getAttribute("checked") != true){
    input.setAttribute("checked",true);
    let img = input.getAttribute("img-number");
    let imgC = document.querySelector("div.slider-content img.current");
    let jump = document.querySelector("div.slider-content img[img-number='"+img+"']");
    imgC.classList.remove("current");
    imgC.classList.add("disabled-image");
    jump.classList.remove("disabled-image");
    jump.classList.add("current");

    Carrousel.insertAnimation(jump);
    Carrousel.setUncheckedElse(img);
  }
}
/*LOGICA PAR BOTONES*/
Carrousel.setUncheckedElse = function (current){

  let inputs = Array.prototype.slice.call(document.querySelectorAll(".button-container input[type='radio']"));

  console.log(inputs);
  inputs.forEach( i => {if(i.getAttribute("img-number")!= current) i.setAttribute("checked",false);});
}
