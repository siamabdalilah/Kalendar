<?php
require 'database.php';

header("Content-Type: application/json"); 


$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$username = $json_obj['username'];
$password = $json_obj['password'];


$stmt = $mysqli->prepare("SELECT COUNT(*), username, password FROM users WHERE username=?");



$stmt->bind_param('s', $username);

$stmt->execute();
$stmt->bind_result($cnt, $id, $hash);
$stmt->fetch();
$stmt->close();

$passwordguess = $_POST['password'];

if ($cnt == 1 && password_verify($passwordguess, $hash)){
  session_start();
  $_SESSION['username'] = $username;
  $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32)); 

  echo json_encode(array(
    "success" => true,
    "token" => $_SESSION['token'];
  ));
  exit;
}
else{
  echo json_encode(array(
    "success" => false,
    // "message" => "Incorrect Username or Password"
  ));
  exit;
}
?>