<?php

include("conexion.php");

$nombre = $_POST['plato'];
$sql_comprobar = "SELECT Precio,Idplato FROM carta where Plato='$nombre'";
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
