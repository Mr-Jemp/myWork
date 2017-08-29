$(function(){
//	随机产生getOrderId的字符串
	function getOrderId(){
		var getOrderId=new Date().getTime()+Math.random().toString(16).substr(2);
		console.log(getOrderId);
		return getOrderId;
	}

	
	//	点击li变色		
	changeClick('.recharge_cont ul li');	
	function changeClick(ele){
		$(ele).each(function(index){			
			$(ele).find('a').click(function(){					
				$(ele).find('a').eq(index).removeClass('corolmain');
				$(this).addClass('corolmain');									
			})				
		})
	}
	
//	充值积分
	$('input[type=checkbox]').click(function(){
		if($(this).is(":checked")==true){
			$(this).addClass("active");
				$('.recharge_Btn').show()			
		}else{
			 $(this).removeClass("active");
			 $('.recharge_Btn').hide()
		}
	})
	
	
	


	
	
})
