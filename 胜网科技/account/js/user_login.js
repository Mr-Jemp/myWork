$(function(){
	if($('.top_a_le').html('<')){
		$('.top_a_le').click(function(){
			history.go(-1);
		})
	}
	$("#d").click(function(){
		window.location.href="user_login.html";
	});
	$("#new_user").click(function(){
		window.location.href="user_register.html";
		


	})
	$("#user_btn1").click(function(){
		window.location.href="affirm_pass.html";
	})
	// 点击登录跳转到首页
	$('#user_btn').click(function(){
		$.ajax({

		})
		window.location.href="index.html";
	})

	$("#forget_pass").click(function(){
		window.location.href="forget_pass.html";
	})

	
	$("#forget_btn1").click(function(){
		window.location.href="forget_pass2.html";
	})
	$("#pass_forget_btn").click(function(){
		window.location.href="user_login.html";
	})

	// 验证登录的手机号码
	function validatemobile(mobile) 
   {  
       if(mobile.length=="") 
       { 
         $("#user_hint").html("你的手机号码不能为空");
         $(".error").html("你的手机号码不能为空");
         $("#forget_pass_hint").html("你的手机号码不能为空");
         	return false;
       };     
       if(mobile.length!=11) 
       { 
          
           $("#user_hint").html("你的手机号码位数不对");
           $(".error").html("你的手机号码位数不对");
           $("#forget_pass_hint").html("你的手机号码位数不对");
         

           return false;
       }; 
        
       var myreg = /^1[3|4|5|7|8][0-9]{9}$/;
       if(!myreg.test(mobile)) 
       { 
         $("#user_hint").html("你的手机号码格式不对");
         $(".error").html("你的手机号码格式不对");
         $("#forget_pass_hint").html("你的手机号码格式不对");
         
          return false;
       }else{
       	 $("#user_hint").html("");
       	 $(".error").html("");
       	 $("#forget_pass_hint").html("");
       }
   } 
  $("#phone1").change(function(){
  	validatemobile($("#phone1").val());
  });
  $("#register_number").change(function(){
  	validatemobile($("#register_number").val());
  });
  $("#forget_number").change(function(){
  	validatemobile($("#forget_number").val());
  });


  // 用户注册账号部分 验证手机号码是否注册
  $("#register_number").blur(function(){
  	// var vcode={
  	// 	code:$("#one").val()
  	// }
  	$.ajax({
  		type:"GET",
  		dataType:"JSON",
  		url:'http://218.15.27.250:20881/userManagementFacade/checkAccount',
  		data:{number:$("#register_number").val()

  	},
  		success:function(msg){
  			console.log(msg);
  			if(msg==1){
  				console.log('可以注册');
  				$("#gister_btn").attr("disabled",false);
  			}
  			if(msg==2){
  				$(".error").html("你的手机号码已被注册")
  			}
  			if(msg==3){
  				$(".error").html("你的手机号码格式不正确")
  			}
  		},
  		error:function(XMLHttpRequest,textStatus,errorThrown){
  			console.log(textStatus);
  		}
  	});
  });

  // 验证码发送:
  var InterValObj; //timer变量，控制时间
  var count = 60; //间隔函数，1秒执行
  var curCount;//当前剩余秒数
  var code=""; //验证码
  var codeLength = 6;//验证码长度
  function sendMess(){
	curCount = count;
	var phone=$("#register_number").val();//手机号码

	var myreg = /^1[3|4|5|7|8][0-9]{9}$/;
       if(!myreg.test(phone)) 
       { 
         $(".error").html("你的手机号码格式不对");
         
          return false;
       }else{
       
		$(".error").html("");
		for (var i = 0; i < codeLength; i++) {
			code += parseInt(Math.random() * 9).toString();
		}
		//设置button效果，开始计时
		$("#gister_btn").attr("disabled",true);
		$("#gister_btn").html(curCount+"S");
		InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
	//向后台发送处理数据
		$.ajax({
			type: "GET", //用POST方式传输
			dataType: "JSON", //数据格式:JSON
			url: 'http://218.15.27.250:20881/userManagementFacade/getCode', //目标地址
			data:{number:$("#register_number").val()},
			error: function (XMLHttpRequest, textStatus, errorThrown) { },
			success: function (msg){ 
					if(msg==1){
						console.log("发送成功")
					}
					if(msg==0){
						console.log("发送失败")
					}

			}
		});

		
	}

}

//timer处理函数
function SetRemainTime() {
	if(curCount == 0) {                
		window.clearInterval(InterValObj);//停止计时器
		$("#gister_btn").removeAttr("disabled",true);//启用按钮
		$("#gister_btn").html("重新发送");
		code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效    
	}
	else{
		curCount--;
		$("#gister_btn").html(curCount + "S");
	}
}

$("#gister_btn").click(function(){
	sendMess();
});

$(".user_btn_next2").click(function(){
	$.ajax({
		// 判断用户输入的验证码是否和接受的验证码一样,如果是一样就移除disadled
		type: "GET", //用POST方式传输
			dataType: "JSON", //数据格式:JSON
			url: 'http://218.15.27.250:20881/userManagementFacade/checkCode', //目标地址
			data:{number:$("#register_number").val(),code:$("#user_vcode").val()},
			error: function (XMLHttpRequest, textStatus, errorThrown) { },
			success: function (msg){ 
					if(msg==1){
						console.log("发送成功")
						// cookie保存数据
						var options=$("#aff_select option:selected");  //获取选中的项

                        //拿到选中项的值
						var udata={
							number:$("#register_number").val(),
							opt:options.val()
						}
						$.cookie('userDate', udata, { expires: 365, path: '/' });
						window.location.href="affirm_pass.html";
					}
					if(msg==0){
						console.log("发送失败")
					}

			}
		
	});
	
})


 // 验证密码是否是数字字母符号组成以及两次密码输入是否一样
 	function passWord(pass) 
   { 
       if(pass.length=="") 
       { 
         $("#password_num").html("你的密码不能为空");
         $("#password_num2").html("你的密码不能为空");
         	return false;
       };     
  
    	
      var reg = /^(?=[`~!@#\$%\^&*\(\)\-_=\+\\\|\[\]\{\}:;\"\',.<>\/\?\d]*[a-zA-Z]+)(?=[a-zA-Z`~!@#\$%\^&*\(\)\-_=\+\\\|\[\]\{\}:;\"\',.<>\/\?]*\d+)[`~!@#\$%\^&*\(\)\-_=\+\\\|\[\]\{\}:;\"\',.<>\/\?\w]{6,20}$/;  
       if(!reg.test(pass)) 
       { 
         $("#password_num").html("你的密码不满足要求");
         $("#password_num2").html("你的密码不满足要求");
         
          return false;
       }else{
       	 $("#password_num").html("");
       	 $("#password_num2").html("");
       
       }
   } 
  $("#aff_pass_input").change(function(){
  	passWord($("#aff_pass_input").val());
  })
   $("#for_pass_input2").change(function(){
  	passWord($("#for_pass_input2").val());
  })

  $("#aff_pass2_input").change(function(){

  if($("#aff_pass_input").val() != $("#aff_pass2_input").val()){
  	$("#password_num2").html("两次密码不一致,请重新输入");
  	$("#pass_aff_btn2").attr("disabled",true);
  }else{
  	$("#password_num2").html("");
  	$("#pass_aff_btn2").attr("disa
  	bled",false);
  };
});

  $("#for_pass_input3").change(function(){

  if($("#for_pass_input2").val() != $("#for_pass_input3").val()){
  	$("#password_num3").html("两次密码不一致,请重新输入");
  	$("pass_forget_btn1").attr("disabled",true);
  }else{
  	$("#password_num3").html("");
  	$("#pass_forget_btn1").attr("disabled",false);
  };
});
    $("#pass_aff_btn2").click(function(){
    	var data = $.cookie("userData");
    		$.ajax({		
		type: "POST", //用POST方式传输
			dataType: "JSON", //数据格式:JSON
			url: 'http://218.15.27.250:20881/userManagementFacade/addUser', //目标地址
			data:{account:data.number,
				password:$("#aff_pass_input").val(),
				job:data.opt
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) { },
			success: function (a){ 
					if(a.status==1){
						console.log("成功")
					$.cookie('uid', a.msg.id, { expires: 365, path: '/' });
					}
					if(a.status==0){
						console.log("失败")
					}

			}
		
	});
    });
 //通过ID来访问页面
 var id= $.cookie("uid")
 	$.ajax({
		
		type: "GET", //用POST方式传输
			dataType: "JSON", //数据格式:JSON
			url: 'http://218.15.27.250:20881/digitalUserManagementFacade/loginDigital', //目标地址
			data:{id:id
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) { },
			success: function (a){ 
					if(a.status==1){
						console.log("成功")
				window.location.href="index.html";
					}
					if(a.status==0){
						console.log("失败")
					}

			}
		
	});

 
//忘记密码判断手机号祝否注册
 $("#forget_number").blur(function(){
  		$.ajax({
		
		type: "GET", //用POST方式传输
			dataType: "JSON", //数据格式:JSON
			url: 'http://218.15.27.250:20881/userManagementFacade/checkAccount', //目标地址
			data:{number:$("#forget_number").val()
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) { },
			success: function (a){ 
					if(a.status==1){
						console.log("成功")
						$("#register_btn2").attr("disabled",false);
					}
					if(a.status==0){
						console.log("失败")
					}

			}
		
	});
  });
 // 获取验证码
$("#register_btn2").click(function(){
sendPass();
})
  
  function sendPass(){
	curCount = count;
	var Num=$("#forget_number").val();//手机号码
	var myreg = /^1[3|4|5|7|8][0-9]{9}$/;
	  if(!myreg.test(Num)) 
       { 
         $("#forget_pass_hint").html("你的手机号码格式不对");
         
          return false;
       }else{
       
		$("#forget_pass_hint").html("");
		for (var i = 0; i < codeLength; i++) {
			code += parseInt(Math.random() * 9).toString();
		}
		//设置button效果，开始计时
		$("#register_btn2").attr("disabled", "true");
		$("#register_btn2").html(curCount+"S");
		InterValObj = window.setInterval(SetTime, 1000); //启动计时器，1秒执行一次
	//向后台发送处理数据
		$.ajax({
			type: "GET", //用POST方式传输
			dataType: "JSON", //数据格式:JSON
			url: 'http://218.15.27.250:20881/userManagementFacade/getCode', //目标地址
			data: {number:$('#forget_number').val()},
			error: function (XMLHttpRequest, textStatus, errorThrown) { },
			success: function (a){ 
				if(a.status==0){
					console.log('00');
				}
				if(a.status==1){
					console.log("发送成功");
				}
			}
		});

		
	}
}

//timer处理函数
function SetTime() {
	if(curCount == 0) {                
		window.clearInterval(InterValObj);//停止计时器
		$("#register_btn2").removeAttr("disabled","true");//启用按钮
		$("#register_btn2").html("重新发送");
		code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效    
	}
	else{
		curCount--;
		$("#register_btn2").html(curCount + "S");
	}
}



$("#forget_btn_next").click(function(){
		$.ajax({
			type: "GET", //用POST方式传输
			dataType: "JSON", //数据格式:JSON
			url: 'http://218.15.27.250:20881/userManagementFacade/checkCode', //目标地址
			data: {number:$('#forget_number').val(),
					code:$("#forget_vcode_input").val()
		},
			error: function (XMLHttpRequest, textStatus, errorThrown) { },
			success: function (a){ 
				if(a.status==0){
					console.log('00');
				}
				if(a.status==1){
					//cookie保存用户数据
					var newuser=$('#forget_number').val();
				$.cookie('newid', newuser, { expires: 365, path: '/' });
					window.location.href="forget_pass2.html";
				}
			}
		});
	
})

// 更改密码页面,提交更新的信息

$("#forget_btn_next").click(function(){
	var new_ps=$.cookie('newid');
		$.ajax({
			type: "POST", //用POST方式传输
			dataType: "JSON", //数据格式:JSON
			url: 'http://218.15.27.250:20881/userManagementFacade/upUser', //目标地址
			data: {account:new_ps,
					password:$("#for_pass_input2").val(),
					password_:$("#for_pass_input3").val()
		},
			error: function (XMLHttpRequest, textStatus, errorThrown) { },
			success: function (a){ 
				if(a.status==0){
					console.log('00');
				}
				if(a.status==1){
					//cookie保存ID
					$.cookie('user_ID', a.msg.id, { expires: 365, path: '/' });
			
					window.location.href="index.html";
				}
			}
		});
	
});
// ID跳转
	$.ajax({
			type: "GET", //用POST方式传输
			dataType: "JSON", //数据格式:JSON
			url: 'http://218.15.27.250:20881/digitalUserManagementFacade/loginDigital', //目标地址
			data: {id:$.cookie('user_ID')
		},
			error: function (XMLHttpRequest, textStatus, errorThrown) { },
			success: function (a){ 
				if(a.status==0){
					console.log('00');
				}
				if(a.status==1){
				
					window.location.href="index.html";
				}
			}
		});


// 登录页面登录账号

$("#user_submit").click(function(){

		$.ajax({
			type: "POST", //用POST方式传输
			dataType: "JSON", //数据格式:JSON
			url: 'http://218.15.27.250:20881/userQueryFacade/loginAccount', //目标地址
			data: {account:$("#phone1").val(),
					passWord:$("#phone1_pass").val(),
					status:0
		},
			error: function (XMLHttpRequest, textStatus, errorThrown) { },
			success: function (a){ 
				if(a.status==0){
					console.log('00');
					
				}
				if(a.status==1){
				
					window.location.href="index.html";
				}
			}
		});

	 if ($("#checkboxed").attr("checked")){
	 	  var str_username = $("phone1").val();
          var str_password = $("phone1_pass").val();
	 	  $.cookie("rmbUser", "true", { expires: 7 }); 
          $.cookie("username", str_username, { expires: 7 });
          $.cookie("password", str_password, { expires: 7 });
    
	 }else{
	 	   $.cookie("rmbUser", "false", { expire: -1 });
           $.cookie("username", "", { expires: -1 });
           $.cookie("password", "", { expires: -1 });
	 }
});






  
});
