/**
 * Created by HBS on 2015/10/5.
 */
function testController($scope){
    $scope.msg="Test Controller";
}
function loginController($scope){
    $scope.loginTitle = "User Login";
}
function aboutController($scope,$routeParams){
    $scope.aboutTitle = "About " + $routeParams.name;
    $scope.name = $routeParams.name;
}
function welcomeController($scope,$routeParams){
    $scope.userName = $routeParams.userName;
}
function stepController($scope,$http,$element){
    $scope.step=function(){
        table={id:0,name:"表单0"}
    }
    $scope.name="he";
}
