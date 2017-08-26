var serverip;
var userName;
var password;
var allfun;

function mr_tree_nav(a){	
		var re_mainav=$("#main_tree_nav");
		var re_nav='&nbsp;&nbsp;当前位置：<a href="#">首页</a>';
		var re_nav2='';			
		$(a).parents('li').each(function (index, domEle) {	
			//var title_id=$(this).parent().parent().prop("id");
			var title_id=$(this).prop("id");					  
			var title=$(this).find('span').first().html(); 			
			re_nav2='- <a href="#" class="'+title_id+'" onclick="chan_node_id('+title_id+');">'+title+'</a>'+re_nav2;						  
		});
		re_mainav.html(re_nav+re_nav2);
}	


function chan_node(a){
	console.log(a);
		var $coo=$(a).parent().nextAll().clone(true);			
			$coo=$coo.find(".sub").remove().end().find("li").removeAttr("style").end();			
			$("#main_tree_nav").html();
			$("#main_nav_tree_conent").css("display", "block");
            $("#main_tree_conent").html($coo);
			mr_tree_nav(a);			
            $("#main-content").css("display", "none");
            $("#benti").css("display", "none");
            $("#sidebarDiv").css("display", "none");
}
	

	
$(function(event) {
    //    $(document).bind("contextmenu", function(e) {
    //        return true;
    //    });
    //    $("#gzml").on("click", function() {
    //        $("#sidebar").css("display", "block");
    //        $("#filePathDiv").css("display", "none");
    //    })
    //    $("#gsgxwp").on("click", function() {
    //        $("#sidebar").css("display", "none");
    //        $("#filePathDiv").css("display", "block");
    //    })
    var roleId = -1;
	

	
	
    $("img").livequery("click", function() {
        var li = $(this).parent().parent();
        var theUl = $(li).children("ul");
        if (this.className == "add") {
            $(theUl).css("display", "block");
            this.className = "sub";
            this.src = "/resource/images/common/SubImg.bmp";
        }
        else if (this.className == "sub") {
            $(theUl).css("display", "none");
            this.className = "add";
            this.src = "/resource/images/common/addImg.bmp";
        }
        if (this.className == "waixia") {
            var wli = $(this).parent().parent();
            var thewUl = $(wli).children("ul");
            $(thewUl).css("display", "none");
            this.className = "waiyou";
            this.src = "/resource/images/common/waiyou.gif";
        } else if (this.className == "waiyou") {
            var wli = $(this).parent().parent();
            var thewUl = $(wli).children("ul");
            $(thewUl).css("display", "block");
            this.className = "waixia";
            this.src = "/resource/images/common/waixia.gif";
        }
        if (this.className == "lixia") {
            $(theUl).css("display", "none");
            this.className = "liyou";
            this.src = "/resource/images/common/liyou.gif";
        } else if (this.className == "liyou") {
            $(theUl).css("display", "block");
            this.className = "lixia";
            this.src = "/resource/images/common/lixia.gif";
        }
        if (this.className == "waigaun"||this.className == "liguan") {
			chan_node(this);
			/*var parentNode = this.parentNode;
            var oId = parentNode.parentNode.id;			
           $("#workDiv").attr("src", "/front/UploadFile/Uopen.htm?oId=" + oId + "&mode=fileOpen");*/
			
        }
       /*
	    if (this.className == "liguan") {
            var parentNode = this.parentNode;
            var oId = parentNode.parentNode.id;
            $("#main-content").css("display", "none");
            $("#benti").css("display", "block");
            $("#sidebarDiv").css("display", "none");
            $("#workDiv").attr("src", "/front/UploadFile/Uopen.htm?oId=" + oId + "&mode=fileOpen");
        }*/
        var curWwwPath = window.document.location.href;
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        var localhostPath = curWwwPath.substring(0, pos);
        if (this.src == localhostPath + "/resource/images/common/guan.bmp") {
            //            this.src = "/resource/images/common/open.bmp";
            //            alert(theUl[0].getElementsByTagName("li").length);
            //            $(theUl).css("display", "none");
            var parentNode = this.parentNode;
            var oId = parentNode.id;
            //            parentNode.firstChild.src = localhostPath + "/resource/images/common/addImg.bmp";

            //alert($(li.getElementsByTagName("label")).html());
            $("#workDiv").attr("src", "/front/UploadFile/Uopen.htm?oId=" + oId + "&mode=fileOpen");

        }
        //         else if (this.src == localhostPath + "/resource/images/common/open.bmp") {
        //            this.src = "/resource/images/common/guan.bmp";
        //            var parentNode = this.parentNode;
        //            parentNode.firstChild.src = localhostPath + "/resource/images/common/SubImg.bmp";
        //            $(theUl).css("display", "block");
        //            $("#workDiv").attr("src", "");
        //        }
    });


    /////登陆名 密码
    /*
    $.ajax({ url: "/handler/runtimeWeb.ashx", async: false, dataType: "json", type: "POST", data: { operatetype: "getUserPower" },
    success: function(data) {
    var roles = data.Roles;
    userName = data.Zhanghao;
    password = data.Password;

            $("#yhid").html(userName);

            // 群

            for (var i = 0; i < roles.length; i++) {
    var roleId = roles[i].id;
    var roleName = roles[i].name;
    var op = new Option(roleName, roleId);
    }


            var id = roles[0].id;
    getModelPowersTree(id);
    },
    error: function(xhr, stat, e) {
    alert("second");
    }
    });*/


    // 登陆成功后，获得组织页面左边的树
    $.ajax({ url: "/handler/runtimeWeb.ashx", async: false, dataType: "json", type: "POST", data: { operatetype: "getOrgDataTree" },
        success: function(data) {

            // user data 
            var user = data.user;
            var roles = user.Roles;
            userName = user.Zhanghao;
            password = user.Password;
            serverip = $.trim(data.ip);

            $("#yhid").html(userName);

            // 群

            for (var i = 0; i < roles.length; i++) {
                var roleId = roles[i].id;
                var roleName = roles[i].name;
                var op = new Option(roleName, roleId);
            }

            // 组织左边的数
            var tree = data.orgTree;

            if (tree.IsSuccess) {
                $("#sidebar").append(tree.Data);
				$("#test").append(tree.Data);
				
                $("#sidebar").find("a").bind("click", function(event) {
                    event.stopPropagation();
                    var modelId = $(this).attr("id");
                    var datatype = $(this).attr("datatype");
                    var modelName = $(this).text();
                    if (datatype == "页面") {
						
                        $("#main-content").css("display", "none");
                        $("#benti").css("display", "block");
                        $("#sidebarDiv").css("display", "none");
						$("#main_nav_tree_conent").css("display", "none");
                        $("#workDiv").attr("src", encodeURI("/contentHmtl.htm?name=" + modelName));
                    }
                    else {

                    }
                    return false;
                });
            }


        },

        error: function(xhr, stat, e) {
             // alert("second");
        }
    });



    $.ajax({ url: "/handler/runtimeWeb.ashx", async: false, type: "POST", data: { operatetype: "getCompany" },
        success: function(data) {
            $("#comname").html("公司代码：" + data);
        },
        error: function(xhr, stat, e) {
            //alert("second");
        }
    });
    $("#roleSelect").bind("change", function() {
        var id = this.value;
        getModelPowersTree(id);
    });

    $("#qq").bind("click", function() {

    })
    $("#email").bind("click", function() {

    })
    $("#info").bind("click", function() {

    })


    // 获得左边的树
    function getModelPowersTree(id) {
        roleId = id;
        $("#sidebar").html("");
        $.ajax({ url: "/handler/runtimeWeb.ashx", async: false, dataType: "json", type: "POST", data: { operatetype: "getPowerHtmlForRole", roleId: escape(roleId) },
            success: function(data) {
                if (data.IsSuccess) {
                    $("#sidebar").append(data.Data);
                    $("#sidebar").find("a").bind("click", function(event) {
                        event.stopPropagation();
                        var modelId = $(this).attr("id");
                        var datatype = $(this).attr("datatype");
                        var modelName = $(this).text();
                        if (datatype == "页面") {

                            $("#main-content").css("display", "none");
                            $("#benti").css("display", "block");
                            $("#sidebarDiv").css("display", "none");

                            $("#workDiv").attr("src", "/front/contentHmtl.htm?modelId=" + escape(modelId));
                        }
                        else {

                        }
                        return false;
                    });
                }
            },
            error: function(xhr, stat, e) {
                alert("third");
            }
        });
    }
});