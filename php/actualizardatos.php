<?php
include("conexion.php");


$usuario = $_POST['usuario'];
$nombre = $_POST['nombreape'];
$correo = $_POST['correo'];
$tel = $_POST['telefono'];
$direccion = $_POST['direccion'];

$sql="UPDATE `usuarios` SET `Nombreape`='$nombre',`Correo`='$correo',`Telefono`='$tel',`Direccion`='$direccion' WHERE usuario='$usuario'";
if ($con->query($sql) === TRUE) {
    echo "Reserva actualizada correctamente";
} else {
    echo "Error al actualizar la reserva: " . $con->error;
}




?>