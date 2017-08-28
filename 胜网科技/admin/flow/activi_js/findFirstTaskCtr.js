angular.module('activitiApp')  
.controller('findFirstTaskCtr', ['$rootScope','$scope','$http','$location','$state', function($rootScope,$scope,$http,$location,$state){  
$scope.init=function(){
        $http.post("./findMyApplyProc.do").success(function(result) {        	
        	if(result.isLogin==="yes"){
        	$rootScope.userName=result.userName;
        	console.log(result.data);
        	console.log(result.userName);
    	    $scope.processList=result.data;
        	}else{
        		$location.path("/login");
        	}
        });
}    
        //查看findDetail(task)
        $scope.findDetail=function(task){
        	console.log(task);
        	$('#findDetail').html('').dialog({
        		title:'节点名称[' + task.name + ']',
    			modal: true,
    			width: $.common.window.getClientWidth() * 0.6,
    			height: $.common.window.getClientHeight() * 0.9,	
    			open: function() {
    				// 获取json格式的表单数据，就是流程定义中的所有field
    	    		var dialog = this;    		
    	    		
    			},
    			buttons: [{
    				text: '关闭',
    				click: function() {
    					$("#findDetail").dialog("close");
    					//sendStartupRequest();
    				}
    			}]
    		}).position({
    			   //my: "center",
    			   //at: "center",
    			offset:'300 300',
    			   of: window,
    			   collision:"fit"
    			});
        }
      
        //完成任务
        $scope.completeTaskTo=function(task){
        	console.log(task);
        	$('#comTask').html('').dialog({
        		title:'节点名称[' + task.name + ']',
    			modal: true,
    			width: $.common.window.getClientWidth() * 0.6,
    			height: $.common.window.getClientHeight() * 0.9,	
    			open: function() {
    				// 获取json格式的表单数据，就是流程定义中的所有field
    	    		var dialog = this;
    	    		// 读取启动时的表单
    	    			// 获取的form是字符行，html格式直接显示在对话框内就可以了，然后用form包裹起来
    	    			
    	    		
    			},
    			buttons: [{
    				text: '提交',
    				click: function() {
    					$("#comTask").dialog("close");
    					sendStartupRequest();
    				}
    			}]
    		}).position({
    			   //my: "center",
    			   //at: "center",
    			offset:'300 300',
    			   of: window,
    			   collision:"fit"
    			});
        }
        
        /**
    	 * 提交表单
    	 * @return {[type]} [description]
    	 */
    	function sendStartupRequest() {
    		if ($(".formkey-form").valid()) {
    			var url = './completeTask.do';
    			var args = $('#completeTask').serialize();
    			$.post(url, args, function(data){
    				$("#comTask").dialog("close");
    				//$location.path("/processList");
    				window.location.href =("#/processList");
			    	setTimeout(function(){
			    		//$location.path("/findFirstTask");
			    		window.location.href =("#/findFirstTask");
			    	},1500);
    			});
    		}
    	}
  
}])  