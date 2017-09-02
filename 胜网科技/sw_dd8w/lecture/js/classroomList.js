$(function(){
	console.log(window.localStorage);
	var h=$(document).height();
	$('#index').height(h-100);
	var Imgs=['u1.png','u2.png','u3.png','u4.png','u5.png'];
	$(".image_a").mouseover(function(){
		$(this).attr("src","../images/footer/u1.png");
	}).mouseout(function(){
		$(this).attr("src","../images/footer/nav_home_default@2x.png");
	})
	$(".image_b").mouseover(function(){
		$(this).attr("src","../images/footer/u2.png");
	}).mouseout(function(){
		$(this).attr("src","../images/footer/nav_home_jy_default@2x.png");
	})
	$(".image_c").mouseover(function(){
		$(this).attr("src","../images/footer/u3.png");
	}).mouseout(function(){
		$(this).attr("src","../images/footer/nav_home_bj_default@2x.png");
	})
	$(".image_d").mouseover(function(){
		$(this).attr("src","../images/footer/u4.png");
	}).mouseout(function(){
		$(this).attr("src","../images/footer/nav_home_xywh_default@2x.png");
	})
	$(".image_e").mouseover(function(){
		$(this).attr("src","../images/footer/u5.png");
	}).mouseout(function(){
		$(this).attr("src","../images/footer/nav_home_my_default@2x.png");
	})
	
	$(".foot_li p").each(function(){
		$(this).hover(function(){
			$(this).css("color","#56c399");
		},function(){
			$(this).css("color","black")
		})
	})
	$(".ban-bk").click(function(){
		$(this).addClass('ban-mk').siblings().removeClass('ban-mk');
	})
	$(".ban-bk").mouseover(function(){
		$(this).addClass('ban-nk').siblings().removeClass('ban-nk');
	}).mouseout(function(){   
		$(this).removeClass('ban-nk')
	})
	$(".ban-r").click(function(){
		$(this).addClass('ban-c');
		$('.ifra').show()
		$("#teacher-class").css("display","block");
	})
	// 点击遮罩层隐藏
	$(".ifra").click(function(){
		$("#teacher-class").css("display","none");
		$(this).css("display","none");
	})
	$(".ban-r").mouseover(function(){
		$(this).addClass('ban-v')
	}).mouseout(function(){
		$(this).removeClass('ban-v');
	})
	// $(".main-l-h").each(function(){
	// 	$(this).click(function(){
	// 		$(this).addClass('main-l-z').siblings().removeClass('main-l-z')
	// 		$(this).next('ul.main-l-ul').slideToggle()
	// 	})
	// 	$(this).mouseover(function(){
	// 		$(this).addClass('main-l-g')
	// 	}).mouseout(function(){
	// 		$(this).removeClass('main-l-g')
	// 	})
	// })
	//	点击上课进去课堂
	
	$(".main-l-c").each(function(){
		$(this).children('div.main-l-h').click(function(){
			$(this).addClass('main-l-z');
			$(this).next().slideToggle();
			$(this).parent().siblings().children('div.main-l-h').removeClass('main-l-z');
		})
	})
	$(".main-l-h").each(function(){
		$(this).mouseover(function(){
			$(this).addClass('main-l-g');
		}).mouseout(function(){
			$(this).removeClass('main-l-g');
		})
	})
	// 跳转到编辑器页面
	$(".head-r").click(function(){
		window.location.href="index.html";
	})
	$(".glyphicon-edit").click(function(){
		window.location.href="index.html";
	})
	$(".glyphicon-a").click(function(){
		alert("暂不支持上传");
	})

})