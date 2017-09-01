function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
function ltrim(str) {
    return str.replace(/(^\s*)/g, "");
}
function rtrim(str) {
    return str.replace(/(\s*$)/g, "");
}
//整除的方法
function Div(exp1, exp2) {
    var n1 = Math.round(exp1); //四舍五入  
    var n2 = Math.round(exp2); //四舍五入  

    var rslt = n1 / n2; //除  

    if (rslt >= 0) {
        rslt = Math.floor(rslt); //返回小于等于原rslt的最大整数。  
    }
    else {
        rslt = Math.ceil(rslt); //返回大于等于原rslt的最小整数。  
    }

    return rslt;
}
function clone(jsonObj) {
    var buf;
    if (jsonObj instanceof Array) {
        buf = [];
        var i = jsonObj.length;
        while (i--) {
            buf[i] = arguments.callee(jsonObj[i]);
        }
        return buf;
    } else if (typeof jsonObj == "function") {
        return jsonObj;
    } else if (jsonObj instanceof Object) {
        buf = {};
        for (var k in jsonObj) {
            buf[k] = arguments.callee(jsonObj[k]);
        }
        return buf;
    } else {
        return jsonObj;
    }
}
function AddDays(date, days) {
    var nd = new Date(date);
    nd = nd.valueOf();
    nd = nd + days * 24 * 60 * 60 * 1000;
    nd = new Date(nd);
    var y = nd.getFullYear();
    var m = nd.getMonth() + 1;
    var d = nd.getDate();
    if (m <= 9) m = "0" + m;
    if (d <= 9) d = "0" + d;
    var cdate = y + "-" + m + "-" + d;
    return cdate;
}
function DateDiff(d1, d2, compareType) {
    var number = 24 * 60 * 60 * 1000;
    if (compareType == "second") {
        number = 1000;
    }
    else if (compareType == "minute") {
        number = 60 * 1000;
    }
    else if (compareType == "hour") {
        number = 60 * 60 * 1000;
    }
    try {
        var checkDate = stringToJsTime_(d1);
        var checkTime = checkDate.getTime();
        var checkDate2 = stringToJsTime_(d2);
        var checkTime2 = checkDate2.getTime();
        var cha = (checkTime - checkTime2) / number;
        return cha;
    } catch (e) {
        return false;
    }
}
function stringToJsTime_(timeString) {
    var y = timeString.substring(0, 4);
    var m = timeString.substring(5, 7) - 1;
    var d = timeString.substring(8, 10);
    var h = timeString.substring(11, 13);
    var mm = timeString.substring(14, 16);
    var ss = timeString.substring(17, 19);
    var time = new Date(y, m, d, h, mm, ss, 0);
    return time;
}
function jsTimeToString(time) {
    var year = time.getYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    var strTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return strTime;
}  
function selectImage(fieldName,pageId) { 
    $("#imageSrcInputMenu").remove();
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
        $.ajax({ url: "/handler/pageFileDao.ashx", type: "POST", async: false, data: { mode: escape("getFile"), pageId: escape(pageId),fieldName:escape(fieldName) },
            success: function(data) {
                //                alert(data);
                $($("#tableDiv")[0].childNodes[1]).remove();
                $("#tableDiv").append(data);
            },
            error: function(XMLHttpRequest, textStatus) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
                alert("出错了");
            }
        });
    });
    $(this.element).append(tableDiv);
    $.ajax({ url: "/handler/pageFileDao.ashx", type: "POST", async: false, data: { mode: escape("getFile"), pageId: escape(pageId), fieldName: escape(fieldName) },
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
}
function fuzhigeiImageSrc(a, fieldName) {
    //    alert($(a).attr("imageSrc"));
    if (fieldName == "") {
        setImageInDesign(a);
    }
    else {
        $("#" + fieldName).attr("src", $(a).attr("imageSrc"));
        changeFieldValue(fieldName, $(a).attr("imageSrc"));
    }
    $("#imageSrcInputMenu").remove();
}
function explain(jsonStr) {
    var jsonData = null;
    jsonData = eval('(' + jsonStr + ')');
    return jsonData;
}