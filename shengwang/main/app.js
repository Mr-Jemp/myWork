
//(function(angular){
    var myApp = angular.module('myApp', ['ui.router','angularTreeview'])

    myApp.config(function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('/school');//在请求无效路由时使用的路径

        $stateProvider
            .state('my',{  //设置路由状态
                url:'/my',                      //路径
                templateUrl:'./template/my/index.html' //加载的模版
            })
            //登录成功后显示的页面
            .state('home',{
                url:"/home",
                templateUrl:'./template/home/home.html'
            })
            //工作台
            .state('workbench',{
                url:'/workbench',
                templateUrl:'./template/workbench/workbench.html',
                //controller:"workController"
            })
            //网站
            .state('website',{
                url:'/website',
                templateUrl:'./template/website/website.html'
            })
             //吐槽
            .state('complain',{
                url:'/complain',
                templateUrl:'./template/complain/complain.html'
            })
            //生活
            .state('school',{
                url:'/school',
                templateUrl:'./template/school/school.html'
            })
            //会议视频
            .state('meeting',{
                url:'/meeting',
                templateUrl:'./template/meeting/meeting.html'
            })
            //即时聊天
            .state('qq',{
                url:'/qq',
                templateUrl:'./template/qq/qq.html'
            })
            //退出系统
            .state('out',{
                url:'/out',
                templateUrl:'./template/out/out.html'
            })
    })
//})(angular)
//myApp.controller("po",function($scope,$http){
//    $http({
//        method: 'GET',
//        url: './data_json/workdesk.json'
//    }).success(function(data){
//        console.log(data)
//        $scope.datalist = data;
//        console.log($scope.datalist)
//        //alert("成功")
//    }).error(function(data){
//        alert("失败")
//    })
//})

// //左边主要菜单树分类   角色/功能/流程
// myApp.controller("work1Controller",function($scope,$http){
//
//
//
//         $http({
//         method: 'GET',
//         url: './data_json/workdesk.json'
//         }).success(function(data){
//         //console.log(data)
//             $scope.datalist = data;
//         //异步请求,需要在这里保存数据
//             $scope.data = angular.fromJson($scope.datalist)
//             $scope.roleList3 = [$scope.data[0]]
//             $scope.roleList = $scope.roleList3;
//             //alert("成功")
//     }).error(function(data){
//         alert("失败")
//     })
//
//
//
//
// })
// //功能
// myApp.controller("work2Controller",function($scope,$http){
//     $http({
//         method: 'GET',
//         url: './data_json/workdesk.json'
//     }).success(function(data){
//         //console.log(data)
//         $scope.work2data = data;
//         //异步请求,需要在这里保存数据
//         $scope.work2data = angular.fromJson($scope.work2data)
//         $scope.roleList4 = [$scope.work2data[1]]
//         $scope.roleList = $scope.roleList4;
//         //alert("成功")
//     }).error(function(data){
//         alert("失败")
//     })
//
//
// })
// //流程
// myApp.controller("work3Controller",function($scope,$http){
//
//     $http({
//         method: 'GET',
//         url: './data_json/workdesk.json'
//     }).success(function(data){
//         //console.log(data)
//         $scope.work3data = data;
//         //异步请求,需要在这里保存数据
//         $scope.work3data = angular.fromJson($scope.work3data)
//         $scope.roleList5 = [$scope.work3data[2]]
//         $scope.roleList = $scope.roleList5;
//         //alert("成功")
//     }).error(function(data){
//         alert("失败")
//     })
// })
//
//
// //右边菜单树分类控制器  角色功能/流程应用
// myApp.controller("role1Controller",function($scope,$http){
//
//
//
//     $http({
//         method: 'GET',
//         url: './data_json/workdesk.json'
//     }).success(function(data){
//         //console.log(data)
//         $scope.role1data = data;
//         //异步请求,需要在这里保存数据
//         $scope.role1data = angular.fromJson($scope.role1data)
//         $scope.roleList3 = [$scope.role1data[0]]
//         $scope.roleList = $scope.roleList3;
//         //alert("成功")
//     }).error(function(data){
//         alert("失败")
//     })
//
//
//
//
// })
// //流程
// myApp.controller("role2Controller",function($scope,$http){
//
//     $http({
//         method: 'GET',
//         url: './data_json/workdesk.json'
//     }).success(function(data){
//         //console.log(data)
//         $scope.role2data = data;
//         //异步请求,需要在这里保存数据
//         $scope.role2data = angular.fromJson($scope.role2data)
//         $scope.roleList5 = [$scope.role2data[2]]
//         $scope.roleList = $scope.roleList5;
//         //alert("成功")
//     }).error(function(data){
//         alert("失败")
//     })
// })



