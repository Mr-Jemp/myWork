function tbAddRow(dname)
{
	var sTbid = dname+"_table";
	$("#"+sTbid+" .template")  
		//��ͬ�¼�һ����    
		.clone(true)    
		//ȥ��ģ����    
		.removeClass("template")  
		//�޸��ڲ�Ԫ�� 
		.find(".delrow").show().end()
		.find("input").val("").end()
		.find("textarea").val("").end()
		//������    
	   .appendTo($("#"+sTbid));
}
//ͳ��
function sum_total(dname,e){
	
	var tsum = 0;
	$('input[name="'+dname+'[]"]').each(function(){
		var t = parseFloat($(this).val());
		if(!t) t=0;
		if(t) tsum +=t;
		$(this).val(t);
	}); 
	$('input[name="'+dname+'[total]"]').val(tsum);

}

/*ɾ��tr*/
function fnDeleteRow(dname,obj)
{
	var sTbid = dname+"_table";
	var oTable = document.getElementById(sTbid);
	while(obj.tagName !="TR")
	{
		obj = obj.parentNode;
	}
	oTable.deleteRow(obj.rowIndex);
}
