<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
 <head>
    
    <title>流程设计器</title>    

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <!--<link href="/resource/part/bootstrap3/css/bootstrap.css" rel="stylesheet" type="text/css" /> -->   
    <link href="/s/tp/wwwroot/Public/css/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css" />
    <!--[if lte IE 6]>
    <link rel="stylesheet" type="text/css" href="/s/tp/wwwroot/Public/flow/css/bootstrap/css/bootstrap-ie6.css?<?php echo ($_cjv); ?>">
    <![endif]-->
    <!--[if lte IE 7]>
    <link rel="stylesheet" type="text/css" href="/s/tp/wwwroot/Public/flow/css/bootstrap/css/ie.css?<?php echo ($_cjv); ?>">
    <![endif]-->
    <link href="/s/tp/wwwroot/Public/css/site.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        var _root='<?php echo ($_site_url); echo U('/');?>',_controller = '<?php echo ($_controller); ?>';
    </script>
    

 </head>
<body>
<!-- fixed navbar -->

<div class="container">
<div class="row" style="padding-top: 10px;">
    <ol class="breadcrumb">
        <li><a href="/">流程设计器</a> <span class="divider">/</span></li>
        <li><a href="<?php echo U('/Flow/demo');?>">实例</a> <span class="divider">/</span></li>
        <li class="active"><?php if(empty($one)): ?>添加<?php else: ?>编辑<?php endif; ?></li>
    </ol>
</div>

<div class="row">
<form action="<?php echo U('/Flow/demo/'.$_action);?>" method="post" style="padding-left: 20px;">
<input type="hidden" value="<?php echo ($one["id"]); ?>" name="flow_id">


<p>
    <label>流程名称</label>
    <input type="text" class="span6" placeholder="必填项" name="flow_name" value="<?php echo ($one["flow_name"]); ?>">
</p>
    <p>
        <label>流程类型</label>
        <select name="cat_id">
            <option value="0" <?php if($one['cat_id'] == 0): ?>selected<?php endif; ?>>普通流程</option>
            <option value="1" <?php if($one['cat_id'] == 1): ?>selected<?php endif; ?>>列表流程</option>
            <option value="2" <?php if($one['cat_id'] == 2): ?>selected<?php endif; ?>>全自动流程</option>
            <option value="3" <?php if($one['cat_id'] == 3): ?>selected<?php endif; ?>>委托流程</option>
        </select>
    </p>
<p>
    <label>选择表单</label>
    <!--<select name="form_id">
        <?php if(is_array($form_list)): $i = 0; $__LIST__ = $form_list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($vo["id"]); ?>" <?php if($vo['id'] == $one['form_id']): ?>selected="selected"<?php endif; ?>><?php echo ($vo["form_name"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
    </select>-->
        <select name="form_id[]" size="3" multiple id="select">
            <?php if(is_array($form_list)): $i = 0; $__LIST__ = $form_list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><option value="<?php echo ($vo["id"]); ?>" <?php if(in_array($vo['id'],$flow_form_ids)): ?>selected="selected"<?php endif; ?>><?php echo ($vo["form_name"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
        </select>

</p>

<p>
    <label>流程描述</label>
    <textarea rows="4" class="span6" placeholder="简单描述一下也好呀" name="flow_desc"><?php echo ($one["flow_desc"]); ?></textarea>
</p>
<button type="submit" name="submit_to_save" value="save" class="btn btn-success">确定保存</button>
</form>


</div><!--end row-->
</div><!--end container-->




<block name="footer_js">

<!-- script end -->



<!--footer js -->
</body>
</html>