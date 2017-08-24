<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
 <head>
    
    <title>流程设计器</title>    
    
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    
<link href="/s/tp/wwwroot/Public/css/bootstrap/css/bootstrap.css?<?php echo ($_cjv); ?>" rel="stylesheet" type="text/css" />
<!--[if lte IE 6]>
<link rel="stylesheet" type="text/css" href="/s/tp/wwwroot/Public/css/bootstrap/css/bootstrap-ie6.css?<?php echo ($_cjv); ?>">
<![endif]-->
<!--[if lte IE 7]>
<link rel="stylesheet" type="text/css" href="/s/tp/wwwroot/Public/css/bootstrap/css/ie.css?<?php echo ($_cjv); ?>">
<![endif]-->
<!--select 2-->
<link rel="stylesheet" type="text/css" href="/resource/part/jquery.multiselect2side/css/jquery.multiselect2side.css" media="screen" />
<link href="/s/tp/wwwroot/Public/css/site.css?<?php echo ($_cjv); ?>" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="/s/tp/wwwroot/Public/js/jquery-1.7.2.min.js?<?php echo ($_cjv); ?>"></script>
<script type="text/javascript" src="/s/tp/wwwroot/Public/css/bootstrap/js/bootstrap.min.js?<?php echo ($_cjv); ?>"></script>
<!--select 2-->
<script type="text/javascript" src="/resource/part/jquery.multiselect2side/js/jquery.multiselect2side.js?<?php echo ($_cjv); ?>" ></script>

<script type="text/javascript">
    var _root='<?php echo ($_site_url); echo U('/');?>',_controller = '<?php echo ($_controller); ?>';
</script>

<style>
/*自定义 multiselect2side */
.ms2side__div{border: 0px solid #333;padding-top: 30px; margin-left: 25px;}
.ms2side__div select{height: auto;height:320px;}
.ms2side__header {
    margin-left: 3px;
    margin-top:-20px;
    margin-bottom: 5px;
    width: 180px;
    height: 20px;
}
.ms2side__div select {
    width: 180px;
    float: left;
}

.dialog_main{margin:5px 0 0 5px;}
</style>

 </head>
<body>


	
<div class="container dialog_main">


<div class="row">   
    <div class="span6">
        <select name="dialog_searchable" id="dialog_searchable" multiple="multiple" style="display:none;">
            <?php echo ($list); ?>
        </select>
    </div>
</div>
<div class="row span7">
<div class="pull-right">
    <button class="btn btn-info" type="button" id="dialog_confirm">确定</button>
    <button class="btn" type="button" id="dialog_close">取消</button>
</div>
<div  class="pull-left offset2">
    <input type="radio" <?php if($op == 'user'): ?>checked="checked"<?php endif; ?>>用户
    <input type="radio" <?php if($op == 'dept'): ?>checked="checked"<?php endif; ?>>部门
    <input type="radio" <?php if($op == 'role'): ?>checked="checked"<?php endif; ?>>角色
</div>

</div>
</div><!--end container-->






    

<script type="text/javascript">
    $(function(){
          $('#dialog_searchable').multiselect2side({
            selectedPosition: 'right',
            moveOptions: false,
            labelsx: '备选',
            labeldx: '已选',
            autoSort: true
            //,autoSortAvailable: true
        });
        //搜索用户
        $("#dialog_search").on("submit",function(){
            
            //ajax data
            var data = [{"vlaue":"100","text":"搜索1"},{"vlaue":"101","text":"搜索2"}];//test
            
            var optionList = [];
            for(var i=0;i<data.length;i++){
                optionList.push('<option value="');
                optionList.push(data[i].value);
                optionList.push('">');
                optionList.push(data[i].text);
                optionList.push('</option>');
            }
            $('#searchablems2side__sx').html(optionList.join(''));
            
            //阻止表单提交
            return false;
        });
        
        
        $("#dialog_confirm").on("click",function(){
            var nameText = [];
            var idText = [];
            var globalValue = '@leipi@';
            if(!$('#dialog_searchable').val())
            {
                //alert("未选择");//这里不提示了，万一他要清空呢
            }else
            {
                $('#dialog_searchable option').each(function(){
                if($(this).attr("selected"))
                {
                    if($(this).val()=='all')//有全部，其它就不要了
                    {
                        nameText = [];
                        idText = [];
                        nameText.push($(this).text());
                        idText.push($(this).val());
                        return false;
                    }
                    nameText.push($(this).text());
                    idText.push($(this).val());
                }
                });
                globalValue = nameText.join(',') + '@leipi@' + idText.join(',');
            }
            //这里不用 json了，数据库 也是用 , 号隔开保存的
            //var jsonText = JSON.stringify(nameText) + JSON.stringify(idText);

            
            if(window.ActiveXObject){ //IE  
                window.returnValue = globalValue
            }else{ //非IE  
                if(window.opener) {  
                    window.opener.callbackSuperDialog(globalValue) ;  
                }
            }  
            window.close();            
            
        });
        $("#dialog_close").on("click",function(){
            window.close();
        });
    });
</script>

    

</body>
</html>