<?php
include("conexion.php");


$usuario = $_POST['usuario'];

$res2 = $con->query("SELECT idusuario FROM usuarios WHERE usuario = '$usuario'");
if (!$res2 || $res2->num_rows === 0) {
    echo json_encode(["error" => "Usuario no encontrado"]);
    exit;
}
$idusuario = $res2->fetch_assoc()['idusuario'];

$sql = "SELECT * FROM ofertas 
        WHERE idoferta NOT IN (SELECT idOferta FROM canjeos WHERE idUsuario = $idusuario AND Estado = 'Canjeado' OR Estado='Completado')";

$resultado = $con->query($sql);

if (!$resultado) {
    echo json_encode(["error" => "Error en la consulta: " . $con->error]);
} elseif ($resultado->num_rows === 0) {
    echo json_encode(["error" => "No hay ofertas disponibles"]);
} else {
    echo json_encode($resultado->fetch_all(MYSQLI_ASSOC));
}

$con->close();
?>
