<template>
	<view class="">
		<u-navbar :placeholder="true" leftIconSize="32rpx" :safeAreaInsetTop="true">
			<view class="u-nav-slot dis-flex flex-y-center" slot="left">
				<view class="mr10" @tap="back">
					<u-icon name="arrow-left" size="46rpx" color="#181818"></u-icon>
				</view>
				<u-search bgColor="#F6F6F6" height="64rpx" placeholder="请输入关键词" :showAction="false" v-model="keyword"
					@input="confirm">
				</u-search>
			</view>
		</u-navbar>
		<view class="pt40 pl32 pr32 box-size pb100">
			<block v-if="keyword == ''">
				<!-- 搜索发现 -->
				<block v-if="findList.length > 0">
					<view class="f-28 f-b col-brank-22 mb25">探索发现</view>
					<view class="dis-flex flex-y-center flex-wrap find-item">
						<view class="mr20 bg-gray-f7 mb20 pl15 pr15 f-24 col-brank-22 radio-28"
							v-for="(item, index) in findList" :key="index" @tap="changeKey(index, item)">{{ item }}
						</view>
					</view>
				</block>
				<!--历史搜索 -->
				<block v-if="historyList.length > 0">
					<view class="dis-flex flex-y-center flex-x-between mt40 mb25">
						<view class="f-28 f-b col-brank-22 ">历史搜索</view>
						<image class="wh28" src="/pagesIndex/static/del.png" @tap="eliminate"></image>
					</view>
					<view class="dis-flex flex-y-center flex-wrap find-item">
						<view class="mr20 bg-gray-f7 mb20 pl15 pr15 f-24 col-brank-22 radio-28"
							v-for="(item, index) in historyList" :key="index" @tap="changeKey(index, item)">
							{{ item }}
						</view>
					</view>
				</block>
			</block>
			<block v-else>
				<view class="goods-item flex-x-between mb40 dis-flex flex-y-center" :id="item.id"
					v-for="(item, index) in goodsList" :key="index"
					@tap.stop="onLink('/pagesIndex/page/campusTakeout/index/goodsDetail/goodsDetail?id=' + item.goods_id + '&fee=' + 0 + '&idx=' + item.merchant_id + '&starting_price=' + 0)">
					<image class="radio-8 wh180" :src="item.img"></image>
					<view class="goods-item-r dis-flex flex-dir-column flex-x-between ">
						<view class="f-28 col-brank-20 w-100 onelist-hidden f-b">{{ item.name }}</view>
            <!-- dis-flex flex-y-center -->
						<view class="label-num" v-if="item.attribute">
							<view class="bg-gray-ee pl5 pr5 f-22 radio-4 mr8"
								v-for="(att, attIndex) in item.attribute.split(',')" :key="attIndex">
								{{ att }}
							</view>
						</view>
						<view class="f-22 col-gray-88 w-100 onelist-hidden">
							<text class="mr20">月售{{ item.month_sales }}</text>
							<!-- <text>好评度98%</text> -->
						</view>
						<view class="dis-flex flex-y-center">
							<!-- <view class="label radio-4 mr16  f-22 border-red-eb col-red-dd">满30减15</view> -->
						</view>
						<view class="w-100 dis-flex flex-y-center flex-x-between">
							<view class="dis-flex flex-y-center w-85">
								<view class="f-24 mr5 col-red-d9 max-w-60 onelist-hidden f-b">￥<text class="f-32">{{
            item.price }}</text></view>
								<view class="text-line w-40 onelist-hidden col-gray-8e f-24">￥{{ item.scribe_price }}
								</view>
							</view>

							<block v-if="item.merchant_status != 0">
								<view class="p-r" style="width: 100rpx;"
									v-if="(item.attribute && item.attribute.split(',').length > 0) || (item.specs && JSON.parse(item.specs).length > 0)">
									<view class=" radio-8 pl10 pr10 bg-red-d6-ec f-24 col-white-f5"
										@tap.stop="addCard(item, item)">选规格</view>
									<view class="p-a cart-sku-num" v-if="item.cart_num">{{ item.cart_num }}
									</view>
								</view>
								<!-- 没有规格的按钮 -->
								<block v-else>
									<view class="dis-flex flex-y-center" v-if="item.in_cart != 0">
										<view class="del radio-8"
											:class="item.cart_num <= 1 ? 'border-d4' : 'bg-red-d6-ec col-white-ff'"
											@tap.stop="delNum(item, item)">-</view>
										<input class="f-24 col-brank-20 cart-num" type="number"
											v-model="item.cart_num" />
										<view class="del radio-8 bg-red-d6-ec col-white-ff"
											@tap.stop="addNum(item, item)">+
										</view>
									</view>

									<image class="wh36" src="/pagesIndex/static/add.png" v-else
										@tap.stop="addCard(item, item)"></image>
								</block>
							</block>

						</view>
					</view>
				</view>
			</block>
		</view>
		<sku :show="skuShow" @skuCanel="skuCanel" @addCard="addSpecCard" :specsObject="specsObject"></sku>
		<view v-if="keyword != ''">
			<riderBottom :cardData="cardData" @clearCart="clearCart" @delNum="delNumBottom" @addNum="addNumBottom">
			</riderBottom>
		</view>
		<null-data v-if="goodsList.length == 0"></null-data>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				skuShow: false, //是否显示多规格弹窗
				cardData: {},
				keyword: '', //搜索字段
				findList: [],
				historyList: [],
				goodsList: [], //商品列表
				specsObject: {
					name: "",
					specs: [],
					price: 0,
					attribute: [],
				}, //规格弹窗的数据
			};
		},
		onLoad(e) {
			this.id = e.id
			this.chronicles()

		},
		methods: {
			skuCanel() {
				this.skuShow = false
			},

			//多规格弹窗的加入购物车事件
			addSpecCard(e) {
				this.getTakeoutCartAdd(e.items, e.spec, e.attribute)
				this.skuShow = false
			},

			addCard(items, item) {
				console.log(item)
				var attribute = item.attribute
				if (attribute != null && attribute != 'null' && attribute != '') {
					attribute = item.attribute.split(',')
				} else {
					attribute = []
				}
				// 有规格的加入展示弹框
				if ((item.specs && JSON.parse(item.specs).length > 0) || attribute.length > 0) {
					//判断是不是多规格属性商品 是就改变skuShow=true
					this.$set(this.specsObject, 'goods_id', item.goods_id)
					this.$set(this.specsObject, 'name', item.name)
					this.$set(this.specsObject, 'price', item.price)
					if (item.specs) {
						this.$set(this.specsObject, 'specs', JSON.parse(item.specs) || [])
					}
					if (item.specs1) {
						this.$set(this.specsObject, 'specs1', JSON.parse(item.specs1) || [])
					} else {
						this.specsObject.specs1 = []
					}
					this.$set(this.specsObject, 'attribute', attribute)
					this.skuShow = true

				} else {
					//没有规格的直接加入购物车
					this.getTakeoutCartAdd(item)
				}

			},

			clearCart() {
				this.getTakeoutCartLists()
				this.getTakeoutCartSub()
			},

			addNum(items, item) {
				this.getTakeoutCartAdd(items)
			},
			//商品列表减少加入购物车的数量
			delNum(items, item) {
				this.getTakeoutCartSubx(items.cart_id)
			},
			//底部购物车弹窗添加加入购物车的数量
			addNumBottom(items) {
				this.getTakeoutCartAdd(items, items.spec, items.attribute)
			},
			//底部购物车弹窗减少加入购物车的数量
			delNumBottom(items) {
				this.getTakeoutCartSubx(items.cart_id)
			},
			//获取加入购物车接口
			async getTakeoutCartAdd(items, spec, attribute) {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.takeoutCartAdd({
					merchant_id: this.id,
					goods_id: items.goods_id,
					num: 1,
					spec: spec || "",
					attribute: attribute || "",
				})
				if (status == 200) {
					uni.showToast({
						title: "添加购物车成功",
						icon: "none"
					})
					this.clearCart()
				}
			},
			//减少购物车接口
			async getTakeoutCartSubx(cart_id) {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.takeoutCartSub({
					cart_id: cart_id
				})
				if (status == 200) {
					uni.showToast({
						title: "数量减少成功",
						icon: "none"
					})
					this.clearCart()
				}
			},


			async getTakeoutCartLists() {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.takeoutCartLists({
					merchant_id: this.id,
				})
				if (status == 200) {
					// data.merchant_id = this.id
					// data.starting_price = this.detail.starting_price
					this.cardData = data
					this.cardData.merchant_id = this.id
					console.log(data)

				}
			},


			//返回
			back() {
				uni.navigateBack()
			},
			//跳转链接
			onLink(url) {
				uni.navigateTo({
					url: url
				})
			},

			//点击探索发现或者历史搜索
			changeKey(index, list) {
				console.log(index, list)
				this.keyword = list
				this.getTakeoutCartSub()
				this.getTakeoutCartLists()
			},

			confirm() {
				this.getTakeoutCartSub()
				this.getTakeoutCartLists()
			},

			async getTakeoutCartSub() {
				this.goodsList = []
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.scoutaround({
					merchant_id: this.id,
					keyword: this.keyword
				})
				if (status == 200) {
					this.goodsList = data

				} else if (status == "201") {
					this.goodsList = []
				}
			},



			async chronicles() {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.chronicle({
					merchant_id: this.id,
				})
				if (status == 200) {
					this.findList = data.hotLog
					this.historyList = data.userLog

				}
			},

			async eliminate() {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.clearlogs({
					merchant_id: this.id,
				})
				if (status == 200) {
					this.chronicles()
				}
			}


		}
	}
</script>

<style lang="scss">
	page {
		background: #fff !important;
		min-height: 100vh;
		padding-bottom: calc(128rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
	}

	.u-nav-slot {
		width: 484rpx;
	}

	.find-item view {
		height: 52rpx;
		line-height: 52rpx;
	}

	.goods-item-r {
		width: 70.5%;
		height: 180rpx;
	}

  .label-num {
    display: flex;
    margin-right: 8px;
    overflow-x: auto;
  }
	.label-num view {
		// height: 28rpx;
		// line-height: 28rpx;
    flex: none;
	}

	.label {
		height: 28rpx;
		line-height: 28rpx;
		padding: 0 6rpx;
		font-family: PingFangSC-Regular, PingFang SC;
	}

	.comment-item-cover>image {
		margin-right: 18rpx;
	}

	.comment-item-cover>image:nth-child(3n) {
		margin-right: 0;
	}

	.del {
		width: 36rpx;
		line-height: 36rpx;
		text-align: center;
		height: 36rpx;
	}

	.cart-num {
		width: 40rpx;
		text-align: center;
	}
















































	.cart-sku-num {
		transform: scale(0.85);
		position: absolute;
		min-width: 15px;
		height: 15px;
		background: #F7D6D7;
		border-radius: 7px;
		border: 1px solid #D93038;
		padding: 0 3px;
		box-sizing: border-box;
		font-size: 10px;
		text-align: center;
		line-height: 15px;
		color: #D93038;
		right: -8px;
		top: -8px;
	}
</style>