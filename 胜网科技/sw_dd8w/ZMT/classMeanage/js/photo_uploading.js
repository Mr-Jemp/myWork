var photosId=location.search.split("?")[1].split("&")[0].split("=")[1];
var is_pic=location.search.split("?")[1].split("&")[1].split("=")[1];
	
		
		//照片列表
//点赞

$(".discuss_goods img").click(function(){
	var goodCount=$(".discuss_goods sup").text();
	if($(this).attr("src")=="images/dianzan@2x (2).png"){
		$(this).attr("src","images/dianzan@2x.png");
		$(this).siblings().css("color","black");
		$(".discuss_goods sup").text(eval(goodCount)-1);
	}else{
		$(this).attr("src","images/dianzan@2x (2).png");
		$(this).siblings().css("color","#56C399");
		$(".discuss_goods sup").text(eval(goodCount)+1);
	}
})





	$(".discuss_comments img").click(function(){
		window.location.href="photo_comments.html";
	})
	
	
	
	
	
	//图片上传预览    IE是用了滤镜。
	var ImgOrVideo="haha";
	function previewImage(file){
          var ul=document.getElementById("preview")
          var  lastLi= document.getElementsByClassName('photoOrVideo')[0];
          	for(var i=0;i<file.files.length;i++){
         		if (file.files && file.files[i]){           
                	var reader = new FileReader();
             		reader.onload = function(evt){
              			Src= evt.target.result;
		
		              	//判断第一次点击的是视频还是照片 之后就只能跟之前的类型一样
		              	if(ImgOrVideo=="img"){
		          			//判断如果跟之前不符合则跳出程序
		          			if(evt.target.result.split(";")[0].indexOf("image")==-1){
		          				alert("请选择照片");
		          				return;
		          			}
		              		var li=document.createElement("li");
		         			li.className="col-xs-4 col-lg-2 col-md-3 col-sm-3";
		         			ul.insertBefore(li,lastLi);
		              		var img=document.createElement("img");
					        li.appendChild(img);
					        img.src=Src;
					        return;
		              	}else if(ImgOrVideo=="video"){
		              		//判断如果跟之前不符合则跳出程序
		          			if(evt.target.result.split(";")[0].indexOf("video")==-1){
		          				alert("请选择视频");
		          				return;
		          			}
		              		var li=document.createElement("li");
		         			li.className="col-xs-4 col-lg-2 col-md-3 col-sm-3";
		         			ul.insertBefore(li,lastLi);
		              		var video=document.createElement("video");
					        li.appendChild(video);
					        video.src=Src;
					        return;
		              	}
		              	//判断第一次是照片还是视频
		             	if(evt.target.result.split(";")[0].indexOf("image")>-1){
		             		console.log("照片");
		             		var li=document.createElement("li");
		        			li.className="col-xs-4 col-lg-2 col-md-3 col-sm-3";
		        			ul.insertBefore(li,lastLi);
		             		var img=document.createElement("img");
					        li.appendChild(img);
					        img.src=Src;
					        ImgOrVideo="img";
					          
						 //渲染相册列表
							$.ajax({
								type:"get",
								url:"http://192.168.0.21:20883/classAlbumService/dataGridTypeAll?class_id=1",
								async:true,
								dataType:"json",
								success:function(data){
									console.log(data)
									for(var i in data){
										if(data[i].is_pic==1){
											continue;
										}
										var newOption=$('<option is_pic="'+data[i].is_pic+'" value="'+data[i].classAlbum_id+'" >'+data[i].title+'</option>');
										$(".upLading select").append(newOption);
										if(data[i].classAlbum_id==photosId){
											console.log("****************")
											newOption.attr('selected',"selected")
										}
									}
								},
								error:function(){
									console.log("错误");
								}
							});
					          
		             	}else if(evt.target.result.split(";")[0].indexOf("video")>-1){
		             		console.log("视频");
		             		var li=document.createElement("li");
		             		ul.insertBefore(li,lastLi);
		         			li.className="col-xs-4 col-lg-2 col-md-3 col-sm-3";
		             		var video=document.createElement("video");
					        li.appendChild(video);
					        video.src=Src;
					        ImgOrVideo="video";
					          
					          //渲染相册列表
							$.ajax({
								type:"get",
								url:"http://192.168.0.21:20883/classAlbumService/dataGridTypeAll?class_id=1",
								async:true,
								dataType:"json",
								success:function(data){
									console.log(data)
									for(var i in data){
										if(data[i].is_pic==0){
											continue;
										}
										var newOption=$('<option is_pic="'+data[i].is_pic+'" value="'+data[i].classAlbum_id+'" >'+data[i].title+'</option>');
										$(".upLading select").append(newOption);
										if(data[i].classAlbum_id==photosId){
											
											newOption.attr('selected',"selected")
										}
									}
								},
								error:function(){
									console.log("错误");
								}
							});
					          
					          
		             	}
              	
           		   }
             
              reader.readAsDataURL(file.files[i]);
          }
          
          }
      
        }

//点击三点
$(".selectClass").click(function(){
	$(".redactPhotosMes").stop().toggleClass("redactPhotosMesDisplay");
})
$(".redactPhotosMes p").click(function(){
	$(".redactPhotosMes").stop().toggleClass("redactPhotosMesDisplay");
})

//上传照片
$(".firstInput").change(function(){
	$(".photo_beforeUploading").css("display","none");
	$(".upLading").css("display","block");
	$(".class_header .selectClass").css("display","none");
	$(".header_message").text("传相册");
	$("#upimage").css("display","block");
	$(".class_header .col-xs-2").addClass("sureCancel");
	$(".sureCancel").click(function(){
		console.log("取消")
	})

})






var classAlbumFile_idStr="";
//点击删除
$(".redactPhotosMesDisplay>ul>li:nth-child(2)").click(function(){
	$(".photos_list div").css("display","block");
	$(".redactPhotosMes").stop().toggleClass("redactPhotosMesDisplay");	
	$(".class_header .selectClass").css("display","none");
	$(".sureDele").css("display","block");
	
})
//点击圆点
$(".photos_list").on('click',"div",function(e){
	var e=e||event;
	$(this).children().toggleClass("redactCheckboxActive");
	console.log("圆圆");
	console.log($(this).attr("classAlbumFile_id"));
//	$(".scaleImgDiv").css("display","none");
		e.stopPropagation();
		e.cancelBubble=true;
})

//点击确定删除
$(".sureDele").click(function(){
	$(".redactCheckbox").each(function(){
		if($(this).css("border")=="0px none rgb(169, 169, 169)"){
			classAlbumFile_idStr+=","+$(this).parent().attr("classAlbumFile_id");
			$(this).parent().parent().remove();
		}
	})
	console.log(classAlbumFile_idStr);
	//确定是否全部相片删除，是则删除时间
	$(".photos_list ul").each(function(){
		if($(this).children().length<=0){
			$(this).prev("p").remove();
		}
	})
	//删除后
		$(".sureDele").css("display","none");
		$(".class_header .selectClass").css("display","block");
		$(".photos_list div").css("display","none");
		
		
		classAlbumFile_idStr=classAlbumFile_idStr.substring(1);
		console.log(classAlbumFile_idStr);
		
		$.ajax({
			type:"post",
			url:"http://192.168.0.21:20883/classAlbumService/getDeteleFileId?classAlbum_id="+photosId+"&classAlbumFile_id="+classAlbumFile_idStr+"&class_id=1",
			dataType:"json",
			success:function(data){
				console.log(data);
				
			},
			error:function(){
				console.log("错误");
			}
		})
		classAlbumFile_idStr='';
})
//点击编辑相册信息
$(".redactPhotosMesDisplay>ul>li:nth-child(1)").click(function(){
	$(".createPhotoBG").css("display","block");
	$(".redactPhotosMes").stop().toggleClass("redactPhotosMesDisplay");
})
//点击叉叉
$(".createPhotoBG li:first-child img").click(function(){
	$(".createPhotoBG").css("display","none");
})


//放大图片
$(".photos_list").on("click","li",function(){
	$(".scaleImg img").attr("src",$(this).children("img").attr("src"));
	console.log($(this).children("img").attr("src"))
	$(".scaleImgDiv").css("display","block");

})
$(function(){
$("#upimage").bind("click",function(){
	if($("#upfile").val==""){
		alert("请选择一个图片文件，再点击");
		return;
	}
	var describes=$(".describesPhotos_Photos").val();
	var album_id=$(".selectPhotos_Photos option:selected").val();
	var is_pic=$(".selectPhotos_Photos option:selected").attr("is_pic");
	
	$("#form1").ajaxSubmit({
		url:"http://192.168.0.21:20883/uploadXCSPService/upload?describes="+describes+"&album_id="+album_id+"&class_id=1",
		type:"POST",
		dataType:"json",
		success:function(data){
			$("#form1").html("");
			$("#form1").html($('<input type="file" name="upfile" id="upfile" multiple="multiple">'));
			window.location.reload();
			console.log(data)
		},
		error:function(){
			console.log("错误");
		}
	})

})

		
		
		$("#form1").on("change",$("input:last-child"),function(){
			var newInput=$('<input type="file" name="upfile" id="upfile" multiple="multiple" onchange="previewImage(this)" >');
			$("#form1").append(newInput);

	
		})

		$("#chooseImg").click(function(){
			console.log(57)
			$("#form1 input:last-child").click();
		})

})

//评论单张照片
$(".simgleComment span").click(function(){
	var str=$(this).siblings("input").val();
	if(str==""){return;}
	var newLi=$('<li class="row" style="margin: 0;">'
					+'<div>'
						+'<p class="col-xs-4">'
							+'<img src="images/20170519104219.png" alt="" />'
						+'</p>'
						+'<p class="col-xs-4">'
							+'<span>小红</span>'
							+'<span>20分钟前</span>'
						+'</p>'
						+'<p class="col-xs-4">'
							+'<img src="images/dianzan@2x.png" alt="" />'
							+'<img src="images/pinglun@2x.png" alt="" />'
						+'</p>'
					+'</div>'
					+'<p style="margin-left: 1rem;">'
						+'<span class="col-xs-10">'+str+'</span>'
					+'</p>'
				+'</li>');
		$(".singleCommentCenter").append(newLi);
		
		$(this).siblings("input").val("");
		var ul=document.getElementsByClassName("singleCommentCenter")[0]
		ul.scrollTop=ul.scrollHeight; 
})
//点击单张图片的评论等
$(".scaleImgBottom p:last-child").click(function(){
	$(".singlePhotosComment").animate({
		"height":"50%"
	})
})
//评论下滑
$(".singlePhotosComment>div:first-child img").click(function(){
	$(".singlePhotosComment").animate({
		"height":"0"
	})
})
