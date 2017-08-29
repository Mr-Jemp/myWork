
           function tab(){
           	$('.mycollect_top_b ul li').each(function(index,ele){
           		$('.mycollect_top_b ul li').click(function(){             	
                   var index=$(this).index();
                   $(this).addClass('topBul').siblings().removeClass('topBul');
                   $(".mycollect_con_ul").eq(index).addClass('on').siblings().removeClass('on');
               });
           	})              
           }
        tab();
// 		点击编辑时事件
		$('.top_a_ri').click(function(){			
			if($(this).html()=="编辑"){
					$('.bo_img_a input').show();
					$('.mycollect_btn').show();
					$('.mycollect_btn').click(function(){
						$('.bo_img_a input').removeClass("active");
					})
					$(this).html("全选");
					$(this).click(function(){
						$('.bo_img_a input').addClass("active");
					})
					$('.bo_img_a input').each(function(index){
						$(this).click(function(){
							if($(this).is(":checked")==true){
								$(this).addClass("active");
							}else{
								$(this).removeClass("active");
							}
						})
					})
					$(this).prev().prev().html("取消");
			}
			if($('.top_a_le').html()=="取消"){
				$('.top_a_le').click(function(){
					$('.bo_img_a input').hide()
					$('.mycollect_btn').hide();
					$(this).html('<img src="../images/icon_fanhui.png" />');
					$('.top_a_ri').html("编辑")
				})
			}else{
				history.go(-1);
			}
					
		})			
	
