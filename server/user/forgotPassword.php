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
$user->email = isset($_GET['email']) ? $_GET['email'] : die();

// read the details of user to be edited
$stmt = $user->forgotPassword();

if($stmt->rowCount() > 0){
    // get retrieved row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    // create array

    if($row['active'] == 'active'){


        $to = $row['email'];
        $subject = "World Artography Password Reset";

        $message = "
        <html>
        <head>
        <title>World Artography Password Reset</title>
        </head>
        <body>
        <p>Dear ".$name."<br/></p>
        <p>You have requested for password reset.</p>
        <p>Your account is: <strong>".$to."</strong></p>
        <p>To reset your password, click the following link: <a href='http://www.ssindiacosmetics.com/forgot-password/".$row['token']."'><b>RESET PASSWORD</b></p>
        
        
        <p>Sincerely,<br/><strong>World Artography team</strong></p>
        </body>
        </html>
        ";

        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

        // More headers
        $headers .= 'From: <info@worldartography.com>' . "\r\n";

        $retval = mail($to,$subject,$message,$headers);
        if($retval == true){
            $user_arr=array(
                "status" => true,
                "message" => "forgot password mail sent."
            );
        }else{
            $user_arr=array(
                "status" => false,
                "message" => "Email not sent."
            );
        }
        
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
        "message" => "Email not found.",
    );
}
// make it json format
print_r(json_encode($user_arr));
?>