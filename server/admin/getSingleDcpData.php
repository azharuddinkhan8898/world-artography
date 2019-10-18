<?php
// ini_set("display_errors",1);
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
$user->dcp = isset($_GET['dcp']) ? $_GET['dcp'] : die();

// read the details of user to be edited
$stmt = $user->getSingleDcpData();
if($stmt->rowCount()){
    // get retrieved row
    $rows = array();
    // create array
    while($r = $stmt->fetch(PDO::FETCH_ASSOC)){
        $rows[] = $r;
    }
    $user_arr=array(
        "status" => true,
        "data" => $rows
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



