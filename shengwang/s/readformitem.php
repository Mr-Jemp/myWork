<?php
session_start();
include_once"function/check_session.php";
include_once 'inc/conn.php';
include_once 'power/public.php';

$formid=intval(trim($_REQUEST["formid"]),10);

$power=getReadPowerCombine($_SESSION['uroles'],$formid,3);

$sql="select * from ht_form where `id`='$formid' and is_del=0";
$query=mysql_query($sql);
$row=mysql_fetch_array($query);

$id=1;
$sql="select * from ht_form_data_$formid where `id`='$id' and is_del=0".$power["AND_SQL"];
$query=mysql_query($sql);
$data=mysql_fetch_array($query);

?><!DOCTYPE HTML>
<html>
 <head>
    
	<title><?=$row["form_desc"]?></title>
	<meta name="keyword" content="ueditor formdesign plugins,ueditor扩展,web表单设计器,高级表单设计器,Leipi Form Design,web form设计器,web form designer">
	<meta name="description" content="javascript jquery ueditor php表单设计器实例演示与下载！">
	
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<link href="/admin/pageEdit/formdesign/css/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css" />
	<!--[if lte IE 6]>
	<link rel="stylesheet" type="text/css" href="/admin/pageEdit/formdesign/css/bootstrap/css/bootstrap-ie6.css">
	<![endif]-->
	<!--[if lte IE 7]>
	<link rel="stylesheet" type="text/css" href="/admin/pageEdit/formdesign/css/bootstrap/css/ie.css">
	<![endif]-->
	<link href="/admin/pageEdit/formdesign/css/site.css" rel="stylesheet" type="text/css" />

	<link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
	<script src="/resource/part/ligerlib/jquery/jquery-1.11.1.min.js" type="text/javascript"></script>
	<script src="/resource/part/ligerlib/ligerUI/js/ligerui.all.js" type="text/javascript"></script> 
	<script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerTab.js"></script>
	<script src="/resource/part/ligerlib/json2.js"></script>
	<script src="/resource/part/ligerlib/jquery.cookie.js" type="text/javascript"></script>
	
	<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/ueditor/ueditor.config.js"></script>
	<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/ueditor/ueditor.all.js"> </script>
	<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/ueditor/lang/zh-cn/zh-cn.js"></script>
	
	<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/ueditor/formdesign/tolist.js"></script>
	<style>p{margin: 5px 0;}</style>
 </head>
<body>

    
 

<div class="container">
<div id="design_content">
<?php
	if($power["IsSuccess"]==false)
	{?>
	<table width="100%" height="90%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center">&nbsp;<?=$power["Message"]?> 请点击<a href="javascript:;" id="back">返回</a></td>
  </tr>
</table>
	<?php
	}else
	{
		include("tp/Application/Home/Org/Formdesign.class.php");
		$formdesign = new \Formdesign;
		
		$design_content = $formdesign->unparse_form($row,$data,array('action'=>'view'));
		?>
		<p style="font-size:16px;">【<?=$row['form_name']?><?=strlen($name)>0?'->'.$name:''?>】 数据查看 | <a href="javascript:;" class="back">返回设置</a></p>
		<?
		print $design_content;
	}
	mysql_close($conn);
?>
</div>
</div>
<script type="text/javascript">
$(function()
{
	$("#back").bind("click",function()
	{
		window.history.back();
	});
	
	$(".back").bind("click",function()
	{
		var url='/s/submitformitem.php?res=main&formid=<?=$formid?>';
		window.location.href=url;
	});

});
</script>

</body>
</html>