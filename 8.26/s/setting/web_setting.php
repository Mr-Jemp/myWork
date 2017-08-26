<?php
session_start();
include_once '../inc/conn.php';
$out["IsSuccess"]=false;
$out["Message"]="未知错误";
$out["res"]="";

$web_name=@$_POST["web_name"];
$web_logo=@$_POST["web_logo"];
$web_beian=@$_POST["web_beian"];
$web_company=@$_POST["web_company"];

$get=@$_POST["get"];

if($get=="yes")
{
	$query=mysql_query("select * from `ht_setting`");
	$row=mysql_fetch_array($query);
	$out["web_name"]=$row['web_name'];
	$out["web_logo"]=$row['logo'];
	$out["web_beian"]=$row['beian'];
	$out["web_company"]=$row['company'];
	$out["Message"]="加载成功";
	$out["IsSuccess"]=true;
}else
{
	$query=mysql_query("select * from `ht_setting`");
	$row=mysql_fetch_array($query);
	if($row)
	{
		$sql="UPDATE `ht_setting` SET `web_name`='$web_name',`logo`='$web_logo',`beian`='$web_beian',`company`='$web_company'";
		mysql_query($sql);
		$out["Message"]="成功保存";
	}else
	{
		$sql="INSERT INTO `ht_setting` (`web_name`,`logo`,`beian`,`company`) VALUES('$web_name','$web_logo','$web_beian','$web_company')";
		mysql_query($sql);
		$out["Message"]="保存成功";
	}
	$out["IsSuccess"]=true;
}
echo json_encode($out);
mysql_close($conn);
?>