
		angular.module("addressApp", ["commonConfig"]).
		controller("addreController", ['$scope', '$http', function($scope, $http) {
			
			$scope.yanNub=function(mobile){
				var myreg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,2,3,5-9]))\\d{8}$/;
				if(mobile.length==0)  
		        {  
		           alert('请输入手机号码！');  
		           return false;  
		        }      
		        else if(mobile.length!=11&&!myreg.test(mobile))  
		        {  
		            alert('请输入有效的手机号码！');  
		            return false;  
		        }  
			}
			
			$http.get("http://192.168.0.21:20880/addressFacade/getAllAddress?uid=1").then(function(res){
				$scope.addr = res.data.msg;
				console.log($scope.addr)
				$scope.activeEd;  //标志默认地址
				$scope.inputCorol=function(ev,idv,idDfuv){
					if(idDfuv==true){
						$(ev.target).attr("disabled",true);
					}else{
						$(ev.target).attr("disabled",false);
						if($(ev.target).is(".active")){
							$(ev.target).removeClass("active");
							$scope.activeEd=false;
							
						}else{
							$(ev.target).addClass("active");
							$scope.activeEd=true;
							$http.get('http://192.168.0.21:20880/addressFacade/updateIsDefaultAddressById?uid=1&&id='+idv).then(function(ress){
								console.log($scope.activeEd)
							}).catch(function(){
								console.log("设置默认地址失败")
							})
						}
						
					}
					
				}
				$scope.addEadit = function(ids,indx) { //编辑地址					
					$('.address_cont,.myAddress').hide();
					$('.address_eadit').show();
					$('.add_addr').html("保存地址")
					$http.get("http://192.168.0.21:20880/addressFacade/getById?id=" + ids).then(function(res) {
						console.log(res);						
						$scope.addEad = res.data.msg;
						$scope.addErea = function() {
							if($('.add_addr').html() == "保存地址") {
								if($('.sName').val().length==0||$('.down_show').html().length==0||$('.sNum').val()==""||$('.sAddre').val().length==0){
									return;
								}else{
									
									$.ajax({
										type: "get",
										url: "http://192.168.0.21:20880/addressFacade/updateAddress",
										async: true,
										data: {
											'id': ids,
											'receiverName': $('.sName').val(),
											'phone': $('.sNum').val(),
											'cityAddress': $('.down_show').html(),
											'detailedAddress': $('.sAddre').val(),
											'isDefault':$scope.activeEd
										},
										success: function(dat) {
											console.log(dat)
											$('.myAddress').show();
											$('.address_cont,.address_eadit').hide();
											$('.add_addr').html("添加新地址")
											window.location.reload()
										},
										error: function() {
											console.log("保存地址失败")
										}
									})
								}
							}
						}
					}).catch(function() {

					})
				}
				$scope.delAddress = function(ids) { //删除地址
					$.ajax({
						type: "get",
						url: "http://192.168.0.21:20880/addressFacade/delAddressById?uid=1&&id=" + ids,
						async: true,
						success: function(res) {
							console.log(res)
							window.location.reload()
						},
						error: function() {
							console.log("删除失败")
						}
					})
				}
				$scope.inInp;
				$scope.inpAddcor=function(ev){
					if($(ev.target).is(".active")){
						$(ev.target).removeClass("active");
						$scope.inInp=false;
					}else{
						$(ev.target).addClass("active");
						$scope.inInp=true;
					}
				}
				$('.add_addr').click(function() {
					if($(this).html() == "添加新地址") {

						$(this).html("保存新地址")
						$('.myAddress,.address_eadit').hide();
						$('.address_cont').show();
					} else if($(this).html() == "保存新地址") {
//						if($('.addName').val().length==0||$('.down_show').html().length==0||$('.addNum').val()==""||$('.sAddre').val().length==0){
//							console.log($scope.inInp)
//							return;
//						}else{	
							$.ajax({
								type: "get",
								url: "http://192.168.0.21:20880/addressFacade/addAddress",
								data: {
									'uid': 1,
									'receiverName': $('.addName').val(),
									'phone': $('.addNum').val(),
									'cityAddress': $('.down_show').html(),
									'detailedAddress': $('.sAddre').val(),
									'isDefault':$scope.inInp
								},
								success: function(res) {
									console.log(res)
									$(this).html("添加新地址")
									$('.myAddress').show();
									$('.address_cont,.address_eadit').show();
									window.location.reload()
								},
								error: function() {
									console.log("报错")
								}
							});
//						}
						

					}
				})
				$scope.addCorol=function(index,even,idd,isDefau){					
					$http.get('http://192.168.0.21:20880/addressFacade/updateIsDefaultAddressById?uid=1&&id='+idd).then(function(ress){
						console.log(ress)
					}).catch(function(){
						console.log("设置默认地址失败")
					})
					console.log($(even.target).parent().parent().parent());
					$(even.target).next().addClass('corBlue').parent().parent().parent().siblings().find('label').removeClass('corBlue')
					$(even.target).addClass("active").parent().parent().parent().siblings().find('input').removeClass('active')
				}
			})

			//			$scope.text = "添加新地址";
			var addCon = [];
			localStorage.setItem("signCon", addCon);

			$scope.isCloseErea = function() {
				$('.ifra').show()
			}

			//	选择省份
			var ulHtml = "";
			var liHtml = "";
			var title = $('.chooseCity p');
			getArea();

			function getArea() {
				$.ajax({
					type: "get",
					url: "../js/province.json",
					async: true,
					success: function(res) {

						for(var i = 0; i < res.length; i++) {
							liHtml = "<li class='" + res[i].name + "'>" + res[i].name + "</li>";
							ulHtml += liHtml;
						}
						
						$(".box ul").html(ulHtml);
						$(".box ul li").each(function(ind) {
							$(".box ul li").eq(ind).click(function() {
								title.html($(this).attr("class"));
								getCity(res, $(this).index());
							})
						})

					}
				})
			}
			//获取城市列表方法
			function getCity(re, _this) {
				//先清空内容
				ulHtml = "";

				for(var j = 0; j < re[_this].city.length; j++) {
					console.log(re[_this].city[j].name)

					liHtml = "<li class='" + re[_this].city[j].name + "'>" + re[_this].city[j].name + "</li>";
					ulHtml += liHtml;

				}
				$(".box ul").html(ulHtml);
				$(".box ul li").each(function(ind) {
					$(".box ul li").eq(ind).click(function() {
						title.html(title.html() + $(this).attr("class"));
						var areaS = re[_this].city[$(this).index()].area;
						console.log(areaS)
						ulHtml = "";
						for(var k = 0; k < areaS.length; k++) {
							console.log(areaS[k])
							liHtml = "<li class='" + areaS[k] + k + "'>" + areaS[k] + "</li>";
							ulHtml += liHtml;
						}
						$(".box ul").html(ulHtml);
						getDistrict();
					})
				})

			};
			//获取区列表方法
			function getDistrict() {
				$(".box ul li").each(function(ind) {
					$(".box ul li").eq(ind).click(function() {
						title.html(title.html() + $(this).html());
						$('.address_title_ssq .down_show').html(title.html()); //显示地址
						resetAdd(); //重置地址
						$('.ifra').hide();
					})
				})
			}
			//点击重置按钮恢复默认
			$(".reset").on("click", function() {
				resetAdd();
			})
			$(".chooseDel").click(function() {
				$('.ifra,.chooseCity').hide();
			})
			//重置内容
			function resetAdd() {

				ulHtml = "";
				//从新获取数据
				getArea();
			}

			//	选中默认事件
			$('#mrinput').click(function() {
				if($(this).hasClass('active')) {
					console.log("移除")
					$(this).removeClass("active").next().removeClass('corBlue');
				} else {
					$(this).addClass("active").next().addClass("corBlue");
					
				}
			})
			
		}])
