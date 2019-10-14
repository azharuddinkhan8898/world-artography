<?php
// ini_set("display_errors",1);
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 header('Content-Type: application/json');
// get database connection
include_once '../config/database.php';
 
// instantiate user object
include_once '../objects/user.php';
 
require '../PHPMailer-master/src/PHPMailer.php';
require "../PHPMailer-master/src/SMTP.php";



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
    $name = $user->name;




    // ini_set('display_errors', 1);
         // ini_set('display_startup_errors', 1);
         // error_reporting(E_ALL);
         
         // require "./PHPMailer-master/src/Exception.php";
         $mail = new PHPMailer\PHPMailer\PHPMailer();
         // echo 'sacfs';
         
         try{
         // $mail->IsSMTP();
         
         $mail->CharSet = 'UTF-8';
         
         $mail->Host = 'mail.worldartography.com';
         $mail->Port = '465';
         $mail->SMTPAuth = true;
         $mail->Username = 'info@worldartography.com';
         $mail->Password = 'Intermind123*';
         $mail->SMTPSecure = '';

         $mail->setFrom('info@worldartography.com', 'World Artography');
         $mail->addAddress($to, $name);     // Add a recipient

         // Content
         $mail->isHTML(true);                                  // Set email format to HTML
         $mail->Subject = 'World Artography Activation';
         $mail->Body    = "Dear user ".$name."<br/><br/><br/>You have registered with World Artography Photography Contest.<br/><br/>Your account is: <strong>".$to."</strong><br/><br/>To complete registration, activate your account, click the following link: <a href='http://testreactapp.ml/activate/".$user->token."'><b>ACTIVATE THE ACCOUNT</b></a><br/><br/><a href='http://testreactapp.ml/how-to-by-pixels/'><b>Click here</b></a> to know, How to Upload Images<br/><br/>Sincerely,<br/><strong>World Artography team</strong>";
         $mail->AltBody = 'This is the body in plain text for non-HTML mail clients'; 
         // echo 'szxcs';

         $mail->send();
        $user_arr=array(
            "status" => true,
            "message" => "Email sent.",
            "id" => $user->id,
            "email" => $user->email,
            "token" => $user->token,
            "name" => $user->name
        );
         } catch (Exception $e) {
            $user_arr=array(
                "status" => false,
                "message" => "Can't send email"
            );
         }





    // $subject = "World Artography Activation";
    // $message ="Dear user ".$name."<br/><br/><br/>";
    // $message .="You have registered with World Artography Photography Contest.<br/><br/>";
    // $message .="Your account is: <strong>".$to."</strong><br/><br/>";
    // $message .="To complete registration, activate your account, click the following link: <a href='http://testreactapp.ml/activate/".$user->token."'><b>ACTIVATE THE ACCOUNT</b></a><br/><br/>";
    // $message .="<a href='http://testreactapp.ml/how-to-by-pixels/'><b>Click here</b></a> to know, How to Upload Images<br/><br/>";
    // $message .="Sincerely,<br/><strong>World Artography team</strong>";
    // $headers .= "Reply-To: The Sender <admin@worldartography.com>\r\n"; 
    // $headers .= "From: The Sender <admin@worldartography.com>\r\n";  
    // $headers .= "Organization: Sender Organization\r\n";
    // $headers .= "MIME-Version: 1.0\r\n";
    // $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
    // $headers .= "X-Priority: 3\r\n";
    // $headers .= "X-Mailer: PHP". phpversion() ."\r\n" ;


    // if( mail($to, $subject, $message, $headers) ) {
    //     echo "Message sent successfully...";
    //  }else {
    //     echo "Message could not be sent...";
    //  }


    // $subject = "World Artography Activation";
    
    // $message = "<b>Hi,</b>";
    // $message .= "<a href='http://testreactapp.ml/activate/".$user->token."'><b>CLICK HERE<b></a>";
    // $header = "From:admin@worldartography.com \r\n";
    // $header .= "MIME-Version: 1.0\r\n";
    // $header .= "Content-type: text/html\r\n";
    
    // $retval = mail ($to,$subject,$message,$header);
    
    
    
}
else{
    $user_arr=array(
        "status" => false,
        "message" => "email already exists!"
    );
}
print_r(json_encode($user_arr));
?>