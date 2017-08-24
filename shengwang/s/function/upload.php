<?php
$out["IsSuccess"]=false;
$out["Message"]="未知错误";
$file="upfile";
$urldir=$_REQUEST['dir'];

for(;;)
{
	if($_FILES[$file]["error"]> 0)
	{
		$out["Message"]="上传失败,ERROR:".$_FILES[$file]["error"];
		break;
	}
	$suffix="";
	if($_FILES[$file]["type"]=="image/gif")$suffix=".gif";
	if($_FILES[$file]["type"]=="image/jpeg")$suffix=".jpg";
	if($_FILES[$file]["type"]=="image/pjpeg")$suffix=".jpg";
	if($_FILES[$file]["type"]=="image/bmp")$suffix=".bmp";
	
	if(strlen($suffix)<1)
	{
		$out["Message"]="请上传jpg、gif或bmp文件 不支持".$_FILES[$file]["type"];
		break;
	}

	$pah=$_SERVER['DOCUMENT_ROOT']."/";
	$dir="upload";
	if (!file_exists($pah.$dir))mkdir($pah.$dir);
	if(strlen($urldir)>0)
	{
		$urldir=urldecode($urldir);
		$urldir=trim($urldir);
		$tmps=split("/",$urldir);
		$l=count($tmps);
		for($i=0;$i<$l;$i++)
		{
			$dir.="/".$tmps[$i];
			if(!file_exists($pah.$dir))mkdir($pah.$dir);
		}
	}else
	{
		$dir.="/".date("Y-m-d");
		if(!file_exists($pah.$dir))mkdir($pah.$dir);
	}
	$fname=date("His");
	
	$fname=date("His").$suffix;

	$re=@move_uploaded_file($_FILES[$file]["tmp_name"],$pah.$dir."/".$fname);
	if($re)
	{
		$out["Message"]="文件上传成功";
		$out["IsSuccess"]=true;
		$out["Addess"]=$dir."/".$fname;
	}else $out["Message"]="文件上传失败";
	break;
}
echo json_encode($out);
?>