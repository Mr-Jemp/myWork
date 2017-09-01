<?php
session_start();
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>胜网科技</title>
<script type="text/javascript" src="/resource/js/jQuery/jquery-1.7.2.min.js"></script>
<script src="/resource/js/common/sidebar.js"></script>
<link href="/resource/css/common/sidebar.css" rel="stylesheet" type="text/css" />
<script language="JavaScript" src="/im/im_for_uchome_js.php"></script>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
html,body{height:100%;}
-->
.onleft_50{
	padding-left:50px;	
}
</style>
<script>
function open_phone(){
	 window.open('/front/personsetting/phone.php');
}
</script>
</head>
<body>
<!--左浮动菜单开始-->
<div id="sidebar">
 <div id="icolist">
  <a href="javascript:void(0);" onclick="setUrl(0)" target="frameid0">
  <dl>
    <dt><img src="/resource/images/common/sidebar/my.png" width="36" height="36" alt="我" /></dt>
    <dd>我</dd>
  </dl>
 </a>
  <a href="javascript:void(0);" onclick="setUrl(1);" target="frameid1">
  <dl>
    <dt><img src="/resource/images/common/sidebar/Workbench.png" width="36" height="36" alt="工作台" /></dt>
    <dd>工作台</dd>
  </dl>
  </a>
  <a href="javascript:void(0);" onclick="setUrl(2);" target="frameid2">
  <dl>
    <dt><img src="/resource/images/common/sidebar/Businessinformation.png" width="36" height="36" alt="商讯" /></dt>
    <dd>网站</dd>
  </dl>
  </a>
  <a href="javascript:void(0);" onclick="setUrl(3);" target="frameid3">
  <dl>
    <dt><img src="/resource/images/common/sidebar/Makecomplaints.png" width="36" height="36" alt="吐槽" /></dt>
    <dd>吐槽</dd>
  </dl>
  </a>
  <a href="javascript:void(0);" onclick="setUrl(4);" target="frameid4">
  <dl>
    <dt><img src="/resource/images/common/sidebar/Life.png" width="36" height="36" alt="生活" /></dt>
    <dd>生活</dd>
  </dl> 
  </a>
  <a href="javascript:void(0);" onclick="setUrl(5);" target="frameid5" rename="<?php echo $_SESSION['username'];?>" id="renameid5">
  <dl>
    <dt><img src="/resource/images/common/sidebar/meeting.png" width="36" height="36" alt="视频会议" /></dt>
    <dd>视频会议</dd>
  </dl> 
  </a>
  <a href="#" onclick="i_im_setShow('imbar');i_im_setOnShowPara('imbar');">
  <dl>
    <dt><img src="/resource/images/common/sidebar/qq.png" width="36" height="36" alt="即时聊天" /></dt>
    <dd>即时聊天</dd>
  </dl> 
  </a>
  <a href="/s/login/loginout.php?go=index">
  <dl>
    <dt><img src="/resource/images/common/sidebar/out.png" width="36" height="36" alt="退出系统" /></dt>
    <dd>退出系统</dd>
  </dl> 
  </a>  
</div>
</div>
<div class="lt">      
</div>
<!--左浮动菜单结束-->
<iframe id="frameid0" name="frameid0" class="onleft_50" style="width:100%;display:none" src="" height="100%" frameborder="0" scrolling="on"></iframe>
<iframe id="frameid1" name="frameid1" class="onleft_50" style="width:100%;" src="/front/main/mainpage.php" height="100%" frameborder="0" scrolling="on"></iframe>
<iframe id="frameid2" name="frameid2" class="onleft_50" style="width:100%;display:none" src="" height="100%" frameborder="0" scrolling="on"></iframe>
<iframe id="frameid3" name="frameid3" class="onleft_50" style="width:100%;display:none" src="" height="100%" frameborder="0" scrolling="on"></iframe>
<iframe id="frameid4" name="frameid4" class="onleft_50" style="width:100%;display:none" src="" height="100%" frameborder="0" scrolling="on"></iframe>
<iframe id="frameid5" name="frameid5" class="onleft_50" style="width:100%;display:none" src="" height="100%" frameborder="0" scrolling="on"></iframe>
</body>
</html>