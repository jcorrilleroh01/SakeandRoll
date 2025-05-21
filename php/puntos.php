<?php

include("conexion.php");

$usuario = $_POST['usuario'];
$sql = "SELECT puntos FROM `puntos` where idusuario = (SELECT idusuario FROM usuarios WHERE usuario='$usuario')";
$resultado = $con->query($sql);

if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        echo $fila['puntos'] . "💴<br>";
    }
} else {
    echo "No se encontraron resultados.";
}

$con->close();
?>
