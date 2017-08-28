<?php
//列出会员
session_start();
include_once '../inc/conn.php';
$out["IsSuccess"]=false;
$out["Message"]="未知错误";

function getUser($roleId)
{
	$sql="select chinese_name,b.username as username,a.id as id from `ht_role_user` a left join `ht_user` b on(a.uid=b.uid) where a.`role_id`='$roleId'";
	$query=mysql_query($sql);
	$isadd=false;
	while($row=mysql_fetch_array($query))
	{
		if($isadd)$out.=",";
		$out.='{';
		$out.='"Id":"'.$row["id"].'",';
		$out.='"Zhanghao":"'.$row["username"].'",';
		$out.='"Name":"'.$row["chinese_name"].'"';
		$out.='}';
		$isadd=true;
	}
	return $out;
}
$roleId=intval(trim($_POST["roleId"]),10);

$out["Data"]=json_decode("[".getUser($roleId)."]");
$out["IsSuccess"]=true;

echo json_encode($out);
mysql_close($conn);
?>