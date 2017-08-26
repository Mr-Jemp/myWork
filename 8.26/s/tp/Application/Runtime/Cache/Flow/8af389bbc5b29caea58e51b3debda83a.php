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
<div class="row">
    <ol class="breadcrumb">
        <li><a href="#">流程设计器</a> <span class="divider">/</span></li>
        <li class="active">审核</li>
    </ol>
</div>
<div class="row">
<form action="<?php echo U('/Flow/run/save_show');?>" method="post">
<input type="hidden" value="<?php echo ($run_process_id); ?>" name="run_process_id" />
<input type="hidden" value="<?php echo ($flow_one["id"]); ?>" name="flow_id" />
<input type="hidden" value="<?php echo ($run_one["id"]); ?>" name="run_id" />
<input type="hidden" value="<?php echo ($mid); ?>" name="mid" />
<input type="hidden" value="<?php echo ($from_data_id); ?>" name="from_data_id" />
<hr/>
<p>
	<h4><i class="icon-play"></i>表单内容</h4>
    <?php echo ($design_content); ?>
</p>
<hr/>
<!--
<p>
	<h4><i class="icon-play"></i>上传附件</h4>
	未完成...
</p>
<hr/>
<p>
	<h4><i class="icon-play"></i>会签意见</h4>
	未完成...
</p>
<hr/>-->
<!--<button type="submit" name="submit_to_save" value="save" class="btn btn-primary">确定提交</button>
<button type="submit" name="submit_to_next" value="next" class="btn btn-info">保存转交下一步</button>-->
<button type="submit" name="submit_to_save" value="save" class="btn btn-primary">批准</button>
<button type="submit" name="submit_to_end" value="end" class="btn btn-success">拒绝</button>
</form>
</div><!--end row-->
</div><!--end container-->
<block name="footer_js">
<!-- script end -->

<!--footer js -->
</body>
</html>