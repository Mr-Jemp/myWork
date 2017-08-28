$(function(event) {
    $("#addStaff").bind("click", function() {
        //        var selectedRole = $("#roleTreeDiv").find(".selectA")[0];
        //        if (selectedRole == null) {
        //            if (confirm("是否添加新职员到公司游客角色！！")) {
        document.location.href = "/front/signUser.htm?opType=add";
        //            }
        //        }
        //        else {
        //            if (confirm("是否添加新职员到公司" + $(selectedRole).text() + "角色！！")) {
        //                var roleId = $(selectedRole).parent().parent().attr("attrid");
        //                document.location.href = "/signUser.htm?opType=add&roleId=" + roleId;
        //            }
        //        }
    });
    //用户登录函数，enNumber为企业代码,不填写企业代码，登录则为本软件公司,当用户不填写用户名和密码直接登录，或者选择guest登录时，用户身份为来客
    $("#loginButton").bind("click", function(event) {
        $.ligerDialog.waitting('正在登陆中,请稍候...'); setTimeout(function() { $.ligerDialog.closeWaitting(); }, 2000);
        var enNumber = "sssss";
        var userName = $("#username").val();
        var password = $("#passwordid").val();
        $.ajax({ url: "/front/handler/backDesk.ashx", type: "POST", data: { operatetype: "loginWebsite", enNumber: escape(enNumber), userName: escape(userName), password: escape(password) },
            success: function(dataStr) {
                var data = eval('('+dataStr+')');
                if (data.IsSuccess) {
                    //                    var pageUrl = data.Data.split(';')[0];
                    //                    alert(data.Data.Roles[0].homeName);
                    if (data.Data.Roles[0].homeId != "999999") {
                        document.location.href = encodeURI("/front/contentHmtl.htm?name=" + data.Data.Roles[0].homeName);
                        return false;
                    } else {
                        document.location.href = "/front/runPage.htm";
                        //document.location.href = "/backManage.htm";
                        return false;
                    }
                }
                else {
                    $.ligerDialog.closeWaitting();
                    alert(data.Message);
                }
            },
            error: function(XMLHttpRequest, textStatus) {

                //alert(XMLHttpRequest.status);
                //alert(XMLHttpRequest.readyState);
                // alert(textStatus);
                $.ligerDialog.closeWaitting();
                //                alert("错误码：" + XMLHttpRequest.status);
            }
        });
    });
    //软件客户免费注册
    $("#resetButton").bind("click", function() {
        if (confirm("是否真的重启！！")) {
            $.ajax({ url: "/front/handler/backDesk.ashx", type: "POST", data: { operatetype: "reset" },
                success: function(data) {
                    if (data == "操作失败！！") {
                        alert(data);
                    }
                    else {
                        document.location.href = data;
                        return false;
                    }
                },
                error: function(xhr, stat, e) {
                    alert("first");
                }
            });
        }
    });
    //忘记密码，重新获取密码
    $("#shutdownButton").bind("click", function() {
        if (confirm("是否关闭！！")) {
            $.ajax({ url: "/front/handler/backDesk.ashx", type: "POST", data: { operatetype: "shutdown" },
                success: function(data) {
                    if (data == "操作失败！！") {
                        alert(data);
                    }
                    else {
                        document.location.href = data;
                        return false;
                    }
                },
                error: function(xhr, stat, e) {
                    alert("first");
                }
            });
        }
    });
});
