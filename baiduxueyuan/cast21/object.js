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
 * 说明:
 *      目前只支持IE9+
 *      需要改进的地方是监听函数可以放在原型函数中,用来节省内存,但必要性不大
 * 不足:
 *      不知道如何向监听函数中传递参数
 *      如果数据量大那么鼠标移出渲染方式性能太低,直接在元素上操作即可(9月7日解决)
 *
 */

/**
 * 通用函数
 */
function addListen(obj,fun,type,boolean){
    if(obj.addEventListener){
        obj.addEventListener(type,fun,boolean);
    }else if(obj.attachEvent){
        obj.attachEvent("on"+type,fun);
    }else{
        obj["on"+type]=fun;
    }
}
function $(select){return document.querySelector(select);}
/**
 * /通用函数
 */
var viewCenter=(function(){
    function main(type){
        var _this=this;//供监听函数使用
        this.arr=[];
        if(type=="single"){
            this.center=function(event){
                var keycode=event.keyCode;
                if(keycode==32||keycode==188||keycode==13){
                    event.preventDefault();
                    var item=this.value.match(/[^,\s]+/);
                    if(item){
                        _this.setArr(item[0]);
                    }
                    _this.createbox($(".tagcon"));
                    this.value="";
                }
            }
            addListen($("#tag"),this.center,"keydown",false);
            var boxwrap=$(".tagcon");
        }else if(type=="some"){
            this.center=function(){
                var value=$("#like").value;
                var arr=value.match(/[0-9a-zA-Z\u4e00-\u9fa5]+/g);
                var filler_arr=[];//过滤重复
                for(var name in arr){
                    if(filler_arr.indexOf(arr[name])===-1){
                        filler_arr.push(arr[name]);
                    }
                }
                if(filler_arr.length>0){
                    _this.setArr(filler_arr);
                    _this.createbox($(".likecon"));
                }
                $("#like").value="";
            }
            addListen($("#ok"),this.center,"click",false);
            var boxwrap=$(".likecon")
        }
        /**
         * 监听函数
         */
        addListen(boxwrap,function(){
            if(event.target.tagName.toLowerCase()=="p"){
                //如何向监听函数中传入参数?
                _this.arr.splice(_this.arr.indexOf(event.target.innerHTML),1);
                _this.createbox(this);
        }
        },"click",false);
        addListen(boxwrap,this.mouseover,"mouseover",false);
        addListen(boxwrap,this.mouseout,"mouseout",false);
        /**
         * /监听函数
         */
    }
    main.prototype={
        /** 处理数组 **/
        setArr:function(item){
            if(this.arr.indexOf(item)===-1){//IE9+
                this.arr=this.arr.concat(item);
            }
            if(this.arr.length>10){
                this.arr=this.arr.slice(-10);
            }
        },
        /** 创建元素块 **/
        createbox:function(obj){
            var str="";
            for(var name in this.arr){
                str+="<p>"+this.arr[name]+"</p>";
            }
            obj.innerHTML=str;
        },
        /** 鼠标移入 **/
        mouseover:function(){
            if(event.target.tagName.toLowerCase()=="p"){
                event.target.innerHTML="删除:"+event.target.innerHTML;
            }
        },
        /** 鼠标移出 **/
        mouseout:function(){
            if(event.target.tagName.toLowerCase()=="p"){
                event.target.innerHTML=event.target.innerHTML.replace(/^(删除:)+/,"");
            }
        }
    }
    return main;//viewCenter只作为构造函数存在,主逻辑在init内
})();
var tag=new viewCenter("single");
var like=new viewCenter("some");