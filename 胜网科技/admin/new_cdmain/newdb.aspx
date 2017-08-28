<%@ Page Language="C#" AutoEventWireup="true"  CodeBehind="newdb.aspx.cs" Inherits="_newdb" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<title>数据同步后台</title>    
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link href="css/newdb.css" rel="stylesheet" type="text/css" />
<script src="js/jquery-1.9.1.js"></script>
<script src="js/newdb.js"></script>
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
    <td height="30" colspan="2" align="center" valign="middle" bgcolor="#FFFFFF">数据同步</td>
  </tr>
<tr>
  <td width="23%" height="25" align="center" valign="middle" bgcolor="#FFFFFF">目标数据库：</td>
  <td width="77%" height="25" valign="middle" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td width="14%" height="20" align="right">服务器地址：</td>
      <td width="86%" height="20"><input type="text" name="targetip" id="targetip" value=""/></td>
      </tr>
    <tr>
      <td height="20" align="right">账号：</td>
      <td height="20"><input type="text" name="targetname" id="targetname"  value=""/></td>
      </tr>
    <tr>
      <td height="20" align="right">密码：</td>
      <td height="20"><input type="password" name="targetpwd" id="targetpwd"/></td>
    </tr>
    <tr>
      <td height="20" align="right">库名：</td>
      <td height="20"><input type="text" name="targettable" id="targettable" value=""/> 如果不存在，请手动创建</td>
    </tr>
    </table></td>
</tr>
<tr>
  <td height="25" align="center" valign="middle" bgcolor="#FFFFFF">操作模式：</td>
  <td height="25" valign="middle" bgcolor="#FFFFFF" id="cmdtypeid"><input type="radio" name="cmdtype" id="cmdtype1" value="立即"/>
    <label for="cmdtype1">立即</label>
    <input type="radio" name="cmdtype" id="cmdtype2" value="定时"/>
    <label for="cmdtype2">定时</label>
     </td>
</tr>
<tr id="timeid" style="display:none;">
  <td height="25" align="center" valign="middle" bgcolor="#FFFFFF">定时选项：</td>
  <td height="25" valign="middle" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td width="14%" height="20" align="right">时间：</td>
      <td width="86%" height="20"><select id="timetype" name="timetype" >
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
        
        <input type="radio" name="loop" id="loop2" value="一次"/>
<label for="loop2">一次 </label>
</td>
    </tr>
  </table></td>
</tr>
<tr>
  <td height="25" align="center" valign="middle" bgcolor="#FFFFFF">当前数据库：</td>
  <td height="25" valign="middle" bgcolor="#FFFFFF"><span id="databasenameid"></span><input type="hidden" name="databasename" id="databasename" value="" /></td>
</tr>
<tr>
  <td width="23%" height="25" align="center" valign="middle" bgcolor="#FFFFFF">表的选择：</td>
  <td width="77%" height="25" valign="middle" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
        <td width="7%" height="20" align="right">条件：</td>
        <td width="93%" height="20" id="fineselectid"><input type="radio" name="srctableseltype" id="srctableseltype1" value="全部"/>
          <label for="srctableseltype1">全部表(包括新增和删除的)</label>
          
          <input type="radio" name="srctableseltype" id="srctableseltype2" value="手选"/>
<label for="srctableseltype2">手动选择</label>
</td>
      </tr>
      <tr id="fileid" style="display:none;">
        <td height="20" align="right">&nbsp;</td>
        <td height="20"><select name="srctablesel" id="srctablesel" size="15" multiple="multiple" >
        </select></td>
      </tr>
  </table></td>
</tr>
<tr>
  <td width="23%" height="25" align="center" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
  <td width="77%" height="25" valign="middle" bgcolor="#FFFFFF"><input type="submit" name="button" id="Submit" value="添加同步" /><span id="submitmsg"></span></td>
</tr>
</table>

    </td>
  </tr>
</table>
</div>
</body>
</html>
