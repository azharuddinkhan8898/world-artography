<html>
   
   <head>
      <title>Sending HTML email using PHP</title>
   </head>
   
   <body>
      
      <?php

         $subject = "World Artography Activation";
         $message = "testing a message";
           $headers .= "Reply-To: The Sender <azharuddinkhan88988@gmail.com>\r\n"; 
           $headers .= "Return-Path: The Sender <azharuddinkhan8898@gmail.com>\r\n"; 
           $headers .= "From: The Sender <azharuddinkhan8898@gmail.com>\r\n";  
           $headers .= "Organization: Sender Organization\r\n";
           $headers .= "MIME-Version: 1.0\r\n";
           $headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";
           $headers .= "X-Priority: 3\r\n";
           $headers .= "X-Mailer: PHP". phpversion() ."\r\n" ;
         if( mail("azharuddinkhan8898@gmail.com", $subject, $message, $headers) ) {
            echo "Message sent successfully...";
         }else {
            echo "Message could not be sent...";
         }
      ?> 
         
         
      
   </body>
</html>