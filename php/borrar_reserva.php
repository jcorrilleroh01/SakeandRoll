<?php
include "conexion.php";

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $con->query("DELETE FROM reservas WHERE Idreserva = $id");
}
?>
