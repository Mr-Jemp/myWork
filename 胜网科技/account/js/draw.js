	// 判断是不是移动设备
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i) ? true : false;
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i) ? true : false;
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i) ? true : false;
		},
		any: function() {
			return(isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
		}
	};

	var turnWheel = {
		rewardNames: [], //转盘奖品名称数组
		//		colors:"", //转盘奖品区块对应背景颜色
		outsideRadius: 192, //转盘外圆的半径
		textRadius: 155, //转盘奖品位置距离圆心的距离
		insideRadius: 68, //转盘内圆的半径
		startAngle: 0, //开始角度
		bRotate: false //false:停止;ture:旋转
	};

	var dat,
		pri, //礼品
		probabilitys; //概率	 
	var oddNum = $(".changeNumber").find("span"); //抽奖次数		
	// 图片信息
	var imgQb = new Image();
	imgQb.src = "../images/qb.png";
	var imgSorry = new Image();
	imgSorry.src = "../images/img_xinsui.png";

	// 模拟数据，可以Ajax请求服务器数据，添加大转盘的奖品与奖品区域背景颜色

	$.ajax({
		type: "get",
		url: "http://192.168.0.21:20889/lotteryPrizeFacade/selectPrize",
		data: null,
		async: false,
		dataType: "json", // 返回数据类型
		success: function(data) {
			dat = data;
			for(var i = 0; i < data.msg.length; i++) {
				pri += '"' + data.msg[i].prizeTitle + '",';

				pri = pri.replace(/^undefined/, '');
				//		       		
				//		        	turnWheel.colors = data["colors"];					
			}

			turnWheel.rewardNames = '[' + pri.slice(0, -1) + ']';
			turnWheel.rewardNames = JSON.parse(turnWheel.rewardNames); //转json格式

			console.log(turnWheel.rewardNames)
		},
		error: function(data) {
			alert("网络错误，请检查您的网络设置！");

			$("#tip").text("请求数据失败");
		}
	});

	//旋转转盘 item:奖品序号，从0开始的; txt：提示语 ,count 奖品的总数量;
	function rotateFunc(item, tip, count, id) {

		// 应该旋转的角度，旋转插件角度参数是角度制。
		var baseAngle = 360 / count;
		// 旋转角度 == 270°（当前第一个角度和指针位置的偏移量） - 奖品的位置 * 每块所占的角度 - 每块所占的角度的一半(指针指向区域的中间)
		angles = 360 * 3 / 4 - (item * baseAngle) - baseAngle / 2; // 因为第一个奖品是从0°开始的，即水平向右方向
		console.log(angles)
		$('#wheelCanvas').stopRotate();
		// 注意，jqueryrotate 插件传递的角度不是弧度制。
		// 哪个标签调用方法，旋转哪个控件
		$('#wheelCanvas').rotate({
			angle: 0, //初始旋转的角度数，并且立即执行
			animateTo: angles + 360 * 5, // 这里多旋转了5圈，圈数越多，转的越快
			duration: 1000, //指定使用animateTo的动画执行持续时间
			callback: function() { // 回调方法
				if(tip == "谢谢参与") {
					console.log("谢谢参与")
					$('.ifra,.popBg').show();
					$('.popBg').css("background-image", "url(../images/img_buzhongjiang.png)");
					$('.winImg img').attr("src", "../images/img_xinsui.png")
					$('.winTip').html("很遗憾没有中奖");
					$('.winGood').html("再来一次");
				} else {
					//	中奖弹出框
					$('.ifra,.popBg').show();
					$('.popBg').css("background-image", "url(../images/img_zhonjiang.png)");
					$('.winImg img').attr("src", "../images/img_touxiang.png")
					$('.winTip').html(tip);
					$('.winGood').html("领取");

				}
				//点击领取
				$('.winGood').click(function() {
					var msgL;
					var idList;//最后一个中奖纪录id
					$.ajax({
						type: "get",
						url: "http://192.168.0.21:20889/luckilyListFacade/luckliyForTime?uid=20889",
						async: true,
						success: function(data) {
							msgL = data.msg;
							console.log(data)
						}
					})
					oddNum.html(msgL);
					if($(this).html() == "再来一次") {
						$('.ifra,.popBg').hide()
					} else {
						if(id == "1") { //商品为积分时
							$.ajax({
								type: "get",
								url: "",
								async: true
							});
							$('.ifra').hide();
						} else if(id == "2") { //商品为话费时
							var getTel = '<p class="popTop">请填写手机号码<span class="del">X</span></p><div >' +
								'<form class="win_Telinput">' +
								'<span class="telNub">手机号码</span>' +
								'<input type="text" placeholder="请输入手机号码"/ id="telNuber">' +
								'<span id="win_getTel">确定提交</span>' +
								'</form>' +
								'</div>';

							$('.pop').show().html(getTel);
							$('#win_getTel').click(function() {
								$.ajax({
									type:"get",
									url:"http://192.168.0.21:20889/luckilyListFacade/selectLuckilyList?uid=20889",
									async:true,
									success:function(response){										
//										for(var i=0;i<response.msg.length;i++){
//											idList=response.msg[i];												
//										}
										idList=response.msg[0];
										if(idList.typeId=="2"){
											$.ajax({
												type: "get",
												url: "http://192.168.0.21:20889/lotteryReceiveFacade/addLotteryReceive",
												async: true,
												data: {
													'uid': '20889',
													'luckilyId': idList.id,
													'receivePhone': $('#telNuber').val(),
												},
												success: function(res) {
													console.log(res)
													if(res.msg) {
														$('.ifra,.pop').hide();
//														window.location.reload();
			
													}
												},
												error: function(resposen) {
													console.log("话费提交失败")
												}
			
											});
										}
									},
									error:function(response){
										console.log("话费提交失败")
									}
								})
								
							})
							//点击关闭填写信息
							$('.del').click(function() {
								$('.ifra,.pop').hide();
							})
						} else if(id == "3") { //商品为实物时
							var getGift = '<p class="popTop">填写领奖信息<span class="del">X</span></p>' +
								'<div ><form class="win_input">' +
								'<p class="clearfix">' +
								'<span>收货人</span>' +
								'<input type="text" placeholder="请输入收货人名字" id="win_name"/>' +
								'</p>' +
								'<p class="clearfix">' +
								'<span>手机号码</span>' +
								'<input type="text" placeholder="请输入手机号码" id="win_number"/>' +
								'</p>' +
								'<p class="clearfix">' +
								'<span>选择地区</span>' +
								'<select class="select" name="province" id="s1">' +
								'<option></option>' +
								'</select>' +
								'<select class="select" name="city" id="s2">' +
								'<option></option>' +
								'</select>' +
								'<select class="select" name="town" id="s3">' +
								' <option></option>' +
								'</select>' +
								'</p>' +
								'<p class="clearfix">' +
								'<span>详细地址</span>' +
								'<textarea placeholder="请填写详细地址" rows="2" class="win_address"></textarea>' +
								'</p>' +
								'<span id="win_getinfo">确定提交</span>' +
								'</form>' +
								'</div>';

							$('.pop').show().html(getGift);
							setup();

							function promptinfo() {
								var s1 = $('#s1').val();
								var s2 = $('#s2').val();
								var s3 = $('#s3').val();
								address = "" + s1 + s2 + s3;
								return address;
							}
							$('#win_getinfo').click(function() {
								var Name = $("#win_name").val(); //收货人
								var Number = $("#win_number").val(); //收货人号码
								var Address = $(".win_address").val(); //收货地址		
								var infoAcount = promptinfo() + " " + Address; //全部信息
								console.log(infoAcount)																								
								$.ajax({
									type:"get",
									url:"http://192.168.0.21:20889/luckilyListFacade/selectLuckilyList?uid=20889",
									async:true,
									success:function(response){										
										for(var i=0;i<response.msg.length;i++){
											idList=response.msg[i];												
										}
										console.log(idList.id)
										console.log(idList.typeId)
										if(idList.typeId=="3"){
											$.ajax({
												type: "get",
												url: "http://192.168.0.21:20889/lotteryReceiveFacade/addLotteryReceive",
												async: true,
												data: {
													'uid': '20889',
													'luckilyId': idList.id,
													'receiveName': Name,
													'receivePhone': Number,
													'receiveAddress': infoAcount
												},
												success: function(res) {
													console.log(res.msg)
													if(res.msg) {
														$('.ifra,.pop').hide();			
//														window.location.reload();
													}
												},
												error: function(resposen) {
													console.log("实物领取提交失败")
												}
			
											});
										}										
										
									},
									error:function(response){
										console.log("失败")
									}
								});
//								
							})
							//点击关闭填写信息
							$('.del').click(function() {
								$('.ifra,.pop').hide();
							})
						} else {

						}
						$('.popBg').hide();
					}

				})
				
				turnWheel.bRotate = !turnWheel.bRotate;
				if(isMobile.any()) // 判断是否移动设备
				{
					// 调OC代码
					window.location.href = "turntable://test.com?" + "index=" + item + "&tip=" + tip;
				}

			}
		});
	};

	// 抽取按钮按钮点击触发事件

	$('.pointer').click(function() {
		// 这里应该是从服务器获取用户真实的获奖信息（对应的获奖序号）
		// 简单模拟随机获取奖品的序号(奖品个数范围内)			
		// 开始抽奖
		$.ajax({
			type: "get",
			url: "http://192.168.0.21:20889/luckilyListFacade/luckliyDraw?uid=20889",
			async: true,
			success: function(res) {
				console.log(res)
				var item = (res.msg.id) - 1;
				var typeId = (res.msg.typeId);
					console.log(res.msg)
				if(res.msg =='noIntegral') { //判断当前积分					
					alert("没有积分")
				}else if(res.msg == false) {
					oddNum.html(0);
					alert('没有次数')
				} else {
					$.ajax({
						type: "get",
						url: "http://192.168.0.21:20889/luckilyListFacade/luckliyForTime?uid=20889",
						async: true,
						success: function(data) {
							console.log(data)
							oddNum.html(data.msg)
						}
					})
					if(turnWheel.bRotate) return;
					turnWheel.bRotate = !turnWheel.bRotate;
					var count = turnWheel.rewardNames.length;
					rotateFunc(item, turnWheel.rewardNames[item], count, typeId);
				}
			}
		})

	})

	//页面所有元素加载完毕后执行drawWheelCanvas()方法对转盘进行渲染
	window.onload = function() {
		drawWheelCanvas();
		$.ajax({
			type: "get",
			url: "http://192.168.0.21:20889/luckilyListFacade/luckliyForTime?uid=20889",
			async: true,
			success: function(data) {
				if(data.msg == "false") {
					$(".changeNumber").find("span").html("0");
				} else {
					$(".changeNumber").find("span").html(data.msg);
				}
			}
		})
	};

	/*
	 * 渲染转盘
	 * */
	function drawWheelCanvas() {

		// 获取canvas画板，相当于layer？？
		var canvas = document.getElementById("wheelCanvas");
		//    var canvas = ($("#wheelCanvas")).get()[0]; // 注意，jQuery获取的是包装过的对象，不是DOM对象,可以进行转换

		// 计算每块占的角度，弧度制
		var baseAngle = Math.PI * 2 / (turnWheel.rewardNames.length);
		// 获取上下文
		var ctx = canvas.getContext("2d");

		var canvasW = canvas.width; // 画板的高度
		var canvasH = canvas.height; // 画板的宽度
		//在给定矩形内清空一个矩形
		ctx.clearRect(0, 0, canvasW, canvasH);

		//strokeStyle 绘制颜色
		ctx.strokeStyle = "#FFBE04"; // 红色
		//font 画布上文本内容的当前字体属性
		ctx.font = '16px Microsoft YaHei';

		// 注意，开始画的位置是从0°角的位置开始画的。也就是水平向右的方向。
		// 画具体内容
		for(var index = 0; index < turnWheel.rewardNames.length; index++) {
			// 当前的角度
			var angle = turnWheel.startAngle + index * baseAngle;
			// 填充颜色
			if(index % 2 == 0) {
				ctx.fillStyle = "#febc06";
			} else {
				ctx.fillStyle = "#fff3d1";
			}

			// 开始画内容
			// ---------基本的背景颜色----------
			ctx.beginPath();
			/*
			 * 画圆弧，和IOS的Quartz2D类似
			 * context.arc(x,y,r,sAngle,eAngle,counterclockwise);
			 * x :圆的中心点x
			 * y :圆的中心点x
			 * sAngle,eAngle :起始角度、结束角度
			 * counterclockwise : 绘制方向,可选，False = 顺时针，true = 逆时针
			 * */
			ctx.arc(canvasW * 0.5, canvasH * 0.5, turnWheel.outsideRadius, angle, angle + baseAngle, false);
			ctx.arc(canvasW * 0.5, canvasH * 0.5, turnWheel.insideRadius, angle + baseAngle, angle, true);
			ctx.stroke();
			ctx.fill();
			//保存画布的状态，和图形上下文栈类似，后面可以Restore还原状态（坐标还原为当前的0，0），
			ctx.save();

			/*----绘制奖品内容----重点----*/
			// 红色字体
			ctx.fillStyle = "#E5302F";
			var rewardName = turnWheel.rewardNames[index];
			var line_height = 17;
			// translate方法重新映射画布上的 (0,0) 位置
			// context.translate(x,y);
			// 见PPT图片，
			var translateX = canvasW * 0.5 + Math.cos(angle + baseAngle / 2) * turnWheel.textRadius;
			var translateY = canvasH * 0.5 + Math.sin(angle + baseAngle / 2) * turnWheel.textRadius;
			ctx.translate(translateX, translateY);

			// rotate方法旋转当前的绘图，因为文字适合当前扇形中心线垂直的！
			// angle，当前扇形自身旋转的角度 +  baseAngle / 2 中心线多旋转的角度  + 垂直的角度90°
			ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);

			/** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
			// canvas 的 measureText() 方法返回包含一个对象，该对象包含以像素计的指定字体宽度。
			// fillText() 方法在画布上绘制填色的文本。文本的默认颜色是黑色. fillStyle 属性以另一种颜色/渐变来渲染文本
			/*
			 * context.fillText(text,x,y,maxWidth);
			 * 注意！！！y是文字的最底部的值，并不是top的值！！！
			 * */
			if(rewardName.length > 6) { //分行
				//				var rewardNames = rewardName.split('积分');
				var rewardNames = rewardName;
				for(var j = 0; j < rewardNames.length; j++) {
					ctx.font = (j == 0) ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei';
					console.log(rewardNames[j])
					if(j == 0) {
						ctx.fillText(rewardNames[j], -ctx.measureText(rewardNames[j]).width / 2, j * line_height);
					} else {
						ctx.fillText(rewardNames[j], -ctx.measureText(rewardNames[j]).width / 2, j * line_height);
					}
				}
			} else if(rewardName.indexOf("积") == -1 && rewardName.length > 6) { //奖品名称长度超过一定范围
				rewardName = rewardName.substring(0, 6) + "||" + rewardName.substring(6);
				var rewardNames = rewardName.split("||");
				for(var j = 0; j < rewardNames.length; j++) {
					ctx.fillText(rewardNames[j], -ctx.measureText(rewardNames[j]).width / 2, j * line_height);
				}
			} else {
				//在画布上绘制填色的文本。文本的默认颜色是黑色
				ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, 0);
			}

			//添加对应图标
			if(rewardName.indexOf("积分") > 0) {
				// 注意，这里要等到img加载完成才能绘制
				ctx.drawImage(imgQb, -15, 30);

			} else if(rewardName.indexOf("谢谢参与") >= 0) {
				ctx.drawImage(imgSorry, -15, 30, 28, 28);

			}
			//还原画板的状态到上一个save()状态之前
			ctx.restore();

			/*----绘制奖品结束----*/

		}
	}