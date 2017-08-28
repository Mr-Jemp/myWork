<?php
$loadfile='';
$row=$value['orgrow'];
$col=$value['orgcol'];

if(strlen($GLOBALS['expressioncss'])<1)
{
	$loadfile='<link href="/resource/css/expression/expressioncss.css" rel="stylesheet" type="text/css" />'
	.'<script src="/resource/js/expression/index.js"><'.'/'.'script>'
	.'<script src="/resource/js/expression/az.js"><'.'/'.'script>';
	$GLOBALS['expressioncss']='yes';
}
$GLOBALS['expressioncss']++;

$temp_html=<<<ROT
$loadfile

<div class="expressioncss expid$key">
	<div class="top">
		&nbsp;所选格子<span id="m1" class="w100"/></span>
		 选择函数 <select ID="m2" class="w100">
		<option value="">选择函数</option>
		<option value="IF">IF 条件表达式</option>
		<option value="SUM">SUM 统计行或列总和</option>
		<option value="COUNT">COUNT 统计行或列的总数</option>
		<option value="MAX">MAX 求指定行或列的最大值</option>
		<option value="MIN">MIN 求指定行或列的最小值</option>
		<option value="AVERAGE">AVERAGE 求指定行或列的平均数</option>
		<option value="COLUMN">COLUMN 返回引用的列号</option>
		<option value="MODE">MODE 找出机率最高的值</option>
		<option value="NODE">NODE 找出机率最低的值</option>
		</select>
		 <span id="m3left">输入表达式 </span>
		<input id="m3" />
	</div>
	<div class="tablebox">
	<table  height="100%" border="0" cellpadding="0" cellspacing="1">
	</table>
	</div>
</div>
<script>
$(function()
{
    $(window).load(function() {
		var exp$key=new itemExp("expid$key");exp$key.main.init('$row','$col',exp$key);
	});
});
</script>
ROT;
?>
