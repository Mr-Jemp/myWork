;(function() {
'use strict';

angular.module('TeachScheme').config([
    '$stateProvider',
    '$urlRouterProvider',
    configState,
]);

function configState($stateProvider, $urlRouterProvider) {

    var defaultClassId = 0;

    // 全局只要获取一次
    var allClass = null;

    var states = [
        {
            name: 'home',
            // 这里定义了的参数不能在params再定义
            url: '/class/{classId}',
            component: 'homeComponent',
            params: {
                // classId: defaultClassId,
            },
            resolve: {
                list: ['$transition$', 'dataService', function(trans, ds) {
                    return ds.getSchemeList(trans.params().classId || defaultClassId)
                        .then(function(res) {
                            return res.data;
                        });
                }],
                allClass: ['dataService', function(ds) {
                    if (allClass) {
                        return allClass;
                    }
                    return ds.getClassFolderList()
                        .then(function(res) {
                            allClass = res.data;
                            return res.data;
                        });
                }],
                curClass: ['$transition$', 'allClass', function(trans, all) {
                    // var ret = allClass[0];
                    // 这里用$state取不到params
                    var ret = all[0];
                    var classId = parseInt(trans.params().classId, 10);
                    for (var i = all.length - 1; i >= 0; i--) {
                        if (all[i].id === classId) {
                            ret = all[i];
                            break;
                        }
                    }
                    return ret;
                }],
            },
        },
        {
            name: 'selectClass',
            url: '/select-class',
            component: 'selectClassComponent',
            params: {
                allClass: null,
            },
        },
        {
            name: 'createScheme',
            url: '/create-scheme',
            component: 'createSchemeComponent',
            params: {
                classId: null,
                headerTitle: '新建教学计划',
            },
        },
        {
            name: 'editScheme',
            url: '/edit-scheme/{schemeId}',
            component: 'createSchemeComponent',
            params: {
                scheme: null,
                headerTitle: '修改教学计划',
            },
            resolve: {
                scheme: ['$transition$', 'dataService', function(trans, ds) {
                    // params没传过来就自己拉
                    if (trans.params().scheme) {
                        return trans.params().scheme;
                    }
                    var schemeId = trans.params().schemeId;
                    return ds.getScheme(schemeId)
                        .then(function(res) {
                            return res.data;
                        });
                }],
            },
        },
        {
            name: 'detail',
            url: '/detail/{schemeId}',
            component: 'detailComponent',
            params: {
                scheme: null,
            },
            resolve: {
                scheme: ['$transition$', 'dataService', function(trans, ds) {
                    // params没传过来就自己拉
                    if (trans.params().scheme) {
                        return trans.params().scheme;
                    }
                    var schemeId = trans.params().schemeId;
                    return ds.getScheme(schemeId)
                        .then(function(res) {
                            return res.data;
                        });
                }],
            },
        },
    ];

    states.forEach(function(state) {
        $stateProvider.state(state);
    });

    $urlRouterProvider.otherwise('/class/0');
}


}());
