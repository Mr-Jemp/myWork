﻿<?php
include_once '../inc/conn.php';

$result = mysql_query("select concat(round(sum(DATA_LENGTH/1024/1024),2),'MB') as data  from information_schema.TABLES where table_schema='hbsxt'");
$out='';
$count = 1;
while($row = mysql_fetch_array($result,MYSQL_ASSOC)) 
{ 
	$out .= "{'type':'数据库', 'size':'$row[data]'}";
}


exec("du -h --max-depth=1 /var/www", $res, $rc); 

foreach ($res as $item) {
	$count++;
	$arr = explode('	',$item);
	$out .= ",{'type':'$arr[1]', 'size':'$arr[0]'}";
}
$out = "var CustomersData = {Rows:[" . $out . "],Total:" . $count . "};";
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
			
			
            window['g'] = 
            $("#maingrid").ligerGrid({
                columns: [
                { display: '文件', name: 'type', align: 'left', minWidth: 250},
                { display: '大小', name: 'size', align: 'left',minWidth: 120 },
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
<h1>文件容量</h1>
<div class="l-loading" style="display:block" id="pageloading"></div>
 <a class="l-button" style="width:120px;float:left; margin-left:10px; display:none;" onclick="deleteRow()">删除选择的行</a>

 
 <div class="l-clear"></div>

    <div id="maingrid"></div>
   
  <div style="display:none;">
  
</div>
 
</body>
</html>

 