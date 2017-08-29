angular.module('erweimaApp',["commonConfig"]).
controller('erweimaController',function($scope,$window){
			var timer;
			//二维码分享动画
			$(".top_a_ri").on("click",function(){
				
				$(".shareList").slideToggle(800);
				$(".ifra").show();
			})
			$(".noshare").on("click",function(){
				
				$(".shareList").slideUp(800);
				$(".ifra").hide();
			})
			
			window._bd_share_config = {
				common : {
					bdText : '广东胜网科技',	
					bdDesc : '自定义分享摘要',	
					bdUrl : '自定义分享url地址',
					bdPic : 'img_erweima.png',
//					onAfterClick : function(weixin){
//						clearInterval(timer);
//						timer=setInterval(function(){
//							$(".shareList,iframe").slideUp(800);
//							$(".ifra").hide();
//						},3000)
//					}
				},
				share : [{
					"bdSize" : 32,
					"bdCustomStyle":"no_bd_style"   //去掉自定义样式
				}],
			}
			with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
			
			
//			var shareCon=[
//				{
//					title:'数字社区',
//					desc:'教育分享与时俱进',
//					link:'http://dd8w.com/',
//					imgUrl:'http://192.168.0.17/templefile/1705021754000021_75364.png'
//				}
//			]
			//	分享功能
			
			
			
			/**
			$(".shareList ul li a").click(function(){
				if($(this).find("p").html()=='微信好友'){
					console.log($(this).find("p").html())
					wx.onMenuShareAppMessage({ //分享给朋友的API 
					    title: shareCon[0].title, // 分享标题
					    desc: shareCon[0].desc, // 分享描述
					    link: shareCon[0].link, // 分享链接
					    imgUrl:shareCon[0].imgUrl, // 分享图标
					    success: function () { 
					        // 用户确认分享后执行的回调函数
					        alert("分享成功")
					    },
					    cancel: function () { 
					    	 alert("分享失败")
					        // 用户取消分享后执行的回调函数
					    }
					});
				}else if($(this).find("p").html()=='朋友圈'){
					console.log($(this).find("p").html())
					wx.onMenuShareTimeline({  //分享到朋友圈的API
					   title: '', // 分享标题
					   link: '', // 分享链接
					   imgUrl: '', // 分享图标
					   success: function () {
					       // 用户确认分享后执行的回调函数
					   },
					   cancel: function () {
					       // 用户取消分享后执行的回调函数
					   }
					});
				}else if($(this).find("p").html()=='QQ好友'){
					console.log($(this).find("p").html())
					wx.onMenuShareQQ({	//分享给QQ的API 
					    title: '', // 分享标题
					    desc: '', // 分享描述
					    link: '', // 分享链接
					    imgUrl: '', // 分享图标
					    success: function () { 
					       // 用户确认分享后执行的回调函数
					    },
					    cancel: function () { 
					       // 用户取消分享后执行的回调函数
					    }
					});
				}else{
					console.log($(this).find("p").html())
				}
			})
				**/	
})


