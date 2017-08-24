function createExpressDiv(value, controlsOpStr, sourceInput,pageDiv) {
    var expressDiv = new DSExpressDiv();
    expressDiv.pageDiv = pageDiv;
    expressDiv.controlsOpStr = controlsOpStr;
    expressDiv.Json = value;
    expressDiv.createElement();
    expressDiv.element.style.left = "150px";
    expressDiv.element.style.top = "30px";
    expressDiv.clickOkButton = function() {
        $(sourceInput).val(expressDiv.expressStr);
    }
}
var DSExpressDiv = function() {
//    this.Json = new HBSJsExpress();
//    this.pageDiv = null;
//    this.controlsOpStr = "";
}
DSExpressDiv.prototype = {
    createElement: function() {
        var controlsOptionStr = this.controlsOpStr;
        if (controlsOptionStr == "" || controlsOptionStr == null) {
            if (this.pageDiv != null) {
                var controls =null;
                if (this.pageDiv.Json == null && controls == null) {
                    controls = this.pageDiv.Fields;
                    for (var i = 0; i < controls.length; i++) {
                        controlsOptionStr = controlsOptionStr + "<option value='" + controls[i].name + "'>" + controls[i].name + "</option>";
                    }
                }
                else {
                    controls = this.pageDiv.Json.controls;
                    for (var i = 0; i < controls.length; i++) {
                        controlsOptionStr = controlsOptionStr + "<option value='" + controls[i].baseProperties.name + "'>" + controls[i].baseProperties.name + "</option>";
                    }
                }
            }
        }
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.border = "1px solid black";
        $(this.element).css("width", "620px");
        $(this.element).css("height", "500px");
        $(this.element).css("left", "150px");
        $(this.element).css("top", "50px");
        document.body.appendChild(this.element);
        var theframe = document.createElement("iframe");
        theframe.style.position = "absolute";
        theframe.setAttribute('frameborder', '0', 0);
        theframe.style.top = "0px";
        theframe.style.left = "0px";
        theframe.style.width = "100%";
        theframe.style.height = "100%";
        theframe.style.zIndex = -11;
        this.element.appendChild(theframe);
        $(this.element).dblclick(function(event) {
            $(obj.element).remove();
        });
        var expressDiv = document.createElement("div");
        expressDiv.style.position = "absolute";
        expressDiv.style.overflow = "hidden";
        $(expressDiv).css("background-color", "#FFF");
        expressDiv.className = "valueDiv";
        expressDiv.style.width = "100%";
        expressDiv.style.height = "500";
        this.element.appendChild(expressDiv);
        var attributeDiv = document.createElement("div");
        attributeDiv.style.width = "100%";
        attributeDiv.style.height = "30px";
        attributeDiv.style.fontSize = "18px";
        $(attributeDiv).css("text-align", "center");
        $(attributeDiv).append("表达式");
        attributeDiv.style.border = "1px solid black";
        expressDiv.appendChild(attributeDiv);
        var attributeDiv = document.createElement("div");
        //        attributeDiv.style.backgroundColor = "#E7DBD5";
        attributeDiv.style.width = "100%";
        attributeDiv.style.height = "400px";
        attributeDiv.style.overflow = "hidden";
        attributeDiv.className = "attributeDiv";
        attributeDiv.style.fontSize = "18px";
        //        attributeDiv.style.backgroundColor = "#E7DBD5";
        attributeDiv.style.border = "1px solid black";
        expressDiv.appendChild(attributeDiv);
        var expressionDiv = document.createElement("div");
        //        expressionDiv.style.backgroundColor = "#E7DBD5";
        expressionDiv.style.width = "98%";
        expressionDiv.style.marginLeft = "10px";
        expressionDiv.style.marginTop = "10px";
        expressDiv.appendChild(expressionDiv);
        var expressionSpan = document.createElement("span");
        $(expressionSpan).html("<span>值表达式=</span>");
        expressionSpan.id = "expressionSpan";
        expressionDiv.appendChild(expressionSpan);
        var expressSpan = document.createElement("span");
        $(expressSpan).css("text-align", "center");
        $(expressSpan).css("width", "100%");
        $(expressionSpan).append(expressSpan);
        explainExpress(this.Json, expressSpan, controlsOptionStr, this.pageDiv);
        createFactorDiv(this.Json, expressSpan, controlsOptionStr, this.pageDiv);
        var buttonDiv = document.createElement("div");
        $(buttonDiv).css("float", "right");
        $(buttonDiv).html("<input type='button' value='确定' style='font-size:12px;margin-right:30px;margin-left:20px;' /><input type='button' value='取消' style='font-size:12px;' />");
        var obj = this;
        $(buttonDiv.childNodes[0]).bind("click", function() {
            obj.expressStr = $(expressSpan).text();
            obj.clickOkButton();
            $(obj.element).remove();
        });
        $(buttonDiv.childNodes[1]).bind("click", function() {
            $(obj.element).remove();
        });
        $(expressionDiv).append(buttonDiv);
    },
    clickOkButton: function() {

    }
}
function createFactorDiv(express, expressSpan, controlsOptionStr,pageDiv) {
    var topDiv = document.createElement("div");
    //    topDiv.style.position = "absolute";
    //    topDiv.style.left = "150px";
    //    topDiv.style.top = "40px";
    topDiv.style.width = "100%";
    topDiv.style.height = "50px";
    $(topDiv).css("text-align", "center");
    $(topDiv).html("<span>表达式函数:</span><select style='width:60%;font-size:12px;'><option value='getValue'>取值</option><option value='count'>计数</option><option value='sum'>求和</option><option value='max'>最大值</option><option value='min'>最小值</option><option value='avg'>平均值</option><option value='between'>区间</option><option value='mod'>取模</option><option value='and'>逻辑与</option><option value='or'>逻辑或</option><option value='not'>取非</option></select>");
    $(topDiv.childNodes[1]).bind("change", function() {
        express.Method = $(this).val();
        if (express.Method == "between") {
            $(topDiv).append("<br/><span>区间情况选择:</span><select style='width:60%;font-size:12px;'><option value='<,<'><,<</option><option value='<=,<'><=,<</option><option value='<,<='><,<=</option><option value='<=,<='><=,<=</option></select>");
            express.valueType = "<,<";
            $(topDiv.childNodes[$(topDiv).children().length - 1]).bind("change", function() {
                alert($(this).val());
            });
        } else {
            for (var j = $(topDiv).children().length - 1; j > 1; j--) {
                $(topDiv.childNodes[j]).remove();
            }
        }

    });
    if (express.Method == "between") {
        $(topDiv).append("<br/><span>区间情况选择:</span><select style='width:60%;font-size:12px;'><option value='<,<'><,<</option><option value='<=,<'><=,<</option><option value='<,<='><,<=</option><option value='<=,<='><=,<=</option></select>");
        express.ValueType = "<,<";
        $(topDiv.childNodes[$(topDiv).children().length - 1]).bind("change", function() {
            alert($(this).val());
        });
    }
    $(topDiv.childNodes[1]).val(express.Method);
    var parametersDiv = document.createElement("div");
    //    parametersDiv.style.position = "absolute";
    //    parametersDiv.style.left = "150px";
    //    parametersDiv.style.top = "60px";
    $(parametersDiv).css("text-align", "center");
    parametersDiv.style.width = "100%";
    parametersDiv.style.height = "250px";
    parametersDiv.style.overflow = "auto";
    parametersDiv.style.border = "1px solid black";
    var parametersTable = document.createElement("table");
    parametersTable.style.borderCollapse = "collapse";
    parametersTable.style.fontSize = "12px";
    //    parametersTable.style.marginTop = "10px";
    parametersTable.style.width = "98%";
    parametersTable.style.textAlign = "center";
    parametersTable.style.border = "1px solid black";
    parametersTable.style.cellspacing = 0;
    parametersTable.style.tableLayout = "fixed";
    parametersDiv.appendChild(parametersTable);
    var caption = document.createElement("caption");
    $(caption).text("表达式参数列表");
    $(parametersTable).append(caption);
    var parameters = express.Parameters;
    var headRow = parametersTable.insertRow();
    var addTh = document.createElement("th");
    $(addTh).html("<a href='#'>添加</a>");
    var obj = this;
    $(addTh.childNodes[0]).bind("click", function(event) {
        if (express.Method == "between") {
            if (express.Parameters.length < 2) {

            } else {
                alert("不能再加了");
                return;
            }
        }else if (express.Method == "getValue") {
            if (express.Parameters.length <= 0) {

            }
            else {
                alert("不能再加了");
                return;
            }
        }
        var p = new HBSJsValueParameter();
        express.Parameters.push(p);
        addParameterRow(p, express, parametersTable, controlsOptionStr,pageDiv);
    })
    addTh.style.border = "1px solid black";
    addTh.style.width = "30px";
    headRow.appendChild(addTh);
    var th = document.createElement("th");
    th.style.width = "65px";
    $(th).text("参数类型");
    th.style.border = "1px solid black";
    headRow.appendChild(th);
    var th = document.createElement("th");
    th.style.width = "65px";
    $(th).text("参数设置");
    th.style.border = "1px solid black";
    headRow.appendChild(th);
    $(".attributeDiv").html("");
    $(".attributeDiv").append(topDiv);
    $(".attributeDiv").append(parametersDiv);
    var buttonDiv = document.createElement("div");
    //    buttonDiv.style.position = "absolute";
    //    buttonDiv.style.left = "150px";
    //    buttonDiv.style.top = "210px";
    buttonDiv.style.width = "350px";
    buttonDiv.style.height = "30px";
    $(buttonDiv).html("<span style='float:right;margin-right:30px;'><input type='button' value='获取' style='font-size:12px;margin-right:30px;margin-left:20px;' /><input type='button' value='清空数据' style='font-size:12px;' /></span>");
    $(buttonDiv.childNodes[0]).bind("click", function() {
        explainExpress(express, expressSpan, controlsOptionStr,pageDiv);
        $(".setParameter").html("");
        $(".attributeDiv").html("");
    });
    $(buttonDiv.childNodes[1]).bind("click", function() {
        $(".setParameter").html("");
        $(".attributeDiv").html("");
    });
    $(".attributeDiv").append(buttonDiv);
    for (var i = 0; i < express.Parameters.length; i++) {
        (function() {
            addParameterRow(express.Parameters[i], express, parametersTable, controlsOptionStr,pageDiv);
        })()
    }
}
function addParameterRow(p, express, table, controlsOptionStr,pageDiv) {
    var row = table.insertRow();
    var parameterType = p.PType;
    var delTd = document.createElement("td");
    $(delTd).html("<a href='#'>删除</a>");
    $(delTd).css("border", "1px solid black");
    var obj = this;
    $(delTd.childNodes[0]).bind("click", function() {
        $(row).remove();
        for (var i = 0; i < express.Parameters.length; i++) {
            if (express.Parameters[i] == p) {
                express.Parameters.splice(i, 1);
            }
        }
    });
    $(row).append(delTd);
    var parameterTypeTd = document.createElement("td");
    $(parameterTypeTd).html("<select  style='width:95%;font-size:12px;'><option value='valueParameter'>取值参数</option><option value='expressParameter'>表达式参数</option></select>");
    $(parameterTypeTd).css("border", "1px solid black");
    $(parameterTypeTd.childNodes[0]).val(parameterType);
    $(parameterTypeTd.childNodes[0]).bind("change", function() {
        p.PType = $(this).val();
        var newP = null;
        if (p.PType == "valueParameter") {
            newP = new HBSJsValueParameter();
        }
        else {
            newP = new HBSJsExpress();
        }
        var index = row.rowIndex - 1;
        express.Parameters.splice(index, 1, newP);
        p = newP;
    });
    $(row).append(parameterTypeTd);
    var expressionTd = document.createElement("td");
    $(expressionTd).html("<input type='text' readonly style='width:95%;font-size:12px;' value='....' />");
    $(expressionTd).css("border", "1px solid black");
    $(expressionTd.childNodes[0]).bind("click", function(event) {
        var src = event.target;
        $(".setParameter").remove();
        var left = $(table).offset().left;
        var top = $(src).offset().top + 25;
        var popDiv = new GHKPopDiv(left, top, 350, 80, "setParameter");
        var setParameterDiv = new SetParameterDiv(p, controlsOptionStr,pageDiv);
        $(popDiv.element).append(setParameterDiv.element);
    });
    $(row).append(expressionTd);
}
var SetParameterDiv = function(parameter, controlsOptionStr,pageDiv) {
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.backgroundColor = "#537fbe";
    this.element.style.border = "1px solid black";
    $(this.element).css("width", "100%");
    $(this.element).css("height", "100%");
    var parametersTable = document.createElement("table");
    parametersTable.style.borderCollapse = "collapse";
    parametersTable.style.fontSize = "12px";
    parametersTable.style.marginTop = "10px";
    parametersTable.style.width = "98%";
    parametersTable.style.textAlign = "center";
    parametersTable.style.border = "1px solid black";
    parametersTable.style.cellspacing = 0;
    parametersTable.style.tableLayout = "fixed";
    $(this.element).css("z-index", "9999");
    $(this.element).append(parametersTable);
    var parameterType = parameter.PType;
    if (parameterType == "valueParameter") {
        createValueParameterTable(parametersTable, parameter, controlsOptionStr,pageDiv);
    }
    else {
        createExpressParameterTable(parametersTable, parameter,"",pageDiv);
    }
    var buttonDiv = document.createElement("div");
    buttonDiv.style.position = "absolute";
    buttonDiv.style.left = "0px";
    buttonDiv.style.top = "60px";
    buttonDiv.style.width = "350px";
    buttonDiv.style.height = "30px";
    $(buttonDiv).html("<span style='float:right;margin-right:30px;'><input type='button' value='确定' style='font-size:12px;margin-right:30px;margin-left:20px;' /><input type='button' value='取消' style='font-size:12px;' /></span>");
    var obj = this;
    $(buttonDiv.childNodes[0]).bind("click", function() {
        $(obj.element).parent().remove();
    });
    $(buttonDiv.childNodes[1]).bind("click", function() {
        $(obj.element).parent().remove();
    });
    $(this.element).append(buttonDiv);
}
function createValueParameterTable(parametersTable, parameter, controlsOptionStr,pageDiv) {
    var headRow = parametersTable.insertRow();
    var th = document.createElement("th");
    th.style.width = "65px";
    $(th).text("参数类型");
    th.style.border = "1px solid black";
    headRow.appendChild(th);
    var th = document.createElement("th");
    th.style.width = "65px";
    $(th).text("取值");
    th.style.border = "1px solid black";
    headRow.appendChild(th);
    var th = document.createElement("th");
    th.style.width = "65px";
    $(th).text("格式化");
    th.style.border = "1px solid black";
    headRow.appendChild(th);
    var th = document.createElement("th");
    th.style.width = "65px";
    $(th).text("数据类型");
    th.style.border = "1px solid black";
    headRow.appendChild(th);
    var row = parametersTable.insertRow();
    var parameterType = parameter.ParameterType;
    var expression = parameter.Expression;
    var format = parameter.Format;
    var valueType = parameter.ValueType;
    var parameterTypeTd = document.createElement("td");
    $(parameterTypeTd).html("<select  style='width:95%;font-size:12px;'><option value='const'>常数</option><option value='system'>系统变量</option><option value='pageControl'>页面数据库字段控件</option><option value='pageControls'>页面控件</option><option value='inputParameters'>页面输入参数</option><option value='datasource'>数据视图</option></select>");
    $(parameterTypeTd).css("border", "1px solid black");
    $(parameterTypeTd.childNodes[0]).val(parameterType);
    $(parameterTypeTd.childNodes[0]).bind("change", function() {
        parameter.ParameterType = $(this).val();
        createExpressSpan(parameter, expressionTd, controlsOptionStr,pageDiv);
    });
    $(row).append(parameterTypeTd);
    var expressionTd = document.createElement("td");
    createExpressSpan(parameter, expressionTd, controlsOptionStr,pageDiv);
    $(expressionTd).css("border", "1px solid black");
    $(expressionTd.childNodes[0]).val(expression);
    $(row).append(expressionTd);
    var formatTd = document.createElement("td");
    $(formatTd).html("<input type='text' style='width:95%;font-size:12px;'/>");
    $(formatTd).css("border", "1px solid black");
    $(formatTd.childNodes[0]).bind("change", function() {
        parameter.Format = $(this).val();
    });
    $(row).append(formatTd);
    var valueTypeTd = document.createElement("td");
    $(valueTypeTd).html("<select  style='width:95%;font-size:12px;'><option value='string'>字符串</option><option value='date'>日期</option><option value='int'>整数</option><option value='decimal'>小数</option></select>");
    $(valueTypeTd.childNodes[0]).val(parameter.ValueType);
    $(valueTypeTd.childNodes[0]).bind("change", function() {
        parameter.ValueType = $(this).val();
    });
    $(valueTypeTd).css("border", "1px solid black");
    $(row).append(valueTypeTd);
}
function createExpressSpan(parameter, expressionTd, controlsOptionStr,pageDiv) {
    var parameterType = parameter.ParameterType;
    var express = parameter.Expression;
    switch (parameterType) {
        case "const":
            {
                $(expressionTd).html("<input type='text' style='width:95%;font-size:12px;'/>");
                $(expressionTd.childNodes[0]).bind("change", function() {
                    parameter.Expression = $(this).val();
                });
                break;
            }
        case "system":
            {
                var opstr = "";
                opstr = opstr + "<option value=表单名称>表单名称</option>";
                opstr = opstr + "<option value=当前日期>当前日期</option>";
                opstr = opstr + "<option value=当前时间>当前时间</option>";
                opstr = opstr + "<option value=当前用户>当前用户</option>";
                opstr = opstr + "<option value=当前用户ID>当前用户ID</option>";
                opstr = opstr + "<option value=当前角色>当前角色</option>";
                opstr = opstr + "<option value=当前角色ID>当前角色ID</option>";
                opstr = opstr + "<option value=流水号>流水号</option>";
                opstr = opstr + "<option value=当日流水>当日流水</option>";
                opstr = opstr + "<option value=当月流水>当月流水</option>";
                opstr = opstr + "<option value=当年流水>当年流水</option>";
                opstr = opstr + "<option value=随机数>随机数</option>";
                $(expressionTd).html("<select style='width:95%;font-size:12px;'>" + opstr + "</select>");
                $(expressionTd.childNodes[0]).livequery("change", function() {
                    parameter.Expression = $(this).val();
                });
                break;
            }
        case "pageControl":
            {
                $(expressionTd).html("<select style='width:95%;font-size:12px;'>" + controlsOptionStr + "</select>");
                $(expressionTd.childNodes[0]).bind("change", function() {
                    parameter.Expression = $(this).val();
                });
                break;
            }
        case "pageControls":
            {

                $(expressionTd).html("<select style='width:95%;font-size:12px;'>" + controlsOptionStr + "</select>");
                parameter.Expression = $(expressionTd.childNodes[0]).val();
                $(expressionTd.childNodes[0]).bind("change", function() {
                    parameter.Expression = $(this).val();
                });
                break;
            }
        case "inputParameters":
            {
                var opStr = "";
                for (var i = 0; i < pageDiv.Json.inputParameters.length; i++) {
                    opstr = opstr + "<option value='" + pageDiv.Json.inputParameters[i].name + "'>" + pageDiv.Json.inputParameters[i].name+"</option>";
                }
                $(expressionTd).html("<select style='width:95%;font-size:12px;'>" + opstr + "</select>");
                parameter.Expression = $(expressionTd.childNodes[0]).val();
                $(expressionTd.childNodes[0]).bind("change", function() {
                    parameter.Expression = $(this).val();
                });
                break;
            }
        case "datasource":
            {
                $(expressionTd).html("<input type='text' style='width:95%;font-size:12px;' />");
                $(expressionTd.childNodes[0]).livequery("change", function() {
                    parameter.Expression = $(this).val();
                });
                break;
            }
    }
    $(expressionTd.childNodes[0]).val(express);
}
function createExpressParameterTable(parametersTable, parameter) {
    var headRow = parametersTable.insertRow();
    var method = parameter.Method;
    var valueType = parameter.ValueType;
    var th = document.createElement("th");
    th.style.width = "65px";
    $(th).text("函数");
    th.style.border = "1px solid black";
    headRow.appendChild(th);
    var th = document.createElement("th");
    th.style.width = "65px";
    $(th).text("数据类型");
    th.style.border = "1px solid black";
    headRow.appendChild(th);
    var row = parametersTable.insertRow();
    var methodTd = document.createElement("td");
    $(methodTd).html("<select  style='width:95%;font-size:12px;'><option value='getValue'>取值</option><option value='count'>计数</option><option value='connect'>连接</option><option value='sum'>求和</option><option value='max'>最大值</option><option value='min'>最小值</option><option value='avg'>平均值</option><option value='between'>区间</option><option value='mod'>取模</option><option value='and'>逻辑与</option><option value='or'>逻辑或</option><option value='not'>取非</option></select>");
    $(methodTd).css("border", "1px solid black");
    $(methodTd.childNodes[0]).val(method);
    $(methodTd.childNodes[0]).bind("change", function() {
        parameter.Method = $(this).val();
    });
    $(row).append(methodTd);
    var valueTypeTd = document.createElement("td");
    $(valueTypeTd).html("<select style='width:95%;font-size:12px;'><option value='string'>字符串</option><option value='date'>日期</option><option value='int'>整数</option><option value='decimal'>小数</option></select>");
    $(valueTypeTd).css("border", "1px solid black");
    $(valueTypeTd.childNodes[0]).val(valueType);
    $(valueTypeTd.childNodes[0]).bind("change", function() {
        parameter.ValueType = $(this).val();
    });
    $(row).append(valueTypeTd);
}
function createModDiv() {

}
function explainExpress(express, parentSpan, controlsOptionStr,pageDiv) {
    $(parentSpan).html("");
    var parameters = express.Parameters;
    var methodSpan = document.createElement("span");
    switch (express.Method) {
        case "getValue":
            {
                $(methodSpan).text("取值(");
                break;
            }
        case "sum":
            {
                $(methodSpan).text("求和(");
                break;
            }
        case "mod":
            {
                $(methodSpan).text("取模(");
                break;
            }
        case "connect":
            {
                $(methodSpan).text("连接(");
                break;
            }
        case "mul":
            {
                $(methodSpan).text("相乘(");
                break;
            }
        case "div":
            {
                $(methodSpan).text("相除(");
                break;
            }
        case "sub":
            {
                $(methodSpan).text("相减(");
                break;
            }
        case "max":
            {
                $(methodSpan).text("最大值(");
                break;
            }

        case "min":
            {
                $(methodSpan).text("最小值(");
                break;
            }
        case "avg":
            {
                $(methodSpan).text("平均值(");
                break;
            }
        case "count":
            {
                $(methodSpan).text("计数(");
                break;
            }
        case "not":
            {
                $(methodSpan).text("取非(");
                break;
            }
        case "between":
            {
                $(methodSpan).text("区间(");
                break;
            }
        case "and":
            {
                $(methodSpan).text("逻辑与(");
                break;
            }
        case "or":
            {
                $(methodSpan).text("逻辑或(");
                break;
            }

    }
    $(parentSpan).append(methodSpan);
    for (var i = 0; i < parameters.length; i++) {
        (function() {
            var p = parameters[i];
            if (p.PType == "valueParameter") {
                var name = p.Expression;
                var span = document.createElement("span");
                $(span).text(name);
                $(parentSpan).append(span);
            }
            else {
                var subSpan = document.createElement("span");
                explainExpress(p, subSpan, controlsOptionStr,pageDiv);
                $(parentSpan).append(subSpan);
            }
            if (i < parameters.length - 1) {
                var douhaoSpan = document.createElement("span");
                $(douhaoSpan).text(",");
                $(parentSpan).append(douhaoSpan);
            }
        })()
    }
    var symbolSpan = document.createElement("span");
    $(symbolSpan).text(")");
    $(parentSpan).append(symbolSpan);
    $(methodSpan).bind("click", function() {
        createFactorDiv(express, parentSpan, controlsOptionStr,pageDiv);
    });
}