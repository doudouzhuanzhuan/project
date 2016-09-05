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
        if(this.str.length<60){
            var value=document.getElementsByName("sum")[0].value;
            if(/^([1-9]\d|100)$/.test(value)){
                this.str.unshift(value);
            }else{
                console.log("请输入10~100整数");
            }
            this.change();
        }else{
            console.log("不能超过"+this.str.length+"个");
        }
    },
    rightPush:function(){
        if(this.str.length<60){
            var value=document.getElementsByName("sum")[0].value;
            if(/^([1-9]\d|100)$/.test(value)){
                this.str.push(value);
            }else{
                console.log("请输入10~100整数");
            }
            this.change();
        }else{
            console.log("不能超过"+this.str.length+"个");
        }
    },
    leftPop:function(){
        this.str.shift();
        this.change();
    },
    rightPop:function(){
        this.str.pop();
        this.change();
    },
    change:function(length,index){
        //console.log(length+":"+index);
        var text="";
        for(var value in this.str){
            var rgb=(255-parseInt(Math.random()*100))+","+
                (255-parseInt(Math.random()*100))+","+
                (255-parseInt(Math.random()*100));
            var bg="";
            if(length==value||index==value){
                bg="background: red;";
            }

            text+="<p style='height: "+parseInt(this.str[value])*3+"px;"+
                //"background: rgb("+rgb+");"+
                bg+
                "'>"+
                parseInt(this.str[value])+"</p>";
        }
        content.innerHTML=text;
        addeverybox();
    },
    remove:function(item){
        this.str.splice(item,1);
        this.change();
    },
    sort2:function(length){//剩余长度
        var index=0;//当前比较
        var max=0;//默认最大为数组第一个
        var loop=setInterval(function(){
            if(length==1){
                clearInterval(loop);
            }
            if(length==index){
                var b=obj.str[length-1];
                obj.str[length-1]=obj.str[max];
                obj.str[max]=b;
                --length;
                index=0;
            }
            if(obj.str[index]>obj.str[max]){
                max=index;
            }
            obj.change(index,max);
            index++;
        },10)
    },
    radombox:function(){
        for(var i=0;i<60;i++){
            this.str[i]=parseInt(Math.random()*(100+1-10)+10);
        }
        this.change();
    }
}
function addeverybox(){
    var p=content.getElementsByTagName("p");
    for(var item=0;item<p.length;item++){
        addeventListener(p[item],"click",function(item){
            return function(){return obj.remove(item);};
        }(item),false);
    }
}
addeventListener(but[0],"click",function(){obj.leftPush()},false);//直接传入函数后leftPush中的this会变为点击对象
addeventListener(but[1],"click",function(){obj.rightPush()},false);
addeventListener(but[2],"click",function(){obj.leftPop()},false);
addeventListener(but[3],"click",function(){obj.rightPop()},false);
addeventListener(but[4],"click",function(){obj.radombox()},false);
addeventListener(but[5],"click",function(){obj.sort2(obj.str.length)},false);//obj.str.length