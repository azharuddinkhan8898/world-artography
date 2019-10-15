<html>
   
   <head>
      <title>Sending HTML email using PHP</title>
   </head>
   
   <body>
      
      <?php

   //       //echo phpinfo(); exit;
   //       ini_set('display_errors', 1);
   //       ini_set('display_startup_errors', 1);
   //       error_reporting(E_ALL);
   //       // require './PHPMailer-master/src/PHPMailer.php';
   //       // require "./PHPMailer-master/src/SMTP.php";
   //       // require "./PHPMailer-master/src/POP3.php";
   //       // $mail = new PHPMailer\PHPMailer\PHPMailer(true);
   //       // // echo 'sacfs';
   //       // $mail->IsSMTP();
   //       // try{
         
         
   //       // $mail->CharSet = 'UTF-8';
   //       // //$mail->SMTPSecure = 'ssl'; //<----------------- You missed this 
   //       // $mail->Host = 'mail.worldartography.com';
   //       // $Mail->SMTPDebug   = 2; // 2 to enable SMTP debug information
   //       // $mail->Port = '465';
   //       // $mail->SMTPAuth = true;
   //       // $mail->Username = 'admin@worldartography.com';
   //       // $mail->Password = 'Intermind123*';
   //       // $mail->SMTPSecure = '';

   //       // $mail->setFrom('admin@worldartography.com', 'World Artography');
   //       // $mail->addAddress('azharuddinkhan8898@gmail.com', 'azharuddin');     // Add a recipient

   //       // // Content
   //       // $mail->isHTML(true);                                  // Set email format to HTML
   //       // $mail->Subject = 'World Artography Activation';
   //       // $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
   //       // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients'; 
   //       // // echo 'szxcs';

   //       // $mail->send();
   //       //    echo 'Message has been sent';
   //       // } catch (Exception $e) {
   //       //    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
   //       // }
         


   //       $subject = "World Artography Activation11";
    
   //  $message = "<b>Hi,</b>";
   //  $message .= "To complete registration, activate your account, click the following link: <a href='http://testreactapp.ml/#/activate/dvdg'><b>CLICK HERE<b></a>";
   //  $header = "From:admin@worldartography.com \r\n";
   //  $header .= "MIME-Version: 1.0\r\n";
   //  $header .= "Content-type: text/html\r\n";
    
   //  $retval = mail ('azharuddinkhan8898@gmail.com',$subject,$message,$header);
   //    if($retval == true){
   //       echo 'mail send';
   //    }
   //    else{
   //       echo 'not send';
   //    }



   $to = "azharuddinkhan8898@gmail.com, sushantjadhav357@gmail.com";
   $subject = "HTML email";

   $message = "
   <html>
   <head>
   <title>HTML email</title>
   </head>
   <body>
   <p>This email contains HTML Tags!</p>
   <table>
   <tr>
   <th>Firstname</th>
   <th>Lastname</th>
   </tr>
   <tr>
   <td>John</td>
   <td>Doe</td>
   </tr>
   </table>
   </body>
   </html>
   ";

   // Always set content-type when sending HTML email
   $headers = "MIME-Version: 1.0" . "\r\n";
   $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

   // More headers
   $headers .= 'From: <webmaster@example.com>' . "\r\n";
   $headers .= 'Cc: myboss@example.com' . "\r\n";

   mail($to,$subject,$message,$headers);


      ?> 
         
         
      
   </body>
</html>