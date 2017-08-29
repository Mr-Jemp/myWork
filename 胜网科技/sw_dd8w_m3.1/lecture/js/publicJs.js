		//返回上一层

		$('.top_a_le img').click(function() {
			
			//					window.location.href = document.referrer;//返回上一页并刷新
			//			window.location.reload();//刷新当前页面
			history.go(-1); //返回上一页刷新
			//		var isPageHide = false;
			//  window.addEventListener('pageshow', function () {
			//      if (isPageHide) {
			//          window.location.reload();
			//      }
			//  });
			//  window.addEventListener('pagehide', function () {
			//      isPageHide = true;
			//  });
		})

		//	页面滚动单行置顶
		$(window).scroll(function() {
			//scrollTop()方法返回或设置匹配元素的滚动条的垂直位置
			var heardH = $(".mycollect_top_a").height();
			var top = $(this).scrollTop(); // 当前窗口的滚动距离
			if(top > heardH) {
				$(".mycollect_top_a").addClass('topCo');
				$(".come_top").fadeIn();
			} else {
				$(".mycollect_top_a").removeClass('topCo');
				$(".come_top").fadeOut()
			}
		});
		//返回顶部
		$(".come_top").click(function () {
		        var speed=200;//滑动的速度
		        $('body,html').animate({ scrollTop: 0 }, speed);
		        return false;
		 });
		
		//适配移动端
		(function(doc, win) {
			var docEl = doc.documentElement,
				resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
				recalc = function() {
					var clientWidth = docEl.clientWidth;
					if(!clientWidth) return;
					if(clientWidth >= 750) {
						docEl.style.fontSize = '70px';
					} else {
						docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
					}
				};

			if(!doc.addEventListener) return;
			win.addEventListener(resizeEvt, recalc, false);
			doc.addEventListener('DOMContentLoaded', recalc, false);
		})(document, window);