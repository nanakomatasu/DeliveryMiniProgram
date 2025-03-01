<template>
	<view>
		<view class="mt20 bg-white-ff pb24 pt24 dis-flex flex-y-center flex-x-between pl32 pr26 box-size"
			@tap="onDetail('用户协议','ptagreement')">
			<view class="f-28">《用户协议》</view>
			<u-icon name="arrow-right" size="28rpx" color="#8E8F8E"></u-icon>
		</view>
		<view class="divider"></view>
		<view class="bg-white-ff pb24 pt24 dis-flex flex-y-center flex-x-between pl32 pr26 box-size"
			@tap="onDetail('隐私协议','ysxy')">
			<view class="f-28">《隐私协议》</view>
			<u-icon name="arrow-right" size="28rpx" color="#8E8F8E"></u-icon>
		</view>
		<view class="divider"></view>
		<view class="bg-white-ff pb24 pt24 dis-flex flex-y-center flex-x-between pl32 pr26 box-size"
			@tap="onDetail('隐私政策','yszc')">
			<view class="f-28">《隐私政策》</view>
			<u-icon name="arrow-right" size="28rpx" color="#8E8F8E"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},

		methods: {
			onDetail(title, name) {
				uni.navigateTo({
					url: '/pagesUser/page/setting/agreementDetail/agreementDetail?title=' + title + '&name=' + name
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.divider {
		width: 100%;
		height: 1rpx;
	}
</style>