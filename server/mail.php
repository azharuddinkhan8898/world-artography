<html>
   
   <head>
      <title>Sending HTML email using PHP</title>
   </head>
   
   <body>
      
      <?php

         
         // ini_set('display_errors', 1);
         // ini_set('display_startup_errors', 1);
         // error_reporting(E_ALL);
         require 'PHPMailer-master/src/PHPMailer.php';
         require "PHPMailer-master/src/SMTP.php";
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
         $mail->addAddress('azharuddinkhan8898@gmail.com', 'azharuddin');     // Add a recipient

         // Content
         $mail->isHTML(true);                                  // Set email format to HTML
         $mail->Subject = 'World Artography Activation';
         $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
         $mail->AltBody = 'This is the body in plain text for non-HTML mail clients'; 
         // echo 'szxcs';

         $mail->send();
            echo 'Message has been sent';
         } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
         }
         


         // $subject = "World Artography Activation";
         // $message ="Dear user <NAME><br/><br/><br/>";
         // $message .="You have registered with World Artography Photography Contest.<br/><br/>";
         // $message .="Your account is: <strong><email ID></strong><br/><br/>";
         // $message .="To complete registration, activate your account, click the following link: <b>ACTIVATE THE ACCOUNT</b><br/><br/>";
         // $message .="<strong>Click here</strong> to know, How to Upload Images<br/><br/>";
         // $message .="Sincerely,<br/><strong>World Artography team</strong>";
         //   $headers .= "Reply-To: The Sender <azharuddinkhan88988@gmail.com>\r\n"; 
         //   $headers .= "Return-Path: The Sender <azharuddinkhan8898@gmail.com>\r\n"; 
         //   $headers .= "From: The Sender <azharuddinkhan8898@gmail.com>\r\n";  
         //   $headers .= "Organization: Sender Organization\r\n";
         //   $headers .= "MIME-Version: 1.0\r\n";
         //   $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
         //   $headers .= "X-Priority: 3\r\n";
         //   $headers .= "X-Mailer: PHP". phpversion() ."\r\n" ;
         // if( mail("azharuddinkhan8898@gmail.com", $subject, $message, $headers) ) {
         //    echo "Message sent successfully...";
         // }else {
         //    echo "Message could not be sent...";
         // }
      ?> 
         
         
      
   </body>
</html>