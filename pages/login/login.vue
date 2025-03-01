<template>
	<view class="pl60 pr60 box-size">
		<view class="mt60 mb32 f-48 f-b">欢迎登录分分钟校园送</view>
		<view class="f-24 col-gray-88">还没有账号？<text class="col-red-d9"
				@tap="onLink('/pages/login/register/register',2)">立即注册</text></view>
		<form @submit="submit">
			<view class="form-item dis-flex flex-y-center flex-x-between pl32 pr32 mt50 box-size">
				<view class="dis-flex w-15 flex-y-center mr20">
					<text class="mr5">+86</text>
					<u-icon name="arrow-down" size="22rpx" color="#202020"></u-icon>
				</view>
				<input class="w-85 f-28" placeholder-class="col-gray-88" v-model="mobile" name="mobile" type="number"
					placeholder="请输入手机号码" />
			</view>
			<block v-if="isNum==2">
				<view class="form-item dis-flex  flex-x-between flex-y-center pl32 mt30 pr32 box-size">
					<input class="f-28 w-60" name="verify" placeholder-class="col-gray-88" placeholder="请输入验证码" />
					<view class="f-24  w-30 t-r" :class="(text=='获取验证码'||text=='重新获取验证码')?'col-red-d9':'col-gray-99'"
						@tap="getCode">{{text}}</view>
				</view>
			</block>
			<block v-else>
				<!-- <view class="form-item dis-flex flex-y-center pl32 pr32 mt50 box-size">
					<input class="f-28" placeholder-class="col-gray-99" name="mobile" placeholder="请输入账号" />
				</view> -->
				<view class="form-item dis-flex  flex-x-between flex-y-center pl32 mt30 pr32 box-size">
					<input class="f-28 w-90" :type="isOpen?'text':'password'" name="password"
						placeholder-class="col-gray-99" placeholder="请输入密码" />
					<image class="wh32" @tap="changeOpen"
						:src="isOpen?'/static/img/password01.png':'/static/img/password02.png'"></image>
				</view>
			</block>


			<view class="t-r mt30 col-gray-88 f-24"
				@tap="onLink('/pages/login/register/register?isEdit=true&&mobile='+mobile,1)">忘记密码？
			</view>
			<button class="bg-red-d6-ec col-white-ff f-28 t-c radio-48" form-type="submit">登录</button>
			<label class="dis-flex  mt45 flex-y-start" @tap="changeRadio">
				<radio value="1" color="#D62E36" v-model="is_agree" :checked="is_agree==1?true:false"></radio>
				<view class="f-24 col-brank-20">我已阅读同意<text class="col-red-d9"
						@tap.stop="onLink('/pagesUser/page/setting/agreement/agreement',1)">《分分钟校园送用户协议》、《隐私政策》，</text>
					并授权分分钟校园送送使用该账号(如昵称、头像、收货地址)进行统一管理。</view>
			</label>
			<view class="  mt120  flex-center">
				<view class="dis-flex flex-y-center flex-x-center flex-dir-column" @click="weixinLogin">
					<image class="wh80 mb20" src="/static/img/login-icon01.png"></image>
					<view class="col-gray-90 f-24">微信</view>
				</view>
				<view class="dis-flex flex-y-center   flex-x-center flex-dir-column" v-if="isNum==1"
					@tap="changePage(2)">
					<image class="wh80 mb20" src="/static/img/login-icon02.png"></image>
					<view class="col-gray-90 f-24">手机验证码</view>
				</view>
				<view class="dis-flex flex-y-center   flex-x-center flex-dir-column" v-else @tap="changePage(1)">
					<image class="wh80 mb20" src="/static/img/login-icon03.png"></image>
					<view class="col-gray-90 f-24">账号密码</view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	const app = getApp()
	import urlConfig from '@/config/index.js'
	export default {
		data() {
			return {
				isOpen: false, //是否打开查看密码的开关
				isNum: 1, //1是账号密码登录 2是短信验证码
				verify_id: "", //验证码id
				is_agree: 0, //是否同意协议
				mobile: "", //手机号
				text: "获取验证码",
				formData: {},
				code: '',
			};
		},
		onLoad(e) {
			this.mobile = e.mobile || ''
		},
		onShow() {

		},
		methods: {
			//获取code
			getLoginCode(formData) {
				console.log('登录')
				let _this = this
				uni.login({
					provider: 'weixin', //使用微信登录
					success(res) {
						formData = {
							...formData,
							code: res.code
						}
						_this.loginCode(formData)
					},
					fail(err) {
						console.log(err);
					}
				})
			},
			//更改是否同意协议
			changeRadio() {
				this.is_agree = !this.is_agree
			},
			//登陆
			async loginCode(formData) {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				var url = this.isNum == 1 ? 'apiPasswordLogin' : 'apiSmsLogin'
				const result = await that.$api[url](formData)
				uni.hideLoading()
				if (result.status == 200) {
					app.showError('登录成功', function() {
						uni.setStorageSync('userInfo', result.data)
						uni.setStorageSync('tokens', result.tokens)
						// #ifndef APP-PLUS
						uni.navigateBack({
							delta: 1
						});
						// #endif
						//#ifdef APP-PLUS
						uni.redirectTo({
							url: '/pages/index/index'
						});
						//#endif
					})
				}
			},
			//提交
			submit(e) {
				console.log('登录')
				var formData = e.detail.value
				this.formData = formData
				formData.is_agree = this.is_agree ? 1 : 0
				formData = this.formData
				if (this.isNum) {
					//短信验证登录才有的短信验证id
					formData.verify_id = this.verify_id
				}
				if (formData.mobile == '') {
					this.$u.toast("请输入手机号")
				} else if (!this.$u.test.mobile(formData.mobile)) {
					this.$u.toast("请输入正确的11位手机号")
				} else if (this.isNum == 2 && formData.verify == '') {
					this.$u.toast("请输入手机验证码")
				} else if (this.isNum == 1 && formData.password == '') {
					this.$u.toast("请输入密码")
				} else if (formData.is_agree != 1) {
					this.$u.toast("请先阅读并同意协议")
				} else {
					// #ifdef MP-WEIXIN
					this.getLoginCode(formData)
					// #endif
					// #ifdef H5
					this.loginCode(formData)
					// #endif
				}
			},

			//获取短信验证码
			getCode() {
				if (this.mobile == '') {
					this.$u.toast("请输入手机号")
				} else if (!this.$u.test.mobile(this.mobile)) {
					this.$u.toast("请输入正确的11位手机号")
				} else {
					if (this.text != '获取验证码' && this.text != '重新获取验证码') {
						return
					}
					this.postApiSendSms()
				}
			},
			//联调获取短信验证码接口
			async postApiSendSms() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const result = await that.$api.apiSendSms({
					mobile: this.mobile,
					smsType: 2, //1是注册 2是登录
				})
				uni.hideLoading()
				if (result.status == 200) {
					var text = 59
					var timer = setInterval(function() {
						that.text = text + 's后重新发送'
						text--
					}, 1000)
					setTimeout(function() {
						that.text = '重新获取验证码'
						clearInterval(timer)
					}, 61000)
					this.verify_id = result.key
				}
			},
			changeOpen() {
				//改变查看密码的状态
				this.isOpen = !this.isOpen
			},
			//改变页面的登录类型  1是点击的手机验证码登录 2是点击的账号密码登录
			changePage(type) {
				this.formData.verify = ''
				this.isNum = type
			},
			//跳转页面
			onLink(url, type) {
				if (type == 1) {
					uni.navigateTo({
						url: url
					})
				} else {
					uni.redirectTo({
						url: url
					})
				}

			},
			//微信登录
			weixinLogin() {
				// #ifdef MP-WEIXIN
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log('登录成功')
						console.log(loginRes.authResult);
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								console.log(infoRes);
								uni.redirectTo({
									url: "/pages/login/wxlogin/wxlogin"
								})
							},
							fail: function(res) {
								console.log('fail', res);
							}
						});
					}
				});
				// #endif 
			},
			//获取微信公众号授权
			async getWxOauthRedirect() {
				const res = await this.$api.getWxOauthRedirect({
					url: urlConfig + 'h5'
				});
				if (res.status == 200) {
					console.log(res);
				} else {
					console.log(res);
				}
			},
			//是否微信内部浏览器 
			async isWxBrowser() {
								let ua = await wx.getRendererUserAgent()
				// let ua = navigator.userAgent.toLowerCase();
				let isWeixin = ua.indexOf("micromessenger") != -1;
				return isWeixin;
			}

		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.form-item {
		width: 630rpx;
		height: 96rpx;
		background: #F5F7FA;
		border-radius: 48rpx;
	}

	radio {
		transform: scale(0.6);
		margin-top: -6rpx;
	}

	button {
		width: 630rpx;
		height: 96rpx;
		line-height: 96rpx;
		margin-top: 130rpx;
	}
</style>