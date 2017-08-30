$(document).ready(function()
{		
	$(".admin_top_nav>a").click(function(){
		$(".admin_top_nav>a").removeClass("select");
		$(this).addClass("select");
		$(this).blur();
		var linkID = $(this).prop("id");
		if(linkID=="pagesetting"){
			window.parent.frames["leftFrame"].location.href =  "../new_pagedesign/pdesign_left.html";
			parent.document.getElementsByTagName("frameset")[1].cols = "200,*";
		}else if(linkID=="frontsetting"){			
			window.parent.frames["leftFrame"].location.href =  "../new_frontsetting/front_left.html";
			parent.document.getElementsByTagName("frameset")[1].cols = "200,*";
		}else if(linkID=="serversetting"){
			window.parent.frames["leftFrame"].location.href =  "../new_cdmain/cdmain_left.html";
			parent.document.getElementsByTagName("frameset")[1].cols = "200,*";			
		}else if(linkID=="powersetting"){
			parent.document.getElementsByTagName("frameset")[1].cols = "1,*";
			window.parent.frames["leftFrame"].location.href =  "../newtpl/left.html";
		}else if(linkID=="flowsetting"){
			parent.document.getElementsByTagName("frameset")[1].cols = "1,*";
			window.parent.frames["leftFrame"].location.href =  "../newtpl/left.html";
		}else if(linkID=="orgsetting"){
			parent.document.getElementsByTagName("frameset")[1].cols = "1,*";
			window.parent.frames["leftFrame"].location.href =  "../newtpl/left.html";			
		}else if(linkID=="personmanage"){
			parent.document.getElementsByTagName("frameset")[1].cols = "1,*";
			window.parent.frames["leftFrame"].location.href =  "../newtpl/left.html";			
		}else if(linkID=="personal"){
			parent.document.getElementsByTagName("frameset")[1].cols = "1,*";
			window.parent.frames["leftFrame"].location.href =  "../newtpl/left.html";			
		}else if(linkID=="setting"){
			window.parent.frames["leftFrame"].location.href =  "../setting/left.html";
			parent.document.getElementsByTagName("frameset")[1].cols = "200,*";			
		}else if(linkID=="oaflowsetting"){
			parent.document.getElementsByTagName("frameset")[1].cols = "1,*";
			window.parent.frames["leftFrame"].location.href =  "../newtpl/left.html";
		}
		else{
			window.parent.frames["leftFrame"].location.href =  "../newtpl/left.html";
		}
		//window.parent.frames["leftFrame"].location.href =  "admin_left.php?act="+$(this).attr("id");
		});	
});