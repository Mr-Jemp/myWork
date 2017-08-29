	
	if(window.sessionStorage) {
		console.log('ok');
	} else {
		console.log('fail');
	}
	var accountIds=$.cookie("accountId");
	/*vip会员部分*/
	$('.vip_boxType_list li').each(function() {
		var _this = $(this);
		_this.find('a').click(function() {
			$(this).addClass('coblue').parent().siblings().find('a').removeClass('coblue');
		})
	})
	$('.longtime_list li').each(function() {
		var _this = $(this);
		_this.find('a').click(function() {
			if(_this.index() == 4) {
				$('.longtime_list_box li:last-child').show().siblings().hide();
			} else {
				$('.longtime_list_box li:first-child').show().siblings().hide();
			}
			$(this).addClass('coblues').parent().siblings().find('a').removeClass('coblues');
		})
	})

	/*获取手机号码*/
	$.ajax({
		url: 'http://192.168.0.21:20884/accountQuery/getPhone',
		type: 'post',
		contentType: "application/json; charset=UTF-8",
		data: JSON.stringify({
			'accountId': accountIds
		}),
		dataType: 'json',
		success: function(data) {
			console.log(data)
			
			$('#bundNumber').html(data.msg);
			localStorage.setItem("accountNub", data.msg); //储存登录绑定的手机号码
		},
		error: function() {
			console.log("获取手机号码失败")
		}
	})

	//保存数据  		
	//		$('#signCon').blur(function(){
	//			var signCon = $('#signCon').val();
	//			localStorage.setItem("signCon",signCon) ;
	//		})
	var signInfo = window.location.search;
	signInfo = decodeURI(decodeURI(signInfo.split("?")[1])); //UTF8转码中文
	$('#signCon').val(signInfo);
	if($('.top_a_ri').html() == "保存") {
		$('.top_a_ri').click(function() {
			var signCon = $('#signCon').val();

			//					var signCon=localStorage.getItem('signCon') ;
			//					window.location="../app/tearch_info.html";
			$.ajax({
				url: 'http://192.168.0.21:20882/userManage/updatePersonalText',
				type: 'post',
				data: JSON.stringify({
					'accountId': accountIds,
					"personalText": signCon
				}),
				contentType: "application/json; charset=UTF-8",
				dataType: 'json',
				success: function(data) {
					console.log(data)
					window.location = "../app/tearch_info.html";
				}
			})

		})

	}
	$('._signChange').html(localStorage.getItem('signCon'));
	//	VIP会员部分

	//验证码发送封装方法
	var mytiome;
	var waitTime = 60;

	function getTime(o) {
		if(waitTime == 0) {
			o.html("免费获取");
			waitTime = 60;
			return;
		} else {
			o.parent().attr("disabled", true);
			o.html(waitTime + "秒后可重发");
			waitTime--;
			clearInterval(mytiome);
			mytiome = setInterval(function() {
				getTime(o)
			}, 1000)
		}
	}

	//		Storage = function() {
	//			
	//			window.localStorage.setItem('phone_', JSON.stringify(phoneArr));
	//			phoneArr = JSON.parse(window.localStorage.getItem('phone_') || "[]"); 
	//		}

	//	判断登录密码			
	//		var phoneArr = JSON.parse(window.localStorage.getItem('phone_') || "[]");
	//		 	phoneArr.push(phone)	
	//		 	phoneArr=JSON.stringify(phoneArr);
	//		 	window.localStorage.setItem('phone_',phoneArr)			

	//		 绑定手机号码
	var tphoneNumber = $("#tphone_number");
	tphoneNumber.blur(function() {
		//	tphoneNumber.on('input PRopertychange',function(){
		var phone = this.value;
		if(phone.length == 0) {
			$('#tipS_number').show().html("手机号码不能为空").css("color", "#ff5094");
			$('.bundBtn').css("background", "#ccc").attr('disabled', 'disabled');
		} else {
			if(phone.length == 11) {
				if(/^((13[0-9]|15[0-9]|17[0-9]|18[0-9])+\d{8})$/.test(phone)) {
					$('#tipS_number').hide();
					//					 	$.cookie("phone_",phone,{expires: 7, path: '/' });
					$("#yanzm").attr("disabled", false);
					$('#send_pwd').click(function() {
						var flag = 0;
						getTime($(this));
						$.ajax({
							type: 'get',
							url: 'http://192.168.0.21:20884/accountQuery/sendCode',
							data: {
								'number': phone,
								'type': 4
							},
							dataType: 'json',
							success: function(data) {
								$('.bundBtn').removeAttr('disabled').css("background", "#69e2b3"); //按钮激活
								$('.bundBtn').click(function() {
									$.ajax({
										type: "post",
										url: "http://192.168.0.21:20884/accountQuery/accountBundPhone",
										data: JSON.stringify({
											"accountId": accountIds,
											"code": data.msg,
											"phone": phone
										}),
										contentType: "application/json; charset=UTF-8",
										async: true,
										success: function(res) {
											window.location = "../app/numberSafe.html";
										},
										error: function() {
											console.log("验证码有误")
										}
									});

								})
							},
							error: function() {
								console.log("获取验证码失败")
							}
						});
					})
					//短信验证码发送end				 	
				} else {
					$('#tipS_number').show().html("手机号码有误，请重填").css("color", "#ff5094")
					$('.bundBtn').css("background", "#ccc").attr('disabled', 'disabled'); //按钮禁止	
				}
			} else {
				$('#tipS_number').show().html("手机号码必须为11位").css("color", "#ff5094");
				$('.bundBtn').css("background", "#ccc").attr('disabled', 'disabled'); //按钮禁止
			}
		}
	})

	//修改手机号码
	$('#changes_number').on('input PRopertychange', function() {
		var accountNub = localStorage.getItem('accountNub'); //获取手机号码
		if($(this).val() == accountNub) {
			$('#tipS_number').html("ok").css("color", "#69e2b3"); //提示语				
			$('#send_pwd').click(function() {
				var flag = 0;
				getTime($(this));
				$.ajax({
					type: 'get',
					url: 'http://192.168.0.21:20884/accountQuery/sendCode',
					data: {
						'number': accountNub,
						'type': 2
					},
					dataType: 'json',
					success: function(data) {
						console.log(data.msg)
						if(data.status == '1') {
							$('.gaimimaBtn').removeAttr('disabled').css("background", "#69e2b3"); //按钮激活
							$('.gaimimaBtn').click(function() {
								$.ajax({
									type: "get",
									url: "http://192.168.0.21:20884/accountQuery/checkCode",
									data: {
										'number': accountNub,
										'code': data.msg
									},
									async: true,
									success: function(res) {
										if(res.status == "1") {
											window.location = "../app/changMima.html";
										} else {
											alert("验证码错误");
										}
									},
									error: function() {
										console.log("验证码有误")
									}
								});

							})
						}
					},
					error: function() {
						console.log("验证码失败")
					}
				});
			})

		} else {
			$('.gaimimaBtn,.txNextBtn').css("background", "#ccc").attr('disabled', 'disabled'); //按钮禁止
			$('#tipS_number').show().html("手机号码不一致").css("color", "#ff5094");
		}
	})

	//	判断密码
	function passWord(pass) {
		if(pass.length == "") {
			$("#tipS_number").show().html("你的密码不能为空").css("color", "#ff5094");;
			$(".sureBtn").removeAttr('disabled').css("background", "#69e2b3"); //按钮禁止
			return false;
		};
		var reg = /^(?=[`~!@#\$%\^&*\(\)\-_=\+\\\|\[\]\{\}:;\"\',.<>\/\?\d]*[a-zA-Z]+)(?=[a-zA-Z`~!@#\$%\^&*\(\)\-_=\+\\\|\[\]\{\}:;\"\',.<>\/\?]*\d+)[`~!@#\$%\^&*\(\)\-_=\+\\\|\[\]\{\}:;\"\',.<>\/\?\w]{6,20}$/;
		if(!reg.test(pass)) {
			$("#tipS_number").show().html("你的密码不满足要求,不能为纯数字").css("color", "#ff5094");;
			$(".sureBtn").removeAttr('disabled').css("background", "#69e2b3"); //按钮禁止

			return false;
		} else {
			$("#tipS_number").hide();

		}
	}
	$("#onePassword").change(function() {
		passWord($("#onePassword").val());
	})
	//	   $("#twoPassword").change(function(){
	//	  		passWord($("#twoPassword").val());
	//	  })	
	$("#twoPassword").on('input PRopertychange', function() {
		if($("#onePassword").val() != $("#twoPassword").val()) {
			$("#tipS_number").show().html("两次密码不一致,请重新输入").css("color", "#ff5094");;
			$(".sureBtn").attr("disabled", true).css("background", "#ccc");
		} else {
			$("#tipS_number").show().html("ok").css("color", "#69e2b3");
			$(".sureBtn").removeAttr('disabled').css("background", "#69e2b3");
		};
	});
	//	点击修改按钮
	$(".sureBtn").click(function() {
		var accountNub = localStorage.getItem('accountNub'); //获取手机号码
		$.ajax({
			url: 'http://192.168.0.21:20884/accountManagement/upUser',
			type: 'post',
			data: JSON.stringify({
				'account': accountNub,
				'password': $("#twoPassword").val()
			}),
			contentType: "application/json; charset=UTF-8",
			dataType: 'json',
			success: function(data) {
				if(data.status == "1") {
					window.location = "../app/numberSafe.html";
				} else {
					alert("修改失败")
				}

			}
		})

	})

	//	提现密码重置
	$('#changes_txnub').on('input PRopertychange', function() {
		var accountNub = localStorage.getItem('accountNub'); //获取手机号码
		if($(this).val() == accountNub) {
			$('#tipS_number').html("ok").css("color", "#69e2b3"); //提示语				
			$('#send_pwd').click(function() {
				var flag = 0;
				getTime($(this));
				$.ajax({
					type: 'get',
					url: 'http://192.168.0.21:20884/accountQuery/sendCode',
					data: {
						'number': accountNub,
						'type': 2
					},
					dataType: 'json',
					success: function(data) {
						console.log(data.msg)
						if(data.status == '1') {
							$('.txNextBtn').removeAttr('disabled').css("background", "#69e2b3"); //按钮激活
							$('.txNextBtn').click(function() {
								$.ajax({
									type: "get",
									url: "http://192.168.0.21:20884/accountQuery/checkCode",
									data: {
										'number': accountNub,
										'code': data.msg
									},
									async: true,
									success: function(res) {
										if(res.status == "1") {
											window.location = "../app/changTxMima.html";
										} else {
											alert("验证码错误");
										}
									},
									error: function() {
										console.log("验证码有误")
									}
								});

							})
						}
					},
					error: function() {
						console.log("验证码失败")
					}
				});
			})

		} else {
			$('.gaimimaBtn,.txNextBtn').css("background", "#ccc").attr('disabled', 'disabled'); //按钮禁止
			$('#tipS_number').show().html("手机号码不一致").css("color", "#ff5094");
		}
	})
	
	$("#txPassword").change(function() {
		passWord($("#txPassword").val());
	})
	$("#txTwoPassword").on('input PRopertychange', function() {
		if($("#txPassword").val() != $("#txTwoPassword").val()) {
			$("#tipS_number").show().html("两次密码不一致,请重新输入").css("color", "#ff5094");;
			$(".txSureBtn").attr("disabled", true).css("background", "#ccc");
		} else {
			$("#tipS_number").show().html("ok").css("color", "#69e2b3");
			$(".txSureBtn").removeAttr('disabled').css("background", "#69e2b3");
		};
	});
	//	点击提现修改按钮
	$(".txSureBtn").click(function() {
		var accountNub = localStorage.getItem('accountNub'); //获取手机号码
		$.ajax({
			url: 'http://192.168.0.21:20884/accountManagement/updatePayPass',
			type: 'post',
			data: JSON.stringify({"accountId":accountIds,"payPass":$('#txTwoPassword').val(),"account":accountNub}),
			contentType: "application/json; charset=UTF-8",
			dataType: 'json',
			success: function(data) {
				if(data.status == "1") {
					window.location = "../app/numberSafe.html";
//					$('#changeTxPw_').html("***");
				} else {
					alert("修改失败")
				}
			}
		})		
	})

	$('.log_off').click(function(){
		$('.ifra').show().html(
			'<div class="exit">'+
				+'<div>'
					+'<p class="reRouterGo" style="border-bottom: 1px solid lightgray;">立即退出账号</p>'
					+'<p class="reRouterCancel">取消</p>'
				+'</div>'				
		+'</div>')
		$('.reRouterCancel').click(function(){
			$('.ifra').hide()
		})
		$('.reRouterGo').click(function(){
			$.ajax({
				type:"post",
				url:"http://192.168.0.21:20884/accountManagement/logout",
				async:true,
				data:JSON.stringify({
					"accountId":accountIds
				}),
				contentType: "application/json; charset=UTF-8",
				success:function(res){
					$.removeCookie('accountId', { path: '/' });
					window.location="/home/index.html";
				},error:function(){
					console.log(accountIds)
				}
			});
			
		})
		
	})