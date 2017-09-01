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
//树					  
<?php						
include_once"../s/inc/conn.php";
include_once"../s/function/public.php";
$result=getfreepower("",0,implode(',',$_SESSION['uroles']));
?>
var data=eval('['+decodeURIComponent('<?php echo urlencode($result[1]);?>')+']');
//var data=eval('['+('{"id":"52","values":[{"value":"页面设计2"}],"isLeaf":false,"form_type":0,"parentId":"0","type":"1","children":[{"id":"52","values":[{"value":"页面设计2"}],"isLeaf":false,"form_type":0,"parentId":"0","type":"1","children":[]}]}')+']');

$(function()
{
	$("#tissue_nav_tree").ligerTree(
	{
				data:data,
				checkbox: false,
				slide: false,
				nodeWidth: 120,                    
				render: function (item)
				{                        
					 return item.values[0].value;
				 },
				 isLeaf:function(item){
					return item.isLeaf;
				 },
				 isExpand: 2,
				 onContextmenu: function (node, e)
				 { 
					return false;
				 },
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
						}else if(node.data.form_type==2)
						{
							f_addTab(tabid,node.data.values[0].value,encodeURI('/s/submitformitem.php?res=main&formid=' + node.data.id));
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
	url=encodeURIComponent(url);
	window.location.href='iframload.php?title='+text+'&url='+url;
}
</script>
</head>
<body>
<div class="box">

	<div class="linebox head">
		<span class="col"><a href="javascript:history.go(-1);" class="buttonradius"><</a></span>
		<h3 class="col">组织管理</h3>
		<span class="col"><a href="index.php" class="button">☆主页</a></span>
	</div>
	<ul id="tissue_nav_tree" style="margin-top:10px;"></ul> 
	<?php include_once"bottom.php";?>
</div>
</body>

</html>
