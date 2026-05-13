<?php
// Configuration for Database Connection
$host = "localhost";
$username = "root";
$password = ""; // Default XAMPP/WAMP password is empty
$dbname = "flavordash";

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Set header to JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow access from mobile app
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}
?>
