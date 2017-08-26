<?php
// 本类由系统自动生成，仅供测试用途
namespace Home\Controller;
use \Common\functions;
class DemoController extends HomeController {
    
    protected function model()
    {
        if($this->_obj_model)
            return $this->_obj_model;
        return $this->_obj_model = D('form');
    }
    
   
    //后置操作方法    
    public function _after_add(){   
        if(IS_POST)
            $this->upcache(); 
    }
    //后置操作方法    
    public function _after_edit(){  
        if(IS_POST)
            $this->upcache(); 
    } 
    
    
    //更新缓存
    public function upcache()
    {
        S($this->_controller.'_pageone',null);
        return true;
    }
    public function del(){
		$this->cpower('page_delete','删除页面',true);
        $form_id = intval(I('post.form_id'));
        if($form_id>0){
            $where=array("pid"=>$form_id);
            if($one = $this->model()->where($where)->find()){
                echo '{"flag":0,"msg":"请先删除子节点，再重试!"}';
            }else{
                $where=array("id"=>$form_id);
                if($this->model()->where($where)->delete())
				{
                    M('power')->where(array('form_id'=>$form_id))->delete();
					echo '{"flag":1,"msg":"删除成功!"}';
					//删除权限
					//ht_power					
					
                }else{
                    echo '{"flag":0,"msg":"删除失败!"}';
                }
            }
        }else{
            echo '{"flag":0,"msg":"请选择删除节点，再重试!"}';
        }
    }
    public function index(){
        $map = array(
            'is_del'=>0,
        );
        $page='';
        $list = array();
        $cache = array();
		$count = $this->model()->where($map)->count('id');
       if(I('get.getform')=="ok"){
		  	$list = $this->model()->field('id,pid,form_name as text')->where($map)->order('id desc')->select();
          // $list=recursive($list);
           //echo "sfsdfl";exit;
           var_dump($list);
			//echo '[{"text": "页面设计", "children":'.json_encode($list).'}]';
			exit;
		   
		}else{
		
			if(empty($_GET) or $_GET['p']==1)//仅缓存第一页就好了
			{
				$cache = S($this->_controller.'_pageone');
			}
			if($cache)
			{
				$count = $cache['count'];
				$page = $cache['page'];
				$list = $cache['list'];
			}else
			{				
				if ($count > 0)
				{
					import("@.Org.Util.Page");
					$p = new \Page($count, 5);
					//分页跳转的时候保证查询条件
					foreach ($_GET as $key => $val) {
						if (!is_array($val)) {
							$p->parameter .= $key.'=' . urlencode($val) . '&';
						}
					}
					 //分页显示
					$page = $p->show();
					
					$list = $this->model()->field('id,form_name,form_desc,fields,updatetime,dateline')->where($map)->order('id desc')->limit($p->firstRow . ',' . $p->listRows)->select();
					if(empty($_GET))
					{
						S($this->_controller.'_pageone',array(
							'count'=>$count,
							'page'=>$page,
							'list'=>$list,
						));
					}
				}
			}
			$this->assign('page', $page);
			$this->assign('list', $list);        
			$this->display();
		}
    }
    public function shuxing(){
		$form_id = intval(I('get.form_id'));		
		$one = $this->model()->field('id,form_name,form_desc,updatetime,dateline')->where('id='.$form_id)->find();
		echo '<style>
        dl,dt,dd{
        margin: 0px;
        padding: 0px;
        }
		.shuxing dl{
			width:100%;
			height:30px;
			text-align: right;
		}    
		.shuxing dt{
			float:left;
			height:30px;
			line-height:30px;
			width:85px;
			font-weight:bold;
		}
		.shuxing dd{
			float:left;
			height:30px;
			line-height:30px;
			text-align: left;
		}
    </style>';
		echo '<div class="shuxing"><dl><dt>ID：</dt><dd>'.$one['id'].'</dd></dl>';
		echo '<dl><dt>表单名称：</dt><dd>'.$one['form_name'].'</dd></dl>';
		echo '<dl><dt>添加者：</dt><dd>暂无</dd></dl>';
		echo '<dl><dt>表单描述：</dt><dd>'.$one['form_desc'].'</dd></dl>';
		echo '<dl><dt>添加时间：</dt><dd>'.$one['dateline'].'</dd></dl>';
		echo '<dl><dt>最后修改时间：</dt><dd>'.$one['updatetime'].'</dd></dl></div>';		
	}
    public function add()
    {
        self::edit();
    }
    public function edit()
    {
        $form_id = intval(I('get.form_id'));
        if(I('post.form_id'))$form_id=intval(I('post.form_id'));
        $one = array();
        if($form_id<=0)
        {
            $this->cpower('page_add','添加节点',true);
			$form_id = intval(I('post.form_id'));
        }
        if($form_id>0)
        {
            $this->cpower('page_modify',' 修改节点',true);
			$map = array(
                'id'=>$form_id,
                'is_del'=>0,
            );			
            $one = $this->model()->where($map)->find();
            if(!$one)
            {
                $this->error('未找到表单数据，请返回重试!');
            }
        
        }
        if(IS_GET)
        {
            $this->assign('one',$one);
            $this->display('edit');
        }
         else
        {
            $form_name = trim(I('post.form_name',''));
            if(empty($form_name))
            {
                $this->error('请填写表单名称!',U('/'.$this->_controller.'/add'));
            }
            $data = array(
                'form_name'=>$form_name,
                'form_desc'=>trim(I('post.form_desc','')),
                'updatetime'=>time(),
                'type'=>I('post.ftype')
            );
            if($form_id>0)
            {
                if($this->model()->where(array('id'=>$form_id))->save($data))
                {
                    echo "1";
                   // $this->success('编辑成功，现在去设计表单。',U('/'.$this->_controller.'/formdesign/form_id/'.$form_id));
                }else
                {
                    $this->error('编辑失败，请重试!');
                }
            }else
            {
                $data['dateline'] = time();
                $data['pid']=I('post.pid');
				$data['creater_uid']=I('post.creater_uid');
                $form_id = $this->model()->add($data);
                if($form_id<=0)
                {
                    $this->error('添加失败，请重试!');
                }
                echo '{"id":'.$form_id.',"values":[{"value":"'.$form_name.'"}],"isLeaf":'.$data['type'].',"parentId":'.$data['pid'].',"children":[]}';
               // $this->success('添加成功，现在去设计表单。',U('/'.$this->_controller.'/formdesign/form_id/'.$form_id));
            }
            
            
           
        }
        
        
        
    }
    
    public function formdesign()
    {
        $form_id = intval(I('get.form_id'));
        if($form_id<=0)
        {
            $form_id = intval(I('post.form_id'));
        }
        if($form_id<=0)
        {
            $this->error('参数有误，请返回重试!');
        }
        $map = array(
            'id'=>$form_id,
            'is_del'=>0,
        );
        $one = $this->model()->where($map)->find();
        if(!$one)
        {
            $this->error('未找到表单数据，请返回重试!');
        }
        
        
        
        if(IS_GET)
        {
           echo $one['content'];
           // $this->assign('one', $one);
           // $this->display();
        }else//post
        {
			$formtype=intval(trim($_REQUEST["formtype"]),10);
            $design_content = trim($_POST['design_content']);
            import('@.Org.Formdesign');
			$formdesign = new \Formdesign;  
            $parse_content = $formdesign->parse_form($design_content,$one['fields']);
            $design_content=$parse_content['template'];            
            $formdesign->parse_table($form_id,$parse_content['add_fields']);//创建表或添加字            
			$data = array(
				'is_data_form'=>$formtype,
                'fields'=>$parse_content['fields'],
                'content'=>$parse_content['template'],
                'content_parse'=>$parse_content['parse'],
                'content_data'=>serialize($parse_content['data']),
                'updatetime'=>time(),
            );
            $map = array(
                'id'=>$form_id,
            );
            $trans = $this->model()->where($map)->save($data);
            if(!$trans)
            {
                //$this->error('保存失败，请重试！');
                echo '{"result":0,"":"保存失败，请重试!"}';
            }
			$this->upcache();
            echo '{"result":1,"":"保存成功"}';
            //$this->success('保存成功！',U('/demo/formdesign/form_id/'.$form_id));
       
            
        }
    }
    //临时预览
    public function temp_preview()
    {
        import('@.Org.Formdesign');
        $formdesign = new \Formdesign;
        

        $parse_content = $formdesign->parse_form($_POST['design_content'],$one['fields']);
        $design_content = $formdesign->unparse_form(array(
            'content_parse'=>$parse_content['parse'],
            'content_data'=>serialize($parse_content['data']),//保存后是 serialize，所以这里也一样
        ),array(),array('action'=>'preview'));
        
        
        $this->assign('design_content',$design_content);
        $this->display();
        
        
    }

    
    //预览记录中的数据
    public function preview()
    {
         $form_id = intval(I('get.form_id'));
        if($form_id<=0)
        {
            $form_id = intval(I('post.form_id'));
        }
        if($form_id<=0)
        {
            $this->error('参数有误，请返回重试!');
        }
        $map = array(
            'id'=>$form_id,
            'is_del'=>0,
        );
        $one = $this->model()->where($map)->find();
        if(!$one)
        {
            $this->error('未找到表单数据，请返回重试!');
        }
        
        
        
        import('@.Org.Formdesign');
        $formdesign = new \Formdesign;
        $design_content = $formdesign->unparse_form($one,array(),array('action'=>'preview'));
        
        $this->assign('one',$one);
        $this->assign('design_content',$design_content);
        $this->display('preview');
        
        
    }
    public function getpower(){

    }
}