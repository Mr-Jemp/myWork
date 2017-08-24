<?php
session_start();
include '../inc/function.php';
is_power('role_add','添加角色');
include_once '../inc/conn.php';
$out["state"]="err";
$out["error"]="未知错误";

$name=$_POST["name"];
$rname=$_POST["rname"];
$id=intval(trim($_POST["id"]),10);//父ID
if(strlen($name)<1) $out["error"]="请输入部门名";
else if(strlen($rname)<1) $out["error"]="请输入部门描述";
else if($id<0)$out["error"]="数据ID不正确";//0为添加顶级节点
else
{
	$sql="INSERT INTO ht_role (`rolename`, `pid`, `description`) VALUES ('$name', '$id', '$rname');";
	$query=mysql_query($sql);
	if(!$query)$out["error"]="添加失败";
	else 
	{
		$sql="select `id` from ht_role order by `id` desc limit 0,1";
		$query=mysql_query($sql);
		$row=mysql_fetch_array($query);
		if(strlen($row["id"])<1)$out["error"]="数据没有添加";
		else
		{
			$out["state"]="ok";
			$out["error"]="添加成功";
			$out["id"]=$row["id"];
		}
	}
}

echo json_encode($out);
mysql_close($conn);
?>