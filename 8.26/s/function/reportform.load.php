<?php
//include_once"check_session.php";
include_once '../inc/conn.php';

$out["IsSuccess"]=false;
$out["Message"]="未知错误";
$out["Data"]="";

$formid=intval($_REQUEST['formid']);

$sql="select * from `ht_form` where `id`='$formid'";
$rs=mysql_fetch_array(mysql_query($sql));
if($rs==NULL){
	$out["Message"]="找不到内容！";
}else{
	$out["IsSuccess"]=true;
	$out["Message"]="加载成功！";
	$out["Data"]=urlencode($rs['content']);
}
exit(json_encode($out));
?>
