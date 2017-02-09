/**
 * Created by cz on 2016/11/2.
 */
$(".class_info>div>div").hover(function () {
    $(".class_info>div>div").children("div").css({"margin-top":"0px"});
    $(".class_info>div>div").children("ul").css("display","none");
    $(".class_info>div>div").children("p").css("display","block");
    $(this).children("div").stop(true,true).animate({"margin-top":"-110px"},100);
    var $this=$(this);
    $(this).children("p").hide(0,function () {
        $this.children("ul").show();
    })
},function () {
    $(".class_info>div>div").children("div").css({"margin-top":"0px"});
    $(".class_info>div>div").children("ul").css("display","none");
    $(".class_info>div>div").children("p").css("display","block");
});