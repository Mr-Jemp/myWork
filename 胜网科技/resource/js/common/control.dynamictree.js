$(function(){
	$.ajax({
		type: 'POST',
		url: '../../s/function/pageinfo.php',
		data: { action: "gettreedata" },
		success: function(data){
			data = eval('(' + data + ')');
			if(!data.IsSuccess)return;
			setDynamictreeData(data.tree);
		}
	});
});
function setDynamictreeData(data){
	var free=$(".dynamictree"),freel=free.length;
			
	for(i=0;i<freel;i++){
		var listtext='{"text":"第一节","children":[{"text":"1.节","children":[{"text":"2.节","children":null}]}]},{"text":"第二节","children":null}';
		
		var height=$(free.eq(i)).attr("orgminheight");
		var divbox=document.createElement("div");
		$(divbox).css({"width":"100%","height":height,"overflow":"hidden"});
		var rightbox=document.createElement("div");
		$(rightbox).css({"float":"left","width":"74%","height":"100%","overflow":"hidden"});
		var riframe=document.createElement("iframe");
		$(riframe).css({"width":"100%","height":"100%","border":"0"});
		$(rightbox).append(riframe);

		var ul=document.createElement("ul");
		$(ul).css({"float":"left","width":"auto","height":height,"overflow":"auto"});
		$(ul).ligerTree({checkbox: false,target:riframe,
			render: function (item)
			{
				return item.values[0].value;
			},
			isLeaf:function(item){
				return item.isLeaf;
			},
			data:JSON.parse('['+data+']'),
			onselect:function(node){

				if(node.data.isLeaf){
					if(node.data.form_type==1)
						this.options.target.src=encodeURI('/s/listform.php?formid=' + node.data.id);
					else if(node.data.type==2)
					{
						this.options.target.src=encodeURI(node.data.content);
					}else if(node.data.form_type==2)
					{
						this.options.target.src=encodeURI('/s/submitformitem.php?res=main&formid=' + node.data.id);
					}else
						this.options.target.src=encodeURI('/s/readtemplate.php?formid=' + node.data.id);
				}else{
					this.options.target.src=encodeURI('/upload/document/filebox38668671.php?op=home&root='+node.data.id+'&folder='+node.data.id);
				}
			}
		});
		$(divbox).append(ul);
		$(divbox).append(rightbox);
		$(free.eq(i)).before(divbox);
		$(free.eq(i)).remove();
	}
}
