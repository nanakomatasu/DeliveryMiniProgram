<template>
	<view class="pl60 pr60 box-size">
		<view class="mt60 mb32 f-48 f-b">欢迎登录分分钟校园送</view>
		<button class="bg-red-d6-ec col-white-ff f-28 t-c radio-48" @tap="weixinLogin">登录</button>
		<button class="mt30 f-28 t-c radio-48" @tap="goBack">取消登录</button>
		<label class="dis-flex  mt45 flex-y-start" @tap="changeRadio">
			<radio value="1" color="#D62E36" v-model="is_agree" :checked="is_agree==1?true:false"></radio>
			<view class="f-24 col-brank-20">我已阅读同意<text class="col-red-d9"
					@tap.stop="onLink('/pagesUser/page/setting/agreement/agreement',1)">《分分钟校园送用户协议》、《隐私政策》，</text>
				并授权分分钟校园送送使用该账号(如昵称、头像、收货地址)进行统一管理。</view>
		</label>
		<!-- #ifdef MP-WEIXIN -->
		<view class="popup" v-if="isMobile==1">
			<view class="mask">
				<view class="box-show">
					<view class="flex flex-x-center f-32  mb40 f-b">
						温馨提示
					</view>
					<view class=" f-28 t-c mb-20 win-cont">需要授权手机号,请先授权手机号</view>
				</view>
				<view class="flex">
					<button class="mt10 f-28 t-c " @tap="goBack">取消</button>
					<button class="mt10 bg-red-d6-ec col-white-ff f-28 t-c" hover-class="none"
						open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">确认授权</button>
				</view>
			</view>
		</view>
		<!--  #endif -->
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
				isMobile: 0,
				userInfo: {},
        rid: '',
        platform_activity_id: ''
			};
		},
		onLoad(e) {
			this.mobile = e.mobile || ''
      this.rid = e.rid || ''
      this.platform_activity_id = e.activityid || '';
      if (e.scene){
        let scene = decodeURIComponent(e.scene)
        let obj = {};
        for (var i = 0; i < scene.split('*').length;i++){
          let arr = scene.split('*')[i].split('/');
          obj[arr[0]] = arr[1];
        }
        console.log('sceneObj', obj);
        this.rid = obj.rid || '';
        this.platform_activity_id = obj.activityid || '';
      }
		},
		methods: {
			//取消登录
			goBack() {
				uni.navigateBack()
			},
			//更改是否同意协议
			changeRadio() {
				this.is_agree = !this.is_agree
			},
			//点击微信登录
			weixinLogin() {
				let _this = this
				if (_this.is_agree === 0) return _this.$u.toast('请仔细阅读用户协议，并勾选')
				// #ifdef MP-WEIXIN
				// 获取用户信息
				uni.login({
					success(res) {
						_this.wxLogin(res)
					},
					fail(err) {
						uni.showToast({
							title: "登录失败，请重试",
							icon: "none"
						})
						console.log(err);
					}
				})
				// #endif 
			},
			//微信登录
			async wxLogin(data) {
				const res = await this.$api.wxLogin({
					code: data.code,
					is_agree: 1,
					from_type: 3
				});
				if (res.status == 200) {
					uni.setStorageSync('tokens', res.tokens)
					uni.setStorageSync('userInfo', res.data)
					this.userInfo = res.data
					if (!res.data.mobile) {
						this.isMobile = 1
					} else {
						app.showError('登录成功', () => {
              if(this.platform_activity_id&&this.rid) {
                uni.redirectTo({
                  url: '/pagesUser/page/draw/draw?id=' + this.platform_activity_id
                });
                return
              }
              if (this.rid) {
                uni.redirectTo({
                  url: '/pagesUser/page/invite/invite'
                });
                return
              }
              uni.navigateBack();
						})
					}
				}
			},
			//获取用户手机的code和openId
			getPhoneNumber(e) {
				uni.showLoading({
					title: "正在授权"
				})
				let _this = this
				_this.phonePower(e.detail.code)
			},
			//获取用户手机
			async phonePower(code) {
				uni.hideLoading()
				const res = await this.$api.phonePower({
					code,
					openid: this.userInfo.wx_open_id,
          rid: this.rid,
          platform_activity_id: this.platform_activity_id
				});
				if (res.status == 200) {
					app.showError('登录成功', () => {
            if(this.platform_activity_id&&this.rid) {
              uni.redirectTo({
                url: '/pagesUser/page/draw/draw?id=' + this.platform_activity_id
              });
              return
            }
            if (this.rid) {
              uni.redirectTo({
                url: '/pagesUser/page/invite/invite'
              });
              return
            }
            uni.navigateBack();
					})
				}
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

	.popup {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0%;
		left: 0%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.mask {
		position: fixed;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 510rpx;
		border-radius: 16rpx;
		background-color: #fff;
		overflow: hidden;
	}

	.box-show {
		padding: 20rpx 32rpx 40rpx 32rpx;
		border-bottom: 1px solid #F7f7f7;
	}
</style>