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
    remove:function(item){
        console.log("run?");
        this.str.splice(item,1);
        this.change();
    }
}
function addeverybox(){
    var p=content.getElementsByTagName("p");
    for(var item=0;item<p.length;item++){
        /*addEventListener(p[i],"click",function(){//要使用闭包
            console.log("run?");
            obj.remove(i);
        },false)*/
        addeventListener(p[item],"click",function(item){
            return function(){return obj.remove(item);};
        }(item),false);
        /**
         * 这里的闭包的作用是保存item变量在添加函数后不被删除
         * 如果不使用闭包
         *  1.循环函数为每一个块(p)添加点击事件
         *  2.点击块能够执行事件,但是item值不能传入,
         *  原因其一为item值已经循环完,此时item==p.length,
         *  其二addeverybox函数已经执行完成,函数内的变量item在点击事件函数中不能被访问
         *
         *  添加闭包
         *  1.点击添加时,循环执行
         *      function(item){
         *          return function(){return obj.remove(item);};
         *      }(item)
         *  将把
         *      function(){return obj.remove(item);}返回给addeventListener函数,
         *  相当于执行
         *      element.addEventListener(event,function(){return obj.remove(item);},false);
         *  2.addeventListener函数执行,由于
         *      obj.addEventListener(type,fun,boolean);
         *  又执行了一次,于是将
         *      obj.remove(item);
         *  返回给了点击事件,也就是相当于
         *      p[item].onclick=obj.remove(item);
         *
         *  3.在执行时由于闭包的作用,item变量一直保存在内存中,每个点击事件执行的函数中的item值是不一样的
         *
         *  一切都只为了传递cur参数
         *  参考:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures#闭包
         */
    }
}
addeventListener(but[0],"click",function(){obj.leftPush()},false);//直接传入函数后leftPush中的this会变为点击对象
addeventListener(but[1],"click",function(){obj.rightPush()},false);
addeventListener(but[2],"click",function(){obj.leftPop()},false);
addeventListener(but[3],"click",function(){obj.rightPop()},false);