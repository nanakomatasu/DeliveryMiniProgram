<template>
	<view>
		<view class="mt20 pl32 pr32 box-size  bg-white-ff">
			<view class="form-item dis-flex flex-y-center flex-x-between"
				@tap="onLink('/pagesUser/page/setting/editPassword/editPassword')">
				<view class="f-28 form-name">修改密码</view>
				<u-icon name="arrow-right" size="30rpx" color="#8E8F8E"></u-icon>
			</view>
			<view class="form-item dis-flex flex-y-center flex-x-between"
				@tap="onLink('/pagesUser/page/setting/accountBinding/accountBinding')">
				<view class="f-28 form-name">账号绑定</view>
				<view class="dis-flex flex-y-center w-70 flex-x-end">
					<view class="f-28 col-gray-88">{{title}}</view>
					<u-icon name="arrow-right" size="30rpx" color="#8E8F8E"></u-icon>
				</view>
			</view>
			<view class="form-item dis-flex flex-y-center flex-x-between"
				@tap="onLink('/pagesUser/page/setting/editMobile/editMobile')">
				<view class="f-28 form-name">修改手机号码</view>
				<view class="dis-flex flex-y-center w-70 flex-x-end">
					<view class="f-28 col-gray-88">{{userInfo.mobile}}</view>
					<u-icon name="arrow-right" size="30rpx" color="#8E8F8E"></u-icon>
				</view>
			</view>
		</view>

		<!-- 		<view class="mt20 pl32 pr32 box-size  bg-white-ff" v-if="Commander.length ==0">
			<view class="form-item dis-flex flex-y-center flex-x-between" @tap="chooseCommander">
				<view class="f-28 form-name">选择团长</view>
				<view class="dis-flex">
					<view class="f-28 form-name">{{Commander.name}}</view>
					<u-icon name="arrow-right" size="30rpx" color="#8E8F8E"></u-icon>
				</view>
			</view>
		</view> -->
		<view class="mt20 pl32 pr32 box-size  bg-white-ff">
			<view class="form-item dis-flex flex-y-center flex-x-between" @tap="chooseCommander">
				<view class="f-28 form-name">绑定团长</view>
				<view class="dis-flex">
					<view class="f-28 form-name" v-if="Commander">{{Commander.name}}</view>
					<u-icon name="arrow-right" size="30rpx" color="#8E8F8E"></u-icon>
				</view>
			</view>
		</view>

		<view class="mt20 pl32 pr32 box-size  bg-white-ff">
			<view class="form-item dis-flex flex-y-center flex-x-between"
				@tap="onLink('/pagesUser/page/setting/opinion/opinion')">
				<view class="f-28 form-name">意见反馈</view>
				<u-icon name="arrow-right" size="30rpx" color="#8E8F8E"></u-icon>
			</view>
			<view class="form-item dis-flex flex-y-center flex-x-between"
				@tap="onLink('/pagesUser/page/setting/agreement/agreement')">
				<view class="f-28 form-name">用户隐私协议</view>
				<u-icon name="arrow-right" size="30rpx" color="#8E8F8E"></u-icon>
			</view>
			<view class="form-item dis-flex flex-y-center flex-x-between">
				<view class="f-28 form-name">热线电话</view>
				<view class="dis-flex flex-y-center w-70 flex-x-end" @tap="mobileShow=true">
					<view class="f-28 col-gray-88">{{content}}</view>
					<u-icon name="arrow-right" size="30rpx" color="#8E8F8E"></u-icon>
				</view>
			</view>
		</view>
		<!-- 电话弹窗 -->
		<mobileWin :show="mobileShow" :phone="content" title="热线电话"></mobileWin>
		<view class="mt20 box-size f-32 col-brank-20  bg-white-ff form-item dis-flex flex-y-center flex-x-center"
			@tap="clearLogin">退出登录
		</view>
		<!-- 团长列表 -->
		<template>
			<view>
				<u-popup :show="Commandershow" @close="Commandershow =false" mode="bottom" height="700"
					:closeable="true" zIndex='998'>
					<view>
						<view class="Order_title">
							团长列表
						</view>
						<scroll-view scroll-y="true" class="scroll-Y">
							<view style="padding: 20rpx;">
								<view class="packetList" v-for="item in CommanderList" v-if="CommanderList.length>0">
									<view class="packets_detail">
										<view style="display: flex;justify-content:flex-start;align-items: baseline;">
											<view style="font-size: 28rpx;font-weight: 700;color: #202020;">
												{{item.name}}
											</view>
											<view style="font-size: 48rpx;font-weight: 700;color: #ef5248;">
												{{item.amount}}
											</view>
										</view>
									</view>
									<view style="font-size: 28rpx;font-weight: 700;color: #ef5248;" @click="Bing(item)">
										立即绑定
									</view>
								</view>
								<view class="" v-if="CommanderList.length == 0">
									<null-data title="暂无团长"></null-data>
								</view>
							</view>
						</scroll-view>
					</view>
				</u-popup>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobileShow: false, //是否显示电话弹窗
				content: "",
				title: "",
				userInfo: {},
				CommanderList: [], //团长列表
				Commander: '', //当前绑定团长
				Commandershow: false, //团长列表弹框
				Umobile: ''
			};
		},
		onLoad() {
			this.getPlatformCustomerPhone()
			console.log('Umobile', this.Umobile);
		},
		onShow() {
			this.information()
			this.getConfigGetInfo()
			// this.userInfo=uni.getStorageSync('userInfo')
			this.NowCommander() //当前绑定团长
			console.log(this.userInfo)

			this.getPlatformCustomerPhone()
			console.log('Umobile', this.Umobile);



		},

		methods: {
			//获取校U客服电话
			getPlatformCustomerPhone() {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
				}
				this.$http.post('/api/user/getPlatformCustomerPhone', data)
					.then(res => {
						if (res.code == 200) {
							this.Umobile = res.data
						}
					})
			},
			//跳转链接
			onLink(url) {
				uni.navigateTo({
					url: url
				})
			},
			//退出登录
			clearLogin() {
				uni.showModal({
					title: "温馨提示",
					content: "是否确认退出登录",
					confirmText: "退出登录",
					cancelText: "取消",
					success(res) {
						if (res.confirm) {
							uni.removeStorageSync('tokens')
							uni.removeStorageSync('userInfo')
							uni.reLaunch({
								url: "/pages/user/user"
							})
						}
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
					ident: "baseset"
				})
				uni.hideLoading()
				if (status == 200) {
					this.content = data.mobile

				}
			},

			//个人信息
			async information() {
				var that = this
				const result = await that.$api.receivingOrderx()
				if (result.status == 200) {
					this.userInfo = result.data.userInfo
					if (this.userInfo.is_bind_wx == 0) {
						this.title = "未绑定微信"
					} else if (this.userInfo.is_bind_wx == 1) {
						this.title = "已绑定微信"
					}
				}
			},
			// 选择团长
			chooseCommander() {
				this.Commandershow = true
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					school_id: uni.getStorageSync('school').id,
				}
				this.$http.post('/api/user/listGroupUser', data)
					.then(res => {
						if (res.code == 200) {
							this.CommanderList = res.data.list
						}
					})
			},
			// 绑定团长
			Bing(item) {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					school_id: uni.getStorageSync('school').id,
					group_user_id: item.user_id
				}
				this.$http.post('/api/user/bindGroupUser', data)
					.then(res => {
						if (res.code == 200) {
							// this.Commander = res.data
							this.NowCommander()
							this.Commandershow = false
						}
					})
			},
			//当前绑定团长
			NowCommander() {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					school_id: uni.getStorageSync('school').id
				}

				this.$http.post('/api/user/hasBindGroupUser', data)
					.then(res => {
						if (res.code == 200) {
							this.Commander = res.data
						}
					})
			},


		}
	}
</script>

<style lang="scss">
	.scroll-Y {
		height: 700rpx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.Order_title {
		text-align: center;
		font-weight: 700;
		font-size: 32rpx;
		color: #202020;
		margin-top: 40rpx;
		margin-bottom: 30rpx;
	}

	.form-item {
		height: 100rpx;
	}

	.packetList {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// background-color: #ffceb7;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-top: 20rpx;
	}

	.packets_detail {
		flex: 1;
		display: flex;
		align-items: center;
		// justify-content: flex-start;
	}
</style>