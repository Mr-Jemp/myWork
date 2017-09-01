var DSJson = function() {
    this.Properties = [];
}
var HBSSearch = function() {
    this.Column = "id";
    this.GetValueMethod = "getValue";
    this.Ops = ['>', '<', '=', '!='];
}
var DSDefaultV = function() {
    this.Branchs = [];
}
var HBSColumnTable = function(designPage, table) {
    this.page = designPage;
    this.Json = new DSJson();
    var p = new DSColumnTableProperties();
    this.Json.Properties = p;
    this.table = table;
}
HBSColumnTable.prototype = {
    createElement: function() {
        var control = this;
        this.element = document.createElement("th");
        this.element.style.fontSize = control.Json.Properties.FontS;
        this.element.style.fontWeight = control.Json.Properties.FontW;
        this.element.style.color = control.Json.Properties.Color;
        this.element.style.border = "1px solid black";
        if (this.Json.Properties.Width != 0) {
            this.element.style.Width = control.Json.Properties.Width + "px";
        }
        $(this.element).css("textAlign", "center");
        $(this.element).html("<span contentEditable = 'true'>" + control.Json.Properties.Id + "</span>");
        if (this.page != null) {
            $(this.element).bind("click", function(event) {
                event.stopPropagation();
                var property = new GHKProperty(control);
                property.createElement();
            });
        }
    },
    deleteControl: function() {

    },
    changeBackColor: function() {

    },
    changeColor: function() {

    },
    changeFontsize: function() {

    },
    changeFontweight: function() {

    }
}
var DSColumnTableProperties = function() {
    this.Id = "";
    this.IsField = true;
    this.DataT = "nvarchar";
    this.DataL = "100";
    this.ReadO = false;
    this.Regex = "none";
    this.DefaultV = new DSDefaultV();
    this.FontS = "12px";
    this.BackC = "white";
    this.Color = "black";
    this.FontW = "normal";
    this.Width = "0";
}
var DSTableProperties = function() {
    this.ControlType = "table";
    this.Id = -1;
    this.PageName = "";
    this.TableType = "字段表格";
    this.BackC = "white";
    this.Color = "black";
    this.Left = 20;
    this.Top = 20;
    this.Width = 200;
    this.Height = 150;
    //    this.Border = null;
    this.Pagging = "";
    this.Searcher = [];
    this.ImportD = false;
    this.DataSource = "192.168.2.2";
    this.DataBase = "manageUser";
    this.User = "sa";
    this.Password = "www.mis3388.com";
    this.DataTable = "";
    this.DataV = null;
    this.ShowColumnH = null;
    this.Columns = [];
    this.Rows = [];
    this.Statistics = [];
    this.Formatter = null;
}
var HBSTableControl = function(designPage, runtimePage) {
    //单元格内控件：span text select image
    //获取所有数据到前台，逐页render或者逐页获取数据，再到前台render
    //查询
    //翻页(含隐藏列选项)
    //统计项
    //交叉表
    //二维表
    //单元格编辑
    //行的删除、修改、添加(焦点离开行，弹出保存或取消选项)
    //指定列
    //行的分组
    //行的分组统计与总统计
    //列的分组统计与总统计
    //当数据源是表单时，在获取列集合和数据集合时需要考虑到其包含一个或者多个子表
    this.page = designPage;
    this.Json = new DSJson();
    var p = new DSTableProperties();
    this.Json.Properties = p;
    this.runtimePage = runtimePage;
}
HBSTableControl.prototype = {
    createElement: function() {
        this.element = document.createElement("div");
        this.element.id = this.id + "Div";
        //        this.element.style.position = "absolute";
        this.element.style.border = "1px solid black";
        this.element.style.left = this.Json.Properties.Left + "px";
        this.element.style.top = this.Json.Properties.Top + "px";
        this.element.style.width = this.Json.Properties.Width + "px";
        this.element.style.height = this.Json.Properties.Height + "px";
        this.element.style.backgroundColor = this.Json.Properties.BackC;
        this.element.style.color = this.Json.Properties.Color;
        var obj = this;
        if (this.page != null) {
            $(this.element).draggable({
                stop: function(event, ui) {
                    var left = ui.position.left;
                    var top = ui.position.top;
                    obj.Json.Properties.Left = left;
                    obj.Json.Properties.Top = top;
                }
            });
            $(this.element).resizable({
                stop: function(event, ui) {
                    var width = ui.size.width;
                    var height = ui.size.height;
                    obj.Json.Properties.Width = width;
                    obj.Json.Properties.Height = height;
                }
            });
            $(this.element).bind("click", function(event) {
                var property = new HBSProperty(obj);
                property.createElement();
            });
            $(this.element).bind("keydown", function(event) {
                if (event.keyCode == "46") {
                    obj.deleteControl();
                }
            })
        }
        $(this.element).bind("mousedown", function(event) {
            event.stopPropagation();
            var button = event.which;
            if (button == 3) {
                var srcObj = event.target;
                var popMenu = new HBSPopTableMenu(obj, srcObj);
                var l = event.pageX;
                var t = event.pageY;
                //                popMenu.element.style.position = "absolute";
                popMenu.element.style.left = l;
                popMenu.element.style.top = t;
                document.body.appendChild(popMenu.element);
            }
        })
        this.topDiv = document.createElement("div");
        $(this.topDiv).css("width", "100%");
        $(this.element).append(this.topDiv);
        this.tableDiv = document.createElement("div");
        $(this.tableDiv).css("border", "1px solid black");
        var table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.fontSize = "12px";
        table.style.tableLayout = "fixed";
        table.style.left = "0px";
        table.style.top = "0px";
        table.style.width = "100%";
        table.style.cellspacing = 0;
        $(this.tableDiv).append(table);
        $(this.tableDiv).css("width", "100%");
        $(this.element).append(this.tableDiv);
        this.statisticsDiv = document.createElement("div");
        $(this.statisticsDiv).css("width", "100%");
        $(this.statisticsDiv).css("margin-top", "10px");
        $(this.element).append(this.statisticsDiv);
        this.bottomDiv = document.createElement("div");
        $(this.bottomDiv).css("width", "100%");
        $(this.bottomDiv).css("margin-top", "10px");
        $(this.element).append(this.bottomDiv);
        this.createPagging();
        this.createSearcher();
        this.createTable();
        this.createRecordRows();
    },
    createTable: function() {
        var table = $(this.tableDiv).children("table")[0];
        for (var i = table.rows.length - 1; i >= 0; i--) {
            table.deleteRow(i);
        }
        this.createColumnHeads();
        this.createRowHeads();
        this.createStatistics();
    },
    createStatistics: function() {
        var obj = this;
        $(this.statisticsDiv).html("");
        if (this.Json.Properties.Statistics.length > 0) {
            for (var i = 0; i < this.Json.Properties.Statistics.length; i++) {
                (function() {
                    var statistics = new HBSStatistics(obj.page, obj);
                    statistics.Json.Properties = obj.Json.Properties.Statistics[i].P;
                    statistics.createElement();
                    $(obj.statisticsDiv).append(statistics.element);
                })()
            }
            this.statisticsDiv.style.borderBottom = "1px solid black";
        }
    },
    createPagging: function() {
        var control = this;
        if (this.Json.Properties.Pagging == "normal") {
            this.topDiv.style.borderBottom = "1px solid black";
            var rowsPageSpan = document.createElement("span");
            var rowsOption = "";
            var rowsPage = [5, 10, 20, 50, 100];
            for (var i = 0; i < rowsPage.length; i++) {
                rowsOption = rowsOption + "<option value='" + rowsPage[i] + "'>" + rowsPage[i] + "</option>";
            }
            $(rowsPageSpan).html("<span>显示</span><select id='rowsPageSelect' style='font-size:9px;width:45px;'>" + rowsOption + "</select><span>行</span>");
            $(this.topDiv).append(rowsPageSpan);
            $("#rowsPageSelect").livequery("change", function() {
                control.getPageForNumber(1);
            });
            $(rowsPageSpan).css("float", "left");
            $(rowsPageSpan).css("margin-left", "20px");
            var tipSpan = document.createElement("span");
            $(tipSpan).css("float", "left");
            $(tipSpan).css("margin-left", "20px");
            $(tipSpan).html("<span id='infoTip'>显示1～10/56(总57过滤)</span>");
            $(this.bottomDiv).append(tipSpan);
            var paggingSpan = document.createElement("span");
            $(paggingSpan).css("float", "right");
            $(paggingSpan).css("margin-right", "20px");
            $(paggingSpan).css("font-size", "12px");
            $(paggingSpan).html('<a href="#">首页</a>&nbsp;&nbsp;<a href="#">上页</a>&nbsp;&nbsp;<input type="text" id="pageNumberTxt" style="width:20px;font-size:9px;">页&nbsp;&nbsp;<a href="#">下页</a>&nbsp;&nbsp;<a href="#">末页</a>');
            if (this.page == null) {
                $(paggingSpan).children("a").bind("click", function(event) {
                    var number = $("#pageNumberTxt").val();
                    var command = $(this).text();
                    switch (command) {
                        case "首页":
                            {
                                if (number == 1) {
                                    return;
                                }
                                number = 1;
                                control.getPageForNumber(number);
                                break;
                            }
                        case "上页":
                            {
                                if (number == 1) {
                                    alert("当前是首页！！");
                                    return;
                                }
                                number = parseInt(number) - 1;
                                control.getPageForNumber(number);
                                break;
                            }
                        case "下页":
                            {
                                var rowsPageSelect = $("#rowsPageSelect").val();
                                var endNumber = 0;
                                if (control.filter != null) {
                                    if (control.filter % rowsPageSelect == 0) {
                                        endNumber = Div(control.filter, rowsPageSelect);
                                    }
                                    else {
                                        endNumber = Div(control.filter, rowsPageSelect) + 1;
                                    }
                                }
                                else {
                                    if (control.totle % rowsPageSelect == 0) {
                                        endNumber = Div(control.totle, rowsPageSelect);
                                    }
                                    else {
                                        endNumber = Div(control.totle, rowsPageSelect) + 1;
                                    }
                                }
                                if (number == endNumber) {
                                    alert("当前是末页！！");
                                    return;
                                }
                                number = parseInt(number) + 1;
                                control.getPageForNumber(number);
                                break;
                            }
                        case "末页":
                            {
                                var rowsPageSelect = $("#rowsPageSelect").val();
                                var endNumber = 0;
                                if (control.filter != null) {
                                    if (control.filter % rowsPageSelect == 0) {
                                        endNumber = Div(control.filter, rowsPageSelect);
                                    }
                                    else {
                                        endNumber = Div(control.filter, rowsPageSelect) + 1;
                                    }
                                }
                                else {
                                    if (control.totle % rowsPageSelect == 0) {
                                        endNumber = Div(control.totle, rowsPageSelect);
                                    }
                                    else {
                                        endNumber = Div(control.totle, rowsPageSelect) + 1;
                                    }
                                }
                                if (number == endNumber) {
                                    alert("当前是末页！！");
                                    return;
                                }
                                number = endNumber;
                                control.getPageForNumber(number);
                                break;
                            }
                    }
                });
                $(paggingSpan).children("input").bind("keydown", function(event) {
                    event.stopPropagation();
                    var isNumber = checkInteger(this.value);
                    if (false) {
                        this.value = "";
                        return;
                    }
                    var rowsPageSelect = $("#rowsPageSelect").val();
                    var endNumber = 0;
                    if (control.filter != null) {
                        if (control.filter % rowsPageSelect == 0) {
                            endNumber = Div(control.filter, rowsPageSelect);
                        }
                        else {
                            endNumber = Div(control.filter, rowsPageSelect) + 1;
                        }
                    }
                    else {
                        if (control.totle % rowsPageSelect == 0) {
                            endNumber = Div(control.totle, rowsPageSelect);
                        }
                        else {
                            endNumber = Div(control.totle, rowsPageSelect) + 1;
                        }
                    }
                    var number = this.value;
                    if (number < 1 || number > endNumber) {
                        return;
                    }
                    if (event.keyCode == "13") {
                        control.getPageForNumber(number);
                    }
                });
            }
            $(this.bottomDiv).append(paggingSpan);
        }
    },
    createSearcher: function() {
        var control = this;
        if (this.Json.Properties.Searcher.length > 0) {
            this.topDiv.style.borderBottom = "1px solid black";
            var searchSpan = document.createElement("span");
            $(this.topDiv).append(searchSpan);
            $(searchSpan).css("float", "right");
            $(searchSpan).css("margin-right", "10px");
            $(searchSpan).css("white-space", "nowrap");
            var searchNameOption = "";
            var firstOpOptions = "";
            var searcher = this.Json.Properties.Searcher;
            for (var i = 0; i < searcher.length; i++) {
                var ops = searcher[i].Ops;
                var opStr = "";
                for (var j = 0; j < ops.length; j++) {
                    if (i == 0) {
                        firstOpOptions = firstOpOptions + "<option value='" + ops[j] + "'>" + ops[j] + "</option>";
                    }
                    opStr = opStr + ops[j] + ";";
                }
                opStr = opStr.substr(0, opStr.length - 1);
                searchNameOption = searchNameOption + '<option ops="' + opStr + '" value="' + searcher[i].Column + '">' + searcher[i].Column + '</option>';
            }
            var searchNameStr = '<select id="searchFieldSelect" style="font-size:12px;width:80px">' + searchNameOption + '</select>';
            var searchOpStr = "<select id='searchOpSelect' style='font-size:12px;width:45px'>" + firstOpOptions + "</select>";
            $(searchSpan).html(searchNameStr + searchOpStr + '<input type="text" id="searchValueText"  style="width:55px;font-size:12px;" />(<input type="radio" id="orRd" name="searchRd">或者&nbsp;<input id="andRd" type="radio" name="searchRd">而且&nbsp;)<a id="searchButton" style="font-size:12px;" href="#">查询</a>&nbsp;&nbsp;<a id="reset" style="font-size:12px;" href="#">重置</a>');
            $(searchSpan.childNodes[0]).bind("change", function(event) {
                searchSpan.childNodes[1].length = 0;
                var opsStr = this.options[this.selectedIndex].ops;
                var ops = opsStr.split(';');
                for (var i = 0; i < ops.length; i++) {
                    var option = new Option(ops[i], ops[i]);
                    searchSpan.childNodes[1].options[i] = option;
                }
            });
            if (this.page == null) {
                var tableName = control.Json.Properties.DataTable;
                var dataSource = this.Json.Properties.DataSource;
                var dataBase = this.Json.Properties.DataBase;
                var user = this.Json.Properties.User;
                var password = this.Json.Properties.Password;
                $("#searchButton").livequery("click", function(event) {
                    var field = $("#searchFieldSelect").val();
                    var op = $("#searchOpSelect").val();
                    var value = $("#searchValueText").val();
                    if (value == "") {
                        alert("查询值不能为空！！");
                        return;
                    }
                    var selectedRd = $('input:radio[name="searchRd"]:checked').attr("id");
                    var searchStr = "[" + field + "]" + op + "'" + value + "'";
                    $.ajax({ url: "/handler/HBSTableControl.ashx", type: "POST", async: false,
                        data: { operateType: "searchTable",
                            pageName: escape(tableName),
                            dataSource: escape(dataSource),
                            dataBase: escape(dataBase),
                            user: escape(user),
                            password: escape(password),
                            searchStr: escape(searchStr),
                            selectedRd: escape(selectedRd)
                        },
                        success: function(data) {

                            control.filter = data;
                            control.getPageForNumber(1);
                        },
                        error: function() {

                        }
                    });
                });
                $("#reset").livequery("click", function(event) {
                    control.getPageData();
                });
            }
        }
    },
    createFieldTabColumnHeads: function(columns) {
        var obj = this;
        var table = $(this.tableDiv).children("table")[0];
        var tr = table.insertRow();
        for (var i = 0; i < columns.length; i++) {
            (function() {
                var col = columns[i];
                var column = new HBSColumnTable(obj.page, obj);
                if (col.type == "listField") {
                    column.Json.Properties.Id = col.Json.Properties.Id
                }
                else {
                    column.Json.Properties = col.Json.Properties;
                }
                column.createElement();
                if (col.Json.Properties.Id == "isdelete") {
                    $(column.element).css("display", "none");
                }
                $(tr).append(column.element);
            })()
        }
    },
    createColumnHeads: function() {
        //数据表单获取字段组、columns集、数据视图输出集
        var obj = this;
        var columns = this.Json.Properties.Columns;
        if (columns.length == 0) {
            var dataV = this.Json.Properties.DataV;
            if (dataV == null || dataV.Outputs.length == 0) {
                var pageId = this.Json.Properties.Id;
                var pageName = this.Json.Properties.PageName;
                var dataSource = this.Json.Properties.DataSource;
                var dataBase = this.Json.Properties.DataBase;
                var user = this.Json.Properties.User;
                var password = this.Json.Properties.Password;
                if (pageName == "...") {
                    return;
                }
                else {
                    $.ajax({ url: "/handler/HBSTableControl.ashx", async: false, type: "POST", dataType: "json",
                        data: { operateType: "getPageColumns",
                            pageName: escape(pageName),
                            pageId: escape(pageId),
                            dataSource: escape(dataSource),
                            dataBase: escape(dataBase),
                            user: escape(user),
                            password: escape(password)
                        },
                        success: function(data) {
                            columns = data.fields;
                            obj.Json.Properties.Columns = columns;
                            var rows = obj.Json.Properties.Rows;
                            var table = $(obj.tableDiv).children("table")[0];
                            if (obj.Json.Properties.TableType == "crossTab") {

                            }
                            else if (obj.Json.Properties.TableType == "字段表格") {
                                obj.createFieldTabColumnHeads(columns);
                            }
                            else {

                            }
                        },
                        error: function() {
                            alert("表格的列还没有定义!!");
                            return false;
                        }
                    })
                }
            }
            else {
                columns = dataV.Outputs;
            }
        }
        else {
            if (obj.Json.Properties.TableType == "字段表格") {
                obj.createFieldTabColumnHeads(columns);
            }
        }
    },
    createCrossTabColumnHeads: function(columns) {

    },
    createRowHeads: function() {
        var obj = this;
        var columns = this.Json.Properties.Columns;
        var rows = this.Json.Properties.Rows;
        var page = this.page;
        var table = $(this.tableDiv).children("table")[0];
    },
    fillFieldTable: function() {
        var control = this;
        var begin = 0;
        var end = 0;
        var totle = 0;
        var filter = 0;
        var page = this.runtimePage;
        $(".recordRow").remove();
        if (page == null) {
            if (page != null && page.design) {
                for (var i = 0; i < 3; i++) {
                    var tr = table.insertRow();
                    for (var k = 0; k < columns.length; k++) {
                        var td = document.createElement("td");
                        $(td).html("<span>&nbsp;</span>");
                        td.style.border = "1px solid black";
                        $(tr).append(td);
                    }
                }
            }
        }
        else {
            begin = page.showRecords.begin;
            end = page.showRecords.end;
            totle = page.totleRecord;
            filter = page.filterCount;
            if (filter == null) {
                $("#infoTip").text("显示" + begin + "～" + end + "/(总" + totle + ")");
            }
            else {
                $("#infoTip").text("显示" + begin + "～" + end + "/" + filter + "(总" + totle + "过滤");
            }
            for (var i = 0; i < page.showRecords.records.length; i++) {
                (function() {
                    var row = page.showRecords.records[i];
                    var table = $(control.tableDiv).children("table")[0];
                    var tr = table.insertRow();
                    $(tr).addClass("recordRow");
                    for (var j = 0; j < row.normalFields.length; j++) {
                        (function() {
                            var fieldName = row.normalFields[j].name;
                            var td = document.createElement("td");
                            $(td).css("textAlign", "center");
                            td.style.border = "1px solid black";
                            var txt = row.normalFields[j];
                            if (txt.domType != "listTable") {
                                $(td).text(txt.text);
                                $(td).bind("click", function() {
                                    for (var k = 0; k < row.length; k++) {
                                        if (row[k].name == page.signField) {
                                            page.currentRecord.signFieldValue = row[k].value;
                                            fillForm(row, page);
                                        }
                                    }
                                });
                            }
                            else {
                                $(td).text("....");
                                $(td).bind("click", function(event) {
                                    var childTab = document.createElement("table");
                                    childTab.style.width = "100%";
                                    childTab.style.borderCollapse = "collapse";
                                    childTab.style.fontSize = "12px";
                                    childTab.style.textAlign = "center";
                                    childTab.style.border = "1px solid black";
                                    childTab.style.cellspacing = 0;
                                    document.body.appendChild(childTab);
                                    var headTr = childTab.insertRow();
                                    for (var k = 0; k < row.listTableFields.lenth; k++) {
                                        if (row.listTableFields[k].name == fieldName) {
                                            for (var k = 0; k < txt.columns.length; k++) {
                                                var th = document.createElement("th");
                                                $(th).text(txt.columns[k]);
                                                $(headTr).append(th);
                                            }
                                            for (var k = 0; k < txt.records.length; k++) {
                                                var childTr = childTab.insertRow();
                                                var childRow = txt.records[k];
                                                for (var m = 0; m < childRow.length; m++) {
                                                    var childTd = document.createElement("td");
                                                    $(childTd).text(childRow[m]);
                                                    childTd.style.border = "1px solid black";
                                                    $(childTr).append(childTd);
                                                }
                                            }
                                            var left = event.pageX - 150 + "px";
                                            var top = event.pageY + "px";
                                            var popDiv = new GHKPopDiv(left, top, 300, 200, "childTabPopDiv");
                                            popDiv.element.appendChild(childTab);
                                        }
                                    }                                   
                                });
                            }
                            $(tr).append(td);
                        })()
                    }
                    if (control.Json.Properties.Formatter != null) {
                        var htm = control.Json.Properties.Formatter(row);
                        var actionTd = document.createElement("td");
                        $(actionTd).css("textAlign", "center");
                        actionTd.style.border = "1px solid black";
                        $(actionTd).html(htm);
                        $(tr).append(actionTd);

                    }
                })();
            }
        }
    },
    createRecordRows: function() {
        if (this.Json.Properties.TableType == "字段表格") {
            this.fillFieldTable();
        }
    },
    createEmptyTable: function() {
        var obj = this;
        if (this.pagging != null || this.searching != null) {
            this.topDiv = document.createElement("div");
            $(this.topDiv).css("height", "25px");
            this.topDiv.style.borderBottom = "1px solid black";
            $(this.element).append(this.topDiv);
            if (this.pagging != null) {
                var rowsPageSpan = document.createElement("span");
                var rowsOption = "";
                var rowsPage = this.pagging.rowsPage;
                for (var i = 0; i < rowsPage.length; i++) {
                    rowsOption = rowsOption + "<option value='" + rowsPage[i] + "'>" + rowsPage[i] + "</option>";
                }
                $(rowsPageSpan).html("<span>显示</span><select id='rowsPageSelect' style='font-size:12px;width:45px;'>" + rowsOption + "</select><span>行</span>");
                $(this.topDiv).append(rowsPageSpan);
                $(rowsPageSpan).css("float", "left");
                $(rowsPageSpan).css("margin-left", "20px");
            }
            if (this.searching != null) {
                var searchSpan = document.createElement("span");
                $(this.topDiv).append(searchSpan);
                $(searchSpan).css("float", "right");
                $(searchSpan).css("margin-right", "10px");
                $(searchSpan).css("white-space", "nowrap");
                var searchNameOption = "";
                var firstOpOptions = "";
                for (var i = 0; i < this.searching.length; i++) {
                    var ops = this.searching[i].ops;
                    var opStr = "";
                    for (var j = 0; j < ops.length; j++) {
                        if (i == 0) {
                            firstOpOptions = firstOpOptions + "<option value='" + ops[j] + "'>" + ops[j] + "</option>";
                        }
                        opStr = opStr + ops[j] + ";";
                    }
                    opStr = opStr.substr(0, opStr.length - 1);
                    searchNameOption = searchNameOption + '<option ops="' + opStr + '" value="' + this.searching[i].name + '">' + this.searching[i].name + '</option>';
                }
                var searchNameStr = '<select style="font-size:12px;width:80px">' + searchNameOption + '</select>';
                var searchOpStr = "<select style='font-size:12px;width:40px'>" + firstOpOptions + "</select>";
                $(searchSpan).html(searchNameStr + searchOpStr + '<input type="text" id="valueText"  style="width:55px;font-size:12px;" /><input type="button" id="searchButton" value="查询" style="font-size:12px;" />');
                $(searchSpan.childNodes[0]).bind("change", function(event) {
                    searchSpan.childNodes[1].length = 0;
                    var opsStr = this.options[this.selectedIndex].ops;
                    var ops = opsStr.split(';');
                    for (var i = 0; i < ops.length; i++) {
                        var option = new Option(ops[i], ops[i]);
                        searchSpan.childNodes[1].options[i] = option;
                    }
                });
            }
        }
        this.tableDiv = document.createElement("div");
        var table = document.createElement("table");
        $(this.tableDiv).append(table);
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";
        if (this.isCrosstab) {
            var columnLeafCount = getJsonLeaf(this.columns, 0);
            var colDeepVar = new DeepVar(0, 0);
            colDeepVar = getJsonDeep(this.columns, colDeepVar);
            var rowLeafCount = getJsonLeaf(this.rows, 0);
            var rowDeepVar = new DeepVar(0, 0);
            rowDeepVar = getJsonDeep(this.rows, rowDeepVar);
            var countCount = rowDeepVar.deep + columnLeafCount;
            var rowCount = colDeepVar.deep + rowLeafCount;
            var tr = table.insertRow();
            var emptyTd = document.createElement("td");
            emptyTd.rowSpan = colDeepVar.deep;
            emptyTd.colSpan = rowDeepVar.deep;
            emptyTd.style.border = "1px solid black";
            $(tr).append(emptyTd);
            createCol(this.columns, this.columns, table, tr, colDeepVar);
        }
        else {
            if (isDesign) {
                var tr = table.insertRow();
                for (var i = 0; i < this.columns.length; i++) {
                    (function() {
                        var column = new HBSColumn(this.columns[i]);
                    })();
                }
            }
            else {

            }
        }
        $(this.element).append(this.tableDiv);
        table = document.createElement("table");
        if (this.hasPagging || this.hasStatistics) {
            this.bottomDiv = document.createElement("div");
            $(this.element).append(this.bottomDiv);
        }
    },
    getPageData: function(thePage, searchStr) {
        var control = this;
        var tableName = this.Json.Properties.DataTable;
        var dataSource = this.Json.Properties.DataSource;
        var dataBase = this.Json.Properties.DataBase;
        var user = this.Json.Properties.User;
        var password = this.Json.Properties.Password;
        this.runtimePage = thePage;
        var pageStr = JSON.stringify(thePage);
        $.ajax({ url: "/handler/HBSTableControl.ashx", dataType: "json", async: false, type: "POST",
            data: { operateType: "getPageData",
                pageName: escape(tableName),
                dataSource: escape(dataSource),
                dataBase: escape(dataBase),
                user: escape(user),
                password: escape(password),
                pageStr: escape(pageStr)
            },
            success: function(data) {
                if (searchStr != null) {
                    $.ajax({ url: "/handler/HBSTableControl.ashx", type: "POST", async: false,
                        data: { operateType: "searchTable",
                            pageName: escape(tableName),
                            dataSource: escape(dataSource),
                            dataBase: escape(dataBase),
                            user: escape(user),
                            password: escape(password),
                            searchStr: escape(searchStr),
                            selectedRd: escape(null)
                        },
                        success: function(data) {
                            if (data.Success) {
                                control.filter = data;
                                control.getPageForNumber(1);
                            }
                            else {

                            }
                            control.runtimePage = thePage;
                            return thePage;
                        },
                        error: function() {
                            control.runtimePage = thePage;
                            return thePage;

                        }
                    });
                }
                else {
                    thePage = data.Data;
                    control.totle = data.Data.totleRecord;
                    control.filter = null;
                    control.getPageForNumber(1, thePage);
                    control.runtimePage = thePage;
                    return thePage;
                }
            },
            error: function() {
                alert("数据库表单记录为空！！");
                control.runtimePage = thePage;
                return thePage;
            }
        })
    },
    getPageForNumber: function(number) {
        var control = this;
        var tableName = this.Json.Properties.DataTable;
        var dataSource = this.Json.Properties.DataSource;
        var dataBase = this.Json.Properties.DataBase;
        var user = this.Json.Properties.User;
        var password = this.Json.Properties.Password;
        var rowsPage = $("#rowsPageSelect").val();
        var begin = (number - 1) * rowsPage + 1;
        var end = number * rowsPage;
        var pageStr = JSON.stringify(this.runtimePage);
        $.ajax({ url: "/handler/HBSTableControl.ashx", type: "POST", dataType: "json",
            data: { operateType: "getTableRows",
                pageName: escape(tableName),
                dataSource: escape(dataSource),
                dataBase: escape(dataBase),
                user: escape(user),
                password: escape(password),
                begin: begin,
                end: end,
                pageStr: escape(pageStr)
            },
            success: function(data) {
                control.runtimePage = data.Data;
                control.createRecordRows();
                $("#pageNumberTxt").val(number);
            },
            error: function() {
                alert("数据库表单记录为空！！");
                return;
            }
        })
    },
    fillTableByPage: function() {

    },
    fillTableByDataview: function() {

    },
    fillTableByJsonData: function() {

    },
    firstPage: function() {

    },
    nextPage: function() {

    },
    numberPage: function() {

    },
    prePage: function() {

    },
    endPage: function() {

    },
    reset: function() {

    },
    search: function() {

    },
    insertRow: function() {

    },
    deleteRow: function() {

    },
    updateRow: function() {

    },
    addColumn: function() {

    },
    updateColumn: function() {

    },
    deleteColumn: function() {

    },
    hideColumn: function() {

    },
    hideRow: function() {

    },
    hightLightRow: function() {

    },
    hightLightColumn: function() {

    },
    singleColumnOrder: function() {

    },
    multiColumnOrder: function() {

    },
    changeWidth: function(width) {

    },
    changeHeight: function(height) {

    },
    deleteControl: function() {
        for (var i = 0; i < this.page.J.C.length; i++) {
            if (this.page.J.C[i].P == this.Json.Properties) {
                this.page.J.C.splice(i, 1);
            }
        }
        $(this.element).remove();
    }
}
var isOk = false;
var parents = [];
function fillForm(fields, runtimePage) {
    var normalFields = runtimePage.currentRecord.normalFields;
    for (var j = 0; j < fields.length; j++) {
        (function() {
            var field = fields[j];
            if (field.listTab == null) {
                var name = field.name;
                var txt = field.value;
                for (var i = 0; i < normalFields.length; i++) {
                    if (normalFields[i].name == name) {
                        normalFields[i].value = txt;
                        if (normalFields[i].domType == "checkbox" || normalFields[i].domType == "radio") {
                            $("input[name=" + name + "]").attr("checked", false);
                            var values = txt.split(';');
                            for (var k = 0; k < values.length; k++) {
                                $("#" + values[k]).attr("checked", true);
                            }
                        } else if (normalFields[i].domType == "image") {
                        if (txt == "") { $("#" + name).prop("src", "/resource/images/common/newlogo.gif"); } else {
                                $("#" + name).prop("src", txt);
                            }
                        }
                        else {
                            $("#" + name).val(txt);
                        }
                        break;
                    }
                }
            }
            else {
                var tbname = field.listTab;
                var columns = field.columns;
                var childRecords = field.records;
                var theTb = $("#" + tbname)[0];
                for (var i = theTb.rows.length - 1; i > 0; i--) {
                    theTb.deleteRow(i);
                }
                var childPage = null;
                for (var i = 0; i < runtimePage.currentRecord.listTableFields.length; i++) {
                    if (runtimePage.currentRecord.listTableFields[i].pageName == tbname) {
                        childPage = runtimePage.currentRecord.listTableFields[i];
                        break;
                    }
                }
                childPage.records.length = 0;
                for (var i = 0; i < childRecords.length; i++) {
                    (function() {
                        var addRowStr = "runtimePage.add" + tbname + "TableRow()";
                        eval(addRowStr);
                        var values = childRecords[i];
                        for (var m = 0; m < columns.length; m++) {
                            for (var t = 0; t < childPage.records[i].normalFields.length; t++) {
                                if (childPage.records[i].normalFields[t].name == columns[m]) {
                                    childPage.records[i].normalFields[t].value = values[m];
                                    $(theTb.rows[i + 1]).find("." + tbname + "_" + columns[m]).val(values[m]);
                                }
                            }
                        }
                    })()
                }
            }
        })()
    }
}
function createCol(rootJson, json, table, row, colDeepVar) {
    var leafCount = getJsonLeaf(json, 0);
    var deepVar = new DeepVar(0, 0);
    deepVar = getJsonDeep(json, deepVar);
    var td = document.createElement("td");
    td.colSpan = leafCount;
    var rowSpan = 1;
    if (json.children.length == 0) {
        parents = getJsonParents(rootJson, json, parents)
        searchParents(rootJson, json.name);
        rowSpan = colDeepVar.deep - parents.length;
        parents = [];
        isOk = false;
    }
    td.rowSpan = rowSpan;
    $(td).text(json.name);
    td.style.border = "1px solid black";
    $(row).append(td);
    for (var i = 0; i < json.children.length; i++) {
        var tr = table.insertRow();
        createCol(rootJson, json.children[i], table, tr, colDeepVar);
    }
}
function searchParents(json, searchName) {
    var first = true;
    for (var i = 0; i < json.children.length; i++) {
        var item = json.children[i];
        if (item.name == searchName) {
            if (first)
                parents.push(json);
            first = false;
        }
        searchParents(item, searchName);
    }
}
function getJsonParents(parentJson, json, parents) {
    if (parentJson.children.length == 0) {
        for (var i = 0; i < parents.length; i++) {
            if (parents[i] == parentJson) {
                parents.splice(i, 1);
            }
        }
    }
    else {
        parents.push(parentJson);
        for (var i = 0; i < parentJson.children.length; i++) {
            if (isOk) {
                break;
            }
            else {
                var data = parentJson.children[i];
                if (data == json) {
                    isOk = true;
                }
                if (!isOk) {
                    parents = getJsonParents(data, json, parents);
                }
            }
        }
    }
    return parents;
}
function getJsonLeaf(json, count) {
    if (json.children.length == 0) {
        count = count + 1;
    }
    else {
        for (var i = 0; i < json.children.length; i++) {
            var data = json.children[i];
            count = getJsonLeaf(data, count);
        }
    }
    return count;
}
var DeepVar = function(deep, count) {
    this.deep = deep;
    this.count = this.count;
}
function getJsonDeep(json, deepVar) {
    if (json.children.length == 0) {
        if (deepVar.deep < deepVar.count) {
            deepVar.deep = deepVar.count;
        }
        deepVar.count = 0;
    }
    else {
        deepVar.deep = deepVar.deep + 1;
        for (var i = 0; i < json.children.length; i++) {
            var data = json.children[i];
            deepVar = getJsonDeep(data, deepVar);
        }
    }
    return deepVar;
}
var HBSPopTableMenu = function(table, srcObj) {
    this.element = document.createElement("div");
    //    this.element.style.position = 'absolute';
    this.element.style.zIndex = 9999;
    this.element.style.width = "80px"
    this.element.style.backgroundColor = "#6cf";
    this.element.style.textAlign = "left";
    this.element.id = "popTableMenu";
    document.body.appendChild(this.element);
    var srcType = srcObj.tagName;
    var isOut = false;
    if (srcType == "DIV") {
        isOut = true;
    }
    var appendColumn = document.createElement("p");
    appendColumn.innerHTML = "<a href='#' id='addCol' style='width:100px;font-size:12px;'>添加表格列</a>";
    appendColumn.style.cursor = "pointer";
    appendColumn.style.margin = "4px";
    appendColumn.style.margin = "0px";
    this.element.appendChild(appendColumn);
    var appendRow = document.createElement("p");
    appendRow.innerHTML = "<a href='#' id='addRow' style='width:100px;font-size:12px;'>添加表格行</a>";
    appendRow.style.margin = "0px";
    appendRow.style.cursor = "pointer";
    appendRow.style.margin = "4px";
    this.element.appendChild(appendRow);
    if (!isOut) {
        var insertColumn = document.createElement("p");
        insertColumn.innerHTML = "<a href='#' id='insertCol' style='width:100px;font-size:12px;'>插入表格列</a>";
        insertColumn.style.cursor = "pointer";
        appendColumn.style.margin = "4px";
        insertColumn.style.margin = "0px";
        this.element.appendChild(insertColumn);
        var insertRow = document.createElement("p");
        insertRow.innerHTML = "<a href='#' id='insertRow' style='width:100px;font-size:12px;'>插入表格行</a>";
        insertRow.style.margin = "0px";
        insertRow.style.cursor = "pointer";
        insertRow.style.margin = "4px";
        this.element.appendChild(insertRow);
        var deleteColumn = document.createElement("p");
        deleteColumn.innerHTML = "<a href='#' id='delCol' style='width:100px;font-size:12px;'>删除表格列</a>";
        deleteColumn.style.margin = "0px";
        deleteColumn.style.cursor = "pointer";
        deleteColumn.style.margin = "4px";
        this.element.appendChild(deleteColumn);
        var deleteRow = document.createElement("p");
        deleteRow.innerHTML = "<a href='#' id='delRow' style='width:100px;font-size:12px;'>删除表格行</a>";
        deleteRow.style.margin = "0px";
        deleteRow.style.cursor = "pointer";
        deleteRow.style.margin = "4px";
        this.element.appendChild(deleteRow);
    }
    var addStatistics = document.createElement("p");
    addStatistics.innerHTML = "<a href='#' id='addStatistics' style='width:100px;font-size:12px;'>添加统计项</a>";
    addStatistics.style.margin = "0px";
    addStatistics.style.cursor = "pointer";
    addStatistics.style.margin = "4px";
    this.element.appendChild(addStatistics);
    var closeP = document.createElement("p");
    closeP.innerHTML = "<a href='#' id='close' style='width:100px;font-size:12px;'>关闭</a>";
    closeP.style.margin = "5px";
    closeP.style.cursor = "pointer";
    this.element.appendChild(closeP);
    $("#addCol").bind("click", function() {
        var colId = getColumnId(table.Json.Properties.Columns);
        var columnStr = "{\"P\":{\"Id\":\"" + colId + "\",\"ControlType\":\"columnTable\",\"IsField\":\"false\",\"Display\":\"block\",\"DataT\":\"nvarchar\",\"DataL\":\"100\",\"ReadO\":\"write\",\"Regex\":\"none\",\"DefaultV\":{\"V\":\"...\",\"Branchs\":[]},\"FontS\":\"12\",\"BackC\":\"white\",\"Color\":\"black\",\"FontW\":\"normal\",\"Width\":\"0\"}}";
        var column = eval('(' + columnStr + ')');
        table.Json.Properties.Columns.push(column);
        table.createTable();
        $("#popTableMenu").remove();
    });
    $("#addRow").bind("click", function() {
        $("#popTableMenu").remove();

    });
    $("#insertCol").bind("click", function() {
        var colId = getColumnId(table.Json.Properties.Columns);
        var cellIndex = -1;
        var cell = null;
        if (srcType == "TD" || srcType == "TH") {
            cell = srcObj;
        }
        else {
            cell = $(srcObj).parents("th")[0];
            if (cell == null) {
                cell = $(srcObj).parents("td")[0];
            }
        }
        cellIndex = cell.cellIndex;
        var columnStr = "{\"P\":{\"Id\":\"" + colId + "\",\"ControlType\":\"columnTable\",\"IsField\":\"false\",\"Display\":\"block\",\"DataT\":\"nvarchar\",\"DataL\":\"100\",\"ReadO\":\"write\",\"Regex\":\"none\",\"DefaultV\":{\"V\":\"...\",\"Branchs\":[]},\"FontS\":\"12\",\"BackC\":\"white\",\"Color\":\"black\",\"FontW\":\"normal\",\"Width\":\"0\"}}";
        var column = eval('(' + columnStr + ')');
        table.Json.Properties.Columns.splice(cellIndex, 0, column);
        table.createTable();
        $("#popTableMenu").remove();
    });
    $("#insertRow").bind("click", function() {
        $("#popTableMenu").remove();

    });
    $("#delCol").bind("click", function() {
        if (srcType == "TD" || srcType == "TH") {
            cell = srcObj;
        }
        else {
            cell = $(srcObj).parents("th")[0];
            if (cell == null) {
                cell = $(srcObj).parents("td")[0];
            }
        }
        cellIndex = cell.cellIndex;
        table.ColumnHeads.splice(cellIndex, 1);
        table.createTable();
        $("#popTableMenu").remove();
    });
    $("#delRow").bind("click", function() {
        $("#popTableMenu").remove();

    });
    $("#addStatistics").bind("click", function() {
        var statisticsId = getStatisticsId(table.Json.Properties.Statistics);
        var statistics = new HBSStatistics();
        var property = new DSStatisticsProperties();
        property.Id = statisticsId;
        statistics.Json.Properties = property;
        table.Json.Properties.Statistics.push(statistics.J);
        table.createStatistics();
        $("#popTableMenu").remove();
    });
    $("#close").bind("click", function() {
        $("#popTableMenu").remove();
    });
}
function getColumnId(columns) {
    var id = "列";
    for (var i = 0; ; i++) {
        id = "列" + i;
        var isIn = false;
        for (var j = 0; j < columns.length; j++) {
            if (id == columns[j].P.Id) {
                isIn = true;
                break;
            }
        }
        if (!isIn) {
            break;
        }
    }
    return id;
}
function getStatisticsId(statistics) {
    var id = "统计项";
    for (var i = 0; ; i++) {
        id = "统计项" + i;
        var isIn = false;
        for (var j = 0; j < statistics.length; j++) {
            if (id == statistics[j].P.Id) {
                isIn = true;
                break;
            }
        }
        if (!isIn) {
            break;
        }
    }
    return id;
}
var HBSColumnListTable = function(display, name, width, sortable, align) {
    //{display: 'ISO', name : 'iso', width : 40, sortable : true, align: 'center'},
    this.display = display;
    this.name = name;
    this.width = width;
    this.sortable = sortable;
    this.align = align;
}
var HBSColumnListTable = function(name, display, width, color, fontSize, fontWeight, isField, inView, isStatistics) {
    this.name = name;
    this.display = display;
    this.width = width;
    this.color = color;
    this.fontSize = fontSize;
    this.fontWeight = fontWeight;
    this.isField = isField;
    this.inView = inView;
    this.isStatistics = isStatistics;
    this.children = [];

}
var HBSRowListTable = function(name, display, height, color, isStatistics) {
    this.name = name;
    this.display = display;
    this.height = height;
    this.color = color;
    this.isStatistics = isStatistics;
    this.children = [];
}
