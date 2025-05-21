<?php

include("conexion.php");

$idpedido = $_POST['idpedido'];
$sql_comprobar = "SELECT carta.Plato as nombre, detallepedido.cantidad
FROM detallepedido
INNER JOIN carta ON detallepedido.idplato = carta.idplato
WHERE detallepedido.IdPedido = '${idpedido}'";


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
