<?php
//验证登陆信息
session_start();
include_once '../inc/conn.php';
$out["state"]="err";
$out["error"]="未知错误";
if($_POST['submit'])
{
	$username=$_POST['username'];
	$userpass=$_POST['password'];
	$chinese_name=$_POST['chinese_name'];
	if(strlen($username)<1){$out["error"]="请输入账号！";}
	else if(strlen($userpass)<1){$out["error"]="请输入密码！";}
	else if(strlen($chinese_name)<1){$out["error"]="请输入姓名！";}
	else
	{
		$sql="select * from ht_user where lower(`username`)=lower('$username')";
		$query=mysql_query($sql);
		$row=mysql_fetch_array($query);
		
		if($row)
		{
			$out["error"]="账号已存在！";
		}else
		{
			$userpass=md5($userpass);
			$sql="INSERT INTO ht_user (username,password,chinese_name,reg_data,reg_ip) VALUES('$username','$userpass','$chinese_name','".date("Y-m-d")."','".$_SERVER['REMOTE_ADDR']."');";
			$query=mysql_query($sql);
			if($query)
			{
				$_SESSION['username']=$username;
				$out["state"]="ok";
			}else
			{
				$out["error"]="注册失败！";
			}
		}
	}
}

echo json_encode($out);
?>