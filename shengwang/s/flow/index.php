<?php
session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>流程管理</title>
<link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
<link href="/resource/part/ligerlib/ligerUI/skins/ligerui-icons.css" rel="stylesheet" type="text/css" />
<script src="/resource/part/ligerlib/jquery/jquery-1.5.2.min.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/ligerUI/js/ligerui.all.js" type="text/javascript"></script> 
<script src="/resource/part/ligerlib/jquery.cookie.js" type="text/javascript"></script>	 
<script src="/resource/part/ligerlib/json2.js"></script>
<script>
var manager;
<?php
include_once '../inc/conn.php';
$type=$_GET["type"];
$oby=' ORDER BY id DESC';
if($type=='getMyflow'){
	$query=mysql_query("select * from `ht_run` where uid=".$_SESSION['uid'].$oby);	
	dispaly($query);
}elseif($type=='getMyendflow'){
	$query=mysql_query("select * from `ht_run` where uid=".$_SESSION['uid']." and is_finish=1".$oby);
	dispaly($query);
}elseif($type=='getnoendflow'){
	$query=mysql_query("select * from `ht_run` where uid=".$_SESSION['uid']." and is_finish!=1 and is_finish!=4".$oby);
	dispaly($query);
}elseif($type=='setFlow'){
	$query=mysql_query("select id,run_id,run_flow,run_flow_process from `ht_run_process` where uid=".$_SESSION['uid']." and status=1".$oby);
	$isadd=false;
	while($row = mysql_fetch_array($query)){

		if($isadd)$out.=",";
		$out.='{';
		$out.='id:\''.$row["id"].'\',';
		$out.='run_name:\''.$row["message"].'\',';
		$out.='dateline:\''.$row["send_date"].'\',';
		$out.='}';
		$isadd=true;
	}
	echo 'var flowData={Rows:['.$out.']};';
}elseif($type=='setEndflow'){
	$query=mysql_query("select a.id,a.status,a.js_time,b.run_name,c.process_name from `ht_run_process` as a left join `ht_run` as b on a.run_id=b.id left join ht_flow_process as c on c.id=a.run_flow_process where a.uid=".$_SESSION['uid']." and a.status>1 ORDER BY a.id DESC");	
	$isadd=false;
	while($row = mysql_fetch_array($query)){
		$st=$row['status']==2?' 批准':' 拒绝';		
		$msg=$row['run_name'].' --> '.$row['process_name'].' : '.$st;
		if($isadd)$out.=",";		
		$out.='{';	
		$out.='id:\''.$row["id"].'\',';	
		$out.='run_name:\''.$msg.'\',';
		$out.='dateline:\''.date('Y-m-d H:i:s',$row["js_time"]).'\',';			
		$out.='}';
		$isadd=true;
	}	
	echo 'var flowData={Rows:['.$out.']};';
}
function dispaly2($query){
	$isadd=false;
	while($row = mysql_fetch_array($query)){		
		$msg=str_replace('###',$row['url'].'/mid/'.$row['id'],$row["message"]);
		if($isadd)$out.=",";		
		$out.='{';
		$out.='id:\''.$row["id"].'\',';
		$out.='run_name:\''.$msg.'\',';
		$out.='dateline:\''.$row["send_date"].'\',';			
		$out.='}';
		$isadd=true;
	}	
	echo 'var flowData={Rows:['.$out.']};';
}
function dispaly($query){
	$isadd=false;
	while($row = mysql_fetch_array($query)){
		if($isadd)$out.=",";
		if($row["is_finish"]==1){
			$is_finish='批准/通过';
		}elseif($row["is_finish"]==4){
			$is_finish='折回';
		}else{
			$is_finish='待办';
		}
		$out.='{';
		$out.='"id":"'.$row["id"].'",';
		$out.='"did":"'.$row["from_data_id"].'",';
		$out.='"run_name":"'.$row["run_name"].'",';
		$out.='"dateline":"'.date('Y-m-d H:i:s',$row["dateline"]).'",';
		$out.='"is_finish":"'.$is_finish.'",';		
		$out.='}';
		$isadd=true;
	}	
	echo 'var flowData={Rows:['.$out.']};';
}
mysql_close($conn);
?>
$(function(){
<?php
	if($type=='setFlow' || $type=='setEndflow'){
?>
	$("#flowlist").ligerGrid({
		columns: [
			{display: '主键', name:'id', width: 100 } ,
			{ display: '内容', name:'run_name', minWidth: 260 },
			{ display: '申请时间', name:'dateline', width: 200, align: 'left' }
		], 
		data: flowData, pageSize: 20,width: '100%', height: '99%', checkbox: false
	});
<?php
	}else{
?>
	manager=$("#flowlist").ligerGrid({
		columns: [
			{display: '主键', name:'id', width: 100 } ,
			{ display: '标题', name:'run_name', minWidth: 260 },
			{ display: '申请时间', name:'dateline', width: 200, align: 'left' },
			{ display: '状态', name:'is_finish', minWidth: 80},
			{ display: '操作',minWidth: 150,render: function(rowdata, rowindex, value){
				 var h = ""; 
                 if(rowdata.did>1){h += "<a href='javascript:show(" + rowdata.id + ")'>查看</a> | ";}
				 else{h += "<a href='javascript:show(" + rowdata.id + ")'>没完成</a> | ";}           
				 h += "<a href='javascript:deleteRow(" + rowdata.id +","+rowindex +")'>删除</a> "; 
                   return h;
			}
			}
		], 
		data: flowData, pageSize: 20,width: '100%', height: '99%', checkbox: false
	});
<?php
}
?>
});
function deleteRow(id,index){
	if (confirm('确定删除?'))
	{
		$.ajax({
			type: "GET",
			url: "/s/flow/ajax.php?act=del&run_id="+id,
			success: function(msg){
				if(msg==1){
					manager.deleteRow(index);	
				}else{
					alert('删除失败!');
				}
			}
		});
		
	}	
}
function show(id){
	open('/s/flow/ajax.php?act=show&id='+id);
}
</script>
</head>
<body>
<div id="flowlist"></div>
</body>
</html>