<template>
	<view>
		<view class="padd-tb20">
			<!-- 筛选 -->
			<view class="flex-jus-spa w-100  m-t-20">
				<view class="flex-al-c">
					<!-- 附近 -->
					<view class="f-28 fw-700 color-20">附近</view>
					<view class="m-l-8">
						<image class="wh-20" src="~@/static/img/ico-zhankai-b.png" mode=""></image>
					</view>
				</view>
				<view class="flex-al-c">
					<view class="flex-al-c">
						<!-- 智能排序 -->
						<view class="f-28 fw-700 color-20">智能排序</view>
						<view class="m-l-8">
							<image class="wh-20" src="~@/static/img/ico-zhankai-b.png" mode=""></image>
						</view>
					</view>
					<!-- 筛选 -->
					<view class="flex-al-c fw-700 m-l-40" @click="show = true">
						<view class="f-28 color-20">筛选</view>
						<view class="m-l-8">
							<image class="wh-20" src="~@/static/img/ico-zhankai-b.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 筛选结束 -->
		</view>
	</view>
</template>

<script>
	export default {
		name:"foodIndexScreening",
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>