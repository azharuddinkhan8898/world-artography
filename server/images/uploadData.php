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


function resize_image($file, $w, $h, $crop=FALSE) {
    list($width, $height) = getimagesize($file);
    $r = $width / $height;
    if ($crop) {
        if ($width > $height) {
            $width = ceil($width-($width*abs($r-$w/$h)));
        } else {
            $height = ceil($height-($height*abs($r-$w/$h)));
        }
        $newwidth = $w;
        $newheight = $h;
    } else {
        if ($w/$h > $r) {
            $newwidth = $h*$r;
            $newheight = $h;
        } else {
            $newheight = $w/$r;
            $newwidth = $w;
        }
    }
    $src = imagecreatefromjpeg($file);
    $dst = imagecreatetruecolor($newwidth, $newheight);
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

    return $dst;
}


$user = new User($db);
$length = 32;
// set user property values


$data = $_POST['url'];
list($type, $data) = explode(';', $data);
list(, $data)      = explode(',', $data);
$decodedData = base64_decode($data);


// $encodedData = str_replace(' ','+',$data);
// $decodedData = base64_decode($encodedData);


$code = bin2hex(random_bytes($length));
file_put_contents('uploads/a' . $code . '.jpg', $decodedData);


$user->id = $_POST['id'];
$user->email = $_POST['email'];
$user->name = $_POST['name'];
$user->category = $_POST['category'];
$user->title = $_POST['title'];
$user->camera = $_POST['camera'];
$user->lens = $_POST['lens'];
$user->aperture = $_POST['aperture'];
$user->shutter = $_POST['shutter'];
$user->iso = $_POST['iso'];
$user->other = $_POST['other'];
$user->approved = $_POST['approved'];
$user->dcpcoupon = $_POST['dcpcoupon'];
$user->paypalTranId = $_POST['paypalTranId'];
$user->created = date('Y-m-d H:i:s');

$user->url = 'uploads/a' . $code . '.jpg';


 
// create the user
if($user->uploadImage()){
    $user_arr=array(
        "status" => true,
        "message" => "Successfully Signup!"
    );
}
else{
    $user_arr=array(
        "status" => false,
        "message" => "Error"
    );
}
print_r(json_encode($user_arr));
?>