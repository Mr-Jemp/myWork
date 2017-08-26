<?php
session_start();
include_once '../inc/conn.php';
$out["state"]="err";
$out["error"]="未知错误";

function getrole($out,$node)
{
	$sql="select * from ht_role where pid='$node'";
	$query=mysql_query($sql);
	$isadd=false;
	while($row=mysql_fetch_array($query))
	{
		if($isadd)$out.=",";
		$out.='{';
		$out.='"id":"'.$row["id"].'",';
		$out.='"name":"'.$row["rolename"].'",';
		$out.='"remark":"'.$row["description"].'",';
		$out.='"parentId":"'.$node.'",';
		$out.='"children":[';
		$out=getrole($out,$row["id"]);
		$out.=']';
		$out.='}';
		$isadd=true;
	}
	return $out;
}
$out["tree"]=getrole("",0);
$out["state"]="ok";

echo json_encode($out);
mysql_close($conn);
?>