/**
 * Created by cz on 2016/9/29.
 */
$(function () {
    var name=storage.getCookie("name");
    if(name){
        $(".personal>span:nth-child(1)").html(name);
    }
    $(".button").click(function () {
        var pwd=$(".pwd").val();
        var checkPwd=$(".checkPwd").val();
        if(checkPwd==pwd){
            if(pwd.length>6){
                $.post("http://ks.bokanedu.com/account/updatePwd",{'pwd':pwd},function (data) {
                     if(data=="errorLogin"){
                         location.href="index.html";
                     }else if(data="true"){
                         layer.msg("修改成功，请返回个人中心",{time:3000});
                     }else{
                         layer.msg("操作次数太多，请重试",{time:3000});
                     }
                });
            }else{
                layer.msg("密码不安全，请重试",{time:3000});
            }
        }else{
            layer.msg("密码不一致，请重试",{time:3000});
        }
    });
})