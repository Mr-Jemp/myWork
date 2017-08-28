<?php
function getfreepower($out,$node,$roles,$type,$creater_uid)
{
	$sql="select distinct a.*,b.role_id as power_role_id from ht_form a left join ht_power b on (a.id=b.form_id and b.role_id in($roles) and b.function_type='0') where a.pid='$node'";
	
		
	if(strlen($creater_uid)>0)
	{
		$sql.=" and (a.type=1 or (a.type=0 or a.type=2 or a.type=3) and (b.role_id > 0 or `creater_uid`='$creater_uid'))";	
	}else 
	{
		 
		if(strlen($type)<1)
		{
			$sql.=" and (a.type=1 or ((a.type=0 or a.type=2 or a.type=3) and b.role_id > 0))";
			
		}else 
		{
			if($type==0)$sql.=" and (a.type=0 and b.role_id > 0)";
			if($type==1)$sql.=" and a.type=1";
			if($type==2)$sql.=" and (a.type=2 and b.role_id > 0)";
		}
	}
	$sql.=" order by `sort` desc";
	
	$query=mysql_query($sql);
	$isadd=false;
	$add_count = 0;
	
	$id_array=array();
	$lastid=-1;
	while($row=mysql_fetch_array($query))
	{
		$can_add=0; 

		$id=$row["id"];
		/*
		if (!in_array($id,$id_array)) {
			array_push($id_array, $id);
		}
		else {
			continue;
		}*/
		
		if ($lastid==$id){
			continue;
		}
		$lastid=$id;
		
		
		$form_name=$row["form_name"];
		$show_node=$node;
		$out1 = $out;
		if($isadd){
			$out1.=",";
		}
		$form_type=0;
		if($row["is_data_form"]==1)$form_type=1;
		if($row["is_data_form"]==2)$form_type=2;
		$out1.='{';
		$out1.='"id":"'.$id.'",';
		$out1.='"values":[{"value":"'.$form_name.'"}],';
		$out1.='"isLeaf":'.($row["type"]==1?"false":"true").',';
		$out1.='"form_type":'.$form_type.',';
		$out1.='"parentId":"'.$show_node.'",';			
		$out1.='"type":"'.$row["type"].'",';	
		if($row["type"]==2)$out1.='"content":"'.$row["content"].'",';	
		$out1.='"children":[';
		if ($row["type"]==1) 
		{
			$result=getfreepower($out1,$row["id"],$roles,$type,$creater_uid);
			if ($result[0]>0)
			{
				$out1=$result[1];
				$can_add=1;
			}
			
			else if ($row["power_role_id"]>0){
				$can_add=1;
			}
					
		}
		else 
		{
			$can_add=1;
		}

		$out1.=']';
		$out1.='}';
		
		if ($can_add==1)
		{
			$out = $out1;
			$isadd=true;
			$add_count++;
		}
																			
		
	}
	return array($add_count, $out);
}
function deldirfile($dir){
    $dh=opendir($dir);
    while ($file=readdir($dh)) {
        if($file!="." && $file!="..") {
            $fullpath=$dir."/".$file;
            if(!is_dir($fullpath)) {
                unlink($fullpath);
            } else {
                deldirfile($fullpath);
            }
        }
    }
}
?>