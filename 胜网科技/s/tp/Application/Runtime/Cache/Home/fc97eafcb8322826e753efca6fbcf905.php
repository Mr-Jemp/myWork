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
	
<p></p>
<div class="container">
<div class="row">
    <ol class="breadcrumb">     
        <li class="active">查看</li>
    </ol>
</div>
<div class="row">
<form action="<?php echo U('/demodata/'.$_action);?>" method="post">
<hr/>
<p>
    <?php echo ($design_content); ?>
</p>
</form>
</div><!--end row-->
</div><!--end container-->




<block name="footer_js">

<!-- script end -->



    <!--footer js -->
</body>
</html>