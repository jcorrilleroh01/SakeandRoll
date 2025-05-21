<?php

include("conexion.php");


$usuario = $_POST['usuario'];
$contraseña = $_POST['contraseña'];
$fecha = $_POST['fecha'];

$sql = "SELECT idusuario, Contraseña FROM usuarios WHERE usuario = '$usuario'";
$resultado = $con->query($sql);

if ($resultado->num_rows === 0) {
    echo "Usuario no encontrado";
} else {
    $fila = $resultado->fetch_assoc();
    $hash_guardado = $fila['Contraseña'];
error_log("Contraseña guardada: " . $hash_guardado."Contraseña enviada".$contraseña); // Log para depuración
    if (password_verify($contraseña, $hash_guardado)) {
        echo "Bienvenido!";
        $idusuario = $fila['idusuario'];
        $sql_insert = "INSERT INTO logins (idusuario, fecha) VALUES ('$idusuario', '$fecha')";
        $con->query($sql_insert);
    } else {
        echo "Contraseña incorrecta";
    }
}

$con->close();
?>
