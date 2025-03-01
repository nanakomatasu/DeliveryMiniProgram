<template>
	<view>
	
		<view class="padd-0-24">
			<!-- 商家列表 -->
			<view class="dis-flex   bg-white-ff mt20 radio-16 cont24" v-for="(item,index) in list" :key="index"
				@tap="shopDetail(item.merchant_id,item.labels)">
				<image class="wh180 radio-8 mr20" :src="item.logo"></image>
				<view class="dis-flex flex-dir-column shop-r w-70">
					<view class="dis-flex flex-y-center mb12">
						<!-- <view class="bg-orange-fa-f2 radio-4 mr10 f-22 col-white-ff pl5 pr5 ">神券</view> -->
						<view class="onelist-hidden w-80 f-32 f-b">{{item.name}}</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between mb5 price">
						<view class="price-l dis-flex flex-y-center w-75">
							<view class="dis-flex flex-y-center f-28 col-orange-ff95 mr20 case">
								<image class="wh24 mr10" src="/static/img/case.png"></image>
								<view class="f-b">{{item.score}}</view>
							</view>
							<view class="col-gray-88 f-22 w-35 mr10 box-size onelist-hidden ">月售{{item.month_sales}}
							</view>
							<view class="col-gray-88 f-22 w-45 onelist-hidden">
								¥{{item.per_capita_order_price}}/人</view>
						</view>
						<view class="price-r col-red-d9 f-22">{{item.distribution_type==2?'商家配送':'平台配送'}}</view>
					</view>
					<view class="col-gray-88 mb15  dis-flex flex-y-center flex-x-between f-22">
						<view class="w-50 onelist-hidden">
							<text class="mr20">起送¥{{item.starting_price}}</text>
							<text>配送¥{{item.delivery_money}}</text>
						</view>
						<view class="w-50 t-r onelist-hidden">
							<text class="mr10">{{item.delivery_time}}分钟</text>
							<text>距{{item.juli}}</text>
						</view>
					</view>
					<view class="dis-flex flex-y-center">
						<view class="label radio-4 m-l-8  f-22 bg-red-F7 col-red-dd" v-show="index<4"
							v-for="(item,index) in item.labels" :key="index">{{item}}</view>
					</view>
				</view>
			</view>
		</view>
		<null-data title="暂无商家" v-if="list.length==0"></null-data>
		<u-loadmore v-else-if="list.length>1" :status="status" fontSize="26rpx" color="#999" />
		
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				id: '',
				list: []
			}
		},
		onLoad(id) {
			console.log('idid',id.id);
			this.id = id.id
			this.Gethbsj_lists()

		},

		methods: {
			//跳转商家详情
			shopDetail(id, labels) {
				uni.navigateTo({
					url: "/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id=" + id + '&type=1' +
						'&labels=' + JSON.stringify(labels)
				})
			},
			async Gethbsj_lists() {
				const res = await this.$api.hbsj_lists({
					activity_id: this.id,
					lng: uni.getStorageSync('lng') || '',
					lat: uni.getStorageSync('lat') || '',
				})
				if (res.status == 200) {
					this.list = res.data.list 
					console.log(this.list);
				}
					
			},
		}

	}
</script>

<style>
	.title-img {
		width: 144rpx;
		height: 36rpx;
	}

	.u-nav-slot {
		flex: 1;
		align-items: center;
		display: flex;
	}

	/*  #ifdef H5 || APP-PLUS */
	.u-nav-slot {
		width: 698rpx;
		justify-content: space-between;
	}

	/*  #endif  */
	.address-school {
		max-width: 80%;
	}


	.tab-scroll {
		white-space: nowrap;
		width: 86%;
	}

	.tab-item {
		font-weight: 500;
		box-sizing: border-box;
		display: inline-block;
		margin-right: 56rpx;
		text-align: center;
		border-radius: 8rpx;
		position: relative;
		z-index: 2;
		font-family: PingFangSC-Medium, PingFang SC;
	}

	.tab-act {
		font-size: 32rpx;
	}

	.tab-act::after {
		position: absolute;
		content: '';
		width: 100%;
		height: 8rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		bottom: 4rpx;
		z-index: -1;
		left: 0;
		font-weight: bold;
	}

	.sort-item {
		width: 168rpx;
		height: 54rpx;
		line-height: 54rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin-right: 20rpx;
	}

	/* .shop-r {
		height: 180rpx;
	} */

	.cart {
		width: 80rpx;
		height: 80rpx;
		background: #FFFFFF;
		box-shadow: 0px 8rpx 20rpx 0px rgba(0, 0, 0, 0.12);
		border-radius: 40rpx;
		position: fixed;
		bottom: 158rpx;
		right: 24rpx;
		margin-bottom: var(--safe-area-inset-bottom);
	}

	.price-input {
		width: 316rpx;
		height: 64rpx;
		line-height: 64rpx;
	}

	.scroll-win {
		height: 810rpx;
	}

	.screen-item {
		width: 160rpx;
		height: 64rpx;
		line-height: 64rpx;
	}

	.screen-item:nth-child(4n) {
		margin-right: 0;
	}

	.btn {
		width: 332rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.menu-swiper {
		padding: 20rpx 0;
		box-sizing: border-box;
		height: 380rpx;
		box-sizing: border-box;
	}

	.indicator-dots view {
		height: 10rpx;
		border-radius: 6rpx;
		margin: 0 4rpx;
	}

	.def-swiper {
		background: #DBDBDB;
		width: 10rpx;
	}

	.act-swiper {
		width: 32rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
	}

	.label {
		height: 28rpx;
		line-height: 28rpx;
		padding: 0 6rpx;
		font-family: PingFangSC-Regular, PingFang SC;
	}

	.label-bg {
		width: max-content;
		height: 28rpx;
		line-height: 28rpx;
		padding: 0 6rpx;
		font-family: PingFangSC-Regular, PingFang SC;
	}
</style>
