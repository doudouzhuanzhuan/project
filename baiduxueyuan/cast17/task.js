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
	var datStr = ''
	for (var i = 1; i < 92; i++) {
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
function renderChart(timetype) {
	console.log(timetype);
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
	var _this=event.target;
	if(_this.value&&_this.value!=pageState.nowGraTime){
		pageState["nowGraTime"]=_this.value;
		renderChart(_this.value);//为什么_this.value会偶尔undefined
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

	// 设置对应数据

	// 调用图表渲染函数
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

	// 给select设置事件，当选项发生变化时调用函数citySelectChange

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
	var week={};
	var month={};
	for(var city in aqiSourceData){
		week[city]={};
		month[city]={};
		var i=0;
		for(var time in aqiSourceData[city]){
			month[city]["2016-01"]=month[city]["2016-02"]=month[city]["2016-03"]=0;
			if(i<31){
				month[city]["2016-01"]+=parseInt(aqiSourceData[city][time]);
				//console.log(month[city]["1月"]+","+aqiSourceData[city][time]);
			}else if(i<60){
				month[city]["2016-02"]+=parseInt(aqiSourceData[city][time]);
			}else{
				month[city]["2016-03"]+=parseInt(aqiSourceData[city][time]);
			}
			i++;
		}
		console.log(city+":"+month[city]["2016-03"]);
	}
	chartData.month=month;
	console.log(chartData["month"]["北京"]["2016-02"]);
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