<?php
session_start();
include '../inc/function.php';
is_power('role_modify','修改角色');
include_once '../inc/conn.php';
$out["state"]="err";
$out["error"]="未知错误";

$id=intval(trim($_POST["id"]),10);
$pid=intval(trim($_POST["pid"]));
if($id<1)$out["error"]="数据ID不正确";
else if($pid<1)$out["error"]="数据父节点不正确";
else if($id==$pid)$out["error"]="父节点不能是自已";
else if(IsPidInSubId($pid,$id))$out["error"]="父节点不能设置到自已的子节点";
else
{
	$sql="update ht_role set `pid`='$pid' where  id='$id'";
	$query=mysql_query($sql);
	if(!$query)$out["error"]="修改失败";
	else {$out["state"]="ok";$out["error"]="修改成功";}
}
echo json_encode($out);
mysql_close($conn);
//要设置的父ID是否在他自已的子ID
function IsPidInSubId($pid,$id)
{
	$sql="select id from ht_role where pid='$id'";
	$query=mysql_query($sql);
	while($row=mysql_fetch_array($query))
	{
		if($row['id']==$pid)return true;
		$is=IsPidInSubId($pid,$row['id']);
		if($is)return true;
	}
	return false;
}	
?>