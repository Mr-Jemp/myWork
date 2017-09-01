<?php
session_start();
include_once('inc/conn.php');
include_once('power/public.php');

$Submit=$_REQUEST['Submit'];
$fieldtype=$_REQUEST['fieldtype'];
$field=$_REQUEST['field'];
$key=$_REQUEST['key'];
$starttime=$_REQUEST['starttime'];
$endtime=$_REQUEST['endtime'];

$formid=intval(trim($_REQUEST["formid"]),10);

$fieldCalculation=$_REQUEST['fieldCalculation'];
if(strlen($fieldCalculation)>0){
	if(strlen($request)>0)$request.="&fieldCalculation=$fieldCalculation";
	else $request.="fieldCalculation=$fieldCalculation";
}

$currenturl="/s/listform.php?formid=$formid";
if(strlen($Submit)>0)$currenturl.="&Submit=$Submit";
if(strlen($fieldtype)>0)$currenturl.="&fieldtype=$fieldtype";
if(strlen($field)>0)$currenturl.="&field=$field";
if(strlen($key)>0)$currenturl.="&key=$key";
if(strlen($starttime)>0)$currenturl.="&starttime=$starttime";
if(strlen($endtime)>0)$currenturl.="&endtime=$endtime";
if(strlen($fieldCalculation)>0)$currenturl.="&fieldCalculation=$fieldCalculation";


$fieldarray=array();

$errmsg="";$FindWhere="";
if(strlen($Submit)>0){
	$request="Submit=$Submit";
	
	if($fieldtype=='key'){
		$request.="&fieldtype=$fieldtype";
		if(strlen($field)<1)
			$msg="请选择字段";
		else if(strlen($key)<1){
			$msg="请输入关建字";
		}else{
			$request.="&key=$key&field=$field";
			$FindWhere=" and `$field` LIKE '%$key%'";
		}
	}else if($fieldtype=='time'){
		$request.="&fieldtype=$fieldtype";
		if(strlen($starttime)<1){
			$msg="开始时间不正确";
		}else if(strlen($endtime)<1){
			$msg="结束时间错误";
		}else{
			$st=intval(strtotime($starttime));
			$et=intval(strtotime($endtime));
			if($st<=intval(strtotime("1970-01-01 08:00:10"))){
				$msg="开始时间段太小";
			}else if($et<$st){
				$msg="结束时间必需大于或等开始时间";
			}else{
				$request.="&starttime=$starttime&endtime=$endtime";
				$FindWhere=" and `$field`>=$st and `$field`<=$et";
			}
		}
	}
}

$power=getReadPowerCombine($_SESSION['uroles'],$formid,3);

$deleteid=intval(trim($_REQUEST["deleteid"]),10);
if($deleteid>0){
	$power_delete=getReadPowerCombine($_SESSION['uroles'],$formid,6);
	
	if($power_delete["IsSuccess"]==true){
		$sql="SELECT * FROM `ht_form_data_$formid` where foreign_id='$deleteid' ".$power_delete["AND_SQL"];
		
		$query=mysql_query($sql);
		$delete_row=mysql_fetch_array($query);
		if($delete_row){
			mysql_query("DELETE FROM ht_foreign_test where id='$deleteid'");
			mysql_query("DELETE FROM ht_form_data_$formid where foreign_id='$deleteid'".$power_delete["AND_SQL"]);
			$msg="删除成功";
		}else{
			$msg="在您的权限下，找不到数据，删除失败";
		}
	}else $msg="对不起，您没有删除权限";
}

$page=intval(trim($_REQUEST["page"]),10);
$pageSize=20;
$sql="select form_name,content_data from ht_form where `id`='$formid'";
$query=mysql_query($sql);
$name_row=mysql_fetch_array($query);

$where="is_del=0".$power["AND_SQL"];
$sql="select count(*) id from ht_form_data_$formid where $where";

$query=mysql_query($sql);
$row=mysql_fetch_array($query);
$dataCount=$row["id"];
$pageCount=ceil($dataCount/$pageSize);
if($page>$pageCount)$page=$pageCount;
if($page<1)$page=1;
$sffset=($page-1)*$pageSize;

$sql="select * from ht_form_data_$formid where $where $FindWhere";
$sql.=" order by id desc";
$sql.=" limit $sffset,$pageSize";

$query=mysql_query($sql);

$tpl_name_data = unserialize($name_row['content_data']);

function getNameType($name){
	global $tpl_name_data;

	foreach($tpl_name_data as $key=>$value){
		$arr=explode(",",$tpl_name_data[$key]['name']);
		if($name==$arr[0])return array($tpl_name_data[$key]['leipiplugins'],$tpl_name_data[$key]['name'],$tpl_name_data[$key]['value'],$tpl_name_data[$key]['orgtitle']);
	}
	return "";
}
//读出该表单的所有字段
$field_query=mysql_query("SHOW FULL COLUMNS FROM ht_form_data_$formid WHERE Field LIKE 'data_%'");
$i2=0;
for($i=0;;$i++){
	$row=mysql_fetch_array($field_query);
	if($row){}else break;
	
	$fieldarrv[$i]=$row["Field"];
	
	$arr=getNameType($row["Field"]);
	if(!is_array($arr))continue;
	$fields[$i2]=$row["Comment"];
	if(strlen($fields[$i2])<1)$fields[$i2]=$row["Field"];
	$fieldv[$i2]=$row["Field"];
	$fielda[$i2]=$arr;
	$i2++;
}
?><!DOCTYPE HTML>
<html>
 <head>
    
	<title><?=$name_row['form_name']?></title>
	<meta name="keyword" content="ueditor formdesign plugins,ueditor扩展,web表单设计器,高级表单设计器,Leipi Form Design,web form设计器,web form designer">
	<meta name="description" content="javascript jquery ueditor php表单设计器实例演示与下载！">
	
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		
	<link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
	<script src="/resource/part/ligerlib/jquery/jquery-1.11.1.min.js" type="text/javascript"></script>
	<script src="/resource/part/ligerlib/ligerUI/js/ligerui.all.js" type="text/javascript"></script> 
	<script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerTab.js"></script>
	<script src="/resource/part/ligerlib/json2.js"></script>
	<script src="/resource/part/ligerlib/jquery.cookie.js" type="text/javascript"></script>


	<style>
	body,td,p,a{font-size:13px;}
	p{margin: 5px 0;}
	td{border-top:1px solid #eeeeee;}
	table{border:1px solid #eeeeee;font-size:14px;}
	.center{color:#666666;}
    a:link {
	text-decoration: none;
	color: #333333;
	}
	a:visited {
		text-decoration: none;
		color: #333333;
	}
	a:hover {
		text-decoration: none;
		color: #333333;
	}
	a:active {
		text-decoration: none;
		color: #333333;
	}
</style>

<script src="/resource/js/jQuery/My97DatePicker/WdatePicker.js"></script>
<script>
window.onerror=function(){return true;}
$(function()
{
	$('#fieldtype').change(function()
	{
		$("#keyid").hide();
		$("#timeid").hide();
		
		$("#field option[value='dateline']").remove();
		
		if($(this).val()=="key") $("#keyid").show();
		if($(this).val()=="time")
		{
			$("#field").append('<option value="dateline">添加时间</option>');
			$("#timeid").show();
		}
	});
	$("#nsk").bind("click",function()
	{
		var dooStr=$("#nskdoprint").html();
		var printobj=document.createElement("div");
		$(printobj).append('<div style="line-height:30px;"><?=$name_row['form_name']?> '+((new Date()).toLocaleDateString())+'</div>');
		$(printobj).append(dooStr);
		var tb=$(printobj).find("table");
		$(tb).attr("border","1");
		var trs=$(tb).find("tr");
		var length=trs.length-1;
		trs.eq(length).remove();
		for(i=0;i<length;i++)
		{
			var l=trs.eq(i).find("td").length-1;
			trs.eq(i).find("td").eq(l).remove();
			var l=trs.eq(i).find("th").length-1;
			trs.eq(i).find("th").eq(l).remove();
		}
		dooStr=$(printobj).html();
		var windos=window.open();
		windos.document.write(dooStr);
		windos.document.close();
		windos.print();
		windos.close();
	});
	$("#showurl").bind("click",function(){
		$.ligerDialog.success('<?=$currenturl?>');
	});

});
</script>
<style>
.listcontrol{
	width:auto;
	background:#fafafa;
	border:1px solid #CCCCCC!important;
	display:none;
}
.listcontrol td{
	border:1px solid #EEEEEE;
	text-align:center;
	padding-left:5px;
	padding-right:5px;
}
.listcontrol th{
	border:1px solid #EEEEEE;
	text-align:center;
	padding-left:8px;
	padding-right:8px;
	background:#efefef;
}
</style>
 </head>
<body>
<div style="margin:0 auto;width:95%;height:auto;">
<p style="font-size:16px;">
	【<?=$name_row['form_name']?>】 数据列表 
	<a style="font-size:16px;color:#0066FF" href="javascript:;" id="list">点击添加</a>
	<a style="font-size:16px;color:#0066FF" href="javascript:;" id="nsk">表单打印</a>
	<a style="font-size:16px;color:#0066FF" href="javascript:;" id="showurl">显示当前URL</a>
</p>
<form action="" method="post">
	<input name="Submit" type="hidden" value="Submit">
	<p style="padding:10px">
		搜索分类：
		<select name="fieldtype" id="fieldtype">
			<option value="">请选择分类</option>
			<option value="key" <?php if($fieldtype=="key") echo 'selected';?>>关键字</option>
			<option value="time" <?php if($fieldtype=="time") echo 'selected';?>>时间段</option>
		</select>
		字段:
		<select name="field" id="field">
			<option value="" selected>请选择字段</option>
			<?php
			$fieldsl=count($fields);
			for($i=0;$i<$fieldsl;$i++){
				if($field==$fieldv[$i])
				echo'<option value="'.$fieldv[$i].'" selected>'.$fields[$i].'</option>';
				else
				echo'<option value="'.$fieldv[$i].'">'.$fields[$i].'</option>';
			}
			?>
		</select>
		<span id="keyid" <?php if($fieldtype=="key" || $fieldtype==""){}else{?>style="display:none"<?php }?>>
		关键字: <input name="key" type="text">
		</span>
		<span id="timeid" <?php if($fieldtype=="time"){}else{?>style="display:none"<?php }?>>
		起始时间:<input name="starttime" id="starttime" type="text" value="<?php echo date("Y-m-d")?>" style="width:100px;" onClick="WdatePicker()">
		结束时间:<input name="endtime" id="starttime" type="text" value="<?php echo date("Y-m-d")?>" style="width:100px;" onClick="WdatePicker()">
		</span>
		合计字段：
		<select name="fieldCalculation" id="fieldCalculation">
			<option value="">请选择字段</option>
			<?php
			$fieldsl=count($fields);
			for($i=0;$i<$fieldsl;$i++){
				if($fieldCalculation==$fieldv[$i])
				echo'<option value="'.$fieldv[$i].'" selected>'.$fields[$i].'</option>';
				else
				echo'<option value="'.$fieldv[$i].'">'.$fields[$i].'</option>';
			}
			?>
		</select>
		<input name="Submit" type="submit" value="提交">
	</p>
</form>
<div style="width:auto;height:auto;" id="nskdoprint">
<table width="100%" align="center" cellpadding="5" style="border-collapse:inherit;">
<tr style="font-weight:bold;background:#efefef;height:30px;">
  <th style="text-align:center;">ID</th>
  <?php
  $fieldsl=count($fields);
  for($i=0;$i<$fieldsl;$i++){
	echo'<th style="text-align:center;">'.$fields[$i].'</th>'; 
  }?>
  <th style="text-align:center;">最后修改时间</th>
  <th style="text-align:center;">添加时间</th>
  <th style="text-align:center;">操作</th>
</tr>
<?php
$inx=0;
while($row=mysql_fetch_array($query))
{	
?>
<tr class="center" style="height:25px;">
  <td align="center"><?=$row['id']?></td>
  <?php
  for($i=0;$i<$fieldsl;$i++){
  	$value=$row[$fieldv[$i]];
	$value=strlen($value)<1?"&nbsp;":$value;
	
	$array=unserialize($value);
	if(is_array($array)){
		$value='<span style="cursor:pointer;margin:0 auto;" class="aypodlist" id="'.$inx.'">查看详情</span>'
		.'<div id="goshowlist'.$inx.'" class="listcontrol"><div>&nbsp;▲</div>'
		.'<table>';
		$value.='<tr>';
		$temp=trim($fielda[$i][3],'`');
		$arr=explode("`",$temp);
		for($i3=0;$i3<count($arr);$i3++)
		{
			$value.='<th>'.$arr[$i3].'</th>';
		}
		$value.='</tr>';
			
		for($i2=0;$i2<count($array['list']);$i2++)
		{
			$value.='<tr>';
			$arr=$array['list'][$i2];
			for($i3=0;$i3<count($arr);$i3++)
			{
				$value.='<td>'.$arr[$i3].'</td>';
			}
			$value.='</tr>';
		}
		$value.='</div></table>';
	}else if($fielda[$i][0]=='checkboxs'){
		$value='';
		$arr1=explode(",",$fielda[$i][1]);
		$arr2=explode(",",$fielda[$i][2]);
		for($i2=0;$i2<count($arr1);$i2++){
			for($i3=0;$i3<count($fieldarrv);$i3++){
				if($fieldarrv[$i3]!=$arr1[$i2])continue;
				if($row[$fieldarrv[$i3]]==1)
					$value.=$arr2[$i2].',';
			}
		}
		$value=trim($value,',');
	}else if($fielda[$i][0]=='uploadfile'){
		
		$out=array();$outinx=0;
		$ext=substr(strrchr($row[$fieldv[$i]],'.'),1);
		$file=$row[$fieldv[$i]];
		
		$out[0]="<a href=\"/upload/formfile/$file\" target=\"_blank\">";
		$out[0].="点击下载";
		$out[0].="</a>";
		if(strlen($file)<1)$out[0]="";
		
		$out[1]="<a href=\"/upload/formfile/$file\" target=\"_blank\">";
		$out[1].="<img src=\"/upload/formfile/$file\" width=\"30\" height=\"30\" border=\"0\">";
		$out[1].="</a>";
		if(strlen($file)<1)$out[1]="";
		
		include_once $_SERVER['DOCUMENT_ROOT']."/s/inc/control.ini.php";
		
		if(in_array(strtolower($ext),$extendeds)){
			$outinx=1;
		}
		$value=$out[$outinx];
	}
	
	$fieldarray[$i]+=$value;
	
	echo"<td align=\"center\">$value</td>"; 
  }?>
  <td align="center"><?=$row['updatetime']==0?"无":date("Y-m-d H:i",$row['updatetime'])?></td>
  <td align="center"><?=date("Y-m-d H:i",$row['dateline'])?></td>
  <td align="center">
  	<a did="<?=$row['foreign_id']?>" class="edit" target="_blank" href="javascript:;">修改</a> 
	| <a did="<?=$row['foreign_id']?>" class="delete" target="_blank" href="javascript:;">删除</a>
    | <a did="<?=$row['foreign_id']?>" class="view" target="_blank" href="javascript:;">查看</a></td>
</tr>
<?php
$inx++;
}if($dataCount<1){
?>
<tr class="center" style="height:25px;">
  <td colspan="<?php echo ($fieldsl+5)?>" align="center">暂无数据</td>
  </tr>
<?php
}
mysql_close($conn);
if(strlen($fieldCalculation)>0){
?>
<tr class="center" style="height:25px;">
  <?php
  for($i=-1;$i<$fieldsl;$i++)
  {
  	if($fieldCalculation=="")
		echo"<td>&nbsp;</td>";
  	else if($fieldCalculation==$fieldv[$i+1])
		echo"<td align=\"center\">合计：</td>";
	else if($i==-1)
		echo '<td align="center">&nbsp;</td>';
  	else if($fieldCalculation==$fieldv[$i])
		echo"<td align=\"center\">$fieldarray[$i]</td>";
	else
		echo"<td>&nbsp;</td>";
  }?>
  <td align="center">&nbsp;</td>
  <td align="center">&nbsp;</td>
  <td align="center">&nbsp;</td>
</tr>
<?php }?>
<tr style="height:25px;">
  <td colspan="<?php echo ($fieldsl+5)?>" align="right">页次 <?=$page?>/<?=$pageCount?> <a href="javascript:;" class="page" type="1">首页</a> | <a href="javascript:;" class="page" type="<?=($page+1)?>">下一页</a> | <a href="javascript:;" class="page" type="<?=($page-1)?>">上一页</a> | <a href="javascript:;" class="page" type="<?=$pageCount?>">尾页</a>&nbsp;</td>
  </tr>
</table>
</div>
</div>
<script>
$(function()
{
	$(document).bind("click",function(event){
		if($(event.target).attr("class")=='aypodlist')return;
		if($(event.target).attr("class")=='listcontrol')return;
		$(".listcontrol").hide();
	});
	$(".aypodlist").bind("click",function(event){
		$(".listcontrol").hide();
		var id=$(this).attr("id");
		goshow("#goshowlist"+id);
	});

	$(".view").bind("click",function()
	{
		var did=$(this).attr("did");
		var url='/s/readform.php?formid=<?=$formid?>&id='+did;
		window.location.href=url;
	});
	$(".edit").bind("click",function()
	{
		var did=$(this).attr("did");
		var url='/s/submitform.php?formid=<?=$formid?>&id='+did;
		window.location.href=url;
	});
	$(".delete").bind("click",function()
	{
		if (!confirm("确定要删除吗？")) return false;
		var did=$(this).attr("did");
		var url='?formid=<?=$formid?>&deleteid='+did+'&page=<?=$page?>&<?=$request?>';
		window.location.href=url;
	});
	$(".page").bind("click",function()
	{
		var type=$(this).attr("type");
		var url='?formid=<?=$formid?>&page='+type+'&<?=$request?>';
		window.location.href=url;
	});
	$("#list").bind("click",function()
	{
		var url='/s/submitform.php?formid=<?=$formid?>';
		window.location.href=url;
	});
	
	$(".center").bind("mouseover",function()
	{
		$(this).css("background","#efefef");
	});
	$(".center").bind("mouseout",function()
	{
		$(this).css("background","#ffffff");
	});
});
function goshow(id){

	if($(id).is(":hidden")){
		$(id).css({position:"absolute"});
		$(id).show();
	}else{
		$(id).hide();	
	}
	return false;
};
<?php
if(strlen($msg)>0)print 'alert("'.$msg.'")';
?>
</script>

</body>
</html>