<template>
	<view>
		<!-- 自定义导航栏 -->
		<u-navbar :bgColor="bgColor" :safeAreaInsetTop="true" :placeholder="true" fixed leftIconSize="0">
			<view class="p-r dis-flex" :style="{marginRight: mr+'px'}" slot="right"
				@tap="onlink('/pagesUser/page/newsList/newsList')">
				<image class="wh44" src="/static/img/user-news.png"></image>
				<view class="bg-red-d6-ec news"></view>
			</view>
		</u-navbar>
		<view class="pl20 pr20 box-size mt10 m-b-100">
			<view class="dis-flex flex-y-center flex-x-between">
				<view class="dis-flex flex-y-center w-65  head-l">
					<block v-if="isLogin">
						<image class="head-img mr32" :src="userInfo.portrait"></image>
						<view class="w-65">
							<view class="f-32 w-100 onelist-hidden f-b mb10">{{userInfo.user_name}}</view>
							<!-- 							<view class="dis-flex flex-y-center" @tap="onlink('/pagesUser/page/editUser/editUser')">
								<view class="col-gray-8e f-24">编辑资料</view>
								<image class="wh24 ml10" src="/static/img/user-edit.png"></image>
							</view> -->
						</view>
					</block>
					<view class="dis-flex flex-y-center" v-else @tap="onlink('/pages/login/login')">
						<image class="head-img mr32" src="/static/img/head.png"></image>
						<view class="f-36 f-b mb10">登录/注册</view>
					</view>
				</view>
				<!-- 				<view class="head-r dis-flex flex-y-center"
					@tap="onlink('/pagesIndex/page/campusTakeout/vipCenter/vipCenter?isUser=1')">
					<image class="mr10" src="/static/img/user-win.png"></image>
					<view class="">
						<view class="col-brank-20 f-24">会员中心</view>
						<view class="f-20 col-gray-88 mt5">优惠好券</view>
					</view>
					<view class="dis-flex arrow-right flex-y-center flex-x-end">
						<u-icon name="arrow-right" size="26rpx"></u-icon>
					</view>
				</view> -->
			</view>
			<!-- 切换角色 -->
			<view class="radio-16 mt20 bg-white-ff mb30  pt32  box-size" v-if="groupUserInfo.status == 2"
				@click="changeRole">
				<view class="f-32 f-b col-brank-20 mb32 pl32 box-size">
					<view style="display: flex; padding-bottom: 32rpx; padding-right: 28rpx;">
						<image src="../../../static/img/ico_moshi@2x.png"
							style="width: 40rpx; height: 40rpx; margin-right: 16rpx;"></image>
						<view class="">
							切换角色
						</view>
						<view style="display: flex; margin-left: auto;">
							<view style="margin-right: 16rpx;">我是团长</view>
							<image src="../../../static/img/ico_qiehuan@2x.png" style="width: 40rpx; height: 40rpx;">
							</image>
						</view>
					</view>
				</view>
			</view>
			<!-- 功能与服务 -->
			<view class="radio-16 mt20 bg-white-ff mb30  pt32  box-size">
				<view class="f-32 f-b col-brank-20 mb32 pl32 box-size">服务与功能</view>
				<view class="dis-flex flex-y-center  flex-wrap box-size">
					<view class="dis-flex flex-y-center mb44 w-25 flex-x-center p-r flex-dir-column"
						v-for="(item,index) in menuList" :key="index" @tap="onMenu(item)">
						<image class="mb16 wh80" :src="item.icon"></image>
						<view class="f-24">{{item.name}}</view>
						<view class="f-18 col-white-ff bg-red-d6-ec tips" v-if="item.id==2">HOT</view>
						<view class="f-18 col-white-ff bg-red-d6-ec tips tips2" v-if="item.id==3">赚</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商家入驻弹窗 -->
		<view :catchtouchmove="true">
			<!-- 分享弹窗 -->
			<u-popup :show="show" mode="center" bgColor="transparent" round="32rpx">
				<view class="dis-flex flex-dir-column flex-x-center flex-y-center">
					<form @submit="submitAdd">
						<view class="win-box bg-white-ff dis-flex flex-dir-column flex-x-center flex-y-center radio-30">
							<view class="f-32 w-100 t-c f-b mb30">{{formName}}</view>
							<view
								class="pt20 dis-flex w-100 flex-x-between flex-y-center pb20 pl24 pr24 box-size bg-gray-f7 radio-8 mb20">
								<image class="wh32" mode="widthFix" src="/static/img/user-form01.png"></image>
								<input class="f-28 w-90" name="name" placeholder-class="col-gray-88"
									placeholder="请输入名称" />
							</view>
							<view
								class="pt20 dis-flex  w-100 flex-x-between flex-y-center pb20 pl24 pr24 box-size bg-gray-f7 radio-8 mb20">
								<image class="wh32" mode="widthFix" src="/static/img/user-form02.png"></image>
								<input class="f-28 w-90" name="mobile" placeholder-class="col-gray-88" type="number"
									placeholder="请输入手机号码" />
							</view>
							<view
								class="pt20 dis-flex  w-100 flex-x-between flex-y-center pb20 pl24 pr24 box-size bg-gray-f7 radio-8 mb20">
								<image class="wh32" mode="widthFix" src="/static/img/user-form03.png"></image>
								<input class="f-28 w-90" name="address" placeholder-class="col-gray-88"
									placeholder="请输入地址" />
							</view>
							<button class="bg-red-d6-ec col-white-ff radio-40 t-c form-btn"
								form-type="submit">立即提交</button>
						</view>
					</form>
					<image class="wh72 mt60" @tap.stop="show=false" src="/static/img/cancel.png"></image>
				</view>
			</u-popup>
		</view>
		<!-- 电话弹窗 -->
		<mobileWin :show="mobileShow" title="客服电话" :phone="18307988438"></mobileWin>
		<!-- 底部导航 -->
		<view class="tabbar">
			<u-tabbar :value="activeName" @change="tabbarChange" :fixed="false" :placeholder="false"
				activeColor="#D93038" :safeAreaInsetBottom="false">
				<u-tabbar-item text="校U优选" name="shop">
					<image class="u-page__item__slot-icon" slot="active-icon" src="../../../static/img/icon-act02.png">
					</image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../../static/img/icon02.png">
					</image>
				</u-tabbar-item>
				<u-tabbar-item text="订单" name="order">
					<image class="u-page__item__slot-icon" slot="active-icon"
						src="../../../static/img/ico_dingdan_sel@2x.png"></image>
					<image class="u-page__item__slot-icon" slot="inactive-icon"
						src="../../../static/img/ico_dingdan_nor@2x.png"></image>
				</u-tabbar-item>
				<u-tabbar-item text="我的" name="my">
					<image class="u-page__item__slot-icon" slot="active-icon" src="../../../static/img/icon-act04.png">
					</image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../../static/img/icon04.png">
					</image>
				</u-tabbar-item>
			</u-tabbar>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				isLogin: false, //是否登录
				bgColor: "rgba(0,0,0,0)",
				mr: 0, //距离右边胶囊的宽度
				userInfo: {}, //用户信息
				groupUserInfo: {},
				activeName: 'my',
				menuList: [{
						name: "自提点",
						icon: "/static/img/user-menu01.png",
						id: 1,
						path: "/pagesUser/page/group/pickLocation/list",
					}, {
						name: "钱包",
						icon: "/static/img/user-menu05.png",
						id: 5,
						path: "/pagesOptimization/pages/wallet/wallet",
					},
					{
						name: "我的推广",
						icon: "/static/img/ico_yaoqing@2x.png",
						id: 5,
						path: "/pagesUser/page/group/promotion/promotion",
					},
					{
						name: "营业数据",
						icon: "/static/img/ico_shezhi@2x.png",
						id: 7,
						path: "/pagesUser/page/group/analysis/analysis",
					},

				],
				show: false, //是否显示商家入驻弹窗
				formType: 1, //当前的表单 因为商家入驻 加盟代理邀请有奖 电商招商表单一样
				formName: "电商招商",
				mobileShow: false, //是否显示手机号码弹窗
			}
		},
		onPageScroll(e) {
			if (e.scrollTop > 30) {
				this.bgColor = "#fff"
			} else {
				this.bgColor = "#f7f7f7"
			}
		},
		onLoad(e) {
			//#ifdef  MP-WEIXIN
			this.mr = uni.getMenuButtonBoundingClientRect().width + 16
			//#endif
		},
		onShow() {
			this.isLogin = uni.getStorageSync('tokens') || false
			this.userInfo = uni.getStorageSync('userInfo') || {}
			// this.information()
			this.getGroupUserInfo()
		},
		methods: {
			//跳转页面链接
			onlink(url) {

				uni.navigateTo({
					url: url
				})



			},

			onlinkx(url, id) {
				console.log(url, id)
				if (id == 1) {
					uni.switchTab({
						url: url
					})
				} else {
					uni.navigateTo({
						url: url
					})
				}
			},




			//提交加盟
			submitAdd(e) {
				var formData = e.detail.value
				formData.type = this.formType
				if (formData.name == '') {
					this.$u.toast("请输入姓名")
				} else if (formData.mobile == '') {
					this.$u.toast("请输入手机号")
				} else if (!this.$u.test.mobile(formData.mobile)) {
					this.$u.toast("请输入正确的11位手机号")
				} else if (formData.address == '') {
					this.$u.toast("请输入地址")
				} else {
					this.getJoininfoAdd(formData)
				}
			},
			//加盟接口
			async getJoininfoAdd(formData) {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const result = await that.$api.joininfoAdd(formData)
				uni.hideLoading()
				if (result.status == 200) {
					this.$u.toast("提交成功")
					this.show = false
				}
			},
			//菜单跳转
			onMenu(item) {
				if (item.id == 2 || item.id == 3 || item.id == 4 || item.id == 6) {
					if (!uni.getStorageSync('tokens')) {
						app.noLogin()
						return
					}
					this.show = true
					this.formType = item.value
					this.formName = item.name
					return
				}
				uni.navigateTo({
					url: item.path
				})
			},

			//个人信息
			async information() {

				var that = this
				const result = await that.$api.receivingOrderx()
				if (result.status == 200) {
					this.userInfo = result.data.userInfo

					this.orderList[0].num = result.data.orderCount.payment
					this.orderList[1].num = result.data.orderCount.received
					this.orderList[2].num = result.data.orderCount.used
					this.orderList[3].num = result.data.orderCount.comment
					this.orderList[4].num = result.data.orderCount.refund
				}
			},
			changeRole() {
				uni.navigateTo({
					url: "/pagesUser/page/selectRole/selectRole"
				})
			},
			async getGroupUserInfo() {
				const data = {
					userId: this.userInfo.id
				}
				const res = await this.$http.post('/api/user/getGroupUserInfo', data)
				if (res.code == 200) {
					this.groupUserInfo = res.data || {}
				}
			},
			tabbarChange(e) {
				if (e === 'order') {
					uni.navigateTo({
						url: '/pagesUser/page/group/order/order'
					})
				}
				if (e === 'shop') {
					uni.navigateTo({
						url: '/pagesUser/page/group/SchoolU/SchoolU'
					})
				}
				if (e === 'my') {
					uni.navigateTo({
						url: '/pagesUser/page/group/group'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.arrow-right {
		position: relative;
		right: -10rpx;
	}

	.news {
		width: 16rpx;
		height: 16rpx;
		border-radius: 100%;
		border: 4rpx solid #FFFFFF;
		position: absolute;
		right: 0;
		top: -2rpx;
	}

	.head-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 100%;
	}

	.head-r {
		width: 232rpx;
		height: 100rpx;
		background: #FEFFFE;
		box-shadow: 0px 4rpx 24rpx 0px rgba(0, 0, 0, 0.0500);
		border-radius: 16rpx;
		padding: 16rpx;
		box-sizing: border-box;
	}

	.head-r image {
		width: 68rpx;
		height: 68rpx;
	}

	.icon-list {
		padding: 0 44rpx;
		height: 228rpx;
	}

	.order-list {
		height: 276rpx;
	}

	.num {
		position: absolute;
		min-width: 30rpx;
		height: 30rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 15rpx;
		border: 2rpx solid #FFFFFF;
		padding: 0 6rpx;
		box-sizing: border-box;
		font-size: 20rpx;
		text-align: center;
		line-height: 30rpx;
		color: #fff;
		right: -8rpx;
		top: -8rpx;

	}

	.tips {
		position: absolute;
		padding: 0 8rpx;
		height: 28rpx;
		border: 2rpx solid #FFFFFF;
		border-radius: 15rpx 15rpx 15rpx 0px;
		top: 6rpx;
		right: 24rpx;

	}

	.tips2 {
		right: 44rpx !important;
	}

	.win-box {
		padding: 40rpx;
		padding-top: 10rpx;
		width: 560rpx;
		height: 620rpx;
		box-sizing: border-box;
	}

	.form-btn {
		width: 320rpx;
		height: 72rpx;
		line-height: 72rpx;
		margin-top: 50rpx;
		font-size: 28rpx;
	}

	.tabbar {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.u-page__item__slot-icon {
		width: 48rpx;
		height: 48rpx;
	}
</style>