<?php
require_once 'config.php';

// Get JSON input
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username) || !isset($data->password)) {
    echo json_encode(["error" => "Missing username or password"]);
    exit;
}

$username = $conn->real_escape_string($data->username);
$password = $data->password;

$sql = "SELECT id, username, password FROM users WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Verify password (assuming hashed in DB)
    if (password_verify($password, $user['password'])) {
        // In a real app, generate a real JWT here.
        // For this UTS, we simulate a token.
        $token = base64_encode(json_encode(["id" => $user['id'], "username" => $user['username'], "exp" => time() + 3600]));
        echo json_encode([
            "message" => "Login successful",
            "token" => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." . $token . ".signature_simulasi"
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Invalid password"]);
    }
} else {
    http_response_code(401);
    echo json_encode(["error" => "User not found"]);
}

$conn->close();
?>
