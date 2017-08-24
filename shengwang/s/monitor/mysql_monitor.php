<?php
include_once '../inc/conn.php';

$result = mysql_query("SELECT * FROM information_schema.PROCESSLIST");
$out='';
while($row = mysql_fetch_array($result,MYSQL_ASSOC)) 
{ 
	$out .= json_encode($row).",";
}

$out = "var CustomersData = {Rows:[" . $out . "],Total:" . mysql_num_rows($result) . "};";

mysql_free_result($result);
mysql_close($conn);
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
    <script src="/resource/part/ligerlib/jquery/jquery-1.3.2.min.js" type="text/javascript"></script> 
    <script src="/resource/part/ligerlib/ligerUI/js/core/base.js" type="text/javascript"></script> 
    <script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerGrid.js" type="text/javascript"></script>
    <script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerResizable.js" type="text/javascript"></script>
    <script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerCheckBox.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function ()
        {
			<?php echo $out;?>
			//ID    | USER | HOST            | DB      | COMMAND | TIME | STATE     | INFO
            window['g'] = 
            $("#maingrid").ligerGrid({
                columns: [
                { display: 'ID', name: 'ID', align: 'left', width: 100, minWidth: 60 },
                { display: '用户', name: 'USER', minWidth: 120 },
                { display: '主机', name: 'HOST', minWidth: 140 },
                { display: '数据库', name: 'DB',width: 150 },
				{ display: 'COMMAND', name: 'COMMAND',width: 150 },
				{ display: 'TIME', name: 'TIME',width: 150 },
				{ display: 'STATE', name: 'STATE',width: 150 },
				{ display: 'INFO', name: 'INFO',width: 300, }
                ], data:CustomersData,  height:300,pageSize:30 ,rownumbers:true
            });
             

            $("#pageloading").hide();
        });

        function deleteRow()
        {
            g.deleteSelectedRow();
        }

    </script>
</head>
<body style="overflow-x:hidden; padding:2px;">
<h1>数据连接监控</h1>
<div class="l-loading" style="display:block" id="pageloading"></div>
 <a class="l-button" style="width:120px;float:left; margin-left:10px; display:none;" onclick="deleteRow()">删除选择的行</a>

 
 <div class="l-clear"></div>

    <div id="maingrid"></div>
   
  <div style="display:none;">
  
</div>
 
</body>
</html>
