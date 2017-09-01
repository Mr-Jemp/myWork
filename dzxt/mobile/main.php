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
		history.go(-1);
	});
	
	var freedata=eval('['+decodeURIComponent('<?php echo urlencode($result[1]);?>')+']');
	$("#tissue_nav_tree").ligerTree({
		data:freedata,
		checkbox: false,
		slide: false,                   
		render: function (item)
		{                        
			 return item.values[0].value;
		 },
		 isLeaf:function(item){
			return item.isLeaf;
		 },
		 isExpand: 2,
		 onselect: function (node)
		{							
			var tabid = $(node.target).attr("tabid");
			if (!tabid)
			{
				tabid = new Date().getTime();
				$(node.target).attr("tabid", tabid)
			}
			if (node.data.isLeaf)
			{
				if(node.data.form_type==1)
					f_addTab(tabid,node.data.values[0].value,encodeURI('/s/listform.php?formid=' + node.data.id));
				else if(node.data.type==2)
				{
					f_addTab(tabid,node.data.values[0].value,encodeURI(node.data.content));
				}else
					f_addTab(tabid,node.data.values[0].value,encodeURI('/s/readtemplate.php?formid=' + node.data.id));
			}
			else {                                             
				f_addTab(tabid,node.data.values[0].value+" 网盘硬盘",encodeURI('/upload/document/filebox38668671.php?op=home&root='+node.data.id+'&folder='+node.data.id));
				
			}
		}
	});
	
});
function f_addTab(tabid, text, url) 
{
	window.location.href=url;
}
</script>
<style>
html,body{height:100%; margin:0;}
.l-tree{height:100%;width:auto!important;border-radius:10px; padding:5px;}
</style>
</head>
<body>
<ul id="tissue_nav_tree"></ul>
</body>
</html>