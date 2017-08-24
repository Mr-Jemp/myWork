$(function(event) {   
    //用户登录函数，enNumber为企业代码,不填写企业代码，登录则为本软件公司,当用户不填写用户名和密码直接登录，或者选择guest登录时，用户身份为来客
    $("#loginButton").bind("click", function(event) {
		var gourl=false;
        $.ligerDialog.waitting('正在登陆中,请稍候...');
        setTimeout(function(){$.ligerDialog.closeWaitting();},5000);
        var enNumber = "sssss";
        var userName = $("#username").val();
        var password = $("#passwordid").val();
        $.ajax({ url: "/s/login/check_login.php", type: "POST",data: {username: escape(userName), passwordid: escape(password),"submit":"submit"},
            success: function(dataStr) {                
				var data = eval('('+dataStr+')');								
				if(data.state=="ok")
				{
					$.cookie('kie_login_name',userName);
					//$("#loginjs").attr("src","/s/login/loginjs.html");	
					//document.frames('loginjs').location.reload();					
					gourl=true;		
					//document.location.href="/front/main/mainpage.php";
					parent.parent.document.location.href="/index.php";
					return;
				}
				else if(data.state=="err"){
					$.ligerDialog.error(data.error);
				}else{
					$("#wrap").html(data.msg);
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
});
function goURL(){
	document.location.href="/front/main/mainpage.php";
}