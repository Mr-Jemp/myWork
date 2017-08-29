angular.module('myApp', ["Footer", "commonConfig"])
	/**
		.factory("locals",function($window){
				return{        //存储单个属性
			        set :function(key,value){
			          $window.localStorage[key]=value;
			        },        //读取单个属性
			        get:function(key,defaultValue){
			          return  $window.localStorage[key] || defaultValue;
			        },        //存储对象，以JSON格式存储
			        setObject:function(key,value){
			          $window.localStorage[key]=JSON.stringify(value);
			        },        //读取对象
			        getObject: function (key) {
			          return JSON.parse($window.localStorage[key] || '{}');
			        } 
			    }
			})
	**/
	.controller("myController", [
		"$scope",
		"$location",
		"footer",
		"$http",
		function($scope, $location, footer, $http) {
			var accountIds=$.cookie("accountId");
			if(document.cookie.match(/accountId/)) { //判断是否存在accountId
				console.log('jjj')
				$http({  
					method: 'post',
					url: 'http://192.168.0.21:20882/userManage/getTeacherPersonalInfo',
					data: JSON.stringify({
						"accountId": accountIds,
					}),
					contentType: "application/json; charset=UTF-8",
				}).then(function(req) {
					$scope.req = req.data.msg;
					console.log($scope.req)
				})
				/*签到部分*/
				$.ajax({
					type: "get",
					url: "http://192.168.0.21:20889/accountSignFacade/getAccountSignById?uid=20889",
					async: true,
					success: function(data) {
						console.log(data)
						$scope.$apply(function() {
							$scope.isSignDay = function() {
								if(data.msg == false) {
									return "签到";
								} else {
									return "已签到";
								}
							}
						})

						$('.qiandao>a').click(function() {
							var _this = $(this);
							if(_this.html() == "签到") {
								$.ajax({
									type: "get",
									url: "http://192.168.0.21:20889/accountSignFacade/addAcountSign?uid=20889",
									async: true,
									success: function(res) {
										console.log(res)
										if(res.msg == true) {
											$('.ifra').show().html("<div class='upPop'>签到成功</div>");
											$('.ifra').fadeIn("slow", function() {
												$('.ifra').fadeOut("slow");
											})
											window.location.reload();
										} else {
											console.log(_this)
											_this.html("已签到");
											console.log("已签到")
										}

									},
									error: function(res) {
										
									}
								});
							}else if(_this.html() == "已签到"){
								
//								$('.ifra').show().html("<div class='upPop'>签到失败</div>");
//									$('.ifra').fadeIn("slow", function() {
//										$('.ifra').fadeOut("slow");
//									})
							}

						})

					}

				});
				$http.get("http://192.168.0.21:20889/accountSignFacade/getCountForMothById?uid=20889").then(function(res) {
					$scope.isDays = res.data.msg;
					console.log($scope.isDays)
				}).catch(function() {

				})
			}
			$("#feedbackS").on('click', function() {
				$("#feedbackPage").show();
				$("#setUp").hide();
			})
			$("#gosetup").on('click', function() {
				$("#setUp").show();
				$("#feedbackPage").hide();
			})

			//	$scope.lookOrder=function(index){
			//		locals.set("username",index);	
			////		 $location.url('/'+index);  
			//		 
			//	}
			//	var liCorol=function(){
			//		$('.navigation ul li:eq(0) a img').attr({"src":"images/index1.png"});
			//		$('.navigation ul li:eq(1) a img').attr({"src":"images/jiaoyan1.png"});
			//		$('.navigation ul li:eq(2) a img').attr({"src":"images/banji1.png"});
			//		$('.navigation ul li:eq(3) a img').attr({"src":"images/wenhua1.png"});
			//		$('.navigation ul li:eq(4) a img').attr({"src":"images/wo1.png"});		
			//	}
			//	var imgcorol=['images/index2.png',"images/jiaoyan2.png","images/banji2.png","images/wenhua2.png","images/wo2.png"]
			//	$('.navigation ul li').click(function(){
			//		liCorol();
			//		console.log($(this).find('p').siblings())
			//		$(this).find('p').addClass('greenCrol');
			//		$(this).siblings().find('p').removeClass('greenCrol');
			//		$('.navigation ul li:eq('+$(this).index()+') a img').attr({'src':imgcorol[$(this).index()]});
			//	})
			//	$('.navigation ul li').mouseover(function(){
			//		liCorol();
			//		$(this).find('p').addClass('greenCrol');
			//		$(this).siblings().find('p').removeClass('greenCrol');
			//		$('.navigation ul li:eq('+$(this).index()+') a img').attr({'src':imgcorol[$(this).index()]});
			//	})	

		}
	])