<?php
//取得该用户担任的角色
function getUserRole($uid)
{	
	global $DB;
	$sql="select role_id from ht_role_user where `uid`=$uid";
	$query=mysql_query($sql,$DB);
	if($query==NULL)return NULL;
	$role_ids=NULL;$i=-1;
	while($row=mysql_fetch_array($query))$role_ids[++$i]=$row["role_id"];	
	return $role_ids;
}
//组合记录的权限信息
function getReadPowerCombine($roles,$formid,$type)
{
	$result["Message"]="未知原因";
	$result["IsSuccess"]=false;
	for(;;){
	if($roles==NULL){$result["Message"]="对不起，您还没有担任任何角色";break;}
	$role_str= implode(',',$roles);//0 or 0,0
	//条件是，任何一个角色，中有该页有读取权限，都可通过
	$sql="select function_name from ht_power where `role_id` in($role_str) and `form_id`='$formid' and `function_type`='$type'";	
	$query=mysql_query($sql);
	if($query==NULL){$result["Message"]="对不起，您没有该页面的权限";break;}
	$row=mysql_fetch_array($query);
	if($row){}else {$result["Message"]="对不起，您没有该页面的权限";break;}
	//取得对该页面的sql条件组合
	$result["SQL"]=$row["function_name"];
	$result["AND_SQL"]=strlen($result["SQL"])>0?" and ".$result["SQL"]:"";
	$result["OR_SQL"]=strlen($result["SQL"])>0?" or ".$result["SQL"]:"";
	$result["IsSuccess"]=true;
	$result["Message"]="完成";
	break;}
	return $result;
}
?>