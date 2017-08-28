<?php if (!defined('THINK_PATH')) exit();?>﻿<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>流程管理</title>
<link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
<link href="/resource/part/ligerlib/ligerUI/skins/ligerui-icons.css" rel="stylesheet" type="text/css" />
<script src="/resource/part/ligerlib/jquery/jquery-1.5.2.min.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/ligerUI/js/ligerui.all.js" type="text/javascript"></script> 
<script src="/resource/part/ligerlib/jquery.cookie.js" type="text/javascript"></script>	 
<script src="/resource/part/ligerlib/json2.js"></script>
<script>
var manager;
<?php echo ($flowData); ?>
$(function(){
    <?php if($flag == 'getmyflow'): ?>$("#flowlist").ligerGrid({
                columns: [
                    {display: '主键', name:'id', width: 100 } ,
                    { display: '内容', name:'msg', minWidth: 260 },
                    { display: '状态', name:'status', minWidth: 160 },
                    { display: '申请时间', name:'dateline', width: 200, align: 'left' },
                    { display: '操作', isSort: false, width: 120, render: function (rowdata, rowindex, value)
                    {
                        var h = "";
                        h += "[ <a href='javascript:chulinode(" + rowdata.id + ")'>浏览</a> ] ";
                        return h;
                    }
                    }
                ],
                data: flowData, pageSize: 20,width: '100%', height: '99%', checkbox: false
            });
    <?php else: ?>
	$("#flowlist").ligerGrid({
		columns: [
			{display: '主键', name:'id', width: 100 } ,
			{ display: '内容', name:'msg', minWidth: 260 },
			{ display: '申请时间', name:'dateline', width: 200, align: 'left' },
            { display: '操作', isSort: false, width: 120, render: function (rowdata, rowindex, value)
            {
                var h = "";
                if(rowdata.status){
                    h += "[ <font style=\"color:red\">" + rowdata.status + "</font> ]";
                }else{
                    h += "[ <a href='javascript:chulinode(" + rowdata.id + ")'>处理</a> ] ";
                }

                return h;
            }
            }
		], 
		data: flowData, pageSize: 20,width: '100%', height: '99%', checkbox: false
	});<?php endif; ?>
});
function deleteRow(id,index){
	if (confirm('确定删除?'))
	{
		$.ajax({
			type: "GET",
			url: "/s/flow/ajax.php?act=del&run_id="+id,
			success: function(msg){
				if(msg==1){
					manager.deleteRow(index);	
				}else{
					alert('删除失败!');
				}
			}
		});
	}	
}
function chulinode($runid){
    window.location.href='/s/tp/wwwroot/index.php?s=/Flow/run/show/run_process/'+$runid;
}
function show(id){
	open('/s/flow/ajax.php?act=show&id='+id);
}
</script>
</head>
<body>
<div id="flowlist"></div>
</body>
</html>