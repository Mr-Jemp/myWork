
;(function(){
'use strict';

/**
 * modal组件
 * @param title
 * @param msg
 * @param cancelText
 * @param confirmText
 * @param onCancel
 * @param onConfirm
 * @return
 */
angular.module('myModal', [])
.provider('modal', function() {
    this.$get = function() {
        return {
            modals: {defaultName: {}},
            show: function(name, opt) {
                name = name || 'defaultName'
                opt = opt || {}
                var modal = this.modals[name];
                angular.extend(modal, opt)
                modal.isShow = true;
            },
            hide: function(name) {
                name = name || 'defaultName'
                this.modals[name].isShow = false;
            },
            addModal: function(name, opt) {
                if(!name) return this.modals.defaultName
                this.modals[name] = angular.extend({}, opt)

                return this.modals[name]
            }
        }
    }
})
.directive('myModal', function(modal){
    return {
        restrict: 'E',
        replace: 'true',
        scope: {
            name: '@'
        },
        transclude: true,
        templateUrl: '/public/component/modal/modal.html',
        link: function(scope,elem,attrs,ctrl, trans) {
            scope.modal = modal.addModal(scope.name)
            trans(function(clone){
                if(clone.length) scope.hasTrans = true;
            })
            scope.hide = function() {
                modal.hide(scope.name)
            }
            scope.onClick = function(isConfirm) {
                if(isConfirm) {
                    if(scope.modal.onConfirm) scope.modal.onConfirm()
                } else {
                    if(scope.modal.onCancel) scope.modal.onCancel()
                }
                modal.hide(scope.name)
            }
        }
    }
})




}())

