;(function() {

angular.module('Footer', []).constant('nav', {
    items: [
        {
            id: 'home',
            link: '/home',
            img: '/public/img/footer/nav_home_default@3x.png',
            imgActive: '/public/img/footer/nav_home_click@3x.png',
            title: '首页',
        },
        {
            id: 'teacher',
            link: '/study',
            img: '/public/img/footer/nav_home_jy_default@3x.png',
            imgActive: '/public/img/footer/u2.png',
            title: '教研',
        },
        {
            id: 'class',
            link: '/ZMT/classMeanage/classMeanage.html',
            img: '/public/img/footer/nav_home_bj_default@3x.png',
            imgActive: '/public/img/footer/u3.png',
            title: '班级',
        },
        {
            id: 'culture',
            link: '/culture',
            img: '/public/img/footer/nav_home_xywh_default@3x.png',
            imgActive: '/public/img/footer/nav_home_xywh_click@3x.png',
            title: '校园文化',
        },
        {
            id: 'my',
            link: '/account/index.html',
            img: '/public/img/footer/nav_home_my_default@3x.png',
            imgActive: '/public/img/footer/nav_home_my_click@3x.png',
            title: '我的',
        },
    ],
}).service('footer', function() {
    var self = this;
    self.shown = true;
    self.show = function() {
        self.shown = true;
    };
    self.hide = function() {
        self.shown = false;
    };
    self.toggle = function() {
        self.shown = !self.shown;
    };
}).directive('myFooter', ['nav', 'footer', function(nav, footer) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/public/component/footer/footer.component.html',
        scope: {
            cur: '@current',
        },
        link: function(scope, element, attrs) {
            scope.cur = scope.cur ? scope.cur : 'home';
            scope.navItems = nav.items;
            scope.footer = footer;
        },
    };
}]);


}());

