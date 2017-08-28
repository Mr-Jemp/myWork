
$(function(event) {
    $(document).bind("contextmenu", function(e) {
        return false;
    });
    $("#contentDiv").tabs(
        { activate: function(event, ui) {
            var powerType = ui.newPanel[0].id;
            if (powerType == "recordDiv") {
                createRecordTable();
            }
            else {
                createFieldTable();
            }
        }
        });
    $("#contentDiv").tabs('option', 'disabled', [0, 1]);
    var modelId = 3;
    var modelName = "";
    var roleStr = "";
    var nodeType = "";
    var roleIdStr = "";
    var pageJson = null;
    var currentPower = null;
    var detailPower = new HBSDetailPower();
    try {
        var theurl = decodeURI(window.location.href);
        var queryStr = theurl.split('?')[1];
        var roleStrQuery = queryStr.split("&")[0];
        roleStr = roleStrQuery.split('=')[1];
        var modelIdQuery = queryStr.split("&")[1];
        modelId = modelIdQuery.split("=")[1];
        var modelNameQuery = queryStr.split("&")[2];
        modelName = modelNameQuery.split("=")[1];
        var nodeTypeQuery = queryStr.split("&")[3];
        nodeType = nodeTypeQuery.split("=")[1];
        var roleIdStrQuery = queryStr.split("&")[4];
        roleIdStr = roleIdStrQuery.split("=")[1];
    }
    catch (e) {

    }
    $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getDetailPowerForPageByRole", roleIdStr: escape(roleIdStr), modelId: escape(modelId), nodeType: escape(nodeType) },
        success: function(data) {
            if (data.IsSuccess) {
                detailPower = data.Data;
                if (detailPower.pageEdit) {
                    $("#editPageCbo").attr("checked", true);
                }
                if (detailPower.addRecord.Flag) {
                    $("#addCbo").attr("checked", true);
                }
                if (detailPower.delRecord.Flag) {
                    $("#delCbo").attr("checked", true);
                }
                if (detailPower.updateRecord.Flag) {
                    $("#updateCbo").attr("checked", true);
                }
                if (detailPower.searchRecord.Flag) {
                    $("#searchCbo").attr("checked", true);
                }
                $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getPageColumns", modelId: escape(modelId) },
                    success: function(gdata) {
                        if (gdata.IsSuccess) {
                            pageJson = gdata.Data;
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
            }
        }
    });
    $("#saveDetailPower").bind("click", function() {
        var roles = detailPower.roles;
        if (roles.length > 1) {
            if (!confirm("当前选定多个角色，是否统一权限!!")) {
                return false;
            }
        }
        var powerStr = JSON.stringify(detailPower);
        $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "saveDetailPowerForPageByRole", powerStr: escape(powerStr) },
            success: function(data) {
                if (data.IsSuccess) {
                    alert(data.Data);
                }
                else {
                    alert(data.Message);
                }
            }
        });
    });
    $("#reback").bind("click", function() {
        history.back();
    });
    $("#roleLbl").text(roleStr);
    $("#pageLbl").text(modelName);
    $("#editPageCbo").bind("click", function() {
        if (this.checked) {
            detailPower.pageEdit = true;
        }
        else {
            detailPower.pageEdit = false;
        }
    });
    $("#addCbo").bind("click", function() {
        if (this.checked) {
            detailPower.addRecord.Flag = true;
        }
        else {
            detailPower.addRecord.Flag = false;
        }
    });
    $("#updateCbo").bind("click", function() {
        if (this.checked) {
            detailPower.updateRecord.Flag = true;
        }
        else {
            detailPower.updateRecord.Flag = false;
        }
    });
    $("#delCbo").bind("click", function() {
        if (this.checked) {
            detailPower.delRecord.Flag = true;
        }
        else {
            detailPower.delRecord.Flag = false;
        }
    });
    $("#searchCbo").bind("click", function() {
        if (this.checked) {
            detailPower.searchRecord.Flag = true;
        }
        else {
            detailPower.searchRecord.Flag = false;
        }
    });
    $("#opSpan").find("label").bind("click", function(event) {
        var cbo = $(this).prev()[0];
        if (!cbo.checked) {
            alert("请先选择操作权限，再进行详细设置！！");
            return false;
        }
        var opType = $(this).text();
        if (opType == "页面编辑") {
            alert("页面编辑不需要进行详细设置！！");
            return false;
        }
        $("#opSpan").find(".selectA").removeClass("selectA");
        $(this).addClass("selectA");
        if (opType == "添加记录") {
            currentPower = detailPower.addRecord;
            $("#contentDiv").tabs('option', 'disabled', [1]);
            $("#contentDiv").tabs('option', 'active', 0);
            var FieldRanges = detailPower.addRecord.FieldRanges;
            createFieldTable(FieldRanges);
        }
        else if (opType == "修改记录") {
            currentPower = detailPower.updateRecord;
            $("#contentDiv").tabs('enable');
            $("#contentDiv").tabs('option', 'active', 0);
            var FieldRanges = detailPower.updateRecord.FieldRanges;
            createFieldTable(FieldRanges);
        }
        else if (opType == "删除记录") {
            currentPower = detailPower.delRecord;
            $("#contentDiv").tabs('option', 'disabled', [0]);
            $("#contentDiv").tabs('option', 'active', 1);
            createRecordTable();
        }
        else if (opType == "查询记录") {
            currentPower = detailPower.searchRecord;
            $("#contentDiv").tabs('option', 'disabled', [0]);
            $("#contentDiv").tabs('option', 'active', 1);
            createRecordTable();
        }
    });
    function createRecordTable() {
        var table = $("#conditionTable")[0];
        for (var i = table.rows.length - 1; i > 0; i--) {
            table.deleteRow(i);
        }
        if (pageJson == null) {
            alert("没有获得页面信息，请联系管理员！！");
            return;
        }
        for (var i = 0; i < currentPower.conditions.length; i++) {
            (function() {
                var condition = currentPower.conditions[i];
                var conditionRow = new HBSJsConditionTableRow();
                var row = $("#conditionTable")[0].insertRow();
                conditionRow.element = row;
                conditionRow.condition = condition;
                conditionRow.sourceObj = currentPower;
                conditionRow.createRow();
                conditionRow.createTablesDiv = function(inputObj) {
                    conditionRow.controlOpStr = createPageConditionLimitDiv(inputObj, condition, conditionRow);
                }
                conditionRow.createExpressDiv = function(inputObj) {
                    createExpressDiv(inputObj, condition.value);
                }
            })()
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
        conditionRow.sourceObj = currentPower;
        conditionRow.createRow();
        conditionRow.createTablesDiv = function(inputObj) {
            createPageConditionLimitDiv(inputObj, condition, conditionRow);
        }
        conditionRow.createExpressDiv = function(inputObj) {
            createExpressDiv(condition.value, conditionRow.controlOpStr, inputObj);
        }
        currentPower.conditions.push(condition);
    });
    function createPageConditionLimitDiv(inputObj, condition, row) {
        var tables = [];
        var pageId = 0;
        var fieldsOpStr = "";
        var ary = [];
        var pageLimit = new HBSJsConditionLimit();
        pageLimit.name = pageJson.Name;
        var fields = pageJson.Fields;
        for (var k = 0; k < fields.length; k++) {
            var name = fields[k].name;
            fieldsOpStr = fieldsOpStr + "<option value='" + name + "'>" + name + "</option>";
            pageLimit.items.push(name);
        }
        ary.push(pageLimit);
        var selectLimitDiv = new HBSJsSelectLimitDiv(inputObj, condition.limited.Parameters[0].Expression, ary);
        selectLimitDiv.selectLimit = function(valueLimit) {
            condition.limited.Parameters[0].Expression = valueLimit;
            $(inputObj).val(valueLimit);
        }
        row.controlOpStr = fieldsOpStr;
    }
    function createFieldTable() {
        var ranges = currentPower.FieldRanges;
        var table = $("#fieldsTable")[0];
        for (var i = table.rows.length - 1; i > 0; i--) {
            table.deleteRow(i);
        }
        if (pageJson == null) {
            alert("没有获得页面信息，请联系管理员！！");
            return;
        }
        for (var i = 0; i < pageJson.Fields.length; i++) {
            (function() {
                var field = pageJson.Fields[i];
                var fieldRange = new HBSJsFieldRange();
                fieldRange.FieldName = field.name;
                fieldRange.DomType = field.domtype;
                fieldRange.DataType = field.datatype;
                var row = table.insertRow();
                var fieldTd = document.createElement("td");
                $(fieldTd).css("border", "1px solid black");
                $(fieldTd).css("text-align", "center");
                $(fieldTd).css("width", "180px");
                $(fieldTd).text(field.name);
                $(row).append(fieldTd);
                var cboTd = document.createElement("td");
                $(cboTd).css("border", "1px solid black");
                $(cboTd).css("text-align", "center");
                $(cboTd).css("width", "30px");
                var checkedStr = "";
                var isHave = false;
                for (var j = 0; j < ranges.length; j++) {
                    if (ranges[j].FieldName == field.name) {
                        fieldRange = ranges[j];
                        ranges[j] = fieldRange;
                        if (ranges[j].IsCheck) {
                            checkedStr = "checked";
                        }
                        isHave = true;
                        break;
                    }
                }
                if (!isHave) {
                    ranges.push(fieldRange);
                }
                $(cboTd).html("<input type='checkbox' " + checkedStr + " />");
                $(cboTd.childNodes[0]).bind("click", function() {
                    if (this.checked) {
                        fieldRange.IsCheck = true;
                    }
                    else {
                        fieldRange.IsCheck = false;
                    }
                });
                $(row).append(cboTd);
                var opTypeTd = document.createElement("td");
                $(opTypeTd).css("border", "1px solid black");
                $(opTypeTd).css("text-align", "center");
                $(opTypeTd).css("width", "50px");
                $(opTypeTd).html("<select style='width:100%;font-size:12px;'><option value=\"\" style=\"display: none\"></option><option value='='>等于</option><option value='!='>不等于</option><option value='>='>大或等于</option><option value='<='>小或等于</option><option value='>'>大于</option><option value='<'>小于</option><option value='近似'>近似</option></select>");
                $(opTypeTd.childNodes[0]).bind("change", function() {
                    fieldRange.OpType = this.value;
                });
                $(opTypeTd.childNodes[0]).val(fieldRange.OpType);
                if (fieldRange.Express.Method == "between") {
                    $(opTypeTd.childNodes[0]).attr("disabled", "disabled");
                    $(opTypeTd.childNodes[0]).val("");
                    fieldRange.OpType = "";
                }
                $(row).append(opTypeTd);
                var valueTd = document.createElement("td");
                $(valueTd).css("border", "1px solid black");
                $(valueTd).css("text-align", "center");
                $(valueTd).css("width", "300px");
                var rightValue = "";
                if (fieldRange.Express.Method == "getValue" && fieldRange.Express.Parameters.length == 1) {
                    rightValue = "取值(" + fieldRange.Express.Parameters[0].Expression + ")";
                }
                if (fieldRange.Express.Method == "sum" && fieldRange.Express.Parameters.length > 1) {
                    rightValue = "";
                    rightValue = "求和("
                    for (var j = 0; j < fieldRange.Express.Parameters.length; j++) {
                        if (j == fieldRange.Express.Parameters.length - 1) {
                            rightValue = rightValue + fieldRange.Express.Parameters[j].Expression;
                        } else {
                            rightValue = rightValue + fieldRange.Express.Parameters[j].Expression + ",";
                        }
                    }
                    rightValue = rightValue + ")";
                }
                if (fieldRange.Express.Method == "and" && fieldRange.Express.Parameters.length > 1) {
                    rightValue = "";
                    rightValue = "逻辑与("
                    for (var j = 0; j < fieldRange.Express.Parameters.length; j++) {
                        if (j == fieldRange.Express.Parameters.length - 1) {
                            rightValue = rightValue + fieldRange.Express.Parameters[j].Expression;
                        } else {
                            rightValue = rightValue + fieldRange.Express.Parameters[j].Expression + ",";
                        }
                    }
                    rightValue = rightValue + ")";
                }
                if (fieldRange.Express.Method == "or" && fieldRange.Express.Parameters.length > 1) {
                    rightValue = "";
                    rightValue = "逻辑或("
                    for (var j = 0; j < fieldRange.Express.Parameters.length; j++) {
                        if (j == fieldRange.Express.Parameters.length - 1) {
                            rightValue = rightValue + fieldRange.Express.Parameters[j].Expression;
                        } else {
                            rightValue = rightValue + fieldRange.Express.Parameters[j].Expression + ",";
                        }
                    }
                    rightValue = rightValue + ")";
                }
                if (fieldRange.Express.Method == "between" && fieldRange.Express.Parameters.length > 1) {
                    rightValue = "";
                    rightValue = "区间("
                    for (var j = 0; j < fieldRange.Express.Parameters.length; j++) {
                        if (j == fieldRange.Express.Parameters.length - 1) {
                            rightValue = rightValue + fieldRange.Express.Parameters[j].Expression;
                        } else {
                            rightValue = rightValue + fieldRange.Express.Parameters[j].Expression + ",";
                        }
                    }
                    rightValue = rightValue + ")";
                }
                if (fieldRange.Express.Method == "max" && fieldRange.Express.Parameters.length == 1) {
                    rightValue = "";
                    rightValue = "最大值(" + fieldRange.Express.Parameters[0].Expression + ")";
                }
                if (fieldRange.Express.Method == "min" && fieldRange.Express.Parameters.length == 1) {
                    rightValue = "";
                    rightValue = "最小值(" + fieldRange.Express.Parameters[0].Expression + ")";
                }
                if (fieldRange.Express.Method == "avg" && fieldRange.Express.Parameters.length == 1) {
                    rightValue = "";
                    rightValue = "平均值(" + fieldRange.Express.Parameters[0].Expression + ")";
                }
                $(valueTd).html("<input type='text' value='" + rightValue + "' id='expressInput' style='width:90%;font-size:12px;' /><img src='/images/add.GIF'>");
                $(valueTd.childNodes[0]).bind("change", function(event) {
                    var p = new HBSJsValueParameter();
                    p.Expression = $(this).val();
                    fieldRange.Express.Method = "getValue";
                    fieldRange.Express.Parameters.length = 0;
                    fieldRange.Express.Parameters.push(p);
                });
                $(valueTd.childNodes[1]).bind("click", function(event) {
                    var obj = this;
                    //                    clickbiaodashi(pageJson.Fields);
                    //                    var re = expressionsel.show(pageJson.Fields, "", function(t) { alert(t); });
                    //                    if (re == false) alert(expressionsel.error);
                    //                    return false;
                    var expressDiv = new DSExpressDiv();
                    expressDiv.pageDiv = pageJson;
                    expressDiv.controlsOpStr = null;
                    expressDiv.Json = fieldRange.Express;
                    expressDiv.createElement();
                    expressDiv.element.style.left = "150px";
                    expressDiv.element.style.top = "30px";
                    expressDiv.clickOkButton = function() {
                        $(valueTd.childNodes[0]).val(expressDiv.expressStr);
                        if (expressDiv.Json.Method == "between") {
                            $(opTypeTd.childNodes[0]).attr("disabled", "disabled");
                            $(opTypeTd.childNodes[0]).val("");
                            fieldRange.f = "";
                        } else { 
                        
                        }

                    }
                });
                $(row).append(valueTd);
            })()
        }
    }
});