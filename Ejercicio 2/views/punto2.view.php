<!DOCTYPE html>
<html lang="es">
<head>
    <title><?= $title ?></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="<?= statics('main.css') ?>" rel="stylesheet" type="text/css">
    <link href="<?= statics('punto1.css') ?>" rel="stylesheet" type="text/css">
</head>
<body class="body">
     <?php 
        require 'nav.view.php';
     ?>
    <h1><?= $main_title ?></h1>

    <section class="seccionPrincipal">
        <h2>Ingrese los nombres de los jugadores</h2>

        <?php 
            echo '<p>'.$error.'</p>';
        ?>

        <form name="formulario" method="post" action="Punto2Validador">
            <label for="nombreX">Nombre jugador X: </label>
            <input type="text" name="nombreX" maxlength="50" pattern="[A-Za-z\s]+" title="Solo letras y espacios" required>

            <label for="nombreO">Nombre jugador O: </label>
            <input type="text" name="nombreO" maxlength="50" pattern="[A-Za-z\s]+" title="Solo letras y espacios" required>

            <label for="dimension">Elija el tamaño de la tabla: </label>
            <select id="dimension" name="dimension">
                <option value="3">3x3</option>
                <option value="4">4x4</option>
                <option value="5">5x5</option>
                <option value="6">6x6</option>
            </select>

            <input class="boton" type="submit" value="Enviar" name="Enviar">
            <input type="reset" value="Limpiar">
        </form>
    </section>    
</body>
</html>