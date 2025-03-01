<template>
	<view class=" bgc-ff bor-r-16 m-t-25" style="padding: 20rpx;">

		<view class="flex-al-c flex-jus-spa" @tap.stop="more">
			<view class="flex-al-c">
				<view class="f-32 fw-700">推荐门店</view>
			</view>
			<view class="flex-al-c">
				<view class="f-24 color-8E8F8E h-36">更多</view>
				<image class="wh-28 m-l-8" src="@/static/img/ico-gengduo.png" mode=""></image>
			</view>
		</view>

		<view class="scanning dis-flex bg-white-ff mt10" v-for="(items, indes) in shops" :key="indes"
			@click="shopDetail(items)">
			<image class="imgsx mr10" :src="items.logo" mode="aspectFit"></image>
			<view class="dis-flex flex-column pl15 flex-space">
				<view class=" onelist-hidden  f-32 col-red-dd" style="width: 400rpx;">{{items.name}}</view>
				<view class=" onelist-hidden f-32 " style="width: 400rpx;">门店地址
					{{items.address}}
				</view>
				<view class=" onelist-hidden f-32 " style="width: 400rpx;">联系电话
					{{items.contacts_tel}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "indextjdp",
		props: {
			shops: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {

			};
		},


		methods: {
			//外卖首页
			more() {
				console.log('更多')
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/index'
				})
			},
			//店铺详情
			shopDetail(item) {
				console.log('店铺详情')
				if (item.channel_type == 1) {
					uni.navigateTo({
						url: '/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id=' + item.merchant_id +
							'&type=1'
					})
				}
				if (item.channel_type == 2) {
					uni.navigateTo({
						url: '/pagesIndex/page/foodIndex/homepage/homepage?id=' + item.merchant_id
					})
				}

			}
		}
	}
</script>

<style>
	.scanning {
		padding: 24rpx 16rpx;
		border-radius: 8rpx;
	}

	.imgsx {
		width: 200rpx;
		height: 200rpx;
	}
</style>