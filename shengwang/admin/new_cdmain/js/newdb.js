$(window).load(function()
{
	var editid=window.location.param("editid");
	//加载数据
	$.ajax({ data: { get:"is",editid:editid}, url: "newdb.aspx", type: "POST", dataType: "json"
	, success: function(data) 
	{
		$("#itemloadid").css({height:"0px"});
		$("#itembodyid").show();
		if (!data.li0state) {alert(data.li0msg);return;}

		$("#databasename").attr("value",data.li2_databasename);
		$("#databasenameid").html(data.li2_databasename);

		var selarr=null,arr=null;
		for(;;)
		{
			if(data.li2_tablename==null)break;
			if(data.li1_srctablesel==null){}else if(data.li1_srctablesel.indexOf(':')>-1)selarr=data.li1_srctablesel.split(":");
			if(data.li2_tablename.indexOf(':')-1)arr=data.li2_tablename.split(":");
			
			if(arr==null)break;
			if(arr.length<1)break;
			var i=0,l=arr.length;
			
			for(i=0;i<l;i++)
			{
				if(arr[i]==null)continue;
				if(arr[i].length<1)continue;
				var out="<option value=\"" + arr[i] + "\"";
				if(selarr!=null)
				{
					for(i2=0;i2<selarr.length;i2++)
					{
						if(arr[i]!=selarr[i2])continue;
						out+=" selected=\"selected\"";
						break;
					}
				}
				out+=">" + arr[i] + ":</option>";
				$("#srctablesel").append(out);
			}
			break;
		}
		if(data.li1count<1)return;//不是修改的
		$("#Submit").attr("value","修改同步");
		
		$("#editid").attr("value",data.li1_id);
		$("#targetip").attr("value",data.li1_targetip);
		$("#targetname").attr("value",data.li1_targetname);
		$("#targetpwd").attr("value",data.li1_targetpwd);
		$("#targettable").attr("value",data.li1_targettable);
		
		if(data.li1_cmdtype=="立即")$(":radio[id='cmdtype1']").attr("checked",true);
		if(data.li1_cmdtype=="定时")$(":radio[id='cmdtype2']").attr("checked",true);
		if(data.li1_cmdtype=="定时")$("#timeid").show();
		if(data.li1_ftimetype=="一天")$("#timetype").selectIndex=0;
		if(data.li1_ftimetype=="每周")$("#timetype").selectIndex=1;
		if(data.li1_ftimetype=="每月")$("#timetype").selectIndex=2;

		if(data.li1_loop=="重复")$(":radio[id='loop1']").attr("checked",true);
		if(data.li1_loop=="一次")$(":radio[id='loop2']").attr("checked",true);
		
		if(data.li1_srctableseltype=="全部")$(":radio[id='srctableseltype1']").attr("checked",true);
		if(data.li1_srctableseltype=="手选")$(":radio[id='srctableseltype2']").attr("checked",true);
		if(data.li1_srctableseltype=="手选")$("#fileid").show();
		
	},
	error: function(xhr, stat, e) {  $("#itemloadid").animate({height:"0px"});alert("网络出错无法加载数据请重试！"); }
	});
});
$(function() {
    $("#itemloadid").css({height:"25px"});
    //操作模式
    $("#cmdtypeid input").bind("click", function(e) {
        var id = $(this).attr("id");
        if (id == "cmdtype1") $("#timeid").hide();
        if (id == "cmdtype2") $("#timeid").show();
    });
    //表的选择模式
    $("#fineselectid input").bind("click", function(e) {
        var id = $(this).attr("id");
        if (id == "srctableseltype1") $("#fileid").hide();
        if (id == "srctableseltype2") $("#fileid").show();
    });

    //如果提交
    $("#Submit").bind("click", function(e) {
        //收集表单信息

        var targetip = $("#targetip").val(); targetip = (targetip == null) ? "" : targetip;
        var targetname = $("#targetname").val(); targetname = (targetname == null) ? "" : targetname;
        var targetpwd = $("#targetpwd").val(); targetpwd = (targetpwd == null) ? "" : targetpwd;
        var targettable = $("#targettable").val(); targettable = (targettable == null) ? "" : targettable;
        var cmdtype = $("#cmdtype1").is(":checked") == true ? $("#cmdtype1").val() : ""; cmdtype = $("#cmdtype2").is(":checked") == true ? $("#cmdtype2").val() : cmdtype; cmdtype = (cmdtype == null) ? "" : cmdtype;
        var timetype = $("#timetype option:selected").val(); timetype = (timetype == null) ? "" : timetype;
        var loop = $("#loop1").is(":checked") == true ? $("#loop1").val() : ""; loop = $("#loop2").is(":checked") == true ? $("#loop2").val() : loop; loop = (loop == null) ? "" : loop;
        var srctable = $("#databasename").val(); srctable = (srctable == null) ? "" : srctable;
        var srctableseltype = $("#srctableseltype1").is(":checked") == true ? $("#srctableseltype1").val() : ""; srctableseltype = $("#srctableseltype2").is(":checked") == true ? $("#srctableseltype2").val() : srctableseltype; srctableseltype = (srctableseltype == null) ? "" : srctableseltype;
        var srctablesel = "";
        var count = $("#srctablesel option").length, i = 0;
        for (i = 0; i < count; i++) {
            if ($("#srctablesel option")[i].selected) {
                srctablesel =
                $("#srctablesel option:selected").text();
            }
        }
        srctablesel = (srctablesel == null) ? "" : srctablesel;
        
        var editid = $("#editid").val(); editid = (editid == null) ? "" : editid;

        //组合参数
        var data = {
            editid: escape(editid),
            targetip: escape(targetip),
            targetname: escape(targetname),
            targetpwd: escape(targetpwd),
            targettable: escape(targettable),
            cmdtype: escape(cmdtype),
            timetype: escape(timetype),
            loop: escape(loop),
            srctable: escape(srctable),
            srctableseltype: escape(srctableseltype),
            srctablesel: escape(srctablesel)
        };
        $("#submitmsg").html("提交中，请稍待...");
        //eval(data)
        //alert(JSON.stringify(data));
        //alert(JSON.parse(JSON.stringify(data)));
        $.ajax({ data: data, url: "newdbajax.aspx", type: "POST", dataType: "json"
		, success: function(data) {
		    $("#submitmsg").html("");
		    if (!data[0]) {
		        $("#submitmsg").html("" + data[1]);
		        alert(data[1]);
		        return;
		    }
		    alert("提交成功，请到列表里查看状态");
		    window.location.href = "dbtimelist.aspx";
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
