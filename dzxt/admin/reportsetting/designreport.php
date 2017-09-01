<?php
session_start();
include_once '../../s/inc/conn.php';
$result = mysql_query("SELECT o.id as flowid,o.oa_name as flowname,f.id as form_id,f.form_name as formname,u.uid as userid,u.username as username,o.condition_string as conditionStr  FROM ht_oa as o INNER JOIN ht_form as f ON o.form_id=f.id inner JOIN ht_user as u on o.creater_uid =u.uid");
$out='';
while($row = mysql_fetch_array($result,MYSQL_ASSOC))
{
    //var_dump($row);
    $out .= json_encode($row).",";
}
$out = "var CustomersData = eval('('+decodeURIComponent('".urlencode('{Rows:[' . $out . '],Total:' . mysql_num_rows($result) . '}')."')+')');";
mysql_free_result($result);
mysql_close($conn);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="UTF-8"/>
<title></title>
<link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
<link href="/resource/part/ligerlib/ligerUI/skins/ligerui-icons.css" rel="stylesheet" type="text/css" />
<script src="/resource/part/ligerlib/jquery/jquery-1.3.2.min.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/ligerUI/js/core/base.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerGrid.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerResizable.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerCheckBox.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerDialog.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerTextBox.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerCheckBox.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerComboBox.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/ligerUI/js/jquery.form.js" type="text/javascript"></script>
<script type="text/javascript" src="/resource/part/newtpl/js/public.js"></script>
<link href="/resource/part/newtpl/css/public.css" rel="stylesheet" type="text/css" />
<link href="/resource/part/newtpl/css/rheight.css" rel="stylesheet" type="text/css" />
<script src="/resource/part/ligerlib/ligerUI/js/ligerui.min.js" type="text/javascript"></script>
<style type="text/css">
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
    #add_edit_flow dt {
        float: left;
        width: 90px;
        text-align: right;
    }
    #add_edit_flow dd {
        float: left;
        text-align: left;
        margin: 0px;
        padding: 0px;
        height: 26px;
        line-height: 26px;
    }
    #add_edit_flow dd input {
        height: 18px;
        width: 100px;
        line-height: 18px;
        border: 1px solid #CCC;
        padding-left:5px;
    }
    #add_edit_flow p
    {
        padding-left:90px;
        padding-top:10px;
    }
    #add_edit_flow p input
    {
        cursor:pointer;
        padding:2px 5px;
    }
    .error
    {
        color:Red;
        padding-left:2px;
    }
    .pass
    {
        color:Green;
        padding-left:2px;
    }
</style>
</head>
<body style="background-color:#E0F0FE">
<div class="admin_main_nr_dbox">
    <?php
    if(empty($_GET['gid'])){
        ?>
        <div>
            <input type="button" id="addflow" value="添加新流程" />
        </div>
    <?php } ?>
    <div id="maingrid" style="margin-top:8px"></div>
    <div id="add_edit_flow" style="width: 95%;height:510px;margin:0px;padding:0px;border:1px solid black; display:none;overflow: hidden;">
        <form action="" method="post" name="add_step_form" id="add_step_form">
            <dl style="display: none;">
                <dt>id：</dt><dd><input type="text" name="id" id="id" value="" /></dd>
            </dl>
            <dl style="display: none;">
                <dt>流程ID：</dt><dd><input type="text" name="flowid" id="flowid" value=""/></dd>
            </dl>
            <dl style="display: none;">
                <dt>创建者：</dt><dd><input type="text" name="creator" id="creator" value=""/></dd>
            </dl>
            <dl style="display: none;">
                <dt>表单ID：</dt><dd><input type="text" id="startformid"  value=""/></dd>
            </dl>
            <dl style="display: none;">
                <dt>条件：</dt><dd><input type="text" name="conditionStr" id="conditionStr" value=""/></dd>
            </dl>
            <div style="float: left;width:100%;margin-top:0px;border-bottom: 1px solid black;">
                <span style="float: left;margin-left: 10px;">流程名称：<input type="text" name="flowname" id="flowname" value=""/></span>
            </div>
            <div style="float: left;width:100%;margin-top:0px;border-bottom: 1px solid black;">
                <span style="float: left;margin-left: 10px;">表单名称：<input type="text" name="formname" id="formname" value=""/></span>
                <span style="float: right;margin-right:85px;">触发工作流的条件设置</span>
            </div>
            <div id="workdiv"style="width: 100%;height:510px;float: left;overflow: hidden;">
                <div name="macroDiv" style="width: 30%;height: 510px;float: left;overflow:hidden; z-index: -100;" id="macroDiv">
                    <ul id="dataTree" name="dataTree"></ul>
                </div>
                <div style="width: 69%;border:1px solid black;border-top: 0px solid black;border-right: 0px solid black; height:510px;float: right;overflow: hidden;">
                    <span style="width:600px;">表单操作：<select name="formop" id="formop"><option value="add">添加记录</option><option value="del">删除记录</option><option value="update">修改记录</option></select></span>
                    <div name="conditionDiv" style="width: 100%;border-top:1px solid black;height:510px;float: left;overflow: auto;" id="conditionDiv">
                        <table id="conditionTable" name="conditionTable" style="width:95%;border-collapse:collapse;margin-top: 10px;margin-left: 10px; ">
                            <thead>
                            <tr>
                                <th style="text-align: center;width:30px;border: 1px solid black;">
                                    <a id="addConditionRow" name="addConditionRow" href="javascript:void(0);">添加</a>
                                </th>
                                <th style="text-align: center;width:100px;border: 1px solid black;">
                                    <a href="#">字段</a>
                                </th>
                                <th style="text-align: center;width:50px;border: 1px solid black;">
                                    <a href="#">运算符</a>
                                </th>
                                <th style="text-align: center;width:100px;border: 1px solid black;">
                                    <a href="#">设置字段值</a>
                                </th>
                                <th style="text-align: center;width:40px;border: 1px solid black;">
                                    <a href="#">逻辑</a>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <input type="hidden" name="edit_id" id="edit_id" />
            <input type="hidden" name="add_btn" id="add_btn" />
        </form>
    </div>
</div>

<div id="selectGetValueMethod" style="display:none;"><select style='width:90%;'><option value='取值'>取值</option><option value='最大值'>最大值</option><option value='最小值'>最小值</option><option value='平均值'>平均值</option><option value='求和'>求和</option></select></div>
<div class="admin_frameset" >
    <div class="open_frame" title="全屏" id="open_frame"></div>
    <div class="close_frame" title="还原窗口" id="close_frame"></div>
</div>
</body>
</html>
