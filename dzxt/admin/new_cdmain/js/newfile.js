$(window).load(function()
{
	var editid=window.location.param("editid");
	//加载数据
	$.ajax({ data: { get:"is",editid:editid}, url: "newfile.aspx", type: "POST", dataType: "json"
	, success: function(data) 
	{
		$("#itemloadid").css({height:"0px"});
		$("#itembodyid").show();
		if (!data.li0state) {alert(data.li0msg);return;}

		//本地源目录
		$("#sel_srcpath").html(data.li1_mydir);
		$("#sel_srcpath a").bind("click",onsel_srcpatha_click);
		//请选择目录
		$("#srcpathlist").html(data.li2_srcpathlist);
		$("#srcpathlist a").bind("click",  onsrcpathlista_click);

		if(data.li1count<1)return;//不是修改的
		$("#Submit").attr("value","修改同步");
		$("#editid").attr("value",data.li1_id);
		if(data.li1_target=="本地")$(":radio[id='target1']").attr("checked",true);
		if(data.li1_target=="远程")$(":radio[id='target2']").attr("checked",true);
		if(data.li1_target=="远程")$("#ftpid").show();
		$("#ftpip").attr("value",data.li1_ftpip);
		$("#ftpname").attr("value",data.li1_ftpname);
		$("#ftppwd").attr("value",data.li1_ftppwd);
		
		$("#localfile").attr("value",data.li1_localfile);

		if(data.li1_cmdtype=="立即")$(":radio[id='cmdtype1']").attr("checked",true);
		if(data.li1_cmdtype=="定时")$(":radio[id='cmdtype2']").attr("checked",true);
		if(data.li1_cmdtype=="定时")$("#timeid").show();
		if(data.li1_ftimetype=="一天")$("#timetype").selectIndex=0;
		if(data.li1_ftimetype=="每周")$("#timetype").selectIndex=1;
		if(data.li1_ftimetype=="每月")$("#timetype").selectIndex=2;
		
		if(data.li1_loop=="重复")$(":radio[id='loop1']").attr("checked",true);
		if(data.li1_loop=="一次")$(":radio[id='loop2']").attr("checked",true);
		
		$("#srcpath").attr("value",data.li1_srcpath);

		
		if(data.li1_fineselectid=="全部")$(":radio[id='fineselectid1']").attr("checked",true);
		if(data.li1_fineselectid=="手选")$(":radio[id='fineselectid2']").attr("checked",true);
		if(data.li1_fineselectid=="手选")$("#fileid").show();
		
		var arr=data.li1_fileselect.split(":");
		if(arr==null)return;
		if(arr.length<1)return;
		var i=0,l=arr.length;
		for(i=0;i<l;i++)
		{
			if(arr[i]==null)continue;
			if(arr[i].length<1)continue;
			$("#fileselect").append("<option value=\"" + arr[i] + "\" selected=\"selected\">" + arr[i] + ":</option>");
		}
	},
	error: function(xhr, stat, e) {  $("#itemloadid").animate({height:"0px"});alert("网络出错无法加载数据请重试！"); }
	});
});
$(function() {
	$("#itemloadid").css({height:"25px"});
    //不同选项时对应属性的开启与关闭
    $("#targetid input").bind("click", function(e) {
        var id = $(this).attr("id");
        if (id == "target1") { $("#ftpid").hide(); }
        if (id == "target2") { $("#ftpid").show(); }
    });

    $("#cmdtypeid input").bind("click", function(e) {
        var id = $(this).attr("id");
        if (id == "cmdtype1") $("#timeid").hide();
        if (id == "cmdtype2") $("#timeid").show();
    });

    $("#fineselectid input").bind("click", function(e) {
        var id = $(this).attr("id");
        if (id == "fineselectid1") $("#fileid").hide();
        if (id == "fineselectid2") $("#fileid").show();
    });
    
	//如果点击刷新
	$("#newsrcpath").bind("click",function(e)
	{
		var srcpath=$("#srcpath").attr("value");
		newfile_getfile(srcpath);
	});
		
    //如果提交
    $("#Submit").bind("click", function(e) {
        //收集表单信息
        var editid = $("#editid").val(); editid = (editid == null) ? "" : editid;
        var target = $("#target1").is(":checked") == true ? $("#target1").val() : ""; target = $("#target2").is(":checked") == true ? $("#target2").val() : target; target = (target == null) ? "" : target;
        var localfile = $("#localfile").val(); localfile = (localfile == null) ? "" : localfile;
        var ftpip = $("#ftpip").val(); ftpip = (ftpip == null) ? "" : ftpip;
        var ftpname = $("#ftpname").val(); ftpname = (ftpname == null) ? "" : ftpname;
        var ftppwd = $("#ftppwd").val(); ftppwd = (ftppwd == null) ? "" : ftppwd;
        var cmdtype = $("#cmdtype1").is(":checked") == true ? $("#cmdtype1").val() : ""; cmdtype = $("#cmdtype2").is(":checked") == true ? $("#cmdtype2").val() : cmdtype; $("#localfile").val(); cmdtype = (cmdtype == null) ? "" : cmdtype;
        var timetype = $("#timetype option:selected").val(); timetype = (timetype == null) ? "" : timetype;
        var loop = $("#loop1").is(":checked") == true ? $("#loop1").val() : ""; loop = $("#loop2").is(":checked") == true ? $("#loop2").val() : loop; loop = (loop == null) ? "" : loop;
        var srcpath = $("#srcpath").val(); srcpath = (srcpath == null) ? "" : srcpath;
        var fineselectid = $("#fineselectid1").is(":checked") == true ? $("#fineselectid1").val() : ""; fineselectid = $("#fineselectid2").is(":checked") == true ? $("#fineselectid2").val() : fineselectid; fineselectid = (fineselectid == null) ? "" : fineselectid;
        var fileselect = "";
        var count = $("#fileselect option").length, i = 0;
        for (i = 0; i < count; i++) {
            if ($("#fileselect option")[i].selected) {
                fileselect =
                $("#fileselect option:selected").text();
            }
        }
        fileselect = (fileselect == null) ? "" : fileselect;
        //组合参数
        var data = {
            editid: escape(editid),
            target: escape(target),
            localfile: escape(localfile),
            ftpip: escape(ftpip),
            ftpname: escape(ftpname),
            ftppwd: escape(ftppwd),
            cmdtype: escape(cmdtype),
            timetype: escape(timetype),
            loop: escape(loop),
            srcpath: escape(srcpath),
            fineselectid: escape(fineselectid),
            fileselect: escape(fileselect)
        };
        $("#submitmsg").html("提交中，请稍待...");
        //eval(data)
        //alert(JSON.stringify(data));
        //alert(JSON.parse(JSON.stringify(data)));
        $.ajax({ data: data, url: "newfileajax.aspx", type: "POST", dataType: "json"
		, success: function(data) {
		    $("#submitmsg").html("");
		    if (!data.state) {
		        $("#submitmsg").html("" + data.msg);
		        alert(data.msg);
		        return;
		    }
		    alert("提交成功，请到列表里查看状态");
		    window.location.href = "filetimelist.aspx";
		},
            error: function(xhr, stat, e) { $("#submitmsg").html("网络出错请重试！" + e); alert("网络出错请重试！" + e); }
        });
    });
});
//加载数据
window.location.param=function(name)
{
	var inp=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
	var ren=window.location.search.substr(1).match(inp);
	if(ren!=null)return unescape(ren[2]);return null;
}
//如果点击路径
function onsel_srcpatha_click()
{
	var path=$(this).attr("path");
	$("#srcpath").attr("value",path);
	var srcpath = path;
	var arr=path.split("/");
	var outhtml="<a href=\"javascript:;\" path=\"\">根目录</a>";
	var outpath="";
	for(i=0;i<arr.length;i++)
	{
		if(arr[i]==null)continue;
		if(arr[i]=="")continue;
		outpath+="/"+arr[i];
		outhtml+="/<a href=\"javascript:;\" path=\""+outpath+"\">"+arr[i]+"</a>";
	}
	$("#sel_srcpath").html(outhtml)
	.find("a").bind("click",onsel_srcpatha_click);
	$("#srcpathlist").html("");
	srcpath = srcpath == null ? "" : srcpath;
	newfile_getdir(srcpath);
	newfile_getfile(srcpath);
}
function onsrcpathlista_click()
{
	var path=$("#srcpath").val()+"/"+$(this).attr("data");
	$("#srcpath").attr("value",path);
	var srcpath = path;
	$("#sel_srcpath").html($("#sel_srcpath").html()+"/<a href=\"javascript:;\" path=\""+path+"\">"+$(this).attr("data")+"</a>")
	.find("a").bind("click",onsel_srcpatha_click);
	$("#srcpathlist").html("");
	srcpath = srcpath == null ? "" : srcpath;
	newfile_getdir(srcpath);
	newfile_getfile(srcpath);
}

//取得目录
function newfile_getdir(path)
{
	$("#srcpathlist").html("提交中，请稍待...");
	$.ajax({ data: { medir: escape(path) }, url: "GetDirList.aspx", type: "POST", dataType: "json"
	, success: function(data) {
		$("#srcpathlist").html("");
		if (!data.state) {
			$("#srcpathlist").html("" + data.msg);
			alert(data.msg);
			return;
		}
		var selectobj = $("#srcpathlist");
		var i = 0, l = data.datamax;
		for (i = 0; i < l; i++) {
			selectobj.html(selectobj.html()+"<a href=\"javascript:;\" data=\"" + data.data[i] + "\" >" + data.data[i] + "</a> ");
		}
		selectobj.find("a").bind("click",  onsrcpathlista_click);
	},
		error: function(xhr, stat, e) { $("#srcpathlist").html("网络出错请重试！"); alert("网络出错请重试！"); }
	});
}

//取得文件
function newfile_getfile(path)
{
	$("#updatemsg").html("提交中，请稍待...");
	$.ajax({ data: { medir: escape(path) }, url: "GetFileList.aspx", type: "POST", dataType: "json"
	, success: function(data) {
		$("#updatemsg").html("");
		if (!data.state) {
			$("#updatemsg").html("" + data.msg);
			alert(data.msg);
			return;
		}
		var selectobj = $("#fileselect");
		selectobj.find("option").remove();
		var i = 0, l = data.datamax;
		for (i = 0; i < l; i++) {
			selectobj.append("<option value=\"" + data.data[i] + "\">" + data.data[i] + ":</option>");
		}
	},
		error: function(xhr, stat, e) { $("#updatemsg").html("网络出错请重试！"); alert("网络出错请重试！"); }
	});

}


