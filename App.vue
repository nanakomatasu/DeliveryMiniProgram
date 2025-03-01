<script>
	export default {
		globalData: {

		},

		onLaunch: function() {
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				console.log(res, "版本回调");
			});

			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});

			});

			updateManager.onUpdateFailed(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本重启失败，请删除小程序重新进入',
				});
			})
		},
		onShow: function() {

		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			//一维数组截取变成二维数组
			arraySlice(data, array = [], optNum = 10) {
				data = JSON.parse(JSON.stringify(data))
				if (data.length <= optNum) {
					data.length > 0 && array.push(data);
					return array;
				}
				array.push(data.splice(0, optNum));
				return arraySlice(data, array, optNum);
			},
			navTo: function(url) {
				if (!url || url.length == 0) {
					return false;
				}
				let tabBarLinks = [
					'/pages/index/index',
					'/pages/HomePage/HomePage',
					'/pages/cart/cart',
					'/pages/user/user'
				];
				// tabBar页面
				if (tabBarLinks.indexOf(url) > -1) {
					uni.switchTab({
						url: url
					});
				} else {
					// 普通页面
					uni.navigateTo({
						url: url
					});
				}
			},
			chanegpic(pics, index, ) {
				console.log(index, "index");
				uni.previewImage({
					current: index,
					urls: pics,

				});
			},
			//scene解码
			scene_decode(e) {
				if (e === undefined)
					return {};
				console.log(e, "app")
				console.log(decodeURIComponent(e))
				let scene = decodeURIComponent(e);


				let params = scene.split('='),
					data = {};

				for (let i in params) {
					var val = params[i].split(':');
					val.length > 0 && val[0] && (data[val[0]] = val[1] || null)
				}
				return data;
			},
			pageHead() {
				let pageHead = document.getElementsByTagName('uni-page-head');
				pageHead[0].style.display = 'none'
				let uSticky = document.getElementsByClassName('u-sticky')[0]
				if (uSticky) {
					this.$nextTick(() => {
						uSticky.style.top = 0
					})
				}
			},
			//微信支付
			wxPayment(option) {
				console.log(option);
				let options = Object.assign({
					payment: {},
					success: () => {},
					fail: () => {},
					complete: () => {},
				}, option);
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: String(options.payment.timeStamp),
					nonceStr: String(options.payment.nonceStr),
					package: String(options.payment.package),
					signType: String(options.payment.signType),
					paySign: String(options.payment.sign),
					success(res) {
						options.success(res);
					},
					fail(res) {
						options.fail(res);
					},
					complete(res) {
						options.complete(res);
					}
				});
			},
			noLogin(cancel) {
				uni.showModal({
					title: "温馨提示",
					content: "您暂未登录，请先登录",
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								// url: "/pages/login/login"
                url: "/pages/login/wxlogin/wxlogin"
							})
						} else if (res.cancel) {
							cancel && cancel()
						}
					}
				})
			},

			showError(text, callback) {
				uni.showModal({
					title: "温馨提示",
					content: text,
					showCancel: false,
					success(res) {
						if (res.confirm) {
							callback && callback()
						}
					}
				})
			}
		}
	}
</script>


<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import "uview-ui/libs/css/flex.scss";
	@import "static/css/liu.scss";
	@import "static/css/duan.scss";
	@import "static/css/yang.scss";
	@import "static/css/my.css";
	@import "static/css/chat.css";
</style>