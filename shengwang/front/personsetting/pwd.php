<?php
session_start();
include_once '../../s/inc/conn.php';
$out["IsSuccess"]=false;
$out["Message"]="未知错误";

$uid=$_SESSION['uid'];

$out["Message"]="未知错误";

$src_pwd=$_POST["src_pwd"];
$new_pwd=$_POST["new_pwd"];
$ok_pwd=$_POST["ok_pwd"];
for(;;)
{
	if(strlen($src_pwd)<1)$out["Message"]="请输入原密码";
	else if(strlen($new_pwd)<1)$out["Message"]="请输入新的密码";
	else if($new_pwd!=$ok_pwd)$out["Message"]="确认密码和新的密码不一至";
	else
	{
		$rs=mysql_fetch_array(mysql_query("select * from ht_user where `uid`='$uid'"));
		if(!$rs){$out["Message"]="找不到账号";break;}
		if($rs['password']!=md5($src_pwd)){$out["Message"]="原密码不正确";break;}

		$sql="UPDATE `ht_user` SET `password`='".md5($ok_pwd)."' where `uid`='$uid'";
		mysql_query($sql);
		$out["Message"]="成功保存";		
		$out["IsSuccess"]=true;
	}
	break;
}

echo json_encode($out);
?>