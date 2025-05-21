<?php
include("conexion.php");

$contraseñactual = $_POST['contraseñactual'];
$contranueva = $_POST['nuevacontraseña'];
$usuario = $_POST['usuario'];

$sql = "SELECT contraseña FROM usuarios WHERE usuario='$usuario'";
$result = $con->query($sql);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $hashActual = $row['contraseña'];

    if (password_verify($contraseñactual, $hashActual)) {
        $contranueva2 = password_hash($contranueva, PASSWORD_DEFAULT);
        $sqlUpdate = "UPDATE usuarios SET contraseña='$contranueva2' WHERE usuario='$usuario'";
        
        if ($con->query($sqlUpdate) === TRUE) {
            echo "contraseña actualizada correctamente";
        } else {
            echo "Error al actualizar la contraseña: " . $con->error;
        }
    } else {
        echo "contraseña actual incorrecta";
    }
} else {
    echo "Usuario no encontrado";
}

$con->close();
?>
