<?php
session_start();
include_once '../inc/conn.php';
$out["IsSuccess"]=false;
$out["Message"]="未知错误";
$out["res"]="";

$content=@$_POST["content"];
$get=@$_POST["get"];

if($get=="yes")
{
	$query=mysql_query("select * from `ht_setting`");
	$row=mysql_fetch_array($query);
	$out["res"]=$row['gonggao'];
	$out["Message"]="加载成功";
	$out["IsSuccess"]=true;
}else
{
	$query=mysql_query("select * from `ht_setting`");
	$row=mysql_fetch_array($query);
	if($row)
	{
		$sql="UPDATE `ht_setting` SET `gonggao`='$content'";
		mysql_query($sql);
		$out["Message"]="成功保存";
	}else
	{
		$sql="INSERT INTO `ht_setting` (`gonggao`) VALUES('$content')";
		mysql_query($sql);
		$out["Message"]="保存成功";
	}
	$out["IsSuccess"]=true;
}
echo json_encode($out);
mysql_close($conn);
?>