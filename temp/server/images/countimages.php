<?php
ini_set("display_errors",1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user object
$user = new User($db);
// set ID property of user to be edited
$user->email = isset($_GET['email']) ? $_GET['email'] : die();
// read the details of user to be edited
$stmt = $user->countImages();
if($stmt->rowCount() > 0){
    $user_arr=array(
        "status" => true,
        "data" => $stmt->rowCount()
    );
}
else{
    $user_arr=array(
        "status" => true,
        "data" => 0,
    );
}
// make it json format
print_r(json_encode($user_arr));
?>



