<template>
	<view class="w-100">
		<view class="cont16-24 w-100 fixed-bottom " :class="cartShow?'bg-white-ff z-998  w-100vw':'bg-gray-f7 '">
			<view class="tips_box" v-if="cartShow==false&&cardData.preferential_desc">
				{{ cardData.preferential_desc }}
			</view>
			<view class="dis-flex flex-y-center flex-x-between card-bottom radio-48 bottom-flex bg-black-20 p-r "
				v-if="dy==1">
				<view class="total-l dis-flex flex-y-center  w-80">
					<view class="cart-l dis-flex mr20 p-r flex-y-center" @tap.stop="cartShow=true">
						<image class="wh96" v-if="type == 0"
							:src="cardData.num>0?'/pagesIndex/static/shop-cart-act.png':'/pagesIndex/static/shop-cart.png' ">
						</image>
						<image class="wh96 " v-if="type == 1"
							:src="cardData.num>0?'/pagesIndex/static/ico-tangshi-act.png':'/pagesIndex/static/ico-tangshi.png' ">
						</image>
						<view class="length" v-if="cardData.num">{{cardData.num}}</view>
					</view>
					<scroll-view class="prirce-scroll w-70" scroll-x="true" ::enable-flex="true">
						<view class="" :class="cardData.num>0?'line-h32':'dis-flex flex-y-center'">
							<text class="price col-white-ff  f-40 f-b t-r"><text
									class="f-32 f-n">￥</text>{{ parseFloat(cardData.amount).toFixed(2)}}</text>
							<view class="col-gray-88 f-24  other-price" v-if="cardData.num<=0 && type ==0">预估配送费<text
									class="ml5">¥{{parseFloat(cardData.delivery_fee).toFixed(2) || 0}}</text></view>
							<text class="f-24 col-white-ff text-line ml10"
								v-else>¥{{parseFloat(cardData.scribe_amount).toFixed(2) ||0}}</text>
						</view>
						<view class="f-20 col-white-fe" v-if="cardData.num>0 && type ==0">
							预估配送费¥{{cardData.delivery_fee || 0}}</view>
					</scroll-view>
				</view>

				<view class="col-gray-88 f-24 w-20 onelist-hidden"
					v-if="type==0 &&cardData.num<=0||cardData.amount<cardData.starting_price||0">
					¥{{cardData.starting_price}}起送</view>

				<!-- <view class="bg-red-d6-ec col-white-ff f-32 h-100 t-c btn"
					v-if="type==0&&cardData.num>0&&cardData.amount>=cardData.starting_price"
					@tap="pay(cardData.merchant_id)">去结算</view> -->

				<view class="bg-red-d6-ec col-white-ff f-32 h-100 t-c btn"
					v-if="type==0&&cardData.num>0 && parseFloat(cardData.amount).toFixed(2) >= parseFloat(cardData.starting_price)"
					@tap="pay(cardData.merchant_id)">去结算</view>
				<!-- <view class="color-fff" v-if=" parseFloat(cardData.amount).toFixed(2) > cardData.starting_price ">
					123
				</view> -->
				<view class="bg-red-d6-ec col-white-ff f-32 h-100 t-c btn"
					v-if="type==1&&cardData.num>0 && parseFloat(cardData.amount).toFixed(2) >= parseFloat(cardData.starting_price)"
					@tap="pay(cardData.merchant_id)">去结算</view>

			</view>
		</view>
		<!-- 购物车展开 -->
		<view :catchtouchmove="true">
			<!-- 分享弹窗 -->
			<u-popup :show="cartShow" round="32rpx" @close="cartShow=false" zIndex="997">
				<view class="tips_box" v-if="cardData.preferential_desc">
					{{ cardData.preferential_desc }}
				</view>
				<view class="win-cart pt32 pl32 pr32  box-size">
					<view class="dis-flex flex-y-center flex-x-between mb40">
						<view class="f-32 f-b col-gray-33">购物车<text class="f-22 col-gray-88">打包费<text class="col-red-d3">{{cardData.packing_fee}}元</text></text></view>
						<view class="dis-flex flex-y-center" @tap.stop="clearCart">
							<image class="wh28" src="/pagesIndex/static/del.png"></image>
							<view class="f-24 col-gray-88 ml5">清空购物车</view>
						</view>
					</view>

					<scroll-view scroll-y="true" class="cart-scroll">
						<view class="goods-cart-item flex-x-between dis-flex flex-y-center "
							v-for="(items,indexs) in cardData.list" :key="indexs" @tap.stop="onlink(items.goods_id)">
							<image class="radio-8 wh148" mode="aspectFill" :src="items.img.split(',')[0]"></image>
							<view class="goods-cart-item-r dis-flex flex-dir-column flex-x-between ">
								<view>
									<view class="f-28 col-brank-20 w-100 onelist-hidden f-b">{{items.name}}</view>
									<view class="label-num dis-flex flex-y-center mt5">
										<view class="bg-gray-ee pl5 pr5 f-22 onelist-hidden radio-4 mr8"
											v-if="items.spec">{{items.spec}}</view>
										<view class="bg-gray-ee pl5 pr5 f-22 onelist-hidden radio-4 mr8"
											v-if="items.spec1">{{items.spec1}}</view>
										<view class="bg-gray-ee pl5 pr5 f-22 onelist-hidden radio-4"
											v-if="items.attribute">{{items.attribute}}</view>
									</view>
								</view>
								<view class="w-100 dis-flex flex-y-center flex-x-between">
									<view class="dis-flex flex-y-center w-85">
										<view class="f-24 mr5 col-red-d9 max-w-60 onelist-hidden f-b">￥<text
												class="f-32">{{parseFloat(items.price).toFixed(2) }}</text></view>

										<view class="text-line w-40 onelist-hidden col-gray-8e f-24"
											v-if="items.is_discount==1">
											￥{{parseFloat(items.scribe_price).toFixed(2) }}</view>

									</view>
									<view class="dis-flex flex-y-center">
										<view class="del radio-8"
											:class="items.num<=1?'border-d4':'bg-red-d6-ec col-white-ff'"
											@tap.stop="delNum(items)">-</view>
										<view class="f-28 col-brank-20 cart-num">{{items.num}}</view>
										<view class="del radio-8 bg-red-d6-ec col-white-ff" @tap.stop="addNum(items)">+
										</view>
									</view>

								</view>
							</view>
						</view>
					</scroll-view>
					<null-data v-if="cardData.list&&cardData.list.length==0" title="购物车是空的哦~"></null-data>

				</view>
			</u-popup>

		</view>
	</view>
</template>

<script>
	export default {
		name: "riderBottom",
		props: {
			cardData: {
				type: Object,
				default: function() {
					return {
						id: '',
						num: 0,
						list: []
					}
				}
			},
			type: {
				type: Number,
				default: 0
			},
			tableId: {
				type: String,
				default: '0'
			},
			dy: {
				type: Number,
				default: 1
			},
      isMustGoodsList: {
        type: Array,
        default: () => []
      }
		},
		data() {
			return {
				cartShow: false,

			};
		},


		methods: {
			//减少加入购物车的数量
			delNum(items) {
				this.$emit("delNum", items)
			},
			//添加加入购物车的数量
			addNum(items) {
				console.log(this.cardData, '1111')
				console.log(items)
				this.$emit("addNum", items)
			},
			onlink(id) {
				//type 0 外卖 1 堂食
				let url;
				if (this.type == 0) {
					url = '/pagesIndex/page/campusTakeout/index/goodsDetail/goodsDetail?id=' + id;
				}
				//堂食需要tableId
				if (this.type == 1) {
					url = '/pagesIndex/page/diningroom/stwaresdetails/stwaresdetails?id=' + id;
				}
				uni.navigateTo({
					url: url
				})
			},
			pay(id) {
				let url;
        console.log('this.cardData.list', this.cardData.list, this.isMustGoodsList);
          // 判断购物车中是否有必须购买的商品
          if (this.isMustGoodsList.length > 0) {
            const isHaveMustGoods = this.isMustGoodsList.every(item1 => this.cardData.list.find(item2 => item2.goods_id == item1.goods_id) !== undefined)
            console.log(isHaveMustGoods);
            if (!isHaveMustGoods) {
              uni.showToast({
                title: "请选择必点的商品",
                icon: "none",
              })
							this.$emit('isHaveMustGoodsScroll')
              return
            }
          }
				if (this.type == 0) {
					url = '/pagesIndex/page/campusTakeout/index/addOrder/addOrder?id=' + id
				}
				if (this.type == 1) {
					url = '/pagesIndex/page/diningroom/strefertorder/strefertorder?id=' + id +
						'&tableId=' + this.tableId
				}
				uni.navigateTo({
					url: url
				})
			},
			clearCart() {
				var that = this
				uni.showModal({
					title: "温馨提示",
					content: "确认清空购物车吗？",
					confirmText: "清空",
					cancelText: "取消",
					success(res) {
						if (res.confirm) {
							that.claerTakeoutCartClear()
						}
					}
				})
			},
			//清空购物车
			async claerTakeoutCartClear() {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.takeoutCartClear({
					merchant_id: this.cardData.merchant_id,
					type: that.type
				})
				if (status == 200) {
					uni.showToast({
						title: "已清空购物车",
						icon: "none"
					})
					this.$emit("clearCart")
				}
			},
		}
	}
</script>

<style lang="scss">
	.tips_box {
		text-align: center;
		background-color: #ffefcf;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;
		border-radius: 16rpx;
	}

	.z-998 {
		z-index: 998;
	}

	.w-100vw {
		width: 100vw;
	}

	.win-cart {
		padding-bottom: calc(128rpx + env(safe-area-inset-bottom));
	}

	.hight {
		height: calc(128rpx + env(safe-area-inset-bottom));
		position: fixed;
		bottom: 0;
	}

	.bottom-flex {
		height: 96rpx;
		padding: 0 22rpx;
		box-sizing: border-box;
	}

	.price {
		width: max-content;
	}

	.bottom-flex {
		height: 96rpx;
		padding: 0 22rpx;
		box-sizing: border-box;
	}

	.bottom-flex image {}

	.cart-l {
		position: relative;
		top: -16rpx;

	}


	.prirce-scroll {
		white-space: nowrap;
	}

	.cart-scroll {
		max-height: 482rpx;
	}

	.other-price {
		padding-left: 14rpx;
		margin-left: 18rpx;
		border-left: 1px solid #888;
		width: max-content;
		line-height: 32rpx;
	}

	.fixed-bottom {
		padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
	}

	.btn {
		width: 180rpx;
		height: 96rpx;
		line-height: 96rpx;
		border-radius: 0 48rpx 48rpx 0;
		position: absolute;
		right: 0;
	}

	.length {
		padding: 0 8rpx;
		position: absolute;
		top: -9rpx;
		right: -9rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 18rpx;
		border: 4rpx solid #FFFFFF;
		color: #fff;
		font-size: 20rpx;
		box-sizing: border-box;
		height: 36rpx;
	}

	.goods-cart-item-r {
		width: 75%;
		height: 148rpx;
	}

	.goods-cart-item {
		margin-bottom: 20rpx;
	}

	.label-num view {
		max-width: 50%;
		height: 28rpx;
		line-height: 28rpx;
	}

	.del {
		width: 40rpx;
		line-height: 36rpx;
		text-align: center;
		height: 40rpx;
	}

	.cart-num {
		min-width: 40rpx;
		text-align: center;
	}
</style>