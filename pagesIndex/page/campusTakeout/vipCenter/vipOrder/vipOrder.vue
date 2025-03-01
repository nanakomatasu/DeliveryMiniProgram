<template>
	<view v-if="detail">
		<view class="price dis-flex flex-y-center flex-x-center flex-dir-column">
			<view class="t-b f-b f-DINPro mb20">
				<text class="f-40 mr5">￥</text>
				<text class="f-80">{{detail.money}}</text>
			</view>
			<!-- <view class="f-28 col-gray-88 dis-flex flex-y-center">支付剩余时间<u-count-down
					:time="detail.remaining_time * 1000" format="HH:mm:ss" @finish="finish"></u-count-down>
			</view> -->

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
			<view class="btn radio-48 bg-red-d6-ec t-c col-white-ff f-32" @tap="comfirmPay">确认支付</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				id: "", //订单id
				pay: [{
					name: "微信支付",
					icon: "/pagesIndex/static/pay01.png",
					id: "1"
				}],
				selId: 1,
				detail: null,

			};
		},
		onLoad(e) {
			this.id = e.id
		},
		onShow() {
			this.getConfigGetInfo()
			this.getOrderTakeOutInfo()
		},
		methods: {
			//订单倒计时结算
			finish() {
				uni.showModal({
					title: "温馨提示",
					content: "您的订单已超时",
					showCancel: false,
					success(res) {
						if (res.confirm) {
							uni.redirectTo({
								url: "/pagesIndex/page/campusTakeout/vipCenter/vipCenter"
							})
						}
					}
				})
			},
			//订单详情接口
			async getOrderTakeOutInfo() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status
				} = await that.$api.orderform({
					id: this.id,
				})
				uni.hideLoading()
				if (status == 200) {
					this.detail = data


				}
			},
			//订单点击支付
			comfirmPay() {
				this.getOrderPay();
			},
			//支付接口
			async getOrderPay() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				//1 app,2h5，3微信公众号
				let app_type;
				// #ifdef APP-PLUS
				app_type = 1
				// #endif

				// #ifdef H5  
				if (this.isWxBrowser()) {
					app_type = 3
				} else {
					app_type = 2;
				}
				// #endif

				//#ifdef MP-WEIXIN
				app_type = 3;
				//#endif

				try {
					const {
						data,
						status
					} = await that.$api.vippay({
						order_id: this.id,
						pay_type: this.selId, // 1:微信支付 2：支付宝支付
						app_type: app_type,
						return_type: 2 //返回用户首页
					})
					uni.hideLoading()
					if (status == 200) {
						console.log('----订单信息----');
						console.log(data);
						// #ifdef H5
						//微信H5支付
						if (that.selId == 1) {
							that.wxPayH5(data);
						}
						if (that.selId == 2) {
							that.alipayH5(data);
						}
						// #endif

						//#ifdef MP-WEIXIN
						//小程序支付
						that.wxPayMp(data);
						//#endif

						//#ifdef APP-PLUS
						console.log(this.selId)
						//微信支付
						if (this.selId == 1) {
							console.log('发起微信支付')
							// this.appPay('wxpay')
						}
						//支付宝支付
						if (this.selId == 2) {
							console.log('发起支付宝支付')
							// this.appPay('alipay')
						}
						// #endif

					}
				} catch (error) {
					console.log(error);
				}
			},
			wxPayMp(data) {
				let that = this
				console.log(data, '小程序支付');
				let params = {
					timeStamp: data.timeStamp,
					nonceStr: data.nonceStr,
					prepay_id: data.prepay_id,
					paySign: data.paySign,
					appId: data.appid,
				}
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: data.timeStamp,
					nonceStr: data.nonceStr,
					package: "prepay_id=" + data.prepay_id,
					paySign: data.paySign,
					appId: data.appid,
					signType: 'MD5',
					success(res) {
						uni.showToast({
							title: "支付成功!"
						})
						//支付完成调回订单页面
						uni.redirectTo({
							url: data.return_url
						})
					},
					fail(err) {
						console.log(err);
						uni.showModal({
							content: "支付失败",
							showCancel: false
						})
					},
					complete: () => {

					}
				})
			},
			//获取配置接口
			async getConfigGetInfo() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status
				} = await that.$api.configGetInfo({
					ident: "paymentset"
				})
				uni.hideLoading()
				if (status == 200) {
					if (data.wx_pay_open != 1) {
						this.pay.splice(0)
					}
					if (data.zfb_pay_open != 1) {
						this.pay.splice(1)
					}

				}
			},
			payChange(e) {
				this.selId = e.detail.value
			},
			//是否微信内部浏览器
			async isWxBrowser() {
								let ua = await wx.getRendererUserAgent()
				// let ua = navigator.userAgent.toLowerCase();
				let isWeixin = ua.indexOf("micromessenger") != -1;
				return isWeixin;
			},
			//支付宝H5支付
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
						console.log('微信支付完成')
						//支付完成调回订单页面
						uni.redirectTo({
							url: '/pages/user/user'
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
			async appPay(provider) {
				let orderInfo = await this.getOrderInfo(provider);
				console.log('--------orderInfo--------')
				console.log(orderInfo);
				uni.requestPayment({
					provider: provider,
					orderInfo: orderInfo,
					success: res => {
						console.log(res);
						uni.showToast({
							title: "支付成功!"
						})
					},
					fail: error => {
						console.log(error);
					}
				})
			},
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