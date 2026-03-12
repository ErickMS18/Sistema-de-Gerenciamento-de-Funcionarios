<?php
session_start();

$tema = json_decode(file_get_contents('php://input'), true)["theme"];
echo json_encode($tema);
$_SESSION['user_theme'] = $tema;
$user = $_SESSION['username'];


$con = mysqli_connect("localhost:3306", "root", "PUC@1234", "ccg_project");;

$query ="UPDATE user SET theme = '$tema' WHERE user.name = '$user'";

mysqli_query($con, $query);


?>
 