<?php
ini_set("display_errors",1);
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
$user->url = $_POST['url'];
$user->email = $_POST['email'];
$user->name = $_POST['name'];
// create the user
if($user->delete()){

    $to = $user->email;
    $name = $user->name;

    $subject = "World Artography DCP Expeditions Rejection";

    $message = "
    <html>
    <head>
    <title>World Artography</title>
    </head>
    <body>
    <p>Dear ".$name."<br/></p>
    <p>We have deleted your uploaded image as the same not complying with World Artography terms and conditions.</p>
    <p>Kindly contact <a href='mailto:admin@worldartography.com'>admin@worldartography.com</a> for further details.<br/></p>
    <p>Sincerely,<br/><strong>World Artography team</strong></p>
    </body>
    </html>
    ";

    // Always set content-type when sending HTML email
   $headers = "MIME-Version: 1.0" . "\r\n";
   $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

   // More headers
   $headers .= 'From: <info@worldartography.com>' . "\r\n";

   $retval = mail($to,$subject,$message,$headers);
    if($retval){
        $user_arr=array(
            "status" => true,
            "message" => "Successfully updated!"
        );
    }
    else{
        $user_arr=array(
            "status" => false,
            "message" => "email not sent."
        );
    }
    
}
else{
    $user_arr=array(
        "status" => false,
        "message" => "Error"
    );
}
print_r(json_encode($user_arr));
?>