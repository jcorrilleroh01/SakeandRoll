<?php

include("conexion.php");

$usuario = $_POST['usuario'];
$fecha = $_POST['fecha'];
$hora = $_POST['hora'];
$personas = $_POST['personas'];
$nmesa = $_POST['nmesa'];

if (empty($usuario)) {
    die("El usuario no está definido.");
}

$sql1 = "SELECT `Idusuario` FROM `usuarios` WHERE `usuario` = '$usuario'";
$resultado1 = $con->query($sql1);

if (!$resultado1) {
    die("Error en la consulta: " . $con->error);
}

$row = $resultado1->fetch_assoc();
$idusuario = $row['Idusuario'];

$sql3 = "SELECT COUNT(*) AS total FROM reservas WHERE fecha='$fecha' AND idusuario='$idusuario'";
$resultado3 = $con->query($sql3);

if (!$resultado3) {
    die("Error en la consulta: " . $con->error);
}

$row3 = $resultado3->fetch_assoc();
if ($row3['total'] >= 2) {
    echo "Ya tienes 2 reservas para esta fecha";
    exit();
}

$sql = "INSERT INTO `reservas`(`Hora`, `Fecha`, `Npersonas`, `Nmesa`, `Idusuario`)
        VALUES ('$hora', '$fecha', '$personas', '$nmesa', '$idusuario')";

$resultado = $con->query($sql);

if (!$resultado) {
    die("Error al insertar la reserva: " . $con->error);
}

echo "ok";

$con->close();
?>
