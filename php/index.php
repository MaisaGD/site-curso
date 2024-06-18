<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "escola_ti";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>
