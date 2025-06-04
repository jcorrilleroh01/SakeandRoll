<?php

include("conexion.php");

$sql_comprobar = "SELECT * FROM reservas";
$resultado = $con->query($sql_comprobar);

$carta = [];
if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $reservas[] = [
    'id' => $row['Idreserva'],
  'fecha' => $row['Fecha'],
  'hora' => $row['Hora'],
  'personas' => $row['Npersonas'],
  'mesa' => $row['Nmesa'],
  'usuario' => $row['Idusuario']
];
    }
}

echo json_encode($reservas); 

$con->close();

?>
