angular.module('activitiApp')  
.controller('show_formCtr', ['$rootScope','$scope','$http','$location','$state', function($rootScope,$scope,$http,$location,$state){  
    //创建模型
	$http.post("show_form.do").success(function(result){
		if(result.isLogin==="yes"){
			$rootScope.userName=result.userName;
		}else{
			$location.path("/login");
		}
	});
    
    }  
  
}])  