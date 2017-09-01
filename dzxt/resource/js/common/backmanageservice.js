$(function() {
	var pageloade = false;
	var flowloade = false;
	var pagesetloade = false;
	var orgloade =false;
	var serverloade = false;
	var perloade = false;
	var powloade = false;
	var flowsetting=false;
    $(document).bind("contextmenu", function(e) {
        return true;
    });
    $("#myheader").find("a").bind("click", function() {
        var btnID = $(this).prop("id")

        $(document.getElementsByName("guanlxuanz")).css("background-color", "#008CBA");

        if (btnID != "backbtn") {
            $(this).css("background-color", "#FFFFFF");
        }
        if (btnID == "pagesetting") {
			if(!pagesetloade){
				$("#pagesetting_contentframe").attr("src", "../admin/pagesetting/editHTMLPage.htm");
				//pagesetloade = true;
			}
			$("#frontsetting_contentframe").css("display","none");
			$("#pagesetting_contentframe").css("display","block");
            $("#newpagesetting_contentframe").css("display","none");
			$("#personsetting_contentframe").css("display","none");
			$("#orgsetting_contentframe").css("display","none")
			$("#powersetting_contentframe").css("display","none");
			$("#serversetting_contentframe").css("display","none");
			$("#statichtml_contentframe").css("display","none")
			$("#flowsetting_contentframe").css("display","none");
			
				
            
        }
		else  if (btnID == "newpagesetting") {
			$("#newpagesetting_contentframe").attr("src", "../admin/pagedesign/form_desing.html");
            $("#frontsetting_contentframe").css("display","none");
            $("#pagesetting_contentframe").css("display","none");
            $("#newpagesetting_contentframe").css("display","block");
            $("#personsetting_contentframe").css("display","none");
            $("#orgsetting_contentframe").css("display","none")
            $("#powersetting_contentframe").css("display","none");
            $("#serversetting_contentframe").css("display","none");
            $("#statichtml_contentframe").css("display","none")
            $("#flowsetting_contentframe").css("display","none");
        }
        else if (btnID == "orgsetting") {
     
	   
			if(!orgloade){
				$("#orgsetting_contentframe").attr("src", "../admin/organizesetting/bumenTree.htm");
				orgloade = true;
			}
			$("#frontsetting_contentframe").css("display","none");
			$("#pagesetting_contentframe").css("display","none");
            $("#newpagesetting_contentframe").css("display","none");
			$("#personsetting_contentframe").css("display","none");
			$("#orgsetting_contentframe").css("display","block")
			$("#powersetting_contentframe").css("display","none");
			$("#serversetting_contentframe").css("display","none");
			$("#statichtml_contentframe").css("display","none")
			$("#flowsetting_contentframe").css("display","none");
        }	
        else if (btnID == "serversetting") {
        
             if(!serverloade){
				$("#serversetting_contentframe").attr("src", "../admin/cdmain/main.aspx");
				serverloade = true;
			}
			$("#frontsetting_contentframe").css("display","none");
            $("#pagesetting_contentframe").css("display","none");
            $("#newpagesetting_contentframe").css("display","none");
			$("#personsetting_contentframe").css("display","none");
			$("#orgsetting_contentframe").css("display","none")
			$("#powersetting_contentframe").css("display","none");
			$("#serversetting_contentframe").css("display","block");
			$("#statichtml_contentframe").css("display","none")
			$("#flowsetting_contentframe").css("display","none");
        }
        else if (btnID == "personsetting") {
			$("#frontsetting_contentframe").css("display","none");
			$("#pagesetting_contentframe").css("display","none");
            $("#newpagesetting_contentframe").css("display","none");
			$("#personsetting_contentframe").css("display","block");
			$("#orgsetting_contentframe").css("display","none")
			$("#powersetting_contentframe").css("display","none");
			$("#serversetting_contentframe").css("display","none");
			$("#statichtml_contentframe").css("display","none")
			$("#flowsetting_contentframe").css("display","none");
        }
        else if (btnID == "powersetting") {
        		if(!powloade){
				$("#powersetting_contentframe").attr("src", "../admin/powerdesign/quanxian.htm");
				powloade = true;
			}
			$("#frontsetting_contentframe").css("display","none");
        			$("#pagesetting_contentframe").css("display","none");
            $("#newpagesetting_contentframe").css("display","none");
			$("#personsetting_contentframe").css("display","none");
			$("#orgsetting_contentframe").css("display","none")
			$("#powersetting_contentframe").css("display","block");
			$("#serversetting_contentframe").css("display","none");
			$("#statichtml_contentframe").css("display","none")
			$("#flowsetting_contentframe").css("display","none");
    }
    else if (btnID == "flowsetting") {
	    if(!flowsetting){
		    $("#flowsetting_contentframe").attr("src", "../admin/flowsetting/index.htm");
		   flowsetting =true;
	   }
	   $("#frontsetting_contentframe").css("display","none");
	   			$("#pagesetting_contentframe").css("display","none");
            $("#newpagesetting_contentframe").css("display","none");
			$("#personsetting_contentframe").css("display","none");
			$("#orgsetting_contentframe").css("display","none")
			$("#powersetting_contentframe").css("display","none");
			$("#serversetting_contentframe").css("display","none");
			$("#statichtml_contentframe").css("display","none")
			$("#flowsetting_contentframe").css("display","block");
			
	}else if (btnID == "frontsetting") {
       // $("#contentframe").attr("src", "/admin/flowsetting/index.htm");
	    if(!flowloade){
		    $("#frontsetting_contentframe").attr("src", "../admin/frontsetting/index.htm");
		   flowloade =true;
	   }
			$("#pagesetting_contentframe").css("display","none");
            $("#newpagesetting_contentframe").css("display","none");
			$("#personsetting_contentframe").css("display","none");
			$("#orgsetting_contentframe").css("display","none")
			$("#powersetting_contentframe").css("display","none");
			$("#serversetting_contentframe").css("display","none");
			$("#statichtml_contentframe").css("display","none")
			$("#flowsetting_contentframe").css("display","none");
			$("#frontsetting_contentframe").css("display","block");
    }else if (btnID == "statichtml") {
	  if(!pageloade){ 
	   $("#statichtml_contentframe").attr("src", "../front/statichtml/index.htm");
		pageloade = true;
	   }
	  
	  		$("#frontsetting_contentframe").css("display","none");
			$("#statichtml_contentframe").css("display","block")
			$("#pagesetting_contentframe").css("display","none");
            $("#newpagesetting_contentframe").css("display","none");
			$("#personsetting_contentframe").css("display","none");
			$("#orgsetting_contentframe").css("display","none");
			$("#powersetting_contentframe").css("display","none");
			$("#serversetting_contentframe").css("display","none");
			
			$("#flowsetting_contentframe").css("display","none");
    }
	else if (btnID == "flowsetting2") {
	   $("#pagesetting_contentframe").attr("src", "/admin/flowsetting2/index.htm");
    }
        else if (btnID == "backbtn") {
            location.href = "/front/main/mainpage.php";
        }
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

});