<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<title>数据同步后台</title>    
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/jquery-1.7.2.min.js"></script>
<style>
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
</style>
</head>
<body>
<div class="admin_main_nr_dbox">
<p style="margin-left:5px">LOGO图片地址：<input id="logo" type="text" value=""/></p>
<p style="margin:5px">
<button type="submit" name="submit_to_save" value="save" id="submit_to_save">确定保存</button>
</p>
</div>
<div class="admin_frameset" >
  <div class="open_frame" title="全屏" id="open_frame" flag="min"></div>
  <div class="close_frame" title="还原窗口" id="close_frame" flag="min"></div>
</div>

<script>
$(function()
{
	$("#submit_to_save").bind("click",function()
	{
		//获取表单设计器里的内容
		var formeditor=$("#logo").val();
		
		$.ajax({
			type: 'POST',
			url: '/s/setting/logo.php',
			data: {'content':formeditor,"get":"no"},
			success: function(data) {
				data = eval('(' + data + ')');
				if(data.IsSuccess){
					$.ligerDialog.success(data.Message);
				}else{
				 $.ligerDialog.error('保存失败：'+data.Message);
				}
			},error: function(xhr, stat, e)
			{
				$.ligerDialog.error("保存失败：找不到地址！" );
			}
		});
	});
});
$(window).load(function()
{
	$.ajax({
		type: 'POST',
		url: '/s/setting/logo.php',
		data: {"get":"yes"},
		success: function(data) {
			data = eval('(' + data + ')');
			if(data.IsSuccess)
				$("#logo").val(data.res);
		},error: function(xhr, stat, e)
		{
		}
	});

});
</script>

</body>
</html>