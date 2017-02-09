/**
 * Created by cz on 2016/9/28.
 */
$(function () {
    var name=storage.getCookie("name");
    var id=storage.getCookie("id");
    if(name){
        $(".personal>span:nth-child(1)").html(name);
        $(".infoPer>div:nth-child(2)>span:nth-child(1)").next().html("&nbsp;&nbsp;"+name);
    }
    if(id){
        $(".infoPer>div:nth-child(1)>span:nth-child(1)").next().html("&nbsp;&nbsp;"+id);
    }
    var page=Number(storage.getInfo("page"));
    if(!page){
        page=0;
    }
    function getLetter(index) {
        var array=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        return array[index];
    }
    function getArraySort(array) {
        var array_val=array.split(",");
        str="";
        array_val.sort(function(a,b){return a.localeCompare(b)});
        for(var i=0;i<array_val.length;i++){
            str+=array_val[i]+",";
        }
        str=str.substring(0,str.length-1);
        return str;
    }
    $(window).on("load resize",function () {
        $(".right,.left").css("min-height",($("body").height()-190)+"px");
        $(".exam_infos").css("height",$(".right").height()-142+"px");
    });
    var hour=storage.getInfo("hour");
    var min=storage.getInfo("min");
    var second=storage.getInfo("second");
    if(!hour && !min && !second){
        hour=1;
        min=30;
        second=0;
    }
    var time=new Date();
    time.setHours(hour);
    time.setMinutes(min);
    time.setSeconds(second);
    var timeout;
    function countdown(ele){
        var hour=time.getHours();
        var min=time.getMinutes();
        var second=time.getSeconds();
        if((hour=="0"&&min=="0"&&second=="0")){
            storage.allRemoveInfo();
            clearInterval(timeout);
            location.href="Questions.html";
        }
        time.setSeconds(second-1);
        storage.setInfo("hour",hour);
        storage.setInfo("min",min);
        storage.setInfo("second",second);
        hour<10?hour="0"+hour:hour;
        min<10?min="0"+min:min;
        second<10?second="0"+second:second;
        $(ele).html(hour+"&nbsp;:&nbsp;"+min+"&nbsp;:&nbsp;"+second);

    }
    countdown(".time>span");
    timeout= setInterval(function () {
        countdown(".time>span");
    },1000);
    function getExam(json,index,maxLength) {
        var ele="<li id='"+json.id+"'><div>"+index+"."+json.content+"&nbsp;(<span></span>)</div><ul class='list_an'>";
        for(var i=0;i<json.option.length;i++){
            ele+="<li>"+getLetter(i)+"、"+json.option[i].option+"</li>";
        }
        ele+="</ul><div class='your_an'><p>你选择答案是&nbsp;&nbsp;:</p>";
        for(var i=0;i<json.option.length;i++){
            ele+="<div><input name='your_an' type='radio' value='"+getLetter(i)+"'>"+getLetter(i)+"</div>";
        }
        if(index==maxLength){
            ele+="<a class='next' href='###'>提交</a>";
        }else{
            ele+="<a class='next' href='###'>下一题</a>";
        }
        ele+="</div></li>";
        return $(ele);
    }
    function getExamTwo(json,index,maxLength) {
        var ele="<li id='"+json.id+"'><div>"+index+"."+json.content+"&nbsp;(<span></span>)</div><ul class='list_an'>";
        for(var i=0;i<json.option.length;i++){
            ele+="<li>"+getLetter(i)+"、"+json.option[i].option+"</li>";
        }
        ele+="</ul><div class='your_an'><p>你选择答案是&nbsp;&nbsp;:</p>";
        for(var i=0;i<json.option.length;i++){
            ele+="<div><input name='your_an' type='checkbox' value='"+getLetter(i)+"'>"+getLetter(i)+"</div>";
        }
        if(index==maxLength){
            ele+="<a class='next' href='###'>提交</a>";
        }else{
            ele+="<a class='next' href='###'>下一题</a>";
        }
        ele+="</div></li>";
        return $(ele);
    }
    function getExamThree(json,index,maxLength) {
        var ele="<li id='"+json.id+"'><div>"+index+"."+json.content+"&nbsp;(<span></span>)</div>";
        ele+="<div class='your_an'><p>你选择答案是&nbsp;&nbsp;:</p>";
        ele+="<div><input name='your_an' type='radio' value='1'>对</div>";
        ele+="<div><input name='your_an' type='radio' value='0'>错</div>";
        if(index==maxLength){
            ele+="<a class='next' href='###'>提交</a>";
        }else{
            ele+="<a class='next' href='###'>下一题</a>";
        }
        ele+="</div></li>";
        return $(ele);
    }
    function getIndex(length,title) {
        var ele="<div class='class_exam'><p>"+title+"</p><ul>";
        for(var i=1;i<=length;i++){
            ele+="<li><div>"+i+"</div></li>";
        }
        ele+="</ul></div>";
        return $(ele);
    }
    var datas=storage.getInfo("data_info");
    var type=Number(storage.getInfo("type"));
    var array=["","单选题","多选题","判断题"];
    var array_list=["",5,6,7];
    var array_info=[];
    var yz=storage.getInfo("yz");
    if(!yz){
        yz="";
    }
    if(datas && type){
        if(datas=="errorLogin"){
            clearInterval(timeout);
            var i=3;
            var time=null;
            time=setInterval(function () {
                layer.msg("未登录返回登录，倒计时"+i+"s",{time:3000});
                i--;
                if(i<0){
                    clearInterval(time);
                    location.href="Questions.html";
                }
            },1000);
        }else{
            var data=JSON.parse(datas);
            var array_value="";
            var flag="";
            var flags="";
            $(".exam_infos").append(getIndex(data.list.length,array[type]));
            $(".exam_infos>div:nth-child(1)").children("ul").show();
            if(yz){
                var yzs=yz.split(",");
                for(var i=0;i<$(".exam_infos>div:nth-child(1)>ul>li>div").size();i++){
                    if(yzs[i]=="true"){
                        $(".exam_infos>div:nth-child(1)>ul>li>div").eq(i).addClass("color1");
                    }else if(yzs[i]=="false"){
                        $(".exam_infos>div:nth-child(1)>ul>li>div").eq(i).addClass("color2");
                    }
                }
            }
            if(type==1){
                for(var i=0;i<data.list.length;i++){
                    $(".exam_info").append(getExam(data.list[i],i+1,data.list.length));
                }
            }else if(type==2){
                for(var i=0;i<data.list.length;i++){
                    $(".exam_info").append(getExamTwo(data.list[i],i+1,data.list.length));
                }
            }else{
                for(var i=0;i<data.list.length;i++){
                    $(".exam_info").append(getExamThree(data.list[i],i+1,data.list.length));
                }
            }
            $(".exam_info>li").eq(page).show();
            $(".your_an>div>input").on("change",function () {
                var ele=$(this).parent().parent().parent().children("div").children("span");
                if(type==3){
                    if($(this).val()=="0"){
                        flag="×";
                    }else if($(this).val()=="1"){
                        flag="√";
                    }
                    array_value=$(this).val();
                }else if(type==2){
                    if ($(this)[0].checked){
                        flags+=$(this).val()+",";
                    }else {
                        if(flags.indexOf($(this).val()+",")>-1){
                            flags=flags.replace($(this).val()+",","");
                        }
                    }
                    flag=flags.substring(0,flags.length-1);
                    array_value=flag;
                }else if(type==1){
                    flag=$(this).val();
                    array_value=$(this).val();
                }
                $(ele).html(flag);
                array_info.push($(this).val());
            });
            $(".exam_info>li").eq(page).children(".your_an").children(".next").click(function () {
                var qid=$(".exam_info>li").eq(page).attr("id");
                if(type==2){
                    array_value=getArraySort(array_value);
                }
                if(array_value){
                    $.post("http://ks.bokanedu.com/KaoShi/verify",{"qid":qid,"option":array_value,"kid":array_list[type]},function (data) {
                        if(data=="errorLogin"){
                            location.href="index.html";
                        }else if(data.baocun=="true"){
                            if(data.yanzheng=="true"){
                                yz+=data.yanzheng+",";
                                $(".exam_infos>div:nth-child(1)>ul>li>div").eq(page).addClass("color1");
                            }else{
                                yz+=data.yanzheng+",";
                                $(".exam_infos>div:nth-child(1)>ul>li>div").eq(page).addClass("color2");
                            }
                            storage.setInfo("yz",yz);
                            storage.setInfo("page",page+1);
                            if(data.str=="已完成" || data.str=="已经答题上限了"){
                                storage.allRemoveInfo();
                                clearInterval(timeout);
                                var i=3;
                                var time=null;
                                time=setInterval(function () {
                                    layer.msg("请返回个人中心，倒计时"+i+"s",{time:3000});
                                    i--;
                                    if(i<0){
                                        clearInterval(time);
                                        location.href="Questions.html";
                                    }
                                },1000);
                            }else{
                                location.reload();
                            }
                        }else if(data.baocun=="false"){
                            layer.msg("请重新选择答案",{time:3000});
                        }
                    });
                }else {
                    layer.msg("请填答案");
                }
            });
        }
    }
});