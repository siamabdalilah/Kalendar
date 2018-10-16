 <?php
 
 header("Content-Type: application/json")
 ini_set("session.cookie_httponly", 1);
 require 'database.php';

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);


$id = $json_obj['id'];
$title = $json_obj['title'];
$startMonth = $json_obj['monthy'];
$startDate = $json_obj['date'];
$startTime = $json_obj["time"];
$category = $json_obj['tag'];
$token = $json_obj['token'];


 $stmt = mysqli->prepare("SELECT COUNT(*), title, tags, startmonthy, starttime, startdate from events where event_id = id  ");

 $stmt->bind_param('i', $id);
 $stmt->execute();
 $stmt->bind_result($cnt, $title, $category, $startMonth, $startTime, $startDate);
 $stmt->fetch();
 $stmt->close();

 if ($cnt == 1) {
     echo json_encode(array(
         "sucess" => true;
         "title" => htmlentities($title),
         "monthy" => htmlentities($startMonth),
         "date" => htmlentities($startDate),
         "time" => htmlentities($startTime),
         "tag" => htmlentities($category),
         "token" => htmlentities($token)
     ));
     exit;
 } else {
 	echo json_encode(array (
 		"success" => false,
 	));
 }

 ?>

