<?
require 'database.php';

header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
session_start();
 

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$eventid = 

$stmt = $mysqli->prepare("UPDATE events SET title=?, startdate=?, startmonthy=?, starttime=?, tags=?  WHERE eventid=?");

    if(!$stmt){
      printf("Query Prep Failed: %s\n", $mysqli->error);
      exit;
    }

    $stmt->bind_param('ssssi',$_POST['title'],$_POST['dateof'],$_POST['datetimeofevent'],$_POST['tag'], $eventid);

    $stmt->execute();

    $stmt->close();
    echo json_encode(array(
        "success" => true,
    ));
    exit;
?>
