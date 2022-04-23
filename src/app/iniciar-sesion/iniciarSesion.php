<?php
if(isset ($_POST["enviar"])){
    $conn = new Mongo();
    $db = $conn->selectDB('WorldWideGaming');    
    $collection = $db->Juego;
    echo("hola");
}else{
   
}
?>