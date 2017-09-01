<?php
if($controller['action']=='view'){
	
	$out=array();$outinx=0;
	$ext=substr(strrchr($value['value'],'.'),1);
	$file=$value['value'];
	
	$out[0]="<a href=\"/upload/formfile/$file\" target=\"_blank\">";
	$out[0].="点击下载";
	$out[0].="</a>";
	if(strlen($file)<1)$out[0]="";
	
	$out[1]="<a href=\"/upload/formfile/$file\" target=\"_blank\">";
	$out[1].="<img src=\"/upload/formfile/$file\" width=\"30\" height=\"30\" border=\"0\">";
	$out[1].="</a>";
	if(strlen($file)<1)$out[1]="";
	
	include_once $_SERVER['DOCUMENT_ROOT']."/s/inc/control.ini.php";
		
	if(in_array(strtolower($ext),$extendeds)){
		$outinx=1;
	}
	$temp_html=$out[$outinx];
}else{
	preg_match_all('/(name=".*?")/',$value['content'],$arr);
	$temp_html_attribute=$arr[0][0];
	if($temp_html_attribute=='name="'.$value['name'].'"'){
		$temp_html_attribute.=' type="hidden"';
		$temp_html = preg_replace('/(<input)/','$1 '.$temp_html_attribute.' value="'.$value['value'].'">$1',$value['content']);
	}
}
?>
