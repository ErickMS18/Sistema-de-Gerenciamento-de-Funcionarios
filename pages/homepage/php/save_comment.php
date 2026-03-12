<?php
    $data = json_decode(file_get_contents('php://input'), true);

    $conn = mysqli_connect("localhost:3306", "root", "PUC@1234", "ccg_project");

    if ($conn->connect_error) {
        die(json_encode(['error' => "Connection failed: " . $conn->connect_error]));
    }

    if ($data['post_id']){

        $post_id = $data['post_id'];
        $comment = $data['comment'];
        $user_id = $data['user_id'];
        $comment_time = $data['comment_time'];

        $insert = $conn->prepare("INSERT INTO comment(comment_body, comment_time, user_id_user, post_id_post) VALUES (?, ?, ?, ?)");
        $insert->bind_param("ssii", $comment, $comment_time, $user_id, $post_id);

    } else {

        $post_body = $data['post_body'];
        $user_id = $data['user_id'];
        $post_time = $data['post_time'];

        $insert = $conn->prepare("INSERT INTO post(post_body, post_time, user_id_user) VALUES (?, ?, ?)");
        $insert->bind_param("ssi", $post_body, $post_time, $user_id);

    }

    if ($insert->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => "Error: " . $insert->error]);
    }



?>