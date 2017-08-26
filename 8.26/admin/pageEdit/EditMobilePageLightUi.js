var editpage_ulindex = 0, editpage_liindex = 0;
var flotGetPageDiv;
var pageDiv = null;
$(function(event) {
    //    $(document).bind("contextmenu", function(e) {
    //        return false;
    //    });
    $("#layout1").ligerLayout({
        leftWidth: 120,
        rightWidth: 250,
        height: '100%',
        heightDiff: -4,
        space: 4
    });
    $("#propertyDiv").tabs();
    var modelId = 18;
    try {
        var theurl = window.location.href;
        var queryStr = theurl.split('?')[1];
        var idStr = queryStr.split("&")[0];
        modelId = idStr.split('=')[1];
        modelId = modelId.replace("#", "");
        var nameStr = queryStr.split("&")[1];
        modelName = decodeURIComponent(nameStr.split('=')[1]);
    }
    catch (e) {
        modelId = 18;
        modelName = "c3";
    }
    pageDiv = new HBSJsPageDiv();
    $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getModelJson", modelId: escape(modelId), modelName: escape(modelName) },
        success: function(data) {
            if (data.IsSuccess) {
                pageDiv.Json = data.Data;
                pageDiv.Json.name = pageDiv.Json.name;
                var uls = pageDiv.Json.controlStr;
                //                uls = eval('(' + uls + ')');   
                if (uls != null) {
                    editpage_ulindex = uls.length;
                }
                if (pageDiv.hasOwnProperty("createHTML5Element"))
                    pageDiv.createHTML5Element();
                else
                    pageDiv.createElement();
                pageDiv.createPropertiesDiv();
                flotGetPageDiv = pageDiv;
            }
            else {
                alert(data.Message);
            }
        },
        error: function(e) {
            alert(e.status);
        }
    });

    //设置行列
    $("#gridrowInput").bind("change", function(event) {
        var value = $(this).val();
        if (!checkInteger(value)) {
            alert("行大小必须为整数!!");
            $(this).val(pageDiv.currentControl.Json.row);
            return;
        }
        pageDiv.currentControl.Json.row =parseInt(value);
        pageDiv.currentControl.changeRow();
    });
    //设置行列
    $("#gridcolInput").bind("change", function(event) {
        var value = $(this).val();
        if (!checkInteger(value)) {
            alert("列大小必须为整数!!");
            $(this).val(pageDiv.currentControl.Json.col);
            return;
        }
        pageDiv.currentControl.Json.col =parseInt(value);
        pageDiv.currentControl.changeCol();
    });

    //设置list3t
    $("#addTableList3T").bind("click", function() {
        var list3t = { oneField: "标题", twoField: "简约", threeField: "时间" };
        addList3TRow(list3t);
    });
    $(".getOptionType").bind("click", function(event) {
        var select = $("input[name='getOptionRdo']:checked")[0];
        if (select.id == "static") {
            pageDiv.currentControl.Json.getOptionType = true;
        }
        else {
            pageDiv.currentControl.Json.getOptionType = false;
        }
    });
    $("#inputParameterInput").bind("click", function(event) {
        $("#inputParameterInputMenu").remove();
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
        this.element.id = "inputParameterInputMenu";
        $(this.element).css("overflow", "auto");
        var deleteDiv = document.createElement("div");
        deleteDiv.style.width = "100%";
        deleteDiv.style.height = "20px";
        $(deleteDiv).css("border", "#9e9e9e 0.5px solid");
        $(deleteDiv).css("text-align", "center");
        $(deleteDiv).append("<p style=''>输入参数</p>");
        $(deleteDiv).append("<p style='cursor:pointer;position:absolute;right:0px;'>关闭</p>");
        $(deleteDiv.lastChild).on("click", function() { $("#inputParameterInputMenu").remove(); });
        $(this.element).append(deleteDiv);
        document.body.appendChild(this.element);
        $(this.element).append("<br/>");
        var table = document.createElement("table");
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.style.width = "50px";
        $(td).css("border", "#9e9e9e 0.5px solid");
        $(td).html("<a href='#'>添加</a>");
        $(td.firstChild).on("click", function() {
            var tr = document.createElement("tr");
            for (var i = 0; i < 3; i++) {
                var td = document.createElement("td");

                $(td).css("border", "#9e9e9e 0.5px solid");
                if (i == 0) {
                    td.style.width = "50px";
                    $(td).html("<a href='#'>删除</a>");
                    $(td.firstChild).on("click", function() {
                        $(tr).remove();
                    });
                }
                if (i == 1) {
                    td.style.width = "150px";
                    $(td).append("<input type='text' value='' style='width:95%;font-size:12px;' />");
                    $(td.childNodes[0]).bind("change", function(event) {


                    });
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        });
        tr.appendChild(td);
        var td = document.createElement("td");
        td.style.width = "150px";
        $(td).css("border", "#9e9e9e 0.5px solid");
        $(td).html("参数名");
        tr.appendChild(td);
        table.appendChild(tr);
        $(this.element).append(table);
        for (var j = 0; j < pageDiv.Json.inputParameters.length; j++) {
            var tr = document.createElement("tr");
            for (var i = 0; i < 3; i++) {
                var td = document.createElement("td");

                $(td).css("border", "#9e9e9e 0.5px solid");
                if (i == 0) {
                    td.style.width = "50px";
                    $(td).html("<a href='#'>删除</a>");
                    $(td.firstChild).on("click", function() {
                        $(tr).remove();
                    });
                }
                if (i == 1) {
                    td.style.width = "150px";
                    $(td).append("<input type='text' value='" + pageDiv.Json.inputParameters[j].name + "' style='width:95%;font-size:12px;' />");
                    $(td.childNodes[0]).bind("change", function(event) {


                    });
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        var div = document.createElement("div");
        $(div).css("text-align", "center");
        $(div).append("<input type='button' value='确定'>&nbsp;&nbsp;<input type='button' value='取消'>");
        $(div.firstChild).bind("click", function(event) {
            pageDiv.Json.inputParameters.length = 0;
            for (var i = 1; i < $(table).children("tr").length; i++) {
                var ctr = $($(table).children("tr")[i]).children("td");
                pageDiv.Json.inputParameters.push(new HBSJsParameter($(ctr[1].firstChild).val(), null));
            }
            $("#inputParameterInputMenu").remove();
        });
        $(div.lastChild).bind("click", function(event) {
            $("#inputParameterInputMenu").remove();
        });
        $(this.element).append(div);
    });
    $("#outputParameterInput").bind("click", function(event) {
        $("#outputParameterInputMenu").remove();
        this.element = document.createElement("div");
        $(this.element).css("top", "20%");
        $(this.element).css("left", "20%");
        //    this.element.style.top = y;
        //    this.element.style.left = x;
        this.element.style.position = 'absolute';
        this.element.style.zIndex = 9999;
        this.element.style.width = "500px";
        this.element.style.height = "400px";
        this.element.style.backgroundColor = "#6cf";
        this.element.style.textAlign = "left";
        this.element.id = "outputParameterInputMenu";
        $(this.element).css("overflow", "auto");
        var deleteDiv = document.createElement("div");
        deleteDiv.style.width = "100%";
        deleteDiv.style.height = "20px";
        $(deleteDiv).css("border", "#9e9e9e 0.5px solid");
        $(deleteDiv).css("text-align", "center");
        $(deleteDiv).append("<p style=''>输出参数</p>");
        $(deleteDiv).append("<p style='cursor:pointer;position:absolute;right:0px;'>关闭</p>");
        $(deleteDiv.lastChild).on("click", function() { $("#outputParameterInputMenu").remove(); });
        $(this.element).append(deleteDiv);
        document.body.appendChild(this.element);
        $(this.element).append("<br/>");
        var table = document.createElement("table");
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.style.width = "50px";
        $(td).css("border", "#9e9e9e 0.5px solid");
        $(td).html("<a href='#'>添加</a>");
        $(td.firstChild).on("click", function() {
            var tr = document.createElement("tr");
            for (var i = 0; i < 3; i++) {
                var td = document.createElement("td");

                $(td).css("border", "#9e9e9e 0.5px solid");
                if (i == 0) {
                    td.style.width = "50px";
                    $(td).html("<a href='#'>删除</a>");
                    $(td.firstChild).on("click", function() {
                        $(tr).remove();
                    });
                }
                if (i == 1) {
                    td.style.width = "150px";
                    $(td).append("<input type='text' value='' style='width:95%;font-size:12px;' />");
                    $(td.childNodes[0]).bind("change", function(event) {


                    });
                }
                if (i == 2) {
                    td.style.width = "250px";
                    $(td).append("<input type='text' value='' style='width:80%;font-size:12px;' /><img src='/images/add.GIF'>");
                    $(td.childNodes[0]).bind("change", function(event) {
                    });
                    $(td.childNodes[1]).on("click", function() {
                        $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getPageColumns", modelId: escape(pageDiv.Json.pageId) },
                            success: function(gdata) {
                                if (gdata.IsSuccess) {
                                    var expressDiv = new DSExpressDiv();
                                    expressDiv.pageDiv = gdata.Data;
                                    var controlsOpStr = "";
                                    var fields = pageDiv.Json.controls;
                                    for (var i = 0; i < fields.length; i++) {
                                        controlsOpStr = controlsOpStr + "<option value='" + fields[i].baseProperties.name + "'>" + fields[i].baseProperties.name + "</option>";
                                    }
                                    expressDiv.controlsOpStr = controlsOpStr;
                                    expressDiv.Json = new HBSJsExpress();
                                    expressDiv.createElement();
                                    expressDiv.element.style.left = "150px";
                                    expressDiv.element.style.top = "30px";
                                    $(expressDiv.element).css("position", "absolute");
                                    $(expressDiv.element).css("z-index", "9999");
                                    $(expressDiv.element).css("top", "20%");
                                    $(expressDiv.element).css("left", "20%");
                                    expressDiv.clickOkButton = function() {
                                        $(td.childNodes[0]).val(expressDiv.expressStr);


                                    }
                                }
                                else {
                                    alert("无法获取页面的字段信息，不能进行详细设置！！");
                                    history.back();
                                }
                            },
                            error: function(xhr, stat, e) {
                                alert(e);
                            }
                        });

                    });
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        });
        tr.appendChild(td);
        var td = document.createElement("td");
        td.style.width = "150px";
        $(td).css("border", "#9e9e9e 0.5px solid");
        $(td).html("参数名");
        tr.appendChild(td);
        var td = document.createElement("td");
        td.style.width = "250px";
        $(td).css("border", "#9e9e9e 0.5px solid");
        $(td).html("参数值");
        tr.appendChild(td);
        table.appendChild(tr);
        $(this.element).append(table);
        for (var j = 0; j < pageDiv.Json.outputParameters.length; j++) {
            (function() {
                var tr = document.createElement("tr");
                for (var i = 0; i < 3; i++) {
                    var td = document.createElement("td");

                    $(td).css("border", "#9e9e9e 0.5px solid");
                    if (i == 0) {
                        td.style.width = "50px";
                        $(td).html("<a href='#'>删除</a>");
                        $(td.firstChild).on("click", function() {
                            $(tr).remove();
                        });
                    }
                    if (i == 1) {
                        td.style.width = "150px";
                        $(td).append("<input type='text' value='" + pageDiv.Json.outputParameters[j].name + "' style='width:95%;font-size:12px;' />");
                        $(td.childNodes[0]).bind("change", function(event) {


                        });
                    }
                    if (i == 2) {
                        td.style.width = "250px";
                        var v = "";
                        var exp = pageDiv.Json.outputParameters[j].value;
                        if (pageDiv.Json.outputParameters[j].value.Parameters.length > 0) {
                            v = pageDiv.Json.outputParameters[j].value.Parameters[0].Expression;
                        }
                        $(td).append("<input type='text' value='" + v + "' style='width:80%;font-size:12px;' /><img src='/images/add.GIF'>");
                        $(td.childNodes[0]).bind("change", function(event) {
                        });
                        $(td.childNodes[1]).on("click", function() {
                            $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getPageColumns", modelId: escape(pageDiv.Json.pageId) },
                                success: function(gdata) {
                                    if (gdata.IsSuccess) {
                                        var expressDiv = new DSExpressDiv();
                                        expressDiv.pageDiv = gdata.Data;
                                        var controlsOpStr = "";
                                        var fields = pageDiv.Json.controls;
                                        for (var i = 0; i < fields.length; i++) {
                                            controlsOpStr = controlsOpStr + "<option value='" + fields[i].baseProperties.name + "'>" + fields[i].baseProperties.name + "</option>";
                                        }
                                        expressDiv.controlsOpStr = controlsOpStr;
                                        if (exp == null) {
                                            exp = new HBSJsExpress();
                                        }
                                        expressDiv.Json = exp;
                                        expressDiv.createElement();
                                        expressDiv.element.style.left = "150px";
                                        expressDiv.element.style.top = "30px";
                                        $(expressDiv.element).css("position", "absolute");
                                        $(expressDiv.element).css("z-index", "9999");
                                        $(expressDiv.element).css("top", "20%");
                                        $(expressDiv.element).css("left", "20%");
                                        expressDiv.clickOkButton = function() {
                                            $(td.childNodes[0]).val(expressDiv.expressStr);


                                        }
                                    }
                                    else {
                                        alert("无法获取页面的字段信息，不能进行详细设置！！");
                                        history.back();
                                    }
                                },
                                error: function(xhr, stat, e) {
                                    alert(e);
                                }
                            });

                        });
                    }
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            })()
        }
        var div = document.createElement("div");
        $(div).css("text-align", "center");
        $(div).append("<input type='button' value='确定'>&nbsp;&nbsp;<input type='button' value='取消'>");
        $(div.firstChild).bind("click", function(event) {
            pageDiv.Json.outputParameters.length = 0;
            for (var i = 1; i < $(table).children("tr").length; i++) {
                var ctr = $($(table).children("tr")[i]).children("td");
                pageDiv.Json.outputParameters.push(new HBSJsParameter($(ctr[1].firstChild).val(), $(ctr[2].firstChild).val()));
            }
            $("#outputParameterInputMenu").remove();
        });
        $(div.lastChild).bind("click", function(event) {
            $("#outputParameterInputMenu").remove();
        });
        $(this.element).append(div);
    });
    function cancleList3TDialog(item, dialog) {
        $("#popMobilePropertyDiv").append(dialog.options.target);
        dialog.close();
        $("#list3tDiv55").hide();
        var table = $("#list3tTableMobile")[0];
        for (var i = table.rows.length - 1; i >= 0; i--) {
            if ($(table.rows[i]).find("th").length > 0) continue;
            table.deleteRow(i);
        }
    }
    $(document).bind("keydown", function(event) {
        event.stopPropagation();
        if (event.keyCode == "46") {
            $("#cssPropertiesTable tr").css("display", "none");
            $("#basePropertiesTable tr").css("display", "none");
            $(pageDiv.currentControl.element).remove();
            var name = pageDiv.currentControl.Json.baseProperties.name;
            for (var i = 0; i < pageDiv.Json.controls.length; i++) {
                if (pageDiv.Json.controls[i].baseProperties.name == name) {
                    pageDiv.Json.controls.splice(i, 1);
                }
            }
        }
    });
    function okList3T(item, dialog) {
        var items = [];
        pageDiv.currentControl.Json.items = items;
        $("#popMobilePropertyDiv").append(dialog.options.target)
        dialog.close(); $("#list3tDiv55").hide();
        var table = $("#list3tTableMobile")[0];
        for (var i = 0; i < table.rows.length; i++) {
            if ($(table.rows[i]).find("th").length > 0) continue;
            var columns = {
                title1: $(table.rows[i].cells[1]).find("input").val(),
                title2: $(table.rows[i].cells[2]).find("input").val(),
                title3: $(table.rows[i].cells[3]).find("input").val()
            };

            items.push(columns);
        }
        for (var i = table.rows.length - 1; i >= 0; i--) {
            if ($(table.rows[i]).find("th").length > 0) continue;
            table.deleteRow(i);
        }
        pageDiv.currentControl.Json.items = items;
        pageDiv.currentControl.changeItems();
    }
    $("#List3TOption").bind("click", function(event) {
        var items = pageDiv.currentControl.Json.items;
        var table = $("#list3tTableMobile")[0];
        for (var i = 0; i < items.length; i++) {
            (function() {
                addList3TRow(items[i]);
            })()
        }
        $.ligerDialog.open({ left: "15%", width: "580px", target: $("#list3tDiv55"), title: "设定字段的各个选项", buttons: [{ text: "确定", onclick: okList3T }, { text: "取消", onclick: cancleList3TDialog}] });
    });

    function addList3TRow(item) {
        var title1 = item.oneField;
        var title2 = item.twoField;
        var title3 = item.threeField;
        var table = $("#list3tTableMobile")[0];
        var tr = table.insertRow();
        var delTd = document.createElement("td");
        $(delTd).css("border", "1px solid black");
        $(delTd).html("<a style=\"cursor:pointer;\">删除</a>");
        $(delTd.childNodes[0]).bind("click", function() {
            $(tr).remove();
        });
        $(tr).append(delTd);
        var valueTd = document.createElement("td");
        $(valueTd).css("border", "1px solid black");
        $(valueTd).html("<input type='text' value='" + title1 + "' style='width:95%;font-size:12px;' />");
        $(tr).append(valueTd);
        var textTd = document.createElement("td");
        $(textTd).css("border", "1px solid black");
        $(textTd).html("<input type='text' value='" + title2 + "' style='width:95%;font-size:12px;' />");
        $(tr).append(textTd);
        var title3Td = document.createElement("td");
        $(title3Td).css("border", "1px solid black");
        $(title3Td).html("<input type='text' value='" + title3 + "' style='width:95%;font-size:12px;' />");
        $(tr).append(title3Td);
    }
    $("#basewidthInput").bind("change", function(event) {
        var value = $(this).val();
        if (!checkInteger(value)) {
            alert("宽度必须为整数!!");
            $(this).val(pageDiv.currentControl.Json.cssProperties.Width);
            return;
        }
        pageDiv.currentControl.Json.cssProperties.Width = value;
        pageDiv.currentControl.changeWidth();
    });
    $("#baseheightInput").bind("change", function(event) {
        var value = $(this).val();
        if (!checkInteger(value)) {
            alert("高度必须为整数!!");
            $(this).val(pageDiv.currentControl.Json.cssProperties.Height);
            return;
        }
        pageDiv.currentControl.Json.cssProperties.Height = value;
        pageDiv.currentControl.changeHeight();
    });

    $("#saveForm").bind("click", function() {
        var xmax = 0, i = 0, l = $("#designDiv ul").length, uls = $("#designDiv ul"), objs = Array();
        var ulAry = [];
        for (i = 0; i < l; i++) {
            var ul = new HBSJsUlControl();
            ulAry.push(ul);
            var l2 = uls.eq(i).find("li").length;
            var lis = uls.eq(i).find("li");
            for (var i2 = 0; i2 < l2; i2++) {
                var li = new HBSJsLiControl();
                li.pid = lis.eq(i2).attr("pid");
                ul.lis.push(li);
            }
        }
        var whetherSave = false;
        if (pageDiv.Json.controlType == "基础资料页面") {
            var controls = pageDiv.Json.controls;
            for (var i = 0; i < controls.length; i++) {

                if (controls[i].controlType == "textbox") {
                    if (controls[i].baseProperties.isField) {
                        whetherSave = true;
                        break;
                    }
                }
                if (controls[i].controlType == "checkbox") {
                    if (controls[i].baseProperties.isField) {
                        whetherSave = true;
                        break;
                    }
                }
                if (controls[i].controlType == "radio") {
                    if (controls[i].baseProperties.isField) {
                        whetherSave = true;
                        break;
                    }
                }
                if (controls[i].controlType == "select") {
                    if (controls[i].baseProperties.isField) {
                        whetherSave = true;
                        break;
                    }
                }
                if (controls[i].controlType == "image") {
                    if (controls[i].baseProperties.isField) {
                        whetherSave = true;
                        break;
                    }
                }
                if (controls[i].controlType == "date") {
                    if (controls[i].baseProperties.isField) {
                        whetherSave = true;
                        break;
                    }
                }
            }
        } else {
            whetherSave = true;
        }
        if (whetherSave) {
            pageDiv.Json.controlStr = ulAry;
            var pageStr = JSON.stringify(pageDiv.Json);
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
        } else {

            alert("当前为基础资料页面，必须要一个数据库控件类型！如果你不需要数据库，请更换浏览页面");
        }
    });
    $("#previewBt").bind("click", function() {
        window.open(encodeURI("/contentHmtl5.htm?name=" + pageDiv.Json.name));
    });
    $("#designPanel").bind("click", function() {
        pageDiv.createPropertiesDiv();
    });
    $(".readonlyClass").bind("click", function(event) {
        var select = $("input[name='readonlyRdo']:checked")[0];
        if (select.id == "readonly") {
            pageDiv.currentControl.Json.baseProperties.IsReadonly = true;
        }
        else {
            pageDiv.currentControl.Json.baseProperties.IsReadonly = false;
        }
    });
    $(".getDataType").bind("click", function() {
        var select = $("input[name='getDataTypeRdo']:checked").val();
        pageDiv.currentControl.Json.getDataType = select;
    });
    $("input[name='readonlyRdo']").bind("click", function() {
        var value = "";
        $("input[name='readonlyRdo']:checked").each(function(index, ele) {
            value = value + $(this).val() + ";";
        });
        value = value.substr(0, value.length - 1);
    });
    $(".disabledClass").bind("click", function(event) {
        var select = $("input[name='disabledRdo']:checked")[0];
        if (select.id == "disabled") {
            pageDiv.currentControl.Json.baseProperties.disabled = true;
        }
        else {
            pageDiv.currentControl.Json.baseProperties.disabled = false;
        }
    });
    $(".isFieldClass").bind("click", function(event) {
        var select = $("input[name='isFieldRdo']:checked")[0];
        if (select.id == "isField") {
            pageDiv.currentControl.Json.baseProperties.isField = true;
        }
        else {
            pageDiv.currentControl.Json.baseProperties.isField = false;
        }
    });
    $(".blockDisplay").bind("click", function(event) {
        var select = $("input[name='displayRdo']:checked")[0];
        if (select.id == "blockDisplay") {
            pageDiv.currentControl.Json.cssProperties.Display = true;
        }
        else {
            pageDiv.currentControl.Json.cssProperties.Display = false;
        }
    });
    $(".blockDisplay").bind("click", function(event) {
        var select = $("input[name='displayRdo']:checked")[0];
        if (select.id == "blockDisplay") {
            pageDiv.currentControl.Json.cssProperties.Display = true;
        }
        else {
            pageDiv.currentControl.Json.cssProperties.Display = false;
        }
    });
    $("#lineNumInput").bind("click", function(event) {
        $.ligerDialog.open({ target: $("#lineNumDiv"), title: "请选择字段的数据类型", buttons: [{ text: "确定", onclick: okLineNum }, { text: "取消", onclick: cancleDialog}] });

    });
    function okLineNum(item, dialog) {
        var selectRd = $(":radio[name='lineNumRd']:checked");
        var lineNumVal = selectRd.val();
        var typeText = selectRd.next().text();
        $("#lineNumInput").val(typeText);
        $("#popMobilePropertyDiv").append(dialog.options.target);
        dialog.close();
        pageDiv.currentControl.Json.lineNum = lineNumVal;
        pageDiv.currentControl.changeLineNum();
    }
    $("#FontSizeInput").bind("change", function(event) {
        var value = $(this).val();
        if (!checkInteger(value)) {
            alert("字体大小必须为整数!!");
            $(this).val(pageDiv.currentControl.Json.cssProperties.FontSize);
            return;
        }
        pageDiv.currentControl.Json.cssProperties.FontSize = value;
        pageDiv.currentControl.changeFontSize();
    });
    function okFontWeight(item, dialog) {
        var selectRd = $(":radio[name='fontweightRd']:checked");
        var fontweightType = selectRd.val();
        var typeText = selectRd.next().text();
        pageDiv.currentControl.Json.baseProperties.dataType = fontweightType;
        $("#dataTypeInput").val(typeText);
        $("#popMobilePropertyDiv").append(dialog.options.target);
        dialog.close();
        pageDiv.currentControl.changeFontWeight();
    }
    $("#FontWeightInput").bind("click", function(event) {
        $.ligerDialog.open({ target: $("#fontWeightDiv"), title: "请选择文本线条类型", buttons: [{ text: "确定", onclick: okFontWeight }, { text: "取消", onclick: cancleDialog}] });
    });

    $("#widthInput").bind("change", function(event) {
        var value = $(this).val();
        if (!checkInteger(value)) {
            alert("宽度必须为整数!!");
            $(this).val(pageDiv.currentControl.Json.cssProperties.Width);
            return;
        }
        pageDiv.currentControl.Json.cssProperties.Width = value;
        pageDiv.currentControl.changeWidth();
    });
    $("#heightInput").bind("click", function(event) {
        var value = $(this.value);
        if (!checkInteger(value)) {
            alert("高度必须为整数!!");
            $(this).val(pageDiv.currentControl.Json.cssProperties.Height);
            return;
        }
        pageDiv.currentControl.Json.cssProperties.Height = value;
        pageDiv.currentControl.changeHeight();
    });
    //禁止名称带有下划线、禁止名称带有.。
    $("#nameInput").bind("change", function(event) {
        var name = $(this).val();
        var index = name.indexOf('_');
        if (index >= 0) {
            alert("禁止名称带有下划线！！");
            $("#nameInput").val(pageDiv.currentControl.Json.name);
            return false;
        }
        index = name.indexOf('.');
        if (index >= 0) {
            alert("禁止名称带有.！！");
            $("#nameInput").val(pageDiv.currentControl.Json.name);
            return false;
        }
        index = name.indexOf(' ');
        if (index >= 0) {
            alert("禁止名称带有空格！！");
            $("#nameInput").val(pageDiv.currentControl.Json.name);
            return false;
        }
        if (/[A-Z]/.test(name)) {
            alert("禁止名称带有大写字母！！");
            $("#nameInput").val(pageDiv.currentControl.Json.name);
            return false;
        } else {

        }
        var flag = checkControlName(name, pageDiv, false);
        if (flag) {
            alert("已经存在名称为" + name + "的控件！！");
            $("#nameInput").val(pageDiv.currentControl.Json.name);
            return false;
        }

        pageDiv.currentControl.Json.name = name;
        pageDiv.currentControl.changeName();
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
        var controls = pageDiv.Json.controls;
        for (var i = 0; i < controls.length; i++) {
            if (controls[i].controlType == "image") {
                var image = controls[i];
                $(this.element).append("<p style=\"display:inline;\">控件名：" + image.baseProperties.name + "</p>&nbsp;&nbsp;&nbsp;&nbsp;<p style=\"display:inline;\">控件类型：" + image.controlType + "</p>&nbsp;&nbsp;&nbsp;&nbsp;");
                //<a style=\"display:inline;\" href='#'>选择</a>
                var a = document.createElement("a");
                $(a).css("display", "inline");
                $(a).html("选择");
                $(a).prop("controlName", image.baseProperties.name);
                $(a).prop("controlType", image.controlType);
                $(a).prop("href", "#");
                $(a).bind("click", function(event) {
                    //                alert($(this).prop("controlName"));
                    //                alert($(this).prop("controlType"));
                    var effect = pageDiv.currentControl.Json.effect;
                    effect.length = 0;
                    effect.push($(this).prop("controlName"));
                    effect.push($(this).prop("controlType"));
                    var pageId = pageDiv.Json.pageId;
                    $.ajax({ url: "/handler/pageFileDao.ashx", type: "POST", async: false, data: { mode: escape("getCompany"), pageId: escape(pageId) },
                        success: function(data) {
                            effect.push(data);


                        }, error: function(XMLHttpRequest, textStatus) {
                            alert(XMLHttpRequest.status);
                            alert(XMLHttpRequest.readyState);
                            alert(textStatus);
                            alert("出错了");
                        }
                    });
                    $("#uploadFileInput").val($(this).prop("controlName"));
                    $("#uploadFileInputMenu").remove();
                });
                $(this.element).append(a);
                $(this.element).append("<br/>");
            }
            if (controls[i].controlType == "fileListing") {
                var fileListing = controls[i];
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
                    var effect = pageDiv.currentControl.Json.effect;
                    effect.length = 0;
                    effect.push($(this).prop("controlName"));
                    effect.push($(this).prop("controlType"));
                    var pageId = pageDiv.Json.pageId;

                    $.ajax({ url: "/handler/pageFileDao.ashx", type: "POST", async: false, data: { mode: escape("getCompany"), pageId: escape(pageId) },
                        success: function(data) {
                            effect.push(data);
                            if ($(this).prop("controlType") == "fileListing") {
                                for (var j = 0; j < controls.length; j++) {
                                    if (controls[j].name == $(this).prop("controlName")) {
                                        controls[j].FileListPage = data;
                                    }
                                }
                            }

                        }, error: function(XMLHttpRequest, textStatus) {
                            alert(XMLHttpRequest.status);
                            alert(XMLHttpRequest.readyState);
                            alert(textStatus);
                            alert("出错了");
                        }
                    });
                    $("#uploadFileInput").val($(this).prop("controlName"));
                    $("#uploadFileInputMenu").remove();
                });
                $(this.element).append(a);
                $(this.element).append("<br/>");
            }

        }


    });
    $("#imageSrcInput").bind("click", function(event) {
        //        var liHref = $(this).val();
        //        flotGetPageDiv.currentControl.changeImageSrc(liHref);

        var pageId = pageDiv.Json.pageId;
        selectImage("", pageId); return;
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

    $("#liTextInput").bind("change", function(event) {
        var liText = $(this).val();
        pageDiv.currentControl.changeLiText(liText);
    });
    $("#linkEmbedInput").bind("change", function(event) {
        var linkEmbed = $(this).val();
        pageDiv.currentControl.changelinkEmbed(linkEmbed);
    });

    //    $("#liHrefInput").bind("change", function(event) {
    //        var liHref = $(this).val();
    //        pageDiv.currentControl.changeliHref(liHref);
    //    });
    $("#liHrefInput").bind("click", function(event) {
        var pageId = pageDiv.Json.pageId;
        $("#liHrefInputMenu").remove();
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
        this.element.id = "liHrefInputMenu";
        $(this.element).css("overflow", "auto");
        var deleteDiv = document.createElement("div");
        deleteDiv.style.width = "100%";
        deleteDiv.style.height = "20px";
        $(deleteDiv).css("border", "#9e9e9e 0.5px solid");
        $(deleteDiv).css("text-align", "right");
        $(deleteDiv).append("<p style='cursor:pointer;'>关闭</p>");
        $(deleteDiv.firstChild).on("click", function() { $("#liHrefInputMenu").remove(); });
        $(this.element).append(deleteDiv);
        document.body.appendChild(this.element);
        var ar = ['文件夹', '页面'];
        var field = new HBSNodeFormat("name", "text", false, ar);
        var fields = [];
        fields.push(field);
        var field1 = new HBSNodeFormat("datatype", "select", true, ar);
        fields.push(field1);
        var tree = new HBSTreeDiv();
        //    tree.rootId = 46;
        tree.Json.preButton = null;
        tree.Json.addleInfo = "";
        tree.Json.tableName = "tbdatainfo";
        tree.Json.fields = fields;
        tree.Json.hasMenu = true;
        tree.Json.imageField = 1;
        var treeIcon = new HBSTreeIcon("页面", "/resource/images/common/yemian.gif", "/resource/images/common/yemian.gif", "/resource/images/common/yemian.gif");
        tree.Json.icons.push(treeIcon);
        var treeIcon = new HBSTreeIcon("文件夹", "/resource/images/common/open.bmp", "/resource/images/common/guan.bmp", "/resource/images/common/guan.bmp");
        tree.Json.icons.push(treeIcon);
        var dataStr = '{"id":"1","values":[{"value":"深度科技"},{"value":"organ"},{"value":"asd"}],"isLeaf":"true","order":"35","parentId":"0","children":[]}';
        var json = eval('(' + dataStr + ')');
        json.fields = fields;
        tree.createRootNode();
        var treeDiv = document.createElement("div");
        $(treeDiv).append(tree.element);
        $(this.element).append(treeDiv);
        tree.clickNode = function(node, nodeJson) {
            if (nodeJson.values[1].value == "页面") {
                $("#liHrefInputMenu").remove();
                var liHref = nodeJson.values[0].value;
                $("#liHrefInput").val(liHref);
                pageDiv.currentControl.changeliHref(liHref);
            } else {

            }
        }

    });
    $("#okDataType").bind("click", function() {
        $.ligerDialog.close();
    });
    $("#cancleDataType").bind("click", function() {
        $.ligerDialog.close();
    });
    function okDataType(item, dialog) {
        var selectRd = $(":radio[name='dataTypeRd']:checked");
        var dataType = selectRd.val();
        var typeText = selectRd.next().text();
        pageDiv.currentControl.Json.baseProperties.dataType = dataType;
        $("#dataTypeInput").val(typeText);
        $("#popMobilePropertyDiv").append(dialog.options.target);
        dialog.close();
    }
    function cancleDialog(item, dialog) {
        $("#popMobilePropertyDiv").append(dialog.options.target);
        dialog.close();
    }
    $("#dataTypeInput").bind("click", function(event) {
        $.ligerDialog.open({ target: $("#dataTypeDiv"), title: "请选择字段的数据类型", buttons: [{ text: "确定", onclick: okDataType }, { text: "取消", onclick: cancleDialog}] });
    });
    function okColumns(item, dialog) {
        var items = [];
        pageDiv.currentControl.Json.columns = items;
        $("#popMobilePropertyDiv").append(dialog.options.target)
        dialog.close(); $("#columnsDiv").hide();
        var table = $("#columnsTable")[0];
        for (var i = 0; i < table.rows.length; i++) {
            if ($(table.rows[i]).find("th").length > 0) continue;

            var columns = {
                name: $(table.rows[i].cells[1]).find("input").val(),
                domType: $(table.rows[i].cells[2]).find("select option:selected").val(),
                isField: $(table.rows[i].cells[3]).find("select option:selected").val(),
                data: $(table.rows[i].cells[4]).find("input").val(),
                dataType: $(table.rows[i].cells[5]).find("select option:selected").val(),
                dataLength: $(table.rows[i].cells[6]).find("input").val(),
                importViewField: $(table.rows[i].cells[7]).find("select option:selected").val(),
                display: $(table.rows[i].cells[8]).find("select option:selected").val(),
                show: "block",
                width: "100px"
            };

            items.push(columns);
        }
        for (var i = table.rows.length - 1; i >= 0; i--) {
            if ($(table.rows[i]).find("th").length > 0) continue;
            table.deleteRow(i);
        }
        pageDiv.currentControl.Json.columns = items;
        pageDiv.currentControl.changeColumns();
    }
    $("#addTableColumn").bind("click", function() {
        var column = new HBSJsListTableColumn();
        //pageDiv.currentControl.Json.columns.push(column);
        addTableColumn(column);
    });

    function addTableColumn(column) {
        var table = $("#columnsTable")[0];
        var tr = table.insertRow();
        var delTd = document.createElement("td");
        $(delTd).css("border", "1px solid black");
        $(delTd).html("<a style=\"cursor:pointer;\">删除</a>");
        $(delTd.childNodes[0]).bind("click", function() {
            $(tr).remove();
        });
        $(tr).append(delTd);
        var nameTd = document.createElement("td");
        $(nameTd).css("border", "1px solid black");
        $(nameTd).html("<input type='text' value='" + column.name + "' style='width:95%;font-size:12px;' />");
        $(nameTd.childNodes[0]).bind("change", function() {
            var name = $(this).val();
            var index = name.indexOf('_');
            if (index >= 0) {
                alert("禁止名称带有下划线！！");
                $("#nameInput").val(pageDiv.currentControl.Json.name);
                return false;
            }
            index = name.indexOf('.');
            if (index >= 0) {
                alert("禁止名称带有.！！");
                $("#nameInput").val(pageDiv.currentControl.Json.name);
                return false;
            }
            index = name.indexOf(' ');
            if (index >= 0) {
                alert("禁止名称带有空格！！");
                $("#nameInput").val(pageDiv.currentControl.Json.name);
                return false;
            }
            if (/[A-Z]/.test(name)) {
                alert("禁止名称带有大写字母！！");
                $("#nameInput").val(pageDiv.currentControl.Json.name);
                return false;
            }
            column.name = name;
            column.display = name;
        });
        $(tr).append(nameTd);
        var domTypeTd = document.createElement("td");
        $(domTypeTd).css("border", "1px solid black");
        $(domTypeTd).html("<select style='width:95%;font-size:12px;'><option value='text' " + (column.domType == "text" ? "selected='selected'" : "") + ">文本框</option><option value='select' " + (column.domType == "select" ? "selected='selected'" : "") + ">列表框</option><option value='date' " + (column.domType == "date" ? "selected='selected'" : "") + ">日期控件</option></select>");
        $(tr).append(domTypeTd);
        var isFieldTd = document.createElement("td");
        $(isFieldTd).css("border", "1px solid black");
        $(isFieldTd).html("<select style='width:95%;font-size:12px;'><option value='isField' " + (column.isField == "isField" ? "selected='selected'" : "") + ">字段</option><option value='notField' " + (column.isField == "notField" ? "selected='selected'" : "") + ">不是</option></select>");
        $(tr).append(isFieldTd);
        var dataTd = document.createElement("td");
        $(dataTd).css("border", "1px solid black");
        $(dataTd).html("<input type='text' value='" + column.data + "' style='width:95%;font-size:12px;' />");
        $(tr).append(dataTd);
        var dataTypeTd = document.createElement("td");
        $(dataTypeTd).css("border", "1px solid black");
        $(dataTypeTd).html("<select style='width:95%;font-size:12px;'><option value='nvarchar'" + (column.dataType == "nvarchar" ? "selected='selected'" : "") + ">字符串</option><option value='int' " + (column.dataType == "int" ? "selected='selected'" : "") + ">整数</option><option value='decimal' " + (column.dataType == "decimal" ? "selected='selected'" : "") + ">小数</option></select>");
        $(dataTypeTd.childNodes[0]).val(column.dataType);
        $(tr).append(dataTypeTd);
        var dataLengthTd = document.createElement("td");
        $(dataLengthTd).css("border", "1px solid black");
        $(dataLengthTd).html("<input type='text' value='" + column.dataLength + "' style='width:95%;font-size:12px;' />");
        $(tr).append(dataLengthTd);
        var importViewFieldTd = document.createElement("td");
        $(importViewFieldTd).css("border", "1px solid black");
        $(importViewFieldTd).html("<select style='width:95%;font-size:12px;' /></select>");
        $(tr).append(importViewFieldTd);
        var displayTd = document.createElement("td");
        $(displayTd).css("border", "1px solid black");
        $(displayTd).html("<select style='width:95%;font-size:12px;'><option value='block' " + (column.display == "block" ? "selected='selected'" : "") + ">可视</option><option value='none' " + (column.display == "none" ? "selected='selected'" : "") + ">隐藏</option></select>");
        $(tr).append(displayTd);
    }
    $("#columnsInput").bind("click", function(event) {
        var table = $("#columnsTable")[0];
        for (var i = table.rows.length - 1; i >= 0; i--) {
            if ($(table.rows[i]).find("th").length > 0) continue;
            table.deleteRow(i);
        }
        for (var i = 0; i < pageDiv.currentControl.Json.columns.length; i++) {
            (function() {
                var column = pageDiv.currentControl.Json.columns[i];
                addTableColumn(column);
            })()
        }
        $("#columnsDiv").show();
        $.ligerDialog.open({ target: $("#columnsDiv"), left: "15%", width: "580px", height: "250px", title: "设置表格的列", buttons: [{ text: "确定", onclick: okColumns }, { text: "取消", onclick: function(item, dialog) { cancleDialog(item, dialog); $("#columnsDiv").hide(); } }] });
    });
    $("#dateFormatInput").bind("click", function(event) {

    });
    $("#controlTypeInput").bind("click", function(event) {
        var popDiv = createPopPropertyDiv(event);
        var ulData = new HBSUlData();
        ulData.propertyName = "controlType";
        ulData.propertyType = "";
        var l1 = new HBSLiData('基础资料页面', '基础资料页面');
        ulData.liAry.push(l1);
        var l2 = new HBSLiData('浏览页面', '浏览页面');
        ulData.liAry.push(l2);
        createPopUl(ulData, event);
    });
    $("#pageTypeInput").bind("click", function(event) {
        var popDiv = createPopPropertyDiv(event);
        var ulData = new HBSUlData();
        ulData.propertyName = "pageType";
        ulData.propertyType = "";
        var l1 = new HBSLiData('基础资料页面', '基础资料页面');
        ulData.liAry.push(l1);
        var l2 = new HBSLiData('浏览页面', '浏览页面');
        ulData.liAry.push(l2);
        createPopUl(ulData, event);
    });
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
    $("#datasourceInput").bind("click", function(event) {
        var datasourceId = pageDiv.currentControl.Json.datasource.id;
        var controlsStr = "";
        window.open("/dataview.htm?id=" + datasourceId + "&controlsStr=" + encodeURIComponent(controlsStr));
    });
    function createPopUl(ulData, event) {
        var src = event.target;
        var l = $(src).parent().prev().offset().left;
        var t = $(src).offset().top + 20;
        var ul = $("#setMobilePropertyUl")[0];
        $("#setMobilePropertyUl").html("");
        var propertyType = ulData.propertyType;
        var propertyName = ulData.propertyName;
        var liAry = ulData.liAry;
        var height = 25 * (liAry.length + 1);
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
                        str = 'pageDiv.currentControl.Json.cssProperties.' + propertyName + ' = val';
                    }
                    else if (propertyType == "base") {
                        str = 'pageDiv.currentControl.Json.baseProperties.' + propertyName + ' = val';
                    }
                    else {
                        str = 'pageDiv.currentControl.Json.' + propertyName + ' = val';
                    }

                    eval(str);
                    if (propertyType == "css") {
                        str = 'pageDiv.currentControl.change' + propertyName + '()';
                        eval(str);
                    }
                    if (propertyName == "listImgSrc") {
                        pageDiv.currentControl.changelistImgSrc();
                    }
                });
            })()
        }
        var getValueStr = "";
        if (propertyType == "css") {
            getValueStr = 'pageDiv.currentControl.Json.cssProperties.' + propertyName;
        }
        else if (propertyType == "base") {
            getValueStr = 'pageDiv.currentControl.Json.baseProperties.' + propertyName;
        }
        else {
            getValueStr = 'pageDiv.currentControl.Json.' + propertyName;
        }
        var theV = eval('(' + getValueStr + ')');
        $('input:radio[id="' + theV + '"]').attr("checked", true);
        $.ligerDialog.open({ target: $("#setMobilePropertyDiv"), width: 250, left: l, top: t, title: "设定" + propertyName + "属性" });
    }
    $("#dataLengthInput").bind("change", function(event) {
        var value = $(this.value);
        if (!checkInteger(value)) {
            alert("数据长度必须为整数!!");
            $(this).val(pageDiv.currentControl.Json.baseProperties.dataLength);
            return;
        }
        pageDiv.currentControl.Json.baseProperties.dataLength = value;
    });
    $("#staticParameterInput").bind("click", function(event) {
        getDataviewOutputs(event, "staticParameter");
    });
    $("#valueFieldInput").bind("click", function(event) {
        getDataviewOutputs(event, "valueField");
    });
    $("#textFieldInput").bind("click", function(event) {
        getDataviewOutputs(event, "textField");
    });
    $("#oneFieldInput").bind("click", function(event) {
        getDataviewOutputs(event, "oneField");
    });
    $("#listImgSrcInput").bind("click", function(event) {
        getDataviewOutputs(event, "listImgSrc");

    });
    $("#listImgSrcInput").bind("change", function(event) {
        pageDiv.currentControl.Json.listImgSrc = "";
        pageDiv.currentControl.changelistImgSrc();
    });
    $("#lineNumSrcInput").bind("click", function(event) {
        getDataviewOutputs(event, "lineNumSrc");
    });
    $("#twoFieldInput").bind("click", function(event) {
        getDataviewOutputs(event, "twoField");
    });
    $("#threeFieldInput").bind("click", function(event) {
        getDataviewOutputs(event, "threeField");
    });
    $("#linkUrlInput").bind("click", function(event) {
        getDataviewOutputs(event, "linkUrl");
    });
    $("#staticUrlInput").bind("click", function(event) {
        var pageId = pageDiv.Json.pageId;
        $("#staticUrlInputMenu").remove();
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
        this.element.id = "staticUrlInputMenu";
        $(this.element).css("overflow", "auto");
        var deleteDiv = document.createElement("div");
        deleteDiv.style.width = "100%";
        deleteDiv.style.height = "20px";
        $(deleteDiv).css("border", "#9e9e9e 0.5px solid");
        $(deleteDiv).css("text-align", "right");
        $(deleteDiv).append("<p style='cursor:pointer;'>关闭</p>");
        $(deleteDiv.firstChild).on("click", function() { $("#staticUrlInputMenu").remove(); });
        $(this.element).append(deleteDiv);
        document.body.appendChild(this.element);
        var ar = ['文件夹', '页面'];
        var field = new HBSNodeFormat("name", "text", false, ar);
        var fields = [];
        fields.push(field);
        var field1 = new HBSNodeFormat("datatype", "select", true, ar);
        fields.push(field1);
        var tree = new HBSTreeDiv();
        //    tree.rootId = 46;
        tree.Json.preButton = null;
        tree.Json.addleInfo = "";
        tree.Json.tableName = "tbdatainfo";
        tree.Json.fields = fields;
        tree.Json.hasMenu = true;
        tree.Json.imageField = 1;
        var treeIcon = new HBSTreeIcon("页面", "/resource/images/common/yemian.gif", "/resource/images/common/yemian.gif", "/resource/images/common/yemian.gif");
        tree.Json.icons.push(treeIcon);
        var treeIcon = new HBSTreeIcon("文件夹", "/resource/images/common/open.bmp", "/resource/images/common/guan.bmp", "/resource/images/common/guan.bmp");
        tree.Json.icons.push(treeIcon);
        var dataStr = '{"id":"1","values":[{"value":"深度科技"},{"value":"organ"},{"value":"asd"}],"isLeaf":"true","order":"35","parentId":"0","children":[]}';
        var json = eval('(' + dataStr + ')');
        json.fields = fields;
        tree.createRootNode();
        var treeDiv = document.createElement("div");
        $(treeDiv).append(tree.element);
        $(this.element).append(treeDiv);
        tree.clickNode = function(node, nodeJson) {
            if (nodeJson.values[1].value == "页面") {
                //                alert(nodeJson.values[0].value);
                $("#staticUrlInputMenu").remove();
                var liHref = nodeJson.values[0].value;
                $("#staticUrlInput").val(liHref);
                pageDiv.currentControl.changestaticUrl(liHref);
            } else {

            }
        }
    });
    $("#importViewFieldInput").bind("propertychange", function(event) {
        alert();
        var value = $(this).val();
        if (value != "空值" && value != "") {
            $("#nameInput").attr("disabled", true);
            $("#valueFieldInput").attr("disabled", true);
            $("#textFieldInput").attr("disabled", true);
            $("#domTypeInput").attr("disabled", true);
            $("#domTypeInput").val("标签");
            pageDiv.currentControl.Json.baseProperties.valueField = "";
            pageDiv.currentControl.Json.baseProperties.textField = "";
            pageDiv.currentControl.Json.domType = "label";
            $("#nameInput").val($(this).val());
            pageDiv.currentControl.Json.name = $(this).val();
            pageDiv.currentControl.changeName($(this).val());
        }
        else {
            $("#nameInput").attr("disabled", false);
            $("#valueFieldInput").attr("disabled", false);
            $("#textFieldInput").attr("disabled", false);
            $("#domTypeInput").attr("disabled", false);
        }
    });
    $("#importViewFieldInput").bind("click", function(event) {
        getDataviewOutputs(event, "importViewField");
    });
    function getDataviewOutputs(event, propertyName) {
        var dvJsonStr = "";
        var dvJson = null;
        var dvId = -1;
        if (pageDiv.currentControl.Json.controlType == "listTableColumn") {
            dvJsonStr = pageDiv.currentControl.tableDiv.dvJson;
            if (dvJsonStr == null || dvJsonStr == "") {
                dvId = pageDiv.currentControl.tableDiv.Json.datasource.id;
            }
        }
        else {
            dvJsonStr = pageDiv.currentControl.dvJson;
            if (dvJsonStr == null || dvJsonStr == "") {
                dvId = pageDiv.currentControl.Json.datasource.id;
            }
        }
        if (dvJsonStr == null || dvJsonStr == "") {
            if (dvId <= 0) {
                alert("还没有设定引用句的视图，请先设置视图！！");
                return false;
            }
            $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getDataviewById", dvId: escape(dvId) },
                success: function(data) {
                    if (data.IsSuccess) {
                        dvJson = data.Data;
                        if (dvJson == null) {
                            alert("还没有设定引用的视图，请先设置视图！！");
                        }
                        else {
                            createDvOutputsSelect(dvJson, event, propertyName);
                        }
                    }
                    else {
                        alert(data.Message);
                    }
                }
            });
        }
        else {
            dvJson = eval('(' + dvJsonStr + ')');
            if (dvJson == null) {
                alert("还没有设定引用的视图，请先设置视图！！");
            }
            else {
                createDvOutputsSelect(dvJson, event, propertyName);
            }
        }
    }
    function createDvOutputsSelect(dvJson, event, propertyName) {
        var ulData = new HBSUlData();
        ulData.propertyName = propertyName;
        ulData.propertyType = "";
        var fieldStr = "";
        for (var i = 0; i < dvJson.tables.length; i++) {
            var table = dvJson.tables[i];
            for (var k = 0; k < table.Fields.length; k++) {
                var field = table.Fields[k];
                if (field.IsOutput) {
                    var name = field.Name;
                    //                    fieldStr = fieldStr + name + ";";
                    var l = new HBSLiData(name, name);
                    ulData.liAry.push(l);
                }
            }
        }
        //        alert(fieldStr);
        createPopUl(ulData, event);
    }
    $("#regexInput").bind("click", function(event) {
        var ulData = new HBSUlData();
        ulData.propertyName = "regex";
        ulData.propertyType = "";
        var l = new HBSLiData("没有规则", "没有规则");
        ulData.liAry.push(l);
        var l = new HBSLiData("电子邮件", "电子邮件");
        ulData.liAry.push(l);
        var l = new HBSLiData("手机号码", "手机号码");
        ulData.liAry.push(l);
        var l = new HBSLiData("网址", "网址");
        ulData.liAry.push(l);
        var l = new HBSLiData("整数", "整数");
        ulData.liAry.push(l);
        var l = new HBSLiData("小数", "小数");
        ulData.liAry.push(l);
        createPopUl(ulData, event);
    });
    function okItems(item, dialog) {
        var items = [];
        pageDiv.currentControl.Json.items = items;
        $("#popMobilePropertyDiv").html();
        $("#popMobilePropertyDiv").append(dialog.options.target)
        dialog.close(); $("#itemsDiv").hide();
        var table = $("#itemsTable")[0];
        for (var i = 0; i < table.rows.length; i++) {
            if ($(table.rows[i]).find("th").length > 0) continue;
            var value = $(table.rows[i].cells[1]).find("input").val();
            var text = $(table.rows[i].cells[2]).find("input").val();
            items.push(new HBSJsItem(text, value));
        }
        for (var i = table.rows.length - 1; i >= 0; i--) {
            if ($(table.rows[i]).find("th").length > 0) continue;
            table.deleteRow(i);
        }
        pageDiv.currentControl.Json.items = items;
        pageDiv.currentControl.changeItems();
    }
    function cancleItemDialog(item, dialog) {
        var table = $("#itemsTable")[0];
        for (var i = table.rows.length - 1; i >= 0; i--) {
            if ($(table.rows[i]).find("th").length > 0) continue;
            table.deleteRow(i);
        }
        $("#popMobilePropertyDiv").append(dialog.options.target);
        dialog.close();
        $("#itemsDiv").hide();
    }
    $("#optionInput").bind("click", function(event) {
        var items = pageDiv.currentControl.Json.items;
        var table = $("#itemsTable")[0];
        for (var i = 0; i < items.length; i++) {
            (function() {
                addItemRow(items[i]);
            })()
        }
        $.ligerDialog.open({ target: $("#itemsDiv"), title: "设定字段的各个选项", buttons: [{ text: "确定", onclick: okItems }, { text: "取消", onclick: cancleItemDialog}] });
    });
    $("#addItemA").bind("click", function() {
        addItemRow(new HBSJsItem("", ""));
    });
    function addItemRow(item) {
        var text = item.text;
        var value = item.value;
        var table = $("#itemsTable")[0];
        var tr = table.insertRow();
        var delTd = document.createElement("td");
        $(delTd).css("border", "1px solid black");
        $(delTd).html("<a style=\"cursor:pointer;\">删除</a>");
        $(delTd.childNodes[0]).bind("click", function() {
            $(tr).remove();
        });
        $(tr).append(delTd);
        var valueTd = document.createElement("td");
        $(valueTd).css("border", "1px solid black");
        $(valueTd).html("<input type='text' value='" + value + "' style='width:95%;font-size:12px;' />");
        $(tr).append(valueTd);
        var textTd = document.createElement("td");
        $(textTd).css("border", "1px solid black");
        $(textTd).html("<input type='text' value='" + text + "' style='width:95%;font-size:12px;' />");
        $(tr).append(textTd);
    }
    var fieldReplace = $("<li class='l-fieldcontainer l-fieldcontainer-r'></li>").appendTo("body").hide();
    var currentLi = null;
    $("#controlToolbox label").ligerDrag({ proxy: function() {
        var div = $("<div class='fieldproxy'></div>");
        div.add(fieldReplace).width("190px");
        div.add(fieldReplace).height("28px");
        div.appendTo('body');
        return div;
    },
        revert: true, receive: '#designDiv',
        onDragEnter: function(obj, target, e) {

            currentLi = obj;

        },
        onDragLeave: function(obj, target, e) {

            currentLi = null;

        },
        onDrag: function(current, e) { },
        onStopDrag: function(current, e) {
             var controlType = current.target[0].id;
            //得到所在的行
            addobj = getRowUl(e.pageX, e.pageY, controlType);
        
            if (!addobj) return;
            dragging = false;
            var controlDiv = null;
            $(".selectLi").removeClass("selectLi");
            var controlDiv = createControlDiv(controlType, pageDiv, true);
            if (controlDiv != null) {
                var addinx = -1;
                if (!$(addobj).hasClass("addsub")) pageDiv.Json.controls.push(controlDiv.Json);
                
                controlDiv.Json.baseProperties.order = $(currentLi).attr("order");
                controlDiv.pageDiv = pageDiv;
                //controlDiv.createElement();
                controlDiv.createHTML5Element();
                var controlDom = controlDiv.element;
                var ul = document.createElement("ul");
                $(ul).addClass("toswlp");
                var li = document.createElement("li");
                $(ul).attr("pid", editpage_ulindex);
                controlDiv.Json.ulindex =parseInt(editpage_ulindex);
                $(li).css("float", "none");
                $(li).css("width", "100%");
                $(li).addClass("isswlp");
                $(li).append(controlDom);
                $(li).attr("pid", 0);
                $(li).attr("inx", addinx);
                $(ul).append(li);
                var deleteC = document.createElement("a");
                $(deleteC).attr("href", "#");
                $(deleteC).css("position", "absolute");
                //                    $(deleteC).css("top", "10px");
                //                    $(deleteC).css("left", "100px");
                //                $(deleteC).css("z-index","9999");
                $(deleteC).css("z-index", "9999");
                $(deleteC).html("删除");
                $(deleteC).css("display", "none");
                $(deleteC).css("right", "1px");
                $(deleteC).on("click", function() {
                    $(deleteC).remove();
                    $(controlDiv.element).remove();
                    for (var i = 0; i < controlDiv.pageDiv.Json.controls.length; i++) {
                        if (controlDiv.pageDiv.Json.controls[i].baseProperties.name == controlDiv.Json.baseProperties.name) {
                            controlDiv.pageDiv.Json.controls.splice(i, 1);
                        }
                    }

                });
                $(li).append(deleteC);
                $(li).on("mousemove", function() {
                    $(deleteC).css("display", "");

                });
                $(li).on("mouseout", function() {
                    $(deleteC).css("display", "none");
                });
                controlDiv.Json.liindex =parseInt(Number($(li).attr("pid")));
                if (addobj != null) { editpage_ulindex++; $(addobj).append(ul).trigger("create"); }
                else {
                    $(addobj).append(li).trigger("create");
                    $(li).attr("pid", $(addobj).find("li").length - 1);
                    controlDiv.Json.liindex = parseInt(Number($(li).attr("pid")));
                    controlDiv.Json.ulindex = parseInt(Number($(li).parent().attr("pid")));
                }
                $("#designDiv .toswlp .isswlp").ligerDrag(editpageLightUiarr);

                //在排板网格里进行添加控件
                var gridParent = $(controlDiv.element).parent().parent().parent().parent();
                var id = $(gridParent).attr("marfindex");
                for (var k = 0; k < pageDiv.Json.controls.length; k++) {
                    if (id == null) break;
                    if (pageDiv.Json.controls[k].makfIndex == id) {
                        pageDiv.Json.controls[k].childControls[pageDiv.Json.controls[k].childControls.length] = controlDiv.Json;
                        controlDiv.Json.liindex = parseInt($(controlDiv.element).parent().parent().parent().attr("liindex"));
                        controlDiv.Json.ulindex =parseInt($(controlDiv.element).parent().parent().parent().attr("ulindex"));
                        break;
                    }
                }
                
            }
        }
    });
});

var editpageLightUiarr = { revert: true, receive: '#designDiv',
    proxy: 'clone',
    onStartDrag: function() { window.editpageLightUiStartDrag = 0; },
    onDrag: function(current, e) {
        this.proxy.css("z-index", 99999);
        this.proxy.css("background", "#ffffff");
        this.proxy.css("border", "1px solid #cccccc");
        this.proxy.css("filter", "alpha(opacity=50)");
        this.proxy.css("-moz-opacity", "0.5");
        this.proxy.css("-khtml-opacity", " 0.5");
        this.proxy.css("opacity", " 0.5");
        if (editpageLightUiStartDrag > 0) return; editpageLightUiStartDrag = 1; window.editpageLightUiDragX = e.pageX; window.editpageLightUiDragY = e.pageY;
    },
    onStopDrag: function(source, e) {
        this.proxy.hide();
        if (editpageLightUiStartDrag != 1) return;
        if (e.pageX >= editpageLightUiDragX - 1
	   && e.pageX <= editpageLightUiDragX + 1
	   && e.pageY >= editpageLightUiDragY - 1
	   && e.pageY <= editpageLightUiDragY + 1) return;
        editpageLightUiStartDrag = 0;
        //得到所在的行
        addobj = getRowUl(e.pageX, e.pageY,'');
        var par = $(source.context).parent();

        var ul = document.createElement("ul");
        $(ul).addClass("toswlp");
        $(ul).append(source.context);

        if (addobj == null) $("#designDiv").append(ul);
        else $(addobj).append(source.context);

    }
};

function getRowUl(mex, mey, controlType) {
    if (mex < $("#formDesign").offset().left) return null;
    if (mex > $("#formDesign").offset().left + $("#formDesign").width()) return null;
    if (mey < $("#formDesign").offset().top) return null;
    if (mey > $("#formDesign").offset().top + $("#formDesign").height()) return null;

    var i = 0, l = $("#designDiv .addsub").length, uls = $("#designDiv .addsub");
    for (i = 0; i < l; i++) {
        if (mex >= uls.eq(i).offset().left && mex <= uls.eq(i).offset().left + uls.eq(i).width()
        && mey >= uls.eq(i).offset().top && mey <= uls.eq(i).offset().top + uls.eq(i).height()) {
            if (uls.eq(i).html().length > 0) return null;
            if (controlType == "header" || controlType == "footer" || controlType == "grid") return null;
            return uls.eq(i);
        }
    }
        
    return $("#designDiv");

    var i = 0, l = $("#designDiv ul").length, uls = $("#designDiv ul")
    if (l < 1) return null;
    //得到所在的行
    for (i = 0; i < l; i++) {
        if (mey < uls.eq(i).offset().top) continue;
        if (mey > uls.eq(i).offset().top + uls.eq(i).height()) continue;
        //该行还可以添加吗？
        return null;
    }
    return null;
}
function fuzhigeiImageSrc(a) {
    //alert($(a).prop("imageSrc"));
    flotGetPageDiv.currentControl.changeImageSrc($(a).attr("imageSrc"));
    $("#imageSrcInputMenu").remove();
}