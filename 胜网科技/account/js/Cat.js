angular.module('shoppCatApp', ["commonConfig"]).
controller('shopcatControl', ['$scope', '$http', '$window', function($scope, $http, $window) {
	
	//		鼠标滚动固定导航
	$('.top_a_le img').click(function() {
		window.location.href = document.referrer;//返回上一页并刷新
	})
	$(window).scroll(function() {
		if($(document).scrollTop() >= 50) {
			$("header").addClass("fixednav");
		} else {
			$("header").removeClass("fixednav")
		}
	})
	
	$scope.goIndex=function(){
		window.location="../index.html";
	}
	
	
	//	数据获取
	var idss = [];

	$http.get("http://192.168.0.21:20880/buyerCartFacade/getAllBuyerCart?uid=1").then(function(response) {
		$scope.cart = response.data.msg;
		console.log($scope.cart)
		if($scope.cart==""){
			$(".no_product").show();
			$('.shop_cart_warp,.Settlement').hide();
		}else{
			$(".no_product").hide();
			$('.shop_cart_warp,.Settlement').show();
		}
	}).catch(function() {
		console.log("请求超时")

	})

	//清空购物车
	
	$scope.emptying = function() {
		console.log("清空")
		if($(".all_select").prop("checked") == true) {
			console.log("确定清空")

			$http.get("http://192.168.0.21:20880/buyerCartFacade/deleteByUid?uid=1").
			then(function(response) {
					console.log(response)
					$('.shop_con').empty();
					$(".no_product").show();
					$('.Settlement').hide();
			}).catch(function(){
			
			})
		}
	}

	// 点击全选按钮
	$(".all_select").click(function() {

		if($(this).prop("checked") == true) {
			//如果全选按钮被选中
			
			$(".select").prop('checked', true); //所有按钮都被选中
			$(".select").addClass('active');
			TotalPrice();
		} else {
			$(".select").prop('checked', false); //else所有按钮不全选
			$(".select").removeClass('active');
			TotalPrice();
		}
		$(".ShopCheck").change(); //执行店铺全选的操作
	});
	// 点击店铺按钮
	$(".ShopCheck").change(function() {
		if($(this).prop("checked") == true) { //如果店铺按钮被选中
			
			$(this).addClass('active');
			$(this).parents(".shop_name").siblings('.shop_product_list').find(".select").prop('checked', true); //店铺内的所有商品按钮也被选中
			$(this).parents(".shop_name").siblings('.shop_product_list').find(".select").addClass('active'); //店铺内的所有商品按钮也被选中
			if($(".ShopCheck").length == $(".ShopCheck:checked").length) { //如果店铺被选中的数量等于所有店铺的数量
				
				$("#all_select").prop('checked', true); //全选按钮被选中
				$("#all_select").addClass('active');
				TotalPrice();
			} else {
				$("#all_select").prop('checked', false); //else全选按钮不被选中
				$("#all_select").removeClass('active');
				TotalPrice();
			}
		} else { //如果店铺按钮不被选中
			$(this).removeClass('active');
			$(this).parents(".shop_name").siblings('.shop_product_list').find(".select").prop('checked', false); //店铺内的所有商品也不被全选
			$(this).parents(".shop_name").siblings('.shop_product_list').find(".select").removeClass('active'); //店铺内的所有商品也不被全选
			$("#all_select").prop('checked', false); //全选按钮也不被选中
			$("#all_select").removeClass('active'); //全选按钮也不被选中
			TotalPrice();
		}
	});

	var len = $('.shop_cart_warp').find('.shop_con').length;
	if(len != 0) {
		$('.Settlement').show();
		$('.no_product').hide();
	} else {
		$('.Settlement').hide();
		$('.no_product').show();
	}
	//  编辑事件 
	$('.shop_name .edit').click(function() {
		var edit = $(this).html();
		if(edit == '编辑') {
			$(this).html('完成');
			$(this).parent().siblings('.shop_product_list').find('.CommDescr').hide();
			$(this).parent().siblings('.shop_product_list').find('.delete').show();
		}
		if(edit == '完成') {
			$(this).html('编辑');
			$(this).parent().siblings('.shop_product_list').find('.delete').hide();
			$(this).parent().siblings('.shop_product_list').find('.CommDescr').show();
		}
	});

	//总价格的计算  
	function TotalPrice() {
		var allprice = 0; //总价
		var sumnum = 0; //总数
		$(".shop_con").each(function() { //循环每个店铺
			var oprice = 0; //店铺总价
			var shopnum = 0; //店铺商品总数
			$(this).find(".GoodsCheck").each(function() { //循环店铺里面的商品
				if($(this).is(":checked")) { //如果该商品被选中
					var add_jian_num = parseInt($(this).parents("li").find(".mmd_num").val()); //得到加减商品时改变的数量
					var html = $(this).parents("li").find(".product_num").html('X' + add_jian_num);
					var num = parseInt($(this).parents("li").find(".product_num").html().slice(1)); //得到商品的数量
					var price = parseFloat($(this).parents("li").find(".shop_price").html().slice(1)); //得到商品的单价
					var total = price * num; //计算单个商品的总价
					oprice += total; //计算该店铺的总价
					shopnum += num;
				}
				$(this).closest(".shop_con").find(".shop_total").val(oprice.toFixed(2)); //显示被选中商品的店铺总价
				$(this).closest(".shop_con").find(".shop_total").attr('data-value', shopnum); //显示被选中商品的店铺总数
			});
			var oneprice = parseFloat($(this).find(".shop_total").val()); //得到每个店铺的总价
			var sum = parseInt($(this).find(".shop_total").attr('data-value')); //得到每个店铺的商品的总数
			allprice += oneprice; //计算所有店铺的总价
			sumnum += sum; //计算所有店铺的总数
		});
		$(".Total").find('i').text('￥' + allprice.toFixed(2)); //输出全部总价
		$('.Sett').html('结算(' + sumnum + ')'); //输出全部商品总数
	}
	$scope.shopCon=[];
	$scope.cheClick = function(ev,item,indedx) {   //点击商品按钮
		var eve=$(ev.target);
		if(eve.prop('checked')){
			$scope.shopCon.push(item);
			
		}else{
			$scope.shopCon.sort().splice(indedx,1);
		}
		console.log($scope.shopCon)
		var onecheck = $('.shop_product_list li').find('input[type=checkbox]');
		onecheck.each(function(iin, elel) {
			var goods = $(this).closest("li").find(".GoodsCheck"); //获取本店铺的所有商品
			var goodsC = $(this).closest("li").find(".GoodsCheck:checked"); //获取本店铺所有被选中的商品
			var Shops = $(this).parent().parent().parent().siblings().find(".ShopCheck"); //获取本店铺的全选按钮
			if($(this).prop("checked") != true) {
				$(this).removeClass('active');
				$(this).prop('checked', false);
				$("#all_select").prop('checked', false); //else全选按钮不被选中
				$("#all_select").removeClass('active');
				Shops.prop('checked', false); //店铺全选按钮不被选中
				Shops.removeClass('active');
			} else {
				$(this).addClass('active');
				$(this).prop('checked', true);
				var Goodsleng = $(".GoodsCheck").length; //所有商品的数量
				var checkleng = $(".GoodsCheck:checked").length; ///被选中的商品的数量
				var thishop = $(this).closest('.shop_product_list').find('.GoodsCheck').length; //当前店铺的商品个数
				var checkshopleng = $(this).closest('.shop_product_list').find('.GoodsCheck:checked').length; //当前店铺下被选中的商品个数
				if(thishop != checkshopleng) {
					Shops.prop('checked', false); //店铺全选按钮不被选中
					Shops.removeClass('active');
				} else {
					Shops.prop('checked', true); //店铺全选按钮被选中
					Shops.addClass('active');
				}
				if(Goodsleng != checkleng) {
					$("#all_select").prop('checked', false); //else全选按钮不被选中
					$("#all_select").removeClass('active');

				} else {
					$("#all_select").prop('checked', true); //全选按钮被选中
					$("#all_select").addClass('active');

				}

			}
			TotalPrice();

		})

	}
	// 移除按钮事件
	$scope.removeShop = function(ind) {
		for(var bb in $scope.cart) {

			idss.push($scope.cart[bb].id);

		}
		
		for(var g in idss) {
			var onecheck = $('.shop_product_list li').find('.GoodsCheck');
			if(onecheck[g].checked == true) {
				//				onecheck[g].parentNode.parentNode.parentNode.removeChild(onecheck[g].parentNode.parentNode);
				//				TotalPrice();
				//				if($('.shop_product_list li').length == 0) {
				//					TotalPrice();
				//					alert(544)
				//					$('.shop_product_list').remove();
				//				}
				//	删除数据
				$http.get("http://192.168.0.21:20880/buyerCartFacade/delProductFromBuyerCartById?id=" + idss[ind]).
				then(function(res) {
					console.log(res)
					window.location.reload();
				}).catch(function() {

				})
				idss = [];

			}
		}

	}
	//点击结算	
	
	$('.Sett').click(function() {
//		var goodsC = $(".shop_product_list li").find(".GoodsCheck:checked"); //获取本店铺所有被选中的商品
		var bG,delId,bGamount="";
		
		for(var i = 0; i < $scope.shopCon.length; i++) {
			var buyGood=$scope.shopCon[i];			
//			$.cookie("accountId",buyGood);
//			console.log($.cookie("accountId"))
			bG+=buyGood.pid+',';
			delId+=buyGood.id+',';
			bGamount+=buyGood.amount+',';		
		}
		var amo = $(this).prev().find("i").html().split('￥').slice(1).toString();
		bG=bG.replace(/^undefined/, '');	
		bG=(bG.substring(bG.length-1)==',')?bG.substring(0,bG.length-1):bG;
		delId=delId.replace(/^undefined/, '');	
		delId=(delId.substring(delId.length-1)==',')?delId.substring(0,delId.length-1):bG;
		console.log(delId);
		bGamount=bGamount.replace(/^undefined/, '');
		bGamount=(bGamount.substring(bGamount.length-1)==',')?bGamount.substring(0,bGamount.length-1):bGamount;
		$.ajax({
				type: "get",
				url: "http://192.168.0.21:20880/orderFacade/addOrder",
				async: true,
				data: {
					'uid': 1,
					'payment': amo,
					'addressId':24,
					'pid': bG,
					'amount': bGamount	
					
				},
				success: function(res) {
					console.log(res)
					console.log(delId)

					$.ajax({
						type:"get",
						url:"http://192.168.0.21:20880/buyerCartFacade/delProductFromBuyerCartById?id="+delId,
						async:true,
						success:function(resu){
							console.log(resu)
							window.location = "../orderForm/go_pay.html?"+res.msg;						
						}
					});
					
				}
			});
 
	})

}]).
//购物车  加  
directive('myAdds', function() {
	return {

		link: function(scope, element, attr) {

			element.click(function() {

				var This = this;

				angular.forEach(scope.cart, function(data, index, array) {

					if(attr.id == data.id) {
						console.log(data.id)
						data.amount = parseInt(data.amount) + 1;
						$.ajax({
							type: "get",
							url: "http://192.168.0.21:20880/buyerCartFacade/updateCartFacadeById?id=" + data.id + "&&amount=" + data.amount,
							async: true,
							success: function(res) {
								console.log(res)
							}
						});
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
				angular.forEach(scope.cart, function(data, index, array) {
					if(attr.id == data.id) {
						if(data.amount <= 1) {
							return false;
						} else {
							data.amount = parseInt(data.amount) - 1;
							$.ajax({
							type: "get",
							url: "http://192.168.0.21:20880/buyerCartFacade/updateCartFacadeById?id=" + data.id + "&&amount=" + data.amount,
							async: true,
							success: function(res) {
								console.log(res)
							}
						});
						};
						scope.$apply();
					}
				})
			})
		}
	}
})