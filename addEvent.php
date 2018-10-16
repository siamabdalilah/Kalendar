<?php
require 'database.php';

header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
session_start();
 

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$title = $json_obj['title'];
$startTime = $json_obj['time'];
$category = $json_obj['tag'];
$token = $json_obj['token'];



if(!preg_match( '/\d{4}-(10|11|12|\d)-(0\d|1\d|2\d|30) (\d|1\d|2[0-3]):([0-5]\d|):00/m', $startTime)){
	echo json_encode(array(
		"success" => false,
		"message" => "Invalid timegvgvg format"
	));
	exit;
}



if (!($token === $_SESSION['token'])){
	echo json_encode(array(
		"success" => false,
		"message" => "Illegal token"
	));
	exit;
}


$stmt = $mysqli->prepare('insert into events (title, tags, username, date ) values (?,?,?,?)');
if (!$stmt){
	echo json_encode(array(
		"success" => false,
		"message" => "Invalid insert query"
	));
	exit;
}


// echo json_encode(array(
// 		"success" => false,
// 		"message" => "Invalid time format"
// 	));
// 	exit;

$stmt->bind_param('ssss', $title, $category, $_SESSION['username'], $startTime);
$stmt->execute();
$stmt->close();

echo json_encode(array(
	"success" => true,
	"message" => "Event Added"
));


?>