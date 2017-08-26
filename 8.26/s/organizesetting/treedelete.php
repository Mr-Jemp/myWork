<?php
session_start();
include '../inc/function.php';
is_power('role_delete','删除角色');
include_once '../inc/conn.php';
$out["state"]="err";
$out["error"]="未知错误";
$id=intval(trim($_POST["id"]),10);
if($id<1)$out["error"]="数据ID不正确";
else
{
	$sql="select id from ht_role where pid='$id' ";
	$query=mysql_query($sql);
	$row=mysql_fetch_array($query);
	if($row)$out["error"]="请先删除下面的节点";
	else
	{
		$sql="DELETE FROM ht_role where id='$id'";
		$query=mysql_query($sql);

		$sql="DELETE FROM ht_power where role_id='$id'";
		$query=mysql_query($sql);

		$sql="DELETE FROM ht_role_user where role_id='$id'";
		$query=mysql_query($sql);
		
		$out["state"]="ok";
		$out["error"]="删除成功";
	}
}
echo json_encode($out);
mysql_close($conn);
?>