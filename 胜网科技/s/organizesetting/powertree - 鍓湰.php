<?php
session_start();
header('Content-type:text/json');
include_once '../inc/conn.php';
function getrole($out,$node,$idlist)
{
	$sql='select * from ht_role where pid='.$node;
	$query=mysql_query($sql);
	while($row=mysql_fetch_array($query))
	{
        if(in_array($row["id"],$_SESSION['uroles'])){
            $out.='{';
            $out.='"id":"'.$row["id"].'",';
            $out.='"text":"'.$row["rolename"].'",';
            $out.='"children":[';
            $out=getrole($out,$row["id"],$idlist);
            $out.=']';
            $out.='},';
            $isadd=true;
        }else{
            $out=getrole($out,$row["id"]);
        }
	}
	return $out;
}
$filename=md5('getrole'.$_SESSION['uid']);
if (file_exists('../tmp/'.$filename.'.php')){
    $roleconent=file_get_contents('../tmp/'.$filename.'.php');
} else {
    $out=getrole("",0);
    $roleconent=trim($out,',');
    @file_put_contents('../tmp/'.$filename.'.php',$roleconent);
}
//echo json_encode($out);
echo '['.$roleconent.']';
//echo '[{"text":"开发部","children":[{"text":"12","children":[{"text":"fhj","children":[]},{"text":"kdkkd","children":[]}]}]},{"text":"生产员","children":[]},{"text":"asdfsdf","children":[]}]';
mysql_close($conn);
?>