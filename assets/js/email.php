<?php
require_once('recaptcha/recaptchalib.php');
$data = array(    'firstname' => "",    'lastname' => "",    'contactno' => "",    'email' => "", 'inquiry' =>"", 'country'=>"",'address'=>"",'organization'=>"");
$err = array(    'firstname' => "",    'lastname' => "",    'contactno' => "",    'email' => "",'inquiry'=>"", 'country'=>"" ,'address'=>"",'organization'=>"",  'captcha' =>"");
$ok_form = true;
$responseArray='';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data["firstname"] = strip_tags(isset($_POST['firstname']) ? htmlspecialchars($_POST['firstname']) : '');
    $data["lastname"] = strip_tags(isset($_POST['lastname']) ? htmlspecialchars($_POST['lastname']) : '' );
    $data["contactno"] = strip_tags(isset($_POST['contactno']) ? htmlspecialchars($_POST['contactno']) : '' );
    $data["email"] = strip_tags(isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '');
    $data["inquiry"] = strip_tags(isset($_POST['inquiry']) ? htmlspecialchars($_POST['inquiry']) : '' );



    if(!isset($_POST['g-recaptcha-response']) || empty($_POST['g-recaptcha-response'])){

        $error["captcha"] = "Please verify your identity ";
        $ok_form = false;

    }
    else{

       // your secret key
        $secret = "6LcBQGIUAAAAAEjkpI0wKXE65SaG-cRO6n98BT-y";
        // empty response
        $response = null;
        // check secret key
        $reCaptcha = new ReCaptcha($secret);
        if ($_POST["g-recaptcha-response"]) {
            $response = $reCaptcha->verifyResponse(
                $_SERVER["REMOTE_ADDR"],
                $_POST["g-recaptcha-response"]
            );
        }


        if ($response == null || !$response->success) {
            $error["captcha"] = "Please verify your identity *";
            $ok_form = false;

            //will work only in lie site.
        }

    }

//first name validation

    if (empty($data["firstname"]))
    {
        $error["firstname"] = "Please enter your first name ";
        $ok_form = false;
    }
    else if (!preg_match("/^[a-zA-Z][a-zA-Z ]*$/", $data["firstname"]))
    {
        $error["firstname"] = "First name is invalid ";
        $ok_form = false;
    }
// last namer validation
    if (empty($data["lastname"]))
    {
        $error["lastname"] = "Please enter your last name";
        $ok_form = false;
    }
    else if (!preg_match("/^[a-zA-Z][a-zA-Z ]*$/", $data["lastname"]))
    {
        $error["lastname"] = "Last name is invalid ";
        $ok_form = false;
    }

//contactnumber validation
    if (empty($data["contactno"]))
    {
        $error["contactno"] = "Please enter your contact number ";
        $ok_form = false;
    }
    else if (!is_numeric($data["contactno"]))
    {
        $error["contactno"] = "Contact number is invalid ";
        $ok_form = false;
    } else if(strlen($data["contactno"])<10){
        $error["contactno"] = "Please enter a valid contact number ";
        $ok_form = false;
    }

//email address validation
    if (empty(  $data["email"] ))
    {
        $error["email"] = "Please enter your email address ";
        $ok_form = false;
    }
    else if (!preg_match('/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})$/',   $data["email"] ))
    {
        $error["email"] = "Email address is invalid ";
        $ok_form = false;
    }


    if (empty($data["inquiry"]))
    {
        $error["inquiry"] = "Please enter your inquiry ";
        $ok_form = false;
    }


    if($ok_form) {

        $message =
            'Full Name:	' . $data["firstname"] . $data["lastname"] . '<br />
                 Subject  :	Contacus <br />
                 Phone    :	' . $data["contactno"] . '<br />
                 Email    :	' . $data["email"] . '<br />
                 Comments :	' . $data["inquiry"] . '
                    ';


        /**
         * This example shows settings to use when sending via Google's Gmail servers.
         */

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
        date_default_timezone_set('Etc/UTC');

        require 'phpmailer/PHPMailerAutoload.php';

//Load dependencies from composer
//If this causes an error, run 'composer install'
        require 'phpmailer/vendor/autoload.php';

//Create a new PHPMailer instance
        $mail = new PHPMailerOAuth;
        $mail->CharSet = "UTF-8";
//Tell PHPMailer to use SMTP
        $mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
        $mail->SMTPDebug = 0;

//Ask for HTML-friendly debug output
        $mail->Debugoutput = 'html';

//Set the hostname of the mail server
        $mail->Host = 'smtp.gmail.com';

//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
        $mail->Port = 465;

//Set the encryption system to use - ssl (deprecated) or tls
        $mail->SMTPSecure = 'ssl';

//Whether to use SMTP authentication
        $mail->SMTPAuth = true;// Connection with the SMTP does require authorization

//Set AuthType
        $mail->AuthType = 'XOAUTH2';
        $mail->Encoding = '8bit';

//User Email to use for SMTP authentication - user who gave consent to our app
        $mail->oauthUserEmail = "panduka29@gmail.com";

//Obtained From Google Developer Console
        $mail->oauthClientId = "763711806159-cifmfnpp4jq86ggk3k76vis1ifqobhd7.apps.googleusercontent.com";

//Obtained From Google Developer Console
        $mail->oauthClientSecret = "6Vsr8Qkb-LrkCtECUE1iqgNz";

//Obtained By running get_oauth_token.php after setting up APP in Google Developer Console.
//Set Redirect URI in Developer Console as [https/http]://<yourdomain>/<folder>/get_oauth_token.php
// eg: http://localhost/phpmail/get_oauth_token.php
        $mail->oauthRefreshToken = "1/L0FFf8vZnlMbns6lpLsDM-ZXDeSuFikAuMvwA0r_ylQ";

//Set who the message is to be sent from
//For gmail, this generally needs to be the same as the user you logged in as
//$mail->setFrom('from@example.com', 'First Last');
        // Compose
        $mail->setFrom($data["email"], $data["firstname"]);
        $mail->addReplyTo($data["email"], $data["firstname"]);
        $mail->Subject = "New Contact Form Enquiry";
        // Subject (which isn't required)
        $mail->msgHTML($message);
//Set who the message is to be sent to
        $mail->addAddress('pywasrilanka@gmail.com', 'Professional youth workers association');

//Set the subject line
//$mail->Subject = 'PHPMailer GMail SMTP test';

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
//$mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));

//Replace the plain text body with one created manually
        $mail->AltBody = 'This is a plain-text message body';
//Attach an image file
//    $mail->addAttachment('images/phpmailer_mini.png');

        $result = '';
//send the message, check for errors
        try {
            $result = $mail->send();

            // Send!

            $responseArray = array('type' => 'success', 'message' => "Thank you for contacting us, we will get back to you soon");


        } catch (phpmailerException $e) {
            $responseArray = array('type' => 'danger', 'message' => "There was an error while submitting the form. Please try again later");
            echo $e->errorMessage(); //Pretty error messages from PHPMailer
        } catch (Exception $e) {
            $responseArray = array('type' => 'danger', 'message' => "There was an error while submitting the form. Please try again later");
            echo $e->getMessage(); //Boring error messages from anything else!
        }


    }
    else if (isset($error["captcha"])&&!empty($error["captcha"])) {     $responseArray = array('type' => 'danger', 'message' => $error["captcha"]); }
    else if ( isset($error["firstname"])&& !empty($error["firstname"])){$responseArray = array('type' => 'danger', 'message' => $error["firstname"]);}
    else if ( isset($error["lastname"])&& !empty($error["lastname"])) { $responseArray = array('type' => 'danger', 'message' => $error["lastname"]);}
    else if ( isset($error["contactno"])&& !empty($error["contactno"])){$responseArray = array('type' => 'danger', 'message' => $error["contactno"]);}
    else if ( isset($error["email"])&& !empty($error["email"])) {       $responseArray = array('type' => 'danger', 'message' => $error["email"]);}
    else if ( isset($error["inquiry"])&& !empty($error["inquiry"])) {   $responseArray = array('type' => 'danger', 'message' => $error["inquiry"]);}

    // if requested by AJAX request return JSON response
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        $encoded = json_encode($responseArray);

        header('Content-Type: application/json');

        echo $encoded;
    }
// else just display the message
    else {
        echo $responseArray['message'];
    }

    unset($mail);


}





?>