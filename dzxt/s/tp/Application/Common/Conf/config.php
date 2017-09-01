<?php
require_once($_SERVER["DOCUMENT_ROOT"]."/s/inc/db.php");
return array(
	//'配置项'=>'配置值'
    /* 数据库配置 */
    'DB_TYPE'   => 'mysql', // 数据库类型
    'DB_HOST'   => $host, // 服务器地址
    'DB_NAME'   => $database, // 数据库名
    'DB_USER'   => $user, // 用户名 
	'DB_PWD'    => $password,  // 密码
    //'DB_PWD'    => 'RVBm7uzZQZZtKaxz',  // 密码
    'DB_PORT'   => $db_port, // 端口
    'DB_PREFIX' => 'ht_', // 数据库表前缀
    
    'DEFAULT_CHARSET' => 'utf-8', // 默认输出编码
    'SESSION_AUTO_START'    =>  true,    // 是否自动开启Session
    'TMPL_STRIP_SPACE'          => true,//debug时为false   去除html空白
    'DEFAULT_FILTER'        =>  'htmlspecialchars', // 默认参数过滤方法 用于I函数...  
    'DEFAULT_THEME' =>  'Default',  // 默认模板主题名称
    'DEFAULT_MODULE'     =>    'Home',
    'MODULE_ALLOW_LIST'  => array('Home','Flow','Admin','Power'),//可访问的模块
    'MODULE_DENY_LIST'   => array('Common'),//不可访问
    'VAR_SESSION_ID'=>'PHPSESSID',//swfupload 上传时，可以设置
    'SHOW_PAGE_TRACE'   => false,
    'DATA_CACHE_TIME'=>60,
    'URL_MODEL'=>3,
    /* 非官方 */
    'CSS_JS_VS'=>'2023',//版本号   用来刷新 js css 等缓存
    'FORM_PLUGINS'=>array(//表单控件类型  流程步骤属性设置中要用到
        'text'=>'文本框',
        'textarea'=>'多行文本',
        'select'=>'下拉菜单',
        'radios'=>'单选框',
        'checkboxs'=>'复选框',
        'macros'=>'宏控件',
        'progressbar'=>'进度条',
        'qrcode'=>'二维码',
        'listctrl'=>'列表控件',
    ),
);
