angular.module("cusserApp",['ngRoute'])
.config(["$routeProvider",'$locationProvider',function($routeProvider,$locationProvider){
	$locationProvider.hashPrefix('');
	$routeProvider.when("/custome",{
		templateUrl:"server_apply.html"
	}).when('/rateQuery',{
		templateUrl:"server_query.html"
	}).otherwise({
		redirectTo:"/custome"
	})
}])
.controller("cusserCtrl",["$scope",'$http',function($scope,$http){
	$('.service_back ul li').click(function(){		
		$(this).find("a").addClass('topBul').parent().siblings().find("a").removeClass("topBul");
	})
}])
