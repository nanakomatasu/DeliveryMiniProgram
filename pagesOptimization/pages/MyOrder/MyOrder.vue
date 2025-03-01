<template>
	<view>
		<view class="" style="background-color: #fff;">
			<template>
				<u-tabs :list="list1" @click="Orderclick" lineColor="#d62e36" :activeStyle="{
				            color: '#202020',
				            fontWeight: 'bold',
				            transform: 'scale(1.05)'
				        }"></u-tabs>
			</template>
		</view>
		<view class="" v-if="OrderList.length > 0">
			<view class="" style="padding: 20rpx;margin-top: 20rpx;" v-for="(item,index) in OrderList">
				<view class="store_List">
					<view class="store_nav">
						<view class="store_name" @click="toShop(item)">
							<text style="color: #202020;font-size: 32rpx;font-weight: 600;">{{item.shop_name}}</text>
							<image src="../../static/ico_gengduo@2x.png" mode="" class="moreimg"></image>
						</view>
						<view class="" v-if="item.status == 1" style="color: #D93038; font-size: 24rpx">
							待支付
						</view>
						<view class="" v-if="item.status == 2" style="color: #D93038; font-size: 24rpx">
							待发货
						</view>
						<view class="" v-if="item.status == 3" style="color: #D93038; font-size: 24rpx">
							待收货
						</view>
						<view class="" v-if="item.status == 4" style="color: #888888; font-size: 24rpx">
							待评价
						</view>
						<view class="" v-if="item.status == 5" style="color: #888888; font-size: 24rpx">
							已完成
						</view>
						<view class="" v-if="item.status == 6" style="color: #888888; font-size: 24rpx">
							已取消
						</view>
						<view class="" v-if="item.status == 7" style="color: #888888; font-size: 24rpx">
							退款审核
						</view>
					</view>
					<scroll-view scroll-y="true" class="scroll-Y">
						<view class="store_content" v-for="(item2,index2) in item.goodsList">
							<image :src="item2.picture" mode="" class="food_img"> </image>
							<view class="" style="flex: 1;" @click="toDetailOrder(item)">
								<view class="" style="margin-left: 20rpx;">
									<view class=""
										style="color: #202020;font-size: 28rpx;font-weight: 600;padding-top: 10rpx;">
										{{item2.goods_name}}
									</view>
									<view class="child_type">
										<view class="child_type_style" v-for="item3 in item2.styles">
											{{item3.name}}
										</view>
									</view>
									<view class="" style="margin-top: 32rpx;color: #888888;font-size: 24rpx;">
										共{{item.goodsList.length}}件
									</view>
								</view>
							</view>
							<view class="other_btn" v-if="item.status == 4 || item.status == 5"
								style="margin-top: 80rpx;" @click="toEvaluate(item.id,item2)">
								评价
							</view>
						</view>
					</scroll-view>
					<view class=""
						style="display: flex;justify-content: space-between;align-items: center;margin-top: 20rpx;">
						<view class="" style="color: #888888;font-size: 24rpx;">
							下单时间：{{item.submit_time}}
						</view>
						<view class="" style="display: flex;justify-content: space-between;align-items: baseline;">
							<view class="" style="color: #888888;font-size: 24rpx;">
								合计
							</view>
							<view class="" style="color: #202020;font-size: 24rpx;font-weight: 700;">
								¥
							</view>
							<view class="" style="color: #202020;font-size: 36rpx;font-weight: 700;">
								{{item.should_pay_amount}}
							</view>
						</view>
					</view>
					<view class=""
						style="display: flex;justify-content: flex-end;align-items: center;margin-top: 20rpx;">
						<!-- -1 待付款， 2 待发货， 3 待收货， 4 待评价 5 已完成 6 取消 7 退款中(售后中) -->
						<view class="other_btn" v-if="item.status == 5 || item.status == 6 "
							@click="delOrderU(item.id)">
							删除订单
						</view>
						<view class="other_btn" v-if="item.status == 1 || item.status == 2"
							@click="cancellationOrder(item)">
							取消订单
						</view>
						<view class="other_btn" v-if="item.status == 3 ||item.status == 4 ||item.status == 5"
							@click="checkLogistics(item)">
							查看物流
						</view>
						<view class="other_btn"
							v-if="item.status == 3 || item.status == 2 || item.status == 5|| item.status == 6|| item.status == 6"
							@click="AgainOrder(item.shop_id)">
							再来一单
						</view>
						<view class="pay_btn" v-if="item.status == 1" @click="payOrder(item.order_no,item)">
							立即支付
						</view>
						<view class="pay_btn" v-if="item.status == 3" @click="ConfirmReceipt(item.id)">
							确认收货
						</view>
					</view>
				</view>
			</view>
			<template>
				<view>
					<u-loadmore status="nomore" />
				</view>
			</template>
			<u-gap height="5" bgColor="#f5f5f5"></u-gap>
		</view>
		<view class="" v-if="OrderList.length == 0">
			<null-data title="暂无订单" v-if="OrderList.length == 0"></null-data>
		</view>

		<!-- 退款取消弹窗 -->
		<view :catchtouchmove="true">
			<u-popup :show="cancelShow" mode="center" :safeAreaInsetBottom="false" round="32rpx">
				<view class="win-box-mobile  box-size bg-white-ff radio-30">
					<view class="f-32 w-100 t-c f-b mb20">取消订单</view>
					<template>
						<u--input placeholder="请输入退款原因" border="surround" v-model="refund_reason"></u--input>
					</template>
					<view class="dis-flex flex-y-center flex-x-between mt40">
						<view class="btn-win t-c bg-gray-ef radio-40" @tap="cancelClick">确认取消</view>
						<view class="btn-win t-c bg-red-d6-ec col-white-ff radio-40" @tap="cancelShow=false">我在想想
						</view>
					</view>
				</view>
			</u-popup>
		</view>

		<!-- 售后申请弹框 -->
		<!-- 		<view :catchtouchmove="true">
			<u-popup :show="showAfter" mode="center" :safeAreaInsetBottom="false" round="32rpx">
				<view class="win-box-mobile  box-size bg-white-ff radio-30">
					<view class="f-32 w-100 t-c f-b mb20">申请售后</view>
					<template>
						<u-radio-group v-model="radiovalue1" placement="column">
							<u-radio :customStyle="{marginBottom: '8px'}" v-for="item in radiolist1" :key="item.id"
								:label="item.name" :name="item.name" @change="radioChange(item)">
							</u-radio>
						</u-radio-group>
					</template>
					<view class="dis-flex flex-y-center flex-x-between mt40">
						<view class="btn-win t-c bg-gray-ef radio-40" @tap="showAfter=false">取消</view>
						<view class="btn-win t-c bg-red-d6-ec col-white-ff radio-40" @tap="SaleClick()">确认
						</view>
					</view>
				</view>
			</u-popup>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: [{
					name: '全部',
				}, {
					name: '待付款',
				}, {
					name: '待发货'
				}, {
					name: '待收货'
				}, {
					name: '待评价'
				}, {
					name: '已完成'
				}, {
					name: '已取消'
				}, {
					name: '售后中'
				}],
				OrderList: [], //订单列表
				tabIndex: '',
				cancelShow: false,
				refund_reason: '', //退款原因
			}
		},

		onLoad() {
			// this.getOrderLists()
		},
		onShow() {
			this.getOrderLists(this.tabIndex)
		},

		methods: {
			Orderclick(item) {
				console.log('item', item.index);
				this.tabIndex = item.index
				this.getOrderLists(item.index)
				// this.getOrderLists() <!-- 1 待付款，2 待发货，3 待收货，4 待评价 5 已完成 6 取消 7 退款中(售后中) -->
				// console.log(this.OrderList);
			},
			//获取订单列表 /api/user/listOrders
			getOrderLists(status) {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					status: status || '',
					page: 1,
					num: 1000,
				}
				// data.status = status
				this.$http.post('/api/user/listOrders', data)
					.then(res => {
						if (res.code == 200) {
							this.OrderList = res.data.list
							this.OrderList.forEach(item => {
								item.goodsList.forEach(item2 => {
									item2.styles = JSON.parse(item2.styles)
								})
							})
						}
					})
			},
			//前往商店主页
			toShop(item) {
				uni.navigateTo({
					url: `/pagesOptimization/pages/storehome/storehome?shopid=${item.shop_id}`
				})
			},
			//订单详情
			toDetailOrder(item) {
				console.log(item);
				uni.navigateTo({
					url: `/pagesOptimization/pages/DetailsOrder/DetailsOrder?order_id=${item.id}&&order_no=${item.order_no}`
				})
			},
			//立即支付
			payOrder(id, item) {
				uni.navigateTo({
					url: `/pagesOptimization/pages/PayOrder/PayOrder?type=2&&order_no=${item.order_no}`
				})
			},
			// 再来一单
			AgainOrder(shop_id) {
				uni.navigateTo({
					url: `/pagesOptimization/pages/storehome/storehome?shopid=${shop_id}`
				})
			},
			//确认收货
			ConfirmReceipt(id) {
				var that = this
				uni.showModal({
					title: '提示',
					content: '是否确认收货',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							const data = {
								userId: uni.getStorageSync('userInfo').id,
								order_id: id
							}
							that.$http.post('/api/user/confirm', data)
								.then(res => {
									if (res.code == 200) {
										that.$u.toast("确认收货成功")
										that.getOrderLists(that.tabIndex)
									}
								})
						}
					}
				})
			},
			//查看物流
			checkLogistics(item) {
				uni.navigateTo({
					url: `/pagesOptimization/pages/estimate/estimate?order_id=${item.id}&&goodsInfo=${JSON.stringify(item)}`
				})
			},
			//去评价
			toEvaluate(order_id, goodsInfo) {
				console.log(order_id, goodsInfo);
				uni.navigateTo({
					url: `/pagesOptimization/pages/estimate/estimate?order_id=${order_id}&&goodsInfo=${JSON.stringify(goodsInfo)}`
				})
			},
			//取消订单
			cancellationOrder(item) {
				if (item.status == 1) {
					var that = this
					uni.showModal({
						title: '提示',
						content: '确认取消订单？',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								const data = {
									userId: uni.getStorageSync('userInfo').id,
									order_id: id
								}
								that.$http.post('/api/user/cancelOrder', data)
									.then(res => {
										if (res.code == 200) {
											that.$u.toast("取消订单成功")
											that.getOrderLists(that.tabIndex)
										} else {
											that.$u.toast(res.message)
										}
									})
							}
						}
					})
				} else { //已付款
					this.cancelShow = true
					this.cancelClick(item.id)

				}
			},
			//已付款取消订单
			cancelClick(id) {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					order_id: id,
					refund_reason: this.refund_reason,
				}
				this.$http.post('/api/user/cancelOrder', data)
					.then(res => {
						if (res.code == 200) {
							this.$u.toast("取消订单成功")
							this.getOrderLists(this.tabIndex)
						} else {
							this.$u.toast(res.message)
						}
					})
			},
			//删除订单
			delOrderU(id) {
				console.log(1111111);
				var that = this
				uni.showModal({
					title: '提示',
					content: '确认删除订单?',
					success: function(res) {
						console.log(res)
						// if (res.confirm) {
						// 	console.log('用户点击确定');
						// 	const data = {
						// 		userId: uni.getStorageSync('userInfo').id,
						// 		order_id: id
						// 	}
						// 	that.$http.post('/api/user/delOrder', data)
						// 		.then(res => {
						// 			if (res.code == 200) {
						// 				that.$u.toast("删除成功")
						// 				that.getOrderLists(that.tabIndex)
						// 			}
						// 		})
						// }
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-Y {
		max-height: 420rpx;
		min-height: 152rpx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 90%;
	}

	.store_List {
		background: #ffffff;
		border-radius: 16rpx;
		padding: 20rpx;
	}

	.store_nav {
		display: flex;
		justify-content: space-between;
	}

	.store_name {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.moreimg {
		width: 28rpx;
		height: 28rpx;
	}

	.food_img {
		width: 148rpx;
		height: 148rpx;
		margin: 16rpx;
	}

	.store_content {
		display: flex;
		justify-content: flex-start;
		margin-top: 24rpx;
	}

	.pay_btn {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ffffff;
		font-size: 24rpx;
		width: 160rpx;
		height: 56rpx;
		background: linear-gradient(313deg, #d62e36 6%, #ec434b);
		border-radius: 28rpx;
	}

	.other_btn {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #202020;
		font-size: 24rpx;
		width: 160rpx;
		height: 56rpx;
		margin-right: 10rpx;
		border: 0.5px solid #dddddd;
		border-radius: 28rpx;
	}

	.child_type {
		display: flex;
		font-size: 12px;
		color: #8e8f8e;
	}

	.child_type_style {
		padding: 10rpx 10rpx 10rpx 0;
	}
</style>
