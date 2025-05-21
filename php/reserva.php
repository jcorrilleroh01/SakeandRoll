<?php

include("conexion.php");


$fecha = $_POST['fecha'];
$hora = $_POST['hora'];
$sql_comprobar = "SELECT nmesa FROM `reservas` /*Pomgo un rango de 40minutos para que no se agolpen las reservas y ahay un intervalo de 30 minutos para comer*/
                  WHERE `fecha` = '$fecha' 
                  AND `hora` BETWEEN ADDTIME('$hora', '-00:40:00') AND ADDTIME('$hora', '00:40:00') ";
$resultado = $con->query($sql_comprobar);

$ocupadas = [];
if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $ocupadas[] = $row['nmesa'];
}
}
echo json_encode($ocupadas);


$con->close();
?>
