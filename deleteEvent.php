<?php
require 'database.php';

$json_str = file_get_contents("php://input");
$json_obj = json_encode($json_str,true);

$user = $json_obj['event'];
$eventID = $json_obj['event_id'];

// first check event being deleted belongs to the user that's trying to delete it

$stmt1->prepare("SELECT username FROM users where username=?");
$stmt1->bind_param('s',$user);
$stmt1->execute;
$stmt1->bind_result($current_user);
$stmt1->fetch();
$stmt1->close;

$stmt2->prepare("SELECT event_id from events where event_id=?");
$stmt2->bind_param('i', $event_id);
$stmt2->execute();
$stmt2->bind_result($event_id_db);
$stmt2->fetch();
$stmt2->close();

if ($event_id_db != $eventID) {
    // add error message
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Username or Password"
    ));
}

else {
// deleting event
$stmt3->prepare("DELETE from events WHERE event_id=?");
$stmt3->bind_param(i,$eventID);
$stmt3->execute;
$stmt3->close;

echo json_encode(array(
    "success" => true,
    "message" => "Event deleted!"
));
}

?>
