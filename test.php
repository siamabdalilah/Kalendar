<?php

$v = array('a' => 'id', 'b' => array(array('a' => 'b', 'b' => 'c'), array('a' => 'b')));

echo json_encode($v, JSON_FORCE_OBJECT);

?>