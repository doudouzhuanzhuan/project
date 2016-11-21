/**
 * 初始化
 */
function init(){
    list=[];
    clearInterval(loopFun);
}
var obj=document.querySelector(".c0");
loopFun=null;
init();
var isAnimation=false;

/**
 * 点击事件
 */
document.getElementById("befor").onclick=function(){
    if(!isAnimation){
        init();
        loopLeft(obj);
        changeColor();
    }else{
        console.log("遍历中。。。");
    }
}
document.getElementById("center").onclick=function(){
    if(!isAnimation) {
        init();
        loopCenter(obj);
        changeColor();
    }else{
        console.log("遍历中。。。");
    }
}
document.getElementById("after").onclick=function(){
    if(!isAnimation) {
        init();
        loopRight(obj);
        changeColor();
    }else{
        console.log("遍历中。。。");
    }
}
/**
 * 主逻辑
 */
function loopLeft(obj){
    if(obj){
        list.push(obj);
        loopLeft(obj.children[0]);
        loopLeft(obj.children[obj.children.length-1]);
    }
}
function loopCenter(obj){
    if(obj){
        loopCenter(obj.children[0]);
        list.push(obj);
        loopCenter(obj.children[obj.children.length-1]);
    }
}
function loopRight(obj){
    if(obj){
        loopRight(obj.children[0]);
        loopRight(obj.children[obj.children.length-1]);
        list.push(obj);
    }
}
/**
 * 渲染
 */
function changeColor(){
    var i=0;
    isAnimation=true;
    list[i].style.backgroundColor="#acf";
    loopFun=setInterval(function(){
        i++;
        if(i<list.length){
            list[i].style.backgroundColor="#acf";
            list[i-1].style.backgroundColor="#fff";
        }else{
            list[i-1].style.backgroundColor="#fff";
            clearInterval(loopFun);
            isAnimation=false;
        }
    },1000)
}

