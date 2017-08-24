<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="main.aspx.cs" Inherits="hhh.monitor.main" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<title>数据同步后台</title>    
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link href="/admin/cdmain/css/main.css" rel="stylesheet" type="text/css" />
<script src="/resource/js/jQuery/jquery-1.9.1.js"></script>
<script src="/admin/cdmain/js/main.js"></script>
<link href="/resource/css/common/backsetting.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="menu_box">
 
     
     <div id="leftmenu" class="leftmenu">
     <div>
     <span>创建系统数据表</span>
      <a href="/admin/cdmain/setup.aspx"  target="print_frm">创建数据表</a>
     </div>
     <div>
     <span>数据同步管理</span>
        <a href="/admin/cdmain/filetimelist.aspx"  target="print_frm">文件同步</a>
        <a href="/admin/cdmain/dbtimelist.aspx"  target="print_frm">数据库同步</a>
     </div>
     <div>
     <span>系统性能查看</span>
        <a href="/admin/cdmain/ram.aspx"  target="print_frm">RAM数据</a>
        <a href="/admin/cdmain/cpu.aspx"  target="print_frm">CPU数据</a>
        <a href="/admin/cdmain/monitor/monitor.aspx"  target="print_frm">数据连接监控123</a>
     </div>     
     </div>
     
  <div class="right"><iframe src="/admin/cdmain/init.html" id="print_frm" name="print_frm" style="margin:0;padding:0;" frameborder="0" width="100%" height="100%"></iframe></div>
</div>
</body>
</html>
