<?php
session_start();
header("Content-type: text/html; charset=utf-8");
include_once '../inc/conn.php';
/**
 * Created by PhpStorm.
 * User: HBS
 * Date: 15-11-15
 * Time: 下午4:56
 */
$formid=$_POST['formid'];
$deltype=$_POST['deltype'];
if(!$formid){echo 0;exit;}
$formid=trim($formid,',');
if($deltype=='all'){
    if(mysql_query('delete from ht_form where id in('.$formid.')')){
        echo 1;
    }else{
        echo 0;
    }
}else{
    if(mysql_query('delete from ht_form where id='.$formid)){
        echo 1;
    }else{
        echo 0;
    }
}
?>
