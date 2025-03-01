<template>
	<view>
		<view class="dis-flex flex-y-center flex-x-center flex-dir-column">
			<view class="f-28 col-gray-88 mt60">当前绑定手机号</view>
			<view class="mt20 f-48 f-b f-DINPro">{{userInfo.mobile}}</view>
			<form>
				<view class="dis-flex form-item mt60 flex-y-center bg-gray-f7 pl40 box-size pr40 radio-48">
					<view class="dis-flex flex-y-center mr20">
						<text class="mr5">+86</text>
						<u-icon name="arrow-down" size="22rpx" color="#202020"></u-icon>
					</view>
					<input class="w-85 f-28" placeholder-class="col-gray-88" type="number" v-model="mobile" placeholder="请输入新的手机号" />
				</view>
				<view class="dis-flex mt30  form-item flex-y-center bg-gray-f7 pl40 box-size pr40 radio-48">
					<input class="w-70 f-28" placeholder-class="col-gray-88" placeholder="请输入新的手机号" v-model="testing" />

					<view class="cryptogram  flex-about flex-centerd">
						<view class="f-24 col-red-d9 w-30 t-r" style="width: 200rpx;" @click="startxs"
							v-show="types==false">
							获取验证码
						</view>
						<view class="f-24 col-red-d9 w-30 t-r flex-centerd flex-right" style="width: 200rpx;"
							v-show="types==true">
							重新获取<u-count-down ref="countDown" :time="60* 1000" format="ss" :autoStart="false"
								@finish="finish" @change="change"></u-count-down>
							<view class="">s</view>
						</view>
					</view>

				</view>
				<button class="bg-red-d6-ec f-28 t-c col-white-ff radio-48" @tap="signinx">验证后绑定新手机</button>
			</form>
		</view>




	</view>
</template>

<script>
	export default {
		data() {
			return {
				types: false,
				timeData: {},
				mobile: '',
				testing: '',
				key: "",
				userInfo:{},
			};
		},
		
		onShow(){
		this.userInfo=uni.getStorageSync('userInfo')	
		},

		methods: {

			startxs() {
				this.starts()
			},

			starts() {
				var that = this
				this.types = true
				this.start()

			},

			//获取短信
			async starts() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const result = await that.$api.apiSendSms({
					mobile: this.mobile,
					smsType: 1
				})
				uni.hideLoading()
				if (result.status == 200) {
					this.key = result.key

					console.log(this.key)
					console.log(result.key)
					console.log(result)

					this.types = true
					this.start()
				}
			},


			signinx(){
				let ver = /^1[0-9]{10}$/; //以1开头
				if(!ver.test(this.mobile) || !this.mobile){
					this.$u.toast('请输入正确的手机号')
				}else if(!this.testing){
					this.$u.toast('验证码不能为空')
				}else {
					this.signin()
				}
			},	
			
			
			async signin() {
				uni.showLoading({
					title: "正在登录"
				})
				var that = this
				const res = await that.$api.altercypher({
					mobile: this.mobile,
					verify_id: this.key,
					verify: this.testing,
				})
				uni.hideLoading()
				if (res.status == 200) {
					uni.redirectTo({
						url: '/pages/user/user'
					});
				}
			},


			//开始
			start() {
				this.$refs.countDown.start();
			},
			// 暂停
			pause() {
				this.$refs.countDown.pause();
			},
			// 重置
			reset() {
				this.$refs.countDown.reset();
			},
			finish(e) {
				this.types = false
				this.reset()
			},
			change(e) {}
		},

	}
</script>

<style lang="scss">
	page {
		background: #fff !important;
	}

	.form-item {
		width: 630rpx;
		height: 96rpx;
	}

	button {
		width: 624rpx;
		height: 96rpx;
		line-height: 96rpx;
		margin-top: 100rpx;
	}
</style>
