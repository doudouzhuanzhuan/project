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

var content=document.getElementById("content");
var but=document.getElementsByTagName("button");
var obj={
    str:[],
    Push:function(path){
        var value=document.getElementById("text").value;
        var strs=value.match(/[0-9a-zA-Z\u4e00-\u9fa5]+/mig);
        if(strs!=null&&this.str.length+strs.length<=60){
            if(path=="left"){
                this.str=strs.concat(this.str);
                //this.str.unshift(value);
            }else{
                this.str=this.str.concat(strs);
                //this.str.push(value);
            }
            this.change();
        }else{
            console.log("不能超过"+this.str.length+"个");
        }
    },

    change:function(serchtext){
        var text="";
        var re = new RegExp(serchtext,"gi");
        for(var value in this.str){
            if(serchtext!=undefined){
                var span=this.str[value].replace(re,"<span>"+serchtext+"</span>");
                text+="<p>"+ span +"</p>";
            }else{
                text+="<p>"+ this.str[value] +"</p>";
            }
        }
        content.innerHTML=text;
        addeverybox();
    },
    remove:function(item){
        this.str.splice(item,1);
        this.change();
    },
    search:function(){
        var serchtext=document.getElementById("searchtext").value;
        this.change(serchtext);

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
addeventListener(but[0],"click",function(){obj.Push("left")},false);//直接传入函数后leftPush中的this会变为点击对象
addeventListener(but[1],"click",function(){obj.Push("right")},false);
// addeventListener(but[2],"click",function(){obj.leftPop()},false);
// addeventListener(but[3],"click",function(){obj.rightPop()},false);
// addeventListener(but[4],"click",function(){obj.radombox()},false);
// addeventListener(but[5],"click",function(){obj.sort2(obj.str.length)},false);//obj.str.length
addeventListener(but[6],"click",function(){obj.search()},false);//obj.str.length