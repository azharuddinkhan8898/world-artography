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

// set user property values




$user->token = $_POST['token'];
$user->password = $_POST['password'];
 
// create the user
if($user->resetPassword()){
    $user_arr=array(
        "status" => true,
        "message" => "reseted"
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