<template>
	<view>
		<u-navbar @click="back" :placeholder="true" :bgColor="bgColor">
			<view class="flex-al-c" slot="left">
				<image class="wh-44" src="@/campuscircle/static/ico_fanhui.png" mode=""></image>
			</view>
			<view class="f-34 color-18 fw-700" slot="center">隐私设置</view>
			<!-- <view class="" slot="right">
				<view class="privacy_btn">完成</view>
			</view> -->
		</u-navbar>
		<view class="main_box">
			<view class="flex-al-c" @click="select()">
				<image class="wh-32" v-if="open == 0" src="@/campuscircle/static/ico_xuanzhong.png" mode=""></image>
				<image class="wh-32" v-else src="@/campuscircle/static/ico_weixuan.png" mode=""></image>
				<view class="f-28 color-18 fw-700 m-l-16">公开</view>
			</view>
			<view class="flex-al-c m-t-40" @click="selects()">
				<image class="wh-32" v-if="open == 1" src="@/campuscircle/static/ico_xuanzhong.png" mode=""></image>
				<image class="wh-32" v-else src="@/campuscircle/static/ico_weixuan.png" mode=""></image>
				<view class="f-28 color-18 fw-700 m-l-16">秘密</view>
			</view>
		</view>
    <view class="join_box">
			<view class="join_btn" @click="rightClick()">完成</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgColor: '#fff',
				open: '0',
			}
		},
		methods: {
      back() {
        uni.navigateBack();
      },
			rightClick() {
				uni.$emit('updateData', this.open)
				uni.navigateBack({
					delta: 1
				})
				// uni.redirectTo({
				// 	url: '/campuscircle/index/foren/foren?open=' + this.open
				// });
				console.log('点击了完成');
			},
			select() {
				this.open = 0
				console.log(this.open, 'open0');
			},
			selects() {
				this.open = 1
				console.log(this.open, 'open1');

			}
		}
	}
</script>

<style>
	page {
		background-color: #fff !important;
	}

	.privacy_btn {
		width: 112rpx;
		height: 52rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 26rpx;
		text-align: center;
		line-height: 52rpx;
		color: #fff;
		font-size: 24rpx;
	}

	.main_box {
		box-sizing: border-box;
		padding: 32rpx;
	}
  .join_box {
		width: 100%;
		box-sizing: border-box;
		padding: 14rpx 32rpx 24rpx 32rpx;
		background-color: #ffffff;
		position: fixed;
		bottom: 0;
	}

	.join_btn {
		width: 100%;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 40rpx;
		color: #ffffff;
		font-size: 28rpx;
	}
</style>
