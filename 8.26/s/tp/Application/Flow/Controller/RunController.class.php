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
    public function view($form_id,$form_data)
    {

        $form_one=M('form')->where('id='.$form_id)->find();
        if(!$form_one)
        {
            //$this->error('未找到表单数据，请返回重试!');
            echo '未找到表单数据，请返回重试!';
            exit;
        }
        $dis_array=array();
        /*if($run_process=M('run_process')->field('run_flow_process')->where(array('id'=>$run_process_id))->find()){
            if($flow_process=M('flow_process')->field('write_fields')->where(array('id'=>$run_process['run_flow_process']))->find()){
                if(!empty($flow_process['write_fields'])){
                    $dis_array =explode(',',$flow_process['write_fields']);
                }
            }
        }*/
        import('@.Org.Formdesign');
        $formdesign = new \Formdesign;
        $design_content = $formdesign->unparse_form($form_one,$form_data,array('action'=>'view'),$dis_array);
        return $design_content;
    }
    public function show(){
        $run_process_id = intval(I('get.run_process'));
        $map=array(
            'id'=>$run_process_id,
            'status'=>1
        );
        $run_process=M('run_process');
        $run_process_one=$run_process->where($map)->find();
        if(!$run_process){
            exit('非法操作或此流程已经完成');
        }
        $run_con=M('run')->where('id='.$run_process_one['run_id'])->find();
        $run_from=json_decode($run_con['from_data'],true);
        $form_data=array();
        foreach($run_from as $key=>$value){
            $fdata=M('form_data_'.$key)->where('id='.$value)->find();
            $form_data[$key.$value]=$this->view($key,$fdata);
        }
        $flow_one=M('flow_process')->where('id='.$run_process_one['run_flow_process'])->find();
        if($flow_one['process_type']=='is_switch'){
            $form_sumit='<button type="submit" name="submit_to_save" value="save" class="btn btn-primary">批准</button>
<button type="submit" name="submit_to_end" value="end" class="btn btn-danger">拒绝</button>
<button type="submit" name="submit_to_up" value="up" class="btn btn-warning">折回/重写内容</button>';
        }else{
            $form_sumit='<button type="submit" name="submit_to_save" value="save" class="btn btn-primary">表单提交</button>';
        }
        //查找表单数据
        if($flow_one['form_id'] && empty($run_process_one['run_rule'])){
            $formcon=$this->getform($flow_one['form_id']);
            import('@.Org.Formdesign');
            $formdesign = new \Formdesign;
            $design_content = $formdesign->unparse_form($formcon,$form_data,array('action'=>'edit'));
        }elseif($flow_one['form_id']){
            $run_process_formdata=json_decode($run_process_one['run_rule'],true);
            $design_content=$form_data[$run_process_formdata['form_id'].$run_process_formdata['form_data_id']];
            unset($form_data[$run_process_formdata['form_id'].$run_process_formdata['form_data_id']]);
            $form_hidden='<input type="hidden" value="1" name="edit"  />';
            $form_hidden.='<input type="hidden" value="'.$run_process_formdata['form_data_id'].'" name="form_data_id"  />';
        }
        //导航条
        $nav='<ol class="breadcrumb"><li><a href="#">'.$run_con['run_name'].'</a></li><li class="active">'.$flow_one['process_name'].'</li>
</ol>';

        $form_hidden.='<input type="hidden" value="'.$flow_one['id'].'" name="flow_process_id"  />';
        $form_hidden.='<input type="hidden" value="'.$flow_one['form_id'].'" name="form_id"  />';
        $form_hidden.='<input type="hidden" value="'.$run_process_one['uid'].'" name="user_id"  />';
        $form_hidden.='<input type="hidden" value="'.$run_process_id.'" name="run_process_id"  />';
        $form_hidden.='<input type="hidden" value="'.$run_con['id'].'" name="run_id"  />';

        $this->assign('nav',$nav);
        $this->assign('form_hidden',$form_hidden);
        $this->assign('design_content',$design_content);
        $this->assign('form_sumit',$form_sumit);
        $this->assign('form_data',$form_data);
        $this->display();
    }
    //发起工作流程  然后缓存 1 流程 2 表单 3 等数据
    public function getflow(){
       $flow_id = intval(I('get.flow_id'));
       $flow_process_id = intval(I('get.flow_process_id'));
       $flow_process_model = D('flow_process');
       $arr=array('is_one'=>false);
        if(!empty($flow_id)){
           //先找到流程
           $map = array(
               'id'=>$flow_id,
               'is_del'=>0,
           );
            $arr['flow_id']=$flow_id;
           $flow_one = $this->model()->where($map)->find();
           if(!$flow_one)
           {
               $this->show_msg('未找到流程');
           }
           //流程步骤
            $arr['is_one']=true;
           $map = array(
               'flow_id'=>$flow_one['id'],
               'is_del'=>0,
               'process_type'=>'is_one',
           );
           $flow_process = $flow_process_model->where($map)->find();
           if(!$flow_process)
           {
               $this->show_msg('未找到流程步骤');
           }
       }elseif(!empty($flow_process_id)){
           //处理流程节点
           $flow_process = $flow_process_model->where('id='.$flow_process_id)->find();
       }else{
            exit('非法操作！');
       }
        if($flow_process['powers']){
            $arr['userid']=$_SESSION['uid'];
        }else{
            $arr['userid']=$flow_process['auto_sponsor_ids'];
        }
        $arr['flow_process_id']=$flow_process['id'];
        $arr['cform_id']=$flow_process['form_id'];
        //处理当前流程节点数据
        //下一节点处理

        //有表单数据
        if($flow_process['form_id']>0){
            $formcon=$this->getform($flow_process['form_id']);
            import('@.Org.Formdesign');
            $formdesign = new \Formdesign;
            $design_content = $formdesign->unparse_form($formcon,$form_data,array('action'=>'edit'),$dis_array);
           $arr['nav']='<ol class="breadcrumb"><li><a href="#">'.$flow_one['flow_name'].'</a></li><li class="active">'.$flow_process['process_name'].'</li>
</ol>';
            $arr['formcon']=$design_content;

        }else{
            //如果没有表单数据,自动处理相关内容
        }
        $this->html($arr);
    }
    public function getform($id){
        return M('form')->where('id='.$id)->find();
    }
    public function html($html){
        header("Content-Type: text/html; charset=UTF-8");
        echo '<link href="/resource/part/bootstrap/css/bootstrap3.min.css" rel="stylesheet" type="text/css" />';
        echo '<script src="/resource/js/jQuery/jquery-1.11.1.min.js"></script>';
        echo '<script src="/resource/part/bootstrap/js/bootstrap3.min.js"></script>';
        echo '<div class="container"><div class="row">'.$html['nav'].'</div></div>';
        echo '<div class="container"><div class="row"><form action="'.U('/Flow/run/flowsave').'" method="post">';
        echo '<input type="hidden" value="'.$html['flow_process_id'].'" name="flow_process_id"  />';
        echo '<input type="hidden" value="'.$html['cform_id'].'" name="form_id"  />';
        echo '<input type="hidden" value="'.$html['is_one'].'" name="is_one"  />';
        echo '<input type="hidden" value="'.$html['userid'].'" name="user_id"  />';
        if($html['is_one']){
            echo '<input type="text" class="span6" placeholder="填写标题" name="run_name" value="">';
            echo '<input type="hidden" name="flow_id" value="'.$html['flow_id'].'">';
        }
        echo $html['formcon'];
        echo '<button type="submit" name="submit_to_save" value="save" class="btn btn-success">确定提交</button></form></div></div>';
    }

    public function flowsave(){
        $is_one=I('post.is_one');
        $is_edit=I('post.edit');
        $form_id=I('post.form_id');
        $flow_id=I('post.flow_id');
        $flow_process_id=I('post.flow_process_id');
        $frun_process_id=I('post.run_process_id');
        $run_name=I('post.run_name');
        $user_id=I('post.user_id');
        $run_id=I('post.run_id');
        $submit_to_save=I('post.submit_to_save');
        $submit_to_end=I('post.submit_to_end');
        $submit_to_up=I('post.submit_to_up');
        $run_process=D('run_process');
        $run_process->startTrans();
        //第一次创建流程
       if($is_one){
            $data=array(
                'uid'=>$_SESSION['uid'],
                'flow_id'=>$flow_id,
                'form_id'=>$form_id,
                'run_name'=>$run_name,
                'run_flow_process'=>$flow_process_id,
                'updatetime'=>$this->_timestamp,
                'dateline'=>$this->_timestamp
            );
           if(!$run_id=M('run')->add($data)){
               $run_process->rollback();
               exit('建立流程失败');
           }
           $this->sendmsg(array('title'=>$run_name.' 申请成功','content'=>' 相关信息正在处理中...','status'=>1,'uid'=>$_SESSION['uid']));
       }
        $data['uid']=$user_id;
        $data['run_id']=$run_id;
        $data['js_time']=$this->_timestamp;
        $data['bl_time']=$this->_timestamp;
        $data['jj_time']=$this->_timestamp;
        $data['status']=2;
        //取下一个节点
        $next_process=M('flow_process')->field('process_name,process_to,auto_sponsor_ids,out_condition')->where('id='.$flow_process_id)->find();
        //$data['uid']=$next_process['auto_sponsor_ids'];
        $data['run_flow']=$flow_id?$flow_id:$next_process['flow_id'];
        $out_con=json_decode($next_process['out_condition'],true);
        $process_to_id=explode(',',$next_process['process_to']);
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
        if($submit_to_save=='save'){
            $is_switch='save';
        }
        if($submit_to_end=='end'){
            $is_switch='end';
        }
        if($submit_to_up=='up'){
            $is_switch='up';
        }
        if($form_id){
            $form_data = array_merge($_POST,$data);
            if($form_data_id){
                if(!$form_data_id=M('form_data_'.$form_id)->where('id='.$form_data_id)->save($form_data)){
                    $run_process->rollback();
                    exit('修改表单数据失败');
                }
            }else{
                if(!$form_data_id=M('form_data_'.$form_id)->add($form_data)){
                    $run_process->rollback();
                    exit('插入表单数据失败');
                }
                $this->prun(array('run_id'=>$run_id,'form_id'=>$form_id,'form_data_id'=>$form_data_id));
            }
        }
        //保存此节点内容
        $data['run_rule']='{"form_id":'.$form_id.',"form_data_id":'.$form_data_id.',"process_to":'.$node_id.',"is_switch":"'.$is_switch.'"}';

        if($is_edit){
            if(!$run_process->where('id='.$frun_process_id)->save($data)){
                $run_process->rollback();
                exit('更改流程运行步骤失败');
            }
        }else{
            if(!$caddrun_process_id=$run_process->add($data)){
                $run_process->rollback();
                exit('建立流程运行步骤失败');
            }
        }
        $run_process->commit();
        if($is_switch=='end' or $is_switch=='up'){
            $edit_run_process_id=$frun_process_id?$frun_process_id:$caddrun_process_id;
            if($is_switch=='end'){
                $is_switch_status=4;
                $is_switch_title=' 请求失败';
            }else{
                $is_switch_status=3;
                $is_switch_title=' 请求退回';
                $map=array();
                $map['run_id']  = array('eq',$run_id);
                $map['id']  = array('lt',$edit_run_process_id);
                $re_run_process=$run_process->field('id')->where($map)->order('id desc')->limit(1)->find();
                $run_process->where('id='.$re_run_process['id'])->save(array('status'=>1));
            }
            $run_process->where('id='.$edit_run_process_id)->save(array('status'=>$is_switch_status));
            M('run')->where('id='.$run_id)->save(array('is_finish'=>$is_switch_status));
            $ccrun=M('run')->where('id='.$run_id)->find();
            $this->sendmsg(array('title'=>$ccrun['run_name'].$is_switch_title,'uid'=>$ccrun['uid'],'content'=>"详细内容查看相关流程信息"));
            $this->msg();
            exit;
        }
        //没有下一个节点处理方法
        if(empty($node_id)){
            //$flag = intval(I('get.flag'));
            M('run')->where('id='.$run_id)->save(array('is_finish'=>2));
            $ccrun=M('run')->where('id='.$run_id)->find();
            $this->sendmsg(array('title'=>$ccrun['run_name'].' 请求完成','content'=>'详细信息到管理流程查看','status'=>1,'uid'=>$ccrun['uid']));

            $this->msg('处理完毕');
            exit;
        }
        $next_process=M('flow_process')->where('id='.$node_id)->find();

        $newdata=array(
            'uid'=>$next_process['auto_sponsor_ids'],
            'run_id'=>$run_id,
            'run_flow'=>$flow_id,
            'js_time'=>$this->_timestamp,
            'bl_time'=>$this->_timestamp,
            'jj_time'=>$this->_timestamp,
            'status'=>1,
            'run_flow_process'=>$node_id,
            'updatetime'=>$this->_timestamp,
            'dateline'=>$this->_timestamp
        );
        if($newrun_process_id=$run_process->add($newdata)){
            M('run')->where('id='.$run_id)->save(array('run_process'=>$newrun_process_id));
            //发信息通知处理人
            $this->sendmsg(array('title'=>$next_process['process_name'],'content'=>' 最新信息','uid'=>$next_process['auto_sponsor_ids']));
        }
        $this->msg();
    }
    //更新当前流程信息表
    function prun($data){
        $runm=M('run');
        $ccrun=$runm->where('id='.$data['run_id'])->find();
        $formids=json_decode($ccrun['from_data'],true);
        $formids[$data['form_id']]=$data['form_data_id'];
        $formids=json_encode($formids);
        $runm->where('id='.$data['run_id'])->save(array('from_data'=>$formids));
    }
    //取流程列表
    public function getflowlist(){
        $type=I('get.type');
        $is_finish=array('1'=>'正在处理中...','2'=>'处理完成','3'=>'退回处理中...','4'=>'请求失败/拒绝');
        switch($type){
            case 'chulinode':
                $map=array(
                    'uid'=>$_SESSION['uid'],
                    'status'=>1
                );
                $nodelist=M('run_process')->where($map)->select();
                $isadd=false;
                $out='';
                foreach($nodelist as $value){
                    if(!$noderun=s('run'.$value['run_id'])){
                        $noderun=M('run')->where('id='.$value['run_id'])->find();
                        s('run'.$value['run_id'],$noderun);
                    }
                    if(!$nodeflow_process=s('flow_process'.$value['run_flow_process'])){
                        $nodeflow_process=M('flow_process')->where('id='.$value['run_flow_process'])->find();
                        s('flow_process'.$value['run_flow_process'],$nodeflow_process);
                    }
                    if($isadd)$out.=",";
                    $out.='{';
                    $out.='id:\''.$value["id"].'\',';
                    $out.='msg:\''.$noderun['run_name'].' -> '.$nodeflow_process['process_name'].'\',';
                    $out.='dateline:\''.date('Y-m-d H:i',$value['js_time']).'\',';
                    $out.='}';
                    $isadd=true;
                }
                $this->assign('flag','chulinode');
                $this->assign('flowData','var flowData={Rows:['.$out.']};');
                $this->display();
                break;
            case 'chuliendnode':
                $nodelist=M('run_process')->where('uid='.$_SESSION['uid'])->select();
                $isadd=false;
                $out='';
                foreach($nodelist as $value){
                    if(!$noderun=s('run'.$value['run_id'])){
                        $noderun=M('run')->where('id='.$value['run_id'])->find();
                        s('run'.$value['run_id'],$noderun);
                    }
                    if(!$nodeflow_process=s('flow_process'.$value['run_flow_process'])){
                        $nodeflow_process=M('flow_process')->where('id='.$value['run_flow_process'])->find();
                        s('flow_process'.$value['run_flow_process'],$nodeflow_process);
                    }
                    if($isadd)$out.=",";
                    $out.='{';
                    $out.='id:\''.$value["id"].'\',';
                    $out.='msg:\''.$noderun['run_name'].' -> '.$nodeflow_process['process_name'].'\',';
                    $out.='status:\''.$is_finish[$value['status']].'\',';
                    $out.='dateline:\''.date('Y-m-d H:i',$value['js_time']).'\',';
                    $out.='}';
                    $isadd=true;
                }
                $this->assign('flag','chulinode');
                $this->assign('flowData','var flowData={Rows:['.$out.']};');
                $this->display();
                break;
            case 'getmyflow':
                $out=$this->getmyflowout('getmyflow');
                $this->assign('flowData','var flowData={Rows:['.$out.']};');
                $this->assign('flag','getmyflow');
                $this->display();
                break;
            case 'getmyendflow':
                $out=$this->getmyflowout('getmyendflow');
                $this->assign('flowData','var flowData={Rows:['.$out.']};');
                $this->assign('flag','getmyflow');
                $this->display();
                break;
            case 'getnoendflow':
                $out= $this->getmyflowout('getnoendflow');
                $this->assign('flowData','var flowData={Rows:['.$out.']};');
                $this->assign('flag','getmyflow');
                $this->display();
                break;
            case '':
                break;
            case '':
                break;
        }
    }
    //返回请求流程结果
    public function getmyflowout($gettype){
            $status=array('getmyendflow'=>2,'getnoendflow'=>1);
            //$map=array(array('uid'=>$_SESSION['uid']),'is_finish'=>$status[$gettype]);
        $map=array();
        $map['uid']=array('eq',$_SESSION['uid']);
        $map['is_finish']=array(array('eq',2),array('eq',4),'or');
            if($gettype=='getmyflow')unset($map['is_finish']);
            $nodelist=M('run')->where($map)->select();
            $isadd=false;
            $out='';
            foreach($nodelist as $value){
            if(!$noderun=s('run'.$value['id'])){
            $noderun=$value;
            s('run'.$value['id'],$value);
            }
            if($isadd)$out.=",";
            $out.='{';
            $out.='id:\''.$value["id"].'\',';
            $out.='msg:\''.$noderun['run_name'].'\',';
            $out.='status:\''.$is_finish[$noderun['is_finish']].'\',';
            $out.='dateline:\''.date('Y-m-d H:i',$value['dateline']).'\',';
            $out.='}';
            $isadd=true;
            }

       // return $out;
    }
    //发送信息
    public function sendmsg($data){
        $msg='<strong style="color:#ff0000">'.$data['title'].'</strong> '.$data['content'];
        $mdata=array(
            'send_user'=>1,
            'receive_user'=>$data['uid'],
            'send_date'=>time(),
            'message'=>$msg
        );
        M('message')->add($mdata);
    }
    public function msg($msg='提交成功',$type=1){
        switch($type){
            case 1:
                echo '<script>alert("'.$msg.'");window.location="'.U('Flow/Run/getflowlist/type/chulinode').'";</script>';
                break;
        }

    }
}
?>