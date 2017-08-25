angular.module('activitiApp')  
.controller('createCtr', ['$rootScope','$scope','$http','$location','$state', function($rootScope,$scope,$http,$location,$state){  
    //创建模型
	$http.post("createFlush.do").success(function(result){
		if(result.isLogin==="yes"){
			$rootScope.userName=result.userName;
		}else{
			$location.path("/login");
		}
	});
    $scope.createTo=function(activiti){
    	var url = './create.do',  
        data = activiti,  
        transFn = function(data) {  
            return $.param(data);  
        },  
        postCfg = {  
            headers: { 'Content-Type': 'application/x-javascript; charset=UTF-8'},  
            transformRequest: transFn  
        }; 
      //向后台提交数据
        $http.post(url, data).success(function(result){       
    	  console.log(result);
    	  $location.path("/modelList");
    	  window.open("http://localhost:8080/rapid_dev"+createResult.path+createResult.modelId);
      });

    }  
  
}])  