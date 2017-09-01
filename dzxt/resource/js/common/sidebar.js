// JavaScript Document
var dis=true;
$(function(){
	var cwidth=$("body").width();		
	$("#icolist dl").hover(function () {
		$(this).addClass("hover");		
	  },
	  function () {
		$(this).removeClass("hover");
	  }
	);	
	$(".lt").mouseover(function(){
		if(dis){$(this).addClass("ltover");}
		else{$(this).addClass("ltover2");}
	});
	$(".lt").mouseout(function(){
		$(this).removeClass("ltover ltover2");			
	});
	$(".lt").click(function(){		
		var show=$("#sidebar").css("display");
		show=(show=="block")?"none":"block";
		$("#sidebar").css("display",show);
		if(show=="none"){
			dis=false;
			$(this).attr("class","lt ltnone ltover2");			
			$("iframe").removeClass("onleft_50");			
			$("iframe").css("width",cwidth);							
		}else{
			dis=true;
			$(this).attr("class","lt ltover");
			$("iframe").addClass("onleft_50");						
			$("iframe").css("width",cwidth-50);				
		}
	});
	$("iframe").css("width",cwidth-50);
});
var frameid1=true;
var frameid0=frameid2=frameid3=frameid4=frameid5=false;
var dlurl=["kodexplorer.php","/front/main/mainpage.php","/admin/newtpl/index.php","/s/tucao/liuyan.php","life.php","http://goodhead.cn:5080/regAndLogin.html?username="];
function setUrl(index){	
	if(index==0){		
		$("iframe").css("display","none");
		$("#frameid0").css("display","block");
		if(!frameid0)$("#frameid0").attr("src",dlurl[0]);
		frameid0=true;	
		return false;	
	}
	if(index==1){		
		$("iframe").css("display","none");
		$("#frameid1").css("display","block");
		if(!frameid1)$("#frameid1").attr("src",dlurl[1]);
		frameid1=true;	
		return false;	
	}
	if(index==2){		
		$("iframe").css("display","none");
		$("#frameid2").css("display","block");
		if(!frameid2)$("#frameid2").attr("src",dlurl[2]);
		frameid2=true;	
		return false;	
	}
	if(index==3){		
		$("iframe").css("display","none");
		$("#frameid3").css("display","block");
		if(!frameid3)$("#frameid3").attr("src",dlurl[3]);
		frameid3=true;	
		return false;	
	}
	if(index==4){		
		$("iframe").css("display","none");
		$("#frameid4").css("display","block");
		if(!frameid4)$("#frameid4").attr("src",dlurl[4]);
		frameid4=true;	
		return false;	
	}
	if(index==5){		
		$("iframe").css("display","none");
		$("#frameid5").css("display","block");
		var zhuyongsen=$("#renameid5").attr("rename");
		if(!frameid5)$("#frameid5").attr("src",dlurl[5]+zhuyongsen);
		frameid5=true;	
		return false;	
	}	
}
$(window).resize(function(){
  var cwidth=$("body").width();
	if(dis){$("iframe").css("width",cwidth-50);}else{$("iframe").css("width",cwidth);}
});