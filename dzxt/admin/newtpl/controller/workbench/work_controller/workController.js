
//公用的控制器
myApp.controller("main",["$scope","$http",function($scope,$http){

    //角色请求地址
    $scope.power_tree ="./data_json/workdesk.json"
    //功能请求地址
    $scope.tissue_nav_tree ="./data_json/tissue_nav_tree.json"

    //流程请求地址
    $scope.appflow_tree="./data_json/appflow_tree.json"
    $scope.appflow_tree02="./data_json/flow_tree.json"
    //应用流程请求地址
    $scope.appflow_tree2="./data_json/appflow_tree.json"

}])


//左边主要菜单树分类   角色/功能/流程
myApp.controller("work1Controller",["$scope","$http",function($scope,$http){
    $http({
        method: 'GET',
        url: $scope.power_tree
    }).success(function(data){
        var power_tree=$("#power_tree").ligerTree(
            {
                data:data,
                nodeWidth:200,
                onclick:function(node){
                    var tabid = $(node.target).attr("tabid");
                    if (!tabid)
                    {
                        tabid = new Date().getTime();
                        $(node.target).attr("tabid", tabid)
                    }
                    if(node.isonclick){
                        power_tree.cancelSelect(node.data.treedataindex);
                        f_addTab(tabid+node.data.id,node.data.text+" 网盘硬盘",encodeURI("./template/workbench/role/bumenTree.html"));
                    }else if(!node.data.isLeaf)
                    {
                        /*f_addTab(tabid,node.data.text,encodeURI('/s/organizesetting/powerformlist.php?roleid='+node.data.id));*/
                        f_addTab(tabid,node.data.text,encodeURI('./template/workbench/role/bumenTree.html'));
                    }
                },

                checkbox:false
            }
        );

    }).error(function(data){
        alert("失败")
    })






}])
//功能
myApp.controller("work2Controller",["$scope","$http",function($scope,$http){
    $http({
        method: 'GET',
        url:$scope.tissue_nav_tree
    }).success(function(data){
        //console.log(data)
        // //异步请求,需要在这里保存数据
        // $scope.work2data = angular.fromJson($scope.work2data)
        // $scope.roleList4 = [$scope.work2data[1]]
        // $scope.roleList = $scope.roleList4;
        //alert("成功")
        $scope.data = data
        $("#tissue_nav_tree").ligerTree({
            data:$scope.data,
            checkbox: false,
            slide: false,
            nodeWidth: 120,
            isExpand: 2,
            onContextmenu: function (node, e)
            {
                console.log(node)
                if(node.data.isLeaf)return false;
                rmenu_id = node.data.id;
                rmenu_ti=node.data.children[0].text;
                //这里有个小bug,如果数据没有chinldren下面没有内容了,就会报错
                rmenu.show({ top: e.pageY, left: e.pageX });
                return false;
            },
            onselect: function (node)
            {
                var tabid = $(node.target).attr("tabid");
                if (!tabid)
                {
                    tabid = new Date().getTime();
                    $(node.target).attr("tabid", tabid)
                }
                if (node.data.isLeaf)
                {
                    if(node.data.form_type==1)
                        f_addTab(tabid,node.data.children[0].text,encodeURI("./template/workbench/role/bumenTree.html"));
                    else if(node.data.type==2)
                    {
                        f_addTab(tabid,node.data.children[0].text,encodeURI(node.data.content));
                    }else if(node.data.form_type==2)
                    {
                        f_addTab(tabid,node.data.children[0].text,encodeURI("./template/workbench/role/bumenTree.html"));
                    }else
                        f_addTab(tabid,node.data.children[0].text,encodeURI("./template/workbench/role/bumenTree.html"));
                }
                else {
                    f_addTab(tabid,node.data.children[0].text+" 网盘硬盘",encodeURI("./template/workbench/role/bumenTree.html"));
                }

            }
        });

    }).error(function(data){
        alert("失败")
    })

}])
//流程
myApp.controller("work3Controller",["$scope","$http",function($scope,$http){

    $http({
        method: 'GET',
        url:$scope.appflow_tree02
    }).success(function(data){
        //流程菜单
        $("#flow_tree").ligerTree(
            //默认数据
            {
                data:data,
                onselect: function (node)
                {
                    //添加点击事件
                    var tabid = $(node.target).attr("tabid");//为当前的点击目标添加属性
                    if (!tabid)
                    {
                        //为当前设置属性值
                        tabid = new Date().getTime();
                        $(node.target).attr("tabid", tabid)
                    }
//                        cu_tabid=tabid;
//                        console.log(!node.data.isLeaf)  true
                    if (!node.data.isLeaf)
                    {
                        //点击目标,切换窗口
                        f_addTab(tabid,node.data.text,encodeURI("./template/workbench/role/bumenTree.html"));
                    }

                },
                checkbox:false
            }
        );
        //alert("成功")
    }).error(function(data){
        alert("失败")
    })


    //应用流程
    $("#appflow_tree").ligerTree(
        {
            url:$scope.appflow_tree,
            nodeWidth:200,
            onselect: function (node)
            {
                var tabid = $(node.target).attr("tabid");
                if (!tabid)
                {
                    tabid = new Date().getTime();
                    $(node.target).attr("tabid", tabid)
                }
                if (!node.data.isLeaf)
                {
                    //点击目标,切换窗口
                    f_addTab(tabid,node.data.text,encodeURI("./template/workbench/role/bumenTree.html"));
                }

            },
            checkbox:false
        }
    );



}])


//右边菜单树分类控制器  角色功能/流程应用
myApp.controller("role1Controller",["$scope","$http",function($scope,$http){

    $http({
        method: 'GET',
        url: $scope.tissue_nav_tree,
    }).success(function(data){
        $("#tissue_nav_tree2").ligerTree({
            data:data,
            checkbox: false,
            slide: false,
            nodeWidth: 120,
            isExpand: 2,
            onContextmenu: function (node, e)
            {
                console.log(node)
                if(node.data.isLeaf)return false;
                rmenu_id = node.data.id;
                rmenu_ti=node.data.children[0].text;
                //这里有个小bug,如果数据没有chinldren下面没有内容了,就会报错
                rmenu.show({ top: e.pageY, left: e.pageX });
                return false;
            },
            onselect: function (node)
            {
                var tabid = $(node.target).attr("tabid");
                if (!tabid)
                {
                    tabid = new Date().getTime();
                    $(node.target).attr("tabid", tabid)
                }
                if (node.data.isLeaf)
                {
                    if(node.data.form_type==1)
                        f_addTab(tabid,node.data.children[0].text,encodeURI("./template/workbench/role/bumenTree.html"));
                    else if(node.data.type==2)
                    {
                        f_addTab(tabid,node.data.children[0].text,encodeURI(node.data.content));
                    }else if(node.data.form_type==2)
                    {
                        f_addTab(tabid,node.data.children[0].text,encodeURI("./template/workbench/role/bumenTree.html"));
                    }else
                        f_addTab(tabid,node.data.children[0].text,encodeURI("./template/workbench/role/bumenTree.html"));
                }
                else {
                    f_addTab(tabid,node.data.children[0].text+" 网盘硬盘",encodeURI("./template/workbench/role/bumenTree.html"));
                }

            }
        });

    }).error(function(data){
        alert("失败")
    })


}])

//流程
myApp.controller("role2Controller",["$scope","$http",function($scope,$http){
    $http({
        method: 'GET',
        url:$scope.appflow_tree02
    }).success(function(data){
        //流程菜单
        $("#appflow_tree2").ligerTree(
            //默认数据
            {
                data:data,
                onselect: function (node)
                {
                    //添加点击事件
                    var tabid = $(node.target).attr("tabid");//为当前的点击目标添加属性
                    if (!tabid)
                    {
                        //为当前设置属性值
                        tabid = new Date().getTime();
                        $(node.target).attr("tabid", tabid)
                    }
//                        cu_tabid=tabid;
//                        console.log(!node.data.isLeaf)  true
                    if (!node.data.isLeaf)
                    {
                        //点击目标,切换窗口
                        f_addTab(tabid,node.data.text,encodeURI("./template/workbench/role/bumenTree.html"));
                    }

                },
                checkbox:false
            }
        );
        //alert("成功")
    }).error(function(data){
        alert("失败")
    })
}])

//点击齿轮跳转
myApp.controller("gourl",["$scope","$http",function($scope,$http){

    //点击角色齿轮,跳转角色配置
    $scope.getgourl =function (type){

        if(type=="role"){
//            f_addTab('role',"角色配置",encodeURI('./admin/new_organizesetting/bumenTree.html'));
            f_addTab('role',"角色配置",encodeURI('./template/workbench/role/bumenTree.html'));
            // $http({
            //     method: 'GET',
            //     url: './data_json/bumenTree.json'
            // }).success(function(data){
            //     //console.log(data)
            //     $scope.gourldata = data;
            //     //异步请求,需要在这里保存数据
            //     $scope.gourldata = angular.fromJson($scope.gourldata)
            //     // console.log( $scope.role3data )
            //     alert("成功")
            // }).error(function(data){
            //     alert("失败")
            // })

        }else if(type=="form"){
            /*f_addTab('form',"表单配置",encodeURI('/admin/new_pagedesign/form_index.html'));*/
            // f_addTab('form',"表单配置",encodeURI('./admin/newtpl/formset.html'));
            f_addTab('form',"表单配置",encodeURI('./template/workbench/form/formset.html'));

        }else if(type=="flow"){
//            f_addTab('flow',"流程配置",encodeURI('./admin/flowsetting/index.htm'));
            f_addTab('flow',"流程配置",encodeURI("./template/workbench/flow/flow.html"));
        }
    }

}])

