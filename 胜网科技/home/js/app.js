var root_url='/data/';
var root_burl='/data/';
var app=angular.module('gzsw',[
	"ngRoute"
])
.config(["$routeProvider",function($routeProvider){
	$routeProvider.when('/index',{
		templateUrl:"./tpl/index.html"
	}).otherwise({
			redirectTo:"/index"
	});
}]).run(['$http',function($http){
        //$http.post("http://192.168.0.21:20884/accountQuery/getPhone",{});
}]);
