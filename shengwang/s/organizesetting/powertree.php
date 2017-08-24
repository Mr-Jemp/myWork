<?php
session_start();
//header('Content-type:text/json');
function getrole($node)
{
    global $crole, $tmpstr;
    $sql = 'select * from ht_role where pid='.$node.' order by id asc';
    $query = mysql_query($sql);
    $arr = array();
    if ($query && mysql_affected_rows()) {
        while ($rows = mysql_fetch_assoc($query)) {
            if (in_array($rows["id"], $_SESSION['urolesids'])) {
                $_SESSION['croleid'][] = $rows["id"];
            }
            $rows['children'] = getrole($rows['id']);
            $arr[] = $rows;
            if(in_array($rows["id"], $_SESSION['urolesids'])){
                $crole[$rows["id"]] = $rows;
            }
            if ($rows["pid"] == 0){
                if (count($_SESSION['croleid']) > 0) {
                    unset($_SESSION['croleid'][0]);
                    $tmpstr .= implode(',', $_SESSION['croleid']) . ',';
                    $_SESSION['croleid'] = array();
                }
            }
        }
    }
    return $arr;
}
function bb($arr)
{
    $isadd = false;
    foreach ($arr as $a) {
        if ($isadd) $out .= ",";
        $out .= '{';
        $out .= '"id":"' . $a["id"] . '",';
        $out .= '"text":"' . $a["rolename"] . '",';
        $out .= '"children":[';
        $out .= bb($a['children']);
        $out .= ']';
        $out .= '}';
        $isadd = true;
    }
    return $out;
}
$filename=md5('getrole'.$_SESSION['uid']);
if (file_exists('../tmp/'.$filename.'.php')){
    $roleconent=file_get_contents('../tmp/'.$filename.'.php');
} else {
    include_once '../inc/conn.php';
    $crole = array();
    $_SESSION['urolesids'] = $_SESSION['uroles'];
    $_SESSION['croleid'] = array();
    $tmpstr = '';
    $out = getrole(0);
    unset($_SESSION['urolesids']);
    mysql_close($conn);
    $tmprolesid = explode(',', trim($tmpstr, ','));
    foreach ($tmprolesid as $ar) {
        unset($crole[$ar]);
    }
    $roleconent=bb($crole);
    @file_put_contents('../tmp/'.$filename.'.php',$roleconent);
}
 echo '[' .$roleconent . ']';
?>