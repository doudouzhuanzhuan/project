function $(name){
    return document.querySelector(name);
}
var root=$("#root");
var index=0;
function init(){
    $("#deep-loop").onclick=function(){
        var list=[];
        dl_fun(root,list);
        animateFun(list);
    }
    $("#wide-loop").onclick=function(){
        var list=[];
        index=0;
        wl_fun(root,list);
        animateFun(list);
    }
    $("#deep-search").onclick=function(){
        var key=$("input").value;
        var list=[];
        dl_fun(root,list);
        animateFun(list,key);
    }
    $("#wide-search").onclick=function(){
        var key=$("input").value;
        var list=[];
        wl_fun(root,list);
        animateFun(list,key);
    }

}
function dl_fun(obj,list){
    if(obj){
        list.push(obj);
        for(var i=0;i<obj.children.length;i++){
            dl_fun(obj.children[i],list);
        }
    }
}
function wl_fun(obj,list){
    if(obj){
        list.push(obj);
        wl_fun(obj.nextElementSibling,list);
        obj=list[index++];
        wl_fun(obj.children[0],list);
    }
}
function animateFun(list,key){
    var i=0;
    timer=setInterval(function(){
        if(i >= list.length){
            clearInterval(timer);
            list[i-1].style.backgroundColor="#fff";
            return;
        }
        if(i !== 0){
            list[i-1].style.backgroundColor="#fff";
        }
        if(key !== undefined && key !== "" && list[i].childNodes[0].nodeValue.trim() === key){
            list[i].style.backgroundColor="#f00";
            clearInterval(timer);
            return;
        }else{
            list[i].style.backgroundColor="#ff7a0e";
        }
        i++;
    },200)

}
init();