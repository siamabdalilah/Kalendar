<?php
require 'database.php';

header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
session_start();

$json_str = file_get_contents("php://input");
$json_obj = json_decode($json_str,true);


// if (!($token === $_SESSION['token'])){
//     echo json_encode(array(
//         "success" => false,
//         "message" => "Illegal token"
//     ));
//     exit;
// }



$event_id = addslashes($json_obj['eventid']);


// deleting event
$stmt3 = $mysqli->prepare("DELETE from events WHERE event_id=?");
if (!$stmt3){
	echo json_encode(array(
	    "success" => false,
	    "message" => "Query prep failed"
	));
	exit;
}
$stmt3->bind_param('s',$event_id);
$stmt3->execute();
$stmt3->close();

echo json_encode(array(
    "success" => true,
    "message" => "Sucessfully deleted event!"
));
exit;



?>
