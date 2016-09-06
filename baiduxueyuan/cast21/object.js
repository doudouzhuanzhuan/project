/**
 * Created by liuzhen on 16/8/31.
 */

/**
 基于任务20，将任务20的代码进行抽象、封装，然后在此基础上实现如图中的两个需求：Tag输入和兴趣爱好输入
 如示例图上方，实现一个tag输入框
 要求遇到用户输入空格，逗号，回车时，都自动把当前输入的内容作为一个tag放在输入框下面。
 Tag不能有重复的，遇到重复输入的Tag，自动忽视。
    每个Tag请做trim处理
    最多允许10个Tag，多于10个时，按照录入的先后顺序，把最前面的删掉
    当鼠标悬停在tag上时，tag前增加删除二字，点击tag可删除

 如示例图下方，实现一个兴趣爱好输入的功能
 通过一个Textarea进行兴趣爱好的输入，可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为间隔。
 当点击“确认兴趣爱好”的按钮时，将textarea中的输入按照你设定的间隔符，拆解成一个个的爱好，显示在textarea下方
    爱好不能重复，所以在下方呈现前，需要做一个去重
    每个爱好内容需要做trim处理
    最多允许10个兴趣爱好，多于10个时，按照录入的先后顺序，把最前面的删掉
 **/
/**
 * 使用面向对象的原型进行创建,把通用的方法放在原型函数中,各自的属性和方法放在构造函数中
 * 原型函数
 *      重复tag自动删除、鼠标指向,鼠标移开
 *      允许10个Tag,多余10个把前面的删掉
 *      鼠标停在tag上增加删除二字
 *      为tag做处理
 *      初始化
 * 构造函数
 *      保存数组
 *      验证方法
 *      初始化
 */
function addListen(obj,fun,type,boolean){
    if(obj.addEventListener){
        obj.addEventListener(type,fun,boolean);
    }else if(obj.attachEvent){
        obj.attachEvent("on"+type,fun);
    }else{
        obj["on"+tyoe]=fun;
    }
}
function $(select){return document.querySelector(select);}
var viewCenter=(function(){
    function main(type){
        var _this=this;
        this.arr=[];
        this.init();
        if(type=="single"){
            this.center=function(event){
                var keycode=event.keyCode;
                if(keycode==32||keycode==188||keycode==13){
                    event.preventDefault();
                    var item=this.value.match(/[^,\s]+/)?this.value.match(/[^,\s]+/)[0]:false;//
                    if(item){
                        _this.setArr(item);
                    }
                    _this.createbox($(".tagcon"));
                    this.value="";
                }
            }
            addListen($("#tag"),this.center,"keydown",false);
        }else if(type=="some"){
            this.center=function(){
                var value=$("#like").value;
                var arr=value.match(/[0-9a-zA-Z\u4e00-\u9fa5]+/g);
                var fillerarr=[];//过滤重复
                for(var name in arr){
                    if(fillerarr.indexOf(arr[name])===-1){
                        fillerarr.push(arr[name]);
                    }
                }
                if(fillerarr.length>0){
                    _this.setArr(fillerarr);
                    _this.createbox($(".likecon"));
                }
                $("#like").value="";
            }
            addListen($("#ok"),this.center,"click",false);
        }
    }
    main.prototype={
        setArr:function(item){
            if(this.arr.indexOf(item)===-1){//IE9+
                this.arr=this.arr.concat(item);
            }
            if(this.arr.length>10){
                this.arr=this.arr.slice(-10);
            }
        },
        createbox:function(obj){
            var str="";
            for(var name in this.arr){
                str+="<p>"+this.arr[name]+"</p>\b";
            }
            obj.innerHTML=str;
        },
        init:function(){//原型初始化
            addListen($(".tagcon"),this.removebox,"click",false);
            addListen($(".tagcon"),this.mouseover,"mouseover",false);
            addListen($(".tagcon"),this.mouseout,"mouseout",false);
        },
        removebox:function(event){
            if(event.target.tagName.toLowerCase()=="p"){
                //如何向监听函数中传入参数?
                tag.arr.splice(tag.arr.indexOf(event.target.innerHTML),1);
                tag.createbox($(".tagcon"));
            }
        },
        mouseover:function(event){
            if(event.target.tagName.toLowerCase()=="p"){
                event.target.innerHTML="删除:"+event.target.innerHTML;
            }
        },
        mouseout:function(){
            if(event.target.tagName.toLowerCase()=="p"){
                tag.createbox($(".tagcon"));
            }
        }
    }
    return main;//viewCenter只作为构造函数存在,主逻辑在init内
})();
var tag=new viewCenter("single");
var like=new viewCenter("some");