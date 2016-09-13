function $(name){
    return document.querySelector(name);
}
var root=$("#root");
function init(){
    var list=[];
    $("#deep-loop").onclick=function(){
        dl_Leep(root,list);
        animateFun(list);
    }
    // $("#wide-loop").onclick=wl_Loop();
    // $("#deep-search").onclick=ds_Loop();
    // $("#wide-search").onclick=ws_Loop();

}
function dl_Leep(obj,list){
    if(obj){
        list.push(obj);
        for(var i=0;i<obj.children.length;i++){
            dl_Leep(obj.children[i],list);
        }
    }
}
function animateFun(list){
    var i=1;
    list[i].style.backgroundColor="#ff7a0e";
    var timer=setInterval(function(){
        if(i>=list.length){
            list[i-1].style.backgroundColor="#fff";
            clearInterval(timer);
            return;
        }
        list[i-1].style.backgroundColor="#fff";
        list[i].style.backgroundColor="#ff7a0e";
        i++;
    },200)

}
init();