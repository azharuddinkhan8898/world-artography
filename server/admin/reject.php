<?php
// ini_set("display_errors",1);
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 header('Content-Type: application/json');
// get database connection
include_once '../config/database.php';
 
// instantiate user object
include_once '../objects/user.php';
 
$database = new Database();
$db = $database->getConnection();




$user = new User($db);
$user->dcpcoupon = $_POST['dcpcoupon'];

// create the user
if($user->reject()){
    $user_arr=array(
        "status" => true,
        "message" => "Successfully updated!"
    );
}
else{
    $user_arr=array(
        "status" => false,
        "message" => "Error"
    );
}
print_r(json_encode($user_arr));
?>