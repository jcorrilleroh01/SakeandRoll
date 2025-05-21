<?php
include("conexion.php");

$resultados = [];
$usuario = $_POST['usuario'];

$sql1 = "SELECT carta.Plato, SUM(cantidad) AS total_pedidos
         FROM pedidos
         INNER JOIN detallepedido ON pedidos.Idpedido=detallepedido.IdPedido
         INNER JOIN carta ON detallepedido.idplato=carta.Idplato
         WHERE pedidos.Idusuario=(SELECT Idusuario FROM usuarios WHERE Usuario='$usuario')
         GROUP BY carta.Plato
         ORDER BY total_pedidos DESC
         LIMIT 1";
$r1 = $con->query($sql1);
$resultados['plato_mas_pedido'] = ($r1 && $r1->num_rows > 0) ? $r1->fetch_assoc() : null;

$sql2 = "SELECT fecha 
         FROM logins 
         WHERE idusuario=(SELECT Idusuario FROM usuarios WHERE usuario='$usuario')
         ORDER BY fecha ASC 
         LIMIT 1";
$r2 = $con->query($sql2);
$resultados['primer_login'] = ($r2 && $r2->num_rows > 0) ? $r2->fetch_assoc()['fecha'] : null;

$sql3 = "SELECT fecha 
         FROM pedidos 
         WHERE idusuario=(SELECT idusuario FROM usuarios WHERE usuario='$usuario') 
         ORDER BY fecha DESC 
         LIMIT 1";
$r3 = $con->query($sql3);
$resultados['ultimo_pedido'] = ($r3 && $r3->num_rows > 0) ? $r3->fetch_assoc()['fecha'] : null;

$sql4 = "SELECT COUNT(idpedido) AS total 
         FROM pedidos
         WHERE idusuario=(SELECT idusuario FROM usuarios WHERE usuario='$usuario')";
$r4 = $con->query($sql4);
$resultados['total_pedidos'] = ($r4 && $r4->num_rows > 0) ? $r4->fetch_assoc()['total'] : 0;

header('Content-Type: application/json');
echo json_encode($resultados);
?>

