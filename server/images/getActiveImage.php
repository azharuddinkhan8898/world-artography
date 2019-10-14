<?php
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
$user->id = isset($_GET['id']) ? $_GET['id'] : die();
// read the details of user to be edited
$stmt = $user->getActiveImage();
if($stmt->rowCount() > 0){
    // get retrieved row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    // create array
    $start_date = new DateTime($row['activeCreated']);
    $since_start = $start_date->diff(new DateTime());

    $minutes = $since_start->days * 24 * 60;
    $minutes += $since_start->h * 60;
    $minutes += $since_start->i;
    //echo $minutes.' minutes';

    if($row['active'] == 'active'){
        $user_arr=array(
            "status" => true,
            "message" => $minutes
        );
    }
    else{
        $user_arr=array(
            "status" => false,
            "message" => "Not active"
        );
    }
    
}
else{
    $user_arr=array(
        "status" => false,
        "message" => "Not found",
    );
}
// make it json format
print_r(json_encode($user_arr));
?>