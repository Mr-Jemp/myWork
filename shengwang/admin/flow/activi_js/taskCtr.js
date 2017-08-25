angular.module('activitiApp')  
.controller('taskCtr', ['$rootScope','$scope','$http','$location','$state', function($rootScope,$scope,$http,$location,$state){  
$scope.init=function(){
        $http.post("./findTask.do").success(function(result) {
        	if(result.isLogin==="yes"){
        	$rootScope.userName=result.userName;
    	    $scope.taskList=result.data;
    	    
        	}else{
        		$location.path("/login");
        	}
        });
}    
        //查看
        $scope.findDetail=function(task){
        	console.log(task);
        	 window.open("http://localhost:8080/rapid_dev/diagram-viewer/index.html?processDefinitionId="+task.processDefId+"&processInstanceId="+task.processInstanceId); 
        }
      
        //完成任务
        $scope.completeTaskTo=function(task){
        	console.log(task);
        	 
        }
        
        /**
    	 * 提交表单
    	 * @return {[type]} [description]
    	 */
    	function sendStartupRequest() {
    		if ($(".formkey-form").valid()) {
    			var url = './completeTask.do';
    			var args = $('#completeTask').serialize();
    			console.log(args);
    			$.post(url, args, function(data){
    				$("#comTask").dialog("close");
    				window.location.href =("#/processList");
			    	setTimeout(function(){
			    		//$location.path("/findFirstTask");
			    		window.location.href =("#/findFirstTask");
			    	},1500);
    			});
    		}
    	}
  
}])  