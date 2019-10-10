<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');
// include database and object files
include_once './config/database.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user object
$user = new User($db);
// set ID property of user to be edited
// read the details of user to be edited

$query = "SELECT
                    `id`, `email`, `password`, `created`, `name`, `token`
                FROM
                    " . $this->table_name . " 
                WHERE
                    email='".$this->email."' AND password='".$this->password."'";

$stmt = $user->login();
if($stmt->rowCount() > 0){
    // get retrieved row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    // create array
    $user_arr=array(
        "status" => true,
        "message" => "Successfully Login!",
        "id" => $row['id'],
        "email" => $row['email'],
        "name" => $row['name'],
        "token" => $row['token']
    );
}
else{
    $user_arr=array(
        "status" => false,
        "message" => "Invalid email or Password!",
    );
}
// make it json format
print_r(json_encode($user_arr));
?>