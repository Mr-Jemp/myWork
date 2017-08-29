angular.module('lessonApp',["commonConfig"]).
controller("lessonController",["$scope",function($scope){
				
		//		点击编辑处理
		var op=0;
		$('.top_a_le').click(function(){
			if(op=0){
				console.log(555)				
			}
			if(op=1){
				$('.noCollect').hide();
				$('.top_a_ri').html('编辑');	
				$(".tabcon_collect_input").hide();
				$('.top_a_le').html('<img src="../images/icon_fanhui.png" />');
				$('.top_a_le img').click(function(){
					history.go(-1);
				})
				op=0;
			}					
		})
		$('.top_a_ri').click(function(){
			var _this=$(this);
			$(".tabcon_collect_input input").click(function(){
				if($(this).is(":checked")==true){
					$(this).addClass("active");
				}else{
					$(this).removeClass("active");
				}
			})							
			
			if(op==0){			
				$(".tabcon_collect_input").show();
				$(".noCollect").show();
				_this.html('全选');	
				$('.top_a_le').html('取消');	
				
				op=1;
			}else if(op==1){
					$(".tabcon_collect_input input").addClass("active");
					_this.html('全不选');	
					op=2;	
			}else if(op==2){
					$(".tabcon_collect_input input").removeClass("active");
					_this.html('全选');
					op=1
			}
			
		})
		//完成状态
		$(".overTime").find("p").each(function(index){
			$(".overTime").find("p").eq(index).click(function(){
				console.log(index)
				$(this).next().toggle();
				$('.ifrass').toggle();
			})
		})
		
}])