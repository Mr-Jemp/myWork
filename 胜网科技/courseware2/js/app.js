var root_url='http://192.168.0.21:20894';
//var root_url='/data/';
var root_burl='/data/';
var app=angular.module('gzsw',[
	"ngRoute",
    "beike",
    "les"
])
.config(["$routeProvider",function($routeProvider){
	$routeProvider.when('/lenssons',{
		templateUrl:"/courseware2/tpl/lenssons.html",
        controller:"lenssons"
	})
        .when('/beiKe',{
            templateUrl:"./tpl/beiKe.html",
            controller:"beikeCtr"
        })
        .otherwise({
			redirectTo:"/beiKe"
	});
}]).factory('getData', ['$http', function($http){
        var f = {};
        f.school_period=[
            {"id":1,"name":"小学"},
            {"id":2,"name":"初中"},
            {"id":3,"name":"高中"}
        ];
        f.getUrlData=function(url,flag){
            url=root_url+url;
            return $http.get(url)
                .then(function(r) {
                    console.log('服务器数据');
                    return {"status":"ok","data":r.data};
                })
                .catch(function(err) {
                    console.log('文件数据');
                    return {"status":"ok","data":g_data[flag]}
                });
        }
        return f;
    }]).run(['$http',function($http){
        //$http.post("http://192.168.0.21:20884/accountQuery/getPhone",{});
    }]);
