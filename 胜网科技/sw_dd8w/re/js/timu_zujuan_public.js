var JMEditor_BasePath = "/js/jmeditor/";
var JMEditor = {};
$(function(){
    CKEDITOR.config.customConfig='myconfig.js';
    CKEDITOR.disableAutoInline = true;
    /*$('li div[contenteditable="true"]').each(function(){
        var id=$(this).attr('id');
        CKEDITOR.instances[id].setData($('#'+id).html());
    });*/

    JMEditor = {
        versionCode : 5,
        versionName : "V0.9.4",
        ckEditor : CKEDITOR,
        jmeBasePath : JMEditor_BasePath,
        defaultFontSize : "20px",
        isEmpty : function(elementId){
            return ($("#" + elementId).html()+"").replace(/(<[^>]*>|\s|&nbsp;)/ig,"").length < 1;
        },
        html : function(elementId){
            return $("#" + elementId).html();
        }
    };
});
$(document).on("click",".timu_radio_option_add",function(){
    var ul = $(this).parent().next();
    var len = ul.children().length;
    var timu_id = getpluId();
    var html='';
    html='<li><i class="del_f"></i><div class="timu_opte_num">'+String.fromCharCode(len + 65)+'、</div><div class="timu_optt_input" id="'+timu_id+'" contenteditable="true"></div><label class="radiostyle_n"></label><span></span></li>';
    ul.append(html);
    CKEDITOR.inline(timu_id);
});
$(document).on("click",".del_f",function(){
    var ul=$(this).parent().parent();
    if(ul.children().length<2){
        alert('选项最少存在一项');
        return false;
    }
    $(this).parent().remove();
    var op=ul.find('.timu_opte_num');
    op.each(function(i){
        $(this).text(String.fromCharCode(i + 65) + "、");
    });
    /*for(var i=0;i<op.length;i++){
     op[i].html(String.fromCharCode(i + 65) + "、");
     }*/

});
function getpluId(){
    var timestamp = Date.parse(new Date());
    timestamp = 'timu'+timestamp / 1000;
    timestamp=timestamp+(Math.round(Math.random() * 100));
    return timestamp;
}