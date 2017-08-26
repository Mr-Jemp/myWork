<?php
session_start();
include_once '../inc/conn.php';
$config=load('../inc/conf.php');

$role_id=intval(trim($_POST["role_id"]),10);
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

//读出上次记录的权限
$names[3]="view";
$names[4]="edit";
$names[5]="add";
$names[6]="delete";

for($k=3;$k<=6;$k++)
{
	$result[$names[$k]]="";
	$result[$names[$k]."_sel"]=false;
	$query=mysql_query("SELECT function_name FROM `ht_power` WHERE role_id='$role_id' and form_id='$form_id' and function_type='$k'");
	$row=mysql_fetch_array($query);
	if(!$row)continue;
	$result[$names[$k]]=$row["function_name"];
	$result[$names[$k]."_sel"]=true;	
}

//生成JSON
$out["IsSuccess"]=false;
$out["Message"]="未知错误";
$out["Config"]=$config;
$out["fields"]=$fields;
$out["fieldv"]=$fieldv;
$out["result"]=$result;

echo json_encode($out);
mysql_close($conn);
?>