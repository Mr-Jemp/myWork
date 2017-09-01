<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>会员登录</title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<link rel="stylesheet" href="/resource/css/reg/css/login.css" type="text/css" />
<script src="/resource/js/jQuery/jquery-1.9.1.js" type="text/javascript"></script>
<link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
<script src="/resource/part/ligerlib/ligerUI/js/core/base.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerDialog.js" type="text/javascript"></script>
<script>
$(function(){
	$("#submitForm").submit(function(){
        alert("login2");
		var userName = $("input[name=username]").val();
        var password = $("input[name=password]").val();
		var vcode = $("input[name=validatecode]").val();
		if(userName=='' || password=='' || vcode==''){
			$.ligerDialog.error('请填写完整登录信息');
			return false;
		}		
        $.ajax({ url: "/s/login/check_login.php", type: "POST", data: {username: escape(userName), passwordid: escape(password),"submit":"submit"  },
            success: function(dataStr) {
                var data = eval('('+dataStr+')');				
				if(data.state=="ok")
				{
					$.cookie('kie_login_name',userName);
					$("#loginjs").attr("src","/s/login/loginjs.html");	
					$("#origReg").html('<p style="line-height:50px;">正在登陆中,请稍候...</p>');
					//setTimeout(function() {document.location.href="/front/main/mainpage.php";},5000);
					document.location.href="/index.php";
					return;
				}else if(data.state=="err"){					
					$.ligerDialog.error(data.error);
				}else{
					$("#origReg").html(data.msg);
				}				
				$.ligerDialog.closeWaitting();
            },
            error: function(XMLHttpRequest, textStatus) {
                $.ligerDialog.closeWaitting();
                $.ligerDialog.error('登陆失败');
            }
        });
		return false;
	});
});
</script>
<style>
.porleft p {
	height: 35px;
}
.fb {
	font-weight:bold;
}
.link-login {
	font-family: '宋体';
}

#nextwrap {
	position:relative;
}
#validatecode {
	width:75px;
}
#pre {
	font-size:12px;
	line-height:34px;
	cursor:pointer;
}
.btnGray input.disable {
	color:#a0a0a0;
	cursor:default;
}
</style>
</head>
<body>
<div id="header" class="win1000"> <a id="logo" href=""><img alt="" src="/resource/css/reg/images/logo-49h.gif" /></a>
  <div id="cityname" class="regname"><span>会员登录</span></div>
  <div id="logintext"><a href="/login.php">返回首页</a></div>
</div>
<div class="cb win1000">
  <form id="submitForm" action="/domobileregister" method="post" name="submitForm" target="formSubmit">
    <div class="porleft">
      <div class="regMenu"> <span id="weixinRegTab" class="active"><a href="#" >会员登录</a></span> </div>
      <div class="regWrap">
        <div id="origReg">
          <div id="mobileRegCon" >
            <p> <span class="regtlx">用　户　名</span>
              <input type="text" size="20" value="" class="inp inw" id="mobile" maxlength="20" name="username"  />
              <span id="mobile_Tip"></span> </p>
          </div>
          <div id="passwordCon">
            <p> <span class="regtlx">密　　　码</span>
              <input type="password" size="30" name="password" id="password" class="inp inw" onkeyup="$.c.user.reg.CheckPasswordStrength(this)" onpaste="return false" maxlength="16"  />
              <span id="password_Tip" style="z-index: 100;"></span> </p>
            
          </div>
          <div id="verifyCode" >
            <p> <span class="regtlx">验　证　码</span>
              <input class="inp inw" id="validatecode" maxlength="5" name="validatecode" size="2" type="text">
              <img align="absmiddle" id="vcode" style="cursor: pointer;" src="s/lib/authimg.php" onclick="vcodes()"><a href="#" class="f12" style="margin-left:8px;" onclick="vcodes()">看不清？</a> <span id="validatecode_Tip"></span> </p>
          </div>
          <p class="submitwrap"> <span class="regtlx">&nbsp;</span>
            <label id="butt" class="butt">
              <input type="submit" class="btns" value="登录" checked="checked" id="btnSubmit" style="width:110px;height:34px;" />
            </label>
            </p>
        </div>
      </div>
    </div>
  </form>
</div>
<div id="footer" class="win1000">
  <p>Copyright 2011-2015    广东<?php echo $web_setting['web_name']?>有限公司 <?php echo $web_setting['beian']?> </p>
</div>
</div>
<script>
function vcodes(){	
	var num=Math.random();
	var re=document.getElementById("vcode");
	re.src="s/lib/authimg.php?a="+num;
}
</script>
</body>
</html>
