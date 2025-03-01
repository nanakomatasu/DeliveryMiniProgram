<template>
	<view>
		<u-sticky>
			<view class="top  bg-white-ff box-shad-b">
				<view class="pl24 pr24  pt15 pb5 box-size ">
					<u-search searchIconSize="32rpx" searchIcon="/static/img/search.png" placeholder="搜索我的订单"
						searchIconColor="#999999" color="#202020" :showAction="false" v-model="keyword" height="68rpx"
						bgColor="#F7F7F7" @search="search" @clear="clearSearch"></u-search>
				</view>
				<scroll-view scroll-x="true" class="pl10 box-size scroll">
					<view class="col-brank-20 pl35 pr35 tab-item" :class="tabAct==item.id?'tab-sel f-b f-32':'f-28'"
						v-for="(item,index) in tabList" :key="index" @tap="changeTab(item.id)">{{item.name}}</view>
				</scroll-view>
			</view>
		</u-sticky>
		<view>
			<block v-if="list.length>0">
				<view class="radio-16 mb20 pt24 pl24 pr24 pb24 box-size bg-white-ff" v-for="(item,index) in list"
					:key="index">
					<view class="dis-flex flex-y-center flex-x-between mb24">
						<view class="dis-flex flex-y-center max-w-75"
							@tap.stop="onLink('/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id='+item.store.merchant_id)">
							<view class="f-32 col-brank-20 f-b mr5 name onelist-hidden">{{item.store.name}}</view>
							<u-icon name="arrow-right" size="30rpx"></u-icon>
						</view>
						<view class="f-24" :class="item.state==1?'col-red-d9':''">{{item.state_text}}</view>
					</view>
					<view class="dis-flex flex-y-center"
						v-if="item.goods.length==1" @tap.stop="orderDetail(item)" >
						<image class="wh148 radio-8 mr24" :src="item.goods[0].icon" mode="aspectFill"></image>
						<view class="w-75 goods-r dis-flex flex-x-between flex-dir-column">
							<view class="f-28 f-b w-100 onelist-hidden">{{item.goods[0].name}}</view>
							<view class="col-gray-88 f-24">共{{item.goodsNum}}件</view>
						</view>
					</view>
					<view v-else class="dis-flex flex-y-center p-r" @tap.stop="orderDetail(item)" >
						<scroll-view class="scroll-goods" scroll-x="true">
							<image class="wh-148 radio-8 mr16" mode="aspectFill" v-for="(items,indexs) in item.goods"
								:src="items.icon">
							</image>
						</scroll-view>
						<view class="length dis-flex flex-y-center flex-dir-column col-gray-88 f-24">
							<view>共</view>
							<view>{{item.goodsNum}}</view>
							<view>件</view>
						</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between mt20">
						<view class="f-24 col-gray-88">下单时间：{{formateTime(item.createdAt)}}</view>
						<view class="f-24 col-gray-88 t-b ">合计
							<text class="col-brank-22 f-b f-24 ml15">¥<text class="f-36">{{item.money}}</text></text>
						</view>
					</view>
					<view class="mt20 dis-flex flex-y-center flex-x-end">
						<view class="btn-order bg-red-d6-ec col-white-ff f-24" v-if="item.state==1"
							@tap.stop="pay(item.id)">立即支付</view>
						<block v-else>
							<view class="btn-order border-dd col-brank-20 f-24"
								v-if="item.state==1||item.state==4||item.state==5||item.state>=7"
								@tap="delOrder(item,index)">删除订单</view>
							<view class="btn-order border-dd col-brank-20 f-24"
								v-if="item.state!=1&&item.state!=8&&item.state!=9" @tap="anotherOrder(item)">再来一单
							</view>
							<view class="btn-order border-dd col-brank-20 f-24"
								v-if="item.state==6||item.state==7||item.state==8">退款进度</view>
						</block>
					</view>
				</view>
			</block>
			<null-data title="暂无订单" v-if="list.length==0"></null-data>
			<u-loadmore v-else-if="list.length>1" :status="status" fontSize="26rpx" color="#999" />
		</view>
		<u-tabbar :value="actTabbar" @change="changeTabbar" :fixed="true" :placeholder="true" activeColor="#D93038"
			:border="false" :safeAreaInsetBottom="true">
			<u-tabbar-item :text="item.name" v-for="(item,index) in tabbarList" :key="index">
				<image class="wh48" slot="active-icon" :src="item.actIcon"></image>
				<image class="wh48" slot="inactive-icon" :src="item.icon"></image>

			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import * as util from '@/common/util.js'
	export default {
		data() {
			return {
				actTabbar: 1,
				tabbarList: [{
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
				tabAct: 0,
				keyword: "",
				tabList: [{
					name: "全部",
					id: 0
				}, {
					name: "待付款",
					id: 1
				}, {
					name: "已完成",
					id: 2
				}, {
					name: "已取消",
					id: 3
				}, {
					name: "退款",
					id: 4
				}],
				list: [], //订单列表
				page: 1,
				status: "loadmore",
				tableId: 0,
			};
		},
		onLoad(e) {
			this.tabAct = e.id || 0;
			this.tableId = e.tableId;
			console.log(this.tableId)
		},
		onShow() {
			this.getOrderList()
		},
		onReachBottom() {
			if (this.status != 'nomore') {
				this.getOrderList(true)
			}
		},
		methods: {
			//再来一单
			anotherOrder(item) {
				console.log('再来一单')
				console.log(item.id)
				//外卖再来一单
				uni.navigateTo({
					url: "/pagesIndex/page/diningroom/canteenshop/canteenshop?id=" +
						item.storeId +
						"&table=" + "当前桌" +
						"&tableId=" + item.tableId +
						"&name=" + item.store.name +
						"&orderId=" + item.id
				})
			},

			//立即支付
			pay(id) {
				uni.navigateTo({
					url: '/pagesIndex/page/diningroom/stpayofforder/stpayofforder?id=' + id + "&return_type=3"
				})
			},

			//删除订单
			delOrder(item, index) {
				var that = this
				uni.showModal({
					title: "温馨提示",
					content: "是否删除订单,删除之后不可恢复",
					async success(res) {
						if (res.confirm) {
							uni.showLoading({
								title: "正在加载中"
							})
							const {
								data,
								status
							} = await that.$api.inStoreOrderDelete({
								order_id: item.id,
							})
							uni.hideLoading()
							if (status == 200) {
								that.$u.toast("删除成功")
								that.list.splice(index, 1)
							}
						}
					}
				})

			},
			//获取订单列表
			async getOrderList(isPage) {
				uni.showLoading({
					title: "正在加载中"
				})
				let that = this
				if (isPage) {
					this.page = this.page + 1
					that.status = "loading"
				} else {
					this.page = 1
					this.list = []
					this.status = 'loadmore'
				}
				const {
					data,
					status
				} = await that.$api.inStoreOrderList({
					page: this.page,
					order_status: this.tabAct,
					search: this.keyword
				})
				uni.hideLoading()
				if (status == 200) {
					that.list = that.list.concat(data.data);
					console.log(that.list)
					if (data.last_page <= this.page) {
						that.status = 'nomore'
					}

				}
			},
			//跳转页面
			onLink(url) {
				uni.navigateTo({
					url: url
				})
			},
			//订单详情
			orderDetail(item) {
				uni.navigateTo({
					url:'/pagesIndex/page/diningroom/orderDetail/orderDetail?id='+item.id
				})
			},
			//更改id
			changeTab(id) {
				this.tabAct = id
				this.getOrderList()
			},
			//修改底部导航栏
			changeTabbar(index) {
				this.actTabbar = index
				console.log(index)
				uni.redirectTo({
					url: this.tabbarList[index].path +"?tableId="+this.tableId
				})
			},
			//搜索回车
			search() {
				this.getOrderList()
			},
			//清除搜索内容
			clearSearch() {
				this.getOrderList()
			},
			formateTime(time) {
				return util.formatTime(time * 1000)
			}
		}
	}
</script>

<style lang="scss">
	.scroll {
		white-space: nowrap;
		height: 96rpx;
		padding-top: 20rpx;
		box-sizing: border-box;
	}

	.tab-item {
		display: inline-block;
	}

	.cont {
		padding: 20rpx;
		box-sizing: border-box;
	}

	.name {
		max-width: 86%;
	}

	.scroll-goods {
		width: 100%;
		white-space: nowrap;
		height: 148rpx;
	}

	.scroll-goods image {
		display: inline-flex;
	}

	.scroll-goods image:last-child {
		margin-right: 80rpx;
	}

	.length {
		background: linear-gradient(rgba(255, 255, 255, 0.95), #fff);
		position: absolute;
		width: 50rpx;
		height: 152rpx;
		top: -2rpx;
		right: 0;
		padding: 26rpx 12rpx;
		box-sizing: border-box;
		text-align: center
	}

	.btn-order {
		width: 160rpx;
		height: 56rpx;
		border-radius: 28rpx;
		line-height: 56rpx;
		text-align: center;
		margin-left: 20rpx;
	}

	.goods-r {
		height: 148rpx;
		box-sizing: border-box;
	}

	.more {
		position: fixed;
		right: 22rpx;
		bottom: calc(124rpx + env(safe-area-inset-bottom));
		width: 160rpx;
		height: 238rpx;
		background: #FEFFFE;
		box-shadow: 0px 4rpx 20rpx 0px rgba(0, 0, 0, 0.0400);
		border-radius: 16rpx;
		padding: 10rpx 0;
		box-sizing: border-box;
	}

	.more>view {
		padding: 20rpx 0;
	}

	.label text {
		background: #f6f6fd;
		color: #999;
		padding: 0 12rpx;
		border-radius: 6rpx;
	}
</style>
