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
$category = $json_obj['tags'];


$stmt = $mysqli->prepare("UPDATE events SET title=?, startdate=?, startmonthy=?, starttime=?, tags=?  WHERE eventid=?");

    if(!$stmt){
      printf("Query Prep Failed: %s\n", $mysqli->error);
      exit;
    }

    $stmt->bind_param('sssssi',$title,$monthy,$startdate,$starttime, $category, $eventid);

    $stmt->execute();

    $stmt->close();

    echo json_encode(array(
        "success" => true,
    ));
    exit;
?>
