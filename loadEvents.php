<?php
require 'database.php';

header("Content-Type: application/json");
session_start();
 

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$stmt1 = $mysqli->prepare("SELECT * from events where monthyear=$match");
if (!$stmt) {
	echo json_encode(array(
		"success" => false,
		"message" => "Query Prep Failed: %s\n", $mysqli->error;
	))
}
$stmt1->execute();
$stmt1->bind_result($events);

$monthsEvents = array();

int i =0;
while ($stmt1->fetch()){
	$monthsEvents[i] = htmlentities($monthyear);
	i++
}

$stmt1->close();

echo json_encode(array(
"sucess" => true,
"message" => "Collected month's events"

));
exit;
 ?>