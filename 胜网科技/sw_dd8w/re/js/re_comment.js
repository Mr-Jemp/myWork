$(function(){
 $('.comment_star img').mouseover(function(){
     $(this).prevAll().attr('src','/re/img/re_comment/star_y.png');
     $(this).attr('src','/re/img/re_comment/star_y.png');
     $(this).nextAll().attr('src','/re/img/re_comment/star_n.png');
 });
});