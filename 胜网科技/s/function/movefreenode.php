<?php
//ini_set("display_errors",1);
//error_reporting(E_ALL);
include_once"check_session.php";
include_once '../inc/conn.php';

$id=intval(trim($_REQUEST["id"]),10);
$pid=intval(trim($_REQUEST["pid"]),10);
$type=intval(trim($_REQUEST["type"]),10);

$out["tree"]="";
$out["IsSuccess"]=false;
$out["Message"]="未知错误";
$isexit=false;
if($id<1)$out["Message"]="ID不正确";
else if($pid<1)$out["Message"]="PID不正确";
else if($type!=-1 && $type!=1) $out["Message"]="移动类型不正确";
else
{
	//先历出同节点的排序
	$sql="select id from ht_form where pid='$pid' order by `sort` desc";
	$query=mysql_query($sql);
	$arrid=array();$count=-1;
	while($row=mysql_fetch_array($query))$arrid[++$count]=$row["id"];
	if($count<0)$out["Message"]="找不到数据";
	
	for($i=0;$i<=$count;$i++)
	{
		if($arrid[$i]==$id)
		{
			if($i==0 && $type==-1){$isexit=true;$out["Message"]="已经是最上面";break;}
			if($i==$count && $type==1){$isexit=true;$out["Message"]="已经是最下面";break;}
			$arrid[$i]=$arrid[$i+$type];
			$arrid[$i+$type]=$id;
			break;
		}
	}
	if($isexit==false)
	{
		//更新到数据库
		$sql="";
		for($i=0;$i<=$count;$i++)
		{
			$sid=$arrid[$i];$sort=$count-$i;
			mysql_query("update `ht_form` set sort='$sort' where id='$sid'");
			$sql.="update `ht_form` set sort='$i' where id='$sid' \n";
		}				
		$out["IsSuccess"]=true;
		if($type==-1)$out["Message"]="上拉成功";
		if($type==1)$out["Message"]="下移成功";
	}
}
if($out["IsSuccess"])
{
	include_once"../function/public.php";
	include_once"../s/function/public.php";
	$pow=getfreepower("",0,implode(',',$_SESSION['uroles']));
	$out["tree"]=urlencode($pow[1]);
}
echo json_encode($out);
?>