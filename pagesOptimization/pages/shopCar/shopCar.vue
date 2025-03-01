<template>
	<view>
		<view class="" style="padding: 20rpx;" v-for="(item,index) in AllShopCarList" :key="item.id">
			<view class="shopCar_style">
				<view class="shopCar_store_nick">
					<!-- <image :src="item.id==index?storeChooseImg:storeNoChooseImg" mode="" class="store_choose" @click="StoreChoose(item.id,index)"></image> -->
					<label for="" class="radio foot-radio" @tap='checkedAllFn(item,index)'>
						<radio value="" color="#FF3333" :checked="item.checked"></radio><text></text>
					</label>
					<view class="store_name">
						{{item.name}}
					</view>
					<image src="../../static/ico_gengduo@2x.png" mode="" class="store_choose"></image>
				</view>
				<view class="shopCar_store_discount" @click="getRedpacket(item.shop_id)">
					<view class="evaluate_infor">
						<view class="evaluate_infor">
							<view class="evaluate_contect_discount">
								<text class="discount_text">
									领取店铺优惠券
								</text>
							</view>
						</view>
					</view>
					<image src="../../static/ico_gengduo@2x.png" mode="" class="evaluate_Moreimg"></image>
				</view>
				<view class="shopCar_store_nick" v-for="(item3,index) in item.list" :key="item3.product_id">
					<label for="" class="radio" @tap="selectedItem(item,item3,index)">
						<radio value="" color="#FF3333" :checked="item3.checked" /> <text></text>
					</label>
					<image :src="item3.picture" mode="" class="store_content_img" @click="toShopDetail(item3)"></image>
					<view class="store_content_child">
						<view class="child_nick">
							{{item3.name}}
						</view>
						<view class="" v-if="item3.status == 2 || item3.status == 3"
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
							<view class="child_type_style" v-for="item4 in item3.styles" @click="reelectshopCar(item3)">
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
					添加购物车
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
								<view class="packetList" v-for="item in RedPacketList" v-if="RedPacketList.length>0">
									<view class="packets_detail">
										<view style="display: flex;justify-content:flex-start;align-items: baseline;">
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
		<!-- 提示信息 -->
		<template>
			<u-notify ref="isShowtip" :show="isShowtip"></u-notify>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				AllShopCarList: [], //购物车列表
				RedPacketList: [], //红包列表
				size_show: '', //商品规格展示
				attribute_show: '', //商品属性展示
				GoodsNums: 1, //添加购物车数量
				StyleList: '', //商品规格属性
				Sizestyle: [], //商品规格
				Attributestyle: [], //商品属性
				attributePrice: '0', //属性价格
				sizePrice: '0', //规格价格
				sizeId: '', //规格ids
				attributeId: '', //属性id
				Size_styles: '', //规格样式
				Attribute_styles: '', //属性样式
				showAlreadyGoods: false, //重选购物车
				showPacket: false, //展示红包列表
				pricetotal: 0,
				selectedList: [], //选中存储
				listShoppingCart: [], //最后列表
				AlreadyshopCar: '', //总价
				isShowtip: false, //提示信息
				picture:''

			}
		},
		computed: {
			//总价
			totalPrice() {
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
		onLoad() {
			// this.getShopCat()
		},
		onShow() {
			// this.getShopCat()
		},
		methods: {
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

						} else {
							this.isShowtip = true
							this.$refs.isShowtip.show({
								type: 'error',
								message: res.message,
								safeAreaInsetTop: true
							})
							return
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
							// uni.showModal({
							// 	title: '提示',
							// 	content: res.data,
							// 	success: function(res) {
							// 		if (res.confirm) {
							// 			console.log('用户点击确定');
							// 		} else if (res.cancel) {
							// 			console.log('用户点击取消');
							// 		}
							// 	}
							// })
							this.isShowtip = true
							this.$refs.isShowtip.show({
								type: 'success',
								message: res.message,
								safeAreaInsetTop: true
							})
							return
						} else {
							// uni.showModal({
							// 	title: '提示',
							// 	content: res.message,
							// 	success: function(res) {
							// 		if (res.confirm) {
							// 			console.log('用户点击确定');
							// 		} else if (res.cancel) {
							// 			console.log('用户点击取消');
							// 		}
							// 	}
							// })
							this.isShowtip = true
							this.$refs.isShowtip.show({
								type: 'error',
								message: res.message,
								safeAreaInsetTop: true
							})
							return
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
						} else {
							this.isShowtip = true
							this.$refs.isShowtip.show({
								type: 'error',
								message: res.message,
								safeAreaInsetTop: true
							})
							return
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
						} else {

							this.isShowtip = true
							this.$refs.isShowtip.show({
								type: 'error',
								message: res.message,
								safeAreaInsetTop: true
							})
							return
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
						// if (res.code == 200) {
						// 	this.StyleList = res.data
						// 	this.Sizestyle = res.data.size.list
						// 	// if (res.data.attribute) {
						// 	// 	this.Attributestyle = res.data.attribute.list
						// 	// }
						// 	if (res.data.attribute_name && res.data.size[0].attr) {
						// 		this.Attributestyle = res.data.size[0].attr
						// 	}
						// }
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

				this.size_show = ''
				this.attribute_show = ''
				this.GoodsNums = 1
				this.sizePrice = '0'
				this.attributePrice = '0'
				this.Size_styles = ''
				this.Attribute_styles = ''
				this.showAlreadyGoods = true
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
				if (this.StyleList.attribute_name  && this.Attributestyle.length > 0) {
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
						} else {
							this.isShowtip = true
							this.$refs.isShowtip.show({
								type: 'error',
								message: res.message,
								safeAreaInsetTop: true
							})
							return
						}
					})
			},
			//提交订单
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
		}
	}
</script>

<style lang="scss" scoped>
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
		bottom: 0;
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
</style>
