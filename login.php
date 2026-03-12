<?php

$host = 'localhost:3306'; 
$db = 'ccg_project'; 
$user = 'root'; 
$pass = 'PUC@1234';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$usuario = $_POST['usuario'];
$senha = $_POST['senha'];

$sql = "SELECT * FROM user WHERE name = ? AND password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $usuario, $senha);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    header('Location: pages/homepage/homepage.html');
    $usuario = $result->fetch_assoc();

        session_start();
        
        $_SESSION["user_id"] = $usuario['id_user'];
        $_SESSION["username"] = $usuario['name'];
        $_SESSION["user_email"] = $usuario['email'];
        $_SESSION["user_dept"] = $usuario['department'];
        $_SESSION["user_hours"] = $usuario['hours'];
        $_SESSION["user_theme"] = $usuario['theme'];
        $_SESSION["user_is_admin"] = $usuario['is_admin'];

    exit(); 
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Usuario ou senha incorretos.']);
}

$stmt->close();
$conn->close();
?>