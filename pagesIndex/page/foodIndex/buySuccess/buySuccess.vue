<template>
	<view>
		<view class="flex-c-c flex-column padd-0-24">
			<view class="f-36 color-20 fw-700 m-t-32">
				购买成功
			</view>
			<view class="buySuccess-btn flex-c-c m-t-20">
				查看订单
			</view>
			<view class="flex-c-c flex-column m-t-34 w-100 bor-r-16 padd-32-0 bgc-ff">
				<view class="f-32 color-20 fw-700">
					工作日酸包菜肉沫套餐
				</view>
				<view class="m-t-20">
					<tki-qrcode ref="qrcode" cid="cid" :val="val"  unit="rpx" background="#fff" :onval="true"
						:loadMake="true" :usingComponents="false" :showLoading="showLoading" loadingText="正在生码" />
				</view>
				<view class="f-32 color-20 fw-700 m-t-20">
					{{val}}
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips: '',
				userInfo: {}, //用户
				qrcode: "", //支付码
				val: "", //二维码内容
			}
		},
		onShow() {
			
			this.userInfo = uni.getStorageSync('userInfo')
			
		},
		
		onLoad(e){
			this.val=e.qrcode
			
			console.log(e)
			
			
		},
		
		methods: {
			
		
		}
	}
</script>

<style>
	page {
		background-color: #f6f6f8;
	}

	.buySuccess-btn {
		width: 160rpx;
		height: 56rpx;
		border-radius: 28rpx;
		border: 1rpx solid #DDDDDD;
		font-size: 24rpx;
		color: #202020;
	}
</style>
