﻿<?php
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
    <script type="text/javascript">
        var m = null;
        var popSelectGetValueMethodDiv=null;
        var inputObj=null;
        var fieldnameopstr="";
        var firstfieldname="";
        $(function ()
        {
            <?php echo $out;?>
            $("#addflow").bind('click', function() {
                $("#add_edit_flow :input").val("");
                $("#flowname").siblings().remove();
                $("#add_btn").val("添加");
                var table=$("#conditionTable")[0];
                for(var j=table.rows.length-1;j>0;j--){
                    $(table.rows[j]).remove() ;
                }
                loadDataTree(0);
                var w=$("#maingrid").width();
                var h=$("#maingrid").height();
                m = $.ligerDialog.open({  width:w,height:580,target: $("#add_edit_flow"), title: "添加流程",buttons: [{ text: "确定", onclick:function()
                {
                    var flowname=$("#flowname").val();
                    if(flowname==""){
                        alert("流程名称不能为空！！");
                        return;
                    }
                    m.hide();
                    submitForm();
                }}, { text: "取消", onclick:function()
                {
                    m.hide();
                }}]});
            });
            $("#addConditionRow").bind("click",function(){
               var formid=parseInt($("#startformid").val());
               var table=$("#conditionTable")[0];
               var row=table.insertRow();
               var rowdata = {field: firstfieldname, value: "",op:"等于", logicStr: "and"};
               if(fieldnameopstr=="") {
                    $.ajax({
                        type: 'POST',
                        url: '/s/function/macrosfield.php',
                        data: {"from_id": formid},
                        success: function (tdata) {
                            tdata = eval('(' + tdata + ')');
                            if (!tdata.IsSuccess) {
                                $("#conditionDiv").text("没有表单字段");
                            }
                            else {
                                firstfieldname=tdata.fieldv[0];
                                for (var i = 0; i < tdata.fieldv.length; i++) {
                                    fieldnameopstr = fieldnameopstr + "<option value='" + tdata.fieldv[i] + "'>" + tdata.fields[i] + "</option>";
                                }
                                addConditonRow( row, rowdata);
                            }
                        },
                        error: function () {

                        }
                    });
                }
                else{
                   addConditonRow(row, rowdata);
                }
            })
            //ID    | USER | HOST            | DB      | COMMAND | TIME | STATE     | INFO
            window['g'] =
                $("#maingrid").ligerGrid({
                    columns: [
                        { display: '主键', name: 'flowid',  type: 'int', width:50,frozen: true },
                        { display: '流程名称', name: 'flowname',  type: 'text' },
                        { display: '发起表单', name: 'formname',  type: 'text' },
                        { display: '创建人', name: 'username',  type: 'text' },
                        { display: '操作', isSort: true,  render: function (rowdata, rowindex, value)
                            {
                                var h = "";
                                if (!rowdata._editing)
                                {
                                    h += "<a href='javascript:beginEdit(" + rowindex + ")'>修改</a> ";
                                    h += "<a href='javascript:designflow("+rowindex+")'>设计流程</a> ";
                                    h += "<a href='javascript:deleteRow("+rowindex+")'>删除</a> ";
                                }
                                else {
                                    h += "<a href='javascript:endEdit(" + rowindex + ")'>提交</a> ";
                                    h += "<a href='javascript:cancelEdit(" + rowindex + ")'>取消</a> ";
                                }
                                return h;
                            }
                        }
                    ], data:CustomersData,  height:'95%',pageSize:23 ,rownumbers:true
                });
            $("#pageloading").hide();
            $("#selectGetValueMethod").find("select").bind("change",function(){
                popSelectGetValueMethodDiv.hide();
                inputObj.val($(this).val());
            })
        });
        function beginEdit(rowid) {
            $("#add_edit_flow :input").val("");
            $("#flowname").siblings().remove();
            $("#add_btn").val("保存");
            var taid = g.getRow(rowid);
            $("#id").val(taid.flowid);
            $("#flowname").val(taid.flowname);
            $("#formname").val(taid.formname);
            $("#startformid").val(taid.form_id);
            loadDataTree(taid.form_id);
            var conditionStr=taid.conditionStr;
            $("#conditionStr").val(conditionStr);
            var conditions=eval('('+conditionStr+')');
            var rows=[];
            if(conditions!=null){
                rows=conditions.fields;
            }
            $.ajax({
                type: 'POST',
                url: '/s/function/macrosfield.php',
                data: {"from_id": taid.form_id},
                success: function (tdata) {
                    tdata = eval('(' + tdata + ')');
                    if (!tdata.IsSuccess) {
                        $("#conditionDiv").text("没有表单字段");
                    }
                    else
                    {
                        fieldnameopstr="";
                        if(tdata.fieldv==null){
                            alert("发起表单还没有完成，请联系管理员！");
                        }
                        for(var i=0;i<tdata.fieldv.length;i++){
                            fieldnameopstr=fieldnameopstr+"<option value='"+tdata.fieldv[i]+"'>"+tdata.fields[i]+"</option>";
                        }
                        var table=$("#conditionTable")[0];
                        for(var j=table.rows.length-1;j>0;j--){
                            $(table.rows[j]).remove() ;
                        }
                        for(var i=0;i<rows.length;i++){
                            (function(){
                                var tr=table.insertRow();
                                var row=rows[i];
                                addConditonRow(tr,row);
                            })()
                        }
                        var w=$("#maingrid").width();
                        var h=$("#maingrid").height();
                        m = $.ligerDialog.open({  width:w,height:580,target: $("#add_edit_flow"), title: "修改流程",buttons: [{ text: "确定", onclick:function()
                        {
                            m.hide();
                            submitForm();
                        }}, { text: "取消", onclick:function()
                        {
                            m.hide();
                        }}]});
                    }
                },
                error:function() {

                }
            });
        }
        function submitForm() {
            var table=$("#conditionTable")[0];
            var formop=$("#formop").val();
            var conObj={formop:formop,fields:[]};
            var formid=$("#startformid").val();
            for(var i=1;i<table.rows.length;i++){
                var rowdata = {field: "", value: "",op:"等于", logicStr: "and"};
                rowdata.field=$(table.rows[i].cells[1].childNodes[0]).val();
                rowdata.op=$(table.rows[i].cells[2].childNodes[0]).val();
                rowdata.value=$(table.rows[i].cells[3].childNodes[0]).val();
                rowdata.logicStr=$(table.rows[i].cells[4].childNodes[0]).val();
                conObj.fields.push(rowdata);
            }
            var constr=JSON.stringify(conObj);
            if ($("#add_btn").val() == "保存") {
                $.ajax({
                    url:"/s/oaflow/oaflow_action.php",
                    type: 'post',
                    datatype:"json",
                    data:{
                        'id':$("#id").val(),
                        'operatetype':"modify",
                        'constr':escape(constr),
                        'flowname':$("#flowname").val(),
                        'formid':formid,
                        'creator':$("#creator").val()
                    },
                    success:function(data){
                        var dataObj=eval("("+data+")");
                        if(dataObj.pw_flag==1){$.ligerDialog.error(dataObj.msg);return false;}
                        if (dataObj.result == 1) {
                            $.ligerDialog.success('修改成功！',function()
                            {
                                location.reload();
                            });
                            m.hide();
                        }
                        else {
                            $.ligerDialog.error(dataObj.message);
                        }
                    },
                });
            }
            else {
                $.ajax({
                    url:"/s/oaflow/oaflow_action.php",
                    type: 'post',
                    datatype:"json",
                    data:{
                        'operatetype':"add",
                        'constr':escape(constr),
                        'flowname':$("#flowname").val(),
                        'formid':formid,
                        'creator':$("#creator").val()
                    },
                    success:function(data){
                        var dataObj=eval("("+data+")");
                        if(dataObj.pw_flag==1){$.ligerDialog.error(dataObj.msg);return false;}
                        if (dataObj.result == 1) {
                            $.ligerDialog.success('添加成功！',function()
                            {
                                location.reload();
                            });
                            m.hide();
                        }
                        else {
                            $.ligerDialog.error(dataObj.message);
                        }
                    }
                });
            }
            return false;
        }
        function designflow(rowid){
            var taid = g.getRow(rowid);
            var flowid=taid.flowid;
            var flowname=taid.flowname;
            document.location.href="designflow.php?flowid="+flowid+"&flowname="+flowname;
        }
        function deleteRow(rowid){
            var taid = g.getRow(rowid);
            if (confirm('确定删除?')) {
                $.ajax({ url: "/s/oaflow/oaflow_action.php",type: "POST",datatype:"text",data: { operatetype: "deleteflow", staffId: escape(taid.flowid) },
                    success: function(data) {
                        //data='{"pw_flag":1,"msg":"你没有权限操作删除人员"}';
                        try
                        {
                            json=eval('(' + data + ')');
                            if(json.pw_flag==1){$.ligerDialog.error(json.msg);return false;}
                        } catch(err) {}
                        g.deleteSelectedRow();
                        $.ligerDialog.success(""+data,function()
                        {
                            location.reload();
                        });
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        $.ligerDialog.error(XMLHttpRequest);
                    }
                });
            }
        }
        function cancelEdit(rowid) {
            g.cancelEdit(rowid);
        }
        function endEdit(rowid){
            g.endEdit(rowid);
        }
        function f_search(){
            g.data = CustomersData;
        }
        function loadDataTree(formid){
            $("#dataTree").html("");
            $("#fieldsDiv").html("");
            $.ajax({
                type: 'POST',
                url: '/s/function/pageinfo.php',
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
                        onselect: function (node){
                            var table=$("#conditionTable")[0];
                            for(var i=table.rows.length-1;i>0;i--){
                                $(table.rows[i]).remove();
                            }
                            fieldnameopstr="";
                            $("#formname").val(node.data.values[0].value);
                            $("#startformid").val(node.data.id);
                        }
                    });
                }
            });
        }
        function addConditonRow(tr,row){
            var field=row.field;
            var value=row.value;
            var logicStr=row.logicStr;
            var op=row.op;
            var td=document.createElement("td");
            $(td).html("<a href='#'>删除</a>");
            $(td.childNodes[0]).bind("click",function(event){
                $(tr).remove();
            })
            $(td).css("text-align","center");
            $(td).css("border","1px solid black");
            $(tr).append(td);
            var td=document.createElement("td");
            $(td).html("<select style='width:90%;font-size:12px'>"+fieldnameopstr+"</<select>");
            $(td).css("text-align","center");
            $(td).css("border","1px solid black");
            $(td.childNodes[0]).val(field);
            $(tr).append(td);
            var td=document.createElement("td");
            $(td).html("<select style='width:90%;font-size:12px'><option value='等于'>等于</option><option value='小于'>小于</option><option value='大于'>大于</option><option value='不等于'>不等于</option><option value='大或等于'>大或等于</option><option value='小或等于'>小或等于</option></select>");
            $(td).css("text-align","center");
            $(td).css("border","1px solid black");
            $(td.childNodes[0]).val(op);
            $(tr).append(td);
            var td=document.createElement("td");
            $(td).html("<input type='text' value='"+value+"' class='expressInput' style='width:90%;font-size:12px;' />");
            $(td).css("text-align","center");
            $(td).css("border","1px solid black");
            $(tr).append(td);
            var td=document.createElement("td");
            $(td).html("<select style='width:90%;font-size:12px;'><option value='and'>与</option><option value='or'>或</option></select>");
            $(td).css("text-align","center");
            $(td).css("border","1px solid black");
            $(td.childNodes[0]).val(logicStr);
            $(tr).append(td);
        }
    </script>
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
