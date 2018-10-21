<?php
require 'database.php';

header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
session_start();
 

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$title = $json_obj['title'];
$startMonth = $json_obj['monthy'];
$startDate = $json_obj['date'];
$startTime = $json_obj["time"];
$endTime = $json_obj['endtime'];
$endDate = $json_obj['enddate'];
$description = $json_obj['description'];
$category = $json_obj['tag'];
$token = $json_obj['token'];


if (!preg_match('/(0[1-9]|1[0-2])-(\d{4})/m', $startMonth) || !preg_match('/(0[1-9]|[1-2]\d|3[0-1])/m', $startDate) || !preg_match('/(\d|1\d|2[0-3]):([0-5]\d|):00/m', $startTime)){

	echo json_encode(array(
		"success" => false,
		"message" => "Invalid timeg format"
	));
	exit;
}


if(htmlentities($title) === ""){
	echo json_encode(array(
		"success" => false,
		"message" => "Invalid title"
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





$stmt = $mysqli->prepare('insert into events (title, tags, username, startmonthy, startdate, starttime, endtime, enddate, description ) values (?,?,?,?,?,?, ?, ?, ?)');
if (!$stmt){
	echo json_encode(array(
		"success" => false,
		"message" => "Invalid insert query"
	));
	exit;
}



$stmt->bind_param('sssssssss', $title, $category, $_SESSION['username'], $startMonth, $startDate, $startTime, $endTime, $endDate, $description);
$stmt->execute();
$stmt->close();



echo json_encode(array(
	"success" => true,
	"message" => "Event Added"
));
exit;

exit;

?>