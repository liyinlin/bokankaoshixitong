/**
 * Created by cz on 2016/9/28.
 */
$(function () {
   $(".form>select").on("change",function () {
      if($(this).val()=="请选择考试平台") {
          $(this).css("color","#b6b6b6");
      }else{
          $(this).css("color","#333");
      }
   });
   $(".login_btn").click(function () {
       var username=$(".username").val();
       var password=$(".password").val();
       var character=$(".character").val();
       if(character && character != "请选择考试平台"){
           if(username && password){
               $.post("http://ks.bokanedu.com/account/login",{"id":username,"pwd":password,"rid":character},function (data) {
                   if(data=="true"){
                       location.href="select.html";
                   }else {
                       layer.msg("账号或密码错误",{time:3000});
                   }
               });
           }else{
               layer.msg("请填写登录信息",{time:3000});
           }
       }else{
           layer.msg("请填写登录平台",{time:3000});
       }
   });
})