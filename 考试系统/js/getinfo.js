/**
 * Created by cz on 2016/6/28.
 */
var storage={
    setInfo:function(k,v){
        //保存永久数据
        window.localStorage.setItem(k,v);
    },
    getInfo:function(k){
        //读取永久数据
        return window.localStorage.getItem(k);
    },
    removeInfo:function(k){
        //删除永久数据
        window.localStorage.removeItem(k);
    },
    allRemoveInfo:function(){
        //全部删除
        window.localStorage.clear();
    },
    random:function(n) {
        //产生多位的随机数
        var strRnd = "";
        for (var i = 0; i < n; i++) {
            strRnd += Math.floor(Math.random() * 10);
        }
        return strRnd;
    },
    setCookie : function(name,value) {
        var Days = 24*60*60*1000;
        var exp  = new Date();
        exp.setTime(exp.getTime() + Days);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },
    getCookie : function(name) {
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null) return unescape(arr[2]); return null;
    },
}