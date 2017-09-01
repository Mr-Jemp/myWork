<?php session_start(); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=7">
<title>胜网科技</title>
<link href="/resource/part/newtpl/css/public.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/resource/js/jQuery/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/resource/part/newtpl/js/public.js"></script>
<link href="/resource/part/newtpl/css/rheight.css" rel="stylesheet" type="text/css" />
<style>
th{
	text-align:left;
	font-size:14px;
	line-height:20px;
	height:20px;
}
tr td a {
	text-decoration: none;
}
tr td a:hover {
	text-decoration: underline;
}
tr {
	border-bottom-width: 1px;
	border-bottom-style: dotted;
	border-bottom-color: #CCC;
	height: 30px;
	width: 100%;
	line-height: 30px;
}
.fid{
	padding-left:5px;
}
.msg_conent{
	padding:12px;
}
.admin_main_nr_dbox{
	height:auto;
	overflow:hidden;
}
.adr{
	background-color:#f9f9f9;
}
</style>
</head>
<body style="background-color:#E0F0FE">
<div class="admin_main_nr_dbox">
<?php
include_once '../../s/inc/conn.php';
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
	$sql='SELECT * FROM `ht_message` WHERE receive_user='.$_SESSION['uid'].' order by id desc';
}
$query=mysql_query($sql);
if($_GET['act']=='show'){
	$row = mysql_fetch_array($query);	
?>
<div class="toptit">信息详细内容</div>
<div class="msg_conent">
<?php 
mysql_query('UPDATE `ht_message` set status=4 WHERE id='.intval($_GET['id']));
echo str_replace('###',$row['url'].'&mid='.$row['id'].'.html',$row["message"]);
?>
</div>
<?php 
}else{	
?>
<!--<div class="pagetit">
	<div class="ptit">信息列表</div>
  <div class="clear"></div>
</div>-->
<div class="toptit">待处理信息</div>
<table width="100%" border="0" cellpadding="0" cellspacing="0" class="link_lan" style="padding-left:15px; line-height:220%; margin-bottom:10px; color:#666666;border-collapse: collapse;">
      <tr>
      <th width="8%" class="fid">ID</th>
      <th>标题</th>
      <th width="15%">日期</th>
      <th width="10%">操作</th>
      </tr>
      <?php	
	  	$i=1;  
	  	while($row = mysql_fetch_array($query)){
			$msg=str_replace('###',$row['url'].'&mid='.$row['id'].'.html',$row["message"]);
			if($i%2==0){
				echo '<tr class="adr">';				
			}else{
				echo '<tr>';
			}
			$i++;
	  ?>
      
      <td width="8%" class="fid"><?php echo $row['id']?></td>
        <td><?php echo $msg;?></td>
        <td><?php echo date('Y-m-d H:s',$row['send_date']);?></td>
        <td width="10%"><a href="?act=show&id=<?php echo $row['id']?>" target="_blank">查看详细</a>&nbsp;|&nbsp;<a href="?act=del&id=<?php echo $row['id']?>" id="t3">删除</a></td>        
      </tr>
      <?php }?>
  </table>
<?php }?>
</div>
</body>
</html>