<template>
	<view class="bgc-f7 bor-r-16" style="padding: 20rpx 24rpx;">
		<view class="flex-al-c flex-jus-spa" @tap.stop="more">
			<view class="flex-al-c">
				<view class="f-32 fw-700">甄选商品</view>
			</view>
			<view class="flex-al-c">
				<view class="f-24 color-8E8F8E h-36">更多</view>
				<image class="wh-28 m-l-8" src="@/static/img/ico-gengduo.png" mode=""></image>
			</view>
		</view>
		<block v-if="st.column == 1" :style="{ background: st.background }">
			<view class="scanning dis-flex bg-white-ff mt10 p-r" v-for="(item, index) in goods" :key="index"
				@click="shopDetail(item)">
				<image class="imgsx mr10" :src="item.img[0]" mode=""></image>
				<text v-if="item.is_special" class="special-price">特价</text>
				<view class="dis-flex flex-column pl15 flex-just">
					<view class=" onelist-hidden f-32 pb15" style="width: 440rpx;">{{ item.name }}</view>
					<view class="dis-flex flex-column flex-space h-100" style="width: 440rpx;">
						<view class=" onelist-hidden f-28 ">{{ item.introduce }}</view>
						<view class=" col-gray-33 f-24">已售{{ item.month_sales }}</view>
						<view class="color-D93038 col-gray-33 f-28">
							<text>
								¥{{ item.price }}
							</text>
							<text class="f-24 col-gray-88 ml10 text-line">{{ item.scribe_price }}</text>
						</view>

					</view>
				</view>
			</view>
		</block>
		<view v-if="st.column == 2" class=" m-t-20 flex-wrap flex-jus-spa">
			<view class="dis-flex flex-column  mb20" v-for="(item, index) in goods" :key="index"
				@click="shopDetail(item)">

				<view class="bgc-ff flex-c-c" style="position: relative;">
					<image style="position: relative; border-top-left-radius: 8rpx; border-top-right-radius: 8rpx;"
						class=" wh-342" :src="item.img[0]" mode=""></image>
						<text v-if="item.is_special" class="special-price">特价</text>
					<view class="flex"
						style="position: absolute; top:292rpx; left: 0; height: 50rpx; background: rgba(51, 51, 51, 0.5);border-radius: 0px 7px 0px 0px;">
						<view class="c-FD f-24 flex-center p-l-15"
							style="background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);height: 50rpx; ">
							{{ item.store.category_name.substr(0, 2) }}
						</view>
						<view class="">
							<image style="width: 20rpx; height: 50rpx;" src="@/static/img/ico-waimai.png" mode="">
							</image>
						</view>
						<view class="c-FD f-24 flex-center">{{ item.delivery_time }}分钟送达</view>
					</view>
				</view>

				<view class="bgc-ff m-t-8"
					style="padding: 16rpx 20rpx 24rpx 20rpx;border-bottom-left-radius: 8rpx; border-bottom-right-radius: 8rpx;">
					<view class=" onelist-hidden f-32 color-20 fw-700 w-100" style="width: 300rpx;">
						{{ item.name }}
					</view>
					<view class="color-D93038 w-100 onelist-hidden h-36 f-24 t-b f-b f-DINPro m-t-12 ">
						¥
						<text class="f-28">{{ item.price }}</text>
						<view class="f-28 col-gray-88 ml10 text-line">{{ item.scribe_price }}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="st.column == 3" class=" m-t-20 grid-3">
			<view class="dis-flex flex-column flex-center mb20 p-r" v-for="(item, index) in goods" :key="index"
				@click="shopDetail(item)">
				<image class="wh-200 radio-8" :src="item.img[0]" mode=""></image>
				<text v-if="item.is_special" class="special-price">特价</text>
				<view class=" onelist-hidden f-32 w-100 " style="text-align: center;">{{ item.name }}</view>
				<view class="color-D93038 w-100 onelist-hidden h-36 f-24 t-b f-b f-DINPro m-t-12 "
					style="display: flex;justify-content: start;align-items: center;">
					<text class="f-28 ">¥{{ item.price }}</text>
					<view class="f-28 col-gray-88 ml10 text-line">{{ item.scribe_price }}</view>
				</view>
			</view>
		</view>
		<view v-if="st.column == 4" class=" m-t-20 grid-4">
			<view class="dis-flex flex-column flex-center mb20 p-r" v-for="(item, index) in goods" :key="index"
				@click="shopDetail(item)">
				<image class="wh-148 radio-8" :src="item.img[0]" mode=""></image>
				<text v-if="item.is_special" class="special-price">特价</text>
				<view class=" onelist-hidden f-32 w-100" style="text-align: center;">{{ item.name }}</view>
				<view class="color-D93038 w-100 onelist-hidden h-36 f-24 t-b f-b f-DINPro m-t-12 "
					style="display: flex;justify-content: center;align-items: center;">
					<text class="f-28">¥{{ item.price }}</text>
					<view v-if="item.scribe_price > item.price" class="f-28 col-gray-88 ml10 text-line">{{ item.scribe_price }}</view>
				</view>
			</view>
		</view>



		<null-data v-if="goods.length == 0"></null-data>


	</view>

</template>

<script>
	export default {
		name: "indexGoodsList",
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
			//外卖首页
			more() {
				console.log('更多')
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/index'
				})
			},
			//商品详情
			shopDetail(item) {
				// uni.navigateTo({
				// 	url: '/pagesIndex/page/campusTakeout/index/goodsDetail/goodsDetail?id=' + item.goods_id +
				// 		'&merchantId=' + item.merchant_id
				// })

				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id=' + item.merchant_id +
						'&type=' + 2
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
		width: 200rpx;
		height: 200rpx;
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
	.special-price {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(255, 72, 72);
    color: #fff;
    border-radius: 0 0 24rpx 0;
    padding: 8rpx 20rpx;
    font-size: 22rpx;
	}
</style>