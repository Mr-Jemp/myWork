<?php
/**
 * Created by PhpStorm.
 * User: HBS
 * Date: 2015/9/28
 * Time: 9:18
 */
session_start();
include_once '../../s/inc/conn.php';
mysql_select_db("hbsxt", $conn);
include '../inc/function.php';
$op = $_REQUEST['operatetype'];
switch($op) {
    case "deleteflow":
        deleteflow();
        break;
    case "modify":
        modify();
        break;
    case "add":
        add();
        break;
}
function deleteflow(){
    is_power('oaflow_delete','添加OA流程');
    $id = $_REQUEST['staffId'];
    mysql_query("DELETE FROM ht_oa WHERE id='".$id."'");
    echo "删除流程成功！！";
    mysql_close($conn);
}
function add(){
    is_power('oaflow_add','添加OA流程');
    $flowname = $_REQUEST['flowname'];
    $creator =  $_SESSION['uid'];
    $formid=$_REQUEST["formid"];
    $constr=unescape($_REQUEST["constr"]);
    $json="";
    for(;;)
    {
        if(strlen($flowname)<1){
            $json="{\"result\":0,\"message\":'流程名称不能为空！！'}";
            break;
        }
        if(strlen($formid)<1)
        {
            $json="{\"result\":0,\"message\":'必须有发起表单！！'}";
            break;
        }
        $res = mysql_query("select * from ht_oa where oa_name='$flowname'");
        if (mysql_num_rows($res) > 0)
        {
            $json="{\"result\":0,\"message\":'已经存在的流程名称！！'}";
            break;
        }
        $sql = "INSERT INTO ht_oa (oa_name,creater_uid,form_id,condition_string) VALUES ('$flowname','$creator','$formid','$constr');";
        $result=mysql_query($sql);
        $flowid=mysql_insert_id();
        if($flowid>0) {
            $addStep = "INSERT INTO ht_oa_step (oa_id,form_id,step_index,trigger_string) VALUES ('$flowid','$formid','0','这是起始步骤')";
            if (mysql_query($addStep)) {
                $json = "{\"result\":1,\"message\":'流程添加成功！！'}";
            }
            else {
                $json = "{\"result\":0,\"message\":'流程添加失败！！'}";
            }
        }
        else {
            $json = "{\"result\":0,\"message\":'流程添加失败！！'}";
        }
        break;
    }
    mysql_close($conn);
    exit($json);
}
function modify(){
    is_power('oaflow_modify','添加OA流程');
    $id = $_REQUEST['id'];
    $flowname =$_REQUEST['flowname'];
    $creater =$_REQUEST['creator'];
    $formid=$_REQUEST["formid"];
    $constr=unescape($_REQUEST["constr"]);
    $json="";
    for(;;)
    {
        if(strlen($flowname)<1)
        {
            $json="{\"result\":0,\"message\":''}";
            break;
        }
        if(mysql_num_rows(mysql_query("select * from ht_oa where oa_name='$flowname' and `id`!='$id'"))>0)
        {
            $json="{\"result\":0,\"message\":''}";
            break;
        }
        $sql="UPDATE `ht_oa` SET oa_name = '".$flowname."',form_id='".$formid."',condition_string='".$constr."' where id=".$id;
        if(mysql_query($sql)){
            $updataStep="UPDATE ht_oa_step SET form_id = '".$formid."'  where oa_id=".$id." and step_index=0";
            if(mysql_query($updataStep)) {
                $json = "{\"result\":1,\"message\":'流程修改成功！！'}";
            }
            else{
                $json="{\"result\":0,\"message\":'流程修改失败！！'}";
            }
        }
        else{
            $json="{\"result\":0,\"message\":'流程修改失败！！'}";
        }
        break;
    }
    mysql_close($conn);
    exit($json);
}
?>