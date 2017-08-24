<?php
//列出会员
session_start();
include '../inc/function.php';
is_power('role_member_add','添加角色成员');
include_once '../inc/conn.php';
$out["IsSuccess"]=false;
$out["Message"]="未知错误";

function getUser()
{
	$sql="select uid,username,chinese_name from ht_user";
	$query=mysql_query($sql);
	$isadd=false;
	while($row=mysql_fetch_array($query))
	{
		if($isadd)$out.=",";
		$out.='{';
		$out.='"Id":"'.$row["uid"].'",';
		$out.='"Zhanghao":"'.$row["username"].'",';
		$out.='"Name":"'.$row["chinese_name"].'"';
		$out.='}';
		$isadd=true;
	}
	return $out;
}
$out["Data"]=json_decode("[".getUser()."]");
$out["IsSuccess"]=true;

echo json_encode($out);
mysql_close($conn);
?>