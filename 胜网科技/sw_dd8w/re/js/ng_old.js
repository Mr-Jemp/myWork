var o=angular.module('old',[]);
o.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/TeachPlan_add',{//我的中心
        templateUrl:"tpl/old/old_TeachPlan_add.html"
    })
    .when('/UploadSharePlan',{
        templateUrl:"tpl/old/old_UploadSharePlan.html"
    })
    .when('/demonstrate',{
        templateUrl:"tpl/old/old_demonstrate.html"
    });
}]);