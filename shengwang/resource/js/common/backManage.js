var flotGetPageDiv;
$(function(event) {
    //           alert(document.documentElement.clientHeight);
    $("#manageData").css("height", document.documentElement.clientHeight * 0.83);
    $("#rightDiv").css("height", document.documentElement.clientHeight * 0.83);
    $("#pageFrame").css("height", document.documentElement.clientHeight * 0.83);
    $(document).bind("contextmenu", function(e) {
        return true;
    });
    var rolePagePowers;
    var detailPowerForPageByRole;
    var currentHtml = "程序功能";
    //    $("#leftDiv").tabs({ activate: function(event, ui) {

    //    }
    //    });
    //    $("#powerDiv").tabs({ activate: function(event, ui) {

    //    }
    //    });
    $("#fireEmployeer").bind("click", function() {
        var selectedStaff = $("#staffForRoleDiv").find(".selectA")[0];
        if (selectedStaff == null) {
            alert("没有选择解除角色的用户！！");
            return false;
        }
        var selectedLi = $(selectedStaff).parent();
        var staffId = $(selectedStaff).parent().children("input").attr("id");
        staffId = staffId.replace("Cbo", "");
        if (confirm("是否真的解除角色！！")) {
            $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "fireEmployeer", staffId: escape(staffId) },
                success: function(data) {
                    if (data.IsSuccess) {
                        $(selectedLi).remove();
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
    $("#appointEmployeer").bind("click", function() {
        var selectedStaff = $("#showStaffDiv").find(".selectA")[0];
        if (selectedStaff == null) {
            alert("没有选择指派角色的用户！！");
            return false;
        }
        var selectedStaffLi = $(selectedStaff).parent();
        var selectedRole = $("#roleTreeDiv input:checked")[0];

        if (selectedRole == null) {
            alert("没有选择指派角色！！");
            return false;
        }
        var roleId = $(selectedRole).parent().parent().attr("attrid");
        var staffId = $(selectedStaff).parent().children("input").attr("id");
        staffId = staffId.replace("Cbo", "");
        var staffs = $("#staffForRoleDiv li[staffId=" + staffId + "]");
        if (staffs.length > 0) {
            alert("角色已经有该用户了！！");
            return;
        }
        if (confirm("是否真的委任角色！！")) {
            $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "appointEmployeer", roleId: escape(roleId), staffId: escape(staffId) },
                success: function(data) {
                    if (data.IsSuccess) {
                        //                        $("#showStaffDiv").find(".selectA").removeClass("selectA");
                        //                        $("#roleTreeDiv").find(".selectA").removeClass("selectA");
                        //                        $("#staffForRoleDiv").children("ul").append(selectedStaffLi);
                        createStaffForRole(roleId)
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
    $("#addStaff").bind("click", function() {
        var selectedRole = $("#roleTreeDiv input:checked")[0];
        if (selectedRole == null) {
            if (confirm("是否添加新用户到游客角色！！")) {
                document.location.href = "/signUser.htm?opType=add";
            }
        }
        else {
            if (confirm("是否添加新用户到本角色！！")) {
                var roleId = $(selectedRole).parent().parent().attr("attrid");
                document.location.href = "/signUser.htm?opType=add&roleId=" + roleId;
            }
        }
    });
    $("#editStaff").bind("click", function() {
        var selectedStaff = $("#showStaffDiv").find(".selectA")[0];
        if (selectedStaff == null) {
            alert("没有选择需要编辑的用户！！");
            return false;
        }
        var li = $(selectedStaff).parent();
        var staffId = $(li).attr("staffId");
        var staffName = $(li).attr("name");
        var zhanghao = $(li).attr("zhanghao");
        document.location.href = "/signUser.htm?opType=edit&staffId=" + staffId + "&staffName=" + staffName + "&zhanghao=" + zhanghao;
    });
    $("#delStaff").bind("click", function() {
        var selectedStaff = $("#showStaffDiv").find(".selectA")[0];
        if (selectedStaff == null) {
            alert("没有选择需要删除的用户！！");
            return false;
        }
        var staffId = $(selectedStaff).parent().children("input").attr("id");
        staffId = staffId.replace("Cbo", "");
        if (confirm("是否真的删除用户！！")) {
            $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "deleteStaff", staffId: escape(staffId) },
                success: function(data) {
                    if (data.IsSuccess) {
                        $(selectedStaff).parent().remove();
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
    $("#dbconns").bind("click", function() {
        var iframeobj = document.getElementById("iframemonitor");
        iframeobj.src = "/monitor/monitor.aspx";
        return false;
    });
    $("#netconns").bind("click", function() {
        var iframeobj = document.getElementById("iframemonitor");
        iframeobj.src = "/monitor/netconns.aspx";
        return false;
    });
    $("#filesync").bind("click", function() {
        var iframeobj = document.getElementById("iframemonitor");
        iframeobj.src = "/monitor/FileSyncSettings.aspx";
        return false;
    });
    $("#ceshiyemian").bind("click", function() {
        var iframeobj = document.getElementById("iframemonitor");
        iframeobj.src = "/monitor/test.aspx";
        return false;
    });
    $("#searchStaff").bind("click", function() {
        var searchDiv = document.createElement("div");
        $("#showStaffDiv").html("");
        $("#showStaffDiv").append(searchDiv);
        $(searchDiv).css("width", "100%");
        $(searchDiv).css("height", "100%");
        $(searchDiv).css("background-color", "gray");
        $(searchDiv).css("overflow", "auto");
        var conditionDiv = document.createElement("div");
        $(conditionDiv).css("width", "100%");
        $(conditionDiv).css("height", "10%");
        $(conditionDiv).css("border", "1px solid black");
        $(conditionDiv).css("background-color", "#537fbe");
        $(searchDiv).append(conditionDiv);
        $(conditionDiv).append('<span style="margin-left:10px;">用户账号:</span><select id="opUserSelect" style="width:80px;margin-left:10px;margin-right:10px;"><option value="=">等于</option><option value="=">相似</option><option value="=">长度</option></select><input type="text" id="valueUserText"  style="width:85px;font-size:12px;margin-right:10px;" /><a id="searchUserButton" style="font-size:12px;" href="#">查询</a><br/>');
        $(conditionDiv).append('<span style="margin-left:10px;">用户名称:</span><select id="opStaffSelect" style="width:80px;margin-left:10px;margin-right:10px;"><option value="=">等于</option><option value="=">相似</option><option value="=">长度</option></select><input type="text" id="valueStaffText"  style="width:85px;font-size:12px;margin-right:10px;" /><a id="searchStaffButton" style="font-size:12px;" href="#">查询</a>');
        var staffDiv = document.createElement("div");
        $(staffDiv).css("width", "100%");
        $(staffDiv).css("height", "89%");
        $(staffDiv).css("border", "1px solid black");
        $(staffDiv).css("background-color", "white");
        $(searchDiv).append(staffDiv);
        $("#searchUserButton").bind("click", function() {
            $(staffDiv).html("");
            var op = $("#opUserSelect").val();
            var value = $("#valueUserText").val();
            $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getStaffByUser", opType: escape(op), value: escape(value) },
                success: function(data) {
                    $("#staffForRoleDiv").html("");
                    if (data.IsSuccess) {
                        var staffs = data.Data;
                        createStaffsTree(staffDiv, staffs);
                    }
                    else {
                        $(staffDiv).append(data.Message);
                    }
                },
                error: function(xhr, stat, e) {
                    $(staffDiv).html("");
                    alert(e);
                }
            });
        });
        $("#searchStaffButton").bind("click", function() {
            var op = $("#opStaffSelect").val();
            var value = $("#valueStaffText").val();
            $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getStaffByStaff", opType: escape(op), value: escape(value) },
                success: function(data) {
                    $("#staffForRoleDiv").html("");
                    if (data.IsSuccess) {
                        var staffs = data.Data;
                        createStaffsTree(staffDiv, staffs);
                    }
                    else {
                        $(staffDiv).append(data.Message);
                    }
                },
                error: function(xhr, stat, e) {
                    $(staffDiv).html("");
                    alert(e);
                }
            });
        });
    });
    $("#allStaff").bind("click", function() {
        if (confirm("显示所有用户会较慢，是否真的打开！！")) {
            $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getAllStaff" },
                success: function(data) {
                    $("#showStaffDiv").html("");
                    if (data.IsSuccess) {
                        var staffs = data.Data;
                        createStaffsTree($("#showStaffDiv")[0], staffs);
                    }
                    else {
                        $("#staffForRoleDiv").append(data.Message);
                    }
                },
                error: function(xhr, stat, e) {
                    $("#staffForRoleDiv").html("");
                    alert(e);
                }
            });
        }
    });
    $("#myheader").find("a").bind("click", function() {
        var btnID = $(this).prop("id")

        $(document.getElementsByName("guanlxuanz")).css("background-color", "#008CBA");

        $(this).css("background-color", "#FFFFFF");
        if (btnID == "pagesetting"){
            $('#pageFrameDiv').css('width', '74.5%');
            $('#organize-change').html('<img src="/resource/js/bs/img/left_ss.gif" onclick="changeLeft()" width="10px" style="position:absolute;top:40%;text-align:right;right:0px;cursor:pointer">');
            $("#organize-side").css("display", "block");
            $("#organize-change").css("display", "block");
            $("#pageFrameDiv").css("display", "block");
            $("#manageMonitor").css("display", "none");
            $("#personalDiv").css("display", "none");
            $("#shuan").css("display", "block");
            $("#dan").css("display", "none");
            $("#zjbianj").css("display", "none");

            $("#content-main").load("/admin/pagesetting/design.htm");
        }
        else if (btnID == "orgsetting") {
            /*
            $("#zjbianj").css('width', '74.5%');
            $('#organize-change').html('<img src="/resource/js/bs/img/left_ss.gif" onclick="changeLeft()" width="10px" style="position:absolute;top:40%;text-align:right;right:0px;cursor:pointer">');
            $("#organize-side").css("display", "block");
            $("#organize-change").css("display", "block");
            $("#pageFrameDiv").css("display", "none");
            $("#manageMonitor").css("display", "none");
            $("#personalDiv").css("display", "none");
            $("#shuan").css("display", "none");
            $("#dan").css("display", "block");
            $("#zjbianj").css("display", "block");
            */
            $("#content-main").load("/admin/organizesetting/bumenTree.html");
        }
        else if (btnID == "serversetting") {
            $("#organize-side").css("display", "none");
            $("#organize-change").css("display", "none");
            $("#pageFrameDiv").css("display", "none");
            $("#manageMonitor").css("display", "block");
            $("#personalDiv").css("display", "none");
            $("#shuan").css("display", "none");
            $("#dan").css("display", "block");
            $("#zjbianj").css("display", "none");

            $("#content-main").load("/monitor/monitor.aspx");
        }
        else if (btnID == "personsetting") {
            $("#organize-side").css("display", "none");
            $("#organize-change").css("display", "none");
            $("#pageFrameDiv").css("display", "none");
            $("#manageMonitor").css("display", "none");
            $("#personalDiv").css("display", "block");
            $("#shuan").css("display", "none");
            $("#dan").css("display", "block");
            $("#zjbianj").css("display", "none");

            $("#content-main").load("/admin/personsetting/index.htm");
        }
        else if (btnID == "powersetting") {
            $("#content-main").load("/admin/powerdesign/quanxian.htm");
        }
        else if (btnID == "backbtn") {
            location.href = "/front/runPage.htm";
        }
    });
    $("#dan").find("a").bind("click", function() {
        location.href = "/front/runPage.htm";
    });
    function xuanzhong(div) {

    }
    var ar = ['文件夹', '页面'];
    var field = new HBSNodeFormat("name", "text", false, ar);
    var fields = [];
    fields.push(field);
    var field1 = new HBSNodeFormat("datatype", "select", true, ar);
    fields.push(field1);
    var tree = new HBSTreeDiv();
    //    tree.rootId = 46;
    tree.Json.preButton = true;
    tree.Json.addleInfo = "";
    tree.Json.tableName = "tbdatainfo";
    tree.Json.fields = fields;
    tree.Json.hasMenu = true;
    tree.Json.imageField = 1;
    var treeIcon = new HBSTreeIcon("页面", "/resource/images/common/yemian.gif", "/resource/images/common/yemian.gif", "/resource/images/common/yemian.gif");
    tree.icons.push(treeIcon);
    var treeIcon = new HBSTreeIcon("文件夹", "/resource/images/common/open.bmp", "/resource/images/common/guan.bmp", "/resource/images/common/guan.bmp");
    tree.icons.push(treeIcon);
    var dataStr = '{"id":"1","values":[{"value":"深度科技"},{"value":"organ"},{"value":"asd"}],"isLeaf":"true","order":"35","parentId":"0","children":[]}';
    var json = eval('(' + dataStr + ')');
    tree.Json.data = json;
    json.fields = fields;
    tree.createElement();
    tree.checkNode = function(valuesStr, fieldsStr) {
        var flag = false;
        $.ajax({ url: "/handler/runtimeWeb.ashx", async: false, type: "POST", data: { operateType: "checkDataInfoName", valuesStr: escape(valuesStr), fieldsStr: escape(fieldsStr) },
            success: function(data) {
                if (data == "haveData") {
                    flag = true;
                }
            }
        })
        return flag;
    }
    //    $("#dataTree").append("<input type='checkbox'>全选&nbsp;&nbsp;<input type='checkbox'>反选");
    $("#dataTree").append(tree.element);
    //    $("#flowData").append(tree.element);
    tree.clickNode = function(node, nodeJson) {
        if (currentHtml == "程序功能") {
            var text = $(node).children("a").children("a").text();
            var id = nodeJson.id;
            var name = nodeJson.values[0].value;
            if (nodeJson.values[1].value == "工作流程") {
                $("#setPowerDiv").css("display", "none");
                $("#pageEditDiv").css("display", "block");
                $("#pageFrame").attr("src", "/designFlow.htm?modelId=" + id + "&modelName=" + name);
            }
            else if (nodeJson.values[1].value != "文件夹") {
                $("#setPowerDiv").css("display", "none");
                $("#pageEditDiv").css("display", "block");
                //$("#pageFrame").attr("src", "/admin/admin/pageEdit/editPage.htm?modelId=" + id + "&modelName=" + name);
                editPageFunction(id, name);
                flotGetPageDiv;
                var ss = "";
            }
            else {
                $(node).find(".selectA").removeClass("selectA");
                //                alert("文件夹不能编辑！！");
            }
        }
        else if (currentHtml == "群组织架构") {
            if (nodeJson.values[1].value == "文件夹") {
                $(node).find(".selectA").removeClass("selectA");
                return false;
            }
            $("#setPower").find("input").attr("checked", false);
            var modelCbo = $(node).children("span").children("input")[0];
            if (!modelCbo.checked) {
                alert("指定页面不在当前指定角色权限范围！！");
                $(node).find(".selectA").removeClass("selectA");
                return false;
            }
            var selectedRoles = $("#roleTreeDiv input:checked");
            if (selectedRoles.length == 0) {
                return false;
            }
            if (!confirm("是否进行详细设置")) {
                return false;
            }
            if (selectedRoles.length > 1) {
                if (!confirm("当前指定了多个角色,将统一权限!!")) {
                    return false;
                }
            }
            var roleIdStr = "";
            var roleStr = "";
            for (var i = 0; i < selectedRoles.length; i++) {
                var selectedRoleLi = $(selectedRoles[i]).parent().parent()[0];
                var roleId = $(selectedRoleLi).attr("attrId");
                var roleName = $(selectedRoleLi).children("a").text();
                roleStr = roleStr + roleName + ";";
                roleIdStr = roleIdStr + roleId + ";";
            }
            roleStr = roleStr.substr(0, roleStr.length - 1);
            var modelId = nodeJson.id;
            var modelName = nodeJson.values[0].value;
            var nodeType = nodeJson.values[1].value;
            roleIdStr = roleIdStr.substr(0, roleIdStr.length - 1);
            document.location.href = "/front/detailPower.htm?rowStr=" + roleStr + "&modelId=" + modelId + "&modelName=" + modelName + "&nodelType=" + nodeType + "&roleIdStr=" + roleIdStr;
        }
    }
    tree.addNewNode = function(node, nodeJson) {
        var id = nodeJson.id;
        var nodeName = nodeJson.values[0].value;
        var nodeType = nodeJson.values[1].value;
        $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "addNewFolderOrFile", id: escape(id), nodeName: escape(nodeName), nodeType: escape(nodeType) },
            success: function(data) {
                $("#staffForRoleDiv").html("");
                if (data.IsSuccess) {

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
    tree.addNewChildNodes = function(nodeJson) {
        if (rolePagePowers != null) {
            for (var i = 0; i < nodeJson.children.length; i++) {
                var id = nodeJson.children[i].id;
                var newLi = $("#dataTree li[attrid=" + id + "]");
                var cbo = $(newLi).children("span").children("input")[0];
                if (id == rolePagePowers.pagePower.Id) {
                    if (rolePagePowers.pagePower.Power) {
                        $(cbo).attr("checked", true);
                    }
                }
                else {
                    var power = getPagePower(id, rolePagePowers.pagePower.ChildPages);
                    if (power != null && power.Power) {
                        $(cbo).attr("checked", true);
                    }
                }
            }
        }
    }
    tree.clickPreButton = function(node, nodeJson) {
        var cbo = $(node).children("span").children("input")[0];
        var selectedRoles = $("#roleTreeDiv input:checked");
        if (selectedRoles.length == 0) {
            alert("没有指定进行权限设置的角色！！");
            cbo.checked = false;
            return false;
        }
        var roleIdStr = "";
        var roleStr = "";
        for (var i = 0; i < selectedRoles.length; i++) {
            var selectedRoleLi = $(selectedRoles[i]).parent().parent()[0];
            var roleId = $(selectedRoleLi).attr("attrId");
            var roleName = $(selectedRoleLi).children("a").children("span").text();
            roleStr = roleStr + roleName + ";";
            roleIdStr = roleIdStr + roleId + ";";
        }
        roleStr = roleStr + "等" + selectedRoles.length + "个角色";
        var modelId = nodeJson.id;
        var modelName = nodeJson.values[0].value;
        if (cbo.checked) {
            //            if (confirm("是否将" + modelName + "赋给" + roleStr + "!!")) {
            roleIdStr = roleIdStr.substr(0, roleIdStr.length - 1);
            $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "saveRolePower", roleIdStr: escape(roleIdStr), modelId: escape(modelId) },
                success: function(data) {
                    if (data.IsSuccess) {
                        //                            alert(data.Data);
                    }
                    else {
                        alert(data.Message);
                        $(cbo).prop("checked", null);
                    }
                },
                error: function(xhr, stat, e) {
                    alert(e);
                    $(cbo).prop("checked", null);
                }
            });
            //            } else {
            //                $(cbo).prop("checked", null);
            //            }
        }
        else {
            if (confirm("是否解除" + roleStr + modelName + "的权限")) {
                roleIdStr = roleIdStr.substr(0, roleIdStr.length - 1);
                $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "fireRolePower", roleIdStr: escape(roleIdStr), modelId: escape(modelId) },
                    success: function(data) {
                        if (data.IsSuccess) {
                            //                            alert(data.Data);
                            var ul = $(cbo).parent().parent()[0];
                            var inputs = $(ul).find("input");
                            for (var i = 0; i < inputs.length; i++) {
                                $(inputs[i]).prop("checked", null);
                            }
                            //把ul下的checked改为空
                            //.prop("checked", null)
                        }
                        else {
                            alert(data.Message);
                            $(cbo).prop("checked", "true");
                        }
                    },
                    error: function(xhr, stat, e) {
                        alert(e);
                        $(cbo).prop("checked", "true");
                    }
                });


            } else {
                $(cbo).prop("checked", "true");
            }
        }
    }
    function createStaffForRole(roleId) {
        $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getStaffsForRole", roleId: escape(roleId) },
            success: function(data) {
                $("#staffForRoleDiv").html("");
                if (data.IsSuccess) {
                    var staffs = data.Data;
                    var ul = document.createElement("ul");
                    $(ul).css("margin-left", "0px");
                    for (var i = 0; i < staffs.length; i++) {
                        var li = document.createElement("li");
                        $(li).css("home-style-type", "none");
                        $(li).css("margin-left", "15px");
                        $(li).attr("staffId", staffs[i].Id);
                        $(li).attr("name", staffs[i].Name);
                        $(li).attr("organId", staffs[i].OrganId);
                        $(li).attr("organName", staffs[i].OrganName);
                        $(li).attr("roleId", staffs[i].RoleId);
                        $(li).attr("roleName", staffs[i].RoleName);
                        $(li).attr("userId", staffs[i].UserId);
                        $(li).attr("zhanghao", staffs[i].Zhanghao);
                        $(li).html("<input style='display:none;' type='checkbox' id='" + staffs[i].Id + "Cbo' /><span>账号:" + staffs[i].Zhanghao + " 名称:" + staffs[i].Name + "</span>");
                        $(ul).append(li);
                        $(li).children("span").bind("click", function() {
                            if ($(this).hasClass("selectA")) {
                                $(this).removeClass("selectA");
                            }
                            else {
                                $(ul).find("span").removeClass("selectA");
                                $(this).addClass("selectA");
                            }
                        });
                    }
                    $("#staffForRoleDiv").append(ul);

                }
                else {
                    $("#staffForRoleDiv").append("<span style='margin-left:20px;'>" + data.Message + "</span>");
                }
            },
            error: function(xhr, stat, e) {
                $("#staffForRoleDiv").html("");
                alert(e);
            }
        });
    }
    $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getOnlineRoleId" },
        success: function(data) {
            if (data.IsSuccess) {
                var roleTree = new HBSTreeDiv();
                roleTree.Json.openIcon = "/resource/images/common/open.bmp";
                roleTree.Json.closeIcon = "/resource/images/common/guan.bmp";
                roleTree.Json.leafIcon = "/resource/images/common/yemian.gif";
                roleTree.Json.rootId = data.Data;
                var dataStr = '{"id":"1","values":[{"value":"深度科技"},{"value":"organ"},{"value":"asd"}],"isLeaf":"true","order":"35","parentId":"0","children":[]}';
                var json = eval('(' + dataStr + ')');
                json.fields = fields;
                roleTree.Json.hasMenu = true;
                roleTree.Json.preButton = false;
                var fields = [];
                var field0 = new HBSNodeFormat("部门", "text", false, ar);
                fields.push(field0);
                var field1 = new HBSNodeFormat("角色", "text", false, ar);
                fields.push(field1);
                roleTree.Json.fields = fields;
                roleTree.Json.tableName = "tbdepartmentandrole";
                roleTree.createRootNode();
                $(roleTree.element).css("margin-left", "-15px");
                $("#roleTree").append(roleTree.element);
                roleTree.secondClickNode = function(node, nodeJson) {
                    $("#staffForRoleDiv").html("");
                }
                roleTree.clickNode = function(node, nodeJson) {
                    //                    var roleId = nodeJson.id;
                    //                    createStaffForRole(roleId);
                    $("#roleTreeDiv").find(".selectA").removeClass("selectA");
                }
                roleTree.clickPreButton = function(nodeDom, nodeJson) {
                    //在右侧显示角色里的所有用户
                    $("#setPower").find("input").prop("checked", false);
                    var cbo = $(nodeDom).children("span").children("input")[0];
                    var roleId = nodeJson.id;
                    if (cbo.checked) {
                        //                        $("#roleTreeDiv").find("span").removeClass("selectA");
                        //                        $(cbo).parent().parent().children("a").children("span").addClass("selectA");
                        createStaffForRole(roleId);
                    }
                    //在左侧勾选角色里的所有的文件权限
                    $("#dataTree input:checked").attr("checked", false);
                    var selectedRoles = $("#roleTreeDiv input:checked");
                    var roleIdStr = "";
                    for (var i = 0; i < selectedRoles.length; i++) {
                        var id = $(selectedRoles[i]).parent().parent().attr("attrid");
                        roleIdStr = roleIdStr + id + ";";
                    }
                    roleIdStr = roleIdStr.substr(0, roleIdStr.length - 1);
                    if (roleIdStr == "") {
                        return false;
                    }
                    $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getModelPowersForRole", roleIdStr: escape(roleIdStr) },
                        success: function(data) {
                            if (data.IsSuccess) {
                                rolePagePowers = data.Data;
                                var pagePowers = rolePagePowers.pagePower;
                                var pageCbos = $("#dataTree").find("input");
                                $(pageCbos).attr("checked", false);
                                for (var i = 0; i < pageCbos.length; i++) {
                                    var pageId = $(pageCbos[i]).parent().parent().attr("attrId");
                                    if (pageId == pagePowers.Id) {
                                        if (pagePowers.Power) {
                                            $(pageCbos[i]).prop("checked", "true");
                                        }
                                    }
                                    else {
                                        var power = getPagePower(pageId, pagePowers.ChildPages);
                                        if (power != null && power.Power) {
                                            $(pageCbos[i]).prop("checked", "true");
                                        }
                                    }
                                }
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
            }
            else {
                alert(data.Message);
            }
        },
        error: function(xhr, stat, e) {
            alert(e);
        }
    });
    function getPagePower(pageId, pagePowers) {
        var power = null;
        for (var i = 0; i < pagePowers.length; i++) {
            if (power == null) {
                if (pagePowers[i].Id == pageId) {
                    power = pagePowers[i];
                }
                else {
                    if (pagePowers[i].ChildPages.length > 0) {
                        power = getPagePower(pageId, pagePowers[i].ChildPages);
                    }
                }
            }
        }
        return power;
    }
    $("#setPower").find("input").bind("click", function() {
        var id = $(this).attr("id");
        if (this.checked) {
            if (id == "EditPage") {
                detailPowerForPageByRole.pageEdit = true;
            }
            else if (id == "AddRecord") {
                detailPowerForPageByRole.addRecord.Flag = true;
            }
            else if (id == "DeleteRecord") {
                detailPowerForPageByRole.delRecord.Flag = true;
            }
            else if (id == "UpdateRecord") {
                detailPowerForPageByRole.updateRecord.Flag = true;
            }
            else if (id == "SearchRecord") {
                detailPowerForPageByRole.searchRecord.Flag = true;
            }
        }
        else {
            if (id == "EditPage") {
                detailPowerForPageByRole.pageEdit = false;
            }
            else if (id == "AddRecord") {
                detailPowerForPageByRole.addRecord.Flag = false;
            }
            else if (id == "DeleteRecord") {
                detailPowerForPageByRole.delRecord.Flag = false;
            }
            else if (id == "UpdateRecord") {
                detailPowerForPageByRole.updateRecord.Flag = false;
            }
            else if (id == "SearchRecord") {
                detailPowerForPageByRole.searchRecord.Flag = false;
            }
        }
    });
    $("#setPower").find("label").bind("click", function() {

    });
    function createStaffsTree(staffDiv, staffs) {
        var ul = document.createElement("ul");
        $(ul).css("margin-left", "0px");
        for (var i = 0; i < staffs.length; i++) {
            (function() {
                var li = document.createElement("li");
                $(li).css("home-style-type", "none");
                $(li).css("margin-left", "15px");
                $(li).attr("staffId", staffs[i].Id);
                $(li).attr("name", staffs[i].Name);
                $(li).attr("organName", staffs[i].OrganName);
                $(li).attr("roleId", staffs[i].RoleId);
                $(li).attr("roleName", staffs[i].RoleName);
                $(li).attr("userId", staffs[i].UserId);
                $(li).attr("zhanghao", staffs[i].Zhanghao);
                $(li).children("span").bind("mouseover", function() {
                    $(this).css("font-size", "18px");
                    $(this).css("font-weight", "bolder");
                });
                $(li).children("span").bind("moveout", function() {
                    $(this).css("font-size", "12px");
                    $(this).css("font-weight", "normal");
                });
                $(li).html("<input style='display:none;' type='checkbox' id='" + staffs[i].Id + "Cbo' /><span>账号:" + staffs[i].Zhanghao + " 名称:" + staffs[i].Name + "</span>");
                $(ul).append(li);
                $(li).children("span").bind("click", function() {
                    if ($(this).hasClass("selectA")) {
                        $(this).removeClass("selectA");
                    }
                    else {
                        $(ul).find("span").removeClass("selectA");
                        $(this).addClass("selectA");
                    }
                });
            })()
        }
        $(staffDiv).append(ul);
    }

    $("#canvas").html("");
    $("#canvas").droppable({
        drop: function(event, ui) {
            var ss = ui.helper.context;
            if (ss.tagName == "A") {
                var controlType = $(ss).attr("name");
                switch (controlType) {
                    case "modelControl":
                        {
                            try {
                                flotGetPageDiv.Json.modelControls;
                            } catch (e) {
                                alert("当前没有选择页面！");
                                return;
                            }
                            var flag = checkControlName("modelcontrol0", false);
                            if (flag) {
                                alert("已经存在名称为modelcontrol0的控件！！");
                                return false;
                            }
                            var modelControlDiv = new HBSJsModelControlDiv();
                            modelControlDiv.createElement($(ss).attr("id"));
                            modelControlDiv.pageDiv = flotGetPageDiv;
                            flotGetPageDiv.addControl(modelControlDiv);
                            flotGetPageDiv.Json.modelControls.push(modelControlDiv.Json);
                            break;
                        }

                }
            } else {
                $(ss).css("left", "")
                $(ss).css("top", "")
                $(this).append(ss);
            }

        },
        out: function(event, ui) {

        }
    });
    $("#previewBt").bind("click", function() {
        $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getPageDir", modelId: escape(flotGetPageDiv.Json.pageId) },
            success: function(data) {
                if (data.IsSuccess) {
                    var pageDir = data.Data;
                    window.open("/" + pageDir + "/html4.htm");
                }
                else {
                    alert(data.Message);
                }
            },
            error: function(e) {
                alert(e.status);
            }
        });
    });
    $("#saveBt").bind("click", function() {
        $.ajax({ url: "/handler/runtimeWeb.ashx", type: "POST", data: { operatetype: "getTableByDataview", tableName: escape(flotGetPageDiv.Json.name) },
            success: function(data) {
                var list = eval(data);
                if (list.length > 0) {
                    var grl = confirm("该页面有数据视图，保存该页面将删除其相关联的数据视图！！是否保存？？");
                    if (grl) {
                        $.ajax({ url: "/handler/runtimeWeb.ashx", type: "POST", data: { operatetype: "deleteDataview", list: escape(list) },
                            success: function(data) {
                                if (data == 1) {
                                    var divControls = [];
                                    for (var i = 0; i < flotGetPageDiv.Json.modelControls.length; i++) {
                                        var modelChildControls = flotGetPageDiv.Json.modelControls[i].ModelChildControls;
                                        for (var j = 1; j < modelChildControls.length; j += 2) {
                                            divControls.push(modelChildControls[j]);
                                        }
                                    }
                                    var allName = getAllControls(flotGetPageDiv);
                                    var temp = [];
                                    var temparray = [];
                                    for (var i = 0; i < divControls.length; i++) {
                                        temp[divControls[i]] = true;
                                    }
                                    for (var i = 0; i < allName.length; i++) {
                                        if (!temp[allName[i]]) {
                                            temparray.push(allName[i]);
                                        }
                                    }
                                    if (temparray.length > 0) {
                                        var strs = "";
                                        for (var i = 0; i < temparray.length; i++) {
                                            strs = strs + " " + temparray[i] + "控件 "
                                        }
                                        var gnl = confirm("还有" + strs + "没有放入模版排版控件!是否强制删除" + strs + "?");
                                        if (gnl) {
                                            for (var i = 0; i < temparray.length; i++) {
                                                $("#" + temparray[i]).remove();
                                            }
                                            deleteChildControls(temparray, flotGetPageDiv);
                                        } else {
                                            return;
                                        }
                                    }
                                    var pageStr = JSON.stringify(flotGetPageDiv.Json);
                                    $.ajax({ url: "/handler/runtimeWeb.ashx", type: "POST", dataType: "json", data: { operatetype: "saveDesignPage", pageStr: escape(pageStr) },
                                        success: function(data) {
                                            if (data.IsSuccess) {
                                                alert(data.Data);
                                            }
                                            else {
                                                alert(data.Message);
                                            }
                                        },
                                        error: function(e) {
                                            alert(e.status);
                                        }
                                    });
                                } else if (data == 0) {
                                    alert("数据视图删除失败，保存失败!!!退出保存!!!");
                                }
                            }, error: function(e) {
                                alert(e.status);
                            }
                        });
                    }
                }
                else {
                    var divControls = [];
                    for (var i = 0; i < flotGetPageDiv.Json.modelControls.length; i++) {
                        var modelChildControls = flotGetPageDiv.Json.modelControls[i].ModelChildControls;
                        for (var j = 1; j < modelChildControls.length; j += 2) {
                            divControls.push(modelChildControls[j]);
                        }
                    }
                    var allName = getAllControls(flotGetPageDiv);
                    var temp = [];
                    var temparray = [];
                    for (var i = 0; i < divControls.length; i++) {
                        temp[divControls[i]] = true;
                    }
                    for (var i = 0; i < allName.length; i++) {
                        if (!temp[allName[i]]) {
                            temparray.push(allName[i]);
                        }
                    }
                    if (temparray.length > 0) {
                        var strs = "";
                        for (var i = 0; i < temparray.length; i++) {
                            strs = strs + " " + temparray[i] + "控件 "
                        }
                        var gnl = confirm("还有" + strs + "没有放入模版排版控件!是否强制删除" + strs + "?");
                        if (gnl) {
                            for (var i = 0; i < temparray.length; i++) {
                                $("#" + temparray[i]).remove();
                            }
                            deleteChildControls(temparray, flotGetPageDiv);
                        } else {
                            return;
                        }
                    }
                    var pageStr = JSON.stringify(flotGetPageDiv.Json);
                    $.ajax({ url: "/handler/runtimeWeb.ashx", type: "POST", dataType: "json", data: { operatetype: "saveDesignPage", pageStr: escape(pageStr) },
                        success: function(data) {
                            if (data.IsSuccess) {
                                alert(data.Data);
                            }
                            else {
                                alert(data.Message);
                            }
                        },
                        error: function(e) {
                            alert(e.status);
                        }
                    });
                }
            },
            error: function(e) {
                alert(e.status);
            }
        });

    });
    $("#boxDiv a").draggable({ revert: true, helper: "clone" });
    //    $("#boxDiv a").bind("click", function() {
    //        var controlType = $(this).attr("id");
    //        switch (controlType) {
    //            case "label":
    //                {

    //                    var flag = checkControlName("label0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为label0的控件！！");
    //                        return false;
    //                    }
    //                    var labelDiv = new HBSJsLabelDiv();
    //                    labelDiv.createElement();
    //                    labelDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(labelDiv);
    //                    flotGetPageDiv.Json.labels.push(labelDiv.Json);
    //                    $("#canvas").append(labelDiv.element);
    //                    break;
    //                }
    //            case "text":
    //                {
    //                    var flag = checkControlName("textbox0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为textbox0的控件！！");
    //                        return false;
    //                    }
    //                    var textboxDiv = new HBSJsTextboxDiv();
    //                    textboxDiv.createElement();
    //                    textboxDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(textboxDiv);
    //                    flotGetPageDiv.Json.texts.push(textboxDiv.Json);
    //                    $("#canvas").append(textboxDiv.element);
    //                    break;
    //                }
    //            case "select":
    //                {
    //                    var flag = checkControlName("select0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为select0的控件！！");
    //                        return false;
    //                    }
    //                    var selectDiv = new HBSJsSelectDiv();
    //                    selectDiv.createElement();
    //                    selectDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(selectDiv);
    //                    flotGetPageDiv.Json.selects.push(selectDiv.Json);
    //                    $("#canvas").append(selectDiv.element);
    //                    break;
    //                }
    //            case "date":
    //                {
    //                    var flag = checkControlName("date0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为date0的控件！！");
    //                        return false;
    //                    }
    //                    var dateDiv = new HBSJsDateDiv();
    //                    dateDiv.createElement();
    //                    dateDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(dateDiv);
    //                    flotGetPageDiv.Json.dates.push(dateDiv.Json);
    //                    $("#canvas").append(dateDiv.element);
    //                    break;
    //                }
    //            case "image":
    //                {
    //                    var flag = checkControlName("image0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为image0的控件！！");
    //                        return false;
    //                    }
    //                    var imageDiv = new HBSJsImageDiv();
    //                    imageDiv.createElement();
    //                    imageDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(imageDiv);
    //                    flotGetPageDiv.Json.images.push(imageDiv.Json);
    //                    $("#canvas").append(imageDiv.element);
    //                    break;
    //                }
    //            case "checkbox":
    //                {
    //                    var flag = checkControlName("checkbox0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为checkbox0的控件！！");
    //                        return false;
    //                    }
    //                    var checkboxDiv = new HBSJsCheckboxDiv();
    //                    checkboxDiv.createElement();
    //                    checkboxDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(checkboxDiv);
    //                    flotGetPageDiv.Json.checkboxs.push(checkboxDiv.Json);
    //                    $("#canvas").append(checkboxDiv.element);
    //                    break;
    //                }
    //            case "radio":
    //                {
    //                    var flag = checkControlName("radio0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为radio0的控件！！");
    //                        return false;
    //                    }
    //                    var radioDiv = new HBSJsRadioDiv();
    //                    radioDiv.createElement();
    //                    radioDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(radioDiv);
    //                    flotGetPageDiv.Json.radios.push(radioDiv.Json);
    //                    $("#canvas").append(radioDiv.element);
    //                    break;
    //                }
    //            case "listTable":
    //                {
    //                    var flag = checkControlName("listtable0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为listtable0的控件！！");
    //                        return false;
    //                    }
    //                    var listTableDiv = new HBSJsListTableDiv();
    //                    listTableDiv.createElement();
    //                    listTableDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(listTableDiv);
    //                    flotGetPageDiv.Json.listTables.push(listTableDiv.Json);
    //                    $("#canvas").append(listTableDiv.element);
    //                    break;
    //                }
    //            case "apeakTree":
    //                {
    //                    var flag = checkControlName("apeakTree0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为apeakTree0的控件！！");
    //                        return false;
    //                    }
    //                    var apeakTreeDiv = new HBSJsApeakTreeDiv();
    //                    apeakTreeDiv.createElement();
    //                    apeakTreeDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(apeakTreeDiv);
    //                    flotGetPageDiv.Json.apeakTrees.push(apeakTreeDiv.Json);
    //                    $("#canvas").append(apeakTreeDiv.element);
    //                    break;
    //                }
    //            case "planeTree":
    //                {
    //                    var flag = checkControlName("planeTree0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为planeTree0的控件！！");
    //                        return false;
    //                    }
    //                    var planeTreeDiv = new HBSJsPlaneTreeDiv();
    //                    planeTreeDiv.createElement();
    //                    planeTreeDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(planeTreeDiv);
    //                    flotGetPageDiv.Json.planeTrees.push(planeTreeDiv.Json);
    //                    $("#canvas").append(planeTreeDiv.element);
    //                    break;
    //                }
    //            case "From":
    //                {
    //                    var flag = checkControlName("from0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为from0的控件！！");
    //                        return false;
    //                    }
    //                    var FromDiv = new HBSJsFromDiv();
    //                    FromDiv.createElement();
    //                    FromDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(FromDiv);
    //                    flotGetPageDiv.Json.froms.push(FromDiv.Json);
    //                    $("#canvas").append(FromDiv.element);
    //                    break;
    //                }
    //            case "Flot":
    //                {
    //                    var flag = checkControlName("flot0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为flot0的控件！！");
    //                        return false;
    //                    }
    //                    var FlotDiv = new HBSJsFlotDiv();
    //                    FlotDiv.createElement();
    //                    FlotDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(FlotDiv);
    //                    flotGetPageDiv.Json.flots.push(FlotDiv.Json);
    //                    $("#canvas").append(FlotDiv.element);
    //                    break;
    //                }

    //            case "iframe":
    //                {
    //                    var flag = checkControlName("iframe0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为iframe0的控件！！");
    //                        return false;
    //                    }
    //                    var iframeDiv = new HBSJsIframeDiv();
    //                    iframeDiv.createElement();
    //                    iframeDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(iframeDiv);
    //                    flotGetPageDiv.Json.iframes.push(iframeDiv.Json);
    //                    $("#canvas").append(iframeDiv.element);
    //                    break;
    //                }
    //            case "reply":
    //                {
    //                    var flag = checkControlName("reply0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为reply0的控件！！");
    //                        return false;
    //                    }
    //                    var replyDiv = new HBSJsReplyDiv();
    //                    replyDiv.createElement();
    //                    replyDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(replyDiv);
    //                    flotGetPageDiv.Json.replys.push(replyDiv.Json);
    //                    $("#canvas").append(replyDiv.element);
    //                    break;
    //                }
    //            case "orderNo":
    //                {
    //                    var flag = checkControlName("orderNo0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为orderNo0的控件！！");
    //                        return false;
    //                    }
    //                    var orderNoDiv = new HBSJsOrderNoDiv();
    //                    orderNoDiv.createElement();
    //                    orderNoDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(orderNoDiv);
    //                    flotGetPageDiv.Json.orderNos.push(orderNoDiv.Json);
    //                    $("#canvas").append(orderNoDiv.element);
    //                    break;
    //                }
    //            case "money":
    //                {
    //                    var flag = checkControlName("money0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为money0的控件！！");
    //                        return false;
    //                    }
    //                    var moneyDiv = new HBSJsMoneyDiv();
    //                    moneyDiv.createElement();
    //                    moneyDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(moneyDiv);
    //                    flotGetPageDiv.Json.moneys.push(moneyDiv.Json);
    //                    $("#canvas").append(moneyDiv.element);
    //                    break;
    //                }
    //            case "modelControl":
    //                {
    //                    var flag = checkControlName("modelcontrol0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为modelcontrol0的控件！！");
    //                        return false;
    //                    }
    //                    var modelControlDiv = new HBSJsModelControlDiv();
    //                    modelControlDiv.createElement();
    //                    modelControlDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(modelControlDiv);
    //                    flotGetPageDiv.Json.modelControls.push(modelControlDiv.Json);

    //                    break;
    //                }
    //            case "tree":
    //                {
    //                    var flag = checkControlName("tree0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为tree0的控件！！");
    //                        return false;
    //                    }
    //                    var treeDiv = new HBSJsTreeDiv();
    //                    treeDiv.createElement();
    //                    treeDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(treeDiv);
    //                    flotGetPageDiv.Json.trees.push(treeDiv.Json);
    //                    $("#canvas").append(treeDiv.element);
    //                    break;
    //                }
    //            case "fileListing":
    //                {
    //                    var flag = checkControlName("filelisting0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为filelisting0的控件！！");
    //                        return false;
    //                    }
    //                    var fileListingDiv = new HBSJsFileListingDiv();
    //                    fileListingDiv.createElement();
    //                    fileListingDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(fileListingDiv);
    //                    flotGetPageDiv.Json.fileListings.push(fileListingDiv.Json);
    //                    $("#canvas").append(fileListingDiv.element);
    //                    break;
    //                }
    //            case "uploadFile":
    //                {
    //                    var flag = checkControlName("uploadfile0", false);
    //                    if (flag) {
    //                        alert("已经存在名称为uploadfile0的控件！！");
    //                        return false;
    //                    }
    //                    var uploadFileDiv = new HBSJsUploadFileDiv();
    //                    uploadFileDiv.createElement();
    //                    uploadFileDiv.pageDiv = flotGetPageDiv;
    //                    flotGetPageDiv.addControl(uploadFileDiv);
    //                    flotGetPageDiv.Json.uploadFiles.push(uploadFileDiv.Json);
    //                    $("#canvas").append(uploadFileDiv.element);
    //                }
    //        }
    //    });
    function createPopPropertyDiv(event) {
        var src = event.target;
        var l = $(src).offset().left + "px";
        var t = $(src).offset().top + 20 + "px";
        var w = 150;
        var h = 80;
        var popDiv = new GHKPopDiv(l, t, w, h, 'popDiv');
        var buttonSpan = document.createElement("span");
        $(buttonSpan).css("width", "100%");
        $(buttonSpan).css("height", "25px");
        $(buttonSpan).html("<a style='font-size:12px;margin-left:85px;' href='#'>关闭</a>");
        $(buttonSpan.childNodes[0]).bind("click", function() {
            $(popDiv.element).remove();
        });
        $(popDiv.element).append(buttonSpan);
        return popDiv;
    }
    var HBSUlData = function() {
        this.propertyType = "css";
        this.propertyName = "FontSize";
        this.liAry = [];
    }
    var HBSLiData = function(id, text) {
        this.id = id;
        this.text = text;
    }
    function createPopUl(ulData, popDiv) {
        var ul = document.createElement("ul");
        ul.style.margin = 0;
        popDiv.element.appendChild(ul);
        var propertyType = ulData.propertyType;
        var propertyName = ulData.propertyName;
        var liAry = ulData.liAry;
        $(popDiv.element).css("height", 25 * (liAry.length + 1) + "px");
        for (var i = 0; i < liAry.length; i++) {
            (function() {
                var id = liAry[i].id;
                var name = liAry[i].text;
                var li = document.createElement("li");
                li.style.margin = 0;
                $(li).html("<span style='width:100%;font-size:12px;'><input id='" + id + "' type=radio name='" + propertyName + "Rdo' />" + name + "</span><br/>");
                li.style.margin = 0;
                ul.appendChild(li);
                $(li).find("input").bind("click", function(event) {
                    var val = $('input:radio[name="' + propertyName + 'Rdo"]:checked').attr("id");
                    if (val == "") {
                        return false;
                    }
                    var src = event.target;
                    var text = $(src).parent().text();
                    $("#" + propertyName + "Input").val(text);
                    var str = "";
                    if (propertyType == "css") {
                        str = 'flotGetPageDiv.currentControl.Json.cssProperties.' + propertyName + ' = val';
                    }
                    else if (propertyType == "base") {
                        str = 'flotGetPageDiv.currentControl.Json.baseProperties.' + propertyName + ' = val';
                    }
                    else {
                        str = 'flotGetPageDiv.currentControl.Json.' + propertyName + ' = val';
                    }
                    eval(str);
                    if (propertyType == "css") {
                        str = 'flotGetPageDiv.currentControl.change' + propertyName + '()';
                        eval(str);
                    }
                    $(popDiv.element).remove();
                });
            })()
        }
    }
    $(".readonlyClass").bind("click", function(event) {
        var select = $("input[name='readonlyRdo']:checked")[0];
        if (select.id == "readonly") {
            flotGetPageDiv.currentControl.Json.baseProperties.IsReadonly = true;
        }
        else {
            flotGetPageDiv.currentControl.Json.baseProperties.IsReadonly = false;
        }
    });
    $(".disabledClass").bind("click", function(event) {
        var select = $("input[name='disabledRdo']:checked")[0];
        if (select.id == "disabled") {
            flotGetPageDiv.currentControl.Json.baseProperties.disabled = true;
        }
        else {
            flotGetPageDiv.currentControl.Json.baseProperties.disabled = false;
        }
    });
    $(".isFieldClass").bind("click", function(event) {
        var select = $("input[name='isFieldRdo']:checked")[0];
        if (select.id == "isField") {
            flotGetPageDiv.currentControl.Json.baseProperties.isField = true;
        }
        else {
            flotGetPageDiv.currentControl.Json.baseProperties.isField = false;
        }
    });
    $(".blockDisplay").bind("click", function(event) {
        var select = $("input[name='displayRdo']:checked")[0];
        if (select.id == "blockDisplay") {
            flotGetPageDiv.currentControl.Json.cssProperties.Display = true;
        }
        else {
            flotGetPageDiv.currentControl.Json.cssProperties.Display = false;
        }
    });
    $("#FontSizeInput").bind("click", function(event) {
        var popDiv = createPopPropertyDiv(event);
        var ulData = new HBSUlData();
        ulData.propertyName = "FontSize";
        ulData.propertyType = "css";
        var l1 = new HBSLiData('16px', '适中');
        ulData.liAry.push(l1);
        var l2 = new HBSLiData('20px', '粗');
        ulData.liAry.push(l2);
        var l3 = new HBSLiData('28px', '较粗');
        ulData.liAry.push(l3);
        var l4 = new HBSLiData('12px', '小的');
        ulData.liAry.push(l4);
        var l5 = new HBSLiData('9px', '较细的');
        ulData.liAry.push(l5);
        createPopUl(ulData, popDiv);
    });
    $("#FontWeightInput").bind("click", function(event) {
        var popDiv = createPopPropertyDiv(event);
        var ulData = new HBSUlData();
        ulData.propertyName = "FontWeight";
        ulData.propertyType = "css";
        var l1 = new HBSLiData('normal', '适中');
        ulData.liAry.push(l1);
        var l2 = new HBSLiData('bold', '粗');
        ulData.liAry.push(l2);
        var l3 = new HBSLiData('bolder', '较粗');
        ulData.liAry.push(l3);
        var l4 = new HBSLiData('lighter', '小的');
        ulData.liAry.push(l4);
        createPopUl(ulData, popDiv);
    });
    $("#textAlignInput").bind("click", function(event) {
        var popDiv = createPopPropertyDiv(event);
        var ulData = new HBSUlData();
        ulData.propertyName = "TextAlign";
        ulData.propertyType = "css";
        var l1 = new HBSLiData('center', '居中');
        ulData.liAry.push(l1);
        var l2 = new HBSLiData('left', '靠左');
        ulData.liAry.push(l2);
        var l3 = new HBSLiData('right', '靠右');
        ulData.liAry.push(l3);
        createPopUl(ulData, popDiv);
    });
    $("#colorInput").colpick({
        layout: 'hex',
        submit: 1,
        colorScheme: 'dark',
        onChange: function(hsb, hex, rgb, el, bySetColor) {
            flotGetPageDiv.currentControl.Json.cssProperties.Color = hex;
            $("#colorInput").val(hex);
            flotGetPageDiv.currentControl.changeColor();
        },
        onSubmit: function(hsb, hex, rgb, el) {
            $(el).colpickHide();
        }
    });
    $("#backgroundColorInput").colpick({
        layout: 'hex',
        submit: 1,
        colorScheme: 'dark',
        onChange: function(hsb, hex, rgb, el, bySetColor) {
            flotGetPageDiv.currentControl.Json.cssProperties.BackgroundColor = hex;
            $("#backgroundColorInput").val(hex);
            flotGetPageDiv.currentControl.changeBackgroundColor();
        },
        onSubmit: function(hsb, hex, rgb, el) {
            $(el).colpickHide();
        }
    });
    $("#widthInput").bind("change", function(event) {
        var value = $(this).val();
        if (!checkInteger(value)) {
            alert("宽度必须为整数!!");
            $(this).val(flotGetPageDiv.currentControl.Json.cssProperties.Width);
            return;
        }
        flotGetPageDiv.currentControl.Json.cssProperties.Width = value;
        flotGetPageDiv.currentControl.changeWidth();
    });
    $("#heightInput").bind("click", function(event) {
        var value = $(this.value);
        if (!checkInteger(value)) {
            alert("高度必须为整数!!");
            $(this).val(flotGetPageDiv.currentControl.Json.cssProperties.Height);
            return;
        }
        flotGetPageDiv.currentControl.Json.cssProperties.Height = value;
        flotGetPageDiv.currentControl.changeHeight();
    });
    //禁止名称带有下划线、禁止名称带有.。
    $("#nameInput").bind("change", function(event) {
        var name = $(this).val();
        var index = name.indexOf('_');
        if (index >= 0) {
            alert("禁止名称带有下划线！！");
            $("#nameInput").val(flotGetPageDiv.currentControl.Json.name);
            return false;
        }
        index = name.indexOf('.');
        if (index >= 0) {
            alert("禁止名称带有.！！");
            $("#nameInput").val(flotGetPageDiv.currentControl.Json.name);
            return false;
        }
        index = name.indexOf(' ');
        if (index >= 0) {
            alert("禁止名称带有空格！！");
            $("#nameInput").val(flotGetPageDiv.currentControl.Json.name);
            return false;
        }
        if (/[A-Z]/.test(name)) {
            alert("禁止名称带有大写字母！！");
            $("#nameInput").val(flotGetPageDiv.currentControl.Json.name);
            return false;
        } else {

        }
        var flag = checkControlName(name, false);
        if (flag) {
            alert("已经存在名称为" + name + "的控件！！");
            $("#nameInput").val(flotGetPageDiv.currentControl.Json.name);
            return false;
        }

        flotGetPageDiv.currentControl.Json.name = name;
        flotGetPageDiv.currentControl.changeName();
    });



    $("#liTextInput").bind("change", function(event) {
        var liText = $(this).val();
        flotGetPageDiv.currentControl.changeLiText(liText);
    });
    $("#linkEmbedInput").bind("change", function(event) {
        var linkEmbed = $(this).val();
        flotGetPageDiv.currentControl.changelinkEmbed(linkEmbed);
    });

    $("#liHrefInput").bind("change", function(event) {
        var liHref = $(this).val();
        flotGetPageDiv.currentControl.changeliHref(liHref);
    });
    $("#dataTypeInput").bind("click", function(event) {
        var popDiv = createPopPropertyDiv(event);
        var ulData = new HBSUlData();
        ulData.propertyName = "dataType";
        ulData.propertyType = "base";
        var l1 = new HBSLiData('nvarchar', '字符串');
        ulData.liAry.push(l1);
        var l2 = new HBSLiData('int', '整数');
        ulData.liAry.push(l2);
        var l3 = new HBSLiData('decimal', '小数');
        ulData.liAry.push(l3);
        var l4 = new HBSLiData('date', '日期');
        ulData.liAry.push(l4);
        var l5 = new HBSLiData('bool', '布尔值');
        ulData.liAry.push(l5);
        createPopUl(ulData, popDiv);
    });
    $("#dateFormatInput").bind("click", function(event) {
        var popDiv = createPopPropertyDiv(event);
        var ulData = new HBSUlData();
        ulData.propertyName = "dateFormat";
        ulData.propertyType = "";
        var l1 = new HBSLiData('date', '日期');
        ulData.liAry.push(l1);
        var l2 = new HBSLiData('dateh', '日时');
        ulData.liAry.push(l2);
        var l3 = new HBSLiData('datehm', '日时分');
        ulData.liAry.push(l3);
        createPopUl(ulData, popDiv);
    });

    $("#controlTypeInput").bind("click", function(event) {
        var popDiv = createPopPropertyDiv(event);
        var ulData = new HBSUlData();
        ulData.propertyName = "controlType";
        ulData.propertyType = "";
        var l1 = new HBSLiData('页面', '页面');
        ulData.liAry.push(l1);
        var l2 = new HBSLiData('浏览页面', '浏览页面');
        ulData.liAry.push(l2);
        createPopUl(ulData, popDiv);
    });
    $("#dataLengthInput").bind("change", function(event) {
        var value = $(this.value);
        if (!checkInteger(value)) {
            alert("数据长度必须为整数!!");
            $(this).val(flotGetPageDiv.currentControl.Json.baseProperties.dataLength);
            return;
        }
        flotGetPageDiv.currentControl.Json.baseProperties.dataLength = value;
    });
    $("#valueFieldInput").bind("click", function(event) {
        getDataviewOutputs(event, "valueField");
    });
    $("#textFieldInput").bind("click", function(event) {
        getDataviewOutputs(event, "textField");
    });
    $("#importViewFieldInput").bind("click", function(event) {
        getDataviewOutputs(event, "importViewField");
    });
    function getDataviewOutputs(event, propertyName) {
        var dvJson = null;
        var dvId = -1;
        if (flotGetPageDiv.currentControl.Json.controlType == "listTableColumn") {
            dvJson = flotGetPageDiv.currentControl.tableDiv.dvJson;
            if (dvJson == null) {
                dvId = flotGetPageDiv.currentControl.tableDiv.Json.baseProperties.datasource.id;
            }
        }
        else {
            dvJson = flotGetPageDiv.currentControl.dvJson;
            if (dvJson == null) {
                dvId = flotGetPageDiv.currentControl.Json.baseProperties.datasource.id;
            }
        }
        if (dvJson == null) {
            if (dvId <= 0) {
                alert("还没有设定引用句的视图，请先设置视图！！");
                return false;
            }
            $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getDataviewById", dvId: escape(dvId) },
                success: function(data) {
                    if (data.IsSuccess) {
                        dvJson = data.Data;
                        createDvOutputsSelect(dvJson, event, propertyName);
                    }
                    else {
                        alert(data.Message);
                    }
                }
            });
        }
        else {
            createDvOutputsSelect(dvJson, event, propertyName);
        }
    }
    function createDvOutputsSelect(dvJson, event, propertyName) {
        var popDiv = createPopPropertyDiv(event);
        var ulData = new HBSUlData();
        ulData.propertyName = propertyName;
        if (propertyName == "importViewField") {
            ulData.propertyType = "";
        }
        else {
            ulData.propertyType = "base";
        }
        for (var i = 0; i < dvJson.tables.length; i++) {
            var table = dvJson.tables[i];
            for (var k = 0; k < table.Fields.length; k++) {
                var field = table.Fields[k];
                if (field.IsOutput) {
                    var name = field.Name;
                    var l = new HBSLiData(name, name);
                    ulData.liAry.push(l);
                }
            }
        }
        createPopUl(ulData, popDiv);
    }
    $("#groupInput").bind("change", function(event) {
        var name = $(this).val();
        var flag = checkControlName(name, true);
        if (flag) {
            alert("已经存在名称为" + name + "的字段控件！！");
            return;
        }
        flotGetPageDiv.currentControl.Json.group = name;
    });
    $(".getOptionType").bind("click", function() {
        var select = $("input[name='getOptionRdo']:checked")[0];
        if (select.id == "static") {
            flotGetPageDiv.currentControl.Json.getOptionType = true;
        }
        else {
            flotGetPageDiv.currentControl.Json.getOptionType = false;
        }
    });
    $("#optionInput").bind("click", function(event) {
        if (!flotGetPageDiv.currentControl.Json.getOptionType) {
            alert("静态获取选项才从这里设定，动态的的请设定数据视图，并选定值和文本项！！");
            return false;
        }
        var src = event.target;
        var l = $(src).offset().left - 80 + "px";
        var t = $(src).offset().top + 20 + "px";
        var w = 220;
        var h = 150;
        var popDiv = new GHKPopDiv(l, t, w, h, 'popOptionDiv');
        var optionsDiv = document.createElement("div");
        optionsDiv.style.position = "absolute";
        optionsDiv.style.width = "220px";
        optionsDiv.style.height = "150px";
        optionsDiv.style.overflow = "hidden";
        optionsDiv.style.backgroundColor = "gray";
        optionsDiv.style.alignText = "center";
        $(popDiv.element).append(optionsDiv);
        var tableDiv = document.createElement("div");
        tableDiv.style.position = "absolute";
        tableDiv.style.left = "0px";
        tableDiv.style.top = "0px";
        tableDiv.style.width = "100%";
        tableDiv.style.overflow = "auto";
        tableDiv.style.height = "130px";
        $(optionsDiv).append(tableDiv);
        var optionsTable = document.createElement("table");
        optionsTable.style.borderCollapse = "collapse";
        optionsTable.style.fontSize = "12px";
        optionsTable.style.width = "100%";
        optionsTable.style.textAlign = "center";
        optionsTable.style.border = "1px solid black";
        optionsTable.style.cellspacing = 0;
        optionsTable.style.tableLayout = "fixed";
        optionsTable.style.backgroundColor = "#E7DBD5";
        $(tableDiv).append(optionsTable);
        var headRow = optionsTable.insertRow();
        headRow.style.height = 20;
        var th = document.createElement("th");
        th.style.border = "1px solid black";
        th.style.width = "30px";
        $(th).html("<span style='font-size:12px;width:30px;'>添加</span>");
        th.childNodes[0].onclick = function() {
            var item = new HBSJsOption('', '');
            var options = flotGetPageDiv.currentControl.Json.options;
            options.push(item);
            addOptionRow(item, options, optionsTable);
        }
        headRow.appendChild(th);
        th = document.createElement("th");
        th.style.border = "1px solid black";
        $(th).html("<span  style='font-size:12px;width:95px;'>选项值</span>");
        headRow.appendChild(th);
        th = document.createElement("th");
        th.style.border = "1px solid black";
        $(th).html("<span  style='font-size:12px;width:95px;'>文本</span>");
        headRow.appendChild(th);
        for (var i = 0; i < flotGetPageDiv.currentControl.Json.options.length; i++) {
            (function() {
                var options = flotGetPageDiv.currentControl.Json.options;
                var item = options[i];
                addOptionRow(item, options, optionsTable);
            })();
        }
        var buttonSpan = document.createElement("span");
        buttonSpan.innerHTML = "<input type=button style='width:40px;font-size:12px;' value=关闭>";
        buttonSpan.style.position = "absolute";
        buttonSpan.style.left = "0px";
        buttonSpan.style.top = "130px";
        $(buttonSpan.childNodes[0]).bind("click", function() {
            $(popDiv.element).remove();
            var opStr = "";
            var s = $(flotGetPageDiv.currentControl.element.childNodes[0].childNodes[1])[0];
            if (s != null) {
                s.length = 0;
                for (var i = 0; i < flotGetPageDiv.currentControl.Json.options.length; i++) {
                    var v = flotGetPageDiv.currentControl.Json.options[i].value;
                    var t = flotGetPageDiv.currentControl.Json.options[i].text;
                    var op = new Option(v, t);
                    s.options[i] = op;
                }
            }
        });
        $(optionsDiv).append(buttonSpan);
    });

    function addOptionRow(item, options, optionsTable) {
        var row = optionsTable.insertRow();
        var delTd = document.createElement("td");
        $(delTd).html("<span style='font-size:12px;width:30px;'>删除</span>");
        delTd.style.border = "1px solid black";
        $(delTd.childNodes[0]).bind("click", function() {
            for (var i = 0; i < options.length; i++) {
                var theItem = options[i];
                if (theItem == item) {
                    options.splice(i, 1);
                }
            }
            optionsTable.deleteRow(row.rowIndex);
        });
        row.appendChild(delTd);
        var valueTd = document.createElement("td");
        valueTd.style.border = "1px solid black";
        $(valueTd).html("<span  style='font-size:12px;width:95px;' contentEditable=true>" + item.value + "</span>");
        if (item.value == "") {
            $(valueTd).html("<span  style='font-size:12px;width:95px;' contentEditable=true>&nbsp;</span>");
        }
        row.appendChild(valueTd);
        var textTd = document.createElement("td");
        textTd.style.border = "1px solid black";
        $(textTd).html("<span style='font-size:12px;width:95px;' contentEditable=true>" + item.text + "</span>");
        if (item.text == "") {
            $(textTd).html("<span style='font-size:12px;width:95px;' contentEditable=true>&nbsp;</span>");
        }
        row.appendChild(textTd);
        $(valueTd.childNodes[0]).bind("focus", function(event) {
            var src = event.target;
            $(src).text("");
            if (item.text == "") {
                $(textTd.childNodes[0]).text("");
            }
        });
        $(textTd.childNodes[0]).bind("focus", function(event) {
            var src = event.target;
            $(src).text("");
            if (item.value == "") {
                $(valueTd.childNodes[0]).text("");
            }
        });
        $(valueTd.childNodes[0]).bind("blur", function(event) {
            var src = event.target;
            if ($(textTd.childNodes[0]).text() == "" || $(textTd.childNodes[0]).text() == " ") {
                $(textTd.childNodes[0]).text($(src).text());
                item.text = $(src).text();
            }
            item.value = $(src).text();
        });
        $(textTd.childNodes[0]).bind("blur", function(event) {
            var src = event.target;
            if ($(valueTd.childNodes[0]).text() == "" || $(valueTd.childNodes[0]).text() == " ") {
                $(valueTd.childNodes[0]).text($(src).text());
                item.value = $(src).text();
            }
            item.text = $(src).text();
        });
    }
    $("#textModelInput").bind("click", function(event) {
        var popDiv = createPopPropertyDiv(event);
        var ulData = new HBSUlData();
        ulData.propertyName = "textModel";
        ulData.propertyType = "";
        var l1 = new HBSLiData('normal', '普通文本框');
        ulData.liAry.push(l1);
        var l2 = new HBSLiData('password', '密码文本框');
        ulData.liAry.push(l2);
        var l3 = new HBSLiData('underSelect', '下拉选择文本框');
        ulData.liAry.push(l3);
        createPopUl(ulData, popDiv);
    });
    $("#imageSrcInput").bind("click", function(event) {
        //        var liHref = $(this).val();
        //        flotGetPageDiv.currentControl.changeImageSrc(liHref);
        var pageId = flotGetPageDiv.Json.pageId;
        $("#imageSrcInputMenu").remove();
        this.element = document.createElement("div");
        $(this.element).css("top", "20%");
        $(this.element).css("left", "20%");

        //    this.element.style.top = y;
        //    this.element.style.left = x;
        this.element.style.position = 'absolute';
        this.element.style.zIndex = 9999;
        this.element.style.width = "500px";
        this.element.style.height = "400px";
        this.element.style.zIndex = 9999;
        this.element.style.backgroundColor = "#6cf";
        this.element.style.textAlign = "left";
        this.element.id = "imageSrcInputMenu";
        $(this.element).css("overflow", "auto");
        var deleteDiv = document.createElement("div");
        deleteDiv.style.width = "100%";
        deleteDiv.style.height = "20px";
        $(deleteDiv).css("border", "#9e9e9e 0.5px solid");
        $(deleteDiv).css("text-align", "right");
        $(deleteDiv).append("<p style='cursor:pointer;'>关闭</p>");
        $(deleteDiv.firstChild).on("click", function() { $("#imageSrcInputMenu").remove(); });
        $(this.element).append(deleteDiv);
        document.body.appendChild(this.element);
        $(this.element).append("<form method=\"post\" target='imageSrcframe' action=\"/handler/pageFileDao.ashx\" enctype=\"multipart/form-data\"><input name=\"mode\" type=\"text\" style=\"display:none\" value='uploadFile'/><input name=\"pageId\" type=\"text\" style=\"display:none\" value='" + pageId + "'/><input name=\"controlType\" type=\"text\" style=\"display:none\" value='www'/><div style='display:inline'><lable style='display:inline'>文件上传：</lable><input style='display:inline' type=\"file\" id='inputfile' name=\"file\" /></div><input type=\"submit\" style='display:inline'  value='上传'/><iframe name='imageSrcframe' id='imageSrcframe' style='display:none;'></iframe></form>");
        var tableDiv = document.createElement("div");
        tableDiv.id = "tableDiv";
        tableDiv.style.width = "100%";
        tableDiv.style.height = "auto";
        $(tableDiv).css("border", "#9e9e9e 0.5px solid");
        $(tableDiv).append("<p style='cursor:pointer;float:right;color:#FF0;'>刷新</p>");
        $(tableDiv.firstChild).on("click", function() {
            $.ajax({ url: "/handler/pageFileDao.ashx", type: "POST", async: false, data: { mode: escape("getFile"), pageId: escape(pageId) },
                success: function(data) {
                    //                alert(data);
                    $($("#tableDiv")[0].childNodes[1]).remove();
                    $("#tableDiv").append(data);
                }, error: function(XMLHttpRequest, textStatus) {
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    alert(textStatus);
                    alert("出错了");
                }
            });
        });
        $(this.element).append(tableDiv);
        $.ajax({ url: "/handler/pageFileDao.ashx", type: "POST", async: false, data: { mode: escape("getFile"), pageId: escape(pageId) },
            success: function(data) {
                //                alert(data);
                $("#tableDiv").append(data);
            }, error: function(XMLHttpRequest, textStatus) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
                alert("出错了");
            }
        });
    });

    $("#TreeSrcInput").bind("click", function(event) {

        $("#TreeSrcInputMenu").remove();
        this.element = document.createElement("div");
        $(this.element).css("top", "20%");
        $(this.element).css("left", "20%");

        //    this.element.style.top = y;
        //    this.element.style.left = x;
        this.element.style.position = 'absolute';
        this.element.style.zIndex = 9999;
        this.element.style.width = "500px";
        this.element.style.height = "400px";
        this.element.style.zIndex = 9999;
        this.element.style.backgroundColor = "#6cf";
        this.element.style.textAlign = "left";
        this.element.id = "TreeSrcInputMenu";
        $(this.element).css("overflow", "auto");
        var deleteDiv = document.createElement("div");
        deleteDiv.style.width = "100%";
        deleteDiv.style.height = "20px";
        $(deleteDiv).css("border", "#9e9e9e 0.5px solid");
        $(deleteDiv).css("text-align", "right");
        $(deleteDiv).append("<p style='cursor:pointer;'>关闭</p>");
        $(deleteDiv.firstChild).on("click", function() { $("#TreeSrcInputMenu").remove(); });
        $(this.element).append(deleteDiv);
        document.body.appendChild(this.element);
        var str = flotGetPageDiv.currentControl.Json.Src;
        var tableName = "";
        tableName = str.substring(0, str.lastIndexOf("/"));
        $("#TreeSrcInputMenu").append("当前 " + tableName.substring(tableName.lastIndexOf("/") + 1) + " 可供选择的字段有：<br/>");
        $.ajax({ url: "/HBSJsTreeDao.aspx", type: "POST", async: false, data: { mode: escape("getTbaleRow"), treeName: escape(tableName.substring(tableName.lastIndexOf("/") + 1)) },
            success: function(data) {
                var list = eval(data);
                for (var i = 0; i < list.length; i++) {
                    var a = document.createElement("a");
                    a.href = "#";
                    $(a).html(list[i]);
                    $("#TreeSrcInputMenu").append(a);
                    $("#TreeSrcInputMenu").append("<br/>");
                    $(a).on("click", function() {
                        var liText = $(this).html();
                        $("#TreeSrcInput").val(liText);
                        flotGetPageDiv.currentControl.changeTreeSrcInput(liText);
                        $("#TreeSrcInputMenu").remove();
                    });
                }
            },
            error: function(XMLHttpRequest, textStatus) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
                alert("出错了");
            }
        });
    });
    $("#uploadFileInput").bind("click", function(event) {
        $("#uploadFileInputMenu").remove();
        this.element = document.createElement("div");
        $(this.element).css("top", "20%");
        $(this.element).css("left", "20%");
        //    this.element.style.top = y;
        //    this.element.style.left = x;
        this.element.style.position = 'absolute';
        this.element.style.zIndex = 9999;
        this.element.style.width = "500px";
        this.element.style.height = "400px";
        this.element.style.zIndex = 9999;
        this.element.style.backgroundColor = "#6cf";
        this.element.style.textAlign = "left";
        this.element.id = "uploadFileInputMenu";
        $(this.element).css("overflow", "auto");
        var deleteDiv = document.createElement("div");
        deleteDiv.style.width = "100%";
        deleteDiv.style.height = "20px";
        $(deleteDiv).css("border", "#9e9e9e 0.5px solid");
        $(deleteDiv).css("text-align", "right");
        $(deleteDiv).append("<p style='cursor:pointer;'>关闭</p>");
        $(deleteDiv.firstChild).on("click", function() { $("#uploadFileInputMenu").remove(); });
        $(this.element).append(deleteDiv);
        document.body.appendChild(this.element);
        var images = flotGetPageDiv.Json.images;

        for (var i = 0; i < images.length; i++) {
            var image = images[i];
            $(this.element).append("<p style=\"display:inline;\">控件名：" + image.name + "</p>&nbsp;&nbsp;&nbsp;&nbsp;<p style=\"display:inline;\">控件类型：" + image.controlType + "</p>&nbsp;&nbsp;&nbsp;&nbsp;");
            //<a style=\"display:inline;\" href='#'>选择</a>
            var a = document.createElement("a");
            $(a).css("display", "inline");
            $(a).html("选择");
            $(a).prop("controlName", image.name);
            $(a).prop("controlType", image.controlType);
            $(a).prop("href", "#");
            $(a).bind("click", function(event) {
                //                alert($(this).prop("controlName"));
                //                alert($(this).prop("controlType"));
                var effect = flotGetPageDiv.currentControl.Json.effect;
                effect.length = 0;
                effect.push($(this).prop("controlName"));
                effect.push($(this).prop("controlType"));
                $("#uploadFileInput").val($(this).prop("controlName"));
                $("#uploadFileInputMenu").remove();
            });
            $(this.element).append(a);
            $(this.element).append("<br/>");

        }

        var fileListings = flotGetPageDiv.Json.fileListings;

        for (var i = 0; i < fileListings.length; i++) {
            var fileListing = fileListings[i];
            $(this.element).append("<p style=\"display:inline;\">控件名：" + fileListing.name + "</p>&nbsp;&nbsp;&nbsp;&nbsp;<p style=\"display:inline;\">控件类型：" + fileListing.controlType + "</p>&nbsp;&nbsp;&nbsp;&nbsp;");
            //<a style=\"display:inline;\" href='#'>选择</a>
            var a = document.createElement("a");
            $(a).css("display", "inline");
            $(a).html("选择");
            $(a).prop("controlName", fileListing.name);
            $(a).prop("controlType", fileListing.controlType);
            $(a).prop("href", "#");
            $(a).bind("click", function(event) {
                //                alert($(this).prop("controlName"));
                //                alert($(this).prop("controlType"));
                var effect = flotGetPageDiv.currentControl.Json.effect;
                effect.length = 0;
                effect.push($(this).prop("controlName"));
                effect.push($(this).prop("controlType"));
                $("#uploadFileInput").val($(this).prop("controlName"));
                $("#uploadFileInputMenu").remove();
            });
            $(this.element).append(a);
            $(this.element).append("<br/>");

        }

    });
    $("#treeTbaleCreateInput").bind("click", function(event) {
        if ($(this).html() == "当前不可创建数据表") {
            return;
        }
        $("#treeTbaleCreateInputMenu").remove();
        this.element = document.createElement("div");
        $(this.element).css("top", "20%");
        $(this.element).css("left", "20%");
        //    this.element.style.top = y;
        //    this.element.style.left = x;
        this.element.style.position = 'absolute';
        this.element.style.zIndex = 9999;
        this.element.style.width = "500px";
        this.element.style.height = "400px";
        this.element.style.zIndex = 9999;
        this.element.style.backgroundColor = "#6cf";
        this.element.style.textAlign = "left";
        this.element.id = "treeTbaleCreateInputMenu";
        $(this.element).css("overflow", "auto");
        var deleteDiv = document.createElement("div");
        deleteDiv.style.width = "100%";
        deleteDiv.style.height = "20px";
        $(deleteDiv).css("border", "#9e9e9e 0.5px solid");
        $(deleteDiv).css("text-align", "right");
        $(deleteDiv).append("<p style='cursor:pointer;'>关闭</p>");
        $(deleteDiv.firstChild).on("click", function() { $("#treeTbaleCreateInputMenu").remove(); });
        $(this.element).append(deleteDiv);
        document.body.appendChild(this.element);
        $(this.element).append("新建的树型数据表的表名为：");
        var input = document.createElement("input");
        input.id = "newTreeNameInputByMenu";
        input.type = "text";
        $(input).val($("#nameInput").val());
        $(this.element).append(input);
        $("#newTreeNameInputByMenu").on("keyup", function() {
            $("#tishifont").prop("color", "#FFFF00");
            $("#tishifont").css("cursor", "pointer");
            $("#tishifont").html("请点击查看是否可用");

        });
        $(this.element).append("<font color='#FFFF00' style='cursor:pointer' id='tishifont' >请点击查看是否可用</font>");
        $("#tishifont").on("click", function() {

            if ($("#tishifont").html() == "请点击查看是否可用") {
                if ($("#newTreeNameInputByMenu").val() == "未绑定") {
                    $("#tishifont").prop("color", "#FF0000");
                    $("#tishifont").html("当前名字不可用");
                    return;
                }
                $.ajax({ url: "/HBSJsTreeDao.aspx", type: "POST", async: false, data: { mode: escape("getTableNameByTreeName"), treeName: escape($("#newTreeNameInputByMenu").val()) },
                    success: function(data) {
                        if (data == 0) {
                            $("#tishifont").prop("color", "#00FF33");
                            $("#tishifont").html("当前名字可用");
                        } else {
                            $("#tishifont").prop("color", "#FF0000");
                            $("#tishifont").html("当前名字不可用");
                        }
                    },
                    error: function(XMLHttpRequest, textStatus) {
                        alert(XMLHttpRequest.status);
                        alert(XMLHttpRequest.readyState);
                        alert(textStatus);
                        alert("出错了");
                    }
                });
            }


        });


        $(this.element).append("<br/>");
        $(this.element).append("数据结构：");
        var values = flotGetPageDiv.currentControl.Json.Values;
        createJsTree(values, this.element, "f");
        var input = document.createElement("input");
        input.type = "button";
        $(input).val("创建");
        $(this.element).append(input);
        $(input).on("click", function() {
            if ($("#tishifont").html() == "当前名字可用") {
                $.ajax({ url: "/HBSJsTreeDao.aspx", type: "POST", async: false, data: { mode: escape("createTreeTbale"), treeName: escape($("#newTreeNameInputByMenu").val()), values: escape(values) },
                    success: function(data) {
                        if (data == 0) {
                            alert("创建数据表失败");
                            $.ajax({ url: "/HBSJsTreeDao.aspx", type: "POST", async: false, data: { mode: escape("deleteTreeTbale"), treeName: escape($("#newTreeNameInputByMenu").val()) },
                                success: function(data) {
                                },
                                error: function(XMLHttpRequest, textStatus) {
                                    alert(XMLHttpRequest.status);
                                    alert(XMLHttpRequest.readyState);
                                    alert(textStatus);
                                    alert("出错了");
                                }
                            });
                            $("#treeTbaleCreateInputMenu").remove();
                        } else {
                            alert("创建数据表成功");
                            flotGetPageDiv.currentControl.createTreeTbale(values, $("#newTreeNameInputByMenu").val());
                            $("#treeTbaleCreateInputMenu").remove();
                        }
                    },
                    error: function(XMLHttpRequest, textStatus) {
                        alert(XMLHttpRequest.status);
                        alert(XMLHttpRequest.readyState);
                        alert(textStatus);
                        alert("出错了");
                    }
                });
            } else {
                alert("请先验证树型数据表的表名！");
            }
        });
    });
    $("#treeTbaleInput").bind("click", function(event) {
        $("#treeTbaleInputMenu").remove();
        this.element = document.createElement("div");
        $(this.element).css("top", "20%");
        $(this.element).css("left", "20%");
        //    this.element.style.top = y;
        //    this.element.style.left = x;
        this.element.style.position = 'absolute';
        this.element.style.zIndex = 9999;
        this.element.style.width = "500px";
        this.element.style.height = "400px";
        this.element.style.zIndex = 9999;
        this.element.style.backgroundColor = "#6cf";
        this.element.style.textAlign = "left";
        this.element.id = "treeTbaleInputMenu";
        $(this.element).css("overflow", "auto");
        var deleteDiv = document.createElement("div");
        deleteDiv.style.width = "100%";
        deleteDiv.style.height = "20px";
        $(deleteDiv).css("border", "#9e9e9e 0.5px solid");
        $(deleteDiv).css("text-align", "right");
        $(deleteDiv).append("<p style='cursor:pointer;'>关闭</p>");
        $(deleteDiv.firstChild).on("click", function() { $("#treeTbaleInputMenu").remove(); });
        $(this.element).append(deleteDiv);
        document.body.appendChild(this.element);
        var a = document.createElement("a");
        a.href = "#";
        $(a).html("未绑定");
        $(this.element).append(a);
        $(this.element).append("<br/>");
        $(a).on("click", function() {
            $("#treeTbaleCreateInput").prop("color", "#00FF33");
            $("#treeTbaleCreateInput").html("当前可以创建树型数据表");
            $("#treeTbaleInput").val($(this).html());
            var liText = $("#treeTbaleInput").val();
            var Values = [["我是顶级节点", "1", "0", "否"], ["我是兄弟节点", "2", "0", "否"], ["我是子节点", "3", "1", "否"]];
            flotGetPageDiv.currentControl.createTreeTbale(Values, liText);
        });
        $.ajax({ url: "/HBSJsTreeDao.aspx", type: "POST", async: false, data: { mode: escape("getTableName") },
            success: function(data) {
                var strs = eval(data);
                for (var i = 0; i < strs.length; i++) {
                    var a = document.createElement("a");
                    a.href = "#";
                    $(a).html(strs[i]);
                    $("#treeTbaleInputMenu").append(a);
                    $("#treeTbaleInputMenu").append("&nbsp;&nbsp;&nbsp;&nbsp;");
                    var deleteA = document.createElement("font");
                    $(deleteA).css("cursor", "pointer");
                    $(deleteA).prop("color", "#FF0000");
                    $(deleteA).html("删除 " + strs[i] + " 数据表");
                    $(deleteA).prop("propTable", strs[i]);
                    $("#treeTbaleInputMenu").append(deleteA);
                    $(deleteA).on("click", function() {
                        var grl = confirm("是否真的删除 " + $(this).prop("propTable") + " 数据表?(如果其他树型控件绑定当前数据表，删除后可能出现其他树型控件不能使用！！！！)")
                        if (grl) {
                            $.ajax({ url: "/HBSJsTreeDao.aspx", type: "POST", async: false, data: { mode: escape("DeleteTable"), tableName: escape($(this).prop("propTable")) },
                                success: function(data) {
                                    if (data == 1) {
                                        alert("删除成功");
                                    } else {
                                        alert("删除失败");
                                    }
                                    //                                var Values = eval(data);
                                    //                                flotGetPageDiv.currentControl.createTreeTbale(Values, tableName);
                                },
                                error: function(XMLHttpRequest, textStatus) {
                                    alert(XMLHttpRequest.status);
                                    alert(XMLHttpRequest.readyState);
                                    alert(textStatus);
                                    alert("出错了");
                                }
                            });
                        }
                    });
                    $("#treeTbaleInputMenu").append("<br/>");
                    $(a).on("click", function() {

                        $("#treeTbaleCreateInput").prop("color", "#FF0000");
                        $("#treeTbaleCreateInput").html("当前不可创建数据表");

                        //                        var liText = $("#treeTbaleInput").val();
                        //                        flotGetPageDiv.currentControl.createSrcOpen(liText);
                        var tableName = $(this).html();
                        $.ajax({ url: "/HBSJsTreeDao.aspx", type: "POST", async: false, data: { mode: escape("getNodesByTableName"), tableName: escape(tableName) },
                            success: function(data) {
                                var Values = eval(data);
                                flotGetPageDiv.currentControl.createTreeTbale(Values, tableName);
                            },
                            error: function(XMLHttpRequest, textStatus) {
                                alert(XMLHttpRequest.status);
                                alert(XMLHttpRequest.readyState);
                                alert(textStatus);
                                alert("出错了");
                            }
                        });
                        $("#treeTbaleInputMenu").remove();
                    });
                }

            },
            error: function(XMLHttpRequest, textStatus) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
                alert("出错了");
            }
        });
        //    flotGetPageDiv.currentControl.createTreeTbale(Values,table);
    });
    $("#srcOpenInput").bind("click", function(event) {
        $("#srcOpenInputMenu").remove();
        this.element = document.createElement("div");
        $(this.element).css("top", "20%");
        $(this.element).css("left", "20%");
        //    this.element.style.top = y;
        //    this.element.style.left = x;
        this.element.style.position = 'absolute';
        this.element.style.zIndex = 9999;
        this.element.style.width = "500px";
        this.element.style.height = "400px";
        this.element.style.zIndex = 9999;
        this.element.style.backgroundColor = "#6cf";
        this.element.style.textAlign = "left";
        this.element.id = "srcOpenInputMenu";
        $(this.element).css("overflow", "auto");
        var deleteDiv = document.createElement("div");
        deleteDiv.style.width = "100%";
        deleteDiv.style.height = "20px";
        $(deleteDiv).css("border", "#9e9e9e 0.5px solid");
        $(deleteDiv).css("text-align", "right");
        $(deleteDiv).append("<p style='cursor:pointer;'>关闭</p>");
        $(deleteDiv.firstChild).on("click", function() { $("#srcOpenInputMenu").remove(); });
        $(this.element).append(deleteDiv);
        document.body.appendChild(this.element);
        if (flotGetPageDiv.Json.iframes.length == 0) {
            $(this.element).append("还没有页面容器！");
        }

        for (var i = 0; i < flotGetPageDiv.Json.iframes.length; i++) {
            var iframe = flotGetPageDiv.Json.iframes[i];
            var a = document.createElement("a");
            a.href = "#";
            $(a).html(iframe.name);
            $(this.element).append(a);
            $(this.element).append("<br/>");
            $(a).on("click", function() {
                $("#srcOpenInput").val($(this).html());
                var liText = $("#srcOpenInput").val();
                flotGetPageDiv.currentControl.createSrcOpen(liText);
                $("#srcOpenInputMenu").remove();
            });

        }




    });
    $("#srcInput").bind("click", function(event) {
        $("#srcInputMenu").remove();
        this.element = document.createElement("div");
        $(this.element).css("top", "20%");
        $(this.element).css("left", "20%");
        //    this.element.style.top = y;
        //    this.element.style.left = x;
        this.element.style.position = 'absolute';
        this.element.style.zIndex = 9999;
        this.element.style.width = "500px";
        this.element.style.height = "400px";
        this.element.style.zIndex = 9999;
        this.element.style.backgroundColor = "#6cf";
        this.element.style.textAlign = "left";
        this.element.id = "srcInputMenu";
        $(this.element).css("overflow", "auto");
        var deleteDiv = document.createElement("div");
        deleteDiv.style.width = "100%";
        deleteDiv.style.height = "20px";
        $(deleteDiv).css("border", "#9e9e9e 0.5px solid");
        $(deleteDiv).css("text-align", "right");
        $(deleteDiv).append("<p style='cursor:pointer;'>关闭</p>");
        $(deleteDiv.firstChild).on("click", function() { $("#srcInputMenu").remove(); });
        $(this.element).append(deleteDiv);
        document.body.appendChild(this.element);
        $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getOnlineRoleId" },
            success: function(data) {
                if (data.IsSuccess) {
                    var roleId = data.Data;
                    $.ajax({ url: "/handler/runtimeWeb.ashx", async: false, dataType: "json", type: "POST", data: { operatetype: "getPowerHtmlForRole", roleId: escape(roleId) },
                        success: function(data) {
                            if (data.IsSuccess) {
                                $("#srcInputMenu").append(data.Data);
                                $("#srcInputMenu").find("a").bind("click", function(event) {
                                    event.stopPropagation();
                                    var modelId = $(this).attr("id");
                                    var modelName = $(this).text();
                                    $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getPageDir", modelId: escape(modelId) },
                                        success: function(data) {
                                            if (data.IsSuccess) {
                                                var pageDir = data.Data;
                                                var pagePath = "/" + pageDir + "/html4.htm";
                                                //alert(pagePath);
                                                $("#srcInput").val(pagePath);
                                                var liText = $("#srcInput").val();
                                                flotGetPageDiv.currentControl.createSrc(liText);

                                            }
                                            else {
                                                alert(data.Message);
                                            }
                                        },
                                        error: function(e) {
                                            alert(e.status);
                                        }
                                    });
                                    $("#srcInputMenu").remove();
                                });

                            }
                        },
                        error: function(xhr, stat, e) {
                            alert("third");
                        }
                    });
                }
            }
        });

    });
    $("#addTriggerInput").bind("click", function(event) {

    });
    $("#delTriggerInput").bind("click", function(event) {

    });
    $("#updateTriggerInput").bind("click", function(event) {

    });
    $("#signFieldInput").bind("click", function(event) {
        var popDiv = createPopPropertyDiv(event);
        var ulData = new HBSUlData();
        ulData.propertyName = "signField";
        ulData.propertyType = "base";
        for (var i = 0; i < flotGetPageDiv.Json.texts.length; i++) {
            var name = flotGetPageDiv.Json.texts[i].name;
            var l1 = new HBSLiData(name, name);
            ulData.liAry.push(l1);
        }
        createPopUl(ulData, popDiv);
    });
    $("#regexInput").bind("click", function(event) {
        var popDiv = createPopPropertyDiv(event);
        var ulData = new HBSUlData();
        ulData.propertyName = "regex";
        ulData.propertyType = "base";
        var l1 = new HBSLiData('none', '无正则');
        ulData.liAry.push(l1);
        var l2 = new HBSLiData('email', '电子邮箱');
        ulData.liAry.push(l2);
        var l3 = new HBSLiData('mobile', '手机号码');
        ulData.liAry.push(l3);
        var l4 = new HBSLiData('int', '整数');
        ulData.liAry.push(l4);
        var l5 = new HBSLiData('decimal', '小数');
        ulData.liAry.push(l5);
        createPopUl(ulData, popDiv);
    });
    $("#statisticsFieldInput").bind("click", function(event) {

    });
    $("#statisticsMethodInput").bind("click", function(event) {
        var popDiv = createPopPropertyDiv(event);
        var ulData = new HBSUlData();
        ulData.propertyName = "statisticsMethodInput";
        ulData.propertyType = "base";
        var l1 = new HBSLiData('count', '计数');
        ulData.liAry.push(l1);
        var l2 = new HBSLiData('sum', '求和');
        ulData.liAry.push(l2);
        var l3 = new HBSLiData('avg', '平均值');
        ulData.liAry.push(l3);
        var l4 = new HBSLiData('max', '最大值');
        ulData.liAry.push(l4);
        var l5 = new HBSLiData('min', '最小值');
        ulData.liAry.push(l5);
        createPopUl(ulData, popDiv);
    });
    $(".importData").bind("click", function(event) {
        var select = $("input[name='importRdo']:checked")[0];
        if (select.id == "import") {
            flotGetPageDiv.currentControl.Json.baseProperties.ImportData = true;
        }
        else {
            flotGetPageDiv.currentControl.Json.baseProperties.ImportData = false;
        }
    });
    $(".showColumnHead").bind("click", function(event) {
        var select = $("input[name='showColumnHeadRdo']:checked")[0];
        if (select.id == "showHead") {
            flotGetPageDiv.currentControl.Json.baseProperties.ShowHead = true;
        }
        else {
            flotGetPageDiv.currentControl.Json.baseProperties.ShowHead = false;
        }
    });
    $("#innerPageLogicInput").bind("click", function(event) {
        var src = event.target;
        var l = $(src).offset().left - 85 + "px";
        var t = $(src).offset().top + 25 + "px";
        var w = 212;
        var h = 150;
        var popDiv = new GHKPopDiv(l, t, w, h, 'popDiv');
        var innerPageLogicDiv = new HBSJsInnerPageLogicDiv();
        innerPageLogicDiv.pageDiv = flotGetPageDiv;
        innerPageLogicDiv.Json = flotGetPageDiv.Json.innerPageLogics;
        innerPageLogicDiv.createElement();
        $(popDiv.element).append(innerPageLogicDiv.element);
    });
    $("#datasourceInput").bind("propertychange", function(event) {
        if (flotGetPageDiv.currentControl.Json.baseProperties.datasource == null) {
            return false;
        }
        var dvJsonStr = $("#datasourceInput").attr("dvJson");
        var dvJson = null;
        if (dvJsonStr != "") {
            dvJson = eval('(' + dvJsonStr + ')');
        }
        if (dvJson == null) {
            return false;
        }
        flotGetPageDiv.currentControl.dvJson = dvJson;
        flotGetPageDiv.currentControl.Json.baseProperties.datasource.id = dvJson.id;
        flotGetPageDiv.currentControl.Json.baseProperties.datasource.name = dvJson.name;
    })
    $("#datasourceInput").bind("click", function(event) {
        var datasourceId = flotGetPageDiv.currentControl.Json.baseProperties.datasource.id;
        var controlsStr = flotGetPageDiv.getControlsStr();
        window.open("/dataview.htm?id=" + datasourceId + "&controlsStr=" + encodeURIComponent(controlsStr));
    });
    $("#domTypeInput").bind("click", function(event) {
        var popDiv = createPopPropertyDiv(event);
        var ulData = new HBSUlData();
        ulData.propertyName = "domType";
        ulData.propertyType = "";
        var l1 = new HBSLiData('label', '标签');
        ulData.liAry.push(l1);
        var l2 = new HBSLiData('text', '普通文本框');
        ulData.liAry.push(l2);
        var l3 = new HBSLiData('select', '列表框');
        ulData.liAry.push(l3);
        var l4 = new HBSLiData('radio', '单选按钮');
        ulData.liAry.push(l4);
        var l5 = new HBSLiData('checkbox', '复选框');
        ulData.liAry.push(l5);
        var l6 = new HBSLiData('underSelect', '下拉选项');
        ulData.liAry.push(l6);
        var l6 = new HBSLiData('image', '图片');
        ulData.liAry.push(l6);
        createPopUl(ulData, popDiv);
    });

    function checkControlName(name, isGroup) {
        var flag = false;
        if (!flag) {
            if (!isGroup) {
                var labels = flotGetPageDiv.Json.labels;
                for (var i = 0; i < labels.length; i++) {
                    if (labels[i].name == name) {
                        flag = true;
                        break;
                    }
                }
            }
        }
        if (!flag) {
            var texts = flotGetPageDiv.Json.texts;
            for (var i = 0; i < texts.length; i++) {
                if (texts[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            if (!isGroup) {
                var checkboxs = flotGetPageDiv.Json.checkboxs;
                for (var i = 0; i < checkboxs.length; i++) {
                    if (checkboxs[i].name == name) {
                        flag = true;
                        break;
                    }
                }
            }
        }
        if (!flag) {
            if (!isGroup) {
                var radios = flotGetPageDiv.Json.radios;
                for (var i = 0; i < radios.length; i++) {
                    if (radios[i].name == name) {
                        flag = true;
                        break;
                    }
                }
            }
        }
        if (!flag) {
            var selects = flotGetPageDiv.Json.selects;
            for (var i = 0; i < selects.length; i++) {
                if (selects[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            var images = flotGetPageDiv.Json.images;
            for (var i = 0; i < images.length; i++) {
                if (images[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            var dates = flotGetPageDiv.Json.dates;
            for (var i = 0; i < dates.length; i++) {
                if (dates[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            var listTables = flotGetPageDiv.Json.listTables;
            for (var i = 0; i < listTables.length; i++) {
                if (listTables[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            var trees = flotGetPageDiv.Json.trees;
            for (var i = 0; i < trees.length; i++) {
                if (trees[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            var matrixRpts = flotGetPageDiv.Json.matrixRpts;
            for (var i = 0; i < matrixRpts.length; i++) {
                if (matrixRpts[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            var iframes = flotGetPageDiv.Json.iframes;
            for (var i = 0; i < iframes.length; i++) {
                if (iframes[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            var apeakTrees = flotGetPageDiv.Json.apeakTrees;
            for (var i = 0; i < apeakTrees.length; i++) {
                if (apeakTrees[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            var planeTrees = flotGetPageDiv.Json.planeTrees;
            for (var i = 0; i < planeTrees.length; i++) {
                if (planeTrees[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            var flots = flotGetPageDiv.Json.flots;
            for (var i = 0; i < flots.length; i++) {
                if (flots[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            var froms = flotGetPageDiv.Json.froms;
            for (var i = 0; i < froms.length; i++) {
                if (froms[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            var uploadFiles = flotGetPageDiv.Json.uploadFiles;
            for (var i = 0; i < uploadFiles.length; i++) {
                if (uploadFiles[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            var replys = flotGetPageDiv.Json.replys;
            for (var i = 0; i < replys.length; i++) {
                if (replys[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            var orderNos = flotGetPageDiv.Json.orderNos;
            for (var i = 0; i < orderNos.length; i++) {
                if (orderNos[i].name == name) {
                    flag = true;
                    break;
                }
            }

        }
        if (!flag) {
            var moneys = flotGetPageDiv.Json.moneys;
            for (var i = 0; i < moneys.length; i++) {
                if (moneys[i].name == name) {
                    flag = true;
                    break;
                }
            }

        }
        if (!flag) {
            var modelControls = flotGetPageDiv.Json.modelControls;
            for (var i = 0; i < modelControls.length; i++) {
                if (modelControls[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            var uploadFiles = flotGetPageDiv.Json.uploadFiles;
            for (var i = 0; i < uploadFiles.length; i++) {
                if (uploadFiles[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            var fileListings = flotGetPageDiv.Json.fileListings;
            for (var i = 0; i < fileListings.length; i++) {
                if (fileListings[i].name == name) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    }

});