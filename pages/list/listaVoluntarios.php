<?php

$host = 'localhost'; 
$dbname = 'ccg_project'; 
$username = 'root'; 
$password = 'PUC@1234'; 

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    
    $sql = "SELECT * FROM user"; 
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($usuarios);
} catch (PDOException $e) {
    echo json_encode(["error" => "Conexão falhou: " . $e->getMessage()]);
}
?>



