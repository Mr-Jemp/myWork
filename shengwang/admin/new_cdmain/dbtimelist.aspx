<%@ Page Language="C#" AutoEventWireup="true"  CodeBehind="dbtimelist.aspx.cs" Inherits="_dbtimelist" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<title>数据同步后台</title>    
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link href="css/timelist.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/resource/js/jQuery/jquery-1.7.2.min.js"></script>
<script src="js/dbtimelist.js"></script>
<link href="/resource/part/newtpl/css/public.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/resource/part/newtpl/js/public.js"></script>
<link href="/resource/part/newtpl/css/rheight.css" rel="stylesheet" type="text/css" />
<style type="text/css">
	.style1
	{
		width: 96px;
	}
	.style2
	{
		width: 252px;
	}
</style>
</head>
<body style="background-color:#E0F0FE">
<div class="admin_main_nr_dbox">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="25" bgcolor="#218AB5" class="path">&nbsp;数据同步-&gt;数据库定时同步</td>
  </tr>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td bgcolor="#CCCCCC">
    
<table width="100%" border="0" cellpadding="3" cellspacing="1" id="kadlskdweo">
  <tr>
    <td height="30" colspan="8" align="center" valign="middle" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <form action="newdb.aspx" method="get"><td width="29%" align="left"><input type="submit" name="button" id="button" value="添加同步操作" /></td></form>
          <form action="dbtimelist.aspx" method="get">
          <td width="71%" align="right">
            请输入关键字
            <input type="text" name="key" id="key" />
            搜索分类
            <select name="target" id="target">
              <option value="数据库">数据库</option>
              <option value="操作模式">操作模式</option>
              <option value="表的选择">表的选择</option>
              <option value="状态">状态</option>
            </select>
            <input type="submit" name="find" id="find" value="搜索" /></td>
            </form>
        </tr>
      </table></td>
  </tr>
  <tr bgcolor="#29AAE7" class="path">
    <td height="25" align="center" valign="middle">选<input type="checkbox" name="selectcmd" id="selectcmd" /></td>
    <td height="25" align="center" valign="middle">目标数据库</td>
    <td align="center" valign="middle">操作模式</td>
    <td align="center" valign="middle">源数据库</td>
    <td align="center" valign="middle" class="style2">表的选择</td>
    <td align="center" valign="middle" class="style1">定时</td>
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
<tr  bgcolor="#FFFFFF" id="rowid">
  <td width="6%" height="25" align="center" valign="middle">　<input type="checkbox" name="selectid" id="selectid" value="<%=list[i].col["did"]%>"/></td>
  <td width="13%" height="25" align="left" valign="middle">IP：<%=list[i].col["dtargetip"]%><br />
    账号：<%=list[i].col["dtargetname"]%><br />
库名：<%=list[i].col["dtargettable"]%><br /></td>
  <td width="14%" align="center" valign="middle"><%
      Response.Write(list[i].col["dcmdtype"]);
      if (list[i].col["dcmdtype"].Equals("定时"))
      {
          Response.Write("<br>" + list[i].col["dtimetype"]);
          Response.Write("<br>" + list[i].col["dloop"]);
      }%></td>
  <td width="16%" align="center" valign="middle"><%=list[i].col["dsrctable"]%></td>
  <td align="center" valign="middle" class="style2"><%
                                                     if (list[i].col["dsrctableseltype"].Equals("手选"))
                                                     {
                                                         string str = list[i].col["dsrctablesel"].ToString();
                                                         Response.Write("<span title=" + str + ">");
                                                         string[] temp = str.Split(':');
                                                         int ii = 0, l = temp.Length;
                                                         for (ii = 0; ii < l; ii++)
                                                         {
   %><%=temp[ii]%></br><%
                                                        }
                                                        Response.Write("</span>");
                                                     }
                                                     else Response.Write(list[i].col["dsrctableseltype"]); %></td>
  <td align="center" valign="middle" class="style1" id="posstateid"><%
                                                        int toid = 0, st = 0;
          string ahtml="<a href='javascript:;' style='color:{color}'id='stbind' tid='{toid}' tname='{tname}' ty='{ty}' did='"+list[i].col["did"]+"' >{title}</a>";
          if (int.TryParse(list[i].col["dthreadid"].ToString(), out toid))
              st = getDbThreadState(list[i].col["dthreadname"].ToString(), toid);
          ahtml = ahtml.Replace("{toid}",toid.ToString());
          ahtml = ahtml.Replace("{tname}",list[i].col["dthreadname"].ToString());
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
  <td width="11%" align="center" valign="middle" id="stateid<%=list[i].col["did"]%>"><%
      if (list[i].col["dstate"].ToString()=="1") Response.Write("进行中");
      else if (list[i].col["dstate"].ToString() == "2") Response.Write("成功");
      else if (list[i].col["dstate"].ToString() == "3") Response.Write("<span title='" + Server.HtmlEncode(list[i].col["derror"].ToString()) + "' style='cursor:pointer;'>失败∵</span>");
      else Response.Write("未设置");
  %></td>
  <td width="9%" align="center" valign="middle"><a href="newdb.aspx?editid=<%=list[i].col["did"]%><%=findstr%>">修改</a>|<a href="?delid=<%=list[i].col["did"]%><%=findstr%>" id="delid">删除</a></td>
</tr>
<%
    } if (i < 1)
      {
           %>
<tr  bgcolor="#FFFFFF" id="rowid">
  <td height="25" colspan="8" align="center" valign="middle">暂无数据</td>
  </tr>
   <% } %>
<tr>
  <td height="25" colspan="8" align="center" valign="middle" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td  width="29%" align="left"><input type="submit" name="button" id="button" value="删除选择" /></td>
      <td width="88%" align="center">分页 <%=page%>/<%=pagecount%> <a href="?page=1<%=findstr%>">首页</a> <a href="?page=<%=(page-1)%><%=findstr%>">上页</a> <a href="?page=<%=(page+1)%><%=findstr%>">下页</a> <a href="?page=<%=pagecount%><%=findstr%>">尾页</a></td>
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
