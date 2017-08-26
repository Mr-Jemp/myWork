<?php
//include_once"check_session.php";
include_once '../inc/conn.php';

$out["IsSuccess"]=false;
$out["Message"]="未知错误";

$arr=explode(",",$_REQUEST['field']);
$content=$_REQUEST['content'];
$formid=intval($_REQUEST['formid']);

mysql_query("UPDATE  `ht_form` SET  `content` =  '$content' WHERE `id`=  '$formid'");

$rs=mysql_fetch_array(mysql_query("SHOW TABLES LIKE 'ht_form_data_$formid'"));
if($rs==false){
	$sql="CREATE TABLE IF NOT EXISTS `ht_form_data_$formid` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`uid` int(10) unsigned NOT NULL DEFAULT '0',
	`foreign_id` int(10) unsigned NOT NULL DEFAULT '0',
	`is_del` tinyint(1) unsigned NOT NULL DEFAULT '0',
	`updatetime` int(10) unsigned NOT NULL DEFAULT '0',
	`dateline` int(10) unsigned NOT NULL DEFAULT '0',";
	foreach($arr as $key=>$value){
		$value='rf'.$value;
		$sql.="`$value` varchar(255) NOT NULL DEFAULT '',";
	}
	$sql.="PRIMARY KEY (`id`),
	KEY `uid` (`uid`),
	KEY `foreign_id` (`foreign_id`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;";
	
	mysql_query($sql);
	$out["IsSuccess"]=true;
	$out["Message"]="保存成功！";
}else{
	//增加字段
	$out["Message"]="";
	foreach($arr as $key=>$value){
		$value='rf'.$value;
		$sql="alter table `ht_form_data_$formid` add `$value` varchar(255) NOT NULL DEFAULT ''";
		mysql_query($sql);
	}
	$out["IsSuccess"]=true;
	$out["Message"]="保存成功！".mysql_error();
}
exit(json_encode($out));
?>
