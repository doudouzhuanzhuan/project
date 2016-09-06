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
 *      重复tag自动删除
 *      允许10个Tag,多余10个把前面的删掉
 *      鼠标停在tag上增加删除二字
 *      为tag做处理
 *      初始化
 * 构造函数
 *      保存数组
 *      验证方法
 *      初始化
 */
var viewCenter=(function(){
    function tagFun(obj,text,type){
        type?this.init():this.init("input");
    }
    tagFun.prototype={
        atr:[],
        init:function(type){
            var _this=this;
            if(type=="input"){
                var tag=document.querySelector("#tag");
                tag.addEventListener("keydown",function(event){
                    var keycode=event.keyCode;
                    if(keycode===13||keycode===188||keycode===32){
                        var value=tag.value.match(/[^\s,]+/)[0];
                        if(!_this.repeat(value)){
                            _this.atr.push(value);
                        }else{
                            console.log("center repeat!");
                        }
                        this.value="";
                        _this.createbox();
                    }
                },false)
                var tagconobj=document.querySelector(".tagcon");
                tagconobj.addEventListener("click",function(event){
                    _this.remove(event.target,_this);
                },false);
                // tagconobj.addEventListener("mouseover",function(event){
                //     _this.mouseover(event.target,_this);
                //
                // },false)
                // tagconobj.addEventListener("mouseout",function(event){
                //     _this.mouseout(event.target,_this);
                // },true)
            }
        },
        mouseover:function(event,_this){
            if(event.tagName.toLocaleLowerCase()=="p") {
                _this.createbox(event.getAttribute("attr-item"));
            }
        },
        mouseout:function(event,_this){
            //if(event.tagName.toLocaleLowerCase()=="p") {
                //alert("dd");
                _this.createbox();
            //}
        },
        remove:function(event,_this){
            if(event.tagName.toLocaleLowerCase()=="p"){
                _this.atr.splice(event.getAttribute("attr-item"),1);
                _this.createbox();
            }
        },
        repeat:function(value){
            for(var name in this.atr){
                if(this.atr[name]===value){
                    return true;
                }
            }
        },
        createbox:function(index){
            var tagconobj=document.querySelector(".tagcon");
            var tagtext="";
            for(var name in this.atr){
                if(index===name){
                    tagtext+="<p attr-item='"+name+"'>"+"删除:"+this.atr[name]+"</p>";
                    console.log(index);
                }else{
                    tagtext+="<p attr-item='"+name+"'>"+this.atr[name]+"</p>";
                }
            }
            tagconobj.innerHTML=tagtext;
        }
    }

    return tagFun;

})();
var input=new viewCenter("#tag",".tagcon");