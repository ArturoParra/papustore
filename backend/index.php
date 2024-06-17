<?php
ini_set('display_errors', 0);  // Desactiva la visualización de errores en la salida
ini_set('log_errors', 1);       // Activa la escritura de errores en un archivo de registro
ini_set('error_log', 'errores.log');  // Establece el archivo de registro de errores

// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "papu";
$password = "1234";
$dbname = "papustore";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Función para consultar productos
function consultaProductos($conn)
{
    $sql = "SELECT * FROM products";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        error_log("Error al preparar la consulta: " . $conn->error);
        return array();
    }
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        $productos = array();
        while ($row = $res->fetch_assoc()) {
            $productos[] = $row;
        }
        return $productos;
    } else {
        return array();
    }
}

function consultaProductoIndividual($conn, $id)
{
    $sql = "SELECT * FROM products WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        return $res->fetch_assoc();
    } else {
        return null;
    }
}

function consultaImagenes($conn, $id)
{
    $sql = "SELECT url FROM images WHERE product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        $imagenes = array();
        while ($row = $res->fetch_assoc()) {
            $imagenes[] = $row;
        }
        return $imagenes;
    } else {
        return array();
    }
}

function consultarCarrito($conn)
{
    $sql = "SELECT * FROM shopping_cart";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        error_log("Error al preparar la consulta: " . $conn->error);
        return array();
    }
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        $productos = array();
        while ($row = $res->fetch_assoc()) {
            $productos[] = $row;
        }
        return $productos;
    } else {
        return array();
    }
}

function consultaUsuario($conn, $email)
{
    $sql = "SELECT * FROM user_login WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        return $res->fetch_assoc();
    } else {
        return null;
    }
}

function consultaAdministrador($conn, $adminuser)
{
    $sql = "SELECT * FROM user_administrator WHERE adminuser = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $adminuser);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        return $res->fetch_assoc();
    } else {
        return null;
    }
}

function registrarUsuario($conn, $data)
{
    $sql1 = "INSERT INTO user_data (email, first_name, last_name) VALUES (?, ?, ?)";
    $stmt1 = $conn->prepare($sql1);
    $stmt1->bind_param("sss", $data->email, $data->first_name, $data->last_name);

    $sql2 = "INSERT INTO user_login (email, password) VALUES (?, ?)";
    $stmt2 = $conn->prepare($sql2);
    $passwordHash = password_hash($data->password, PASSWORD_BCRYPT);
    $stmt2->bind_param("ss", $data->email, $passwordHash);

    $result1 = $stmt1->execute();
    $result2 = $stmt2->execute();

    if ($result1 && $result2) {
        return true;
    } else {
        error_log("Error al registrar usuario: " . $conn->error);
        return false;
    }
}

function addToCart($conn, $email, $product_id, $quantity)
{
    $stmt = $conn->prepare("INSERT INTO shopping_cart (email, product_id, quantity) VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)");
    $stmt->bind_param("sii", $email, $product_id, $quantity);
    if ($stmt->execute()) {
        return ["success" => true];
    } else {
        return ["success" => false, "message" => "Error al añadir el producto al carrito"];
    }
}

// Funcion para obtener los productos del carrito de un usuario y sus detalles
function consultaCarrito($conn, $email)
{
    $sql = "SELECT products.id, products.title, products.price, products.thumbnail, shopping_cart.quantity
            FROM shopping_cart
            JOIN products ON shopping_cart.product_id = products.id
            WHERE shopping_cart.email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        $productos = array();
        while ($row = $res->fetch_assoc()) {
            $productos[] = $row;
        }
        return $productos;
    } else {
        return array();
    }
}

// Funcion para eliminar un producto del carrito de un usuario
function eliminarProductoCarrito($conn, $email, $product_id) {
    $stmt = $conn->prepare("DELETE FROM shopping_cart WHERE email = ? AND product_id = ?");
    $stmt->bind_param("si", $email, $product_id);
    if ($stmt->execute()) {
        return ["success" => true];
    } else {
        return ["success" => false, "message" => "Error al eliminar el producto del carrito"];
    }
}

function getCartItems($conn, $email)
{
    $sql = "SELECT sc.product_id, sc.quantity, p.title, p.price, p.discountPercentage, p.thumbnail
        FROM shopping_cart sc
        INNER JOIN products p ON sc.product_id = p.id
        WHERE sc.email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $cartItems = [];
    while ($row = $result->fetch_assoc()) {
        $cartItems[] = $row;
    }
    return $cartItems;
}

// Nuevas funciones para el perfil del usuario y pedidos recientes

function consultaUsuarioData($conn, $email)
{
    $sql = "SELECT email, first_name, last_name, phone, email_secondary, purchases, papu_credits, country, state, zip, company, address, region, city FROM user_data WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        return $res->fetch_assoc();
    } else {
        return null;
    }
}

function consultaPedidosRecientes($conn, $email)
{
    $sql = "SELECT p.purchase_id AS id, p.date, p.total, COUNT(pd.product_id) AS products
            FROM purchase_history p
            JOIN purchase_details pd ON p.purchase_id = pd.purchase_id
            WHERE p.email = ?
            GROUP BY p.purchase_id, p.date, p.total
            ORDER BY p.date DESC
            LIMIT 10";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        $pedidos = array();
        while ($row = $res->fetch_assoc()) {
            $pedidos[] = [
                'id' => '#' . $row['id'],
                'date' => date('M d, Y H:i', strtotime($row['date'])),
                'total' => '$' . number_format($row['total'], 2) . ' (' . $row['products'] . ' Products)'
            ];
        }
        return $pedidos;
    } else {
        return array();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = file_get_contents('php://input');
    if ($data !== false) {
        $jsonData = json_decode($data);

        if ($jsonData !== null && isset($jsonData->functionName)) {
            $functionName = $jsonData->functionName;
            switch ($functionName) {
                case 'consultaProductos':
                    $productos = consultaProductos($conn);
                    header('Content-Type: application/json');
                    echo json_encode($productos);
                    break;
                case 'consultaUsuarios':
                    if (isset($jsonData->email, $jsonData->password)) {
                        $usuario = consultaUsuario($conn, $jsonData->email);
                        header('Content-Type: application/json');
                        if ($usuario && password_verify($jsonData->password, $usuario['password'])) {
                            echo json_encode(['success' => true]);
                        } else {
                            echo json_encode(['success' => false]);
                        }
                    }
                    break;
                case 'consultaUsuarioData':  // Caso para consultaUsuarioData
                    if (isset($jsonData->email)) {
                        $usuario = consultaUsuarioData($conn, $jsonData->email);
                        header('Content-Type: application/json');
                        echo json_encode($usuario);
                    }
                    break;
                case 'consultaPedidosRecientes':  // Caso para consultaPedidosRecientes
                    if (isset($jsonData->email)) {
                        $pedidos = consultaPedidosRecientes($conn, $jsonData->email);
                        header('Content-Type: application/json');
                        echo json_encode($pedidos);
                    }
                    break;
                case 'registro':
                    if (isset($jsonData->data)) {
                        $resultado = registrarUsuario($conn, $jsonData->data);
                        header('Content-Type: application/json');
                        echo json_encode(["success" => $resultado]);
                    }
                    break;
                case 'consultaAdministradores':
                    if (isset($jsonData->adminuser, $jsonData->password)) {
                        $admin = consultaAdministrador($conn, $jsonData->adminuser);
                        header('Content-Type: application/json');
                        if ($admin && $jsonData->password === $admin['password']) {
                            echo json_encode(['success' => true]);
                        } else {
                            echo json_encode(['success' => false]);
                        }
                    }
                    break;
                case 'insertarCarrito':
                    if (isset($jsonData->email, $jsonData->product_id, $jsonData->quantity)) {
                        $resultado = addToCart($conn, $jsonData->email, $jsonData->product_id, $jsonData->quantity);
                        header('Content-Type: application/json');
                        echo json_encode($resultado);
                    }
                    break;
                case 'consultaCarrito':
                    if (isset($jsonData->email)) {
                        $productos = consultaCarrito($conn, $jsonData->email);
                        header('Content-Type: application/json');
                        echo json_encode($productos);
                    }
                    break;
                case 'eliminarProductoCarrito':
                    if (isset($jsonData->email, $jsonData->product_id)) {
                        $resultado = eliminarProductoCarrito($conn, $jsonData->email, $jsonData->product_id);
                        header('Content-Type: application/json');
                        echo json_encode($resultado);
                    }
                    break;
                case 'consultaProductoIndividual':
                    if (isset($jsonData->id)) {
                        $productos = consultaProductoIndividual($conn, $jsonData->id);
                        header('Content-Type: application/json');
                        echo json_encode($productos);
                    }
                    break;
                case 'consultaImagenes':
                    if (isset($jsonData->id)) {
                        $productos = consultaImagenes($conn, $jsonData->id);
                        header('Content-Type: application/json');
                        echo json_encode($productos);
                    }
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
?>
