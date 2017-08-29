angular.module("myorderApp", ["ui.router", "commonConfig"])
//	.service('data', function(){
//		var self = this;
//		var apiGetRes = 'sdfsdffdsf',
//			api = 
//		
//		self.getRes = fucntion(){
//			return $http.get(apier).then(function(){
//				return {
//					status: 0,
//					data: null
//				}
//			})
//		}
//		
//	})
	.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
		//		$locationProvider.hashPrefix('');
			var states = [{
				name: 'order',
				url: '/',
				templateUrl: "order.html",
				controller: function($scope, $http) {
					orser();

					function orser() {
						$http.get("http://192.168.0.21:20880/orderFacade/getOrder?uid=1").then(function(result) {
							$scope.data = result.data.msg;
							if($scope.data==""){
								var nos="<div class='nos'><img src='../images/icon_dingdan.png'/><p>您还没有相关的订单</p></div>"
								$('.orderConts').html(nos);							
							}

							$scope.getTotal = [];
							for(var i in $scope.data) {
								total = 0;
								for(var j in $scope.data[i].orderDetails) {
									total += $scope.data[i].orderDetails[j].amount;
								}
								$scope.getTotal.push(total);

							}
							$scope.ids = [];
							for(var i = 0; i < $scope.data.length; i++) {
								if($scope.data[i].payStatus == "待发货" || $scope.data[i].payStatus == "交易完成") {
									$scope.ids.push(i);
								}

							}

							$scope.payStatus = function(paySta, index) {
								$scope.btnBlack = function() {
									if(paySta == "待付款") {
										return "取消订单"
									} else if(paySta == "待发货") {

										return "详情"
									} else if(paySta == "待收货") {
										return "查看物流"
									} else if(paySta == "待评价") {
										return "删除订单"
									} else if(paySta == "交易完成") {
										return "申请售后"
									}
								}
								$scope.btnGreen = function() {
									if(paySta == "待评价") {
										return "评价"
									} else if(paySta == "待付款") {

										return "付款"
									} else if(paySta == "待收货") {
										return "确认收货"
									}
								}
								return paySta;
							}

						}).catch(function() {
							console.log("全部报错")
						})
					}
				}
			}, {
				name: 'notpay',
				url: '/notpay',
				templateUrl: "not_pay.html",
				controller: function($scope, $http) {
					$http.get("http://192.168.0.21:20880/orderFacade/getOrder?uid=1&&payStatus=待付款").then(function(result) {
						$scope.data = result.data.msg;
						if($scope.data==""){
								var nos="<div class='nos'><img src='../images/icon_dingdan.png'/><p>您还没有相关的订单</p></div>"
								$('.orderConts').html(nos);							
							}
						
						$scope.getTotal = [];
						for(var i in $scope.data) {
							total = 0;
							for(var j in $scope.data[i].orderDetails) {
								
								total += $scope.data[i].orderDetails[j].amount;
								
							}
							
							$scope.getTotal.push(total);
						}
						$scope.delFrom = function($event, delID,index) {
							$http.get("http://192.168.0.21:20880/orderFacade/delOrderById?id=" + delID).then(function(res) {
								console.log(res.data.msg)
								$scope.data.splice(index,1)
							}).catch(function() {
								console.log("取消订单失败")
							})
						}
						$scope.goPay = function(ids) {

						}
					}).catch(function() {
						console.log("待付款报错")
					})
				}
			}, {
				name: 'notgoods',
				url: '/notgoods',
				templateUrl: "not_goods.html",
				controller: function($scope, $http) {
					$http.get("http://192.168.0.21:20880/orderFacade/getOrder?uid=1&&payStatus=待发货").then(function(result) {
						$scope.data = result.data.msg;
						if($scope.data==""){
								var nos="<div class='nos'><img src='../images/icon_dingdan.png'/><p>您还没有相关的订单</p></div>"
								$('.orderConts').html(nos);							
							}
						$scope.getTotal = [];
						for(var i in $scope.data) {
							total = 0;
							for(var j in $scope.data[i].orderDetails) {
								
								total += $scope.data[i].orderDetails[j].amount;
								
							}
							
							$scope.getTotal.push(total);
						}
							
							console.log($scope.getTotal)
						$scope.detail = function(ids) {
							window.location = "goods_detail.html?" + ids;
						}
					}).catch(function() {
						console.log("待发货报错")
					})
				}

			}, {
				name: 'nottakes',
				url: '/nottakes',
				templateUrl: "not_takes.html",
				controller: function($scope, $http) {
					$http.get("http://192.168.0.21:20880/orderFacade/getOrder?uid=1&&payStatus=待收货").then(function(result) {
						$scope.data = result.data.msg;
						if($scope.data==""){
								var nos="<div class='nos'><img src='../images/icon_dingdan.png'/><p>您还没有相关的订单</p></div>"
								$('.orderConts').html(nos);							
							}
						$scope.getTotal = [];
						for(var i in $scope.data) {
							total = 0;
							for(var j in $scope.data[i].orderDetails) {
								
								total += $scope.data[i].orderDetails[j].amount;
								
							}
							
							$scope.getTotal.push(total);
						}
					}).catch(function() {
						console.log("待收货报错")
					})
				}
			}, {
				name: 'noteav',
				url: '/noteav',
				templateUrl: "not_eva.html",
				controller: function($scope, $http) {
					$http.get("http://192.168.0.21:20880/orderFacade/getOrder?uid=1&&payStatus=待评价").then(function(result) {
						$scope.data = result.data.msg;
						if($scope.data==""){
								var nos="<div class='nos'><img src='../images/icon_dingdan.png'/><p>您还没有相关的订单</p></div>"
								$('.orderConts').html(nos);							
							}
						$scope.getTotal = [];
						for(var i in $scope.data) {
							total = 0;
							for(var j in $scope.data[i].orderDetails) {
								
								total += $scope.data[i].orderDetails[j].amount;
								
							}
							
							$scope.getTotal.push(total);
						}
					}).catch(function() {
						console.log("评价报错")
					})
				}
			}]
			states.forEach(function(state) {
				$stateProvider.state(state);
			});

		//		 $urlRouterProvider.otherwise("/");  
	}])
	.controller('myorderCtrl', ["$scope", "$http", "$state", function($scope, $http, $state) {
		
		
		$scope.delFrom = function($event, delID,index) {
			var html_ = $($event.target).html();
			if(html_ == "取消订单") {
				$http.get("http://192.168.0.21:20880/orderFacade/delOrderById?id=" + delID).then(function(res) {
					console.log(res.data.msg)
					$scope.data.splice(index,1)
				}).catch(function() {

				})
			} else if(html_ == "删除订单") {
				$http.get("http://192.168.0.21:20880/orderFacade/updateOrderbyId?id=" + delID).then(function(res) {
					console.log(res.data.msg);
					$scope.data.splice(index,1)
				}).catch(function() {

				})
			} else if(html_ == "详情") {
				window.location = "goods_detail.html?" + delID;
			} else if(html_ == "申请售后") {
				window.location = "apply_customdetal.html?" + delID;
			}
		}
		$scope.getHtml = function(ev, idd) {
			var html_ = $(ev.target).html();
			if(html_ == "付款") {
				window.location = "go_pay.html?" + idd;
			} else if(html_ == "确认收货") {
				$("body").append("<div class='buyTip'><p class='buyTip_img'><img src='../images/icon_shouhuo1.png'/></p><p class='buyTip_text'>确定收货成功，如果商品有什么质量问题，7天内可以无条件退货</p></div>");
				$('.buyTip').fadeIn("normal", function() {
					$('.buyTip').fadeOut("normal");
				})
			} else if(html_ == "评价") {

				window.location = "notPingjia.html?" + idd;
			}
		}

		//	页面滚动单行置顶
		$(window).scroll(function() {
			//scrollTop()方法返回或设置匹配元素的滚动条的垂直位置
			var heardH = $(".mycollect_top_a").height();
			var top = $(this).scrollTop(); // 当前窗口的滚动距离
			if(top > heardH) {
				$(".mycollect_top_a").addClass('topCo');
				$(".come_top").fadeIn();
			} else {
				$(".mycollect_top_a").removeClass('topCo');
				$(".come_top").fadeOut()
			}
		});
		//返回顶部
		$(".come_top").click(function() {
			var speed = 200; //滑动的速度
			$('body,html').animate({
				scrollTop: 0
			}, speed);
			return false;
		});

		$scope.focus = function(name, index) {
			var aLinks = $('.top_bal');
			console.log(name)
			for(var i = 0; i < aLinks.length; i++) {
				console.log(aLinks.find('a').html())
				var oldClass = aLinks[i].className; //获得现在的样式
				aLinks[i].className = oldClass.split(' ')[0]; //删除聚焦样式
			}
			aLinks[index].className += " topBul"; //给当前应该聚焦的添加上聚焦
			$state.go(name, {}, {
				location: "replace"
			}) //跳转地址
		}

	}]).run(function($state) {
		$state.go('order');
	})

/**

	
	//	评价
	$('.pay_btn p').click(function(){
		window.location="../orderForm/notPingjia.html";
	})

	
	

	//	查看订单
	var idd=window.location.search;//接收上一个页面的id值
	idd=idd.split("=")[1];
//		console.log(idd)
	var amountS=0;//总件数

	$.ajax({
				type:"get",
				url:"http://192.168.0.17:20880/orderFacade/getOrder?id="+idd,
				success:function(res){
					console.log(res.msg)
					for(var i=0;i<res.msg.length;i++){
						amountS+=res.msg[i].amount;//总件数
						console.log(amountS);
						var lis="<div class='con_img_a'><img src='../images/img_touxiang.png' /></div><div class='con_img_b'><p class='con_con_a'>"
						+res.msg[i].name+"</p><p class='con_con_b'>"+res.msg[i].info+"</p><p class='con_con_c'><span>套餐类型:<label>套餐一</label></span><span>颜色<label>黄色</label></span></p><p class='con_con_d'><span class='d_a'><label class='d_a_red'>￥156.00</label><label class='d_a_blc'>  56.00</label></span><span class='d_b'>X"
						+res.msg[i].amount+"</span></p></div>"
					}
					$('.good_list_con').html(lis);
					$(".nopay_amounts").html(amountS);
				}
			})
	

	
	
//	申请售后的事件
	$("input[type=checkbox]").click(function(){
		if($(this).is(":checked")==true){
			$(this).addClass("active")
		}else{
			$(this).removeClass("active")
		}
	})
	
//	售后退款事件
	$('.service_back ul li').click(function(index){
		var _this=$(this).index();
		$(".service_back_con ul").eq(_this).siblings().addClass('onblock');
         $(".service_back_con ul").eq(_this).removeClass('onblock')
		 $(".service_back ul li").find('a').removeClass("topBul");
          $(this).find('a').addClass("topBul");
          
         
	})
	
//	订单确认详情
	$('.pay_aoumt_btn .pay_btn_go ').click(function(){
		$('.ifra,.popBottom').show(500)
	})
	$('.del').click(function(){
		$('.ifra,.popBottom,.pop').hide(500)
	})
	$('.lipay_btn ').click(function(){
		$('.popBottom').hide()
		$('.pop').show()
	})
	
	//计算总价
	 function TotalPrice(){
		 var allprice = 0; //总价
       	 var sumnum = 0;//总数
       	 
	}
	//	确认订单加减
	$('.amount_boxBuy_a input').click(function(){
		var numval=$('.boxBuy_a_b').val();//原来数量
		var princ=$('.d_a_red').html().split('￥')[1];//单价
		var add=parseInt(numval)+1;
		var jian=parseInt(numval)-1;
		if($(this).val()=='+'){			
			$('.boxBuy_a_b').val(add);
			$('.d_b').html('X'+add);//数量
			$('.pay_aoumt_bb').find('label').html(add*princ+".00");//总价
		}else if($(this).val()=='-'){
			if(numval>=1){
				$('.boxBuy_a_b').val(jian);
				$('.d_b').html('X'+jian);//数量
				$('.pay_aoumt_bb').find('label').html(jian*princ+".00");//总价
			}		
		}				
		
	})
})

**/