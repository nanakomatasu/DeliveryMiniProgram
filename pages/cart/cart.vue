<template>
	<view>
		<u-sticky>
			<view class="dis-flex bg-gray-f7 pt24 pb30 flex-y-center  pl40 pr40 box-size flex-x-between">
				<view class="col-brank-20 f-28 pl40 pr40 tab-item" :class="tabAct==item.id?'tab-sel f-b':''"
					v-for="(item,index) in tabList" :key="index" @tap.stop="changeTab(item.id)">{{item.name}}</view>
			</view>
		</u-sticky>
		<!-- 校园外卖 -->
		<view class="" v-if="tabAct == 1">
			<view class="cont">
				<view class="radio-16 bg-white-ff pl24 pr24 box-size mb20 pb24" v-for="(item,index) in list"
					:key="index">

					<view class="dis-flex pt20 pb20 flex-y-center border-b-f7">
						<image src="/static/img/ico-tips1.png" mode="" class="moreimg"></image>
						校园外卖
					</view>

					<view class="mt20">
						<label class="dis-flex flex-y-center sel-all mb8" @tap.stop="commodity(item,index)">
							<image class="unchecked m-r-10"
								:src="indes==index? '/static/img/select.png':'/static/img/unchecked.png'" mode="">
							</image>
							<view class="f-28 f-b w-85 onelist-hidden mr10">{{item.store_info.name}}</view>
							<u-icon slot="right" name="arrow-right" size="30rpx"></u-icon>
						</label>
						<view class="dis-flex flex-y-center ml45 mb16">
							<view class="label radio-4 mr16  f-22 border-red-eb col-red-dd"
								v-for="(items,indes) in item.store_info.reduce" :key="indes">{{items}}</view>
						</view>
						<checkbox-group class="goods-box ml45">
							<label class="dis-flex flex-y-center mb40 goods-item"
								v-for="(items,indexs) in item.info.list" :key="indexs" @tap="store(items.merchant_id)">
								<!-- <checkbox color="#D62E36" :disabled="item.num==0?true:false"></checkbox> -->
								<view class="wh180 p-r mr24">
									<image mode="aspectFill" class="wh180  radio-8" :class="items.num==0?'opacity-5':''"
										:src="items.img"></image>
									<view class="wh88 radio-100 num-null col-white-ff" v-if="items.num==0">无货</view>
								</view>

								<view class="w-70 h-100 dis-flex flex-x-between flex-dir-column">
									<view>
										<view class="f-28 f-b w-100 onelist-hidden mb8"
											:class="items.num==0?'col-gray-8e':''">{{items.name}}</view>
										<view class="f-24 col-gray-88" v-if="items.spec1 ||items.attribute">规格：
											<text>{{items.spec1 || ''}}</text>
											<text class="m-l-10">{{items.attribute || ''}}</text>
										</view>
									</view>
									<view class="dis-flex flex-y-center flex-x-between">
										<view class="t-b">
											<text class=" f-36 f-b" :class="items.num==0?'col-red-ec':'col-red-d9'">
												<text class="f-24">¥</text>
												<text>{{parseFloat(items.price).toFixed(2)}}</text>
											</text>
											<text class="text-line f-24 col-gray-88 ml10">¥{{items.scribe_price}}</text>
										</view>
										<view class="Order_num">
											<view class="Order_num">
												<view class="Order_num_contect">
													<view class="Order_num_del"
														@tap.stop="delNum(items,item,indexs,index)">
														-
													</view>
													<view class="Order_num_total">
														{{items.num}}

													</view>
													<view class="Order_num_add"
														@tap.stop="addNum(items,item,indexs,index)">
														+
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</label>
						</checkbox-group>

					</view>
				</view>
				<null-data title="购物车暂无商品" v-if="list.length==0"></null-data>
				<u-loadmore v-else-if="list.length>1" :status="status" fontSize="26rpx" color="#999" />
			</view>
			<view v-if="isMessage==0"
				class="dis-flex btn flex-y-center pl32 pr32 box-size w-100 bg-white-ff flex-x-between fixed-bottom box-shad-t"
				style="bottom: calc(env(safe-area-inset-bottom) + 50px)">
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
					<view class="col-white-ff btn-order bg-red-d6-ec t-c radio-48" @tap="onlink()">去结算</view>
				</view>
			</view>
			<view v-else
				class="dis-flex btn flex-y-center pl32 pr32 box-size w-100 bg-white-ff flex-x-between fixed-bottom box-shad-t"
				style="bottom: 100rpx;">
				<view class=" col-red-d9" @tap="onConfirm">完成</view>
				<view class="dis-flex flex-y-center flex-x-end w-80">
					<!-- 					<view class="border-dd pl40 pr40 f-24 col-brank-20 btn-line radio-28">清空购物车</view> -->
					<view class="border-dd pl40 pr40 f-24 col-brank-20 btn-line  radio-28" @tap="cutout">删除</view>
				</view>
			</view>
		</view>
		<!-- 校U优选 -->
		<view v-if="tabAct == 3" style="padding-bottom: 100rpx;">

			<view class="Car_List" v-for="(item,index) in AllShopCarList" :key="item.id">

				<view class="shopCar_style">
					<view class="dis-flex pt20 pb20 flex-y-center border-b-f7">
						<image src="/static/img/icon-act02.png" mode="" class="moreimg"></image>
						校U优选
					</view>
					<view class="shopCar_store_nick">

						<!-- <image :src="item.id==index?storeChooseImg:storeNoChooseImg" mode="" class="store_choose" @click="StoreChoose(item.id,index)"></image> -->
						<label for="" class="radio foot-radio" @tap='checkedAllFn(item,index)'>
							<radio value="" color="#FF3333" :checked="item.checked"></radio><text></text>
						</label>
						<view class="store_name">
							{{item.name}}
						</view>
						<image src="/static/img/ico_gengduo.png" mode="" class="store_choose"></image>
					</view>
					<view class="shopCar_store_discount" @click="getRedpacket(item.shop_id)">
						<view class="evaluate_infor">
							<view class="evaluate_infor">
								<view class="evaluate_contect_discount">
									<text class="discount_text">
										店铺优惠券
									</text>
								</view>
							</view>
						</view>
						<image src="/static/img/ico_gengduo.png" mode="" class="evaluate_Moreimg"></image>
					</view>
					<view class="shopCar_store_nick" v-for="(item3,index) in item.list" :key="item3.product_id">
						<label for="" class="radio" @tap="selectedItem(item,item3,index)">
							<radio value="" color="#FF3333" :checked="item3.checked" /> <text></text>
						</label>
						<image :src="item3.picture" mode="" class="store_content_img" @click="toShopDetail(item3)">
						</image>
						<view class="store_content_child">
							<view class="child_nick">
								{{item3.name}}
							</view>
							<view class="" v-if="item3.status == 2"
								style="display: flex;justify-content: space-between;align-items: center; margin-top: 20rpx;">
								<view class="" style='color: #888888;font-size: 28rpx;font-weight: 500;'>
									商品已失效，请重新选择
								</view>
								<view class="" style='color: #e51860;font-size: 28rpx;font-weight: 500;'
									@click="reelectshopCar(item3)">
									重选
								</view>
							</view>
							<view class="child_type" v-if="item3.status == 1">
								<view class="child_type_style" v-for="item4 in item3.styles"
									@click="reelectshopCar(item3)">
									{{item4.name}}
								</view>
							</view>
							<view
								style="display: flex;justify-content: space-between;align-items: center; margin-top: 40rpx;"
								v-if="item3.status == 1">
								<text>
									<text class="ShopCar_price_ico">￥</text>
									<text
										style="font-size: 36rpx; font-weight: 700;color: #D93038;">{{goodsPrice(item3.styles)}}</text>
								</text>

								<view class="Order_num">
									<view class="Order_num">
										<view class="Order_num_contect">
											<view class="Order_num_del" @click="delAlreadyNum(item3)">
												-
											</view>
											<view class="Order_num_total">
												{{item3.num}}
											</view>
											<view class="Order_num_add" @click="addAlreadyNum(item3)">
												+
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="">
				<null-data title="暂无商品" v-if="AllShopCarList.length == 0"></null-data>
			</view>
			<u-gap height="60"></u-gap>
			<!-- 底部拼单按钮 -->
			<view class="">
				<view>
					<view class="add_pay_btn">
						<view class="ShopCar">
							<view class="shopping_car">
								<view class="shopping_car_ico" style="color: #888888;font-size: 24rpx;">
									已选{{selectedList.length}}款
								</view>
							</view>
						</view>
						<view class="statistics">
							<view class="" style="font-size: 24rpx;">
								合计：
							</view>
							<view style="display: flex; align-items: flex-end;">
								<view style="font-size: 24rpx;color:#e51860;">
									￥
								</view>
								<view style="font-size:36rpx;font-weight: 600;color:#e51860;">
									<!-- 79.80 -->
									{{totalPrice}}
								</view>
							</view>
						</view>
						<view class="ShopBtn ">
							<view class="ShopBtn_right">
								<view class="ShopBtn_style" @click="toSubmit">
									提交订单
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 重选购物车弹窗 -->
			<template>
				<u-popup :show="showAlreadyGoods" mode="bottom" @close="showAlreadyGoods=false" :round="10"
					bgColor="#f3f3f3" height="700" :closeable="true" zIndex='10076'>
					<view class="Order_title">
						重选商品属性
					</view>
					<view style="padding: 20rpx;">
						<view class="Order_content_Show">
							<image :src="picture" mode="" class="Order_shopping_img"></image>
							<view class="Order_content_text">
								<view style="height: 148rpx;">
									<view class="Order_price">
										<text>
											<text class="Order_price_ico">￥</text>
											<text class="Order_price_text">{{addCarPrice}}</text>
										</text>
									</view>

									<view class="Order_choose" v-if="size_show || attribute_show">
										已选择：
										<text style="margin-right: 10rpx;">{{size_show}}</text>
										<text>{{attribute_show}}</text>
									</view>
									<view class="Order_choose" v-else>
										请选择商品属性
									</view>
								</view>
								<view class="Order_num">
									<view class="Order_num_contect">
										<view class="Order_num_del" @click="UdelNum">
											-
										</view>
										<view class="Order_num_total">
											{{GoodsNums}}
										</view>
										<view class="Order_num_add" @click="UaddNum">
											+
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="Specification"
							style="margin-bottom: 20rpx; background-color: #fff;border-radius: 8rpx;">
							<view class="Specification_title">
								{{StyleList.size_name}}
							</view>
							<view class="Specification_contect">
								<view class="Specification_contect_item " v-for="(item,index) in Sizestyle"
									:class="Size_styles === index?'Specification_contect_style':''"
									@click="OnChooseSize(index,item)">
									{{item.name}}
								</view>
							</view>
						</view>
						<view class="Specification"
							style="margin-bottom: 20rpx; background-color: #fff;border-radius: 8rpx;"
							v-if='StyleList.attribute_name && Attributestyle.length > 0'>
							<view class="Specification_title">
								{{StyleList.attribute_name}}
							</view>
							<view class="Specification_contect">
								<view class="Specification_contect_item " v-for="(item,index) in Attributestyle"
									:class="Attribute_styles == index?'Specification_contect_style':''"
									@click="OnChooseAttribute(index,item)">
									{{item.name}}
								</view>
							</view>
						</view>
					</view>
					<u-gap height="60" bgColor="#f5f5f5"></u-gap>
					<view class="goods-carts">
						<view class="goods-carts-btn" @click="ReelectSure">
							确认
						</view>
					</view>
				</u-popup>
			</template>
			<!-- 商店红包列表 -->
			<template>
				<view>
					<u-popup :show="showPacket" @close="showPacket = false" mode="bottom" height="700" :closeable="true"
						zIndex='998'>
						<view>
							<view class="Order_title">
								优惠明细
							</view>
							<scroll-view scroll-y="true" class="scroll-Y">
								<view style="padding: 20rpx;">
									<view class="" style="color: #ef5248; font-size: 28rpx;font-weight: 600">
										店铺优惠券
									</view>
									<view class="packetList" v-for="item in RedPacketList"
										v-if="RedPacketList.length>0">
										<view class="packets_detail">
											<view
												style="display: flex;justify-content:flex-start;align-items: baseline;">
												<view style="font-size: 28rpx;font-weight: 700;color: #ef5248;">
													￥
												</view>
												<view style="font-size: 48rpx;font-weight: 700;color: #ef5248;">
													{{item.amount}}
												</view>
											</view>
											<view style="margin-left: 40rpx;">
												<view style="font-size: 28rpx;font-weight: 500;color: #ef5248;">
													满{{item.limit_amount}}减{{item.amount}}元
												</view>
											</view>
										</view>
										<view style="font-size: 28rpx;font-weight: 700;color: #ef5248;"
											@click="receiveCoupon(item)">
											立即领取
										</view>
									</view>
									<view class="">
										<null-data title="暂无优惠" v-if="RedPacketList.length == 0"></null-data>
									</view>

								</view>
							</scroll-view>
						</view>
					</u-popup>

				</view>

			</template>

		</view>

		<null-data v-if="tabAct == 3" title="暂无商品"></null-data>

		<indexHenu :tabAct="3"></indexHenu>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				amount: 0,
				cooperations: '',
				identifiers: [],
				indes: -1,
				isMessage: 0, //是否是管理
				tabAct: 1,
				page: 1,
				status: "loadmore",
				tabList: [{
						name: "校园外卖",
						id: 1
					},
					// {
					// 	name: "本地生活",
					// 	id: 2
					// }, 
					// {
					// 	name: "校U优选",
					// 	id: 3
					// },
				],
				list: [], //购物车列表
				totalPricelength: 0,
				cooperation: [],

				//校U选
				AllShopCarList: [], //购物车列表
				RedPacketList: [], //红包列表
				picture: '', //选择商品加入购物车图片
				size_show: '', //商品规格展示
				attribute_show: '', //商品属性展示
				GoodsNums: 1, //添加购物车数量
				StyleList: '', //商品规格属性
				Sizestyle: [], //商品规格
				Attributestyle: [], //商品属性
				attributePrice: '0', //属性价格
				sizePrice: '0', //规格价格
				sizeId: null, //规格id
				attributeId: null, //属性id
				Size_styles: null, //规格样式
				Attribute_styles: null, //属性样式
				showAlreadyGoods: false, //重选购物车
				showPacket: false, //展示红包列表
				pricetotal: 0,
				selectedList: [], //选中存储
				listShoppingCart: [], //最后列表
				AlreadyshopCar: null, //总价
			}
		},
		//校U
		computed: {
			//总价
			totalPrice() {
				console.log('计算总价')
				let totalPrice = 0
				console.log(this.AllShopCarList, 'this.AllShopCarList');
				this.AllShopCarList.forEach(item => {
					item.list.forEach(item2 => {
						totalPrice += item2.checked ? item2.total * 1 : 0
					})
				})
				this.AlreadyshopCar = totalPrice.toFixed(2)
				return totalPrice.toFixed(2)
			},
			//添加购物车
			addCarPrice() {
				let totalPrice = 0
				// let beforePrice = 0
				let attributePrice = this.attributePrice * 1
				let sizePrice = this.sizePrice * 1
				totalPrice += (attributePrice + sizePrice) * this.GoodsNums

				return totalPrice.toFixed(2)
			},
		},
		onShow() {
			uni.hideTabBar()
			this.getCartLists()
			// this.getShopCat() //校U购物车列表
		},
		onReachBottom() {
			if (this.status != 'nomore') {
				this.getCartLists(true)
			}
		},
		methods: {
			//更改id
			changeTab(id) {
				console.log(id);
				this.tabAct = id
				if (this.tabAct == 1) {
					this.getCartLists()
				}
				if (this.tabAct == 3) {
					this.getShopCat()
				}

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
				if (this.cooperations) {
					this.cleanup()
					this.cooperations = ''
				} else {
					this.$u.toast("请选择您要删除的商品")
				}

			},


			//商品列表减少加入购物车的数量
			delNum(items, item, indexs, index) {
				this.getTakeoutCartSub(items.cart_id)
				this.indes = index
				this.amount = item.info.amount
				this.cooperations = item.merchant_id
				console.log(items)
				this.amount = this.amount - items.price;
				console.log(this.amount, 'del')
			},

			//商品列表添加加入购物车的数量
			addNum(itemsx, item, indexs, index) {
				console.log(itemsx)
				this.getTakeoutCartAdd(itemsx)
				this.indes = index
				this.amount = item.info.amount + parseFloat(itemsx.price);
				this.cooperations = item.merchant_id
				console.log(this.amount, 'add')
			},

			//获取加入购物车接口
			async getTakeoutCartAdd(items) {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.takeoutCartAdd({
					merchant_id: items.merchant_id,
					goods_id: items.goods_id,
					num: 1,
					spec: items.spec || "",
					attribute: items.attribute || "",
				})
				if (status == 200) {
					uni.showToast({
						title: "添加购物车成功",
						icon: "none"
					})
					console.log(data, this.amount)
					this.getCartLists()
					// this.commodity()
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
					this.getCartLists()
				}

			},

			//获取订单列表
			async getCartLists(isPage) {
				console.log('获取订单')
				uni.showLoading({
					title: "正在加载中",
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
				} = await that.$api.cartlists({
					page: this.page,
					order_type: this.tabAct
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

			//清空购物车 或清空某一个商品 
			async cleanup(merchant_id) {
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.takeoutCartClear({
					merchant_id: this.cooperations,
				})
				if (status == 200) {
					uni.showToast({
						title: "删除成功",
						icon: "none"
					})
					this.getCartLists()
					this.amount = 0
				}

			},

			commodity(item, index) {
				console.log(item)
				this.amount = item.info.amount.toFixed(2)
				this.indes = index
				this.cooperations = item.merchant_id
			},

			//清结算页面
			onlink(url) {
				if (this.cooperations) {
					uni.navigateTo({
						url: '/pagesIndex/page/campusTakeout/index/addOrder/addOrder?id=' + this.cooperations
					})
				} else {
					this.$u.toast("请选择商品")
				}

			},

			store(merchant_id) {
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id=' + merchant_id
				})
			},

			//获取购物车列表
			getShopCat() {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
				}
				this.$http.post('/api/user/listShoppingCart', data)
					.then(res => {
						if (res.code == 200) {

							if (this.AllShopCarList.length > 0) {
								for (var i = 0; i < this.AllShopCarList.length; i++) {
									if (res.data.list[i]) {
										res.data.list[i].checked = this.AllShopCarList[i].checked
										for (var j = 0; j < this.AllShopCarList[i].list.length; j++) {
											if (res.data.list[i].list[j]) {
												res.data.list[i].list[j].checked = this.AllShopCarList[i].list[j]
													.checked
											}

										}
									}

								}
							}

							this.AllShopCarList = res.data.list


						}
					})
			},
			//前往商品详情
			toShopDetail(item) {
				// console.log(item);
				uni.navigateTo({
					url: `/pagesOptimization/pages/shopDetails/shopDetails?goods_id=${item.shop_goods_id}`,
				})
			},
			//红包列表
			getRedpacket(id) {
				this.showPacket = true
				const data = {
					shop_id: id
				}
				this.$http.post('/api/shop/listRedPacket', data).then(res => {
					if (res.code == 200) {
						this.RedPacketList = res.data.list

					}
				})
			},
			//用户领取店铺红包
			receiveCoupon(item) {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					red_packet_id: item.id
				}
				this.$http.post("/api/user/receiveRedPacket", data)
					.then(res => {
						if (res.code == 200) {
							uni.showModal({
								title: '提示',
								content: res.data,
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						} else {
							uni.showModal({
								title: '提示',
								content: res.message,
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						}
					})
			},
			//商品价格
			goodsPrice(item) {
				let goodsPrice = 0
				item.forEach(item1 => {
					goodsPrice += item1.price * 1
				})
				return goodsPrice.toFixed(2)
			},
			// 单选
			selectedItem(item, item3, index) {
				item3.checked = !item3.checked
				if (item3.checked) {
					this.selectedList.push(item3.id);
					let isChecked = true
					item.list.forEach(i => {
						if (!i.checked) {
							isChecked = false
						}
					})
					item.checked = isChecked
				} else {
					let removeArr = this.selectedList
					this.selectedList = removeArr.filter(val => val != (item3.id))
					item.checked = false
				}
				// console.log(this.AllShopCarList, 'this.AllShopCarList');
				console.log(this.selectedList, 'this.selectedList');
			},
			// 全选
			checkedAllFn(item, index) {
				item.checked = !item.checked
				if (item.checked) {
					item.list.forEach(v => {
						v.checked = true;
						let addArr = this.selectedList
						if (addArr.indexOf(v.id) == -1) {
							this.selectedList.push(v.id)
						}

					})
				} else {
					item.list.forEach(v => {
						v.checked = false;
						let removeArr = this.selectedList
						this.selectedList = removeArr.filter(val => val != (v.id))
					})
				}
			},
			delAlreadyNum(item) { //减少订单
				let num = item.num - 1
				console.log(num);
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					id: item.id,
				}
				if (num == 0) {
					data.disable = 1
				} else {
					data.num = num
				}
				this.$http.post('/api/user/editShoppingCart', data)
					.then(res => {
						if (res.code == 200) {
							this.getShopCat()
						}
					})
			},
			addAlreadyNum(item) { //添加
				let num = item.num + 1
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					id: item.id,
					num: num
				}
				this.$http.post('/api/user/editShoppingCart', data)
					.then(res => {
						if (res.code == 200) {
							this.getShopCat()
						}
					})
			},
			//查询商品规格/属性
			getSizeStyle(id) {
				const data = {
					goods_id: id
				}
				this.$http.post('/api/shop/getSize', data)
					.then(res => {
						if (res.code == 200) {
							this.StyleList = res.data
							this.Sizestyle = res.data.size

							if (res.data.attribute_name && res.data.size[0].attr) {
								this.Attributestyle = res.data.size[0].attr
							}
						}
					})
			},
			//修改商品规格
			reelectshopCar(item) {
				this.picture = item.picture
				this.shopCarid = item.id //购物车id
				this.getSizeStyle(item.shop_goods_id)
				this.showAlreadyGoods = true
				this.size_show = ''
				this.attribute_show = ''
				this.GoodsNums = 1
				this.sizePrice = '0'
				this.attributePrice = '0'
				this.Size_styles = null
				this.Attribute_styles = null
			},
			// 数量加减
			UdelNum() {
				if (this.GoodsNums > 1) {
					this.GoodsNums--
				}
			},
			UaddNum() {
				this.GoodsNums++
			},
			//选择商品版本
			OnChooseSize(index, item) {
				this.Size_styles = index
				this.size_show = item.name
				console.log(item);
				this.sizePrice = item.price
				this.sizeId = item.id
				this.Attributestyle = item.attr
				this.Attribute_styles = null
				this.attribute_show = ''
				this.attributePrice = '0'
				this.attributeId = null

				if (item.url) {
					this.picture = item.url //选择商品图片
				}
			},
			//选择商品属性
			OnChooseAttribute(index, item) {
				this.Attribute_styles = index
				this.attribute_show = item.name
				this.attributeId = item.id
				this.attributePrice = item.price
				// if (this.StyleList.attribute_name) {
				// 	this.attributePrice = item.price
				// }
				if (item.url) {
					this.picture = item.url //选择商品图片
				}
			},
			//确定重选
			ReelectSure() {
				if (!this.size_show) {
					uni.showToast({
						title: '请选择商品属性',
						//将值设置为 success 或者直接不用写icon这个参数
						icon: 'none',
						//显示持续时间为 2秒
						duration: 2000
					})
					return
				}
				if (this.StyleList.attribute_name && this.Attributestyle.length > 0) {
					if (!this.attribute_show) {
						uni.showToast({
							title: '请选择商品属性',
							//将值设置为 success 或者直接不用写icon这个参数
							icon: 'none',
							//显示持续时间为 2秒
							duration: 2000
						})
						return
					}
				}

				let arr = []
				if (this.attributeId) {
					arr.push(this.attributeId)
				}
				arr.push(this.sizeId)
				console.log(arr);
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					id: this.shopCarid,
					num: this.GoodsNums,
					styles: JSON.stringify(arr)
				}

				this.$http.post('/api/user/editShoppingCart', data)
					.then(res => {
						if (res.code == 200) {
							this.getShopCat()

							this.showAlreadyGoods = false
						}
					})
			},
			toSubmit() {
				this.listShoppingCart = JSON.parse(JSON.stringify(this.AllShopCarList))
				for (var i = 0; i < this.listShoppingCart.length; i++) {
					let item = this.listShoppingCart[i]
					if (!item.checked) {
						console.log(i);
						for (var j = 0; j < item.list.length; j++) {
							let item2 = item.list[j]
							if (!item2.checked) {
								console.log(111);
								this.listShoppingCart[i].list.splice(j, 1);
								j--
							}
						}
						if (item.list.length == 0) {
							console.log(222)
							this.listShoppingCart.splice(i, 1);
							i--
						}
					}
				}
				if (this.listShoppingCart.length == 0) {
					// console.log(1111)
					uni.showToast({
						icon: 'none',
						title: '请选择商品'
					})
					return
				}
				uni.setStorage({
					key: 'listShoppingCart',
					data: this.listShoppingCart,
				});
				uni.navigateTo({
					url: `/pagesOptimization/pages/SubmitOrder/SubmitOrder?total=${this.AlreadyshopCar}&&styleId=2`
				})
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

	.scroll-Y {
		height: 700rpx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.shopCar_style {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 20rpx;
	}

	.shopCar_store_nick {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 40rpx;
	}

	.store_choose {
		width: 32rpx;
		height: 32rpx;

	}

	.store_name {
		font-size: 28rpx;
		font-weight: 600;
		margin: 0 20rpx;
		color: #202020;
	}

	.shopCar_store_discount {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 10rpx 0 20rpx 60rpx;
	}

	.evaluate_contect_discount {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.discount_text {
		font-size: 22rpx;
		color: #D93038;
		// border: 1rpx solid #D93038;
		border-radius: 4rpx;
		padding: 0 4rpx 0;
		margin-right: 8rpx;
	}

	.evaluate_Moreimg {
		width: 34rpx;
		height: 34rpx;
	}

	.store_content_img {
		width: 180rpx;
		height: 180rpx;
		margin-left: 20rpx;
	}

	.store_content_child {
		flex: 1;
		margin-left: 24rpx;
	}

	.child_nick {
		font-size: 28rpx;
		font-weight: 600;
		color: #202020;
	}

	.child_type {
		display: flex;
		font-size: 12px;
		color: #8e8f8e;
	}

	.child_type_style {
		padding: 10rpx 10rpx 10rpx 0;
	}

	.ShopCar_price_ico {
		font-size: 12px;
		color: #d93038;
	}

	.add_pay_btn {
		position: fixed;
		bottom: 100rpx;
		/* bottom: 0; */
		z-index: 22;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		box-sizing: border-box;
		padding: 14rpx 32rpx;
		background-color: #fff;
	}

	.ShopCar {
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.shopping_car {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-right: 30rpx;
	}

	.shopping_car_ico {
		position: relative;
	}

	.ico_car {
		position: relative;
		width: 48rpx;
		height: 48rpx;
	}

	.shoptip {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 32rpx;
		height: 32rpx;
		background: linear-gradient(313deg, #d62e36, #ec434b);
		border-radius: 24rpx;
		border: 2rpx solid #fff;
		position: absolute;
		top: -14rpx;
		right: -14rpx;
		color: #fff;
		font-size: 20rpx;
	}

	.ShopBtn {
		display: flex;
	}

	.ShopBtn_left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 216rpx;
		height: 80rpx;
		opacity: 0.6;
		background: linear-gradient(313deg, #d62e36 6%, #ec434b);
		border-radius: 200rpx 0rpx 0rpx 200rpx;
	}

	.ShopBtn_right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 216rpx;
		height: 80rpx;
		background: linear-gradient(313deg, #d62e36, #ec434b);
		border-radius: 200rpx 200rpx 200rpx 200rpx;
	}

	.ShopBtn_style {
		font-size: 28rpx;
		color: #fff;
		font-weight: 600;
	}

	.statistics {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.Order_content_Show {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 220rpx;
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx;
		margin-bottom: 20rpx;
	}

	.Order_shopping_img {
		width: 148rpx;
		height: 148rpx;
		border-radius: 8rpx;
	}

	.Order_content_text {
		// display: flex;
		// justify-content: space-between;
		// flex-direction: column;
		width: 75%;
		height: 148rpx;
	}

	.Order_price {
		display: flex;
		align-items: center;
		// width: 85%;

	}

	.Order_price_before {
		color: #d93038;
		font-size: 24rpx;
	}

	.Order_price_ico {
		color: #d93038;
		font-size: 24rpx;
		font-weight: 700;
	}

	.Order_price_text {
		color: #d93038;
		font-size: 32rpx;
		font-weight: 700;
	}

	.Order_price_text2 {
		font-size: 24rpx;
		color: #8e8f8e;
		text-decoration: line-through;
	}

	.Order_choose {
		display: flex;
		justify-content: flex-start;
		font-size: 24rpx;
		text-align: left;
		color: #202020;
	}

	.Order_num {
		display: flex;
		justify-content: flex-end;
		// margin-top: 30rpx;
	}

	.Order_num_contect {
		display: flex;
		align-items: center;
	}

	.Order_num_del {
		width: 40rpx;
		height: 40rpx;
		line-height: 36rpx;
		text-align: center;
		border: 2rpx solid #d4d4d4;
		border-radius: 8rpx;
	}

	.Order_num_total {
		min-width: 40rpx;
		text-align: center;
		font-size: 32rpx;
		color: #202020;
	}

	.Order_num_add {
		width: 40rpx;
		height: 40rpx;
		line-height: 36rpx;
		text-align: center;
		color: #fff;
		border: 2rpx solid #d4d4d4;
		border-radius: 8rpx;
		background: linear-gradient(313deg, #d62e36, #ec434b);
	}

	.Order_title {
		text-align: center;
		font-weight: 700;
		font-size: 32rpx;
		color: #202020;
		margin-top: 40rpx;
		margin-bottom: 30rpx;
	}

	.Order_content_Show {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 220rpx;
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx;
		margin-bottom: 20rpx;
	}

	.Order_shopping_img {
		width: 148rpx;
		height: 148rpx;
		border-radius: 8rpx;
	}

	.Order_content_text {
		// display: flex;
		// justify-content: space-between;
		// flex-direction: column;
		width: 75%;
		height: 148rpx;
	}

	.Order_price {
		display: flex;
		align-items: center;
		// width: 85%;

	}

	.Order_price_before {
		color: #d93038;
		font-size: 24rpx;
	}

	.Order_price_ico {
		color: #d93038;
		font-size: 24rpx;
		font-weight: 700;
	}

	.Order_price_text {
		color: #d93038;
		font-size: 32rpx;
		font-weight: 700;
	}

	.Order_price_text2 {
		font-size: 24rpx;
		color: #8e8f8e;
		text-decoration: line-through;
	}

	.Order_choose {
		display: flex;
		justify-content: flex-start;
		font-size: 24rpx;
		text-align: left;
		color: #202020;
	}

	.Specification {
		padding: 20rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
		border-radius: 8rpx;
	}

	.Specification_title {
		font-size: 24rpx;
		font-weight: 600;
		margin-bottom: 16rpx;
		margin-left: 10rpx;
	}

	.Specification_contect {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.Specification_contect_item {
		min-width: 158rpx;
		max-width: 100%;
		width: max-content;
		padding: 0 8rpx;
		box-sizing: border-box;
		height: 56rpx;
		text-align: center;
		line-height: 56rpx;
		margin: 10rpx;
		font-size: 24rpx;
		border-radius: 8rpx;
		background: #f6f6f8;
	}

	.Specification_contect_style {
		border: 2rpx solid #d93038;
		color: #d93038;
	}

	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}

	.goods-carts-btn {
		width: 686rpx;
		height: 80rpx;
		background: linear-gradient(313deg, #d62e36 6%, #ec434b);
		border-radius: 44rpx;
		font-size: 32rpx;
		font-weight: 500;
		text-align: center;
		color: #ffffff;
		line-height: 80rpx;
		margin-left: 32rpx;
	}

	.packetList {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #ffceb7;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-top: 20rpx;
	}

	.packets_detail {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.Car_List {
		padding: 20rpx;
	}

	.moreimg {
		width: 40rpx;
		height: 40rpx;
	}
</style>