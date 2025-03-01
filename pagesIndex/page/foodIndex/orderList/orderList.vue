<template>
	<view class="padd-flex padd-b-20">
		<u-sticky bgColor="#fff">
			<u-tabs :list="list1" @click="click" lineWidth="15" lineColor="#EC434B" :activeStyle="{
					color: '#202020',
					fontWeight: '700',
					fontSize: '32rpx',
					paddingLeft: '10rpx',
					paddingRight: '10rpx'
				}" :inactiveStyle="{
					color: '#202020',
					fontSize: '28rpx',
					paddingLeft: '10rpx',
					paddingRight: '10rpx'
				}"></u-tabs>
		</u-sticky>

		<view class="padd-0-20">

			<view class="padd-24 bor-r-16 m-t-20 bgc-ff" v-for="(item,index) in list" :key="index">

				<view class="flex-jus-spa flex-al-c">
					<view class="flex-al-c f-32 color-20 fw-500">
						{{item.store.name}}
						<image class="wh-28 m-l-8" src="@/static/img/ico-gengduo.png" mode=""></image>
					</view>
					<view class="f-24 color-D93038">
						{{item.state_text}}
					</view>
				</view>


				<view class="dis-flex flex-y-center" v-if="item.goods.length==1"
					@tap="onLinkx('/pagesUser/page/delicacyshopdetail/delicacyshopdetail?id='+item.id+'&order_type='+item.order_type,item)">
					<image class="wh148 radio-8 mr24" mode="aspectFill" :src="item.goods[0].icon"></image>
					<view class="w-75 goods-r dis-flex flex-x-between flex-dir-column">
						<view>
							<view class="f-28 f-b w-100 mb5 onelist-hidden">{{item.goods[0].name}}</view>
							<view class="f-24 label  w-100 onelist-hidden"><text class="mr10"
									v-if="item.goods[0].attribute">{{item.goods[0].attribute}}</text><text
									v-if="item.goods[0].material">{{item.goods[0].material}}</text></view>
						</view>

						<view class="col-gray-88 f-24">共{{item.goods[0].num}}件</view>
					</view>
				</view>

				<view v-else class="dis-flex flex-y-center p-r"
					@tap.stop="onLinkr('/pagesUser/page/delicacyshopdetail/delicacyshopdetail?id='+item.id+'&order_type='+item.order_type,item)">
					<scroll-view class="scroll-goods" scroll-x="true">
						<image class="wh-148 radio-8 mr16" mode="aspectFill" v-for="(items,indexs) in item.goods"
							:src="items.icon">
						</image>
					</scroll-view>
					<view class="length dis-flex flex-y-center flex-dir-column col-gray-88 f-24">
						<view>共</view>
						<!-- <view>{{item.order_info.num}}</view> -->
						<view>件</view>
					</view>
				</view>




				<view class="flex-jus-spa flex-al-c m-t-20">
					<view class="f-24 color-888">
						下单时间：{{item.create_time}}
					</view>
					<view class="flex-al-c">
						<text class="f-24 color-888">合计</text>
						<text class="f-24 color-20 fw-700 m-l-16">¥</text>
						<text class="color-20 f-36 fw-700 m-l-4">{{parseFloat(item.money).toFixed(2)}}</text>
					</view>
				</view>

				<view class="flex-right flex-centerd">
					<view class="btn-order border-dd col-brank-20 m-r-20 f-24 m-t-20" v-if="item.order_status==1"
						@tap.stop="cancelled(item)">
						取消订单</view>

					<view class="flex-row-r m-t-20 " v-if="item.order_status==1" @tap.stop="pay(item.id,item)">
						<view class="orderList-btn flex-c-c">
							立即支付
						</view>
					</view>
				</view>


				<view class="flex-right">
					<view class="btn-order border-dd col-brank-20 f-24 " @tap="onLinkxr(item)"
						v-if="item.order_status==2">
						去使用</view>

					<view class="btn-order border-dd col-brank-20 f-24 " @tap="refund(item)"
						v-if="item.order_status==2">
						退款</view>
				</view>
				
			

				<view class="flex-right">
					<view class="btn-order border-dd col-brank-20 f-24" @tap="delOrder(item)"
						v-if="item.order_status==4">
						删除订单</view>
					<view class="btn-order border-dd col-brank-20 f-24" @tap="anotherOrder(item)"
						v-if="item.order_status==3 || item.order_status==4">
						再来一单</view>
					<view class="btn-order bg-red-d6-ec col-white-ff f-24" v-if="item.order_status==3"
						@tap.stop="addComment(item.id,item.store.merchant_id)">评价
					</view>
				</view>

			</view>


			<null-data title="暂无订单" v-if="list.length==0"></null-data>
			<u-loadmore v-else-if="list.length>1" :status="status" fontSize="26rpx" color="#999" />

		</view>
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
					name: '待使用'
				}, {
					name: '待评价'
				}, {
					name: '退款'
				}],
				list: [],
				page: 1,
				tabAct: "",
			}
		},

		onShow() {
			this.getOrderTakeOutList()
		},
		onReachBottom() {
			if (this.status != 'nomore') {
				this.getOrderTakeOutList(true)
			}
		},

		methods: {

			onLinkx(url) {
				uni.navigateTo({
					url: url
				})
			},
			onLinkr(url) {
				uni.navigateTo({
					url: url
				})
			},



			click(item) {
				this.tabAct = item.index
				this.getOrderTakeOutList()
				console.log('item', item);
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
				} = await that.$api.foodorderlist({
					page: this.page,
					order_status: this.tabAct,
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


			//去使用
			onLinkxr(item) {
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/sbuySuccess/sbuySuccess?qrcode=' + JSON.stringify(item.qrcode)
				})
			},

			//评价
			addComment(id, merchant_id) {
				console.log(id, merchant_id)

				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/order/addComment/addComment?id=' + id +
						'&order_type=2&merchant_id=' + merchant_id
				})
			},

			//立即支付
			pay(id, item) {

				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/delicacypayment/delicacypayment?id=' + id
				})
			},

			//再来一单
			anotherOrder(item) {
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/homepage/homepage?id=' + item.store.merchant_id
				})
			},

			//退款
			refund(item) {
				uni.navigateTo({
					url: '/pagesUser/page/orderList/cancelList/cancelList?order_id=' + item.id + '&order_type=' + 2
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
								that.list.splice(index, 1)
							}
						}
					}
				})
			
			},


			//取消订单
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
								that.$u.toast("取消订单成功")
								
								that.getOrderTakeOutList()

							}
						}
					}
				})

			},
		}
	}
</script>

<style>
	.orderList-btn {
		width: 160rpx;
		height: 56rpx;
		color: #fff;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 28rpx;
		font-size: 24rpx;
	}

	.orderList-btn2 {
		width: 160rpx;
		height: 56rpx;
		color: #202020;
		border-radius: 28rpx;
		font-size: 24rpx;
		border: 1rpx solid #DDDDDD;
	}

	.orderList-shopNum {
		position: absolute;
		right: 0;
		background: #FFFFFF;
		opacity: 0.9;
		box-sizing: border-box;
		padding: 24rpx 0rpx 38rpx 22rpx;
	}

	.padd-flex {
		padding-bottom: constant(safe-area-inset-bottom); // 核心代码
		padding-bottom: env(safe-area-inset-bottom); // 核心代码
	}

	.btn-order {
		width: 160rpx;
		height: 56rpx;
		border-radius: 28rpx;
		line-height: 56rpx;
		text-align: center;
		margin-left: 20rpx;
	}
</style>
