	

	//	当前地址
	var sourcePath = window.location.href;
	var realPath = encodeURI(sourcePath.split('#')[0]);

	$.ajax({
		type: "get",
		url: 'https://www.caijinquan.cn/share/getMicroMsgInfoCrossDomain.action',
		callbackParameter: "callback",
		success: function(res) {
			console.log(res)
		}
	})

	//调用微信接口
	//		wx.config({
	//			debug: false, //调式模式，设置为ture后会直接在网页上弹出调试信息，用于排查问题
	//			appId: ,
	//			timestamp: ,
	//			nonceStr: ',
	//			signature: ,
	//			jsApiList: [ //需要使用的网页服务接口
	//				'checkJsApi', //判断当前客户端版本是否支持指定JS接口
	//				'chooseWXPay',//调用微信支付接口
	//				'onMenuShareTimeline', //分享给好友
	//				'onMenuShareAppMessage', //分享到朋友圈
	//				'onMenuShareQQ', //分享到QQ
	//				'onMenuShareWeibo' //分享到微博
	//			]
	//		});
	//		wx.error(function (res) {
	//			 alert(res.errMsg);  //打印错误消息。及把 debug:false,设置为debug:ture就可以直接在网页上看到弹出的错误提示
	//		});
	//	//ready函数用于调用API，如果你的网页在加载后就需要自定义分享和回调功能，需要在此调用分享函数。
	//			wx.checkJsApi({ //判断当前客户端版本是否支持指定JS接口
	//				jsApiList: [
	//					'chooseWXPay',
	//					'onMenuShareTimeline',
	//					'onMenuShareAppMessage',
	//					'onMenuShareQQ',
	//					'onMenuShareWeibo'					
	//				], // 需要检测的JS接口列表，所有JS接口列表见附录2,
	//				success: function(res) {
	//					// 以键值对的形式返回，可用的api值true，不可用为false
	//					// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
	//				}
	//			});

	

	//支付宝微信二选一		
	$("input[type='radio']").eq(0).addClass("active");
	$('input[type=checkbox]').prop("checked", true).addClass("active");
	$("input[type='radio']").each(function() {
		$(this).click(function() {
			if($(this).is(":checked") == true) {
				$(this).addClass("active")
				$("input[type='radio']").not($(this)).removeClass("active")
			}
		})
	})

	//	判断移动手机端	
	function IsPC() {
		var userAgentInfo = navigator.userAgent;
		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
		var flag = true;
		for(var v = 0; v < Agents.length; v++) {
			if(userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}
	var isPc = IsPC();
	if(isPc == true) {		//pc端
		console.log('pc端')
//		$('.recharge_Btn').ajaxStart(function(){
//			$('.ifra').show().html("<div class='upPop'>加载中</div>")
//		})
//		$('.recharge_Btn').ajaxStop(function(){
//			$('.ifra').hide();
//		})
		$('.recharge_Btn').on("click", function() {
			$(".recharge_Btn").off('click');
			$('.recharge_cont ul li a').each(function(index) {
				var txnAmt = $('.recharge_cont ul li a').eq(index).find('label').html(); //当前被点击套餐					
				if($('.recharge_cont ul li a').eq(index).hasClass("corolmain")) {
					if($(".weixin").hasClass("active")) { 	//调用微信接口							
						console.log('PC端的微信款接口')
						$.ajax({
							type: 'get',
							url: "http://192.168.0.21:20881/wechatFacade/wechatCode?order_price="+txnAmt*100,
							dataType: 'json',
							success: function(respone) {
								console.log(respone)
								$(".ifra").show().html("<img src='"+respone.msg+"' id='wechatImg'/>");
								$.ajax({   //充值积分
									type:"get",
									url:"http://192.168.0.21:20889/accountIntegralManagementFacade/addAccountIntegral?uid=20889&&money=0.01&&payValue=2",
									async:true,
									success:function(res){
										console.log(res)
									}
								});
							}
						})
					} else {								 //调用支付宝接口	
						$.ajax({
							type:"post",
							url:"http://192.168.0.21:20881/alipayFacade/instantArrivalAlipay?total_fee=0.01",
							async:true,
							success:function(res){
								window.location=res.msg;
								$.ajax({
									type:"get",
									url:"http://192.168.0.21:20889/accountIntegralManagementFacade/rechargeIntegral?uid=20889&&money=0.01&&payValue=2",
									async:true,
									success:function(res){
										alert("开始充值")
										//判断是否支付成功，返回页面
										$.ajax({
											type:"get",
											url:"http://192.168.0.21:20889/accountIntegralManagementFacade/addAccountIntegral?uid=20889&&money=0.01&&payValue=2",
											async:true,
											success:function(res){
												console.log(res)
//												window.location='../myintegal/intergalList.html'
											}
										});
									}
								});
								
//								
								
							}
						});
						console.log('PC端的支付宝接口')

					}
				}

			})
		})
		/*
		 提现模块
		 * */
		$('.toRMB_Btn ').click(function(){
			var toInter=$('#numberBox').val();//提现积分数
			var nameBox=$("#nameBox").val();//提现人名
			var accountBox=$('#accountBox').val();//提现账号
			console.log(toInter+nameBox+accountBox)
			if($(".weixin").hasClass("active")) { //调用微信接口
				console.log("微信接口")
			}else{
				
				console.log("支付宝")
			}
			
			$.ajax({
				type:"get",
				url:"http://192.168.0.21:20889/accountIntegralManagementFacade/subtractAccountIntegral?uid=20889&integral="+toInter+"&name="+nameBox+"&account="+accountBox+"&PayValue=2",
				async:true,
				success:function(res){
					console.log(res)
					alert(res.status)
				},
				error:function(res){
					alert(res.status)
				}
			});
		})
	} else {	//移动端
		console.log('移动端')
		//1.充值积分部分
		//	微信支付接口调用
		//	获取access_token      密钥接口 67e7cc83b966c6f6b3593bbcb162148f
		//			var w = window.open();
		//			$.ajax({
		//				type:"get",
		//	    		url:"http://192.168.0.21:20881/wechatFacade/appWechatCode",
		//	    		async:true,
		//				success:function(data){
		//					console.log(data)
		////					window.open=data;
		//				},
		//				error:function(data){
		//					console.log(data)
		//				}
		//			})	

		$('.recharge_Btn').on("touchstart", function() {
			$(".recharge_Btn").off('click');
			$('.recharge_cont ul li a').each(function(index) {

				if($('.recharge_cont ul li a').eq(index).hasClass("corolmain")) {
					if($(".zhifb").hasClass("active")) { //调用支付宝接口							
//						console.log(txnAmt)
						$.ajax({
							type: "post",
							url: "http://192.168.0.21:20881/alipayFacade/appAlipay",
							dataType: "json",
							success: function(res) {
								var appPay = res.msg;
								window.open = appPay;
								console.log(appPay)
								//									appPay=appPay.substring(appPay.indexOf("&")+1)  //返回第一个&字符串后面 的字符

								//									$.ajax({
								//										type: 'POST',
								//										url:"https://openapi.alipay.com/gateway.do"+appPay,
								//										dataType:"JSONP",
								//										success:function(res){
								//											console.log(res)
								//										}
								//									})
							},
							error: function(res) {}
						})

					} else { //调用微信接口
						//							$.ajax({
						//								type: 'post',
						//								url:"http://192.168.0.21:20881/wechatFacade/appWechatCode",
						//								success:function(res){
						////									window.open=res;
						//									console.log(res)
						//								}
						//							})	

						// 10.1 发起一个支付请求		\
						wx.chooseWXPay({
							timestamp: timechuo(),
							nonceStr: getANumber(),
							package: 'addition=action_id%3dgaby1234%26limit_pay%3d&bank_type=WX&body=innertest&fee_type=1&input_charset=GBK&notify_url=http%3A%2F%2F120.204.206.246%2Fcgi-bin%2Fmmsupport-bin%2Fnotifypay&out_trade_no=1414723227818375338&partner=1900000109&spbill_create_ip=127.0.0.1&total_fee=1&sign=432B647FE95C7BF73BCD177CEECBEF8D',
							paySign: 'bd5b1933cda6e9548862944836a9b52e8c9a2b69'
						});

						console.log('移动端微信接口')
						//				    $.ajax({
						//				        type: 'POST',
						//				        url: '/hims/api/commonPay/queryTransNo?access_token='+getUrlParam('access_token'),
						////						url:'https://api.mch.weixin.qq.com/pay/unifiedorder',
						//				        dataType:'json',
						//				        contentType:'application/json',
						//				        data: JSON.stringify(data),
						//				        success: function(Wxres){
						//				          if(!Wxres){
						//				            $.alert('服务器拥堵，请稍后访问')
						//				          }else{
						//				              console.log(Wxres);
						//				              if(Wxres.data.respCode == "fail"){
						//				                $.alert(Wxres.data.respMsg);
						//				              }else{
						//			//	                 10 微信支付接口
						//				                    // 10.1 发起一个支付请求
						//				                    // 注意：此 Demo 使用 2.7 版本支付接口实现，建议使用此接口时参考微信支付相关最新文档。
						//				                    var param = Wxres.data;
						//				                    wx.config({
						//				                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						//				                        appId: 'wx353790ba2b825ccd', // 必填，公众号的唯一标识
						//				                        timestamp: param.timestamp, // 必填，生成签名的时间戳
						//				                        nonceStr: param.noncestr, // 必填，生成签名的随机串
						//				                        signature: param.signJs,// 必填，调用js签名，
						//				                        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，这里只写支付的
						//				                    });
						//				                    wx.chooseWXPay({
						//				                        timestamp: param.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						//				                        nonceStr: param.noncestr, // 支付签名随机串，不长于 32 位
						//				                        package: "prepay_id="+param.transNo, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
						//				                        signType: "MD5", // 签名方式，默认为´SHA1´，使用新版支付需传入´MD5´
						//				                        paySign: param.sign, // 支付签名
						//				                        success: function (res) {
						//				                            if(res.errMsg == "chooseWXPay:ok"){
						//				                                //alert("支付成功");
						//				                                window.location.href  = "/hims/weixin/pages/Order_ok.html?access_token="+getUrlParam("access_token");
						//				                            }else{
						//				                                alert(res.errMsg);
						//				                            }
						//				                        },
						//				                        cancel: function(res){
						//				                            //alert(´取消支付´);
						//				                        }
						//				                    });
						//				                }
						//				            }   
						//				        },
						//				        error:function(data){
						//				            var msg =  data.message || data.status;
						//				           alert('服务器错误'+msg);
						//				        }
						//				    });   
						//				    return false;
					}
				}
			})
		})
	}