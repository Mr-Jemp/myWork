<?php
	session_start();
	include_once"../s/inc/conn.php";
	include_once"../s/function/public.php";
	$result=getfreepower("",0,implode(',',$_SESSION['uroles']));
	?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>手机页</title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<meta name="viewport" content="width=device-width, height=device-height,initial-scale=1.0,maximum=scale=1.0,user-scalable=no;">
<link href="/mobile/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.css" rel="stylesheet">
<script src="/resource/js/jQuery/jquery-1.9.1.js"></script>
<script src="/mobile/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.js"></script>
<link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
<script src="/resource/part/ligerlib/ligerUI/js/ligerui.all.js" type="text/javascript"></script> 

<script>
$(function()
{
	
	$(".ui-icon-back").bind("click",function()
	{
		//$("#home").contentWindow.history.back();
		document.getElementById('home').contentWindow.history.back();
	});
	$("#home").height($("body").height()-100);
});
</script>
<style>
html,body{height:100%;}
.l-tree{height:100%;width:auto!important;border-radius:10px;padding:5px;}
</style>
</head>
<body>
<div data-role="page" id="pageone">
<div data-role="header">
	<a href="#" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-back">返回</a>
	<h1>手机页</h1></div>

	<div data-role="content">
		<iframe frameborder="0" name="home" id="home" src="main.php" width="100%"></iframe>		
	</div>
</div> 
</body>
</html>