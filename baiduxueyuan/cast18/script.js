var content=document.getElementById("content"),
    from=document.getElementById("from");
from.addEventListener("click",function(event){
    var _this=event.target;
    var id=_this.getAttribute("id");
    var old_p=content.getElementsByTagName("p");
    if(id=="leftin"||id=="rightin"){//isInt(value)
        var value=document.getElementsByName("sum")[0].value;
        if(/^\d+$/.test(value)){
            var p_tag=document.createElement("p");
            p_tag.innerHTML=value;
            if(id=="leftin"){
                content.insertBefore(p_tag,old_p[0]);
            }else{
                content.appendChild(p_tag);
            }
        }else{
            console.log("你的输入value值："+value+"，请输入数字");
        }
    }else{
        if(id=="rightout"){
            content.removeChild(old_p[old_p.length-1]);
        }else if(id=="leftout"){
            content.removeChild(old_p[0]);
        }
    }
},false)