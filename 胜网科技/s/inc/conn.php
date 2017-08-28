<?php
//数据库链接文件
require_once($_SERVER['DOCUMENT_ROOT']."/s/inc/db.php");
global $DB;
$DB=$conn=@mysql_connect($host,$user,$password) or die('数据库连接失败！');
@mysql_select_db($database) or die('没有找到数据库！');
mysql_query("set names 'utf8'");
//过滤不安全的SQL
function SafeSql($sql)
{
	return $sql;
}
//加载一个数组文件
function load($file){return include($file);}
?>