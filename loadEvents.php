<?php
require 'database.php';

header("Content-Type: application/json");
session_start();


$stmt = $mysqli->prepare("SELECT * from events where username = ? order by startmonthy, startdate, starttime asc");
if (!$stmt) {
	echo json_encode(array(
		"success" => false,
		"message" => "Query Prep Failed"
	));
	exit;
}

$stmt->bind_param('s',$_SESSION['username']);

$stmt->execute();
$stmt->bind_result($id, $tag, $u, $title, $startdate, $startmonthy, $starttime);

$monthsEvents = array();


// return all events for that user
while ($stmt->fetch()){
	$monthkey = (string)$startmonthy;

	if (!array_key_exists($monthkey, $monthsEvents)){
		$monthsEvents[$monthkey] = array();
	}

	if (!array_key_exists($startdate, $monthsEvents[$monthkey])){
		$monthsEvents[$monthkey][$startdate] = array();
		
	}

	array_push($monthsEvents[$monthkey][$startdate], array(
		"id" => $id, 
		"tag" => $tag,
		"title" => $title,
		"startTime" => $starttime
	));
}

$stmt->close();



$content = json_encode(array(
	"success" => true,
	"events" => $monthsEvents
), JSON_FORCE_OBJECT);

echo $content;

exit;
?>