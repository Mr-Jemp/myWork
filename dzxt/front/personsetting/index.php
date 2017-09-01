<?php
session_start();
include_once '../../s/inc/conn.php';
$out["IsSuccess"]=false;
$out["Message"]="未知错误";

$uid=$_SESSION['uid'];

$out["Message"]="未知错误";

$get=$_POST["get"];
$face=trim($_POST["face"],"/");
$chinese_name=$_POST["chinese_name"];
$sex=$_POST["sex"];
$mobile=$_POST["mobile"];
$email=$_POST["email"];
$address=$_POST["address"];
$family_phone=$_POST["family_phone"];

if($get=="yes")
{
	$rs=mysql_fetch_array(mysql_query("select * from ht_user where `uid`='$uid'"));
	if($rs)
	{
		$prefix="web_";
		$out[$prefix."face"]=$rs["face"];
		$out[$prefix."chinese_name"]=$rs["chinese_name"];
		$out[$prefix."sex"]=$rs["sex"];
		$out[$prefix."mobile"]=$rs["mobile"];
		$out[$prefix."email"]=$rs["email"];
		$out[$prefix."address"]=$rs["address"];
		$out[$prefix."family_phone"]=$rs["family_phone"];
		
		$out[$prefix."face"]=is_file("../../".$out[$prefix."face"])?"/".$out[$prefix."face"]:'/resource/images/usericons/noavatar_small.gif';
		
		$out["IsSuccess"]=true;
	}
}else
{
	for(;;)
	{
		$ab=0;
		if(strlen($mobile)>0)
		{
			$pattern="/1[3458]{1}\d{9}$/";
			if(!preg_match($pattern,$mobile)){$out["Message"]="请入正确的手机号码";break;}
			$ab++;
		}
		if(strlen($email)>0)
		{
			$pattern="/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i";
			if(!preg_match($pattern,$email)){$out["Message"]="请入正确的邮箱地址";break;}
			$ab++;
		}
		if(strlen($face)<1)$out["Message"]="请上传头像";
		else if(strlen($chinese_name)<1)$out["Message"]="请输入姓名";
		//else if(strlen($sex)<1)$out["Message"]="请选择性别";
		else if($ab<1)$out["Message"]="请输入正确的手机号或正确的邮箱地址";
		else if(strlen($address)<1)$out["Message"]="请输入联系地址";
		//else if(strlen($family_phone)<1)$out["Message"]="请输入联系电话";
		else
		{
			if($sex=="男性")$sex="1";
			else if($sex=="女性")$sex="2";
			else $sex="0";
			$sql="UPDATE `ht_user` SET `face`='$face',`chinese_name`='$chinese_name',`sex`='$sex',`mobile`='$mobile',`email`='$email',`address`='$address',`family_phone`='$family_phone' where `uid`='$uid'";
			mysql_query($sql);
			$out["Message"]="成功保存";		
			$out["IsSuccess"]=true;
			$_SESSION['face']=$face;
			$_SESSION['chinese_name']=$chinese_name;
		}
		break;
	}
}

echo json_encode($out);
?>