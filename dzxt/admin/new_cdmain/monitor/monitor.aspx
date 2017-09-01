<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="monitor.aspx.cs" Inherits="HBS.Website.monitor.monitor1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
<link href="/resource/part/newtpl/css/public.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/resource/js/jQuery/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/resource/part/newtpl/js/public.js"></script>
<link href="/resource/part/newtpl/css/rheight.css" rel="stylesheet" type="text/css" />
<title>数据连接监控</title>
</head>
<body style="background-color:#E0F0FE">
<div class="admin_main_nr_dbox">
    <form id="form1" runat="server">
    <div style="height: 450px">    
        &nbsp;<asp:Button ID="btn_Refresh" runat="server" BorderStyle="Groove" Height="23px" 
            onclick="btn_Refresh_Click" Text="刷新" Width="120px" />
        &nbsp;<asp:Button ID="btn_CloseConns" runat="server" Height="23px" 
            onclick="btn_CloseConns_Click" Text="关闭所有空闲连接" Width="120px" 
            BorderStyle="Groove" />
        &nbsp;<asp:CheckBox ID="chk_ShowAll" runat="server" Text="显示所有连接" />
        <br />
        <asp:GridView ID="gvData" runat="server" AutoGenerateColumns="False" 
            onrowcommand="gvData_RowCommand" onrowdeleting="gvData_RowDeleting" 
            onselectedindexchanging="gvData_SelectedIndexChanging" Width="100%" 
            ondatabinding="gvData_DataBinding" ToolTip="数据库连接列表">
            <RowStyle BackColor="#CCFFCC" />
            <Columns>
                <asp:BoundField DataField="datid" HeaderText="数据库ID" Visible="False" />
                <asp:BoundField DataField="datname" HeaderText="数据库" />
                <asp:BoundField DataField="procpid" HeaderText="进程" />
                <asp:BoundField DataField="usesysid" HeaderText="用户ID" Visible="False" />
                <asp:BoundField DataField="usename" HeaderText="用户名" />
                <asp:BoundField DataField="application_name" HeaderText="程序名称" />
                <asp:BoundField DataField="client_addr" HeaderText="客户端IP" />
                <asp:BoundField DataField="client_hostname" HeaderText="客户端名称" 
                    Visible="False" />
                <asp:BoundField DataField="client_port" HeaderText="客户端口" Visible="False" />
                <asp:BoundField DataField="backend_start" HeaderText="连接启动时间" Visible="False" />
                <asp:BoundField DataField="xact_start" HeaderText="启动时间" Visible="False" />
                <asp:BoundField DataField="query_start" HeaderText="查询启动时间" />
                <asp:BoundField DataField="waiting" HeaderText="等待" Visible="False" />
                <asp:BoundField DataField="current_query" HeaderText="当前命令" />
                <asp:CommandField DeleteText="关闭" ShowCancelButton="False" 
                    ShowDeleteButton="True" HeaderText="关闭" />
            </Columns>
            <SelectedRowStyle BackColor="White" />
            <HeaderStyle BackColor="#66CCFF" HorizontalAlign="Left" />
            <AlternatingRowStyle BackColor="#CCFFFF" />
        </asp:GridView>    
    </div>
    </form>
</div>
<div class="admin_frameset" >
  <div class="open_frame" title="全屏" id="open_frame" flag="min"></div>
  <div class="close_frame" title="还原窗口" id="close_frame" flag="min"></div>
</div>
</body>
</html>
