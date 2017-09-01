<?php
session_start();
	include_once '../inc/conn.php';
	include '../inc/function.php';
	$op = $_REQUEST['operatetype'];
	switch($op) {
		
		case "deletemen":
			deletemen();
			break;
		case "modify":
			modify();
			break;
		case "add":
			add();
			break;
		
	}
	
	function deletemen(){
		is_power('member_delete','删除人员');
		$id = $_REQUEST['staffId'];
		mysql_query("DELETE FROM ht_user WHERE uid='".$id."'");
		echo "删除成功";
		mysql_close($conn);
	}
	function add(){		
		is_power('member_add','添加人员');
		$username = $_REQUEST['username'];
		$password = $_REQUEST['password'];
		$status=$_REQUEST['status'];
		$chinese_name=$_REQUEST['chinese_name'];
		$json="";
		for(;;)
		{
			if(strlen($username)<1)
			{
				$json="{\"result\":0,\"message\":'请输入账号'}";
				break;
			}
			if(strlen($password) <6 )
			{
				$json="{\"result\":0,\"message\":'密码长度不能小于6位！'}";
				break;
			}
			if(strlen($chinese_name) <1 )
			{
				$json="{\"result\":0,\"message\":'请输入姓名！'}";
				break;
			}
			if(strlen($status) <1 )
			{
				$json="{\"result\":0,\"message\":'请选择状态！'}";
				break;
			}
			
			$res = mysql_query("select * from ht_user where username='$username'");
	
			if (mysql_num_rows($res) > 0) 
			{
				$json="{\"result\":0,\"message\":'已存在该用户名！'}";
				break;
			}
			$time = date("Y-m-d");
			$sql = "INSERT INTO ht_user (`chinese_name`,`status`,username,password,reg_data,reg_ip) VALUES ('$chinese_name','$status','".$username."', '".md5($password)."', '".$time."','".$_SERVER[REMOTE_ADDR]."')";		
			mysql_query($sql);	
			$json= "{\"result\":1,\"message\":'ok'}";
		break;}
		mysql_close($con);		
		exit($json);
	}
	function modify(){
		is_power('member_modify','修改人员');
		$id = $_REQUEST['edit_id'];		
		$username =$_REQUEST['username'];
		$status =$_REQUEST['status'];
		$password=$_REQUEST['password'];
		$status=$_REQUEST['status'];
		$chinese_name=$_REQUEST['chinese_name'];
		
		$json="";
		for(;;)
		{
			if(strlen($username)<1)
			{
				$json="{\"result\":0,\"message\":'请输入账号'}";
				break;
			}
			if(mysql_num_rows(mysql_query("select * from ht_user where username='$username' and `uid`!='$id'"))>0)
			{
				$json="{\"result\":0,\"message\":'账号存在！'}";
				break;
			}
			if(strlen($password)>0 && strlen($password)<6)
			{
				$json= "{\"result\":0,\"message\":'密码长度不能小于6位！'}";
				break;			
			}
			if(strlen($chinese_name) <1 )
			{
				$json="{\"result\":0,\"message\":'请输入姓名！'}";
				break;
			}
			if(strlen($status)<1)
			{
				$json="{\"result\":0,\"message\":'请选择状态'}";
				break;
			}
			$sql="UPDATE `ht_user` SET username = '".$username."',`status`='$status',`chinese_name`='$chinese_name'";
			if(strlen($password)>0)$sql.=",`password`='".md5($password)."'";
			$sql.=" WHERE uid = '".$id."'";
			
			if(mysql_query($sql)){
				$json="{\"result\":1,\"message\":'修改成功！'}";			
			}else{
				$json="{\"result\":0,\"message\":'修改失败'}";
			}
		break;}
		mysql_close($con);
		exit($json);
	}
?>