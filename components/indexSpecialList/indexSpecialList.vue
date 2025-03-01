<template>
	<view class="bgc-f7 bor-r-16" style="padding: 20rpx 24rpx;">
		<view class="flex-al-c flex-jus-spa" @tap.stop="more">
			<view class="flex-al-c">
				<view class="f-32 fw-700">{{ st.title }}</view>
			</view>
			<view class="flex-al-c">
				<view class="f-24 color-8E8F8E h-36">更多</view>
				<image class="wh-28 m-l-8" src="@/static/img/ico-gengduo.png" mode=""></image>
			</view>
		</view>
		<view class=" m-t-20 special-goods" :style="{ background: st.background }">
			<view class="dis-flex flex-column special-goods_item mb20 m-r-30 radio-8" v-for="(item, index) in goods" :key="index"
				@click="shopDetail(item)">
				<image class="wh-280 radio-8" :src="item.img[0]" mode=""></image>
				<text v-if="goods.is_special" class="special-price">特价</text>
				<text class="store-name radio-lb-rb-8">{{item.store.name}}</text>
				<view class="pr10 pl10 pb20">
					<view class=" onelist-hidden f-28 w-100 mt20">{{ item.name }}</view>
					<view class=" onelist-hidden f-26 col-gray-8e w-100 mt10" v-if="item.introduce">{{ item.introduce }}</view>
					<view class="color-D93038 w-100 onelist-hidden h-36 f-24 t-b f-b f-DINPro mt10"
						style="display: flex;justify-content: space-between;align-items: center;">
						<view class="flex">
							<text class="f-28">¥{{ item.price }}</text>
							<view v-if="item.scribe_price > item.price" class="f-28 col-gray-88 ml10 text-line">{{ item.scribe_price }}</view>
						</view>
						<view>去购买</view>
					</view>
				</view>
			</view>
		</view>



		<null-data v-if="goods.length == 0"></null-data>


	</view>

</template>

<script>
	export default {
		name: "indexspecialist",
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
	.special-goods {
		width: 100%;
		display: flex;
		overflow-x: auto;
	}
	.special-goods_item {
		width: 280rpx;
		position: relative;
		background: #fff;
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
	.store-name {
		position: absolute;
    top: 238rpx;
    width: 100%;
    background-color: rgb(93, 78, 45, 0.7);
    text-align: center;
    font-size: 24rpx;
    padding: 4rpx 0;
    color: #fff;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	}
</style>