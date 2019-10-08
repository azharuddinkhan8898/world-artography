<?php
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
$user->email = $_POST['email'];
$user->password = $_POST['password'];
$user->name = $_POST['name'];
$user->phone = $_POST['phone'];
$user->country = $_POST['country'];
$user->facebook = $_POST['facebook'];
$user->instagram = $_POST['instagram'];
$user->website = $_POST['website'];
$user->created = date('Y-m-d H:i:s');
 
// create the user
if($user->signup()){
    $user_arr=array(
        "status" => true,
        "message" => "Successfully Signup!",
        "id" => $user->id,
        "email" => $user->email
    );
}
else{
    $user_arr=array(
        "status" => false,
        "message" => "email already exists!"
    );
}
print_r(json_encode($user_arr));
?>