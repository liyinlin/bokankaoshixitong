/**
 * Created by cz on 2016/11/2.
 */
$(".list_info").hover(function () {
    $(".list_info>ul").animate({"height":"124px"},100);
},function () {
    $(".list_info>ul").animate({"height":"0px"},100);
});