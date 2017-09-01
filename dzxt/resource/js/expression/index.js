//focus blur
//当被删除时就显示#REF!
//如何选中
//如何选中一个如何删除别的选择
//如何做index
//删除修改后，如何更改INDEX
//每个格都是唯一的ID，删除就没有了，只是显示重新更改下，如B列删除了，C列上拉过来，显示时，所选对像C但显示为B列
//this.parentNode.parentNode.rowIndex
//this.parentNode.cellIndex
//如何知道是否输入了格号？
//当值是：A0-9
//或者是否：B0-9
//要独立出能产生array的object

//expid0

function itemExp(expid)
{
	this.expid=expid;
	this.main_error_msg="";
	this.main_name="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,AB,AC,".split(",");
	this.main_obj=null;
	this.main_index=0;
	this.main={
	data:{val:"",dis:""},
	init:function(r,c,obj)
	{
		var i1=0,i2=0,outhtml="";
		obj.main.row=r*1;
		obj.main.col=c*1;
		obj.main.data=Array(obj.main.row);
		
		for(i1=0;i1<obj.main.row;i1++)obj.main.data[i1]=Array(obj.main.col);
		for(i1=0;i1<1;i1++)
		{
			outhtml+="<tr align=\"center\" class=\"rowtop seltop\" style=\"height:25px\">";
			for(i2=0;i2<obj.main.col+1;i2++)
			{
				outhtml+="<td>";
				if(i2>0)outhtml+=obj.main_name[i2-1];
				outhtml+="</td>";
			}
			outhtml+="</tr>";
		}
		for(i1=0;i1<obj.main.row;i1++)
		{
			outhtml+="<tr align=\"center\" inx=\""+i1+"\">";
			for(i2=0;i2<obj.main.col+1;i2++)
			{
				
				outhtml+="<td class=\"td";
				if(i2==0)outhtml+=" rowtop\" style=\"width:50px\" id=\""+obj.main_index+"\"><div>"+(i1+1)+"</div></td>";
				else outhtml+=" seltd\" id=\""+obj.main_index+"\"><div  class=\"ellipsis\">&nbsp;</div></td>";
				obj.main_index++;
				obj.main.data["mainid"+obj.main_index]=Array({"val":"","dis":9});
				obj.main.data["mainid"+obj.main_index].val="";
				obj.main.data["mainid"+obj.main_index].dis="";
			}
			outhtml+="</tr>";
		}
		var objtt=$("."+obj.expid+" .tablebox table").html(outhtml).find(".seltd");
		objtt.bind("click", function()
		{
			$("."+obj.expid+" .tablebox table").find("div").css({"border":"0px"});
			$("."+obj.expid+" .seltop td").css({"background":"#EFEBDE"});
			var i=0;l=$("."+obj.expid+" .tablebox table tr").length;
			for(i=0;i<l;i++)
			$("."+obj.expid+" .tablebox table tr").eq(i).find("td").eq(0).css({"background":"#EFEBDE"});
			var me=$(this);obj.main_obj=me;
			var row=$(this).index();
			var col=$(this).parent().index();

			$("."+obj.expid+" #m1").html(obj.main_name[row-1]+col);
			var index=$(this).attr("id");
			$("."+obj.expid+" #m3").val(obj.main.data["mainid"+index].val);
			$(this).find("div").css({"border":"1px solid #999999"});
			
			$("."+obj.expid+" .seltop td").eq(row).css({"background":"#eeaa77"});
			$("."+obj.expid+" .tablebox table tr").eq(col).find("td").eq(0).css({"background":"#eeaa77"});
			$("."+obj.expid+" #m3").focus();
		});
		obj.main_obj=$("."+obj.expid+" .tablebox table tr").eq(1).find("td").eq(1)
		obj.main_obj.find("div").css({"border":"1px solid #999999"});
		$("."+obj.expid+" .seltop td").eq(1).css({"background":"#eeaa77"});
		$("."+obj.expid+" .tablebox table tr").eq(1).find("td").eq(0).css({"background":"#eeaa77"});
		$("."+obj.expid+" #m3").focus();
	
		$("."+obj.expid+" #m3").bind("keyup", function(e)
		{
			if(13!=e.keyCode)return;
			if(obj.main_obj==null){alert("请选择一个格子");return;}
			var index=obj.main_obj.attr("id");
			obj.main.data["mainid"+index].val=$(this).val();
			var tmpvalue=obj.main.data["mainid"+index].val;
			var value=obj.main.re(tmpvalue,obj);
			obj.main.data["mainid"+index].dis=value;
			if(obj.main_obj!=null)obj.main_obj.find("div").html(value);
		});
		$("."+obj.expid+" #m2").bind("change", function()
		{
			var val=$(this).val();
			if(val=="IF")$("."+obj.expid+" #m3").val("=IF(条件,条件为真时的结果,条件为假时的结果)");
			if(val=="SUM")$("."+obj.expid+" #m3").val("=SUM(行号或列号)");
			if(val=="COUNT")$("."+obj.expid+" #m3").val("=COUNT(行号或列号)");
			if(val=="MAX")$("."+obj.expid+" #m3").val("=MAX(行号或列号)");
			if(val=="MIN")$("."+obj.expid+" #m3").val("=MIN(行号或列号)");
			if(val=="AVERAGE")$("."+obj.expid+" #m3").val("=AVERAGE(行号或列号)");
			if(val=="COLUMN")$("."+obj.expid+" #m3").val("=COLUMN(列号)");
			if(val=="MODE")$("."+obj.expid+" #m3").val("=MODE(行号或列号)");
			if(val=="NODE")$("."+obj.expid+" #m3").val("=NODE(行号或列号)");
			$(this).val("");
		});

	},
	//如果引用了格
	get:function(name,obj)
	{
		//有引用格子表达式=IF((A1+0),1,(A1^33)+(1))
		//name="=IF((A1323-333),1,(A1^33)+(1))";
		var vars=Array();
		for(;;)
		{
			var reg=/[a-zA-Z]+[0-9]+/;
			name=""+name;
			var na=name.replace(reg,"{replace\nname}");
			if(na==name)break;
			var arr=na.split("{replace\nname}");
			if(arr==null)return null;
			
			var cmd=name.replace(arr[0],"");
			cmd=cmd.replace(arr[1],"");
			
	
			var reg2=/^[A-Za-z]+/;
			var rightname=cmd.replace(reg2,"");
			var leftname=cmd.replace(rightname,"");
			var lv="";
			var col=(azTo10(leftname)*1)+1;
			if(col==null)lv="#NAME?";
			else
			{
				var row=(rightname*1);
				if(row==null)lv="#NAME?";
				else
				{
					var meinx=$("."+obj.expid+" .tablebox table tr").eq(row).find("td").eq(col).attr("id");
					if(meinx==null)lv="#NAME?";
					else
					{
						lv=this.data["mainid"+meinx].dis;
						if(lv==null)lv="#NAME?";
						//当如果是字符串
						if(true==isNaN(lv))lv='"'+lv+'"';
						vars[cmd]=lv;
						//因为字符串里有可能有引用格子，不能立即放到name里
						lv="\n"+leftname+"\r"+rightname+"\n";
					}
				}
			}
			name=arr[0]+lv+arr[1];
		}
		for(var cmd in vars)
		{
			var reg3=/^[A-Za-z]+/;
			var rightname3=cmd.replace(reg3,"");
			var leftname3=cmd.replace(rightname,"");
			
			name=name.replace("\n"+leftname+"\r"+rightname+"\n",vars[cmd]);
		}
		return name;
	},
	//返回一个表达式的值
	re:function(tmpvalue,obj)
	{
		var value=tmpvalue+"";
		var isrun=true;
		for(;;)
		{
			if(tmpvalue=="")break;
			if(tmpvalue.substring(0,1)!="=")break;
			tmpvalue=tmpvalue.substring(1,tmpvalue.length);
			
			var pos=tmpvalue.indexOf("(");
			var par=Array();
			for(;;)
			{
				//有二个字符以上
				if(pos<1)break;
				var cmd=tmpvalue.substring(0,pos).toUpperCase();
				tmpvalue=tmpvalue.substring(pos+1,tmpvalue.length);
				if(tmpvalue.substring(tmpvalue.length-1,tmpvalue.length)!=")"){tmpvalue="#NAME?";break;}
				tmpvalue=tmpvalue.substring(0,tmpvalue.length-1);
				if(tmpvalue==""){alert("表达式出错");break;}
				if(tmpvalue=='""'){alert("表达式出错");break;}
				tmpvalue=runcmd(cmd,tmpvalue,this,obj);
				break;
			}
			tmpvalue=this.get(tmpvalue,obj);
			
			if(isrun)
			try
			{
				value=eval(tmpvalue);
				
			}catch(ex){value="#NAME?";}
			else value=tmpvalue;
			break;
		}
		value=value==null?"":value;
		return value;
	}
	};
}
