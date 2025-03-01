function formatDate (val) {
  // 格式化时间
  let start = new Date(val)
  let y = start.getFullYear()
  let m = (start.getMonth() + 1) > 10 ? (start.getMonth() + 1) : '0' + (start.getMonth() + 1)
  let d = start.getDate() > 10 ? start.getDate() : '0' + start.getDate()
  return y + '-' + m + '-' + d
}

function mistiming (sDate1, sDate2) {
  // 计算开始和结束的时间差
  let aDate, oDate1, oDate2, iDays
  aDate = sDate1.split('-')
  oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  aDate = sDate2.split('-')
  oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
  return iDays + 1
}

function countDate (start, end) {
  // 判断开始和结束之间的时间差是否在90天内
  let days = mistiming(start, end)
  let stateT = days > 90 ? Boolean(0) : Boolean(1)
  return {
    state: stateT,
    day: days
  }
} 46
function timeForMat (count) {
  // 拼接时间
  let time1 = new Date()
  // time1.setTime(time1.getTime() - (24 * 60 * 60 * 1000))
  let Y1 = time1.getFullYear()
  let M1 = ((time1.getMonth() + 1) >= 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
  let D1 = (time1.getDate() >= 10 ? time1.getDate() : '0' + time1.getDate())
  let H1 = time1.getHours()
  let m1 = (time1.getMinutes() >= 10 ? time1.getMinutes() : '0' + time1.getMinutes())
  let S1 = (time1.getSeconds() >= 10 ? time1.getSeconds() : '0' + time1.getSeconds())
  let timer1 = `${Y1}-${M1}-${D1}` // 当前时间
  let time2 = new Date()
  time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count))
  let Y2 = time2.getFullYear()
  let M2 = ((time2.getMonth() + 1) >= 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
  let D2 = (time2.getDate() >= 10 ? time2.getDate() : '0' + time2.getDate())
  let H2 = time2.getHours()
  let m2 = (time2.getMinutes() >= 10 ? time2.getMinutes() : '0' + time2.getMinutes())
  let S2 = (time2.getSeconds() >= 10 ? time2.getSeconds() : '0' + time2.getSeconds())
  let timer2 = `${Y2}-${M2}-${D2}` // 当前时间
  return [timer2, timer1]
}

function yesterday () {
  // 校验是不是选择的昨天
  let time1 = new Date()
  time1.setTime(time1.getTime() - (24 * 60 * 60 * 1000))
  let Y1 = time1.getFullYear()
  let M1 = ((time1.getMonth() + 1) > 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
  let D1 = (time1.getDate() > 10 ? time1.getDate() : '0' + time1.getDate())
  let timer1 = `${Y1}-${M1}-${D1} 00:00:00`
  let timer2 = `${Y1}-${M1}-${D1} 23:59:59`
  return [timer1, timer2]

}

function sevenDays () {
  // 获取最近7天
  let timer = timeForMat(7)
  return timer
}

function thirtyDays () {
  // 获取最近30天
  let timer = timeForMat(30)
  return timer
}
function customDays(count){
    let time2 = new Date()
    time2.setTime(time2.getTime() + (24 * 60 * 60 * 1000 * count))
    let Y2 = time2.getFullYear()
    let M2 = ((time2.getMonth() + 1) > 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
    let D2 = (time2.getDate() > 10 ? time2.getDate() : '0' + time2.getDate())
    let H2 = time2.getHours()
    let m2 = (time2.getMinutes() > 10 ? time2.getMinutes() : '0' + time2.getMinutes())
    let S2 = (time2.getSeconds() > 10 ? time2.getSeconds() : '0' + time2.getSeconds())
    let timer2 = `${Y2}-${M2}-${D2}` // 当前时间
    return timer2
}

function getDataString(date){
	var year = date.getFullYear().toString().padStart(4,'0');
	var month = (date.getMonth()+1).toString().padStart(2,'0');
	var day = date.getDate().toString().padStart(2,'0');
	return `${year}-${month}-${day}`;
}

function getMonthString(date) {
	var fullYear = date.getFullYear();
	var month = date.getMonth()+1;
	var endOfMonth = new Date(fullYear,month,0);
	var startOfMonth = new Date(date.setDate(1));
	//此时可以获取到月初和月末的标准时间格式，想要转化为年月日，则需要使用上面的函数了
	var startTime = getDataString(startOfMonth);
	var endTime = getDataString(endOfMonth);
	return [startTime,endTime];
}

//获取本地时间
function dateTimeStr(str){
	var date = new Date(),
	year = date.getFullYear(), //年
	month = date.getMonth() + 1, //月
	day = date.getDate(), //日
	hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(), //时
	minute = date.getMinutes() < 10 ? date.getMinutes() : date.getMinutes(), //分
	second = date.getSeconds() < 10 ? date.getSeconds() : date.getSeconds(); //秒
	month >= 1 && month <= 9 ? (month = "0" + month) : "";
	day >= 0 && day <= 9 ? (day = "0" + day) : "";
	hour >= 0 && hour <= 9 ? hour : "";
	minute >= 0 && minute <= 9 ? (minute = "0" + minute) : "";
	second >= 0 && second <= 9 ? (second = "0" + second) : "";
	if(str.indexOf('y') != -1){
		str = str.replace('y', year)
	}
	if(str.indexOf('m') != -1){
		str = str.replace('m', month)
	}
	if(str.indexOf('d') != -1){
		str = str.replace('d', day)
	}
	if(str.indexOf('h') != -1){
		str = str.replace('h', hour)
	}
	if(str.indexOf('i') != -1){
		str = str.replace('i', minute)
	}
	if(str.indexOf('s') != -1){
		str = str.replace('s', second)
	}
	return str;
}

export {
  customDays,
  formatDate,
  countDate,
  yesterday,
  sevenDays,
  thirtyDays,
  getMonthString,
  dateTimeStr
}
module.exports = {
	dateTimeStr: dateTimeStr,
}