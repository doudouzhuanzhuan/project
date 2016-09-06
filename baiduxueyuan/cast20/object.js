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
    Push:function(){
        var value=document.getElementById("text").value;
        var strs=value.match(/[0-9a-zA-Z\u4e00-\u9fa5]+/mig);
        if(strs!=null&&this.str.length+strs.length<=60){
            this.str=this.str.concat(strs);
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
    },
    search:function(){
        var serchtext=document.getElementById("search").value;
        this.change(serchtext);
    }
}
/**
 * join 将数组以字符串拼接
 * map 遍历数组执行某函数返回执行后的值(不影响数组) IE9
 *
 * split()切割数组
 * replace()正则替换
 * exec()高级匹配
 *
 * concat()合并数组,oldarry.concat(newarry);
 * filter()筛选数组 IE9
 *
 *
 */
addeventListener(but[0],"click",function(){obj.Push()},false);//直接传入函数后leftPush中的this会变为点击对象
addeventListener(but[1],"click",function(){obj.search()},false);

