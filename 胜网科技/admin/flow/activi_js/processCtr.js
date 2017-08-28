angular.module('activitiApp')  
.controller('processCtr', ['$rootScope','$scope','$http','$location', function($rootScope,$scope,$http,$location){  
		$scope.init=function(){			
		        $http.post("./processList.do").success(function(result) {
		        	if(result.isLogin==="yes"){
		        	$rootScope.userName=result.userName;
		    	    $scope.processList=result.data;
		        	}else{
		        		$location.path("/login");
		        	}
		        });
		}
    	//开始流程
        $scope.toProcess= function(process){
        	$rootScope.process=process;
        	console.log(process);
        	$('#handleTemplate').html('').dialog({
        		title:'流程名称[' + process.name + ']',
    			modal: true,
    			width: $.common.window.getClientWidth() * 0.6,
    			height: $.common.window.getClientHeight() * 0.9,	
    			open: function() {
    				// 获取json格式的表单数据，就是流程定义中的所有field
    				readForm.call(this, process.id,process.deploymentId);
    			},
    			buttons: [{
    				text: '启动流程',
    				click: function() {
    					$("#handleTemplate").dialog("close");
    					sendStartupRequest();
    					setTimeout(function(){
    						window.location.href =("#/findFirstTask");
    					},1500);
    					
    				}
    			}]
    		}).position({
    			   //my: "center",
    			   //at: "center",
    			offset:'300 300',
    			   of: window,
    			   collision:"fit"
    			});
;
    	};
    	//读取流程启动表单
    	function readForm(processId,deploymentId) {
    		var dialog = this;
    		// 读取启动时的表单
    		var url = './getStartForm.do',  
            data = {  
                  'processId': processId,  
                  'deploymentId': deploymentId  
            },  
            transFn = function(data) {  
                return $.param(data);  
            },  
            postCfg = {  
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},  
                transformRequest: transFn  
            };   
    		$.post(url, data, postCfg).success(function(result){
    			// 获取的form是字符行，html格式直接显示在对话框内就可以了，然后用form包裹起来
    			console.log(result.form);
    			$(dialog).append("<div class='formContent' />");
    			$('.formContent').html('').wrap("<form id='startform' class='formkey-form' method='post' />");
    			
    			var $form = $('.formkey-form');

    			// 设置表单action    getStartFormAndStartProcess
    			$form.attr('action', './getStartFormAndStartProcess');
    			//设置部署的Id
    			$form.append("<input type='hidden' name='deploymentId' value="+deploymentId+">");    			
    			$form.append(result.form);
    			// 初始化日期组件
    			$form.find('.datetime').datetimepicker({
    		           stepMinute: 5
    		     });
    			$form.find('.date').datepicker();
    			
    			// 表单验证
    			$form.validate($.extend({}, $.common.plugin.validator));
    		});
    	}
    	
    	/**
    	 * 提交表单
    	 * @return {[type]} [description]
    	 */
    	function sendStartupRequest() {
    		if ($(".formkey-form").valid()) {
    			var url = './getStartFormAndStartProcess.do'; 
    			var data =  $('#startform').serialize();
    	        var transFn = function(data) {  
    	                return $.param(data);  
	            };  
    	        var postCfg = {  
    	                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},  
    	                transformRequest: transFn  
	            };   
	    		$.post(url, data, postCfg).success(function(result){
	    			$("#handleTemplate").dialog("close");
					$location.path("/findFirstTask"); 
	    		})
    	}}    
}])  