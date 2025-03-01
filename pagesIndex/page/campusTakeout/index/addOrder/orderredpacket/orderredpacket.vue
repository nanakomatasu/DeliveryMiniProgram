<template>
	<view>
		<view class="cont">
			<view class=" bg-white-ff radio-16" v-for="(item,index) in shopList" :key="index" v-if="item.can_use==1">
				<view class="radio-16 dis-flex w-100 flex-y-center pt20 pb20 box-size bg-white-ff  p-r coupon-item">
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
								:src="index==indes?'/pagesUser/static/top-coupon.png': '/pagesUser/static/bottom-coupon.png'">
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
						<view class="bg-red-d6-ec col-white-ff btn f-24 radio-35 pl24 pr24"
							v-if="item.state==2&&id!=item.id" @tap.stop="employ(item,index)">去使用
						</view>
						<view class="bg-red-d6-ec col-white-ff btn f-24 radio-35 pl24 pr24" v-if="id==item.id"
							@tap.stop="cancel()">取消使用
						</view>
						<view class="bg-red-d6-ec col-white-ff btn f-24 radio-35 pl24 pr24" v-if="item.state==1">已使用
						</view>
					</view>
				</view>
				<view class="col-gray-8e cont24-32 tip-detail f-24" v-if="index==indes">
					<view class="mb10">优惠券详情</view>
					<view>
						1、本优惠券单笔订单满{{item.full_money}}元可以使用；
						2、优惠券领取后30天内有效；
						3、本优惠券仅支持线上支付使用</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "",
				shopList: [],
				indes: -1,
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
				id: "",
			}
		},

		onLoad(e) {

			if (e.id) {
				this.id = e.id
			}

			console.log(e.id)

			this.initList()
			console.log(JSON.parse(e.item))
			this.shopList = JSON.parse(e.item)
			uni.setNavigationBarTitle({
				title: e.title
			});
			this.title = e.title
		},

		methods: {
			//初始化列表 添加展开状态
			initList() {
				this.couponList.forEach(item => {})
				this.$forceUpdate()
			},
			openItem(item, index) {
				this.indes = index
				this.$forceUpdate()
			},

			employ(item, index) {
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.$vm.otherFunrx(item); //重点$vm
				uni.navigateBack();
			},

			cancel() {
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.$vm.cancelx(this.title); //重点$vm
				uni.navigateBack();
			}

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