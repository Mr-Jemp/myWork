$(function(event) {
    $("#close").bind("click", function() {
        document.location.href = "/index.htm";
    });
    $(document).bind("contextmenu", function(e) {
        return false;
    });
    var roleId = 2;
    var opType = "add";
    var staffId = -1;
    try {
        var theurl = window.location.href;
        var queryStr = theurl.split('?')[1];
        var opStr = queryStr.split("&")[0];
        opType = opStr.split('=')[1];
        if (opType == "add") {
            var idStr = queryStr.split("&")[1];
            roleId = idStr.split('=')[1];
            roleId = roleId.replace("#", "");
        }
        else {
            var staffIdStr = queryStr.split("&")[1];
            staffId = staffIdStr.split('=')[1];
            var staffNameStr = queryStr.split("&")[2];
            var staffName = staffNameStr.split('=')[1];
            var zhanghaoStr = queryStr.split("&")[3];
            var zhanghao = zhanghaoStr.split('=')[1];
            $("#zhanghao").val(zhanghao);
            $("#zhanghao").attr("disabled", true);
            $("#password").val("******");
            $("#password").attr("disabled", true);
            $("#confirmPassword").val("******");
            $("#confirmPassword").attr("disabled", true);
            $("#name").val(staffName);
        }
    }
    catch (e) {

    }
    $("#save").bind("click", function() {
        var name = $("#name").val();
        if (opType == "add") {
            var zhanghao = $("#zhanghao").val();
            var password = $("#password").val();
            var confirmPassword = $("#confirmPassword").val();
            if (password == "") {
                alert("密码不能为空！！");
                $("#password").val("");
                $("#confirmPassword").val("");
                return false;
            }
            if (password != confirmPassword) {
                alert("二次输入密码不一致！！");
                $("#password").val("");
                $("#confirmPassword").val("");
                return false;
            }
            $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "signUser", zhanghao: escape(zhanghao), password: escape(password), name: escape(name), roleId: escape(roleId) },
                success: function(data) {
                    if (data.IsSuccess) {
                        alert(data.Data);
                    }
                    else {
                        alert(data.Message);
                    }
                },
                error: function(xhr, stat, e) {
                    alert(e);
                }
            });
        }
        else {
            $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "editUser", staffId: escape(staffId), name: escape(name) },
                success: function(data) {
                    if (data.IsSuccess) {
                        alert(data.Data);
                    }
                    else {
                        alert(data.Message);
                    }
                },
                error: function(xhr, stat, e) {
                    alert(e);
                }
            });
        }
    });
})