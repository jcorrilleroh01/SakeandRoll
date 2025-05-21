<?php

include("conexion.php");


$usuario = $_POST['usuario'];


$sql_comprobar = "SELECT  carta.tipo as tipo,carta.plato AS plato,carta.precio AS precio FROM carta INNER JOIN canjeos ON canjeos.IdPlato=carta.Idplato INNER JOIN usuarios ON usuarios.Idusuario=canjeos.IdUsuario WHERE usuarios.Usuario='$usuario' AND canjeos.Estado='Canjeado'";
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
