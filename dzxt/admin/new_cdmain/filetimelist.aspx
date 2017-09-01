<%@ Page Language="C#" AutoEventWireup="true"  CodeBehind="filetimelist.aspx.cs" Inherits="_filetimelist" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<title>文件同步</title>    
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link href="css/timelist.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../../resource/js/jQuery/jquery-1.7.2.min.js"></script>
<script src="js/filetimelist.js"></script>
<link href="../../resource/part/newtpl/css/public.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../../resource/part/newtpl/js/public.js"></script>
<link href="../../resource/part/newtpl/css/rheight.css" rel="stylesheet" type="text/css" />
<style type="text/css">
	.style1
	{
		width: 255px;
	}
</style>		
</head>
<body style="background-color:#E0F0FE">
<div class="admin_main_nr_dbox">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="25" bgcolor="#218AB5" class="path">&nbsp;数据同步-&gt;文件定时同步</td>
  </tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
  <tr>
    <td bgcolor="#CCCCCC">
    
<table width="100%" border="0" cellpadding="3" cellspacing="1" id="kadlskdweo">
  <tr>
    <td height="30" colspan="9" align="center" valign="middle" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
        <form action="newfile.aspx" method="get">
         <td width="29%" align="left"><input type="submit" name="button" id="button" value="添加同步操作" /></td>
         </form>
         <form action="filetimelist.aspx" method="get">
          <td width="71%" align="right">
            请输入关键字
            <input type="text" name="key" id="key" />
            搜索分类
            <select name="target" id="target">
              <option value="">目标选择</option>
              <option value="操作模式">操作模式</option>
              <option value="本地目录">本地目录</option>
              <option value="文件选择">文件选择</option>
              <option value="状态">状态</option>
            </select>
            <input type="submit" name="find" id="find" value="搜索" /></td>
            </form>
        </tr>
        
      </table></td>
  </tr>
  <tr bgcolor="#29AAE7" class="path">
    <td height="25" align="center" valign="middle">选
      <input type="checkbox" name="selectcmd" id="selectcmd"/>      </td>
    <td height="25" align="center" valign="middle">目标选择</td>
    <td align="center" valign="middle">操作模式</td>
    <td align="center" valign="middle">本地目录</td>
    <td align="center" valign="middle">目标目录</td>
    <td align="center" valign="middle">文件选择</td>
    <td width="255" align="center" valign="middle" class="style1">定时</td>
    <td align="center" valign="middle">状态</td>
    <td align="center" valign="middle">操作</td>
  </tr>
  <%
      int i = 0;
      for (i = 0; i < forcount; i++)
      {
          if (list == null) break;
          if (list[i]==null)continue;
   %>
<tr  id="rowid" bgcolor="#FFFFFF">
  <td width="40" height="25" align="center" valign="middle">　
    <input type="checkbox" name="selectid" id="selectid" value="<%=list[i].col["fid"]%>"/></td>
  <td width="71" height="25" align="center" valign="middle"><%=list[i].col["ftarget"]%></td>
  <td width="97" align="center" valign="middle">
  <%
      Response.Write(list[i].col["fcmdtype"]);
      if (list[i].col["fcmdtype"].Equals("定时"))
      {
          Response.Write("<br>" + list[i].col["ftimetype"]);
          Response.Write("<br>" + list[i].col["floop"]);
      }
   %></td>
  <td width="205" align="center" valign="middle"><%=(strlen(list[i].col["fsrcpath"].ToString()) < 1 ? "本站根目录" : list[i].col["fsrcpath"])%></td>
  <td width="214" align="center" valign="middle"><%=(strlen(list[i].col["flocalfile"].ToString()) < 1 ? "目标根目录" : list[i].col["flocalfile"])%></td>
  <td width="100" align="center" valign="middle"><span title="<%=list[i].col["ffileselect"]%>"><%=list[i].col["ffineselectid"]%></span></td>
  <td align="center" valign="middle" class="style1" id="posstateid"><%
                                                        int toid = 0, st = 0;
          string ahtml="<a href='javascript:;' style='color:{color}'id='stbind' tid='{toid}' tname='{tname}' ty='{ty}' did='"+list[i].col["fid"]+"' >{title}</a>";
          if (int.TryParse(list[i].col["fthreadid"].ToString(), out toid))
              st = getFileThreadState(list[i].col["fthreadname"].ToString(), toid);
          ahtml = ahtml.Replace("{toid}",toid.ToString());
          ahtml = ahtml.Replace("{tname}",list[i].col["fthreadname"].ToString());
          if (st == 1)
          {
              ahtml = ahtml.Replace("{color}", "#ff0000");
              ahtml = ahtml.Replace("{title}", "■");
              ahtml = ahtml.Replace("{ty}", "stop");
          }
          else
          {
              ahtml = ahtml.Replace("{color}", "#00AA00");
              ahtml = ahtml.Replace("{title}", "▲");
              ahtml = ahtml.Replace("{ty}", "start");
          }
          Response.Write(ahtml);
  %><br /><span></span></td>
  <td width="97" align="center" valign="middle" id="stateid<%=list[i].col["fid"]%>">
  <%
      if (list[i].col["fstate"].ToString()=="1") Response.Write("进行中");
      else if (list[i].col["fstate"].ToString()== "2") Response.Write("成功");
      else if (list[i].col["fstate"].ToString()=="3") Response.Write("<span title=\""+Server.HtmlEncode(list[i].col["ferror"].ToString())+"\" style='cursor:pointer;'>失败∵</span>");
      else Response.Write("未设置");
  %></td>
  <td width="102" align="center" valign="middle"><a href="newfile.aspx?editid=<%=list[i].col["fid"]%><%=findstr%>">修改</a>|<a href="?delid=<%=list[i].col["fid"]%><%=findstr%>" id="delid">删除</a></td>
</tr>
<%
    } if (i < 1)
      {
           %>
<tr bgcolor="#FFFFFF" id="rowid">
  <td height="25" colspan="9" align="center" valign="middle">暂无数据</td>
  </tr>
  <% } %>
<tr>
  <td height="25" colspan="9" align="center" valign="middle" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td width="10%"><input type="button" name="delselect" id="delselect" value="删除选择" /><span id="msgid"></span></td>
      <td width="90%" align="center">分页 <%=page%>/<%=pagecount%> <a href="?page=1<%=findstr%>">首页</a> <a href="?page=<%=(page-1)%><%=findstr%>">上页</a> <a href="?page=<%=(page+1)%><%=findstr%>">下页</a> <a href="?page=<%=pagecount%><%=findstr%>">尾页</a></td>
    </tr>
  </table></td>
  </tr>
</table>

    </td>
  </tr>
</table>
</div>
<div class="admin_frameset" >
  <div class="open_frame" title="全屏" id="open_frame" flag="min"></div>
  <div class="close_frame" title="还原窗口" id="close_frame" flag="min"></div>
</div>
</body>
</html>
