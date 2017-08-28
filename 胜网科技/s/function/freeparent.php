<?php
//ini_set("display_errors",1);
//error_reporting(E_ALL);
include_once"check_session.php";
include_once '../inc/conn.php';

$id=intval(trim($_REQUEST["id"]),10);
$pid=intval(trim($_REQUEST["pid"]),10);

$out["tree"]="";
$out["IsSuccess"]=false;
$out["Message"]="未知错误";
$isexit=false;
if($id<1)$out["Message"]="ID不正确";
else if($pid<1)$out["Message"]="PID不正确";
else if($id==$pid) $out["Message"]="父ID不能是自已";
else if(IsPidInSubId($pid,$id))$out["Message"]="父节点不能设置到自已的子节点";
else
{
	$sort=0;
	$sql="select `sort` from ht_form where pid='$pid' order by `sort` desc";
	$rs=mysql_fetch_array(mysql_query($sql));
	if($rs)$sort=$rs["sort"]+1;
	
	//更新为该父ID和排序在最上面
	mysql_query("update `ht_form` set `sort`='$sort',pid='$pid' where `id`='$id'");
	$out["IsSuccess"]=true;
	$out["Message"]="设置成功";

}
if($out["IsSuccess"])
{
	include_once"../function/public.php";
	include_once"../s/function/public.php";
	$pow=getfreepower("",0,implode(',',$_SESSION['uroles']));
	$out["tree"]=urlencode($pow[1]);
}
echo json_encode($out);
//要设置的父ID是否在他自已的子ID
function IsPidInSubId($pid,$id)
{
	$sql="select id from `ht_form` where pid='$id'";
	$query=mysql_query($sql);
	while($row=mysql_fetch_array($query))
	{
		if($row['id']==$pid)return true;
		$is=IsPidInSubId($pid,$row['id']);
		if($is)return true;
	}
	return false;
}
?>