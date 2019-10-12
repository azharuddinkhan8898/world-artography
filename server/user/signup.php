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
$length = 64;
// set user property values
$user->email = $_POST['email'];
$user->password = $_POST['password'];
$user->name = $_POST['name'];
$user->phone = $_POST['phone'];
$user->country = $_POST['country'];
$user->facebook = $_POST['facebook'];
$user->instagram = $_POST['instagram'];
$user->website = $_POST['website'];
$user->token = bin2hex(random_bytes($length));
$user->created = date('Y-m-d H:i:s');
 
// create the user
if($user->signup()){
    $to = $user->email;
    $subject = "World Artography Activation";
    
    $message = "<b>Hi,</b>";
    $message .= "<a href='http://testreactapp.ml/#/activate/".$user->token."'><b>CLICK HERE<b></a>";
    $header = "From:admin@worldartography.com \r\n";
    $header .= "MIME-Version: 1.0\r\n";
    $header .= "Content-type: text/html\r\n";
    
    $retval = mail ($to,$subject,$message,$header);
    
    if( $retval == true ) {
        $user_arr=array(
            "status" => true,
            "message" => "Email sent.",
            "id" => $user->id,
            "email" => $user->email,
            "token" => $user->token,
            "name" => $user->name
        );
    }else {
        $user_arr=array(
            "status" => false,
            "message" => "Can't send email"
        );
    }
    
}
else{
    $user_arr=array(
        "status" => false,
        "message" => "email already exists!"
    );
}
print_r(json_encode($user_arr));
?>