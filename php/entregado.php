<?php

include("conexion.php");

$sql_comprobar = "UPDATE pedidos SET estado='Entregado' 
WHERE Idpedido = (
    SELECT Idpedido FROM (
        SELECT Idpedido FROM pedidos 
        WHERE Idusuario = (
            SELECT Idusuario FROM usuarios WHERE Usuario = '".$_POST['usuario']."'
        ) AND estado='En preparacion' 
        LIMIT 1
    ) AS temp
)";
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
