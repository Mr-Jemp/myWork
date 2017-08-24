<?php
//设置组成员
session_start();
include_once '../inc/conn.php';
$out["IsSuccess"]=false;
$out["Message"]="未知错误";
$roleId=intval(trim($_POST["roleId"]),10);
$staffId=intval(trim($_POST["staffId"]),10);

if($roleId<1)$out["Message"]="组信息ID不正确";
else if($staffId<1)$out["Message"]="请选择成员";
else
{
	$sql="select * from ht_role_user where uid='$staffId' and role_id='$roleId'";
	$query=mysql_query($sql);
	$row=mysql_fetch_array($query);
	if($row)$out["Message"]="成员已存在";
	else
	{
		$sql="INSERT INTO ht_role_user (`uid`, `role_id`) VALUES ('$staffId', '$roleId');";
		$query=mysql_query($sql);
		$out["IsSuccess"]=true;
		$out["Message"]="设置成功";
	}
}

echo json_encode($out);
mysql_close($conn);
?>