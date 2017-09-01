<?php
session_start();
require_once("check_session.php");

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>手机页</title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<meta name="viewport" content="width=device-width, height=device-height,initial-scale=1.0,maximum=scale=1.0,user-scalable=no;">
<script src="/resource/js/jQuery/jquery-1.9.1.js" type="text/javascript"></script>
<link href="css/message.css" rel="stylesheet" type="text/css" />
</head>
<body><?php

include_once '../s/inc/conn.php';
if($_GET['act']=='new'){
	$sql='SELECT * FROM `ht_message` WHERE receive_user='.$_SESSION['uid'].' and status=3 order by id desc';
}else if($_GET['act']=='show'){
	$sql='SELECT * FROM `ht_message` WHERE id='.intval($_GET['id']);
}else if($_GET['act']=='del'){
	$sql=' DELETE FROM `ht_message` WHERE id='.intval($_GET['id']);
	if(mysql_query($sql)){
		echo '<script>alert("删除成功!");window.location="'.$_SERVER['HTTP_REFERER'].'";</script>;';
	}else{
		echo '<script>alert("删除失败!");window.location="'.$_SERVER['HTTP_REFERER'].'";</script>;';
	}
}else{
	$sql='SELECT * FROM `ht_message` WHERE receive_user='.$_SESSION['uid'].' and status>2 order by id desc';
}
$query=mysql_query($sql);
?>
<div class="box">

	<div class="linebox head">
		<span class="col"><a href="javascript:history.go(-1);" class="buttonradius"><</a></span>
		<h3 class="col">消息列表</h3>
		<span class="col"><a href="index.php" class="button">☆主页</a></span>
	</div>

	<table width="96%" align="center">
	<tr>
		<tr style="background:#DFDFDF;line-height:30px">
		<td class="col left" align="center">ID</td>
		<td class="col left">标题</td>
	</tr>

	<?php
	$i=0;
	while($row = mysql_fetch_array($query))
	{		
		$msg=str_replace('###','iframload.php?title=消息详情&url='.urlencode($row['url'].'&mid='.$row['id'].'.html'),$row["message"]);
		$msg=str_replace('target="_blank"','',$msg);
		if($i%2==0){
			$bg='#FAFAFA';
		}else{
			$bg='#F3F3F3';
		}
		$i++;
	?>
		<tr style="background:<?php echo $bg?>;line-height:30px">
			<td class="col left" align="center"><?php echo $row['id']?></td>
			<td class="col left"><?php echo $msg?></td>
		</tr>
		<?
		}
		?>
  </table>
	
	<?php include_once"bottom.php";?>
</div>
</body>

</html>
