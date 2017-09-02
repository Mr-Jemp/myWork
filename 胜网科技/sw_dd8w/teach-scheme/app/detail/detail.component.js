;(function() {

angular.module('TeachScheme')
    .directive('expandMask', function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
            // XXX: 令mask 100%覆盖
                setTimeout(function() {
                    var bodyHeight = document.body.scrollHeight;
                    elem[0].style.height = bodyHeight + 'px';
                }, 0);

            },
        };
    })
    .directive('myModal', function() {
        return {
            restrict: 'E',
            template: '' +
        '<div class="mm-mask" ng-click="cancel()">' +
            '<div class="mm-modal">' +
                '<h3 class="mm-modal__title">{{title}}</h3>' +
                '<p class="mm-modal__content">{{content}}</p>' +
                '<div class="mm-btns">' +
                    '<div class="mm-btns__btn" ng-click="cancel()">取消</div>' +
                    '<div class="mm-btns__btn" ng-click="confirm()">确认</div>' +
                '</div>' +
            '</div>' +
        '</div>',

            scope: {
                title: '@modalTitle',
                content: '@modalContent',
                cancel: '&modalCancel',
                confirm: '&modalConfirm',
            },
            link: function(scope, elem, attrs) {

            },
        };
    })
    .component('detailComponent', {
        templateUrl: 'app/detail/detail.component.html',
        bindings: {
            scheme: '<',
        },
        controller: [
            '$state',
            'dataService',
            DetailCtrl,
        ],
    });

function DetailCtrl($state, ds) {
    var self = this;
    console.log(self);

    // self.scheme = $state.params.scheme;
    // if (!self.scheme) {
    //     fetchScheme($state.params.schemeId)
    // }

    self.menuShown = false;

    self.menu = [
        {
            title: '上传',
            icon: 'img/upload.png',
            action: upload,
        },
        {
            title: '删除',
            icon: 'img/delete.png',
            action: remove,
        },
    ];

    self.modalShown = false;


    self.toggleMenu = function() {
        self.menuShown = !self.menuShown;
    };

    self.cancelRemove = function() {
        self.modalShown = false;
    };
    self.confirmRemove = function() {
        console.log('confirm remove');
        self.modalShown = false;
        ds.remove(self.scheme.id)
            .then(function(res) {
                if (res.status === 200) {
                    $state.go('home', {classId: self.scheme.classId});
                }
            });
    };

    self.goBack = function() {
        history.go(-1);
    };


    function upload() {
        console.log('upload');
        ds.upload(self.scheme);
    }

    function remove() {
        console.log('remove');
        self.modalShown = true;
    }


}


}());
