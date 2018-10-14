 <?php
 
 header("Content-Type: application/json")

 require 'database.php';

 $stmt = mysqli->prepare(".....");

 $stmt->bind_param();
 $stmt->execute();
 $stmt->bind_result();

 $stmt->close();

 if (...conditional statement for sucessful query) {
     echo json_encode(array(
         "sucess" => true;
         "title" =>
         "dateofEvent" => 
         "datetimeofEvent" =>
         "tag" => 
     ));
     exit;
 }

 ?>

