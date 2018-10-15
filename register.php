<?php

require 'database.php';

header("Content-Type: application/json"); 


$json_str = file_get_contents('php://input');
// echo json.encode(array('success'=>false));
// exit;
$json_obj = json_decode($json_str, true);

$username = $json_obj['username'];
$password = $json_obj['password'];


$stmt = $mysqli->prepare("SELECT COUNT(*) FROM users WHERE username=?");

$stmt->bind_param('s', $username);

$stmt->execute();
$stmt->bind_result($cnt);
$stmt->fetch();
$stmt->close();

if ($cnt == 1){
	echo json_encode(array(
		"success" => false,
		"message" => "Username already exists"
	));
	exit;
}

$hash = password_hash(htmlentities($password), PASSWORD_BCRYPT);
$stmt = $mysqli->prepare("insert into users set (username, password) values ( ? , ? )");

if (!$stmt){
	echo json_encode(array(
		"success" => false,
		"message" => "fml"//$stmt->errno
	));
	exit;
}

$stmt->bind_param($username, $hash);
$stmt->execute();
$stmt->close();

session_start();
$_SESSION['username'] = $username;
$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32)); 

echo json_encode(array(
	"success" => true,
	"token" => $_SESSION['token'],
	"message" => "You are registered"
));


?>