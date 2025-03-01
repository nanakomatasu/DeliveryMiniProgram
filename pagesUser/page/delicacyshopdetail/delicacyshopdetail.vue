<template>
	<view>
		<view class="pl32 pr32 box-size p-b-150" v-if="detail">

			<view class="head pt32 pb24">
				<view class="dis-flex flex-y-center flex-x-between">
					<view class="dis-flex flex-y-center f-32 f-600">
						{{detail.state_text}}
					</view>
				</view>
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
								class="f-24">¥</text>{{detail.origin_money}}
						</view>
					</view>

					<view class="border-t-f7 pt25 mt24 col-gray-33 dis-flex flex-y-center flex-x-end">
						<text class="mr15">合计</text>
						<text class="t-b f-40 col-red-d9 f-b f-DINPro"><text
								class="f-28">¥</text>{{detail.money}}</text>
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
					<view class="f-28 col-brank-22" @tap="copy(detail.out_trade_no)">{{detail.out_trade_no}} <text
							class="f-24 ml15 col-red-d9">复制</text></view>
				</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between" v-if="detail.pay_mode.text">
					<view class="f-28 col-gray-88">支付方式</view>
					<view class="f-28 col-brank-22">{{detail.pay_mode.text}}</view>
				</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 col-gray-88">下单时间</view>
					<view class="f-28 col-brank-22">{{detail.create_time}}</view>
				</view>
			</view>

			<view class="btn w-100 bg-white-ff dis-flex fixed-bottom box-shad-t flex-y-center flex-x-between">
				<!-- <view class="t-b" v-if="detail.order_status==1">
					<text class="f-24 col-brank-20 mr16">待支付:</text>
					<text class=" f-40 col-red-d9 f-b f-DINPro"><text class="f-28">¥</text>{{detail.money}}</text>
				</view> -->
				<!--  1未付款,2已付款,3已接单,4配送中/待取货,5已收货,6已评价,7已取消,8.拒单，9申请退款,10已退款，11退款拒绝 -->
				<view class="dis-flex flex-y-center  flex-x-end w-100" :class="detail.order_status!=1?'w-100':'' "
					v-if="detail.order_status==2||detail.order_status==1||detail.order_status==3||detail.order_status==4||detail.order_status==5">
					<view class="btn-order border-dd col-brank-20 f-24" @tap="touse" v-if="detail.order_status==2">
						去使用</view>


					<view class="btn-order border-dd col-brank-20 f-24" @tap="refund(detail)"
						v-if="detail.order_status==2">
						退款</view>

					<view class="btn-order border-dd col-brank-20 f-24" @tap="anotherOrder"
						v-if="detail.order_status==3">
						再来一单</view>


					<view class="flex-centerd">
						<view class="btn-order border-dd col-brank-20 m-r-20 f-24 " v-if="detail.order_status==1"
							@tap.stop="cancelled(detail)">
							取消订单</view>

						<view class="flex-row-r" v-if="detail.order_status==1" @tap.stop="pay(detail.id,detail)">
							<view class="btn-order border-dd  m-r-20 f-24 bg-red-d6-ec col-white-ff">
								立即支付
							</view>
						</view>




						<view class="btn-order border-dd col-brank-20 m-r-20 f-24 "
							v-if="detail.order_status==4" @tap.stop="delOrder(detail,index)">
							删除订单</view>

						<view class="flex-row-r" v-if="detail.order_status==4||detail.order_status==5"
							@tap.stop="anotherOrder(detail)">
							<view class="btn-order border-dd col-brank-20 m-r-20 f-24 ">
								再来一单
							</view>
						</view>






					</view>



					<!-- 待支付和商家未接单都是取消订单 不需要经过商家同意 申请退款 -->
					<!-- <view class="btn-order border-dd col-brank-20 f-24" @tap="applyRefund(2)"
						v-if="detail.order_status==1||detail.order_status==2">
						取消订单</view> -->
					<!-- 商家已接单  商品配送  已收货都可以申请退款  已经评论了不能申请退款 -->
					<!-- <view class="btn-order border-dd col-brank-20 f-24" @tap="applyRefund(1)"
						v-if=" detail.order_status==3||detail.order_status==4">
						申请退款</view> -->
					<!--只有待支付有立即支付按钮 -->
					<!-- <view class="btn-order bg-red-d6-ec col-white-ff f-24" v-if="detail.order_status==1" @tap="pay">立即支付
					</view>
					<view class="btn-order border-dd col-brank-20 f-24"
						v-if="detail.order_status==6||detail.order_status==7||detail.order_status==8||detail.order_status==10||detail.order_status==11"
						@tap="delOrder">删除订单</view> -->
					<!-- 只要不是待支付  退款拒绝的状态都可以再来一单 -->
					<!-- 		<view class="btn-order border-dd col-brank-20 f-24"
						v-if="detail.order_status!=1&&detail.order_status!=11" @tap="anotherOrder">再来一单</view> -->
					<!-- 只有自提且商家已接单取货才有确认取餐按钮 -->
					<!-- <view class="btn-order bg-red-d6-ec col-white-ff f-24"
						v-if="detail.delivery_mode==2&&detail.order_status==4" @tap="confirmReceivingOrder">确认取餐
					</view> -->
					<!-- <view class="btn-order bg-red-d6-ec col-white-ff f-24" v-if="detail.order_status==5"
						@tap.stop="addComment">
						评价</view> -->
					<!-- <view class="btn-order border-dd col-brank-20 f-24"
						v-if="detail.order_status==9||detail.order_status==10||detail.order_status==11">退款进度</view> -->
				</view>
			</view>
		</view>
		<null-data :title="msg" v-else></null-data>
	</view>
</template>

<script>
	import MapUtil from "@/common/mapUtil.js"
	export default {
		data() {
			return {
				id: '', //订单id
				detail: null,
				cancelShow: false,
				order_type: '', //订单类型


			};
		},
		onLoad(e) {
			this.id = e.id
			this.order_type = e.order_type || ''
		},
		onShow() {
			this.getOrderTakeOutInfo()
		},
		methods: {
			

			//跳转商品详情
			goodsDetail(id) {
				uni.navigateTo({
					url: "/pagesIndex/page/foodIndex/homepage/homepage?id=" + this.detail.store.merchant_id
				})
			},
			//跳转商家详情
			storeDetail() {
				// uni.navigateTo({
				// 	url: '/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id=' + this.detail.store
				// 		.merchant_id
				// })
			},

			//去使用
			touse() {
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/sbuySuccess/sbuySuccess?qrcode=' + JSON.stringify(this.detail
						.qrcode)
				})
			},


			//再来一单
			anotherOrder(item) {

		console.log(item)
				//团购再来一单

				uni.navigateTo({

					url: '/pagesIndex/page/foodIndex/delicacymycart/delicacymycart?orderId=' + item
						.id

				})
			},




			//订单详情接口
			async getOrderTakeOutInfo() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.delicacyorderxq({
					order_id: this.id,
				})
				uni.hideLoading()
				if (status == 200) {
					this.detail = data
				}
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
			cancelled(item) {
				console.log(item)
				var that = this
				uni.showModal({
					title: "温馨提示",
					content: "是否取消订单",
					async success(res) {
						if (res.confirm) {
							uni.showLoading({
								title: "正在加载中"
							})
							const {
								data,
								status
							} = await that.$api.ordercancelled({
								order_id: item.id,
								order_type: 2, //1外卖，2附近，3优选
							})
							uni.hideLoading()
							if (status == 200) {
								that.getOrderTakeOutInfo()
								that.$u.toast("取消订单成功")
							}
						}
					}
				})

			},

			//删除订单
			delOrder(item, index) {
				console.log(item)
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
								order_id: item.id,
								order_type: 2,
							})
							uni.hideLoading()
							if (status == 200) {
								that.$u.toast("删除成功")
								uni.navigateBack()
							}
						}
					}
				})

			},



			//退款
			refund(item) {

				console.log(item)
				uni.navigateTo({
					url: '/pagesUser/page/orderList/cancelList/cancelList?order_id=' + item.id +
						'&order_type=' + item.order_status

				})
			},




			//立即支付
			pay(id, item) {

				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/delicacypayment/delicacypayment?id=' + id
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
</style>
