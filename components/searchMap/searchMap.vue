<template>
	<view>
		<view class="bgc-ff padd-0-32 padd-b-20">
			<!-- 搜索框 -->
			<view class="flex-al-c padd-t-20">
				<view class="w-100 m-r-22"><u-search placeholder="请输入关键词" v-model="keyword" :showAction="false" :clearabled="false"></u-search></view>
				<view class="flex-column flex-c-c ww-44">
					<image class="wh-32-34" src="@/static/img/ico-ditu.png" mode=""></image>
					<view class=""><text class="f-22">地图</text></view>
				</view>
			</view>
			<!-- 搜索框结束 -->
		</view>
	</view>
</template>

<script>
	export default {
		name:"searchMap",
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>