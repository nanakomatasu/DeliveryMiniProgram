<template>
	<view >
		<!-- 店铺 -->
		<view class="m-b-20 padd-0-24" v-for="(item,index) in list" :key="index">
			<view class="food-card-box bgc-ff flex-jus-spa bor-r-16" @click="goHomepage(item.merchant_id)">
				<!-- 左边头像 -->
				<view class="bor-r-10 wh-96"><image class="wh-96 bor-r-10" :src="item.logo" mode=""></image></view>
				<!-- 右边主体 -->
				<view class="m-l-20 food-card-box-r">
					<view class="f-28 fw-600 color-333">{{item.name}}</view>
					<view class="flex-jus-spa padd-r-24 flex-centerd">
						<!-- 左边 -->
						<view class="flex-al-c flex-centerd">
							<view class="text-c flex-centerd">
								<view class=""><image class="wh-24" src="/static/img/case.png" mode=""></image></view>
								<view class="f-24 color-FF9531 fw-600 m-l-10">{{item.score}}</view>
							</view>
							<view class="text-c flex-centerd m-l-15">
								<view class="f-20 color-888">月销</view>
								<view class="f-24 color-20 m-t-3">{{item.month_sales}}</view>
							</view>
							<view class="text-c flex-centerd m-l-15">
								<view class="f-20 color-888">人均</view>
								<view class="f-24 color-20 m-t-3">¥{{item.per_capita_order_price}}/人</view>
							</view>
						</view>
						<!-- 左边结束 -->
						<!-- 右边 -->
						<view class="f-20 color-888">距{{item.juli}}</view>
						<!-- 右边结束 -->
					</view>
					<!-- 标签 -->
					<!-- <view class="flex m-t-16"><view class="food-card-tips f-22 color-DD343C m-r-8" v-for="(item, index) in item.reduce" :key="index">{{item}}</view></view> -->
					<!-- 标签结束 -->
					<!-- 商品 -->
					<view class="m-t-20">
						<scroll-view class="scroll-view_H" scroll-x="true">
							<view class="flex">
								<view class="m-r-32 w-148" v-for="(items, indes) in item.goods" :key="indes">
									<view class="wh-148 bor-r-10"><image class="wh-148 bor-r-20" :src="items.img" mode=""></image></view>
									<view class="m-t-12 f-24 color-20 text-shenglue">{{items.name}}</view>
									<view class="flex-al-c m-t-8 w-148 ">
										<view class="fw-700 color-D93038 m-r-4">
											<text class="f-24">¥</text>
											<text class="f-28">{{items.price}}</text>
										</view>
										<text class="text-line f-24 color-97 ">¥{{items.scribe_price}}</text>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<!-- 商品结束 -->
				</view>
				<!-- 右边主体结束 -->
			</view>
		</view>
		<!-- 店铺结束 -->
	</view>
</template>

<script>
	export default {
		name:"storebox",
		props: {
			list: {
				type: Array,
				default: []
			},
		},
		data() {
			return {
				
			};
		},
		methods: {
			goHomepage(merchant_id) {
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/homepage/homepage?id='+merchant_id
				})
			}
		}
	}
</script>

<style lang="scss">
// 商家
.scroll-view_H {
	white-space: nowrap;
	width: 100%;
}
.food-card-box {
	box-sizing: border-box;
	padding: 24rpx 24rpx 40rpx 24rpx;
}
.food-card-box-r {
	width: 562rpx;
}
.food-card-fenge {
	width: 1rpx;
	height: 32rpx;
	background-color: #eaeaea;
	margin: 0rpx 30rpx;
}
.food-card-tips {
	box-sizing: border-box;

	padding: 2rpx 6rpx;
	border: 1rpx solid #dd343c;
	border-radius: 4rpx;
}
// 商家结束
</style>