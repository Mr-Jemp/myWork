<?php
//验证登陆信息
session_start();
include_once '../inc/conn.php';
include_once '../power/public.php';
$out["state"]="err";
$out["error"]="未知错误";
if($_POST['submit']){
	$username=$_POST['username'];
	$userpass=$_POST['passwordid'];
	if(strlen($username)<1)$out["error"]="请输入账号！";
	else if(strlen($userpass)<1)$out["error"]="请输入密码！";
	else
	{
		$userpass=md5($userpass);
		$sql="select * from ht_user where `username`='$username'";
		$query=mysql_query($sql);
		$row=mysql_fetch_array($query);
		if ($row['username']==$username){
			if ($row['password']==$userpass){
				$_SESSION['uroles']=getUserRole($row["uid"]);				
				$_SESSION['uid']=$row["uid"];
				$_SESSION['username']=$username;
				$_SESSION['lastloginip']=$row["lastloginip"];
				$_SESSION['lastlogintime']=$row["lastlogintime"];
				$_SESSION['level']=$row["level"];
				$_SESSION['face']=$row["face"];
				setcookie("kie_login_name",$username);
				setcookie("kie_login_uid",$_SESSION['uid']);
				$out["error"]="登陆成功！";
				$out["state"]="ok";
				
				$sql="update ht_user set `lastlogintime`=".time().",lastloginip='".$_SERVER['REMOTE_ADDR']."' where `username`='$username'";
				$query=mysql_query($sql);
				$res=mysql_query('select * from `ht_can_do` where id='.$row["level"]);
				$_SESSION['power']=array();				
				while($rs=mysql_fetch_array($res)){
					if($rs['role_add'])$_SESSION['power'][]='role_add';
					if($rs['role_modify'])$_SESSION['power'][]='role_modify';
					if($rs['role_delete'])$_SESSION['power'][]='role_delete';
					if($rs['role_member_add'])$_SESSION['power'][]='role_member_add';
					if($rs['role_member_delete'])$_SESSION['power'][]='role_member_delete';
					if($rs['power_modify'])$_SESSION['power'][]='power_modify';
					if($rs['power_detail_modify'])$_SESSION['power'][]='power_detail_modify';
					if($rs['page_add'])$_SESSION['power'][]='page_add';
					if($rs['page_modify'])$_SESSION['power'][]='page_modify';
					if($rs['page_delete'])$_SESSION['power'][]='page_delete';
					if($rs['member_add'])$_SESSION['power'][]='member_add';
					if($rs['member_modify'])$_SESSION['power'][]='member_modify';
					if($rs['member_delete'])$_SESSION['power'][]='member_delete';
					if($rs['flow_add'])$_SESSION['power'][]='flow_add';
					if($rs['flow_modify'])$_SESSION['power'][]='flow_modify';
					if($rs['flow_delete'])$_SESSION['power'][]='flow_delete';
					if($rs['setting_anou'])$_SESSION['power'][]='setting_anou';
					if($rs['setting_can_do'])$_SESSION['power'][]='setting_can_do';
					if($rs['setting_parameter'])$_SESSION['power'][]='setting_parameter';					
				}				
			}
			else {
				$out["error"]="密码错误";
			}
		}
		else {
			$out["error"]="用户名不存在！";
		}
	}
}

echo json_encode($out);
?>