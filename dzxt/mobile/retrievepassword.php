<?php
//验证登陆信息
session_start();
$out["IsSuccess"]=false;
$out["Message"]="未知错误"; 
if(!empty($_POST['Submit']))
{
	$username=$_POST['username'];
	$mail=$_POST['mail'];
	$code=$_POST['code'];
	if(strlen($username)<1){$out["Message"]="请输入账号";}
	else if(strlen($mail)<1 || !preg_match('/^[a-z0-9]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i',$mail)){$out["Message"]="邮箱地址不正确";}
	else if(strlen($code)<1){$out["Message"]="请输入验证码！";}
	else if(strtolower($code)!=strtolower($_SESSION['validate_code'])){$out["Message"]="验证码不正确！";}	
	else
	{	
		include_once '../s/inc/conn.php';
		$sql="select * from ht_user where `username`='$username' and `email`='$mail'";
		$query=mysql_query($sql);
		$row=mysql_fetch_array($query);
		
		if(!$row)
		{
			$out["Message"]="找不到账号";
		}else if(strlen($row['username'])<1)
		{
			$out["Message"]="账号不存在！";
		}else if($row['username']!=$username)
		{
			$out["Message"]="账号不正确！";
		}else if(strlen($row['email'])<1)
		{
			$out["Message"]="邮箱不存在！";
		}else if($row['email']!=$mail)
		{
			$out["Message"]="邮箱不正确！";
		}else
		{
			$sql="update ht_user set `password`='".md5("123456")."' where `uid`='".$row['uid']."'";
			$query=mysql_query($sql);			
			if($query)
			{
				$out["Message"]="密码已重置为123456为了安全，请登录更改！";
				$out["IsSuccess"]=true;
			}else
			{
				$out["Message"]="提交失败！".mysql_error();
			}
		}
	}
	exit(json_encode($out)); 
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>注册会员</title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<meta name="viewport" content="width=device-width, height=device-height,initial-scale=1.0,maximum=scale=1.0,user-scalable=no;">
<link href="/mobile/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.css" rel="stylesheet">
<script src="/resource/js/jQuery/jquery-1.9.1.js"></script>
<script src="/mobile/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.js"></script>
<script>
$(function()
{
	$(".ui-icon-check").bind("click",function()
	{
		$.mobile.loading('show');
		var Submit=$("#Submit").val();
		var username=$("#username").val();
		var mail=$("#mail").val();
		var code=$("#code").val();
		$.ajax({ url: "?", type: "POST",data:
		{
			username:username
			,mail: mail
			,code:code
			,"Submit":Submit
		},
		success: function(json)
		{
			$.mobile.loading('hide');
			var data = eval('('+json+')');
			alert(data.Message);
			if(data.IsSuccess)document.location.href="/mobile/login.htm";
		}
		});
	});
	$(".ui-icon-back").bind("click",function()
	{
		history.go(-1);
	});
});
</script>
</head>
<body>
<div data-role="page" id="pageone">
<div data-role="header">
	<a href="#" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-back">返回</a>
	<h1>取回密码</h1>
	<button class="ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-check">提交</button></div>

	<div data-role="content">
		<form action="?" method="post">
			<input name="Submit" type="hidden" value="注册" id="Submit"/>
			<label for="username">账　　号:</label>
			<input type="text" name="username" id="username" value="<?=$username?>" data-clear-btn="true">
			<label for="mail">邮　　箱:</label>
			<input type="text" name="mail" id="mail" value="<?=$mail?>" data-clear-btn="true">
			<label for="cpassword">验 证 码:<img align="absmiddle" id="vcode"  style="cursor: pointer; " src="/s/lib/authimg.php" onclick="vcodes()"></label>
			<input type="text" name="code" id="code" value="" data-clear-btn="true">
		</form>
	</div>
</div> 
<script>
function vcodes(){	
	var num=Math.random();
	var re=document.getElementById("vcode");
	re.src="/s/lib/authimg.php?a="+num;
}
</script>
</body>
</html>