<?php
    
    session_start();

    // Change this once we join all the pages
    // $username = 'Admin1';
    // $_SESSION["username"] = $username;

    $username = $_SESSION["username"];

    $conn = mysqli_connect("localhost:3306", "root", "PUC@1234", "ccg_project");

    $stmt = $conn->prepare("SELECT * FROM user WHERE user.name = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $data = $stmt->get_result();

    if ($row = $data->fetch_assoc()) {
        // $_SESSION["user_id"] = $row['id_user'];
        // $_SESSION["user_email"] = $row['email'];
        // $_SESSION["user_dept"] = $row['department'];
        // $_SESSION["user_hours"] = $row['hours'];
        // $_SESSION["user_theme"] = $row['theme'];
        // $_SESSION["user_is_admin"] = $row['is_admin'];

        $response = [
            'user_id' => $_SESSION["user_id"],
            'username' => $_SESSION["username"],
            'user_email' => $_SESSION["user_email"],
            'user_dept' => $_SESSION["user_dept"],
            'user_hours' => $_SESSION["user_hours"],
            'user_theme' => $_SESSION["user_theme"],
            'user_is_admin' => $_SESSION["user_is_admin"]
        ];

        echo json_encode($response);
        

    } else {
        echo "No user found.";
    };

    
?>