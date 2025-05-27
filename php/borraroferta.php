<?php
include("conexion.php");

$nombre = $_POST['usuario'];
$plato = $_POST['plato'];

$sql_puntos = "SELECT o.Puntos 
               FROM ofertas o 
               JOIN carta c ON o.idPlato = c.idPlato 
               WHERE c.Plato = '$plato'";
$resultado_puntos = $con->query($sql_puntos);

if ($fila = $resultado_puntos->fetch_assoc()) {
    $puntos = $fila['Puntos'];

    $sql_comprobar = "DELETE FROM canjeos 
                      WHERE idUsuario = (SELECT idusuario FROM usuarios WHERE usuario = '$nombre') 
                      AND idOferta = (SELECT idoferta FROM ofertas WHERE idPlato = (SELECT idPlato FROM carta WHERE Plato = '$plato')) 
                      AND Estado = 'Canjeado'";
    $resultado = $con->query($sql_comprobar);

    $sql_actu = "UPDATE puntos 
                 SET Puntos = Puntos + $puntos 
                 WHERE idUsuario = (SELECT idusuario FROM usuarios WHERE usuario = '$nombre')";
    $resultado2 = $con->query($sql_actu);

    if ($resultado && $resultado2) {
        $carta = 'ok';
    } else {
        $carta = 'error';
    }
} else {
    $carta = 'sin_oferta';
}

echo json_encode($carta);

$con->close();
?>
