//function jsonp(url,data,fn){
//		//首先生成一个随机函数名
//		var callbackName='jsonp'+new Date().getTime()+Math.random().toString().substr(2);
//		
//		//写一个全局函数
//		window[callbackName]=function(data){
//			fn(data);
//			
//			window.document.body.removeChild(script);
//		}
//		//创建一个script便签
//		var script=document.createElement("script");
//		var url=url+"?";
//		for (var key in data) {
//			url+=key+"="+data[key]+"&";
//		}
//		url+="callback="+callbackName;
//		script.src=url;
//		window.document.body.appendChild(script);		
//}
//自定义服务、类似$scope $route $routeProvider
angular.module('jsonpApp',[]).service('jsopService',['$window',function($window){
	this.jsonp=function(url,data,fn){
		//首先生成一个随机函数名
		var callbackName='jsonp'+new Date().getTime()+Math.random().toString().substr(2);
		
		//写一个全局函数
		$window[callbackName]=function(data){
			fn(data);
			
			$window.document.body.removeChild(script);
		}
		//创建一个script便签
		var script=document.createElement("script");
		var url=url+"?";
		for (var key in data) {
			url+=key+"="+data[key]+"&";
		}
		url+="callback="+callbackName;
		script.src=url;
		$window.document.body.appendChild(script);
		
	}
	
}])