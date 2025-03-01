<template>
	<view style="padding:10rpx 20rpx 20rpx 20rpx;">
		<view class="estimateList">
			<view class="" style="display: flex;justify-content: flex-start;align-items:center;">
				<view class="store_name">
					柳州好欢螺旗舰店 
				</view>
				<image src="../../static/ico_gengduo@2x.png" mode="" class="gengduo"></image>
			</view>
			<view class="estimate_contect">
				<image src="../../static/pic_hd@2x.png" mode="" class="food_img"></image>
				<view class="estimate_text">
					<view class="estimate_title">
						好欢螺螺狮粉12包装
					</view>
					<view class="" style="display: flex;justify-content: flex-end;margin-top: 40rpx;" @click="toEstimate">
						<view class="estimate_btn">
							评价
						</view>
					</view>
				</view>
			</view>
			<view class="estimate_contect">
				<image src="../../static/pic_hd@2x.png" mode="" class="food_img"></image>
				<view class="estimate_text">
					<view class="estimate_title">
						好欢螺螺狮粉12包装
					</view>
					<view class="" style="display: flex;justify-content: flex-end;margin-top: 40rpx;" @click="toEstimate">
						<view class="estimate_btn">
							评价
						</view>
					</view>
				</view>
			</view>
			<view class="estimate_contect">
				<image src="../../static/pic_hd@2x.png" mode="" class="food_img"></image>
				<view class="estimate_text">
					<view class="estimate_title">
						好欢螺螺狮粉12包装
					</view>
					<view class="" style="display: flex;justify-content: flex-end;margin-top: 40rpx;" @click="toEstimate">
						<view class="estimate_btn">
							评价
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="estimateList">
			<view class="" style="display: flex;justify-content: flex-start;align-items:center;">
				<view class="store_name">
					柳州好欢螺旗舰店 
				</view>
				<image src="../../static/ico_gengduo@2x.png" mode="" class="gengduo"></image>
			</view>
			<view class="estimate_contect">
				<image src="../../static/pic_hd@2x.png" mode="" class="food_img"></image>
				<view class="estimate_text">
					<view class="estimate_title">
						好欢螺螺狮粉12包装
					</view>
					<view class="" style="display: flex;justify-content: flex-end;margin-top: 40rpx;" @click="toEstimate">
						<view class="estimate_btn">
							评价
						</view>
					</view>
				</view>
			</view>
			<view class="estimate_contect">
				<image src="../../static/pic_hd@2x.png" mode="" class="food_img"></image>
				<view class="estimate_text">
					<view class="estimate_title">
						好欢螺螺狮粉12包装
					</view>
					<view class="" style="display: flex;justify-content: flex-end;margin-top: 40rpx;" @click="toEstimate">
						<view class="estimate_btn">
							评价
						</view>
					</view>
				</view>
			</view>
			<view class="estimate_contect">
				<image src="../../static/pic_hd@2x.png" mode="" class="food_img"></image>
				<view class="estimate_text">
					<view class="estimate_title">
						好欢螺螺狮粉12包装
					</view>
					<view class="" style="display: flex;justify-content: flex-end;margin-top: 40rpx;" @click="toEstimate">
						<view class="estimate_btn">
							评价
						</view>
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
				
			};
		},
		methods:{
			toEstimate(){
				uni.navigateTo({
					url: "/pages/estimate/estimate"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.estimateList{
		background: #ffffff;
		border-radius: 16rpx;
		padding: 20rpx;
		margin-top: 20rpx;
	}
	.store_name{
		font-size: 32rpx;
		font-weight: 600;
		color: #202020;
	}
	.gengduo{
		width: 28rpx;
		height: 28rpx;
	}
	.estimate_contect{
		display: flex;
		justify-content: flex-start;
		margin-top: 20rpx;
	}
	.food_img{
		width: 148rpx;
		height: 148rpx;
		margin-right: 24rpx;
	}
	.estimate_text{
		flex: 1;
		
	}
	.estimate_title{
		flex: 1;
		font-size: 28rpx;
		font-weight: 600;
		color: #202020;
	}
	.estimate_btn{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #d93038;
		width: 160rpx;
		height: 56rpx;
		border: 1rpx solid #d93038;
		border-radius: 29rpx;
	}
</style>
