	//点击班级成员
	$(".openClass").eq(0).click(function(){
		window.location.href="classMember.html";
	})
	//点击课程表
	$(".openClass").eq(1).click(function(){
		window.location.href="syllabus_index.html";
	})
	
	//点击开通班级
	$(".openClassEnd").on("click",function(){
		$.ajax({
			type:"post",
			url:"http://192.168.0.21:20882/addClassNormal/isUserUpOrDown",
			data:JSON.stringify({'accountId':6}),
			contentType: "application/json; charset=UTF-8",
	        dataType:'json',
			async:true,
			success:function(data){
				console.log(data);	
				var upORdown=data.upORdown;
				//判断是否已经成功开通班级
				if(data.openedClassNumb>0){
					$(".openClassReminder").fadeIn(function(){
						setTimeout(function(){
							$(".openClassReminder").fadeOut()
						},1000)
					})	
				}else{
					//线下
					//先判断之前是否申请过开通班级
					console.log(777)
					$.ajax({
						type:"post",
						url:"http://192.168.0.21:20882/addClassOperation/getResultOpenClassAudit",
						data:JSON.stringify({'accountId':10}),
						contentType: "application/json; charset=UTF-8",
						async:true,
						dataType:'json',
						success:function(data){
							console.log(data);
//							
							if(data.status=="0"){//没有点击过开通班级
								//判断线上线下
								if(upORdown==0){
									window.location.href="addClass_openClass.html";
								}else{//线上 提示去认证
									$(".reminderParent").css("display","block");
								}
							}else{//点击过开通班级，查看上次审核状态
								if(data.msg=="4"){
									window.location.href="checkSuccess.html";
								}else if(data.msg=="2"){
									window.location.href="checkFail.html";
								}else if(data.msg=="1"){
									window.location.href="checking.html";
								}else if(data.meg=="3"){
									window.location.href="checkDatePast.html";
								}
							}
							
							//开通过，判端审核状态

						},
						error:function(){
							console.log("获取审核信息错误");
							$(".openClassReminder").fadeIn(function(){
								setTimeout(function(){
									$(".openClassReminder").fadeOut()
								},1000)
							})
						}
					});				
					
				}
				
			},
			error:function(){
				console.log("获取开通班级信息错误");
			}
		});
		
		
//		
		localStorage.setItem("type","openClass");
	})
	//点击取消
	$(".cancel a:nth-child(1)").on("click",function(){
		$(".reminderParent").css("display","none");
	})
	
	//加入班级
	$(".addClass1").on("click",function(){
		window.location.href="addClass_selectClass.html";
	})
	//点击相册
	$(".classPhotoEnd").click(function(){
//		window.location.href="photo_createPhoto.html";

	//	判断之前是否有上传过相册
	console.log("相册")
		$.ajax({
	        url:'http://192.168.0.21:20883/classAlbumService/dataGridCount?user_id=1',
	        type: 'get',
	        success: function (data) {
	        	console.log(data)
	        	if(data==true){
	        		window.location.href="photo_first.html";
	        	}else{
	        		window.location.href="photo_createPhoto.html";
	        	}
	        }
	   })
	})
	
	//点击班级论坛
	$(".classComment").click(function(){
		location.href = '../../class-forum/index.html';
	})
