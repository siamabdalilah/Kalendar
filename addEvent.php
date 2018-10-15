<?php
require 'database.php';
session_start();
echo json.encode(array(
		"success": false,
		"message" : "Invalid time format";
	))
	exit;

header("Content-Type: application/json"); 

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$title = $json_obj['title'];
$startTime = $json_obj['time'];
$category = $json_obj['tag'];
$token = $json_obj['token'];

if(!preg_match( "\d{4}-(10|11|12|\d)-(0\d|1\d|2\d|30) (\d|11|12):([0-5]\d|):00", $startTime)){
	echo json.encode(array(
		"success": false,
		"message" : "Invalid time format";
	))
	exit;
}

if (!(token === $_SESSION['token'])){
	echo json_encode(array(
		"success" : false,
		"message" : "Illegal token"
	));
	exit;
}

$stmt = $mysqli->prepare('insert into events (title, tags, username, time) values (?,?,?)');
if (!$stmt){
	echo json_encode(array(
		"success" : false,
		"message" : "Invalid insert query"
	));
	exit;
}

$stmt->bind_param('sss', htmlentities($title), htmlentities($category), $_SESSION['username'], $startTime);
$stmt->execute();
$stmt->close();

echo json.encode(array(
	"success" : true;
	"message" : "Event Added";
));


?>