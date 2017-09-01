<?php
//验证登陆信息
session_start();
$out["state"]="";
$out["error"]=""; 
if(!empty($_POST['submit']))
{
	$username=$_POST['username'];
	$nametitle=$_POST['nametitle'];
	$mail=$_POST['mail'];
	$userpass=$_POST['password'];
	$cpassword=$_POST['cpassword'];
	$code=$_POST['code'];
	if(strlen($username)<1){$out["error"]="请输入账号！";}
	else if(strlen($nametitle)<1){$out["error"]="请输入真实姓名！";}
	else if(strlen($mail)>0 && !preg_match('/^[a-z0-9]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i',$mail)){$out["error"]="邮箱地址不正确";}
	else if(strlen($userpass)<1){$out["error"]="请输入密码！";}
	else if($userpass!=$cpassword){$out["error"]="确认密码不正确！";}
	else if(strlen($code)<1){$out["error"]="请输入验证码！";}
	else if(strtolower($code)!=strtolower($_SESSION['validate_code'])){$out["error"]="验证码不正确！";}	
	else
	{	
		include_once '/s/inc/conn.php';
		$sql="select * from ht_user where lower(`username`)=lower('$username')";
		$query=mysql_query($sql);
		$row=mysql_fetch_array($query);
		
		if($row)
		{
			$out["error"]="账号已存在！";
		}else
		{
			$userpass1=md5($userpass);
			$sql="INSERT INTO ht_user (username,chinese_name,password,reg_data,reg_ip) VALUES('$username','$nametitle','$userpass1','".date("Y-m-d")."','".$_SERVER['REMOTE_ADDR']."');";
			$query=mysql_query($sql);			
			if($query)
			{
				echo "<script language='javascript'>alert('注册成功！账号:$username 密码:$userpass 请登录');location='/login.php';</script>";
				exit;
			}else
			{
				$out["error"]="注册失败！";
			}
		}
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>注册会员</title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<link rel="stylesheet" href="/resource/css/reg/css/login.css" type="text/css" />
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
  <div id="cityname" class="regname"><span>用户注册</span></div>
  <div id="logintext"><a href="/login.php">返回首页</a></div>
</div>
<div class="cb win1000">
  <form id="submitForm" action="" method="post" name="submitForm" target="formSubmit">
  <input type="hidden" name="submit" value="yes">
    <div class="porleft">
      <div class="regMenu"> <span id="weixinRegTab" class="active"><a href="#" >用户注册</a></span> <span id="loginTab">已有账号？<a href="login2.php">去登录</a></span> </div>
      <div class="regWrap">
        <div id="origReg">
        <?php
		if (strlen($out["error"])>0) {
		?>
		<p><font color=red><?php echo $out["error"];?></font></p>
		<?php
		}
		?>            
          <div id="mobileRegCon" >
            <p> <span class="regtlx">用　户　名</span>
              <input type="text" size="20" value="<?=$username?>" class="inp inw" id="mobile" maxlength="20" name="username"  />
              <span id="mobile_Tip"></span> </p>
          </div>
          <div id="mobileRegCon2" >
            <p> <span class="regtlx">真&nbsp;实&nbsp;姓&nbsp;名</span>
              <input type="text" size="20" value="<?=$nametitle?>" class="inp inw" id="nametitle" maxlength="20" name="nametitle"  />
              <span id="mobile_Tip2"></span> </p>
          </div>
          <div id="mobileRegCon2" >
            <p> <span class="regtlx">邮　　　箱</span>
              <input type="text" size="20" value="<?=$mail?>" class="inp inw" id="mail" maxlength="20" name="mail"  />
              <span id="mobile_Tip2"></span> </p>
          </div>
          <div id="passwordCon">
            <p> <span class="regtlx">密　　　码</span>
              <input type="password" size="30" name="password" id="password" class="inp inw" onkeyup="$.c.user.reg.CheckPasswordStrength(this)" onpaste="return false" maxlength="16"  />
              <span id="password_Tip" style="z-index: 100;"></span> </p>
            <p id="cpp"> <span class="regtlx">确&nbsp;认&nbsp;密&nbsp;码</span>
              <input type="password" size="30" name="cpassword" id="cpassword" class="inp inw" maxlength="16" onpaste="return false"  />
              <span id="cpassword_Tip"></span> </p>
          </div>
          <div id="verifyCode" >
            <p> <span class="regtlx">验　证　码</span>
              <input class="inp inw" id="validatecode" maxlength="5" name="code" size="2" type="text">
              <img align="absmiddle" id="vcode"  style="cursor: pointer; " src="s/lib/authimg.php" onclick="vcodes()"><a href="javascript:return false;" class="f12" style="margin-left:8px;" onclick="vcodes();">看不清？</a> <span id="validatecode_Tip"></span> </p>
          </div>
          <p class="submitwrap"> <span class="regtlx">&nbsp;</span>
            <label id="butt" class="butt">
              <input type="submit" class="btns" value="立即注册" checked="checked" id="btnSubmit" style="width:110px;height:34px;" />
            </label>
            <span id="gologin"><span id="loginOpt">已有账号？<a href="login2.php">去登录</a></span></span> </p>
        </div>
      </div>
    </div>
  </form>
</div>
<div id="footer" class="win1000">
  <p>  </p>
</div>
</div>
<script>
function vcodes(){	
	var num=Math.random();
	var re=document.getElementById("vcode");
	re.src="s/lib/authimg.php?a="+num;
}
vcodes();
</script>
</body>
</html>