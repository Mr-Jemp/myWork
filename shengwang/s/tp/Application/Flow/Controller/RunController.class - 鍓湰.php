<?php
// 本类由系统自动生成，仅供测试用途
namespace Flow\Controller;
class RunController extends HomeController {
    
    protected function model()
    {
        if($this->_obj_model)
            return $this->_obj_model;
        return $this->_obj_model = D('flow');
    }
    
    public function index(){
	    
       // echo '未完成';exit;     
        
        $map = array(
            'is_del'=>0,
        );
        $page='';
        $list = array();
        $count = $this->model()->where($map)->count('id');
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
    //发起工作流程  然后缓存 1 流程 2 表单 3 等数据
    public function add()
    {
        //self::edit('add'); 
		
        $flow_id = intval(I('get.flow_id'));//流程ID
        //先找到流程
        $map = array(
            'id'=>$flow_id,
            'is_del'=>0,
        );
        $flow_one = $this->model()->where($map)->find();
        if(!$flow_one)
        {
            
			$this->show_msg('未找到流程');
        }
        //流程步骤
        $map = array(
            'flow_id'=>$flow_one['id'],
            'is_del'=>0,
        );
        $flow_process_model = D('flow_process');
        $flow_process = $flow_process_model->field('is_del,updatetime,dateline',true)->where($map)->order('id asc')->select();
        
        if(!$flow_process)
        {
            //$this->error('未找到流程步骤');
			$this->show_msg('未找到流程步骤');
        }
        
        //找出表单
        $map = array(
            'id'=>$flow_one['form_id'],
            'is_del'=>0,
        );
        $form_one = D('form')->where($map)->find();
        if(!$form_one)
        {
           // $this->error('未找到表单数据');
		   $this->show_msg('未找到表单数据');
        }
        
        //默认名称
        $run_name = $flow_one['flow_name'].'('.date('Y-m-d H:i:s').')'; 
       
        //找到 流程第一步
        $flow_process_first = array();
        foreach($flow_process as $value)
        {
            if($value['process_type'] == 'is_one')
            {
                $flow_process_first = $value;
                break;
            }            
        }
        
        if(!$flow_process_first)
        {
            
			$this->show_msg('未找到流程第一步骤');
			//$this->error('未找到流程第一步骤');
        }
        
        //条件满足-----------------
        
        //发起工作
        $this->model()->startTrans();
        $data = array(
            'pid'=>0,
            'uid'=>$_SESSION['uid'],
            'flow_id'=>$flow_id,
            //'cat_id'=>$flow_one['cat_id'],
            'run_name'=>$run_name,
            'run_flow_id'=>$flow_id,
            'run_flow_process'=>$flow_process_first['id'],
            'dateline'=>$this->_timestamp,
        );        
        $run_id = D('run')->add($data);
        if($run_id<=0)
            //$this->error('发起失败，请重试');
			$this->show_msg('发起失败，请重试');
            
        //添加步骤
        $data = array(
            'uid'=>$_SESSION['uid'],
            'run_id'=>$run_id,
            'run_flow'=>$flow_id,
            'run_flow_process'=>$flow_process_first['id'],
            'parent_flow'=>0,
            'parent_flow_process'=>0,
            'run_child'=>0,//未处理，第一步不能进入子流程
            'remark'=>'',
            'is_sponsor'=>1,
            'status'=>1,
            'js_time'=>$this->_timestamp,
            'bl_time'=>$this->_timestamp,
            'dateline'=>$this->_timestamp,
        );
        $trans  = $process_id = D('run_process')->add($data);
		
		
        //开始缓存 表单 流程，等后台要用的全部数据，这样即使流程删除后也不影响这个工作 
        if($trans)
        {
             $run_cache = array(
                'run_id'=>$run_id,
                'form_id'=>$flow_one['form_id'],
                'flow_id'=>$flow_one['id'],
                'run_form'=>json_encode($form_one),//从 serialize 改用  json_encode 兼容其它语言
                'run_flow'=>json_encode($flow_one),
                'run_flow_process'=>json_encode($flow_process), //这里未缓存 子流程 数据是不完善的， 后期会完善
                'dateline'=>$this->_timestamp
            );
            $trans = D('run_cache')->add($run_cache);
        }
			
        if(!$trans)
        {
            $this->model()->rollback();
            //$this->error('发起失败，请重试');
			$this->show_msg('发起失败，请重试');
        }
        $this->model()->commit();
        //run log
        //记录日志        
       
		//exit;
        $this->redirect('/Flow/run/edit/process_id/'.$process_id);
        
        //$this->display('edit');
        
    }
    
    //填写流程表单
    public function edit()
    {
        
        $run_process_id = intval(I('get.process_id'));//步骤ID       
        $run_process = array();
        if($run_process_id>0)
        {
            $map = array(
                'id'=>$run_process_id,
                'is_del'=>0,
            );
            $run_process = D('run_process')->field('is_del,updatetime,dateline',true)->where($map)->find();
        }
		
        if(!$run_process)
        {            
			$this->show_msg('未找到步骤信息');
			exit;
        }
        //run 数据
        $map = array(
            'id'=>$run_process['run_id'],
        );
        $run_one = D('run')->where($map)->find();
        if(!$run_one)
        {
            //$this->error('未找到工作流程信息');
			$this->show_msg('未找到工作流程信息');
        }
        
        //从缓存中获取数据
        $map = array(
            'run_id'=>$run_process['run_id'],
        );
        $run_cache = D('run_cache')->where($map)->find();
        $run_cache['run_form'] = json_decode($run_cache['run_form'],true);
        $run_cache['run_flow'] = json_decode($run_cache['run_flow'],true);
        $run_cache['run_flow_process'] = json_decode($run_cache['run_flow_process'],true);
        
        import('@.Org.Formdesign');
        $formdesign = new \Formdesign;		
        $dis_array =explode(',',$run_cache['run_flow_process'][0]['write_fields']);
        $design_content = $formdesign->unparse_form($run_cache['run_form'],$form_data,array('action'=>'edit'),$dis_array);
        	
        $this->assign('run_one',$run_one);
        $this->assign('run_process',$run_process);
		$this->assign('form_id',$run_cache['run_form']['id']);
		$this->assign('flow_process_id',$run_process['run_flow_process']);
        $this->assign('design_content',$design_content);
        $this->display('edit');
    }
	
	
	public function sendmsg($data){
        $msg='<strong style="color:#ff0000">'.$data['title'].'</strong> '.$data['content'];
        $mdata=array(
            'send_user'=>1,
            'receive_user'=>$data['uid'],
            'send_date'=>date('Y-m-d'),
            'message'=>$msg,
            'url'=>'/s/flow/ajax.php?act=view',
            'status'=>$data['status']
        );
        $msgid=M('message')->add($mdata);
    }
    public function next_flow_process($cid,$data){
		$pro_conent=M('flow_process')->field('process_to,out_condition,is_del')->where(array('is_del'=>0,'id'=>$cid))->find();		
		/*if(!$pro_conent)
        {
            //$this->error('本流程已结束');
			//exit;
			//return false;
			//$this->show_msg('本流程已结束');	
			
        }*/
		if(empty($pro_conent['process_to'])){
			if(!M('run')->where(array('id'=>$data['run_id']))->save(array('is_finish'=>1))){
				echo '操作失败';exit;
			}
			$crun=M('run')->where(array('id'=>$data['run_id']))->find();
			if($crun['is_finish']==1){$isfinish='通过';}
			elseif($crun['is_finish']==4){$isfinish='拒绝';}
			else{$isfinish='审核中...';}
			$msg='你申请 <strong style="color:#ff0000">'.$crun['run_name'].'</strong> 请求审核：'.$isfinish.'【<a href="###" target="_blank">点击查看</a>】';
			$mdata=array(
				'send_user'=>1,
				'receive_user'=>$crun['uid'],
				'send_date'=>date('Y-m-d'),
				'message'=>$msg,
				'url'=>'/s/flow/ajax.php?act=show&id='.$crun['id'],
				'status'=>3
			);				
			$msgid=M('message')->add($mdata);			
			return true;
		}
		$out_con=json_decode($pro_conent['out_condition'],true);
		
		$process_to_id=explode(',',$pro_conent['process_to']);
		if(count($process_to_id)>1 and is_array($out_con)){			
			foreach($out_con as $k=>$v){
				foreach($v['condition'] as $key=>$val){
					$value=explode('=',$val);
					if($data[trim(trim($value[0]),"'")]==trim(trim($value[1]),"'")){
						$node_id=$k;			
						break;
					}
				}
				if($node_id!='')break;
			}			
						
		}
        if(empty($node_id)){$node_id=$process_to_id[0];}
		//处理下一个步骤
		if(in_array($node_id,$process_to_id)){
			$nextpro_conent=M('flow_process')->field('id,process_name,auto_sponsor_ids,flow_id')->where(array('is_del'=>0,'id'=>$node_id))->find();
			if(!$nextpro_conent){
				
				//$this->show_msg('本流程已结束');
			}
			//添加步骤
			$pdata = array(
				'uid'=>$nextpro_conent['auto_sponsor_ids'],
				'run_id'=>$data['run_id'],
				'run_flow'=>$nextpro_conent['flow_id'],
				'run_flow_process'=>$nextpro_conent['id'],
				'parent_flow'=>0,
				'parent_flow_process'=>$cid,
				'run_child'=>0,//未处理，第一步不能进入子流程
				'remark'=>'',
				'is_sponsor'=>1,
				'status'=>1,
				'js_time'=>$this->_timestamp,
				'bl_time'=>$this->_timestamp,
				'dateline'=>$this->_timestamp,
			);
			$process_id = D('run_process')->add($pdata);
			if(!$process_id)return false;
			$flow_name=M('flow')->where(array('id'=>$nextpro_conent['flow_id']))->find();
			$msg='有一个 <strong style="color:#ff0000">'.$flow_name['flow_name'].'</strong> 请求审核：【<a href="###">点击去处理 -> '.$nextpro_conent['process_name'].'</a>】';
			$mdata=array(
				'send_user'=>1,
				'receive_user'=>$nextpro_conent['auto_sponsor_ids'],
				'send_date'=>date('Y-m-d'),
				'message'=>$msg,
				'url'=>'/s/tp/wwwroot/index.php/Flow/run/show_pro/run_id/'.$data['run_id'].'/run_process_id/'.$process_id,
				'status'=>0
			);				
			$msgid=M('message')->add($mdata);
			if(!$msgid)return false;
			if(M('run')->where(array('id'=>$data['run_id']))->save(array('run_flow_process'=>$node_id))){
				return true;
			}else{
				return true;
			}
			/*
			$cerout_con=json_decode($nextpro_conent['out_condition'],true);
			if(!empty($cerout_con[0]['condition'])){
				//$this->redirect('/Flow/run/edit/process_id/'.$node_id);
				exit;
			}
			*/			
			
		}else{			
			$this->show_msg('有异常');
			exit;
		}		
	}
	public function show_pro(){
		$run_id=I('get.run_id');
		$mid=I('get.mid');
		$run_process_id=I('get.run_process_id');
		$run_one=M('run')->field('id,flow_id,from_data_id')->where(array('id'=>$run_id))->find();		
		$flow_one = $this->model()->where(array('id'=>$run_one['flow_id']))->find();
		$form_one = M('form')->where(array('id'=>$flow_one['form_id']))->find();
		$design_content=R('Home/Demodata/view2',array($flow_one['form_id'],$run_one['from_data_id'],$run_process_id));		
		
		$this->assign('run_process_id',$run_process_id);
		$this->assign('run_one',$run_one);
		$this->assign('flow_one',$flow_one);
		$this->assign('mid',$mid);
		$this->assign('from_data_id',$run_one['from_data_id']);
		$this->assign('design_content',$design_content);
		$this->display();		
		//R('/分组名/Article/inidex',array('index'));
		//R('Admin/User/detail',array('5'));
		exit;
		//$this->redirect('/Home/Demodata/view2/form_id/'.$flow_one['form_id'].'/id/'.$run_one['from_data_id'].'html');		
	}	
	public function save_show(){		
		$run_id=I('post.run_id');
		$run_process_id=I('post.run_process_id');
		$flow_id=I('post.flow_id');
		$mid=I('post.mid');
		$run_process_con=M('run_process')->where(array('id'=>$run_process_id))->find();
		if(!$run_process_con or $run_process_con['status']>1){
			$this->show_msg('这请求已过时或完成处理');			
		}
		$foreign_test_model = D('foreign_test');
		$foreign_test_model->startTrans();
		if($_POST['submit_to_end']=='end'){			
			if(!M('run_process')->where(array('id'=>$run_process_id))->save(array('status'=>4))){			$foreign_test_model->rollback();
				$this->show_msg('拒绝失败');
			}
			if(!M('run')->where(array('id'=>$run_id))->save(array('is_finish'=>4))){
				$foreign_test_model->rollback();
				$this->show_msg('拒绝失败');
			}
			M('message')->where(array('id'=>$mid))->save(array('status'=>1));

			$foreign_test_model->commit();
            $run_con=M('run')->where(array('id'=>$run_id))->find();
            $flow_process_con=M('flow_process')->where(array('id'=>$run_process_con['run_flow_process']))->find();
            $this->sendmsg(array('uid'=>$run_con['uid'],'title'=>$run_con['run_name'],'content'=>'在 '.$flow_process_con['process_name'].' 审阅失败，请求被拒绝。'));
			$this->show_msg('拒绝成功');
		}elseif($_POST['submit_to_save']=='save'){			
			$is_updata=false;
			foreach($_POST as $key=>$val){				
				if(substr($key,0,5)=='data_'){$is_updata=true;break;}
			}			
			if($is_updata){
				$flow_con=M('flow')->where(array('id'=>$flow_id))->find();			
				M('form_data_'.$flow_con['form_id'])->where('id='.$_POST['from_data_id'])->save($_POST);
				echo '修改数据';
			}
			
			$data=array();
			$data['run_id']=$run_id;						
			if(!M('run_process')->where(array('id'=>$run_process_id))->save(array('status'=>2))){
				$foreign_test_model->rollback();
				$this->show_msg('批准失败');
				exit;
			}			
			if($this->next_flow_process($run_process_con['run_flow_process'],$data)){
				M('message')->where(array('id'=>$mid))->save(array('status'=>1));
				$foreign_test_model->commit();
				$this->show_msg('批准成功',true);
			}else{
				$foreign_test_model->rollback();
				$this->show_msg('批准失败');
			}
		}
		exit;
	}
	public function edit_save()
	{
		
		$form_id=I('post.form_id');
		$name=I('post.run_name');
		$run_process_id=I('post.run_process_id');
		$form_process_id=I('post.flow_process_id');
		$run_id=I('post.run_id');		
		$data = array(
			'name'=>$name,
			'updatetime'=>time(),
			'form_id'=>$form_id,
			'dateline'=>time(),
			'is_del'=>0
		);
		
		$foreign_test_model = D('foreign_test');
		$foreign_test_model->startTrans();		
		$id  = $trans = $foreign_test_model->add($data);
		if($trans)
		{
			$data['foreign_id'] = $id;			
			$form_data = array_merge($_POST,$data);			
			$trans = M('form_data_'.$form_id)->add($form_data);
			if($trans && !M('run')->where(array('id'=>$run_id))->save(array('from_data_id'=>$trans,'run_name'=>$name))){
				$foreign_test_model->rollback();				;
				$this->show_msg('修改插入数据ID失败，请重试!');
			}
		}
		
		if($id<=0)
		{
			$foreign_test_model->rollback();
			//$this->error('1添加失败，请重试!');
			$this->show_msg('添加失败，请重试!');
		}else
		{
			
			if(!M('run_process')->where(array('id='=>$run_process_id))->save(array('status'=>0))){
				$foreign_test_model->rollback();
				//$this->error('2添加失败，请重试!');
				$this->show_msg('添加失败，请重试!');
			}
				
			if($this->next_flow_process($form_process_id,$_POST)){
				$foreign_test_model->commit();
                $this->sendmsg(array('uid'=>$_SESSION['uid'],'title'=>$name,'content'=>'申请成功，正在处理中...'));
				$this->show_msg('操作成功');
			}else{
				$foreign_test_model->rollback();		
				$this->show_msg('操作异常');
			}			
		}
		$this->display('edit');
	}
	public function show_msg($msg,$boo=false){    	
        if($boo){
                echo '<script>alert("'.$msg.'");window.location="/s/flow/index.php?type=setFlow";</script>';       	}else{
echo <<<EOF
	<script>
	alert('操作成功');
	if(window.top==window.self){
		if (navigator.userAgent.indexOf("MSIE") > 0) {  
			if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {  
				window.opener = null; window.close();  
			}  
			else {  
				window.open('', '_top'); window.top.close();  
			}  
		}  
		else if (navigator.userAgent.indexOf("Firefox") > 0) {  
			window.location.href = 'about:blank '; //火狐默认状态非window.open的页面window.close是无效的 
			//window.history.go(-2);  
		}  
		else {  
			window.opener = null;   
			window.open('', '_self', '');  
			window.close();  
		}               
	}else{
		window.parent.tab.removeTabItem(window.parent.cu_tabid);
	}
	</script>				
EOF;
            
        }
		exit;
	}
  
}
?>