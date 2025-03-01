<template>
	<view>
		<view :catchtouchmove="true">
			<u-popup :show="mobileShow" mode="center" :safeAreaInsetBottom="false" round="32rpx">
				<view class="win-box-mobile  box-size bg-white-ff radio-30">
					<view class="f-32 w-100 t-c f-b">{{title}}</view>
					<view class="f-56 t-c f-b f-DINPro mt20">{{phone}}</view>
					<view class="dis-flex flex-y-center flex-x-between mt40">
						<view class="btn t-c bg-gray-ef radio-40" @tap="mobileShow=false">取消</view>
						<view class="btn t-c bg-red-d6-ec col-white-ff radio-40" @tap="callMobile">立即拨打</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		name: "mobileWin",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			phone: {
				type: String,
				default: ""
			},
			title: {
				type: String,
				default: ""
			}
			//父组件传值 是否显示
		},
		data() {
			return {
				mobileShow: false,
			};
		},
		watch: {
			show: {
				handler(newVal, oldVal) {
					this.mobileShow = newVal
				},
				immediate: true,
			}

		},
		methods: {
			//拨打电话
			callMobile() {
				uni.makePhoneCall({
					phoneNumber: this.phone
				})
			},
		}
	}
</script>

<style lang="scss">
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