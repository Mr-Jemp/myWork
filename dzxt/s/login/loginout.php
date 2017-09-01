<?php
//注销登录
session_start();
echo '<div style="margin:80px auto; width:300px; text-align:center; border:1px solid #CCC;padding:5px; background-color:#fefefe">正在退出系统...</div>';
/*include './config.inc.php';
include './include/db_mysql.class.php';
$db = new dbstuff;
$db->connect($dbhost, $dbuser, $dbpw, $dbname, $pconnect);
unset($dbhost, $dbuser, $dbpw, $dbname, $pconnect);
include './uc_client/client.php';
$ucsynlogout = uc_user_synlogout();
echo $ucsynlogout;
echo "<script language='javascript'>alert('注销登录成功！');location='/login.php';</script>";

*/
$_SESSION['username']="";
session_destroy();
setcookie('liger-home-tab',"", time() - 3600,'/front/main');
$gourl=isset($_GET['go'])?$_GET['go']:'login';
echo '<script>document.location.href="/'.$gourl.'.php";</script>';
?>
