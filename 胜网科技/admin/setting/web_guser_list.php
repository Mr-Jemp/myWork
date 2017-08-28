<?php
session_start();
include_once '../../s/inc/conn.php';
if(empty($_GET['gid']))die('非法操作');
$sql='SELECT a.*,b.name as gname FROM ht_user a left join ht_can_do b on a.level=b.id where level='.intval($_GET['gid']);
$result = mysql_query($sql);
$out='';
$gname='';
while($row = mysql_fetch_array($result,MYSQL_ASSOC))
{ 	
	$out .= json_encode($row).",";
}
$out = "var CustomersData = {Rows:[" . $out . "],Total:" . mysql_num_rows($result) . "};";
$sql='select name from ht_can_do where id='.intval($_GET['gid']);
$result=mysql_query($sql);
$rs=mysql_fetch_array($result,MYSQL_ASSOC);
$gname=$rs['name'];
mysql_free_result($result);
mysql_close($conn);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
    <script src="/resource/part/ligerlib/jquery/jquery-1.3.2.min.js" type="text/javascript"></script> 
    <script src="/resource/part/ligerlib/ligerUI/js/ligerui.all.js"></script>    
	<script type="text/javascript" src="/resource/part/newtpl/js/public.js"></script>
    <link href="/resource/part/ligerlib/ligerUI/skins/ligerui-icons.css" rel="stylesheet" type="text/css" />
	<link href="/resource/part/newtpl/css/public.css" rel="stylesheet" type="text/css" />
	<link href="/resource/part/newtpl/css/rheight.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript">
		var m = null;
		var EmployeeData,g;
        var fn = null;
        $(function ()
        {
			<?php echo $out;?>	
			$("#add_user_form").submit(function(){
				var ajax_option={
						url:"/s/setting/web_user.php?act=add&gid=<?php echo intval($_GET['gid']);?>",
						type: 'post',														
						success:function(data){													
							if (data== 1) {								
								$.ligerDialog.success('修改成功！'); 
								m.hide();
								window['g'].reload();
							}
							else {
								$.ligerDialog.error(dataObj.message);
							}
						},
					};
					$(this).ajaxSubmit(ajax_option);
					return false;
			});
            g=$("#maingrid").ligerGrid({
                columns: [
                { display: '主键', name: 'uid',  type: 'int', width:50,frozen: true },
				{ display: '账号', name: 'username',  type: 'text' },
				{ display: '姓名', name: 'chinese_name',  type: 'text' },
				{ display: '注册ip', name: 'reg_ip',  type: 'text' },
				{ display: '注册日期', name: 'reg_data', editor: { type: 'text' }},
				{ display: '用户组', name: 'gname', editor: { type: 'text' }},
				{ display: '操作', isSort: true,  render: function (rowdata, rowindex, value)
                {
                    var h = "";
                    h += "<a href='javascript:deleteRow(" + rowdata.uid + ")'>删除</a> ";                     
                    return h;
                }
                }
                ], data:CustomersData,  height:'98%',pageSize:30 ,rownumbers:true
            });
            $("#pageloading").hide();
        });		
		function beginEdit(rowid) {}
        function deleteRow(rowid)
        {			
			//$.ligerDialog.error("为数据安全考虑，请联系运维人员！");
			//return;
			var op ="HELLO WORD";
			if (confirm('确定删除?')) {							
				$.ajax({ url: "/s/setting/web_user.php?act=del",type:"POST",datatype:"json",data:{uid:rowid},
					success: function(data) {
						if(data==1)$.ligerDialog.success('删除成功');
						g.deleteSelectedRow();										                    
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {                   
					   $.ligerDialog.error(XMLHttpRequest);
					}
				});
			}
           
        }
		function addUser(){ 
			var gid=<?php echo intval($_GET['gid']);?>; 			   
            $.ajax({ url: "/s/setting/web_user.php?act=ajaxlist&gname=<?php echo urlencode($gname);?>&gid="+gid, async: false, type: "POST",
                success: function(data) {					
					data = eval('(' + data + ')');					
                    if (data.IsSuccess) {
                        EmployeeData = data.Data;
						 fn = $.ligerui.getPopupFn({
						top: 80,
						onSelect: function(e) {
							var isno = false;
							for (var i = 0; i < e.data.length; i++) {
								$.ajax({url:"/s/setting/web_user.php?act=add",type:"POST",async: false,data:{gid:escape(gid),uid:escape(e.data[i].uid)},
									success: function(data) {
										data = eval('(' + data + ')');
										if (data.IsSuccess) {
											isno = true;
										}
										else {
											$.ligerDialog.success(data.Message);
										}
									},
									error: function(xhr, stat, e) {
										$.ligerDialog.error(e);
									}
								});
							}
							if (isno) {								
								g.addRows(e.data);
							}		
						},
						grid: {
							columns: [
								{ display: '账号', name: 'username', width: 50, type: 'text' },
								{ display: '名字', name: 'chinese_name', width: 80, type: 'text' }
		
							], isScroll: false, checkbox: true,
							data: { Rows: EmployeeData },
							width: '95%'
						}
					});
                    }
                    else {
                    }
                },
                error: function(xhr, stat, e) {
                    alert(e);
                }
            });        

            fn();
        }
		function cancelEdit(rowid) { 
            g.cancelEdit(rowid);
        }
        function endEdit(rowid)
        {
            g.endEdit(rowid);
        }
		function f_search()
        {
			
            g.data = CustomersData;
            g.loadData(f_getWhere());
        }
        function f_getWhere()
        {
            if (!g) return null;
            var clause = function (rowdata, rowindex)
            {
                var key = $("#txtKey").val();
                return rowdata.uid.indexOf(key) > -1;

            };
            return clause; 
        } 

    </script>
<style type="text/css">
#user_list {
	width: 200px;
	overflow: hidden;
	margin: 0px;
	padding: 0px;
	height: auto;
}
#user_list dl {
	width: 160px;
	float: left;
	height: 30px;
	overflow: hidden;
	margin-right: 5px;
	margin-top: 0px;
	margin-bottom: 0px;
	margin-left: 0px;
	padding-top: 0px;
	padding-right: 0px;
	padding-bottom: 10px;
	padding-left: 0px;
}
#user_list dl dt {
	line-height: 30px;
	float: left;
	height: 30px;
	width: 27px;
	text-align: right;
	margin: 0px;
	padding: 0px;
	padding-right:3px;
}
#user_list dl dd {
	line-height: 30px;
	height: 30px;
	float: left;
	text-align: left;
	margin: 0px;
	padding: 0px;
}
</style>
</head>
<body style="background-color:#E0F0FE">
<div class="admin_main_nr_dbox">
<div>【<?php echo $gname;?>】组成员 &nbsp;&nbsp;[ <a href="javascript:return false;" onclick="addUser();">添加组成员</a> ][ <a href="web_guser.php">返回</a> ]</div>
 <div id="maingrid" style="margin-top:8px"></div>
 <div id="add_edit_user" style="width:550px; margin:3px; display:none;">  
<form action="" method="post" name="add_user_form" id="add_user_form">
    <div id="user_list">    
    </div>    
	<input type="submit" id="add_btn" value="添加"/></p>
</form>
 </div>
 </div>
 <div class="admin_frameset" >
  <div class="open_frame" title="全屏" id="open_frame" flag="min"></div>
  <div class="close_frame" title="还原窗口" id="close_frame" flag="min"></div>
</div>
</body>
</html>