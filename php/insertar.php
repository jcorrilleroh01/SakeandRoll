<?php

include("conexion.php");

$usuario = $_POST['usuario'];
$contraseñaa = $_POST['contraseña'];
$contraseña = password_hash($contraseñaa, PASSWORD_DEFAULT);
$correo = $_POST['correo'];
$direccion = $_POST['direccion'];
$nombape = $_POST['nombre'];
$tlf = $_POST['tlf'];

$sql_comprobar = "SELECT * FROM `usuarios` WHERE `usuario` = '$usuario'";
$resultado = $con->query($sql_comprobar);

if ($resultado->num_rows > 0) {
    echo "El usuario ya existe con este usuario. Por favor, pruebe con otro.";
} else {
    $sql_insertar = "INSERT INTO `usuarios` (`usuario`, `contraseña`, `nombreape`,`correo`,`telefono`,`direccion` ) VALUES ('$usuario', '$contraseña', '$nombape', '$correo', '$tlf','$direccion')";
    $sql_puntos="INSERT INTO `puntos` (`idusuario`, `puntos`) VALUES ((SELECT idusuario FROM usuarios WHERE usuario='$usuario'), 0)";
    if (mysqli_query($con, $sql_insertar)) {
        echo "Registro exitoso!";
        mysqli_query($con, $sql_puntos);
        
    } else {
        echo "Error: " . $con->error;
    }
}

$con->close();
?>
