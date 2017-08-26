<?php
/**
 * Created by PhpStorm.
 * User: HBS
 * Date: 2015/9/30
 * Time: 10:16
 */
session_start();
include_once '../../s/inc/conn.php';
mysql_select_db("hbsxt", $conn);
include '../inc/function.php';
$op = $_REQUEST['operatetype'];
$step=null;
switch($op) {

    case "deletestep":
        deletestep();
        break;
    case "modify":
        modify();
        break;
    case "add":
        add();
        break;
}
function deletestep(){
    $id = $_REQUEST['staffId'];
    mysql_query("DELETE FROM ht_oa_step WHERE id='".$id."'");
    echo "删除步骤成功！！";
    mysql_close($conn);
}
function add(){
    $flowid = $_REQUEST['oaid'];
    $formid=$_REQUEST['formid'];
    $stepIndex=$_REQUEST['stepindex'];
    $triggerStr=unescape($_REQUEST['triggerstr']);
    $formop=$_REQUEST["formop"];
    $json="";
    for(;;)
    {
        if(strlen($formid)<1)
        {
            $json="{\"result\":0,\"message\":'步骤必须有表单'}";
            break;
        }
        $sql = "INSERT INTO ht_oa_step (oa_id,form_id,step_index,trigger_string,form_op) VALUES ('$flowid','$formid','$stepIndex','$triggerStr','$formop')";
        if(mysql_query($sql)){
            $json= "{\"result\":1,\"message\":'ok'}";
        }
        else{
            $json= "{\"result\":0,\"message\":'no'}";
        }

        break;}
    mysql_close($conn);
    exit($json);
}
function modify(){
    $id=$_REQUEST["id"];
    $flowid = $_REQUEST['oaid'];
    $formid=$_REQUEST['formid'];
    $stepindex=$_REQUEST['stepindex'];
    $triggerStr=unescape($_REQUEST['triggerstr']);
    $formop=$_REQUEST["formop"];
    $trigger="";
    if($formop=="add")
    {
        $trigger="insert into ht_form_data_".$formid;
    }
    elseif($formop=="edit")
    {
        $trigger="update ht_form_data_".$formid;
    }
    else{
        $trigger="delete ht_form_data_".$formid;
    }
    $namestr="";
    $valuestr="";
    $updateOpStr="";
    $delOpStr="";
    for($i=0;$i<count($fields);$i++)
    {
        $sel=$fields[$i]->checked;
        if($sel) {
            $name = $fields[$i]->name;
            $value = $fields[$i]->value;
            $namestr = $namestr . $name . ",";
            if ($value == "求和") {

            } elseif ($value == "最大值") {

            } elseif ($value == "最小值") {

            } elseif ($value == "平均值") {

            } elseif ($value == "取值") {

            }
            $valuestr = $valuestr . "\'" . $value . "\',";
            $updateOpStr=$updateOpStr.$name."='".$value."',";
            $delOpStr=$delOpStr.$name."='".$value."' and ";
        }
    }
    $updateOpStr=substr($updateOpStr,0,strlen($updateOpStr)-1);
    $delOpStr=substr($delOpStr,0,strlen($delOpStr)-5);
    $namestr=substr($namestr,0,strlen($namestr)-1);
    $valuestr=substr($valuestr,0,strlen($valuestr)-1);
    if($formop=="add") {
        $trigger = $trigger . "(" . $namestr . ")values(" . $valuestr . ")";
    }
    elseif($formop=="delete")
    {

    }
    else{

    }
    $json="";
    for(;;)
    {
        if(strlen($formid)<1)
        {
            $json="{\"result\":0,\"message\":'步骤必须有表单'}";
            break;
        }
        $sql="UPDATE ht_oa_step SET form_id = '".$formid."',form_op='".$formop."',step_index='".$stepindex."',trigger_string='".$triggerStr."',sqlstr='".$trigger."' where id=".$id;
        if(mysql_query($sql)){
            $json="{\"result\":1,\"message\":'步骤修改成功'}";
        }else{
            $json="{\"result\":0,\"message\":'步骤修改失败'}";
        }
        break;
    }
    mysql_close($conn);
    exit($json);
}
?>