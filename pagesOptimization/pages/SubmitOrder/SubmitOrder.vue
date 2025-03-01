<template>
	<view>
		<template>
			<u-tabs :list="list1" @click="isSwitch"></u-tabs>
		</template>
		<!-- 默认收地址 -->
		<view class="" v-if="choosAdress == 1 ">
			<view class="Order_address" v-if="delivery.length == 0" @tap="addressList">
				<view class="Order_address_left">
					<image src="../../static/ico_dingwei_cai@2x.png" mode="" class="add_ico"></image>
					<view class="add_address_text">
						添加地址
					</view>
				</view>
				<view class="">
					<u-icon name="arrow-right" color="#8e8f8e"></u-icon>
				</view>
			</view>
			<view class="Order_address" v-else @click="selDelivery">
				<image src="../../static/ico_dingwei_cai@2x.png" mode="" class="add_ico"></image>
				<view class="Order_address_left">
					<view class="">
						<view class="address_show_tel">
							<text style="margin-right: 20rpx;">{{address.member_name}}</text>
							<text>{{address.member_tel}}</text>
						</view>
						<view class="address_show_text">
							{{address.address}}
						</view>
					</view>
				</view>
				<view class="">
					<u-icon name="arrow-right" color="#8e8f8e"></u-icon>
				</view>
			</view>
		</view>
		<!-- 自提点地址 -->
		<view class="" v-if="choosAdress == 2">
			<view class="Order_address" v-if="PickLocationList.length == 0">
				<view class=" Order_address_left">
					<image src="../../static/ico_dingwei_cai@2x.png" mode="" class="add_ico_zt">
					</image>
					<view class="add_address_text">
						暂无自提点
					</view>
				</view>
				<view class="">
					<u-icon name="arrow-right" color="#8e8f8e"></u-icon>
				</view>
			</view>
			<view class="Order_address" @click="selfPick" v-else>
				<image src="../../static/ico_dingwei_cai@2x.png" mode="" class="add_ico_zt"></image>
				<view class="Order_address_left">
					<view class="">
						<view class="address_show_tel">
							<text style="margin-right: 20rpx;">{{PickLocation.name}}</text>
						</view>
						<view class="address_show_text">
							{{PickLocation.address}}
						</view>
					</view>
				</view>
				<view class="">
					<u-icon name="arrow-right" color="#8e8f8e"></u-icon>
				</view>
			</view>
			<view class="Order_detail_text"
				style="background: #fff;border-radius: 16rpx;padding: 24rpx; margin-bottom: 20rpx;">
				<view class="Order_text_style">
					收货人姓名
				</view>
				<input class="t-r f-26" v-model="selfpickname" name="remark" placeholder="请填写收货人" maxlength="11">
			</view>
			<view class="Order_detail_text"
				style="background: #fff;border-radius: 16rpx;padding: 24rpx; margin-bottom: 20rpx;">
				<view class="Order_text_style">
					收货人电话
				</view>
				<input class="t-r f-26 " v-model="selfpicktel" name="remark" placeholder="请填写联系电话" type="number"
					maxlength="11">
			</view>
		</view>
		<!-- 订单详情 -->
		<view style="padding: 20rpx; background-color: #fff; margin-top: 20rpx;"
			v-for="(itemAllCar,index) in AllShopCarList">
			<!-- 全部购物车 -->
			<view style="margin-top: 20rpx;">
				<view class="store_name" @click="test(itemAllCar)">
					<!-- 柳州好欢螺旗舰店 -->
					{{itemAllCar.name}}
				</view>
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="product" v-for="itemStoreCar in itemAllCar.list">
						<view class="product_content">
							<image :src="itemStoreCar.picture" mode="" class="product_img"></image>
							<view class="product_introduction">
								<view class="product_name">
									{{itemStoreCar.name}}
								</view>
								<view class="product_type"
									style="display: flex;justify-content: flex-start;margin: 8rpx 0;">
									<view class="product_type" v-for="itemStyle in itemStoreCar.styles">
										<view class="">

										</view>
										{{itemStyle.name}}
									</view>
								</view>
								<view class="product_type">
									x{{itemStoreCar.num}}
								</view>
							</view>
						</view>
						<view class="product_price">
							<view style="font-size: 24rpx;font-weight:700;color: #202020;">
								¥
							</view>
							<view style="font-size: 32rpx;font-weight:700;color: #202020;">
								{{itemStoreCar.total}}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="Order_Details">
				<view class="" style="font-size: 28rpx;color:#222426;">
					运费
				</view>
				<view class="product_price" v-if="addressName">
					<view style="font-size: 32rpx;font-weight:700;color: #202020;">
						{{CountpostAge(itemAllCar,index)}}
					</view>
				</view>
			</view>
			<view class="Order_Details" v-if="choosAdress == 2 && PickLocationList.length>0 ">
				<view class="" style="font-size: 28rpx;color:#222426;">
					自提点配送费
				</view>
				<view class="product_price">
					<view style="font-size: 32rpx;font-weight:700;color: #202020;">
						¥{{PickLocation.commission}}
					</view>
				</view>
			</view>
			<view class="Order_Details" @click="Redpacket(itemAllCar.list,itemAllCar.shop_id)">
				<view class="" style="font-size: 28rpx;color:#222426;">
					店铺满减
				</view>
				<view class="product_price">
					<view style="font-size: 32rpx;font-weight:700;color: #D93038;" v-if="ArrPacket[itemAllCar.shop_id]">
						-¥{{ArrPacket[itemAllCar.shop_id]}}
					</view>
					<image src="../../static/ico_gengduo@2x.png" mode="" style="width: 24rpx;height: 24rpx;"></image>
				</view>
			</view>
			<view class="Order_Details">
				<view class="" style="display: flex;justify-content: flex-start;align-items: center;">
					<image src="../../static/ico_xiaouhongbao@2x.png" mode="" style="width: 28rpx;height: 28rpx;">
					</image>
					<view class="" style="font-size: 28rpx;color:#222426;">
						红包
					</view>
				</view>
				<!-- 				<view class="product_price">
					<view style="font-size: 24rpx;font-weight:700;color: #D93038;">
						¥
					</view>
					<view style="font-size: 32rpx;font-weight:700;color: #D93038;">
						2.0
					</view>
					<image src="../../static/ico_gengduo@2x.png" mode="" style="width: 24rpx;height: 24rpx;"></image>
				</view> -->
			</view>
			<view class="Order_Details" v-if="AllShopCarList.length == 1">
				<view class="" style="font-size: 28rpx;color:#222426;">
					备注
				</view>
			</view>
			<view class="Order_detail_text">
				<u-textarea v-model="remarkValue" placeholder="选填,给商家留言" autoHeight border='none' confirmType='done'>
				</u-textarea>
			</view>
		</view>


		<u-gap height="60"></u-gap>
		<!-- 提交订单 -->
		<view class="sub_order_btn">
			<view class="" style="display: flex;justify-content: flex-start; align-items: baseline;">
				<view class="" style="font-size: 24rpx;color: #202020; margin-right: 16rpx;">
					合计
				</view>
				<view class="" style="font-size: 24rpx;color: #D93038;font-weight: 700;">
					¥
				</view>
				<view class="" style="font-size: 44rpx;color: #D93038;font-weight: 700;" v-if="addressName">
					{{finalprice}}
				</view>
			</view>
			<view class="submitBtn" @click="toSubmitOrder">
				提交订单
			</view>
			<template>
				<u-notify ref="iSshowPay" :show="iSshowPay"></u-notify>
			</template>
		</view>
		<!-- 默认选择地址列表-->
		<template>
			<view :catchtouchmove="true">
				<u-popup :show="showDelivery" bgColor="#F7F7F7" round="32rpx" :closeable="true"
					@close="showDelivery=false" zIndex="10099">
					<view class="win-delivery" v-if="address">
						<view class="f-32 f-b t-c w-100 mb40">选择收货地址</view>
						<scroll-view class="scroll" scroll-y="true">
							<radio-group @change="selAddressChange">
								<label class="dis-flex  pt24 pb24 pl24 pr24 flex-y-center radio-16 bg-white-ff mb20"
									v-for="(item,index) in delivery" :key="index">
									<radio class="mr15" color="#E73E46" :value="String(index)"
										:checked="address.id==item.id">
									</radio>
									<view class="w-80 mr35">
										<view class="f-28 f-b mb14">
											<text class="mr8">{{item.member_name}}</text>
											<text>{{item.member_tel}}</text>
										</view>
										<view class="twolist-hidden f-24">{{item.address+item.details}}</view>
									</view>
									<view class="w-15 dis-flex flex-x-end" @tap.stop="editAddress(item)">
										<u-icon name="arrow-right" size="28rpx"></u-icon>
									</view>

								</label>
							</radio-group>
						</scroll-view>
						<view class="radio-16 add-delivery w-100 t-c col-red-d9 f-28 bg-white-ff" @tap="addressList">+
							新增收货地址</view>
					</view>
				</u-popup>
			</view>
		</template>
		<!-- 自提点选择地址列表 -->
		<template>
			<view :catchtouchmove="true">
				<u-popup :show="showSelfPick" bgColor="#F7F7F7" round="32rpx" :closeable="true"
					@close="showSelfPick=false" zIndex="10099">
					<view class="win-delivery" v-if="PickLocation">
						<view class="f-32 f-b t-c w-100 mb40">选择自提点地址</view>
						<scroll-view class="scroll" scroll-y="true">
							<radio-group @change="selPickLocationChange">
								<label class="dis-flex  pt24 pb24 pl24 pr24 flex-y-center radio-16 bg-white-ff mb20"
									v-for="(item,index) in PickLocationList" :key="index">
									<radio class="mr15" color="#E73E46" :value="String(index)"
										:checked="PickLocation.id==item.id">
									</radio>
									<view class="w-80 mr35">
										<view class="f-28 f-b mb14">
											<text class="mr8">{{item.name}}</text>
											<!-- <text>{{item.member_tel}}</text> -->
										</view>
										<view class="twolist-hidden f-24">{{item.address}}</view>
									</view>
								</label>
							</radio-group>
						</scroll-view>
					</view>
				</u-popup>
			</view>
		</template>
		<!-- 用户已领取红包列表 -->
		<template>
			<view>
				<u-popup :show="UsreInfopacket" @close="UsreInfopacket=false" mode="bottom" height="800"
					:closeable="true" z-index="10099">
					<view>
						<view class="Order_title">
							已领取店铺优惠券
						</view>
						<scroll-view scroll-y="true" class="scroll-redp">
							<view style="padding: 20rpx;">
								<view class="" style="color: #ef5248; font-size: 28rpx;font-weight: 600">
									店铺优惠券
								</view>
								<view class="packetList" v-for="(item,index) in UserPacketList"
									v-if="UserPacketList.length>0">
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
										@click="UseRedPacket(item)" v-if='item.status == 1'>
										立即使用
									</view>
									<!-- 									<view style="font-size: 28rpx;font-weight: 700;color: #222222; margin-left: 10rpx;"
										@click="delUseRedPacket(item)" v-if='item.status == 1'>
										取消
									</view> -->
									<view style="font-size: 28rpx;font-weight: 700;color: #6f6b6b;"
										v-if='item.status == 2'>
										已使用
									</view>
									<view style=" font-size: 28rpx;font-weight: 700;color: #6f6b6b;"
										v-if='item.status == 3'>
										已过期
									</view>
								</view>
								<null-data title="暂无已领取店铺红包" v-if="UserPacketList.length == 0"></null-data>
							</view>
						</scroll-view>
					</view>
				</u-popup>
			</view>
			<template>
				<u-notify ref="isRedpackettip" :show="isRedpackettip"></u-notify>
			</template>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				remarkValue: '', //备注
				isAdress: 0,
				choosAdress: 1, //默认地址为1，自提点为2
				list1: [{
					name: '默认地址',
				}, {
					name: '邮寄到自提点',
				}],
				styleid: '', // 1店铺购物车 2购物车
				StoretotalPrice: null, //总价格 
				payforPrice: null, //应付金额
				shop_id: '', //店铺Id 
				AlreadyList: '', //店铺信息
				// AlreadycarList: [], //店铺购物车列表
				AllShopCarList: [], //购物车列表
				delivery: [], //默认收货地址
				address: '', //当前收货地址
				addressName: '', //当前收货地址省份
				regionsList: [], //邮费列表
				postageAddress: '', //当前地址邮费判断
				postAge: 0, //默认邮费
				storePostAge: {}, //每个商店总邮费
				storegoods: {}, //每个店铺的商品总价格
				PickLocationList: [], //自提点地址列表
				PickLocation: '', //当前自提点
				PickLocationName: '', //当前自提点省份
				selfpickname: '', //自提收货人名字
				selfpicktel: '', //自提收货人电话
				showDelivery: false, //显示选择地址列表
				showSelfPick: false, //显示自提点列表
				UserPacketList: [], //用户领取红包列表
				UserRedPacket: null, //用户能否使用的红包条件
				UsreInfopacket: false, //用户领取红包列表
				ArrPacket: {}, //展示的使用的红包
				user_pay_packet: {}, //使用红包ID
				isSubmit: false, //是否不可配送
				isExist: false, //匹配是否存在地址
				should_pay_amount: {}, //单个商店应付金额
				iSshowPay: false, //是否展示提交支付
				commissionPrice: 0, //自提点配送费
				isRepire: {}, //是否重复
				isRedpackettip: false, //未满足红包条件提示
				pay_no: '', //支付编号
			};
		},
		onLoad(item) {
			this.styleid = item.styleId
			if (item.styleId == 1) {
				this.StoretotalPrice = item.total
				this.shop_id = item.shop_id //店铺跳转带shop_id
			}
			if (item.styleId == 2) {
				this.StoretotalPrice = item.total
				let tmp = uni.getStorageSync('listShoppingCart')
				this.AllShopCarList = Object.assign([], tmp)
			}
			this.getShopaddList()
			this.getAddressListData() //获取默认收货地址列表

		},
		onShow() {
			this.getShopCat()
		},
		watch: {
			//默认地址改变
			address: {
				handler(newName, oldName) {
					if (newName) {
						this.addressName = newName.address.slice(0, 2)
					}
				},
				immediate: true
			},
			//自提点地址改变
			PickLocation: {
				handler(newName, oldName) {
					if (newName) {
						this.PickLocationName = newName.address.slice(0, 2)
					}
				},
				immediate: true
			},
		},
		computed: {
			finalprice() {

				let arr = []
				let totalPrice = 0
				let redpacketPrice = 0

				for (let key in this.ArrPacket) {
					arr.push({
						redprice: this.ArrPacket[key], // label 字段
						shop_id: key // value字段
					})
				}
				for (var i = 0; i < arr.length; i++) {
					redpacketPrice += arr[i].redprice * 1
				}
				console.log(this.UsreInfopacket); //打印触发方法

				if (this.choosAdress == 1) {
					console.log(redpacketPrice, 'redpacketPrice');
					console.log(arr, 'arr');
					// console.log(redpacketPrice, 'redpacketPrice');
					totalPrice += this.StoretotalPrice * 1 + this.postage - redpacketPrice
				} else {
					totalPrice += this.StoretotalPrice * 1 + this.postage - redpacketPrice + this.commissionPrice *
						this
						.AllShopCarList.length
				}

				console.log(totalPrice, 'totalPrice');
				this.payforPrice = totalPrice.toFixed(2)
				return totalPrice.toFixed(2)
			},
			postage() { //总邮费
				let postAge = 0
				if (this.choosAdress == 1) { //默认地址
					if (this.addressName) {
						this.AllShopCarList.forEach(item => {
							if (item.postage && item.postage !== '存在商品不支持配送') {
								postAge += Number(item.postage)
							}
						})
					}
				} else { //自提点
					if (this.PickLocationName) {
						this.AllShopCarList.forEach(item => {
							if (item.postage && item.postage !== '存在商品不支持配送') {
								postAge += Number(item.postage)
							}
						})

					}
				}
				return postAge
			},
			CountpostAge() { //单商铺邮费
				if (this.choosAdress == 1) { //默认地址
					return function(order) {
						let result = 0
						this.iSshowPay = true
						try {
							order.list.forEach(item => {
								const findRes = item.regions.find(innerItem => {
									return innerItem.region.slice(0, 2) == this.addressName
								})
								if (findRes) {
									if (findRes.shipping_method == 1) {
										result += 0

									} else if (findRes.shipping_method == 2) {
										result += Number(findRes.postage)
									} else {
										result = '存在商品不支持配送'
										throw Error()
									}
								} else {
									result = '存在商品不支持配送'
									throw Error()

								}
							})

						} catch (e) {

						}

						this.AllShopCarList.forEach(item => {
							if (item.shop_id == order.shop_id) {
								item.postage = result
							}
						})
						return result
					}
				} else { //自定义
					return function(order) {
						let result = 0
						this.iSshowPay = true
						try {
							order.list.forEach(item => {
								const findRes = item.regions.find(innerItem => {
									return innerItem.region.slice(0, 2) == this.PickLocationName
								})
								if (findRes) {
									if (findRes.shipping_method == 1) {
										result += 0
									} else if (findRes.shipping_method == 2) {
										result += Number(findRes.postage)
										this.postAge += result
									} else {
										result = '存在商品不支持配送'
										throw Error()
									}
								} else {
									result = '存在商品不支持配送'
									throw Error()
								}
							})

						} catch (e) {

						}
						this.AllShopCarList.forEach(item => {
							if (item.shop_id == order.shop_id) {
								item.postage = result
							}
						})

						return result
					}
				}
			}
		},
		methods: {
			test(item) {
				console.log(item);
			},
			//获取购物车列表
			getShopCat() {
				if (this.styleid == 1) { //店铺商店
					const data = {
						userId: uni.getStorageSync('userInfo').id,
						shop_id: this.shop_id
					}
					this.$http.post('/api/user/listShoppingCart', data)
						.then(res => {
							if (res.code == 200) {
								this.AllShopCarList = res.data.list
							}
						})
				}
			},
			//获取收货地址列表
			async getAddressListData() {
				uni.showLoading({
					title: "正在加载中"
				})
				const {
					data,
					status
				} = await this.$api.getAddressList({
					limit: 1000,
					page: 1,
				})
				uni.hideLoading()
				if (status == 200) {
					this.delivery = data.data
					this.address = this.delivery[0]
				}
			},
			//获取自提地址
			getShopaddList() {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					school_id: uni.getStorageSync('school').id,
				}
				this.$http.post('/api/user/listPickLocation', data)
					.then(res => {
						this.PickLocationList = res.data.list
						this.PickLocation = this.PickLocationList[0]
					})
			},
			//选择收货地址--默认--自选
			isSwitch(item) {
				this.choosAdress = item.index + 1
				if (this.choosAdress == 1) {
					this.postAge = 0
				} else {
					if (this.PickLocationList.length > 0) {
						this.commissionPrice = this.PickLocation.commission * 1
						this.postAge = 0
					} else {
						this.commissionPrice = 0
					}

					// console.log(this.postAge, 'this.postAge ')
				}
			},
			//选择默认地址
			selDelivery() {
				this.showDelivery = true
			},

			//展开红包
			Redpacket(item, id) {

				this.UserRedPacket = null
				let redprice = 0
				for (var i = 0; i < item.length; i++) {
					redprice += item[i].total * 1 //红包使用条件
				}
				this.UserRedPacket = redprice
				this.storegoods[id] = redprice //当前商店总价格
				console.log(redprice, 'qqqq++++');
				this.UsreInfopacket = true
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					shop_id: id
				}
				this.$http.post('/api/user/hasRedPackets', data)
					.then(res => {
						if (res.code == 200) {
							this.UserPacketList = res.data.list
						}
					})
			},
			//使用红包
			UseRedPacket(item) {
				console.log(item);
				let shop_id = item.shop_id
				if (this.styleid = 1) { //店铺购物车
					if ((item.limit_amount * 1) > (this.UserRedPacket * 1)) {
						// console.log(11111111111);

						this.$refs.isRedpackettip.show({
							type: 'error',
							message: '未满足红包使用条件',
							safeAreaInsetTop: true
						})
						return
					}
					this.ArrPacket[shop_id] = item.amount * 1 //当前使用的红包
					this.user_pay_packet[shop_id] = item.id //当前使用红包ID
					console.log(this.ArrPacket, 'this.ArrPacket');
					this.UsreInfopacket = false
				}
			},
			// 取消使用红包
			// delUseRedPacket(item) {
			// 	console.log(item);
			// 	console.log(this.UserRedPacket, '111');
			// 	console.log(this.ArrPacket, '222');
			// 	// let shop_id = item.shop_id
			// 	// if (this.UserRedPacket[shop_id] == item.id) {

			// 	// 	delete this.ArrPacket[shop_id]
			// 	// 	delete this.user_pay_packet[shop_id]
			// 	// 	this.UsreInfopacket = false
			// 	// }
			// },

			// 跳转店铺主页
			toStoreHome() {
				let shopid = this.shop_id
				console.log(shopid);
				uni.navigateTo({
					url: `/pagesOptimization/pages/storehome/storehome?shopid=${this.shop_id}`
				})
			},
			//跳转添加地址页面
			addressList() {
				uni.navigateTo({
					url: '/pagesUser/page/addAddress/addAddress'
				})
			},
			//更改选中的收货地址
			selAddressChange(e) {
				var index = e.detail.value
				this.address = this.delivery[index]
				this.postAge = 0 //切换重置邮费
				// this.changeAddress()
			},
			//跳转修改地址
			editAddress(item) {
				uni.navigateTo({
					url: '/pagesUser/page/addAddress/addAddress?id=' + item.id + '&length=' + this.delivery
						.length
				})
			},
			//选择自提点
			selfPick() {
				this.showSelfPick = true
			},
			//更改选中的自提点地址
			selPickLocationChange(e) {
				var index = e.detail.value
				this.PickLocation = this.PickLocationList[index]
				this.postAge = 0 //切换重置邮费
			},
			//提交订单
			toSubmitOrder() {
				this.AllShopCarList.forEach(item => {
					if (item.postage && item.postage !== '存在商品不支持配送') {
						// postAge += Number(item.postage)
						this.storePostAge[item.shop_id] = item.postage //存单个商店总邮费
					}
				})

				const findRes = this.AllShopCarList.find(item => { //不可配送提醒
					return item.postage === '存在商品不支持配送'
				})
				if (findRes) {
					this.$refs.iSshowPay.show({
						type: 'error',
						message: '存在不可配送商品',
						safeAreaInsetTop: true
					})
					return
				}


				let shop_goods = []
				this.AllShopCarList.forEach((item, index) => { //商店
					shop_goods.push({
						shop_id: '',
						business_user_id: '',
						user_red_packet_id: '',
						should_pay_amount: '',
						list: []
					})

					let storeprice = 0
					item.list.forEach((item2, index2) => { //商品

						storeprice += item2.total * 1
						const gooodsLsit = {
							goods_id: item2.shop_goods_id,
							id: item2.id,
							num: item2.num,
							styles: []
						}
						shop_goods[index].list.push(gooodsLsit)
						item2.styles.forEach((item3, index3) => { //规格属性
							const styles = {
								id: item3.id,
								name: item3.name,
								url: item3.url,
								type: item3.type,

							}
							shop_goods[index].list[index2].styles.push(styles)
						})
					})
					this.storegoods[item.shop_id] = storeprice //单个商店商品总价
					// console.log(this.storegoods, 'PPPPPP++++');
					//添加第一级
					shop_goods[index].shop_id = item.shop_id;
					shop_goods[index].business_user_id = item.list[0].business_user_id;
					shop_goods[index].user_red_packet_id = this.user_pay_packet[item.shop_id] || '';
					if (this.choosAdress == 1) {
						shop_goods[index].should_pay_amount = this.storegoods[item.shop_id] - (this.ArrPacket[
							item
							.shop_id] || 0) + (this.storePostAge[item.shop_id] || 0)
					} else {
						shop_goods[index].should_pay_amount = this.storegoods[item.shop_id] - (this.ArrPacket[
							item
							.shop_id] || 0) + (this.storePostAge[item.shop_id] || 0) + this.commissionPrice
					}

				})
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					school_id: uni.getStorageSync('school').id, //校区id
					should_pay_amount: this.payforPrice, //应付金额
					remark: this.remarkValue,

					// shop_goods: JSON.stringify(shop_goods)
				}
				if (this.choosAdress == 1) { //默认地址
					data.address_id = this.address.id
				} else {
					if (this.PickLocationList.length == 0) {
						this.iSshowPay = true
						this.$refs.iSshowPay.show({
							type: 'error',
							message: '自提点为空，请找团长配置自提点',
							safeAreaInsetTop: true
						})
						return
					}
					let reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/; //手机号校验
					if (!reg.test(this.selfpicktel)) {
						uni.showToast({
							icon: 'none',
							title: '请输入正确的11位手机号'
						})
						return
					}
					data.pick_up_location_id = this.PickLocation.id //自提点ID
					data.name = this.selfpickname //自提收货人名字
					data.phone = this.selfpicktel //自提收货人电话
				}
				data.shop_goods = JSON.stringify(shop_goods)
				this.$http.post('/api/user/submitCartOrder', data)
					.then(res => {
						if (res.code == 200) {
							this.pay_no = res.data.pay_no
							// this.AlreadyPay = res.data.price
							uni.navigateTo({
								url: `/pagesOptimization/pages/PayOrder/PayOrder?type=1&&pay_no=${this.pay_no}`
							})
						} else {
							this.$refs.isRedpackettip.show({
								type: 'error',
								message: res.message,
								safeAreaInsetTop: true
							})
						}

					})

			},
		}
	}
</script>

<style lang="scss" scoped>
	.scroll {
		max-height: 520rpx;
		margin-bottom: 20rpx;
	}

	.scroll-Y {
		max-height: 420rpx;
		min-height: 152rpx;
	}

	.scroll-redp {
		height: 720rpx;
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

	.address {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #ffffff;
		border-radius: 16rpx;
	}

	.add_ico {
		width: 48rpx;
		height: 48rpx;
		padding: 20rpx;
	}

	// .add_ico {
	// 	width: 80rpx;
	// 	height: 48rpx;
	// 	border-radius: 100%;
	// 	margin-right: 20rpx;
	// }
	.moreimg {
		width: 28rpx;
		height: 28rpx;
	}

	.address_show_no {
		font-size: 28rpx;
		font-weight: 500;
		color: #d93038;
	}

	.address_show_tel {
		font-size: 28rpx;
		font-weight: 500;
		color: #202020;
	}

	.address_show_text {
		font-size: 24rpx;
		color: #202020;
	}

	.store_name {
		font-size: 32rpx;
		font-weight: 700;
		color: #333333;
	}

	.product {
		display: flex;
		justify-content: space-between;
		margin-top: 24rpx;
	}

	.product_content {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.product_img {
		width: 112rpx;
		height: 112rpx;
	}

	.product_introduction {
		margin-left: 24rpx;
	}

	.product_name {
		font-size: 28rpx;
		font-weight: 500;
		color: #202020;
	}

	.product_type {
		margin-left: 8rpx;
		font-size: 24rpx;
		color: #888880;
	}

	.product_price {
		display: flex;
		justify-content: flex-start;
		align-items: baseline;
	}

	.Order_Details {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 22rpx;
	}

	.sub_order_btn {
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

	.submitBtn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200rpx;
		height: 72rpx;
		background: linear-gradient(313deg, #d62e36 6%, #ec434b);
		border-radius: 40rpx;
		color: #fff;
	}

	.IssubmitBtn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200rpx;
		height: 72rpx;
		background: linear-gradient(313deg, #d62e36 6%, #ec434b);
		border-radius: 40rpx;
		color: #fff;
	}

	.Order_address {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 40rpx;
		padding-bottom: 34rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}

	.Order_address_left {
		display: flex;
		align-items: center;
	}

	.Order_text_style {
		font-weight: 600;
	}

	.Order_detail_remark {
		font-size: 24rpx;
		text-align: right;
	}

	.Order_detail_text {
		display: flex;
		justify-content: space-between;
		padding-bottom: 14rpx;
		padding-top: 20rpx;
	}



	.add_ico_zt {
		width: 48rpx;
		height: 48rpx;
		border-radius: 100%;
		margin-right: 20rpx;
	}

	.add_address_text {
		width: 100%;
		font-size: 24rpx;
		color: #d93038;
		font-weight: 600;
	}

	.address_show_tel {
		font-weight: 600;
		font-size: 28rpx;
		text-align: left;
		color: #202020;
	}

	.address_show_text {
		font-size: 28rpx;
		width: 95%;
		font-weight: 500;
	}

	.win-delivery {
		padding: 36rpx 24rpx;
		box-sizing: border-box;
	}

	.add-delivery {
		line-height: 72rpx;
		height: 72rpx;
	}

	.Order_title {
		text-align: center;
		font-weight: 700;
		font-size: 32rpx;
		color: #202020;
		margin-top: 40rpx;
		margin-bottom: 30rpx;
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
		// justify-content: flex-start;
	}
</style>