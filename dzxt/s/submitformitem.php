<?php
session_start();
include_once("tp/Application/Home/Org/Formdesign.class.php");
include_once('inc/conn.php');
include_once('power/public.php');

$formdesign = new \Formdesign;

$formid=intval(trim($_REQUEST["formid"]),10);
$id=1;
$res=$_REQUEST["res"];

if($id>0)
{
	$power=getReadPowerCombine($_SESSION['uroles'],$formid,4);
}else
{
	$power=getReadPowerCombine($_SESSION['uroles'],$formid,5);
}

$name=$_POST["name"];
$submit=$_REQUEST["submit"];

$sql="select * from ht_form where `id`='$formid' and is_del=0";
$query=mysql_query($sql);
$row=mysql_fetch_array($query);

$sql="select * from ht_form_data_$formid where `id`='$id' and is_del=0".$power["AND_SQL"];
$query=mysql_query($sql);
$data=mysql_fetch_array($query);
$foreign_id=$data['foreign_id'];
//提交保存
if(strlen($submit)>0)
{
	$time=time();
	$unparse_data = $formdesign->unparse_data($row,$_POST);
	if($id>0)
	{
		$sql="select `id` from ht_foreign_test where `id`='$foreign_id' and is_del=0";
		$query=mysql_query($sql);
		$test=mysql_fetch_array($query);
		if($test)
		{
		}else
		{
			//保存到test表
			$sql="INSERT INTO `ht_foreign_test` (`form_id`, `dateline`,`name`) VALUES ('$formid', '$time','$name');";
			$query=mysql_query($sql);
			
			$sql="select `id` from ht_foreign_test order by `id` desc limit 0,1";
			$query=mysql_query($sql);
			$test=mysql_fetch_array($query);
			$id=$test["id"]."";
			
			//保存到data表
			$form_data['foreign_id'] = $id;
			$form_data['dateline'] = time();
			$form_data = array_merge($form_data,$unparse_data);
			$title="";$value="";
			foreach($form_data as $k=>$v){$title.=$k.",";$value.="'".$v."',";}
			$title=trim($title,',');
			$value=trim($value,',');
			$sql="INSERT INTO `ht_form_data_$formid` ($title) VALUES ($value)";
			$query=mysql_query($sql);
			if($query)exit("<script>alert('添加成功');window.location.href='?formid=$formid&id=$id&res=$res';</script>");
			else {$power["IsSuccess"]=false;$power["Message"]="添加失败";}
		}
		if($data)
		{
			$form_data = array(
				'uid'=>0,
				'updatetime'=>$time,
			);
			$form_data = array_merge($form_data,$unparse_data);
			$upedit="";
			foreach($form_data as $k=>$v){$upedit.=$k."='$v',";}
			$upedit=trim($upedit,',');
			$sql="update `ht_form_data_$formid` set $upedit where foreign_id='$id' and is_del=0";
			mysql_query($sql);
			
			$sql="update `ht_foreign_test` set `name`='$name',`updatetime`='$time' where id='$foreign_id' and is_del=0";
			mysql_query($sql);
			
			exit("<script>alert('修改成功');window.location.href='?formid=$formid&id=$id&res=$res';</script>");
		}else {$power["IsSuccess"]=false;$power["Message"]="找不到修改的数据，可能是没有权限，或数据不存在！";}
	}
}else if($id>0)
{
	$sql="select * from ht_foreign_test where `id`='$foreign_id' and is_del=0";
	$query=mysql_query($sql);
	$noe=mysql_fetch_array($query);
	$name=$noe['name'];
}

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
	<style>
	p{margin: 5px 0;}
	.title{background:#efefef;padding-top: 5px;padding-bottom: 5px;font-size:15px;}
	</style>
 </head>
<body>

    
<form action="?" method="post">
<input type="hidden" value="<?=$formid?>" name="formid">
<input type="hidden" value="<?=$id?>" name="id">
<input type="hidden" value="<?=$res?>" name="res">
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

<script type="text/javascript">
$(function()
{
	$("#back").bind("click",function()
	{
		window.history.back();
	});
});
</script>
<?php
	}else
	{?>
<p class="title">【<?=$row['form_name']?><?=strlen($name)>0?'->'.$name:''?>】
<?php
if($res=='main'){?>
	数据设置 | <a href="javascript:;" class="info">查看结果</a>
<?php }?>
</p>
<p>标识:<input type="text" class="form-control" placeholder="必填项" name="name" value="<?=$name?>"></p>
<?php
	$design_content = $formdesign->unparse_form($row,$data,array('action'=>'edit'));
	print $design_content;
	mysql_close($conn);
?>
<p class="title">&nbsp;<input name="submit" type="submit" value=" 提 交 "></p>

<?php
}
?>
</div>
</div>

</form>
</body>
<script>
$(function()
{
	$(".info").bind("click",function()
	{
		var url='/s/readformitem.php?formid=<?=$formid?>';
		window.location.href=url;
	});
});
</script>
</html>