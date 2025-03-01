<template>
	<view class=" bgc-ff bor-r-16" style="padding: 20rpx; margin-top: 20px;">
		<view class="flex-al-c flex-jus-spa" @tap="toLink()">
			<view class="flex-al-c">
				<view class="f-32 fw-700"><text class="color-D93038">本地</text>生活</view>
				<image class="wh-32 m-l-6" src="@/static/img/ico-huo.png" mode=""></image>
			</view>
			<view class="flex-al-c">
				<view class="f-24 color-8E8F8E h-36">更多</view>
				<image class="wh-28 m-l-8" src="@/static/img/ico-gengduo.png" mode=""></image>
			</view>
		</view>

		<view v-if="st.column == 4" class=" m-t-20 grid-4">
			<view class="dis-flex flex-column flex-center" v-for="(item, index) in goods" :key="index"
				@tap="lifex(item)">
				<image class="wh-148 radio-8" :src="item.img[0]" mode=""></image>
				<view class=" onelist-hidden f-32 w-100" style="text-align: center;">{{item.name}}</view>
				<view class="color-D93038 w-100 onelist-hidden h-36 f-24 t-b f-b f-DINPro m-t-12 "
					style="display: flex;justify-content: center;align-items: center;">
					¥
					<text class="f-28">{{ item.price}}</text>
				</view>
			</view>
		</view>
		<view v-if="st.column == 3" class=" m-t-20 grid-3">
			<view class="dis-flex flex-column flex-center" v-for="(item, index) in goods" :key="index"
				@tap="lifex(item)">
				<image class="wh-200 radio-8" :src="item.img[0]" mode=""></image>
				<view class=" onelist-hidden f-32 w-100" style="text-align: center;">{{item.name}}</view>
				<view class="color-D93038 w-100 onelist-hidden h-36 f-24 t-b f-b f-DINPro m-t-12 "
					style="display: flex;justify-content: center;align-items: center;">
					¥
					<text class="f-28">{{ item.price}}</text>
				</view>
			</view>
		</view>
		<view v-if="st.column == 2" class=" m-t-20 grid-2">
			<view class="dis-flex flex-column flex-center mb20" v-for="(item, index) in goods" :key="index"
				@tap="lifex(item)">
				<image class="wh-280 radio-8" :src="item.img[0]" mode=""></image>
				<view class=" onelist-hidden f-32 w-100" style="text-align: center;">{{item.name}}</view>
				<view class="color-D93038 w-100 onelist-hidden h-36 f-24 t-b f-b f-DINPro m-t-12 "
					style="display: flex;justify-content: center;align-items: center;">
					¥
					<text class="f-28">{{ item.price}}</text>
					<!-- <text class=" ml10 col-gray-66 text-line">{{ item.original_price}}</text> -->
				</view>
			</view>
		</view>

		<null-data v-if="goods.length==0"></null-data>

	</view>
</template>

<script>
	export default {
		name: "indexLocalLife",
		props: {
			goods: {
				type: Array,
				default: function() {
					return []
				}
			},
			st: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			lifex(item) {
				console.log(item)
				// uni.navigateTo({
				// 	url: '/pagesIndex/page/foodIndex/foodCombo/foodCombo?id=' + item.goods_id+'&ids='+item.merchant_id,
				// })

				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/foodCombo/foodCombo?id=' + item.goods_id + '&ids=' + item
						.merchant_id
				})

			},
			toLink() {
				uni.navigateTo({
					url: '/pagesIndex/page/localLife/localLife'
				})
			}
		}
	}
</script>

<style>
	.grid-2 {
		display: grid;
		grid-template-columns: repeat(auto-fill, 45%);
		grid-gap: 10rpx;
		justify-content: center;
		/* background-color: #f6f6f6; */
	}

	.grid-3 {
		display: grid;
		grid-template-columns: repeat(auto-fill, 30%);
		grid-gap: 10rpx;
		justify-content: center;
	}

	.grid-4 {
		display: grid;
		grid-template-columns: repeat(auto-fill, 22%);
		grid-gap: 10rpx;
		justify-content: center;
	}
</style>