<?php
// ini_set("display_errors",1);
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 header('Content-Type: application/json');
// get database connection


// set user property values
$name = $_POST['name'];
$email = $_POST['email'];
$contact = $_POST['contact'];
$subject = $_POST['subject'];
$messagee = $_POST['message'];

$to = 'info@worldartography.com';
$subject = "Contact details";

$message = "
<html>
    <body>
        <table rules='all' style='border-color: #000;border:1px solid #000' cellpadding='10'>
            <tr style='background:#000;'>
                <td colspan='2'><img src='http://www.ssindiacosmetics.com/images/logo.svg' width='280' alt='World Artography' /></td>
            </tr>
            <tr>
                <td><strong>Name:</strong></td>
                <td>" . $name . "</td>
            </tr>
            <tr>
                <td><strong>Email:</strong> </td>
                <td>" . $email . "</td>
            </tr>
            <tr>
                <td><strong>Contact:</strong> </td>
                <td>" . $contact . "</td></tr>
            <tr>
                <td><strong>Subject:</strong> </td>
                <td>" . $subject . "</td></tr>
            <tr>
                <td><strong>Message:</strong> </td>
                <td>" . $messagee . "</td></tr>
        </table>
    </body>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <'.$email.'>' . "\r\n";

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