<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
class User{
 
    // database connection and table name
    private $conn;
    private $table_name = "users";
 
    // object properties
    public $id;
    public $name;
    public $password;
    public $created;
    public $email;
    public $phone;
    public $country;
    public $facebook;
    public $instagram;
    public $website;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    // signup user
    function signup(){
        if($this->isAlreadyExist()){
            return false;
        }
        // query to insert record
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    email=:email,name=:name, password=:password, phone=:phone, country=:country, facebook=:facebook, instagram=:instagram, website=:website, created=:created";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // sanitize
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->password=htmlspecialchars(strip_tags($this->password));
        $this->phone=htmlspecialchars(strip_tags($this->phone));
        $this->country=htmlspecialchars(strip_tags($this->country));
        $this->facebook=htmlspecialchars(strip_tags($this->facebook));
        $this->instagram=htmlspecialchars(strip_tags($this->instagram));
        $this->website=htmlspecialchars(strip_tags($this->website));
        $this->created=htmlspecialchars(strip_tags($this->created));
        // bind values
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":country", $this->country);
        $stmt->bindParam(":facebook", $this->facebook);
        $stmt->bindParam(":instagram", $this->instagram);
        $stmt->bindParam(":website", $this->website);
        $stmt->bindParam(":created", $this->created);
        // execute query
        if($stmt->execute()){
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    
    }
    // login user
    function login(){
        // select all query
        $query = "SELECT
                    `id`, `email`, `password`, `created`
                FROM
                    " . $this->table_name . " 
                WHERE
                    email='".$this->email."' AND password='".$this->password."'";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
    
    // a function to check if email already exists
    function isAlreadyExist(){
        $query = "SELECT *
            FROM
                " . $this->table_name . " 
            WHERE
                email='".$this->email."'";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        if($stmt->rowCount() > 0){
            return true;
        }
        else{
            return false;
        }
    }
}