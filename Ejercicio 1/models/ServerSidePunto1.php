<?php

$fallo=array();

if(isset($_POST["Enviar"])){//Si apretamos el boton Enviar
    
    //Si la validacion del servidor falla, escribo los datos ingresados por el cliente 
    //para que estos no esten vacios.
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $edad = $_POST['edad'];
    $talla = $_POST['talla'];
    $altura = $_POST['altura'];
    $fechaNacimiento = $_POST['fechaNacimiento'];
    $pelo = $_POST['pelo'];
    $fechaTurno = $_POST['fechaTurno'];
    $turno = $_POST['turno'];

    validarCampos();
    if($fallo){
        require 'controllers/punto1.php';//Fallo algun valor
    }else{
        require 'controllers/punto1.validado.php';//Todos los datos validos
    }
}

function validarCampos(){
    validarCamposObligatorios();
    validarTelefono();
    validarNombre();
    validarEmail();
    validarNumero();
    validarFechaNacimiento();
    validarPelo();
    validarFechaTurno();    
    validarTurno();
}

function validarCamposObligatorios(){
    if(
        ($_POST["nombre"] == "") ||
        ($_POST["email"] == "") ||
        ($_POST["telefono"] == "") ||
        ($_POST["fechaNacimiento"] == "") ||
        ($_POST["fechaTurno"] == "") 
    ){
        array_push($GLOBALS['fallo'],"Falta completar campos obligatorios*");
    }
}

function validarTelefono(){
    if (strlen($GLOBALS['telefono'])>13) {
        $GLOBALS['errores'][] = 'Fallo el teléfono';
    }elseif (!preg_match("/^([0-9\+][0-9]+)$/",$GLOBALS['telefono'])) {
        $GLOBALS['errores'][] = 'Fallo el teléfono';
    }
}

function validarNumero(){
    if (!filter_var($_POST["edad"], FILTER_VALIDATE_INT, array("options" => array("min_range"=>0, "max_range"=>150)))) {
        array_push($GLOBALS['fallo'],"Fallo la edad ingresada");
    }
    if (!filter_var($_POST["talla"], FILTER_VALIDATE_INT, array("options" => array("min_range"=>20, "max_range"=>45)))) {
        array_push($GLOBALS['fallo'],"Fallo la talla ingresada");
    }
    if (!filter_var($_POST["altura"], FILTER_VALIDATE_INT, array("options" => array("min_range"=>0, "max_range"=>250)))) {
        array_push($GLOBALS['fallo'],"Fallo la altura ingresada");
    }
}

function validarEmail(){
    if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        array_push($GLOBALS['fallo'],"Fallo el email ingresado");
    }
}

function validarNombre(){
    if(!preg_match("/^([a-zA-Z ]+)$/",$_POST["nombre"])){
        array_push($GLOBALS['fallo'],"Fallo el nombre ingresado");
    }
}

function validarPelo(){
    if(!
        (($_POST["pelo"] == "negro") ||
        ($_POST["pelo"] == "rubio") ||
        ($_POST["pelo"] == "castaño") ||
        ($_POST["pelo"] == "colorado") ||
        ($_POST["pelo"] == "gris") ||
        ($_POST["pelo"] == "noTienePelo") ||
        ($_POST["pelo"] == "otroColor"))
    ){
        array_push($GLOBALS['fallo'],"Fallo el color de pelo ingresado");
    }
}

function validarTurno(){
    if((!preg_match("/^(0[8-9]|1[0-6]):(00|15|30|45)$/",$GLOBALS['horario_turno'])) &&
       (!preg_match("/^(17):(00)$/",$GLOBALS['horario_turno']))){
        $GLOBALS['errores'][] = 'Fallo el horario del turno';
    }
}

function validarFechaNacimiento(){
    if(!preg_match("/^([0-9][0-9][0-9][0-9])-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1])$/",$_POST["fechaNacimiento"])){//Formato yyyy-mm-dd
        array_push($GLOBALS['fallo'],"Fallo la fecha de nacimiento ingresada");
    }else{//Si cumple el formato--> que sea menor o igual al dia de hoy
        $arrayFecha = explode("-", $_POST["fechaNacimiento"]);
        if($arrayFecha['0']>date("Y")){
            array_push($GLOBALS['fallo'],"Fallo la fecha de nacimiento ingresada");
        }elseif($arrayFecha['0']==date("Y")){
            if($arrayFecha['1']>date("m")){
                array_push($GLOBALS['fallo'],"Fallo la fecha de nacimiento ingresada");
            }elseif($arrayFecha['1']==date("m")){
                if($arrayFecha['2']>date("d")){
                    array_push($GLOBALS['fallo'],"Fallo la fecha de nacimiento ingresada");
                }
            }
        }
    }
}

function validarFechaTurno(){
    if(!preg_match("/^([0-9][0-9][0-9][0-9])-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1])$/",$_POST["fechaTurno"])){//Formato yyyy-mm-dd
        array_push($GLOBALS['fallo'],"Fallo la fecha del turno ingresada");
    }else{//Si cumple el formato--> que sea mayor o igual al dia de hoy
        $arrayFecha = explode("-", $_POST["fechaTurno"]);
        if($arrayFecha['0']<date("Y")){
            array_push($GLOBALS['fallo'],"Fallo la fecha del turno ingresado");
        }elseif($arrayFecha['0']==date("Y")){
            if($arrayFecha['1']<date("m")){
                array_push($GLOBALS['fallo'],"Fallo la fecha del turno ingresado");
            }elseif($arrayFecha['1']==date("m")){
                if($arrayFecha['2']<date("d")){
                    array_push($GLOBALS['fallo'],"Fallo la fecha del turno ingresado");
                }
            }
        }
    }
}
?>