<template>
	<view class=" bgc-ff bor-r-16" style="padding: 20rpx; margin-bottom: 100rpx;">
		<!-- 		<view class="flex-al-c flex-jus-spa" @tap.stop="more">
			<view class="flex-al-c">
				<view class="f-32 fw-700">外卖商品</view>
			</view>
			<view class="flex-al-c">
				<view class="f-24 color-8E8F8E h-36">更多</view>
				<image class="wh-28 m-l-8" src="@/static/img/ico-gengduo.png" mode=""></image>
			</view>
		</view> -->
		<block v-if="st.column ==1" :style="{background: st.background}">
			<view class="scanning dis-flex bg-white-ff mt10" v-for="(item, index) in goods" :key="index"
				@click="shopDetail(item)">
				<image class="imgsx mr10" :src="item.img[0]" mode=""></image>
				<view class="dis-flex flex-column pl15">
					<view class=" onelist-hidden f-32 ">{{item.name}}</view>
					<view class="dis-flex flex-column flex-space h-100">
						<view class=" onelist-hidden f-28  mt10">{{item.introduce}}</view>
						<view class=" col-gray-33 f-24">已售0</view>
						<view class="color-D93038 col-gray-33 f-24">¥{{item.price}}
						</view>
					</view>
				</view>
			</view>
		</block>
		<view v-if="st.column == 2" class=" m-t-20 grid-2" :style="{background: st.background}">
			<view class="dis-flex flex-column flex-center mb20" v-for="(item, index) in goods" :key="index"
				@click="shopDetail(item)">
				<image class="wh-280 radio-8" :src="item.img[0]" mode=""></image>
				<view class=" onelist-hidden f-32 ">{{item.name}}</view>
				<view class="color-D93038 w-100 onelist-hidden h-36 f-24 t-b f-b f-DINPro m-t-12 "
					style="display: flex;justify-content: center;align-items: center;">
					¥
					<text class="f-28">{{ item.price}}</text>
				</view>
			</view>
		</view>
		<view v-if="st.column == 3" class=" m-t-20 grid-3" :style="{background: st.background}">
			<view class="dis-flex flex-column flex-center mb20" v-for="(item, index) in goods" :key="index"
				@click="shopDetail(item)">
				<image class="wh-200 radio-8" :src="item.img[0]" mode=""></image>
				<view class=" onelist-hidden f-32 ">{{item.name}}</view>
				<view class="color-D93038 w-100 onelist-hidden h-36 f-24 t-b f-b f-DINPro m-t-12 "
					style="display: flex;justify-content: center;align-items: center;">
					¥
					<text class="f-28">{{ item.price}}</text>
				</view>
			</view>
		</view>
		<view v-if="st.column == 4" class=" m-t-20 grid-4" :style="{background: st.background}">
			<view class="dis-flex flex-column flex-center mb20" v-for="(item, index) in goods" :key="index"
				@click="shopDetail(item)">
				<image class="wh-148 radio-8" :src="item.img[0]" mode=""></image>
				<view class=" onelist-hidden f-32 ">{{item.name}}</view>
				<view class="color-D93038 w-100 onelist-hidden h-36 f-24 t-b f-b f-DINPro m-t-12 "
					style="display: flex;justify-content: center;align-items: center;">
					¥
					<text class="f-28">{{ item.price}}</text>
				</view>
			</view>
		</view>
		<strong></strong>


		<null-data v-if="goods.length==0"></null-data>


	</view>

</template>

<script>
	export default {
		name: "UGoodsList",
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
					return {
						background: '#F6F6F6',
						column: '1',
						display: 'list'
					}
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			//商品详情
			shopDetail(item) {
				uni.navigateTo({
					url: '/pagesOptimization/pages/shopDetails/shopDetails?goods_id=' + item.goods_id
				})


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
		width: 160rpx;
		height: 160rpx;
	}

	.grid-2 {
		display: grid;
		grid-template-columns: repeat(auto-fill, 45%);
		grid-gap: 10rpx;
		justify-content: center;
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
