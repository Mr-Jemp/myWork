var HBSJsConditionTableRow = function() {
    this.element = null;
    this.condition = null;
    this.sourceObj = null;
    this.controlOpStr = "";
}
HBSJsConditionTableRow.prototype = {
    createRow: function() {
        var row = this.element;
        var condition = this.condition;
        var sourceObj = this.sourceObj;
        var limited = condition.limited;
        var opSymbol = condition.opSymbol;
        var value = condition.value;
        var connectSymbol = condition.connectSymbol;
        var delTd = document.createElement("td");
        $(delTd).html("<a href='#'>删除</a>");
        $(delTd).css("border", "1px solid black");
        var obj = this;
        $(delTd.childNodes[0]).bind("click", function() {
            $(row).remove();
            for (var i = 0; i < sourceObj.conditions.length; i++) {
                if (sourceObj.conditions[i] == condition) {
                    sourceObj.conditions.splice(i, 1);
                }
            }
        });
        $(row).append(delTd);
        var limitedTd = document.createElement("td");
        $(limitedTd).css("border", "1px solid black");
        $(limitedTd).html("<input type='text' value='" + limited.Parameters[0].Expression + "' style='width:95%';font-size:12px;' />");
        $(row).append(limitedTd);
        $(limitedTd.childNodes[0]).bind("click", function(event) {
            obj.createTablesDiv(this);
        });
        var opSymbolTd = document.createElement("td");
        $(opSymbolTd).css("border", "1px solid black");
        $(opSymbolTd).html("<select style='width:100%;font-size:12px;'><option value='='>等于</option><option value='!='>不等于</option><option value='>='>大或等于</option><option value='<='>小或等于</option><option value='>'>大于</option><option value='<'>小于</option><option value='近似'>近似</option></select>");
        $(row).append(opSymbolTd);
        $(opSymbolTd.childNodes[0]).val(opSymbol);
        $(opSymbolTd.childNodes[0]).bind("change", function() {
            condition.opSymbol = $(this).val();
        });
        var valueTd = document.createElement("td");
        $(valueTd).css("border", "1px solid black");
        var widthStr = "90%";
        if (sourceObj.tables == null) {
            widthStr = "20%";
        }
        $(valueTd).html("<input type='text' value='" + value.Parameters[0].Expression + "' id='expressInput' style='width:" + widthStr + "';font-size:12px;' /><img src='/images/add.gif'>");
        $(row).append(valueTd);
        $(valueTd.childNodes[0]).bind("change", function(event) {
            var p = new HBSJsValueParameter();
            p.Expression = $(this).val();
            condition.value.Method = "getValue";
            condition.value.Parameters.length = 0;
            condition.value.Parameters.push(p);
        });
        $(valueTd.childNodes[1]).bind("click", function(event) {
            obj.createExpressDiv(valueTd.childNodes[0]);
        });
        var connectSymbolTd = document.createElement("td");
        $(connectSymbolTd).css("border", "1px solid black");
        $(connectSymbolTd).html("<select disabled style='width:100%;font-size:12px;'><option value='or'>或者</option><option value='and'>而且</option></select>");
        $(row).append(connectSymbolTd);
        $(connectSymbolTd.childNodes[0]).val(connectSymbol);
        $(connectSymbolTd.childNodes[0]).bind("change", function() {
            condition.connectSymbol = $(this).val();
        });
    },
    createTablesDiv: function() {

    },
    createExpressDiv: function() { 
    
    }
}
var HBSJsSelectLimitDiv = function(src, value, ary) {
    $(".selectLimitItem").remove();
    var left = $(src).offset().left;
    var top = $(src).offset().top + 25;
    var popDiv = new GHKPopDiv(left, top, 300, 100, "selectLimitItem");
    var div = document.createElement("div");
    div.style.width = "120px";
    $(div).css("float", "left");
    div.style.height = "100%";
    div.style.backgroundColor = "gray";
    $(popDiv.element).append(div);
    var selectDiv = document.createElement("div");
    selectDiv.style.width = "180px";
    $(selectDiv).css("float", "left");
    selectDiv.style.height = "100%";
    selectDiv.style.position = "relative";
    selectDiv.style.backgroundColor = "#537fbe";
    var sel = document.createElement("select");
    $(sel).css("width", "100%");
    $(sel).css("position", "absolute");
    $(sel).css("left", "0px");
    $(sel).css("top", "10px");
    $(selectDiv).append(sel);
    var obj = this;
    $(sel).bind("change", function() {
        obj.selectLimit($(this).val());
        $(popDiv.element).remove();
    });
    $(popDiv.element).append(selectDiv);
    var ul = document.createElement("ul");
    $(ul).css("list-style", "none");
    $(ul).css("float", "left");
    $(ul).css("margin-top", "10px");
    $(ul).css("margin-left", "0px");
    $(div).append(ul);
    for (var i = 0; i < ary.length; i++) {
        (function() {
            var li = document.createElement("li");
            $(li).css("list-style", "none");
            $(li).css("float", "left");
            $(li).css("margin-left", "0px");
            $(li).css("text-align", "left");
            $(li).css("width", "100%");
            $(ul).append(li);
            $(li).text(ary[i].name);
            $(li).bind("click", function() {
                $(".selectLi").removeClass("selectLi");
                $(this).addClass("selectLi");
                var left = $(this).position().left;
                var top = $(this).position().top;
                $(sel).css("left", left);
                $(sel).css("top", top);
                $(sel).length = 0;
                var tableName = $(this).text();
                for (var i = 0; i < ary.length; i++) {
                    if (ary[i].name == tableName) {
                        var items = ary[i].items;
                        for (var k = 0; k < items.length; k++) {
                            var name = items[k];
                            var opName = tableName + "." + name;
                            var op = new Option(opName, opName);
                            if (value == opName) {
                                $(op).attr("selected", true);
                            }
                            $(sel)[0].options[k] = op;
                        }
                        if (items.length == 1) {
                            obj.selectLimit(tableName + "." + items[0]);
                        }
                    }
                }
            });
        })()
    }
}
HBSJsSelectLimitDiv.prototype = {
    selectLimit: function() {

    }
}
var HBSJsConditionLimit = function() {
    this.name = "";
    this.items = [];
} 