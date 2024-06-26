<?php

/**
 * Sets the configuration options for error handling.
 * 
 * This code snippet sets the following configuration options:
 * - display_errors: Sets the value to 0, which disables the display of errors on the screen.
 * - log_errors: Sets the value to 1, which enables the logging of errors.
 * - error_log: Sets the path to the error log file, 'errores.log'.
 * 
 * @see https://www.php.net/manual/en/errorfunc.configuration.php
 */
ini_set('display_errors', 0); 
ini_set('log_errors', 1);
ini_set('error_log', 'errores.log');

/**
 * Set the necessary headers for Cross-Origin Resource Sharing (CORS).
 *
 * This code sets the Access-Control-Allow-Origin, Access-Control-Allow-Methods, and Access-Control-Allow-Headers headers
 * to allow cross-origin requests from any origin, with the specified methods (POST, GET, OPTIONS), and with the specified
 * headers (Content-Type, Authorization).
 *
 * @param string $origin The origin from which the request is being made. Use "*" to allow requests from any origin.
 * @param array $methods The allowed HTTP methods for the request. Defaults to ["POST", "GET", "OPTIONS"].
 * @param array $headers The allowed headers for the request. Defaults to ["Content-Type", "Authorization"].
 * @return void
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

/**
 * This file contains the configuration settings for connecting to the database.
 */

$servername = "localhost";  // The name of the server where the database is hosted.
$username = "papu";         // The username used to connect to the database.
$password = "1234";         // The password used to connect to the database.
$dbname = "papustore";      // The name of the database to connect to.

/**
 * Creates a new MySQLi connection object.
 *
 * @param string $servername The name of the server to connect to.
 * @param string $username The username to use for the connection.
 * @param string $password The password to use for the connection.
 * @param string $dbname The name of the database to connect to.
 *
 * @return mysqli|false Returns a new MySQLi connection object on success, or false on failure.
 */
$conn = new mysqli($servername, $username, $password, $dbname);

/**
 * Checks if there is a connection error with the database.
 * If there is a connection error, it terminates the script and displays an error message.
 *
 * @param object $conn The database connection object.
 * @return void
 */
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}


/**
 * Retrieves all products from the database.
 *
 * @param mysqli $conn The database connection object.
 * @return array An array of products retrieved from the database.
 */
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

/**
 * Retrieves an individual product from the database based on its ID.
 *
 * @param mysqli $conn The database connection object.
 * @param string $id The ID of the product to retrieve.
 * @return array|null The associative array representing the product, or null if not found.
 */
function consultaProductoIndividual($conn, $id, $flag)
{
    $sql = "SELECT * FROM products WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($flag) {
        if ($res->num_rows > 0) {
            $productos = array();
            while ($row = $res->fetch_assoc()) {
                $productos[] = $row;
            }
            return $productos;
        } else {
            return array();
        }
    } else {
        if ($res->num_rows > 0) {
            return $res->fetch_assoc();
        } else {
            return null;
        }
    }
}

/**
 * Retrieves the URLs of images associated with a product.
 *
 * @param mysqli $conn The database connection object.
 * @param string $id The product ID.
 * @return array An array of image URLs.
 */
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

/**
 * Retrieves the products in the shopping cart.
 *
 * @param mysqli $conn The database connection object.
 * @return array An array of products in the shopping cart.
 */
//! Esta función creo que no se usa
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

/**
 * Retrieves user information based on email.
 *
 * @param mysqli $conn The database connection object.
 * @param string $email The user's email.
 * @return array|null User information if found, null otherwise.
 */
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

/**
 * Retrieves administrator information based on admin username.
 *
 * @param mysqli $conn The database connection object.
 * @param string $adminuser The administrator's username.
 * @return array|null Administrator information if found, null otherwise.
 */
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

/**
 * Registers a new user.
 *
 * @param mysqli $conn The database connection object.
 * @param object $data The user data object containing email, first name, last name, and password.
 * @return bool True if registration is successful, false otherwise.
 */
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

/**
 * Adds a product to the shopping cart.
 *
 * @param mysqli $conn The database connection object.
 * @param string $email The user's email.
 * @param int $product_id The product ID.
 * @param int $quantity The quantity of the product.
 * @return array An array with success status and optional error message.
 */
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

/**
 * Retrieves the products in the shopping cart for a user and their details.
 *
 * @param mysqli $conn The database connection object.
 * @param string $email The user's email.
 * @return array An array of products in the shopping cart with their details.
 */
function consultaCarrito($conn, $email)
{
    $sql = "SELECT products.id, products.title, products.priceWithDiscount, products.thumbnail, shopping_cart.quantity
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

/**
 * Removes a product from the shopping cart for a given user.
 *
 * @param mysqli $conn The database connection object.
 * @param string $email The email of the user.
 * @param int $product_id The ID of the product to be removed.
 * @return array An associative array with the result of the operation. If the product is successfully removed, the array will contain ["success" => true]. If there is an error, the array will contain ["success" => false, "message" => "Error al eliminar el producto del carrito"].
 */
function eliminarProductoCarrito($conn, $email, $product_id)
{
    $stmt = $conn->prepare("DELETE FROM shopping_cart WHERE email = ? AND product_id = ?");
    $stmt->bind_param("si", $email, $product_id);
    if ($stmt->execute()) {
        return ["success" => true];
    } else {
        return ["success" => false, "message" => "Error al eliminar el producto del carrito"];
    }
}

/**
 * Verifies if a product exists in the user's wishlist.
 *
 * @param mysqli $conn The database connection object.
 * @param string $email The user's email.
 * @param int $product_id The ID of the product to check.
 * @return bool Returns true if the product exists in the wishlist, false otherwise.
 */
function verificarProductoWishlist($conn, $email, $product_id)
{
    $stmt = $conn->prepare("SELECT * FROM wishlist WHERE email = ? AND product_id = ?");
    $stmt->bind_param("si", $email, $product_id);
    $stmt->execute();
    $res = $stmt->get_result();
    return $res->num_rows > 0;
}

/**
 * Adds a product to the wishlist for a given email.
 *
 * @param mysqli $conn The database connection object.
 * @param string $email The email of the user.
 * @param int $product_id The ID of the product to add to the wishlist.
 * @return array An associative array with the following keys:
 *               - success: A boolean indicating if the product was successfully added to the wishlist.
 *               - message: A string containing an error message if the product was not added successfully.
 */
function addToWishlist($conn, $email, $product_id)
{
    $stmt = $conn->prepare("INSERT INTO wishlist (email, product_id) VALUES (?, ?)");
    $stmt->bind_param("si", $email, $product_id);
    if ($stmt->execute()) {
        return ["success" => true];
    } else {
        return ["success" => false, "message" => "Error al añadir el producto a la lista de deseos"];
    }
}

/**
 * Retrieves the wishlist items for a given email from the database.
 *
 * @param mysqli $conn The database connection object.
 * @param string $email The email of the user.
 * @return array The wishlist items as an array of associative arrays.
 */
function consultaWishlist($conn, $email)
{
    $sql = "SELECT products.id, products.title, products.price, products.priceWithDiscount, products.stock, products.thumbnail
            FROM wishlist
            JOIN products ON wishlist.product_id = products.id
            WHERE wishlist.email = ?";
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

/**
 * Deletes a product from the wishlist.
 *
 * @param mysqli $conn The database connection object.
 * @param string $email The email of the user.
 * @param int $product_id The ID of the product to be deleted.
 * @return array An array with the result of the operation. If the product is successfully deleted, the array will contain ["success" => true]. If there is an error, the array will contain ["success" => false, "message" => "Error al eliminar el producto de la lista de deseos"].
 */
function eliminarProductoWishlist($conn, $email, $product_id)
{
    $stmt = $conn->prepare("DELETE FROM wishlist WHERE email = ? AND product_id = ?");
    $stmt->bind_param("si", $email, $product_id);
    if ($stmt->execute()) {
        return ["success" => true];
    } else {
        return ["success" => false, "message" => "Error al eliminar el producto de la lista de deseos"];
    }
}

/**
 * Retrieves comments for a specific product from the database.
 *
 * @param mysqli $conn The database connection object.
 * @param int $id The ID of the product.
 * @return array An array of comments for the product.
 */
function consultaComentarios($conn, $id)
{
    $sql = "SELECT u.first_name as name, u.email, c.rating, c.comment, c.date
            FROM comments c
            JOIN user_data u ON c.email = u.email
            WHERE c.product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        $comentarios = array();
        while ($row = $res->fetch_assoc()) {
            $comentarios[] = $row;
        }
        return $comentarios;
    } else {
        return array();
    }
}

/**
 * Retrieves user data from the database based on the provided email.
 *
 * @param mysqli $conn The database connection object.
 * @param string $email The email of the user to retrieve data for.
 * @return array|null Returns an associative array containing the user data if found, or null if not found.
 */
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

/**
 * Retrieves the most recent orders for a given email address.
 *
 * @param mysqli $conn The database connection object.
 * @param string $email The email address to retrieve orders for.
 * @return array An array of recent orders, each containing the order ID, date, total amount, and number of products.
 */
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
                'id' => $row['id'],
                'date' => date('M d, Y H:i', strtotime($row['date'])),
                'total' => '$' . number_format($row['total'], 2) . ' (' . $row['products'] . ' Products)'
            ];
        }
        return $pedidos;
    } else {
        return array();
    }
}

/**
 * Adds a purchase to the purchase history table.
 *
 * @param mysqli $conn The database connection object.
 * @param string $email The email of the customer making the purchase.
 * @param float $total The total amount of the purchase.
 * @return array An associative array with the success status and an optional error message.
 */
function agregarCompra($conn, $email, $total, $pedido, $country, $state, $zip, $address, $city){
    // Preparar la declaración para insertar en purchase_history
    $stmt = $conn->prepare("INSERT INTO purchase_history (email, total, country, state, zip, address, city) VALUES (?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        return ["success" => false, "message" => "Error en prepare: " . $conn->error];
    }
    $stmt->bind_param("sdsssss", $email, $total, $country, $state, $zip, $address, $city);

    // Preparar la declaración para actualizar IDs
    $stmt2 = $conn->prepare("UPDATE IDs SET id = id + 1");
    if (!$stmt2) {
        return ["success" => false, "message" => "Error en prepare: " . $conn->error];
    }

    // Ejecutar ambas declaraciones
    if ($stmt->execute() && $stmt2->execute()) {

        // Preparar la declaración para seleccionar el ID actualizado
        $stmt3 = $conn->prepare("SELECT id FROM IDs");
        if (!$stmt3) {
            return ["success" => false, "message" => "Error en prepare: " . $conn->error];
        }

        // Ejecutar la declaración y obtener el resultado
        if ($stmt3->execute()) {
            $result = $stmt3->get_result();
            $row = $result->fetch_assoc();
            $purchase_id = $row['id'];

            // Preparar la declaración para insertar en purchase_details
            $stmt4 = $conn->prepare("INSERT INTO purchase_details (purchase_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)");
            if (!$stmt4) {
                return ["success" => false, "message" => "Error en prepare: " . $conn->error];
            }

            // Iterar sobre el pedido y vincular los parámetros
            foreach ($pedido as $item) {
                $product_id = $item->id;
                $quantity = $item->quantity;
                $unit_price = $item->priceWithDiscount;

                $stmt7 = $conn->prepare("UPDATE products SET stock = stock - ?, total_sales = total_sales + ? WHERE id = ?");
                if (!$stmt7) {
                    return ["success" => false, "message" => "Error en prepare: " . $conn->error];
                }
                $stmt7->bind_param("iii", $quantity, $quantity, $product_id);
                if (!$stmt7->execute()) {
                    return ["success" => false, "message" => "Error al actualizar stock: " . $stmt4->error];
                }

                $stmt4->bind_param("iiid", $purchase_id, $product_id, $quantity, $unit_price);
                if (!$stmt4->execute()) {
                    return ["success" => false, "message" => "Error al insertar en purchase_details: " . $stmt4->error];
                }
            }

            $stmt5 = $conn->prepare("DELETE FROM shopping_cart WHERE email = ?");
            if (!$stmt5) {
                return ["success" => false, "message" => "Error en prepare: " . $conn->error];
            }
            $stmt5->bind_param("s", $email);
            if (!$stmt5->execute()) {
                return ["success" => false, "message" => "Error al borrar del carrito: " . $stmt5->error];
            }

            $stmt6 = $conn->prepare("UPDATE user_data SET purchases = purchases + 1, papu_credits = papu_credits - ? WHERE email = ?");
            if (!$stmt6) {
                return ["success" => false, "message" => "Error en prepare: " . $conn->error];
            }
            $stmt6->bind_param("ds", $total, $email);
            if (!$stmt6->execute()) {
                return ["success" => false, "message" => "Error al borrar del carrito: " . $stmt6->error];
            }

            return ["success" => true];
        } else {
            return ["success" => false, "message" => "Error al ejecutar SELECT id: " . $stmt3->error];
        }
    } else {
        return ["success" => false, "message" => "Error al ejecutar INSERT o UPDATE: " . $stmt->error . " / " . $stmt2->error];
    }
}

function agregarCompraIndividual($conn, $email, $total, $pedido, $quantity, $country, $state, $zip, $address, $city){
    // Preparar la declaración para insertar en purchase_history
    $stmt = $conn->prepare("INSERT INTO purchase_history (email, total, country, state, zip, address, city) VALUES (?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        return ["success" => false, "message" => "Error en prepare: " . $conn->error];
    }
    $stmt->bind_param("sdsssss", $email, $total, $country, $state, $zip, $address, $city);

    // Preparar la declaración para actualizar IDs
    $stmt2 = $conn->prepare("UPDATE IDs SET id = id + 1");
    if (!$stmt2) {
        return ["success" => false, "message" => "Error en prepare: " . $conn->error];
    }

    // Ejecutar ambas declaraciones
    if ($stmt->execute() && $stmt2->execute()) {

        // Preparar la declaración para seleccionar el ID actualizado
        $stmt3 = $conn->prepare("SELECT id FROM IDs");
        if (!$stmt3) {
            return ["success" => false, "message" => "Error en prepare: " . $conn->error];
        }

        // Ejecutar la declaración y obtener el resultado
        if ($stmt3->execute()) {
            $result = $stmt3->get_result();
            $row = $result->fetch_assoc();
            $purchase_id = $row['id'];

            // Preparar la declaración para insertar en purchase_details
            $stmt4 = $conn->prepare("INSERT INTO purchase_details (purchase_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)");
            if (!$stmt4) {
                return ["success" => false, "message" => "Error en prepare: " . $conn->error];
            }

            // Iterar sobre el pedido y vincular los parámetros
            foreach ($pedido as $item) {
                $product_id = $item->id;
                $unit_price = $item->priceWithDiscount;

                $stmt7 = $conn->prepare("UPDATE products SET stock = stock - ?, total_sales = total_sales + ? WHERE id = ?");
                if (!$stmt7) {
                    return ["success" => false, "message" => "Error en prepare: " . $conn->error];
                }
                $stmt7->bind_param("iii", $quantity, $quantity, $product_id);
                if (!$stmt7->execute()) {
                    return ["success" => false, "message" => "Error al actualizar stock: " . $stmt4->error];
                }

                $stmt4->bind_param("iiid", $purchase_id, $product_id, $quantity, $unit_price);
                if (!$stmt4->execute()) {
                    return ["success" => false, "message" => "Error al insertar en purchase_details: " . $stmt4->error];
                }
            }

            $stmt5 = $conn->prepare("DELETE FROM shopping_cart WHERE email = ?");
            if (!$stmt5) {
                return ["success" => false, "message" => "Error en prepare: " . $conn->error];
            }
            $stmt5->bind_param("s", $email);
            if (!$stmt5->execute()) {
                return ["success" => false, "message" => "Error al borrar del carrito: " . $stmt5->error];
            }

            $stmt6 = $conn->prepare("UPDATE user_data SET purchases = purchases + 1, papu_credits = papu_credits - ? WHERE email = ?");
            if (!$stmt6) {
                return ["success" => false, "message" => "Error en prepare: " . $conn->error];
            }
            $stmt6->bind_param("ds", $total, $email);
            if (!$stmt6->execute()) {
                return ["success" => false, "message" => "Error al borrar del carrito: " . $stmt6->error];
            }

            return ["success" => true];
        } else {
            return ["success" => false, "message" => "Error al ejecutar SELECT id: " . $stmt3->error];
        }
    } else {
        return ["success" => false, "message" => "Error al ejecutar INSERT o UPDATE: " . $stmt->error . " / " . $stmt2->error];
    }
}

/**
 * Updates the user data in the database.
 *
 * @param mysqli $conn The database connection object.
 * @param object $userData The user data to be updated.
 * @return array An array indicating the success of the update operation.
 */
function updateUserData($conn, $userData)
{
    $sql = "UPDATE user_data SET first_name=?, last_name=?, phone=?, email_secondary=?, purchases=?, country=?, state=?, zip=?, company=?, address=?, region=?, city=? WHERE email=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssssssssss", $userData->first_name, $userData->last_name, $userData->phone, $userData->email_secondary, $userData->purchases, $userData->country, $userData->state, $userData->zip, $userData->company, $userData->address, $userData->region, $userData->city, $userData->email);

    if ($stmt->execute()) {
        return ["success" => true];
    } else {
        error_log("Error al actualizar la información del usuario: " . $conn->error);
        return ["success" => false];
    }
}

function updateCarrito($conn, $email, $quantity, $id)
{
    $stmt = $conn->prepare("UPDATE shopping_cart SET quantity = ? WHERE product_id = ? AND email = ?");
    $stmt->bind_param("iis", $quantity, $id, $email);
    if ($stmt->execute()) {
        return ["success" => true];
    } else {
        return ["success" => false, "message" => "Error al actualizar el carrito"];
    }
}

function agregarComentario($conn, $email, $name, $product_id, $comment, $rating) {
    // Verificar si el usuario ha comprado el producto
    $sqlCheckPurchase = "SELECT COUNT(*) FROM purchase_details pd 
                         JOIN purchase_history ph ON pd.purchase_id = ph.purchase_id
                         WHERE ph.email = ? AND pd.product_id = ?";
    $stmtCheck = $conn->prepare($sqlCheckPurchase);
    if (!$stmtCheck) {
        error_log("Error preparing statement: " . $conn->error);
        return ["success" => false, "message" => "Error preparing statement"];
    }
    $stmtCheck->bind_param("si", $email, $product_id);
    $stmtCheck->execute();
    $stmtCheck->bind_result($purchaseCount);
    $stmtCheck->fetch();
    $stmtCheck->close();

    if ($purchaseCount == 0) {
        return ["success" => false, "message" => "You have not purchased this product"];
    }

    // Verificar si el usuario ya ha dejado un comentario para este producto
    $sqlCheckComment = "SELECT COUNT(*) FROM comments WHERE email = ? AND product_id = ?";
    $stmtCheck = $conn->prepare($sqlCheckComment);
    if (!$stmtCheck) {
        error_log("Error preparing statement: " . $conn->error);
        return ["success" => false, "message" => "Error preparing statement"];
    }
    $stmtCheck->bind_param("si", $email, $product_id);
    $stmtCheck->execute();
    $stmtCheck->bind_result($commentCount);
    $stmtCheck->fetch();
    $stmtCheck->close();

    if ($commentCount > 0) {
        return ["success" => false, "message" => "You have already commented on this product"];
    }

    // Insertar comentario
    $sql = "INSERT INTO comments (email, name, product_id, comment, rating, date) VALUES (?, ?, ?, ?, ?, NOW())";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        error_log("Error preparing statement: " . $conn->error);
        return ["success" => false, "message" => "Error preparing statement"];
    }
    $stmt->bind_param("ssisi", $email, $name, $product_id, $comment, $rating);
    if ($stmt->execute()) {
        return ["success" => true];
    } else {
        error_log("Error executing statement: " . $stmt->error);
        return ["success" => false, "message" => "Error executing statement"];
    }
}


function consultaVentasPorCategoria($conn)
{
    $sql = "SELECT p.category, SUM(pd.quantity) AS quantity, SUM(pd.quantity * pd.unit_price) AS total FROM purchase_details pd LEFT JOIN products p ON pd.product_id = p.id GROUP BY p.category";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        error_log("Error al preparar la consulta: " . $conn->error);
        return array();
    }
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        $ventas = array();
        while ($row = $res->fetch_assoc()) {
            $ventas[] = $row;
        }
        return $ventas;
    } else {
        return array();
    }

}

function consultaVentasTotales($conn)
{
    $sql = "SELECT SUM(total) as total from purchase_history";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        error_log("Error al preparar la consulta: " . $conn->error);
        return 0;
    }
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        $ventas = array();
        while ($row = $res->fetch_assoc()) {
            $ventas[] = $row;
        }
        return $ventas;
    } else {
        return array();
    }
}

function consultaComprasTotales($conn)
{
    $sql = "SELECT id from IDs";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        error_log("Error al preparar la consulta: " . $conn->error);
        return 0;
    }
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        $ventas = array();
        while ($row = $res->fetch_assoc()) {
            $ventas[] = $row;
        }
        return $ventas;
    } else {
        return array();
    }
}

function consultaArticulosVendidos($conn)
{
    $sql = "SELECT SUM(quantity) AS quantity FROM purchase_details";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        error_log("Error al preparar la consulta: " . $conn->error);
        return 0;
    }
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        $ventas = array();
        while ($row = $res->fetch_assoc()) {
            $ventas[] = $row;
        }
        return $ventas;
    } else {
        return array();
    }
}

function consultaTopDiez($conn)
{
    $sql = "SELECT title, thumbnail, category, total_sales FROM products ORDER BY total_sales DESC LIMIT 10";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        error_log("Error al preparar la consulta: " . $conn->error);
        return 0;
    }
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        $ventas = array();
        while ($row = $res->fetch_assoc()) {
            $ventas[] = $row;
        }
        return $ventas;
    } else {
        return array();
    }
}

function getPurchaseHistory($conn, $email, $id) {
    // Consulta para obtener los detalles de la compra
    $sql = "SELECT email, date, total, country, state, zip, address, city 
            FROM purchase_history 
            WHERE email = ? AND purchase_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $email, $id);
    $stmt->execute();
    $res = $stmt->get_result();
    
    if ($res->num_rows > 0) {
        $purchase = $res->fetch_assoc();

        // Consulta para obtener los detalles de los productos comprados
        $sqlDetails = "SELECT pd.product_id, pd.quantity, pd.unit_price, p.title, p.thumbnail 
                       FROM purchase_details pd 
                       JOIN products p ON pd.product_id = p.id 
                       WHERE pd.purchase_id = ?";
        $stmtDetails = $conn->prepare($sqlDetails);
        $stmtDetails->bind_param("i", $id);
        $stmtDetails->execute();
        $resDetails = $stmtDetails->get_result();
        
        $products = [];
        while ($row = $resDetails->fetch_assoc()) {
            $products[] = $row;
        }
        
        $purchase['products'] = $products;

        return $purchase;
    } else {
        return null;
    }
}

function updateProducto($conn, $product, $realPrice){
    $id = $product->id;
    $title = $product->title;
    $desc = $product->description;
    $category = $product->category;
    $price = $product->price;
    $discount = $product->discountPercentage;
    $priceWithDiscount = $realPrice;
    $stock = $product->stock;
    $brand = $product->brand;
    $weight = $product->weight;
    $width = $product->width;
    $height = $product->height;
    $depth = $product->depth;
    $warranty = $product->warrantyInformation;
    $shipping = $product->shippingInformation;
    $return = $product->returnPolicy;
    $thumbnail = $product->thumbnail;
    $sql = "UPDATE products SET title = ?, description = ?, category = ?, price = ?, discountPercentage = ?, priceWithDiscount = ?, stock = ?, brand = ?, weight = ?, width = ?, height = ?, depth = ?, warrantyInformation = ?, shippingInformation = ?, returnPolicy = ?, thumbnail = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssdddisiiiissssi", $title, $desc, $category, $price, $discount, $realPrice, $stock, $brand, $weight, $width, $height, $depth, $warranty, $shipping, $return, $thumbnail, $id);
    if ($stmt->execute()) {
        return ["success" => true];
    } else {
        error_log("Error executing statement: " . $stmt->error);
        return ["success" => false, "message" => "Error executing statement"];
    }
}

/**
 * This code block checks if the current request method is OPTIONS.
 * If the request method is OPTIONS, it sends a 200 OK response header and exits the script.
 * This is commonly used to handle preflight requests in CORS (Cross-Origin Resource Sharing) implementations.
 */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

/**
 * This PHP script serves as the backend API for handling various requests.
 * It checks the request method and processes the incoming JSON data based on the specified function name.
 * The script performs different actions such as querying products, users, cart, wishlist, etc.
 * The response is sent back in JSON format.
 *
 * @param string $_SERVER['REQUEST_METHOD'] The request method (POST)
 * @param string $data The JSON data received in the request body
 * @param object $jsonData The decoded JSON data
 * @param string $functionName The name of the function to be executed
 * @param mixed $productos The result of querying products
 * @param mixed $usuario The result of querying a user
 * @param mixed $pedidos The result of querying recent orders
 * @param mixed $resultado The result of an operation (e.g., registration, adding to cart, etc.)
 * @param mixed $admin The result of querying an administrator
 * @param mixed $comentarios The result of querying comments
 *
 * @return void
 */

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = file_get_contents('php://input');
    if ($data !== false) {
        $jsonData = json_decode($data);

        if ($jsonData !== null && isset($jsonData->functionName)) {
            $functionName = $jsonData->functionName;
            switch ($functionName) {
                case 'getPurchaseHistory':
                    if (isset($jsonData->email) && isset($jsonData->id)) {
                        $purchaseHistory = getPurchaseHistory($conn, $jsonData->email, $jsonData->id);
                        header('Content-Type: application/json');
                        echo json_encode($purchaseHistory);
                    }
                    break;
                case 'agregarComentario':
                    if (isset($jsonData->email, $jsonData->name, $jsonData->product_id, $jsonData->comment, $jsonData->rating)) {
                        $resultado = agregarComentario($conn, $jsonData->email, $jsonData->name, $jsonData->product_id, $jsonData->comment, $jsonData->rating);
                        header('Content-Type: application/json');
                        echo json_encode($resultado);
                    }
                    break;
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
                case 'verificarProductoWishlist':
                    if (isset($jsonData->email, $jsonData->product_id)) {
                        $resultado = verificarProductoWishlist($conn, $jsonData->email, $jsonData->product_id);
                        header('Content-Type: application/json');
                        echo json_encode($resultado);
                    }
                    break;
                case 'insertarWishlist':
                    if (isset($jsonData->email, $jsonData->product_id)) {
                        $resultado = addToWishlist($conn, $jsonData->email, $jsonData->product_id);
                        header('Content-Type: application/json');
                        echo json_encode($resultado);
                    }
                    break;
                case 'consultaWishlist':
                    if (isset($jsonData->email)) {
                        $productos = consultaWishlist($conn, $jsonData->email);
                        header('Content-Type: application/json');
                        echo json_encode($productos);
                    }
                    break;
                case 'eliminarProductoWishlist':
                    if (isset($jsonData->email, $jsonData->product_id)) {
                        $resultado = eliminarProductoWishlist($conn, $jsonData->email, $jsonData->product_id);
                        header('Content-Type: application/json');
                        echo json_encode($resultado);
                    }
                    break;
                case 'consultaProductoIndividual':
                    if (isset($jsonData->id, $jsonData->flag)) {
                        $productos = consultaProductoIndividual($conn, $jsonData->id, $jsonData->flag);
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
                case 'consultaComentarios':
                    if (isset($jsonData->id)) {
                        $comentarios = consultaComentarios($conn, $jsonData->id);
                        header('Content-Type: application/json');
                        echo json_encode($comentarios);
                    }
                    break;
                case 'agregarCompra':
                    if (isset($jsonData->email, $jsonData->total, $jsonData->pedido, $jsonData->country, $jsonData->state, $jsonData->zip, $jsonData->address, $jsonData->city)) {
                        // Decodificar el pedido
                        $pedido = $jsonData->pedido;

                        // Llamar a la función agregarCompra con el pedido
                        $resultado = agregarCompra($conn, $jsonData->email, $jsonData->total, $pedido, $jsonData->country, $jsonData->state, $jsonData->zip, $jsonData->address, $jsonData->city);

                        // Enviar la respuesta
                        header('Content-Type: application/json');
                        echo json_encode($resultado);
                    }
                    break;
                case 'agregarCompraIndividual':
                    if (isset($jsonData->email, $jsonData->total, $jsonData->pedido, $jsonData->quantity, $jsonData->country, $jsonData->state, $jsonData->zip, $jsonData->address, $jsonData->city)) {
                        // Decodificar el pedido
                        $pedido = $jsonData->pedido;

                        // Llamar a la función agregarCompra con el pedido
                        $resultado = agregarCompraIndividual($conn, $jsonData->email, $jsonData->total, $pedido, $jsonData->quantity, $jsonData->country, $jsonData->state, $jsonData->zip, $jsonData->address, $jsonData->city);

                        // Enviar la respuesta
                        header('Content-Type: application/json');
                        echo json_encode($resultado);
                    }
                    break;
                case 'updateUserData':
                    if (isset($jsonData->userData)) {
                        $resultado = updateUserData($conn, $jsonData->userData);
                        header('Content-Type: application/json');
                        echo json_encode($resultado);
                    }
                    break;
                case 'updateCarrito':
                    if (isset($jsonData->email, $jsonData->id, $jsonData->quantity)) {
                        $resultado = updateCarrito($conn, $jsonData->email, $jsonData->quantity, $jsonData->id);
                        header('Content-Type: application/json');
                        echo json_encode($resultado);
                    }
                    break;
                case 'consultaVentasPorCategoria':
                    $resultado = consultaVentasPorCategoria($conn);
                    header('Content-Type: application/json');
                    echo json_encode($resultado);
                    break;
                case 'consultaVentasTotales':
                    $resultado = consultaVentasTotales($conn);
                    header('Content-Type: application/json');
                    echo json_encode($resultado);
                    break;
                case 'consultaComprasTotales':
                    $resultado = consultaComprasTotales($conn);
                    header('Content-Type: application/json');
                    echo json_encode($resultado);
                    break;
                case 'consultaArticulosVendidos':
                    $resultado = consultaArticulosVendidos($conn);
                    header('Content-Type: application/json');
                    echo json_encode($resultado);
                    break;
                case 'consultaTopDiez':
                    $resultado = consultaTopDiez($conn);
                    header('Content-Type: application/json');
                    echo json_encode($resultado);
                    break;
                case 'updateProducto':
                    if(isset($jsonData->product, $jsonData->realPrice)){
                        $product = $jsonData->product;
                        $resultado = updateProducto($conn, $product, $jsonData->realPrice);
                    header('Content-Type: application/json');
                    echo json_encode($resultado);
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

$conn->close(); // Close the database connection
?>