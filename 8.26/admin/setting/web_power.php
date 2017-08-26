<?php
session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<style>
div,dl,dt,dd{
	margin:0px;
	padding:0px;
}
#pw_conent{
	background: #ffffff;
    border: 1px solid #1a5db0;
	width:98%;
	height:auto;
	overflow:hidden;
}
.head{
	color:#FFF;
	background-color:#999;
	margin:1px;
	background-image: url(../../resource/images/common/qq_22.gif);
	background-repeat: repeat-x;
	line-height: 25px;
	height: 25px;
	text-align: left;
	font-size: 14px;
	text-indent: 5px;
}
.pw_list{
	height: auto;
	margin: 5px;
	border:1px #CCC solid;
	padding:3px;
	overflow: hidden;
}
.pw_list dl {
	overflow: hidden;
	height: auto;
}
.pw_list dl dd {
	float: left;
	padding-top: 5px;
	padding-right: 10px;
	padding-bottom: 3px;
	padding-left: 3px;
	font-size: 12px;
	line-height: 26px;
	height: 26px;
	width: 180px;
	text-align: left;
}
.pw_list dl dt {
	line-height: 30px;
	height: 30px;
	width: 100%;
	background-color: #EBEBEB;
	font-size: 14px;
	text-align: left;
	text-indent: 5px;
	color: #000;
}
#pw_conent form table tr td .call {
	color: #666;
	text-decoration: none;
	font-size: 14px;
}
#pw_conent form table tr td .call:hover {
	text-decoration: underline;
}
</style>
</head>
<body style="background-color:#E0F0FE;">
<div class="admin_main_nr_dbox">
<?php
$act=$_GET['act'];
$gid=intval($_REQUEST['gid']);
if(empty($gid)){echo '<script>alert("指派权限出错!");window.location="'.$_SERVER['HTTP_REFERER'].'";</script>;';}
include_once '../../s/inc/conn.php';
if($act=='del'){		
	$sql=' DELETE FROM `ht_can_do` WHERE id='.$gid;	
	mysql_query('UPDATE `ht_user` set level=1 WHERE level='.$gid);
	if(mysql_query($sql)){
		echo '<script>alert("删除成功!");window.location="'.$_SERVER['HTTP_REFERER'].'";</script>;';
	}else{
		echo '<script>alert("删除失败!");window.location="'.$_SERVER['HTTP_REFERER'].'";</script>;';
	}
}elseif($act=='assign'){
	$sql='SELECT * FROM `ht_can_do` WHERE id='.$gid;
	$res=mysql_query($sql);
	$row=mysql_fetch_array($res);
}elseif($act=='update'){		
	$data=array('role_add'=>0,'role_modify'=>0,'role_delete'=>0,'role_member_add'=>0,'role_member_delete'=>0,'power_modify'=>0,'power_detail_modify'=>0,'page_add'=>0,'page_modify'=>0,'page_delete'=>0,'member_add'=>0,'member_modify'=>0,'member_delete'=>0,'flow_add'=>0,'flow_modify'=>0,'flow_delete'=>0,'setting_anou'=>0, 'setting_can_do'=>0,'setting_parameter'=>0);
	$pw=array();
	foreach($_POST['power'] as $v){
		$pw[$v]=1;
	}
	$c=array_merge($data,$pw);
	$set='';
	foreach($c as $k=>$v){
		$set.=$k.'='.$v.',';
	}
	$sql='UPDATE `ht_can_do` set '.rtrim($set,',').' WHERE id='.$gid;
	if(mysql_query($sql)){
		echo '<script>alert("配置权限成功!");window.location="'.$_SERVER['HTTP_REFERER'].'";</script>;';
	}else{
		echo '<script>alert("配置权限失败!");window.location="'.$_SERVER['HTTP_REFERER'].'";</script>;';
	}
}
?>
<div align="center" id="pw_conent"> 
<div class="head">修改【<font color="#0000FF"><?php echo $row['name'];?></font>】用户组</div>
        <form action="?act=update" name="web_power" method="post">
        <input type="hidden" name="gid" value="<?php echo $gid;?>" />
        <div class="pw_list">
            <dl>
                <dt>角色设置</dt>
                <dd><input name="power[]" type="checkbox" value="role_add" <?php if($row['role_add'])echo 'checked="checked"';?> />角色添加</dd>
                <dd><input name="power[]" type="checkbox" value="role_modify" <?php if($row['role_modify'])echo 'checked="checked"';?> />角色修改</dd>
                <dd><input name="power[]" type="checkbox" value="role_delete" <?php if($row['role_delete'])echo 'checked="checked"';?> />角色删除</dd>
                <dd><input name="power[]" type="checkbox" value="role_member_add" <?php if($row['role_member_add'])echo 'checked="checked"';?> />成员添加</dd>
                <dd><input name="power[]" type="checkbox" value="role_member_delete" <?php if($row['role_member_delete'])echo 'checked="checked"';?> />成员删除</dd>
            </dl>
        </div>
        <div class="pw_list">
            <dl>
                <dt>权限设置</dt>                
                <dd><input name="power[]" type="checkbox" value="power_modify" <?php if($row['power_modify'])echo 'checked="checked"';?> />权限修改</dd>
                <dd><input name="power[]" type="checkbox" value="power_detail_modify" <?php if($row['power_detail_modify'])echo 'checked="checked"';?> />权限详细设置</dd>
            </dl>
        </div>
<div class="pw_list">
            <dl>
                <dt>页面设置</dt>
                <dd><input name="power[]" type="checkbox" value="page_add" <?php if($row['page_add'])echo 'checked="checked"';?> />页面添加</dd>
                <dd><input name="power[]" type="checkbox" value="page_modify" <?php if($row['page_modify'])echo 'checked="checked"';?> />页面修改</dd>
                <dd><input name="power[]" type="checkbox" value="page_delete" <?php if($row['page_delete'])echo 'checked="checked"';?> />页面删除</dd>
            </dl>
        </div>
        <div class="pw_list">
            <dl>
        <dt>人员管理</dt>
                <dd><input name="power[]" type="checkbox" value="member_add" <?php if($row['member_add'])echo 'checked="checked"';?> />人员添加</dd>
                <dd><input name="power[]" type="checkbox" value="member_modify" <?php if($row['member_modify'])echo 'checked="checked"';?> />人员修改</dd>
                <dd><input name="power[]" type="checkbox" value="member_delete" <?php if($row['member_delete'])echo 'checked="checked"';?> />人员删除</dd>
            </dl>
        </div>
      <div class="pw_list">
<dl>
                <dt>流程管理</dt>
                <dd><input name="power[]" type="checkbox" value="flow_add" <?php if($row['flow_add'])echo 'checked="checked"';?> />流程添加</dd>
                <dd><input name="power[]" type="checkbox" value="flow_modify" <?php if($row['flow_modify'])echo 'checked="checked"';?> />流程修改</dd>
                <dd><input name="power[]" type="checkbox" value="flow_delete" <?php if($row['flow_delete'])echo 'checked="checked"';?> />流程删除</dd>
            </dl>
        </div>
			<div class="pw_list">
				<dl>
					<dt>OA流程管理</dt>
					<dd><input name="power[]" type="checkbox" value="oaflow_add" <?php if($row['oaflow_add'])echo 'checked="checked"';?> />流程添加</dd>
					<dd><input name="power[]" type="checkbox" value="oaflow_modify" <?php if($row['oaflow_modify'])echo 'checked="checked"';?> />流程修改</dd>
					<dd><input name="power[]" type="checkbox" value="oaflow_delete" <?php if($row['oaflow_delete'])echo 'checked="checked"';?> />流程删除</dd>
				</dl>
			</div>
<div class="pw_list">
            <dl>
                <dt>网站配置</dt>
                <dd><input name="power[]" type="checkbox" value="setting_anou" <?php if($row['setting_anou'])echo 'checked="checked"';?> />公告设置</dd>
                <dd><input name="power[]" type="checkbox" value="setting_parameter" <?php if($row['setting_parameter'])echo 'checked="checked"';?> />网站设置</dd>
                <dd><input name="power[]" type="checkbox" value="setting_can_do" <?php if($row['setting_can_do'])echo 'checked="checked"';?> />帐号组</dd>
            </dl>
        </div>
        <table width="100%" cellspacing="1">
  <tr>
    <td width="50%" height="50px" align="right"><a onclick="CheckAll('all')" href="javascript:" class="call">全选</a>/<a onclick="CheckAll()" href="javascript:" class="call">反选</a></td>
    <td align="left"><input name="pw_submit" type="submit" value="确定" /></td>
  </tr>
</table>
    </form>
    </div>
</div>
<div class="admin_frameset" >
  <div class="open_frame" title="全屏" id="open_frame"></div>
  <div class="close_frame" title="还原窗口" id="close_frame"></div>
</div>
<script language="JavaScript">
function CheckAll(va){
	var form=document.web_power;
	for (var i=0;i<form.elements.length;i++){
		var e = form.elements[i];
		if(e.className=='myadgrdb')continue;
		if(va=='all'){
			e.checked = true;
		}else{
			e.checked == true ? e.checked = false : e.checked = true;
		}
	}
}
</script>
</body>
</html>