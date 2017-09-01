<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>手机页</title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<meta name="viewport" content="width=device-width, height=device-height,initial-scale=1.0,maximum=scale=1.0,user-scalable=no;">
<script src="/resource/js/jQuery/jquery-1.9.1.js" type="text/javascript"></script>
<link href="css/index.css" rel="stylesheet" type="text/css" />
<script src="js/index.js" type="text/javascript"></script>
</head>
<body>
<div class="box">
	<div class="top">
		<div class="line4">
			<a href="organization.php">组识</a>
			<a href="message.php">消息</a>
			<a href="tel.php">电话</a>
			<a href="flow.php">流程</a>
		</div>
		<div class="linered">
			<a href="javascript:;" url="/admin/newtpl/index.php" parm="?main_url=/admin/new_organizesetting/bumenTree.htm" title="权限设置" class="gourl"><span>权限设置</span></a>
			<a href="javascript:;" url="/admin/newtpl/index.php" parm="?main_url=/admin/new_pagedesign/form_index.html" title="页面设置" class="gourl">页面设置</a>
			<a href="javascript:;" url="/admin/newtpl/index.php" parm="?main_url=/s/member/member_manage.php" title="人员管理" class="gourl">人员管理</a>
			<a href="javascript:;" url="/admin/newtpl/index.php" parm="?main_url=/admin/flowsetting/index.htm" title="流程管理" class="gourl">流程管理</a>
		</div>
		<div class="linereb">
			<a href="javascript:;" url="http://hg.goodhead.cn" title="胜网化工" class="gourl"><img src="/resource/css/login/v2/images/2.png" width="50" height="50"/></a>
			<a href="javascript:;" url="http://ny.goodhead.cn" title="胜网农业" class="gourl"><img src="/resource/css/login/v2/images/3.png" width="50" height="50"/></a>
			<a href="javascript:;" url="http://jiaoyu.goodhead.cn/web/app.php" title="美容美发" class="gourl"><img src="/resource/css/login/v2/images/mrmf.jpg"  width="50" height="50"/></a>
		</div>
		<div class="linereb">
			<a href="javascript:;" url="http://qy.goodhead.cn" title="企业管理" class="gourl"><img src="/resource/css/login/v2/images/26.png" width="50" height="50"/></a>
			<a href="javascript:;" url="http://goodhead.cn:5080/shipinhuiyi/" title="视频会议" class="gourl"><img src="/resource/css/login/v2/images/29.png" width="50" height="50"/></a>
			<a href="javascript:;" url="http://wuliu.goodhead.cn" title="胜网物流" class="gourl"><img src="/resource/css/login/v2/images/wl.png" width="50" height="50"/></a>
		</div>
	</div>

	<?php include_once"bottom.php";?>
</div>
<script>
$(function()
{
	$(".gourl").bind("click",function()
	{
		var url=encodeURIComponent($(this).attr("url")+$(this).attr("parm"));
		var text=$(this).attr("title");
		window.location.href='iframload.php?title='+text+'&url='+url;
	});
});
</script>

</body>

</html>
