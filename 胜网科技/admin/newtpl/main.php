﻿<?php 
session_start();
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
		<span class="icons"><img src="/<?php echo $_SESSION['face']; ?>" /></span>
		<span class="iconstitle">
		<?php echo $_SESSION['chinese_name']; ?>
		<br />欢迎登录胜网信息管理系统！
		</span>
	</div>
  <div class="clear"></div>
</div>
<span id="version"></span>
<table width="100%" border="0" cellpadding="5" cellspacing="1" bgcolor="#FF9900"  style=" margin-bottom:6px;">
  <tr>
    <td bgcolor="#FFFFCC">&nbsp;你最近一次的登陆IP192.168.1.119，时间为2015-08-05 10:55。</td>
  </tr>
</table>
<table width="100%" border="0" cellpadding="5" cellspacing="1" bgcolor="#FF9900"  style=" margin-bottom:6px;">
  <tr>
    <td bgcolor="#FFFFCC">&nbsp;出于安全的考虑，我们建议您修改密码。</td>
  </tr>
</table>
<div class="toptit">待处理事务</div>
<table width="100%" border="0" cellpadding="0" cellspacing="0" class="link_lan" style="padding-left:15px; line-height:220%; margin-bottom:10px; color:#666666">
      <tr>
        <td  >待审核注册：&nbsp;<a href="#" id="t1">...</a></td>
        <td  >待认证企业：&nbsp;<a href="#" id="t3">...</a></td>
        <td  >&nbsp;</td>
      </tr>
      <tr>
        <td  >待审核工作流：&nbsp;<a href="#" id="t2">...</a></td>
        <td  >待开通服务：&nbsp;<a href="#" id="t4">...</a></td>
      </tr>
      <tr>
        <td  >待审核照片 ：&nbsp;<a href="#" id="t6">...</a></td>
        <td>待付款企业订单：&nbsp;<a href="#" id="t5">...</a>		  </td>
      </tr>
      <tr>
        <td  >举报信息：&nbsp;<a href="#" id="t7">...</a>		  </td>
        <td  >意见/建议：&nbsp; <a href="#" id="t8">...</a> </td>
      </tr>
  </table>
<div class="toptit">系统信息</div>
<table width="100%" border="0" cellspacing="0" cellpadding="4">
  <tr>
    <td style="  color:#666666; padding-left:15px;line-height:220%;">
	<table border="0" cellpadding="0" cellspacing="0" class="link_lan">
      <tr>
        <td width="400"  >操作系统：Linux</td>
        <td  >.net 版本：4.0.3</td>
      </tr>
      <tr>
        <td  >服务器软件：Jexus/2.2.17<br /></td>
        <td  >Postgresql 版本：9.3</td>
      </tr>
    </table></td>
  </tr>
</table>
<div class="footer link_lan">
Powered by 胜网科技 1.0 beta
</div>
</div>
<div class="admin_frameset" >
  <div class="open_frame" title="全屏" id="open_frame" flag="min"></div>
  <div class="close_frame" title="还原窗口" id="close_frame" flag="min"></div>
</div>
</body>
</html>