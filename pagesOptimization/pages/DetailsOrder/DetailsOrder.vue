<template>
	<view>
		<view class="pl32 pr32 box-size p-b-150" v-if="detail">
			<view class="head pt32 pb24 ">
				<view class="dis-flex flex-y-center flex-x-between">
					<view class="dis-flex flex-y-center">
						<view class="data-time f-36 f-b dis-flex flex-y-center" v-if="detail.status==1">待支付，剩余
							<u-count-down :time="Order_Info.remaining_time * 1000" format="HH:mm:ss" @finish="finish">
							</u-count-down>
						</view>
						<view class="f-36 f-b" v-else>{{OrderStatus()}}</view>
					</view>
					<!-- 状态，1 待付款，2 待发货，3 待收货，4 待评价 5 已完成 6 取消 7 售后中（退款/换货） -->
				</view>
				<view class="mt12 dis-flex flex-y-center flex-x-between f-24 col-gray-88">
					<view v-if="detail.status==1">逾期未支付订单将自动取消</view>
					<view v-else-if="detail.status==2">商家正在积极备货</view>
					<view v-else-if="detail.status==3">商品正飞奔向你而来</view>
					<view v-else-if="detail.status==5">感谢您的信任</view>
				</view>
			</view>
			<!-- 展示地址用户信息 -->
			<view class="Order_address">
				<image src="../../static/ico_dingwei_cai@2x.png" mode="" class="add_ico"></image>
				<view class="Order_address_left">
					<view class="">
						<view class="address_show_tel">
							<text style="margin-right: 20rpx;">{{detail.name}}</text>
							<text>{{detail.phone}}</text>
						</view>
						<view class="address_show_text">
							{{detail.address}}
						</view>
					</view>
				</view>
				<view class="">
					<u-icon name="arrow-right" color="#8e8f8e"></u-icon>
				</view>
			</view>
			<!-- 订单商品信息 -->
			<view class="bg-white-ff radio-16">
				<view class="bg-white-ff radio-16 cont24 address">
					<view class="col-gray-33 f-b f-32 mb24" @tap="storeDetail(detail.shop_id)">{{detail.shop_name}}
					</view>
					<view class="dis-flex  flex-x-between goods-item mb40" v-for="item in detail.goodsList"
						@tap.stop="goodsDetail(item.shop_goods_id)">
						<image class="wh112" :src="item.picture" mode="aspectFill"></image>
						<view class="w-78 ">
							<view class="dis-flex flex-y-center flex-x-between w-100">
								<view class="f-b f-28 w-70 onelist-hidden">{{item.goods_name}}</view>
								<view class="t-b f-32 f-b f-DINPro" v-if='detail.buy_type == 1'>
									<text class="f-24">¥</text>
									{{item.price}}
								</view>
								<view class="t-b f-32 f-b f-DINPro" v-if='detail.buy_type == 2'>
									<text class="f-24">¥</text>
									{{item.group_buy_price}}
								</view>
							</view>
							<view class="dis-flex mt5 f-24 col-gray-88">
								<text class="mr10" v-for="item2 in item.styles">{{item2.name}}</text>
							</view>
							<view class="f-24 col-gray-88">x{{item.num}}</view>
						</view>
					</view>
					<!-- 1 平台红包 2 店铺红包  4 邮费 7 自提点附加费 -->
					<view class="dis-flex flex-y-center flex-x-between mb32">
						<view class="col-brank-22">商品金额</view>
						<view class="t-b f-32 col-brank-20 f-b f-DINPro">
							<text class="f-24">¥</text>{{CountPrice()}}
						</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between mb32">
						<view class="col-brank-22">运费</view>
						<view class="t-b f-32 col-brank-20 f-b f-DINPro">
							<text class="f-24">¥</text>{{ computedDetail.postage }}
						</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between mb32">
						<view class="col-brank-22">自提点费用</view>
						<view class="t-b f-32 col-brank-20 f-b f-DINPro">
							<text class="f-24">¥</text>{{ computedDetail.pickedUp }}
						</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between mb32">
						<view class="col-brank-22">店铺满减</view>
						<view class="t-b f-32 col-red-d9 f-b f-DINPro">
							<text class="f-24">¥</text>{{ computedDetail.shop }}
						</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between mb32">
						<view class="col-brank-22">校U送红包</view>
						<view class="t-b f-32 col-red-d9 f-b f-DINPro">
							<text class="f-24">¥</text>{{computedDetail.platform}}
						</view>
					</view>
					<view class="border-t-f7 pt25 mt24 col-gray-33 dis-flex flex-y-center flex-x-end">
						<text class="mr15">合计</text>
						<text class="t-b f-40 col-red-d9 f-b f-DINPro"><text
								class="f-28">¥</text>{{detail.should_pay_amount}}</text>
					</view>
				</view>
			</view>
			<view class="bg-white-ff radio-16 mt24 ">
				<view class="dis-flex flex-y-center shop pt24 pb20 flex-x-center">
					<view class="dis-flex flex-y-center flex-x-center w-50"
						@tap="callMobile(detail.store.contacts_tel)">
						<image class="wh28 mr10" src="/pagesUser/static/mobile.png"></image>
						<view class="col-brank-22 ">联系商家</view>
					</view>

				</view>
			</view>

			<view class="bg-white-ff radio-16 mt24  cont24">
				<view class="f-28 f-b col-gray-33">订单信息</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 col-gray-88">订单号</view>
					<view class="f-28 col-brank-22" @tap="copy(detail.order_no)">{{detail.order_no}} <text
							class="f-24 ml15 col-red-d9">复制</text></view>
				</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between" v-if="detail.pay_type">
					<view class="f-28 col-gray-88">支付方式</view>
					<view class="f-28 col-brank-22">{{detail.pay_type==1?'在线支付':'钱包支付'}}</view>
				</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 col-gray-88">下单时间</view>
					<view class="f-28 col-brank-22">{{detail.submit_time}}</view>
				</view>
			</view>

			<view class="bg-white-ff radio-16 mt24  cont24">
				<view class="f-28 f-b col-gray-33">订单备注</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 col-gray-88">{{detail.remark}}</view>
				</view>
			</view>
			<view class="btn w-100 bg-white-ff dis-flex fixed-bottom box-shad-t flex-y-center flex-x-between">
				<view class="t-b" v-if="detail.status==1">
					<text class="f-24 col-brank-20 mr16">待支付:</text>
					<text class=" f-40 col-red-d9 f-b f-DINPro"><text
							class="f-28">¥</text>{{detail.should_pay_amount}}</text>
				</view>
				<view class="btn-order border-dd col-brank-20 f-24" @tap="anotherOrder" v-if="detail.status==3">
					再来一单</view>

				<view class="flex-centerd">
					<view class="btn-order border-dd col-brank-20 m-r-20 f-24 "
						v-if="detail.status==1 ||detail.status==2 " @tap.stop="applyRefund(detail)">
						取消订单</view>

					<view class="btn-order border-dd col-brank-20 m-r-20 f-24 " v-if="detail.status==3"
						@tap.stop="ConfirmReceipt(detail.id)">
						确认收货</view>

					<view class="btn-order border-dd col-brank-20 m-r-20 f-24 "
						v-if="detail.status==3 || detail.status==2" @tap.stop="checkLogistics(detail)">
						查看物流</view>
					<!-- payOrder(item.order_no,item) -->
					<view class="flex-row-r" v-if="detail.status==1" @tap.stop="payOrder(detail.id,detail)">
						<view class="btn-order border-dd  m-r-20 f-24 bg-red-d6-ec col-white-ff">
							立即支付
						</view>
					</view>

					<view class="btn-order border-dd col-brank-20 m-r-20 f-24 "
						v-if="detail.status==5 ||detail.status==6" @tap.stop="delOrder(detail.id)">
						删除订单</view>

					<view class="btn-order border-dd col-brank-20 m-r-20 f-24 " v-if="detail.status==5 "
						@tap.stop="AfterSale">
						申请售后</view>

					<view class="flex-row-r" v-if="detail.status==6" @tap.stop="anotherOrder(detail.shop_id)">
						<view class="btn-order border-dd col-brank-20 m-r-20 f-24 ">
							再来一单
						</view>
					</view>
					<!-- <view class="flex-row-r" v-if="detail.status==4" @tap.stop="toEvaluate(detail.id,detail.goodsList[0])">
						<view class="btn-order border-dd col-brank-20 m-r-20 f-24 ">
							去评价
						</view>
					</view> -->
				</view>
			</view>
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
		<view :catchtouchmove="true">
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
						<view class="btn-win t-c bg-red-d6-ec col-white-ff radio-40" @tap="SaleClick()">确认</view>
					</view>
				</view>
			</u-popup>
		</view>

	</view>
</template>

<script>
	import MapUtil from "@/common/mapUtil.js"
	export default {
		data() {
			return {
				order_id: '', //订单id
				order_no: '', //订单编号
				detail: null, //订单详情
				Order_Info: null, //支付信息
				cancelShow: false,
				order_type: '', //订单类型
				refund_reason: '', //退款原因
				radiovalue1: '已收到货，确定退款', //申请售后
				showAfter: false,
				radiolist1: [{
						name: '已收到货，确定退款',
						id: 1,
						disabled: false
					},
					{
						name: '已收到货，更换退回',
						id: 2,
						disabled: false
					}
				],
				change_id: 1,
			};
		},
		computed: {
			computedDetail() {
				// <!-- 1 平台红包 2 店铺红包  4 邮费 7 自提点附加费 -->
				let platform = 0;
				let shop = 0;
				let postage = 0;
				let pickedUp = 0;
				// console.log(this.detail.details);
				this.detail.details.forEach(item => {
					if (item.type == 7) {
						pickedUp = item.amount
					}
					if (item.type == 4) {
						postage = item.amount
					}
					if (item.type == 2) {
						shop = item.amount
					}
					if (item.type == 1) {
						platform = item.amount
					}
				})
				return {
					platform,
					shop,
					postage,
					pickedUp
				}
			}
		},
		onLoad(e) {
			console.log(e);
			this.order_id = e.order_id
			this.order_no = e.order_no
			// this.id = e.id
			// this.order_type = e.order_type || ''

		},
		onShow() {
			this.getOrderTakeOutInfo()
			this.getOrderPayInfo()
		},
		methods: {
			//订单倒计时结算
			finish() {
				console.log('支付结束')
				uni.showModal({
					title: "温馨提示",
					content: "您的订单已超时",
					showCancel: false,
					success(res) {
						if (res.confirm) {
							uni.navigateBack()
						}
					}
				})
			},
			//跳转商品详情
			goodsDetail(id) {
				// console.log(id);
				uni.navigateTo({
					url: `/pagesOptimization/pages/shopDetails/shopDetails?goods_id=${id}`,
				})
			},
			//跳转商家详情
			storeDetail(shop_id) {
				uni.navigateTo({
					url: `/pagesOptimization/pages/storehome/storehome?shopid=${shop_id}`
				})
			},
			//再来一单
			anotherOrder(shop_id) {
				uni.navigateTo({
					url: `/pagesOptimization/pages/storehome/storehome?shopid=${shop_id}`
				})
			},

			//订单详情接口
			async getOrderTakeOutInfo() {
				uni.showLoading({
					title: "正在加载中"
				})
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					order_id: this.order_id, //订单Id
				}
				uni.hideLoading()
				this.$http.post('/api/user/getOrderInfo', data)
					.then(res => {
						if (res.code == 200) {
							this.detail = res.data
							this.detail.goodsList.forEach(item2 => {
								item2.styles = JSON.parse(item2.styles)
							})
						}
					})
			},
			//订单支付信息
			async getOrderPayInfo() {
				uni.showLoading({
					title: "正在加载中"
				})
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					order_no: this.order_no, //订单Id
				}
				uni.hideLoading()
				this.$http.post('/api/pay/getPayInfo', data)
					.then(res => {
						if (res.code == 200) {
							// this.detail = res.data
							this.Order_Info = res.data
							console.log(this.Order_Info, 'this.Order_Info');
						}
					})
			},

			//判断订单状态
			OrderStatus() {
				// 状态，1 待付款，2 待发货，3 待收货，4 待评价 5 已完成 6 取消 7 售后中（退款/换货）
				let status = null
				if (this.detail.status == 2) {
					status = '待发货'
				} else if (this.detail.status == 3) {
					status = '待收货'
				} else if (this.detail.status == 4) {
					status = '待评价'
				} else if (this.detail.status == 5) {
					status = '已完成'
				} else if (this.detail.status == 6) {
					status = '已取消'
				} else if (this.detail.status == 7) {
					status = '售后中'
				}
				return status
			},
			//计算总价格
			CountPrice() {
				let price = 0
				this.detail.goodsList.forEach(item => {
					if (this.detail.buy_type == 1) {
						price += item.price * item.num
					} else {
						price += item.group_buy_price * item.num
					}
				})
				return price
			},
			//优惠及邮费
			Discount() {
				let price = 0
				this.detail.goodsList.forEach(item => {
					if (this.detail.buy_type == 1) {
						price += item.price * item.num
					} else {
						price += item.group_buy_price * item.num
					}
				})
				return price
			},
			//复制
			copy(data) {

				uni.setClipboardData({
					data: data
				})
				this.$u.toast("复制成功")
			},
			//联系商家
			callMobile(mobile) {
				uni.makePhoneCall({
					phoneNumber: mobile
				})
			},
			//取消订单
			applyRefund(detail) {
				if (detail.status == 1) { //未付款
					this.cancelled()

				} else { //已付款
					this.cancelShow = true
				}
				// this.cancelShow = true
			},
			//弹框确认取消--已付款
			cancelClick() {
				this.cancelled()
			},
			//取消订单
			cancelled() {
				var that = this
				if (this.detail.status == 1) {
					uni.showModal({
						title: "温馨提示",
						content: "是否取消订单",
						async success(res) {
							if (res.confirm) {
								uni.showLoading({
									title: "正在加载中"
								})

								const data = {
									userId: uni.getStorageSync('userInfo').id,
									order_id: that.detail.id
								}
								uni.hideLoading()
								that.$http.post('/api/user/cancelOrder', data)
									.then(res => {
										if (res.code == 200) {
											that.$u.toast("取消订单成功")
											setTimeout(function() {
												uni.navigateBack()
											}, 1000)

										} else {
											that.$u.toast(res.message)
										}
									})
							}
						}
					})
				} else {
					const data = {
						userId: uni.getStorageSync('userInfo').id,
						order_id: this.detail.id,
						refund_reason: this.refund_reason //退款原因
					}
					that.$http.post('/api/user/cancelOrder', data)
						.then(res => {
							if (res.code == 200) {
								that.$u.toast("取消订单成功")
								this.cancelShow = false
								setTimeout(function() {
									uni.navigateBack()
								}, 1000)
							} else {
								that.$u.toast(res.message)
							}
						})
				}
			},
			//去评价
			// toEvaluate(order_id,item) {
			// 	// console.log(item);
			// 	uni.navigateTo({
			// 		url: `/pagesOptimization/pages/estimate/estimate?order_id=${item.id}&&goodsInfo=${JSON.stringify(item)}`
			// 	})
			// },
			//查看物流
			checkLogistics(item) {
				uni.navigateTo({
				  url:"/pagesOptimization/pages/expressDetail/expressDetail?expressNum="+item.order_no
				})
			},
			// 申请售后
			AfterSale() {
				this.radiovalue1 = '已收到货，确定退款'
				this.change_id = 1
				console.log(this.change_id);
				this.showAfter = true
			},
			//选择
			radioChange(item) {
				if (item.name == '已收到货，确定退款') {
					this.change_id = item.id
					console.log(this.change_id);
				} else if (item.name == '已收到货，更换退回') {
					this.change_id = item.id
					console.log(this.change_id);
				}
			},

			//售后确认
			SaleClick() {
				this.afterSales()

			},
			//售后接口
			afterSales() {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					order_id: this.detail.id,
					refund_type: this.change_id
				}
				this.$http.post('/api/user/afterSales', data)
					.then(res => {
						if (res.code == 200) {
							this.$u.toast("申请退款成功，等待商家确认")
							this.showAfter = false
							setTimeout(function() {
								// uni.navigateTo({
								// 	url: '/pagesUser/page/orderList/orderList?tabAct1=3'
								// })
								uni.navigateBack()
							}, 1000)
						}
					})
			},

			//删除订单
			delOrder(id) {
				var that = this
				uni.showModal({
					title: '温馨提示',
					content: '确认删除订单,删除之后不可恢复',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							const data = {
								userId: uni.getStorageSync('userInfo').id,
								order_id: id
							}
							that.$http.post('/api/user/delOrder', data)
								.then(res => {
									if (res.code == 200) {
										that.$u.toast("删除成功")
										setTimeout(function() {
											// uni.navigateTo({
											// 	url: '/pagesUser/page/orderList/orderList?tabAct1=3'
											// })
											uni.navigateBack()
										}, 1000)
									}
								})
						}
					}
				})
			},

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
										setTimeout(function() {
											// uni.navigateTo({
											// 	url: '/pagesUser/page/orderList/orderList?tabAct1=3'
											// })
											uni.navigateBack()
										}, 1000)
									}
								})
						}
					}
				})
			},
			//立即支付
			payOrder(id, item) {
				uni.navigateTo({
					url: `/pagesOptimization/pages/PayOrder/PayOrder?type=2&&order_no=${item.order_no}`
				})
			},

		}
	}
</script>

<style lang="scss">
	.goods-item:last-child {
		margin-bottom: 32rpx;
	}

	.address {
		box-shadow: 0 44rpx 44rpx #F7F7F7;
	}

	page {
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
	}

	.btn-order {
		width: 160rpx;
		height: 56rpx;
		border-radius: 28rpx;
		line-height: 56rpx;
		text-align: center;
		margin-left: 20rpx;
	}

	.btn {
		width: 100%;
		padding: 18rpx 32rpx;
		box-sizing: border-box;
		padding-bottom: calc(18rpx + env(safe-area-inset-bottom));
		background: #FEFFFE;
		box-shadow: 0px -4rpx 20rpx 0px rgba(0, 0, 0, 0.0400);
	}

	.win-box-mobile {
		width: 560rpx;
		min-height: 292rpx;
		padding: 40rpx 60rpx;

	}

	.btn-win {
		width: 210rpx;
		height: 64rpx;
		line-height: 64rpx;
	}

	::v-deep .u-count-down__text {
		font-size: 36rpx !important;
	}

	.Order_address {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 40rpx;
		padding-bottom: 34rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}

	.Order_address_left {
		display: flex;
		align-items: center;
	}

	.Order_text_style {
		font-weight: 600;
	}

	.Order_detail_remark {
		font-size: 24rpx;
		text-align: right;
	}

	.Order_detail_text {
		display: flex;
		justify-content: space-between;
		padding-bottom: 14rpx;
		padding-top: 20rpx;
	}


	.add_ico {
		width: 48rpx;
		height: 48rpx;
		padding: 20rpx;
	}

	.add_address_text {
		width: 100%;
		font-size: 24rpx;
		color: #d93038;
		font-weight: 600;
	}

	.address_show_tel {
		font-weight: 600;
		font-size: 28rpx;
		text-align: left;
		color: #202020;
	}

	.address_show_text {
		font-size: 28rpx;
		width: 95%;
		font-weight: 500;
	}
</style>
