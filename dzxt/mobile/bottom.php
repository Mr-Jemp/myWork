<link href="css/bottom.css" rel="stylesheet" type="text/css" />
<script src="js/bottom.js" type="text/javascript"></script>
<script>
$(function()
{
	$(".tourl").bind("click",function()
	{
		var url=encodeURIComponent($(this).attr("url"));
		var text=$(this).html();
		window.location.href='iframload.php?title='+text+'&url='+url;
	});
});
</script>
<div class="autobot" style="width:100%">
	<div class="linec">
		<a href="javascript:;" url="/front/Businessinformation.php" class="left tourl">商讯</a>
		<a href="javascript:;" url="/s/tucao/liuyan.php" class="tourl">吐槽</a>
		<a href="javascript:;" url="/front/main/mainpage.php" class="tourl">工作</a>
		<a href="javascript:;" url="/kodexplorer.php" class="tourl">我</a>
	</div>
	<div class="linebox bottom">
		<span class="col"><a href="javascript:;" url="/front/main/mainpage.php" class="buttonbot tourl">工作台</a></span>
		<span class="col"><a href="index.php" class="buttonbot">☆ 主页</a></span>
		<sapn class="col"><a href="javascript:history.go(1);" class="buttonbot">→ 向前</a></spna>
	</div>
</div>
