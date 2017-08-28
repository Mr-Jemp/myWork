$(function() {
    $("#find").bind("click", function(e) {
        if ($("#target").val().length < 1) { alert("请选择搜索分类"); return false; }
        if ($("#key").val().length < 1) { alert("请输入关键字"); return false; }
    });
    $("#kadlskdweo #rowid").bind("mouseover", function(e) {
        $(this).css("background-color", "#efefef");
    });
    $("#kadlskdweo #rowid").bind("mouseout", function(e) {
        $(this).css("background-color", "");
    });

    $("#kadlskdweo #delid").bind("click", function(e) {
        if (!confirm("注意：如果状态是进行中的，就是删除同步也会进行到结束，确定要删除吗？")) return false;
        return true;
    });

    $("#selectcmd").bind("change", function() {
        var ble = $(this).is(":checked");
        if (ble == true) $("input[name='selectid']").each(function() { $(this).attr("checked", true); });
        if (ble == false) $("input[name='selectid']").each(function() { $(this).attr("checked", false); });
    });
    $("#kadlskdweo #target").bind("change", function() {
        var value = $(this).find(" option:selected").text();
        if (value == "状态") $("#kadlskdweo #key").attr("value", "成功/失败/进行中/未设置");
    });
    //删除选择
    $("#delselect").bind("click", function() {
        if (!confirm("注意：如果状态是进行中的，就是删除同步也会进行到结束，确定要删除吗？")) return false;
        var objarr = $("input[name='selectid']");
        if (objarr == null) return;
        var i = 0, l = objarr.length;
        var idarr = "";
        for (i = 0; i < l; i++) {
            if (!objarr.eq(i).is(":checked")) continue;
            var id = objarr.eq(i).attr("value");
            var h = $("#stateid" + id).html().trim();
            //if (h == "进行中") { alert("不能删除进行中的数据"); return false; }
            idarr += id + ",";
        }
        if (idarr == "") return;
        window.location.href = "dbtimelist.aspx?delid=" + idarr;
    });
    //关闭
    $("#posstateid #stbind").bind("click", function() {
        var ty = $(this).attr("ty");
        var tid = $(this).attr("tid");
        var tname = $(this).attr("tname");
        var did = $(this).attr("did");

        var parent = $(this).parent();
        var _this = $(this);
        if (ty == "stop") { if (!confirm("注意：如果状态是进行中的，就是关闭定时同步也可能会进行到结束，确定要关闭吗？")) return false; }
        else if (ty == "start") {
            if (!confirm("注意：如果是立即模式，将会立即进行同步，确定要开启吗？")) return false;
        } else { alert("未定义的操作模式"); return; }
        parent.find("span").html("稍等...");

        $.ajax({ data: { tid: tid, tname: tname, ty: ty, did: did }, url: "PoolDBHread.aspx", type: "POST", dataType: "json"
		, success: function(data) {
		    parent.find("span").html("");
		    if (data[0] == "no") {
		        alert(data[1]);
		        return;
		    }
		    if (data[0] != "ok") {
		        alert("未知错误：" + data[1]);
		        return;
		    }
		    alert("操作成功");
		    if (ty == "stop") {
		        parent.find("a").html("▲");
		        _this.css("color", "#00aa00");
		        _this.attr("ty", "start");
		    } else {
		        parent.find("a").html("■");
		        _this.css("color", "#ff0000");
		        _this.attr("ty", "stop");
		        $("#stateid" + did).html("进行中");
		    }
		},
            error: function(xhr, stat, e) { parent.find("span").html(""); alert("网络出错请重试！"); }
        });
    });


});