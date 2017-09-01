<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=7">
<title>页面左边树</title>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
html,body{height:100%;}
-->
</style>
<script type="text/javascript" src="/resource/js/jQuery/jquery-1.7.2.min.js"></script>
<script src="/resource/part/ligerlib/ligerUI/js/ligerui.min.js" type="text/javascript"></script>
<link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
<link href="/resource/part/ligerlib/ligerUI/skins/ligerui-icons.css" rel="stylesheet" type="text/css" />

<script>
var dialog;
var openDialog;
function OpenDialog(title,id,okCallback,cancelCallback,RefreshFun)
{
	eval(RefreshFun+"()");
	dialog=$.ligerDialog.open({target: $("#"+id),title: title,width:450,buttons: [{ text: "确定", onclick:function()
	{
		dialog.hide();
		if(okCallback==null)return;
		//找出该ID下的所有表单数据
		var ifor=0,json="";
		for(ifor=0;ifor<1;ifor++)
		{
			var input=$("#"+id).find("input");
			if(input==null)break;
			var i=0,l=input.length,value="";
			for(i=0;i<l;i++)
			{
				if(i>0)json+=",";
				value=$(input[i]).val();
				if($(input[i]).attr("type").toUpperCase()=="RADIO" && !$(input[i]).is(":checked"))value="";
				if($(input[i]).attr("type").toUpperCase()=="CHECKBOX" && !$(input[i]).is(":checked"))value="";
				json+="{";
				json+='"'+$(input[i]).attr("name")+'"';
				json+=":";
				json+='"'+value+'"';
				json+="}";
			}
			break;
		}
		okCallback("["+json+"]");
	} }, { text: "取消", onclick: function()
	{
		dialog.hide();
		if(cancelCallback)cancelCallback();
	}}]});
}
function loadDataTree()
{
	$("#dataTree").html("");
	$.ajax({
		type: 'POST',
		url: '/s/function/pageinfo.php',
		data: { type: "1" },
		success: function(data) {
			data = eval('(' + data + ')');
			if (!data.IsSuccess)return;
			data.tree=eval('[' + data.tree + ']');
	
			$("#dataTree").ligerTree({
			data:data.tree,
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
			onselect: function (node)
			{
				$("#selectid").val(node.data.id);
			}
			});	
		}
	});
}
function toevel(code)
{
	eval(code);
}
function toopen_nodeform(edit,title,okCallback,cancelCallback)
{
	if(typeof(edit)=="object")
	{
		for(na in edit)$("#"+na).val(edit[na]);
	}
	return openDialog=$.ligerDialog.open({target:$("#target"),title: title,
	buttons: [{ text: "确定", onclick:function()
	{
		openDialog.hide();
		
		var json="{";
		var outs=$("#target .out");
		var i=0,l=outs.length;
		for(i=0;i<l;i++)
		{
			if(i>0)json+=",";
			json+='"'+outs.eq(i).attr("name")+'":"'+outs.eq(i).val()+'"';
		}
		json+="}";
		if(okCallback)okCallback(json);
	}}, { text: "取消", onclick: function()
	{
		openDialog.hide();
		if(cancelCallback)cancelCallback();
	}}]
	});
}
</script>
</head>
<body>
<iframe src="index_kenzo.php" height="100%" width="100%" frameborder="0" scrolling="on"></iframe>

<!-- start -->
<div id="node_form" style="width:180px;height:200px; margin:3px; display:none;">
	<input name="selectid" type="hidden" value="" id="selectid"/>
	<ul id="dataTree"></ul>
 </div>
<!-- ebd -->

<!-- start -->
<div id="target" style="width:auto;height:auto; margin:3px; display:none;">
    <input type="hidden" name="node_id" id="node_id" class="out"/>
	<input type="hidden" name="act" id="act" value="add"  class="out"/>	
	<p style="margin:5px">文件名：<input type="text" name="filename" id="filename" value=""  style="width:100px;"  class="out"/></p>
	<p style="margin:5px">类　型：<select name="filetype" id="filetype" style="width:105px;"  class="out">
    <option value="1">文件夹</option>
    <option value="0" id="chselected">页面</option>
    <option value="2">跳转地址</option>
	<option value="3">报表管理</option>
  </select></p>
</div>
<!-- ebd -->

</body>
</html>

