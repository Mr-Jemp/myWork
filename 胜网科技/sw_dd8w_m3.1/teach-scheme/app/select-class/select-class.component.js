;(function() {

angular.module('TeachScheme').component('selectClassComponent', {
    templateUrl: 'app/select-class/select-class.component.html',
    controller: [
        '$state',
        'dataService',
        SelectClassCtrl,
    ],
});


function SelectClassCtrl($state, ds) {
    var self = this;


    self.$onInit = function() {
        self.selectedClass = 0;
        self.allClass = $state.params.allClass;
        if (!self.allClass) {
            self.allClass = {};
            fetchClassFolderList();
        }
    }

    self.selectClass = function(index) {
        self.selectedClass = index;
    };


    function fetchClassFolderList() {
        console.log('fetch class folder list');
        ds.getClassFolderList()
            .then(function(res){
                self.allClass = res.data;
            })
            .catch(function(err) {
                console.error('get class folder list error', err)
            })
    }


    /*  路由跳转  */
    self.goBack = function() {
        history.go(-1);
    };

    self.goNext = function() {

        $state.go('createScheme', {
            classId: self.allClass[self.selectedClass].id,
        });
    };
}

}());
