//ABCDEFGHIJKLMNOPQRSTUVWXYZ IV=92
Array.prototype.max=function(){return Math.max.apply({},this);}
Array.prototype.min=function(){return Math.min.apply({},this);}
var AZS_Arr="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",");
function GetAZI(name)
{
	for(var i=0;i<AZS_Arr.length;i++)if(AZS_Arr[i]==name)return i;
	return -1;
}
function azTo10(name)
{
	if(name=="")return  null;
	var i=0;l=name.length,rv=0;
	for(i=0;i<l;i++)
	{
		var vm=GetAZI(name.substring(i,i+1).toUpperCase())*1;
		if(vm<0)return null;
		vm+=(l-i-1)*26;
		rv+=vm;
	}
	return rv;
}
function ToAz(value)
{
	if(value<0)return null;
	var res="";
	for(;;)
	{
		27-26;
		A=0
		AA=0+26
		AC=0+26+2
		AAAA=0+26+26*2+26*3
		52
		
		var mod=parseInt(value%26);
		value-=26;
		res+=AZS_Arr[mod];
		if(value<1)break;
	}
	return res;
}
function rows(inx,isnan,main,obj,expid)
{
	obj.main_error_msg="";
	if(isNaN(inx)){obj.main_error_msg="行号应该为数字";return null;}
	var td=$("."+obj.expid+" .tablebox table tr").eq(inx).find("td");
	var arr=Array();arrinx=0;
	for(i=1;i<td.length;i++)
	{
		var inx=td.eq(i).attr("id");
		var vs=0;try{vs=main.data["mainid"+inx].dis;}catch(ex){obj.main_error_msg=ex;return null;}
		arr[arrinx]=vs=isNaN(vs)?0:vs*1;
		if(isnan)try{arr[arrinx]=main.data["mainid"+inx].dis;}catch(ex){}
		arrinx++;
	}
	return arr;
}

function cols(inx,isnan,main,obj)
{
	obj.main_error_msg="";
	var reg=/^[a-zA-Z]+$/;
	if(!reg.test(inx)){obj.main_error_msg="列号不正确";return null;}
	var row=azTo10(inx)*1+1;
	var arr=Array();arrinx=0;
	if(row==null){alert(msg+" 列号错误,应该如:A或者B");return null;}
	var tr=$("."+obj.expid+" .tablebox table tr");
	for(i=1;i<tr.length;i++)
	{
		
		var inx=tr.eq(i).find("td").eq(row).attr("id");
		var vs=0;try{vs=main.data["mainid"+inx].dis;}catch(ex){obj.main_error_msg=ex;return null;}
		arr[arrinx]=vs=isNaN(vs)?0:vs*1;
		if(isnan)try{arr[arrinx]=main.data["mainid"+inx].dis;}catch(ex){}
		arrinx++;
	}
	return arr;
}

function runcmd(cmd,tmpvalue,main,obj)
{
	var par=Array();
	if(cmd=="IF")
	{
		var arr=tmpvalue.split(",");//参数当中可能是方法，那么用,就不合适了
		if(arr==null){alert("IF表达式错误,应该类似：IF(条件,真的结果,假的结果)");return tmpvalue;}
		if(arr.length!=3){alert("IF表达式错误,应该类似：IF(条件,真的结果,假的结果)");return tmpvalue;}
		
		par[0]=main.get(arr[0],obj);if(par[0]==null){alert("IF表达式错误:IF(#NAME?,"+arr[1]+","+arr[2]+")");return tmpvalue;}
		
		if(par[0]!=0){isrun=true;tmpvalue=arr[1];}else{isrun=true;tmpvalue=arr[2];}
		return tmpvalue;
	}
	if(cmd=="SUM" || cmd=="COUNT" || cmd=="MIN" || cmd=="MAX" || cmd=="AVERAGE")
	{
		var arr=null;
		if(!isNaN(tmpvalue))arr=rows(tmpvalue,false,main,obj);
		else if(isNaN(tmpvalue))arr=cols(tmpvalue,false,main,obj);
	
		if(arr==null){alert("error:"+obj.main_error_msg);return tmpvalue;}
		var sumvalue=0;
		if(cmd=="SUM")
		{
			for(i=0;i<arr.length;i++)sumvalue+=arr[i]*1;
			tmpvalue=sumvalue;
		}
		if(cmd=="COUNT")tmpvalue=arr.length;
		if(cmd=="MIN"){tmpvalue=arr.min();}
		if(cmd=="MAX"){tmpvalue=arr.max();}
		if(cmd=="AVERAGE")
		{
			for(i=0;i<arr.length;i++)sumvalue+=arr[i]*1;
			tmpvalue=sumvalue/(arr.length);
		}
		return tmpvalue;
	}
	if(cmd=="COLUMN")return azTo10(tmpvalue);
	if(cmd=="MODE" || cmd=="NODE")
	{
		var arr=null,counts=Array();
		if(!isNaN(tmpvalue))arr=rows(tmpvalue,true,main,obj);
		else if(isNaN(tmpvalue))arr=cols(tmpvalue,true,main,obj);
	
		if(arr==null){alert("error:"+obj.main_error_msg);return tmpvalue;}

		for(i=0;i<arr.length;i++)
		{
			if(counts[""+arr[i]]==null)counts[""+arr[i]]=1;
			else counts[""+arr[i]]++;
		}
		if(cmd=="MODE")
		{
			var _max=0;_max_value="";
			for(me in counts)
			{
				if(me=="max")continue;
				if(me=="min")continue;
				if(counts[me]<_max)continue;
				_max_value=me;
				_max=counts[me];
			}
		}
		if(cmd=="NODE")
		{
			var _max=9999999999;_max_value="";
			for(me in counts)
			{
				if(me=="max")continue;
				if(me=="min")continue;
				if(counts[me]>_max)continue;
				_max_value=me;
				_max=counts[me];
			}
		}
		return '"'+_max_value+'"';
	}
	tmpvalue="#NAME?";
	return tmpvalue;
}




