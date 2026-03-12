<?php
    session_start();

    $user_id = $_SESSION["user_id"];
    $username = $_SESSION["username"];
    $user_email = $_SESSION["user_email"];
    $user_dept = $_SESSION["user_dept"];
    $user_hours = $_SESSION["user_hours"];
    $user_theme = $_SESSION["user_theme"];
    $isadmin = $_SESSION["user_is_admin"];

    $response = [
        'user_id' => $_SESSION["user_id"],
        'username' => $_SESSION["username"],
        'user_email' => $_SESSION["user_email"],
        'user_dept' => $_SESSION["user_dept"],
        'user_hours' => $_SESSION["user_hours"],
        'user_theme' => $_SESSION["user_theme"],
        'user_is_admin' => $_SESSION["user_is_admin"]
    ];

    header('Content-Type: application/json');
    echo json_encode($response);

?>