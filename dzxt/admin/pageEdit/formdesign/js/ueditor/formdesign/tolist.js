function tbAddRow(dname)
{
	var sTbid = dname+"_table";
	$("#"+sTbid+" .template")  
		//连同事件一起复制    
		.clone(true)    
		//去除模板标记    
		.removeClass("template")  
		//修改内部元素 
		.find(".delrow").show().end()
		.find("input").val("").end()
		.find("textarea").val("").end()
		//插入表格    
	   .appendTo($("#"+sTbid));
}
//统计
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

/*删除tr*/
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
