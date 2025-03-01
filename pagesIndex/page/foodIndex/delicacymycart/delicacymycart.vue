<template>
	<view>
		<!-- <u-sticky>
			<view class="dis-flex bg-gray-f7 pt24 pb30 flex-y-center  pl40 pr40 box-size flex-x-between">
				<view class="col-brank-20 f-28 pl40 pr40 tab-item" :class="tabAct==item.id?'tab-sel f-b':''"
					v-for="(item,index) in tabList" :key="index" @tap.stop="changeTab(item.id)">{{item.name}}</view>
			</view>
		</u-sticky> -->



		<view class="cont">
			<view class="radio-16 bg-white-ff pl24 pr24 box-size mb20 pb24" v-for="(item,index) in list" :key="index">
				<view class=""></view>
				<view class="mt20">


					<label class="dis-flex flex-y-center sel-all mb8" @tap.stop="commodity(item,index)">
						<image class="unchecked m-r-10"
							:src="indexr==index? '/static/img/select.png':'/static/img/unchecked.png'" mode=""></image>
						<view class="dis-flex pt20 pb20 flex-y-center border-b-f7">
							{{item.name}}
						</view>
					</label>


					<!-- <view class="dis-flex flex-y-center ml45 mb16">
						<view class="label radio-4 mr16  f-22 border-red-eb col-red-dd">满30减15</view>
						<view class="label radio-4 mr16  f-22 border-red-eb  col-red-dd">60减28</view>
					</view> -->
					<checkbox-group class="goods-box ">

						<label class="dis-flex flex-y-center mb40 goods-item" v-for="(items,indexs) in item.goods"
							:key="indexs" @tap="store(items.merchant_id)">

							<!-- <label class="dis-flex flex-y-center sel-all mb8" @tap.stop="commodityx(items,indexs,item)">
								<image class="unchecked m-r-10"
									:src="cooperationt.indexOf(items.cart_id) != -1? '/static/img/select.png':'/static/img/unchecked.png'"
									mode=""></image>
							</label> -->
							<view class="wh180 p-r mr24">
								<image mode="aspectFill" class="wh180  radio-8" :class="items.num==0?'opacity-5':''"
									:src="items.img"></image>
								<view class="wh88 radio-100 num-null col-white-ff" v-if="items.num==0">无货</view>
							</view>

							<view class="w-70 h-100 dis-flex flex-x-between flex-dir-column">
								<view class="">
									{{items.name}}
								</view>
								<view class="dis-flex flex-y-center flex-x-between">
									<view class="t-b">
										<text class=" f-36 f-b" :class="items.num==0?'col-red-ec':'col-red-d9'">
											<text class="f-24">¥</text>
											<text>{{items.price}}</text>
										</text>
										<text class="text-line f-24 col-gray-88 ml10">¥{{items.scribe_price}}</text>
									</view>
								</view>
								<view class=" flex-right ">
									<view class="dis-flex flex-y-center" v-if="items.num!=0">
										<view class="del radio-8"
											:class="items.cartNum<=1?'border-d4':'bg-red-d6-ec col-white-ff'"
											@tap.stop="delNum(items,item,indexs,index)">-</view>
										<view class="f-28 col-brank-20  cart-num">{{items.num}}</view>
										<view class="del radio-8 bg-red-d6-ec col-white-ff"
											@tap.stop="addNum(items,item,indexs,index)">+</view>
									</view>
								</view>
							</view>
						</label>
					</checkbox-group>

				</view>
			</view>
			<null-data title="购物车暂无商品" v-if="list.length==0"></null-data>
			<!-- <u-loadmore v-else-if="list.length>1" :status="status" fontSize="26rpx" color="#999" /> -->
		</view>

		<view v-if="isMessage==0"
			class="dis-flex btn flex-y-center pl32 pr32 box-size w-100 bg-white-ff flex-x-between fixed-bottom box-shad-t">
			<view class="" @tap="onMessage">管理</view>
			<view class="dis-flex flex-y-center flex-x-end w-80">
				<view class="w-65">
					<view class="w-100 dis-flex flex-x-end flex-y-center">
						<view class="">
							<!-- <text class="f-24 col-gray-88 mr10">已选4件</text> -->
							<text class="f-24  mr10">合计:</text>
						</view>
						<text class=" f-36 t-b f-b col-red-d9">
							<text class="f-24">¥</text>
							<text>{{parseFloat(amount).toFixed(2)||'0'}}</text>
						</text>
					</view>
					<!-- <view class="f-24 t-r col-red-d9 w-100">
						<text class="mr10">优惠券5元</text>
						<text>共减¥29.0</text>
					</view> -->
				</view>
				<view class="col-white-ff btn-order bg-red-d6-ec t-c radio-48" @tap="onlink()">去结算
				</view>
			</view>
		</view>

		<view v-else
			class="dis-flex btn flex-y-center pl32 pr32 box-size w-100 bg-white-ff flex-x-between fixed-bottom box-shad-t">
			<view class=" col-red-d9" @tap="onConfirm">完成</view>
			<view class="dis-flex flex-y-center flex-x-end w-80">
				<!-- <view class="border-dd pl40 pr40 f-24 col-brank-20 btn-line radio-28">清空购物车</view> -->
				<view class="border-dd pl40 pr40 f-24 col-brank-20 btn-line  radio-28" @tap="cutout">删除</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				indexr: -1,
				amount: '',
				cooperations: '',
				identifiers: [],
				indes: -1,
				isMessage: 0, //是否是管理
				tabAct: 1,
				page: 1,
				status: "loadmore",
				list: [], //购物车列表
				totalPricelength: 0,
				cooperation: [],
				cooperationt: [],
				cart_ids: "",
				smip: [],
				merchant_id: "",
				orderId:"",
			}
		},
		onShow() {
			this.getCartListsx()
		},
		// onReachBottom() {
		// 	if (this.status != 'nomore') {

		// 		// this.list=this.listx
		// 		this.getCartLists(true)
		// 	} 
		// },
		
		onLoad(option){
			this.orderId = option.orderId;
			if (this.orderId) {
				this.getOrderAgain()
			}
		},

		methods: {
			
			//再来一单
			async getOrderAgain() {
				var that = this
				const {
					data,
					status
				} = await that.$api.orderAgain({
					order_type: 2, 
					order_id: this.orderId,
				})
				if (status == 200) {
							
				}
			},
			
			
			//更改id
			changeTab(id) {
				this.tabAct = id
			},
			//点击管理
			onMessage() {
				this.isMessage = 1
			},
			//点击完成
			onConfirm() {
				this.isMessage = 0
			},

			//删除商品
			cutout() {
				this.cleanup()
				this.indexr = -1
				// if (!this.cooperation||!this.cooperationt) {
				// 	this.cleanup()
				// } else {
				// 	this.$u.toast("请选择您要删除的商品")
				// }
			},

			//商品列表减少加入购物车的数量
			delNum(items, item, indexs, index) {
				this.getTakeoutCartSub(items.cart_id)
				this.indes = index
				this.cooperations = item.merchant_id
			},

			//商品列表添加加入购物车的数量
			addNum(itemsx, item, indexs, index) {
				this.indes = index
				this.getTakeoutCartAdd(itemsx)
			},

			//获取加入购物车接口
			async getTakeoutCartAdd(items) {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.delicacyaddcart({
					merchant_id: items.merchant_id,
					goods_id: items.goods_id,
					num: 1,
				})
				if (status == 200) {
					uni.showToast({
						title: "添加购物车成功",
						icon: "none"
					})
					this.getCartListsx()
				}
			},

			//减少购物车接口
			async getTakeoutCartSub(cart_id) {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.delicacycartreduce({
					cart_id: cart_id
				})
				if (status == 200) {
					uni.showToast({
						title: "数量减少成功",
						icon: "none"
					})
					this.getCartListsx()
				}
			},

			//获取订单列表
			async getCartListsx(cart_ids) {
				let that = this
				const {
					data,
					status
				} = await that.$api.delicacycartlist({
					cart_ids: this.cart_ids || '',
				})
				if (status == 200) {
					that.list = data.list
					this.amount = data.amount
				}
			},

			//清空购物车 或清空某一个商品 
			async cleanup(merchant_id) {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.delicacycartsc({
					cart_ids: this.cart_ids,
				})
				if (status == 200) {
					uni.showToast({
						title: "删除成功",
						icon: "none"
					})
					this.getCartListsx()
				}
			},

			//商户选择
			commodity(item, index) {
				this.merchant_id = item.merchant_id
				this.indexr = index
				this.smip = []
				for (let i = 0; i < item.goods.length; i++) {
					this.smip.push(item.goods[i].cart_id)
				}
				this.cooperationt = this.smip
				this.cart_ids = this.cooperationt.toString(',')
				this.getCartListsx()
			},

			//商户商品选择
			commodityx(items, index, item) {
				console.log(items, index)
				if (this.cooperationt.indexOf(items.cart_id) != -1) { //如果当前点击的建设领域已经选择  就取消选择
					var index = this.cooperationt.indexOf(items.cart_id)
					this.cooperationt.splice(index, 1)
					this.cooperation.splice(index, 1)

					this.cart_ids = this.cooperationt.toString(',')
					this.getCartListsx()
				} else {
					//如果不存在就添加进去列表
					this.cooperation.push(item.merchant_id)
					this.cooperationt.push(items.cart_id)
					this.cart_ids = this.cooperationt.toString(',')
					this.getCartListsx()
				}
			},

			//清结算页面
			onlink(url) {
				if (this.smip != '') {
					uni.navigateTo({
						url: '/pagesIndex/page/foodIndex/order/order?store=' + this.merchant_id + '&goods=' + this
							.cooperationt.toString() + '&type=' + 1
					})
				} else {
					this.$u.toast("请选择商品")
				}
			},

			store(merchant_id) {
				// uni.navigateTo({
				// 	url: '/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id=' + merchant_id
				// })
			}

		},
	}
</script>

<style>
	page {
		background: #f7f7f7;
	}

	.tab-item {
		display: inline-block;

	}

	.cont {
		padding: 0rpx 20rpx 0rpx 20rpx;
		padding-bottom: calc(200rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
	}

	.label {
		height: 28rpx;
		line-height: 28rpx;
		padding: 0 6rpx;
		font-family: PingFangSC-Regular, PingFang SC;
	}

	.del {
		width: 36rpx;
		line-height: 36rpx;
		text-align: center;
		height: 36rpx;
	}

	.cart-num {
		min-width: 40rpx;
		text-align: center;
	}

	.goods-box>.goods-item:last-child {
		margin-bottom: 0;
	}

	.btn {
		height: 100rpx;
	}

	.num-null {
		background: rgba(0, 0, 0, 0.5);
		text-align: center;
		line-height: 88rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.opacity-5 {
		opacity: 0.5;
	}

	.goods-item {
		height: 180rpx;
	}

	.btn-order {
		height: 72rpx;
		min-width: 200rpx;
		padding: 0 10rpx;
		box-sizing: border-box;
		line-height: 72rpx;
		margin-left: 20rpx;
	}

	.btn-line {
		min-width: 160rpx;
		box-sizing: border-box;
		margin-left: 20rpx;
		text-align: center;
		height: 56rpx;
		line-height: 56rpx;
	}

	.unchecked {
		width: 32rpx;
		height: 32rpx;
	}
</style>
