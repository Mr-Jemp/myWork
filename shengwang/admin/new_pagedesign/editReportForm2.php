<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>报表页设置</title>
<script type="text/javascript" src="/resource/js/jQuery/jquery-1.9.1.js"></script>
<link href="/resource/part/newtpl/css/rheight.css" rel="stylesheet" type="text/css" />
<link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" /> 
<link href="/resource/part/ligerlib/ligerUI/skins/Tab/css/form.css" rel="stylesheet" type="text/css" /> 
<script src="/resource/part/ligerlib/jquery/jquery-1.3.2.min.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/ligerUI/js/ligerui.all.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/jquery-validation/jquery.validate.min.js"></script>
<script src="/resource/part/ligerlib/jquery-validation/jquery.metadata.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/jquery-validation/messages_cn.js" type="text/javascript"></script>

<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/ueditor/ueditor.all.min.js"> </script>
<!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
<!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/ueditor/lang/zh-cn/zh-cn.js"></script>

<script>
$(function(){

	$.ajax({type: "POST",url: "/s/function/reportform.load.php", 
		data:{formid:'<?php echo $_REQUEST['id']?>'}
		,success: function(data){
			if(data==null){
				alert("加载失败，返回为空！");
				startEditor();
				return;
			}
			if(data==""){
				alert("加载失败，没有数据返回！");
				startEditor();
				return;
			}
			var obj=null;
			try{
				obj=eval('('+data+')');
			}catch(e){
				obj=null;
			}
			if(obj==null){
				alert("加载失败，无法解析返回的字符！");
				startEditor();
				return;
			}
			if(obj.IsSuccess==true){
				$("#myFormDesign").val(decodeURIComponent(obj.Data).replace(/\+/ig," "));
				startEditor();
				return;
			}
			alert("加载失败，"+obj.Message);
			startEditor();
		},
		error:function(er){
			alert("加载失败，"+er.statusText);
			startEditor();
		}
	});
		
	$("#submit").bind("click",function(){
		var formeditor = leipiEditor.getContent();
		if(formeditor==null){
			alert("获取编辑器内容失败");
			return;
		}
		if(formeditor==""){
			alert("请编辑报表内容");
			return;
		}
		var re = /(data\d+)/ig;
		var arr=null,out=Array();
		var outstr='',i=0,isthere=false;
		while(arr=re.exec(formeditor)){
			isthere=false;
			for(i=0;i<out.length;i++){
				if(out[i]==arr[0]){
					isthere=true;
					break;
				}
			}
			if(isthere)continue;
			out.push(arr[0]);
			if(outstr==""){
				outstr+=arr[0];
			}else{
				outstr+=','+arr[0];
			}
		}
		if(out.length<1){
			alert("请输入报表的字段");
			return;
		}
		$.ajax({type: "POST",url: "/s/function/reportform.save.php", 
			data:{field:outstr,formid:'<?php echo $_REQUEST['id']?>',
			content:formeditor,traditional:true}
			,success: function(data){
				if(data==null){
					alert("保存失败，返回为空！");
					return;
				}
				if(data==""){
					alert("保存失败，没有数据返回！");
					return;
				}
				var obj=null;
				try{
					obj=eval('('+data+')');
				}catch(e){
					obj=null;
				}
				if(obj==null){
					alert("保存失败，无法解析返回的字符！");
					return;
				}
				if(obj.IsSuccess==true){
					alert("保存成功");
					return;
				}
				alert("保存失败，"+obj.Message);
			},
			error:function(er){
				alert("保存失败，"+er.statusText);
			}
		});
	});
});
function startEditor(){
	
	window.leipiEditor = UE.getEditor('myFormDesign',{
		//allowDivTransToP: false,//阻止转换div 为p
		toolleipi:true,//是否显示，设计器的 toolbars
		textarea: 'design_content',   
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
		//focus时自动清空初始化时的内容
		//autoClearinitialContent:true,
		//关闭字数统计
		wordCount:false,
		//关闭elementPath
		elementPathEnabled:false,
		//默认的编辑区域高度
		initialFrameHeight:500
		///,iframeCssUrl:"css/bootstrap/css/bootstrap.css" //引入自身 css使编辑器兼容你网站css
		//更多其他参数，请参考ueditor.config.js中的配置项
	});
	
}
</script>
<style>
p{font-size:14px; font-weight:bold;background:#efefef;line-height:30px;height:30px; padding-left:10px;border-radius:3px;}
</style>
</head>
<body style="background-color:#E0F0FE">
<div class="admin_main_nr_dbox">
<p>报表页设置</p>
<form id="formid" action="?id=<?php echo $formid?>&name=<?php echo $name?>" method="post">
<script id="myFormDesign" type="text/plain" name="adadadad" style="width:100%;"></script>
</form> 
<p style="height:20px;width:100%;overflow:hidden;background:#ffffff;"></p>
<div class="liger-button" data-click="f_validate" data-width="150" id="submit">提交保存</div>

</div>
</body>
</html>