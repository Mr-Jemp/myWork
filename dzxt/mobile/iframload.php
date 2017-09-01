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
<body>
<div class="box">

	<div class="linebox head">
		<span class="col"><a href="javascript:history.go(-1);" class="buttonradius"><</a></span>
		<h3 class="col"><?php echo $_REQUEST['title'];?></h3>
		<span class="col"><a href="index.php" class="button">☆主页</a></span>
	</div>
	<div style=" margin:0 auto;width:96%;height:auto;overflow:hidden;">
		<iframe name="loadid" id="loadid" src="<?php echo $_REQUEST['url'];?>" width="100%" frameborder="0" onload="iframeLoad"></iframe>
	</div>
	<?php include_once"bottom.php";?>
</div>
<script>
$(function()
{
	var height='<?php echo intval($_REQUEST['height']);?>';
	$("#loadid").bind("load",function()
	{
		var ifm=document.getElementById("loadid");
		var subWeb = document.frames ? document.frames["loadid"].document : ifm.contentDocument;
		
		if(ifm != null && subWeb != null)
		{
			ifm.height = subWeb.body.scrollHeight<height?height:subWeb.body.scrollHeight; 
		} 
	});
	$(window).load(function()
	{
		
		var height=$(".autobot").offset().top;
		height-=$(".head").height()+6;
		var ifm=document.getElementById("loadid");
		ifm.height=ifm.height<height?height:ifm.height;
		$(".autobot").css({"margin-top":0});
		
	});
});
</script>
</body>
</html>
