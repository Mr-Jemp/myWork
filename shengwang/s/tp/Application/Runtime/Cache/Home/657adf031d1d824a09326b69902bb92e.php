<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
 <head>
    
    <title>数据操作</title>

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
    <link href="/s/tp/wwwroot/Public/css/site.css?<?php echo ($_cjv); ?>" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        var _root='<?php echo ($_site_url); echo U('/');?>',_controller = '<?php echo ($_controller); ?>';
    </script>
    

 </head>
<body>
<!-- fixed navbar -->
	
<div class="container">
<div class="row">
    <ol class="breadcrumb">
        <li><a href="/">表单设计器</a> <span class="divider">/</span></li>
        <li><a href="<?php echo U('/demo');?>">实例</a> <span class="divider">/</span></li>
        <li class="active"><?php if(empty($one)): ?>添加<?php else: ?>编辑<?php endif; ?></li>
    </ol>
</div>

<div class="row">
<form action="<?php echo U('/demo/'.$_action);?>" method="post">
<input type="hidden" value="<?php echo ($one["id"]); ?>" name="form_id">
<p>
    <label>表单名称</label>
    <input type="text" class="span6" placeholder="必填项" name="form_name" value="<?php echo ($one["form_name"]); ?>">
</p>
<p>
    <label>表单描述</label>
    <textarea rows="4" class="span6" placeholder="简单描述一下也好呀" name="form_desc"><?php echo ($one["form_desc"]); ?></textarea>
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