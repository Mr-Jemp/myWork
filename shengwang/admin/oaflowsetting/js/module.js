/**
 * Created by HBS on 2015/10/5.
 */
//定义模块
var app = angular.module("myApp",['ngRoute']);
//定义路由映射（模板，控制器）
app.config(["$routeProvider",function($routeProvider){
    $routeProvider
        .when("/welcome",{
            templateUrl:"partials/welcome.html",
            controller:"welcomeCtrl"
        })
        .when("/login",{
            templateUrl:"partials/login.html",
            controller:"loginCtrl"
        })
        .when("/about",{
            templateUrl:"partials/about.html",
            controller:"aboutCtrl"
        })
        .otherwise({
            redirectTo:"/welcome"
        });
}]);

//添加控制器
app
    .controller("loginCtrl",loginController)
    .controller("aboutCtrl",aboutController)
    .controller("welcomeCtrl",welcomeController)
    .controller("testCtrl",testController)
    .controller("stepCtrl",function($scope{
            $scope.name="fff";
    });