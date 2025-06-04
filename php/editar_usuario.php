<?php
include "conexion.php"; // o el archivo que uses para conectar

$id = $_POST['id'];
$usuario = $_POST['usuario'];
$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$telefono = $_POST['telefono'];
$direccion = $_POST['direccion'];
error_log("id: $id,usuario: $usuario, nombre: $nombre, correo: $correo, telefono: $telefono, direccion: $direccion");
$sql = "UPDATE usuarios SET 
          Usuario = '$usuario',
          nombreape = '$nombre',
          Correo = '$correo',
          Telefono = '$telefono',
          Direccion = '$direccion'
        WHERE Idusuario = $id";

$con->query($sql);
?>
