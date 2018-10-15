<?php
header("Content-Type: application/json");

session_start();

$json_str = file_get_contents("...... some javascript file?");
$json_obj = json_encode($json_str,true);

$eventID = $json_obj['event'];
$username = $_SESSION['user'];

require 'database.php';
$rows = array();

$stmt1 = $mysqli->prepare("SELECT COUNT(*), event_id from events where event_id=?");
$stmt1->bind_param('ss', $username, $event_id);
$stmt1->execute();
$result1 = $stmt1->getresult();

while ($events = $result1->fetch_assoc()) {
    $rows[] = $events;
}
$stmt1->close();

echo json_encode($rows);

?>


