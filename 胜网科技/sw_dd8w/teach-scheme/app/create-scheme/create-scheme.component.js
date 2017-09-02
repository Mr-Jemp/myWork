;(function() {

angular.module('TeachScheme')
    .component('createSchemeComponent', {
        templateUrl: 'app/create-scheme/create-scheme.component.html',
        bindings: {
            scheme: '<',
        },
        controller: [
            '$scope',
            '$state',
            'dataService',
            CreateSchemeCtrl,
        ],
    });

/**
 * 因为创建计划与编辑计划的界面相同，这两个路由复用该组件
 */
function CreateSchemeCtrl($scope, $state, ds) {
    var self = this;

    self.headerTitle = $state.params.headerTitle;
    self.scheme = {};

    var stateName = $state.current.name;

    if (stateName === 'createScheme' && $state.params.classId === null) {
        $state.go('home', {classId: 0});
    }

    // edit 刷新后依然留在本页
    // create 刷新后回到首页，因为classId 记不住

    self.$onInit = function() {
        if (false && !window.onbeforeunload) {
            window.onbeforeunload = function(e) {
                if (self.scheme.title || self.scheme.content) {
                    var tips = '修改不能保存，确定要离开？';
                    e.returnValue = tips;
                    return tips;
                }
            };
        }
    };
    $scope.$on('$destroy', function() {
        window.onbeforeunload = null;
    });

    self.save = function () {
        if (!self.scheme.title || !self.scheme.content) {
            console.warn('empty title or content');
            return;
        }
        if (stateName === 'editScheme') {

            console.log('edit');
            ds.editScheme(self.scheme.id, self.scheme.title, self.scheme.content)
                .then(function(res) {
                    if (res.status === 200) {
                        $state.go('home', {classId: self.scheme.classId});
                    }
                })
                .catch(function(err) {
                    console.error('edit fail');
                });

        } else if (stateName === 'createScheme') {

            console.log('create');
            var classId = $state.params.classId;
            ds.createScheme(classId, self.scheme.title, self.scheme.content)
                .then(function(res) {
                    if (res.status === 200) {
                        $state.go('home', {classId: classId});
                    }
                });

        }
    };

    self.goBack = function() {
        history.go(-1);
    };
}


}());
