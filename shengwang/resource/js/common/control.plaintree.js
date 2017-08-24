$(function(){
   if(typeof(window.fuviewtrees)=='undefined')window.fuviewtrees=Array();
   var free=$(".freeid"),freel=free.length;
	
	for(i=0;i<freel;i++){
		var listtext=decodeURI($(free.eq(i)).attr("listtext"));
		var srcName=$(free.eq(i)).attr("name");
		var minHeight=$(free.eq(i)).attr("orgminheight")+"";
		if(typeof(minHeight)=="undefined" || minHeight=="null")
			minHeight="auto";
		else
			minHeight+='px';
		var divbox=document.createElement("div");
		$(divbox).css({width:"100%",height:minHeight,overflow:"hidden",background:"#ff00000"});
		var menu=document.createElement("div");
		var insidebox=document.createElement("div");
		$(insidebox).css({width:"100%",height:"100%",overflow:"hidden"});
		var right=document.createElement("div");
		$(right).css({width:"80%",height:"82%",float:"right"});
		$(menu).attr("inx",i);
		var addlink=$(document.createElement("a")).attr("href","javascript:;").html("添加").bind("click",function(){
			var inx=$(this).parent().attr("inx");
			appendNode(inx,"添加节点");
		});
		var editlink=$(document.createElement("a")).attr("href","javascript:;").html("修改").bind("click",function(){
			var inx=$(this).parent().attr("inx");
			appendNode(inx,"修改节点","edit");
		});
		var deletelink=$(document.createElement("a")).attr("href","javascript:;").html("删除").bind("click",function(){
			var inx=$(this).parent().attr("inx");
			var node=fuviewtrees[inx].getSelected();
			if(node){
				fuviewtreesitemdelete(fuviewtrees[inx].data,node.data.treedataindex);
				fuviewtrees[inx].remove(node.target);
			}else{
				$.ligerDialog.error("请选择树节点");
			}
		});
		var savelink=$(document.createElement("a")).attr("href","javascript:;").html("保存").bind("click",function(){
			var inx=$(this).parent().attr("inx");
			var obj=fuviewtrees[inx].getData();
			var json=copypra(obj,"");
			
			var form_id=gethrefpar("modelId");
			if(form_id==null){
				$.ligerDialog.error('保存失败：页面ID不正确');
				return;
			}
			var formtype=$(opener.document).find('input:radio[name="formtype"]:checked').val();
			if(formtype==null){
				$.ligerDialog.error('保存失败：页面类别不正确');
				return;
			}
			var formeditor=tmp=regular_str(window.opener.a54ab047bb2d228f1f39aa360db5e3eea,fuviewtrees[inx].options.srcName,encodeURI(json));
			$.ajax({
				type: 'POST',
				url: '/s/tp/wwwroot/index.php?s=/demo/formdesign/',
				data: {form_id: form_id,'design_content':formeditor,'formtype':formtype},
				dataType : 'json',
				success: function(data) {
					if(data.result==1){
						$.ligerDialog.success('保存成功');
					}else{
					 	$.ligerDialog.error('保存失败：'+data.message);
					}
				},error: function(xhr, stat, e) { $.ligerDialog.error("保存失败：找不到地址！" ); }
			});
					
		});
		$(menu).append("&nbsp;");$(menu).append(addlink);
		$(menu).append("&nbsp;");$(menu).append(editlink);
		$(menu).append("&nbsp;");$(menu).append(deletelink);
		$(menu).append("&nbsp;");$(menu).append(savelink);
		
		var iframe=document.createElement("iframe");
		$(iframe).css({width:"100%",height:"100%",border:0});
		var ul=document.createElement("ul");
		$(ul).css({"float":"left","width":"auto","height":"auto","overflow":"hidden"});
		fuviewtrees[i]=$(ul).ligerTree({checkbox: false,target:iframe,srcName:srcName,
			data:JSON.parse(listtext),
			onSelect:function(node){
				if(node.data.children==null)
					$(this.options.target).attr("src",""+node.data.url);
			}
		});
		$(divbox).append(menu);
		$(insidebox).append(ul);
		$(right).append(iframe);
		$(insidebox).append(right);
		$(divbox).append(insidebox);
		$(free.eq(i)).before(divbox);
		$(free.eq(i)).remove();
	}
	var temp='<div id="parid" style="display:none;">';
	temp+='<p>文本：<input type="text" placeholder="请输入节点文本..." id="inputtextid"></p>';
	temp+='<p>地址：<input type="text" placeholder="请输入连接地址..." id="inputlinkid" value="/s/listform.php?fieldtype=key&key="></p>';
	temp+='</div>';
	$(document.body).append(temp);

});
function fuviewtreesitemdelete(obj,id){
	if(obj==null)return;
	var i=0;
	for(i=0;i<obj.length;i++){
		if(obj[i]!=null){
			if(typeof(obj[i])=="object"){
				if(typeof(obj[i].treedataindex)!="undefined"){
					if(obj[i].treedataindex==id){
						obj.splice(i,1);
						break;
					}
				}
				if(typeof(obj[i].children)!="undefined"){
					fuviewtreesitemdelete(obj[i].children,id);
				}
			}
		}
	}
}

function regular_str(str,name,rep){
	var re=eval('/(name="'+name+'".*?listtext="[^"]*")/');
	var arr=re.exec(str);
	var str2=arr[0];
	str2=str2.replace(eval('/name="'+name+'".*?listtext="/'),"");
	str2=str2.replace(/"/,"");
	str2=arr[0].replace(str2,rep);
	str=str.replace(arr[0],str2);
	return str;
}

function gethrefpar(name){

   var url=opener.document.location+"";
   var i=0;
   if(url.indexOf("?")!= -1){
      var str=url.substr(url.indexOf("?")+1);
      strs=str.split("&");
      for(i=0;i<strs.length;i++){
		  if(strs[i].split("=")[0]==name){
		  	return unescape(strs[i].split("=")[1]);
		  }
      }
   }
   return null;
}
function copypra(src,desc){
	var i=0;
	if(src==null){
		desc+='null';
		return desc;
	}
	desc+='[';var nexti=0;
	for(i=0;i<src.length;i++){
		var inx=0,ischildren=false;
		for(xx in src[i]){
			if(xx=="children"){
				ischildren=true;
				if(inx==0){
					if(nexti>0)desc+=','
					desc+='{';
				}
				if(inx>0)desc+=',';
				desc+='"children":';
				var redesc=copypra(src[i][xx],'');
				if(redesc=='[]')redesc='null';
				desc+=redesc;
				inx++;
			}else if(xx=="text" || xx=="url"){
				if(inx==0){
					if(nexti>0)desc+=','
					desc+='{';
				}
				if(inx>0)desc+=',';
				desc+='"'+xx+'":"'+src[i][xx]+'"';
				inx++;
			}
		}
		if(inx>0){
			if(ischildren==false){
				if(inx>0)desc+=',';
				desc+='"children":null';
			}
			desc+="}";
			nexti++;
		}
	}
	desc+=']';
	return desc;
}
function appendNode(inx,title,type){
	var selnode=fuviewtrees[inx].getSelected();
	$("#inputtextid").val('');
	$("#inputlinkid").val('/s/listform.php?fieldtype=key&key=');
	if(type=="edit"){
		if(selnode==null){
			$.ligerDialog.error("请选择树节点");
			return;
		}
		$("#inputtextid").val(selnode.data.text.replace("amp;",""));
		$("#inputlinkid").val(selnode.data.url.replace("amp;",""));
	}
	m=$.ligerDialog.open({
	target:$("#parid"),
	title:title,
	buttons:[{
		text:"确定",onclick:function(){
			m.hide();
			var txt=$("#inputtextid").val();
			if(txt==""){
				$.ligerDialog.error("请输入节点文本");
				return;
			}
			var lnk=$("#inputlinkid").val();
			if(lnk==""){
				$.ligerDialog.error("请输入连接地址");
				return;
			}
			var nodes = [];
			nodes.push({text:txt,url:lnk});
			if(type=="edit"){
				selnode.data.text=txt;
				selnode.data.url=lnk;
				fuviewtrees[inx].update(selnode.target,nodes);
				$(selnode.target).find("span").html(txt);
			}else{
				if(selnode)
					fuviewtrees[inx].append(selnode.target,nodes);
				else
					fuviewtrees[inx].append(null,nodes);
			}
			
		}
	},{text:"取消",onclick:function(){m.hide();}}]});
}