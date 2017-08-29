var grade=angular.module('grade',[]);
app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/old_ListTrack',{//我的中心
        templateUrl:"tpl/old/old_ListTrack.html"
    })
    .when('/old_ListAddTalkNotice',{
        templateUrl:"tpl/old/old_ListAddTalkNotice.html?t=" + Math.floor(Date.now() / 1000)
    })
    .when('/old_ListAlbum',{
        templateUrl:"tpl/old/old_ListAlbum.html?t=" + Math.floor(Date.now() / 1000)
    })
    .when('/EditorAlbum',{
        templateUrl:"tpl/old/EditorAlbum.html?t=" + Math.floor(Date.now() / 1000)
    })
    .when('/Forum',{
        templateUrl:"tpl/old/Forum.html?t=" + Math.floor(Date.now() / 1000)
    })
    .when('/addForum',{
        templateUrl:"tpl/old/addForum.html?t=" + Math.floor(Date.now() / 1000)
    })
    .when('/Curriculum',{
        templateUrl:"tpl/old/Curriculum.html?t=" + Math.floor(Date.now() / 1000)
    })
    .when('/open_class',{
        templateUrl:"tpl/old/open_class.html?t=" + Math.floor(Date.now() / 1000)
    })
    .when('/select_class',{
        templateUrl:"tpl/old/select_class.html?t=" + Math.floor(Date.now() / 1000)
    })
    .when('/push_class',{
        templateUrl:"tpl/old/push_class.html?t=" + Math.floor(Date.now() / 1000)
    })
    .when('/class_management',{
        templateUrl:"tpl/old/class_management.html?t=" + Math.floor(Date.now() / 1000)
    })
    .when('/class_list',{
        templateUrl:"tpl/old/class_list.html?t=" + Math.floor(Date.now() / 1000)
    })
    .when('/add_teacher',{
        templateUrl:"tpl/old/add_teacher.html?t=" + Math.floor(Date.now() / 1000)
    })
    .when('/shezhi',{
        templateUrl:"tpl/old/shezhi.html?t=" + Math.floor(Date.now() / 1000)
    })
    .when('/guanli',{
        templateUrl:"tpl/old/guanli.html?t=" + Math.floor(Date.now() / 1000)
    })
    .when('/upgrade_class',{
        templateUrl:"tpl/old/upgrade_class.html?t=" + Math.floor(Date.now() / 1000)
    })
    .when('/transfer_class',{
        templateUrl:"tpl/old/transfer_class.html?t=" + Math.floor(Date.now() / 1000)
    });
}]);