<?php
require 'database.php';

header("Content-Type: application/json");
session_start();


$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$monthy = $json_obj["monthy"];

$stmt1 = $mysqli->prepare("SELECT * from events where startmonthy=$monthy and username = $_SESSION['username'] order by startdate, starttime asc");
if (!$stmt) {
	echo json_encode(array(
		"success" => false,
		"message" => "Query Prep Failed"
	));
	exit;
}


$stmt1->execute();
$stmt1->bind_result($id, $tag, $u, $title, $startdate, $startmonthy, $starttime);

$monthsEvents = array();

$monthsEvents[$startdate]


while ($stmt1->fetch()){
	if (!array_key_exists($startdate, $monthsEvents)){
		monthsEvents[$startdate] = array();
	}
	array_push($monthsEvents[$startdate], array(
		'id' => $id, 
		'tag' => $tag,
		'title' => $title,
		'startTime' => $startTime
	));
}

$stmt1->close();




echo json_encode(array(
"success" => true,
"events" => $monthEvents
));
exit;
?>