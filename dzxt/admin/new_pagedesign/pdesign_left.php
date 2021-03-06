﻿<?php
session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=7">
<title>页面左边树</title>
<script type="text/javascript" src="/resource/js/jQuery/jquery-1.7.2.min.js"></script>
<script src="/resource/part/ligerlib/ligerUI/js/ligerui.min.js" type="text/javascript"></script>
<link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
<link href="/resource/part/ligerlib/ligerUI/skins/ligerui-icons.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
$(function(){
	var rmenu,actionNodeID,dd,left_tree,node_conet;
    var url="/s/tp/wwwroot/index.php?s=/Home/";
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
		parent.parent.OpenDialog("修改【"+node_conet.data.values[0].value+"】，请选择父结点","node_form",function(json)
		{
			var data = eval(json);
			$.ajax({
			type: "POST",
			url: "/s/function/freeparent.php",
			data: {"id":node_conet.data.id,"pid":data[0].selectid},	
			success: function(data)
			{
				data = eval('(' + data + ')');			
				parent.parent.toevel('$.ligerDialog.success("'+data.Message+'");');
				if(data.IsSuccess) 
				{
					left_tree.setData(eval('['+decodeURIComponent(data.tree)+']'));
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				parent.parent.toevel('$.ligerDialog.error("网络出错，请重试！");');
			}
			});

		},null,"loadDataTree");
	}
	function move_node(node,type)
	{
		$.ajax({
		type: "POST",
		url: "/s/function/movefreenode.php",
		data: {"id":node.data.id,"pid":node.data.parentId,"type":type},	
		success: function(data)
		{
			data = eval('(' + data + ')');			
			parent.parent.toevel('$.ligerDialog.success("'+data.Message+'");');
			if(data.IsSuccess) 
			{
				left_tree.setData(eval('['+decodeURIComponent(data.tree)+']'));
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			parent.parent.toevel('$.ligerDialog.error("网络出错，请重试！");');
		}
		});
	}
	function add_node(){
		if(node_conet.data.isLeaf)
		{
			parent.parent.toevel('$.ligerDialog.warn("在要文夹件里才能添加子节点");');
			return false;
		}
		parent.parent.toopen_nodeform({"node_id":actionNodeID,"act":"add"},"添加节点",function(data)
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
			parent.parent.toevel('$.ligerDialog.warn("文件名不能为空");');
			return false;
		}
		if(act=="add"){
			$.post(url+"Demo/add.html",
			{"pid": aid,"form_name":form_name,"ftype":ftype,"creater_uid":<?php echo $_SESSION['uid'];?>},
			   function(data){
				if(data.pw_flag==1)
				{
					parent.parent.toevel('$.ligerDialog.error("'+data.msg+'");');
					return false;
				}   
				parent.parent.toevel('$.ligerDialog.success("添加成功");');
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
						url:"/s/power/saveviewpower.php",
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
				   		parent.parent.toevel('$.ligerDialog.success("'+data.msg+'");');
						return false;
					} 
					parent.parent.toevel('$.ligerDialog.success("修改成功");');
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
		parent.parent.toopen_nodeform({"node_id":actionNodeID,"act":"edit","filetype":node_conet.data.type,"filename":cvalue},"修改 ["+cvalue+"] 节点",function(data)
		{
			data = eval('(' + data + ')');
			node_form_submit(data);
		},null);

	}
	function del_node(item){
		//alert("您没有权限操作删除！");
		//return false;
        if (!node_conet){
			parent.parent.toevel('$.ligerDialog.warn("请先选择节点");');
        }
		if (!confirm("确定要删除吗？")) return false;
		$.post(url+"Demo/del.html",
            {"form_id":actionNodeID},
		   function(data){
              if(data.flag==1){
                  if (node_conet){
                      left_tree.remove(node_conet.target);
					  parent.parent.toevel('$.ligerDialog.success("'+data.msg+'");');
                  }
              }else{
				  parent.parent.toevel('$.ligerDialog.error("'+data.msg+'");');
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
    left_tree=$("#dataTree").ligerTree({
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
            //console.log((item.values[1].value=="文件夹"));
            // return !(item.values[1].value=="文件夹");
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
				window.parent.frames["mainFrame"].location.href ='/admin/new_pagedesign/editReportForm.php?id='+node.data.id+'&name='+node.data.values[0].value;			
			else if(node.data.type==2)
				window.parent.frames["mainFrame"].location.href ='/admin/new_pagedesign/editLINKPage.php?id='+node.data.id+'&name='+node.data.values[0].value;
			else
				window.parent.frames["mainFrame"].location.href ='/admin/new_pagedesign/editHTMLPage.htm?id='+node.data.id+'&name='+node.data.values[0].value;
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
});
</script>
<style>
html,body{height:100%}
body { margin:0px;background-color: #F5F9FE; font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#000000;}
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
</head>
<body>
<div  class="admin_left_box">
<div id="left_tree">
<ul id="dataTree" style="height:auto"></ul>
</div>
</div>
<!--添加表单-->
<div id="node_form" style="width:180px; margin:3px; display:none;">  
<form action="" method="post" id="add_node_form">
    <dl>
    <dt>文件名：</dt><dd><input type="text" name="filename" id="filename" value="" /></dd>
    </dl>    
    <dl><dt>类型：</dt><dd>
	<select name="filetype" id="filetype">
    <option value="1">文件夹</option>
    <option value="0" id="chselected">页面</option>
    <option value="2">跳转地址</option>
	<option value="2">跳转地址</option>
  </select>
  </dd></dl>    
    <p>
    <input type="hidden" name="node_id" id="node_id" />
	<input type="hidden" name="act" id="act" value="add" />	
    <input type="submit" id="add_btn" value="确定"/>&nbsp;<input type="reset" id="reset" value="取消" />
</p>
 </form>
 </div>
 <!--添加结束-->
</body>
</html>