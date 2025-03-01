<template>
	<view>
		<view class="cont">
			<view class="radio-16 mb20 pt24 pl24 pr24 pb24 box-size bg-white-ff" v-for="(item,index) in list"
				:key="index" @tap="onLink('/pagesUser/page/orderList/afterSalesList/detail/detail?id'+item.id)">
				<view class="dis-flex flex-y-center flex-x-between mb24">
					<view class="dis-flex flex-y-center w-65">
						<image class="wh40 mr12" src="/static/img/ico-tips1.png"></image>
						<view class="f-32 col-brank-20 f-b mr5 name onelist-hidden">{{item.name}}</view>
						<u-icon slot="right" name="arrow-right" size="30rpx"></u-icon>
					</view>
					<view class="f-24" :class="item.status==1?'col-red-d9':'col-gray-88'">{{item.status==1?'退款中':'已退款'}}
					</view>
				</view>
				<view class="dis-flex flex-y-center" v-if="item.goods.length==1">
					<!-- <image class="wh148 radio-8 mr24" src="/static/img/index-shenghuo1.png"></image> -->
					<view class="w-75 goods-r dis-flex flex-x-between flex-dir-column">
						<view class="f-28 f-b w-100 onelist-hidden">{{item.goods[0].name}}</view>
						<view class="col-gray-88 f-24">共1件</view>
					</view>
				</view>
				<view v-else class="dis-flex flex-y-center p-r">
					<scroll-view class="scroll-goods" scroll-x="true">
						<!-- <image class="wh-148 radio-8 mr16" v-for="(items,indexs) in item.goods"
							src="/static/img/index-shenghuo1.png"></image> -->
					</scroll-view>
					<view class="length col-gray-88 f-24">共{{item.goods.length}}件</view>
				</view>
				<view class="dis-flex flex-y-center flex-x-between mt20">
					<view class="f-24 col-gray-88">下单时间：2022-09-12 16:00</view>
					<view class="f-24 col-gray-88 t-b ">退款
						<text class="col-brank-22 f-b f-24 ml15">¥<text class="f-36">15.9</text></text>
					</view>
				</view>
				<view class="mt20 dis-flex flex-y-center flex-x-end">
					<view class="btn-order border-dd col-brank-20 f-24" v-if="item.status!=1">删除订单</view>
					<view class="btn-order border-dd col-brank-20 f-24" @tap.stop="onLink()">退款进度</view>
					<view class="btn-order bg-red-d6-ec col-white-ff f-24"
						@tap.stop="onLink('/pagesUser/page/orderList/afterSalesList/detail/detail?id'+item.id)">查看详情
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{ //订单列表
					name: "碳先生烧烤(龙虾)碳先生烧烤(龙虾)碳先生烧烤(龙虾)碳先生烧烤(龙虾)碳先生烧烤(龙虾)",
					status: 1,
					goods: [{
						name: "好欢螺螺狮粉12包装"
					}, {
						name: "好欢螺螺狮粉12包装"
					}, {
						name: "好欢螺螺狮粉12包装"
					}, {
						name: "好欢螺螺狮粉12包装"
					}]
				}, {
					name: "碳先生烧烤(龙虾)",
					status: 2,
					goods: [{
						name: "好欢螺螺狮粉12包装"
					}]
				}, {
					name: "碳先生烧烤(龙虾)",
					status: 3,
					goods: [{
						name: "好欢螺螺狮粉12包装"
					}, {
						name: "好欢螺螺狮粉12包装"
					}]
				}, {
					name: "碳先生烧烤(龙虾)",
					status: 4,
					goods: [{
						name: "好欢螺螺狮粉12包装"
					}]
				}, {
					name: "碳先生烧烤(龙虾)",
					status: 5,
					goods: [{
						name: "好欢螺螺狮粉12包装"
					}]
				}],
			};
		},
		onLoad(e) {
			this.tabAct = e.id
		},
		methods: {
			//查看券码
			viewQrCode(id) {
				uni.navigateTo({
					url: '/pagesUser/page/orderList/check/check?id=' + id
				})
			},
			//跳转页面
			onLink(url) {
				uni.navigateTo({
					url: url
				})
			},
			//更改id
			changeTab(id) {
				this.tabAct = id
			},
			//搜索回车
			search() {

			},
			//清除搜索内容
			clearSearch() {

			},
		}
	}
</script>

<style lang="scss">
	.scroll {
		white-space: nowrap;
		height: 96rpx;
		padding-top: 20rpx;
		box-sizing: border-box;
	}

	.tab-item {
		display: inline-block;
	}

	.cont {
		padding: 20rpx;
		box-sizing: border-box;
	}

	.name {
		max-width: 70%;
	}

	.scroll-goods {
		width: 100%;
		white-space: nowrap;
		height: 148rpx;
	}

	.scroll-goods image {
		display: inline-flex;
	}

	.scroll-goods image:last-child {
		margin-right: 80rpx;
	}

	.length {
		background: linear-gradient(rgba(255, 255, 255, 0.95), #fff);
		position: absolute;
		width: 50rpx;
		height: 152rpx;
		top: -2rpx;
		right: 0;
		padding: 26rpx 12rpx;
		box-sizing: border-box;
		text-align: center
	}

	.btn-order {
		width: 160rpx;
		height: 56rpx;
		border-radius: 28rpx;
		line-height: 56rpx;
		text-align: center;
		margin-left: 20rpx;
	}

	.goods-r {
		height: 148rpx;
		padding: 8rpx 0;
		box-sizing: border-box;
	}

	.more {
		position: fixed;
		right: 22rpx;
		bottom: calc(124rpx + env(safe-area-inset-bottom));
		width: 160rpx;
		height: 238rpx;
		background: #FEFFFE;
		box-shadow: 0px 4rpx 20rpx 0px rgba(0, 0, 0, 0.0400);
		border-radius: 16rpx;
		padding: 10rpx 0;
		box-sizing: border-box;
	}

	.more>view {
		padding: 20rpx 0;
	}
</style>