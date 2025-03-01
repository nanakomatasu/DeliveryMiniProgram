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
							<view class="dis-flex flex-y-center" @tap="onlink('/pagesUser/page/editUser/editUser')">
								<view class="col-gray-8e f-24">编辑资料</view>
								<image class="wh24 ml10" src="/static/img/user-edit.png"></image>
							</view>
						</view>
					</block>
					<view class="dis-flex flex-y-center" v-else @tap="onlink('/pages/login/wxlogin/wxlogin')">
						<image class="head-img mr32" src="/static/img/head.png"></image>
						<view class="f-36 f-b mb10">登录/注册</view>
					</view>
				</view>
				<view class="head-r dis-flex flex-y-center"
					@tap="onlink('/pagesIndex/page/campusTakeout/vipCenter/vipCenter?isUser=1')">
					<image class="mr10" src="/static/img/user-win.png"></image>
					<view class="">
						<view class="col-brank-20 f-24">会员中心</view>
						<view class="f-20 col-gray-88 mt5">优惠好券</view>
					</view>
					<view class="dis-flex arrow-right flex-y-center flex-x-end">
						<u-icon name="arrow-right" size="26rpx"></u-icon>
					</view>
				</view>
			</view>
			<!-- 购物车等菜单 -->
			<view class="radio-16 mt45 bg-white-ff flex-x-between icon-list dis-flex flex-y-center">
				<view class="dis-flex flex-y-center flex-x-center flex-dir-column" @tap="onlinkx(item.path,item.id)"
					v-for="(item,index) in iconList" :key="index">
					<image class="mb24 wh88" :src="item.icon"></image>
					<view class="f-24">{{item.name}}</view>
				</view>
			</view>
			<!-- 我的订单 -->
			<view class="radio-16 mt20 bg-white-ff order-list pl32 pt32 pr32 box-size">
				<view class="dis-flex flex-y-center flex-x-between mb40">
					<view class="f-32 f-b col-brank-20">我的订单</view>
					<view class="dis-flex flex-y-center" @tap="onlink('/pagesUser/page/orderList/orderList')">
						<view class="f-24 col-gray-8e">全部订单</view>
						<u-icon name="arrow-right" size="26rpx" color="#8E8F8E"></u-icon>
					</view>
				</view>
				<view class="dis-flex flex-y-center flex-x-between pl8 pr8 box-size">
					<view class="dis-flex p-r flex-y-center flex-x-center flex-dir-column"
						v-for="(item,index) in orderList" :key="index" @tap="onlink(item.path,item.id)">
						<image class="mb16 wh64" :src="item.icon"></image>
						<view class="f-24">{{item.name}}</view>
						<view class="num" v-if="item.num!=0">{{item.num}}</view>
					</view>
				</view>
			</view>
			<!-- 切换角色 -->
			<view class="radio-16 mt20 bg-white-ff mb30  pt32  box-size" v-if="groupUserInfo.status == 2"
				@click="changeRole">
				<view class="f-32 f-b col-brank-20 mb32 pl32 box-size">
					<view style="display: flex; padding-bottom: 32rpx; padding-right: 28rpx;">
						<image src="../../static/img/ico_moshi@2x.png"
							style="width: 40rpx; height: 40rpx; margin-right: 16rpx;"></image>
						<view class="">
							切换角色
						</view>
						<view style="display: flex; margin-left: auto;">
							<view style="margin-right: 16rpx;">我是买家</view>
							<image src="../../static/img/ico_qiehuan@2x.png" style="width: 40rpx; height: 40rpx;">
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
							<view class="f-28 w-100 t-c c-88">平台联系电话 {{Umobile}}</view>
							<view v-if="myyq != 1"
								class="pt20 dis-flex w-100 flex-x-between flex-y-center pb20 pl24 pr24 box-size bg-gray-f7 radio-8 mb20">
								<image class="wh32" mode="widthFix" src="/static/img/user-form01.png"></image>
								<input class="f-28 w-90" name="name" placeholder-class="col-gray-88"
									placeholder="请输入名称" />
							</view>
							<view v-if="myyq != 1"
								class="pt20 dis-flex  w-100 flex-x-between flex-y-center pb20 pl24 pr24 box-size bg-gray-f7 radio-8 mb20">
								<image class="wh32" mode="widthFix" src="/static/img/user-form02.png"></image>
								<input class="f-28 w-90" name="mobile" placeholder-class="col-gray-88" type="number"
									placeholder="请输入手机号码" />
							</view>
							<view v-if="myyq != 1"
								class="pt20 dis-flex  w-100 flex-x-between flex-y-center pb20 pl24 pr24 box-size bg-gray-f7 radio-8 mb20">
								<image class="wh32" mode="widthFix" src="/static/img/user-form03.png"></image>
								<input class="f-28 w-90" name="address" placeholder-class="col-gray-88"
									placeholder="请输入地址" />
							</view>
							<view v-if="myyq == 1"
								class="pt20 dis-flex  w-100 flex-x-between flex-y-center pb20 pl24 pr24 box-size bg-gray-f7 radio-8 mb20">
								<image class="wh32" mode="widthFix" src="/static/img/user-form02.png"></image>
								<input class="f-28 w-90" name="mobile" placeholder-class="col-gray-88" type="number"
									v-model="tc_mobile" placeholder="请输入手机号码" />
							</view>
							<button class="bg-red-d6-ec col-white-ff radio-40 t-c form-btn" v-if="myyq != 1"
								form-type="submit">立即提交</button>
							<view class="m-t-20 flex-al-c" style="line-height: 40rpx;"
								:class="myyq == 1 ? '' : 'dis-none'" @click="gomyCallfor()">
								<text class="f-28 color-D93038 m-r-4">我的邀请</text>
								<image class="wh-24" src="/static/img/ico_red_fanhui.png" mode=""></image>
							</view>
							<view class="bg-red-d6-ec col-white-ff radio-40 t-c form-btn" v-if="myyq == 1"
								@click="pt_yq()">
								立即提交
							</view>
						</view>
					</form>
					<image class="wh72 mt60" @tap.stop="show=false" src="/static/img/cancel.png"></image>
				</view>
			</u-popup>
		</view>
		<!-- 电话弹窗 -->
		<mobileWin :show="mobileShow" title="客服电话" :phone="18307988438"></mobileWin>
		<template>
			<view>
				<view :catchtouchmove="true">
					<u-popup :show="UmobileShow" mode="center" :safeAreaInsetBottom="false" round="32rpx">
						<view class="win-box-mobile  box-size bg-white-ff radio-30">
							<view class="f-32 w-100 t-c f-b">客服电话</view>
							<view class="f-56 t-c f-b f-DINPro mt20">{{Umobile}}</view>
							<view class="dis-flex flex-y-center flex-x-between mt40">
								<view class="btn t-c bg-gray-ef radio-40" @tap="UmobileShow=false">取消</view>
								<view class="btn t-c bg-red-d6-ec col-white-ff radio-40" @tap="callUmobile">立即拨打</view>
							</view>
						</view>
					</u-popup>
				</view>
			</view>
		</template>

		<indexHenu :tabAct="4"></indexHenu>
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
				iconList: [{
						name: "购物车",
						icon: "/static/img/user-icon01.png",
						id: 1,
						path: "/pages/cart/cart",
					}, {
						name: "收藏",
						icon: "/static/img/user-icon02.png",
						id: 2,
						path: "/pagesUser/page/case/case",
					}, {
						name: "红包/卡券",
						icon: "/static/img/user-icon03.png",
						id: 3,
						path: "/pagesUser/page/couponList/couponList",
					}, {
						name: "足迹",
						icon: "/static/img/user-icon04.png",
						id: 4,
						path: "/pagesUser/page/footprint/footprint",
					}
					// {
					// 	name: "店铺关注",
					// 	icon: `${this.$url}resource/img/ico_dianpu@2x.png`,
					// 	id: 5,
					// 	path: "/pagesOptimization/pages/StoreAttention/StoreAttention",
					// }
				],
				orderList: [{
					name: "待支付",
					icon: "/static/img/user-order01.png",
					id: 1,
					path: "/pagesUser/page/orderList/orderList?id=1",
					num: 0,
				}, {
					name: "待收货",
					icon: "/static/img/user-order02.png",
					id: 2,
					path: "/pagesUser/page/orderList/orderList?id=2",
					num: 0,
				}, {
					name: "待使用",
					icon: "/static/img/user-order03.png",
					id: 3,
					path: "/pagesUser/page/orderList/orderList?id=3",
					num: 0,
				}, {
					name: "待评价",
					icon: "/static/img/user-order04.png",
					id: 4,
					path: "/pagesUser/page/orderList/orderList?id=4",
					num: 0,
				}, {
					name: "退款售后",
					icon: "/static/img/user-order05.png",
					id: 6,
					path: "/pagesUser/page/orderList/orderList?id=6",
					num: 0,
				}],
				menuList: [{
						name: "地址管理",
						icon: "/static/img/user-menu01.png",
						id: 1,
						path: "/pagesUser/page/addressList/addressList",
					},
					{
						name: "商家入驻",
						icon: "/static/img/user-menu02.png",
						id: 2,
						path: "",
						value: 1
					}, 
					{
						name: "邀请有奖",
						icon: "/static/img/user-menu03.png",
						id: 3,
						path: "/pagesUser/page/invite/invite",
						value: 4
					},
					// {
					// 	name: "加盟代理",
					// 	icon: "/static/img/user-menu04.png",
					// 	id: 4,
					// 	path: "",
					// 	value: 2
					// }, 
					// {
					// 	name: "钱包",
					// 	icon: "/static/img/user-menu05.png",
					// 	id: 5,
					// 	path: "/pagesOptimization/pages/wallet/wallet",
					// }, 
					// {
					// 	name: "电商招商",
					// 	icon: "/static/img/user-menu06.png",
					// 	id: 6,
					// 	path: "",
					// 	value: 3
					// },
					{
						name: "成为团长",
						icon: "/static/img/user-menu06.png",
						id: 9,
						path: "/pagesOptimization/pages/applyChief/applyChief",
						value: 3
					},
					// {
					// 	name: "我的分享",
					// 	icon: "/static/img/ico_yaoqing@2x.png",
					// 	id: 10,
					// 	path: "/pagesOptimization/pages/MyShare/MyShare",
					// },
					// {
					// 	name: "客服",
					// 	icon: "/static/img/user-menu07.png",
					// 	id: 8,
					// },

					{
						name: "设置",
						icon: "/static/img/user-menu07.png",
						id: 7,
						path: "/pagesUser/page/setting/setting",
					},
					// {
					// 	name: "资料墙",
					// 	icon: "/static/img/user-menu03.png",
					// 	id: 7,
					// 	path: "/pagesUser/page/datawall/datawall",
					// }

				],
				show: false, //是否显示商家入驻弹窗
				formType: 1, //当前的表单 因为商家入驻 加盟代理邀请有奖 电商招商表单一样
				formName: "电商招商",
				mobileShow: false, //是否显示手机号码弹窗
				UmobileShow: false, //校U客服
				Umobile: '', //校U客服电话
				myyq: '', //我的邀请
				tc_mobile: '', //活动——邀请会员
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
			uni.hideTabBar()
			// this.getPlatformCustomerPhone()
			this.isLogin = uni.getStorageSync('tokens') || false
			this.userInfo = uni.getStorageSync('userInfo') || {}
			this.information()
			if (this.userInfo.id) {
				// this.getGroupUserInfo()
			}
		},
		methods: {
			//跳转页面链接
			onlink(url) {

				uni.navigateTo({
					url: url
				})



			},

			onlinkx(url, id) {
				uni.navigateTo({
					url: url
				})
				// console.log(url, id)
				// if (id == 1) {
				// 	uni.switchTab({
				// 		url: url
				// 	})
				// } else {
				// 	uni.navigateTo({
				// 		url: url
				// 	})
				// }
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

			//跳转我的邀请
			gomyCallfor() {
				uni.navigateTo({
					url: '/pages/user/myCallfor/myCallfor'
				})
			},

			//菜单跳转
			onMenu(item) {
				// if (item.id == 3) {
				// 	this.myyq = 1
				// } else {
				// 	this.myyq = ''
				// }
				if (item.id == 2 || item.id == 3 || item.id == 4 || item.id == 6) {
					if (!uni.getStorageSync('tokens')) {
						app.noLogin()
						return
					}
          if (item.id == 3) {
            uni.navigateTo({
              url: item.path
            })
            return
          }
					this.show = true
					this.formType = item.value
					this.formName = item.name
					return
				}
        console.log('item.path', item.path);
        uni.navigateTo({
          url: item.path
        })
				if (item.id == 8) {
					this.getPlatformCustomerPhone()
					this.UmobileShow = true

				}

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
			// /api/user/getPlatformCustomerPhone
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
			callUmobile() {
				uni.makePhoneCall({
					phoneNumber: this.Umobile
				})
			},
			changeRole() {
				uni.navigateTo({
					url: "/pagesUser/page/selectRole/selectRole?userId=" + this.userInfo.id
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

			pt_yq() {
				if (!this.tc_mobile) {
					uni.showToast({
						title: "请填正确的手机号码",
						icon: "none"
					})
				} else {
					this.getTc_recommend()
				}
			},

			//邀请会员接口
			async getTc_recommend() {
				var that = this
				const result = await that.$api.tc_recommend({
					mobile: this.tc_mobile
				})
				if (result.status == 200) {
					this.$u.toast("提交成功")
					this.tc_mobile = ""
					this.show = false;
				}
			},

		}
	}
</script>

<style>
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

	.win-box-mobile {
		width: 560rpx;
		height: 328rpx;
		padding: 40rpx 60rpx;

	}

	.btn {
		width: 210rpx;
		height: 64rpx;
		line-height: 64rpx;
	}
</style>