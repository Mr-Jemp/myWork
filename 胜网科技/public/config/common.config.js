;(function() {
'use strict';

angular.module('commonConfig', [])
  .factory('loginCheck', [
    'util',
    function(util) {
      var cookieTimer = null;
      var accountId = util.parseCookies().accountId || null;
      console.log('cookie accoundId:', accountId);

      /*限制cookie的存在时间30分钟*/
      function resetCookie() {
        if (cookieTimer) clearInterval(cookieTimer);
        cookieTimer = setInterval(function() {
          util.removeCookie('accountId');
        }, 30 * 60 * 1000);
      }
      function cleanCookie() {
        if (cookieTimer) clearInterval(cookieTimer);
        cookieTimer = 0;
        util.removeCookie('accountId');
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
