import urlConfig from '../config/index.js'

const request = {}
const headers = {}
const noLoginPage = [ //不需要登录的页面
	'/pages/index/index',
	'/pages/login/register/register',
	'/pages/login/login',
	'/pages/login/wxlogin/wxlogin',
	'/pagesIndex/page/campusTakeout/index/index',
	'/pagesIndex/page/campusTakeout/index/listNext/listNext',
	'/pagesUser/page/setting/agreement/agreement',
	'/pagesUser/page/setting/agreementDetail/agreementDetail',
	'/pagesIndex/page/localLife/localLife',
	'/pagesIndex/page/foodIndex/foodIndex',
	'/pagesIndex/page/location/location',
	'/pages/map/map',
	'/pagesIndex/page/campusTakeout/index/index'
]

let isRefreshing = true // 是否正在刷新token的标记
let requests = [] //重新请求的接口列表
request.globalRequest = (url, method, data, power, urlType) => {
	var data = data || {}
	switch (method) {
		case 'POST':
			headers['content-type'] = 'application/json'
			break;
		case 'GET':
			headers['content-type'] = 'application/x-www-form-urlencoded'
			break;
	}
	if (power == 3) {
		//说明当前是请求的刷新token接口
		headers['Authorization'] = ''
		headers['RefreshToken'] = uni.getStorageSync('tokens').refreshToken || ''
	} else {
		headers['Authorization'] = uni.getStorageSync('tokens').token || ''
		headers['RefreshToken'] = ''
	}
	if (data) {
		for (let key in data) { // 在这里判断传过来的参数值为null，就删除这个属性
			if (data[key] === null || data[key] === 'null' || data[key] === '') {
				delete data[key]
			}
		}
	}
	var urlnew
	if (urlType == 'map') {
		// urlnew= '/map/' + url
	} else {
		// urlnew='/client/' + url

		urlnew = '' + url
	}
	return new Promise((resolve, reject) => { //promise封装异步
		uni.request({
			timeout: 30000,
			// #ifdef H5
			url: urlConfig + urlnew,
			// #endif

			// #ifdef APP-PLUS||MP-WEIXIN
			url: urlConfig + url,
			// #endif
			method: method,
			data: data,
			dataType: 'json',
			header: headers,
			success(res) {
				uni.hideLoading();
				if (res.data.status == 200) {
					resolve(res.data);
					// console.log(res.data)
				} else if (res.data.status == 101 || res.data.status == 102) {
					if (!uni.getStorageSync('tokens')) {
						uni.showModal({
							title: "温馨提示",
							confirmText: '去登录',
							content: "您暂未登录，请先登录",
							success(r) {
								if (r.confirm) {
									uni.navigateTo({
										// url: "/pages/login/login"
                    url: "/pages/login/wxlogin/wxlogin"
									})
								}
							}
						})
						return
					}
					isRefreshing = false
					//token如果过期了 状态101
					//加个判断条件 需要登录的接口才会因为返回101而进入等待状态，如果不需要登录，就不用等待
					if (power == 2) {
						//这里是重点：让这个Promise一直处于Pending状态（即不调用resolve） promise就不会返回接口的调用结果 一直在等待中
						new Promise(resolve2 => {
							// 用函数形式将 resolve 存入到重新请求的接口列表，等待刷新后再执行
							requests.push(() => {
								//这里resolve
								resolve(request.globalRequest(url, method, data,
									power))
							})
						})
					} else {
						resolve(res.data);
					}
					if (!isRefreshing) { //成功状态
						isRefreshing = true //第一个请求后，后面请求都不进入执行请求
						//调用刷新token的接口
						request.globalRequest(`client/Member/refreshToken`, 'GET', {}, 3).then((
							data) => {
							if (data.status == 200) {
								uni.setStorageSync('tokens', data.tokens);
								// token 刷新后将数组的方法重新执行
								requests.forEach((item) => item())
								requests = [] // 重新请求完清空
								return
							}
						})
					}

				} else if (res.data.status == 600) {
					uni.hideLoading();
					uni.removeStorage('tokens')
					uni.removeStorage('userInfo')
					uni.showModal({
						title: "温馨提示",
						confirmText: '去登录',
						content: "您登录已过期，请先登录",
						success(r) {
							if (r.confirm) {
								uni.navigateTo({
									// url: "/pages/login/login"
                  url: "/pages/login/wxlogin/wxlogin"
								})
							}
						}
					})
					reject(res.data); //抛出异常
				} else if (res.data.status == "201") {
					// console.log('暂无数据')
					// reject(res.data.msg)
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: res.data ? res.data.msg : res.msg
					})
					reject(res.data); //否则为请求失败，弹出后端返回提示语
				}
			},
			fail(err) {
				console.log(err)
				reject(err);

			},
			complete() {

			}
		});
	});
}

export default request