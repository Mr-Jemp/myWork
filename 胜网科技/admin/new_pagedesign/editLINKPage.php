<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>跳转地址参数设置</title>
<script type="text/javascript" src="../../resource/js/jQuery/jquery-1.9.1.js"></script> 
<link href="../../resource/part/newtpl/css/public.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../../resource/part/newtpl/js/public.js"></script>
<link href="../../resource/part/newtpl/css/rheight.css" rel="stylesheet" type="text/css" />



<link href="../../resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" /> 
<link href="../../resource/part/ligerlib/ligerUI/skins/Tab/css/form.css" rel="stylesheet" type="text/css" /> 
<script src="../../resource/part/ligerlib/jquery/jquery-1.3.2.min.js" type="text/javascript"></script>
<script src="../../resource/part/ligerlib/ligerUI/js/ligerui.all.js" type="text/javascript"></script>  

<script src="../../resource/part/ligerlib/jquery-validation/jquery.validate.min.js"></script>
<script src="../../resource/part/ligerlib/jquery-validation/jquery.metadata.js" type="text/javascript"></script>
<script src="../../resource/part/ligerlib/jquery-validation/messages_cn.js" type="text/javascript"></script>

<script>
<?php
@include_once("../../s/inc/conn.php");
$formid=intval(@$_REQUEST['id']);
$name=@$_REQUEST['name'];
$pm="/^http:\/\/[0-9a-z\-]+\..*/i";
while(true)
{
	if($formid==0){echo 'alert("ID参数不正确");history.go(-1);';break;}
	if(isset($_POST['link']))
	{
		$link=@$_POST["link"];
		if(strlen($link)<1){echo 'alert("请输入链接地址");';break;}
		if(!preg_match($pm,$link)){echo "alert(\"请输入正确的URL地址$link\");";break;}
		
		$sql="update `ht_form` set `content`='$link' where id='$formid' and is_del=0";
		mysql_query($sql);
	}else
	{
		$sql="select * from ht_form where `id`='$formid' and is_del=0";
		$query=mysql_query($sql);
		$row=mysql_fetch_array($query);
		$link=$row['content'];		
	}
	break;
}
?>
$(function()
{

	//创建表单结构 
	form = $("#formid").ligerForm({
		inputWidth: 300, labelWidth: 90, space: 40,
		
		fields: [
		{ label: "链接地址", name: "link", newline: true, type: "text"}
		]
	});
	$("#submit").bind("click",function()
	{
		$("#formid").submit();
	});
	$("[name='link']").val("<?php echo $link?>");
});

</script>
<style>
p{font-size:14px; font-weight:bold;background:#efefef;line-height:30px;height:30px; padding-left:10px;border-radius:3px;}
</style>
</head>
<body style="background-color:#E0F0FE">
<div class="admin_main_nr_dbox">
<p>跳转地址参数设置</p>
<form id="formid" action="?id=<?php echo $formid?>&name=<?php echo $name?>" method="post">
</form> 
<div class="liger-button" data-click="f_validate" data-width="150" style="margin-left:97px;" id="submit">提交保存</div>

</div>
<div class="admin_frameset" >
  <div class="open_frame" title="全屏" id="open_frame" flag="min"></div>
  <div class="close_frame" title="还原窗口" id="close_frame" flag="min"></div>
</div>
 </body>
</html>