<?php
session_start();
include_once '../inc/conn.php';
$config=load('../inc/conf.php');

$out["IsSuccess"]=false;
$out["Message"]="未知错误";

$form_id=intval(trim($_POST["form_id"]),10);
$fun_name=SafeSql($_POST["fun_name"]);
$fun_type=intval(trim($_POST["fun_type"]),10);

if($fun_name=="all" && $fun_type==-1)
{
	$sql=$sql="INSERT INTO ht_function(funcation_name,form_id,function_type) ";
	$isadd=true;
	foreach($config as $k=>$v)
	{
		$query=mysql_query("select * form ht_function where funcation_name='$v' and form_id='$form_id' and function_type='$k'");
		if(mysql_fetch_array($query)) continue;
		if($isadd){$isadd=false;$sql.="VALUES('$v','$form_id','$k')";}else $sql.=",('$v','$form_id','$k')";
	}
	mysql_query($sql);
	$out["IsSuccess"]=true;
	$out["Message"]="操作成功".$sql;
}else
{
	if($fun_type<0 || $fun_type>=count($config)){}else
	{
		$v=$config[$fun_type];
		$query=mysql_query("select * form ht_function where funcation_name='$v' and form_id='$form_id' and function_type='$fun_type'");
		if(mysql_fetch_array($query)){}else
		{
			$sql="INSERT INTO ht_function(funcation_name,form_id,function_type) VALUES('$v','$form_id','$fun_type')";
			mysql_query($sql);
			$out["IsSuccess"]=true;
			$out["Message"]="操作成功";
		}
	}
}



echo json_encode($out);
mysql_close($conn);
?>