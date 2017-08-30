<?php
require('../../s/function/is_admin.php');
$url=$_REQUEST['main_url'];
if(strlen($url)<1)$url='main.php';
$left_url='left.html';
if($url=='../new_pagedesign/form_index.html')
$left_url='../new_pagedesign/pdesign_left.html';
?>
<html>
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=7">
<title>网站后台管理中心</title>
</head>
<frameset rows="70,*" frameborder="no" border="0" framespacing="0">
       <frame src="top.html" name="topFrame" id="topFrame" scrolling="no" frameborder="NO" border="0" framespacing="0">
        <frameset cols="180,*"  name="bodyFrame" id="bodyFrame" frameborder="no" border="0" framespacing="0">
            <frame src="<?php echo $left_url?>" name="leftFrame" frameborder="no" scrolling="no" noresize id="leftFrame">
            <frame src="<?php echo $url?>" name="mainFrame" frameborder="no" scrolling="auto" noresize id="mainFrame">
        </frameset>
</frameset>
    <noframes>
        <body>你的浏览器不支持框架</body>
    </noframes>

</html>