var les=angular.module('les',[]);
les.controller("lenssons",["$scope","getData","$compile",function ($scope,getData,$compile) {
    $scope.gcss=['one','two','three'];
    $scope.school_period=getData.school_period;
    //0我的，1是本班的，2本校 3推荐
    $scope.classification=3;
    //初始化变量
    $scope.school_period_id=null;
    $scope.school_period_name='点击选择教材';
    $scope.subject_id=null;
    $scope.subject_name='';
    $scope.version_id=null;
    $scope.version_name='';
    $scope.semester_id=null;
    $scope.semester_name='';
    $scope.section_id=[];
    $scope.section_ids=null;
    $scope.subject=null;
    $scope.list0=null;
    $scope.list1=null;
    $scope.list2=null;
    $scope.list3=null;
    $scope.cur_teaching={
        "subject_id":null,
        "subject_key":null,
        "subject_name":null,
        "school_period_id":$scope.school_period[0].id,
        "school_period_name":$scope.school_period[0].name,
        "version_id":null,
        "version_key":null,
        "version_name":null,
        "semester_id":null,
        "semester_key":null,
        "semester_name":null,
        "section_id":null,
        "section_key":null,
        "section_name":null
    };
    $scope.tmp=null;
    $scope.section=null;
    $scope.cur_section_id=null;
    $scope.cur_section_key=null;
    $scope.version=null;
    //$scope.semester={};
    $scope.semester=null;

    getData.getUrlData("/node/nextNodes?pId="+$scope.cur_teaching.school_period_id+"&isKno=0","subject").then(function (res){
        $scope.subject=res.data.msg;
        $scope.cur_teaching.subject_id=$scope.subject[0].id;
        $scope.cur_teaching.subject_key=$scope.subject[0].key;
        $scope.cur_teaching.subject_name=$scope.subject[0].value;
        getData.getUrlData("/node/nextNodes?pId="+$scope.cur_teaching.subject_id+"&isKno=0","version").then(function (res){
            $scope.version=res.data.msg;
            $scope.cur_teaching.version_id=$scope.version[0].id;
            $scope.cur_teaching.version_key=$scope.version[0].key;
            $scope.cur_teaching.version_name=$scope.version[0].value;
            getData.getUrlData("/node/nextNodes?pId="+$scope.cur_teaching.version_id+"&isKno=0","semester").then(function (res){
                $scope.semester=res.data.msg;
                $scope.cur_teaching.semester_id=$scope.semester[0].id;
                $scope.cur_teaching.semester_key=$scope.semester[0].key;
                $scope.cur_teaching.semester_name=$scope.semester[0].value;
                getData.getUrlData("/resource/lesson/catalogInit?keyValue="+$scope.cur_teaching.semester_key+$scope.cur_teaching.semester_id+"&eduId="+$scope.classification,"lenssons").then(function (res){
                    console.log(res);
                    $("#waitfor").hide();
                    if(res.data.status==1){
                        alert('没有备课内容');
                        return false;
                    }
                    $scope.list3=null;
                    if(res.data.msg.allFile!=undefined || res.data.msg.allFile.length>0){
                        $scope.list3=res.data.msg.allFile;
                    }
                    if(res.data.msg.catalog!={}){
                        //$scope.list1=res.data.msg.allFile;
                        $scope.showlist(res.data.msg.catalog);
                    }
                })
                /*getData.getUrlData("/node/nextNodes?pId="+$scope.cur_teaching.semester_id+"&type="+$scope.classification+"&isKno=0","section").then(function (res){
                    $scope.section=res.data.msg;
                    $scope.cur_teaching.section_id=$scope.section[0].id;
                    $scope.cur_teaching.section_key=$scope.section[0].key;
                    $scope.cur_teaching.section_name=$scope.section[0].value;
                    $scope.tmp=angular.copy($scope.cur_teaching);

                    /!*getData.getUrlData("/resource/lesson/catalogInit?uId="+$scope.classification+"&classId=0&schoolId=0&eduId=0&keyValue="+$scope.cur_teaching.semester_key+$scope.cur_teaching.semester_id,"lenssons").then(function (res){
                        console.log(res);
                    })*!/
                })*/
            })
        })
    }).catch(function(e){
        alert('获取数据出据');
    });
    $scope.setSchoolPeriod=function(id,title){
        $scope.tmp.school_period_id=id;
        $scope.tmp.school_period_name=title;
        $scope.subject=null;
        $scope.version=null;
        $scope.semester=null;
        $scope.tmp.section_id=null;
        $scope.tmp.subject_id=null;
        $scope.tmp.version_id=null;
        $scope.tmp.semester_id=null;
        getData.getUrlData("/node/nextNodes?pId="+id+"&isKno=0","subject").then(function (res){
            $scope.subject=res.data.msg;
        })
    }
    $scope.setSubject=function(id,key,title){
        $scope.tmp.subject_id=id;
        $scope.tmp.subject_key=key;
        $scope.tmp.subject_name=title;
        $scope.version=null;
        $scope.semester=null;
        $scope.tmp.section_id=null;
        $scope.tmp.version_id=null;
        $scope.tmp.semester_id=null;
        getData.getUrlData("/node/nextNodes?pId="+id+"&isKno=0","version").then(function (res){
            $scope.version=res.data.msg;
        })
    }
    $scope.setCurSection=function(id){
        $scope.cur_section_id=id;
    }
    $scope.setVersion=function(id,key,title){
        $scope.tmp.version_id=id;
        $scope.tmp.version_key=key;
        $scope.tmp.version_name=title;
        $scope.semester=null;
        $scope.tmp.section_id=null;
        $scope.tmp.semester_id=null;
        getData.getUrlData("/node/nextNodes?pId="+id+"&isKno=0","semester").then(function (res){
            $scope.semester=res.data.msg;
        })
    }
    $scope.setSemester=function(id,key,title){
        $scope.tmp.semester_id=id;
        $scope.tmp.semester_key=key;
        $scope.tmp.semester_name=title;
        $scope.tmp.section_id=null;
    }
    //新建备课
    $scope.newBeiKe=function(){
        //var id=$scope.cur_teaching.school_period_id+"_"+$scope.cur_teaching.subject_id+"_"+$scope.cur_teaching.version_id+"_"+$scope.cur_teaching.semester_id+"_"+$scope.cur_teaching.section_id;
        window.location.href="#!/beiKe/0/0";

    }
    //编辑备课
    $scope.goEdit=function(id){
        var jc=$scope.cur_teaching.school_period_id+"_"+$scope.cur_teaching.subject_id+"_"+$scope.cur_teaching.version_id+"_"+$scope.cur_teaching.semester_id+"_"+$scope.cur_teaching.section_id;
        window.location.href="#!/beiKe/"+id+"/"+jc;//校段_科目_版本_册_单元
    }

    //打开教材框
    $scope.openTeachingMmaterial=function(){
        var tm=$("#bk_sw_material");
        var st=tm.css('display');
        if(st=='none'){
            $scope.tmp=angular.copy($scope.cur_teaching);
            tm.show();
        }else{
            $scope.tmp=null;
            tm.hide();
        }
    }
    //确定切掉教材
    $scope.updataSection=function(){
        $("#waitfor").show();
        $scope.cur_teaching=angular.copy($scope.tmp);
        var node='';
        if($scope.cur_teaching.semester_id!=null){
            node=$scope.cur_teaching.semester_id;
        }else{
            console.log('没法读取章节');
            $scope.section=null;
            $scope.cur_teaching.section_id==null;
        }
        if(node!=''){
            var eduId=0;
            if($scope.classification>0){
                eduId=$scope.classification;
            }
            getData.getUrlData("/resource/lesson/catalogInit?eduId="+eduId+"&keyValue="+$scope.cur_teaching.semester_key+$scope.cur_teaching.semester_id,"lenssons").then(function (res){
                if(res.data.status==1){
                    alert('没有备课内容');
                    return false;
                }
                if(res.data.msg.allFile!=undefined || res.data.msg.allFile.length>0){
                    $scope.beiKeList(res.data.msg.allFile);
                }
                if(res.data.msg.catalog!={}){
                    //$scope.list1=res.data.msg.allFile;
                    $scope.showlist(res.data.msg.catalog);
                }
            })
            /*url="/node/nextNodes?isKno=0&pId="+node+"&type="+$scope.classification;
            getData.getUrlData(url,'section').then(function (res) {  //正确请求成功时处理
                $scope.section=res.data.msg;
                $scope.cur_teaching.section_id=$scope.section[0].id;
                $scope.cur_teaching.section_key=$scope.section[0].key;
                $scope.cur_teaching.section_name=$scope.section[0].value;
            }).catch(function (result) { //捕捉错误处理
                console.log('没法读取章节');
                $scope.section=null;
                $scope.cur_teaching.section_id==null;
                $scope.cur_teaching.r_section_id==null;
            });*/
        }
        $("#bk_sw_material").hide();
        $("#waitfor").hide();
    };
    //设置备课类型
    $scope.setBkType=function(id){
        $scope.classification=id;
        var eduId=0;
        if(id>0){
            eduId=id;
        }
        $scope.showNodeContent($scope.cur_section_key);
        /*getData.getUrlData("/resource/lesson/catalogInit?eduId="+eduId+"&keyValue="+$scope.cur_teaching.semester_key+$scope.cur_teaching.semester_id,"lenssons").then(function (res){
            $("#waitfor").hide();
            if(res.data.status==1){
                alert('没有备课内容');
                return false;
            }
            $scope.list1=null;
            if(res.data.msg.allFile!=undefined || res.data.msg.allFile.length>0){
                $scope.beiKeList(res.data.msg.allFile);
            }
            if(res.data.msg.catalog!={}){
                //$scope.list1=res.data.msg.allFile;
                //$scope.showlist(res.data.msg.catalog);
            }
        })*/
    }
    //对应备课列表
    $scope.beiKeList=function(list){
        switch ($scope.classification){
            case 0:
                $scope.list0=list;
                break;
            case 2:
                $scope.list2=list;
                break;
            case 1:
                $scope.list1=list;
                break;
        }
    }
    //显示章节对应备课列表
    $scope.showNodeContent=function(key){
        var eduId=0;
        if($scope.classification>0){
            eduId=$scope.classification;
        }
        $scope.cur_section_key=key;
        getData.getUrlData("/resource/lesson/getOfNode?eduId="+eduId+"&keyValue="+key,"lenssons").then(function (res){
            console.log(res);
            var d=res.data;
            if(d.status==1)return false;
            $scope.beiKeList(d.msg);
        })
    }

    //显示章节
    $scope.getChilderen=function(arr){
        var name = arr['name'];
        var key = arr['key'];
        var html="";
        var str ="";
        for (var item in arr) {
            if (item != "name" && item != "key"){
                var c=arr[item];
                str +=$scope.getChilderen(c);
            }
        }
        if(str!=''){
            html += "<li><span ng-click='showNodeContent(\""+key+"\")'><em class='parent-node'></em>" + name + "</span>";
            html += "<ul class='close-node'>"+str+"</ul>";
            html += "</li>";
        }else{
            return "<li><span ng-click='showNodeContent(\""+key+"\")'><em></em>" + name + "</span></li>";
        }
        return html;
    }
    $scope.showlist=function(tree){
        var html = '';
        for (var it in tree) {
            if (it != "name" && it != "key"){
                html +=$scope.getChilderen(tree[it]);
            }
        }
        if(html==''){
            $("#tree").html('<div class="main-l-c"><span class="no-section">没有章节内容</span></div>');
        }else{
            $("#tree").html($compile("<ul class='unit-tree'>" + html + "</ul>")($scope));
        }
    }
}]);