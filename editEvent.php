<?php
require 'database.php';

header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
session_start();
 

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

echo json_encode(array(
        "success" => false,
        "message" => "Illegal token"
    ));
    exit;

$title = addslashes($json_obj['title']);
$monthy = addslashes($json_obj['monthy']);
$startdate = addslashes($json_obj['date']);
$starttime = addslashes($json_obj['starttime']);
$description = addslashes($json_obj['description']);
$endttime = addslashes($json_obj['endttime']);
$enddate = addslashes($json_obj['enddate']);
$category = addslashes($json_obj['tag']);
$eventid = addslashes($json_obj['eventid']);
$token = addslashes($json_obj['token']);




if (!($token === $_SESSION['token'])){
    echo json_encode(array(
        "success" => false,
        "message" => "Illegal token"
    ));
    exit;
}





$stmt = $mysqli->prepare("UPDATE events SET title=?, startdate=?, startmonthy=?, starttime=?,
    description=?, endtime=?, enddate=?, tags=?  WHERE event_id=?");

if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => "Query prep failed"
    ));
  exit;
}



$stmt->bind_param('ssssssssi',$title,$startdate,$monthy,$starttime, $description, $endtime, $enddate, $category, $eventid);

$stmt->execute();

$stmt->close();

echo json_encode(array(
    "success" => true,
    "message" => "Success!"
));
exit;


 ?>
