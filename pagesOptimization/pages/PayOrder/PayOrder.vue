<template>
	<view class="" v-if="detail">
		<view class="price dis-flex flex-y-center flex-x-center flex-dir-column">
			<view class="t-b f-b f-DINPro mb20">
				<text class="f-40 mr5">￥</text>
				<text class="f-80">{{detail.amount}}</text>
				<!-- <text class="f-80">33</text> -->
			</view>
			<view class="f-28 col-gray-88 dis-flex flex-y-center">支付剩余时间
				<u-count-down :time="detail.remaining_time * 1000" format="HH:mm:ss" @finish="finish"></u-count-down>
			</view>
		</view>

		<view class="pay bg-white-ff radio-16">
			<radio-group @change="payChange">
				<label class="dis-flex pay-item flex-y-center flex-x-between" v-for="(item,index) in pay" :key="index">
					<view class="dis-flex flex-y-center">
						<image class="wh48 mr20" :src="item.icon"></image>
						<view class="f-28 col-brank-10">{{item.name}}</view>
					</view>
					<radio :value="item.id" color="#E63D45" :checked="selId==item.id"></radio>
				</label>
			</radio-group>
		</view>

		<view class="fixed-bottom btn-box">
			<view class="btn radio-48 bg-red-d6-ec t-c col-white-ff f-32" @tap="comfirmPay">确认支付2</view>
		</view>
		<!-- 提示信息 -->
		<template>
			<u-notify ref="isShowtip" :show="isShowtip"></u-notify>
		</template>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				isShowtip: false,
				type: null, //1支付编号,2订单编号
				pay_no: '', //支付编号
				order_no: '', //订单编号
				pay: [{
					name: "微信支付",
					icon: "/pagesOptimization/static/pay01.png",
					id: "1"
				}],
				selId: 1,
				detail: {},
				return_type: '0',
			};
		},
		onLoad(e) {
			// this.id = e.id;
			// this.return_type = e.return_type;
			this.type = e.type
			if (e.type == 1) { //支付编号
				this.pay_no = e.pay_no
			}
			if (e.type == 2) { //订单编号
				this.order_no = e.order_no
			}
			console.log(e)
		},
		onShow() {
			this.getOrderInfo()
			// this.getConfigGetInfo()
			// this.getOrderTakeOutInfo()
		},
		onBackPress(options) {
			// 触发返回就会调用此方法，这里实现的是禁用物理返回，顶部导航栏的自定义返回 uni.navigateBack 仍可使用
			if (options.from == 'backbutton') {
				console.log(111121);
				uni.showModal({
					title: "温馨提示",
					content: "确认取消支付?",
					async success(res) {
						if (res.confirm) {
							uni.navigateBack()
						}
					}
				})
				return true;
			} else if (options.from == 'navigateBack') {
				return false;
			}
		},
		methods: {
			//订单倒计时结算
			finish() {
				console.log('支付结束')
				uni.showModal({
					title: "温馨提示",
					content: "您的订单已超时",
					showCancel: false,
					success(res) {
						if (res.confirm) {
							uni.redirectTo({
								url: "/pagesUser/page/orderList/orderList?tabAct1=3"
							})
						}
					}
				})
			},

			// 订单详情
			getOrderInfo() {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					// pay_no: this.pay_no, 
					// order_no: this.order_no, 
				}
				if (this.type == 1) { //支付编号
					data.pay_no = this.pay_no
				}
				if (this.type == 2) { //订单编号
					data.order_no = this.order_no
				}
				this.$http.post('/api/pay/getPayInfo', data)
					.then(res => {
						this.detail = res.data
						// console.log(res.data.remaining_time, 'remaining_time');
					})
			},
			//点击确认支付
			comfirmPay() {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					// app_type: 2,
					return_type: 0,
				}

				if (this.isWxBrowser()) {
					data.app_type = 3
				} else {
					data.app_type = 2
				}

				if (this.type == 1) { //1 支付单号 2订单编号 type
					data.pay_no = this.pay_no
				}

				if (this.type == 2) {
					data.order_no = this.order_no
				}

				if (this.selId == 1) { //1 微信 2支付宝 3钱包 selId
					data.pay_type = 1
				}

				if (this.selId == 2) {
					data.pay_type = 2
				}

				if (this.selId == 3) {
					data.pay_type = 9
				}
				this.$http.post('/api/user/pay', data)
					.then(res => {
						if (res.code == 200) {
							//微信H5支付
							if (this.selId == 1) {
								this.wxPayH5(res.data);
							}
							//支付宝
							if (this.selId == 2) {
								this.alipayH5(res.data);
							}
							if (this.selId == 3) {
								// this.alipayH5(res.data);
							}
						} else {
							this.$refs.isShowtip.show({
								type: 'error',
								message: res.message,
								safeAreaInsetTop: true
							})
							return
						}
					})

				// .then()
				// // #ifdef H5
				// this.getOrderPay();
				// // #endif
				// if (this.selId == 1) {
				// 	console.log('发起微信支付')
				// 	this.appPay('wxpay')
				// }

				//支付宝支付
				// if (this.selId == 2) {
				// 	console.log('发起支付宝支付')
				// 	this.appPay('alipay')
				// }
			},
			//支付接口
			// async getOrderPay() {
			// 	uni.showLoading({
			// 		title: "正在加载中"
			// 	})
			// 	var that = this
			// 	//1 app,2h5，3微信公众号
			// 	let app_type;
			// 	// #ifdef APP-PLUS
			// 	app_type = 1
			// 	// #endif

			// 	// #ifdef H5  
			// 	if (this.isWxBrowser()) {
			// 		app_type = 3
			// 	} else {
			// 		app_type = 2;
			// 	}
			// 	// #endif
			// 	try {
			// 		const {
			// 			data,
			// 			status
			// 		} = await that.$api.orderPay({
			// 			order_id: this.id,
			// 			pay_type: this.selId, // 1:微信支付 2：支付宝支付
			// 			app_type: app_type,
			// 			return_type: this.return_type || 0
			// 		})
			// 		uni.hideLoading()
			// 		if (status == 200) {
			// 			console.log('----订单信息----');
			// 			console.log(data);
			// 			// #ifdef H5
			// 			//微信H5支付
			// 			if (that.selId == 1) {
			// 				that.wxPayH5(data);
			// 			}
			// 			if (that.selId == 2) {
			// 				that.alipayH5(data);
			// 			}
			// 			// #endif

			// 			//#ifdef APP-PLUS
			// 			console.log(this.selId)
			// 			//微信支付
			// 			if (this.selId == 1) {
			// 				console.log('发起微信支付')
			// 				// this.appPay('wxpay')
			// 			}
			// 			//支付宝支付
			// 			if (this.selId == 2) {
			// 				console.log('发起支付宝支付')
			// 				// this.appPay('alipay')
			// 			}
			// 			// #endif

			// 		}
			// 	} catch (error) {
			// 		console.log(error);
			// 	}
			// },
			//获取配置接口
			// async getConfigGetInfo() {
			// 	uni.showLoading({
			// 		title: "正在加载中"
			// 	})
			// 	var that = this
			// 	const {
			// 		data,
			// 		status
			// 	} = await that.$api.configGetInfo({
			// 		ident: "paymentset"
			// 	})
			// 	uni.hideLoading()
			// 	if (status == 200) {
			// 		if (data.wx_pay_open != 1) {
			// 			this.pay.splice(0)
			// 		}
			// 		if (data.zfb_pay_open != 1) {
			// 			this.pay.splice(1)
			// 		}
			// 	}
			// },
			payChange(e) {
				this.selId = e.detail.value
			},
			// //是否微信内部浏览器
			async isWxBrowser() {
				let ua = await wx.getRendererUserAgent()
				// let ua = navigator.userAgent.toLowerCase();
				let isWeixin = ua.indexOf("micromessenger") != -1;
				return isWeixin;
			},

			// //支付宝H5支付
			alipayH5(data) {
				console.log('支付宝H5支付');
				console.log(data)
				setTimeout(() => {
					const div = document.createElement('formdiv');
					div.innerHTML = data;
					document.body.appendChild(div);
					document.forms[0].setAttribute('target', '_self');
					document.forms[0].submit();
					div.remove();
				}, 100)
			},


			// H5微信支付
			wxPayH5(data) {
				let params = {
					timeStamp: data.timeStamp,
					nonceStr: data.nonceStr,
					prepay_id: data.prepay_id,
					paySign: data.paySign,
					appId: data.appid,
				}
				if (this.isWxBrowser()) { //微信浏览器
					if (typeof WeixinJSBridge == "undefined") {
						if (document.addEventListener) {
							document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						} else if (document.attachEvent) {
							document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
							document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						}
					} else {
						this.onBridgeReady(params);
					}
				} else {
					window.location.href = data.mweb_url;
				}
			},

			//微信浏览器拉起支付
			onBridgeReady(params) {
				let that = this;
				console.log(params)
				WeixinJSBridge.invoke('getBrandWCPayRequest', {
						"appId": params.appId, //公众号ID，由商户传入     
						"timeStamp": params.timeStamp, //时间戳，自1970年以来的秒数     
						"nonceStr": params.nonceStr, //随机串     
						"package": "prepay_id=" + params.prepay_id,
						"signType": "MD5", //微信签名方式：     
						"paySign": params.paySign
					},
					function(res) {
						let url;
						if (that.return_type == 0) { //个人中心订单列表
							url = '/pagesUser/page/orderList/orderList?tabAct1=3'
						}
						if (that.return_type == 1) { //外卖订单列表
							url = '/pagesIndex/page/campusTakeout/order/order'
						}
						//支付完成调回订单页面
						uni.redirectTo({
							url: url
						})
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。

						}
					});
			},


			/**
			 * 调用APP支付
			 * @param {Object} provider  wxpay alipay
			 */
			// async appPay(provider) {
			// 	let orderInfo = await this.getOrderInfo(provider);
			// 	console.log('--------orderInfo--------')
			// 	console.log(orderInfo);
			// 	uni.requestPayment({
			// 		provider: provider,
			// 		orderInfo: orderInfo,
			// 		success: res => {
			// 			console.log(res);
			// 			uni.showToast({
			// 				title: "支付成功!"
			// 			})
			// 		},
			// 		fail: error => {
			// 			console.log(error);
			// 		}
			// 	})
			// },
			//测试订单信息
			// getOrderInfo(provider) {
			// 	return new Promise((resolve, reject) => {
			// 		uni.request({
			// 			method: 'POST',
			// 			url: 'https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/pay',
			// 			data: {
			// 				provider,
			// 				totalFee: Number(this.detail.money) * 100, // 转为以分为单位
			// 				// #ifdef APP-PLUS
			// 				platform: 'app-plus',
			// 				// #endif
			// 			},
			// 			success(res) {
			// 				if (res.data.code === 0) {
			// 					resolve(res.data.orderInfo)
			// 				} else {
			// 					reject(new Error('获取支付信息失败' + res.data.msg))
			// 				}
			// 			},
			// 			fail(err) {
			// 				reject(new Error('请求支付接口失败' + err))
			// 			}
			// 		})
			// 	})
			// },

		}
	}
</script>

<style lang="scss">
	page {
		background: #F7F7F7;
	}

	.price {
		padding: 86rpx 0 100rpx 0;
	}

	.pay {
		width: 710rpx;
		margin: 0 auto;
		padding: 0 32rpx;
		box-sizing: border-box;
	}

	.pay-item {
		height: 104rpx;
	}

	radio {
		transform: scale(0.75);
	}
</style>