﻿<?php
session_start();
include_once "../../s/function/check_session.php";
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<script type="text/javascript" src="/resource/js/jQuery/jquery-1.9.1.js"></script>
<script type="text/javascript">
	$(function() {
	/*	Current Tab 	*/
	$('.phone-tabs li a').click(function() {
		$('.phone-tabs li').removeClass('current');
		$(this).parent().addClass('current');
	});
	/*	Simple Tab 	*/
	var tabContents = $('.phone-tab-contents');
	$('.phone-tabs .getphone').click(function() {
		tabContents.removeClass('getpeoples');
		tabContents.removeClass('getclock');
	});
	$('.phone-tabs .getclock').click(function() {
		tabContents.removeClass('getpeoples');
		tabContents.addClass('getclock');
	});
	$('.phone-tabs .getpeoples').click(function() {
		tabContents.removeClass('getclock');
		tabContents.addClass('getpeoples');
	});
	/*	Delete */
	$('.delete-btn').click(function() {
		var numbers = $('.number-area .numbers').text();
		var numbers2 = $('.number-area .numbers').text().length;
		$('.number-area .numbers').text(numbers.substr(0, numbers2 - 1));
	});
	/*	Pusher	*/
	var pusher = {
		number: function(num) {
			$('.numbers-container .pushed' + num + '').click(function() {
				$('.number-area .numbers').append('' + num + '');
			});
		}
	}
	pusher.number(1);
	pusher.number(2);
	pusher.number(3);
	pusher.number(4);
	pusher.number(5);
	pusher.number(6);
	pusher.number(7);
	pusher.number(8);
	pusher.number(9);
	pusher.number(0);
	$('.numbers-container .pushedasterisk').click(function() {
		$('.number-area .numbers').append('*');
	});
	$('.numbers-container .pushednumber').click(function() {
		$('.number-area .numbers').append('#');
	});
});
</script>

<style>
*{
	margin:0;
	padding:0;
}
html{
	margin:0;
	padding:0;
}

body{
	color:#4196b7;margin:0;
	padding:0;
	font:normal 12px arial,sans-serif;
}
.nexus{
	margin:10px auto;
	width:322px;
	height:600px; position:relative;
	
	background: url(/resource/images/common/maxphone.png) no-repeat;
}




 .delete-btn{ display:block; width:75px; height:45px;  top:428px; right:45px; position:absolute;
	
	cursor:pointer;
}
.number-area{   top:148px; right:50px; position:absolute;width:220px; height:50px;font: 30px arial,sans-serif; color:#FFF; overflow:hidden; }
.numbers{width:220px; height:50px; overflow:hidden; }
.numbers-container{
	 position: absolute; top:210px; right:42px; width:236px; height:212px;
}
.numbers-container span{
	width:75px;
	height:50px;
	float:left;
	font-size:30px;
	text-indent:22px; margin-left:3px;
	position:relative; text-align:center;
	
	cursor:pointer; text-indent:-999999999em;
}





.call-btn{
	width:155px; height:45px;cursor:pointer;  position:absolute;top:428px; right:125px;

}
/* 	Icon Group 	*/
.icon{
	display:inline-block;
	font-style:normal;
	position:relative;
}
/*.icon.phone{
	background:#fff;
	width:5px;
	height:26px;
	-webkit-transform:rotate(145deg);
	-moz-transform:rotate(145deg);
	-o-transform:rotate(145deg);
	transform:rotate(145deg);
	border-radius:0 6px 6px 0;
	margin-top:5px;
}
.icon.phone:before{
	position:absolute;
	content:'';
	width:8px;
	height:9px;
	background:#fff;
	left:-6px;
	bottom:-1px;
	border-radius:3px 6px 7px 3px;
}*/
.icon.phone:after{
	position:absolute;
	content:'';
	width:8px;
	height:9px;
	background:#fff;
	left:-6px;
	top:-1px;
	border-radius:3px 6px 7px 3px;
}
</style>
</head>
<body>
<div class="nexus">
	
		<a class="delete-btn"><!--<i class="icon close">x</i>--></a>
		
			
				<div class="number-area">
					<span class="numbers"></span>
					
				</div>
				<div class="numbers-container">
					<span class="pushed1">1</span>
					<span class="pushed2">2</span>
					<span class="pushed3">3</span>
					<span class="pushed4">4</span>
					<span class="pushed5">5</span>
					<span class="pushed6">6</span>
					<span class="pushed7">7</span>
					<span class="pushed8">8</span>
					<span class="pushed9">9</span>
					<span class="pushedasterisk fff">*</span>
					<span class="pushed0">0</span>
					<span class="pushednumber fff">#</span>
				</div>
				<a href="javascript:void(0);" onclick="makeCall();" target="_blank">
				<div class="call-btn">
					<!--<i class="icon phone"></i>-->
				</div>
				</a>
			
</div>
<script>
	function makeCall() {
	     var phoneNum = $('.number-area .numbers').text();
		 var a=/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^(13[0-9]|15[0|3|6|7|8|9]|18[0-9])\d{8}$)/;
		 if(!a.test(phoneNum))
        {
            alert("请输入正确的电话号码，\n\n如：0591-6487256，15005059587");
            //document.getElementByIdx(obj.id).focus();
            return false;
        }
		 window.location.href="http://goodhead.cn:8080/softphone/service/call?dnis=" + phoneNum;
	}
</script>
</body>
</html>