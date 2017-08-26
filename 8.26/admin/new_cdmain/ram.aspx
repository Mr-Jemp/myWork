<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ram.aspx.cs" Inherits="cdadmin.monitor.RAM" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
<title>RAM数据查看</title>
<script type="text/javascript" src="/resource/js/jQuery/jquery-1.7.2.min.js"></script>
<script src="js/ram.js"></script>
<link href="/resource/part/newtpl/css/public.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/resource/part/newtpl/js/public.js"></script>
<link href="/resource/part/newtpl/css/rheight.css" rel="stylesheet" type="text/css" />
<style type="text/css">
.STYLE1 {color: #FFFFFF}
body {
	margin-left: 3px;
	margin-top: 3px;
	margin-right: 3px;
	margin-bottom: 3px;
}
</style>
</head>
<body style="background-color:#E0F0FE">
<div class="admin_main_nr_dbox">
<table width="100%" height="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td valign="top" bgcolor="#CCCCCC"><table width="100%" height="0" border="0" cellpadding="3" cellspacing="1" id="asdadfe">
      <tr>
        <td height="18" bgcolor="#218AB5"><span class="STYLE1">RAM数据查看(<a href="javascript:;" class="STYLE1">点击刷新</a>)</span><span id="idstate"></span></td>
      </tr>
	  </table></td>   
  </tr>
</table>
</div>
<div class="admin_frameset" >
  <div class="open_frame" title="全屏" id="open_frame" flag="min"></div>
  <div class="close_frame" title="还原窗口" id="close_frame" flag="min"></div>
</div>
</body>
</html>
