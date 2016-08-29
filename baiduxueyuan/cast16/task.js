/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
function addEventListener(obj,type,fn,boolean){
	if(obj.addEventListener){
		obj.addEventListener(type,fn,boolean);
	}else if(obj.attachEvent){
		obj.attachEvent(type,fn);
	}
}
function addAqiData() {
	var cityname=document.getElementById("aqi-city-input").value.trim();
	var value=document.getElementById("aqi-value-input").value.trim();
	var attr=[];

	if(!/^[a-zA-Z\u4E00-\u9FA5]+$/.test(cityname)){//中英文
		console.log(cityname);
		return false;
	}
	if(!/^\d+$/.test(value)){//中英文
		console.log(value);
		return false;
	}
	aqiData[cityname]=value;//避免了重复命名
	//console.log(aqiData);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table=document.getElementById("aqi-table");
	//aqiData.forEach(aa); aqiData是对象，没有改方法
	var tr="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var name in aqiData){
		tr+=
			"<tr><td>"+name+"</td><td>"+
			aqiData[name]+"</td><td><button data-name='"+
			name+"'>删除</button></td></tr>"
		//console.log(tr);
	}
	table.innerHTML=tr;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
	// do sth.
	if(event.target.tagName.toLowerCase()=="button"){
		//var name=event.target.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML;
		var name=event.target.getAttribute("data-name");
		//console.log(name);
		delete aqiData[name];
		renderAqiList();
	}
}

function init() {
	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById("add-btn").onclick=addBtnHandle;

	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

	addEventListener(document.getElementById("aqi-table"),"click",delBtnHandle,false);
}

init();

/**
 * dataset IE11+
 * 通过使用自定义属性的方式更能简化操作
 */

