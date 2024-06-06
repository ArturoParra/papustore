<?php
ini_set('display_errors', 0);  // Desactiva la visualización de errores en la salida
ini_set('log_errors', 1);       // Activa la escritura de errores en un archivo de registro
ini_set('error_log', 'errores.log');  // Establece el archivo de registro de errores


$servername = "localhost";
$username = "papu";
$password = "1234";
$dbname = "papustore";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

function consultaUsuarios($conn, $id) {

    $id = (int)$id;

    // Consulta preparada con un marcador de posición (?)
    $sql = "SELECT * FROM usuarios WHERE id = ?";
    
    // Preparar la consulta
    $stmt = $conn->prepare($sql);

    // Vincular el valor de la variable $id al marcador de posición
    $stmt->bind_param("i", $id); // "i" indica que se espera un valor entero

    // Ejecutar la consulta
    $stmt->execute();

    // Obtener el resultado de la consulta
    $res = $stmt->get_result();

    // Verificar si se encontraron resultados
    if ($res->num_rows > 0) {
        $usuarios = array();
        // Iterar sobre los resultados y almacenarlos en un array
        while ($row = $res->fetch_assoc()) {
            $usuarios[] = $row;
        }
        return $usuarios;
    } else {
        return array();
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Leer los datos del cuerpo de la solicitud
    $data = file_get_contents('php://input');

    // Verificar si se recibieron datos
    if ($data !== false) {
        // Convertir los datos JSON en un objeto PHP
        $jsonData = json_decode($data);

        // Verificar si la decodificación fue exitosa y si functionName está definido
        if ($jsonData !== null && isset($jsonData->functionName) && isset($jsonData->id)) {
            $functionName = $jsonData->functionName;
            $id = (int)$jsonData->id;

            // Ejecutar la función correspondiente
            switch ($functionName) {
                case 'consulta':
                    $usuarios = consultaUsuarios($conn,$id);
                    // Establecer el encabezado de respuesta como JSON
                    header('Content-Type: application/json');
                    // Imprimir los datos de los usuarios como JSON
                    echo json_encode($usuarios);
                    break;
                default:
                error_log("Función no válida");
            }
        } else {
            error_log("Error: No se recibió functionName o el JSON es inválido");
        }
    } else {
        error_log("No se recibieron datos en el cuerpo de la solicitud");
    }
} else {
    error_log("Esta página solo acepta solicitudes POST");
}

$conn->close();
