<?php
include_once '../inc/conn.php';
$act=$_GET['act'];
if($act=='list'){
	$sql="SELECT * FROM ht_user WHERE level!=1 and level!=".intval($_GET['gid']);
	$res=mysql_query($sql);
	$list='';
	while($row = mysql_fetch_array($res)) 
	{ 
		$list.='<dl><dt><input name="uid[]" type="checkbox" value="'.$row['uid'].'" /></dt><dd>'.$row['username'].'&nbsp;&nbsp;'.$row['chinese_name'].'</dd></dl>';
	}
	echo $list;
}elseif($act=='ajaxlist'){
	$gid=intval($_GET['gid']);
	$sql="select * from ht_user WHERE level!=1 and level!=".$gid;
	$query=mysql_query($sql);
	$isadd=false;
	$gname=$_GET["gname"];
	$out='';
	while($row=mysql_fetch_array($query))
	{
		if($isadd)$out.=",";
		$out.='{';
		$out.='"uid":"'.$row["uid"].'",';
		$out.='"username":"'.$row["username"].'",';
		$out.='"chinese_name":"'.$row["chinese_name"].'",';
		$out.='"reg_ip":"'.$row["reg_ip"].'",';
		$out.='"reg_data":"'.$row["reg_data"].'",';
		$out.='"gname":"'.$gname.'"';
		$out.='}';
		$isadd=true;
	}
	$out2["Data"]=json_decode("[".$out."]");
	$out2["IsSuccess"]=true;
	echo json_encode($out2);
}elseif($act=='add'){
	//$list_id=implode(',',$_POST['uid']);
	$out["IsSuccess"]=false;
	$out["Message"]="未知错误";
	$gid=intval($_POST['gid']);
	$uid=intval($_POST['uid']);
	if(empty($gid)||empty($uid))die('非法操作');
	$sql='update ht_user set `level`='.$gid.' where uid='.$uid;
	if(mysql_query($sql)){
		$out["IsSuccess"]=true;
		$out["Message"]="设置成功";
	}
	echo json_encode($out);
}elseif($act=='del'){	
	$sql='update ht_user set `level`="" where uid ='.$_POST['uid'];
	if(mysql_query($sql)){
		echo 1;
	}else{
		echo 0;
	}
}elseif($act=='gedit'){	
	
}
mysql_close($con);
?>