		//图片上传预览    IE是用了滤镜。
        function previewImage(file)
        {
          var MAXWIDTH  = 90; 
          var MAXHEIGHT = 90;
          var ul=document.getElementById("preview")
          var  lastLi= document.getElementsByClassName('photoOrVideo')[0];
          var li=document.createElement("li");
          var img=document.createElement("img");
          ul.insertBefore(li,lastLi);
          li.appendChild(img);
//         li.innerHTML ='<img class="imghead" onclick=$("#previewImg").click()>';
//			img.click(function(){$("#previewImg").click();console.log(24254)});
          
          if (file.files && file.files[0])
          {       
              img.onload = function(){
              	console.log(img)
                var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
//              img.width  =  rect.width;
//              img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
//              img.style.marginTop = rect.top+'px';
              }
              var reader = new FileReader();
              reader.onload = function(evt){img.src = evt.target.result;}
              reader.readAsDataURL(file.files[0]);
          }
          else //兼容IE
          {
            var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            li.innerHTML = '<img id=imghead>';
            var img = document.getElementById('imghead');
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
            li.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
          }
        }
        function clacImgZoomParam( maxWidth, maxHeight, width, height ){
            var param = {top:0, left:0, width:width, height:height};
            if( width>maxWidth || height>maxHeight ){
                rateWidth = width / maxWidth;
                rateHeight = height / maxHeight;
                
                if( rateWidth > rateHeight ){
                    param.width =  maxWidth;
                    param.height = Math.round(height / rateWidth);
                }else{
                    param.width = Math.round(width / rateHeight);
                    param.height = maxHeight;
                }
            }
            param.left = Math.round((maxWidth - param.width) / 2);
            param.top = Math.round((maxHeight - param.height) / 2);
            return param;
        }  


$("#previewImg").change(function(){
	console.log(42554);
	$(".submitPhotoOrVideo").css("display","none");
	$(".showPhotos").css("display","block");
	$(".class_header .selectClass").text("上传") ;
})

//评论
$(".pinglun .col-xs-1 img").click(function(){
	console.log($(this));
	
	
})


