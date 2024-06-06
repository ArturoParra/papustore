<?php
$servername = "localhost";
$username = "papu";  // Cambia esto por el nombre de usuario que creaste
$password = "1234";  // Cambia esto por la contraseña que creaste
$dbname = "papustore";  // Cambia esto por el nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
echo "Conexión exitosa";

