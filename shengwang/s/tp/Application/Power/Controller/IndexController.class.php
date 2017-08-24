<?php
// 本类由系统自动生成，仅供测试用途
namespace Power\Controller;
use Common\Controller\CommonController;
use Think\Model;
class IndexController extends CommonController {
    protected function model()
    {
        if($this->_obj_model)
            return $this->_obj_model;
        return $this->_obj_model = D('form');
    }
    public function index(){
		//header('Content-type:text/json');
        $role=M("role")->order("id asc")->select();        
		echo '{"Rows":['.$this->getRoleTree('',0).']}';
		//echo json_encode(array("Rows"=>$role));
    }
	public function getRoleTree($out,$pid){		
		$form=M('role')->where(array("pid"=>$pid))->select();
        $isadd=false;
        foreach($form as $v)
        {
            if($isadd)$out.=",";
			$out.='{';	
			$out.='"id":"'.$v["id"].'",';		
			$out.='"rolename":"'.$v["rolename"].'",';
			$out.='"description":"'.$v["description"].'",';
			$out.='"home_page":"'.$v["home_page"].'",';
			$out.='"children":[';
			$out=$this->getRoleTree($out,$v["id"]);
			$out.=']';
			$out.='}';
			$isadd=true;
        }
        return $out;
	}
    public function getForm(){
		header('Content-type:text/json');
        foreach($_SESSION['uroles'] as $v){
            $urolesids.=$this->getUserRoleCount($v);
        }
        $tmparr=explode(',',trim($urolesids,','));
        $tmparr=array_unique(array_merge($_SESSION['uroles'],$tmparr));
        $sql='select form_id from ht_power where role_id in('.implode(',',$tmparr).') and function_type=0 order by id asc';
        $m=new Model();
        $list=$m->query($sql);
        foreach($list as $a){
            $_SESSION['tmparr'][]=$a['form_id'];
        }
        $h='{"id":"0","text":"角色表单管理","type":"1","children":[';
        $tree=S('getform'.$_SESSION['uid']);
        if(empty($tree)){
            $tree=trim($this->getfree('',0),',');
            S('getform'.$_SESSION['uid'],$tree,600);
        }
        echo '['.$h.$tree.']}]';
    }
    public function getUserRoleCount($rid){
        $arr='';
        $sql='select id from ht_role where pid='.$rid.' order by id asc';
        $m=new Model();
        $list=$m->query($sql);
        if($list){
            foreach($list as $r){
                $arr.= $this->getUserRoleCount($r['id']);
                $arr.=','.$r['id'];
            }
            return $arr;
        }
        return $arr;
    }
    public function getfree($out,$pid,$form_list_id=false)
    {
        $form=$this->model()->field('id,form_name,pid,type,creater_uid')->where(array("pid"=>$pid))->select();
        //$isadd=false;
        foreach($form as $v)
        {
            $isdisabled='yes';
            if($v["creater_uid"]==$_SESSION['uid'] || in_array($v["id"],$_SESSION['tmparr'])){
                //$isdisabled='no';
               // if($isadd)$out.=",";
                $out.='{';
                $out.='"id":"'.$v["id"].'",';
                $out.='"text":"'.$v["form_name"].'",';
                $out.='"type":"'.$v["type"].'",';
                $out.='"parentId":"'.$pid.'",';
                // $out.='"isdisabled":"'.$isdisabled.'",';
                if(is_array($form_list_id)){
                    $ch=in_array($v['id'],$form_list_id)?1:0;
                    $out.='"iScheck":"'.$ch.'",';
                }
                $out.='"children":[';
                $out=$this->getfree($out,$v["id"],$form_list_id);
                $out.=']';
                $out.='},';
                //$isadd=true;
            }else{
                $out=$this->getfree($out,$v["id"],$form_list_id);
            }
        }
        return $out;
    }
	//查看成员
	public function getuser(){
		$id=I('post.roleId');
		$m=new Model();
		if(empty($id)){echo '没有选择行',exit;}
		header('Content-type:text/json');		
		$sql='SELECT u.uid,u.username FROM `ht_role_user` AS r LEFT JOIN `ht_user` AS u ON r.uid=u.uid WHERE r.role_id='.$id;		
		$m=new Model();
		$list=$m->query($sql);
		echo json_encode($list);
	}
	//取角色首页	
	public function getPageName(){
		$id=I('get.role_id');
		$m=M('role')->where(array('id'=>$id))->find();			
		$form=$this->model()->field('id,form_name')->where(array('type'=>0))->select();
		$opt='';		
		//echo $m['home_page'];
		foreach($form as $v){
			if($m['from_id']==$v['id']){
				$opt.='<option value="'.$v['id'].'" selected="selected">'.$v['form_name'].'</option>';
			}else{
				$opt.='<option value="'.$v['id'].'">'.$v['form_name'].'</option>';
			}
		}
		echo $opt;
		
	}
	//修改角色首页
	public function editRolePage(){
		$id=I('post.role_id');
		$fid=I('post.role_page');
		$ftitle=I('post.page_name');
		if(M('role')->where(array('id'=>$id))->save(array('home_page'=>$ftitle,'from_id'=>$fid))){
			echo '{"flag":1,"msg":"修改成功"}';
		}else{
			echo '{"flag":0,"msg":"修改失败"}';	
		}
	}
	//取对应角色表单
	public function getUserRole(){
		$id=I('get.role_id');
		$sql='SELECT form_id FROM `ht_power` WHERE function_type=0 and role_id='.$id;
		$m=new Model();
		$list=$m->query($sql);
		//$form_list_id=array();
		$form_list_id='[';
		if($list){
			foreach($list as $v){
				//$form_list_id[]=$v['form_id'];
				$form_list_id.=$v['form_id'].',';
			}
		}
		//$user_form=$this->getfree('',0,$form_list_id);
		//echo '{"flag":1}';
		//echo $user_form;
		echo rtrim($form_list_id,',').']';
	}
	//维数组转一维
	public function multi2array($array) {  
		static $result_array = array();  
		foreach ($array as $key => $value) {  
		if (is_array($value)) {  
			array_multi2array($value);  
		}  
		else  
			$result_array[$key] = $value;  
		}  
		return $result_array;  
	}
	//保存或取消权限
	public function upRole(){
		//echo 'ok';
		//role_id="+actionCustomerID+"&from_id="+note.data.id+"&act="+checked
		$this->cpower('power_modify','修改角色页面',$ajax=true,$type='php');
		$role_id=I('post.role_id');
		$from_id=I('post.from_id');
		$m=new Model();
		$sql='delete from `ht_power` where role_id='.$role_id.' and function_type=0';
		$m->execute($sql);		
		if($from_id=='delall'){echo 1;exit;};	
		$form_list_id=explode(',',rtrim($from_id,','));
		foreach($form_list_id as $v){
			$sql='INSERT INTO ht_power(role_id,form_id,function_name,function_type)values('.$role_id.','.$v.',"view.page",0)';			
			$list=$m->execute($sql);		
		}
			echo 1;	
	}
	
}