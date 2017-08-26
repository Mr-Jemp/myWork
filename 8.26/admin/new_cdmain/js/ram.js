$(function()
{
	$("#asdadfe a").click(function(){loaddata()});
});
$(window).load(function()
{
	loaddata();
});

function loaddata()
{
	$("#idstate").html("加载中...");
	var html="<tr class=\"rowid\"><td height=\"25\" bgcolor=\"#FFFFFF\"><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td>{name}</td></tr></table></td></tr>";
	$(".rowid").remove();

	$.ajax({data:{ get:"is"}, url: "ram.aspx", type: "POST", dataType: "json"
	, success: function(data) 
	{
		$("#idstate").html("");
		if(data.info==null){alert("信息为空");return;}
		
		data.info=data.info.replace(/\r\n/g,'\n');
		
		if(data.info.indexOf('\n')<0){alert("没有信息");return;}
		
		var da=data.info.split('\n');
		if(da==null){alert("找不到信息");return;}
		
		var i=0,outhtml="";
		for(i=0;i<da.length;i++)
		{
			if(da[i]=="0")continue;
			da[i]=da[i].replace(/ /g,"&nbsp;");
			var temp=html.replace(/{name}/g,da[i]);
			outhtml+=temp;
		}
		$("#asdadfe tr:eq(0)").after(outhtml);
		return;
	},
	error: function(xhr, stat, e) { alert("网络出错请重试！" + e); $("#idstate").html("网络出错请重试！" + e);}
	});
		
	return false;
}