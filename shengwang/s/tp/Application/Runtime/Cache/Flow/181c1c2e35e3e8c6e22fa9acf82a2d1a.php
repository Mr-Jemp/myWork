<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
 <head>
    
    <title>流程设计器 实例演示 Flowdesign.leipi.org</title>
    <meta name="keyword" content="流程设计器实例演示,Web Flowdesign,Flowdesigner,专业流程设计器,WEB流程设计器">
  <meta name="description" content="流程设计器实例演示，国内最容易使用和开发的流程设计器，你可以在此基础上任意修改使功能无限强大！">

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



<div class="bs-header" id="content">
  <div class="container">

    <h1>流程设计器使用实例演示</h1>
    <p>
       使用流程设计器，有效强化系统审批工作的功能！<br /> 本实例仅方便大家了解使用方法和简化二次开发，你可以任意修改使功能无限强大！
    </p>
    
  </div>
</div>

<div class="container">
<div class="row">
    <ol class="breadcrumb">
        <li><a href="/">流程设计器</a> <span class="divider">/</span></li>
        <li class="active">实例</li>
    </ol>
</div>

<div class="row">
<p>
    <a href="<?php echo U('/demo/add');?>" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-plus"></span> 添加流程</a>
</p>

<table class="table table-hover">
    <tr>
        <th>ID</th>
        <th>流程名称</th>
        <th>表单</th>
        <th>类型</th>
        <th>适用部门</th>
        <th>添加时间</th>
        <th>操作</th>
    </tr>
    <?php if(is_array($list)): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><tr>
        <td><?php echo ($vo["id"]); ?></td>
        <td><span title="<?php echo ($vo["flow_desc"]); ?>"><?php echo ($vo["flow_name"]); ?></span></td>
        <td><?php echo ($vo["form_name"]); ?></td>
        <td>固定流程</td>
        <td>默认</td>
        <td><?php echo date('Y/m/d H:i',$vo['dateline']);?></td>
        <td>
        <a href="<?php echo U('/run/add/flow_id/'.$vo['id']);?>"  target="_blank" title="使用该流程发起工作"><span class="glyphicon glyphicon-eye-open"></span> 发起</a>&nbsp;&nbsp;&nbsp;&nbsp;
		<a href="<?php echo U('/run/index/flow_id/'.$vo['id']);?>"  target="_blank" ><span class="glyphicon glyphicon-eye-open"></span> 发起记录</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <?php if($vo["fields"] > 0): ?><a href="<?php echo U('/demodata/index/flow_id/'.$vo['id']);?>" target="_blank"><span class="glyphicon glyphicon-list"></span> 流程数据</a>&nbsp;&nbsp;&nbsp;&nbsp;<?php endif; ?>
            <a href="<?php echo U('/flowdesign/index/flow_id/'.$vo['id']);?>" target="_blank"><span class="glyphicon glyphicon-new-window"></span> 设计流程</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="<?php echo U('/demo/edit/flow_id/'.$vo['id']);?>" target="_blank"><span class="glyphicon glyphicon-edit"></span> 编辑</a></td>
    </tr><?php endforeach; endif; else: echo "" ;endif; ?>
</table>

<?php echo ($page); ?>

</div><!--end row-->


<div class="row">
<hr/>
<h4>百度相关 <small>点一下就是对我们最大的赞助</small></h4>

</div>


</div><!--end container-->






<!-- script end -->



</body>
</html>