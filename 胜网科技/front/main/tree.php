<?php require_once("../../s/function/check_session.php");?>
<!DOCTYPE html>
<html>
<head>
    <title>胜网</title>
	<meta charset="utf-8" />
   <link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
   <link href="/resource/part/ligerlib/ligerUI/skins/ligerui-icons.css" rel="stylesheet" type="text/css" />
    <script src="/resource/part/ligerlib/jquery/jquery-1.5.2.min.js" type="text/javascript"></script>
    <script src="/resource/part/ligerlib/ligerUI/js/ligerui.all.js" type="text/javascript"></script> 
	<script src="/resource/part/ligerlib/jquery.cookie.js" type="text/javascript"></script>
<script src="/resource/part/ligerlib/json2.js"></script>	
        <script type="text/javascript">
            $(function() {
						//树					  
						<?php
						
						include_once"../../s/inc/conn.php";
						include_once"../../s/function/public.php";
						$result=getfreepower("",0,implode(',',$_SESSION['uroles']));
						?>
						var data=eval('['+decodeURIComponent('<?php  echo urlencode($result[1]);?>')+']');
					    
					   $("#tissue_nav_tree").ligerTree({
										data:data,
										checkbox: false,
										slide: false,
										nodeWidth: 120,                    
										render: function (item)
										{                        
											 return item.values[0].value;
										 },
										 isLeaf:function(item){
											return item.isLeaf;
										 },
										 isExpand: 2,
										 onContextmenu: function (node, e)
							             { 
							                if(node.data.isLeaf)return false;
											rmenu_id = node.data.id;
											rmenu_ti=node.data.values[0].value;
							                rmenu.show({ top: e.pageY, left: e.pageX });
							                return false;
							             },
										 onselect: function (node)
										{							
											var tabid = $(node.target).attr("tabid");
											if (!tabid)
											{
												tabid = new Date().getTime();
												$(node.target).attr("tabid", tabid)
											}
                                            if (node.data.isLeaf)
                                            {
												if(node.data.form_type==1)
													window.location.href="/s/listform.php?formid="+ node.data.id;
                                                	
												else if(node.data.type==2)
												{
													window.location.href=node.data.content;
													
												}else
													window.location.href="/s/readtemplate.php?formid="+ node.data.id;
                                                	
                                            }
                                            else {  
												window.location.href="/upload/document/filebox38668671.php?op=home&root="+ node.data.id+"&folder="+node.data.id;
												
												
                                            }

										}
									});

               //tab = liger.get("framecenter");
			   /*tab=$("#framecenter").ligerTab({onAfterSelectTabItem: function (tabid)
					{
						cu_tabid=tabid;						
					} 
				});*/
                accordion = liger.get("accordion1");
                tree = liger.get("tissue_nav_tree");
                $("#pageloading").hide();
                css_init();
                pages_init();
            });
            function f_heightChanged(options) {
                if (tab)
                    tab.addHeight(options.diff);
                if (accordion && options.middleHeight - 24 > 0)
                    accordion.setHeight(options.middleHeight - 24);
            }
     </script> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head>
<body >  
    <ul id="tissue_nav_tree" style="margin-top:3px;"></ul>                        
</body>
</html>