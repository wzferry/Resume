/**
 * Created by Administrator on 2017/2/5 0005.
 */
$(document).on("touchmove",function(e){
    e.preventDefault();
});
$(function(){
    var viewHeight = $(window).height();

    $("#main").css("height", viewHeight);
    var $li=$("#main>ul>li");
    console.log($li);
    slidePage();
    function slidePage(){
        var touchY=0;
        var step=1/4;
        var nowIndex=0;
        var nextPreIndex=0;
        var ok=true;
        $li.on("touchstart",function(e){
            if (ok == false)return;
            ok = false;
            nowIndex=$(this).index();
            console.log(e);
            var touchY= e.originalEvent.touches[0].pageY;
            console.log(touchY);
            $li.on("touchmove",function(e){
                var newTouchY= e.originalEvent.touches[0].pageY;
                $(this).siblings("li").hide();

                if(newTouchY<touchY){
                    nextPreIndex=nowIndex==$li.length-1?0:nowIndex+1;
                    $li.eq(nextPreIndex).css("transform","translate(0,"+(viewHeight+newTouchY-touchY)+"px)");
                }else if(newTouchY>touchY){
                    nextPreIndex=nowIndex==$li.length-1?0:nowIndex-1;
                    $li.eq(nextPreIndex).css("transform","translate(0,"+(-viewHeight+newTouchY-touchY)+"px)");
                }else{
                    ok=true;
                }
                $(this).css("transform","translate(0,"+(newTouchY-touchY)*step+"px)scale("+(1-Math.abs(newTouchY-touchY)/viewHeight*step)+")");
                $li.eq(nextPreIndex).addClass("zIndex").show();
            });
            $li.on("touchend",function(e){
                var newTouchY= e.originalEvent.changedTouches[0].pageY;
                console.log(newTouchY);
                if(newTouchY<touchY){
                    $(this).css("transform","translate(0,"+(-viewHeight*step)+"px)scale("+(1-step)+")");
                }else if(newTouchY>touchY){
                    $(this).css("transform","translate(0,"+(viewHeight*step)+"px)scale("+(1-step)+")");
                }else{
                    ok=true;
                }
                $li.eq(nextPreIndex).css("transform","translate(0,0)");
                $li.eq(nextPreIndex).css("transition",".3s");
                $li.eq(nowIndex).css("transition",".3s");
                $li.off(".move");
            });
        });
        $li.on("transitionend webkitTransitionend",function(e){
            if(!$li.is(e.target)){
                return;
            }
            resetFn();
        });
        function  resetFn(){
            $li.css("transition","");
            $li.css("transform","");
            $li.eq(nextPreIndex).siblings("li").hide();
            $li.eq(nextPreIndex).removeClass("zIndex");
            ok=true;
        }
    }
});