<template>
	<view class="p-l-25 p-r-25 p-t-20">
		<view class="flex-center">
			<image class="tangshi" src="/pagesIndex/static/ico-tangshi-act.png" mode=""></image>
		</view>

		<view class="news">
			<view class="flex-center f-36 f-bold" style="color: #D62E36;">
				订单已发送后厨
			</view>

			<view class="btop-F20 m-t-50">
				<view class="m-t-50">
					<!-- <view class="flex-about">
						<view>就餐人数</view>
						<view>4人</view>
					</view> -->
					<view class="flex-about">
						<view>支付方式</view>
						<view>微信支付</view>
					</view>
					<view class="flex-about">
						<view>下单时间</view>
						<view>{{formateTime(detail.createdAt)}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="scanning">
			<view class="flex-about">
				<view>下单菜数</view>
				<view>{{detail.goodsNum}}份</view>
			</view>
			<view class="flex-about m-t-10">
				<view>总价</view>
				<view>{{detail.money}}元</view>
			</view>
		</view>
		<view class="continue flex-center" @tap.stop="orderAgain">
			继续点餐
		</view>
	</view>
</template>

<script>
	import * as util from "@/common/util.js"
	export default {
		data() {
			return {
				id: 0,
				detail: {}
			}
		},
		onLoad(option) {
			this.id = option.orderId;
		},
		onShow() {
			this.getOrderTakeOutInfo();
		},
		methods: {
			formateTime(time) {
				return util.formatTime(time * 1000)
			},
			//订单详情接口
			async getOrderTakeOutInfo() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status
				} = await that.$api.inStoreOrderInfo({
					order_id: this.id,
				})
				uni.hideLoading()
				if (status == 200) {
					this.detail = data
					console.log(this.detail)
				}
			},
			orderAgain() {
				console.log('继续点餐')
				uni.navigateTo({
					url:"/pagesIndex/page/diningroom/diningroom?tableId="+this.detail.tableId 
				})
			}
		}
	}
</script>

<style>
	.tangshi {
		width: 112rpx;
		height: 112rpx;
		z-index: 99999;
	}

	.news {
		position: relative;
		top: -60rpx;
		z-index: 1;
		padding: 80rpx 25rpx 32rpx 25rpx;
		background: #FFFFFF;
		border-radius: 16px;
	}
	
	
	.scanning{
		position: relative;
		top: -40rpx;
		padding: 32rpx 25rpx 32rpx 25rpx;
		background: #FFFFFF;
		border-radius: 16px;
	}
	
	.continue{
		width: 702rpx;
		height: 96rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 47rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 44rpx;
	}
</style>
