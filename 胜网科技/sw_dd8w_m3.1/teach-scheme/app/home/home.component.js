;(function() {

angular.module('TeachScheme').component('homeComponent', {
    templateUrl: 'app/home/home.component.html',
    bindings: {
        list: '<',
        allClass: '<',
        curClass: '<',
    },
    controller: [
        '$state',
        'dataService',
        HomeCtrl,
    ],
});

function HomeCtrl($state, dataService) {
    var self = this;
    // 不能在初始化里使用resolve的数据，处理起来很麻烦


    self.menuShown = false;

    self.toggleMenu = function () {
        self.menuShown = !self.menuShown;
    };
    self.selectClass = function(klass) {
        // self.curClass = klass;
        self.toggleMenu();
        $state.go('home', {classId: klass.id});
        // fetchSchemeList();
    };

    // function fetchSchemeList() {
    //     var classId = self.allClass[self.curClass].id
    //     dataService.getSchemeList(classId)
    //         .then(function(res) {
    //             self.list = res.data;
    //             $state.params.classId = classId
    //         })
    //         .catch(function(err){
    //             console.error('fetch scheme list err', err)
    //         })
    // }

    /*   路由跳转   */

    self.goDetail = function(scheme) {
        $state.go('detail', {
            schemeId: scheme.id,
            scheme: scheme,
        });
    };

    self.goEditScheme = function(scheme) {
        $state.go('editScheme', {
            schemeId: scheme.id,
            scheme: scheme,
        });
    };

    self.goCreateScheme = function() {
        $state.go('selectClass', {
            allClass: self.allClass,
        });
    };

    self.goBack = function() {
        location.href = '/'
    };

}


}());
