		//适配移动端
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function(){
            var clientWidth = docEl.clientWidth;
            if(!clientWidth) return;
            if(clientWidth>=750){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth /750) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//底部栏切换图片
$(function(){
	var Imgs=['u1.png','u2.png','u3.png','u4.png','u5.png'];
	$(".image_a").mouseover(function(){
		$(this).attr("src","images/u1.png");
	}).mouseout(function(){
		$(this).attr("src","images/nav_home_default@2x.png");
	})
	$(".image_b").mouseover(function(){
		$(this).attr("src","images/u2.png");
	}).mouseout(function(){
		$(this).attr("src","images/nav_home_jy_default@2x.png");
	})
	$(".image_c").mouseover(function(){
		$(this).attr("src","images/u3.png");
	}).mouseout(function(){
		$(this).attr("src","images/nav_home_bj_default@2x.png");
	})
	$(".image_d").mouseover(function(){
		$(this).attr("src","images/u4.png");
	}).mouseout(function(){
		$(this).attr("src","images/nav_home_xywh_default@2x.png");
	})
	$(".image_e").mouseover(function(){
		$(this).attr("src","images/u5.png");
	}).mouseout(function(){
		$(this).attr("src","images/nav_home_my_default@2x.png");
	})
	
	
	$(".foot_li p").each(function(){
		$(this).hover(function(){
			$(this).css("color","#56c399");
		},function(){
			$(this).css("color","black")
		})
	})

})

//路由跳转

