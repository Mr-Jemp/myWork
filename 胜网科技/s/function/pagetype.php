<?php
session_start();
include_once '../inc/conn.php';
include_once '../function/public.php';
$out["IsSuccess"]=false;
$out["Message"]="未知错误";
$formid=intval($_REQUEST['formid']);

$sql="select `is_data_form` from `ht_form` where `id`='$formid'";
$query=mysql_query($sql);
$row=mysql_fetch_array($query);
$out["info"]=$row;
$out["IsSuccess"]=true;

echo json_encode($out);
?>