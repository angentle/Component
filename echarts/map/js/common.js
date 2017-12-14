/**
 * Created by mafely on 15/8/25.
 */
$(function() {
    $('.cell-nav li').hover(function(){
        $(this).addClass("hover");
    }, function(){
        $(this).removeClass("hover");
    });


    $('.admin-nav li').hover(function(){
        $(this).addClass("hover");
    }, function(){
        $(this).removeClass("hover");
    });
});