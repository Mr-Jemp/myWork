;(function(){

/**
 * toast 组件
 * @param msg
 * @return
 */
angular.module('myToast', [])
.provider('toast', function() {
    this.$get = ['$timeout', function($timeout) {
        return {
            toasts: {default: {}},
            show: function(name, opt) {
                name = name || 'default'
                opt = opt || {}
                var toast = this.toasts[name];
                angular.extend(toast, opt)
                toast.isShow = true;
                // XXX: 要有fadeIn fadeOut
                $timeout(function(){
                    toast.isShow = false;
                }, opt.delay || 800)
            },
            hide: function(name) {
                name = name || 'default'
                this.toasts[name].isShow = false;
            },
            addToast: function(name, opt) {
                if(!name) return this.toasts.default
                this.toasts[name] = angular.extend({}, opt)

                return this.toasts[name]
            }
        }
    }]
})
.directive('myToast', ['$timeout','toast', function($timeout, toast){
    return {
        restrict: 'E',
        replace: 'true',
        scope: {
            name: '@'
        },
        transclude: true,
        templateUrl: '/public/component/toast/toast.html',
        link: function(scope,elem,attrs,ctrl, trans) {
            scope.toast = toast.addToast(scope.name)
            trans(function(clone){
                if(clone.length) scope.hasTrans = true;
            })
            scope.hide = function() {
                toast.hide(scope.name)
            }


        }
    }
}])


}())