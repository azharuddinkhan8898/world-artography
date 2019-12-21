<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
class Database{
 
    // Testing server
    // private $host = "localhost";
    // private $db_name = "ssindiac_artography";
    // private $username = "ssindiac_ssindia";
    // private $password = "azhar123!";

    //Live database
    // private $host = "localhost";
    // private $db_name = "worldart_photography";
    // private $username = "worldart_admin";
    // private $password = "Intermind123*";

    // Local server
    private $host = "localhost:8889";
    private $db_name = "test";
    private $username = "root";
    private $password = "root";
    
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>