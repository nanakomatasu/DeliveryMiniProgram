<template>
	<view class="p-l-25 p-r-25 p-t-25">

		<view class="cash flex-center">
			<view class="">
				<view class="flex-center c-8E">我的U币</view>
				<view class="f-56 f-600">800.00</view>
			</view>
		</view>

		<view class="detailed m-t-25">
			<view class="f-32 f-600">
				U币明细
			</view>
			<view class="m-t-15">
				2022年6月28日 <image class="label" src="../../static/label.png" mode=""></image>
			</view>
			<scroll-view scroll-y="true" style="height: 590rpx;" @scrolltolower="scrolltolower">
				<view class="site m-t-20" v-for="(item,index) in 1" :key="index" @tap.stop="choice(item)">
					<view class="flex">
						<view class="">
							<view class="f-32 caoshu" style="width:560rpx;">
								饭丘丘（五一广场店）
							</view>
							<view class="f-24 c-88 m-t-15">
								2021-06-18 11:09:22
							</view>
						</view>
						<view class="flex-center ">
							+¥100
						</view>
					</view>
				</view>
			</scroll-view>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.cash {
		width: 702rpx;
		height: 212rpx;
		background: #FFFFFF;
		border-radius: 16px;
	}
	.polish {
		width: 32rpx;
		height: 32rpx;
	}
	.detailed{
		padding: 25rpx;
		background: #FFFFFF;
		border-radius: 16px;
	}
	.label{
		width: 20rpx;
		height: 20rpx;
	}
</style>
