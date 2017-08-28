<?php
$temp_html_head='';
if(empty($_GET['dynamictreerowget'])){
	
	include_once $_SERVER['DOCUMENT_ROOT']."/s/inc/conn.php";
	include_once $_SERVER['DOCUMENT_ROOT']."/s/function/public.php";
	$dynamictreerow=getfreepower("",0,implode(',',$_SESSION['uroles']),'',$_SESSION['uid']);
	$_GET['dynamictreerowget']=$dynamictreerow[1];
	$temp_html_head='<script>'
	.'var dynamictreedata=eval(decodeURIComponent('."'".urlencode("[".$_GET['dynamictreerowget']."]")."'));"
	.'function createTreepageLink(id){'
		.'$("."+id+"id").ligerTree({checkbox: false,'
			.'render: function (item)'
			.'{'
				.'return item.values[0].value;'
			.'},'
			.'isLeaf:function(item){'
				.'return item.isLeaf;'
			.'},'
			.'data:dynamictreedata,'
			.'onselect:function(node){'
				.'if(node.data.isLeaf){'
					.'if(node.data.form_type==1){'
						.'$("#"+id+"src").attr("src",encodeURI(\'/s/listform.php?formid=\' + node.data.id));'
					.'}else if(node.data.type==2){'
						.'$("#"+id+"src").attr("src",encodeURI(node.data.content));'
					.'}else if(node.data.form_type==2){'
						.'$("#"+id+"src").attr("src",encodeURI(\'/s/submitformitem.php?res=main&formid=\' + node.data.id));'
					.'}else{'
						.'$("#"+id+"src").attr("src",encodeURI(\'/s/readtemplate.php?formid=\' + node.data.id));'
					.'}'
				.'}else{'
					.'$("#"+id+"src").attr("src",encodeURI(\'/upload/document/filebox38668671.php?op=home&root=\'+node.data.id+\'&folder=\'+node.data.id));'
				.'}'
			.'}'
		.'});'
	.'};'
	.'</script>';
}
$height=$value['orgminheight'].'px';
$temp_html=$temp_html_head;
$temp_html.='<div style="width:auto;height:'.$height.';overflow:hidden;">
<ul style="float:left;width:auto;height:'.$height.';overflow:auto;" class="dynamictree'.$key.'id"></ul>
<div style="float:left;width:74%;height:100%;overflow:hidden;">
<iframe src="" style="width:100%;height:100%;border:0" id="dynamictree'.$key.'src"></iframe>
</div>
</div>
<script>$(function(){createTreepageLink("dynamictree'.$key.'");});</script>';
?>

