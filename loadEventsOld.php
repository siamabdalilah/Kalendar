<?php
require 'database.php';

// header("Content-Type: application/json");
// session_start();


// $json_str = file_get_contents('php://input');
// $json_obj = json_decode($json_str, true);

//$monthy = $json_obj["monthy"];

$stmt = $mysqli->prepare("SELECT * from events where startmonthy= ? and username = 'siam' order by startdate, starttime asc");
if (!$stmt) {
	echo json_encode(array(
		"success" => false,
		"message" => "Query Prep Failed"
	));
	exit;
}

$stmt->bind_param('s',$monthy);
echo $monthy;

$stmt->execute();
$stmt->bind_result($id, $tag, $u, $title, $startdate, $startmonthy, $starttime);

$monthsEvents = array();



while ($stmt->fetch()){
	echo $1
	if (!array_key_exists($startdate, $monthsEvents)){
		$monthsEvents[$startdate] = array();
	}
	array_push($monthsEvents[$startdate], array(
		'id' => $id, 
		'tag' => $tag,
		'title' => $title,
		'startTime' => $starttime
	));
}

$stmt->close();

$content = json_encode(array(
"success" => true,
"events" => $monthsEvents
), JSON_FORCE_OBJECT);

file_put_contents('test.txt', $content);

echo $content;
exit;
?>