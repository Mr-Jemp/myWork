<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<?php
session_start();
include '../../s/inc/function.php';
is_power('setting_parameter','网站配置',false,'/admin/setting/init.html');
?>
<title>数据同步后台</title>    
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/resource/part/newtpl/js/public.js"></script>
<link href="/resource/part/newtpl/css/public.css" rel="stylesheet" type="text/css" />

<link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" /> 
<link href="/resource/part/ligerlib/ligerUI/skins/Tab/css/form.css" rel="stylesheet" type="text/css" /> 
<script src="/resource/part/ligerlib/ligerUI/js/ligerui.all.js" type="text/javascript"></script>  

<script src="/resource/part/ligerlib/jquery-validation/jquery.validate.min.js"></script>
<script src="/resource/part/ligerlib/jquery-validation/jquery.metadata.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/jquery-validation/messages_cn.js" type="text/javascript"></script>

<script src="/resource/js/jQuery/ajaxfileupload.js" type="text/javascript"></script>

<style>
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	font-family:"宋体"
}
html,body{height:98%;}
</style>
</head>
<body style="background-color:#E0F0FE;">
<div class="admin_main_nr_dbox" style="height:100%;">
<form id="formid" action="?id=<?php echo $formid?>&name=<?php echo $name?>" method="post">
</form> 

<p style="margin:5px">
<div class="liger-button" data-click="f_validate" data-width="150" style="margin-left:97px;" id="submit">确定保存</div>
</p>

</div>
<div class="admin_frameset" >
  <div class="open_frame" title="全屏" id="open_frame" flag="min"></div>
  <div class="close_frame" title="还原窗口" id="close_frame" flag="min"></div>
</div>

<script>
var logoDialog,prefix='web';
$(function()
{

	//创建表单结构 
	form = $("#formid").ligerForm({
		inputWidth: 300, labelWidth: 90, space: 40,
		
		fields: [
		{ label: "网站名称", name: "web_name", newline: true, type: "text"},
		{ label: "LOGO设置", name: "web_logo", newline: true, type: "text"},
		{ label: "备 案 号", name: "web_beian", newline: true, type: "text"},
		{ label: "公司名称", name: "web_company", newline: true, type: "text"}
		]
	});

	$("#submit").bind("click",function()
	{
		var web_name=$("[name='"+prefix+"_name']").val();
		var web_logo=$("[name='"+prefix+"_logo']").val();
		var web_beian=$("[name='"+prefix+"_beian']").val();
		var web_company=$("[name='"+prefix+"_company']").val();
		$.ajax({
			type: 'POST',
			url: '/s/setting/web_setting.php',
			data: {'web_name':web_name,'web_logo':web_logo,'web_beian':web_beian,'web_company':web_company,"get":"no"},
			success: function(data) {
				data = eval('(' + data + ')');
				if(data.IsSuccess){
					$.ligerDialog.success(data.Message);
				}else{
				 $.ligerDialog.error('保存失败：'+data.Message);
				}
			},error: function(xhr, stat, e)
			{
				$.ligerDialog.error("保存失败：找不到地址！" );
			}
		});
	});
});
$(window).load(function()
{
	$.ajax({
		type: 'POST',
		url: '/s/setting/web_setting.php',
		data: {"get":"yes"},
		success: function(data) {
			data = eval('(' + data + ')');
			if(data.IsSuccess)
				$("[name='"+prefix+"_name']").val(data.web_name);
				$("[name='"+prefix+"_logo']").val(data.web_logo);
				$("[name='"+prefix+"_beian']").val(data.web_beian);
				$("[name='"+prefix+"_company']").val(data.web_company);
		},error: function(xhr, stat, e)
		{
		}
	});
	
	$("[name='"+prefix+"_logo']").bind("click",function()
	{
		logoDialog=$.ligerDialog.open({
			target: $("#AppendBill_Div"),
			title: '添加LOGO图标', 
			width: 360, height: 170, top: 170, left: 280,
			buttons: [
				{ text: '上传', onclick: function () { savelogo(); } },
				{ text: '取消', onclick: function () { logoDialog.hide(); } }
			]
		});	
	});
});
function savelogo()
{
	$.ajaxFileUpload(
	{
		  url: "/s/function/upload.php",
		  secureuri: false,
		  fileElementId: "upfile",

		  dataType: "text",
		  success: function (data, status) 
		  {
		  	data=eval('('+data+')');
			if(data.IsSuccess)
			{
				$("[name='"+prefix+"_logo']").val(data.Addess);
				logoDialog.hide();
			}else
			{
				$.ligerDialog.error(data.Message);
				logoDialog.hide();
			}
		  },
		  error: function (data, status, e) {
			 alert(data);
			 logoDialog.hide();
		  }
	});
}
</script>
<div id="AppendBill_Div" style="width:98%; margin:3px; display:none;">
	<h3 style="margin:10px;">LOGO上传</h3>
	<div>
		<input type="file" id="upfile" name="upfile"/> 
		<p style="text-align:center; margin:10px;">支持：jpg、gif或bmp图片</p>
	</div>
</div>
 
</body>
</html>