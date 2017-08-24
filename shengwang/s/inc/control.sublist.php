<?php
	$temp_html='<table width="100%" align="center" cellpadding="5" style="border:1px solid #eeeeee;border-collapse:separate;border-spacing: 2px;font-size:13px;">';
	$temp_html.='<tr style="background:#efefef;height:30px;">';
	$titles=explode(";",$value['orgfield']);
	$l=count($titles);
	for($i=0;$i<$l;$i++)
	{
		$arr=explode(",",$titles[$i]);
		$temp_html.='<th style="text-align:center;">'
		.$arr[1]
		."</th>";
	}
	$temp_html.='<th style="text-align: center;">操作</th>';
	$temp_html.="</tr>";
	
	//列出数据------------------------------------------
	session_start();
	include_once $_SERVER['DOCUMENT_ROOT']."/s/inc/conn.php";
	$req_formid=intval(trim($_REQUEST["formid"]),10);
	
	$form_id=$value['orgformid'];
	$page=intval(trim($_REQUEST["page$form_id"]),10);
	$pageSize=20;
	
	$where="";
	
	$sql="select * from  ht_form_data_$form_id $where";
	
	$query=mysql_query($sql);
	$dataCount=mysql_num_rows($query);
	$pageCount=ceil($dataCount/$pageSize);
	if($page>$pageCount)$page=$pageCount;
	if($page<1)$page=1;
	$sffset=($page-1)*$pageSize;
	
	$sql="select * from ht_form_data_$form_id $where";
	$sql.=" order by id desc";
	$sql.=" limit $sffset,$pageSize";
	$query=mysql_query($sql);
	
	$sum=0;
	while($rs=mysql_fetch_array($query))
	{
		$sum++;
		$temp_html.='<tr style="height:25px;">';
		for($i=0;$i<$l;$i++)
		{
			$arr=explode(",",$titles[$i]);
			$temp_html.='<td style="text-align:center;border-top: 1px solid #eeeeee;">'
			.$rs[str_replace("`", "",$arr[0])]
			."</td>";
		}
		$temp_html.='<td style="text-align: center;border-top: 1px solid #eeeeee;width:120px;">';
		$temp_html.="<a href=\"javascript:"
		."parent.f_addTab('$req_formid'+'_'+'$form_id','".$value['orgformname']."',encodeURI('/s/listform.php?formid=$form_id'));"
		."\">数据设置</a>";
		$temp_html.='</td>';
		$temp_html.="</tr>";
	}
	
	if($sum<1)
	{
		$temp_html.='<tr style="height:25px;text-align:center;"><td style="border-top: 1px solid #eeeeee;" colspan="'.($l+1).'">';
		$temp_html.='暂无数据'.$rs['form_name'];
		$temp_html.="</td></tr>";
	}
	
	$temp_html.='<tr style="height:25px;text-align:right;"><td style="border-top: 1px solid #eeeeee;" colspan="'.($l+1).'">';
	$temp_html.="页次 $page/$pageCount "
	."<a href=\"?formid=$req_formid&page$form_id=1\">首页</a> | "
	."<a href=\"?formid=$req_formid&page$form_id=".($page+1)."\">下一页</a> | "
	."<a href=\"?formid=$req_formid&page$form_id=".($page-1)."\">上一页</a> | "
	."<a href=\"?formid=$req_formid&page$form_id=$pageCount\">尾页</a>&nbsp;";
	$temp_html.="</td></tr>";
	
	$temp_html.='</table>';

?>