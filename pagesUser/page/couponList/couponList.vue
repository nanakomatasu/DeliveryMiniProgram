<template>
	<view>
		<u-sticky>
			<view class="dis-flex flex-y-center tab-box bg-white-ff box-shad-b">
				<view class="f-32  pl30 pr30" :class="tabId==item.id?'tab-sel f-b col-brank-20 ':'col-gray-8e'"
					v-for="(item,index) in tabList" :key="index" @tap.stop="changeTab(item.id)">
					{{item.name}}
				</view>
			</view>
		</u-sticky>

		<view class="cont">
			<view class="mb20 bg-white-ff radio-16" v-for="(item,index) in shopList" :key="index" >
				<view class="radio-16 dis-flex w-100 flex-y-center pt20 pb20 box-size bg-white-ff  p-r coupon-item">
					<!-- <image v-if="item.status!=1" class="status"
						:src="item.status==2?'/pagesUser/static/coupon02.png':'/pagesUser/static/coupon03.png'"></image> -->
					<!-- <view class="label pl12 pr12 col-white-ff  f-20"
						:class="item.status1?'bg-gray-8e8f':'bg-red-d6-ec'">外卖</view>
					<view class="label pl12 pr12 col-white-ff  f-20"
						:class="item.status==2?'bg-gray-8e8f':'bg-red-d6-ec'">周边</view>
					<view class="label pl12 pr12 col-white-ff  f-20"
						:class="item.status==3?'bg-gray-8e8f':'bg-red-d6-ec'">优选</view> -->
					<view class="label pl12 pr12 col-white-ff  f-20 bg-red-d6-ec" v-if="item.coupon_type==1">平台</view>
					<view class="label pl12 pr12 col-white-ff  f-20 bg-red-d6-ec" v-if="item.coupon_type==2">商家</view>
					<view class="coupon-l h-100 w-65 dis-flex flex-dir-column flex-x-between">
						<view class="w-100 ">
							<view class="f-32 w-100 onelist-hidden f-b" :class="item.status==1?'col-gray-8e':''">
								{{item.coupon_name}}
							</view>
							<view class="f-24 col-gray-88 mt5">有效期
								{{item.use_start_time.slice(0,10)}}至{{item.use_end_time.slice(0,10)}}
							</view>
						</view>
						<view class="dis-flex flex-y-center" @tap.stop="openItem(item,index)">
							<view class="f-24 col-gray-88 ">使用规则</view>
							<image class="wh24 ml10"
								:src="item.isOpen?'/pagesUser/static/top-coupon.png': '/pagesUser/static/bottom-coupon.png'">
							</image>
						</view>

					</view>
					<view
						class="coupon-r pl10 pr10 box-size w-35 dis-flex flex-dir-column flex-y-center flex-x-center p-r">
						<view class="t-b  price f-b  w-100 onelist-hidden t-c f-32"
							:class="item.state==1?'col-gray-8e':'col-red-d9 '">
							¥
							<text class="f-64">{{item.money}}</text>
						</view>

						<view class="f-24 col-gray-88 tips mb16" v-if="item.type==2">无门槛</view>
						<view class="f-24 col-gray-88 tips mb16" v-if="item.type==1">满{{item.full_money}}可用</view>
						<view class="bg-red-d6-ec col-white-ff btn f-24 radio-35 pl24 pr24" v-if="item.state==2"
							@tap.stop="employ(item)">去使用
						</view>
						<view class="bg-red-d6-ec col-white-ff btn f-24 radio-35 pl24 pr24" v-if="item.state==1">已使用

						</view>
					</view>
				</view>
				<view class="col-gray-8e cont24-32 tip-detail f-24" v-if="index==indes" >
					<view class="mb10">优惠券详情</view>
					<view>
						1、本优惠券单笔订单满{{item.full_money}}元可以使用；
						2、优惠券领取后30天内有效；
						3、本优惠券仅支持线上支付使用</view>
						<view class="bg-red-d6-ec col-white-ff btn f-24 radio-35 pl24 pr24 t-c m-t-20" v-if="item.coupon_type == 1 && item.store_type != 2 " @tap.stop="employ(item)">
							查看可用商家
						</view>
				</view>
				
			</view>
		</view>


		<view class="m-t-60" v-if="shopList.length==0">
			<view class="flex-center">
				<image class="zanwu " src="/pagesUser/static/zanwu.png"></image>
			</view>
			<view class="flex-center">
				暂无优惠券
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				indes:-1,
				shopList: [],
				page: 1,
				status: "loadmore",
				tabId: 1, //当前选中id
				tabList: [{
						name: "未使用",
						id: 1,
					}, {
						name: "已使用",
						id: 2,
					}
					// , {
					// 	name: "已过期",
					// 	id: 3,
					// },
				],
				couponList: [{ //优惠券列表
					type: "校园外卖",
					status: 1,
				},
				//  {
				// 	type: "校U优选",
				// 	status: 2,
				// }, {
				// 	type: "本地生活本地生活",
				// 	status: 3,
				// }
			],
				type: "",
				id: "",
			};
		},
		onLoad(e) {
			this.type = e.type

			this.id = e.id
			console.log(e.type, e.id)

			this.initList()
			this.couponlistxs()
		},
		onReachBottom() {
			this.couponlistxs(true)
		},
		methods: {
			//初始化列表 添加展开状态
			initList() {
				this.couponList.forEach(item => {
					item.isOpen = false
				})
				this.$forceUpdate()
			},
			//点击展开
			openItem(item, index) {
				this.couponList[index].isOpen = !this.couponList[index].isOpen
				console.log(item, index)
				this.indes=index
				this.$forceUpdate()
			},

			//切换优惠券的状态
			changeTab(id) {
				this.tabId = id
				this.couponlistxs()
			},

			//去使用
			employ(item) {
				console.log(item, 'item的东西');
				if (item.coupon_type == 1) {
					if (item.store_type == 2) {
						uni.navigateTo({
							url: '/pages/index/index'
						})
					}else {
						uni.navigateTo({
							url: '/pagesIndex/page/campusTakeout/index/redindex/redindex?id=' + item.coupon_id
							// pagesIndex/page/campusTakeout/index/index
							
						})
					}
					
				}
				if (item.coupon_type == 2) {
					uni.navigateTo({
						// url: '/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id=' + item.store_id
						url: '/pagesIndex/page/campusTakeout/index/index'
					})
				}




				// if (this.type == 1) {
				// 	var pages = getCurrentPages();
				// 	var prevPage = pages[pages.length - 2]; //上一个页面
				// 	var object = {
				// 		id: id,
				// 	}
				// 	prevPage.$vm.otherFun(object); //重点$vm
				// 	uni.navigateBack();
				// 	// uni.redirectTo({
				// 	// 	url: '/pagesIndex/page/campusTakeout/index/addOrder/addOrder?id='+this.id
				// 	// });
				// } else {
				// 	uni.switchTab({
				// 		url: '/pages/index/index'
				// 	});
				// }
			},



			async couponlistxs(isPage) {
				if (this.isLoad) {
					return
				}
				this.isLoad = true
				uni.showLoading({
					title: "正在加载中"
				})
				let that = this
				if (isPage) {
					this.page = this.page + 1
					that.status = "loading"
				} else {
					this.page = 1
					this.shopList = []
					this.status = 'loadmore'
				}

				var shopList = this.shopList;
				const {
					data,
					status
				} = await that.$api.couponlist({
					page: this.page,
					type: this.tabId,
				})
				uni.hideLoading()
				if (status == 200) {
					// console.log(data.list)
					shopList = shopList.concat(data.data)
					that.shopList = shopList
					if (data.data.length == 0) {
						that.status = 'nomore'
					}
					that.isLoad = false

				}
			},

			












		}
	}
</script>

<style lang="scss">
	.btn {
		height: 56rpx;
		line-height: 56rpx;
	}

	.tab-box {
		height: 100rpx;
	}

	.cont {
		padding: 24rpx 24rpx 0 24rpx;
		box-sizing: border-box;
	}

	.label {
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 16rpx 0px 8rpx 0px;
	}

	.coupon-item {
		height: 220rpx;
		box-shadow: 0 44rpx 44rpx #F7F7F7;
	}

	.coupon-l {
		padding: 20rpx 10rpx 12rpx 32rpx;
		box-sizing: border-box;
		border-right: 2rpx dashed #DDDDDD;
	}

	.price {
		line-height: 50rpx;
	}

	.tips {
		margin-top: -5rpx;
	}

	.tip-detail {
		z-index: 11;
		position: relative;
	}

	.status {
		width: 92rpx;
		height: 88rpx;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 0;
	}

	.zanwu {
		width: 304rpx;
		height: 304rpx;
	}
</style>
