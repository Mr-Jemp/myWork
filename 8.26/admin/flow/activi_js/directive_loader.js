/**
 * <div ng-controller='myctrl'><loader howToLoad='loadData1()'></loader></div>
 *  <div ng-controller='myctrl2'><loader howToLoad='loadData2()'></loader></div>
 */
angular.module('activitiApp')
.controller("myctrl",['$scope',function($scope){
	$scope.loadDate=function(){
		console.log("加载数据中......");
	}
}])
angular.module('activitiApp')  
.directive("loader",function(){
	return{
		restrict:'AECM', 
		link:function(scope,element,attr){
			element.bind("mouseenter",function(){
				//scope.loadData();//scope.$apply("loadData()")
				//在不同controller中使用元素loadData时，通过指定attr属性来使得元素调用不同的函数
				scope.$apply(attr.howtoload);//直接写属性 这里直接用小写  注意这里的坑，howToLoad会被转换成小写的howtoload
			})
		}
	}
})