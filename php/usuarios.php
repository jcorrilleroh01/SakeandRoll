<?php

include("conexion.php");

$sql = "SELECT * FROM usuarios";
$resultado = $con->query($sql);

$usuarios = [];
if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $usuarios[] = [
            'id' => $row['Idusuario'],
            'usuario' => $row['Usuario'],
            'nombre' => $row['Nombreape'],
            'correo' => $row['Correo'],
            'telefono' => $row['Telefono'],
            'direccion' => $row['Direccion']
        ];
    }
}

echo json_encode($usuarios);

$con->close();

?>
