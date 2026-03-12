<?php
    session_start();

    $user_id = $_SESSION['user_id'];

    $username = $_POST['username'];
    $email = $_POST['email'];
    $dept = $_POST['dept'];
    $hours = $_POST['hours'];

    $_SESSION['username'] = $username;
    $_SESSION['user_email'] = $email;
    $_SESSION['user_dept'] = $dept;
    $_SESSION['user_hours'] = $hours;

    echo ($username);
    echo ($email);
    echo ($dept);
    echo ($hours);

    $conn = mysqli_connect("localhost:3306", "root", "PUC@1234", "ccg_project");

    if ($conn->connect_error) {
        die(json_encode(['error' => "Connection failed: " . $conn->connect_error]));
    }

    $insert = $conn->prepare("UPDATE user SET name = ?, email = ?, department = ?, hours = ? WHERE id_user = ?");
    $insert->bind_param("ssssi", $username, $email, $dept, $hours, $user_id);

    if ($insert->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => "Error: " . $insert->error]);
    }

?>