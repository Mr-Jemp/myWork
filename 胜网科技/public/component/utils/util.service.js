;(function() {
'use strict';

angular.module('Util', [])
  .service('util', [
    UtilService,
  ]);

function UtilService() {
  var self = this;

  var cookiesCache = null;

  self.parseCookies = function(force) {
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

  self.setCookie = function(key, value) {
    document.cookie = key + '=' + value;
  };

  self.removeCookie = function(key) {
    var exp = new Date(1);
    document.cookie = key + '=; expires=' + exp.toGMTString() + ';path=/';
  };


  /**
   * 给url配上参数
   * @param   {string} url      url
   * @param   {object} query    参数对象
   * @return  {string} 带参数经过编码的url
   */
  self.createQueryUrl = function createQueryUrl(url, query) {
    if (!query) {
      return url;
    }
    if (typeof query !== 'object') {
      throw 'query must be object';
    }
    var queryArr = [];
    for (var q in query) {
      if (query.hasOwnProperty(q)) {
        queryArr.push(q + '=' + encodeURIComponent(query[q]));
      }
    }
    if (queryArr.length === 0) return url;
    return url + '?' + queryArr.join('&');
  };

  /**
   * 格式化时间为 yyyy-mm-dd  hh:mm:ss
   * @param {number} timestamp 时间戳
   * @return {string} 格式化后的时间
   */
  self.formatTime = function formatTime(timestamp, pattern) {

    var date = new Date(timestamp);
    pattern = pattern || 'yyyy-MM-dd hh:mm:ss';

    var timeMap = {
      yyyy: date.getFullYear(),
      MM: (date.getMonth() + 1),
      dd: date.getDate(),
      hh: date.getHours(),
      mm: date.getMinutes(),
      ss: date.getSeconds(),
    };

    var regx = /(yyyy|MM|dd|hh|mm|ss)/gi;
    var ret = pattern.replace(regx, function(match, group, offset, all) {
      return timeMap[match];
    });

    return ret;
  };

  /**
   * 将时间转换为：过去了多少时间
   * @param {number} timestamp 时间戳
   * @return {string} 过去了多少时间的字符串
   */
  self.passTime = function passTime(timestamp) {
    var now = new Date().getTime();
    var diff = now - timestamp;

    var years = new Date(timestamp).getFullYear() - new Date().getFullYear();
    if (years > 0) {
      return years + '年前';
    }
    var months = new Date(timestamp).getMonth() - new Date().getMonth();
    if (months > 0) {
      return months + '个月前';
    }
    var days = Math.floor(diff / (24 * 3600 * 1000));
    if (days > 0) {
      return days + '天前';
    }

    var hours = Math.floor(diff / (3600 * 1000));
    if (hours > 0) {
      return hours + '小时前';
    }

    var minutes = Math.floor(diff / (60 * 1000));
    if (minutes > 0) {
      return minutes + '分钟前';
    }

    return '刚刚';
  };


}


}());
