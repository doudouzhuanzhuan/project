/**
 * Created by liuzhen on 16/8/31.
 * 冒泡排序,但不能演示过程
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
    change:function(){
        var text="";
        for(var value in this.str){
            var rgb=(255-parseInt(Math.random()*100))+","+
                (255-parseInt(Math.random()*100))+","+
                (255-parseInt(Math.random()*100));
            //console.log(rgb);

            text+="<p style='height: "+parseInt(this.str[value])*3+"px;"+
                //"background: rgb("+rgb+");"+
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
    sort1:function(index){
        if(index==1){
            this.str[index]=this.str[index];
            this.change();
        }else{
            for(var i=0;i<index;i++){
                if(this.str[i]>this.str[index-1]){
                    var b=this.str[index-1];
                    this.str[index-1]=this.str[i];
                    this.str[i]=b;
                }
            }
            this.sort1(--index);//有个指向当前函数名的属性
        }
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
addeventListener(but[5],"click",function(){obj.sort1(obj.str.length)},false);