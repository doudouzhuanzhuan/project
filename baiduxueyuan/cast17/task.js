/* 数据格式演示
var aqiSourceData = {
	"北京": {
		"2016-01-01": 10,
		"2016-01-02": 10,
		"2016-01-03": 10,
		"2016-01-04": 10
	}
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
	var y = dat.getFullYear();
	var m = dat.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = dat.getDate();
	d = d < 10 ? '0' + d : d;
	return y + '-' + m + '-' + d;//2016-01-01
}
function randomBuildData(seed) {//
	var returnData = {};
	var dat = new Date("2016-01-01");
	var datStr = '';
	days=96;
	for (var i = 1; i < days; i++) {
		datStr = getDateStr(dat);
		returnData[datStr] = Math.ceil(Math.random() * seed);
		dat.setDate(dat.getDate() + 1);
	}
	return returnData;
}

var aqiSourceData = {
	"北京": randomBuildData(500),
	"上海": randomBuildData(300),
	"广州": randomBuildData(200),
	"深圳": randomBuildData(100),
	"成都": randomBuildData(300),
	"西安": randomBuildData(500),
	"福州": randomBuildData(100),
	"厦门": randomBuildData(100),
	"沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
	nowSelectCity: -1,
	nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart(timetype,city) {
	if(timetype === "day"){
		var text="<ul class='day'>";
		for(var date in chartData["day"][city]){
			var liText="<li title='"+date+"' style='height: "+chartData["day"][city][date]+"px'><div>"+date+":<br>"+chartData["day"][city][date]+"</div></li>";
			text+=liText;
		}
	}
	if(timetype === "month"){
		var text="<ul class='month'>";
		for(var date in chartData["month"][city]){
			var liText="<li title='"+date+"' style='height: "+chartData["month"][city][date]["month"]+"px'><div>"+date+":<br>"+chartData["month"][city][date]["month"]+"</div></li>";
			text+=liText;
		}
	}
	if(timetype === "week"){
		var text="<ul class='week'>";
		for(var date in chartData["month"][city]){
			for(var i=1;chartData["month"][city][date][i] != undefined;i++){
				var liText="<li "+"style='height: "+chartData["month"][city][date][i]+"px'><div>"+date+":<br>"+chartData["month"][city][date][i]+"</div></li>";
				//var liText="<li "+"style='height: "+chartData["month"][city][date][i]+"px;'>"+"</li>";
				text+=liText;
			}
		}
	}
	text+="</ul>"
	document.querySelector(".aqi-chart-wrap").innerHTML=text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
	var _this=event.target;
	if(_this.value&&(_this.value!=pageState.nowGraTime)){//
		pageState.nowGraTime=_this.value;
		var city=document.querySelector("#city-select").value;
		renderChart(_this.value,city);
	}



	// 确定是否选项发生了变化

	// 设置对应数据

	// 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
	// 确定是否选项发生了变化
	console.log("s");
	// 设置对应数据
	var date=document.getElementsByName("gra-time");
	for(var i=0;i<date.length;i++){
		if(date[i].checked === true){
			// 调用图表渲染函数
			renderChart(date[i].value,this.value);
			break;
		}
	}
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var time=document.getElementById("form-gra-time");

	time.addEventListener("click",graTimeChange,false);//mousedown
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
	// 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var citySelect=document.querySelector("#city-select");
	var selectText="";
	for(var city in aqiSourceData){
		selectText+="<option>"+city+"</option>";
	}
	citySelect.innerHTML=selectText;
	// 给select设置事件，当选项发生变化时调用函数citySelectChange
	citySelect.addEventListener("change",citySelectChange,false);


}

/**
 * 初始化图表需要的数据格式
 */

/*var aqiSourceData = {
	"北京": randomBuildData(500),
	"上海": {
		"2016-01-01": 10,
		"2016-01-02": 10,
	}
};*/

function initAqiChartData() {
	// 将原始的源数据处理成图表需要的数据格式
	// 处理好的数据存到 chartData 中
	var month={};
	for(var city in aqiSourceData){
		//aqiSourceData.city.day=[AQI]
		//chartData.week.city["2016-01"]
		month[city]={};
		var weekIndex=1;
		var index=1;//执行到第几天
		for(var day in aqiSourceData[city]){
			/**
			 * 初始化
			 */
			var data7=day.substr(0,7);
			if(month[city][data7] === undefined){
				month[city][data7]={};
				var str=day.split("-");
				var monthEndDay=new Date(str[0],str[1],0).getDate();//当月最后一天是多少号
				var monthItem=0;//累计天数
				var monthSun=0;
				weekIndex=1;
			}
			if(month[city][data7][weekIndex] === undefined){
				month[city][data7][weekIndex]=0;
				var weekSum=0;
				var weekItem=0;
			}
			var nowWeek=new Date(day).getUTCDay();

			/**
			 * 执行运算
			 */
			monthSun+=aqiSourceData[city][day];
			weekSum+=aqiSourceData[city][day];

			monthItem++;
			weekItem++;

			/**
			 * 取平均数
			 */
			if(index === days){
				console.log(aqiSourceData[city][day]);
			}
			if(day.substr(8) == monthEndDay || index === days-1){
				month[city][data7]["month"]=parseInt(monthSun/monthItem);
			}
			if(nowWeek === 0 || day.substr(8) == monthEndDay){
				month[city][data7][weekIndex]=parseInt(weekSum/weekItem);
				weekIndex++;
			}

			index++;
		}

		// console.log(city+":"+month[city]["2016-03"]);
	}
	chartData.day=aqiSourceData;
	chartData.month=month;
	console.log(chartData);
}

/**
 * 初始化函数
 */
function init() {
	initGraTimeForm();
	initCitySelector();
	initAqiChartData();
}

init();

/***
 * 有很多改进的地方,比如进入页面即渲染
 * 柱状图的样式有待改进
 * 因该使用pageState记录表格数据
 * 核心代码部分应再参考网友代码改进
 * 题目给出的思路很清晰,值得思考
 * 下一版从新做一下,不使用题目给的代码,思路更清晰核心代码组件化
 * 如果可以,输入开始时间和结束时间(要查询的天数)进行展示
 * 在没个柱中显示天数
 */
