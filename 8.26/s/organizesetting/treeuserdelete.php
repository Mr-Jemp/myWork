<?php
session_start();
include '../inc/function.php';
is_power('role_member_delete','删除角色成员');
include_once '../inc/conn.php';
$out["IsSuccess"]=false;
$out["Message"]="未知错误";

$id=intval(trim($_POST["staffId"]),10);
if($id<1)$out["Message"]="数据ID不正确";
else
{
	$sql="DELETE FROM `ht_role_user` where  `id`='$id'";
	$query=mysql_query($sql);
	if(!$query)$out["Message"]="删除失败";
	else {$out["IsSuccess"]=true;$out["Message"]="删除成功";}
}
echo json_encode($out);
mysql_close($conn);
?>