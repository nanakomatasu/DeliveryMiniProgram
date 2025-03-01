<template>
	<view class="pl20 pr20 box-size">
		<view class="cont32-24  mt20 bg-white-ff radio-16" v-for="(item,index) in list"
			:key="index" @tap="onLink('')">
			<view class="dis-flex flex-x-between mb24 flex-y-center">
				<view class="f-28 col-brank-20 f-b">服务通知</view>
				<view class="col-gray-8e f-28">2022-04-19 18:09</view>
			</view>
			<view class="col-gray-8e f-28">您好，账号消息服务已上线，后续将在在此设</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{},{}]
			};
		},
		methods: {
			
			
			
			
			
			
			
			
			
			//跳转页面链接
			onLink(url) {
				uni.navigateTo({
					url: url
				})
			}
		
		}
	}
</script>

<style lang="scss">
.cont-r{
	width: 83%;
}
.news{
	width: 16rpx;
	height: 16rpx;
	background: #E03840;
	border-radius: 16rpx;
	border: 4rpx solid #FFFFFF;
	position: absolute;
	right: 0;
	top: -4rpx;
}
</style>
