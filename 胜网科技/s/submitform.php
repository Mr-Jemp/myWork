<?php
session_start();
include_once("tp/Application/Home/Org/Formdesign.class.php");
include_once('inc/conn.php');
include_once('power/public.php');

$formdesign = new \Formdesign;

$formid=intval(trim($_REQUEST["formid"]),10);
$id=intval(trim($_REQUEST["id"]),10);

if($id>0)
{
	$power=getReadPowerCombine($_SESSION['uroles'],$formid,4);
}else
{
	$power=getReadPowerCombine($_SESSION['uroles'],$formid,5);
}

$name=$_POST["name"];
$submit=$_REQUEST["submit"];

$sql="select * from ht_form where `id`='$formid' and is_del=0";
$query=mysql_query($sql);
$row=mysql_fetch_array($query);

$sql="select * from ht_form_data_$formid where `foreign_id`='$id' and is_del=0 ".$power["AND_SQL"];
$query=mysql_query($sql);
$data=mysql_fetch_array($query);

//提交保存
if(strlen($submit)>0)
{
	
	$time=time();
	foreach($_FILES as $key=>$value){
		
		if($_FILES[$key]["error"]==4)continue;
		if($_FILES[$key]["error"]>0){
			$power["IsSuccess"]=false;
			$power["Message"]=$_FILES[$key]["name"]." 上传失败，ERROR：".$_FILES[$key]["error"];
			break;
		}
		if(!is_dir('../upload/formfile'))mkdir('../upload/formfile');
		$uploaddir=date("Y-m-d",$time);
		if(!is_dir('../upload/formfile/'.$uploaddir))mkdir('../upload/formfile/'.$uploaddir);
		$uploadname=date("His",$time).(rand()%10);
		$uploadname.='.'.substr(strrchr($_FILES[$key]["name"],'.'),1);
		if(@move_uploaded_file($_FILES[$key]["tmp_name"],'../upload/formfile/'.$uploaddir.'/'.$uploadname)){
		}else{
			$power["IsSuccess"]=false;
			$power["Message"]=$_FILES[$key]["name"]." 上传失败：move is null";
			break;
		}
		@unlink('../upload/formfile/'.$_POST[$key]);
		$_POST[$key]=$uploaddir.'/'.$uploadname;
	}

	if($power["IsSuccess"]){
		$unparse_data = $formdesign->unparse_data($row,$_POST);
		if($id>0)
		{
			$sql="select `id` from ht_foreign_test where `id`='$id' and is_del=0";
			$query=mysql_query($sql);
			$test=mysql_fetch_array($query);
			if($test)
			{
				if($data)
				{
					$form_data = array(
						'uid'=>0,
						'updatetime'=>$time,
					);
					$form_data = array_merge($form_data,$unparse_data);
					$upedit="";
					foreach($form_data as $k=>$v){$upedit.=$k."='$v',";}
					$upedit=trim($upedit,',');
					$sql="update `ht_form_data_$formid` set $upedit where foreign_id='$id' and is_del=0";
					mysql_query($sql);
					$sql="update `ht_foreign_test` set `name`='$name',`updatetime`='$time' where id='$id' and is_del=0";
					if(mysql_query($sql)) {
						exit("<script>alert('修改成功');window.location.href='?formid=$formid&id=$id';</script>");
					}
				}else {$power["IsSuccess"]=false;$power["Message"]="找不到修改的数据，可能是没有权限，或数据不存在！";}
			}else {$power["IsSuccess"]=false;$power["Message"]="找不到foreign_test数据";}
	
		}else
		{
			//保存到test表
			$sql="INSERT INTO `ht_foreign_test` (`form_id`, `dateline`,`name`) VALUES ('$formid', '$time','$name');";
			$query=mysql_query($sql);
	
			$sql="select `id` from ht_foreign_test order by `id` desc limit 0,1";
			$query=mysql_query($sql);
			$test=mysql_fetch_array($query);
			$addid=$test["id"]."";
			//保存到data表
			$form_data['foreign_id'] = $addid;
			$form_data['dateline'] = time();
			$form_data = array_merge($form_data,$unparse_data);
			$title="";$value="";
			foreach($form_data as $k=>$v){$title.=$k.",";$value.="'".$v."',";}
			$title=trim($title,',');
			$value=trim($value,',');
			$sql="INSERT INTO `ht_form_data_$formid` ($title) VALUES ($value)";
			
			$query=mysql_query($sql);

			if($query){
				runtriggers($formid,$unparse_data);
				exit("<script>alert('添加成功');window.location.href='?formid=$formid&id=$id';</script>");
			}
			else {$power["IsSuccess"]=false;$power["Message"]="添加失败";}	
		}
	}
}else if($id>0)
{
	$sql="select * from ht_foreign_test where `id`='$id' and is_del=0";
	$query=mysql_query($sql);
	$noe=mysql_fetch_array($query);
	$name=$noe['name'];
}
	function runtrigger($steprow,$unparse_data,$upstepformid){
		$time=time();
		$dataary=array();
		$query=mysql_query("SHOW FULL COLUMNS FROM ht_form_data_$upstepformid WHERE Field LIKE 'data_%'");
		for($i=0;;$i++){
			$row=mysql_fetch_array($query);
			if(!$row)break;
			$fieldv[$i]="`".$row["Field"]."`";
			$fields[$i]=$row["Comment"];
			if(strlen($fields[$i])<1)$fields[$i]=$row["Field"];
		}
		$stepform_id=$steprow['form_id'];
		$stepquery=mysql_query("SHOW FULL COLUMNS FROM ht_form_data_$stepform_id WHERE Field LIKE 'data_%'");
		for($i=0;;$i++)
		{
			$therow=mysql_fetch_array($stepquery);
			if(!$therow){
				break;
			}
			$stepfieldv[$i]="`".$therow["Field"]."`";
			$stepfields[$i]=$therow["Comment"];
			if(strlen($stepfields[$i])<1)$stepfields[$i]=$therow["Field"];
		}
		$formop=$steprow['form_op'];
		$triggerstr=$steprow['trigger_string'];
		$trigger=json_decode($triggerstr);
		$opfields=$trigger->opfields;
		$conditions=$trigger->conditionfields;
		$wherestr="";
		$namestr="";
		$valuestr="";
		$nameandvaluestr="";
		$stepwherestr="";
		if(count($conditions)>0){
			for($i=count($conditions)-1;$i>=0;$i--){
				$rightvalue=getvalue($conditions[$i],$unparse_data,$upstepformid,"");
				$steplogic="";
				if($conditions[$i]->logic!=null&&$i!=0){
					$steplogic=$conditions[$i]->logic;
				}
				$whereop="=";
				switch($conditions[$i]->op)
				{
					case "等于":{
						$whereop="=";
						break;
					}
					case "大于":{
						$whereop=">";
						break;
					}
					case "小于":{
						$whereop="<";
						break;
					}
					case "不等于":{
						$whereop="!=";
						break;
					}
					case "大或等于":{
						$whereop=">=";
						break;
					}
					case "小或等于":{
						$whereop="<=";
						break;
					}
				}
				if($whereop=="="||$whereop=="!="){
					$stepwherestr=$stepwherestr." ".$conditions[$i]->name.$whereop."'".$rightvalue."' ".$steplogic." ";
				}
				else{
					$stepwherestr=$stepwherestr." ".$conditions[$i]->name.$whereop.$rightvalue." ".$steplogic." ";
				}
			}
		}
		$stepwherestr="where ".$stepwherestr;
		for($i=0;$i<count($opfields);$i++){
			$selected=$opfields[$i]->checked;
			$name=$opfields[$i]->name;
			for($k=0;$k<count($stepfields);$k++){
				if($stepfields[$k]==$name){
					$name=$stepfieldv[$k];
				}
			}
			$value=$opfields[$i]->value;
			$conditions=$opfields[$i]->conditions;
			$getvaluewherestr="";
			if(count($conditions)>0){
				$getvaluewherestr=	getconditionwhere($conditions,$unparse_data,$fields,$fieldv);
			}
			if($selected){
				if($value=="value"){
					$replyfield=$opfields[$i]->replyfield;
					$thefieldname=str_replace("`","",$replyfield);
					$value=$unparse_data[$thefieldname];
					$wherestr=$wherestr.$name."='".$value."' and ";
				}
				else if($value=="sum"){
					$replyfield=$opfields[$i]->replyfield;
					$sumsqlstr="select sum($replyfield)as computer from ht_form_data_$upstepformid ".$getvaluewherestr;
					$sumvalue=mysql_query($sumsqlstr);
					while($computerrow = mysql_fetch_array($sumvalue,MYSQL_ASSOC))
					{
						$value=$computerrow['computer'];
					}
				}
				else if($value=="max"){
					$replyfield=$opfields[$i]->replyfield;
					$maxsqlstr="select max($replyfield)as computer from ht_form_data_$upstepformid ".$getvaluewherestr;
					$maxvalue=mysql_query($maxsqlstr);
					while($computerrow = mysql_fetch_array($maxvalue,MYSQL_ASSOC))
					{
						$value=$computerrow['computer'];
					}
				}
				else if($value=="min"){
					$replyfield=$opfields[$i]->replyfield;
					$minsqlstr="select min($replyfield)as computer from ht_form_data_$upstepformid ".$getvaluewherestr;
					$minvalue=mysql_query($minsqlstr);
					while($computerrow = mysql_fetch_array($minvalue,MYSQL_ASSOC))
					{
						$value=$computerrow['computer'];
					}
				}
				else if($value=="avg"){
					$replyfield=$opfields[$i]->replyfield;
					$avgsqlstr="select min($replyfield)as computer from ht_form_data_$upstepformid ".$getvaluewherestr;
					$avgvalue=mysql_query($avgsqlstr);
					while($computerrow = mysql_fetch_array($avgvalue,MYSQL_ASSOC))
					{
						$value=$computerrow['computer'];
					}
				}
				else {
					$value = $opfields[$i]->value;
				}
				$valuestr=$valuestr."'$value',";
				$namestr=$namestr."$name,";
				$aliasname=str_replace("`","",$name);
				$nameandvaluestr=$nameandvaluestr.$name."='".$value."',";
				$dataary[$aliasname]=$value;
			}
		}
		$wherestr=substr($wherestr,0,strlen($wherestr)-5);
		$valuestr=substr($valuestr,0,strlen($valuestr)-1);
		$namestr=substr($namestr,0,strlen($namestr)-1);
		$nameandvaluestr="set ".substr($nameandvaluestr,0,strlen($nameandvaluestr)-1);
		if($formop=="add"){
			$delstr="delete from ht_form_data_$stepform_id where $wherestr";
			mysql_query($delstr);
			$addstr="insert into ht_form_data_$stepform_id($namestr)values($valuestr)";
			$rl= mysql_query($addstr);
		}
		else if($formop=="del"){
			$updatesql="delete from ht_form_data_$stepform_id $stepwherestr";
			mysql_query($updatesql);
		}
		else{
			$selectsql="select * from ht_form_data_$stepform_id $stepwherestr";
			$selectresult=mysql_query($selectsql);
			if($selectresult) {
				$updatesql = "update from ht_form_data_$stepform_id $nameandvaluestr  $stepwherestr";
				mysql_query($updatesql);
			}
			else{
				echo "没有符合修改的记录！!";
			}
		}
		return $dataary;
	}
	function runtriggers($formid,$unparse_data){
		$checkoaflow="select * from ht_oa where form_id='".$formid."'";
		$result=mysql_query($checkoaflow);
		while($row = mysql_fetch_array($result,MYSQL_ASSOC))
		{
			$id=$row['id'];
			$conditionstr=$row['condition_string'];
			$condition=json_decode($conditionstr);
			$conditionfields=$condition->fields;
			$triggerflag=true;
			if(count($conditionfields)>0) {
				$triggerflag=false;
				for ($i = 0; $i < count($conditionfields); $i++){
					$fieldname = $conditionfields[$i]->field;
					$op=$conditionfields[$i]->op;
					$value=$conditionfields[$i]->value;
                    $flag=  getruntriggerflag($fieldname,$op,$value,$unparse_data,$formid);
					$logic=$conditionfields[$i]->logicStr;
					if($logic=="or"){
						if($flag){
							$triggerflag=true;
							break;
						}
						else{
							$triggerflag=false;
						}
					}
					else{
						if(!$flag){
							$triggerflag=false;
							break;
						}
						else{
							$triggerflag=true;
						}
					}
				}
			}
			if($triggerflag) {
				$checkstepforflowid = "select * from ht_oa_step where oa_id=$id and step_index>0";
				$resultSteps = mysql_query($checkstepforflowid);
				$steps = array();
				while ($step = mysql_fetch_array($resultSteps)) {
					$steps[] = $step;
				}
				for ($i = 0; $i < count($steps); $i++) {
					$upstepformid = $formid;
					if ($i > 0) {
						$upstepformid = $steps[$i - 1]["form_id"];
					}
					$unparse_data = runtrigger($steps[$i], $unparse_data, $upstepformid);
				}
			}
			//var_dump($row);
		}
	}
	function getruntriggerflag($fieldname,$op,$value,$unparse_data,$formid){
		$thefieldname=str_replace("`","",$fieldname);
		switch($op) {
			case "等于": {
				if ($unparse_data[$thefieldname] == $value) {
					return true;
				} else {
					return false;
				}
				break;
			}
			case "不等于": {
				if ($unparse_data[$thefieldname] != $value) {
					return true;
				} else {
					return false;
				}
				break;
			}
			case "大于": {
				if ($unparse_data[$thefieldname] > $value) {
					return true;
				} else {
					return false;
				}
				break;
			}
			case "小于": {
				if ($unparse_data[$thefieldname] < $value) {
					return true;
				} else {
					return false;
				}
				break;
			}
		}
	}
	function getvalue($field,$unparse_data,$upstepformid,$getvaluewherestr){
		$value=$field->value;
		if($value=="value"){
			$replyfield=$field->replyfield;
			$thefieldname=str_replace("`","",$replyfield);
			$value=$unparse_data[$thefieldname];
		}
		else if($value=="sum"){
			$replyfield=$field->replyfield;
			$sumsqlstr="select sum($replyfield)as qiuhe from ht_form_data_$upstepformid ".$getvaluewherestr;
			$sumvalue=mysql_query($sumsqlstr);
			while($sumrow = mysql_fetch_array($sumvalue,MYSQL_ASSOC))
			{
				$value=$sumrow['qiuhe'];
			}
		}
		else if($value=="max"){
			$replyfield=$field->replyfield;
			$sumsqlstr="select max($replyfield)as qiuhe from ht_form_data_$upstepformid ".$getvaluewherestr;
			$sumvalue=mysql_query($sumsqlstr);
			while($sumrow = mysql_fetch_array($sumvalue,MYSQL_ASSOC))
			{
				$value=$sumrow['qiuhe'];
			}
		}
		else if($value=="min"){
			$replyfield=$field->replyfield;
			$sumsqlstr="select min($replyfield)as qiuhe from ht_form_data_$upstepformid ".$getvaluewherestr;
			$sumvalue=mysql_query($sumsqlstr);
			while($sumrow = mysql_fetch_array($sumvalue,MYSQL_ASSOC))
			{
				$value=$sumrow['qiuhe'];
			}
		}
		else if($value=="avg"){
			$replyfield=$field->replyfield;
			$sumsqlstr="select avg($replyfield)as qiuhe from ht_form_data_$upstepformid ".$getvaluewherestr;
			$sumvalue=mysql_query($sumsqlstr);
			while($sumrow = mysql_fetch_array($sumvalue,MYSQL_ASSOC))
			{
				$value=$sumrow['qiuhe'];
			}
		}
		else {
			$value =$field->value;
		}
		return $value;
	}
	function getconditionwhere($conditions,$unparse_data,$fields,$fieldv){
		 $wherestr="";
		 $endlogic="";
		 for($k=count($conditions)-1;$k>=0;$k--){
			  $value=$conditions[$k]->value;
			  $logic="";
			 if($conditions[$k]->logic!=null){
				 $logic=$conditions[$k]->logic;
			 }
			  $isfield=false;
			  for($j=0;$j<count($fieldv);$j++){
				  if($fieldv[$j]==$value){
					  $isfield=true;
					  $thefieldname=$fieldv[$j];
					  $thefieldname=str_replace("`","",$thefieldname);
					  $value=$unparse_data[$thefieldname];
					  break;
				  }
			  }
		  	  $wherestr=$wherestr." ".$conditions[$k]->name.$conditions[$k]->op."'".$value."' ".$logic." ";
	  }
	  $wherestr="where ".$wherestr;
	  return $wherestr;
	}
?><!DOCTYPE HTML>
<html>
<head>

	<title><?=$row["form_desc"]?></title>
	<meta name="keyword" content="ueditor formdesign plugins,ueditor扩展,web表单设计器,高级表单设计器,Leipi Form Design,web form设计器,web form designer">
	<meta name="description" content="javascript jquery ueditor php表单设计器实例演示与下载！">

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<link href="/admin/pageEdit/formdesign/css/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css" />
	<!--[if lte IE 6]>
	<link rel="stylesheet" type="text/css" href="/admin/pageEdit/formdesign/css/bootstrap/css/bootstrap-ie6.css">
	<![endif]-->
	<!--[if lte IE 7]>
	<link rel="stylesheet" type="text/css" href="/admin/pageEdit/formdesign/css/bootstrap/css/ie.css">
	<![endif]-->
	<link href="/admin/pageEdit/formdesign/css/site.css" rel="stylesheet" type="text/css" />

	<link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
	<script src="/resource/part/ligerlib/jquery/jquery-1.11.1.min.js" type="text/javascript"></script>
	<script src="/resource/part/ligerlib/ligerUI/js/ligerui.all.js" type="text/javascript"></script>
	<script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerTab.js"></script>
	<script src="/resource/part/ligerlib/json2.js"></script>
	<script src="/resource/part/ligerlib/jquery.cookie.js" type="text/javascript"></script>

	<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/ueditor/ueditor.config.js"></script>
	<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/ueditor/ueditor.all.js"> </script>
	<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/ueditor/lang/zh-cn/zh-cn.js"></script>

	<script type="text/javascript" charset="utf-8" src="/admin/pageEdit/formdesign/js/ueditor/formdesign/tolist.js"></script>

	<script src="/resource/js/jQuery/My97DatePicker/WdatePicker.js"></script>

	<style>
		p{margin: 5px 0;}
		.title{background:#efefef;padding-top: 5px;padding-bottom: 5px;font-size:15px;}
	</style>
</head>
<body>
<form action="?" enctype="multipart/form-data" method="post">
	<input type="hidden" value="<?=$formid?>" name="formid">
	<input type="hidden" value="<?=$id?>" name="id">
	<div class="container">
		<div id="design_content">
			<?php
			if($power["IsSuccess"]==false)
			{?>
				<table width="100%" height="90%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td align="center">&nbsp;<?=$power["Message"]?> 请点击<a href="javascript:;" id="back">返回</a></td>
					</tr>
				</table>

				<script type="text/javascript">
					$(function()
					{
						$("#back").bind("click",function()
						{
							window.history.back();
						});
					});
				</script>
			<?php
			}else
			{?>
				<p class="title">【<?=$row['form_name']?><?=strlen($name)>0?'->'.$name:''?>】 数据<?=$id>0?'修改':'添加'?> | <a href="javascript:;" class="back">查看列表</a></p>
				<p>标识:<input type="text" class="form-control" placeholder="必填项" name="name" value="<?=$name?>"></p>
				<?php
				$design_content = $formdesign->unparse_form($row,$data,array('action'=>'edit'));
				print $design_content;
				mysql_close($conn);
				?>
				<p class="title">&nbsp;<input name="submit" type="submit" value=" 提 交 "></p>

				<?php
			}
			?>
		</div>
	</div>

</form>
</body>
<script>
	$(function()
	{
		$(".back").bind("click",function()
		{
			var url='/s/listform.php?formid=<?=$formid?>';
			window.location.href=url;
		});
	});
	if('<?=$msg?>'.length>0)alert('<?=$msg?>');
</script>
</html>