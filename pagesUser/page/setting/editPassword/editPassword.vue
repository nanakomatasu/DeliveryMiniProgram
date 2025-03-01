<template>
	<view>
		<form>
			<view class="bg-white-ff mt20 pl32 pr32 box-size">
				<view class="form-item dis-flex border-b-f7 flex-y-center">
					<view class="f-28 w-20">手机号</view>
					<view class="f-28 w-20">{{userInfo.mobile}}</view>
				</view>
				<view class="form-item dis-flex border-b-f7 flex-y-center">
					<view class="f-28 w-20">验证码</view>
					<input class="f-28 w-50" placeholder-class="col-gray-88" placeholder="请输入验证码" v-model="testing" />
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
				<view class="form-item dis-flex border-b-f7 flex-y-center">
					<view class="f-28 w-20">密码</view>
					<input class="f-28 w-80" placeholder-class="col-gray-88" v-model="password" placeholder="请输入确认新密码" />
				</view>
			</view>
			<view class="f-24 col-gray-88 mt22 pl32 box-size">密码不少于8字符，必须包含1个英文，1个数字</view>
			<button class="bg-red-d6-ec t-c col-white-ff radio-48" @tap="signinx">确认修改</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				types: false,
				timeData: {},
				password:"",
				mobile:'',
				testing:'',
				key:"",
			};
		},
		
		onShow(){
		this.userInfo=this.isLogin=uni.getStorageSync('userInfo')
		},
		
		methods: {

			startxs() {
				this.starts()
			},
			// starts() {
			// 	var that = this
			// 	this.types = true
			// 	this.start()
			// },
			
			//获取短信
			async starts() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const result = await that.$api.apiSendSms({
					mobile: this.userInfo.mobile,
					smsType: 2
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
				this.signin()
				// let ver = /^1[0-9]{10}$/; //以1开头
				// if(!ver.test(this.mobile) || !this.mobile){
				// 	this.$u.toast('请输入正确的手机号')
				// }else if(!this.testing){
				// 	this.$u.toast('验证码不能为空')
				// }else {
				// 	this.signin()
				// }
			},	


			async signin() {
				uni.showLoading({
					title: "正在登录"
				})
				var that = this
				const res = await that.$api.alterhandset({
					password:this.password,
					mobile: this.userInfo.mobile,
					verify_id: this.key,
					verify: this.testing,
				})
				uni.hideLoading()
				if (res.status == 200) {
					uni.removeStorageSync('userInfo');
					uni.removeStorageSync('tokens');
					uni.redirectTo({
						url: '/pages/login/login'
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
	.form-item {
		height: 100rpx;
	}

	button {
		width: 480rpx;
		height: 88rpx;
		line-height: 88rpx;
		margin: 0 auto;
		font-size: 28rpx;
		margin-top: 340rpx;
	}
</style>
