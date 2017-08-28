<?php
session_start();
include '../inc/function.php';
is_power('power_detail_modify');
include_once '../inc/conn.php';
$config=load('../inc/conf.php');

$out["IsSuccess"]=false;
$out["Message"]="未知错误";

$role_id=intval(trim($_POST["role_id"]),10);
$form_id=intval(trim($_POST["form_id"]),10);
$json=json_decode($_POST["json"]);


if($json==NULL)
{
	$out["Message"]="data的json数据不正确";
}else if($role_id<=0)
{
	$out["Message"]="请选择角色";
}else if($form_id<=0)
{
	$out["Message"]="请选择页面";
}
else
{
	//SELECT * FROM `ht_power` WHERE form_id=53 and role_id=1
	//'3'=>'view.record.condition',
	//'4'=>'modify.record.condition',
	//'5'=>'add.record.condition',
	//'6'=>'delete.record.condition'

	//先删除form_id里的role_id的3-6权限
	for($k=3;$k<=6;$k++)
	{
		$query=mysql_query("DELETE FROM `ht_power` WHERE role_id='$role_id' and form_id='$form_id' and function_type='$k'");
		$row=mysql_fetch_array($query);
	}
	//添加上去
	if($json->view_sel) adddata($json->view,3,$form_id,$role_id);
	if($json->edit_sel) adddata($json->edit,4,$form_id,$role_id);
	if($json->add_sel) adddata($json->add,5,$form_id,$role_id);
	if($json->delete_sel) adddata($json->delete,6,$form_id,$role_id);
	
	$out["Message"]="提交成功";
	$out["IsSuccess"]=true;

}
function adddata($view,$k,$form_id,$role_id)
{
	$v=$view;
	$query=mysql_query("select * from `ht_power` where role_id='$role_id' and form_id='$form_id' and function_type='$k'");
	$row=mysql_fetch_array($query);
	$power_id=$row["id"];
	if($row)
	{
		$sql="UPDATE `ht_power` SET function_name='$v' where id='$power_id'";
		mysql_query($sql);
	}else
	{
		$sql="INSERT INTO `ht_power` (function_name,role_id,form_id,function_type) VALUES('$v','$role_id','$form_id','$k')";
		mysql_query($sql);
	}
}
echo json_encode($out);
mysql_close($conn);
?>