<template>
	<view>
		<u-navbar leftIconSize="32rpx" :bgColor="bgColor" :leftIconColor="'#FFFFFF'" :safeAreaInsetTop="true"
			:fixed="false" :autoBack="true">
		</u-navbar>

		<view class="m-t-60 m-l-50 m-r-50 flex-about m-b-20">
			<view class="c-FD onelist-hidden" style="width: 400rpx;">
				{{shopName}}
			</view>
			<view class="c-FD">
				桌号：{{table}}
			</view>
		</view>
		<view class="x flex">
			<block v-if="typeList.length>0">
				<!-- 商品分类 -->
				<scroll-view :scroll-y="true" class="goods-l bg-gray-f7">
					<view class="type-item f-24 t-c col-brank-20" :id="item.type_id"
						:class="[typeIndex==index?'bg-white-ff f-b f-28 type-act':'',(index==typeIndex-1)?'radio-rb-16':'',(index==typeIndex+1)?'radio-rt-16':'']"
						v-for="(item,index) in typeList" :key="index" @tap.stop="changeType(index)">
						{{item.name}}
					</view>
				</scroll-view>
				<!-- 商品 -->
				<scroll-view :scroll-y="true" class="goods-r bg-white-ff"
					:scroll-into-view="scrollGoodsId" :scroll-with-animation="true" @scroll="goodsScroll">
					<view v-for="(item,index) in typeList" class="select-goods-item" :key="index"
						:id="'a'+item.type_id">
						<view class="pt20 pl20 pb10 box-size col-gray-88 f-28">{{item.name}}</view>
						<view class="goods-item flex-x-between dis-flex flex-y-center "
							v-for="(items,indexs) in item.goods" :key="indexs"
							@tap.stop="onlink('/pagesIndex/page/diningroom/stwaresdetails/stwaresdetails?id='+items.goods_id)">
							<image class="radio-8 wh180" :src="items.img.split(',')[0]||items.img"
								mode="aspectFill"></image>
							<view class="goods-item-r dis-flex flex-dir-column flex-x-between ">
								<view>
									<view class="f-28 col-brank-20 w-100 onelist-hidden mb10 f-b">
										{{items.name}}11
									</view>
									<view class="label-num dis-flex flex-y-center mb10" v-if="items.attribute">
										<view class="bg-gray-ee  onelist-hidden  f-20 radio-4 mr8"
											v-for="(itemLabel,indexLabel) in items.attribute.split(',')"
											:key="indexLabel" v-if="indexLabel<2">{{itemLabel}}</view>
									</view>
									<view class="f-22 col-gray-88 w-100  onelist-hidden">
										<text class="mr20">月售{{items.month_sales||'0'}}</text>
										<text>好评度98%</text>
									</view>
								</view>
								<!-- <view class="dis-flex flex-y-center">
								<view class="label radio-4 mr16  f-22 border-red-eb col-red-dd">满30减15</view>
							</view> -->
								<view class="w-100 dis-flex flex-y-center flex-x-between">
									<view class="dis-flex flex-y-center w-70">
										<view class="f-24 mr5 col-red-d9 w-100 t-b onelist-hidden f-b">￥<text
												class="f-32">{{items.price}}</text>
											<block
												v-if="(items.attribute&&items.attribute.split(',').length>0)||(items.specs&&JSON.parse(items.specs).length>0)">
												<text class="col-gray-8e f-n">起</text>
											</block>
			
											<text class="text-line col-gray-8e f-n f-24"
												v-else>￥{{items.scribe_price}}</text>
										</view>
			
			
									</view>
									<!-- 有规格的按钮 -->
									<view class="p-r"
										v-if="(items.attribute&&items.attribute.split(',').length>0)||(items.specs&&JSON.parse(items.specs).length>0)">
										<view class=" radio-8 pl10 pr10 bg-red-d6-ec f-24 col-white-f5"
											@tap.stop="addCard(items,item)">选规格</view>
										<view class="p-a cart-sku-num" v-if="items.cart_num">{{items.cart_num}}
										</view>
									</view>
									<!-- 没有规格的按钮 -->
									<block v-else>
										<view class="dis-flex flex-y-center" v-if="items.in_cart!=0">
											<view class="del radio-8"
												:class="items.cart_num<=1?'border-d4':'bg-red-d6-ec col-white-ff'"
												@tap.stop="delNum(items,item)">-</view>
											<input class="f-24 col-brank-20 cart-num" type="number"
												v-model="items.cart_num" />
											<view class="del radio-8 bg-red-d6-ec col-white-ff"
												@tap.stop="addNum(items,item)">+</view>
										</view>
			
										<image class="wh36" src="/pagesIndex/static/add.png" v-else
											@tap.stop="addCard(items,item)"></image>
									</block>
			
			
								</view>
							</view>
						</view>
						<!-- <null-data v-if="item.goods&&item.goods.length==0"></null-data> -->
					</view>
			
				</scroll-view>
			</block>
			<view class="dis-flex  flex-x-center w-100" v-else>
				<null-data title="暂无商品"></null-data>
			</view>
		</view>
		<!-- 多规格弹窗 -->
		<sku :show="skuShow" @skuCanel="skuCanel" @addCard="addSpecCard" :specsObject="specsObject"></sku>
		<!-- 购物车 -->
		<view id="bottom" v-show="typeList.length>0">
			<riderBottom :type="1" :tableId="tableId" :cardData="cardData" @clearCart="clearCart" @delNum="delNumBottom" @addNum="addNumBottom">
			</riderBottom>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xrs: 1,
				indes: '',
				bgColor: '#EC434B', //导航条背景颜色
				menuHeight: "",
				menuHeightx: "",
				
				typeList: [],
				id: 0,
				type: 1,
				scrollGoodsId: '', //当前滚动到的商品id
				typeIndex: '',
				cardData:{},
				skuShow:false,
				specsObject: {
					name: "",
					specs: [],
					specs1: [],
					price: 0,
					attribute: [],
				}, //规格弹窗的数据
				detail: {},
				table: '',
				tableId: 0,
				orderId: '',
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.table = option.table;
			this.shopName = option.name;
			this.tableId = option.tableId;
			this.orderId = option.orderId;
		},
		onShow() {
			this.menuHeight = uni.getSystemInfoSync().windowHeight - 104 //根据屏幕的高度来显示左边选项的高度
			this.menuHeightx = uni.getSystemInfoSync().windowHeight - 170 //根据屏幕的高度来显示左边选项的高度

			console.log(this.menuHeightx)
			this.getGoodsLists();
			this.getMerchantInfo();
			//再来一单
			if(this.orderId) {
				this.getOrderAgain();
			}
		},
		onPageScroll(e) {
			this.isMore = false
			this.scrollTop = e.scrollTop
			console.log(e.scrollTop, this.topHeight - this.navHeight, "滚动")
			if (e.scrollTop >= 50) {
				this.bgColor = "#D93038"
			} else {
				this.bgColor = "rgba(255,255,255,0)"
			}
			if (e.scrollTop >= this.topHeight - this.tabHeight) {
				this.isTabTop = true
			} else {
				this.isTabTop = false
			}
			this.$forceUpdate()
		},
		methods: {
			
			//更改商品分类
			changeType(index) {
				var that = this
				that.typeIndex = index
				if (this.scrollTop < (this.topHeight - this.tabHeight)) {
					//如果当前页面滚动距离小于id为top元素的高度
					//并且在此时点击了商品分类，就将页面滚动到top的高度之后，开启商品以及分类的滚动
					uni.pageScrollTo({
						scrollTop: this.topHeight - this.tabHeight + this.navHeight, // 滚动到的位置（距离顶部 px）
						duration: 0, //必须为0 app不适配
					})
					that.isTabTop = true
				}
				setTimeout(function() {
					that.scrollGoodsId = 'a' + that.typeList[index].type_id
					console.log(that.scrollGoodsId, "11111")
				}, 500)
			},
			//记录每一个高度的区间
			calculateHeight(arr) {
				var that = this
				console.log(arr)
				if (!arr.length) {
					return
				}
				var heightArr = []
				arr.forEach((ele, key) => {
					var height
					if (key == 0) {
						height = ele.height
					} else {
						height = heightArr[key - 1] + ele.height
					}
					heightArr.push(height)
				})
				this.HeightArr = heightArr
			},
			// 计算滚动条左边滚动高度
			calculateIndex(arr, scrollHeight) {
				let index = 0;
				for (let i = 0; i < arr.length; i++) {
					if (scrollHeight >= 0 && scrollHeight < arr[0]) {
						index = 0;
					} else if (scrollHeight >= arr[i - 1] && scrollHeight < arr[i]) {
						index = i;
					}
				}
				return index;
			},
			//滚动商品 选中左边分类
			goodsScroll(e) {
				this.typeIndex = this.calculateIndex(this.HeightArr, e.detail.scrollTop)
			
			},
			//获取商家商品列表
			async getGoodsLists() {
				console.log('获取商品列表' +this.id)
				let that = this
				const {
					data,
					status
				} = await that.$api.takeoutGoodsLists({
					merchant_id: that.id,
					type: 1
				})
				if (status == 200) {
					this.typeList = data.list;
					console.log(data)
					if (data.list.length > 0) {
						this.scrollGoodsId = 'a' + data.list[0].type_id
					}
					setTimeout(function() {
						that.initHeight()
					}, 700)
					this.getTakeoutCartLists()
				}
			},
			//获取商家详情
			async getMerchantInfo() {
				var that = this
				const {
					data,
					status
				} = await that.$api.merchantInfo({
					merchant_id: this.id,
					lng: uni.getStorageSync('lng') || '',
					lat: uni.getStorageSync('lat') || '',
				})
				if (status == 200) {
					data.album = data.album.split(",") || []
					this.detail = data
					console.log(data)
			
				}
			},
			
			//再来一单
			async getOrderAgain() {
				var that = this
				const {
					data,
					status
				} = await that.$api.inStoreOrderAgain({
					order_id: this.orderId,
				})
				if (status == 200) {
			
				}
			},
			initHeight() {
				let query = uni.createSelectorQuery().in(this);
				query.selectAll('.title').boundingClientRect(data => {
					console.log("得到布局位置信息", data, );
					let arr = [];
					data.map(item => {
						arr.push(item.top)
					})
					this.topList = arr;
				}).exec();
			},
			//清空了购物车 刷新购物车列表和商家商品列表
			clearCart() {
				this.getGoodsLists()
				this.getTakeoutCartLists()
			},
			//加入购物车
			addCard(items, item) {
				console.log(items, "=====-----")
				let attribute = items.attribute
				if (attribute != null && attribute != 'null' && attribute != '') {
					attribute = items.attribute.split(',')
				} else {
					attribute = []
				}
				// 有规格的加入展示弹框
				if ((items.specs && JSON.parse(items.specs).length > 0) || attribute.length > 0) {
					//判断是不是多规格属性商品 是就改变skuShow=true
					this.$set(this.specsObject, 'goods_id', items.goods_id)
					this.$set(this.specsObject, 'name', items.name)
					this.$set(this.specsObject, 'price', items.price)
					this.$set(this.specsObject, 'specs', JSON.parse(items.specs) || [])
					this.$set(this.specsObject, 'specs1', JSON.parse(items.specs1) || [])
					this.$set(this.specsObject, 'attribute', attribute)
					this.skuShow = true
				} else {
					//没有规格的直接加入购物车
					this.getTakeoutCartAdd(items)
				}
			
			},
			//多规格弹窗的加入购物车事件
			addSpecCard(e) {
				console.log(e, "=====-----xx")
				this.spec = e.spec
				this.spec1 = e.spec1
				this.getTakeoutCartAdd(e.items, e.attribute)
				console.log(e.attribute,"-==")
				this.skuShow = false
			},
			//商品列表减少加入购物车的数量
			delNum(items, item) {
				this.getTakeoutCartSub(items.cart_id)
			},
			//商品列表添加加入购物车的数量
			addNum(items, item) {
				// console.log(items, item)
				this.getTakeoutCartAdd(items)
			},
			//底部购物车弹窗减少加入购物车的数量 
			delNumBottom(items) {
				this.getTakeoutCartSub(items.cart_id)
			},
			//底部购物车弹窗添加加入购物车的数量
			addNumBottom(items) {
				console.log(items,"123")
				
				this.getTakeoutCartAddx(items, items.spec, items.attribute)
				
			},
			//获取加入购物车接口
			async getTakeoutCartAdd(items, attribute, spec1) {
				console.log(items, attribute, spec1,"--===")
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.takeoutCartAdd({
					merchant_id: this.id,
					goods_id: items.goods_id,
					num: 1,
					spec: this.spec,
					spec1: this.spec1,
					attribute: attribute|| "",
					type: this.type
				})
				if (status == 200) {
					uni.showToast({
						title: "添加购物车成功",
						icon: "none"
					})
					this.clearCart()
				}
			},
			
			//获取加入购物车接口
			async getTakeoutCartAddx(items, attribute, spec1) {
				console.log(items, attribute, spec1,"--===")
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.takeoutCartAdd({
					merchant_id: this.id,
					goods_id: items.goods_id,
					num: 1,
					spec: items.spec,
					spec1: items.spec1,
					attribute: items.attribute|| "",
					type:that.type
				})
				if (status == 200) {
					uni.showToast({
						title: "添加购物车成功",
						icon: "none"
					})
					this.clearCart()
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
					merchant_id: this.id,
					type: this.type
				})
				if (status == 200) {
					data.merchant_id = this.id
					// data.starting_price = this.detail.starting_price
					this.cardData = data
					console.log(this.cardData)
					console.log(data)
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
			skuCanel() {
				this.skuShow = false;
			},
			onlink(url) {
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style>
	page {
		background: #EC434B !important;
	}

	.saoyisao {
		width: 180rpx;
		height: 180rpx;
	}

	.x {
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		background-color: #ffffff;
		height: 49rem;
	}

	.o {
		border-radius: 30rpx 30rpx 0rpx 0rpx;
	}

	.r {
		border-radius: 30rpx 0px 0px 0px;
	}

	.scroll-Y {
		height: 300rpx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		width: 176rpx;
		height: 100rpx;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.wares {
		padding: 20rpx;
	}

	.nature {

		width: 68rpx;
		height: 28rpx;
		background: #EEEEEE;
		border-radius: 4rpx;
	}

	.reduce {
		width: 84rpx;
		height: 28rpx;
		border-radius: 4rpx;
		border: 1px solid #EB979B;
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #DD343C;
		line-height: 24rpx;
	}
	.shop-head-bg {
		width: 100%;
		height: 260rpx;
	}
	
	.shop-detail {
		border-radius: 32rpx 32rpx 0px 0px;
		position: relative;
		margin-top: -44rpx;
		padding: 32rpx 24rpx 0 32rpx;
		box-sizing: border-box;
	}
	
	.shop-r {
		width: 78%;
	}
	
	.label {
		height: 28rpx;
		line-height: 28rpx;
		padding: 0 6rpx;
		font-family: PingFangSC-Regular, PingFang SC;
	}
	
	.label-bg {
		width: max-content;
		height: 28rpx;
		line-height: 28rpx;
		padding: 0 6rpx;
		font-family: PingFangSC-Regular, PingFang SC;
	}
	
	.tab-box {
		padding: 26rpx 0;
	}
	
	.tab-box-top {
		padding: 26rpx 32rpx;
		box-sizing: border-box;
	}
	
	.tab-item {}
	
	.tab-act {
		position: relative;
	}
	
	.tab-act::after {
		content: '';
		width: 32rpx;
		height: 10rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 5rpx;
		position: absolute;
		bottom: -18rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	
	#bottom {
		height: calc(128rpx + env(safe-area-inset-bottom));
		position: fixed;
		bottom: 0;
	}
	
	.goods-l {
		width: 176rpx;
	}
	
	.goods-r {
		width: 574rpx;
		box-sizing: border-box;
	}
	
	.type-item {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
	}
	
	.goods-item {
		padding: 20rpx 24rpx;
		box-sizing: border-box;
	}
	
	.goods-item-r {
		width: 61%;
		height: 180rpx;
	}
	
	.label-num view {
		max-width: 50%;
		height: 28rpx;
		line-height: 28rpx;
		padding: 0 6rpx;
	}
	
	.comment-tab-item {
		height: 48rpx;
		line-height: 48rpx;
		border-radius: 4rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin-right: 20rpx;
	}
	
	
	
	.more-win {
		width: 192rpx;
		box-shadow: 0px 4rpx 20rpx 0px rgba(0, 0, 0, 0.0400);
		position: absolute;
		bottom: -182rpx;
		right: 42rpx;
	}
	
	
	
	.label-scroll {
		width: 100%;
		white-space: nowrap;
	}
	
	.comment-item-cover>image {
		margin-right: 18rpx;
	}
	
	.comment-item-cover>image:nth-child(3n) {
		margin-right: 0;
	}
	
	.del {
		width: 40rpx;
		line-height: 36rpx;
		text-align: center;
		height: 40rpx;
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
