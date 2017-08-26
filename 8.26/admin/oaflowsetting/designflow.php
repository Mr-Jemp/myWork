<?php
/**
 * Created by PhpStorm.
 * User: HBS
 * Date: 2015/9/28
 * Time: 11:03
 */
session_start();
include_once '../../s/inc/conn.php';
$oa_id=$_GET["flowid"];
$oa_name=$_GET["flowname"];
$sql="SELECT s.id as id,s.oa_id as flowid,o.oa_name as flowname,s.form_id as formid,f.form_name as formname,s.step_index as stepIndex,s.trigger_string as triggerStr,s.form_op as op from ht_oa_step AS s INNER JOIN ht_oa AS o ON s.oa_id=o.id INNER JOIN ht_form as f ON s.form_id=f.id where s.oa_id=".$oa_id;
$result = mysql_query($sql);
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
    <script src="/resource/js/jQuery/jquery.livequery.js" type="text/javascript"></script>
    <script type="text/javascript" src="/resource/part/newtpl/js/public.js"></script>
    <link href="/resource/part/newtpl/css/public.css" rel="stylesheet" type="text/css" />
    <link href="/resource/part/newtpl/css/rheight.css" rel="stylesheet" type="text/css" />
    <script src="/resource/part/ligerlib/ligerUI/js/ligerui.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var m = null;
        var popSelectGetValueMethodDiv=null;
        var upstepformfieldopstr="";
        var popSetConditionDiv="";
        var stepformfieldopstr="";
        var inputObj=null;
        var trigger=null;
        var currentfield=null;
        var flowid=0;
        var addfirsttr="";
        var addTemp="";
        var opfieldconditions="";
        var firstfieldname="";
        var upstepfirstfieldname="";
        $(function ()
        {
            <?php echo $out;?>
            var theurl = window.location.href;
            var queryStr = theurl.split('?')[1];
            var idStr = queryStr.split("&")[0];
            var oaid = idStr.split('=')[1];
            flowid=oaid;
            $("#oaid").val(oaid);
            var fundelete=function(me){$(me).parent().parent().remove();}
            $("#setConditionTable").find(".add").livequery("click",function(){
                $("#setConditionTable tbody").append(addTemp);
                var obj=$("#setConditionTable").find("tr:last");
                obj.find(".delete").bind("click",function(){fundelete(this);newBg("setConditionDiv");});
                obj.find(".fromdefine").bind("change",function(){fromdefine(this);});
                newBg("add");
            });
            $("#addstep").bind('click', function() {
                if($("#dataTree").html()=="") {
                    loadDataTree();
                }
                trigger={opfields:[],conditionfields:[]};
                upstepformfieldopstr="";
                $("#add_edit_step :input").val("");
                $("#stepname").siblings().remove();
                $("#add_btn").val("添加");
                var count=CustomersData.Rows.length;
                $("#stepindex").val(count);
                var upstepformid =CustomersData.Rows[count-1].formid;
                $.ajax({
                    type: 'POST',
                    url: '/s/function/macrosfield.php',
                    data: {"from_id": upstepformid},
                    success: function (data) {
                        data = eval('(' + data + ')');
                        if (!data.IsSuccess)return;

                        var formdefindfieldsel=$(".fromdefine");
                        formdefindfieldsel.find("option").remove();
                        var valuedefindfieldsel=$(".valuedefine");
                        valuedefindfieldsel.find("option").remove();
                        upstepfirstfieldname=data.fieldv[0];
                        for(i=0;i<data.fieldv.length;i++){
                            if(i==0){
                                formdefindfieldsel.append('<option selected value="'+data.fieldv[i]+'">'+data.fields[i]+'</option>');
                                valuedefindfieldsel.append('<option selected value="'+data.fieldv[i]+'">'+data.fields[i]+'</option>');
                                upstepformfieldopstr=upstepformfieldopstr+ "<option selected value=\""+data.fieldv[i]+"\">"+data.fields[i]+"</option>";
                            }
                            else{
                                formdefindfieldsel.append('<option value="'+data.fieldv[i]+'">'+data.fields[i]+'</option>');
                                valuedefindfieldsel.append('<option value="'+data.fieldv[i]+'">'+data.fields[i]+'</option>');
                                upstepformfieldopstr=upstepformfieldopstr+ "<option value=\""+data.fieldv[i]+"\">"+data.fields[i]+"</option>";
                            }
                        }
                        formdefindfieldsel.append('<option value="">自定义</option>');
                        valuedefindfieldsel.append('<option value="">自定义</option>');
                        var firstrow=$(".firstrowclass");
                        addfirsttr="<tr>"+firstrow.html()+"</tr>";
                        var temprow=$(".temp");
                        addTemp="<tr>"+temprow.html()+"</tr>";
                        var fieldoptable=$("#fieldoptable")[0];
                        for(var i=fieldoptable.rows.length-1;i>0;i--){
                            $(fieldoptable.rows[i]).remove();
                        }
                        var conditiontable=$("#conditiontable")[0];
                        for(var i=conditiontable.rows.length-1;i>0;i--){
                            $(conditiontable.rows[i]).remove();
                        }
                        var w=$("#maingrid").width();
                        var h=$("#maingrid").height();
                        m = $.ligerDialog.open({ width:w,height:580,target: $("#add_edit_step"), title: "添加步骤",buttons: [{ text: "确定", onclick:function()
                        {
                            m.hide();
                            submitForm();
                        }}, { text: "取消", onclick:function()
                        {
                            m.hide();
                        }}]});
                    }
                });
            });
            $("#addConditionRow").bind("click",function(){
                var conditionfield={name:"",alias:"",op:"等于",value:"",replyfield:"",logic:"and"};
                trigger.conditionfields.push(conditionfield);
                var conditiontable=$("#conditiontable")[0];
                var row=conditiontable.insertRow();
                addConditonRow(row,conditionfield);
            })
            $("#formop").bind("change",function(){
                var op=$(this).val();
                var conditiontable=$("#conditiontable")[0];
                for(var i=conditiontable.rows.length-1;i>0;i--){
                    $(conditiontable.rows[i]).remove();
                }
                if(op=="del"){
                    trigger.conditionfields=[];
                    $("#fieldsDiv").css("display","none");
                    $("#conditionDiv").css("display","block");
                }
                else if(op=="add"){
                    trigger.conditionfields=[];
                    $("#fieldsDiv").css("display","block");
                    $("#conditionDiv").css("display","none");
                }
                else{
                    trigger.conditionfields=[];
                    $("#fieldsDiv").css("display","block");
                    $("#conditionDiv").css("display","block");
                }
            })
            //ID    | USER | HOST            | DB      | COMMAND | TIME | STATE     | INFO
            window['g'] =
                $("#maingrid").ligerGrid({
                    columns: [
                        { display: '主键', name: 'id',  type: 'int', width:50,frozen: true },
                        { display: '流程', name: 'flowname',  type: 'text' },
                        { display: '表单编号', name: 'formid',width:0, type: 'text' },
                        { display: '表单', name: 'formname',  type: 'text' },
                        { display: '步骤序列', name: 'stepIndex',  type: 'text' },
                        { display: '触发器', name: 'triggerStr',  type: 'text' },
                        { display: '操作', isSort: true,  render: function (rowdata, rowindex, value)
                        {
                            var h = "";
                            if (!rowdata._editing)
                            {
                                h += "<a href='javascript:beginEdit(" + rowindex + ")'>修改步骤</a> ";
                                h += "<a href='javascript:deleteRow("+rowdata.id+")'>删除</a> ";
                            }
                            else
                            {
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
                if(popSelectGetValueMethodDiv.opfield!=null) {
                    popSelectGetValueMethodDiv.opfield.value = $(this).val();
                    popSelectGetValueMethodDiv.opfield=null;
                }
                if(popSelectGetValueMethodDiv.conditionfield!=null)
                {
                    popSelectGetValueMethodDiv.conditionfield.value=$(this).val();
                    popSelectGetValueMethodDiv.conditionfield=null;
                }
                popSelectGetValueMethodDiv.hide();
                inputObj.val($(this).val());
            })
        });
        function newBg(id){
            var trs=$("#"+id+" tr"),i=0;
            for(i=0;i<trs.length;i++){
                trs.eq(i).css("background","#FFFFFF");
                if((i+1)%2==0)trs.eq(i).css("background","#efefef");
            }
        }
        function submitForm() {
            var triggerstr=JSON.stringify(trigger);
            var id=$("#id").val();
            var formid=$("#formid").val();
            var formop=$("#formop").val();
            var oaid=$("#oaid").val();
            var stepindex=$("#stepindex").val();
            if ($("#add_btn").val() == "保存") {
                $.ajax({
                    url:"/s/oaflow/oaflow_step_action.php",
                    type: 'post',
                    datatype:"json",
                    data:{
                        'operatetype':"modify",
                        'id':id,
                        'triggerstr':escape(triggerstr),
                        'flowid':flowid,
                        'formid':formid,
                        'stepindex':stepindex,
                        'formop':formop
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
                    url:"/s/oaflow/oaflow_step_action.php",
                    type: 'post',
                    datatype:"json",
                    data:{
                        'operatetype':"add",
                        'id':id,
                        'triggerstr':escape(triggerstr),
                        'oaid':flowid,
                        'formid':formid,
                        'stepindex':stepindex,
                        'formop':formop
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
        function beginEdit(rowid) {
            if($("#dataTree").html()=="") {
                loadDataTree();
            }
            if(rowid<1){
                alert("不能修改起始步骤！！");
                return;
            }
            upstepformfieldopstr="";
            var fieldoptable=$("#fieldoptable")[0];
            for(var i=fieldoptable.rows.length-1;i>0;i--){
                $(fieldoptable.rows[i]).remove();
            }
            var conditiontable=$("#conditiontable")[0];
            for(var i=conditiontable.rows.length-1;i>0;i--){
                $(conditiontable.rows[i]).remove();
            }
            $("#add_edit_step :input").val("");
            $("#flowname").siblings().remove();
            $("#add_btn").val("保存");
            var taid = g.getRow(rowid);
            $("#id").val(taid.id);
            $("#formid").val(taid.formid);
            $("#formname").val(taid.formname);
            $("#flowid").val(taid.flowid);
            $("#stepindex").val(taid.stepIndex);
            var op=taid.op;
            $("#formop").val(op);
            var triggerStr=taid.triggerStr;
            trigger=eval('('+triggerStr+')');
            if(op=="del"){
                $("#fieldsDiv").css("display","none");
                $("#conditionDiv").css("display","block");
            }
            else if(op=="add"){
                $("#fieldsDiv").css("display","block");
                $("#conditionDiv").css("display","none");
            }
            else{
                $("#fieldsDiv").css("display","block");
                $("#conditionDiv").css("display","block");
            }
            $("#triggerStr").val(triggerStr);
            taid= g.getRow(rowid-1);
            var upstepformid=taid.formid;
            $.ajax({
                type: 'POST',
                url: '/s/function/macrosfield.php',
                data: {"from_id": upstepformid},
                success: function (data) {
                    data = eval('(' + data + ')');
                    if (!data.IsSuccess)return;
                    var formdefindfieldsel=$(".fromdefine");
                    formdefindfieldsel.find("option").remove();
                    var valuedefindfieldsel=$(".valuedefine");
                    valuedefindfieldsel.find("option").remove();
                    for(i=0;i<data.fieldv.length;i++){
                        if(i==0) {
                            formdefindfieldsel.append('<option selected value="' + data.fieldv[i] + '">' + data.fields[i] + '</option>');
                            valuedefindfieldsel.append('<option selected value="' + data.fieldv[i] + '">' + data.fields[i] + '</option>');
                            upstepformfieldopstr = upstepformfieldopstr + "<option selected value=\"" + data.fieldv[i] + "\">" + data.fields[i] + "</option>";
                        }
                        else{
                            formdefindfieldsel.append('<option value="' + data.fieldv[i] + '">' + data.fields[i] + '</option>');
                            valuedefindfieldsel.append('<option value="' + data.fieldv[i] + '">' + data.fields[i] + '</option>');
                            upstepformfieldopstr = upstepformfieldopstr + "<option value=\"" + data.fieldv[i] + "\">" + data.fields[i] + "</option>";
                        }
                    }
                    formdefindfieldsel.append('<option value="">自定义</option>');
                    valuedefindfieldsel.append('<option value="">自定义</option>');
                    var firstrow=$(".firstrowclass");
                    addfirsttr="<tr>"+firstrow.html()+"</tr>";
                    var temprow=$(".temp");
                    addTemp="<tr>"+temprow.html()+"</tr>";
                    $("#setConditionDiv .temp").remove();
                    var opfields=trigger.opfields;
                    var conditionfields=trigger.conditionfields;
                    stepformfieldopstr="";
                    for(var i=0;i<opfields.length;i++){
                        (function(){
                            var row=fieldoptable.insertRow();
                            var opfield=opfields[i];
                            var name=opfield.name;
                            var alias=opfield.alias;
                            if(i==0) {
                                stepformfieldopstr = stepformfieldopstr + "<option selected value='" + name + "'>" + alias + "</option>";
                            }
                            else{
                                stepformfieldopstr = stepformfieldopstr + "<option value='" + name + "'>" + alias + "</option>";
                            }
                            addfieldoptableRow(row,opfield);
                        })()
                    }
                    for(var i=0;i<conditionfields.length;i++){
                        (function(){
                            var row=conditiontable.insertRow();
                            var conditionfield=conditionfields[i];
                            addConditonRow(row,conditionfield);
                        })()
                    }
                    var upstepformid=0;
                    var w=$("#maingrid").width();
                    var h=$("#maingrid").height();
                    m = $.ligerDialog.open({width:w,height:580, target: $("#add_edit_step"), title: "修改步骤",buttons: [{ text: "确定", onclick:function()
                    {
                        m.hide();
                        submitForm();
                    }}, { text: "取消", onclick:function()
                    {
                        m.hide();
                    }}]});
                }
            });
        }
        var fromdefine=function(me){
            var opt=$(me).find("option");
            if($(me).get(0).selectedIndex+1!=opt.length)return;
            var str=prompt("请输入字段名或字符",opt.eq(opt.length-1).val());
            if(!str)return;
            opt.eq(opt.length-1).val(str);
            opt.eq(opt.length-1).text(str);
        };
        function addfieldoptableRow(tr,opfield){
            var fieldname=opfield.name;
            var alias=opfield.alias;
            var selected=opfield.checked;
            var value=opfield.value;
            var replyfield=opfield.replyfield;
            var valueconditions=opfield.conditions;
            var td=document.createElement("td");
            $(td).css("border","1px solid black");
            $(td).css("text-align","center");
            if(selected) {
                $(td).html("<input type='checkbox' checked name='selectfields'/>");
            }
            else{
                $(td).html("<input type='checkbox' name='selectfields'/>");
            }
            $(td.childNodes[0]).bind("click",function(){
                if($(this).attr("checked")) {
                    opfield.checked=true;
                }
                else{
                    opfield.checked=false;
                }
            })
            $(tr).append(td);
            var td=document.createElement("td");
            $(td).css("border","1px solid black");
            $(td).css("text-align","center");
            $(td).text(alias);
            $(tr).append(td);
            var td=document.createElement("td");
            $(td).css("border","1px solid black");
            $(td).css("text-align","center");
            $(td).html("<input type='text' value='"+value+"' class='expressInput' style='width:70%;font-size:12px;' /><img src='/resource/images/common/add.GIF'>")
            $(td.childNodes[1]).bind("click",function(){
                inputObj=$(this).prev();
                var l=parseInt($(this).parent().offset().left);
                var t=parseInt($(this).parent().offset().top)+25;
                popSelectGetValueMethodDiv =  $.ligerDialog.open({width:250,height:50,left:l,top:t,title:"请选择依赖上步记录获取值的方法", target: $("#selectGetValueMethod")});
                popSelectGetValueMethodDiv.opfield=opfield;
            })
            $(td.childNodes[0]).bind("change",function(){
                opfield.value=$(this).val();
            })
            $(tr).append(td);
            var td=document.createElement("td");
            $(td).css("border","1px solid black");
            $(td).css("text-align","center");
            $(td).html("<select style='width:90%;'>"+upstepformfieldopstr+"</select>");
            $(td.childNodes[0]).val(replyfield);
            $(td.childNodes[0]).bind("change",function(){
                opfield.replyfield=$(this).val();
            })
            $(tr).append(td);
            var td=document.createElement("td");
            $(td).css("border","1px solid black");
            $(td).css("text-align","center");
            $(td).html("<a href='#'>...</a>");
            $(td.childNodes[0]).bind("click",function(){
                currentfield=opfield;
                var opfieldconditionTable=$("#setConditionTable")[0];
                for(var k=opfieldconditionTable.rows.length-1;k>=0;k--) {
                    $(opfieldconditionTable.rows[k]).remove();
                }
                if(opfield.conditions.length==0){
                    $("#setConditionTable tbody").append(addfirsttr);
                }
                else{
                    for(var k=0;k<opfield.conditions.length;k++){
                        (function(){
                            var name=opfield.conditions[k].name;
                            var op=opfield.conditions[k].op;
                            var v=opfield.conditions[k].value;
                            var log=opfield.conditions[k].logic;
                            var trstr= "#setConditionTable tbody tr"+":eg("+k+")";
                            var rowobj=null;
                            var rowindex=-1;
                            if(k==0){
                                $("#setConditionTable tbody").append(addfirsttr);
                                rowobj=$(trstr);
                            }
                            else{
                                $("#setConditionTable tbody").append(addTemp);
                                rowobj=$(trstr);
                                rowobj.find(".logicselect").val(log);
                            }
                            var setconditontable=$("#setConditionTable")[0];
                            rowobj=setconditontable.rows[k];
                            rowindex=$(rowobj).attr("rowIndex");
                            var nameobj= $(rowobj).find(".fromdefine");
                            nameobj.val(name);
                            var opobj= $(rowobj).find(".opselect");
                            opobj.val(op);
                            var valueobj= $(rowobj).find(".valuedefine");
                            valueobj.val(v);
                        })()
                    }
                }
                popSetConditionDiv = $.ligerDialog.open({ width:650,height:500,target: $("#setConditionDiv"), title: "设置取值方法的记录范围",buttons: [{ text: "确定", onclick:function()
                {
                    var tb=$("#setConditionTable")[0];
                    opfield.conditions=[];
                    for(var k=0;k<tb.rows.length;k++){
                        var trstr= "#setConditionTable tbody tr"+":eg("+k+")";
                        var nametext=$(tb.rows[k]).find(".fromdefine").val();
                        var optext=   $(tb.rows[k]).find(".opselect").val();
                        var valtext=  $(tb.rows[k]).find(".valuedefine").val();
                        var logtext= $(tb.rows[k]).find(".logicselect").val();
                        var opfieldcondition={name:nametext,op:optext,value:valtext,logic:logtext};
                        opfield.conditions.push(opfieldcondition);
                    }
                    popSetConditionDiv.hide();
                    currentfield=null;
                }}, { text: "取消", onclick:function(){
                    currentfield=null;
                    popSetConditionDiv.hide();
                }}]});
            });
            $(tr).append(td);
        }
        function deleteRow(rowid){
            if (confirm('确定删除?')) {
                $.ajax({ url: "/s/oaflow/oaflow_step_action.php",type: "POST",datatype:"text",data: { operatetype: "deletestep", staffId: escape(rowid) },
                    success: function(data) {
                        //data='{"pw_flag":1,"msg":"你没有权限操作删除人员"}';
                        try{
                            json=eval('(' + data + ')');
                            if(json.pw_flag==1){$.ligerDialog.error(json.msg);return false;}
                        } catch(err) {}
                        g.deleteSelectedRow();
                        $.ligerDialog.success(""+data,function(){
                            location.reload();
                        });
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        $.ligerDialog.error(XMLHttpRequest);
                    }
                });
            }
        }
        function addConditonRow(tr,conditionfield){
            var fieldname=conditionfield.name;
            var op=conditionfield.op;
            var value=conditionfield.value;
            var replyfield=conditionfield.replyfield;
            var logic=conditionfield.logic;
            var td=document.createElement("td");
            $(td).html("<a href='#'>删除</a>");
            $(td.childNodes[0]).bind("click",function(event){
                for(var i=0;i<trigger.conditionfields.length;i++){
                    if(trigger.conditionfields[i]==conditionfield){
                        trigger.conditionfields.splice(i,1);
                    }
                }
                $(tr).remove();
            })
            $(td).css("text-align","center");
            $(td).css("border","1px solid black");
            $(tr).append(td);
            var td=document.createElement("td");
            $(td).html("<select style='width:90%;font-size:12px'>"+stepformfieldopstr+"</<select>");
            $(td).css("text-align","center");
            $(td).css("border","1px solid black");
            $(td.childNodes[0]).val(fieldname);
            $(td.childNodes[0]).bind("click",function(){
                conditionfield.name=$(this).val();
            })
            $(tr).append(td);
            var td=document.createElement("td");
            $(td).html("<select style='width:90%;font-size:12px'><option value='等于'>等于</option><option value='小于'>小于</option><option value='大于'>大于</option><option value='不等于'>不等于</option><option value='大或等于'>大或等于</option><option value='小或等于'>小或等于</option></select>");
            $(td).css("text-align","center");
            $(td).css("border","1px solid black");
            $(td.childNodes[0]).val(op);
            $(td.childNodes[0]).bind("change",function(){
                conditionfield.op=$(this).val();
            })
            $(tr).append(td);
            var td=document.createElement("td");
            $(td).html("<input type='text' value='"+value+"' class='expressInput' style='width:70%;font-size:12px;' /><img src='/resource/images/common/add.GIF'>");
            $(td.childNodes[1]).bind("click",function(){
                inputObj=$(this).prev();
                var l=parseInt($(this).parent().offset().left);
                var t=parseInt($(this).parent().offset().top)+25;
                popSelectGetValueMethodDiv =  $.ligerDialog.open({width:250,height:50,left:l,top:t,title:"请选择字段取值方法", target: $("#selectGetValueMethod")});
                popSelectGetValueMethodDiv.conditionfield=conditionfield;
            })
            $(td.childNodes[0]).bind("change",function(){
                conditionfield.value=$(this).val();
            })
            $(td).css("text-align","center");
            $(td).css("border","1px solid black");
            $(tr).append(td);
            var td=document.createElement("td");
            $(td).html("<select style='width:90%;font-size:12px;'>"+upstepformfieldopstr+"</select>");
            $(td).css("text-align","center");
            $(td).css("border","1px solid black");
            $(td.childNodes[0]).val(replyfield);
            $(td.childNodes[0]).bind("change",function(){
                conditionfield.replyfield=$(this).val();
            })
            $(tr).append(td);
            var td=document.createElement("td");
            $(td).html("<select style='width:90%;font-size:12px;'><option value='and'>与</option><option value='or'>或</option></select>");
            $(td).css("text-align","center");
            $(td).css("border","1px solid black");
            $(td.childNodes[0]).val(logic);
            $(td.childNodes[0]).bind("change",function(){
                conditionfield.logic=$(this).val();
            })
            $(tr).append(td);
        }
        function editCondition(){

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
        function loadDataTree(){
            $("#dataTree").html("");
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
                            $("#formname").val(node.data.values[0].value);
                            $("#formid").val(node.data.id);
                            $.ajax({
                                type: 'POST',
                                url: '/s/function/macrosfield.php',
                                data: { "from_id":node.data.id},
                                success: function(data) {
                                    trigger={opfields:[],conditionfields:[]};
                                    data = eval('(' + data + ')');
                                    var fieldoptable=$("#fieldoptable")[0];
                                    for(var i=fieldoptable.rows.length-1;i>0;i--){
                                        $(fieldoptable.rows[i]).remove();
                                    }
                                    stepformfieldopstr="";
                                    for(var i=0;i<data.fieldv.length;i++){
                                        (function(){
                                            var aliasname=data.fields[i];
                                            var fieldname=data.fieldv[i];
                                            if(i==0) {
                                                stepformfieldopstr = stepformfieldopstr + "<option selected value='" + fieldname + "'>" + aliasname + "</option>";
                                            }
                                            else{
                                                stepformfieldopstr = stepformfieldopstr + "<option value='" + fieldname + "'>" + aliasname + "</option>";
                                            }
                                            var opfield={checked:false,name:fieldname,alias:aliasname,value:"",replyfield:"",conditions:[]};
                                            trigger.opfields.push(opfield);
                                            var row=fieldoptable.insertRow();
                                            addfieldoptableRow(row,opfield);
                                        })()
                                    }
                                }
                            });
                        }
                    });
                }
            });
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
        #add_edit_step dt {
            float: left;
            width: 90px;
            text-align: right;
        }
        #add_edit_step dd {
            float: left;
            text-align: left;
            margin: 0px;
            padding: 0px;
            height: 26px;
            line-height: 26px;
        }
        #add_edit_step dd input {
            height: 18px;
            width: 100px;
            line-height: 18px;
            border: 1px solid #CCC;
            padding-left:5px;
        }
        #add_edit_step p
        {
            padding-left:90px;
            padding-top:10px;
        }
        #add_edit_step p input
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
    <style>
        #setConditionTable td,#edit td,#add td,#delete td{text-align:center;}
        #setConditionTable select,#edit select,#add select,#delete select{width:100px;}
        #setConditionTable input,#edit input,#add input,#delete input{width:50px;}
        label{display:inline; font-weight:bold; text-align:left}
        tr span{font-weight:normal;}
        .table-striped{width:100%;}
        #edit,#add,#setConditionTable,#delete{margin:2px;}
        .table-striped th{background:#EFEFEF;text-align:left; padding:3px}
    </style>
</head>
<body style="background-color:#E0F0FE">
<div class="admin_main_nr_dbox">
    <?php
    if(empty($_GET['gid'])){
        ?>
        <div>
            <input type="button" id="addstep" value="添加新步骤" />
        </div>
    <?php } ?>
    <div id="maingrid" style="margin-top:8px"></div>
    <div id="add_edit_step" style="width: 95%;height:510px;margin-left:30px;padding:0px;border:1px solid black;text-align: center; display:none;overflow: hidden;">
        <form action="" method="post" name="add_step_form" id="add_step_form">
            <dl style="display: none;">
                <dt>id：</dt><dd><input type="text" name="id" id="id" value="" /></dd>
            </dl>
            <dl style="display: none;">
                <dt>流程ID：</dt><dd><input type="text" name="oaid" id="oaid" value=""/></dd>
            </dl>
            <dl style="display: none;">
                <dt>步骤序列：</dt><dd><input type="text" name="stepindex" id="stepindex" value=""/></dd>
            </dl>
            <dl style="display: none;">
                <dt>表单ID：</dt><dd><input type="text" name="formid" id="formid" value=""/></dd>
            </dl>
            <dl style="display: none;">
                <dt>触发器：</dt><dd><input type="text" name="triggerStr" id="triggerStr" value=""/></dd>
            </dl>
            <div style="float: left;width:100%;margin-top:0px;border-bottom: 1px solid black;">
               <span style="float: left;margin-left: 10px;">表单名称：<input type="text" name="formname" id="formname" value=""/></span>
               <span style="float: right;margin-right:15px;">表单操作：<select name="formop" id="formop"><option value="add">添加记录</option><option value="del">删除记录</option><option value="update">修改记录</option></select></span>
            </div>
            <div id="workdiv"style="width: 100%;height:510px;float: left;overflow: hidden;">
            <div name="macroDiv" style="width: 30%;height: 510px;float: left;overflow:hidden; z-index: -100;border-right: 1px solid black;" id="macroDiv">
                <ul id="dataTree" name="dataTree"></ul>
            </div>
            <div style="width: 69%;border:1px solid black;border-top: 0px solid black;border-right: 0px solid black; height:510px;float: right;overflow: hidden;">
                <div name="fieldsDiv" style="width: 100%;height: 250px;float: left;overflow: auto;" id="fieldsDiv">
                    <table id="fieldoptable" name="fieldoptable" style="width:98%;border-collapse:collapse;margin-top: 10px;margin-left: 10px; ">
                        <thead>
                        <tr>
                            <th style="text-align: center;width:28px;border: 1px solid black;">
                                <a href="#">选择</a>
                            </th>
                            <th style="text-align: center;width:100px;border: 1px solid black;">
                                <a href="#">字段</a>
                            </th>
                            <th style="text-align: center;width:100px;border: 1px solid black;">
                                <a href="#">设置字段值</a>
                            </th>
                            <th style="text-align: center;width:100px;border: 1px solid black;">
                                <a href="#">依赖字段</a>
                            </th>
                            <th style="text-align: center;width:50px;border: 1px solid black;">
                                <a href="#">条件</a>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div name="conditionDiv" style="width: 100%;border-top:1px solid black;height:140px;float: left;overflow: auto;display:none;" id="conditionDiv">
                    <table id="conditiontable" name="conditiontable" style="width:98%;border-collapse:collapse;margin-top: 10px;margin-left: 10px; ">
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
                            <th style="text-align: center;width:100px;border: 1px solid black;">
                                <a href="#">依赖字段</a>
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
<div id="setConditionDiv" style="display:none;">
    <table class="table table-bordered table-striped" id="setConditionTable">
        <tbody>
        </tbody>
    </table>
</div>
<table class="table table-bordered table-striped" id="varConditionTable" style="display:none;">
    <tbody>
    <tr class="firstrowclass">
        <td style="width:126px">&nbsp;</td>
        <td><input type="text" placeholder="左括号" value=""></td>
        <td><select class="fromdefine">
                <option value="">字段</option>
                <option value="">自定义</option>
            </select></td>
        <td><select class="opselect">
                <option value="">条件</option>
                <option value="=">等于</option>
                <option value="<>">不等于</option>
                <option value=">">大于</option>
                <option value="<">小于</option>
                <option value=">=">大于或等于</option>
                <option value="<=">小于或等于</option>
            </select></td>
        <td><select class="valuedefine">
                <option value="">字段</option>
                <option value="">自定义</option>
            </select></td>
        <td><input type="text" placeholder="右括号" value=""></td>
        <td><input type="button" value="增加" class="add"></td>
    </tr>
    <tr class="temp">
        <td><select class="logicselect">
                <option value="and">并且</option>
                <option value="or">或者</option>
            </select></td>
        <td><input type="text" placeholder="左括号" value=""></td>
        <td><select class="fromdefine">
                <option value="">字段</option>
                <option value="">自定义</option>
            </select></td>
        <td><select class="opselect">
                <option value="">条件</option>
                <option value="=">等于</option>
                <option value="<>">不等于</option>
                <option value=">">大于</option>
                <option value="<">小于</option>
                <option value=">=">大于或等于</option>
                <option value="<=">小于或等于</option>
            </select></td>
        <td><select class="valuedefine">
                <option value="">字段</option>
                <option value="">自定义</option>
            </select></td>
        <td><input type="text" placeholder="右括号" value=""></td>
        <td><input type="button" value="删除" class="delete"></td>
    </tr>
    </tbody>
</table>
<div id="selectGetValueMethod" style="display:none;"><select style='width:90%;'><option value='value'>取值</option><option value='max'>最大值</option><option value='min'>最小值</option><option value='avg'>平均值</option><option value='sum'>求和</option></select></div>
<div class="admin_frameset" >
    <div class="open_frame" title="全屏" id="open_frame"></div>
    <div class="close_frame" title="还原窗口" id="close_frame"></div>
</div>
</body>
</html>
