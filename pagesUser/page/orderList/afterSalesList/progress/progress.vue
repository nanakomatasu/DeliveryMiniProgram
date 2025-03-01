<template>
	<view>
		<view class="dis-flex mt40 mb40 flex-y-center flex-x-center flex-dir-column">
			<view class="dis-flex flex-y-center flex-x-center flex-dir-column" v-if="detail.order_status==10">
				<image class="wh80 mb24" src="/pagesUser/static/cancel-icon.png"></image>
				<view class="f-40 col-brank-22 f-b">退款成功 {{detail.money}}元</view>
			</view>
			
			<view class="dis-flex flex-y-center flex-x-center flex-dir-column" v-if="detail.order_status==11">
				<image class="wh80 mb24" src="/pagesUser/static/progress-icon01.png"></image>
				<view class="f-40 col-brank-22 f-b">退款失败</view>
			</view>
			
			<view class="dis-flex flex-y-center flex-x-center flex-dir-column" v-if="detail.order_status==9">
				<image class="wh80 mb24" src="/pagesUser/static/progress-icon02.png"></image>
				<view class="f-40 col-brank-22 f-b">退款中 {{detail.money}}元</view>
			</view>
		</view>
		<view class="pl24 pr24  box-size ">
			<view class="box-size pl24 mb20 pr24 pt32 pb32 radio-16 bg-white-ff">
				<view class=" mb48 dis-flex flex-y-center flex-x-between">
					<view class="f-28 f-b col-gray-33">实际退款金额</view>
					<view>{{detail.money}}元</view>
				</view>
				<view class=" dis-flex flex-y-center flex-x-between">
					<view class="f-28 f-b col-gray-33">申请退款金额</view>
					<view>{{detail.money}}元</view>
				</view>
			</view>
			<view class="box-size  radio-16 bg-white-ff cont24-32 mb20" v-if="detail.order_status==11 || detail.order_status==9">
				<view class="f-32 f-b mb24">退款进度</view>
				<view class="progress">
					<view class="progress-item" v-for="(item,index) in list" :key="index" v-if="detail.order_status==11">
						<view class="">
							<view class="dis-flex mb20 flex-y-center p-r title"
								:class="[item.status==1?'flex-x-between':'']" >
								<view class="dis-flex flex-y-center">
									<view class="icon" :class="index==0?'bg-red-d6-ec':'bg-gray-d8'"></view>
									<view class="f-28 f-b" :class="index==0?'col-brank-22':'col-gray-88'">
										{{item.title}}
									</view>
								</view>
								<!-- <view class="btn-line f-24 border-red-eb radio-28 col-red-d9  t-c "
									v-if="item.status==1&&index==0">平台介入</view> -->
							</view>
							<!-- <view class="f-24 col-gray-88 mb20 pl45">{{item.date}}</view> -->
							<view class="f-24  pl45" :class="index==0?'col-brank-20':'col-gray-88'">{{item.tips}}</view>
						</view>
					</view>
					
					<view class="progress-item" v-for="(item,index) in list2" :key="index" v-if="detail.order_status==9">
						<view class="" >
							<view class="dis-flex mb20 flex-y-center p-r title"
								:class="[item.status==1?'flex-x-between':'']" >
								<view class="dis-flex flex-y-center">
									<view class="icon" :class="index==0?'bg-red-d6-ec':'bg-gray-d8'"></view>
									<view class="f-28 f-b" :class="index==0?'col-brank-22':'col-gray-88'">
										{{item.title}}
									</view>
								</view>
								<!-- <view class="btn-line f-24 border-red-eb radio-28 col-red-d9  t-c "
									v-if="item.status==1&&index==0">平台介入</view> -->
							</view>
							<!-- <view class="f-24 col-gray-88 mb20 pl45">{{item.date}}</view> -->
							<view class="f-24  pl45" :class="index==0?'col-brank-20':'col-gray-88'">{{item.tips}}</view>
						</view>
					</view>
					
					
				</view>
			</view>
			<view class="box-size  radio-16 bg-white-ff cont24-32 mb20">
				<view class="f-32 f-b mb24">退款信息</view>
				<view class="dis-flex mb20" v-for="(itemxx,index) in goodsList" :key="index">
					<image class="mr20 wh96 radio-8" :src="itemxx.icon"></image>
					<view class="goods-item-r flex-x-between w-82 dis-flex flex-dir-column flex-x-between">
						<view class="dis-flex w-100 flex-y-center flex-x-between">
							<view class="w-70 onelist-hidden f-28 f-b">{{itemxx.name}}</view>
							<view class="t-b col-red-d9 f-32 f-b">
								<text class="f-24">¥</text>
								{{itemxx.money}}
							</view>
						</view>
						<view class="f-24 col-gray-88">x{{itemxx.num}}</view>
					</view>
				</view>
				<view class="pt12  pb32 dis-flex flex-y-center flex-x-between">
					<view class="col-gray-88 f-24">退款原因</view>
					<view class="f-24">{{detail.cancel_reason}}</view>
				</view>
				<view class="dis-flex flex-y-center flex-x-between">
					<view class="col-gray-88 f-24">订单号码</view>
					<view class="f-24">{{detail.out_trade_no}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				//商品列表
				goodsList: [],
				//进度列表
				list: [{
						title: "商家拒绝退款",
						date: "2022-01-11 11:58:10",
						// tips: "拒绝原因：餐已做好，且正在配送中，不能退",
						status: 1,
					},
					// {
					// 	title: "校U审核已通过",
					// 	date: "2022-01-11 11:58:10",
					// 	tips: "校U已受理您的退款申请，待商家审核",
					// }, 
					{
						title: "申请取消订单",
						date: "2022-01-11 11:58:10",
						tips: "您已申请取消订单，待商家审核",
					}
				],
				list2: [
					
					{
						title: "申请取消订单",
						date: "2022-01-11 11:58:10",
						tips: "您已申请取消订单，待商家审核",
					}
				],
				// order_status
				order_id: '', //订单id
				detail: ''
			};
		},
		onLoad(e) {
			this.order_id = e.id
			console.log(e.id);
			this.getOrderTakeOutInfo()
		},
		methods: {

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
				} = await that.$api.orderTakeOutInfo({
					order_id: this.order_id,

				})
				uni.hideLoading()
				if (status == 200) {
					console.log('退款信息',data.goods);
					console.log(data);
					
					this.detail = data
					// this.msg = msg
					// this.riderLat = data.rider_lat;
					// this.riderLng = data.rider_lng;
					// this.myLat = data.lat;
					// this.myLng = data.lng;
					// this.store = data.store;
					// //地图标点
					// this.covers[0].latitude = this.myLat;
					// this.covers[0].longitude = this.myLng;
					// this.covers[1].latitude = this.riderLat;
					// this.covers[1].longitude = this.riderLng;
					// this.covers[2].latitude = this.store.lat;
					// this.covers[2].longitude = this.store.lng;
					
					// 退款信息
					this.goodsList = data.goods
					console.log('退款信息',this.goodsList);
					
					

				}
			},

		}
	}
</script>

<style lang="scss">
	.btn-line {
		width: 128rpx;
		line-height: 48rpx;
		height: 48rpx;
	}

	.progress-item {
		padding-bottom: 60rpx;
		position: relative;
	}

	.progress-item:before {
		content: '';
		width: 1px;
		height: 100%;
		background: #f7f7f7;
		position: absolute;
		left: 12rpx;
		top: 14rpx;

	}

	.progress-item:last-child {
		padding-bottom: 0;
	}

	.progress-item:last-child::before {
		content: none;
	}

	.icon {
		width: 24rpx;
		height: 24rpx;
		border-radius: 100%;
		margin-right: 20rpx;
	}
</style>
