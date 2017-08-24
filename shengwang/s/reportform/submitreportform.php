<?php
session_start();
include_once('../inc/conn.php');
include_once('../power/public.php');

$msg="";
$uid=$_SESSION['uid'];
$time=time();

$formid=intval(trim($_REQUEST["formid"]),10);

if(strlen($_REQUEST['submit'])>0){
	$dt=array();
	foreach($_REQUEST as $key=>$value){
		if(substr($key,0,3)=='dt_'){
			$key=substr($key,3);
			$dt["rf".$key]=$value;
		}
	}
	
	$sql="select * from ht_form_data_$formid";
	$query=mysql_query($sql);
	$rs=mysql_fetch_array($query);
	if($rs==NULL){
		$sql="INSERT INTO  `ht_form_data_$formid` (`uid` ,`dateline`";
		foreach($dt as $key=>$value){
			$sql.=" ,`$key`";
		}
		$sql.="VALUES ('$uid' , '$time'";
		foreach($dt as $key=>$value){
			$sql.=" ,'$value'";
		}
		$sql.=');';
	}else{
		$sql="UPDATE  `ht_form_data_$formid` SET `updatetime`='$time'";
		foreach($dt as $key=>$value){
			$sql.=" ,`$key`='$value'";
		}
	}
	$er=mysql_query($sql);
	if($er==NULL){
		$msg="设置失败：".mysql_error();
	}else{
		$msg="设置成功！";
	}
}

$sql="select * from ht_form where `id`='$formid' and is_del=0";
$query=mysql_query($sql);
$row=mysql_fetch_array($query);

$sql="select * from ht_form_data_$formid where is_del=0 order by id desc";
$query=mysql_query($sql);
$datarow=mysql_fetch_array($query);

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
	<script>
	$(function(){
		var datarow=new Array();
		<?php
		foreach($datarow as $key=>$value){
			if(substr($key,0,2)=='rf'){
				$key=substr($key,2);
				print'datarow["dt_'.$key.'"]="'.$value.'";';
			}
		}
		?>
		var formeditor = $("#content").html();
		if(formeditor==null){
		}else if(formeditor==""){
		}else{
			var re = /(data\d+)/ig;
			var arr=null,out=Array();
			var outstr='',i=0,isthere=false;
			while(arr=re.exec(formeditor)){
				isthere=false;
				for(i=0;i<out.length;i++){
					if(out[i]==arr[0]){
						isthere=true;
						break;
					}
				}
				if(isthere)continue;
				out.push(arr[0]);
				if(outstr==""){
					outstr+=arr[0];
				}else{
					outstr+=','+arr[0];
				}
			}
			formeditor=decodeURIComponent(formeditor).replace(/\+/ig," ");
			for(var i=0;i<out.length;i++){
				var value=datarow["dt_"+out[i]];
				if(typeof(value)=='undefined')value="";
				formeditor=formeditor.replace(out[i],'<input name="dt_'+out[i]+'" value="'+value+'" style="width:100%">');
			}
			$("#content").html(formeditor).trigger("create");
	  }
	});
	</script>
</head>
<body>
<form action="?" enctype="multipart/form-data" method="post">
	<input type="hidden" value="<?=$formid?>" name="formid">
	<div class="container">
		<div id="design_content">
			<p class="title">【<?=$row['form_name']?><?=strlen($name)>0?'->'.$name:''?>】 数据设置 | <a href="javascript:;" class="back">查看数据</a></p>
			<p id="content"><?php echo str_replace('<table','<table class="table table-bordered" ',$row['content']);?></p>
			<p class="title">&nbsp;<input name="submit" type="submit" value=" 提 交 "></p>
		</div>
	</div>

</form>
</body>
<script>
	$(function()
	{
		$(".back").bind("click",function()
		{
			var url='/s/reportform/reportform.php?formid=<?=$formid?>';
			window.location.href=url;
		});
		if('<?=$msg?>'.length>0)alert('<?=$msg?>');
	});
</script>
</html>