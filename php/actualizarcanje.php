<?php
include("conexion.php");

$usuario = $_POST['usuario'];
$desc = $_POST['texto'];
$fecha = $_POST['fecha'];
$res1 = $con->query("SELECT descuento FROM ofertas WHERE descripcion LIKE '%$desc%'");
if ($res1->num_rows === 0) {
    echo json_encode(["error" => "Oferta no encontrada1"]);
    exit;
}
$descuento = $res1->fetch_assoc()['descuento'];

$res2 = $con->query("SELECT idusuario FROM usuarios WHERE usuario = '$usuario'");
if ($res2->num_rows === 0) {
    echo json_encode(["error" => "Usuario no encontrado"]);
    exit;
}
$idusuario = $res2->fetch_assoc()['idusuario'];

$res3 = $con->query("SELECT idoferta FROM ofertas WHERE descripcion LIKE '%$desc%'");
if ($res3->num_rows === 0) {
    echo json_encode(["error" => "Oferta no encontrada2"]);
    exit;
}
$idoferta = $res3->fetch_assoc()['idoferta'];

$res4 = $con->query("SELECT idplato FROM ofertas WHERE descripcion LIKE '%$desc%'");
if ($res4->num_rows === 0) {
    echo json_encode(["error" => "Plato no encontrado"]);
    exit;
}
$idplato = $res4->fetch_assoc()['idplato'];

if ($idusuario && $idoferta) {
    $con->query("INSERT INTO `canjeos`( `IdUsuario`, `IdOferta`, `IdPlato`, `fecha_canjeo`, `Descuento`, `Estado`) 
                  VALUES ('$idusuario', '$idoferta', '$idplato', '$fecha', '$descuento', 'Canjeado')");
} else {
    echo json_encode(["error" => "ID de usuario o oferta no válidos"]);
    exit;
}

$res5 = $con->query("SELECT puntos FROM ofertas WHERE idoferta = '$idoferta'");
if ($res5->num_rows === 0) {
    echo json_encode(["error" => "Puntos no encontrados"]);
    exit;
}
$puntos = $res5->fetch_assoc()['puntos'];


$con->close();
?>
