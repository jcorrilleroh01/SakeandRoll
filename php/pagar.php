<?php
include("conexion.php");


$usuario = $_POST['nombre'];
$entrega = $_POST['entrega'];
$total = $_POST['total'];
$carrito = json_decode($_POST['carrito'], true); 
$notas = $_POST['notas'];
$fecha = $_POST['fecha'];
$ofertas = json_decode($_POST['ofertasAplicadas'], true);

foreach ($ofertas as $oferta) {
    $sqlupdate = "UPDATE canjeos SET estado='Completado' 
              WHERE idPlato = (SELECT idPlato FROM carta WHERE Plato = '".$oferta['plato']."') 
              AND idusuario = (SELECT idusuario FROM usuarios WHERE usuario = '$usuario')";
;
    $con->query($sqlupdate);
}

$resUsuario = $con->query("SELECT Idusuario FROM usuarios WHERE Usuario = '$usuario'");
if ($resUsuario && $resUsuario->num_rows > 0) {
    $id_usuario = $resUsuario->fetch_assoc()['Idusuario'];

    $resPedido = $con->query("INSERT INTO pedidos (Monto, Fecha, Idusuario, notas, entrega,estado) 
                               VALUES ('$total', '$fecha', '$id_usuario', '$notas', '$entrega','En preparacion')");
    if ($resPedido) {
        $id_pedido = $con->insert_id;

        foreach ($carrito as $item) {
            $nombre = $item['nombre'];
            $cantidad = $item['cantidad'];

            $resPlato = $con->query("SELECT IdPlato FROM carta WHERE Plato = '$nombre'");
            if ($resPlato && $resPlato->num_rows > 0) {
                $id_plato = $resPlato->fetch_assoc()['IdPlato'];

                $con->query("INSERT INTO detallepedido (IdPedido, TipoEntrega, idplato, cantidad) 
                              VALUES ($id_pedido, '$entrega', $id_plato, $cantidad)");
            }
        }

        echo json_encode("okey");
    } else {
        echo json_encode("error al insertar pedido");
    }
} else {
    echo json_encode("usuario no encontrado");
}




$con->close();
?>
