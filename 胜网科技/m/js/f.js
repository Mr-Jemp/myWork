$(function($) {
    $("#zuzhi-div").css("height",$(document.body).height()-70);
    // 左边树形目录的点击事件
    //    $("#treelist").find("a").bind("click", function() {
    //        //弹出框
    //        $.mobile.loading("show", {
    //            text: "加载中",
    //            textVisible: true,
    //            theme: 'a',
    //            textonly: false,
    //            html: ''
    //        });
    //        // <<< 弹出款    

    //        $.ajax({
    //            url: "geren.html",
    //            cache: false,
    //            success: function(html) {

    //                var iframe = $("#mainframe").prop('contentWindow');
    //                iframe.document.open();
    //                iframe.document.write(html);
    //                iframe.document.close();

    //                //$("#mainframe").prop('contentWindow').document.write(html);
    //                //  document.getElementById("mainframe").document.write(html);
    //                $.mobile.loading("hide");
    //            }
    //        });

    //    });



    $("#mainframe").load(function() {
        $.mobile.loading("hide");
    });


    // 设置底部菜单按钮事件
    $("#bottom-menu").find("a").bind("click", function() {
        //弹出框
        $.mobile.loading("show", {
            text: "加载中",
            textVisible: true,
            theme: 'a',
            textonly: false,
            html: ''
        });
        // <<< 弹出款
        if ($(this).attr('id') == "zuzhi") {
			getlefttree();
            $("#zuzhi-div").css("display", "");
            $("#geren-div").css("display", "none");
            $("#shezhi-div").css("display", "none");
        }
        if ($(this).attr('id') == "geren") {
            $("#zuzhi-div").css("display", "none");
            $("#geren-div").css("display", "");
            $("#shezhi-div").css("display", "none");
        }
        if ($(this).attr('id') == "shezhi") {
            $("#zuzhi-div").css("display", "none");
            $("#geren-div").css("display", "none");
            $("#shezhi-div").css("display", "");
        }

        $("#mainframe").attr("src", $(this).attr('url'));

    });
    //设置左边设置菜单点击事件
    $("#shezhi-div").find("a").bind("click", function() {
        //弹出框
        $.mobile.loading("show", {
            text: "加载中",
            textVisible: true,
            theme: 'a',
            textonly: false,
            html: ''
        });

        $("#mainframe").attr("src", $(this).attr('url'));
    });
    $("#geren-div").find("a").bind("click", function() {
        //弹出框
        $.mobile.loading("show", {
            text: "加载中",
            textVisible: true,
            theme: 'a',
            textonly: false,
            html: ''
        });

        $("#mainframe").attr("src", $(this).attr('url'));
    });
    var roleId = -1;
    $.ajax({ url: "/handler/runtimeWeb.ashx", async: false, dataType: "json", type: "POST", data: { operatetype: "getOrgDataTree" },
        success: function(data) {

            // user data 
            var user = data.user;
            var roles = user.Roles;
            var id = roles[0].id;
            var userName = user.Zhanghao;
            var password = user.Password;
            var serverip = $.trim(data.ip);
            $('#open_chat_form').click(function() { //打开聊天界面
												
            location.href = "http://" + serverip + ":8080/myservice/verify?username=" + userName + "&password=" + password;
            });
			$('#open_weixin').click(function() { 
            	location.href = "wewhat.html";
            });
			$('#open_weibo_form').click(function() { 
            	location.href = "wewhat.html";
            });
			$('#open_email_form').click(function() { 
            	location.href = "wewhat.html";
            });
			$('#open_book_form').click(function() { 
            	location.href = "wewhat.html";
            });
			$('#open_qt_form').click(function() { 
            	location.href = "wewhat.html";
            });
			
			$('#open_massege_form').click(function() { 
				
            	location.href = "wewhat.html";
            });
			$('#open_teacher_form').click(function() { 
            	location.href = "wewhat.html";
            });
			$('#open_hd_form').click(function() { 
            	location.href = "wewhat.html";
            });
			$('#open_cj_form').click(function() { 
            	location.href = "wewhat.html";
            });
			$('#open_role_form').click(function() { 
            	location.href = "wewhat.html";
            });
			$('#open_work_form').click(function() { 
            	location.href = "wewhat.html";
            });
			$('#open_zzqt_form').click(function() { 
            	location.href = "wewhat.html";
            });	
            $("#user-name").html($("#user-name").html() + userName);
            //getModelPowersTree(id);


        },

        error: function(xhr, stat, e) {
            alert("second");
        }
    });

});
/*
新添加左边树开始
*/
function getlefttree(){
	$.ajax({
	type: 'POST',
	url: '/handler/pageinfo.ashx',
	dataType : 'json',
	data: { action: "gettreedata" },
	success: function(data) {
		ddd=[data];						
		//树					  
	   $("#tissue_nav_tree").ligerTree({
						data:ddd,								
						checkbox: false,
						slide: false,
						nodeWidth: 120,                    
						render: function (item)
						{                        
							 return item.values[0].value;
						 },
						 isLeaf:function(item){
							return item.isLeaf;
						 },
						 isExpand: 2,
						 onselect: function (node)
						{
							$("#mainframe").attr("src", encodeURI('/front/contentHmtl.htm?name=' + node.data.id));							
						}						 
					});		
	}, error: function(xhr, stat, e) { 
		$("#tissue_nav_tree").html("没有数据");
	}
});
}

/*
新添加左边树结束
*/
function getModelPowersTree(id) {
    roleId = id;
    var ss = "";
    $.ajax({ url: "/handler/runtimeWeb.ashx", async: false, dataType: "json", type: "POST", data: { operatetype: "getPowerHtml5ForRole", roleId: escape(roleId) },
        success: function(data) {
            if (data.IsSuccess) {
                var powerStr = data.Data;
                var divUlHtml = powerStr.substring(0, powerStr.indexOf("---"));
                $("#zuzhi-div").html(divUlHtml);

                var UserFilePath = powerStr.substring(powerStr.indexOf("---") + 3);
                $("#userWangPan").on("click", function() {
                    location.href = "/front/html5pages/uopenHtml5.htm?oId=" + escape(UserFilePath) + "&mode=fileOpen";
                });
				
				
            }
            else {
                alert(data.Message);
            }



        },
        error: function(xhr, stat, e) {
            alert("third");
        }
    });
}
function hrefc(id, name) {
    $.ajax({ url: "/handler/runtimeWeb.ashx", type: "POST", data: { operatetype: "getPageHTML", name: escape(name), pageType: escape("html5") },
        success: function(data) {
            var iframe = $("#mainframe").prop('contentWindow');
            iframe.document.open();
            iframe.document.write(data);
            iframe.document.close();
            $.mobile.loading("hide");
        },
        error: function(xhr, stat, e) {
            var iframe = $("#mainframe").prop('contentWindow');
            iframe.document.open();
            iframe.document.write("当前页面没有编辑！");
            iframe.document.close();
            $.mobile.loading("hide");
        }
    });


}

 