import QQMapWX from "@/libs/qqmap-wx-jssdk.js";
import AMapWx from "@/libs/amap-wx.js"
/**
 * 腾讯地图key web-js-service key
 */
const qqMapKey = "2VSBZ-C72CZ-RCGXH-7A5JQ-H3J7T-P2BGO";
/**
 * 高德地图key wxkey微信小程序key
 */
const aMapKey = "01aff553e74efe49ab7620ce144e6aec";



/** 
 * 逆地址解析
 * @param {Object}  vm
 * @param {Object} location
 * @param {Object} callback
 */
function qqReverseGeocoder(vm, lat, lon, callback) {
	let qqmap = new QQMapWX({
		key: qqMapKey, //自己申请的key
		vm: vm
	})
	let location = {
		latitude: lat,
		longitude: lon
	}
	qqmap.reverseGeocoder({
		location: location,
		success(addressRes) {
			let address = addressRes.result.address
			callback(address)
			console.log('腾讯->', address)
		},
		fail(res) {
			console.log('失败', res)
		}
	});
}
/**
 * @param {Object} vm  当前页面vm
 * @param {Object} from 起点
 * @param {Object} to  终点,坐标数组，可传多个坐标
 */
function qqDistance(vm, from, to) {
	let qqmap = new QQMapWX({
		key: qqMapKey, //自己申请的key
		vm: vm //vm对象仅解决H5请求跨域问题
	})
	return new Promise((resolve, reject) => {
		qqmap.calculateDistance({
			mode: 'straight', //driving,walking,straight  驾车 ，步行，直线
			from: from,
			to: to,
			success: res => {
				console.log('获取距离成功')
				resolve(res)
			},
			fail: error => {
				console.log('获取距离失败')
				reject(error)
			}
		})
	})
}

/**
 * 腾讯地图轨迹
 * @param {Object} from 起点
 * @param {Object} to  终点
 */
function qqDirection(vm, from, to) {
	let qqmap = new QQMapWX({
		key: qqMapKey, //自己申请的key
		vm: vm //vm对象仅解决H5请求跨域问题
	})
	return new Promise((resolve, reject) => {
		qqmap.direction({
			mode: 'bicycling',
			from: from,
			to: to,
			success: res => {
				console.log(res);
				console.log('获取路线成功');
				let ret = res;
				let coors = ret.result.routes[0].polyline;
				//路线
				let pl = [];
				//坐标解压（返回的点串坐标，通过前向差分进行压缩）
				let kr = 1000000;
				for (var i = 2; i < coors.length; i++) {
					coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
				}
				//将解压后的坐标放入点串数组pl中
				for (var i = 0; i < coors.length; i += 2) {
					pl.push({
						latitude: coors[i],
						longitude: coors[i + 1]
					})
				}
				//返回路线
				resolve(pl)
			},
			fail: error => {
				console.log('获取路线失败');
				console.log(error)
				reject(error)
			}
		})
	})
}
/**
 * 高德地图查询天气
 */
function getWeather(callback) {
	const aMap = new AMapWx.AMapWX({
		key: aMapKey
	});
	console.log('天气查询')
	aMap.getWeather({
		success: res => {
			console.log('查询天气成功!')
			callback(res);
		},
		fail: error => {
			console.log('查询天气失败:' + error);
		}
	})
}

export default {
	qqReverseGeocoder,
	qqDistance,
	qqDirection,
	getWeather
}