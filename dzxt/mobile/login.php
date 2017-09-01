<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>手机页</title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<meta name="viewport" content="width=device-width, height=device-height,initial-scale=1.0,maximum=scale=1.0,user-scalable=no;">

<script src="/resource/js/jQuery/jquery-1.9.1.js" type="text/javascript"></script>
<link href="css/index.css" rel="stylesheet" type="text/css" />
<script src="js/index.js" type="text/javascript"></script>
<script src="js/bottom.js" type="text/javascript"></script>

<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/nbase.css" rel="stylesheet">
<link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
<script src="js/bootstrap.min.js"></script>
<script src="/resource/css/login/v2/js/jquery.cookie.js"></script>
<script src="/resource/part/ligerlib/ligerUI/js/core/base.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerDialog.js" type="text/javascript"></script>

<script type="text/javascript">
$(function()
{
	$("#loginButton").on("click", function() {
		var userName = $("#username").val();
		var password = $("#passwordid").val();

		$.ajax({ url: "/s/login/check_login.php", type: "POST",data: {username: escape(userName), passwordid: escape(password),"submit":"submit"},
			success: function(dataStr) {
				var data = eval('('+dataStr+')');
				if(data.state=="ok")
				{
					$.cookie('kie_login_name',userName);
					gourl=true;
					document.location.href="/mobile/index.php";
					return;
				}else if(data.state=="err"){
					$.ligerDialog.error(data.error);
				}else{
					$.ligerDialog.error(data.msg);
				}
				gourl=false;
				$.ligerDialog.closeWaitting();
			},
			error: function(XMLHttpRequest, textStatus) {
				$.ligerDialog.closeWaitting();
				$.ligerDialog.error('登陆失败');
			}
		});
	});
	$(".btn-warning").bind("click",function()
	{
		document.location.href="/m/reg.php";
	});
});
</script>

<style>
.btn-primary
{
	display: block;
    width: 100%;
	color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
	
	padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
	
	touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
	
	background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
	
	font-family: inherit;
	-webkit-appearance: button;
	
	text-transform: none;
	overflow: visible;
	
	margin: 0;
    font: inherit;
	
	box-sizing: border-box;
	align-items: flex-start;
	
	text-rendering: auto;
	
	letter-spacing: normal;
    word-spacing: normal;
	
	text-indent: 0px;
    text-shadow: none;
	
	-webkit-writing-mode: horizontal-tb;
	box-sizing: border-box;
	box-sizing: border-box;
}

.btn-warning
{
	color: #fff;
    background-color: #ec971f;
    border-color: #d58512;
	
	display: block;
    width: 100%;
	
	padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
	
	touch-action: manipulation;
	cursor: pointer;
	-webkit-user-select: none;
	
	background-image: none;
	border: 1px solid transparent;
	border-radius: 4px;
	
	font-family: inherit;
	
	-webkit-appearance: button;
	
	text-transform: none;
	overflow: visible;
	
	margin: 0;
	font: inherit;
	
	box-sizing: border-box;
	
	align-items: flex-start;
	
	text-rendering: auto;
	letter-spacing: normal;
	word-spacing: normal;
	text-indent: 0px;
	text-shadow: none;
	-webkit-writing-mode: horizontal-tb;
	box-sizing: border-box;
	box-sizing: border-box;
}
</style>
</head>
	
<body>
   	<div class="main-content">
   		<div class="login-logo">
   			<img src="images/login_logo.png"/>
   		</div>
   		<div class="login-form">
   			<div class="input-form">
   				<div class="input-up-form">
   					<div class="input-logo">
   						<img src="images/user.png"/>
   					</div>
   					<div class="input-text">
   						<input id="username" type="text">
   					</div>
   				</div>
   				<div class="input-up-form">
   					<div class="input-logo">
   						<img src="images/lock.png"/>
   					</div>
   					<div class="input-text">
   						<input type="password" id="passwordid">
   					</div>
   				</div>
   				<div class="input-other-form">
   					<a href="/m/retrievepassword.php">忘记密码?</a>
   				</div>
   				<div class="input-other-form">
   				
   				</div>
   				<div class="input-other-form">
   					<div class="button-login">
   						<button class="btn btn-block btn-primary" id="loginButton">登录</button>
   					</div>
   					<div class="button-reg">
   						<button class="btn btn-block btn-warning">注册</button>
   					</div>
   				</div>
   			</div>
   		</div>
   		<div class="login-block">
   			<img src="images/login_block.png" />
   		</div>
   	</div>
   	
</body>

</html>
