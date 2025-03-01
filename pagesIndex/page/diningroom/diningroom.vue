<template>
	<view>
		<view class="p-l-25 p-r-25 p-t-25 p-b-15">
			<!-- 轮播图 -->
			<view class="m-t-20">
				<u-swiper indicatorMode="dot" keyName="url" :list="swiperList" height="240rpx" radius="8rpx"
					:indicator="true">
				</u-swiper>
			</view>

			<view class="scanning flex-about flex-centerd">
				<view>当前桌号</view>
				<view class="f-38 col-brank-10">{{table.name}}</view>
			</view>

			<view class="scanning dis-flex  bg-white-ff m-t-15" v-for="(item, index) in shopList" :key="index" @click="shopDetail(item)">
				<image class="imgsx mr10" :src="item.logo" mode=""></image>
				<view class="dis-flex flex-column pl15">
					<view class="f-32 caoshus1" style="height: 50rpx;">{{item.name}}</view>
					<view class="dis-flex flex-column flex-space h-100">
						<view class="dis-flex flex-y-center f-28  mr20 mt10 case">
							<image class="wh24 mr10" src="/static/img/case.png"></image>
							<view class="f-b col-orange-ff95">{{item.score}}</view>
							<view class="ml15 col-gray-33 f-24">月售{{item.month_sales}}</view>
							<view class="ml35 col-gray-33 f-24">¥{{Number.parseInt(item.per_capita_order_price)}}/人</view>
						</view>
						<view class="f-14 c-88" v-if="item.time_open==0">
							店铺已打烊
						</view>
						<view class="f-14 c-88" v-else>
							<text>上午{{item.am_business_hours_start}}-{{item.am_business_hours_end}}</text>
							<text class="m-l-20">下午{{item.pm_business_hours_start}}-{{item.pm_business_hours_end}}</text>
						</view>
						<view class="dis-flex flex-y-center">
							<view class="label radio-4 mr16 pl5 pr5 f-22 bg-red-d6-ec col-white-ff" v-for="(reduce,i) in item.reduce" :key="i">
								{{reduce}}
							</view>
						</view>
					</view>
					
				</view>
			</view>
			<null-data v-if="shopList.length == 0" title="暂无店铺"></null-data>
		</view>

		<u-tabbar :value="actTabbar" @change="changeTab" :fixed="true" :placeholder="true" activeColor="#D93038"
			:border="false" :safeAreaInsetBottom="true">
			<u-tabbar-item :text="item.name" v-for="(item,index) in tabList" :key="index">
				<image class="wh48" slot="active-icon" :src="item.actIcon"></image>
				<image class="wh48" slot="inactive-icon" :src="item.icon"></image>
			</u-tabbar-item>
		</u-tabbar>
		
		
		
	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
				actTabbar: 0,
				tabList: [{
					name: "堂食点餐",
					icon: "/pagesIndex/static/ico-tangshi-menu.png",
					actIcon: "/pagesIndex/static/ico-tangshi-menu-sel.png",
					path: "/pagesIndex/page/diningroom/diningroom"
				}, {
					name: "订单", 
					icon: "/pagesIndex/static/tab-icon03.png",
					actIcon: "/pagesIndex/static/tab-icon-act03.png",
					path: "/pagesIndex/page/diningroom/canteenorder/canteenorder"
				}, ],
				trade_area_id: 1, //商圈ID
				shopList: [],
				table: {},
				tableId: 2, //台桌ID
				swiperList: [],
			}
		},
		onLoad(option) {
			if (option.tableId) {
				this.tableId = option.tableId;
				console.log(this.tableId)
			}
			// this.getShopList();
		},
		onShow() {
			this.getShopList();
		},
		methods: {
			changeTab(index) {
				this.actTabbar = index
				console.log(index)
				uni.redirectTo({
					url: this.tabList[index].path + "?tableId=" + this.tableId
				})
			},
			//获取店铺列表
			async getShopList() {
				uni.showLoading({
					title: '加载中'
				})
				let that = this;
				const {
					data,
					status
				} = await that.$api.dinningShopList({
					// trade_area_id: that.trade_area_id,
					table_id: this.tableId
				})
				uni.hideLoading();
				if (status == 200) {
					that.shopList = data.list;
					that.table = data.table;
					that.swiperList = data.tradeArea.pics;
					console.log(data)
				}

			},
			//进店
			shopDetail(item) {
				console.log('进店')
				console.log(item)
				uni.navigateTo({
					url: 'canteenshop/canteenshop?id=' + item.merchant_id +
						"&table=" + this.table.name +
						"&tableId=" + this.tableId +
						"&name=" + item.name
				})
			},
			//扫码
			scancode() {
				uni.scanCode({
					success(res) {
						console.log(res)
					}
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

	.saoyisao {
		width: 44rpx;
		height: 44rpx;
	}

	.imgsx {
		width: 160rpx;
		height: 160rpx;
	}

	.store {
		width: 128rpx;
		height: 56rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 28rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 36rpx;
	}
	
	
	
	.login-box {
		width: 100%;
		height: 100%;
	}
	
	.img {
		width: 100%;
		position: absolute;
	}
	
	.smip {
		position: absolute;
		font-size: 40rpx;
		top: 100rpx;
		left: 220rpx;
	}
	
	.smipx {
		   /* position: relative;
		    width: 208rpx;
		    height: 56rpx;
		    top: 1164rpx;
		    left: 268rpx;
		    z-index: 9999; */
			
			
			    position: fixed;
			    width: 208rpx;
			    height: 56rpx;
			    left: 268rpx;
			    bottom: 190rpx;
			    z-index: 9999;
			
			
	}
	
</style>
