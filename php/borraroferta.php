<?php

include("conexion.php");


$puntos=$_POST['puntos'];
$nombre=$_POST['usuario'];
$plato=$_POST['plato'];

$sql_comprobar = "DELETE FROM canjeos WHERE idUsuario = (SELECT idusuario FROM usuarios WHERE usuario = '$nombre') AND idOferta = (SELECT idoferta FROM ofertas WHERE idPlato =(Select idPlato from carta where Plato='$plato') ) AND Estado='Canjeado'";
$resultado = $con->query($sql_comprobar);
$sql_actu="UPDATE puntos SET Puntos=Puntos+$puntos WHERE idUsuario = (SELECT idusuario FROM usuarios WHERE usuario = '$nombre')";
$resultado2 = $con->query($sql_actu);
if ($resultado->num_rows > 0) {
        $carta = 'ok';
    
}

echo json_encode($carta); 

$con->close();

?>
