<?php

include("conexion.php");

$usuario = $_POST['usuario'];
$sql_comprobar = "SELECT nombreape,correo,telefono,direccion FROM usuarios WHERE usuario='$usuario'";
$resultado = $con->query($sql_comprobar);

$carta = [];
if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $carta[] = $row;
    }
}

echo json_encode($carta); 

$con->close();

?>
