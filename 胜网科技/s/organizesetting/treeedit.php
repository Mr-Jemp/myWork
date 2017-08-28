<?php
session_start();
include '../inc/function.php';
is_power('role_modify','修改角色');
include_once '../inc/conn.php';
$out["state"]="err";
$out["error"]="未知错误";

$name=$_POST["name"];
$rname=$_POST["rname"];
$id=intval(trim($_POST["id"]),10);
$pid=intval(trim($_POST["pid"]));
if(strlen($name)<1) $out["error"]="请输入部门名";
else if(strlen($rname)<1) $out["error"]="请输入部门描述";
else if($id<1)$out["error"]="数据ID不正确";
else
{
	$sql="update ht_role set `pid`='$pid',`rolename`='$name',`description`='$rname' where  id='$id'";
	$query=mysql_query($sql);
	if(!$query)$out["error"]="修改失败";
	else {$out["state"]="ok";$out["error"]="修改成功";}
}
echo json_encode($out);
mysql_close($conn);
?>