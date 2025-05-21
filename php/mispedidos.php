<?php

include("conexion.php");

$sql_comprobar = "SELECT Idpedido,Monto,Fecha,entrega,notas,estado FROM pedidos where Idusuario = (SELECT Idusuario FROM usuarios where Usuario = '".$_POST['usuario']."') ORDER BY Idpedido DESC";
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
