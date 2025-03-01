<template>
	<view>
		<u-sticky>
			<view class="tab_box">
				<u-tabs :list="list1" @click="click" lineWidth="20rpx" lineHeight="6rpx" lineColor="#D62E36"
					:scrollable="false" :activeStyle="{
				color: '#202020',
				fontSize: '32rpx',
				fontWeight: '700',
				}" :inactiveStyle="{
				color: '#202020',
				fontSize: '28rpx',
				}" itemStyle="height: 88rpx;"></u-tabs>
			</view>
		</u-sticky>

		<view class="box_main">
			<view class="flex-al-c m-b-44">
				<view class="f-32 color-D93038 fw-700">1</view>
				<!-- <view class="f-32 color-7A7B84 fw-700">4</view> -->
				<view class="f-28 color-20 m-l-28">2023央视春晚彩排路透</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: [{
					name: '发现',
				}, {
					name: '娱乐',
				}, {
					name: '视频'
				}, {
					name: '体育'
				}, {
					name: '游戏'
				}],
			}
		},
		methods: {
			click(item) {
				console.log('item', item);
			}
		}
	}
</script>

<style>
	.tab_box {
		box-sizing: border-box;
		/* padding: 20rpx 0rpx 20rpx 0rpx; */
		padding-bottom: 16rpx;
		background-color: #F7F7F7;
	}

	.box_main {
		box-sizing: border-box;
		padding: 34rpx 36rpx 34rpx 36rpx;
		background-color: #fff;
		height: 100vh;
	}
</style>
