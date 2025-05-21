<?php
include("conexion.php");


$puntos = $_POST['puntos'];  
$nombre = $_POST['usuario'];  
$sql = "SELECT puntos FROM `puntos` INNER JOIN usuarios ON puntos.idusuario = usuarios.idusuario WHERE usuarios.usuario = '${nombre}'";
$resultado = $con->query($sql);

if ($resultado->num_rows > 0) {
    $row = $resultado->fetch_assoc();
    $puntos_usuario = $row['puntos'];

    if ($puntos_usuario >= $puntos) {
        $nuevos_puntos = $puntos_usuario - $puntos;
        $sql_update = "UPDATE `puntos` INNER JOIN usuarios ON puntos.idusuario = usuarios.idusuario 
                       SET puntos = '${nuevos_puntos}' WHERE usuarios.usuario = '${nombre}'";
        if ($con->query($sql_update) === TRUE) {
            echo "OK";
        } else {
            echo "ERRORACTUALIZAR";
        }
    } else {
        echo "ERRORPUNTOS";
    }
} else {
    echo "ERRORUSER";
}

$con->close(); 
?>
