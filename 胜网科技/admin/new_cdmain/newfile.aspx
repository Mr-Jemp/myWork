<%@ Page Language="C#" AutoEventWireup="true"  CodeBehind="newfile.aspx.cs" Inherits="_newfile" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<title>数据同步后台</title>    
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link href="css/newfile.css" rel="stylesheet" type="text/css" />
<script src="js/jquery-1.9.1.js"></script>
<script src="js/newfile.js"></script>
</head>
<body>
<input type="hidden" name="editid" id="editid" value="" />
<div id="itemloadid">加载中...</div>
<div id="itembodyid">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="25" bgcolor="#218AB5" class="path">&nbsp;数据同步-&gt;文件定时同步</td>
  </tr>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td bgcolor="#CCCCCC">
    
<table width="100%" border="0" cellpadding="3" cellspacing="1">
<tr>
  <td width="23%" align="center" valign="middle" bgcolor="#FFFFFF" class="style1">同步说明：</td>
  <td width="77%" valign="middle" bgcolor="#FFFFFF" class="style1">若本地源目录没有该文件，目标的文件也会删除</td>
</tr>
<tr>
  <td width="23%" height="25" align="center" valign="middle" bgcolor="#FFFFFF">目标选择：</td>
  <td width="77%" height="25" valign="middle" bgcolor="#FFFFFF" id="targetid"><input name="target" type="radio" id="target1" value="本地" />
    <label for="target1">本地</label>
    <input type="radio" name="target" id="target2" value="远程"/>
    <label for="target2">远程</label>
</td>
</tr>
<tr id="ftpid" style="display:none;">
  <td width="23%" height="25" align="center" valign="middle" bgcolor="#FFFFFF">FTP选项：</td>
  <td width="77%" height="25" valign="middle" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td width="14%" height="20" align="right">FTP地址：</td>
      <td width="86%" height="20"><input type="text" name="ftpip" id="ftpip" value=""/></td>
      </tr>
    <tr>
      <td height="20" align="right">账号：</td>
      <td height="20"><input type="text" name="ftpname" id="ftpname" value="" /></td>
      </tr>
    <tr>
      <td height="20" align="right">密码：</td>
      <td height="20"><input type="password" name="ftppwd" id="ftppwd"  value=""/></td>
      </tr>
    <tr>
      <td height="20" align="right">注意：</td>
      <td height="20">远程的暂不支持中文目录</td>
      </tr>
    </table></td>
</tr>
<tr>
  <td width="23%" height="25" align="center" valign="middle" bgcolor="#FFFFFF">目标文件夹：</td>
  <td width="77%" height="25" valign="middle" bgcolor="#FFFFFF">
  <input type="text" name="localfile" id="localfile"  value=""/> 注意，请输入本站下的根目录或FTP上的目录，留空表示在根目录，多级目录请用/分开</td>
</tr>
<tr>
  <td height="25" align="center" valign="middle" bgcolor="#FFFFFF">操作模式：</td>
  <td height="25" valign="middle" bgcolor="#FFFFFF" id="cmdtypeid"><input type="radio" name="cmdtype" id="cmdtype1" value="立即"/>
    <label for="cmdtype1">立即</label>
    <input type="radio" name="cmdtype" id="cmdtype2" value="定时" />
    <label for="cmdtype2">定时</label>
     </td>
</tr>
<tr id="timeid" style="display:none;">
  <td height="25" align="center" valign="middle" bgcolor="#FFFFFF">定时选项：</td>
  <td height="25" valign="middle" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td width="14%" height="20" align="right">时间：</td>
      <td width="86%" height="20"><select name="timetype" id="timetype">
          <option value="三分钟">三分钟</option>
          <option value="一天">一天</option>
          <option value="每周">每周</option>
          <option value="每月">每月</option>
        </select>
        以上次执行时间做为基数</td>
    </tr>
    <tr>
      <td height="20" align="right">形式：</td>
      <td height="20"><input type="radio" name="loop" id="loop1" value="重复"/>
        <label for="loop1">重复</label>
        
        <input type="radio" name="loop" id="loop2" value="一次" />
<label for="loop2">一次</label>
</td>
    </tr>
  </table></td>
</tr>
<tr>
  <td height="25" align="center" valign="middle" bgcolor="#FFFFFF">本地源目录：</td>
  <td height="25" valign="middle" bgcolor="#FFFFFF">
    <input type="hidden" name="srcpath" id="srcpath" value="" />
	<span id="sel_srcpath"></span>
</td>
</tr>
<tr>
  <td height="25" align="center" valign="middle" bgcolor="#FFFFFF">请选择目录：</td>
  <td height="25" valign="middle" bgcolor="#FFFFFF" style="line-height:25px">
    <span id="srcpathlist"></span></td>
</tr>
<tr>
  <td width="23%" height="25" align="center" valign="middle" bgcolor="#FFFFFF">文件选择：</td>
  <td width="77%" height="25" valign="middle" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
        <td width="7%" height="20" align="right">条件：</td>
        <td width="93%" height="20" id="fineselectid"><input type="radio" name="fineselectid" id="fineselectid1" value="全部" />
          <label for="fineselectid1">全部文件(包括新增和删除的)</label>
          
          <input type="radio" name="fineselectid" id="fineselectid2" value="手选"/>
<label for="fineselectid2">手动选择</label>
<span id="updatemsg"></span>
</td>
      </tr>
      <tr id="fileid" style="display:none;">
        <td height="20" align="right">&nbsp;</td>
        <td height="20"><input type="button" value="刷新" id="newsrcpath"/>(按下Ctrl键可多选)<br /> <select name="fileselect" size="15" multiple="multiple" id="fileselect">
        
        </select></td>
      </tr>
  </table></td>
</tr>
<tr>
  <td width="23%" height="25" align="center" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
  <td width="77%" height="25" valign="middle" bgcolor="#FFFFFF"><input type="button" name="Submit" id="Submit" value="添加同步" /> <span id="submitmsg"></span></td>
</tr>
</table>

    </td>
  </tr>
</table>
</div>
</body>
</html>
