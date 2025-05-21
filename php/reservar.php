<?php

include("conexion.php");


$usuario = $_POST['usuario'];
$fecha = $_POST['fecha'];
$hora = $_POST['hora'];
$personas = $_POST['personas'];
$nmesa = $_POST['nmesa'];

// Verifica si el parámetro 'usuario' está siendo enviado
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

    $sql3="SELECT * FROM reservas WHERE fecha='$fecha' AND idusuario='$idusuario'" ;
    $resultado3 = $con->query($sql3);

if($resultado3->num_rows > 0){
    echo "Ya tienes una reserva para esta fecha";
    exit();
}else{
    echo "ok";
    $sql = "INSERT INTO `reservas`(`Hora`, `Fecha`, `Npersonas`, `Nmesa`, `Idusuario`)
            VALUES ('$hora', '$fecha', '$personas', '$nmesa', '$idusuario')";


    $resultado = $con->query($sql);

    if (!$resultado) {
        die("Error en la consulta: " . $con->error);
    }

}
    

$con->close();
?>
