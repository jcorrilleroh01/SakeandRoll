<?php
include("conexion.php");


$nombre = $_POST['usuario'];
$puntos =$_POST['puntos'];
$fecha = $_POST['fecha'];
// Verificar si ya se ha logueado en esa fecha
$sql2 = "SELECT * FROM `logins` 
         WHERE idusuario = (SELECT idusuario FROM usuarios WHERE usuario='${nombre}') 
         AND fecha = '${fecha}' ";

$results2 = $con->query($sql2);
if ($results2->num_rows > 1) {

    echo "ERROR: Ya has iniciado sesión en esta fecha.";
    exit;
}else{





// Obtener puntos actuales del usuario
$sql = "SELECT puntos FROM `puntos` 
        INNER JOIN usuarios ON puntos.idusuario = usuarios.idusuario 
        WHERE usuarios.usuario = '${nombre}'";

$resultado = $con->query($sql);

if ($resultado->num_rows > 0) {
    $row = $resultado->fetch_assoc();
    $puntos_actuales = $row['puntos'];
    $nuevos_puntos = $puntos_actuales + $puntos;

    if ($nuevos_puntos < 0) {
        echo "ERROR: No puedes tener puntos negativos.";
    } else {
        $sql_update = "UPDATE `puntos` 
                       INNER JOIN usuarios ON puntos.idusuario = usuarios.idusuario 
                       SET puntos = '${nuevos_puntos}' 
                       WHERE usuarios.usuario = '${nombre}'";

        if ($con->query($sql_update) === TRUE) {
            echo "OK";  
        } else {
            echo "ERROR: No se pudo actualizar los puntos.";
        }
    }
} else {
    echo "ERROR: Usuario no encontrado.";
}
}
$con->close();
?>

