<?php
session_start();
include_once '../inc/conn.php';
include_once '../function/public.php';
$out["IsSuccess"]=false;
$out["Message"]="未知错误";
$type=@$_REQUEST['type'];
$re=getfreepower("",0,implode(',',$_SESSION['uroles']),$type,$_SESSION['uid']);
$out["tree"]=$re[1];
$out["IsSuccess"]=true;

echo json_encode($out);
?>