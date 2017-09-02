var root_url='/data/';
var app=angular.module('dd8w',["ngRoute"])
.config(["$routeProvider",function($routeProvider){
	$routeProvider.when('/index',{
		templateUrl:"/public/tpl/index.html"
	}).otherwise({
			redirectTo:"/index"
	});
}]);