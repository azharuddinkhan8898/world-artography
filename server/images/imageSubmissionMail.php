<?php
// ini_set("display_errors",1);
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 header('Content-Type: application/json');
// get database connection

$email = isset($_GET['email']) ? $_GET['email'] : die();
$name = isset($_GET['name']) ? $_GET['name'] : die();
    $to = $email;
    $subject = "Image Submission (Do not Reply to this mail)";

    $message = "
    <html>
    <head>
    <title>Image Submission (Do not Reply to this mail)</title>
    </head>
    <body>
    <p>Dear ".$name."<br/></p>
    <p>Thank you for submission of your images. Wish you good luck for the contest.</p>
    <p>In case of any query please contact us <a href='mailto:support@worldartography.com'>support@worldartography.com</a></p>
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

    if( $retval == true ) {
        $user_arr=array(
            "status" => true,
            "message" => "Email sent.",
        );
    }else {
        $user_arr=array(
            "status" => false,
            "message" => "Can't send email"
        );
    }
print_r(json_encode($user_arr));
?>