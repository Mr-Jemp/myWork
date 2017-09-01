<?php
session_start();
if ($_SESSION["level"]==0) {
	echo "<script language='javascript'>alert('抱歉，你没有管理权限！');location='/index.php';</script>";
	exit;
}
?>