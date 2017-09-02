$(function(){
    var big_content_h=$(document).height()*0.8;
    $('.p_chapter_content,.p_teaching_content,.p_sw_material_content').height(big_content_h-108);

    //资源首页弹出窗事件
    /*$(document).on('click','.p_head_colse',function(){
        $(".p_dig").hide("slow");
    });*/
    $(document).on('click','.p_transparent_layer',function(){        
        $('.re_collection_fdown_tool').hide();
        $(this).hide();
    });
    $(document).on('click','.re_collection_fdown_tool_show',function(){ 
        $('.p_transparent_layer').show();       
        $(this).parent().next('.re_collection_fdown_tool').show();
    });
    /*$(document).on('click','.s_chapter',function(){
        $("#p_chapter").show("slow");
    });*/

    /*$(document).on('click','.s_sys',function(){
        $("#p_sys").show("slow");
    });*/
    /*$(document).on('click','.s_teaching',function(){
        $("#p_teaching").show("slow");
    });*/

    /*$(document).on('click','.re-material_r h5',function () {
        $("#p_sw_material").show("slow");
    });*/
});

