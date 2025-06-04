<?php
include "conexion.php";

$id = $_POST['id'];
$fecha = $_POST['fecha'];
$hora = $_POST['hora'];
$personas = $_POST['personas'];
$mesa = $_POST['mesa'];
$usuario = $_POST['usuario'];

$sql = "UPDATE reservas SET 
          Fecha = '$fecha',
          Hora = '$hora',
          Npersonas = '$personas',
          Nmesa = '$mesa',
          Idusuario = '$usuario'
        WHERE Idreserva = $id";

$con->query($sql);
?>
