<?php
include_once '../inc/conn.php';
$username = $_REQUEST['add_name'];
$password = $_REQUEST['add_user'];
$time = date("Y-m-d");
$sql = "INSERT INTO ht_user (username,password,reg_data,reg_ip) VALUES ('".$username."', '".$password."', '".$time."','".$_SERVER[REMOTE_ADDR]."')";
mysql_query($sql);
echo $sql;
echo mysql_error();
mysql_close($con);
?>