<?php
session_start();
header("Access-Control-Allow-Origin:*");
header("Content-type: text/html; charset=utf-8");
include_once '../inc/conn.php';
$act=$_GET['act'];
if($act=='del'){
	$run_id=$_GET['run_id'];
	if(!mysql_query("delete from ht_run_process where run_id=".$run_id)){
		echo 0;
	}
	if(!mysql_query("delete from ht_run where id=".$run_id)){
		echo 0;
	}
	echo 1;	
}elseif($act=='show'){
	$show=mysql_query("select a.id,a.run_flow_process,a.from_data_id,b.form_id from `ht_run` as a left join `ht_flow` as b on a.flow_id=b.id where a.id=".$_GET['id']);
	$res=mysql_fetch_assoc($show);
	$data_id=$res['from_data_id'];
	$form_id=$res['form_id'];
	if(empty($data_id)){
		$show=mysql_query('select id from `ht_run_process` where run_id='.$res['id'].' and run_flow_process='.$res['run_flow_process'].'  order by id asc limit 1');
		$res=mysql_fetch_assoc($show);
		print_r($res);
		header("Location:/s/tp/wwwroot/index.php?s=/Flow/run/edit/process_id/".$res['id']);
	}else{
		header("Location:/s/tp/wwwroot/index.php/Home/Demodata/view3/form_id/".$form_id."/id/".$data_id); 
	}
		
}elseif($act=='appflowtree'){
	$res=mysql_query('select * from ht_flow order by id desc');	
	$children='';
	$isadd=false;	
	while($row = mysql_fetch_array($res)){
		if($isadd)$children.=",";
		$children.='{"id":'.$row['id'].',"text":"'.$row['flow_name'].'"}';	
		$isadd=true;	
	}
	header('Content-type:text/json'); 	
	$json='[{"text":"应用流程","children":['.$children.']}]';		
	echo $json;
}
?>