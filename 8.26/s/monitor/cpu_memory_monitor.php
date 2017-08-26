<?php
$out='';
$count = 1;
exec("free -m", $res, $rc); 
$line=trim(ereg_replace("[ ]{1,}","|",$res[1]));
$mem_arr = explode('|',$line);
 
$a = $mem_arr[2]/$mem_arr[1] * 100;

// cpu 使用率 
$mode = "/(cpu)[\s]+([0-9]+)[\s]+([0-9]+)[\s]+([0-9]+)[\s]+([0-9]+)[\s]+([0-9]+)[\s]+([0-9]+)[\s]+([0-9]+)[\s]+([0-9]+)/";
$string=shell_exec("more /proc/stat");
preg_match_all($mode,$string,$arr);
$total1=$arr[2][0]+$arr[3][0]+$arr[4][0]+$arr[5][0]+$arr[6][0]+$arr[7][0]+$arr[8][0]+$arr[9][0];
$time1=$arr[2][0]+$arr[3][0]+$arr[4][0]+$arr[6][0]+$arr[7][0]+$arr[8][0]+$arr[9][0];

sleep(1);
$string=shell_exec("more /proc/stat");
preg_match_all($mode,$string,$arr);
$total2=$arr[2][0]+$arr[3][0]+$arr[4][0]+$arr[5][0]+$arr[6][0]+$arr[7][0]+$arr[8][0]+$arr[9][0];
$time2=$arr[2][0]+$arr[3][0]+$arr[4][0]+$arr[6][0]+$arr[7][0]+$arr[8][0]+$arr[9][0];
$time=$time2-$time1;
$total=$total2-$total1;
//echo "CPU amount is: ".$num;
$percent=bcdiv($time,$total,3);
$percent=$percent*100;


$out .= "{'type':'内存总数', 'size':'$mem_arr[1]M'},{'type':'已使用', 'size':'$mem_arr[2]M'},{'type':'空闲内存', 'size':'$mem_arr[3]M'},{'type':'内存已使用', 'size':'$a%'},{'type':'CPU使用率', 'size':'$percent%'}";

$out = "var CustomersData = {Rows:[" . $out . "],Total:3};";
?>

<?php

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

 