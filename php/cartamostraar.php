<?php

include("conexion.php");


$sql_comprobar = "SELECT * FROM carta";
$resultado = $con->query($sql_comprobar);

$carta = [];
if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $carta[] = $row;
    }
}

echo json_encode($carta); // Evita problemas con caracteres especiales

$con->close();

?>
