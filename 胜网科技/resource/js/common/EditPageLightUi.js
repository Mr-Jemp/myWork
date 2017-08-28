$(function(event) {
    //    $(document).bind("contextmenu", function(e) {
    //        return false;
    //    });
    $("#layout1").ligerLayout({
        rightWidth: 250,
        height: '100%',
        heightDiff: -4,
        space: 4
    });
    var pageDiv = new HBSJsPageDiv();
    pageDiv.createPropertiesDiv();
    $("#designPanel").bind("click", function() {
        pageDiv.createPropertiesDiv();
    });
    $("#propertyDiv").tabs();
    function checkControlName(controlName) {
        var flag = false;
        for (var i = 0; i < pageDiv.Json.controls.length; i++) {
            if (pageDiv.Json.controls[i].name == controlName) {
                flag = true;
                break;
            }
        }
        return flag;
    }
    $(".readonlyClass").bind("click", function(event) {
        var select = $("input[name='readonlyRdo']:checked")[0];
        if (select.id == "readonly") {
            pageDiv.currentControl.Json.baseProperties.IsReadonly = true;
        }
        else {
            pageDiv.currentControl.Json.baseProperties.IsReadonly = false;
        }
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
    $("#FontSizeInput").bind("change", function(event) {
        var value = $(this).val();
        if (!checkInteger(value)) {
            alert("字体大小必须为整数!!");
            $(this).val(pageDiv.currentControl.Json.cssProperties.FontSize);
            return;
        }
        pageDiv.currentControl.Json.cssProperties.Width = FontSize;
        pageDiv.currentControl.changeFontSize();
    });
    $("#FontWeightInput").bind("click", function(event) {

    });
    $("#textAlignInput").bind("click", function(event) {

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
        var flag = checkControlName(name, false);
        if (flag) {
            alert("已经存在名称为" + name + "的控件！！");
            $("#nameInput").val(pageDiv.currentControl.Json.name);
            return false;
        }

        pageDiv.currentControl.Json.name = name;
        pageDiv.currentControl.changeName();
    });
    $("#liTextInput").bind("change", function(event) {
        var liText = $(this).val();
        pageDiv.currentControl.changeLiText(liText);
    });
    $("#linkEmbedInput").bind("change", function(event) {
        var linkEmbed = $(this).val();
        pageDiv.currentControl.changelinkEmbed(linkEmbed);
    });

    $("#liHrefInput").bind("change", function(event) {
        var liHref = $(this).val();
        pageDiv.currentControl.changeliHref(liHref);
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
        $("#popDiv").append(dialog.options.target);
        dialog.close();
    }
    function cancleDialog(item, dialog) {
        dialog.close();
    }
    $("#dataTypeInput").bind("click", function(event) {
        $.ligerDialog.open({ target: $("#dataTypeDiv"), title: "请选择字段的数据类型", buttons: [{ text: "确定", onclick: okDataType }, { text: "取消", onclick: cancleDialog}] });
    });
    $("#dateFormatInput").bind("click", function(event) {

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
            $(this).val(pageDiv.currentControl.Json.baseProperties.dataLength);
            return;
        }
        pageDiv.currentControl.Json.baseProperties.dataLength = value;
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

    function getDataviewOutputs(event, propertyName) {
        var dvJson = null;
        var dvId = -1;
        if (pageDiv.currentControl.Json.controlType == "listTableColumn") {
            dvJson = pageDiv.currentControl.tableDiv.dvJson;
            if (dvJson == null) {
                dvId = pageDiv.currentControl.tableDiv.Json.baseProperties.datasource.id;
            }
        }
        else {
            dvJson = pageDiv.currentControl.dvJson;
            if (dvJson == null) {
                dvId = pageDiv.currentControl.Json.baseProperties.datasource.id;
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
        pageDiv.currentControl.Json.group = name;
    });
    $(".getOptionType").bind("click", function() {
        var select = $("input[name='getOptionRdo']:checked")[0];
        if (select.id == "static") {
            pageDiv.currentControl.Json.getOptionType = true;
        }
        else {
            pageDiv.currentControl.Json.getOptionType = false;
        }
    });
    $("#optionInput").bind("click", function(event) {
        if (!pageDiv.currentControl.Json.getOptionType) {
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
            var options = pageDiv.currentControl.Json.options;
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
        for (var i = 0; i < pageDiv.currentControl.Json.options.length; i++) {
            (function() {
                var options = pageDiv.currentControl.Json.options;
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
            var s = $(pageDiv.currentControl.element.childNodes[0].childNodes[1])[0];
            if (s != null) {
                s.length = 0;
                for (var i = 0; i < pageDiv.currentControl.Json.options.length; i++) {
                    var v = pageDiv.currentControl.Json.options[i].value;
                    var t = pageDiv.currentControl.Json.options[i].text;
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
        //        pageDiv.currentControl.changeImageSrc(liHref);
        var pageId = pageDiv.Json.pageId;
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
        var str = pageDiv.currentControl.Json.Src;
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
                        pageDiv.currentControl.changeTreeSrcInput(liText);
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
        var images = pageDiv.Json.images;
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
                var effect = pageDiv.currentControl.Json.effect;
                effect.length = 0;
                effect.push($(this).prop("controlName"));
                effect.push($(this).prop("controlType"));
                $("#uploadFileInput").val($(this).prop("controlName"));
                $("#uploadFileInputMenu").remove();
            });
            $(this.element).append(a);
            $(this.element).append("<br/>");

        }
        var fileListings = pageDiv.Json.fileListings;
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
                var effect = pageDiv.currentControl.Json.effect;
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
    var fieldReplace = $("<li class='l-fieldcontainer l-fieldcontainer-r'></li>").appendTo("body").hide();
    $("#controlToolbox label").ligerDrag({ proxy: function() {
        var div = $("<div class='fieldproxy'></div>");
        //$(this).clone().appendTo(div);
        div.add(fieldReplace).width("190px");
        div.add(fieldReplace).height("28px");
        div.appendTo('body');
        return div;
    },
        revert: true, receive: '#designPanel',
        onStopDrag: function(current, e) {
            alert("---");
            var controlType = current.target[0].id;
            dragging = false;
            switch (controlType) {
                case "label":
                    {
                        var flag = checkControlName("标签0", false);
                        if (flag) {
                            alert("已经存在名称为标签0的控件！！");
                            return false;
                        }
                        field = new HBSJsLabel();
                        break;
                    }
                case "text":
                    {
                        var flag = checkControlName("文本框0", false);
                        if (flag) {
                            alert("已经存在名称为textbox0的控件！！");
                            return false;
                        }
                        field = new HBSJsTextbox();
                        break;
                    }
                case "select":
                    {
                        var flag = checkControlName("列表框0", false);
                        if (flag) {
                            alert("已经存在名称为列表框0的控件！！");
                            return false;
                        }
                        field = new HBSJsSelect();
                        break;
                    }
                case "date":
                    {
                        var flag = checkControlName("日期0", false);
                        if (flag) {
                            alert("已经存在名称为日期0的控件！！");
                            return false;
                        }
                        field = new HBSJsDate();
                        break;
                    }
                case "image":
                    {
                        var flag = checkControlName("image0", false);
                        if (flag) {
                            alert("已经存在名称为image0的控件！！");
                            return false;
                        }
                        field = new HBSJsImage();
                        break;
                    }
                case "checkbox":
                    {
                        var flag = checkControlName("复选框0", false);
                        if (flag) {
                            alert("已经存在名称为复选框0的控件！！");
                            return false;
                        }
                        field = new HBSJsCheckbox();
                        break;
                    }
                case "radio":
                    {
                        var flag = checkControlName("单选按钮0", false);
                        if (flag) {
                            alert("已经存在名称为单选按钮0的控件！！");
                            return false;
                        }
                        field = new HBSJsRadio();
                        break;
                    }
                case "listTable":
                    {
                        var flag = checkControlName("列表子表0", false);
                        if (flag) {
                            alert("已经存在名称为列表子表0的控件！！");
                            return false;
                        }
                        field = new HBSJsListTable();
                        break;
                    }
            }
            pageDiv.Json.controls.push(field);
            drawCanvas();
        }
    });
    function drawCanvas() {
        $("#formDesign").html("");
        var fieldUl = document.createElement("ul");
        fieldUl.id = "fieldUl";
        $(fieldUl).css("font-size", "16px");
        $(fieldUl).sortable();
        $("#formDesign").append(fieldUl);
        for (var i = 0; i < pageDiv.Json.controls.length; i++) {
            (function() {
                var field = pageDiv.Json.controls[i];
                var controlType = field.controlType;
                var controlDom;
                switch (controlType) {
                    case "label":
                        {
                            $(fieldUl).append('<li style="float:left;width:350px; margin-left:50px;margin-bottom:15px;overflow:hidden;"></li>');
                            var label = new HBSJsLabelDiv();
                            label.pageDiv = pageDiv;
                            label.Json = field;
                            label.createElement();
                            controlDom = label.element;
                            $("#fieldUl li:last-child").append(controlDom);
                            break;
                        }
                    case "textbox":
                        {
                            $(fieldUl).append('<li style="float:left;width:350px; margin-left:50px;margin-bottom:15px;overflow:hidden;"></li>');
                            var text = new HBSJsTextboxDiv();
                            text.pageDiv = pageDiv;
                            text.Json = field;
                            text.createElement();
                            controlDom = text.element;
                            $("#fieldUl li:last-child").append(controlDom);
                            break;
                        }
                    case "select":
                        {
                            $(fieldUl).append('<li style="float:left;width:350px; margin-left:50px;margin-bottom:15px;overflow:hidden;"></li>');
                            var select = new HBSJsSelectDiv();
                            select.pageDiv = pageDiv;
                            select.Json = field;
                            select.createElement();
                            controlDom = select.element;
                            $("#fieldUl li:last-child").append(controlDom);
                            break;
                        }
                    case "image":
                        {
                            $(fieldUl).append('<li style="float:left;width:350px; margin-left:50px;margin-bottom:15px;overflow:hidden;"></li>');
                            var image = new HBSJsImageDiv();
                            image.pageDiv = pageDiv;
                            image.Json = field;
                            image.createElement();
                            controlDom = image.element;
                            $("#fieldUl li:last-child").append(controlDom);
                            break;
                        }
                    case "date":
                        {
                            $(fieldUl).append('<li style="float:left;width:350px; margin-left:50px;margin-bottom:15px;overflow:hidden;"></li>');
                            var date = new HBSJsDateDiv();
                            date.pageDiv = pageDiv;
                            date.Json = field;
                            date.createElement();
                            controlDom = date.element;
                            $("#fieldUl li:last-child").append(controlDom);
                            break;
                        }
                    case "checkbox":
                        {
                            $(fieldUl).append('<li style="float:left;width:350px; margin-left:50px;margin-bottom:15px;overflow:hidden;"></li>');
                            var checkbox = new HBSJsCheckboxDiv();
                            checkbox.pageDiv = pageDiv;
                            checkbox.Json = field;
                            checkbox.createElement();
                            controlDom = checkbox.element;
                            $("#fieldUl li:last-child").append(controlDom);
                            break;
                        }
                    case "radio":
                        {
                            $(fieldUl).append('<li style="float:left;width:350px; margin-left:50px;margin-bottom:15px;overflow:hidden;"></li>');
                            var radio = new HBSJsRadioDiv();
                            radio.pageDiv = pageDiv;
                            radio.Json = field;
                            radio.createElement();
                            controlDom = radio.element;
                            $("#fieldUl li:last-child").append(controlDom);
                            break;
                        }
                    case "listTable":
                        {
                            $(fieldUl).append('<li style="float:left;width:350px; margin-left:50px;margin-bottom:15px;overflow:hidden;"></li>');
                            var listTable = new HBSJsListTableDiv();
                            listTable.pageDiv = pageDiv;
                            listTable.Json = field;
                            listTable.createElement();
                            controlDom = listTable.element;
                            $("#fieldUl li:last-child").append(controlDom);
                            break;
                        }
                }
            })()
        }
    }
});
