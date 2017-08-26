<?php
session_start();
include '../../s/inc/function.php';
is_power('setting_can_do','帐号组',false,'/admin/setting/init.html');
include_once '../../s/inc/conn.php';
if(!empty($_POST['name'])&&!empty($_POST['eid'])){	
	$out["error"]="";
	$name=$_POST['name'];
	$gdes=$_POST['gdes'];
	$sql="select * from ht_can_do where lower(`name`)=lower('$name')";
	$query=mysql_query($sql);
	$row=mysql_fetch_array($query);
	if($row)
	{
		$out["error"]="账号组已存在！";
	}else{		
		$sql='update `ht_can_do` set name="'.$name.'",gdes="'.$gdes.'" where id='.intval($_POST['eid']);		
		$query=mysql_query($sql);	
		if($query)
		{			
            $html='<script type="text/javascript">
					alert("修改成功");
					window.location="web_guser.php";		
					</script>';
			echo $html;		
		}else{
        	$html='<script type="text/javascript">
					alert("修改失败");
					window.location="web_guser.php";		
					</script>';
			echo $html;			
		}
	}
}
if(empty($_GET['gid'])){echo '操作异常';exit;}
$gid=intval($_GET['gid']);
$sql="select * from ht_can_do where id=".$gid;
$query=mysql_query($sql);
$row=mysql_fetch_array($query);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script src="/resource/js/jQuery/jquery-1.9.1.js" type="text/javascript"></script>
<script type="text/javascript" src="/resource/part/newtpl/js/public.js"></script>
<link href="/resource/part/newtpl/css/public.css" rel="stylesheet" type="text/css" />
<title>帐号组</title>
<style>
table {
    background: #ffffff none repeat scroll 0 0;
    border: 0 solid #f3f3f3;
}
.tablewidth {
    background: #efefef none repeat scroll 0 0;
    border: 1px solid #1a5db0;
    margin-bottom: 8px;
    width: 99%;
}
.tablewidth .head, .tablewidth .head td, .tablewidth .head3 td {
    background: #6799b8 url("/resource/images/common/qq_22.gif") repeat scroll 0 0;
    border: 0 solid #449ae8;
    color: #fff;
}
.tablewidth tr {
    background: #fff none repeat scroll 0 0;
}
.tablewidth .head td, .tablewidth .head td a {
    color: #fff;
}
.tablewidth .head td {
    padding-left: 5px;
    padding-top: 5px;
}
.tablewidth .head, .tablewidth .head td, .tablewidth .head3 td {
    background: #6799b8 url("/resource/images/common/qq_22.gif") repeat scroll 0 0;
    border: 0 solid #449ae8;
    color: #fff;
}
</style>
</head>
<body style="background-color:#E0F0FE;">
<div class="admin_main_nr_dbox">
<div align="center">  
  <form action="?" method="post">
  <input type="hidden" name="eid" value="<?php echo $row['id'];?>" />
  <table width="100%" cellspacing="1" cellpadding="3" class="tablewidth">  
    <tbody><tr class="head">       
    <td colspan="2"> <font color="#FFFFFF">修改【<?php echo $row['name'];?>】组:</font></td>
    </tr>
    <?php
		if (strlen($out["error"])>0) {
		?>
        <tr>       
    <td colspan="2"><font color=red><?php echo $out["error"];?></font></td>
    </tr>		
		<?php
		}
		?>   
  <tr>
    <td width="16%" align="right">组 名:</td>
    <td align="left"><input name="name" type="text" value="<?php echo $row['name'];?>" /></td>
  </tr>
  <tr>
    <td width="16%" align="right">用户组描述:</td>
    <td align="left"><input name="gdes" type="text" value="<?php echo $row['gdes'];?>" /></td>
  </tr>
    <tr>
    <td></td>
    <td><input type="submit" value="确定" /></td>
  </tr>
</tbody></table>
</form>
</div>
</div>
<div class="admin_frameset" >
  <div class="open_frame" title="全屏" id="open_frame" flag="min"></div>
  <div class="close_frame" title="还原窗口" id="close_frame" flag="min"></div>
</div>
</body>
</html>