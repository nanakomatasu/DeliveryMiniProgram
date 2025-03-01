// import api from './api.js';

// const baseUrl = "https://xiaou.tenghuiwangxiao.com";
const baseUrl = "http://xiaou.tenghuiwangxiao.com";

export const post = (url, data = {}, isShowLoding = false) => {

	// if(isShowLoding){
	//  uni.showLoading({
	//     title:'加载中...',
	//     mask:true
	//   })
	// }

	if (uni.getStorageSync('tokens')) {
		data.token = uni.getStorageSync('tokens').token
	}


	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			data,
			method: "POST",
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: (res) => {
				uni.hideLoading();
				if (res.data.code == 200) {
					resolve(res.data);
				} else if (res.data.code == 100067 || res.data.code == 100068) {
					//跳登陆
					uni.reLaunch({
						url: '/pages/loginIndex/loginIndex'
					});
					uni.removeStorageSync('u_token')
					uni.removeStorageSync('u_shop_id')
				} else {
					resolve(res.data);
				}

			},
			fail: (e) => {
				uni.hideLoading();
				reject(e)
			}
		});
	})
}


export const get = (url, data = {}) => {
	// uni.showLoading({
	//    title:'加载中',
	//    mask:true
	//  })

	data.token = localStorage.getItem("u_token");

	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			data,
			method: "GET",
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: (res) => {
				uni.hideLoading();
				if (res.data.code == 200) {
					resolve(res.data);
				} else if (res.data.code == 100067) {
					uni.reLaunch({
						url: '/pages/loginIndex/loginIndex'
					})
					uni.removeStorageSync('u_token')
					uni.removeStorageSync('u_shop_id')
				} else {
					reject(res.data)
				}

			},
			fail: (e) => {
				uni.hideLoading();
				reject(e)
			}
		});
	})
}
