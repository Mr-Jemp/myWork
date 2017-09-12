//公用的控制器
myApp.controller("main", ["$scope", "$http", function($scope, $http) {
//	$rootScope.id=null
	//角色请求地址
	$scope.power_tree = "http://192.168.0.21:20896/htRoleService/getSearchInfoRole"
	//功能请求地址
	$scope.tissue_nav_tree = "http://192.168.0.21:20898/formMenuFacade/getFormMenu?pid=0"
	//流程请求地址
	$scope.appflow_tree = "./data_json/appflow_tree.json"
	$scope.appflow_tree02 = "./data_json/flow_tree.json"
	//应用流程请求地址
	$scope.appflow_tree2 = "./data_json/appflow_tree.json"

}])

//左边主要菜单树分类   角色/功能/流程
myApp.controller("work1Controller", ["$scope", "$http","$rootScope" ,function($scope, $http,$rootScope) {

	$http({
		method: 'GET',
		url: $scope.power_tree,
	}).success(function(data) {
		var Objdata = data.msg

		var power_tree = $("#power_tree").ligerTree({
			textFieldName: 'name',
			nodeWidth: 200,
			data: Objdata,
			isExpand: 1,
			// onClick:function(data,target){
			// 		console.log(data)
			// },
			onClick: function(node){
				//点击角色添加tab宣选卡的时候
				$($(".l-layout-left")[1]).css("display","block") //主菜单
				$($(".l-layout-collapse-left")[0]).css("display","none") //关闭
				$($(".l-layout-center")[1]).css("left",200+"px")  //center内容区
				var tabid = $(node.target).attr("tabid");
				if(!tabid) {
					tabid = new Date().getTime();
					$(node.target).attr("tabid", tabid)
				}
				if(node.isonclick) {
					power_tree.cancelSelect(node.data.treedataindex);
					f_addTab(tabid+node.data.id,node.data.name+" 网盘硬盘",encodeURI('./upload/filemg.html'));
				} else if(!node.data.isLeaf) {
					/*f_addTab(tabid,node.data.text,encodeURI('/s/organizesetting/powerformlist.php?roleid='+node.data.id));*/
					f_addTab( node.data.id,node.data.name, encodeURI('./template/workbench/workbench_news.html?role_id='+node.data.id));
				}
			},

			checkbox: false
		});

	}).error(function(data) {
		console.log("失败")
	})

}])
//功能
myApp.controller("work2Controller", ["$scope", "$http", function($scope, $http) {
	$http({
		method: 'GET',
		url: $scope.tissue_nav_tree
	}).success(function(data) {
		if(data.status == 1) {
			var ngdata = data.msg;
			$("#tissue_nav_tree").ligerTree({
				data: ngdata,
				checkbox: false,
				textFieldName: 'formName',
				render: function (item){
//			        	console.log(item)
		            return item.formName
		        },
		        isLeaf:function(item){
		            return item.isLeaf;
		            //console.log((item.values[1].value=="文件夹"));
		            // return !(item.values[1].value=="文件夹");
		        },
				slide: false,
				nodeWidth: 120,
				isExpand: 2,
				onContextmenu: function(node, e) //右键点击,打开网络银盘
				{
					console.log(node)
					if(node.data.isLeaf) return false;
					rmenu_id = node.data.id;
					//rmenu_ti=node.data.children[0].formName;
					rmenu_ti = node.data.formName;
					//这里有个小bug,如果数据没有chinldren下面没有内容了,就会报错
					rmenu.show({
						top: e.pageY,
						left: e.pageX
					});
					return false;
				},
				onselect: function(node) {
					var tabid = $(node.target).attr("tabid");
					if(!tabid) {
						tabid = new Date().getTime();
						$(node.target).attr("tabid", tabid) //为当前点击的节点,设置一个自定义属性,id是随机时间
					}
//					console.log(node.data)
					//isLeaf  是否子节点的判断函数
						if(node.data.pid == 0){
							//如果不是网页,
							// f_addTab(tabid,node.data.formName+" 网盘硬盘",encodeURI('./upload/document/filebox38668671.html?op=home&root='+node.data.id+'&folder='+node.data.id));
								f_addTab(tabid,node.data.formName+" 网盘硬盘",encodeURI('./upload/filetest.html'));
						}else if(node.data.pid == 1){
							// f_addTab(tabid,node.data.formName,encodeURI('./s/listform.html?formid=' + node.data.id));
							f_addTab(tabid, node.data.formName, encodeURI("./template/workbench/role/content.html?id="+node.data.id));
						} 
				
				}
			});
		}

	}).error(function(data) {
		console.log("失败")
	})

}])
//流程
myApp.controller("work3Controller", ["$scope", "$http", function($scope, $http) {

	$http({
		method: 'GET',
		url: $scope.appflow_tree02
	}).success(function(data) {
		//流程菜单
		$("#flow_tree").ligerTree(
			//默认数据
			{
				data: data,
				onselect: function(node) {
					//添加点击事件
					var tabid = $(node.target).attr("tabid"); //为当前的点击目标添加属性
					if(!tabid) {
						//为当前设置属性值
						tabid = new Date().getTime();
						$(node.target).attr("tabid", tabid)
					}
					//                        cu_tabid=tabid;
					//                        console.log(!node.data.isLeaf)  true
					if(!node.data.isLeaf) {
						console.log(node.data)
						//点击目标,切换窗口
						// f_addTab(tabid, node.data.text, encodeURI("./template/workbench/role/bumenTree.html"));
						// f_addTab(tabid,node.data.text,encodeURI('/s/tp/wwwroot/index.php?s=/Flow/run/getflowlist/type/' + node.data.type));
						f_addTab(tabid,node.data.text,encodeURI("./template/workbench/flow/index.html"));
					}
				},
				checkbox: false
			}
		);
		//alert("成功")
	}).error(function(data) {
		console.log("失败")
	})

	//应用流程
	// $("#appflow_tree").ligerTree({
	// 	url: $scope.appflow_tree,
	// 	nodeWidth: 200,
	// 	onselect: function(node) {
	// 		var tabid = $(node.target).attr("tabid");
	// 		if(!tabid) {
	// 			tabid = new Date().getTime();
	// 			$(node.target).attr("tabid", tabid)
	// 		}
	// 		if(!node.data.isLeaf) {
	// 			//点击目标,切换窗口
	// 			f_addTab(tabid, node.data.text, encodeURI("./template/workbench/role/bumenTree.html"));
	// 		}

	// 	},
	// 	checkbox: false
	// });

}])



//右边菜单树分类控制器  角色功能/流程应用
myApp.controller("role1Controller", ["$scope", "$http", function($scope, $http) {

	$http({
		method: 'GET',
		url: $scope.tissue_nav_tree,
	}).success(function(data) {
		var gndata = data.msg
		$("#tissue_nav_tree2").ligerTree({
			data: gndata,
			textFieldName: 'formName',
			checkbox: false,
			slide: false,
			nodeWidth: 120,
			isExpand: 2,
			render: function (item)
	        {
//			        	console.log(item)
	            return item.formName
	        },
	        isLeaf:function(item){
	            return item.isLeaf;
	            //console.log((item.values[1].value=="文件夹"));
	            // return !(item.values[1].value=="文件夹");
	        },
			onContextmenu: function(node, e) {
//				console.log(node)
				if(node.data.isLeaf) return false;
				rmenu_id = node.data.id;
				rmenu_ti = node.data.formName;
				//这里有个小bug,如果数据没有chinldren下面没有内容了,就会报错
				rmenu.show({
					top: e.pageY,
					left: e.pageX
				});
				return false;
			},
			onselect: function(node) {
				console.log(node)
				var tabid = $(node.target).attr("tabid");
				if(!tabid) {
					tabid = new Date().getTime();
					$(node.target).attr("tabid", tabid)
				}
				if(node.data.pid == 0){
					//如果不是网页,
					f_addTab(tabid,node.data.formName+" 网盘硬盘",encodeURI('./upload/filetest.html?op=home&root='+node.data.id+'&folder='+node.data.id));
				}else if(node.data.pid == 1){
					// f_addTab(tabid,node.data.formName,encodeURI('./s/listform.html?formid=' + node.data.id));
					f_addTab(tabid, node.data.formName, encodeURI("./template/workbench/role/content.html?id="+node.data.id));
				} 

			}
		});

	}).error(function(data) {
		console.log("失败")
	})

}])

//流程
myApp.controller("role2Controller", ["$scope", "$http", function($scope, $http) {
	$http({
		method: 'GET',
		url: $scope.appflow_tree02
	}).success(function(data) {
		//流程菜单
		$("#appflow_tree2").ligerTree(
			//默认数据
			{
				data: data,
				onselect: function(node) {
					//添加点击事件
					var tabid = $(node.target).attr("tabid"); //为当前的点击目标添加属性
					if(!tabid) {
						//为当前设置属性值
						tabid = new Date().getTime();
						$(node.target).attr("tabid", tabid)
					}
					//                        cu_tabid=tabid;
					//                        console.log(!node.data.isLeaf)  true
					if(!node.data.isLeaf) {
						//点击目标,切换窗口
						f_addTab(tabid, node.data.text, encodeURI("./admin/flow/content.html"));
					}

				},
				checkbox: false
			}
		);
		//alert("成功")
	}).error(function(data) {
		alert("失败")
	})
}])

//点击齿轮跳转
myApp.controller("gourl", ["$scope", "$http", function($scope, $http) {

	//点击角色齿轮,跳转角色配置
	$scope.getgourl = function(type) {
		if(type == "role") {
			//            f_addTab('role',"角色配置",encodeURI('./admin/new_organizesetting/bumenTree.html'));
			f_addTab('role', "角色配置", encodeURI('./template/workbench/role/bumenTree.html'));
			

		} else if(type == "form") {
			/*f_addTab('form',"表单配置",encodeURI('/admin/new_pagedesign/form_index.html'));*/
			// f_addTab('form',"表单配置",encodeURI('./admin/newtpl/formset.html'));
			f_addTab('form', "表单配置", encodeURI('./template/workbench/form/formset.html'));

		} else if(type == "flow") {
			//            f_addTab('flow',"流程配置",encodeURI('./admin/flowsetting/index.htm'));
			f_addTab('flow', "流程配置", encodeURI("./template/workbench/flow/flow.html"));
		} 
	}

}])
