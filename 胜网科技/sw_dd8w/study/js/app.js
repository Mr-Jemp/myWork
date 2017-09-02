var root_url='/data/';
var root_burl='/data/';
var app=angular.module('dd8w',[
	"ngRoute"
])
.config(["$routeProvider",function($routeProvider){
	$routeProvider.when('/index',{
		templateUrl:"/study/tpl/index.html"
	})
        .when('/old_BeiKe',{
            templateUrl:"/study/tpl/old/old_BeiKe.html"
        })
        .when('/TeachPlan',{
            templateUrl:"/study/tpl/old/old_TeachPlan.html"
        })
        .when('/SharePlan',{
            templateUrl:"/study/tpl/old/old_SharePlan.html"
        })
        .when('/TeachPlan_add',{
            templateUrl:"/study/tpl/old/old_TeachPlan_add.html"
        })
        .when('/lecture',{
            templateUrl:"/study/tpl/old/old_lecture.html"
        })
        .when('/ReLecture',{
            templateUrl:"/study/tpl/old/old_ReLecture.html"
        })
        .when('/grade',{
            templateUrl:"/study/tpl/grade/class_grade.html"
        }).otherwise({
			redirectTo:"/index"
	});
}]).run(['$http',function($http){
        //$http.post("http://192.168.0.21:20884/accountQuery/getPhone",{});
    }]);
