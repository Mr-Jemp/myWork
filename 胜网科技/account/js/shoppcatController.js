angular.module('shoppCat', ["commonConfig"]).
controller("shoppCatController", ["$scope", '$window', '$filter','$http', function($scope, $window, $filter,$http) {
		//	返回上一页
		var idss=[];
		
		$scope.goBack = function() {
			//		alert(455)
			$window.history.back();
		}

//		展示数据获取
		$http.get("http://192.168.0.206:20884/buyerCartFacade/getAllBuyerCart").success(function(respoen){
			$scope.dataList=respoen;
			console.log($scope.dataList);
			
		})
//		删除获取
		
		
//总价格的计算  
		$scope.allPrices = function() {
			angular.forEach($scope.dataList, function(data, index, array) {
				data.price = data.amount * data.oneprice;
				if(data.Bol == true) {
					$scope.allprice += parseInt(data.price);
				}
			})
			return $scope.allprice;
		};
//		总价格的计算  
		$scope.jisuan=function(){
			var op=0;
			for(var i=0;i<$scope.dataList.length;i++){
				op+=parseInt($scope.dataList[i].price)*parseInt($scope.dataList[i].amount);
			}
			
			return op;
		};
//		总数量
		$scope.shuliang=function(){
			var op=0;
			for(var i=0;i<$scope.dataList.length;i++){
				if($scope.dataList[i].Bol){
					op+=parseInt($scope.dataList[i].amount);
				}
			}
			
			return op;
		};
		$scope.cheCltrue=function(){
			var op=0;
			for(var i=0;i<$scope.dataList.length;i++){
				if($scope.dataList[i].Bol){
					op+=parseInt($scope.dataList[i].price)*parseInt($scope.dataList[i].amount);
				}
			}
			return op;
		}				
		$scope.cheClick=function(e){
			$scope.c[e].Bol=!$scope.dataList[e].Bol;
			var onecheck=$('.shoppCat_cont').find('input[type=checkbox]');
			onecheck.each(function(iin,elel){
				if(onecheck.eq(iin).is(":checked")!=true){
					console.log($("#allChoose"))
					$(".allChoose").prop('checked', false); 
				}				
					
			})
			
		}
		$scope.ifpa=false;
		$scope.quanxuan=function(){
			for(var i=0;i<$scope.dataList.length;i++){
				$scope.dataList[i].Bol=!$scope.ifpa;
				console.log($scope.dataList[i].Bol)
			}
			$scope.ifpa=!$scope.ifpa;
		}
		
	}]).
//	全选，全不选  
directive('allOrcan', function() {
		return function(scope, element, attr) {
			element.click(function() {
				//	判断选中
				var isCheck = $(this).prop('checked');
				if(isCheck) {
					//alert(55)
					$('input[type=checkbox]').prop('checked', true);
				} else {
					$('input[type=checkbox]').not($('input[type=checkbox]').eq(0)).prop('checked', false);
				}
				angular.forEach(scope.dataList, function(data, index, array) {
					data.Bol = isCheck;
				})

			})
		}
	}).
	//单选  
//directive('oneCheck', function() {
//		return function(scope, element, attr) {
//			element.click(function() {
//				var This = this;
//				angular.forEach(scope.dataList, function(data, index, array) {
//					if(attr.items == data.items) {
//						var isCheck = $(This).prop('checked');
//						data.Bol = isCheck;
//
//					}
//				})
//			});
//		}
//	}).
	//购物车  加  
directive('myAdds', function() {
		return {
			
			link: function(scope, element, attr) {
				
				element.click(function() {
					
					var This = this;
					
					angular.forEach(scope.dataList, function(data, index, array) {
						if(attr.id == data.id) {
							data.amount = parseInt(data.amount) + 1;
							scope.jisuan();
							scope.shuliang();
							scope.$apply() //刷新视图  
						}

					});
				});
			}
		}
	}).
	//购物车  减  
directive('myMinus', function() {
	return {
		link: function(scope, element, attr) {
			element.click(function() {

				var This = this
				angular.forEach(scope.dataList, function(data, index, array) {

					if(attr.id == data.id) {

						if(data.amount <= 1) {

							if(confirm('是否删除该产品')) {
								data.amount = 0;
								$(This).siblings('input').val(0);
								scope.shuliang();
								scope.jisuan();
								scope.$apply();
								scope.dataList.splice(index, 1)
								$(This).parents('tr').remove();
							}

						} else {
							data.amount = parseInt(data.amount) - 1;
						};
						scope.shuliang();						
						scope.jisuan();
						scope.$apply();
					}
				});
			});
		}
	}
})