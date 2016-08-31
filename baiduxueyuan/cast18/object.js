/**
 * Created by liuzhen on 16/8/31.
 */

function addeventListener(obj,type,fun,boolean){
    if(obj.addEventListener){
        obj.addEventListener(type,fun,boolean);
    }else if(obj.attachEvent){
        obj.attachEvent("on"+type,fun);
    }else{
        obj["on"+type]=fun;
    }
}

var from=document.getElementById("from");
var content=document.getElementById("content");
var but=document.getElementsByTagName("button");
var obj={
    str:[],
    leftPush:function(){
        var value=document.getElementsByName("sum")[0].value;
        if(/^\d+$/.test(value)){
            this.str.unshift(value);
        }else{
            console.log("请输入整数");
        }
        this.change();
    },
    rightPush:function(){
        var value=document.getElementsByName("sum")[0].value;
        if(/^\d+$/.test(value)){
            this.str.push(value);
        }else{
            console.log("请输入整数");
        }
        this.change();
    },
    leftPop:function(){
        this.str.shift();
        this.change();
    },
    rightPop:function(){
        this.str.pop();
        this.change();
    },
    change:function(){
        var text="";
        for(var value in this.str){
            text+="<p>"+parseInt(this.str[value])+"</p>";
        }
        content.innerHTML=text;
        addeverybox();
    },
    remove:function(i){
        this.atr.splice(i,1);
        this.atr.change();
    }
}
function addeverybox(){
    var p=content.getElementsByTagName("p");
    for(var i=0;i<p.length;i++){
        addEventListener(p[i],"click",function(){//要使用闭包
            console.log("run?");
            obj.remove(i);
        },false)
    }
}
addeventListener(but[0],"click",function(){obj.leftPush()},false);//直接传入函数后leftPush中的this会变为点击对象
addeventListener(but[1],"click",function(){obj.rightPush()},false);
addeventListener(but[2],"click",function(){obj.leftPop()},false);
addeventListener(but[3],"click",function(){obj.rightPop()},false);