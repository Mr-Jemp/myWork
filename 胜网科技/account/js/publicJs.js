// 返回上一层

$('.top_a_le img').click(function() {
//                window.location.href = document.referrer;//返回上一页并刷新
  //      window.location.reload();//刷新当前页面
  history.go(-1); // 返回上一页刷新
  //    var isPageHide = false;
  //  window.addEventListener('pageshow', function () {
  //      if (isPageHide) {
  //          window.location.reload();
  //      }
  //  });
  //  window.addEventListener('pagehide', function () {
  //      isPageHide = true;
  //  });
});

//  页面滚动单行置顶
$(window).scroll(function() {
  // scrollTop()方法返回或设置匹配元素的滚动条的垂直位置
  var heardH = $('.mycollect_top_a').height();
  var top = $(this).scrollTop(); // 当前窗口的滚动距离
  if (top > heardH) {
    //        $(".mycollect_top_a").addClass('topCo');
    $('.come_top').fadeIn();
  } else {
    //        $(".mycollect_top_a").removeClass('topCo');
    $('.come_top').fadeOut();
  }
});
// 返回顶部
$('.come_top').click(function () {
  var speed = 200;// 滑动的速度
  $('body,html').animate({scrollTop: 0}, speed);
  return false;
});

// 适配移动端
(function(doc, win) {
var docEl = doc.documentElement,
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  recalc = function() {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    if (clientWidth >= 750) {
      docEl.style.fontSize = '70px';
    } else {
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
    }
  };


if (!doc.addEventListener) return;
win.addEventListener(resizeEvt, recalc, false);
doc.addEventListener('DOMContentLoaded', recalc, false);
}(document, window));




/* cookie 辅助工具 */
var cookiesCache = null;

function parseCookies(force) {
  if (!force && cookiesCache) {
    return cookiesCache;
  }
  var cookies = document.cookie;
  var obj = {};
  if (!cookies) return obj;
  var kvList = cookies.split(';');
  kvList.forEach(function(kv) {
    var firstEqualIndex = kv.indexOf('=');
    var k = kv.substring(0, firstEqualIndex);
    var v = kv.substring(firstEqualIndex + 1);
    obj[k] = v;
  });
  cookiesCache = obj;
  return cookiesCache;
};

function setCookie(key, value) {
  document.cookie = key + '=' + value;
};

function removeCookie(key) {
  var exp = new Date(1);
  document.cookie = key + '=; expires=' + exp.toGMTString() + ';path=/';
};


// ajax 判断用户是否登录
;(function(){
'use strict';

var accountId = parseCookies().accountId || null;
console.log('cookie accountId', accountId)
if ($) {
  $.ajaxPrefilter(function(opts, origin, jqXHR) {
    jqXHR.setRequestHeader('accountId', accountId);

    // 屏蔽掉userid 参数
    var url = opts.url;
    var regx = /(u_id|uid|uId|accountId|user_id)=(\w+)&?/g;
    opts.url = url.replace(regx, '');

    // 这里在每一个成功函数前插入一个检查函数
    if (opts.dataType !== 'script') {
      opts.success = [].concat(checkLogin, opts.success);
    }

  });
}

var cookieTimer = null;
function checkLogin(res, status, jqXHR) {
  if (res.status == -1100) {
    cleanCookie();
    location.href = '/user/userIndex.html';
    throw 'go login';
  }
  resetCookie()
}

/*限制cookie的存在时间30分钟*/
function resetCookie() {
  if (cookieTimer) clearInterval(cookieTimer);
  cookieTimer = setInterval(function() {
    removeCookie('accountId');
  }, 30 * 60 * 1000);
}
function cleanCookie() {
  if (cookieTimer) clearInterval(cookieTimer);
  cookieTimer = 0;
  removeCookie('accountId');
}


}())


// angular 的获取accoutId
;(function() {
'use strict';

angular.module('commonConfig', [])
  .factory('loginCheck', [
    function() {
      var cookieTimer = null;
      var accountId = parseCookies().accountId || null;
      console.log('cookie accoundId:', accountId);

      /*限制cookie的存在时间30分钟*/
      function resetCookie() {
        if (cookieTimer) clearInterval(cookieTimer);
        cookieTimer = setInterval(function() {
          removeCookie('accountId');
        }, 30 * 60 * 1000);
      }
      function cleanCookie() {
        if (cookieTimer) clearInterval(cookieTimer);
        cookieTimer = 0;
        removeCookie('accountId');
      }

      return {
        request: function(config) {
          config.headers.accountId = accountId;
          // 屏蔽掉用户参数
          var url = config.url;
          var regx = /(u_id|uid|uId|accountId|user_id)=(\w+)&?/g;
          config.url = url.replace(regx, '');
          return config;
        },
        response: function(res, xhr) {
          // XXX: 这里就算拦截了也阻止不了程序继续运行
          if (res.data.status == -1100) {
            cleanCookie();
            location.href = '/user/userIndex.html';
            throw 'go login';
            return;
          }
          resetCookie();
          return res;
        },
      };
    },
  ])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('loginCheck');
  }]);


}());

