<?php
session_start();
if ($_SESSION['username']==""){
echo "<script language='javascript'>location='/login.php';</script>";
exit;
}
?>