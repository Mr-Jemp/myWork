<?php
/**
 * Created by PhpStorm.
 * User: liujuncong
 * Date: 15-4-25
 * Time: 下午7:14
 */
session_start();
include_once '../inc/conn.php';

 


$today = date("Y-m-d H:i:s");
$sql="INSERT INTO ht_liuyan(content,uid,ip,date)
VALUES
('$_POST[content]','$_SESSION[uid]','$_SERVER[REMOTE_ADDR]','$today')";

if (!mysql_query($sql)) {
    echo mysql_error();
}
else {
    header("location:liuyan.php");
}



mysql_close($con);
