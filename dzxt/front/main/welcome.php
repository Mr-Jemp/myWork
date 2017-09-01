<?php session_start();include_once '../../s/inc/conn.php';?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=7">
<title>胜网科技</title>
<link href="/resource/part/newtpl/css/public.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/resource/js/jQuery/jquery-1.7.2.min.js"></script>
<link href="/resource/part/newtpl/css/rheight.css" rel="stylesheet" type="text/css" />
<style>
.icons
{
  width: 48px;
  height: 48px;
  display: inline-block;
  *display:;
}
.icons img{max-width:48px;max-height:48px;}
.iconstitle
{
  width: auto;
  height: 48px;
  overflow:hidden;
  display: inline-block;
  margin-left:10px;
}
</style>
</head>
<body style="background-color:#E0F0FE">
<div class="admin_main_nr_dbox">
<div class="pagetit">
	<div class="ptit">
		<span class="icons"><img src="/<?php echo is_file("../../".$_SESSION['face'])?$_SESSION['face']:'resource/images/usericons/noavatar_small.gif'; ?>" /></span>
		<span class="iconstitle">
		<?php echo $_SESSION['chinese_name'];?>
		<br />欢迎登录胜网信息管理系统！
		</span>&nbsp;<div style="font-weight:normal">
		担任角色：<?php
		$sql="select rolename from ht_role where `id` in(".implode(',',$_SESSION['uroles']).")";
		$query=mysql_query($sql);$str="";
		while($row = mysql_fetch_array($query))
		{
			if(strlen($str)>0)$str.=" 、".$row['rolename'];
			else $str.=$row['rolename'];
		}
		echo strlen($str)>0?$str:"无任何角色";
		?>
		</div>
	</div>
  <div class="clear"></div>
</div>
<span id="version"></span>
<table width="100%" border="0" cellpadding="5" cellspacing="1" bgcolor="#FF9900"  style=" margin-bottom:6px;">
  <tr>
    <td bgcolor="#FFFFCC">&nbsp;你最近一次的登陆IP<?php echo $_SESSION["lastloginip"]?>，时间为<?php echo date('Y-m-d H:i:s', $_SESSION["lastlogintime"]);?>。</td>
  </tr>
</table>
<table width="100%" border="0" cellpadding="5" cellspacing="1" bgcolor="#FF9900"  style=" margin-bottom:6px;">
  <tr>
    <td bgcolor="#FFFFCC">&nbsp;公司公告：<span id="gong"></span></td>
  </tr>
</table>
<?php
$sql='SELECT * FROM `ht_message` WHERE receive_user='.$_SESSION['uid'].' and status=3';
$query=mysql_query('SELECT count(id) as msg_count FROM `ht_message` WHERE receive_user='.$_SESSION['uid'].' and status=3');
$row = mysql_fetch_array($query);
?>
<div class="toptit">待处理事务</div>
<table width="100%" border="0" cellpadding="0" cellspacing="0" class="link_lan" style="padding-left:15px; line-height:220%; margin-bottom:10px; color:#666666">
      <tr>
        <td  >收到消息：&nbsp;( <a href="#" onclick="window.parent.open_msg('new')" id="t1"><?php echo $row['msg_count'];?></a> )</td>
        <td  >收到邮件：&nbsp;<a href="#" id="t3">...</a></td>
        <td  >&nbsp;</td>
      </tr>
      <tr>
        <td  >即时通消息：&nbsp;<a href="#" id="t2">...</a></td>
        <td  >待处理事务：&nbsp;<a href="#" id="t4">...</a></td>
      </tr>

  </table>
  </div>
</body>
<script>
$(window).load(function()
{
	$.ajax({
		type: 'POST',
		url: '/s/setting/gong.php',
		data: {"get":"yes"},
		success: function(data) {
			data = eval('(' + data + ')');
			if(data.IsSuccess)
				$("#gong").html($(data.res).text());
		},error: function(xhr, stat, e)
		{
		}
	});

});
</script>
</html>