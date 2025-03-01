<template>
	<view>
		<view class="">
			<view class="padd-0-32">
				<view class="flex-al-c flex-jus-spa m-t-12">
					<view class="flex-al-c" v-if="type==true">
						<view class="m-l-32">
							<view class="flex-about flex-al-c">
								<view class="flex-al-c">
									<image class="wh-120 bor-r-100 m-r-20" :src="userInfo.userInfo.portrait" mode="">
									</image>
									<view class="">
										<view class="f-36 color-20 text-shenglue" style="width: 300rpx;">{{ userInfo.userInfo.user_name }}</view>
										<view class="">
											{{userInfo.userInfo.mobile}}
										</view>
									</view>
									<!-- <image class="yrz_img m-l-12" v-show="userInfo.is_auth.status == 1" </view> -->

										<!-- <view class="flex" style="margin-left: 200rpx;">
											<image class="imgx" src="@/campuscircle/static/scan.png" mode=""></image>
											<image class="imgx m-l-15" src="@/campuscircle/static/friends.png" mode="">
											</image>
										</view> -->

								</view>
							</view>

						</view>
					</view>
					<view class="flex-al-c" v-show="type==false">
						<image class="wh-120" src="@/campuscircle/static/touxiang.png" mode=""></image>
						<view class="m-l-32">
							<view class="flex-al-c" @tap="onlinkx()">
								<text class="f-36 color-20">登录/注册</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 粉丝-关注-红包 -->
				<view class="flex-jus-spa m-t-28">
					<view class="flex-c-c flex-column w33" @click="gofans()">
						<view class="f-40 color-20 fw-700">{{ userInfo.dynamic||'0' }}</view>
						<view class="f-24 color-20">动态</view>
					</view>
					<view class="flex-c-c flex-column w33" @click="gofocus()">
						<view class="f-40 color-20 fw-700">{{ userInfo.post_num||'0' }}</view>
						<view class="f-24 color-20">发帖</view>
					</view>
					<view class="flex-c-c flex-column w33" @click="gocoupons()">
						<view class="f-40 color-20 fw-700">{{ userInfo.follow_num||'0' }}</view>
						<view class="f-24 color-20">关注</view>
					</view>
					<view class="flex-c-c flex-column w33" @click="gocouponx()">
						<view class="f-40 color-20 fw-700">{{ userInfo.fans_num||'0' }}</view>
						<view class="f-24 color-20">粉丝</view>
					</view>
				</view>
				<!-- 我的钱包 -->
				<view class="theWallet_box flex-jus-spa flex-al-c m-t-32">
					<view class="" v-for="(item,index) in centre" :key="index" @tap="inmenu(item.url,index)">
						<view class="flex-center">
							<image class="cdimmg " :src="item.img" mode=""></image>
						</view>
						<view class="flex-center m-t-15">
							{{item.name}}
						</view>
					</view>
				</view>
				<!-- 常用功能 -->
				<view class="my_main_box m-t-20 bor-r-16">
					<view class="f-32 color-20 fw-700">
						常用功能
					</view>
					<view class="m-t-20">
						<view class="flex-al-c flex-jus-spa my_main_box_1" v-for="(item,index) in list" :key="index"
							@click="goRzInfor(item,index)">
							<view class="flex-al-c">
								<image class="wh-56" :src="item.img" mode=""></image>
								<text class="f-28 color-20 m-l-24">{{ item.name }}</text>
							</view>
							<view class="">
								<image class="wh-28" src="/dolegwork/static/zbian.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let app = getApp();
	export default {
		data() {
			return {
				type: false,
				userInfo: {}, //用户信息

				name: '', //名字
				tel: '', //电话
				portrait: '', //头像
				money: '', //钱包余额
				fans: '', //粉丝
				coupon: '', //红包
				follows: '', //关注


				list: [{
						name: '社区规范',
						img: '/campuscircle/static/community.png',
						url: '/campuscircle/my/sqgf/sqgf'
					},
					{
						name: '新手帮助',
						img: '/campuscircle/static/succour.png',
						url: '/campuscircle/my/xsbz/xsbz'
					},
					{
						name: '申请超话',
						img: '/campuscircle/static/hyperphone.png',
						url: '/campuscircle/my/subscribe/subscribe'
					},
					{
						name: '申请成为校园管理员',
						img: '/campuscircle/static/staff.png',
						url: '/pagesUser/page/datawall/NewsFeed/NewsFeed'
					},
					{
						name: '个性皮肤',
						img: '/campuscircle/static/flesh.png',
						url: '/pagesUser/page/datawall/NewsFeed/NewsFeed'
					}
				],
				centre: [{
					name: '我的相册',
					img: '/campuscircle/static/album.png',
					url: '/campuscircle/my/myalbum/myalbum'
				}, {
					name: '赞/收藏',
					img: '/campuscircle/static/collect.png',
					url: '/campuscircle/my/helpcollect/helpcollect'
				}, {
					name: 'U币',
					img: '/campuscircle/static/wallet.png',
					url: '/campuscircle/my/ucoins/ucoins'
				}, {
					name: '浏览记录',
					img: '/campuscircle/static/footprint.png',
					url: '/campuscircle/my/browserecord/browserecord'
				}, ]


			}
		},

		onShow() {
			this.getMyWalletx()

		},
		mounted() {
			if (this.isWxBrowser()) {
				app.pageHead()
			}
		},

		methods: {

			inmenu(url,index) {
				
				console.log('index',index);
				if(index==2) {
					this.$u.toast("功能开发中")
				}else {
					uni.navigateTo({
						url: url,
					});
				}
			},

			//钱包
			qbsx() {
				uni.navigateTo({
					url: '/pagesUser/page/datawall/wallet/wallet'
				});

			},
			async isWxBrowser() {
								let ua = await wx.getRendererUserAgent()
				// let ua = navigator.userAgent.toLowerCase();
				let isWeixin = ua.indexOf("micromessenger") != -1;
				return isWeixin;
			},

			onlinkx() {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			},

			// 设置跳转
			goSet(e) {
				uni.navigateTo({
					url: '/pagesUser/page/datawall/set/set?id=' + this.id + '&portrait=' + this.portrait +
						'&name=' + this.name
				})
			},
			goRzInfor(item,index) {
				// uni.navigateTo({
				// 	url: item.url
				// })
				if(index == 4 || index == 3) {
					this.$u.toast("功能开发中")
				}else {
					uni.navigateTo({
						url: item.url
					})
				}
			},
			gofans() {
				uni.navigateTo({
					url: '/campuscircle/my/dynamic/dynamic'
				})
			},
			gofocus() {
				uni.navigateTo({
					url: '/campuscircle/my/myposts/myposts'
				})
			},
			gocoupons() {
				uni.navigateTo({
					url: '/campuscircle/my/concentration/concentration'
				})
			},

			gocouponx() {
				uni.navigateTo({
					url: '/campuscircle/my/admirers/admirers'
				})
			},





			//我的钱包 
			async getMyWalletx() {
				let that = this
				const {
					data,
					status
				} = await that.$api.circlegrmy({

				})
				if (status == 200) {
					this.userInfo = data
					this.type = true
					console.log(data, '获取成功');
				}
			},



		}
	}
</script>

<style>
	.yrz_img {
		width: 108rpx;
		height: 32rpx;
	}

	.theWallet_box {
		background: #FFFFFF;
		box-sizing: border-box;
		padding: 34rpx 36rpx;
		border-radius: 16rpx;
	}

	.my_main_box {
		box-sizing: border-box;
		padding: 32rpx 24rpx 20rpx 32rpx;
		background-color: #fff;
	}

	.my_main_box_1 {
		box-sizing: border-box;
		padding: 24rpx 0rpx 24rpx 0rpx;
	}

	.imgx {
		width: 44rpx;
		height: 44rpx;
	}

	.cdimmg {
		width: 88rpx;
		height: 88rpx;
	}
</style>
