<?php
session_start();
include '../inc/function.php';
is_power('page_add');
include_once '../inc/conn.php';
$out["IsSuccess"]=false;
$out["Message"]="未知错误";

$role_id=intval(trim($_POST["role_id"]),10);
$form_id=intval(trim($_POST["form_id"]),10);

if($role_id<=0)
{
	$out["Message"]="请选择角色";
}else if($form_id<=0)
{
	$out["Message"]="请选择页面";
}
else
{
	$query=mysql_query("SELECT * FROM `ht_power` WHERE form_id='$form_id' and role_id='$role_id' and function_type='0'");
	$row=mysql_fetch_array($query);
	if($row) $out["Message"]="该权限已设置";
	else
	{
		$query=mysql_query("INSERT INTO `ht_power` (`form_id`, `role_id`,`function_type`,`function_name`) VALUES ('$form_id', '$role_id','0','view.page');");
		if($query==false)$out["Message"]="设置出错";
		else
		{
			$out["Message"]="提交成功";
			$out["IsSuccess"]=true;
		}
	}
}
echo json_encode($out);
mysql_close($conn);
?>