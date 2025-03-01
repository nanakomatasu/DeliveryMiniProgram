<template>
	<!-- 通知 -->
	<view class="padd-0-24">
		<view class="flex-al-c w-100 bgc-ff padd-18-22 bor-r-8">
			<image class="wh-5628 m-r-16" src="@/static/img/notice.png" mode=""></image>
			<u-notice-bar :text="newsListText" fontSize="24rpx" @click="clickNews" color="#333" bgColor="transparent"
				direction="column"></u-notice-bar>
		</view>
	</view>
</template>

<script>
	export default {
		name: "indexNotice",
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>