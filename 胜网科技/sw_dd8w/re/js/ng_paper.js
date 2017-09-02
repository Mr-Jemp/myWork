var p=angular.module('paper',[]);
p.config(["$routeProvider",function($routeProvider){
    $routeProvider.when('/re_upfile_timu',{
            templateUrl:"/re/tpl/re_upfile_timu.html?t=" + Math.floor(Date.now() / 1000)
        })
        .when('/re_upfile_timu_add',{
            templateUrl:"/re/tpl/re_upfile_timu_add.html?t=" + Math.floor(Date.now() / 1000)
        })
        .when('/re_upfile_word',{
            templateUrl:"/re/tpl/re_upfile_word.html?t=" + Math.floor(Date.now() / 1000)
        })
        .when('/re_upfile_word_add/:type',{
            templateUrl:"/re/tpl/re_upfile_word_add.html?t=" + Math.floor(Date.now() / 1000),
            controller:"reUpfileWordAdd"
        })
        .when('/re_upfile_zujuan',{
            templateUrl:"/re/tpl/re_upfile_zujuan.html?t=" + Math.floor(Date.now() / 1000)
        })
        .when('/re_upfile_zujuan_add',{
            templateUrl:"/re/tpl/re_upfile_zujuan_add.html?t=" + Math.floor(Date.now() / 1000)
        })
}]);
p.controller('reUpfileWordAdd',["$scope","$http","$routeParams","$compile","getData",function($scope,$http,$routeParams,$compile,getData){
    $scope.gcss=['one','two','three'];
    $scope.curtype=$routeParams.type;
    $scope.teaching_material_type=1;
    $scope.viewFile='';
    $scope.title='';
    $scope.isWordAddClause=false;
    //主要字段ID
    $scope.school_period_id=null;
    $scope.pschool_period_id=null;
    $scope.school_period_name='';
    $scope.pschool_period_name='';
    $scope.subject_id=null;
    $scope.psubject_id=null;
    $scope.subject_name='';
    $scope.psubject_name='';
    $scope.version_id=null;
    $scope.version_name='';
    $scope.book_id=null;
    $scope.book_name='';
    $scope.pbook_name='';
    $scope.section_id=[];
    $scope.section_ids=null;
    $scope.knowledge_point_ids=null;
    $scope.section_child_id=[];
    $scope.knowledge_point_id=[];

    $scope.subject={};
    $scope.version={};
    $scope.book={};
    $scope.section={};
    $scope.section_child={};
    $scope.knowledge_point={};
    $scope.knowledge_point_child={};
    $scope.CurriculumType=[];
    $scope.CurriculumDifficulty=[];

    $scope.isShowSubject=false;
    $scope.isShowPSubject=false;
    $scope.isShowBook=false;
    $scope.isShowVersion=false;

    $scope.tmpid={
        "school_period_id":null,
        "pschool_period_id":null,
        "school_period_name":'',
        "pschool_period_name":'',
        "subject_id":null,
        "psubject_id":null,
        "subject_name":'',
        "psubject_name":'',
        "version_id":null,
        "version_name":'',
        "book_id":null,
        "book_name":'',
        "section_id":null,
        "section_title":null,
        "section_child_id":[],
        "knowledge_point_id":null,
        "knowledge_point_title":null,
        "knowledge_point_child_id":[],
        "CurriculumType_id":null,
        "CurriculumDifficulty_id":null,
    };

   $scope.timu_right_chapter=null;
   $scope.timu_right_Knowledge=null;
    //校段
    $scope.xiaoduan=getData.school_period;
    switch ($scope.curtype){
        case "word":
            $scope.viewFile="/re/tpl/word_add.html";
            $scope.title='上传导卷';
            break;
        case "zujuan":
            $scope.viewFile="/re/tpl/zujuan_add.html";
            $scope.title='上传组卷';
            break;
        case "timu":
            $scope.viewFile="/re/tpl/timu_add.html";
            $scope.title='上传题目';
            break;
    }
    $scope.showMaterial=function () {
        $("#p_sw_material").show("slow");
    }

    $scope.setTeachingMaterialType=function(type){
        $scope.teaching_material_type=type;
    }

    //设置校段ID
    $scope.setGrade=function(id,name){
        $scope.grade_id=id;
        $scope.grade_name=name;
    };
    //设置所有类型ID
    $scope.setTypeId=function(type,id,sw,title){
        switch (type){
            case "version":
                if(sw){
                    $scope.tmpid.version_id=id;
                    $scope.tmpid.version_name=title;
                    var name="re_book_"+id;
                    var data=TOOL.getObject(name);
                    $scope.isShowBook=true;
                    $scope.tmpid.book_id=null;
                    if(data==''){
                        getData.getUrlData("/node/nextNodes?pId="+id+"&isKno=0","semester").then(function (res){
                            $scope.book=res.data.msg;
                            if($scope.book.length>0){
                                TOOL.setObject(name,$scope.book);
                            }
                        });
                        //var url=rooturl+'/resourceNodeQuery/bookList?versonId='+$scope.version_id;
                        /*var url='/data/re/semester.js';
                        $http.get(url).then(function(d){
                            $scope.book=d.data;
                            TOOL.setObject(name,d.data);
                        },function(e){
                            console.log(e);
                            alert('获取数据出错');
                        });*/
                    }else{
                        $scope.book=data;
                    }
                }else{
                    $scope.tmpid.version_id=$scope.version_id;
                }
                break;
            case "subject":
                if(sw){
                    $scope.tmpid.subject_id=id;
                    $scope.tmpid.subject_name=title;
                    var name="re_version_"+id;
                    var data=TOOL.getObject(name);
                    $scope.isShowVersion=true;
                    $scope.isShowBook=false;
                    $scope.tmpid.version_id=null;
                    $scope.tmpid.book_id=null;
                    if(data==''){
                        getData.getUrlData("/node/nextNodes?pId="+id+"&isKno=0","version").then(function (res){
                            $scope.version=res.data.msg;
                            if($scope.version.length>0){
                                TOOL.setObject(name,$scope.version);
                            }
                        });
                        //var url=rooturl+'/resourceNodeQuery/versonList?subjectId='+$scope.subject_id;
                        /*var url='/data/re/version.js';
                        $http.get(url).then(function(d){
                            $scope.version=d.data;
                            TOOL.setObject(name,d.data);
                        },function(e){
                            console.log(e);
                            alert('获取数据出错');
                        });*/
                    }else{
                        $scope.version=data;
                    }
                }else{
                    $scope.tmpid.subject_id=$scope.subject_id;
                }
                break;
            case "psubject":
                if(sw){
                    $scope.tmpid.psubject_id=id;
                    $scope.tmpid.psubject_name=title;
                }else{
                    $scope.tmpid.subject_id=$scope.subject_id;
                }
                break;
            case "book":
                if(sw){
                    $scope.tmpid.book_id=id;
                    $scope.tmpid.book_name=title;
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
                    $scope.tmpid.school_period_name=title;
                    $scope.isShowSubject=true;
                    $scope.isShowBook=false;
                    $scope.isShowVersion=false;
                    $scope.tmpid.subject_id=null;
                    $scope.tmpid.version_id=null;
                    $scope.tmpid.book_id=null;
                    var name="subject_school_period_"+id;
                    var data=TOOL.getObject(name);
                    if(data==''){
                        //var url=rooturl+'/resourceNodeQuery/subjectList?stageId='+id;
                        getData.getUrlData("/node/nextNodes?pId="+id+"&isKno=0","subject").then(function (res){
                            $scope.subject=res.data.msg;
                            if($scope.subject.length>0){
                                TOOL.setObject(name,$scope.subject);
                            }
                        });
                        /*var url='/data/re/subject.js';
                        $http.get(url).then(function(d){
                            $scope.subject=d.data;
                            TOOL.setObject(name,d.data);
                        },function(e){
                            console.log(e);
                            alert('获取数据出错');
                        });*/
                    }else{
                        $scope.subject=data;
                    }
                }else{
                    $scope.tmpid.school_period_id=$scope.school_period_id;
                }
                break;
            case "pxiaoduan":
                if(sw){
                    $scope.tmpid.pschool_period_id=id;
                    $scope.tmpid.pschool_period_name=title;
                    $scope.isShowPSubject=true;
                    $scope.tmpid.psubject_id=null;
                    var name="subject_school_period_"+id;
                    var data=TOOL.getObject(name);
                    if(data==''){
                        getData.getUrlData("/node/nextNodes?pId="+id+"&isKno=0","subject").then(function (res){
                            $scope.subject=res.data.msg;
                            if($scope.subject.length>0){
                                TOOL.setObject(name,$scope.subject);
                            }
                        });
                        //var url=rooturl+'/resourceNodeQuery/subjectList?stageId='+id;
                        /*var url='/data/re/subject.js';
                        $http.get(url).then(function(d){
                            $scope.subject=d.data;
                            TOOL.setObject(name,d.data);
                        },function(e){
                            console.log(e);
                            alert('获取数据出错');
                        });*/
                    }else{
                        $scope.subject=data;
                    }
                }else{
                    $scope.tmpid.school_period_id=$scope.school_period_id;
                }
                break;
        }
    };

    //章节确定/取消
    $scope.materialSubmit=function(b){
        if(b){
            var titlecontent='';
            if($scope.teaching_material_type==1){
                $scope.school_period_id=$scope.tmpid.school_period_id;
                $scope.school_period_name=$scope.tmpid.school_period_name;
                $scope.tmpid.pschool_period_id=$scope.pschool_period_id;
                $scope.subject_id=$scope.tmpid.subject_id;
                $scope.subject_name=$scope.tmpid.subject_name;
                $scope.tmpid.psubject_id=$scope.psubject_id;
                $scope.version_id=$scope.tmpid.version_id;
                $scope.book_id=$scope.tmpid.book_id;
                $scope.book_name=$scope.tmpid.book_name;
                titlecontent="教材 "+$scope.tmpid.school_period_name+" "+$scope.tmpid.subject_name+" "+$scope.tmpid.book_name;
                getChapter($scope.book_id,false);
            }else{
                $scope.tmpid.school_period_id=$scope.school_period_id;
                $scope.pschool_period_id=$scope.tmpid.pschool_period_id;
                $scope.pschool_period_name=$scope.tmpid.pschool_period_name;
                $scope.tmpid.subject_id=$scope.subject_id;
                $scope.psubject_name=$scope.tmpid.psubject_name;
                $scope.psubject_id=$scope.tmpid.psubject_id;
                $scope.tmpid.version_id=$scope.version_id;
                $scope.tmpid.book_id=$scope.book_id;
                titlecontent="知识点 "+$scope.tmpid.pschool_period_name+" "+$scope.tmpid.psubject_name;
                getKnowledge($scope.psubject_id,false);
            }
            $('.timu_right_chapter').html(titlecontent);
        }else{
            $scope.tmpid.school_period_id=$scope.school_period_id;
            $scope.tmpid.school_period_name=$scope.school_period_name;
            $scope.tmpid.pschool_period_id=$scope.pschool_period_id;
            $scope.tmpid.subject_id=$scope.subject_id;
            $scope.tmpid.subject_name=$scope.subject_name;
            $scope.tmpid.psubject_id=$scope.psubject_id;
            $scope.tmpid.version_id=$scope.version_id;
            $scope.tmpid.book_id=$scope.book_id;
        }
        $("#p_sw_material").hide("slow");
    }
    //处理章节列表点击事件
    $scope.doRchapter=function(id,key,isChild){
        window.event? window.event.cancelBubble = true : e.stopPropagation();
        console.log('点击子节点'+id,key,isChild);
        if(isChild){
            var curdom=$("[data-rcid="+id+"]");
            var curdomi=curdom.children('i');
            curdom.siblings('.timu_list_curr').removeClass('timu_list_curr');
            if(curdomi.hasClass('down')){
                curdom.addClass('timu_list_curr');
                curdomi.removeClass('down').addClass('up');

                /*var tmpdata=getChapter(id,true);
                console.log(tmpdata);*/
                getData.getUrlData("/node/nextNodes_err?pId="+id+"&isKno=0","section2").then(function (res){
                    var tmpdata=res.data.msg;
                    var html='<ul class="timu_r_plist">';
                    for(var i=0;i<tmpdata.length;i++){
                        var isc='';
                        if(tmpdata[i].isChild){
                            isc='<i class="down"></i>';
                        }
                        html+='<li data-rcid="'+tmpdata[i].id+'" data-title="'+tmpdata[i].value+'" ng-click="doRchapter('+tmpdata[i].id+',\''+tmpdata[i].key+'\','+tmpdata[i].isChild+')" ng-class="{true:\'choice_list_act\'}[isSectionChild('+tmpdata[i].id+')]">'+tmpdata[i].value+isc+'</li>';
                    }
                    html+='</ul>';
                    console.log(html);
                    curdom.append($compile(html)($scope));
                    /*console.log("返回数据",res);
                    if(isRet){
                        return res.data.msg;
                    }else{
                        $scope.timu_right_chapter=res.data.msg;
                    }
                    if($scope.timu_right_chapter.length>0){
                        TOOL.setObject(name,$scope.timu_right_chapter);
                    }*/
                });

            }else if(curdomi.hasClass('up')){
                curdom.children('ul').remove();
                curdom.removeClass('timu_list_curr');
                curdomi.removeClass('up').addClass('down');
            }
            return false;
        }else{
            if($scope.section_id.length>0){
                for(var i=0;i<$scope.section_id.length;i++){
                    if(id==$scope.section_id[i].id){
                        return false;
                    }
                }
            }
            var curdom=$("[data-rcid="+id+"]");
            var chapter_title=getChapterTitle(curdom.parent().parent(),curdom.data('title'));
            var titlehtml="<li data-wclid="+id+">"+$scope.school_period_name+" > "+$scope.subject_name+$scope.book_name+" > "+chapter_title+" <span class='del_word_chapter' ng-click='delWordChapter("+id+")'>x</span></li>";
            $scope.section_id.push({"id":id,"key":key+id});
            $(".word_chapter_list").append($compile(titlehtml)($scope));
        }
    }
    //处理章节列表点击事件
    $scope.doKnowledge=function(id,key,isChild){
        window.event? window.event.cancelBubble = true : e.stopPropagation();
        if(isChild){
            var curdom=$("[data-rcid="+id+"]");
            var curdomi=curdom.children('i');
            curdom.siblings('.timu_list_curr').removeClass('timu_list_curr');
            if(curdomi.hasClass('down')){
                curdom.addClass('timu_list_curr');
                curdomi.removeClass('down').addClass('up');
                getData.getUrlData("/node/nextNodes?pId="+id+"&isKno=1","knowledge_point").then(function (res){
                    var tmpdata=res.data.msg;
                    var html='<ul class="timu_r_plist">';
                    for(var i=0;i<tmpdata.length;i++){
                        var isc='';
                        if(tmpdata[i].isChild){
                            isc='<i class="down"></i>';
                        }
                        html+='<li data-rcid="'+tmpdata[i].id+'" data-title="'+tmpdata[i].value+'" ng-click="doKnowledge('+tmpdata[i].id+',\''+tmpdata[i].key+'\','+tmpdata[i].isChild+')" ng-class="{true:\'choice_list_act\'}[isKnowledgeChild('+tmpdata[i].id+')]">'+tmpdata[i].value+isc+'</li>';
                    }
                    html+='</ul>';
                    console.log(html);
                    curdom.append($compile(html)($scope));
                    /*console.log("返回数据",res);
                     if(isRet){
                     return res.data.msg;
                     }else{
                     $scope.timu_right_chapter=res.data.msg;
                     }
                     if($scope.timu_right_chapter.length>0){
                     TOOL.setObject(name,$scope.timu_right_chapter);
                     }*/
                });
                /*var tmpdata=getKnowledge(id,true);
                var html='<ul class="timu_r_plist">';
                for(var i=0;i<tmpdata.length;i++){
                    var isc='';
                    if(tmpdata[i].isChild){
                        isc='<i class="down"></i>';
                    }
                    html+='<li data-rcid="'+tmpdata[i].id+'" data-title="'+tmpdata[i].title+'" ng-click="doKnowledge('+tmpdata[i].id+','+tmpdata[i].isChild+')">'+tmpdata[i].title+isc+'</li>';
                }
                html+='</ul>';
                curdom.append($compile(html)($scope));*/
            }else if(curdomi.hasClass('up')){
                curdom.children('ul').remove();
                curdom.removeClass('timu_list_curr');
                curdomi.removeClass('up').addClass('down');
            }
            return false;
        }else{
            if($scope.knowledge_point_id.length>0){
                for(var i=0;i<$scope.knowledge_point_id.length;i++){
                    if(id==$scope.knowledge_point_id[i].id){
                        return false;
                    }
                }
            }
            var curdom=$("[data-rcid="+id+"]");
            var chapter_title=getKnowledgeTitle(curdom.parent().parent(),curdom.data('title'));
            var titlehtml="<li data-wclid="+id+">"+$scope.pschool_period_name+" > "+$scope.psubject_name+" > "+chapter_title+" <span class='del_word_chapter' ng-click='delWordKnowledge("+id+")'>x</span></li>";
            $scope.knowledge_point_id.push({"id":id,"key":key+id});
            console.log(titlehtml);
            $(".word_knowledge_list").append($compile(titlehtml)($scope));
        }
    }

    //获取章节内容
    function getChapter(id,isRet){
        var name="timu_right_chapter_"+id;
        var data=TOOL.getObject(name);
        console.log(id,isRet);
        if(data==''){
            getData.getUrlData("/node/nextNodes_err?pId="+id+"&isKno=0","section").then(function (res){
                console.log("返回数据",res);
                if(isRet){
                    return res.data.msg;
                }else{
                    $scope.timu_right_chapter=res.data.msg;
                }
                if($scope.timu_right_chapter.length>0){
                    TOOL.setObject(name,$scope.timu_right_chapter);
                }
            });
            //var url=rooturl+'/resourceNodeQuery/subjectList?stageId='+id;
            /*var url='/data/re/timu_right_chapter_'+id+'.js';
            $http.get(url).then(function(d){
                TOOL.setObject(name,d.data);
                if(isRet){
                    return data;
                }else{
                    $scope.timu_right_chapter=d.data;
                }
            },function(e){
                console.log(e);
                alert('获取数据出错');
            });*/
        }else{
            if(isRet){
                return data;
            }else{
                $scope.timu_right_chapter=data;
            }
        }

    }
    //获取知识点内容
    function getKnowledge(id,isRet){
        var name="timu_right_Knowledge_"+id;
        var data=TOOL.getObject(name);
        if(data==''){
            getData.getUrlData("/node/nextNodes_err?pId="+id+"&isKno=1","knowledge_point").then(function (res){
                console.log("返回数据",res);
                if(isRet){
                    return res.data.msg;
                }else{
                    $scope.timu_right_Knowledge=res.data.msg;
                }
                if($scope.timu_right_Knowledge.length>0){
                    TOOL.setObject(name,$scope.timu_right_Knowledge);
                }
            });
            //var url=rooturl+'/resourceNodeQuery/subjectList?stageId='+id;
            /*var url='/data/re/timu_right_Knowledge_'+id+'.js';
            $http.get(url).then(function(d){
                TOOL.setObject(name,d.data);
                if(isRet){
                    return data;
                }else{
                    $scope.timu_right_Knowledge=d.data;
                }
            },function(e){
                console.log(e);
                alert('获取数据出错');
            });*/
        }else{
            if(isRet){
                return data;
            }else{
                $scope.timu_right_Knowledge=data;
            }
        }
    }

    //word add 选择阅读条款
    $scope.changeWordClause=function () {
        $scope.isWordAddClause=!$scope.isWordAddClause;
    }
    $scope.uploadfile=function(){
        /*$("#upload_add_word").click();
        return false;*/
    }
    $scope.uploadWordFile=function(type){
        var file = document.getElementById(type).files;
        var filename='';
        var reader=new FileReader();
        var mb=1024*1024;
        var sizeMK='M';
        var file_max=1024*1024*10;
        var cur_file_size=0;
        var file_def_pic_size=1024*1024*1;
        var file_length=file.length;

        var fname=$('.uploadenclosurecontent .file_name');
        $(".uploadenclosurecontent").show();
        var up=$('.uploadenclosurecontent .upfile_progress');
        var up_type=$(".uploadenclosurecontent .upfile_type");
        var max=file[0].size;
        if(max>file_max){
            alert("文件过大，限制上传");
            document.getElementById(type).value=null;
            fname.html("文件过大，限制上传");
            return false;
        }
        if($scope.isExt(file[0].name,false)){
            document.getElementById(type).value=null;
            fname.html("文件格式错误，限制上传");
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
        reader.readAsBinaryString(file[0]);
        var file_ext=$scope.isExt(file[0].name,true);
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
        /*var file = document.getElementById(type).files;
        var filename='';
        if(file[0].name!=''){
            $('.uploadenclosurecontent').html(file[0].name);
        }*/
    }
    $scope.isExt=function(name,sw){
        var dot = name.lastIndexOf(".");
        var ext = name.substring(dot + 1);
        if(sw){
            return ext;
        }
        if($.inArray(ext,['doc','docx'])==-1){
            return true;
        }
        return false;
    }
    //删除章节列表节点delWordKnowledge
    $scope.delWordChapter=function(id){
        $("[data-wclid='"+id+"']").remove();
        for(var i=0;i<$scope.section_id.length;i++){
            if(id==$scope.section_id[i].id){
                $scope.section_id.splice(i,1);
            }
        }
    }
    //删除知识点列表节点
    $scope.delWordKnowledge=function(id){
        $("[data-wclid='"+id+"']").remove();
        for(var i=0;i<$scope.knowledge_point_id.length;i++){
            if(id==$scope.knowledge_point_id[i].id){
                $scope.knowledge_point_id.splice(i,1);
            }
        }
    }
    $scope.submitWordAdd=function () {
        if(!$scope.isWordAddClause){
            alert('提交前选阅读《资源上传服务条款》');
            return false;
        }
        var files = document.getElementById('upload_add_word').files;
        if(files.length<1){
            alert('你没有选择上传文件!');
            return false;
        }
        if($scope.isExt(files[0].name,false)){
            alert('只能上传doc类型文件');
            return false;
        }
        /*if($scope.school_period_id==null || $scope.subject_id==null || $scope.version_id==null){
            alert("没有选择教材");
            return false;
        }*/
        var node_ids='';
        for(var i=0;i<$scope.section_id.length;i++){
            if(node_ids!=''){
                node_ids+=",";
            }
            node_ids+=$scope.section_id[i].key;
        }
        var knowledge_ids='';
        for(var i=0;i<$scope.knowledge_point_id.length;i++){
            if(knowledge_ids!=''){
                knowledge_ids+=",";
            }
            knowledge_ids+=$scope.knowledge_point_id[i].key;
        }
        if(node_ids=='' && knowledge_ids==''){
            alert('没有选择章节或知识点');
            return false;
        }
        $("#waitfor").show();
        var form = document.getElementById('upWordAddForm');
        var formdata = new FormData(form);
        formdata.append('fileType',9);
        formdata.append('school_period_id',$scope.school_period_id);
        formdata.append('subject_id',$scope.subject_id);
        formdata.append('version_id',$scope.version_id);
        formdata.append('node',node_ids);
        formdata.append('knowledge',knowledge_ids);
        //formdata.append('title',"word上传导卷");

        /*formdata.append('upfiletype',$scope.curtype);
        formdata.append('school_period_id',$scope.school_period_id);
        formdata.append('subject_id',$scope.subject_id);
        formdata.append('pschool_period_id',$scope.pschool_period_id);
        formdata.append('psubject_id',$scope.psubject_id);
        formdata.append('version_id',$scope.version_id);
        formdata.append('book_id',$scope.book_id);
        formdata.append('section_id',$scope.section_id.join("-"));
        formdata.append('knowledge_point_id',$scope.knowledge_point_id.join("-"));*/

        $.ajax({
            url: root_url+'/uploadFile/resource/file.do',
            /*url:rooturl+'/fileManagementFacade/upLoad', */
            type: 'POST',
            data: formdata,
            dataType:'JSON',
            contentType: false,
            processData: false,
            success: function (d) {
                if(d.status==0){
                    alert('上传成功');
                    window.location.href='/re/#!/re_upfile';
                }
                $("#waitfor").hide();
            },
            error: function (XMLHttpRequest,textStatus,errorThrown) {
                console.log('error');
                $("#waitfor").hide();
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    }

    /*****添加题目开始*******/
    $scope.titype=1;
    $scope.difficulty_id=0;
    if($scope.curtype=='timu'||$scope.curtype=='zujuan'){
        $scope.question_types=null;
        $scope.timu_difficulty=null;
        var name="timu_question_types";
        var data=TOOL.getObject(name);
        if(data==''){
            console.log('timu_question_types');
            //var url=rooturl+'/resourceNodeQuery/subjectList?stageId='+id;
            var url='/data/re/question_types.js';
            $http.get(url).then(function(d){
                TOOL.setObject(name,d.data);
                $scope.question_types=d.data;
            },function(e){
                console.log(e);
                alert('获取数据出错');
            });
        }else{
            $scope.question_types=data;
        }
        var name2="timu_difficulty";
        var data2=TOOL.getObject(name2);
        if(data2==''){
            console.log('timu_difficulty');
            //var url=rooturl+'/resourceNodeQuery/subjectList?stageId='+id;
            var url='/data/re/difficulty.js';
            $http.get(url).then(function(d2){
                TOOL.setObject(name2,d2.data);
                $scope.timu_difficulty=d2.data;
            },function(e){
                console.log(e);
                alert('获取数据出错');
            });
        }else{
            $scope.timu_difficulty=data2;
        }
    }
    $scope.swTiType=function(t){
       $scope.titype=t;
       $scope.$apply();
       $('.timu_answer_choice li div[contenteditable="true"]').each(function(){
           var id=$(this).attr('id');
           if(id!=undefined){
               $('#cke_' + id).remove();
               CKEDITOR.inline(id);
           }
       });

    };
    $scope.swDiffType=function(id){
        $scope.difficulty_id=id;
    }
    $scope.isSectionChild = function(id){
        if($scope.section_id.length<1)return false;
        for(var _i=0;_i < $scope.section_id.length;_i++){
            if(id==$scope.section_id[_i].id){
                return true;
                break;
            }
        }
        return false;
    };
    $scope.isKnowledgeChild = function(id){
        if($scope.knowledge_point_id.length<1)return false;
        for(var _i=0;_i < $scope.knowledge_point_id.length;_i++){
            console.log(id,$scope.knowledge_point_id[_i].id);
            if(id==$scope.knowledge_point_id[_i].id){
                return true;
                break;
            }
        }
        return false;
    };
    $scope.submitTiMuForm=function () {
        if(!$scope.isWordAddClause){
            alert('提交前选阅读《资源上传服务条款》');
            return false;
        }
        var node_ids='';
        for(var i=0;i<$scope.section_id.length;i++){
            if(node_ids!=''){
                node_ids+=",";
            }
            node_ids+=$scope.section_id[i].key;
        }
        var knowledge_ids='';
        for(var i=0;i<$scope.knowledge_point_id.length;i++){
            if(knowledge_ids!=''){
                knowledge_ids+=",";
            }
            knowledge_ids+=$scope.knowledge_point_id[i].key;
        }
        if(node_ids=='' && knowledge_ids==''){
            alert('没有选择章节或知识点');
            return false;
        }
        $("#waitfor").show();
        //题干内容
        var timu_tigan_con=$('#timu_tigan_con').html();
        //答案解析
        var timu_tigan_analysis=$('#timu_tigan_analysis').html();
        var timu_tigan_answer='';
        if($scope.titype==5){
            //答案
            timu_tigan_answer=$('#timu_tigan_answer').html();
        }
        if($scope.titype==6){
            //答案
            timu_tigan_answer=$('#timu_other_answer').html();
        }
        var items=[];
        $('.timu_answer_choice li').each(function(){
            var flag=$(this).find('.timu_opte_num').text();
            var text=$(this).find('.timu_optt_input').html();
            var isAnswer=$(this).find('.radiostyle_y').length>0?1:0;
            items.push({
                flag:flag,
                text:text,
                isAnswer:isAnswer
            });
        });
        var post_data={
            'upfiletype':10,
            'school_period_id':$scope.school_period_id,
            'subject_id':$scope.subject_id,
            'pschool_period_id':$scope.pschool_period_id,
            'psubject_id':$scope.psubject_id,
            'version_id':$scope.version_id,
            'book_id':$scope.book_id,
            'question_types':$scope.titype,
            'difficulty':$scope.difficulty_id,
            'section_id':node_ids,
            'knowledge_point_id':knowledge_ids,
            'timu_tigan_con':timu_tigan_con,
            'timu_tigan_analysis':timu_tigan_analysis,
            'timu_tigan_answer':timu_tigan_answer,
            'items':items
        };
        $.ajax({
            url: 'http://test.com/test.php',
            /*url:rooturl+'/fileManagementFacade/upLoad', */
            type: 'POST',
            data: post_data,
            dataType:'JSON',
            success: function (d) {
                if(d.status==0){
                    alert('上传成功');
                    window.location.href='/re/#!/re_upfile';
                }
                $("#waitfor").hide();
            },
            error: function (XMLHttpRequest,textStatus,errorThrown) {
                console.log('error');
                alert('上传失败');
                $("#waitfor").hide();
               // window.location.href='/re/#!/re_upfile';
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
        /*$http({
            method:'POST',
            url:'http://test.com/test.php',
            data:post_data,
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        },function(d) {
            console.log(d);
        });*/
    }

    /*****组卷开始*****************************/
    $scope.zujuan_dig_type=1;
    $scope.zujuan_lists=null;
    $scope.zujuan_tmpcontent=null;
    $scope.car=[];
    if($scope.curtype=='zujuan'){
        updateZujuanList();
    };
    $scope.changType=function(type) {
        $scope.zujuan_dig_type = type;
       updateZujuanList();
    };
    function updateZujuanList(){
        var name="zujuan_lists"+$scope.zujuan_dig_type;
        var zujuan=TOOL.getObject(name);
        if(zujuan==''){
            //var url=rooturl+'/resourceNodeQuery/subjectList?stageId='+id;
            var url='/data/re/'+name+'.js';
            $http.get(url).then(function(d3){
                TOOL.setObject(name,d3.data.content);
                $scope.zujuan_lists=d3.data.content;
            },function(e){
                console.log(e);
                alert('获取数据出错');
            });
        }else{
            $scope.zujuan_lists=zujuan;
        }
    };
    $scope.zujuanEdit=function(id){
        if(id<1){
            return false;
        }
        $scope.zujuan_tmpcontent=null;
        for(var i=0;i<$scope.zujuan_lists.length;i++){
            if($scope.zujuan_lists[i].id==id){
                $scope.zujuan_tmpcontent=$scope.zujuan_lists[i];
            }
        }
        if($scope.zujuan_tmpcontent!=null){
            $("#pop_edit_timu_box").show("slow");
            CKEDITOR.instances.timu_tigan_con_e.setData($scope.zujuan_tmpcontent.title);
            CKEDITOR.instances.timu_tigan_analysis_e.setData($scope.zujuan_tmpcontent.analysis);
            setTimeout(function(){
                $('#edit_timu_form .timu_answer_choice li div[contenteditable="true"]').each(function(){
                    var id=$(this).attr('id');
                    if(id!=undefined){
                        $('#cke_' + id).remove();
                        CKEDITOR.inline(id);
                    }
                });
            },1000);
        }else{
            alert('操作异常');
        }
    }

    $scope.addCart=function(id){

    }
}]);
function getChapterTitle(dom,title){
    var domcontent=dom.data('title');
    var recontent='';
    if(domcontent==null||domcontent==''||domcontent==undefined){
        return title;
    }else{
        title=getChapterTitle(dom.parent().parent(),title);
        recontent=domcontent+" > "+title;
        return recontent;
    }
}
function getKnowledgeTitle(dom,title){
    var domcontent=dom.data('title');
    var recontent='';
    if(domcontent==null||domcontent==''||domcontent==undefined){
        return title;
    }else{
        title=getChapterTitle(dom.parent().parent(),title);
        recontent=domcontent+" > "+title;
        return recontent;
    }
}