angular.module('feedbackApp',[]).
controller("feedbackController",["$scope",'$window',function($scope,$window){
//	返回上一页
		//处理留言
		$('.top_a_ri').click(function(){
			if($(this).html()=='提交'){
				if($('#face_back').html() == ""){
                    alert("留言内容不能为空！");
                    return;
                }
			}
		})
	
	$scope.message="";
	$scope.left=function($event){
		
		if($scope.message.length>400){
			if(confirm("字数已经超出400字")){
				return;
			}
		}else{			
			return $scope.message.length;
		}
		
	}
//	提交
	
}])