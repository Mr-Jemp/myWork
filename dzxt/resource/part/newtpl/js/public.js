$(document).ready(function()
{	
	//全屏窗口
	setframe();
	$("#open_frame").hover(function(){$(this).addClass("open_frame_hover")},function(){$(this).removeClass("open_frame_hover")});
	$("#open_frame").click(function(){closeFrameset($(this).attr("flag"));});
	$("#close_frame").hover(function(){$(this).addClass("close_frame_hover")},function(){$(this).removeClass("close_frame_hover")});
	$("#close_frame").click(function(){openFrameset($(this).attr("flag"));});	
});
function setframe()
{
	var Frame=parent.document.getElementsByTagName("frameset")[1];
	if (Frame.cols=="0,*")
	{
		$("#open_frame").hide();
		$("#close_frame").show();
	}
	else
	{
		$("#open_frame").show();
		$("#close_frame").hide();
	}
}
function closeFrameset(flag)
{	
	if(flag=="min"){
		parent.document.getElementsByTagName("frameset")[0].rows = "0,*";
		parent.document.getElementsByTagName("frameset")[1].cols = "0,*";
	}else{
		parent.document.getElementsByTagName("frameset")[0].rows = "0,*";
		parent.document.getElementsByTagName("frameset")[1].cols = "1,*";
	}
$("#open_frame").hide();
$("#close_frame").show();
}
function openFrameset(flag){	
if(flag=="min"){
	parent.document.getElementsByTagName("frameset")[0].rows = "70,*";
	parent.document.getElementsByTagName("frameset")[1].cols = "200,*";
}else{
	parent.document.getElementsByTagName("frameset")[0].rows = "70,*";
	parent.document.getElementsByTagName("frameset")[1].cols = "1,*";
}
$("#open_frame").show();
$("#close_frame").hide();
}