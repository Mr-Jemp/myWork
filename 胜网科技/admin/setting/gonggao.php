<?php
session_start();
include '../../s/inc/function.php';
is_power('setting_anou','网站公告',false,'/admin/setting/init.html');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<title>数据同步后台</title>    
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/ueditor/ueditor.all.min.js"> </script>
<!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
<!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/ueditor/lang/zh-cn/zh-cn.js"></script>
<script type="text/javascript" src="/resource/part/newtpl/js/public.js"></script>
<link href="/resource/part/newtpl/css/rheight.css" rel="stylesheet" type="text/css" />
<link href="/resource/part/newtpl/css/public.css" rel="stylesheet" type="text/css" />
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
<script id="myFormDesign" type="text/plain" style="width:100%;"></script>
<p style="margin:5px">
<button type="submit" name="submit_to_save" value="save" id="submit_to_save">确定保存</button>
</p>
</div>
<div class="admin_frameset" >
  <div class="open_frame" title="全屏" id="open_frame" flag="min"></div>
  <div class="close_frame" title="还原窗口" id="close_frame" flag="min"></div>
</div>

<script>
var leipiEditor=null;
$(function()
{
	$("#submit_to_save").bind("click",function()
	{
		//获取表单设计器里的内容
		var formeditor=leipiEditor.getContent();

		$.ajax({
			type: 'POST',
			url: '/s/setting/gong.php',
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
		url: '/s/setting/gong.php',
		data: {"get":"yes"},
		success: function(data) {
			data = eval('(' + data + ')');
			if(data.IsSuccess)
				$("#myFormDesign").val(data.res);
			startEditor();
		},error: function(xhr, stat, e)
		{
			startEditor();
		}
	});

});
function startEditor()
{
	leipiEditor = UE.getEditor('myFormDesign',{
            //allowDivTransToP: false,//阻止转换div 为p
            toolleipi:true,//是否显示，设计器的 toolbars
            //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
           toolbars:[[
            'fullscreen', 'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', /*'webapp',*/ 'pagebreak', 'template', 'background', '|',
            'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
            'print', 'searchreplace', 'help', 'drafts','textfield']],
            //关闭字数统计
            wordCount:false,
            //关闭elementPath
            elementPathEnabled:false,
            //默认的编辑区域高度
            initialFrameHeight:500
        });
}
</script>

</body>
</html>