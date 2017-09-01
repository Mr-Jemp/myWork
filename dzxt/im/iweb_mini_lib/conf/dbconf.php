<?php
if(!$IWEB_IM_IN) {
	die('Hacking attempt');
}
$user = "root"; //mysql数据库默认用户名
$pwd = "root"; //mysql数据库默认密码
$db = "hbsxt"; //默认数据库名
$host = "127.0.0.1";

$dbServs=array($host,$db,$user,$pwd);
//IM 数据表前缀
define('IM_DBTABLEPRE', 'chat_');
?>