;(function() {
'use strict';

angular.module('TeachScheme').service('dataService', [
  '$http',
  'util',
  DataService,
]);


function DataService($http, util) {
  var self = this;

  var SUCCESS = 200;

  var ROOT = 'http://192.168.0.21:20885';
  var apiGetSchemeList = ROOT + '/teachingPlanService/dataGrid',
    // ?user_id=1&class_id=1&plan_id=1
    apiGetScheme = ROOT + '/teachingPlanService/dataGrid',
    // data:{user_id=1,class_id=1,title=105,content=ss}
    apiCreateScheme = ROOT + '/teachingPlanService/getAddTp',
    // ?id=classId
    apiGetClassFolder = ROOT + '/planClassService/getPlanClassInfo',
    // data :{plan_id=1,title=ss,content=ss}
    apiUpdateScheme = ROOT + '/teachingPlanService/getUpdateTp ',
    // ?plan_id=10
    apiDeleteScheme = ROOT + '/teachingPlanService/getDelete';


  var fakeUID = 1;
  var fakeCID = 1;


  /**
     * 根据计划id获取单个教学计划
     * @param  {Number} schemeId    计划ID
     * @return {Promise}            成功则返回教学计划
     */
  self.getScheme = function(schemeId) {
    console.log('get scheme by Id:', schemeId);
    var url = util.createQueryUrl(apiGetScheme, {
      user_id: fakeUID,
      plan_id: schemeId,
    });
    return $http.get(url)
      .then(function(result) {
        if (result.status === SUCCESS) {
          console.log('get scheme %s success', schemeId);
        }
        return {
          status: result.status,
          data: transformScheme(result.data[0]),
        };
      })
      .catch(function(err) {
        console.error('get scheme fail, use fake', err);
        return {
          status: SUCCESS,
          data: fakeSchemeList[0],
        };
      });
  };


  /**
     * 根据班级id获取教学计划列表
     * @param  {Number} classId 班级ID
     * @return {Promise}        成功则返回班级列表
     */
  self.getSchemeList = function(classId) {
    console.log('get scheme list, userId: %d; classId: %s', fakeUID, classId);
    var url = util.createQueryUrl(apiGetSchemeList, {});
    return $http.post(url, {
      user_id: fakeUID,
      class_id: classId,
    })
      .then(function(result) {
        if(!result) return {};
        if (result.status === SUCCESS) {
          console.log('get scheme success');
        }
        return {
          status: result.status,
          data: transformSchemeList(result.data.msg),
        };
      })
      .catch(function(err) {
        console.error('get scheme err, and use fake data:', err);
        return {
          status: SUCCESS,
          data: fakeSchemeList,
        };
      });
  };

  /**
     * 获取全部教学计划的文件夹
     * @param {Number} classId 文件夹ID
     * @return {Promise} 成功则返回全部班级文件夹
     */
  self.getClassFolderList = function(classId) {
    console.log('get class folders:', classId);
    var query = classId === undefined ? null : {class_id: classId};
    var url = util.createQueryUrl(apiGetClassFolder, query);
    return $http.get(url)
      .then(function(result) {
        if (result.status === SUCCESS) {
          console.log('get class folders success');
        }
        return {
          status: result.status,
          data: transformClassFolderList(result.data.classObject),
        };
      })
      .catch(function(err) {
        console.error('get class folders fail, use fake data', err);
        return {
          status: SUCCESS,
          data: fakeClassFolderList,
        };
      });

  };

  /**
     * 在某个文件夹下创建教学计划
     * @param  {Number} classId 文件夹ID
     * @param  {String} title   标题
     * @param  {String} content 内容
     * @return {Promise}        成功则返回新创建的scheme对象
     */
  self.createScheme = function(classId, title, content) {
    console.log('create scheme: classId:%d, title: %s, content: %s', classId, title, content);
    var data = {
      user_id: fakeUID,
      class_id: classId,
      title: title,
      content: content,
    };
    var header = {
      // 'Content-Type': undefined,
      'Content-Type': 'text/plain',
    };
    return $http.post(apiCreateScheme, data,
      {
        headers: header,
        // transformRequest: angular.identity,
      })
      .then(function(result) {
        if (result.status === SUCCESS) {
          console.log('create scheme success');
        }
        return {
          status: result.status,
          data: result.data,
        };
      })
      .catch(function(err) {
        console.error('create scheme error, use fake data', err);
        return {
          status: SUCCESS,
        };
      });
  };


  /**
     * 编辑教学计划
     * @param  {Number} schemeId   教学计划ID
     * @param  {String} newTitle   新标题
     * @param  {String} newContent 新内容
     * @return {Promise}           成功则返回新的scheme对象
     */
  self.editScheme = function(schemeId, newTitle, newContent) {
    console.log('edit scheme: schemeId:%d, title: %s, content: %s', schemeId, newTitle, newContent);
    var data = {
      plan_id: schemeId,
      title: newTitle,
      content: newContent,
    };
    return $http.post(apiUpdateScheme, data, {
      headers: {'Content-Type': 'text/plain'},
    })
      .then(function(result) {
        if (result.status === SUCCESS) {
          console.log('edit scheme success');
        }
        return {
          status: result.status,
          data: result.data,
        };
      })
      .catch(function(err) {
        console.error('edit scheme error, use fake data', err);
        return {
          status: SUCCESS,
        };
      });
  };

  /**
     * 上传教学计划
     * @param  {Scheme} scheme 教学计划对象，至少包括title, content;
     * @return {Promise}       成功则返回200
     */
  self.upload = function(scheme) {
    console.log(scheme);
  };

  /**
     * 根据ID删除教学计划
     * @param  {Number} schemeId 教学计划ID
     * @return {Promise}         成功返回200
     */
  self.remove = function(schemeId) {
    console.log('delete scheme: %d', schemeId);
    var url = util.createQueryUrl(apiDeleteScheme, {plan_id: schemeId});
    return $http.post(url, {}, {
      headers: {'Content-Type': 'text/plain'},
    })
      .then(function(result) {
        if (result.status === 200) {
          console.log('delete success');
        }
        return {
          status: result.status,
          data: result.data,
        };
      })
      .catch(function(err) {
        console.error('delete scheme fail, use fake data.', err);
        return {
          status: SUCCESS,
        };
      });
  };

  /*  HELPERS  */

  /**
     * 适配后台拉取的scheme数据
     * @param  {rawScheme} scheme 后台传过来的scheme
     * @return {Scheme}           适配后的scheme
     */
  function transformScheme(scheme) {
    if (!scheme) {
      return {};
    }
    return {
      id: scheme.id,
      classId: scheme.class_id,
      title: scheme.title,
      content: scheme.content,
      createTime: scheme.create_time,
    };
  }

  /**
     * 遍历schemeList逐个适配
     * @param  {rawScheme[]} schemeList 后台穿过来的教学计划列表
     * @return {Scheme[]}                  适配后的计划列表
     */
  function transformSchemeList(schemeList) {
    console.log(schemeList)
    if (!schemeList || !(schemeList instanceof Array)) {
      return [];
    }
    var list = [];
    schemeList.forEach(function(scheme) {
      list.push(transformScheme(scheme));
    });
    return list;
  }

  function transformClassFolder(folder) {
    if (!folder) {
      return {};
    }
    return {
      id: folder.id,
      title: folder.name,
    };
  }

  function transformClassFolderList(folderList) {
    if (!folderList) {
      return [];
    }
    var list = [];
    folderList.forEach(function(f) {
      list.push(transformClassFolder(f));
    });
    return list;
  }

  /*  MOCK  */

  var fakeClassFolderList = [
    {id: '20', title: '一年级 (1)班 语文'},
    {id: '21', title: '一年级 (2)班 语文'},
    {id: '22', title: '一年级 (3)班 语文'},
    {id: '23', title: '一年级 (4)班 语文'},
  ];

  var fakeSchemeList = [
    {
      id: 111,
      classId: 1,
      title: '2017年上半年教学计划',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam ullam, natus praesentium quae ab illum, odit quas voluptatem provident similique quia sapiente dolorum minima corporis, totam rem. Nisi, esse sapiente!',
      createTime: '2017-6-5',
    },
    {
      id: 112,
      classId: 1,
      title: '2017年上半年教学计划',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam ullam, natus praesentium quae ab illum, odit quas voluptatem provident similique quia sapiente dolorum minima corporis, totam rem. Nisi, esse sapiente!',
      createTime: '2017-6-5',
    },
    {
      id: 113,
      classId: 1,
      title: '2017年上半年教学计划',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam ullam, natus praesentium quae ab illum, odit quas voluptatem provident similique quia sapiente dolorum minima corporis, totam rem. Nisi, esse sapiente!',
      createTime: '2017-6-5',
    },
  ];
};


}());
