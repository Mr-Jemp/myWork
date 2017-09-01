<?php
//验证登陆信息
session_start();
$out["IsSuccess"]=false;
$out["Message"]="未知错误"; 
if(!empty($_POST['Submit']))
{
	$username=$_POST['username'];
	$nametitle=$_POST['nametitle'];
	$mail=$_POST['mail'];
	$userpass=$_POST['password'];
	$cpassword=$_POST['cpassword'];
	$code=$_POST['code'];
	if(strlen($username)<1){$out["Message"]="请输入账号！";}
	else if(strlen($nametitle)<1){$out["Message"]="请输入真实姓名！";}
	else if(strlen($mail)>0 && !preg_match('/^[a-z0-9]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i',$mail)){$out["Message"]="邮箱地址不正确";}
	else if(strlen($userpass)<1){$out["Message"]="请输入密码！";}
	else if($userpass!=$cpassword){$out["Message"]="确认密码不正确！";}
	else if(strlen($code)<1){$out["Message"]="请输入验证码！";}
	else if(strtolower($code)!=strtolower($_SESSION['validate_code'])){$out["Message"]="验证码不正确！";}	
	else
	{	
		include_once '../s/inc/conn.php';
		$sql="select * from ht_user where lower(`username`)=lower('$username')";
		$query=mysql_query($sql);
		$row=mysql_fetch_array($query);
		
		if($row)
		{
			$out["Message"]="账号已存在！";
		}else
		{
			$userpass1=md5($userpass);
			$sql="INSERT INTO ht_user (username,chinese_name,password,reg_data,reg_ip) VALUES('$username','$nametitle','$userpass1','".date("Y-m-d")."','".$_SERVER['REMOTE_ADDR']."');";
			$query=mysql_query($sql);			
			if($query)
			{
				$out["Message"]="注册成功！账号:$username 密码:$userpass 请登录";
				$out["IsSuccess"]=true;
			}else
			{
				$out["Message"]="注册失败！".mysql_error();
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
<link href="/m/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.css" rel="stylesheet">
<script src="/resource/js/jQuery/jquery-1.9.1.js"></script>
<script src="/m/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.js"></script>
<script>
$(function()
{
	$(".ui-icon-check").bind("click",function()
	{
		$.mobile.loading('show');
		var Submit=$("#Submit").val();
		var username=$("#username").val();
		var nametitle=$("#nametitle").val();
		var mail=$("#mail").val();
		var password=$("#password").val();
		var cpassword=$("#cpassword").val();
		var code=$("#code").val();
		$.ajax({ url: "?", type: "POST",data:
		{
			username: username
			,nametitle: nametitle
			,mail: mail
			,password: password
			,cpassword: cpassword
			,code:code
			,"Submit":Submit
		},
		success: function(json)
		{
			$.mobile.loading('hide');
			var data = eval('('+json+')');
			alert(data.Message);
			if(data.IsSuccess)document.location.href="/m/index.htm";
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
	<h1>注册新账号</h1>
	<button class="ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-check">提交</button></div>

	<div data-role="content">
		<form action="?" method="post">
			<input name="Submit" type="hidden" value="注册" id="Submit"/>
			<label for="username">用 户 名:</label>
			<input type="text" name="username" id="username" placeholder="登录号" value="<?=$username?>" data-clear-btn="true">
			<label for="nametitle">真实姓名:</label>
			<input type="text" name="nametitle" id="nametitle" value="<?=$nametitle?>" data-clear-btn="true">
			<label for="mail">邮　　箱:</label>
			<input type="text" name="mail" id="mail" value="<?=$mail?>" data-clear-btn="true">
			<label for="password">密　　码:</label>
			<input type="password" name="password" id="password" value="<?=$password?>" data-clear-btn="true">
			<label for="cpassword">确认密码:</label>
			<input type="password" name="cpassword" id="cpassword" value="<?=$cpassword?>" data-clear-btn="true">
			<label for="cpassword">验　证　码:<img align="absmiddle" id="vcode"  style="cursor: pointer; " src="/s/lib/authimg.php" onclick="vcodes()"></label>
			<input type="text" name="code" id="code" value="" data-clear-btn="true">
		</form>
	</div>
</div> 
<script>
function vcodes(){	
	var num=Math.random();
	var re=document.getElementById("vcode");
	re.src="s/lib/authimg.php?a="+num;
}
</script>
</body>
</html>