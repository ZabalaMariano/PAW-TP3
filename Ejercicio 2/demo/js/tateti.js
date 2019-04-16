var window = window || {},
document = document || {},
console = console || {},
Juego = Juego || {},
cellSize = 100,
jugador = 1,
tabla = [0,0,0,
    0,0,0,
    0,0,0,],
ganador = false; // ******ADAPTARLA AL TAMAÑO ELEGIDO POR EL USER*********
mensaje = document.createElement("p"),//Creo paragraph 
canvas = document.createElement("canvas");//Creo canvas 

Juego.contenedor = "default";//Inicializo contenedor
Juego.nivelActual = 0;
Juego.armarJuego = function (contenedor) 
{
    Juego.contenedor = contenedor;
    window.addEventListener("DOMContentLoaded", function () 
    {
        if (typeof Juego.contenedor === "string") {
            Juego.contenedor = document.getElementById(Juego.contenedor);
        }
        Juego.contenedor.classList.add("tateti");//Le añado una clase

        canvas.classList.add("tatetiCanvas");//Le añado una clase
        Juego.contenedor.appendChild(canvas);//Inserto la estructura en el contenedor   
        Juego.context = canvas.getContext('2d');//Creo objeto de dibujo bidimensional

        canvas.width = 3 * cellSize;//Asigno ancho y alto de la tabla relativo al tamaño de celdas 
        canvas.height = 3 * cellSize;                               //****CAMBIAR 3 POR EL TAMAÑO QUE ELIGIO EL USER*****

        mensaje.classList.add("tatetiMensaje");//Le añado una clase
        Juego.contenedor.appendChild(mensaje);//Inserto la estructura en el contenedor

        Juego.crearTabla();
    });

    Juego.crearTabla = function()
    {
        Juego.context.strokeRect(0,0,canvas.width,canvas.height);//Defino rectangulo del tamaño del canvas
        dibujarLineas();
        dibujarCeldasElegidas();
        
        function dibujarLineas(){
            Juego.context.strokeStyle = '#ff3333';//Color lineas                   ****HACERLO EN CSS DESPUES****
            Juego.context.lineWidth = 5;//Ancho lineas                            ****HACERLO EN CSS DESPUES****

            //Tateti de 3x3
            for(var i=1; i<3; i++){//Lineas verticales                   ****CAMBIAR 3 POR EL NUMERO ELEGIDO POR EL USUARIO****
                Juego.context.beginPath();//Defino nueva fila
                Juego.context.moveTo(0,cellSize*i);//Comienzo
                Juego.context.lineTo(canvas.width,cellSize*i);//Fin
                Juego.context.stroke();//Dibujo linea

                Juego.context.beginPath();//Defino nueva columna
                Juego.context.moveTo(cellSize*i,0);//Comienzo
                Juego.context.lineTo(cellSize*i,canvas.height);//Fin
                Juego.context.stroke();//Dibujo linea
            }
        }

        function dibujarCeldasElegidas()
        {
            Juego.context.strokeStyle = '#ff3333';//Color lineas                   ****HACERLO EN CSS DESPUES****
            Juego.context.lineWidth = 5;//Ancho lineas                            ****HACERLO EN CSS DESPUES****

            for(var i=0; i<tabla.length; i++){
                var coordenadas = getCoordenadas(i);
                
                Juego.context.save();
                Juego.context.translate(coordenadas.x + cellSize / 2, coordenadas.y + cellSize / 2);//El centro de la celda
                if(tabla[i]==1){
                    dibujarX();
                }else if(tabla[i]==-1){
                    dibujarO();
                }
                Juego.context.restore();
            }
        }

        function dibujarX(){
            Juego.context.beginPath();
            Juego.context.moveTo(-cellSize/3,-cellSize/3);
            Juego.context.lineTo(cellSize/3,cellSize/3);
            Juego.context.moveTo(cellSize/3,-cellSize/3);
            Juego.context.lineTo(-cellSize/3,cellSize/3);
            Juego.context.stroke();
        }

        function dibujarO(){
            Juego.context.beginPath();
            Juego.context.arc(0,0,cellSize/3,0,Math.PI*2);
            Juego.context.stroke();
        }
     
        requestAnimationFrame(Juego.crearTabla);//Le decimos al browser que llame a crearTabla para actualizar el dibujo
    }

    function getCoordenadas(celda){
        var x = (celda % 3) * cellSize,
        y = Math.floor(celda / 3) * cellSize;

        return {
            'x': x,
            'y': y,
        };
    }

    canvas.addEventListener("click", function(event){
        x = event.pageX;
        y = event.pageY;
        
        var celda = Math.floor(x / cellSize) + Math.floor(y / cellSize) * 3;

        if(tabla[celda]==0){//Si eligio una celda vacia
            tabla[celda] = jugador;
            if (!ganador){//Si no hay ganador
                if(preguntoSiGano()){
                    mensaje.textContent = 'Gano el jugador ' + ((jugador==1)?'X':'O');
                    ganador = true;
                }
            }
            jugador = jugador*(-1);
        }

    });

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
        //Cuento 3 en Fila
        var contador = 0;
        for(var i=0;i<tabla.length;i++){
            if(i%3==0){//Reinicio la cuenta al cambiar de fila   ****CAMBIAR EL 3 POR LA DIMENSION ELEGIDA****
                contador = 0;
            }
            if(tabla[i]==jugador){
                contador++;
                if(contador==3){
                    return true;
                }
            }else{
                contador = 0;//Se corta la racha
            }
        }
        return false;
    }
        
    function ganoColumna(){
        //Cuento 3 en Columna
        var contador = 0;
        for(var i=0;i<3;i++){ //Identifico columna segun resto          ****CAMBIAR EL 3 POR LA DIMENSION ELEGIDA****
            contador = 0;
            for(var j=0;j<tabla.length;j++){
                if(j%3==i){//Estoy en la columna indicada por el for externo  ****CAMBIAR EL 3 POR LA DIMENSION ELEGIDA****
                    if(tabla[j]==jugador){
                        contador++;
                        if(contador==3){
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
        //Cuento 3 en diagonal
        var matriz = [],
        x = 0;
        for(var i=0; i<3; i++) {
            matriz[i] = [];
            for(var j=0; j<3; j++) {
                matriz[i][j] = tabla[x];
                x++;
            }
        }

        var contador = 0;
        for(i=0;i<3;i++){//Diagonal principal
            if(matriz[i][i]==jugador){
                contador++;
                if(contador==3){
                    return true;
                }
            }else{
                contador = 0;
            }
        }

        for(i=0;i<3;i++){//Diagonal inversa
            if(matriz[3-i-1][i]==jugador){
                contador++;
                if(contador==3){
                    return true;
                }
            }else{
                contador = 0;
            }
        }

        return false;
    }

}