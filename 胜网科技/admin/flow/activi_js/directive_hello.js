/**
 * 
 */
angular.module('activitiApp')  
.directive("hello",function(){
	return{
		restrict:'AECM',
		templateUrl:"hello.html",//'<div>hello world</div>' $templateCache.get('hello.html')
		replace:true
	}
})

angular.module('activitiApp')  
.directive("hello",function(){
	return{
		restrict:'AE',
		templateUrl:"<div>hello everyone!!<div ng-transclude></div></div>",//将嵌套的内容放到ng-transclude这个div中		
		transclude:true
	}
})
//注射器加载完所有模块时，此方法执行一次
angular.module('activitiApp')
.run(function($templateCache){
	$templateCache.put("hello.html","<div>hello everyone !!!</div>")
})