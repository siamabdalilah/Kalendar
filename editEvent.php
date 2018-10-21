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

if (!($token === $_SESSION['token'])){
    echo json_encode(array(
        "success" => false,
        "message" => "Illegal token"
    ));
    exit;
}


$stmt = $mysqli->prepare("UPDATE events SET title=?, startdate=?, startmonthy=?, starttime=?, startdate=?
    description=?, endttime=?, enddate=?, category=?, tags=?  WHERE event_id=?");

    if(!$stmt){
      printf("Query Prep Failed: %s\n", $mysqli->error);
      exit;
    }

    $stmt->bind_param('ssssssssi',$title,$monthy,$startdate,$starttime, $description, $endtime, $category, $eventid);

    $stmt->execute();

    $stmt->close();

    echo json_encode(array(
        "success" => true,
    ));
    exit;
?>
