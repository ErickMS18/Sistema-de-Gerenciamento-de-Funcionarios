<?php
    $conn = mysqli_connect("localhost:3306", "root", "PUC@1234", "ccg_project");

    header('Content-Type: application/json');

    $query = "
        SELECT post.*, 
            post_user.name AS post_author, 
            comment.id_comment,
            comment.comment_body, 
            comment.comment_time, 
            comment_user.name AS comment_author 
        FROM post 
        JOIN user AS post_user ON post.user_id_user = post_user.id_user
        LEFT JOIN comment ON post.id_post = comment.post_id_post
        LEFT JOIN user AS comment_user ON comment.user_id_user = comment_user.id_user
        ORDER BY id_post";
    
    $data = mysqli_query($conn, $query);
    if (!$data) {
        echo json_encode(array('error' => mysqli_error($conn)));
        exit;
    }
    
    $array = mysqli_fetch_all($data, MYSQLI_ASSOC);
    echo json_encode($array);

?>