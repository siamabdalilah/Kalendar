<?
require 'database.php';

header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
session_start();
 

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$title = $json_obj['title'];
$monthy = $json_obj['startdate'];
$startdate = $json_obj['startmonthy'];
$starttime = $json_obj['starttime'];
$description = $json_obj['description']
$endttime = $json_obj['endttime']
$enddate = $json_obj['enddate']
$category = $json_obj['tags'];
$eventid = $json_obj['eventid'];
$token = $json_obj['token'];

if (!($token === $_SESSION['token'])){
    echo json_encode(array(
        "success" => false,
        "message" => "Illegal token"
    ));
    exit;
}


$stmt = $mysqli->prepare("UPDATE events SET title=?, startdate=?, startmonthy=?, starttime=?,
    description=?, endttime=?, enddate=?, tags=?  WHERE event_id=?");

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
));
exit;
?>
