<template>
	<view class="padd-b-160">
		<view class="head dis-flex  p-r">
			<image class="w-100" mode="aspectFill" :src="detail.img"></image>
			<!-- 分享和会话窗口 -->
			<!-- <view class="p-a head-btn">
				<view class="dis-flex flex-y-center">
					<view class="icon-box mr32 dis-flex flex-y-center flex-x-center">
						<image class="wh44" src="/pagesIndex/static/shop-icon03.png" @tap.stop="tochat"></image>
					</view>
					<view class="icon-box dis-flex flex-y-center flex-x-center">
						<image class="wh44" src="/pagesIndex/static/shop-icon05.png" @tap.stop="shareShow=true"></image>
					</view>
				</view>
			</view> -->
		</view>
		<view class="info bg-white-ff mb20">
			<view class="dis-flex flex-center flex-x-between mb10">
				<view class="w-90">
					<view class="w-100 f-32 f-b col-brank-20">{{detail.name}}</view>
					<view class="label-num dis-flex flex-y-center mb10" v-if="detail.attribute">
						<view class="bg-gray-ee  onelist-hidden  f-20 radio-4 mr8"
							v-for="(itemLabel,indexLabel) in detail.attribute.split(',')" :key="indexLabel"
							v-if="indexLabel<2">{{itemLabel}}</view>
					</view>
					<view class="col-gray-8e f-24" v-else>暂无属性</view>
				</view>
				<view class="dis-flex flex-dir-column flex-x-center mb8 flex-y-center" @tap="changeLike">
					<image v-if="isCollected==0" class="wh44"
						:src="detail.isLike?'/static/img/like-act.png': '/static/img/like.png'"></image>
					<image v-if="isCollected==1" class="wh44 " src="/pagesIndex/static/icoyishoucangx.png"></image>
					<view class="f-24  mt5" :class="detail.isLike?'col-red-d9':'col-gray-88'">收藏</view>
				</view>
			</view>
			<view class="col-gray-88 f-24">
				<text class="mr20">月售{{detail.month_sales||'0'}}</text>
				<text>打包费￥{{Number.parseInt(detail.packing_fee)||fee}}/1份</text>
			</view>
			<view class="dis-flex mt10 flex-y-center flex-x-between">
				<view class="price">
					<text class="col-red-d9 f-b f-DINPro f-28">
						<text>¥</text>
						<text class="f-48">{{detail.price}}</text>
					</text>
					<text class="col-gray-88 ml15 f-28 f-n text-line f-DINPro">
						¥{{detail.scribe_price}}
					</text>
				</view>
				<view class="w-20 dis-flex flex-x-end" v-if="detail.merchant_status==1">
					<!-- 有规格的按钮 -->
					<view class="p-r"
						v-if="(detail.attribute&&detail.attribute.split(',').length>0)||(detail.specs&&JSON.parse(detail.specs).length>0)">
						<view class=" radio-8 pl10 pr10 bg-red-d6-ec f-24 col-white-f5" @tap.stop="addCard">选规格</view>
						<view class="p-a cart-sku-num" v-if="detail.cart_num">{{detail.cart_num}}</view>
					</view>
					<!-- 没有规格的按钮 -->
					<block v-else>
						<view class="dis-flex  flex-y-center" v-if="detail.in_cart!=0">
							<view class="del radio-8"
								:class="detail.cart_num<=1?'border-d4':'bg-red-d6-ec col-white-ff'"
								@tap.stop="delNum(detail)">-</view>
							<view class="f-24 col-brank-20 cart-num">{{detail.cart_num || 0}}</view>
							<view class="del radio-8 bg-red-d6-ec col-white-ff" @tap.stop="addNum(detail)">+</view>
						</view>

						<image class="wh36" src="/pagesIndex/static/add.png" v-else @tap.stop="addCard(detail)">
						</image>
					</block>
				</view>

				<!-- <view class="f-14 c-88" v-if="time_open==0">
					店铺已打烊
				</view> -->

			</view>
			<view class="dis-flex flex-y-center mt10 flex-wrap">
				<!-- <view class="label radio-4 mr16 mb16 f-22 border-red-eb col-red-dd">满30减15</view> -->
			</view>
		</view>
		<view class="cont24-32 bg-white-ff mb20">
			<view class="f-32 f-b col-brank-20">详情</view>
			<view class="mt30">
				<text class="col-gray-88">掌柜描述：</text>
				{{detail.introduce||'暂无描述'}}
			</view>
			<view class="mt30" v-if="detail.main_material">
				<text class="col-gray-88">主料：</text>
				{{detail.main_material}}
			</view>
			<view class="mt30" v-if="detail.weight">
				<text class="col-gray-88">分量：</text>
				{{detail.weight}}
			</view>
		</view>
		<!-- 多规格弹窗 -->
		<sku :show="skuShow" @skuCanel="skuCanel" @addCard="addSpecCard" :specsObject="specsObject"></sku>
		<view class="" style="margin-bottom: 120rpx;">
			<commentOne :list="commentList" :commentTab="commentTab" @changeCommentTab="changeCommentTab"
				@toList="onLink('/pagesIndex/page/campusTakeout/index/commentList/commentList?id='+detail.merchant_id)">
			</commentOne>
		</view>
		<!-- 固定在底部的购物车 -->
		<view id="bottom">
			<view class="tis flex-center" v-if="detail.merchant_status==0">
				商家已休息，请在营业时间内下单
			</view>
			<view class="" v-else>
				<riderBottom :type="types" :cardData="cardData" :isMustGoodsList="isMustGoodsList" @clearCart="clearCart" @delNum="delNumBottom"
					@addNum="addNumBottom">
				</riderBottom>
			</view>
		</view>
		<shareWin :shopShow="shareShow" @cancel="cancelShare" :shareContent="shareContent"></shareWin>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				idx: '',
				isCollected: "",
				shareShow: false, //f分享
				shareContent: {},
				skuShow: false, //是否显示多规格弹窗
				specsObject: {
					name: "",
					specs: [],
					specs1: [],
					price: 0,
					attribute: [],
          catch: null
				}, //规格弹窗的数据
				id: "", //商品id
				fee: "",
				starting_price: '',
				commentList: [],
				detail: {}, //商品详情			
				cardData: {
					amount: 0,
					starting_price: 0,
					scribe_amount: 0
				}, //购物车数据
				time_open: "",
				types: 0,
				options: {},
				commentTabAct: 0,
				commentTab: [{ //评价类型
					name: "全部",
					id: 0,
					num: 0,
				}, {
					name: "最新",
					id: 1,
					num: 0,
				}, {
					name: "好评",
					id: 2,
					num: 0
				}, {
					name: "差评",
					id: 3,
					num: 0
				}],
        isMustGoodsList: [], //必买商品列表
			};
		},
		onLoad(e) {
			this.starting_price = e.starting_price
			console.log('eee', this.starting_price);
			this.options = e;
			this.id = e.id
			this.fee = e.fee
			this.idx = e.idx
			this.time_open = e.time_open
			this.types = Number(e.types) || 0
			this.getOrderCommentList()
      if(this.options.merchant_id) {
        this.getTakeoutGoodsLists()
      }
		},
		onShareAppMessage() {
			return {
				title: this.detail.name,
				path: '/pagesIndex/page/campusTakeout/index/goodsDetail/goodsDetail?id=' + this.options.id + '&fee=' + this
					.options.fee + '&idx=' + this.options.idx + '&starting_price=' + this.options.starting_price,
				imageUrl: this.detail.logo,
				success() {
					console.log('分享成功')
				},
			}
		},
		onShareTimeline() {
			return {
				title: this.detail.name,
				path: '/pagesIndex/page/campusTakeout/index/goodsDetail/goodsDetail?id=' + this.options.id + '&fee=' + this
					.options.fee + '&idx=' + this.options.idx + '&starting_price=' + this.options.starting_price,
				imageUrl: this.detail.logo,
				success() {
					console.log('分享成功')
				},
			}
		},
		onShow() {
			this.getTakeoutGoodsInfo()
		},
		methods: {
			changeCommentTab(id) {
				console.log(id)
				this.commentTabAct = id
				this.getOrderCommentList()
			},
			async getOrderCommentList(isPage) {
				uni.showLoading({
					title: "正在加载中"
				})
				let that = this
				if (isPage) {
					this.page = this.page + 1
					that.status = "loading"
				} else {
					this.page = 1
					this.commentList = []
					this.status = 'loadmore'
				}
				const {
					data,
					status
				} = await that.$api.orderCommentList({
					store_id: this.idx || this.id,
					order_type: 1, //1外卖，2附近，3优选
					limit: 10,
					page: this.page,
					type: this.commentTabAct, //评论类型 0全部，1最新，2好评，3差评
				})
				uni.hideLoading()
				if (status == 200) {
					if (data.total_count > 0) {
						that.commentList = that.commentList.concat(data.list.data)
						console.log(that.commentList)
					}
				}
			},

			//点击关闭规格弹窗
			skuCanel() {
				this.skuShow = false
			},
			//跳转链接
			onLink(url) {
				uni.navigateTo({
					url: url
				})
			},
			//清空了购物车 刷新购物车列表和商家商品列表
			clearCart() {
				this.getTakeoutGoodsInfo()
			},

			//跳转聊天
			tochat() {
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/chat/chat?id=' +
						'merchant' + this.detail.goods_id +
						'&name=' + this.shareContent.title +
						'&icon=' + this.shareContent.imageUrl
				})
			},
			//获取商品详情
			async getTakeoutGoodsInfo() {
				var that = this
				const {
					data,
					status
				} = await that.$api.takeoutGoodsInfo({
					goods_id: this.id,
				})
				if (status == 200) {
					console.log(data);
					this.isCollected = data.user_is_collect
					data.img = data.img.split(',')[0] || ''
					this.detail = data
					this.shareContent.title = data.name;
					this.shareContent.summary = data.introduce;
					this.shareContent.imageUrl = data.img.split(',')[0] || '';
					this.shareContent.href = 'https://www.pgyer.com/NF47';
					this.getTakeoutCartLists()
				}
			},
			//购物车列表接口
			async getTakeoutCartLists() {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.takeoutCartLists({
					merchant_id: this.detail.merchant_id,
					type: this.types,
				})
				if (status == 200) {
					//starting_price 缺失
					console.log('--------------------------------------------', this.detail)
					data.merchant_id = this.detail.merchant_id
					// data.starting_price = this.detail.starting_price
					console.log('--------------------------------------------');
					console.log(this.detail.starting_price);
					this.cardData = data
					console.log(this.cardData);
				}
			},
			//加入购物车
			addCard() {
				var attribute = this.detail.attribute
        // 解决点击同一个商品规格时无法监听问题
        this.$set(this.specsObject, 'catch', null)
				if (attribute != null && attribute != 'null' && attribute != '') {
					attribute = this.detail.attribute.split(',')
				} else {
					attribute = []
				}
				// 有规格的加入展示弹框
				if ((this.detail.specs && JSON.parse(this.detail.specs).length > 0) || attribute.length > 0) {
					//判断是不是多规格属性商品 是就改变skuShow=true
					this.$set(this.specsObject, 'goods_id', this.detail.goods_id)
					this.$set(this.specsObject, 'name', this.detail.name)
					this.$set(this.specsObject, 'price', this.detail.price)
					if (this.detail.specs) {
						this.$set(this.specsObject, 'specs', JSON.parse(this.detail.specs) || [])
					} else {
						console.log('无规格1')
						this.$set(this.specsObject, 'specs', [])
					}
					if (this.detail.specs1) {
						this.$set(this.specsObject, 'specs1', JSON.parse(this.detail.specs1) || [])
					} else {
						console.log('无规格2')
						this.$set(this.specsObject, 'specs1', [])
					}
					this.$set(this.specsObject, 'attribute', attribute)
          this.$nextTick(() => {
            this.$set(this.specsObject, 'catch', this.detail.name)
          });
					this.skuShow = true
				} else {
					//没有规格的直接加入购物车
					this.getTakeoutCartAdd(this.detail)
				}

			},
			//多规格弹窗的加入购物车事件
			addSpecCard(e) {
				this.getTakeoutCartAdd(e.items, e.spec, e.attribute)
				this.skuShow = false
			},
			//商品列表减少加入购物车的数量
			delNum() {
				this.getTakeoutCartSub(this.detail.cart_id)
			},
			//商品列表添加加入购物车的数量
			addNum() {
				this.getTakeoutCartAdd()
			},
			//底部购物车弹窗减少加入购物车的数量 
			delNumBottom(items) {
				console.log(items)
				this.getTakeoutCartSub(items.cart_id)
			},
			//底部购物车弹窗添加加入购物车的数量
			addNumBottom(items) {
				console.log(items, "items")
				this.getTakeoutCartAdd(items, items.spec, items.attribute)
			},
			//获取加入购物车接口
			async getTakeoutCartAdd(items, spec, attribute) {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.takeoutCartAdd({
					merchant_id: this.detail.merchant_id,
					goods_id: this.detail.goods_id,
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
			async getTakeoutCartSub(cart_id) {
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

			//更改收藏状态
			async changeLike() {
				var that = this
				const result = await that.$api.collection({
					collection_id: this.id,
					type: 2,
				})
				if (result.status == 200) {
					this.isCollected = this.isCollected == 0 ? 1 : 0
				}
			},
			//获取商家商品列表
			async getTakeoutGoodsLists() {
				uni.showLoading({
					title: '加载中...'
				})
				const {
					data,
					status
				} = await this.$api.takeoutGoodsLists({
					merchant_id: this.options.merchant_id,
				})
				uni.hideLoading();
				if (status == 200) {
          let filteredArray = []
          data.list.map(subArray =>
            subArray.goods.map(item => {
              if (item.is_must_buy == 1) {
                filteredArray.push(item)
              }
            })
          );
          this.isMustGoodsList = filteredArray
				}
			},



			//取消分享
			cancelShare() {
				this.shareShow = false;
			}

		}
	}
</script>

<style lang="scss">
	page {
		min-height: 100vh;
		padding-bottom: calc(128rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;

	}

	.head>image {
		height: 400rpx;
	}

	.head-btn {
		top: 30rpx;
		right: 32rpx;
	}

	.icon-box {
		width: 72rpx;
		height: 72rpx;
		background: rgba($color: #000000, $alpha: 0.7);
		border-radius: 100%;
	}

	.info {
		padding: 32rpx 32rpx 4rpx 24rpx;
		box-sizing: border-box;
	}

	.label-num view {
		max-width: 50%;
		height: 28rpx;
		line-height: 28rpx;
		padding: 0 6rpx;
	}

	.btn {
		width: 184rpx;
		height: 56rpx;
		line-height: 56rpx;
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

	#bottom {
		height: calc(128rpx + env(safe-area-inset-bottom));
		position: fixed;
		bottom: 0;
	}

	.tis {
		padding: 26rpx;
		width: 93%;
		background-color: #000000;
		opacity: 0.5;
		color: #fff;
		position: fixed;
		bottom: var(--window-bottom, 0);
		left: 0;
		z-index: 99;
	}
</style>