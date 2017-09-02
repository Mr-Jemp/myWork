		//初始画布
		var penWeight = 5;
		var penColor = '#FF0000';
		var btn = document.getElementsByTagName('huabi_c');
		setBtnColor(); //初始化按钮颜色
		var isEraser = false; //是否正在使用橡皮擦
		var lock = false; //鼠标移动前，判断鼠标是否按下
		var canvas = document.getElementById('painter');
		var cvs = canvas.getContext('2d');

		console.log($('.ppt_cont .page'))
		//画画
		var t = this;
		canvas.addEventListener('touchstart', candown);
		canvas.addEventListener('mousedown', candown);

		function candown(e) {
			e = e || window.e;

			e.preventDefault();
			if(e.touches.length === 1) {
				
				var start_x = e.offsetX || e.touches[0].clientX - 100; //鼠标在画布上的x坐标，以画布左上角为起点
				var start_y = e.offsetY || e.touches[0].clientY; //鼠标在画布上的y坐标，以画布左上角为起点    
				if(isEraser === false) {
					cvs.beginPath(); //开始本次绘画
					cvs.moveTo(start_x, start_y); //画笔起始点
					cvs.lineCap = 'round';
					cvs.lineJoin = "round";
					cvs.strokeStyle = penColor; //加载全局数据（画笔颜色）
					cvs.lineWidth = penWeight; //加载全局数据（画笔粗细）
					cvs.lineTo(start_x, start_y);
					cvs.stroke(); //画一个点

				} else {
					cvs.clearRect(start_x - penWeight / 2, start_y - penWeight / 2, penWeight * 10, penWeight * 10);
				}

				canvas.addEventListener('touchmove', canmove);
				canvas.addEventListener('mousemove', canmove);
				canvas.addEventListener('touchend', canseup);
				canvas.addEventListener('mouseup', canseup);
			} 

		}

		function canmove(e) {
			e.preventDefault();
			console.log('移动')
			if(e.touches.length ==1){
				
				var move_x1 = e.offsetX || e.touches[0].clientX - 100; //鼠标在画布上的x坐标，以画布左上角为起点
				var move_y1 = e.offsetY || e.touches[0].clientY; //鼠标在画布上的y坐标，以画布左上角为起点 
				isEraser = false;				      
				cvs.lineTo(move_x1, move_y1);
				cvs.stroke(); //渲染
				
			}else if(e.touches.length >= 3) {
					isEraser =true;
					var start_x1 = e.offsetX || e.touches[0].clientX - 100; //鼠标在画布上的x坐标，以画布左上角为起点
					var start_y1 = e.offsetY || e.touches[0].clientY; //鼠标在画布上的y坐标，以画布左上角为起点 
					var start_x2 = e.offsetX || e.touches[1].clientX - 100; //鼠标在画布上的x坐标，以画布左上角为起点
					var start_y2 = e.offsetY || e.touches[1].clientY; //鼠标在画布上的y坐标，以画布左上角为起点 
					var start_x3 = e.offsetX || e.touches[2].clientX - 100; //鼠标在画布上的x坐标，以画布左上角为起点
					var start_y3 = e.offsetY || e.touches[2].clientY; //鼠标在画布上的y坐标，以画布左上角为起点 
					cvs.clearRect(start_x1 - penWeight / 2, start_y1 - penWeight / 2, penWeight * 10, penWeight * 10);
					cvs.clearRect(start_x2 - penWeight / 2, start_y2 - penWeight / 2, penWeight * 10, penWeight * 10);
					cvs.clearRect(start_x3 - penWeight / 2, start_y3 - penWeight / 2, penWeight * 10, penWeight * 10);

				}else if(e.touches.length == 2){
					isEraser =true;
//					$('#main').css("z-index","99999")
//					alert("两根手指")
				}
			

		}

		function canseup() {
			lock = false;
			cvs.closePath(); //结束本次绘画
			canvas.removeEventListener('mousemove', canmove)
			canvas.removeEventListener('touchmove', canmove)

		}

		//橡皮擦
		var btn_eraser = document.getElementById('eraser');
		var btn_huaH = document.getElementById('huaH');
		btn_eraser.onclick = function(e) {
			isEraser = true;
			console.log(isEraser)
		}

		btn_huaH.onclick = function(e) {
			isEraser = false;
		}
		//			canvas.onmouseleave = function(){
		//				canvas.onmousemove = null;
		//				canvas.onmouseup = null;
		//				canvas.onmousedown = null;
		//			}

		//清空画布事件
		var btn_clear = document.getElementById('clear_canvas');
		btn_clear.onclick = function() {
			var tempWidth = canvas.width;
			canvas.width = canvas.height;
			canvas.width = tempWidth;
		}

		//随机生成按钮颜色
		function setBtnColor() {
			for(var i = 0; i < btn.length; i++) {
				var random_number = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase();
				var random_color = "#" + "000000".substring(0, 6 - random_number) + random_number;

				if(random_color == document.body.style.backgroundColor) {
					i -= 1;
					continue;
				}

				btn[i].style.backgroundColor = random_color;
			}
		}

		//		/*保存图片事件
		//		var btn_save = document.getElementById('save_canvas');
		//		btn_save.onclick = function () {
		//			var type = 'png';
		//			download(type);
		//		}
		//图片下载操作,指定图片类型
		//		function download(type) {
		//			//设置保存图片的类型
		//			var imgdata = canvas.toDataURL(type);
		//			//将mime-type改为image/octet-stream,强制让浏览器下载
		//			var fixtype = function (type) {
		//				type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
		//				var r = type.match(/png|jpeg|bmp|gif/)[0];
		//				return 'image/' + r;
		//			}
		//			imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
		//			//将图片保存到本地
		//			var saveFile = function (data, filename) {
		//				var link = document.createElement('a');
		//				link.href = data;
		//				link.download = filename;
		//				var event = document.createEvent('MouseEvents');
		//				event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		//				link.dispatchEvent(event);
		//			}
		//			var filename = new Date().toLocaleDateString() + '.' + type;
		//			saveFile(imgdata, filename);
		//		}
		var lineDiv = document.getElementById('lineDiv'); //长线条
		var minDiv = document.getElementById('minDiv'); //小方块
		var vals = document.getElementById("vals");

		minDiv.onselectstart = function() {
			return false;
		}
		vals.onselectstart = function() {
			return false;
		}

		var ifBool = false; //判断鼠标是否按下
		//事件
		var start = function(e) {
			e.stopPropagation();
			ifBool = true;
			//			console.log("鼠标按下")
		}
		var move = function(e) {
			//			console.log("鼠标拖动")
			if(ifBool) {
				if(!e.touches) { //兼容移动端
					var x = e.clientX;
				} else { //兼容PC端
					var x = e.touches[0].pageX;
				}
				var lineDiv_left = getPosition(lineDiv).left; //长线条的横坐标
				var minDiv_left = x - lineDiv_left; //小方块相对于父元素（长线条）的left值 
				if(minDiv_left >= lineDiv.offsetWidth - 15) {
					minDiv_left = lineDiv.offsetWidth - 15;
				}
				if(minDiv_left < 0) {
					minDiv_left = 0;
				}
				//设置拖动后小方块的left值
				minDiv.style.left = minDiv_left + "px";
				var pen_weight_num = parseInt((minDiv_left / (lineDiv.offsetWidth - 15)) * 99 + 1);
				vals.innerText = pen_weight_num;
				penWeight = pen_weight_num;
			}
		}
		var end = function(e) {
			//          console.log("鼠标弹起")
			ifBool = false;
		}
		//鼠标按下方块
		minDiv.addEventListener("touchstart", start);
		minDiv.addEventListener("mousedown", start);
		//拖动
		window.addEventListener("touchmove", move);
		window.addEventListener("mousemove", move);
		//鼠标松开
		window.addEventListener("touchend", end);
		window.addEventListener("mouseup", end);
		//获取元素的绝对位置
		function getPosition(node) {
			var left = node.offsetLeft; //获取元素相对于其父元素的left值var left
			var top = node.offsetTop;
			current = node.offsetParent; // 取得元素的offsetParent
			while(current != null) {
				left += current.offsetLeft;
				top += current.offsetTop;
				current = current.offsetParent;
			}
			return {
				"left": left,
				"top": top
			};
		}