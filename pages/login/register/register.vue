<template>
	<view class="pl60 pr60 box-size">
		<view class="mt60 mb32 f-48 f-b">{{isEdit?'修改密码':'注册账号'}}</view>
		<view class="f-24 col-gray-88" v-if="!isEdit">已有账号？<text class="col-red-d9"
				@tap="onLink('/pages/login/login',2)">立即登录</text>
		</view>
		<form @submit="submit">
			<view class="form-item dis-flex flex-y-center flex-x-between pl32 pr32 mt50 box-size">
				<view class="dis-flex w-15 flex-y-center mr20">
					<text class="mr5">+86</text>
					<u-icon name="arrow-down" size="22rpx" color="#202020"></u-icon>
				</view>
				<input class="w-85 f-28" placeholder-class="col-gray-88" type="number" v-model="mobile" name="mobile"
					placeholder="请输入手机号码" />
			</view>
			<view class="form-item dis-flex  flex-x-between flex-y-center pl32 mt30 pr32 box-size">
				<input class="f-28 w-60" placeholder-class="col-gray-88" name="verify" placeholder="请输入验证码" />
				<view class="f-24  w-30 t-r" :class="(text=='获取验证码'||text=='重新获取验证码')?'col-red-d9':'col-gray-99'"
					@tap="getCode">{{text}}</view>
			</view>
			<view class="form-item dis-flex  flex-x-between flex-y-center pl32 mt30 pr32 box-size">
				<input class="f-28 w-90" :type="isOpen?'text':'password'" name="password"
					placeholder-class="col-gray-99" placeholder="请输入密码" />
				<image class="wh32" @tap="changeOpen"
					:src="isOpen?'/static/img/password01.png':'/static/img/password02.png'"></image>
			</view>
			<view class="col-gray-88  mt20 f-24 pl20 pr20 box-size">请设置6~21位, 至少包含数字和字母密码,特殊字符仅限~!@#$%^&*()\-_=+{};:?
			</view>
			<button class="bg-red-d6-ec col-white-ff f-28 t-c radio-48"
				form-type="submit">{{isEdit?'确认更改':'立即注册'}}</button>
			<label class="dis-flex  mt45 flex-y-start" @tap="changeRadio">
				<radio value="1" color="#D62E36" v-model="is_agree" :checked="is_agree==1?true:false"></radio>
				<view class="f-24 col-brank-20">我已阅读同意<text class="col-red-d9"
						@tap.stop="onLink('/pagesUser/page/setting/agreement/agreement',1)">《分分钟校园送用户协议》、《隐私政策》，</text>
					并授权分分钟校园送使用该账号(如昵称、头像、收货地址)进行统一管理。</view>
			</label>
		</form>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				isOpen: false, //是否打开查看密码的开关
				isEdit: false, //是否是更改密码
				verify_id: "", //验证码id
				is_agree: 0, //是否同意协议
				mobile: "", //手机号
				text: "获取验证码"
			};
		},
		onLoad(e) {
			this.isEdit = e.isEdit || false
			this.mobile = e.mobile || ''
		},
		methods: {
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
				console.log('获取验证码')
				var that = this
				const result = await that.$api.apiSendSms({
					mobile: this.mobile,
					smsType: this.isEdit ? 2 : 1, //1是注册 2是忘记密码
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
			init() {
				this.isOpen = false //是否打开查看密码的开关
				this.verify_id = "" //验证码id
				this.is_agree = 0 //是否同意协议
				this.mobile = "" //手机号
				this.text = "获取验证码"
			},
			//更改是否同意协议
			changeRadio() {
				this.is_agree = !this.is_agree
			},
			changeOpen() {
				//改变查看密码的状态
				this.isOpen = !this.isOpen
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
			//注册接口和忘记密码接口
			async register(formData) {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				var url = this.isEdit ? 'findPassword' : 'apiSmsregister'
				const result = await that.$api[url](formData)
				uni.hideLoading()
				if (result.status == 200) {
					app.showError(this.isEdit ? '修改密码成功' : '注册成功', function() {
						uni.redirectTo({
							url: '/pages/login/login?mobile=' + that.mobile
						})
					})
				}
			},
			//提交
			submit(e) {
				let txt = /^(?![0-9]+$)(?![a-zA-Z]+$)([0-9A-Za-z]|[~!@#$%^&*()\-_=+{};:?]){6,21}$/
				var formData = e.detail.value
				formData.is_agree = this.is_agree ? 1 : 0
				formData.verify_id = this.verify_id
				//  #ifdef APP-PLUS||MP-WEIXIN
				formData.from_type = 1
				// #endif
				// #ifdef H5
				formData.from_type = 2
				// #endif
				console.log(formData)
				if (formData.mobile == '') {
					this.$u.toast("请输入手机号")
				} else if (!this.$u.test.mobile(formData.mobile)) {
					this.$u.toast("请输入正确的11位手机号")
				} else if (formData.verify == '') {
					this.$u.toast("请输入手机验证码")
				} else if (formData.password == '') {
					this.$u.toast("请输入密码")
				} else if (!this.$u.test.rangeLength(formData.password, [6, 21])) {
					this.$u.toast("请输入6-21位的密码")
				} else if (!txt.test(formData.password)) {
					this.$u.toast("请输入至少包含数字和字母的密码")
				} else if (formData.is_agree != 1) {
					this.$u.toast("请先阅读并同意协议")
				} else {
					this.register(formData)
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: rgb(255, 255, 255) !important;
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