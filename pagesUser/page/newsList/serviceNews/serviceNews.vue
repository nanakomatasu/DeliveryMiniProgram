<template>
	<view class="pl24 pr24 box-size">
		<view class="mt20 bg-white-ff cont24 radio-16 " v-for="(item,index) in list" :key="index">
			<view class="shop-name flex-x-between mb20 pb20 border-b-f7 dis-flex flex-y-center "
				@tap="onLink('/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id='+item.id)">
				<view class="dis-flex flex-y-center">
					<image class="wh-40 mr16" src="/static/img/icon-act02.png"></image>
					<view>校U优选</view>
				</view>
				<u-icon name="arrow-right" size="28rpx" color="#8E8F8E"></u-icon>
			</view>
			<view class="dis-flex flex-y-center mb20 flex-x-between">
				<view class="f-28 f-b w-60 onelist-hidden">订单待支付通知</view>
				<view class="f-24 col-gray-88">{{formatTime(item.time)}}</view>
			</view>
			<view class="dis-flex bg-gray-f7 ">
				<!-- <image class="wh140 radio-8 mr24" src="/static/img/index-shenghuo2.png"></image> -->
				<view class="w-75 f-28 col-gray-88 pt24 pr24 box-size twolist-hidden">
					{{item.content}}
				</view>
			</view>
		</view>

		<null-data v-if="list.length==0"></null-data>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [], //系统消息列表
			};
		},
		onShow() {
			this.getHistoryNews();
		},
		methods: {
			//跳转链接
			onLink(url) {
				uni.navigateTo({
					url: url
				})
			},
			async getHistoryNews() {
				let user = uni.getStorageSync('userInfo');
				let channel = "user" + user.id;
				let result = await this.$chat.pubsubHistory(channel);
				console.log(result);
				let news = result.content.messages.reverse().splice(0, 10);
				this.list = news;
			},
			formatTime(time) {
				return this.formatDate(time)
			}
		}
	}
</script>

<style lang="scss">

</style>