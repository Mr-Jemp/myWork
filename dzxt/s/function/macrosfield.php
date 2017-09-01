<?php
session_start();
include_once '../inc/conn.php';

$form_id=intval(trim($_POST["from_id"]),10);

//读出该表单的所有字段
$query=mysql_query("SHOW FULL COLUMNS FROM ht_form_data_$form_id WHERE Field LIKE 'data_%'");
for($i=0;;$i++)
{
	$row=mysql_fetch_array($query);
	if(!$row)break;
	$fieldv[$i]="`".$row["Field"]."`";
	$fields[$i]=$row["Comment"];
	if(strlen($fields[$i])<1)$fields[$i]=$row["Field"];
}
//生成JSON
$out["IsSuccess"]=true;
$out["Message"]="未知错误";
$out["fields"]=$fields;
$out["fieldv"]=$fieldv;

echo json_encode($out);
mysql_close($conn);
?>