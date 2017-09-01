<?php
// 本类由系统自动生成，仅供测试用途
namespace Flow\Controller;
class DemoController extends HomeController {
    
    protected function model()
    {
        if($this->_obj_model)
            return $this->_obj_model;
        return $this->_obj_model = D('flow');
    }
    
    public function index(){
        $map = array(
            'is_del'=>0,
        );
        $page='';
        $list = array();
        $count = $this->model()->where($map)->count('id');

       if(I('get.getflow')=='ok'){
           $list = $this->model()->relation(true)->field('id,form_id,flow_name,flow_desc,updatetime,dateline')->where($map)->order('id desc')->limit($p->firstRow . ',' . $p->listRows)->select();
           echo '{"Rows":'.json_encode($list).',"Total":'.$count.'}';
       }else{
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

                $list = $this->model()->relation(true)->field('id,form_id,flow_name,flow_desc,updatetime,dateline')->where($map)->order('id desc')->limit($p->firstRow . ',' . $p->listRows)->select();

            }
            $this->assign('page', $page);
            $this->assign('list', $list);
            $this->display();
       }
    }    
    public function add()
    {
        self::edit();
    }
    public function edit()
    {
        $flow_id = intval(I('flow_id'));
        
        $one = array();
        if($flow_id>0)
        {         
			$this->cpower('flow_modify','修改流程',false);   
			$map = array(
                'id'=>$flow_id,
                'is_del'=>0,
            );
            $one = $this->model()->where($map)->find();
            if(!$one)
            {
                $this->error('未找到表单数据，请返回重试!');
            }
        
        }else{
			$this->cpower('flow_add','添加流程',false);			
		}
        if(IS_GET)
        {            
			$map = array(
                'is_del'=>0,
				'type'=>0
            );
            $form_list = D('form')->field('id,form_name')->where($map)->select();
            $flow_form_ids=explode(',',$one['form_id']);
            $this->assign('one',$one);
            $this->assign('flow_form_ids',$flow_form_ids);
            $this->assign('form_list',$form_list);
            $this->display('edit');
        }
         else
        {
            $flow_name = trim(I('post.flow_name',''));
            if(empty($flow_name))
            {
                $this->error('请填写表单名称!',U('/'.$this->_controller.'/add'));
            }
            $data = array(
                'flow_name'=>$flow_name,
                'cat_id'=>I('post.cat_id'),
                'form_id'=>implode(',',I('post.form_id')),
                'flow_desc'=>trim(I('post.flow_desc','')),
                'updatetime'=>time(),
            );
            if($flow_id>0)
            {

                if($this->model()->where(array('id'=>$flow_id))->save($data))
                {
                    
                    //$this->success('编辑成功。',U('/'.$this->_controller.'/edit/flow_id/'.$flow_id));
                    $html='<script type="text/javascript">
                        alert("修改成功");
                        parent.Refresh();
                        parent.$dfDialog.close();
                        </script>';
                    echo $html;exit;
                }else
                {
                    $this->error('编辑失败，请重试!');
                }
            }else
            {
                $data['dateline'] = time();
                $flow_id = $this->model()->add($data);
                if($flow_id<=0)
                {
                    $this->error('添加失败，请重试!');
                }
                $html='<script type="text/javascript">
                        alert("添加成功");
                        parent.Refresh();
                        parent.$dfDialog.close();
                        </script>';
                echo $html;exit;
                //$this->success('添加成功。',U('/'.$this->_controller));
            }
           
        }
        
        
    }
    //用户选择控件
    public function super_dialog()
    {
        $op = trim(I('get.op'));//选择方式  user 用户  dept部门  role 角色
        $list=M('user')->select();
		$lists='';
		//$se=' selected="selected"';
		foreach($list as $v){
			if(!empty($v['username'])){
				$lists.='<option value="'.$v['uid'].'">'.$v['username'].'</option>';
			}			
		}		
		if(!$op) $op = 'user';
		$this->assign('list',$lists);
        $this->assign('op',$op);		
        $this->display();
    }
    //删除流程
    public function del(){
		$this->cpower('flow_delete','删除流程',false);
        $flowid = trim(I('get.flow_id'));
        $where=array("flow_id"=>$flowid);
        M("flow_process")->where($where)->delete();
        if(!$this->model()->where(array("id"=>$flowid))->delete()){echo '{"flag":0,"msg":"删除失败"}'; exit;}
        echo '{"flag":"'.$flowid.'","msg":"删除成功"}';
    }
  
}
