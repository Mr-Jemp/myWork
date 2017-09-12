var root_url='http://192.168.0.21:20897';
var app=angular.module('upfile',[])
    .filter('filesize',function(){
        return function(filelength){
            var html = '';
            var m=1024*1024;
            if(filelength>m){
                html=parseInt(filelength/m)+'M';
            }else if(filelength>1024){
                html=parseInt(filelength/1024)+'KB';
            }else{
                html=filelength+'B';
            }
            return html;
        }
    })
.factory('getData', ['$http', function($http){
    var f = {};
    f.getUrlData=function(url,flag){
        url=root_url+url;
        return $http.get(url)
            .then(function(r) {
                console.log('服务器数据');
                return {"status":"ok","data":r.data};
            })
            .catch(function(err) {
                console.log('文件数据');
                return {"status":"ok","data":g_data[flag]}
            });
    };
    return f;
}])
.controller("upfilectr",["$scope","getData","$compile",function ($scope,getData,$compile) {
    $scope.files=null;
    $scope.filedir_id=0;
    $scope.dirfilename='';
    $scope.sw_ids=[];
    $scope.pid=0;
    $scope.cur_dir_id=0;
    $scope.cur_dir='';
    $scope.cur_nav=[{"id":0,"dirname":"根目录"}];
    $scope.all_dir=[];
    var updata={"uId":20,"folderId":$scope.cur_dir_id};
    $scope.setNav=function(id,dirname){
        var len=$scope.cur_nav.length;
        for(var i=0;i<len;i++){
            if(id==$scope.cur_nav[i].id){
                console.log($scope.cur_nav);
                console.log(i+1,len-i);
                $scope.cur_nav.splice(i+1,len-i);
                return false;
            }
        }
        $scope.cur_nav.push({
            "id":id,
            "dirname":dirname
        });
    }
    $scope.setFileList=function(id){
        updata.folderId=id;
        getData.getUrlData("/search/resource?uId=20&fileId="+id,"lenssons").then(function (res){
            console.log(res);
            if(res.data.status==0){
               $scope.files=res.data.msg;
            }
        })
    }
    $scope.setFileList(0);
    $scope.goFileList=function(id,isdir,fpath,pid,filename){
        console.log(id,isdir,fpath);
        $scope.sw_ids=[];
        if(!isdir){
            $scope.pid=pid;
            $scope.cur_dir_id=id;
            $scope.cur_dir=filename;
            $scope.setNav(id,filename);
            $scope.setFileList(id);
        }else{
            return false;
        }
    }
    //创建目录
    $scope.createDir=function(){
        if($scope.dirfilename==''){
            alert('目录名不能为空');
            return false;
        }
        getData.getUrlData("/resource/createFolder?uId=20&fileId="+$scope.cur_dir_id+"&folderName="+$scope.dirfilename,"dirfilename").then(function (res){
            console.log(res);
            if(res.data.status==0){
                alert("目录添加成功");
                $scope.setFileList($scope.cur_dir_id);
                $('#myModal').modal('hide');
            }
        })
    }

    //删除文件
    $scope.del=function(id){
        if(id<1){
            alert('删除文件出错');
            return false;
        }
        getData.getUrlData("/resource/delete?uId=20&fileIds="+id,"delfile").then(function (res){
            console.log(res);
            if(res.data.status==0){
                alert("删除成功");
                $scope.setFileList($scope.cur_dir_id);
            }
        })
    }
    //删除多文件
    var delfilenum=1;
    $scope.dels=function(){
        var num=$scope.sw_ids.length;
        for(var i=0;i<num;i++){
            getData.getUrlData("/resource/delete?uId=20&fileIds="+$scope.sw_ids[i],"delfile").then(function (res){
                console.log($scope.sw_ids[i]+"删除成功");
                delfilenum++;
                if(delfilenum==$scope.sw_ids.length){
                    delfilenum=1;
                    $scope.setFileList($scope.cur_dir_id);
                }
            })
        }
        //$scope.setFileList($scope.cur_dir_id);
    }
    //上传文件
    console.log(updata);
    var uploader = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : 'upfile',
        url : root_url+'/resource/uploadFile',
        multipart_params : updata,
        flash_swf_url : 'part/plupload/js/Moxie.swf',
        silverlight_xap_url : 'part/plupload/js/Moxie.xap'
    });
    uploader.init();
    uploader.bind('FilesAdded',function(up,files){
        $("#upfile").button('loading');
        uploader.start();
    });
    uploader.bind('UploadComplete',function(up,file){
        $scope.setFileList($scope.cur_dir_id);
        $("#upfile").button('reset');
    });
    $scope.setSwIds=function(id){
        for(var i=0;i<$scope.sw_ids.length;i++){
            if(id==$scope.sw_ids[i]){
                $scope.sw_ids.splice(i,1);
                return false;
            }
        }
        $scope.sw_ids.push(id);
    }
    $scope.setSwIdds=function(){
        console.log(222);
    }
    $scope.move_dir_id=16;
    function pAllDir(arr,level){
        console.log(arr);
        console.log(level);
        var line='';
        for(var j=0;j<level;j++){
            line+='--';
        }
        for(var i=0;i<arr.length;i++){
            $scope.all_dir.push(
                {
                   "id":arr[i].id,
                    "dirname":line+arr[i].name
                }
            );
            if(arr[i].child.length>0)pAllDir(arr[i].child,level+1);
        }

    }
    $scope.getAllDir=function(){
        getData.getUrlData("/search/catalog?uId=20","alldir").then(function (rs){
            if(rs.data.status==0){
                $scope.move_dir_id=rs.data.msg[0].id;
                pAllDir(rs.data.msg,0);
                console.log($scope.all_dir);
            }
        })
    }
    $scope.getAllDir();
    var movenum=1;
    $scope.subMoveFile=function () {
        var num=$scope.sw_ids.length;
        for(var i=0;i<num;i++){
            if($scope.sw_ids[i]==$scope.move_dir_id)continue;
            getData.getUrlData("/resource/moveFile?uId=20&objId="+$scope.sw_ids[i]+"&targetId="+$scope.move_dir_id,"delfile").then(function (res){
                console.log(res);
                movenum++;
                if(movenum==$scope.sw_ids.length){
                    movenum=1;
                    $('#Modalmovefile').modal('hide');
                    $scope.setFileList($scope.cur_dir_id);
                }
            })
        }
    }
    $scope.setMoveFileID=function(id){
        console.log("设置移动ID");
        console.log(id);
    }
    $scope.fileDownload=function(id){
        if(id<1){
            return false;
        }
        window.open(root_url+"/resource/download?uId=20&fileId="+id);
    }
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
}]);