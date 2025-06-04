<?php
include "conexion.php";

if (isset($_POST['id'])) {
    $id = $_POST['id'];
        $con->query("DELETE FROM logins WHERE idusuario = $id");

    $con->query("DELETE FROM usuarios WHERE Idusuario = $id");
}
?>
