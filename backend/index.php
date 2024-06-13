<?php
// Configuración de errores
ini_set('display_errors', 0);  // Desactiva la visualización de errores en la salida
ini_set('log_errors', 1);       // Activa la escritura de errores en un archivo de registro
ini_set('error_log', 'errores.log');  // Establece el archivo de registro de errores

// Configuración de conexión a la base de datos
$servername = "localhost";
$username = "papu";
$password = "1234";
$dbname = "papustore";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Función para consultar usuarios
function consultaProductos($conn) {
    
    // Consulta preparada
    $sql = "SELECT * FROM products";
    
    // Preparar la consulta
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        error_log("Error al preparar la consulta: " . $conn->error);
        return array();
    }

    // Ejecutar la consulta
    $stmt->execute();

    // Obtener el resultado de la consulta
    $res = $stmt->get_result();

    // Verificar si se encontraron resultados
    if ($res->num_rows > 0) {
        $usuarios = array();
        // Iterar sobre los resultados y almacenarlos en un array
        while ($row = $res->fetch_assoc()) {
            $productos[] = $row;
        }
        return $productos;
    } else {
        return array();
    }
}

function consultaProductosporID($conn, $id) {
    $id = (int)$id; // Asegurarse de que $id sea un entero

    // Consulta preparada
    $sql = "SELECT * FROM usuarios WHERE id = ?";
    
    // Preparar la consulta
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        error_log("Error al preparar la consulta: " . $conn->error);
        return array();
    }

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

// Manejo de solicitudes POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Leer los datos del cuerpo de la solicitud
    $data = file_get_contents('php://input');

    // Verificar si se recibieron datos
    if ($data !== false) {
        // Convertir los datos JSON en un objeto PHP
        $jsonData = json_decode($data);

        // Verificar si la decodificación fue exitosa y si functionName está definido
        if ($jsonData !== null && isset($jsonData->functionName)) {
            $functionName = $jsonData->functionName;
            $id = (int)$jsonData->id;

            // Ejecutar la función correspondiente
            switch ($functionName) {
                case 'consultaproductos':
                    $productos = consultaProductos($conn);
                    // Establecer el encabezado de respuesta como JSON
                    header('Content-Type: application/json');
                    // Imprimir los datos de los usuarios como JSON
                    echo json_encode($productos);
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

// Cerrar conexión
$conn->close();

