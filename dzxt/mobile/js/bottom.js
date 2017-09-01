var load_width=0,load_top=0;
$(function()
{
	$(window).resize(function(){seting();});
	$(window).load(function(){seting();});
});
function seting()
{
	$(".autobot").css({"position":"absolute"});
	
	var height=$(".autobot").height();
	var bodyheight=$(document.body).height();
	var top=$(".autobot").offset().top;

	$(".autobot").css({"position":"relative"});
	if(top>=bodyheight-height)return;
	
	$(".autobot").css({"margin-top":(bodyheight-height-top)});
}
