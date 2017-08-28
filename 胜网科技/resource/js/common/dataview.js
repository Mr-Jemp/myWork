$(function(event) {
    $(document).bind("contextmenu", function(e) {
        return false;
    });
    $("#bottomDiv").tabs({ activate: function(event, ui) {

    }
    });
    var dataviewId = 3;
    var controlsOpStr = "";
    try {
        var theurl = window.location.href;
        var queryStr = theurl.split('?')[1];
        var idStr = queryStr.split("&")[0];
        dataviewId = idStr.split('=')[1];
        var controls = queryStr.split("&")[1];
        controlsOpStr = controls.split("=")[1];
        controlsOpStr = decodeURIComponent(controlsOpStr);
    }
    catch (e) {

    }
    function addOutputTableRow(tableJson, fieldJson) {
        var row = $("#fieldsTable")[0].insertRow();
        var fieldName = fieldJson.Name;
        var tableName = tableJson.PageName;
        var alias = fieldJson.Alias;
        var tableTd = document.createElement("td");
        $(tableTd).html("<label>" + tableName + "</label>");
        $(tableTd).css("border", "1px solid black");
        $(row).append(tableTd);
        var fieldTd = document.createElement("td");
        $(fieldTd).html("<label>" + fieldName + "</label>");
        $(fieldTd).css("border", "1px solid black");
        $(row).append(fieldTd);
        var methodTd = document.createElement("td");
        if (dv.isGroup == false) {
            $(methodTd).css("display", "none");
        }
        $(methodTd).addClass("groupCell");
        $(methodTd).html("<select style='width:85%;font-size:12px;'><option value='count'>计数</option><option value='sum'>求和</option><option value='max'>最大值</option><option value='min'>最小值</option><option value='avg'>平均值</option></select>");
        $(methodTd).css("border", "1px solid black");
        $(row).append(methodTd);
        $(methodTd.childNodes[0]).bind("change", function(event) {
            fieldJson.GetValueMethod = $(this).val();
        });
        var groupTd = document.createElement("td");
        $(groupTd).addClass("groupCell");
        if (dv.isGroup == false) {
            $(groupTd).css("display", "none");
        }
        $(groupTd).html("<input type='checkbox' />");
        $(groupTd.childNodes[0]).bind("click", function() {
            if (this.checked) {
                fieldJson.IsGroup = true;
            }
            else {
                fieldJson.IsGroup = false;
            }
        });
        $(groupTd).css("border", "1px solid black");
        $(row).append(groupTd);
        var aliasTd = document.createElement("td");
        $(aliasTd).html("<input type='text' value='" + alias + "' style='width:95%;font-size:12px;'/>");
        $(aliasTd.childNodes[0]).bind("change", function() {
            fieldJson.Alias = this.value;
        });
        $(aliasTd).css("border", "1px solid black");
        $(row).append(aliasTd);
    }
    function deleteOutputTableRow(tableJson, fieldJson) {
        fieldJson.IsOutput = false;
        var table = $("#fieldsTable")[0];
        for (var i = 0; i < table.rows.length; i++) {
            var tableName = $(table.rows[i].cells[0]).text();
            var fieldName = $(table.rows[i].cells[1]).text();
            if (tableName == tableJson.PageName && fieldName == fieldJson.Name) {
                $(table.rows[i]).remove();
            }
        }
    }
    var GHKImportTable = function(tableJson) {
        if (tableJson.Fields.length == 0) {
            return;
        }
        var tablesCount = $("#rightDiv").find("table").length;
        var tablediv = document.createElement("div");
        tablediv.style.width = "165px";
        tablediv.id = "Table" + tableJson.PageName + "Div";
        tablediv.style.backgroundColor = "gray";
        $(tablediv).css("position", "absolute");
        $(tablediv).addClass("tableDiv");
        $(tablediv).attr("pageName", tableJson.PageName);
        tablediv.style.left = tableJson.Left;
        tablediv.style.top = tableJson.Top;
        $("#rightDiv").append(tablediv);
        $(tablediv).draggable(
        {
            stop: function(event, ui) {
                var left = ui.position.left;
                var top = ui.position.top;
                tablediv.style.left = left;
                tablediv.style.top = top;
                tableJson.Left = left;
                tableJson.Top = top;
                $("." + tableJson.PageName).remove();
                for (var i = 0; i < dv.connects.length; i++) {
                    var soruceField = dv.connects[i].SourceField;
                    var targetField = dv.connects[i].TargetField;
                    if (soruceField.indexOf(tableJson.PageName) >= 0 || targetField.indexOf(tableJson.PageName) >= 0) {
                        createConnectLine(dv.connects[i]);
                    }
                }
            }
        });
        $(tablediv).bind("keydown", function(event) {
            event.stopPropagation();
            var tTname = $(tablediv).attr("pageName");
            if (event.keyCode == "46") {

            }
        })
        var table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.fontSize = "12px";
        table.style.width = "100%";
        table.style.border = "1px solid black";
        table.style.cellspacing = 0;
        table.style.borderCollapse = "collapse";
        tablediv.appendChild(table);
        var caption = document.createElement("caption");
        $(caption).html(tableJson.PageName);
        table.appendChild(caption);
        for (var k = 0; k < tableJson.Fields.length; k++) {
            (function() {
                var fieldJson = tableJson.Fields[k];
                var fieldId = fieldJson.Name;
                var newtr = table.insertRow();
                newtr.style.height = "20px";
                var td = document.createElement("td");
                td.colSpan = 2;
                td.style.textAlign = "left";
                td.style.border = "1px solid black";
                if (fieldJson.IsOutput) {
                    $(td).html("<input checked type=checkbox  id=" + fieldId + "cbo ><span class='field'>" + fieldId + "</span>");
                    addOutputTableRow(tableJson, fieldJson);
                }
                else {
                    $(td).html("<input type=checkbox  id=" + fieldId + "cbo ><span class='field'>" + fieldId + "</span>");
                }
                $(td.childNodes[0]).bind("click", function(event) {
                    if (this.checked) {
                        fieldJson.IsOutput = true;
                        addOutputTableRow(tableJson, fieldJson);
                    }
                    else {
                        fieldJson.IsOutput = false;
                        deleteOutputTableRow(tableJson, fieldJson);
                    }
                });
                $(td.childNodes[1]).bind("click", function(event) {

                });
                newtr.appendChild(td);
            })();
        }
        if (tableJson.Listtables != "") {
            var lists = tableJson.Listtables.split(';');
            var signField = tableJson.SignField;
            for (var i = 0; i < lists.length; i++) {
                (function() {
                    var tbName = lists[i].replace("[", "");
                    tbName = tbName.replace("]", "");
                    var sourceName = tableJson.PageName + "." + signField;
                    var targetName = tableJson.PageName + "." + tbName + "_signfield";
                    var isHave = false;
                    for (var k = 0; k < dv.connects.length; k++) {
                        if (dv.connects[k].SourceField == sourceName && dv.connects[k].TargetField == targetName && dv.connects[k].IsChildConnect == true) {
                            isHave = true;
                            break;
                        }
                    }
                    if (!isHave) {
                        var connect = new HBSJsConnect();
                        connect.IsChildConnect = true;
                        connect.SourceField = tableJson.PageName + "." + signField;
                        connect.OpSymbol = "=";
                        connect.TargetField = tableJson.PageName + "." + tbName + "_signfield";
                        addConnectTableRow(connect, true);
                        dv.connects.push(connect);
                    }
                })()
            }
        }
    }
    $("#addConnect").bind("click", function() {
        var connect = new HBSJsConnect();
        dv.connects.push(connect);
        addConnectTableRow(connect);
    });
    function addConnectTableRow(connect) {
        var row = $("#connectTable")[0].insertRow();
        if (connect.IsChildConnect) {
            $(row).attr("disabled", true);
        }
        var sourceField = connect.SourceField;
        var opSymbol = connect.OpSymbol;
        var targetField = connect.TargetField;
        var delTd = document.createElement("td");
        $(delTd).html("<a href='#'>删除</a>");
        $(delTd).css("border", "1px solid black");
        var obj = this;
        $(delTd.childNodes[0]).bind("click", function() {
            if (connect.IsChildConnect) {
                alert("子表关联连接不能删除！！");
                return false;
            }
            $(row).remove();
            for (var i = 0; i < dv.connects.length; i++) {
                if (dv.connects[i] == connect) {
                    dv.connects.splice(i, 1);
                }
            }
            var sourceField = connect.SourceField;
            var targetField = connect.TargetField;
            var index = sourceField.indexOf(".");
            var sourceTable = sourceField.substr(0, index);
            var sourceFieldName = sourceField.substr(index + 1, sourceField.length - index - 1);
            index = targetField.indexOf(".");
            var targetTable = targetField.substr(0, index);
            var targetFieldName = targetField.substr(index + 1, targetField.length - index - 1);
            var className = sourceTable + "_" + sourceFieldName + "_" + targetTable + "_" + targetFieldName;
            $("." + className).remove();
        });
        $(row).append(delTd);
        var sourceFieldTd = document.createElement("td");
        $(sourceFieldTd).css("border", "1px solid black");
        $(sourceFieldTd).html("<input type='text' value='" + sourceField + "' style='width:98%';font-size:12px;' />");
        $(row).append(sourceFieldTd);
        $(sourceFieldTd.childNodes[0]).bind("click", function(event) {
            if (connect.IsChildConnect) {
                alert("子表关联连接不能做修改！！");
                return false;
            }
            var inputObj = this;
            var ary = [];
            for (var i = 0; i < dv.tables.length; i++) {
                var pageLimit = new HBSJsConditionLimit();
                pageLimit.name = dv.tables[i].PageName;
                var fields = dv.tables[i].Fields;
                for (var k = 0; k < fields.length; k++) {
                    var name = fields[k].Name;
                    pageLimit.items.push(name);
                }
                ary.push(pageLimit);
                var selectLimitDiv = new HBSJsSelectLimitDiv(inputObj, connect.SourceField, ary);
                selectLimitDiv.selectLimit = function(valueLimit) {
                    connect.SourceField = valueLimit;
                    $(inputObj).val(valueLimit);
                    if (connect.SourceField != "" && connect.TargetField != "") {
                        createConnectLine(connect);
                    }
                }
            }
        });
        var opSymbolTd = document.createElement("td");
        $(opSymbolTd).css("border", "1px solid black");
        $(opSymbolTd).html("<select style='width:100%;font-size:12px;'><option value='='>等于</option><option value='!='>不等于</option><option value='>='>大或等于</option><option value='<='>小或等于</option><option value='>'>大于</option><option value='<'>小于</option><option value='近似'>近似</option></select>");
        $(row).append(opSymbolTd);
        $(opSymbolTd.childNodes[0]).val(opSymbol);
        $(opSymbolTd.childNodes[0]).bind("change", function() {
            if (connect.IsChildConnect) {
                alert("子表关联连接不能做修改！！");
                $(opSymbolTd.childNodes[0]).val(opSymbol);
                return false;
            }
            connect.OpSymbol = $(this).val();
        });
        var targetFieldTd = document.createElement("td");
        $(targetFieldTd).css("border", "1px solid black");
        $(targetFieldTd).html("<input type='text' value='" + targetField + "' style='width:98%';font-size:12px;' />");
        $(row).append(targetFieldTd);
        $(targetFieldTd.childNodes[0]).bind("click", function(event) {
            var inputObj = this;
            if (connect.IsChildConnect) {
                alert("子表关联连接不能做修改！！");
                return false;
            }
            var ary = [];
            for (var i = 0; i < dv.tables.length; i++) {
                var pageLimit = new HBSJsConditionLimit();
                pageLimit.name = dv.tables[i].PageName;
                var fields = dv.tables[i].Fields;
                for (var k = 0; k < fields.length; k++) {
                    var name = fields[k].Name;
                    pageLimit.items.push(name);
                }
                ary.push(pageLimit);
                var selectLimitDiv = new HBSJsSelectLimitDiv(inputObj, connect.TargetField, ary);
                selectLimitDiv.selectLimit = function(valueLimit) {
                    connect.TargetField = valueLimit;
                    $(inputObj).val(valueLimit);
                    if (connect.SourceField != "" && connect.TargetField != "") {
                        createConnectLine(connect);
                    }
                }
            }
        });
        if (sourceField != "" && targetField != "") {
            createConnectLine(connect);
        }
    }
    function createConnectLine(connect) {
        var sourceField = connect.SourceField;
        var targetField = connect.TargetField;
        var index = sourceField.indexOf(".");
        var sourceTable = sourceField.substr(0, index);
        var sourceFieldName = sourceField.substr(index + 1, sourceField.length - index - 1);
        index = targetField.indexOf(".");
        var targetTable = targetField.substr(0, index);
        var targetFieldName = targetField.substr(index + 1, targetField.length - index - 1);
        var className = sourceTable + "_" + sourceFieldName + "_" + targetTable + "_" + targetFieldName;
        var sourceObj = $("#Table" + sourceTable + "Div").find("input[id=" + sourceFieldName + "cbo]").parent();
        var sourceLeft = $(sourceObj).offset().left + 165;
        var sourceTop = $(sourceObj).offset().top + 10;

        var targetObj = $("#Table" + targetTable + "Div").find("input[id=" + targetFieldName + "cbo]").parent();
        var targetLeft = $(targetObj).offset().left + 165;
        var targetTop = $(targetObj).offset().top + 10;
        if (sourceLeft == targetLeft || sourceTop == targetTop) {
            var height = Math.abs(sourceTop - targetTop);
            if (sourceLeft == targetLeft) {
                var lineDiv = document.createElement("div");

                $(lineDiv).css("width", "30px");
                $(lineDiv).css("border", "1px solid black");
                $(lineDiv).css("border-left", "0px solid black");
                $(lineDiv).css("height", height);
                $("body").append(lineDiv);
                $(lineDiv).css("position", "absolute");
                $(lineDiv).addClass("lineClass");
                $(lineDiv).addClass(sourceTable);
                $(lineDiv).addClass(targetTable);
                $(lineDiv).css("left", sourceLeft);
                if (sourceTop > targetTop) {
                    $(lineDiv).css("top", targetTop);
                } else {
                    $(lineDiv).css("top", sourceTop);
                }
            }
            if (targetTop == sourceTop) {
                var lineDiv = document.createElement("div");
                $(lineDiv).css("height", "30px");
                $(lineDiv).css("border", "0px solid black");
                $(lineDiv).css("border-top", "1px solid black");
                $("body").append(lineDiv);
                $(lineDiv).css("position", "absolute");
                $(lineDiv).addClass("lineClass");
                $(lineDiv).addClass(sourceTable);
                $(lineDiv).addClass(targetTable);
                $(lineDiv).css("top", sourceTop);
                if (sourceLeft > targetLeft) {
                    sourceLeft = sourceLeft - 168;
                    $(lineDiv).css("left", targetLeft);
                } else {
                    targetLeft = targetLeft - 168;
                    $(lineDiv).css("left", sourceLeft);
                }
                var width = Math.abs(sourceLeft - targetLeft);
                $(lineDiv).css("width", width);
            }
        }
        else {
            if (sourceLeft > targetLeft) {
                sourceLeft = sourceLeft - 168;
                targetLeft = targetLeft - 3
            }
            else {
                targetLeft = targetLeft - 168;
                sourceLeft = sourceLeft - 3
            }
            graphics({
                coordinate: [sourceLeft, sourceTop, targetLeft, targetTop],
                position: [0, 0, 0, 0],
                parentObj: $("body")[0],
                arrowSize: { 'height': 1, 'width': 1 },
                cutArrowLen: [0, 0],
                color: "black",
                type: "arrow",
                source: sourceTable,
                target: targetTable,
                className: className
            });
        }
    }
    $("#addCondition").bind("click", function() {
        var condition = new HBSJsWhere();
        var p = new HBSJsValueParameter();
        var pp = clone(p);
        p.ParameterType = "pageControl";
        condition.limited.Method = "getValue";
        condition.limited.Parameters.push(p);
        condition.value.Parameters.push(pp);
        var conditionRow = new HBSJsConditionTableRow();
        var row = $("#conditionTable")[0].insertRow();
        conditionRow.element = row;
        conditionRow.condition = condition;
        conditionRow.sourceObj = dv;
        conditionRow.createRow();
        conditionRow.createTablesDiv = function(inputObj) {
            createTablesDiv(inputObj, condition);
        }
        conditionRow.createExpressDiv = function(inputObj) {
            createExpressDiv(condition.value, "", inputObj, window.opener.pageDiv); 
        }
        dv.conditions.push(condition);
    });
    var dv = null;
    createDataview(dataviewId);
    $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getOnlineRoleId" },
        success: function(data) {
            if (data.IsSuccess) {
                var roleId = data.Data;
                $.ajax({ url: "/handler/runtimeWeb.ashx", async: false, dataType: "json", type: "POST", data: { operatetype: "getPowerHtmlForRole", roleId: escape(roleId) },
                    success: function(data) {
                        if (data.IsSuccess) {
                            $("#treeDiv").append(data.Data);
                            $("#treeDiv").find("a").bind("click", function(event) {
                                event.stopPropagation();
                                var modelId = $(this).attr("id");
                                var modelName = $(this).text();
                                for (var i = 0; i < dv.tables.length; i++) {
                                    if (dv.tables[i].PageId == modelId) {
                                        alert("视图已经存在表" + modelName + "!!");
                                        return; false;
                                    }
                                }
                                $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getPageColumns", modelId: escape(modelId) },
                                    success: function(data) {
                                        if (data.IsSuccess) {
                                            var pageJson = new HBSJsTableView();
                                            pageJson.PageId = data.Data.Id;
                                            pageJson.PageName = data.Data.Name;
                                            pageJson.DbName = data.Data.DbName;
                                            pageJson.SignField = data.Data.SignField;
                                            pageJson.Listtables = data.Data.Listtables;
                                            var columns = data.Data.Fields;
                                            if (columns.length == 0) {
                                                alert("无法获取页面的字段信息，不能进行详细设置！！");
                                                //$(popDiv.element).remove();
                                                return false;
                                            }
                                            for (var k = 0; k < columns.length; k++) {
                                                var colName = columns[k].name;
                                                var viewField = new HBSJsViewField();
                                                viewField.Name = colName;
                                                viewField.IsOutput = false;
                                                viewField.Alias = colName;
                                                viewField.GetValueMethod = "value";
                                                pageJson.Fields.push(viewField);
                                            }
                                            dv.tables.push(pageJson);
                                            var pageTable = new GHKImportTable(pageJson);
                                        }
                                        else {
                                            alert("无法获取页面的字段信息，不能进行详细设置！！");
                                            return false;
                                            //$(popDiv.element).remove();
                                        }
                                    },
                                    error: function(xhr, stat, e) {
                                        alert(e);
                                    }
                                });
                                return false;
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
    function createDataview(dataviewId) {
        $("#rightDiv").html("");
        for (var i = 0; i < $(".dvTb").length; i++) {
            var tb = $(".dvTb")[i];
            for (var k = tb.rows.length - 1; k > 0; k--) {
                tb.deleteRow(k);
            }
        }
        $(".lineClass").remove();
        $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getDataviewById", dvId: escape(dataviewId) },
            success: function(data) {
                if (data.IsSuccess) {
                    dv = data.Data;
                    var tables = dv.tables;
                    if (dv.isGroup) {
                        $("#groupCbo").attr("checked", true);
                    }
                    $("#dvName").val(dv.name);
                    var conditions = dv.conditions;
                    var orderbys = dv.orderbys;
                    var connects = dv.connects;
                    for (var i = 0; i < tables.length; i++) {
                        (function() {
                            var pageTable = new GHKImportTable(tables[i]);
                        })()
                    }
                    for (var i = 0; i < conditions.length; i++) {
                        (function() {
                            var condition = conditions[i];
                            var conditionRow = new HBSJsConditionTableRow();
                            var row = $("#conditionTable")[0].insertRow();
                            conditionRow.element = row;
                            conditionRow.condition = condition;
                            conditionRow.sourceObj = dv;
                            conditionRow.createRow();
                            conditionRow.createTablesDiv = function(inputObj) {
                                createTablesDiv(inputObj, condition);
                            }
                            conditionRow.createExpressDiv = function(inputObj) {
                                createExpressDiv(condition.value, "", inputObj, window.opener.pageDiv);
                            }
                        })()
                    }
                    for (var i = 0; i < orderbys.length; i++) {
                        (function() {

                        })()
                    }
                    for (var i = 0; i < connects.length; i++) {
                        (function() {
                            addConnectTableRow(connects[i]);
                        })()
                    }
                }
                else {
                    alert(data.Message);
                }
            }
        });
    }
    function createTablesDiv(inputObj, condition) {
        var ary = [];
        for (var i = 0; i < dv.tables.length; i++) {
            var pageLimit = new HBSJsConditionLimit();
            pageLimit.name = dv.tables[i].PageName;
            var fields = dv.tables[i].Fields;
            for (var k = 0; k < fields.length; k++) {
                var name = fields[k].Name;
                pageLimit.items.push(name);
            }
            ary.push(pageLimit);
            var selectLimitDiv = new HBSJsSelectLimitDiv(inputObj, condition.limited.Parameters[0].Expression, ary);
            selectLimitDiv.selectLimit = function(valueLimit) {
                condition.limited.Parameters[0].Expression = valueLimit;
                $(inputObj).val(valueLimit);
            }
        }

        //        var tableFieldDiv = new TableFieldDiv(inputObj, condition.limited.Parameters[0].Expression, dv.tables);
        //        tableFieldDiv.selectField = function(valueField) {
        //            condition.limited.Parameters[0].Expression = valueField;
        //            $(inputObj).val(valueField);
        //        }
    }
    //    function createExpressDiv(inputObj, express) {
    //        var expressDiv = new DSExpressDiv();
    //        expressDiv.pageDiv = null;
    //        expressDiv.controlsOpStr = controlsOpStr;
    //        expressDiv.Json = express;
    //        expressDiv.createElement();
    //        expressDiv.element.style.left = "150px";
    //        expressDiv.element.style.top = "30px";
    //        expressDiv.clickOkButton = function() {
    //            $(inputObj).val(expressDiv.expressStr);
    //        }
    //    }
    $("img").livequery("click", function() {
        var li = $(this).parent();
        var theUl = $(li).children("ul");
        if (this.className == "add") {
            $(theUl).css("display", "block");
            this.className = "sub";
            this.src = "../images/SubImg.bmp";
        }
        else if (this.className == "sub") {
            $(theUl).css("display", "none");
            this.className = "add";
            this.src = "../images/AddImg.bmp";
        }
    });
    $("#groupCbo").bind("click", function(event) {
        if (this.checked) {
            dv.isGroup = true;
            $(".groupCell").css("display", "block");
        }
        else {
            $(".groupCell").css("display", "none");
            dv.isGroup = false;
        }
    });
    $("#saveDvBt").bind("click", function() {
        if (dv.name == "") {
            alert("请给视图定义名称！！");
            return false;
        }
        var dvStr = JSON.stringify(dv);
        $.ajax({ url: "/handler/runtimeWeb.ashx", type: "POST", dataType: "json", data: { operatetype: "saveDataview", dvStr: escape(dvStr) },
            success: function(data) {
                if (data.IsSuccess) {
                    alert("已经成功保存视图！！");
                    dv.id = parseInt(data.Data);
                    $(window.opener.datasourceInput).attr("dvJson", dvStr);
                    $(window.opener.datasourceInput).val();
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
    $(window).bind("beforeunload", function() {
        if (dv != null) {
            var dvStr = JSON.stringify(dv);
            $(window.opener.datasourceInput).attr("dvJson", dvStr);
            $(window.opener.datasourceInput).val(dv.name);
            window.opener.pageDiv.currentControl.dvJson = dvStr;
            window.opener.pageDiv.currentControl.Json.datasource.name = dv.name;
            window.opener.pageDiv.currentControl.Json.datasource.id = dv.id;
        }
    });
    $("#importDvBt").bind("click", function() {
        $.ajax({ url: "/handler/runtimeWeb.ashx", type: "POST", dataType: "json", data: { operatetype: "getAllDataview" },
            success: function(data) {
                if (data.IsSuccess) {
                    var popDiv = new GHKPopDiv(300, 100, 200, 250, 'dataviewsTable');
                    var tablediv = document.createElement("div");
                    $(popDiv.element).append(tablediv);
                    tablediv.style.width = "100%";
                    tablediv.style.height = "200px";
                    tablediv.style.backgroundColor = "gray";
                    $(tablediv).css("overflow", "auto");
                    $(tablediv).css("position", "absolute");
                    tablediv.style.left = 0;
                    tablediv.style.top = 0;
                    var table = document.createElement("table");
                    table.style.borderCollapse = "collapse";
                    table.style.fontSize = "12px";
                    table.style.width = "100%";
                    table.style.border = "1px solid black";
                    table.style.cellspacing = 0;
                    table.style.borderCollapse = "collapse";
                    tablediv.appendChild(table);
                    var headRow = table.insertRow();
                    var idTh = document.createElement("th");
                    $(idTh).text("编号");
                    idTh.style.border = "1px solid black";
                    idTh.style.width = "30px";
                    $(idTh).css("display", "none");
                    headRow.appendChild(idTh);
                    var th = document.createElement("th");
                    th.style.width = "80px";
                    $(th).text("名称");
                    th.style.border = "1px solid black";
                    headRow.appendChild(th);
                    var th = document.createElement("th");
                    th.style.width = "120px";
                    $(th).text("备注");
                    th.style.border = "1px solid black";
                    headRow.appendChild(th);
                    for (var i = 0; i < data.Data.length; i++) {
                        (function() {
                            var dataview = data.Data[i];
                            var row = table.insertRow();
                            var delTd = document.createElement("td");
                            $(delTd).html("<a href='#'>删除</a>");
                            $(delTd).css("border", "1px solid black");
                            $(delTd.childNodes[0]).bind("click", function() {
                                $.ajax({ url: "/handler/runtimeWeb.ashx", type: "POST", dataType: "json", data: { operateType: "delDataview", id: dataview.id }
                                   , success: function(data) {
                                       if (data.Success) {
                                           $(row).remove();
                                       }
                                       else {
                                           alert("删除视图失败！！");
                                       }
                                   },
                                    error: function() {
                                        alert("删除视图失败！！");
                                    }
                                });
                            });
                            $(row).append(delTd);
                            var idTd = document.createElement("td");
                            $(idTd).text(dataview.id);
                            $(idTd).addClass("viewId");
                            $(idTd).css("display", "none");
                            $(idTd).css("border", "1px solid black");
                            $(row).append(idTd);
                            var nameTd = document.createElement("td");
                            $(nameTd).text(dataview.name);
                            $(nameTd).css("border", "1px solid black");
                            $(row).append(nameTd);
                            var bakTd = document.createElement("td");
                            $(bakTd).text(dataview.bak);
                            $(bakTd).css("border", "1px solid black");
                            $(row).append(bakTd);
                            $(row).find("td").bind("click", function() {
                                $(tablediv).find(".selectLi").removeClass("selectLi");
                                $(row).addClass("selectLi");
                            });
                        })()
                    }
                    var buttonDiv = document.createElement("div");
                    $(popDiv.element).append(buttonDiv);
                    buttonDiv.style.width = "100%";
                    buttonDiv.style.height = "25px";
                    buttonDiv.style.backgroundColor = "gray";
                    $(buttonDiv).css("position", "absolute");
                    buttonDiv.style.left = 0;
                    buttonDiv.style.top = 225;
                    $(buttonDiv).html("<input type='button' value='确定' style='font-size:12px;margin-right:30px;margin-left:20px;' /><input type='button' value='取消' style='font-size:12px;' />");
                    $(buttonDiv.childNodes[0]).bind("click", function() {
                        var dataviewId = $(tablediv).find(".selectLi").find(".viewId").text();
                        createDataview(dataviewId);
                        $(popDiv.element).remove();
                    });
                    $(buttonDiv.childNodes[1]).bind("click", function() {
                        $(popDiv.element).remove();
                    });
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
    $("#clearDv").bind("click", function() {

    });
    $("#back").bind("click", function() {
        window.close();
    });
    $("#dvName").bind("change", function() {
        dv.name = $(this).val();
    });
});
               