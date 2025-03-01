function formatTime(t) {
	t = t || Date.now();
	let time = new Date(t);
	let str = time.getFullYear() +'-';
	str += time.getMonth() < 9 ? ('0' + (time.getMonth() + 1)) : (time.getMonth() + 1);
	str += '-';
	str += time.getDate() < 10 ? ('0' + time.getDate()) : time.getDate();
	str += ' ';
	str += time.getHours();
	str += ':';
	str += time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes();
	return str;
}

function formatDay(t) {
	t = t || Date.now();
	let time = new Date(t);
	let str = time.getFullYear() +'-';
	str += time.getMonth() < 9 ? ('0' + (time.getMonth() + 1)) : (time.getMonth() + 1);
	str += '-';
	str += time.getDate() < 10 ? ('0' + time.getDate()) : time.getDate();
	return str;
}

function formatePhoneNum(number) {
	let start = number.slice(0,4);
	let end = number.slice(7,11);
	return start + "...." + end;
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	//单位毫秒
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	duration: function(milliseconds) {
		var duration = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				duration = Math.floor(milliseconds / this.UNITS[key]) + key ;
				break;
			}
		}
		return duration;
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

export {
	formatTime,
	formatLocation,
	dateUtils,
	formatePhoneNum,
	formatDay
}
