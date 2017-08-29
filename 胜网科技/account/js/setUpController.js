angular.module('setUpApp',["commonConfig"]).
controller("setUpController",["$scope",'$window',function($scope,$window){
	//	意见反馈部
	$("#feedbackS").on('click',function(){
		$("#feedbackPage").show();
		$("#setUp").hide();
	})
	$("#gosetup").on('click',function(){
		$("#setUp").show();
		$("#feedbackPage").hide();
	})
	
	
	//	验证码绑定手机	
	$(".nextBtn").on("click",function(){
		$("#bangdingPage").hide();
		$("#bangdingPage2").show();
	})
	$("#gobangdingPage").on("click",function(){
		$("#bangdingPage2").hide();
		$("#bangdingPage").show();
	})
	
	
}])