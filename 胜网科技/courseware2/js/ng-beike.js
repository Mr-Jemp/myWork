var bk=angular.module('beike',[]);
bk.controller("beikeCtr",["$scope","getData","$http","$routeParams","$compile",function ($scope,getData,$http,$routeParams,$compile) {
    $scope.edit_beike_id=$routeParams.id;
    $scope.edit_beike_jc=$routeParams.type;
    $scope.gcss=['one','two','three'];
    $scope.school_period=getData.school_period;
    $scope.curr_beike_id=null;
    $scope.curr_beike_type='pptx';
    $scope.currfilename=null;
    $scope.bk_title=null;
    var iframe_src="http://192.168.0.93:9980/loleaflet/5.3.4/loleaflet.html?file_path=file://";
    //0我的资源，1,班级资源，２本校资源
    $scope.rs_type=1;
    $scope.setResrouceType=function(id){
        $scope.rs_type=id;
        $scope.getNode();
    }
    //初始化变量
    $scope.file_id=null;
    $scope.file_name=null;

    $scope.beikecontent=[];
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
                getData.getUrlData("/node/nextNodes?pId="+$scope.cur_teaching.semester_id+"&isKno=0","section").then(function (res){
                    console.log(res);
                    $scope.section=res.data.msg;
                    $scope.cur_teaching.section_id=$scope.section[0].id;
                    $scope.cur_teaching.section_key=$scope.section[0].key;
                    $scope.cur_teaching.section_name=$scope.section[0].value;
                    $scope.getNode();
                    $scope.getSemesterSection();
                })
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
        $scope.section=null;
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
        $scope.section=null;
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
        $scope.section=null;
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
        $scope.section=null;
        getData.getUrlData("/node/nextNodes?pId="+id+"&isKno=0","section").then(function (res){
            $scope.section=res.data.msg;
        })
    }
    $scope.setSection=function(id,key,title){
        $scope.tmp.section_id=id;
        $scope.tmp.section_key=key;
        $scope.tmp.section_name=title;
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

    //切换
    $scope.getNode=function(){
        var eduId=0;
        if($scope.rs_type>0){
            eduId=$scope.rs_type;
        }
        var key=$scope.cur_teaching.section_key+$scope.cur_teaching.section_id;
        getData.getUrlData("/resource/lesson/getOfNode?fileType=11&toWhere="+eduId+"&keyValue="+key+"&documentTypeSuffix="+$scope.curr_beike_type,"beike").then(function (res){
            var d=res.data;
            if(d.status==1){
                return false;
            }
            $scope.doBeiKeContent(d.msg);
        })
    }
    //设置资源类型
    $scope.setBeikeType=function(filetype){
        $scope.curr_beike_type=filetype;
        $scope.getNode();
    }
    //处理备课内容
    $scope.doBeiKeContent=function(list){
        $scope.beikecontent=[];
        if(list.length<1 || list=='')return false;
        var pice=null;
        var file=null;
        for(var v=0;v < list.length;v++){
            switch(list[v].suffix){
                case "mp4":
                    pice="/courseware2/img/video_img.png";
                    break;
                case "doc":
                case "docx":
                    pice="/courseware2/img/doc_img.png";
                    break;
                case "xls":
                case "xlsx":
                    pice="/courseware2/img/excel_img.png";
                    break;
                case "ppt":
                case "pptx":
                    pice="/courseware2/img/ppt_img.jpg";
                    break;
                case "pdf ":
                    pice="/courseware2/img/pdf_img.png";
                    break;
            }
            if(list[v].fileList.length>0){
                for(var i=0;i<list[v].fileList.length;i++){
                    if(list[v].fileList[i].fileType==0){
                        file=list[v].fileList[i].fileId;
                    }
                }
            }
            $scope.beikecontent.push({"id":list[v].id,"pice":pice,"file":file,"ext":list[v].suffix,"title":list[v].fileTitle});
        }
        if($scope.beikecontent.length>0){
           // $scope.doBeiKeCon($scope.beikecontent[0].id,$scope.beikecontent[0].file);
        }
    }
    $scope.doBeiKeCon=function(id,file){
        var flag=false;
        var ext=null;
        var dot = file.lastIndexOf(".");
        $scope.curr_beike_id=id;
        ext = file.substring(dot + 1);
        console.log(file);
        switch(ext){
            case "mp4":
                pice="/courseware2/img/video_img.png";
                break;
            case "doc":
            case "docx":
            case "xls":
            case "xlsx":
            case "ppt":
            case "pptx":
                var url="/resourceManagement/editFile?fileId="+file;
                getData.getUrlData(url,"beikefile").then(function (res){
                    var data = res.data;
                    console.log(src+data.msg);
                    if (data.status == 0 && data.msg!="") {
                        $scope.file_id=id;
                        $scope.file_name=data.msg;
                        $("#bk-iframe").attr('src',iframe_src+data.msg);
                    }else{
                        alert("没有找到文件");
                    }
                })
                /*$http.get(url)
                    .then(function(res) {
                        var data = res.data;
                        console.log(data);
                        if (data.status == 0 && data.msg!="") {
                            $("#bk-iframe").attr('src',src+data.msg);
                        }
                    })
                    .catch(function(err) {
                        console.error('open editor fail', err);
                        alert("没有找到文件");
                    });*/
                break;
            case "pdf":
                pice="/courseware2/img/pdf_img.png";
                break;
        }
    }
    //确定切掉教材
    $scope.updataSection=function(){
        $scope.cur_teaching=angular.copy($scope.tmp);
        $scope.getNode();
        $("#bk_sw_material").hide();
    };
    $scope.newBeiKe=function(){
        $http({
            method: 'post',
            url: 'http://oa.com/test.php',
            data: {"role_id":0},
            contentType: "application/json; charset=UTF-8"
        }).then(function(req) {
            console.log(req);
        })
        /*$http({
            method:'post',
            //url:'http://192.168.0.21:20896/htRoleService/getSearchInfoRole',
            url:"http://oa.com/test.php",
            data: {"role_id":0},

        }).then(function(req){
            console.log(req);
        }).then(function(er){
            console.log(er);
        });*/

        return false;
        if($scope.cur_teaching.section_key==null){
            alert("没有选择新建单元");
            return false;
        }
        getData.getUrlData("/resourceManagement/createFile?uId=20&node="+$scope.cur_teaching.section_key+"&suffix="+$scope.curr_beike_type,"newbeike").then(function (res){
            console.log(res);
            var d=res.data;
            if(d.status==0){
                $scope.currfilename=d.msg;
                $("#bk-iframe").attr('src',iframe_src+d.msg);
            }
        })
    }
    //保存备课
    $scope.doSave=function(){
        if($scope.bk_title==null){alert("保存标题不能为空");return false;};
        /*if ($scope.file_name==null) {
            console.log('should open file first');
            return;
        }*/
        var url=root_url+"/resourceManagement/saveFile?uId=20&fileMessageId="+$scope.file_id+"&saveName="+$scope.bk_title+"&filePath="+$scope.file_name;
        $http.get(url)
            .then(function(res){
                if(res.data.status==0){
                    window.location.href="/courseware2";
                }else{
                    console.log(res);
                    alert('服务忙...稍后再试');
                }
                console.log(res);
            })
            .catch(function(err){
                console.log(err);
                alert('服务忙...稍后再试');
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
            $(".p_sw_material_tree").html('<div class="main-l-c"><span class="no-section">没有章节内容</span></div>');
        }else{
            $(".p_sw_material_tree").html($compile("<ul class='unit-tree'>" + html + "</ul>")($scope));
        }
    }
    $scope.getSemesterSection=function(){
        getData.getUrlData("/resource/lesson/catalogInit?keyValue="+$scope.cur_teaching.semester_key+$scope.cur_teaching.semester_id+"&eduId="+$scope.cur_teaching.school_period_id,"lenssons").then(function (res){
            if(res.data.msg.catalog!={}){
                $scope.showlist(res.data.msg.catalog);
            }
        })
    }
}]);