<?php

$distintos = $_POST['nombreX'] != $_POST['nombreO'];

if($distintos){
    require 'controllers/punto2TaTeTi.php';
}else{
    $error = 'Los nombres deben ser distintos!';
    require 'controllers/punto2.php';
}
?>