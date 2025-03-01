<template>
	<view @tap="cancelMore" >
		<!-- 订单状态 -->
		<u-sticky>
			<view class="dis-flex flex-y-center  tab">
				<view class="tab-item" @tap.stop="changeTab(item.id)" v-for="(item,index) in tabList" :key="index"
					:class="tabAct==item.id?'tab-act f-b f-32':'f-28 col-brank-20'" >
					{{item.name}}
				</view>
			</view>
		</u-sticky>

		<view class="content ">
			<block v-if="list.length>0">
				<view class="radio-16 mb20 pt24 pl24 pr24 pb24 box-size bg-white-ff" v-for="(item,index) in list"
					:key="index">
					<view class="dis-flex flex-y-center flex-x-between mb24">
						<view class="dis-flex flex-y-center max-w-75"
							@tap.stop="onLink('/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id='+item.store.merchant_id)">
							<view class="f-32 col-brank-20 f-b mr5 name onelist-hidden">{{item.store.name}}</view>
							<u-icon name="arrow-right" size="30rpx"></u-icon>
						</view>
						<view class="f-24" :class="item.order_status==1?'col-red-d9':''">{{item.state_text}}</view>
					</view>
					<view class="dis-flex flex-y-center"
						@tap.stop="onLink('/pagesUser/page/orderList/oderDetail/oderDetail?id='+item.id+'&order_type=1')"
						v-if="item.goods.length==1">
						<image class="wh148 radio-8 mr24" :src="item.goods[0].icon" mode="aspectFill"></image>
						<view class="w-75 goods-r dis-flex flex-x-between flex-dir-column">
							<view class="f-28 f-b w-100 onelist-hidden">{{item.goods[0].name}}</view>
							<view class="col-gray-88 f-24">共{{item.goods[0].num}}件</view>
						</view>
					</view>
					<view v-else class="dis-flex flex-y-center p-r"
						@tap.stop="onLink('/pagesUser/page/orderList/oderDetail/oderDetail?id='+item.id +'&order_type=1')">
						<scroll-view class="scroll-goods" scroll-x="true">
							<image class="wh-148 radio-8 mr16" mode="aspectFill" v-for="(items,indexs) in item.goods" :key="indexs"
								:src="items.icon">
							</image>
						</scroll-view>
						<view class="length dis-flex flex-y-center flex-dir-column col-gray-88 f-24">
							<view>共</view>
							<view>{{item.num}}</view>
							<view>件</view>
						</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between mt20">
						<view class="f-24 col-gray-88">下单时间：{{item.create_time}}</view>
						<view class="f-24 col-gray-88 t-b ">合计
							<text class="col-brank-22 f-b f-24 ml15">¥<text class="f-36">{{item.money}}</text></text>
						</view>
					</view>
					<view class="mt20 dis-flex flex-y-center flex-x-end">
						<view class="btn-order bg-red-d6-ec col-white-ff f-24" v-if="item.order_status==1"
							@tap.stop="pay(item.id)">立即支付</view>
						<block v-else>
							<view class="btn-order border-dd col-brank-20 f-24"
								v-if="item.order_status==6||item.order_status==7||item.order_status==8||item.order_status==10||item.order_status==11"
								@tap="delOrder(item.id,index)">删除订单</view>

							<view class="btn-order border-dd col-brank-20 f-24"
								v-if="item.order_status!=1&&item.order_status!=11&&item.order_status!=12&&item.order_status!=9&&item.order_status!=3&&item.order_status!=4"
								@tap="anotherOrder(item)">再来一单</view>

							<view class="btn-order border-dd col-brank-20 f-24"
								v-if="item.order_status==9||item.order_status==10||item.order_status==11"
								@click="tkjd(item.id)">退款进度</view>
							<view class="btn-order border-dd col-brank-20 f-24"
								v-if="item.before_refund_state==11&&item.order_status<6" @tap.stop="terrace(item)">
								平台介入</view>
							<view class="btn-order bg-red-d6-ec col-white-ff f-24" v-if="item.order_status==5"
								@tap.stop="addComment(item.id,item.store.merchant_id)">评价
							</view>
							<view class="btn-order bg-red-d6-ec col-white-ff f-24"
								v-if="item.delivery_mode==2&&item.order_status==4"
								@tap="confirmReceivingOrder(item.id)">确认取餐
							</view>
						</block>
					</view>
				</view>
			</block>
			<null-data title="暂无订单" v-if="list.length==0"></null-data>
			<u-loadmore v-else-if="list.length>1" :status="status" fontSize="26rpx" color="#999" />
		</view>
		<!-- 导航菜单栏 -->
		<takeMenu :tabAct="tabActMenu"></takeMenu>
		<!-- 更多的菜单 -->
		<view class="more" v-if="moreShow">
			<view class="t-c f-24" v-for="(item,index) in more" :key="index" @tap="onLink(item.url)">{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moreShow: false, //是否显示更多的弹窗
				more: [{
					name: "红包卡券",
					url: "/pagesUser/page/couponList/couponList",
				}, {
					name: "我的收藏",
					url: "/pagesUser/page/case/case",
				}, {
					name: "管理地址",
					url: "/pagesUser/page/addressList/addressList",
				}],
				tabActMenu: 2,
				list: [], //订单列表
				tabList: [{
					name: "全部",
					id: 0
				}, {
					name: "待评价",
					id: 2
				}, {
					name: "退款",
					id: 3
				}, ],
				tabAct: 0,
				page: 1,
				status: "loadmore",
			};
		},
		onLoad(e) {
			if (e.status) {
				this.moreShow = true
				this.tabActMenu = 3
			}
		},
		onShow() {
			// this.getOrderTakeOutList()
			setTimeout(() => {
				this.getOrderTakeOutList()
			}, 500);
		},
		onReachBottom() {
			if (this.status != 'nomore') {
				this.getOrderTakeOutList(true)
			}
		},

		methods: {
			// 退款进度
			tkjd(id) {
				uni.navigateTo({
					url: '/pagesUser/page/orderList/afterSalesList/progress/progress?id=' + id
				})
			},
			//再来一单
			anotherOrder(item) {
				uni.navigateTo({
					url: "/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?orderId=" + item.id + '&id=' +
						item.store.merchant_id
				})
			},
			//确认取餐
			confirmReceivingOrder(id) {
				var that = this
				uni.showModal({
					title: "温馨提示",
					content: "请确认是否已取餐",
					async success(res) {
						if (res.confirm) {
							uni.showLoading({
								title: "正在加载中"
							})
							const {
								data,
								status
							} = await that.$api.receivingOrder({
								order_id: id,
								order_type: 1, //1外卖，2附近，3优选
							})
							uni.hideLoading()
							if (status == 200) {
								that.$u.toast("取餐成功")
								that.getOrderTakeOutList()
							}
						}
					}
				})

			},
			//获取订单列表
			async getOrderTakeOutList(isPage) {
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
				var list = this.list;
				const {
					data,
					status
				} = await that.$api.orderTakeOutList({
					page: this.page,
					order_status: this.tabAct
				})
				uni.hideLoading()
				if (status == 200) {
					list = list.concat(data.data)
					that.list = list
					if (data.last_page <= this.page) {
						that.status = 'nomore'
					}
				}
			},
			//删除订单
			delOrder(id, index) {
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
							} = await that.$api.orderDeleteOrder({
								order_id: id,
								order_type: 1, //1外卖，2附近，3优选
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
			terrace(item) {
				var that = this
				uni.showModal({
					title: "温馨提示",
					content: "是否平台介入退款",
					async success(res) {
						if (res.confirm) {
							uni.showLoading({
								title: "正在加载中"
							})
							const {
								data,
								status
							} = await that.$api.refundPlatOrder({
								order_id: item.id,
								order_type: 1, //1外卖，2附近，3优选
							})
							uni.hideLoading()
							if (status == 200) {
								that.$u.toast("提交成功")
								that.getOrderTakeOutList()
							}
						}
					}
				})
			},
			//立即支付
			pay(id) {
				uni.navigateTo({
					url: '/pagesIndex/page/pay/pay?id=' + id
				})
			},
			//跳转评价
			addComment(id, merchant_id) {
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/order/addComment/addComment?id=' + id +
						'&order_type=1&merchant_id=' + merchant_id
				})
			},
			changeTab(id) {
				//更改订单状态
				this.tabAct = id
				this.getOrderTakeOutList()
			},
			//跳转链接
			onLink(url) {
				uni.navigateTo({
					url: url
				})
			},
			//关闭弹窗更多
			cancelMore() {
				this.moreShow = false
				this.tabActMenu = 2
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tab {
		width: 100%;
		height: 96rpx;
		background: #FEFFFE;
		box-shadow: 0px 4rpx 24rpx 0px rgba(0, 0, 0, 0.0500);
	}

	.tab .tab-item {
		padding: 0 40rpx;
	}

	.tab .tab-item:first-child {
		padding-left: 28rpx;
	}

	.tab-act {
		position: relative;
	}

	.tab-act::after {
		width: 20rpx;
		height: 6rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 4rpx;
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: -10rpx;
	}

	.content {
		padding: 24rpx;
		box-sizing: border-box;
		
	}

	.name {
		max-width: 85%;
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
		width: max-content;
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
		padding: 8rpx 0;
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
</style>