var r=angular.module('re',[]);
r.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/re_search',{//我的中心
        templateUrl:"/re/tpl/re_search.html?t=" + Math.floor(Date.now() / 1000),
        controller:"reSearchCtr"
    })
    .when('/re_upfile',{
        templateUrl:"/re/tpl/re_upfile.html"
    })
    .when('/re_upfile_des/:type',{
        templateUrl:"/re/tpl/re_upfile_des.html?t=" + Math.floor(Date.now() / 1000),
        controller:"reUpfileDesctr"
    })
    .when('/re_des/:id/:type',{
        templateUrl:"/re/tpl/re_des.html?t=" + Math.floor(Date.now() / 1000),
        controller:"reDesctr"
    })
    .when('/re_comment/:id',{
        templateUrl:"/re/tpl/re_comment.html",
        controller:"reCommenctr"
    })
    .when('/u-class',{
        templateUrl:"/re/tpl/u-class.html"
    }).when('/detailed/:stage/:id',{
        templateUrl:"/re/tpl/detailed.html",
        controller:"reDetailedCtr"
    });
}]);
r.controller('rectr',["$scope","getData",function($scope,getData){
    $scope.gcss=['one','two','three'];
    $scope.school_period=getData.school_period;
    $scope.teaching_plan_type=getData.teaching_plan_type_oth;
    $scope.library_type=getData.library_type;
    $scope.listContentType='list';
   //初始化变量
    $scope.subject=null;
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
        "library_type_id":$scope.library_type[1].id,
        "library_type_title":$scope.library_type[1].title,
        "teaching_plan_type_id":$scope.teaching_plan_type[3].id,
        "teaching_plan_type_title":$scope.teaching_plan_type[3].title,
        "section_id":null,
        "section_key":null,
        "section_name":null,
        "r_section_id":null,
        "r_section_key":null,
        "r_section_name":null
    };
    $scope.tmp=null;
    $scope.section=null;
    $scope.r_section=null;
    $scope.version=null;
    //$scope.semester={};
    $scope.semester=null;
    $scope.showlist=function(){
        $scope.listContentType='list';
        if($scope.cur_teaching.library_type_id==2){
            $scope.listContentType='partlist';
        }
        var listsname="re_lists_"+$scope.cur_teaching.library_type_id+"_"+$scope.cur_teaching.subject_id+"_"+$scope.cur_teaching.version_id+"_"+$scope.cur_teaching.semester_id+"_"+$scope.cur_teaching.section_id+"_"+$scope.cur_teaching.r_section_id;
        console.log(listsname);
        var lists=TOOL.getObject(listsname);
        if(lists!=''){
            $scope.redata=lists;
            $scope.setHistory();
            return true;
        }
        var node='';
        if($scope.cur_teaching.r_section_id!=null){
            node=$scope.cur_teaching.r_section_key+$scope.cur_teaching.r_section_id;
        }else if($scope.cur_teaching.section_id!=null){
            node=$scope.cur_teaching.section_key+$scope.cur_teaching.section_id;
        }else if($scope.cur_teaching.semester_id!=null){
            node=$scope.cur_teaching.semester_key+$scope.cur_teaching.semester_id;
        }else if($scope.cur_teaching.version_id!=null){
            node=$scope.cur_teaching.version_key+$scope.cur_teaching.version_id;
        }else if($scope.cur_teaching.subject_id!=null){
            node=$scope.cur_teaching.subject_key+$scope.cur_teaching.subject_id;
        }else{
            node=$scope.cur_teaching.school_period_id;
        }
        if(node!=''){
            url='/resource/getResource?uId=0&library='+$scope.cur_teaching.library_type_id+'&node='+node+'&documentTypeId='+$scope.cur_teaching.teaching_plan_type_id+'&star=1&count=5';
            getData.getUrlData(url,'list').then(function (d) {  //正确请求成功时处理
                if(d.data==''||d.data.length<1){
                    $scope.redata=[];
                }else{
                    $scope.redata=d.data.data;
                }
                TOOL.setObject(listsname,$scope.redata);
            }).catch(function (result) { //捕捉错误处理
                console.log(2222222222222222);
            });
            $scope.setHistory();
        }
    };
    $scope.setHistory=function(){
        console.log("保存记录");
        var hjson={
            "section":$scope.section,
            "r_section":$scope.r_section,
            "subject":$scope.subject,
            "version":$scope.version,
            "semester":$scope.semester
        };
        TOOL.setObject('re-history',hjson);
        TOOL.setObject('cur_teaching',$scope.cur_teaching);
    }
    var hre=TOOL.getObject('re-history');
    if(hre==''){
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
                        $scope.section=res.data.msg;
                        $scope.cur_teaching.section_id=$scope.section[0].id;
                        $scope.cur_teaching.section_key=$scope.section[0].key;
                        $scope.cur_teaching.section_name=$scope.section[0].value;
                        $scope.showlist();
                    })
                })
            })
        }).catch(function(e){
            alert('获取数据出据');
        });
    }else{
        var cur_teaching=TOOL.getObject('cur_teaching');
        $scope.cur_teaching=angular.copy(cur_teaching);
        $scope.subject=angular.copy(hre.subject);
        $scope.version=angular.copy(hre.version);
        $scope.semester=angular.copy(hre.semester);
        $scope.section=angular.copy(hre.section);
        $scope.r_section=angular.copy(hre.r_section);
        $scope.showlist();
    }
    //教材类型
    $scope.teaching_material_type=1;

    //切换教材
    $scope.sptmp={
        "school_period":null,
        "subject":null,
        "version":null,
        "semester":null
    };
    $scope.btmp=null;
    $scope.sw_teaching=function(){
        $scope.tmp=angular.copy($scope.cur_teaching);
        $scope.btmp=angular.copy($scope.cur_teaching);
        $scope.sptmp.school_period=angular.copy($scope.school_period);
        $scope.sptmp.subject=angular.copy($scope.subject);
        $scope.sptmp.version=angular.copy($scope.version);
        $scope.sptmp.semester=angular.copy($scope.semester);
        $("#p_sw_material").show("slow");
    };
    $scope.setSchoolPeriod=function(id,title){
        $scope.tmp.school_period_id=id;
        $scope.tmp.school_period_name=title;
        $scope.subject=null;
        $scope.version=null;
        $scope.semester=null;
        $scope.tmp.section_id=null;
        $scope.tmp.r_section_id=null;
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
        getData.getUrlData("/node/nextNodes?pId="+id+"&isKno=0","version").then(function (res){
            $scope.version=res.data.msg;
        })
    }
    $scope.setVersion=function(id,key,title){
        $scope.tmp.version_id=id;
        $scope.tmp.version_key=key;
        $scope.tmp.version_name=title;
        $scope.semester=null;
        getData.getUrlData("/node/nextNodes?pId="+id+"&isKno=0","semester").then(function (res){
            $scope.semester=res.data.msg;
        })
    }
    $scope.setSemester=function(id,key,title){
        $scope.tmp.semester_id=id;
        $scope.tmp.semester_key=key;
        $scope.tmp.semester_name=title;
    }

    //打开切换资源
    $scope.swLibrary=function(){
        $scope.tmp=angular.copy($scope.cur_teaching);
        $("#p_sys").show("slow");
    };
    //切换资源
    $scope.setLibrary=function(id,title){
        $scope.tmp.library_type_id=id;
        $scope.tmp.library_type_title=title;
    };
    //确定资源更改
    $scope.sysLibraryConfirm=function(){
        if($scope.tmp.library_type_id==2){
            $scope.teaching_plan_type=getData.teaching_plan_type_oth;
        }else{
            $scope.teaching_plan_type=getData.teaching_plan_type;
        }
        $scope.tmp.teaching_plan_type_id=$scope.teaching_plan_type[0].id;
        $scope.cur_teaching=angular.copy($scope.tmp);
        $scope.showlist();
        $(".p_dig").hide("slow");
    }

    /*教案类别打开*/
    $scope.swTeaching=function(){
        $scope.tmp=angular.copy($scope.cur_teaching);
        $("#p_teaching").show("slow");
    };
    $scope.setTeachingPlanType=function(id,title){
        $scope.tmp.teaching_plan_type_id=id;
        $scope.tmp.teaching_plan_type_title=title;
    }
    $scope.teachingPlanTypeConfirm=function(){
        $scope.cur_teaching=angular.copy($scope.tmp);
        $scope.showlist();
        $(".p_dig").hide("slow");
    }

    //章节
    $scope.swChapter=function(){
        $scope.tmp=angular.copy($scope.cur_teaching);
        $("#p_chapter").show("slow");
    }
    $scope.getSection=function(id,key,title){
        $scope.tmp.section_id=id;
        $scope.tmp.section_key=key;
        $scope.tmp.section_name=title;
        $scope.tmp.r_section_id=null;
        $scope.tmp.r_section_key=null;
        $scope.tmp.r_section_name=null;
        getData.getUrlData("/node/nextNodes?pId="+id+"&isKno=0","section").then(function (res){
            $scope.r_section=res.data.msg;
        })
    }
    $scope.setSection=function(id,key,title){
        $scope.tmp.r_section_id=id;
        $scope.tmp.r_section_key=key;
        $scope.tmp.r_section_name=title;
    }
    $scope.chapterSubmit=function(){
        $scope.cur_teaching=angular.copy($scope.tmp);
        $scope.showlist();
        $("#p_chapter").hide("slow");
    }
    //取消切掉教材
    $scope.materialCancel=function(){
        $scope.cur_teaching=angular.copy($scope.btmp);
        $scope.tmp=null;
        $scope.school_period=angular.copy($scope.sptmp.school_period);
        $scope.subject=angular.copy($scope.sptmp.subject);
        $scope.version=angular.copy($scope.sptmp.version);
        $scope.semester=angular.copy($scope.sptmp.semester);
        $("#p_sw_material").hide("slow");
    }
    //确定切掉教材
    $scope.materialSubmit=function(){
        $scope.cur_teaching=angular.copy($scope.tmp);
        $scope.updataSection();
        //$scope.showlist();
        $("#p_sw_material").hide("slow");
    }

    //
    $scope.setTeachingMaterialType=function(type){
        $scope.teaching_material_type=type;
    }

    //关闭弹出窗口
    $scope.colseDig=function(){
        $scope.tmp=angular.copy($scope.cur_teaching);
        $(".p_dig").hide("slow");
    }
    function showlists(){
        $scope.showlist();
    }

    $scope.updataSection=function(){
        var node='';
        if($scope.cur_teaching.r_section_id!=null){
            node=$scope.cur_teaching.r_section_id;
        }else if($scope.cur_teaching.section_id!=null){
            node=$scope.cur_teaching.section_id;
        }else if($scope.cur_teaching.semester_id!=null){
            node=$scope.cur_teaching.semester_id;
        }else{
           console.log('没法读取章节');
            $scope.section=null;
            $scope.cur_teaching.section_id==null;
            $scope.cur_teaching.r_section_id==null;
            $scope.r_section=null;
            $scope.cur_teaching.r_section_name="章节内容";
            $scope.showlist();
           return false;
        }
        if(node!=''){
            url="/node/nextNodes?pId="+node+"&isKno=0";
            getData.getUrlData(url,'section').then(function (res) {  //正确请求成功时处理
                $scope.section=res.data.msg;
                $scope.cur_teaching.section_id=$scope.section[0].id;
                $scope.cur_teaching.section_key=$scope.section[0].key;
                $scope.cur_teaching.section_name=$scope.section[0].value;
                $scope.cur_teaching.r_section_id==null;
                $scope.r_section=null;
                $scope.showlist();
                /*$scope.section=d.data.data;
                console.log("$scope.section");
                console.log($scope.section);*/
            }).catch(function (result) { //捕捉错误处理
                console.log('没法读取章节');
                $scope.section=null;
                $scope.cur_teaching.section_id==null;
                $scope.cur_teaching.r_section_id==null;
                $scope.r_section=null;
                $scope.cur_teaching.r_section_name="章节内容";
                $scope.showlist();
            });
        }
    };


}])
.controller('reDesctr',["$scope","$http","$routeParams","getData",function($scope,$http,$routeParams,getData){
    var id=$routeParams.id;
    var type=$routeParams.type;
    if(id<1){
        return false;
    }
    /*变量定义区*/
    $scope.curr_course_type=[];
    $scope.curr_video_area='details';
    type=type<1?type:1;
    $scope.des=null;
    $scope.total=[1,2,3,4,5];
    var data=TOOL.getObject('redes');
    if(data==''){
        getData.getUrlData(root_url+"re/re_des_micr.js","re_des_micr").then(function(d){
            $scope.des=d.data;
            TOOL.setObject('redes',$scope.des);
            setCourseType();
        })
        /*$http.get(root_url+'re/re_des_micr.js?id='+id+'&type='+type).then(function (d) {
            $scope.des=d.data;
            TOOL.setObject('redes'+id,$scope.des);
            setCourseType();
        },function(e){
            alert('读取资源详细内容出错');
        });*/
    }else{
        $scope.des=data;
        setCourseType();
    }
    //
    $scope.swDesNav=function(type){
        $scope.curr_video_area=type;

    }
    function setCourseType(){
        $scope.curr_course_type=[];
        console.log(type);
        switch (type){
            case 1:
                console.log(222);
                $scope.curr_course_type.push({"key":"课程类型","value":$scope.des.curriculum.type});
                $scope.curr_course_type.push({"key":"课程难度","value":$scope.des.curriculum.difficulty});
                break;
        }
        console.log($scope.curr_course_type);
    }
}])
.controller('reCommenctr',["$scope","$http","$routeParams",function($scope,$http,$routeParams){
    $scope.star=1;
    $scope.content='';
    $scope.strnum=0;

    $scope.id=$routeParams.id;

    $scope.setStar=function(num){
        $scope.star=num;
    };
    $scope.GetQueryString=function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    };    
    $scope.strCount=function(){
        var strLength = 0, len = $scope.content.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = $scope.content.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128)
                strLength += 1;
            else
                strLength += 2;
        }
        $scope.strnum=strLength;
    };
    $scope.subComment=function(){
        if($scope.strnum>300){
            alert('评论内容太多，限制在300个字符内表达');
            return false;
        }
        var obj={'teaching_file_id':$scope.id,'user_id':1,'comments_star':$scope.star,'comments_content':$scope.content};
        
        $http({
            method:'post',
            url:root_url+'submit.php',
            data:obj,
            headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
        })
        .then(function(d){
            console.log('成功');
        },function(e){
            console.log('失败');
        });
    }
}])
.controller('reUpfileDesctr',["$scope","$http","$routeParams","$compile",function($scope,$http,$routeParams,$compile){
    $scope.curtype=$routeParams.type;
    if($scope.curtype==''){        
        alert('参数有错');
        return false;
    }    
    //校段
    $scope.xiaoduan=[{"id":1,"name":"初中"},{"id":2,"name":"高中"},{"id":3,"name":"大学"}];
    //   
    $scope.des=null;
    var section={};//{'sid1':{"id":1,"title":"章节","child":[{"id":1,'title':'子章节'}]}}
    var type={
        'microclass':{
            'title':'微课',
            'upfile_video_size':'400',
            'upfile_video_ext':'mp4,flv,avi,rmvb,3gp,mpeg,swf',
            'isEnclosure':true,
            'isCover':true,
            'iscurriculum':true
        },
        'u_class':{
            'title':'优课',
            'upfile_video_size':'400',
            'upfile_video_ext':'mp4,flv,avi,rmvb,3gp,mpeg,swf',
            'isEnclosure':true,
            'isCover':true,
            'iscurriculum':true
        },
        'doc':{
            'title':'文档',
            'upfile_video_size':'50',
            'upfile_video_ext':'txt,doc,docx,xls,xlsx,ppt,pptx,pdf',
            'isEnclosure':false,
            'isCover':false,
            'iscurriculum':false
        },
        'courseware':{
            'title':'课件',
            'upfile_video_size':'50',
            'upfile_video_ext':'txt,doc,docx,xls,xlsx,ppt,pptx,pdf',
            'isEnclosure':false,
            'isCover':false,
            'iscurriculum':false
        },
        'teaching_plan':{
            'title':'教案',
            'upfile_video_size':'50',
            'upfile_video_ext':'txt,doc,docx,xls,xlsx,ppt,pptx,pdf',
            'isEnclosure':false,
            'isCover':false,
            'iscurriculum':false
        },
        'guiding_case':{
            'title':'导学案',
            'upfile_video_size':'50',
            'upfile_video_ext':'txt,doc,docx,xls,xlsx,ppt,pptx,pdf',
            'isEnclosure':false,
            'isCover':false,
            'iscurriculum':false
        },
        'video':{
            'title':'视频',
            'upfile_video_size':'400',
            'upfile_video_ext':'mp4,flv,avi,rmvb,3gp,mpeg,swf',
            'isEnclosure':true,
            'isCover':true,
            'iscurriculum':false
        },
        'audio':{
            'title':'音频',
            'upfile_video_size':'100',
            'upfile_video_ext':'mp3,wma',
            'isEnclosure':false,
            'isCover':false,
            'iscurriculum':false
        },
        'picture':{
            'title':'图片',
            'upfile_video_size':'5',
            'upfile_video_ext':'jpg,png,bmp,gif,jpeg',
            'isEnclosure':false,
            'isCover':false,
            'iscurriculum':false
        }
    };
     
    switch($scope.curtype){
        case '2':
            $scope.des=type.microclass;
            break;
        case '3':
            $scope.des=type.u_class;
            break;
        case '11':
            $scope.des=type.doc;
            break;
        case '4':
            $scope.des=type.courseware;
            break;
        case '5':
            $scope.des=type.teaching_plan;
            break;
        case '6':
            $scope.des=type.guiding_case;
            break;
        case '12':
            $scope.des=type.video;
            break;
        case '13':
            $scope.des=type.audio;
            break;
        case '14':
            $scope.des=type.picture;
            break;
    }    

    //主要字段ID
    $scope.school_period_id=null;  
    $scope.subject_id=null;
    $scope.version_id=null;
    $scope.book_id=null;
    $scope.section_id=[];
    $scope.section_ids=null;
    $scope.knowledge_point_ids=null;
    $scope.section_child_id=[];
    $scope.knowledge_point_id=[];
    //课程类型ID
    $scope.CurriculumType_id=null;
    //课程难度
    $scope.CurriculumDifficulty_id=null;

    //表单默认值
    $scope.title='';
    $scope.desc='';
    $scope.label='';
    $scope.jurisdictionSet=1;
    $scope.shareSet=1;
    $scope.isReadClause=false;
    $scope.isread=false;

   
    $scope.subject={};
    $scope.version={};
    $scope.book={};
    $scope.section={};
    $scope.section_child={};
    $scope.knowledge_point={};
    $scope.knowledge_point_child={};
    $scope.CurriculumType=[];
    $scope.CurriculumDifficulty=[];

    $scope.tmpid={
        "school_period_id":null,
        "subject_id":null,
        "version_id":null,
        "book_id":null,
        "section_id":null,
        "section_title":null,
        "section_child_id":[],
        "knowledge_point_id":null,
        "knowledge_point_title":null,
        "knowledge_point_child_id":[],
        "CurriculumType_id":null,
        "CurriculumDifficulty_id":null,
    };

    //设置所有类型ID
    $scope.setTypeId=function(type,id,sw){
        switch (type){
            case "version":
                if(sw){
                    $scope.tmpid.version_id=id;
                }else{
                    $scope.tmpid.version_id=$scope.version_id;
                }
                break;
            case "subject":                
                if(sw){
                    $scope.tmpid.subject_id=id;
                }else{
                    $scope.tmpid.subject_id=$scope.subject_id;
                }   
                break;
            case "book":
                if(sw){
                    $scope.tmpid.book_id=id;
                }else{
                    $scope.tmpid.book_id=$scope.book_id;
                }
                break;
            case "section":
                if(sw){
                    $scope.tmpid.section_id=id;
                    $scope.setSectionChild(id);
                }else{
                    $scope.tmpid.section_id=$scope.section_id;
                }
                break;
            case "section_child":
                if(sw){
                    //$scope.tmpid.section_child_id=id;
                    for(var _i=0;_i < $scope.tmpid.section_child_id.length;_i++){
                        if(id==$scope.tmpid.section_child_id[_i]){
                            $scope.tmpid.section_child_id.splice(_i,1);
                            return false;
                            break;
                        }
                    }
                    $scope.tmpid.section_child_id.push(id);
                }else{
                    $scope.tmpid.section_child_id=$scope.section_child_id;
                }
                break;
            case "point":
                $scope.tmpid.point_id=id;
                break;
            case "Teachingmaterial":
                $scope.tmpid.teachingmaterial_id=id;
                break;
            case "CurriculumType":
                if(sw){
                    $scope.tmpid.CurriculumType_id=id;
                }else{
                    $scope.tmpid.CurriculumType_id=$scope.CurriculumType_id;
                }

                break;
            case "CurriculumDifficulty":
                if(sw){
                    $scope.tmpid.CurriculumDifficulty_id=id;
                }else{
                    $scope.tmpid.CurriculumDifficulty_id=$scope.CurriculumDifficulty_id;
                }
                break;
            case "xiaoduan":
                if(sw){
                    $scope.tmpid.school_period_id=id;
                }else{
                    $scope.tmpid.school_period_id=$scope.school_period_id;
                }                
                break;
        }
    };
    $scope.setTypeIdCon=function(type,id,sw,title,mykey){
        switch (type){
            case "section":
                if(sw){
                    $scope.tmpid.section_id=id;
                    $scope.tmpid.section_title=title;
                    $scope.setSectionChild(id);
                }else{
                    $scope.tmpid.section_id=null;
                }
                break;
            case "section_child":
                if(sw){
                    //$scope.tmpid.section_child_id=id;
                    for(var _i=0;_i < $scope.tmpid.section_child_id.length;_i++){
                        if(id==$scope.tmpid.section_child_id[_i].id){
                            $scope.tmpid.section_child_id.splice(_i,1);
                            return false;
                            break;
                        }
                    }
                    $scope.tmpid.section_child_id.push({"id":id,"title":title,"key":mykey+id});
                }else{
                    $scope.tmpid.section_child_id=$scope.section_child_id;
                }
                break;
            case "knowledge":
                if(sw){
                    $scope.tmpid.knowledge_point_id=id;
                    $scope.tmpid.knowledge_point_title=title;
                    $scope.setKnowledgeChild(id);
                }else{
                    $scope.tmpid.knowledge_point_id=null;
                    $scope.tmpid.knowledge_point_title=null;
                }
                break;
            case "knowledge_child":
                if(sw){
                    //$scope.tmpid.section_child_id=id;
                    for(var _i=0;_i < $scope.tmpid.knowledge_point_child_id.length;_i++){
                        if(id==$scope.tmpid.knowledge_point_child_id[_i].id){
                            $scope.tmpid.knowledge_point_child_id.splice(_i,1);
                            return false;
                            break;
                        }
                    }
                    $scope.tmpid.knowledge_point_child_id.push({"id":id,"title":title,"key":mykey+id});
                }else{
                    $scope.tmpid.knowledge_point_child_id=$scope.knowledge_point_id;
                }
                break;
        }
    };
    $scope.iscurPonit=function(id){
        for(var _i=0;_i < $scope.tmpid.knowledge_point_child_id.length;_i++){
            if(id==$scope.tmpid.knowledge_point_child_id[_i].id){
                return true;
                break;
            }
        }
        return false;
    }
    //打开校段
    $scope.showSchoolPeriod=function(){
        $("#p_xiaoduan").show("slow");
    }
    //打开科目
    $scope.showSubject=function(){
        if($scope.school_period_id<1){
            alert("请先选择校段");
            return false;
        } 
        $("#p_subject").show("slow");
    }
    //打开版本
    $scope.showVersion=function(){
        if($scope.subject_id<1){
            alert("请先选择科目");
            return false;
        } 
        $("#p_version").show("slow");
    }
    //打开册数
    $scope.showBook=function(){
        if($scope.version_id<1){
            alert("请先选择版本");
            return false;
        }
        $("#p_book").show("slow");
    }
    //打开章节
    $scope.showChapter=function(){
        if($scope.school_period_id==null || $scope.subject_id==null || $scope.version_id==null || $scope.book_id==null){
            alert('先选择校段、科目、版本、册数');
            return false;
        }
        $("#p_chapter").show("slow");
    }
    //打开知识点
    $scope.showKnowledgePoint=function(){
        if($scope.school_period_id==null || $scope.subject_id==null || $scope.version_id==null || $scope.book_id==null){
            alert('先选择校段、科目、版本、册数');
            return false;
        }
        var name="re_knowledge_bId_"+$scope.subject_id+"_sgId_"+$scope.school_period_id;
        var data=TOOL.getObject(name);
        if(data==''){
            var url=root_url+'/node/nextNodes?isKno=1&pId='+$scope.book_id;
            $http.get(url).then(function(d){
                $scope.knowledge_point=d.data.msg;
                TOOL.setObject(name,d.data.msg);
                $("#p_knowledge_point").show("slow");
            },function(e){
                $http.get("/data/new_re/knowledge_point.js").then(
                    function(d){
                        $scope.knowledge_point=d.data.msg;
                        TOOL.setObject(name,d.data.msg);
                    },function(e){
                        alert('获取数据出错');
                    }
                );
            });
        }else{
            $scope.knowledge_point=data;
            $("#p_knowledge_point").show("slow");
        }
    }
    //删除章节
    $scope.chapter_del=function(id){
        for(var i=0;i<$scope.section_id.length;i++){
            if(id==$scope.section_id[i]){
                $scope.section_id.splice(i,1);
                break;
            }
        }
        $('.section_id'+id).remove();
    }

    //校段处理
    $scope.setSchoolPeriod=function(){
        if($scope.tmpid.school_period_id<1){
            alert("请先选择校段再确定");
            return false;
        }        
        $scope.school_period_id=$scope.tmpid.school_period_id;

        var name="subject_school_period_"+$scope.school_period_id;
        var data=TOOL.getObject(name);
        if(data==''){
            var url=root_url+'/node/nextNodes?isKno=0&pId='+$scope.school_period_id;
            $http.get(url).then(function(d){
                $scope.subject=d.data.msg;
                TOOL.setObject(name,d.data.msg);
            },function(e){
                $http.get("/data/new_re/school_get_sub.js").then(
                    function(d){
                        $scope.subject=d.data.msg;
                        TOOL.setObject(name,d.data.msg);
                    },function(e){
                        alert('获取数据出错');
                    }
                );
            });
        }else{
            $scope.subject=data;
        }    
    };
    //科目处理
    $scope.setSubject=function(){
        if($scope.tmpid.subject_id<1){
            alert("请先选择科目再确定");
            return false;
        }        
        $scope.subject_id=$scope.tmpid.subject_id;

        var name="re_version_"+$scope.subject_id;
        var data=TOOL.getObject(name);

        if(data==''){
            var url=root_url+'/node/nextNodes?isKno=0&pId='+$scope.subject_id;
            $http.get(url).then(function(d){
                $scope.version=d.data.msg;
                TOOL.setObject(name,d.data.msg);
            },function(e){
                $http.get("/data/new_re/school_get_sub.js").then(
                    function(d){
                        $scope.version=d.data.msg;
                        TOOL.setObject(name,d.data.msg);
                    },function(e){
                        alert('获取数据出错');
                    }
                );
            });
        }else{
            $scope.version=data;
        }    
    };
    //版本处理
    $scope.setVersion=function(){
        if($scope.tmpid.version_id<1){
            alert("请先选择版本再确定");
            return false;
        }        
        $scope.version_id=$scope.tmpid.version_id;

        var name="re_book_"+$scope.version_id;
        var data=TOOL.getObject(name);

        if(data==''){
            var url=root_url+'/node/nextNodes?isKno=0&pId='+$scope.version_id;
            $http.get(url).then(function(d){
                $scope.book=d.data.msg;
                TOOL.setObject(name,d.data.msg);
            },function(e){
                $http.get("/data/new_re/version_get_book.js").then(
                    function(d){
                        $scope.subject=d.data.msg;
                        TOOL.setObject(name,d.data.msg);
                    },function(e){
                        alert('获取数据出错');
                    }
                );
            });
        }else{
            $scope.book=data;
        }    
    };
    //册数处理
    $scope.setBook=function(){
        if($scope.tmpid.book_id<1){
            alert("请先选择册数再确定");
            return false;
        }
        $scope.book_id=$scope.tmpid.book_id;

        var name="re_section_bId_"+$scope.book_id+"_sgId_"+$scope.school_period_id;
        var data=TOOL.getObject(name);

        if(data==''){
            var url=root_url+'/node/nextNodes?isKno=0&pId='+$scope.book_id;
            $http.get(url).then(function(d){
                $scope.section=d.data.msg;
                TOOL.setObject(name,d.data.msg);
            },function(e){
                $http.get("/data/new_re/book_get_section.js").then(
                    function(d){
                        $scope.section=d.data.msg;
                        TOOL.setObject(name,d.data.msg);
                    },function(e){
                        alert('获取数据出错');
                    }
                );
            });
        }else{
            $scope.section=data;
        }
    };
    //设置子章节
    $scope.setSectionChild=function(id){
        var name="re_section_bId_"+id+"_sgId_"+$scope.school_period_id;
        var data=TOOL.getObject(name);
        if(data==''){
            var url=root_url+'/node/nextNodes?isKno=0&pId='+id;
            $http.get(url).then(function(d){
                $scope.section_child=d.data.msg;
                TOOL.setObject(name,d.data.msg);
            },function(e){
                $http.get("/data/new_re/section_get_section_child.js").then(
                    function(d){
                        $scope.section_child=d.data.msg;
                        TOOL.setObject(name,d.data.msg);
                    },function(e){
                        alert('获取数据出错');
                    }
                );
            });
        }else{
            $scope.section_child=data;
        }
    }
    //设置章节
    $scope.setChapter=function(){
        var num=$scope.tmpid.section_child_id.length;
        var html='';
        if(num > 0){
            for(var i=0;i<num;i++){
                var v=$scope.tmpid.section_child_id[i];
                if($.inArray(v.id,$scope.section_id)==-1){
                    $scope.section_id.push(v.key);
                    html+='<dd class="section_id'+v.id+'">'+$scope.tmpid.section_title+' '+v.title+'<em ng-click="chapter_del('+v.id+')"></em></dd>';
                }
            }
        }
        $scope.tmpid.section_child_id=[];
        $scope.tmpid.section_id=null;
        $("#section_con_area").append($compile(html)($scope));
        $scope.section_ids=$scope.section_id.join(',');
        $("#p_chapter").hide("slow");
        /*var html='';
        var sid='sid'+$scope.tmpid.section_id;
        if(section.hasOwnProperty(sid)){
            var c=section[sid].child;
            var num=c.length;
            if(num>0){
                for(var i=0;i<c.length;i++){
                    hasOwnProperty
                }
            }
        }*/
    }
    //设置知识点
    $scope.setKnowledgePoint=function(){
        var num=$scope.tmpid.knowledge_point_child_id.length;
        var html='';
        if(num > 0){
            for(var i=0;i<num;i++){
                var v=$scope.tmpid.knowledge_point_child_id[i];
                if($.inArray(v.id,$scope.knowledge_point_id)==-1){
                    $scope.knowledge_point_id.push(v.key);
                    html+='<dd class="knowledge_point_'+v.id+'">'+$scope.tmpid.knowledge_point_title+' '+v.title+'<em ng-click="KnowledgePointDel('+v.id+')"></em></dd>';
                }
            }
        }
        $scope.tmpid.knowledge_point_child_id=[];
        $scope.tmpid.knowledge_point_id=null;
        $scope.knowledge_point_ids=$scope.knowledge_point_id.join(',');
        $("#knowledge_con_area").append($compile(html)($scope));
        $("#p_knowledge_point").hide("slow");
    }
    //删除知识点
    $scope.KnowledgePointDel=function(id){
        for(var i=0;i<$scope.knowledge_point_id.length;i++){
            if(id==$scope.knowledge_point_id[i]){
                $scope.knowledge_point_id.splice(i,1);
                break;
            }
        }
        $('.knowledge_point_'+id).remove();
    }
    //获取子知识点
    $scope.setKnowledgeChild=function(id){
        var name="re_knowledge_bId_"+id+"_sgId_"+$scope.school_period_id;
        var data=TOOL.getObject(name);
        if(data==''){
            var url=root_url+'/node/nextNodes?isKno=1&pId='+id;
            $http.get(url).then(function(d){
                $scope.knowledge_point_child=d.data.msg;
                TOOL.setObject(name,d.data.msg);
            },function(e){
                $http.get("/data/new_re/knowledge_point_child.js").then(
                    function(d){
                        $scope.knowledge_point_child=d.data.msg;
                        TOOL.setObject(name,d.data.msg);
                    },function(e){
                        alert('获取数据出错');
                    }
                );
            });
        }else{
            $scope.knowledge_point_child=data;
        }
    }

    //打开课程类型
    $scope.showCurriculumType=function(){
        /*if($scope.school_period_id==null || $scope.subject_id==null || $scope.version_id==null || $scope.book_id==null){
            alert('先选择校段、科目、版本、册数');
            return false;
        }*/
        var name="re_CurriculumTypeList";
        var data=TOOL.getObject(name);
        if(data==''){
            var url=root_url+'/resourceNodeQuery/knowlege?subjectId='+$scope.subject_id+'&stageId='+$scope.school_period_id;
            $http.get("/data/re/coursetype.js").then(function(d){
                $scope.CurriculumType=d.data;
                TOOL.setObject(name,d.data);
                $("#p_curriculumtype").show("slow");
            },function(e){
                console.log(e);
                alert('获取数据出错');
            });
        }else{
            $scope.CurriculumType=data;
            $("#p_curriculumtype").show("slow");
        }
    }
    //设置课程类型
    $scope.setCurriculumType=function(){
        if($scope.tmpid.CurriculumType_id<1){
            alert("请先选择课程类型再确定");
            return false;
        }
        $scope.CurriculumType_id=$scope.tmpid.CurriculumType_id;
    }

    //打开课程难度
    $scope.showCurriculumDifficulty=function(){
        var name="re_CurriculumDifficulty";
        var data=TOOL.getObject(name);
        if(data==''){
            var url=root_url+'/resourceNodeQuery/knowlege?subjectId='+$scope.subject_id+'&stageId='+$scope.school_period_id;
            $http.get("/data/re/CurriculumDifficulty.js").then(function(d){
                $scope.CurriculumDifficulty=d.data;
                TOOL.setObject(name,d.data);
                $("#p_curriculumdifficulty").show("slow");
            },function(e){
                console.log(e);
                alert('获取数据出错');
            });
        }else{
            $scope.CurriculumDifficulty=data;
            $("#p_curriculumdifficulty").show("slow");
        }
    }
    //设置课程难度
    $scope.setCurriculumDifficulty=function(){
        if($scope.tmpid.CurriculumDifficulty_id<1){
            alert("请先选择课程难度再确定");
            return false;
        }
        $scope.CurriculumDifficulty_id=$scope.tmpid.CurriculumDifficulty_id;
    }

    //阅读条款
    $scope.setRead=function(){
        $scope.isread=true;
    }

    $scope.uploadvideo=function(){
        $("#uploadvideo").click();
    };
    $scope.uploadenclosure=function(){
        $("#uploadenclosure").click();
    };
    $scope.uploadcover=function(){
        $("#uploadcover").click();
    };
    $scope.fileSelected=function(type){
        var file = document.getElementById(type).files;
        var filename='';
        if(file[0].name!=''){
            if(type=='uploadvideo'){
                if($scope.curtype)
                for(var i=0;i<file.length;i++){
                    filename=filename+file[i].name+'<br />';
                }
                $('.uploadvideocontent').html(filename);
            }else if(type=='uploadenclosure'){
                for(var i=0;i<file.length;i++){
                    filename=filename+file[i].name+'<br />';
                }
                $('.uploadenclosurecontent').html(filename);
            }else if(type=='uploadcover'){
                $('.uploadcovercontent').html(file[0].name);
            }
        }
    };
    $scope.upfileSumbt=function(){
        if(!$scope.isread){
            alert('提交前选阅读《资源上传服务条款》');
            return false;
        }
        var form = document.getElementById('uploadForm');
        var formdata = new FormData(form);
        if($scope.curtype==14){
            var files = document.getElementById('uploadvideo').files;
            var filenum=files.length;
            if(filenum>20){
                alert('最多只能上传20张图片!');
                return false;
            }
            for(var i = 0; i < filenum; i++) {
                var file = files[i];
                if(isExt('img',file.name)){
                    formdata.append('video[]', file, file.name);
                }
            }
        }
        if($scope.des.isEnclosure){
            var files = document.getElementById('uploadenclosure').files;
            var filenum=files.length;
            if(filenum>5){
                alert('最多只能上传5个附件!');
                return false;
            }
            for(var i = 0; i < filenum; i++) {
                var file = files[i];
                formdata.append('enclosure[]', file, file.name);
            }
        }
        $.ajax({
            /*url: 'http://test.com/test.php',*/
            url:root_url+'/uploadFile/resource/file.do',
            type: 'POST',
            data: formdata,
            dataType:'JSON',
            contentType: false,
            processData: false,
            success: function (d) {
                window.location.href="/re/#!/re_upfile";
            },
            error: function (XMLHttpRequest,textStatus,errorThrown) {
                console.log('error');

                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    };
    function isExt(type,name){
        var dot = name.lastIndexOf(".");
        var ext = name.substring(dot + 1);
        switch (type){
            case "img":
                var imgarr=["jpg","jpeg","png","bmp","gif"];
                if($.inArray(ext,imgarr)==-1){
                    return false;
                }
                break;
            case "doc":
                var docarr=["txt","doc","docx","xls","xlsx","ppt","pptx","pdf"];
                if($.inArray(ext,docarr)==-1){
                    return false;
                }
                break;
            case "video":
                var videoarr=["mp4","flv","avi","rmvb","3gp","mpeg","swf"];
                if($.inArray(ext,videoarr)==-1){
                    return false;
                }
                break;
            case "audio":
                var audioarr=["mp3","wma","mpeg"];
                if($.inArray(ext,audioarr)==-1){
                    return false;
                }
                break;
        }
        return true;
    }
}])
    .controller('reDetailedCtr',["$scope","$routeParams","getData",function($scope,$routeParams,getData){
        var fid=$routeParams.id;
        var stage=$routeParams.stage;
        if(fid < 1){
            alert('参数有错');
            return false;
        }
        $scope.des=null;
        ///resource/resourceMessage?uId=0&ids=561011&stage=1
        getData.getUrlData("/resource/resourceMessage?uId=0&ids="+fid+"&stage="+stage).then(function(d){
            $scope.des=d.data.data[0];
            console.log($scope.des);
        })
        $scope.reDownload=function(){
            getData.getUrlData("/resource/getResourceUrl?uId=0&id="+fid+"&stage="+stage).then(function(d){
                var urlpath=d.data.data;
                location.href=urlpath;
            })
        }
    }])
    .controller('reSearchCtr',["$scope","getData",function($scope,getData){
        $scope.lists=null;
        $scope.title=null;
        $scope.is_show_history=true;
        $scope.dummy_data=false;
        $scope.history=[];
        $scope.content={};
        $scope.type=["微课","优课","文档","试卷","题目","课件","教案","导学案","视频","音频","图片"];
        var hr=TOOL.getObject('search_history');
        if(hr!=''){
            $scope.history=hr;
        }
        $scope.search=function(){
            if($scope.title==null||$scope.title.trim('')==''){
                alert('没有输入搜索内容');
                return false;
            }
            $scope.setHistory();
            getData.getUrlData("/resource/getMyResource?uId=0&title="+$scope.title).then(function(d){
                if(d.data.status==1){
                    $scope.dummy_data=true;
                    $scope.is_show_history=false;
                }else{
                    $scope.dummy_data=false;
                    $scope.is_show_history=false;
                    $scope.lists=d.data.msg;
                    //console.log($scope.lists);
                    angular.forEach($scope.lists,function(v){
                        console.log(v);
                        if($scope.content.hasOwnProperty(v.fileType)){
                            console.log("vvvvvvvvvvvvvv");
                            $scope.content[v.fileType].list.push(v);
                        }else{
                            console.log("nnnnnnnnnnnnnnn");
                            $scope.content[v.fileType]={"filetype":v.fileType,"list":[]};
                            $scope.content[v.fileType].list.push(v);
                        }
                    });
                    /*for(var v in $scope.lists){

                    }*/
                    console.log($scope.content);
                }
            })
        }
        $scope.setTitle=function(title){
            console.log(title);
            $scope.title=title;
        }
        $scope.setHistory=function(){
            if($scope.history==''||$scope.history.length<1){
                $scope.history=[];
            }
            for(var k in $scope.history){
                if(k==$scope.title) return false;
            }
            if($scope.history.length>9){
                $scope.history.pop();
            }
            $scope.history.push($scope.title);
            TOOL.setObject('search_history',$scope.history);
        }
        $scope.clearSearch=function(){
            $scope.history=[];
            TOOL.setObject('search_history',$scope.history);
        }
    }]);;