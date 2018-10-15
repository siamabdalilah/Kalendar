<?
require 'database.php';
header("Content-Type: application/json"); 
echo json_encode(array(
		'session' => true,
		'csrf' => $_SESSION['token'],
		'user' => $_SESSION['username']
	));
exit;

if (isset($_SESSION)){
	echo json_encode(array(
		'session' => true,
		'csrf' => $_SESSION['token'],
		'user' => $_SESSION['username']
	));
}
else{
	echo json_encode(array('session' => false));
}

exit;

?>
