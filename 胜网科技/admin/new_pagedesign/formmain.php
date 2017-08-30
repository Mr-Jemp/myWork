<?php require_once("../../s/function/check_session.php");?>
<!DOCTYPE html>
<html>
<head>
<title>胜网</title>
<meta charset="utf-8" />
<link href="../../resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
<link href="../../resource/part/ligerlib/ligerUI/skins/ligerui-icons.css" rel="stylesheet" type="text/css" />
<script src="../../resource/part/ligerlib/jquery/jquery-1.11.1.min.js" type="text/javascript"></script>
<script src="../../resource/part/ligerlib/ligerUI/js/ligerui.all.js" type="text/javascript"></script>
<script src="../../resource/part/ligerlib/jquery.cookie.js" type="text/javascript"></script>
<script src="../../resource/part/ligerlib/json2.js"></script>
<script type="text/javascript">
var tab = null;
var accordion = null;
var tree = null;
var tabItems = [];
var ddd,rmenu_id,rmenu_ti,cu_tabid;
var rmenu,actionNodeID,dd,left_tree,node_conet;
var url="../../s/tp/wwwroot/index.php?s=/Home/";
$(function() {
    //布局
    $("#layout1").ligerLayout({ leftWidth: 200, height: '100%', heightDiff: -5, space: 4, onHeightChanged: f_heightChanged});
    var height = $(".l-layout-center").height();
    //Tab
    tab=$("#framecenter").ligerTab({
        height: height,
        showSwitchInTab: true,
        showSwitch: true,
        onAfterAddTabItem: function(tabdata) {
            tabItems.push(tabdata);
            saveTabStatus();
        },
        onAfterRemoveTabItem: function(tabid) {
            for (var i = 0; i < tabItems.length; i++) {
                var o = tabItems[i];
                if (o.tabid == tabid) {
                    tabItems.splice(i, 1);
                    saveTabStatus();
                    break;
                }
            }
        },
        onReload: function(tabdata) {
            var tabid = tabdata.tabid;
            addFrameSkinLink(tabid);
        },
        onAfterSelectTabItem: function (tabid)
        {
            cu_tabid=tabid;
        }
    });
    function retab(tabid){
        tab.reload(tabid);
    }
    //面板
    $("#accordion1").ligerAccordion({
        height: height - 24, speed: null
    });

    $(".l-link").hover(function() {
        $(this).addClass("l-link-over");
    }, function() {
        $(this).removeClass("l-link-over");
    });
    accordion = liger.get("accordion1");
    tree = liger.get("tissue_nav_tree");
    $("#pageloading").hide();
    css_init();
    pages_init();
    $("#left_tree").css("height",$(document.body).height()-30);
    $(document).bind("contextmenu", function(e) {
        return false;
    });
    $("#reset").click(function(){
        dd.hide();
    });
    rmenu = $.ligerMenu({ top: 100, left: 100, width: 120,
        items:[{ text: '添加子节点', click: add_node,icon:'add'},{ text: '更改节点名称', click: edit_node,icon:'edit'},{ text: '删除节点', click: del_node,icon:'delete'}
            ,{ text: '上拉', click: function(node){move_node(node_conet,-1);}}
            ,{ text: '下移', click: function(node){move_node(node_conet,1);}}
            ,{ text: '修改父结点', click: function(node){editparentid(node);}}
            ,{ text: '关闭', click: function(node){rmenu.hide();}}

        ]});
    function editparentid(node)
    {
        OpenDialog("修改【"+node_conet.data.values[0].value+"】，请选择父结点","node_form",function(json)
        {
            var data = eval(json);
            $.ajax({
                type: "POST",
                url: "../../s/function/freeparent.php",
                data: {"id":node_conet.data.id,"pid":data[0].selectid},
                success: function(data)
                {
                    data = eval('(' + data + ')');
                    toevel('$.ligerDialog.success("'+data.Message+'");');
                    if(data.IsSuccess)
                    {
                        left_tree.setData(eval('['+decodeURIComponent(data.tree)+']'));
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    toevel('$.ligerDialog.error("网络出错，请重试！");');
                }
            });

        },null,"loadDataTree");
    }
    function move_node(node,type)
    {
        $.ajax({
            type: "POST",
            url: "../../s/function/movefreenode.php",
            data: {"id":node.data.id,"pid":node.data.parentId,"type":type},
            success: function(data)
            {
                data = eval('(' + data + ')');
               toevel('$.ligerDialog.success("'+data.Message+'");');
                if(data.IsSuccess)
                {
                    left_tree.setData(eval('['+decodeURIComponent(data.tree)+']'));
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                toevel('$.ligerDialog.error("网络出错，请重试！");');
            }
        });
    }
    function add_node(){
        if(node_conet.data.isLeaf)
        {
           toevel('$.ligerDialog.warn("在要文夹件里才能添加子节点");');
            return false;
        }
        toopen_nodeform({"node_id":actionNodeID,"act":"add"},"添加节点",function(data)
        {
            data = eval('(' + data + ')');
            node_form_submit(data);
        },null);
    }
    function node_form_submit(from)
    {
        var form_name=from.filename;
        var aid=from.node_id;
        var act=from.act;
        var ftype=from.filetype;
        if(typeof(form_name)=="undefined" || form_name==""){
            toevel('$.ligerDialog.warn("文件名不能为空");');
            return false;
        }
        if(act=="add"){
            $.post(url+"Demo/add.html",
                {"pid": aid,"form_name":form_name,"ftype":ftype,"creater_uid":<?php echo $_SESSION['uid'];?>},
                function(data){
                    if(data.pw_flag==1)
                    {
                        toevel('$.ligerDialog.error("'+data.msg+'");');
                        return false;
                    }
                    toevel('$.ligerDialog.success("添加成功");');
                    var nodes = [];
                    data.type=data.isLeaf;
                    if(data.isLeaf==0 || data.isLeaf==2){data.isLeaf=true;}else{data.isLeaf=false;}
                    nodes.push(data);
                    if (node_conet)
                        left_tree.append(node_conet.target,nodes);
                    else
                        left_tree.append(null, nodes);

                    var formid=data.id;
                    var roleids='<?php
				echo implode(',',$_SESSION['uroles']);
				?>'.split(",");
                    if(roleids==null)return;
                    for(i=0;i<roleids.length;i++)
                    {
                        $.ajax({
                            url:"../../s/power/saveviewpower.php",
                            type:"post",
                            data:"role_id="+roleids[i]+"&form_id="+formid
                        });
                    }

                },"json");
        }else if(act=="edit"){
            $.post(url+"Demo/edit.html",
                {"form_id": aid,"pid":form_name,"form_name":form_name,"ftype":ftype},
                function(data){
                    if(data.pw_flag==1)
                    {
                        toevel('$.ligerDialog.success("'+data.msg+'");');
                        return false;
                    }
                    toevel('$.ligerDialog.success("修改成功");');
                    if(node_conet)
                    {
                        var datas={"id":aid
                            ,"values":[{"value":form_name}]
                            ,"isLeaf":(ftype==1?false:true)
                            ,"form_type":node_conet.data.form_type
                            ,"parentId":node_conet.data.parentId
                            ,"type":ftype
                            ,"content":""
                            ,"children":[]
                        };

                        var nodes = [];
                        nodes.push(datas);
                        left_tree.append(left_tree.getParentTreeItem(node_conet.target),nodes);
                        left_tree.remove(node_conet.target);
                    }
                },"json");
        }
        return false;
    };
    function edit_node(){
        var cvalue=node_conet.data.values[0].value;
        if(node_conet.data.isLeaf){
            $("#chselected").prop("selected",true);
        }
        toopen_nodeform({"node_id":actionNodeID,"act":"edit","filetype":node_conet.data.type,"filename":cvalue},"修改 ["+cvalue+"] 节点",function(data)
        {
            data = eval('(' + data + ')');
            node_form_submit(data);
        },null);

    }
    function del_node(item){
        //alert("您没有权限操作删除！");
        //return false;
        if (!node_conet){
            toevel('$.ligerDialog.warn("请先选择节点");');
        }
        if (!confirm("确定要删除吗？")) return false;
        $.post(url+"Demo/del.html",
            {"form_id":actionNodeID},
            function(data){
                if(data.flag==1){
                    if (node_conet){
                        left_tree.remove(node_conet.target);
                        toevel('$.ligerDialog.success("'+data.msg+'");');
                    }
                }else{
                    toevel('$.ligerDialog.error("'+data.msg+'");');
                }
            },"json");
    }
    fieldsStr="name;datatype";
    var showRoot=true;
    <?php
        include_once"../../s/inc/conn.php";
		include_once"../../s/function/public.php";
		$pow=getfreepower("",0,implode(',',$_SESSION['uroles']),'',$_SESSION['uid']);

    ?>
    var data=eval('['+('<?php echo ($pow[1]);?>')+']');
    //树
    left_tree=$("#tissue_nav_tree").ligerTree({
        data:data,
        checkbox: false,
        slide: false,
        nodeWidth: 64,
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
            var tabid = $(node.target).attr("tabid");
            if (!tabid)
            {
                tabid = new Date().getTime();
                $(node.target).attr("tabid", tabid)
            }
            if(!node.data.isLeaf)return false;
            if(node.data.type==3)
                f_addTab(tabid,node.data.values[0].value,encodeURI('./editReportForm2.php?id='+node.data.id+'&name='+node.data.values[0].value));
            else if(node.data.type==2)
                f_addTab(tabid,node.data.values[0].value,encodeURI('./editLINKPage2.php?id='+node.data.id+'&name='+node.data.values[0].value));
            else
                f_addTab(tabid,node.data.values[0].value,encodeURI('./editHTMLPage2.htm?id='+node.data.id+'&name='+node.data.values[0].value));
        },
        onContextmenu: function (node, e)
        {
            //if(node.data.isLeaf)return false;
            actionNodeID = node.data.id;
            node_conet=node;
            var left=e.pageX;
            var top=e.pageY;
            if(left+130>200)left=200-130;
            if(top+140>$(window).height())top=$(window).height()-140;
            rmenu.show({top:top,left:left});
            return false;
        }
    });
    var dialog;
    var openDialog;
    function OpenDialog(title,id,okCallback,cancelCallback,RefreshFun)
    {
        eval(RefreshFun+"()");
        dialog=$.ligerDialog.open({target: $("#"+id),title: title,width:450,buttons: [{ text: "确定", onclick:function()
        {
            dialog.hide();
            if(okCallback==null)return;
            //找出该ID下的所有表单数据
            var ifor=0,json="";
            for(ifor=0;ifor<1;ifor++)
            {
                var input=$("#"+id).find("input");
                if(input==null)break;
                var i=0,l=input.length,value="";
                for(i=0;i<l;i++)
                {
                    if(i>0)json+=",";
                    value=$(input[i]).val();
                    if($(input[i]).attr("type").toUpperCase()=="RADIO" && !$(input[i]).is(":checked"))value="";
                    if($(input[i]).attr("type").toUpperCase()=="CHECKBOX" && !$(input[i]).is(":checked"))value="";
                    json+="{";
                    json+='"'+$(input[i]).attr("name")+'"';
                    json+=":";
                    json+='"'+value+'"';
                    json+="}";
                }
                break;
            }
            okCallback("["+json+"]");
        } }, { text: "取消", onclick: function()
        {
            dialog.hide();
            if(cancelCallback)cancelCallback();
        }}]});
    }
    function loadDataTree()
    {
        $("#dataTree").html("");
        $.ajax({
            type: 'POST',
            url: '../../s/function/pageinfo.php',
            data: { type: "1" },
            success: function(data) {
                data = eval('(' + data + ')');
                if (!data.IsSuccess)return;
                data.tree=eval('[' + data.tree + ']');

                $("#dataTree").ligerTree({
                    data:data.tree,
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
                        $("#selectid").val(node.data.id);
                    }
                });
            }
        });
    }
    function toevel(code)
    {
        eval(code);
    }
    function toopen_nodeform(edit,title,okCallback,cancelCallback)
    {
        if(typeof(edit)=="object")
        {
            for(na in edit)$("#"+na).val(edit[na]);
        }
        return openDialog=$.ligerDialog.open({target:$("#target"),title: title,
            buttons: [{ text: "确定", onclick:function()
            {
                openDialog.hide();
                var json="{";
                var outs=$("#target .out");
                var i=0,l=outs.length;
                for(i=0;i<l;i++)
                {
                    if(i>0)json+=",";
                    json+='"'+outs.eq(i).attr("name")+'":"'+outs.eq(i).val()+'"';
                }
                json+="}";
                if(okCallback)okCallback(json);
            }}, { text: "取消", onclick: function()
            {
                openDialog.hide();
                if(cancelCallback)cancelCallback();
            }}]
        });
    }
});

function f_heightChanged(options) {
    if (tab)
        tab.addHeight(options.diff);
    if (accordion && options.middleHeight - 24 > 0)
        accordion.setHeight(options.middleHeight - 24);
}
function f_getTabId(text, url)
{
    for(i in tabItems)
    {
        if(tabItems[i].text==text && tabItems[i].url==url)
        {
            return tabItems[i].tabid;
        }
    }
    return -1;
}
function f_addTab(tabid, text, url) {
    var id=f_getTabId(text,url);
    if(id!=-1)tabid=id;
    tab.addTabItem({
        tabid: tabid,
        text: text,
        url: url,
        callback: function() {
            // addShowCodeBtn(tabid);
            // addFrameSkinLink(tabid);
        }
    });
}

function addShowCodeBtn(tabid) {
    var viewSourceBtn = $('<a class="viewsourcelink" href="javascript:void(0)">查看源码</a>');
    var jiframe = $("#" + tabid);
    viewSourceBtn.insertBefore(jiframe);
    viewSourceBtn.click(function() {
        showCodeView(jiframe.attr("src"));
    }).hover(function() {
        viewSourceBtn.addClass("viewsourcelink-over");
    }, function() {
        viewSourceBtn.removeClass("viewsourcelink-over");
    });
}
function showCodeView(src) {
    $.ligerDialog.open({
        title: '源码预览',
        url: 'dotnetdemos/codeView.aspx?src=' + src,
        width: $(window).width() * 0.9,
        height: $(window).height() * 0.9
    });

}
function addFrameSkinLink(tabid) {
    var prevHref = getLinkPrevHref(tabid) || "";
    var skin = getQueryString("skin");
    if (!skin) return;
    skin = skin.toLowerCase();
    attachLinkToFrame(tabid, prevHref + skin_links[skin]);
}
var skin_links = {
    "aqua": "lib/ligerUI/skins/Aqua/css/ligerui-all.css",
    "gray": "lib/ligerUI/skins/Gray/css/all.css",
    "silvery": "lib/ligerUI/skins/Silvery/css/style.css",
    "gray2014": "lib/ligerUI/skins/gray2014/css/all.css"
};
function pages_init() {
    var tabJson = $.cookie('liger-home-tab');
    if (tabJson) {
        var tabitems = JSON2.parse(tabJson);
        for (var i = 0; tabitems && tabitems[i]; i++) {
            f_addTab(tabitems[i].tabid, tabitems[i].text, tabitems[i].url);
        }
    }
}
function saveTabStatus() {
    $.cookie('liger-home-tab',JSON2.stringify(tabItems));
}
function css_init() {
    var css = $("#mylink").get(0), skin = getQueryString("skin");
    $("#skinSelect").val(skin);
    $("#skinSelect").change(function() {
        if (this.value) {
            location.href = "index.htm?skin=" + this.value;
        } else {
            location.href = "index.htm";
        }
    });


    if (!css || !skin) return;
    skin = skin.toLowerCase();
    $('body').addClass("body-" + skin);
    $(css).attr("href", skin_links[skin]);
}
function getQueryString(name) {
    var now_url = document.location.search.slice(1), q_array = now_url.split('&');
    for (var i = 0; i < q_array.length; i++) {
        var v_array = q_array[i].split('=');
        if (v_array[0] == name) {
            return v_array[1];
        }
    }
    return false;
}
function attachLinkToFrame(iframeId, filename) {
    if (!window.frames[iframeId]) return;
    var head = window.frames[iframeId].document.getElementsByTagName('head').item(0);
    var fileref = window.frames[iframeId].document.createElement("link");
    if (!fileref) return;
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);
    head.appendChild(fileref);
}
function getLinkPrevHref(iframeId) {
    if (!window.frames[iframeId]) return;
    var head = window.frames[iframeId].document.getElementsByTagName('head').item(0);
    var links = $("link:first", head);
    for (var i = 0; links[i]; i++) {
        var href = $(links[i]).attr("href");
        if (href && href.toLowerCase().indexOf("ligerui") > 0) {
            return href.substring(0, href.toLowerCase().indexOf("lib"));
        }
    }
}

function tuichu() {
    location.href = "/login.php";
}
</script>
<style type="text/css">
    body,html{height:100%; }
    body{ padding:0px; margin:0;   overflow:hidden;}
    .l-link{ display:block; height:26px; line-height:26px; padding-left:10px; text-decoration:underline; color:#333;}
    .l-link2{text-decoration:underline; color:white; margin-left:2px;margin-right:2px;}
    .l-layout-top{background:#102A49; color:White;}
    .l-layout-bottom{ background:#E5EDEF; text-align:center;}
    #pageloading{position:absolute; left:0px; top:0px; background:white url('../../resource/part/ligerlib/images/loading.gif') no-repeat center; width:100%; height:100%;z-index:99999;}
    .l-link{ display:block; line-height:22px; height:22px; padding-left:16px;border:1px solid white; margin:4px;}
    .l-link-over{ background:#FFEEAC; border:1px solid #DB9F00;}
    .l-winbar{ background:#2B5A76; height:30px; position:absolute; left:0px; bottom:0px; width:100%; z-index:99999;}
    .space{ color:#E7E7E7;}
    /* 顶部 */
    .l-topmenu{ margin:0; padding:0; height:31px; line-height:31px; background:url('../../resource/part/ligerlib/images/top.jpg') repeat-x bottom;  position:relative; border-top:1px solid #1D438B;  }
    .l-topmenu-logo{ color:#E7E7E7; padding-left:35px; line-height:26px;background:url('../../resource/part/ligerlib/images/topicon.gif') no-repeat 10px 5px;}
    .l-topmenu-welcome{  position:absolute; height:24px; line-height:24px;  right:30px; top:2px;color:#070A0C;}
    .l-topmenu-welcome a{ color:#E7E7E7; text-decoration:none}
    .l-topmenu-welcome a:hover{
        text-decoration:underline;
    }
    .body-gray2014 #framecenter{
        margin-top:3px;
    }
    .viewsourcelink {
        background:#B3D9F7;  display:block; position:absolute; right:10px; top:3px; padding:6px 4px; color:#333; text-decoration:underline;
    }
    .viewsourcelink-over {
        background:#81C0F2;
    }
    .l-topmenu-welcome label {color:white;
    }
    .l-topmenu-welcome label a{color:#FF0;
    }
    #skinSelect {
        margin-right: 6px;
    }
    .zdy span{
        position: relative;
        left: 3px;
        top: -6px;
    }
    .l-tab-content{height:93%;}
    #dataTree{
        background-color:"#F5F9FE";
    }
    #left_tree{
        height:300px;
        width:195px;
        overflow:hidden;
        overflow-y:auto;
        margin-left:5px;
    }
    dl {
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        margin: 0px;
        padding-top: 5px;
        padding-right: 0px;
        padding-bottom: 5px;
        padding-left: 0px;
        clear: both;
    }
    #node_form dt {
        float: left;
        width: 50px;
        text-align: right;
        background-color:"reb";
    }
    #node_form dd {
        float: left;
        text-align: left;
        margin: 0px;
        padding: 0px;
        height: 26px;
        line-height: 26px;
        width: 120px;
        background-color:"#fffooo";
    }
    #node_form dd input {
        height: 18px;
        width: 110px;
        line-height: 18px;
        border: 1px solid #CCC;
        padding-left:5px;
    }
    #node_form p
    {
        padding-left:10px;
        padding-top:10px;
    }
    #node_form p input
    {
        cursor:pointer;
        padding:2px 5px;
    }
    form{
        margin:0px;
        padding:0px;
    }

    #dataTree:first-child>li
    {
        /*overflow-x: scroll;
        overflow-y: scroll;
        height: 100%;
        width:195px;*/
    }

    .l-tree .l-body span
    {
        float:none;
    }
</style>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head>
<body style="padding:0px;background:#EAEEF5;">
<div id="pageloading"></div>
<div id="layout1" style="width:99.2%; margin:0 auto; margin-top:0px; ">
    <div position="left"  title="表单设置" id="accordion1!!!" style="height:95%;overflow:hidden;overflow-y:auto;">
        <ul id="tissue_nav_tree" style="margin-top:1px;"></ul>
    </div>
    <div position="center" id="framecenter">
        <div tabid="home" title="我的主页" style="height:300px">
            <iframe frameborder="0" name="home" id="home" src="form_index2.html"></iframe>
        </div>
    </div>
</div>
<!-- start -->
<div id="target" style="width:auto;height:auto; margin:3px; display:none;">
    <input type="hidden" name="node_id" id="node_id" class="out"/>
    <input type="hidden" name="act" id="act" value="add"  class="out"/>
    <p style="margin:5px">文件名：<input type="text" name="filename" id="filename" value=""  style="width:100px;"  class="out"/></p>
    <p style="margin:5px">类　型：<select name="filetype" id="filetype" style="width:105px;"  class="out">
            <option value="1">文件夹</option>
            <option value="0" id="chselected">页面</option>
            <option value="2">跳转地址</option>
            <option value="3">报表管理</option>
        </select></p>
</div>
<!-- ebd -->
</body>
</html>