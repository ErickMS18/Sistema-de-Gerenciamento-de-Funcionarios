<?php
$name = $_POST["name"];
$email = $_POST["email"];
$password = $_POST["password"];

$con = mysqli_connect("localhost:3306", "root", "PUC@1234", "ccg_project");

$query ="INSERT INTO user (name, email, password, theme, is_admin) VALUES ('$name', '$email', '$password', 'dark', 0)";

mysqli_query($con, $query);
?>   