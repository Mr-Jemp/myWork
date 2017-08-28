<?php require_once("../../s/function/check_session.php");?>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf8">
    <title>吐槽</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script src="/resource/js/jQuery/jquery-1.9.1.js" type="text/javascript"></script>

<style type="text/css">
<!--
a:link {
	text-decoration: none;
}
a:visited {
	text-decoration: none;
}
a:hover {
	text-decoration: none;
}
a:active {
	text-decoration: none;
}
	body{background:#E5EFFE;}
    .table-liuyan
	{
		margin:0px;
		background:#ffffff;
		width:100%;
	}
    .tr-gray{color: #555555;background:#ffffff;}
	.table-title
	{
		background:url('/resource/part/ligerlib/ligerUI/skins/Aqua/images/layout/layout-header.gif');
		border-top:1px solid #BED5F3;
		border-left:1px solid #BED5F3;
		border-right:1px solid #BED5F3;
		height:24px;
		font-weight:bold;
	}
	.table-body
	{
		background:#ffffff;
		border:1px solid #BED5F3;
	}
	.table-radius
	{
		border-radius:5px;
		border:1px solid #D2CAFA;
		background:#F1EFFC;
	}
	textarea
	{
		width:99%;
		border:0px;
		outline:none;
		resize: none;
		font-size:14px;
		height:54px;
	}
	.select-radius
	{
		border:1px solid #D2CAFA;
		background:#EBEBEB;
	}

	.table-body .right{height:auto;width:100%;overflow:hidden;margin:5px;}
	.table-body .right .box{float:right;height:auto;width:100%;overflow:hidden;padding:5px;}
	.table-body .right .box .r1{float:right;width:10px;height:10px;overflow:hidden;border-radius:5px;margin-right:4px;margin-top:40px;}
	.table-body .right .box .r2{float:right;height:auto;overflow:hidden;padding:2px;width:90%;margin-right:3px;line-height:25px;}

-->
</style></head>
<body>
 
<script style="text/javascript">
    function validate_form(){
        var obj = document.getElementById('liuyanform');
        var objvalue = obj.content.value;
        if (objvalue==""||objvalue==null) {
            alert("请输入内容!");
            obj.focus();
            return false;
        }
       	
    }
	
function vcodes(){	
	var num=Math.random();
	var re=document.getElementById("vcode");
	re.src="authimg.php?a="+num;
}
 
</script>

<div id="center">
<table  width="100%" >
<tr><td class="table-title" height="24">※信息列表</td></tr>
<tr><td class="table-body">
    <?php
	session_start();
    include_once '../inc/conn.php';
    $pagesize=9;
    if (isset($_GET["page"])){
        $page = $_GET['page'];
        if ($page<0) {
            $page=0;
        }
    }
    else {
        $page = 0;
    }

    $result=mysql_query("SELECT * FROM ht_liuyan");
    $total = mysql_num_rows($result);
    if($pagesize*$page>$total){
        $page=(int)($total/$pagesize);
        $next=$page;
    }
    else {
        $next=$page+1;
    }

    if ($page<1)
    {
        $pre=0;
    }
    else {
        $pre=$page-1;
    }

    $n=$page*$pagesize;
    $query=mysql_query("SELECT * FROM ht_liuyan,ht_user where ht_liuyan.uid=ht_user.uid order by id desc limit $n,10");
	$result=array();$l=0;
    while($row=mysql_fetch_array($query)){$result[$l]=$row;$l++;}
	for($i=0;$i<$l;$i++){
	$row=$result[$i];
	if($_SESSION['uid']==$row['uid'])
        echo <<<eot
		<div class="right">
			<div class="box">
				<div class="table-radius r1"></div>
				<div class="table-radius r2">
					$row[content]
					<br>$row[chinese_name] $row[date] $row[ip]
				</div>
			</div>
	</div>
eot;

	else
        echo <<<eot
		<div style="height:auto;width:100%;overflow:hidden;margin:5px;">
			<div style="float:left;height:auto;width:100%;overflow:hidden;padding:5px;">
				<div class="table-radius" style="float:left;width:10px;height:10px;overflow:hidden;border-radius:5px;margin-left:-4px;margin-top:-5px;"></div>
				<div class="table-radius" style="float:left;height:auto;overflow:hidden;padding:2px;width:90%;margin-left:3px;line-height:25px;">
					$row[content]
					<br>$row[chinese_name] $row[date] $row[ip]
				</div>
			</div>
	</div>
eot;
    }
    ?>
</td></tr>
</table>
    <p style="padding:0; margin:3px">总记录条数:<?=$total?> 当前第<?=$page+1?>页 旧记录 [<a href="liuyan.php?page=<?=$next?>">下翻一页</a>|<a href="liuyan.php?page=<?=$pre?>">上翻一页</a>]</p>

<table style="width:100%">
	<form action="liuyan_baocun.php?page=<?=$currentpage?>" method="post" onSubmit="return validate_form()" id="liuyanform">
	<tr>
		<td colspan="2" align="center" class="table-body"><textarea rows="3" cols="100" id="content" name="content" maxlength="500" required="required" placeholder="输入你想说的话吧"></textarea></td>
	</tr>
	<tr>
	  <td align="left"><select id="details" class="select-radius">
	  <option value="">详用语</option>
	    <option value="大家好">大家好</option>
	    <option value="你好">你好</option>
	    <option value="大哥哥">大哥哥</option>
		<option value="你应该去当歌星！">你应该去当歌星！</option>
		<option value="此女只应天上有，人间哪的几回吻？">此女只应天上有，人间哪的几回吻？</option>
		<option value="我叫你神仙姐姐吧！">我叫你神仙姐姐吧！</option>
		<option value="晚上好！">晚上好!</option>
		<option value="小弟来也！">小弟来也!</option>
		<option value="幸会幸会！">幸会幸会!</option>
	    <option value="呵呵">呵呵</option>
	    <option value="哈哈">哈哈</option>
		<option value="久违了，老兄！">久违了，老兄!</option>
		<option value="拜拜。">拜拜。</option>
		<option value="对你说一声再见！我走了。">对你说一声再见！我走了。</option>
		<option value="改日相见。">改日相见。</option>
		<option value="告辞。">告辞。</option>
		<option value="各位晚安，都做个好梦。">各位晚安，都做个好梦。</option>
		<option value="后会有期。">后会有期。</option>
		<option value="又看到你好开心!">又看到你好开心!</option>
		<option value="一路顺风，我不远送了。">asdf</option>
	  </select></td>
	  <td align="right"><input type="button" value="清空输入" id="cslar"> <input type="submit" value="发送啦"></td>
	</tr>
	</form>
</table>

    <?php
    mysql_close($con);
    ?>
</div>
<script>
$(function()
{
	$("#details").bind("change",function()
	{
		$("#content").val($("#content").val()+$(this).val());
		$(this).val("");
	});
	$("#cslar").bind("click",function()
	{
		$("#content").val("");
	});
});
</script>
</body>
</html>