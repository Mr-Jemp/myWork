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

<link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
<link href="/resource/part/ligerlib/ligerUI/skins/ligerui-icons.css" rel="stylesheet" type="text/css" />
<script src="/resource/part/ligerlib/ligerUI/js/ligerui.all.js" type="text/javascript"></script> 
<script src="/resource/part/ligerlib/jquery.cookie.js" type="text/javascript"></script>

<script>

$(function()
{
	$("#flow_tree").ligerTree(
		{data:
		[{text:'我发起的流程',children:[{text:'我的请求',type:'getMyflow'},{text:'办结流程',type:'getMyendflow'},{text:'待办流程',type:'getnoendflow'}],isLeaf:true},{text:'承接流程',children:[{text:'待办流程',type:'setFlow'},{text:'办结流程',type:'setEndflow'}],isLeaf:true}],
		onselect: function (node)
		{
			//cu_tabid=tabid;
			if (!node.data.isLeaf)
			{
				f_addTab(0,node.data.text,encodeURI('/s/flow/index.php?type=' + node.data.type));
			}                                  
		},
		checkbox:false
	});

});
function f_addTab(tabid, text, url)
{
	url=encodeURIComponent(url);
	window.location.href='iframload.php?title='+text+'&url='+url+'&height=480';
}
</script>
</head>
<body>
<div class="box">

	<div class="linebox head">
		<span class="col"><a href="javascript:history.go(-1);" class="buttonradius"><</a></span>
		<h3 class="col">流程管理</h3>
		<span class="col"><a href="index.php" class="button">☆主页</a></span>
	</div>
	<ul id="flow_tree" style="margin-top:10px;"></ul> 
	<?php include_once"bottom.php";?>
</div>
</body>

</html>
