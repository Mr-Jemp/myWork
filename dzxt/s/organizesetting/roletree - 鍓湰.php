<?php
session_start();
header('Content-type:text/json');
include_once '../inc/conn.php';
$crole=array();
$_SESSION['urolesids']=$_SESSION['uroles'];
$_SESSION['czuroles']=array();
function getrole($node)
{
    global $crole;
	$sql='select * from ht_role where pid='.$node.' order by id asc';
	$query=mysql_query($sql);
    $arr=array();
	if($query && mysql_affected_rows()){
        while($rows=mysql_fetch_assoc($query)){
            $rows['children'] = getrole($rows['id']);
            $arr[] = $rows;
            if(in_array($rows["id"],$_SESSION['urolesids'])){
                unset($_SESSION['urolesids'][array_search($rows["id"],$_SESSION['urolesids'])]);
                $crole[$rows["id"]]=$rows;
            }
        }
        return $arr;
    }
	return $arr;
}
$out=getrole(0);
unset($_SESSION['urolesids']);
mysql_close($conn);
function bb($arr){
    $isadd=false;
    foreach($arr as $a){
        if($isadd)$out.=",";
        $out.='{';
        $out.='"id":"'.$a["id"].'",';
        $out.='"name":"'.$a["rolename"].'",';
        $out.='"remark":"'.$a["description"].'",';
        $out.='"parentId":"'.$a["pid"].'",';
        $out.='"children":[';
        $out.=bb($a['children']);
        $out.=']';
        $out.='}';
        $isadd=true;
    }
    return $out;
}
if($_POST['rtype']=='ajaxNewData'){
    echo '['.bb($crole).']';
}else{
    echo '{"Rows":['.bb($crole).']}';
}
?>