<?php
require 'database.php';

header("Content-Type: application/json"); 
session_start();
if (isset($_SESSION['username'])){
  session_destroy();
  echo json_encode(array(
    "success" => false,
    "message" => "Something went wrong"
  ));
  exit;
}

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$username = $json_obj['username'];
$password = $json_obj['password'];


$stmt = $mysqli->prepare("SELECT COUNT(*), username, password FROM users WHERE username=?");

if (!$stmt){
  echo json.encode(array(
    'success' => false,
    'message' => $stmt->errno
  ));
}

$stmt->bind_param('s', $username);

$stmt->execute();
$stmt->bind_result($cnt, $id, $hash);
$stmt->fetch();
$stmt->close();


if ($cnt == 1 && password_verify($password, $hash)){
  
  $_SESSION['username'] = $username;
  $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32)); 

  echo json_encode(array(
    "success" => true,
    "token" => $_SESSION['token'],
    "message" => "You have been logged in"
  ));
  exit;
}
else{
  echo json_encode(array(
    "success" => false,
    "message" => "Incorrect Username or Password"
  ));
  exit;
}
?>