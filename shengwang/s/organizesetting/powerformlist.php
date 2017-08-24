<?php
session_start();
include_once '../inc/conn.php';
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link href="/resource/part/bootstrap/css/bootstrap3.min.css" rel="stylesheet" type="text/css"/>
    <script src="/resource/js/jQuery/jquery-1.11.1.min.js"></script>
    <link href="/resource/css/common/page.css" rel="stylesheet" type="text/css" />
    <title>角色对应表</title>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-sm-12">
            <div style="padding-top: 15px;padding-bottom:10px;">
                <a href="javascript:;" class="btn btn-danger" id="pdel">删除</a>
                <a href="#" class="btn btn-success" data-toggle="modal" data-target="#myModal">添加角色表单</a>
            </div>
            <form action="#" method="post" id="powerform">
                <table class="table table-hover table-bordered table-condensed">
                    <tr class="warning">
                        <th><input type="checkbox" name="all" class="allcheck"> 全选</th>
                        <th>表单</th>
                        <th>表单描述</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                    <?php
                    $roleid = $_GET['roleid'];
                    if (!$roleid) exit('非法操作');
                    $totalRows=mysql_query('select count(*) as count from ht_form where id in(select distinct form_id from ht_power where role_id=' . $roleid . ') order by id desc');
                    $nums=mysql_fetch_assoc($totalRows);
                    require('../lib/page.class.php');
                    $page=new Page($nums['count'],10);
                    $formconent = mysql_query('select id,form_name,form_desc,dateline,pid from ht_form where id in(select distinct form_id from ht_power where role_id=' . $roleid . ') order by id desc limit '.$page->firstRow.','.$page->listRows);
                    while ($row = mysql_fetch_assoc($formconent)) {
                        echo '<tr>';
                        echo '<td><input type="checkbox" name="c[]" value="' . $row['id'] . '"> ' . $row['id'] . '</td>';
                        echo '<td>' . $row['form_name'] . '</td>';
                        echo '<td>' . $row['form_desc'] . '</td>';
                        echo '<td>' . date('Y-m-d H:s', $row['dateline']) . '</td>';
                        echo '<td><a href="javascript:;" onclick="del(' . $row['id'] . ')">删除</a> | <a href="/admin/pageEdit/formdesign/index.htm?modelId=' . $row['id'] . '&modelName=' . $row['id'] . '">编辑</a></td>';
                        echo '</tr>';
                    }
                    ?>
                </table>
            </form>
            <div class="page">
                <?php
               echo  $page->show();
                ?>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    function del(formid) {
        if (confirm('确定要删除此表单吗？')) {
            $.post('delform.php', {"formid": formid}, function (data) {
                if (data) {
                    alert('删除成功');
                    window.location.href = window.location.href;
                } else {
                    alert('删除失败');
                }
            });
        } else {
            return false;
        }
    }
    $(function () {
        $("#pdel").click(function(){
            if (confirm('确定要删除此表单吗？')) {
                var delids="";
                $("#powerform td :checked").each(function () {
                    delids=delids+","+$(this).val();
                });
                if(delids!=''){
                    $.post('delform.php', {"formid": delids,"deltype":"all"}, function (data) {
                        if (data==1) {
                            alert('删除成功');
                            location.replace(location.href);
                        } else {
                            alert('删除失败');
                        }
                    });
                }else{
                    alert('没有选择要删除的表单');
                }
            }
        });
        $("#submitform").click(function () {
            var formname = $("#filename");
            var form_name = formname.val();
            var newformid = null;
            var roleids = null;
            formname.val('');

            var ftype = $("#filetype").val();
            $.post("/s/tp/wwwroot/index.php?s=/Home/Demo/add.html",
                {"pid": 56, "form_name": form_name, "ftype": ftype, "creater_uid":<?php echo $_SESSION['uid'];?>},
                function (d) {
                    roleids = '<?php echo $roleid;	?>';
                    newformid = d.id;
                    if(roleids){
                        $.post("/s/power/saveviewpower.php",{"role_id": roleids, "form_id":newformid});
                        alert('添加成功');
                        $('#myModal').modal('hide');
                        location.replace(location.href);
                    }
                }, "json");
         });
        $(".allcheck").click(function(){
            //alert($(this).prop("checked"));
            $("#powerform :checkbox").prop("checked",$(this).prop("checked"));
        });
    });
</script>
<script src="/resource/part/bootstrap/js/bootstrap3.min.js"></script>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">添加表单</h4>
            </div>
            <div class="modal-body">
                <form>
                    <input type="hidden" name="node_id" id="node_id" class="out" value="56">
                    <input type="hidden" name="act" id="act" value="add" class="out">

                    <div class="form-group">
                        <label for="filename">文件名：</label>
                        <input type="text" name="filename" id="filename" value="" style="width:100px;">
                    </div>
                    <div class="form-group">
                        <label for="filename">类　型：</label>
                        <select name="filetype" id="filetype" style="width:105px;" class="out">
                            <option value="1">文件夹</option>
                            <option value="0" id="chselected">页面</option>
                            <option value="2">跳转地址</option>
                            <option value="3">报表管理</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="submitform">Save changes</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>