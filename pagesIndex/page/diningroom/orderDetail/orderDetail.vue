<template>
	<view>
		<view class="pl32 pr32 box-size p-b-120" v-if="detail">

			<view class="head pt32 pb24">
				<view class="dis-flex flex-y-center flex-x-between">

					<view class="dis-flex flex-y-center">

						<view class="data-time f-36 f-b dis-flex flex-y-center" v-if="detail.order_status==1">待支付，剩余
							<u-count-down :time="detail.remaining_time * 1000" format="HH:mm:ss" @finish="finish">
							</u-count-down>
						</view>
						<view class="f-36 f-b" v-else>{{detail.state_text}}</view>
					</view>
					<!--  1未付款,2已付款,3已接单,4配送中/待取货,5已收货,6已评价,7已取消,8.拒单，9申请退款,10已退款，11退款拒绝 -->
					<!-- 1代付款 2.已付款3.已接单 4已出货 5已取消 6 申请退款 7推送通过 8退款拒绝 9 已拒单 -->
				</view>
				<view class="mt12 dis-flex flex-y-center flex-x-between f-24 col-gray-88">
					<view v-if="detail.order_status==1">逾期未支付订单将自动取消</view>
				</view>
			</view>

			<view class="bg-white-ff radio-16 mb20  ">
				<view class="address radio-16 cont24">
					<view class="f-28 f-b col-gray-33">门店信息</view>
					<view class="pt32 dis-flex flex-x-between">
						<view class="f-28 col-gray-88">用餐地址</view>
						<view class="f-28 col-brank-22 w-75 t-r">
							{{detail.store.address}}
						</view>
					</view>
					<view class="pt32 dis-flex flex-y-center flex-x-between">
						<view class="f-28 col-gray-88">就餐方式</view>
						<view class="f-28 col-brank-22">{{detail.isOut==1?'店内就餐':'打包带走'}}</view>
					</view>
				</view>
				<!-- <view class="dis-flex flex-y-center shop pt24 pb20 flex-x-center"
					@tap="callMobile(detail.store.contacts_tel)">
					<image class="wh28 mr10" src="/pagesUser/static/mobile.png"></image>
					<view class="col-brank-22 ">联系商家</view>
				</view> -->
			</view>
			<view class="bg-white-ff radio-16">
				<view class="bg-white-ff radio-16 cont24 address">
					<view class="col-gray-33 f-b f-32 mb24" @tap="storeDetail">{{detail.store.name}}</view>
					<view class="dis-flex  flex-x-between goods-item mb40" v-for="(item,index) in detail.goods"
						:key="index" @tap.stop="goodsDetail(item.goods_id)">
						<image class="wh112" :src="item.icon" mode="aspectFill"></image>
						<view class="w-78 ">
							<view class="dis-flex flex-y-center flex-x-between w-100">
								<view class="f-b f-28 w-70 onelist-hidden">{{item.name}}</view>
								<view class="t-b f-32 f-b f-DINPro"><text class="f-24">¥</text>{{item.money}}</view>
							</view>
							<view class="mt5 f-24 col-gray-88"><text class="mr10"
									v-if="item.attribute">{{item.attribute}}</text><text
									v-if="item.material">{{item.material}}</text></view>
							<view class="f-24 col-gray-88">x{{item.num}}</view>
						</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between mb32">
						<view class="col-brank-22">商品金额</view>
						<view class="t-b f-32 col-brank-20 f-b f-DINPro"><text
								class="f-24">¥</text>{{detail.originMoney}}
						</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between mb32">
						<view class="col-brank-22">餐具费</view>
						<view class="t-b f-32 col-brank-20 f-b f-DINPro"><text
								class="f-24">¥</text>{{detail.tablewareMoney}}
						</view>
					</view>

					<view class="dis-flex flex-y-center flex-x-between mb32">
						<view class="col-brank-22">店铺满减</view>
						<view class="t-b f-32 col-red-d9 f-b f-DINPro"><text class="f-24">-¥</text>{{detail.preferentialMoney}}</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between mb32">
						<view class="col-brank-22">店铺红包</view>
						<view class="t-b f-32 col-red-d9 f-b f-DINPro"><text class="f-24">-¥</text>{{detail.couponPreferential}}</view>
					</view>
					<!-- 			<view class="dis-flex flex-y-center mt30 flex-x-between">
						<view class="dis-flex flex-y-center">
							<image class="wh28 mr10" src="/static/img/red-back.png"></image>
							<view class="f-28 col-brank-20">校U送红包</view>
						</view>
						<view class="f-24 col-red-d9 f-b mr5 f-DINPro"><text>-¥</text><text class="f-32">0</text></view>
					</view> -->
					<view class="border-t-f7 pt25 mt24 col-gray-33 dis-flex flex-y-center flex-x-end">
						<text class="mr15">合计</text>
						<text class="t-b f-40 col-red-d9 f-b f-DINPro"><text
								class="f-28">¥</text>{{detail.money}}</text>
					</view>
				</view>
			</view>

			<view class="bg-white-ff radio-16 mt24  cont24" v-if="detail.delivery_mode==2">
				<view class="f-28 f-b col-gray-33">就餐信息</view>
				<!-- 没有用餐人 暂时屏蔽 -->
				<!-- <view class="pt32 dis-flex flex-y-center flex-x-between">
				<view class="f-28 col-gray-88">用餐人</view>
				<view class="f-28 col-brank-22">沈生生</view>
			</view> -->
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 col-gray-88">用餐人联系方式</view>
					<view class="f-28 col-brank-22">{{detail.received_tel}}</view>
				</view>
			</view>
			<view class="bg-white-ff radio-16 mt24  cont24">
				<view class="f-28 f-b col-gray-33">订单信息</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 col-gray-88">订单号</view>
					<view class="f-28 col-brank-22" @tap="copy(detail.outTradeNo)">{{detail.outTradeNo}} <text
							class="f-24 ml15 col-red-d9">复制</text></view>
				</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between" v-if="detail.payMode">
					<view class="f-28 col-gray-88">支付方式</view>
					<view class="f-28 col-brank-22">{{detail.payMode.text}}</view>
				</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 col-gray-88">下单时间</view>
					<view class="f-28 col-brank-22">{{formateTime(detail.createdAt)}}</view>
				</view>
			</view>
			<view class="bg-white-ff radio-16 mt24  cont24">
				<view class="dis-flex flex-x-between">
					<view class="f-28 ">订单备注</view>
					<view class="f-28 t-r col-brank-22 w-70">{{detail.user_note||'暂无备注'}}</view>
				</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 ">餐具数量</view>
					<view class="f-28 col-brank-22">{{detail.tablewareNum}}份</view>
				</view>
			</view>
			<view class="btn w-100 bg-white-ff dis-flex fixed-bottom box-shad-t flex-y-center flex-x-between">
				<view class="t-b" v-if="detail.order_status==1">
					<text class="f-24 col-brank-20 mr16">待支付:</text>
					<text class=" f-40 col-red-d9 f-b f-DINPro"><text class="f-28">¥</text>{{detail.money}}</text>
				</view>
				<!-- 1代付款 2.已付款3.已接单 4已出货 5已取消 6 申请退款 7推送通过 8退款拒绝 9 已拒单 -->
				<view class="dis-flex flex-y-center  flex-x-end " :class="detail.order_status!=1?'w-100':''">
					<!-- 待支付和商家未接单都是取消订单 不需要经过商家同意 申请退款 -->
					<view class="btn-order border-dd col-brank-20 f-24" @tap="applyRefund(2)" v-if="detail.state==1">
						取消订单</view>
					<!-- 已付款 已接单 可申请退款 -->
					<view class="btn-order border-dd col-brank-20 f-24" @tap="applyRefund(1)"
						v-if=" detail.state==2||detail.state==3">
						申请退款</view>
					<!--只有待支付有立即支付按钮 -->
					<view class="btn-order bg-red-d6-ec col-white-ff f-24" v-if="detail.state==1" @tap="pay">立即支付
					</view>
					<view class="btn-order border-dd col-brank-20 f-24"
						v-if="detail.state==1||detail.state==4||detail.state==5||detail.state>=7" @tap="delOrder()">删除订单
					</view>
					<!-- 只要不是待支付  退款拒绝的状态都可以再来一单 -->
					<view class="btn-order border-dd col-brank-20 f-24"
						v-if="detail.state!=1&&detail.state!=8&&detail.state!=9" @tap="anotherOrder">再来一单</view>

					<!-- 这里是校u优选订单的状态 暂时注释-->
					<!-- <block v-else-if="detail.order_status!=1&&detail.order_status!=11">
					<view class="btn-order border-dd col-brank-20 f-24" v-if="id==2">查看物流</view>
					<view class="btn-order border-dd col-brank-20 f-24" v-if="id==3">查看券码</view> 	
				</block> -->

					<view class="btn-order border-dd col-brank-20 f-24"
						v-if="detail.order_status==9||detail.order_status==10||detail.order_status==11">退款进度</view>

				</view>
			</view>
			<!-- 退款取消弹窗 -->
			<view :catchtouchmove="true">
				<u-popup :show="cancelShow" mode="center" :safeAreaInsetBottom="false" round="32rpx">
					<view class="win-box-mobile  box-size bg-white-ff radio-30">
						<view class="f-32 w-100 t-c f-b">{{title}}</view>
						<view class="f-28 t-c mt20">{{content}}</view>
						<view class="dis-flex flex-y-center flex-x-between mt40">
							<view class="btn-win t-c bg-gray-ef radio-40" @tap="cancelClick">确定</view>
							<view class="btn-win t-c bg-red-d6-ec col-white-ff radio-40" @tap="cancelShow=false">我在想想
							</view>
						</view>
					</view>
				</u-popup>
			</view>
		</view>
		<null-data :title="msg" v-else></null-data>
	</view>
</template>

<script>
	import * as util from '@/common/util.js'
	export default {
		data() {
			return {
				id: '', //订单id
				detail: {
					store: {}
				},
				cancelShow: false,
				msg: "",
				content: "", //取消订单或退款的提示语
				title: "", //取消订单或退款
				type: 0 ,// 1：退款 2：取消订单 
				
			};
		},
		onLoad(e) {
			this.id = e.id
		},
		onShow() {
			this.getOrderInfo()
		},
		methods: {
			//再来一单
			anotherOrder() {
				uni.navigateTo({
					url: "/pagesIndex/page/diningroom/canteenshop/canteenshop?id=" +
						this.detail.storeId +
						"&table=" + "当前桌" +
						"&tableId=" + this.detail.tableId +
						"&name=" + this.detail.store.name +
						"&orderId=" + this.id
				})
			},
			//跳转商品详情
			goodsDetail(id) {
				uni.navigateTo({
					url: '/pagesIndex/page/diningroom/stwaresdetails/stwaresdetails?id=' + id
				})
			},
			//跳转商家详情
			storeDetail() {
				uni.navigateTo({
					url: '/pagesIndex/page/diningroom/canteenshop/canteenshop?id=' +
						this.detail.store.merchant_id +
						"&table=" + '当前桌' +
						"&tableId=" + this.detail.tableId +
						"&name=" + this.detail.store.name
				})
			},
			//type=2取消订单或者申请退款type=1
			applyRefund(type) {
				this.type = type;
				if (type == 2) {
					this.title = '温馨提示'
					this.content = '是否确定取消订单？'
				} else {
					this.title = '温馨提示'
					this.content = '是否确定退款？'
				}
				this.cancelShow = true
			},
			cancelClick() {
				//退款  商家未接单可直接取消订单
				if (this.type == 1 && this.detail.state != 2) {
					this.orderRefund()
				}
				if (this.type == 1 && this.detail.state == 2) {
					this.getOrderCancelOrder()
				}
				//订单取消（未支付）
				if (this.type == 2) {
					this.getOrderCancelOrder()
				}
				this.cancelShow = false
			},
			//订单退款
			async orderRefund() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status
				} = await that.$api.instoreOrderRefund({
					order_id: this.id,
					cancel_reason: '申请退款',
				})
				uni.hideLoading()
				if (status == 200) {
					uni.showModal({
						title: "温馨提示",
						content: "已申请退款，请等待商家确认",
						cancelShow: false
					})
					etTimeout(function() {
						that.getOrderInfo()
						that.cancelShow = false
					}, 500)
				}
			},
			//订单取消（未支付）
			async getOrderCancelOrder() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status
				} = await that.$api.instoreOrderCancel({
					order_id: this.id,
				})
				uni.hideLoading()
				if (status == 200) {
					this.$u.toast("订单已取消")
					setTimeout(function() {
						that.getOrderInfo()
						that.cancelShow = false
					}, 500)
				}
			},
			//删除订单
			delOrder() {
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
								order_id: that.id,
							})
							uni.hideLoading()
							if (status == 200) {
								that.$u.toast("删除成功")
								setTimeout(function() {
									uni.navigateBack()
								}, 500)
							}
						}
					}
				})

			},
			//立即支付
			pay() {
				uni.navigateTo({
					url: '/pagesIndex/page/diningroom/stpayofforder/stpayofforder?id=' + this.id
				})
			},
			//订单详情接口
			async getOrderInfo() {
				console.log('订单详情')
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.inStoreOrderInfo({
					order_id: this.id,

				})
				uni.hideLoading()
				if (status == 200) {
					console.log(data);
					this.detail = data
					this.msg = msg
				}
			},
			finish() {
				this.getOrderInfo()
			},
			//复制
			copy(data) {
				uni.setClipboardData({
					data: data
				})
				this.$u.toast("复制成功")
			},

			formateTime(time) {
				return util.formatTime(time * 1000)
			}
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
</style>
