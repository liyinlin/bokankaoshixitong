/**
 * Created by cz on 2016/9/28.
 */
$(function () {
    var name=storage.getCookie("name");
    if(name){
        $(".personal>span:nth-child(1)").html(name);
    }
    $(window).on("load resize",function () {
        $(".right,.left").css("min-height",($("body").height()-190)+"px");
    });
    $(".list>li").click(function () {
        $(".list>li").removeClass("active");
        $(this).addClass("active")
        $(".info>li").hide();
        $(".info>li").eq($(this).index()).show()
    });
    $(".quit").click(function () {
        $.get("http://ks.bokanedu.com/account/Logout",function () {
             location.href="index.html";
        });
    });
    var data_info=storage.getInfo("data_info");
    var data_type=storage.getInfo("type");
    if(data_info && data_type){
        if(data_type==1){
            $(".species1").removeClass("hui");
            $(".species1").html("继续答题");
            $(".species1").click(function () {
                location.href="examQues.html";
            });
            $(".species2,.species3").click(function () {
                layer.msg("请继续答完未完成的题");
            });
        }else if(data_type==2){
            $(".species2").removeClass("hui");
            $(".species2").html("继续答题");
            $(".species2").click(function () {
                location.href="examQues.html";
            });
            $(".species1,.species3").click(function () {
                layer.msg("请继续答完未完成的题");
            });
        }else{
            $(".species3").removeClass("hui");
            $(".species3").html("继续答题");
            $(".species3").click(function () {
                location.href="examQues.html";
            });
            $(".species1,.species2").click(function () {
                layer.msg("请继续答完未完成的题");
            });
        }
    }else{
        $.get("http://ks.bokanedu.com/account/GetKSInfo",function (data) {
            if(data=="updatePwd"){
                var i=3;
                var time=null;
                time=setInterval(function () {
                    layer.msg("请重置密码，倒计时"+i+"s",{time:3000});
                    i--;
                    if(i<0){
                        clearInterval(time);
                        location.href="resetPwd.html";
                    }
                },1000);
                $(".species>div>a").click(function () {
                    layer.msg("请重置密码",{time:3000});
                });
            }else{
                var array=["",5,6,7];
                $(".species>div>a").click(function () {
                    if($(this).html()=="立即答题"){
                        storage.removeInfo("page");
                        storage.removeInfo("yz");
                        storage.removeInfo("hour");
                        storage.removeInfo("min");
                        storage.removeInfo("second");
                        var i=$(this).parent().parent().index();
                        $.post("http://ks.bokanedu.com/KaoShi/Index",{"type":array[i+1]},function (data) {
                            if(data){
                                storage.setInfo("data_info",JSON.stringify(data));
                                storage.setInfo("type",i+1);
                                location.href="examQues.html";
                            }else{
                                layer.msg("题库空空如也",{time:3000});
                            }
                        });
                    }
                });
                for(var i=0;i<data.length;i++){
                    if(data[i].KeMu=="单选" && data[i].countNum>-1){
                        $(".grade1>span").html(data[i].countNum+"分");
                        $(".species1").addClass("hui");
                        $(".species1").html("已经完成");
                    }else if(data[i].KeMu=="单选" && data[i].countNum<=-1){
                        $(".grade1").html("暂未答题");
                    }else if(data[i].KeMu=="多选" && data[i].countNum>-1){
                        $(".grade2>span").html(data[i].countNum+"分");
                        $(".species2").addClass("hui");
                        $(".species2").html("已经完成");
                    }else if(data[i].KeMu=="多选" && data[i].countNum<=-1){
                        $(".grade2").html("暂未答题");
                    }else if(data[i].KeMu=="判断" && data[i].countNum>-1){
                        $(".grade3>span").html(data[i].countNum+"分");
                        $(".species3").addClass("hui");
                        $(".species3").html("已经完成");
                    }else if(data[i].KeMu=="判断" && data[i].countNum<=-1){
                        $(".grade3").html("暂未答题");
                    }
                }
                if(data[0].countNum>-1 && data[1].countNum>-1 &&data[2].countNum>-1){
                    $(".count").show();
                    $(".count>i").html(data[0].countNum+data[1].countNum+data[2].countNum+"分");
                }else {
                    (".count").hide();
                    $(".count>i").html("0分");
                }
            }
        });
    }
})
