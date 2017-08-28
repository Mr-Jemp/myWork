<?php
session_start();
include '../inc/function.php';
is_power('role_modify','修改角色');
include_once '../inc/conn.php';
$sql='select * from ht_form';
$query=mysql_query($sql);
$html='<option value="0">根节点</option>';
$id=$_GET['id'];
while($row=mysql_fetch_array($query))
{
	if($row['id']==$id){
		$html.='<option value="'.$row['id'].'" selected="selected">'.$row['form_name'].'</option>';
	}else{
		$html.='<option value="'.$row['id'].'">'.$row['form_name'].'</option>';
	}
	
}
echo $html;
mysql_close($conn);
?>