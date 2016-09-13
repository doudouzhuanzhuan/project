var obj=document.querySelector(".c0");
loopFun=null;
document.getElementById("befor").onclick=function(){
    init();
    loopLeft(obj);
    changeColor();
}
document.getElementById("center").onclick=function(){
    init();
    loopCenter(obj);
    changeColor();
}
document.getElementById("after").onclick=function(){
    init();
    loopRight(obj);
    changeColor();
}
function init(){
    list=[];
    clearInterval(loopFun);
}
function loopLeft(obj){
    if(obj){
        list.push(obj);console.log(obj);
        loopLeft(obj.children[0]);
        loopLeft(obj.children[obj.children.length-1]);
    }
}
function loopCenter(obj){
    if(obj){
        loopCenter(obj.children[0]);
        list.push(obj);console.log(obj);
        loopCenter(obj.children[obj.children.length-1]);
    }
}
function loopRight(obj){
    if(obj){
        loopRight(obj.children[0]);
        loopRight(obj.children[obj.children.length-1]);
        list.push(obj);console.log(obj);
    }
}
function changeColor(){
    var i=0;
    list[i].style.backgroundColor="#acf";
    loopFun=setInterval(function(){
        i++;
        if(i<list.length){
            list[i].style.backgroundColor="#acf";
            list[i-1].style.backgroundColor="#fff";
        }else{
            list[i-1].style.backgroundColor="#fff";
            clearInterval(loopFun);
        }
    },1000)
}
