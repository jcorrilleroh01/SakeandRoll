<?php

include("conexion.php");


$nombre = $_POST['nombre'];
$puntos = $_POST['puntos']; 

$sql_comprobar = "SELECT Puntos FROM puntos WHERE Idusuario = (SELECT Idusuario FROM usuarios WHERE Usuario = '$nombre')";
$resultado = $con->query($sql_comprobar);

if ($resultado && $fila = $resultado->fetch_assoc()) {
    $nuevospuntos = $fila['Puntos'] + $puntos;
    $sql_update = "UPDATE puntos SET Puntos = $nuevospuntos WHERE Idusuario = (SELECT Idusuario FROM usuarios WHERE Usuario = '$nombre')";
    $resultado2 = $con->query($sql_update);
    echo json_encode($resultado2);
} else {
    echo json_encode(false);
}

$con->close();
?>
