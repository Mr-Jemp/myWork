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
r.filter("myjoin",function(){
    return function(obj){
        return obj.join(',');
    }
});
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
        "library_type_id":$scope.library_type[3].id,
        "library_type_title":$scope.library_type[3].title,
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
        var listsname="ls"+$scope.cur_teaching.library_type_id+"_"+$scope.cur_teaching.subject_id+"_"+$scope.cur_teaching.version_id+"_"+$scope.cur_teaching.semester_id+"_"+$scope.cur_teaching.section_id+"_"+$scope.cur_teaching.r_section_id;
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
        var url='/resource/getResource?uId=1&library='+$scope.cur_teaching.library_type_id+'&node='+node+'&documentTypeId='+$scope.cur_teaching.teaching_plan_type_id+'&star=1&count=5';
        if($scope.cur_teaching.library_type_id==2){
            $scope.listContentType='partlist';
        }else{
            url='/resource/getMyResource?uId=0&key='+node+'&fileType='+$scope.cur_teaching.teaching_plan_type_id;
        }
        var lists=TOOL.getObject(listsname);
        if(lists!=''){
            $scope.redata=lists;
            $scope.setHistory();
            return true;
        }
        console.log();
        if(node!=''){
            //http://192.168.0.21:20894/resource/getMyResource?uId=0&title=一&key=1-4-28-194&fileType=2&courseType=19&courseLevel=22
            getData.getUrlData(url,$scope.listContentType).then(function (d) {  //正确请求成功时处理
                if($scope.cur_teaching.library_type_id==2){
                    if(d.data==''||d.data.length<1){
                        $scope.redata=[];
                    }else{
                        $scope.redata=d.data.data;
                        TOOL.setObject(listsname,$scope.redata);
                    }
                }else{
                    if(d.data==''||d.data.msg.length<1){
                        $scope.redata=[];
                    }else{
                        $scope.redata=d.data.msg;
                        TOOL.setObject(listsname,$scope.redata);
                    }
                }
                console.log(d);
            }).catch(function (result) { //捕捉错误处理
                console.log(result);
                console.log(2222222222222222);
            });
            $scope.setHistory();
        }
    };
    $scope.setHistory=function(){
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
        $("#p_sw_material").show();
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
        $("#p_sys").show();
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
        $scope.tmp.teaching_plan_type_title=$scope.teaching_plan_type[0].title;
        $scope.cur_teaching=angular.copy($scope.tmp);
        $scope.showlist();
        $(".p_dig").hide();
    }

    /*教案类别打开*/
    $scope.swTeaching=function(){
        $scope.tmp=angular.copy($scope.cur_teaching);
        $("#p_teaching").show();
    };
    $scope.setTeachingPlanType=function(id,title){
        $scope.tmp.teaching_plan_type_id=id;
        $scope.tmp.teaching_plan_type_title=title;
    }
    $scope.teachingPlanTypeConfirm=function(){
        $scope.cur_teaching=angular.copy($scope.tmp);
        $scope.showlist();
        $(".p_dig").hide();
    }

    //章节
    $scope.swChapter=function(){
        $scope.tmp=angular.copy($scope.cur_teaching);
        $("#p_chapter").show();
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
        $("#p_chapter").hide();
    }
    //取消切掉教材
    $scope.materialCancel=function(){
        $scope.cur_teaching=angular.copy($scope.btmp);
        $scope.tmp=null;
        $scope.school_period=angular.copy($scope.sptmp.school_period);
        $scope.subject=angular.copy($scope.sptmp.subject);
        $scope.version=angular.copy($scope.sptmp.version);
        $scope.semester=angular.copy($scope.sptmp.semester);
        $("#p_sw_material").hide();
    }
    //确定切掉教材
    $scope.materialSubmit=function(){
        $scope.cur_teaching=angular.copy($scope.tmp);
        $scope.updataSection();
        //$scope.showlist();
        $("#p_sw_material").hide();
    }

    //
    $scope.setTeachingMaterialType=function(type){
        $scope.teaching_material_type=type;
    }

    //关闭弹出窗口
    $scope.colseDig=function(){
        $scope.tmp=angular.copy($scope.cur_teaching);
        $(".p_dig").hide();
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
            alert('评论成功!');
            window.location.href="/re/#!/re_des/33/2";
        },function(e){
            console.log('失败');
            alert("评论成功!");
            window.location.href="/re/#!/re_des/33/2";
        });
    }
}])
.controller('reUpfileDesctr',["$scope","$routeParams","$compile","getData",function($scope,$routeParams,$compile,getData){
    $scope.curtype=$routeParams.type;
    if($scope.curtype==''){        
        alert('参数有错');
        return false;
    }
    $scope.des=null;
    var type={
        'microclass':{
            'title':'微课',
            'upfile_video_size':100,
            'upfile_video_ext':['mp4','flv','avi','rmvb','3gp','mpeg','swf'],
            'isEnclosure':true,
            'isCover':true,
            'pic':'/re/img/re_upfile_des/upfile_icon/icon_weike.png',
            'iscurriculum':true
        },
        'u_class':{
            'title':'优课',
            'upfile_video_size':100,
            'upfile_video_ext':['mp4','flv','avi','rmvb','3gp','mpeg','swf'],
            'isEnclosure':true,
            'isCover':true,
            'pic':'/re/img/re_upfile_des/upfile_icon/icon_youke .png',
            'iscurriculum':true
        },
        'doc':{
            'title':'文档',
            'upfile_video_size':10,
            'upfile_video_ext':['txt','doc','docx','xls','xlsx','ppt','pptx','pdf'],
            'isEnclosure':false,
            'isCover':false,
            'pic':'/re/img/re_upfile_des/upfile_icon/icon_wendang.png',
            'iscurriculum':false
        },
        'courseware':{
            'title':'课件',
            'upfile_video_size':20,
            'upfile_video_ext':['txt','doc','docx','xls','xlsx','ppt','pptx','pdf'],
            'isEnclosure':false,
            'isCover':false,
            'pic':'/re/img/re_upfile_des/upfile_icon/icon_kejian.png',
            'iscurriculum':false
        },
        'teaching_plan':{
            'title':'教案',
            'upfile_video_size':20,
            'upfile_video_ext':['txt','doc','docx','xls','xlsx','ppt','pptx','pdf'],
            'isEnclosure':false,
            'isCover':false,
            'pic':'/re/img/re_upfile_des/upfile_icon/icon_jiaoan.png',
            'iscurriculum':false
        },
        'guiding_case':{
            'title':'导学案',
            'upfile_video_size':10,
            'upfile_video_ext':['txt','doc','docx','xls','xlsx','ppt','pptx','pdf'],
            'isEnclosure':false,
            'isCover':false,
            'pic':'/re/img/re_upfile_des/upfile_icon/icon_daoxuean.png',
            'iscurriculum':false
        },
        'video':{
            'title':'视频',
            'upfile_video_size':50,
            'upfile_video_ext':['mp4','flv','avi','rmvb','3gp','mpeg','swf'],
            'isEnclosure':true,
            'isCover':true,
            'pic':'/re/img/re_upfile_des/upfile_icon/icon_shipin.png',
            'iscurriculum':false
        },
        'audio':{
            'title':'音频',
            'upfile_video_size':50,
            'upfile_video_ext':['mp3','wma'],
            'isEnclosure':false,
            'isCover':false,
            'pic':'/re/img/re_upfile_des/upfile_icon/icon_yinpin.png',
            'iscurriculum':false
        },
        'picture':{
            'title':'图片',
            'upfile_video_size':50,
            'upfile_video_ext':['jpg','png','bmp','gif','jpeg'],
            'isEnclosure':false,
            'isCover':false,
            'pic':'/re/img/re_upfile_des/upfile_icon/icon_tupian.png',
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
    $scope.school_period=getData.school_period;
    //初始化变量
    //表单默认值
    $scope.title='';
    $scope.explain='';
    $scope.label='';

    $scope.isread=false;
    $scope.subject=null;
    $scope.cur_var={
        "subject_id":null,
        "subject_key":null,
        "subject_name":null,
        "school_period_id":null,
        "school_period_name":null,
        "version_id":null,
        "version_key":null,
        "version_name":null,
        "semester_id":null,
        "semester_key":null,
        "semester_name":null,
        "section_id":null,
        "section_key":null,
        "section_name":null,
        "section_child_id":null,
        "section_child_ids":[],
        "section_child_key":null,
        "section_child_name":null,
        "knowledge_point_id":null,
        "knowledge_point_title":null,
        "knowledge_point_ids":[],
        "curriculum_type_id":null,
        "curriculum_type_name":null,
        "curriculum_difficulty_id":null,
        "curriculum_difficulty_name":null
    };
    $scope.tmp=null;
    $scope.section=null;
    $scope.section_id=[];
    $scope.section_ids=null;
    $scope.section_child=null;
    $scope.knowledge_point=null;
    $scope.knowledge_point_id=null;
    $scope.knowledge_point_child=null;
    $scope.version=null;
    $scope.semester=null;

    //设置校段
    $scope.showSchoolPeriod=function(){
        $scope.tmp=angular.copy($scope.cur_var);
        $("#p_xiaoduan").show();
    }
    $scope.setSchoolPeriod=function(){
        if($scope.cur_var.school_period_id!=$scope.tmp.school_period_id){
            $scope.cur_var=angular.copy($scope.tmp);
            $scope.subject=null;
            $scope.version=null;
            $scope.semester=null;
            $scope.section=null;
            $scope.section_child=null;
            var re_cache=TOOL.getObject('re_des_subject');
            if(re_cache==''){
                getData.getUrlData("/node/nextNodes?isKno=0&pId="+$scope.cur_var.school_period_id,'subject').then(function (res) {  //正确请求成功时处理
                    $scope.subject=res.data.msg;
                    TOOL.setObject('re_des_subject',$scope.subject);
                }).catch(function (result) { //捕捉错误处理
                    console.log('没法读取章节');
                });
            }else{
                $scope.subject=re_cache;
            }

        }
        $("#p_xiaoduan").hide();
    }
    //设置科目
    $scope.showSubject=function(){
        if($scope.cur_var.school_period_id<1){
            alert("首先选择校段");
            return false;
        }
        $scope.tmp=angular.copy($scope.cur_var);
        $("#p_subject").show();
    }
    $scope.setSubject=function(){
        if($scope.cur_var.subject_id!=$scope.tmp.subject_id){
            $scope.cur_var=angular.copy($scope.tmp);
            $scope.version=null;
            $scope.semester=null;
            $scope.section=null;
            $scope.section_child=null;
            var re_cache=TOOL.getObject('re_des_version');
            if(re_cache==''){
                getData.getUrlData("/node/nextNodes?isKno=0&pId="+$scope.cur_var.subject_id,'version').then(function (res) {  //正确请求成功时处理
                    $scope.version=res.data.msg;
                    TOOL.setObject('re_des_version',$scope.version);
                }).catch(function (result) { //捕捉错误处理
                    console.log('没法读取章节');
                });
            }else{
                $scope.version=re_cache;
            }

        }
        $("#p_subject").hide();
    }
    //设置版本
    $scope.showVersion=function(){
        if($scope.cur_var.subject_id<1){
            alert("首先选择科目");
            return false;
        }
        $scope.tmp=angular.copy($scope.cur_var);
        $("#p_version").show();
    }
    $scope.setVersion=function(){
        if($scope.cur_var.version_id!=$scope.tmp.version_id){
            $scope.cur_var=angular.copy($scope.tmp);
            $scope.semester=null;
            $scope.section=null;
            $scope.section_child=null;
            var re_cache=TOOL.getObject('re_des_semester');
            if(re_cache==''){
                getData.getUrlData("/node/nextNodes?isKno=0&pId="+$scope.cur_var.version_id,'semester').then(function (res) {  //正确请求成功时处理
                    $scope.semester=res.data.msg;
                    TOOL.setObject('re_des_semester',$scope.semester);
                }).catch(function (result) { //捕捉错误处理
                    console.log('没法读取章节');
                });
            }else{
                $scope.semester=re_cache;
            }
        }
        $("#p_version").hide();
    }
    //设置册数
    $scope.showSemester=function(){
        if($scope.cur_var.version_id<1){
            alert("首先选择版本");
            return false;
        }
        $scope.tmp=angular.copy($scope.cur_var);
        $("#p_semester").show();
    }
    $scope.setSemester=function(){
        if($scope.cur_var.semester_id!=$scope.tmp.semester_id){
            $scope.cur_var=angular.copy($scope.tmp);
            $scope.section=null;
            $scope.section_child=null;
            var re_cache=TOOL.getObject('re_des_section');
            if(re_cache==''){
                getData.getUrlData("/node/nextNodes?isKno=0&pId="+$scope.cur_var.semester_id,'section').then(function (res) {  //正确请求成功时处理
                    $scope.section=res.data.msg;
                    TOOL.setObject('re_des_section',$scope.section);
                }).catch(function (result) { //捕捉错误处理
                    console.log('没法读取章节');
                });
            }else{
                $scope.section=re_cache;
            }
        }
        $("#p_semester").hide();
    }

    //章节内容
    $scope.showChapter=function(){
        if($scope.cur_var.school_period_id==null || $scope.cur_var.subject_id==null || $scope.cur_var.version_id==null || $scope.cur_var.semester_id==null){
            alert('先选择校段、科目、版本、册数');
            return false;
        }
        $scope.tmp=angular.copy($scope.cur_var);
        $("#p_chapter").show();
    }
    //设置子章节
    $scope.setSectionChild=function(id){
        var name="re_des_section_child_"+id;
        var data=TOOL.getObject(name);
        if(data==''){
            getData.getUrlData("/node/nextNodes?pId="+id+"&isKno=0","section").then(function (res){
                $scope.section_child=res.data.msg;
                TOOL.setObject(name,$scope.section_child);
            })
        }else{
            $scope.section_child=data;
        }
    }
    //设置章节
    $scope.setChapter=function(){
        $scope.cur_var=angular.copy($scope.tmp);
        var num=$scope.cur_var.section_child_ids.length;
        $scope.section_id=[];
        var html='';
        if(num > 0){
            for(var i=0;i<num;i++){
                var v=$scope.cur_var.section_child_ids[i];
                $scope.section_id.push(v.key);
                html+='<dd class="section_id'+v.id+'">'+v.fulltitle+'<em ng-click="chapter_del('+v.id+')"></em></dd>';
            }
        }
        //$scope.tmp.section_child_id=[];
        $("#section_con_area dd").remove();
        $("#section_con_area").append($compile(html)($scope));
        $scope.section_ids=$scope.section_id.join(',');
        $("#p_chapter").hide();
    }
    //删除章节
    $scope.chapter_del=function(id){
        for(var i=0;i<$scope.cur_var.section_child_ids.length;i++){
            if(id==$scope.cur_var.section_child_ids[i].id){
                $scope.cur_var.section_child_ids.splice(i,1);
                break;
            }
        }
        $('.section_id'+id).remove();
    }

    //设置知识点
    $scope.showKnowledgePoint=function(){
        if($scope.cur_var.school_period_id==null || $scope.cur_var.subject_id==null || $scope.cur_var.version_id==null || $scope.cur_var.semester_id==null){
            alert('先选择校段、科目、版本、册数');
            return false;
        }
        $scope.tmp=angular.copy($scope.cur_var);
        var name='re_des_knowledge_point_'+$scope.cur_var.section_child_id;
        var re_cache=TOOL.getObject(name);
        if(re_cache==''){
            getData.getUrlData("/node/nextNodes?isKno=1&pId="+$scope.cur_var.subject_id,'knowledge_point').then(function (res) {  //正确请求成功时处理
                $scope.knowledge_point=res.data.msg;
                TOOL.setObject(name,$scope.knowledge_point);
            }).catch(function (result) { //捕捉错误处理
                console.log('没法读取知识点');
            });
        }else{
            $scope.knowledge_point=re_cache;
        }
        $("#p_knowledge_point").show();
    }
    //设置知识点setKnowledgeChild
    $scope.setKnowledgePoint=function(){
        $scope.cur_var=angular.copy($scope.tmp);
        $scope.tmp=null;
        var num=$scope.cur_var.knowledge_point_ids.length;
        $scope.knowledge_point_id=[];
        var html='';
        if(num > 0){
            for(var i=0;i<num;i++){
                var v=$scope.cur_var.knowledge_point_ids[i];
                $scope.knowledge_point_id.push(v.key);
                html+='<dd class="knowledge_point_'+v.id+'">'+v.fulltitle+'<em ng-click="KnowledgePointDel('+v.id+')"></em></dd>';
            }
        }
        $scope.knowledge_point_ids=$scope.knowledge_point_id.join(',');
        $("#knowledge_con_area dd").remove();
        $("#knowledge_con_area").append($compile(html)($scope));
        $("#p_knowledge_point").hide();
    }
    //获取子知识点
    $scope.setKnowledgeChild=function(id){
        var name="re_knowledge_bId_"+id+"_sgId_"+$scope.school_period_id;
        var data=TOOL.getObject(name);
        if(data==''){
            getData.getUrlData("/node/nextNodes?isKno=1&pId="+id,'knowledge_point').then(function (res) {  //正确请求成功时处理
                $scope.knowledge_point_child=res.data.msg;
                TOOL.setObject(name,$scope.knowledge_point_child);
            }).catch(function (result) { //捕捉错误处理
                console.log('没法读取知识点');
            });
        }else{
            $scope.knowledge_point_child=data;
        }
    }
    //删除知识点
    $scope.KnowledgePointDel=function(id){
        for(var i=0;i<$scope.cur_var.knowledge_point_ids.length;i++){
            if(id==$scope.cur_var.knowledge_point_ids[i].id){
                $scope.cur_var.knowledge_point_ids.splice(i,1);
                break;
            }
        }
        $('.knowledge_point_'+id).remove();
    }

    //设置所有类型ID
    $scope.setTypeId=function(type,id,title,sw,key){
        switch (type){
            case "school_period":
                if(sw){
                    $scope.tmp.school_period_id=id;
                    $scope.tmp.school_period_name=title;
                }else{
                    $("#p_xiaoduan").hide();
                }
                break;
            case "subject":
                if(sw){
                    $scope.tmp.subject_id=id;
                    $scope.tmp.subject_key=key;
                    $scope.tmp.subject_name=title;
                }else{
                    $("#p_subject").hide();
                }
                break;
            case "version":
                if(sw){
                    $scope.tmp.version_id=id;
                    $scope.tmp.version_key=key;
                    $scope.tmp.version_name=title;
                }else{
                    $("#p_version").hide();
                }
                break;

            case "semester":
                if(sw){
                    $scope.tmp.semester_id=id;
                    $scope.tmp.semester_key=key;
                    $scope.tmp.semester_name=title;
                }else{
                    $("#p_semester").hide();
                }
                break;
            case "section":
                if(sw){
                    $scope.tmp.section_id=id;
                    $scope.tmp.section_key=key;
                    $scope.tmp.section_name=title;
                }else{
                    $("#p_semester").hide();
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
                    $scope.tmp.curriculum_type_id=id;
                    $scope.tmp.curriculum_type_name=title;
                }else{
                    $("#p_curriculumtype").hide();
                }
                break;
            case "CurriculumDifficulty":
                if(sw){
                    $scope.tmp.curriculum_difficulty_id=id;
                    $scope.tmp.curriculum_difficulty_name=title;
                }else{
                    $("#p_curriculumdifficulty").hide();
                }
                break;

        }
        if(!sw){
            $scope.tmp=null;
        }
    };
    $scope.setTypeIdCon=function(type,id,sw,title,mykey){
        switch (type){
            case "section":
                if(sw){
                    $scope.tmp.section_id=id;
                    $scope.tmp.section_child_id=id;
                    $scope.tmp.section_name=title;
                    $scope.tmp.section_key=mykey;
                    $scope.setSectionChild(id);
                }else{
                    $scope.tmp=null;
                    $("#p_chapter").hide();
                }
                break;
            case "section_child":
                if(sw){
                    $scope.tmp.section_child_id=id;
                    for(var _i=0;_i < $scope.tmp.section_child_ids.length;_i++){
                        if(id==$scope.tmp.section_child_ids[_i].id){
                            $scope.tmp.section_child_ids.splice(_i,1);
                            return false;
                            break;
                        }
                    }
                    $scope.tmp.section_child_ids.push({"id":id,"title":title,"fulltitle":$scope.tmp.section_name+' '+title,"key":mykey+id});
                }
                break;
            case "knowledge":
                if(sw){
                    $scope.tmp.knowledge_point_id=id;
                    $scope.tmp.knowledge_point_title=title;
                    $scope.setKnowledgeChild(id);
                }else{
                    $("#p_knowledge_point").hide();
                }
                break;
            case "knowledge_child":
                if(sw){
                    //$scope.tmpid.section_child_id=id;
                    for(var _i=0;_i < $scope.tmp.knowledge_point_ids.length;_i++){
                        if(id==$scope.tmp.knowledge_point_ids[_i].id){
                            $scope.tmp.knowledge_point_ids.splice(_i,1);
                            return false;
                            break;
                        }
                    }
                    $scope.tmp.knowledge_point_ids.push({"id":id,"title":title,"fulltitle":$scope.tmp.knowledge_point_title+' '+title,"key":mykey+id});
                }
                break;
        }
        if(!sw){
            $scope.tmp=null;
        }
    };
    $scope.isSectionChild = function(id){
        if($scope.tmp==null)return false;
        for(var _i=0;_i < $scope.tmp.section_child_ids.length;_i++){
            if(id==$scope.tmp.section_child_ids[_i].id){
                return true;
                break;
            }
        }
        return false;
    };
    $scope.isKnowledgeChild = function(id){
        if($scope.tmp==null)return false;
        for(var _i=0;_i < $scope.tmp.knowledge_point_ids.length;_i++){
            console.log(id,$scope.tmp.knowledge_point_ids[_i].id);
            if(id==$scope.tmp.knowledge_point_ids[_i].id){
                return true;
                break;
            }
        }
        return false;
    };

    //阅读条款
    $scope.setRead=function(){
        $scope.isread=!$scope.isread;
    }

    //文件上传
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
        var reader=new FileReader();
        var mb=1024*1024;
        var sizeMK='M';
        var file_max=$scope.des.upfile_video_size*mb;
        var cur_file_size=0;
        var file_def_pic_size=1024*1024*10;
        var file_length=file.length;
        if(file[0].name!=''){
            if(type=='uploadvideo'){
                $(".uploadvideocontent").show();
                var upfile_type=$(".uploadvideocontent .upfile_type");
                var up=$('.uploadvideocontent .upfile_progress');
                var fname=$('.uploadvideocontent .file_name');
                if($scope.curtype==14){
                    if(file_length>20){
                        alert("图片最多只能上传20张");
                        document.getElementById(type).value=null;
                        return false;
                    }
                    for(var i=0;i<file_length;i++){
                        var max=file[i].size;
                        if(max>file_def_pic_size){
                            alert("文件过大，限制上传");
                            document.getElementById(type).value=null;
                            fname.html("文件过大，限制上传");
                            return false;
                        }
                        if(mb>max){
                            sizeMK="KB";
                            cur_file_size=parseInt(max/1024);
                            if(cur_file_size<1){
                                sizeMK="B";
                                cur_file_size=max;
                            }
                        }else{
                            cur_file_size=(max/mb).toFixed(2);
                        }
                        reader.readAsBinaryString(file[i]);
                        var file_ext=$scope.isExt(file[i].name,true);
                        upfile_type.html(file_ext+"/"+cur_file_size+sizeMK);
                        var up_num="1%";
                        up.css({"width":up_num});
                        var fname_pr='上传'+$scope.des.title;
                        reader.onprogress=function(evt){
                            up_num=(evt.loaded/max)*100+"%";
                            up.css({"width":up_num});
                            fname.html(fname_pr+up_num);
                        }
                        reader.onloadend=function(){
                            fname.html(fname_pr+"上传完成");
                        }
                    }
                }else{
                    if($scope.isExt(file[0].name,false)){
                        alert("文件类型不正确");
                        document.getElementById(type).value=null;
                        return false;
                    }
                    var max=file[0].size;
                    if(max>file_max){
                        alert("文件过大，限制上传");
                        document.getElementById(type).value=null;
                        return false;
                    }
                    if(mb>max){
                        sizeMK="KB";
                        cur_file_size=parseInt(max/1024);
                    }else{
                        cur_file_size=(max/mb).toFixed(2);
                    }
                    reader.readAsBinaryString(file[0]);
                    var file_ext=$scope.isExt(file[0].name,true);
                    upfile_type.html(file_ext+"/"+cur_file_size+sizeMK);
                    var up_num="1%";
                    var fname_pr='上传'+$scope.des.title;
                    reader.onprogress=function(evt){
                        up_num=(evt.loaded/max)*100+"%";
                        up.css({"width":up_num});
                        fname.html(fname_pr+up_num);
                    }
                    reader.onloadend=function(){
                        fname.html(fname_pr+"上传完成");
                    }
                }
            }else if(type=='uploadenclosure'){
                var fname=$('.uploadenclosurecontent .file_name');
                $(".uploadenclosurecontent").show();
                if(file_length>5){
                    alert("附件最多只能上传5个");
                    document.getElementById(type).value=null;
                    fname.html("附件最多只能上传5个");
                    return false;
                }

                var up=$('.uploadenclosurecontent .upfile_progress');
                var up_type=$(".uploadenclosurecontent .upfile_type");
                for(var i=0;i<file_length;i++){
                    var max=file[i].size;
                    if(max>file_max){
                        alert("文件过大，限制上传");
                        document.getElementById(type).value=null;
                        fname.html("文件过大，限制上传");
                        return false;
                    }
                    if(mb>max){
                        sizeMK="KB";
                        cur_file_size=parseInt(max/1024);
                        if(cur_file_size<1){
                            sizeMK="B";
                            cur_file_size=max;
                        }
                    }else{
                        cur_file_size=(max/mb).toFixed(2);
                    }
                    reader.readAsBinaryString(file[i]);
                    var file_ext=$scope.isExt(file[i].name,true);
                    up_type.html(file_ext+"/"+cur_file_size+sizeMK);
                    var up_num="1%";
                    up.css({"width":up_num});
                    var fname_pr='上传附件';
                    reader.onprogress=function(evt){
                        up_num=(evt.loaded/max)*100+"%";
                        up.css({"width":up_num});
                        fname.html(fname_pr+up_num);
                    }
                    reader.onloadend=function(){
                        fname.html(fname_pr+"上传完成");
                    }
                }
            }else if(type=='uploadcover'){
                var ext=$scope.isExt(file[0].name,true);
                var fname=$('.uploadcovercontent .file_name');
                if($.inArray(ext,['jpg','png','bmp','gif','jpeg'])==-1){
                    alert("文件类型不正确");
                    document.getElementById(type).value=null;
                    fname.html("文件类型不正确");
                    return false;
                }
                var max=file[0].size;
                if(max>file_def_pic_size){
                    alert("上传图片过大，限制1M内");
                    document.getElementById(type).value=null;
                    fname.html("上传图片过大，限制1M内");
                    return false;
                }
                if(mb>max){
                    sizeMK="KB";
                    cur_file_size=parseInt(max/1024);
                    if(cur_file_size<1){
                        sizeMK="B";
                        cur_file_size=max;
                    }
                }else{
                    cur_file_size=(max/mb).toFixed(2);
                }
                $(".uploadcovercontent").show();
                reader.readAsBinaryString(file[0]);
                $(".uploadcovercontent .upfile_type").html(ext+"/"+cur_file_size+sizeMK);
                var up=$('.uploadcovercontent .upfile_progress');

                var up_num="1%";
                var fname_pr='封面图';
                reader.onprogress=function(evt){
                    up_num=(evt.loaded/max)*100+"%";
                    up.css({"width":up_num});
                    fname.html(fname_pr+up_num);
                }
                reader.onloadend=function(){
                    fname.html(fname_pr+"上传完成");
                }
            }
        }
    };
    $scope.isExt=function(name,sw){
        var dot = name.lastIndexOf(".");
        var ext = name.substring(dot + 1);
        if(sw){
            return ext;
        }
        if($.inArray(ext,$scope.des.upfile_video_ext)==-1){
            return true;
        }
        return false;
    }

    //打开课程类型
    $scope.showCurriculumType=function(){
        if($scope.cur_var.school_period_id==null || $scope.cur_var.subject_id==null){
            alert('先选择校段、科目');
            return false;
        }
        var name="curriculumtypelist";
        $scope.tmp=angular.copy($scope.cur_var);
        var curriculum_type=TOOL.getObject(name);
        if(curriculum_type==''){
            getData.getUrlData('/resourceNodeQuery/knowlege?subjectId='+$scope.tmp.subject_id+'&stageId='+$scope.tmp.school_period_id,'curriculum_type_list').then(function (res) {  //正确请求成功时处理
                $scope.CurriculumType=res.data.msg;
                TOOL.setObject(name,$scope.CurriculumType);
                $("#p_curriculumtype").show();
            }).catch(function (result) { //捕捉错误处理
                console.log('没法读取知识点');
            });
        }else{
            $scope.CurriculumType=curriculum_type;
            $("#p_curriculumtype").show();
        }
    }
    //设置课程类型
    $scope.setCurriculumType=function(){
        if($scope.tmp.curriculum_type_id<1){
            alert("请先选择课程类型再确定");
            return false;
        }
        $scope.cur_var=angular.copy($scope.tmp);
        $("#p_curriculumtype").hide();
    }
    //打开课程难度
    $scope.showCurriculumDifficulty=function(){
        $scope.tmp=angular.copy($scope.cur_var);
        var name="curriculumdifficulty";
        var curriculumdifficulty=TOOL.getObject(name);
        if(curriculumdifficulty==''){
            getData.getUrlData('/resourceNodeQuery/knowlege?subjectId='+$scope.tmp.subject_id+'&stageId='+$scope.tmp.school_period_id,'curriculumdifficulty').then(function (res) {  //正确请求成功时处理
                $scope.CurriculumDifficulty=res.data.msg;
                TOOL.setObject(name,$scope.CurriculumDifficulty);
                $("#p_curriculumdifficulty").show();
            }).catch(function (result) { //捕捉错误处理
                console.log('没法读取知识点');
            });
        }else{
            $scope.CurriculumDifficulty=curriculumdifficulty;
            $("#p_curriculumdifficulty").show();
        }
    }
    //设置课程难度
    $scope.setCurriculumDifficulty=function(){
        if($scope.tmp.curriculum_difficulty_id<1){
            alert("请先选择课程难度再确定");
            return false;
        }
        $scope.cur_var=angular.copy($scope.tmp);
        $("#p_curriculumdifficulty").hide();
    }

    $scope.upfileSumbt=function(isValid){
        if(!$scope.isread){
            alert('提交前选阅读《资源上传服务条款》');
            return false;
        }
        if(!isValid){
            alert("表单内容填写不正确");
            return false;
        }
        if($scope.cur_var.school_period_id==null || $scope.cur_var.subject_id==null || $scope.cur_var.version_id==null || $scope.cur_var.semester_id==null){
            alert('先选择校段、科目、版本、册数');
            return false;
        }
        var form = document.getElementById('uploadForm');
        var formdata = new FormData(form);
        var video_files = document.getElementById('uploadvideo').files;
        var video_filenum=video_files.length;
        console.log(video_filenum);
        if(video_filenum<1){
            alert('请选择上传资源');
            return false;
        }
        if($scope.curtype==14){
            if(video_filenum>0){
                if(video_filenum>20){
                    alert('最多只能上传20张图片!');
                    document.getElementById('uploadvideo').value=null;
                    return false;
                }
                for(var i = 0; i < video_filenum; i++) {
                    var file = video_files[i];
                    if(!$scope.isExt(file.name,false)){
                        formdata.append('video[]', file, file.name);
                    }
                }
            }
        }
        if($scope.des.isEnclosure){
            var files = document.getElementById('uploadenclosure').files;
            var filenum=files.length;
            if(filenum>0){
                if(filenum>5){
                    alert('最多只能上传5个附件!');
                    document.getElementById('uploadenclosure').value=null;
                    return false;
                }
                for(var i = 0; i < filenum; i++) {
                    var file = files[i];
                    formdata.append('enclosure[]', file, file.name);
                }
            }
        }
        $.ajax({
            /*url: 'http://test.com/test.php',*/
            /*url:root_url+'/uploadFile/resource/file.do',*/
            url:root_url+'/uploadFile/resource/toMyResource.do',
            type: 'POST',
            data: formdata,
            dataType:'JSON',
            contentType: false,
            processData: false,
            success: function (d) {
                //window.location.href="/re/#!/re_upfile";
                alert('上传成功');
                console.log(d);
            },
            error: function (XMLHttpRequest,textStatus,errorThrown) {
                console.log('error');
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    };
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
                console.log(urlpath);
                //location.href=urlpath;
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
            getData.getUrlData("/resource/getMyResource?uId=0&title="+$scope.title,'list').then(function(d){
                console.log(d);
                if(d.data.status==1||d.data.msg==null){
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