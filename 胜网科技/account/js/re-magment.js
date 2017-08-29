angular.module('redesApp',[])
.controller('redesCtrl',["$scope","$http",function($scope,$http){
	$scope.videoW=$('.paly_top').width();
	$scope.videoH=$('.paly_top').height();
   $scope.curr_video_area='details';
     $scope.swDesNav=function(type){
        $scope.curr_video_area=type;

    }
    $("video").click(function(){
    	if($(this).prop("controls")){
    		$(this).removeAttr("controls");    		
    	}else{
    		$(this).attr("controls","controls");
    	}
    	
    })
}])



