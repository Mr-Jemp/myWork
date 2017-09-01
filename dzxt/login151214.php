<?php
session_start();
include_once 's/inc/conn.php';
$query=mysql_query("select * from `ht_setting`");
$web_setting=mysql_fetch_array($query);
function cn_substr_utf8($str, $length, $start=0)
{
	if(strlen($str) < $start+1)
	{
		return '';
	}
	preg_match_all("/./su", $str, $ar);
	$str = '';
	$tstr = '';	
	for($i=0; isset($ar[0][$i]); $i++)
	{
		if(strlen($tstr) < $start)
		{
			$tstr .= $ar[0][$i];
		}
		else
		{
			if(strlen($str) < $length + strlen($ar[0][$i]) )
			{
				$str .= $ar[0][$i];
			}
			else
			{
				break;
			}
		}
	}
	return $str;
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title><?php echo $web_setting['web_name']?></title>
    <script src="/resource/css/login/v2/js/swmovetit.js"></script>
    <script src="/resource/js/jQuery/jquery-1.9.1.js" type="text/javascript"></script>
    <script src="/resource/part/ligerlib/ligerUI/js/core/base.js" type="text/javascript"></script>
    <script src="/resource/part/ligerlib/ligerUI/js/plugins/ligerDialog.js" type="text/javascript"></script>
    <script src="/resource/js/common/login.js" type="text/javascript"></script>
    <script src="/resource/css/login/v2/js/jquery.cookie.js"></script>   
    <link href="/resource/part/ligerlib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="/resource/css/login/spublic.css">
    <link rel="stylesheet" type="text/css" href="/resource/css/login/v2/css/sw.css" />
   <!-- <link rel="stylesheet" href="/resource/css/login/bootstrap.css" />-->
    <link rel="stylesheet" href="/resource/css/login/v2/css/bootstrap.css" />
    <link rel="stylesheet" href="/resource/css/login/v2/css/style.css" />
    <script type="text/javascript">
        function goregisterPersonal() {
            location.href = "/reg.php";
        }
    </script>
<style type="text/css">
.newlist{
	width:930px;
	height:150px;
	margin:10px auto;
}
.newlist ul,.newlist li{
	margin:0px;
	padding:0px;
}
.divX
{
    z-index:500;
    line-height:20px;
    text-align:center;
    font-weight:bold;
    cursor:pointer;
    font-size:30px;
    color:white; 
    display: none;
}
.newlist ul li {
	width: 270px;
	float: left;
	line-height: 30px;
	padding-left:15px;
	height: 30px;
	overflow:hidden;
	list-style-type: none;
	background-image: url(resource/images/login/libg.gif);
	background-repeat: no-repeat;
	background-position: left center;
	padding-right: 15px;
}
.newlist span{
	color:#cccccc;
	margin:0px;
	padding:0px;
	float:right;
}
    </style>
 </head>
    <body>   
<div class="headwrap">
      <div class="headcon">
    <div class="hlogo"><a href="./index.htm"><img src="/resource/images/login/logo.png" /></a></div>
    <div class="loginwrap">
          <?php
		if ($_SESSION['username']=="")
		{
		?>
          <form action="?" method="post" name="nlogin" id="nlogin">
          <div class="logincon">
        <div class="loginbox">
            <div class="loginboxcon">
            <div class="loginboxtit">用户：</div>
            <input type="text" name="username" id="username" class="logininpujt" />
          </div>
            </div>
        <div class="loginbox">
              <div class="loginboxcon">
            <div class="loginboxtit">密码：</div>
            <input type="password" name="password" id="passwordid" class="logininpujt" />
          </div>
            </div>
        <div class="loginbtn"> <span><a href="#" id="loginButton">登陆</a></span>&nbsp;&nbsp;|&nbsp;&nbsp; <span><a href="#" onClick="goregisterPersonal()">注册</a></span> </div>
      </div>
      </form>
          <?php
		}
		else {
			?>
          <label>当前登录用户：<?php echo $_SESSION['username']; ?>&nbsp;&nbsp;</label>
          <a href="/front/main/mainpage.php" class="l-link2">进入系统</a> <span class="space">|</span> <a href="/s/login/loginout.php"  class="l-link2">退出系统</a>
          <?php
		}
			?>
        </div>
  </div>
    </div>
<!--新内容区开始-->
<div id="wrap">
    <div id="main" class="clearfix">         <!-- 网站头部导航 --> 
    <div class="container pdt15">        
        <div class="row">
            <!--<div class="story">
                <div class="thumbnail">
                        <a href="http://fenlei.goodhead.cn/" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/1.png" alt="..." /></a>
                </div>
            </div>-->
            <div class="story">
                <div class="thumbnail">
                        <a href="http://hg.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/2.png" alt="..." /></a>
                </div>
            </div>
            <div class="story">
                <div class="thumbnail">
                        <a href="http://ny.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/3.png" alt="..." /></a>
                </div>
            </div>
            <div class="story">
                <div class="thumbnail">
                        <a href="http://jiaoyu.goodhead.cn/web/app.php" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/mrmf.jpg" alt="..." /></a>
                </div>
            </div>
           <!-- <div class="story">
                <div class="thumbnail">
                        <a href="http://menghu.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/5.png" alt="..." /></a>
                </div>
            </div>
            <div class="story">
                <div class="thumbnail">
                        <a href="http://huangye.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/6.png" alt="..." /></a>
                </div>
            </div>
            <div class="story">
                <div class="thumbnail">
                        <a href="http://xinwen.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/7.png" alt="..." /></a>
                </div>
            </div>
            <div class="story">
                <div class="thumbnail">
                        <a href="http://rencai.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/8.png" alt="..." /></a>
                </div>
            </div>
            <div class="story">
                <div class="thumbnail">
                        <a href="http://boke.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/9.png" alt="..." /></a>
                </div>
            </div>
            <div class="story">
                <div class="thumbnail">
                        <a href="http://shangcheng.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/10.png" alt="..." /></a>
                </div>
            </div>
            <div class="story">
                <div class="thumbnail">
                        <a href="http://ucenter.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/11.png" alt="..." /></a>
                </div>
            </div>
            <div class="story">
                <div class="thumbnail">
                        <a href="http://jiaoyu.goodhead.cn/web/app.php" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/12.png" alt="..." /></a>
                </div>
            </div>
            <div class="story">
                <div class="thumbnail">
                        <a href="http://guanggao.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/13.png" alt="..." /></a>
                </div>
            </div>
            <div class="story">
                <div class="thumbnail">
                        <a href="http://bbs.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/14.png" alt="..." /></a>
                </div>
            </div>
            <div class="story">
                <div class="thumbnail">
                        <a href="http://luyou.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/15.png" alt="..." /></a>
                </div>
            </div>
            <div class="story">
                <div class="thumbnail">
                        <a href="http://weixin.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/16.png" alt="..." /></a>
                </div>
            </div>
         
            <div class="story">
                <div class="thumbnail">
                        <a href="http://jiankang.goodhead.cn/index.php?upcache=1" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/18.png" alt="..." /></a>
                </div>
            </div>
            <div class="story">
                <div class="thumbnail">
                        <a href="http://tuangou.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/19.png" alt="..." /></a>
                </div>
            </div>
      
          
            <div class="story">
                <div class="thumbnail">
                        <a href="http://zhongchou.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/22.png" alt="..." /></a>
                </div>
            </div>
            -->
            
           
            <div class="story">
                <div class="thumbnail">
                        <a href="http://qy.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/26.png" alt="..." /></a>
                </div>
            </div>
            
           
			<div class="story">
				<div class="thumbnail"><a href="http://goodhead.cn:5080/shipinhuiyi/" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/29.png" alt="" /></a></div></div>
			<div class="story">
                <div class="thumbnail">
                        <a href="http://wuliu.goodhead.cn" target="_blank"><img class="lazy" src="/resource/css/login/v2/images/wl.png" alt="..." /></a>
                </div>
            </div>
        </div>
    </div>
        
    </div>
    <script type="text/javascript">
        $(function() {
            $(".filter .more a").click(function() {
                if ($(this).hasClass('active')) {
                    $(this).parents("dl").find(".words").removeClass("open");
                    $(this).removeClass('active');
                } else {
                    $(this).parents("dl").find(".words").addClass("open");
                    $(this).addClass('active');
                }
            });
        });
    </script>
</div>

<!--新内容区结束--> 
<div class="newlist">
<ul>
<li><a href="http://rss.feedsportal.com/c/33390/f/640226/p/1/s/16dcd60f/sc/3/l/0Ltech0B1630N0C130C0A7280C0A90C94S4595Q0A0A0A915BD0Bhtml/story01.htm" title="关停超过一周 苹果被黑事故过程回顾" target="_blank">关停超过一周 苹果被黑</a><span>&nbsp;2015/09/15</span></li><li><a href="http://rss.feedsportal.com/c/33390/f/640226/p/1/s/7b13818/sc/3/l/0Ltech0B1630N0Cspecial0C20A13chinajoy0C/story01.htm" title="Chinajoy：端游巨头眼中的移动游戏" target="_blank">Chinajoy：端游巨头眼中的</a><span>&nbsp;2015/09/15</span></li><li><a href="http://rss.feedsportal.com/c/33390/f/640226/p/1/s/22695010/sc/3/l/0Ltech0B1630N0C130C0A7230C0A10C94EAIUC80A0A0A915BF0Bhtml/story01.htm" title="Struts2漏洞解读:或波及国内多大网站" target="_blank">Struts2漏洞解读:或波及国</a><span>&nbsp;2015/09/15</span></li><li><a href="http://rss.feedsportal.com/c/33390/f/640226/p/1/s/7e4e68f1/sc/3/l/0Ltech0B1630N0C130C0A7220C0A90C94CIU8AB0A0A0A947EG0Bhtml/story01.htm" title="苹果开发者网站被黑 或泄露部分信息" target="_blank">苹果开发者网站被黑 或</a><span>&nbsp;2015/09/15</span></li><li><a href="http://rss.feedsportal.com/c/33390/f/640226/p/1/s/238d3588/sc/3/l/0Ltech0B1630N0C130C0A720A0C0A90C947EKK7I0A0A0A915BF0Bhtml/story01.htm" title="搜狐回应搜狗卖身案：未确定任何交易" target="_blank">搜狐回应搜狗卖身案：</a><span>&nbsp;2015/09/15</span></li><li><a href="http://rss.feedsportal.com/c/33390/f/640226/p/1/s/3f51245c/sc/3/l/0Ltech0B1630N0C130C0A7190C10A0C944VRLH40A0A0A915BF0Bhtml/story01.htm" title="搜狐视频高层变动：张朝阳摆平内斗" target="_blank">搜狐视频高层变动：张</a><span>&nbsp;2015/09/15</span></li><li><a href="http://rss.feedsportal.com/c/33390/f/640226/p/1/s/22369fd5/sc/3/l/0Ltech0B1630N0C130C0A7180C190C943BTUSG0A0A0A915BE0Bhtml/story01.htm" title="诺基亚Q2净亏3亿美元" target="_blank">诺基亚Q2净亏3亿美元</a><span>&nbsp;2015/09/15</span></li><li><a href="http://rss.feedsportal.com/c/33390/f/640226/p/1/s/2c703c39/sc/3/l/0Ltech0B1630N0C130C0A7180C0A10C941E5ILR0A0A0A915BF0Bhtml/story01.htm" title="谷歌7月24日举行发布会 或推新版安卓" target="_blank">谷歌7月24日举行发布会</a><span>&nbsp;2015/09/15</span></li><li><a href="http://rss.feedsportal.com/c/33390/f/640226/p/1/s/65e14dd4/sc/3/l/0Ltech0B1630N0C130C0A7170C0A70C93VHSR5B0A0A0A947EG0Bhtml/story01.htm" title="朋友圈电商潜力初显：卖家月流水百万" target="_blank">朋友圈电商潜力初显：</a><span>&nbsp;2015/09/15</span></li><li><a href="http://rss.feedsportal.com/c/33390/f/640226/p/1/s/2ef0d778/sc/3/l/0Ltech0B1630N0C130C0A7160C0A0A0C93S747J40A0A0A915BF0Bhtml/story01.htm" title="打车APP洗牌前夜：摇摇招车资金紧缺" target="_blank">打车APP洗牌前夜：摇摇</a><span>&nbsp;2015/09/15</span></li><li><a href="http://rss.feedsportal.com/c/33390/f/640226/p/1/s/4f278ed5/sc/3/l/0Ltech0B1630N0C130C0A7150C210C93RRJCJO0A0A0A915BF0Bhtml/story01.htm" title="谷歌中国落寂了 刘允尽力了" target="_blank">谷歌中国落寂了 刘允尽</a><span>&nbsp;2015/09/15</span></li><li><a href="http://rss.feedsportal.com/c/33390/f/640226/p/1/s/5cbede48/sc/3/l/0Ltech0B1630N0Cspecial0Csogou0C/story01.htm" title="独家策划：小道消息下的搜狗卖身记" target="_blank">独家策划：小道消息下</a><span>&nbsp;2015/09/15</span></li>
<?php
/*$content = simplexml_load_file('http://tech.163.com/special/000944OI/headlines.xml');
$i=1;
foreach ($content->channel->item as $key => $value) {
	echo '<li><a href="'.$value->link.'" title="'.$value->title.'" target="_blank">'.cn_substr_utf8($value->title,27).'</a><span>&nbsp;'.date('Y/m/d',time($value->pubDate)).'</span></li>';
	if($i++>11)break;
}*/
?>
</ul>
</div>
<!--旧内容区-->
<div class="footwrap">
	<div class="footcon">
    	<ul>
        	<li><a href="aboutsw.html">关于我们</a></li>&nbsp;|
            <li><a href="#">产品案例</a></li>&nbsp;|
            <li><a href="#">联系我们</a></li>
            <li><a href="/mobile/" target="_parent">手机板</a></li>
        </ul>
    </div>
    <div class="footconcopyright">
    版权所有©2015 &nbsp;&nbsp; <?php echo $web_setting['company'];?>&nbsp;&nbsp;<a href="#"><?php echo $web_setting['beian'];?></a>
    </div>
</div>
</body>
</html>