<?php

    $data = json_decode(file_get_contents('php://input'), true);

    $conn = mysqli_connect("localhost:3306", "root", "PUC@1234", "ccg_project");

    if ($conn->connect_error) {
        die(json_encode(['error' => "Connection failed: " . $conn->connect_error]));
    }

    if ($data['post_id']){

        $post_id = $data['post_id'];
        
        $delete = $conn->prepare("DELETE FROM post WHERE id_post = ?");
        $delete->bind_param("i", $post_id);

    } else {

        $comment_id = $data['comment_id'];
        
        $delete = $conn->prepare("DELETE FROM comment WHERE id_comment = ?");
        $delete->bind_param("i", $comment_id);

    }

    if ($delete->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => "Error: " . $delete->error]);
    }

?>