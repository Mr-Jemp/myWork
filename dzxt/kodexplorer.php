<?php
session_start();
include_once "/s/function/check_session.php";
?><!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" scroll="no">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="renderer" content="webkit">
<title>胜网科技</title>
<link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />

<script src="/resource/js/jQuery/jquery-1.9.1.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/ligerUI/js/core/base.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerDialog.js" type="text/javascript"></script>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
html,body{height:99%;width:100%;}
iframe{height:100%;width:100%;}
-->
</style></head>
<body>
<iframe id="main" frameborder="0" src="/kodexplorer3.12/load.php">
function()
{
	this.name='folder<?php echo $_SESSION['username'];?>';
	this.passwored='<?php echo $_SESSION['username'];?>';
}
</iframe>
<script type="text/javascript">
var tourl=new Array("?user/loginSubmit","?member/add");
var attr='';
$(function()
{
	attr=eval("new "+$("iframe").eq(0).html());
	$("iframe").eq(0).html("");
	$.ajax({ url:"/kodexplorer3.12/index.php"+tourl[0], type: "GET",dataType:'text',
		data:{name:attr.name,password:attr.passwored,"rember_password":0,"check_code":[]},
		success: function(json) 
		{
			var pdiv='载[0,1]入[1,2]中[2,3]';
			var message=$('<div>'+pdiv+'<div>');
			$(message).attr("pdivid","msg")
			.append(pdiv).html(json);
			var msg=$(message).find(".msg").html();
			var ismsg=pdiv.replace(/([\u4E00-\u9FA5]).+([\u4E00-\u9FA5]).+([\u4E00-\u9FA5]).+/g, "$1$2$3...");
			if((msg=msg.replace(ismsg,msg))==ismsg)
			{
				$("#main").attr("src","/kodexplorer3.12/index.php?desktop");
				return;
			}
			$.ajax({ url:"/kodexplorer3.12/index.php"+tourl[0], type: "GET",data:{name:"admin",password:"admin","rember_password":0,"check_code":[]},
			dataType:'text',success: function(json)
			{
			
				if(json.replace(/[\s\S]+[\u4E00-\u9FA5]+\.\.\.[\s\S]+/gi,"")!=json)
				{
					addmember();
				}else
				{
					var msg=json==""?"未知错误":json.replace(/(([\u4E00-\u9FA5])+)/gi,"$1");
					if(msg.replace(/[\s\S]*\<html[\s\S]*\<head[\s\S]*\<body[\s\S]*/i,"")!=msg)
						$("#main").attr("src","/kodexplorer3.12/error.php?error=请清除浏览器缓存再试！");
					else
						$("#main").attr("src","/kodexplorer3.12/error.php?error="+msg);
					return;
				}
				
			}
			});			
		},
		error: function(XMLHttpRequest, textStatus)
		{
			$("#main").attr("src","/kodexplorer3.12/error.php?error=无法进入网盘!");
		}
	});
});
function addmember()
{
	$.ajax({ url:"/kodexplorer3.12/index.php"+tourl[1], type: "GET",dataType:'text',
		data:{name:attr.name,password:attr.passwored,"role":"default"},
		success: function(json) 
		{
			if(json.replace(/\<span[\s\S]+\<\/span>/gi,"")!=json
			|| json=="")
			{
				$.ajax({ url:"/kodexplorer3.12/index.php"+tourl[1], type: "GET",dataType:'text',
					data:{name:attr.name,password:attr.passwored,"role":"default"},
					success: function(json) 
					{
						if(json.replace(/\<span[\s\S]+\<\/span>/gi,"")!=json
						|| json=="")
						{
							var msg=json==""?"未知错误":json.replace(/(([\u4E00-\u9FA5])+)/gi,"$1");
							if(msg.replace(/[\s\S]*\<html[\s\S]*\<head[\s\S]*\<body[\s\S]*/i,"")!=msg)
								$("#main").attr("src","/kodexplorer3.12/error.php?error=请清除浏览器缓存再试！");
							else
								$("#main").attr("src","/kodexplorer3.12/error.php?error="+msg);
							return;
						}
						var data = eval('('+json+')');
						if(data.code!=true){ $("#main").attr("src","/kodexplorer3.12/error.php?error="+data.data+" 注册网盘失败!");return;}
						$.ajax({ url:"/kodexplorer3.12/index.php"+tourl[0], type: "GET",data:{name:attr.name,password:attr.passwored,"rember_password":0,"check_code":[]}});
						$("#main").attr("src","/kodexplorer3.12/index.php?desktop");		
					},
					error: function(XMLHttpRequest, textStatus)
					{
						$.ligerDialog.error("无法注册网盘!");
						$("#main").attr("src","/kodexplorer3.12/error.php?error=无法注册网盘!");
					}
				});
				return;
			}
			var data = eval('('+json+')');
			if(data.code!=true){ $("#main").attr("src","/kodexplorer3.12/error.php?error="+data.data+" 注册网盘失败");return;}
			$.ajax({ url:"/kodexplorer3.12/index.php"+tourl[0], type: "GET",data:{name:attr.name,password:attr.passwored,"rember_password":0,"check_code":[]}});
			$("#main").attr("src","/kodexplorer3.12/index.php?desktop");		
		},
		error: function(XMLHttpRequest, textStatus)
		{
			$.ligerDialog.error("无法注册网盘");
			$("#main").attr("src","/kodexplorer3.12/error.php?error=无法注册网盘");
		}
	});	
}
</script>
</body>
</html>