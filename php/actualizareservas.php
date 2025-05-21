<?php
include("conexion.php");



$sql="UPDATE reservas SET Fecha = '".$_POST['fecha']."', Hora = '".$_POST['hora']."', Npersonas = '".$_POST['npersonas']."' WHERE Idreserva = '".$_POST['idreserva']."'";
if ($con->query($sql) === TRUE) {
    echo "Reserva actualizada correctamente";
} else {
    echo "Error al actualizar la reserva: " . $con->error;
}




?>