<?php
header("Content-Type: application/json");

session_start();

$json_str = file_get_contents("...... some javascript file?");
$json_obj = json_encode($json_str,true);

$date = $json_obj['date'];
$username = $_SESSION['user'];

require 'database.php';
$rows = array();

$stmt1 = $mysqli->prepare("SELECT ....... start the query")
$stmt1->bind_param('ss',$username,$date);
$stmt1->execute();
$result1 = $stmt1->getresult();

while ($events = $result1->fetch_assoc()) {
    $rows[] = $events;
}
$stmt1->close();

echo json_encode($rows);

?>


