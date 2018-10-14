<?php
require 'database.php'

$json_str = file_get_contents("...... some javascript file?");
$json_obj = json_encode($json_str,true);

$event = $json_obj['date'];
$eventID = $json_obj['event_id'];

$stmt->prepare("DELETE from events WHERE .... ");

$stmt->bind_param(i,$eventID);
$stmt->execute;
$stmt->close;

echo json_encode(array(
    "sucess" => true,
));
}
?>