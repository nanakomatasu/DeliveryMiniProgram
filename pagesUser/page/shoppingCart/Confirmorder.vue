<template>
	<view class="shoproottwo" :class="show?'over-hide':''" v-if="detail.goods_list.length>0">
		<view class="orderroot">
			<!-- 头部切换 -->
			<view class="dis-flex  flex-y-end toplisttitle bg-green flex-x-center" v-if="list.length>1">
				<view v-for="(item,index) in list" :key="index"
					class="ordertitle dis-flex w-50 flex-x-center flex-y-center" @click="tochange(index)"
					:style="checkindex==index?'background: #FFFFFF;border-radius: 16rpx 16rpx 0px 0px;height: 96rpx;font-weight: bold;':''">
					{{item.name}}
				</view>
			</view>
			<!-- 收货地址-->
			<view class="p-tb32-lr24 bgwhite " :class="list.length>1?'':'radio-16'" v-if="checkindex==0">
				<!-- 存在收货地址列表 -->
				<view class="zitititle dis-flex flex-y-center flex-x-between" v-if="addressList" @click="toaddress">
					<view class="w-90">
						<view class="zitititleone ">
							<image src="/static/image/ico_moren.png" mode="" style="" class="titleimgone"></image>
							<view class="disinline f-b">
								{{addressList.region.province+addressList.region.city+addressList.region.region+addressList.detail}}
							</view>
						</view>
						<view class="shoppingCartlistflexstart m-t-21">
							<view class=" flex flex-y-center flex-x-center shopaddress">
								{{addressList.name }}
							</view>
							<view class="flex flex-y-center flex-x-center shopaddress m-l-20">
								{{addressList.phone}}
							</view>
						</view>
					</view>
					<image src="/static/image/index-right.png" mode="" class="leftimg28"></image>
				</view>
				<!-- 不存在收货地址列表 -->
				<navigator hover-class="none" class="zitititle dis-flex flex-y-center flex-x-between" v-else
					url="/pagesbranchuser/Receivingaddress/Addreceivingaddress">
					<view class="address-left dis-flex flex-y-center">
						<image src="/static/image/ico_dingwei.png"></image>
						<view class="ml20 f-26 col-gray-8e">请设置收货地址</view>
					</view>
					<image src="/static/image/index-right.png" mode="" class="leftimg28"></image>
				</navigator>
			</view>
			<!-- 自提门店 -->
			<view class="p-tb32-lr24 bgwhite" v-else>
				<navigator hover-class="none"
					:url="'/pagesIndex/pages/selfMention/selfMention?selected_id='+selectedShopId"
					class="dis-flex flex-y-center flex-x-between" v-if="detail.extract_shop.length!=0">
					<view class=" w185 flex flex-y-center  shopaddress">
						门店地址
					</view>
					<view class="dis-flex flex-y-center flex-x-end w-80">
						<view class="t-r">
							{{detail.extract_shop.region.province+detail.extract_shop.region.city+detail.extract_shop.region.region+detail.extract_shop.address}}
						</view>
						<image src="/static/image/index-right.png" mode="" class="leftimg28"></image>
					</view>
				</navigator>
				<navigator hover-class="none" class="zitititle dis-flex flex-y-center flex-x-between" v-else
					:url="'/pagesIndex/pages/selfMention/selfMention?selected_id='+selectedShopId">
					<view class="address-left dis-flex flex-y-center">
						<image src="/static/image/ico_dingwei.png"></image>
						<view class="ml20 f-26 col-gray-8e">请选择自提门店</view>
					</view>
					<image src="/static/image/index-right.png" mode="" class="leftimg28"></image>
				</navigator>
				<view class="shoppingCarttop m-tb-40">
					<view class=" flex flex-y-center flex-x-center shopaddress">
						联系人
					</view>
					<input value="" placeholder="请输入联系人" v-model="linkman" class="t-r" maxlength="11" />
				</view>
				<view class="shoppingCarttop m-tb-40">
					<view class=" flex flex-y-center flex-x-center shopaddress">
						预留电话
					</view>
					<view class="flex flex-y-center flex-x-center">
						<input type="number" value="" placeholder="请输入预留电话" v-model="phone" class="t-r" minlength="11"
							maxlength="11" />
						<image src="/static/image/ico_bianji.png" mode="" class="leftimg24"></image>
					</view>
				</view>
				<view class="shoppingCarttop">
					<view class=" flex flex-y-center flex-x-center shopaddress">
						自提时间
					</view>
					<view class="flex flex-y-center flex-x-center bb65" @click="timeShow = true">
						{{zt_time}}
						<image src="/static/image/index-right.png" mode="" class="leftimg28"></image>
					</view>
				</view>
			</view>
			<view class=" shoppingCartlist">
				<view class="viprecommend m-b-28">
					购物清单
				</view>
				<view v-for="(item,index) in detail.goods_list" :key="index" class="m-b-40 dis-flex ">
					<image :src="item.goods_image" mode="" class="shopimg"></image>
					<view class="w-70">
						<view class="f-28 f-b w-100 onelist-hidden">
							{{item.goods_name}}
						</view>
						<view class="m-b-28 m-t-10 jinweight">
							{{item.goods_sku.goods_attr}}
						</view>
						<view class="dis-flex flex-x-between  flex-y-center wid467">
							<view class="dis-flex flex-y-end flex-x-between total">
								<view class="moneyicon dis-flex flex-y-end">
									¥
								</view>
								<view class="money dis-flex flex-y-end">
									{{ item.goods_price }}
								</view>
								<!-- <view class="line-through linemoney m-b-3">
									{{ item.goods_price }}
								</view> -->
							</view>
							<view>x{{ item.total_num}}</view>
						</view>
					</view>

				</view>
				<view class="shoppingCarttop flex flex-y-center flex-x-between m-b-40">
					<view class="  title40wid">
						配送方式
					</view>
					<view class="flex flex-y-center flex-x-center  title40wid">
						{{list[checkindex].name}}
						<!-- <image src="/static/image/shopcart/ico_gengduo.png" mode="" class="leftimg28"></image> -->
					</view>
				</view>
				<view class="shoppingCarttop flex  flex-x-between">
					<view class="  title40wid">
						买家留言
					</view>
					<input class="graytitle t-r" v-model="remark" placeholder="给卖家留言(50字以内)" maxlength='50'></input>
				</view>
			</view>
			<!-- 金额详细 -->
			<view class="more">
				<view class="shoppingCarttop">
					<view class=" flex flex-y-center flex-x-center title40wid">
						商品金额
					</view>
					<view class="flex flex-y-center flex-x-center normalmoney">
						¥{{detail.order_total_price}}
					</view>
				</view>
				<view class="shoppingCarttop m-tb-40">
					<view class=" flex flex-y-center flex-x-center title40wid">
						运费
					</view>
					<view v-if="defaultaddress_id!=0">
						<view class="flex flex-y-center flex-x-center normalmoney" v-if="detail.intra_region">
							+¥{{detail.express_price}}
						</view>
						<view class="normalmoney" v-else>不在配送范围</view>
					</view>
					<view v-else>请选择配送地址</view>
				</view>
				<view class="shoppingCarttop m-tb-40" v-if="detail.is_allow_points">
					<view class=" flex flex-y-center  title40wid">
						<view class="mr15">可用{{ detail.setting.points_name }}抵扣:</view>
						<!-- <u-icon name="question-circle" color="#999999" size="16"></u-icon> -->
					</view>
					<view class="dis-flex flex-y-center">
						<view class="col-orange-ff f-28 f-b mr10">-¥{{detail.points_money }} </view>
						<u-switch size="18" @change="getOrderbuyNow" v-model="isPoints" activeColor="#0BB65D"
							inactiveColor="#d6d9d9">
						</u-switch>
					</view>
				</view>
				<view class="shoppingCarttop m-tb-40" v-if="option.experience_id">
					<view class=" flex flex-y-center flex-x-center title40wid ">
						体验劵
					</view>
					<view class="flex flex-y-center flex-x-center  col-orange-ff">
						体验劵抵扣商品
					</view>
				</view>
				<view class="shoppingCarttopthree pb30  border-youhui">
					<view class=" flex flex-y-center flex-x-center title40wid ">
						优惠券
					</view>
					<view class="flex flex-y-center flex-x-center  ff" v-if="couponList.length>0" @click="show=!show">
						{{coupon_id > 0 ?('-￥'+detail.coupon_money):('有'+couponList.length+'张优惠券可用')}}
						<image src="/static/image/index-right.png" mode="" class="leftimg28"></image>
					</view>
					<view class="col-gray-8e f-28" v-else-if="couponList.length==0">暂无优惠劵可用</view>
				</view>
				<view class="shoppingCartlisttwo m-t-30">
					<view class="totaltetx">
						合计
					</view>
					<view class="flex flex-y-center flex-x-center  ff m-l-10 ">
						¥{{detail.order_pay_price}}

					</view>
				</view>
			</view>
			<!--支付方式-->
			<view class="shoppingPay m-tb-40">
				<view class="dis-flex flex-y-center pay flex-x-between baseline " v-for="(item,index) in pay"
					:key="index" @tap="onChangePay(index)">
					<view class="pay-left dis-flex flex-y-center">
						<image :src="item.icon"></image>
						<view>{{item.name}}</view>
					</view>
					<image v-if="index==payIndex" src="/static/image/select-pay.png"></image>
				</view>
			</view>
		</view>

		<!-- 底部结算栏 -->
		<view class="shopsettlement dis-flex flex-y-center flex-x-between">
			<view class="dis-flex flex-y-center flex-x-between">
				<view class="dis-flex flex-y-center flex-x-between total">
					<view class="totaltetx">
						合计:
					</view>

					<view class="moneyicon">
						¥
					</view>
					<view class="bigmoney">
						{{detail.order_pay_price}}
					</view>
				</view>
			</view>
			<view class="btn" @click="getOrderbuyNowPost">
				提交订单
			</view>
		</view>



		<!-- 自提时间选择 -->
		<u-datetime-picker ref="datetimePicker" :minDate="minDate" :show="timeShow" v-model="time" mode="datetime"
			@cancel="timeShow=false" @confirm="timeCon"></u-datetime-picker>

		<!-- 弹出框 -->
		<u-popup :show="show" height="" safeAreaInsetBottom="true" @close="show=false" :round="16" bgColor="#F6F6F8"
			borderRadius="16" closeable='true'>
			<view class="youhuipadding ">
				<view class="popuptitle dis-flex flex-x-center">
					优惠券
				</view>
				<view class="popcanuse m-tb-20">
					可使用优惠券：
				</view>
				<scroll-view class="popupi-list" scroll-y="true">
					<radio-group @change="radioChange">
						<label v-for="(item,index) in couponList" :key="item.user_coupon_id"
							class="dis-flex flex-x-around youhuiquancontent p-r flex-y-center m-b-20">
							<image src="/static/image/youhuiquan.png" mode="" class="youhuiquan  "></image>
							<view class="coupon-left dis-flex flex-x-center flex-y-center flex-dir-column">
								<view class="col-white-ff w-100 t-c onelist-hidden" v-if="item.coupon_type.value == 10">
									¥<text class=" f-46 f-b ml5">{{item.reduce_price}}</text>
								</view>
								<view class="col-white-ff f-46 f-b w-100 t-c onelist-hidden"
									v-if="item.coupon_type.value == 20">{{ item.discount }}折
								</view>
								<view class="whitemonerycontent w-100 t-c onelist-hidden">
									满{{ item.min_price }}可用
								</view>
							</view>
							<view class="coupon-right dis-flex flex-y-center flex-x-between">
								<view class="w-80">
									<view class="m-b-37 youhuiquandes">
										{{ item.name }}
									</view>
									<view class="youhuiquandestwo">
										有效期至{{ item.end_time.text }}
									</view>
								</view>
								<radio :value="item.user_coupon_id" :checked="coupon_id==item.user_coupon_id"
									color="#5FC484" class="goodsList"></radio>
							</view>
						</label>
					</radio-group>
				</scroll-view>
				<view class=" radio-40 no-user-coupon" @tap="noUser">不使用优惠劵</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				totalPrice: 0,
				defaultaddress_id: -1, //收货地址默认id
				addressList: null, //获取收货地址列表
				option: {}, //页面参数
				checkindex: 0, //选择配送方式的下标
				list: [],
				detail: {}, //订单详情
				show: false, //是否显示优惠劵
				couponList: [], //优惠劵列表
				isPoints: false, //是否进行d币抵扣
				pay: [{
					icon: "/static/image/wx-icon.png",
					name: "微信支付",
					id: 20,
				}, {
					icon: "/static/image/balance.png",
					name: "余额支付",
					id: 10
				}],
				payIndex: 0, //选中支付的下标
				remark: "", //给买家留言
				btnUse: false, //是否禁用按钮
				showShopList: false, //是否显示自提门店列表
				time: uni.$u.timeFormat(new Date(), 'yyyy-mm-dd hh:MM'), //自提时间
				zt_time: uni.$u.timeFormat(new Date(), 'yyyy-mm-dd hh:MM'), //接口的自提时间
				minDate: Number(new Date()), //最小自提时间
				timeShow: false, //是否显示时间选择器
				selectedShopId: "", //自提门店id
				linkman: "", //自提联系人
				phone: "", //自提电话
				coupon_id: 0,
			}
		},
		onLoad(e) {
			this.option = e

		},
		onShow() {
			//获取当前选择的自提店铺id
			uni.$on("changeId", (e) => {
				this.selectedShopId = e.selectedId || this.selectedShopId
			})


			this.getOrderbuyNow()

		},
		methods: {
			//获取优惠劵列表

			//设置时间选择格式
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value
			},
			// 购物车结算接口
			async getordercart() {
				const token = uni.getStorageSync('token')
				const res = await this.$api.ordercart({
					token: token,
				})
			},

			//更改支付方式
			onChangePay(index) {
				this.payIndex = index
			},
			//自提时间修改
			timeCon(e) {
				console.log(e)
				var time = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM');
				this.zt_time = time
				this.timeShow = false
			},
			noUser(e) {
				this.coupon_id = 0;
				this.show = false
				this.getOrderbuyNow()
			},


			//立即购买  提交订单信息
			async getOrderbuyNowPost() {
				if (this.detail.error_msg != '') {
					uni.showToast({
						title: this.detail.error_msg,
						icon: "none"
					})
					return
				}
				if (this.btnUse) {
					uni.showToast({
						title: '请勿重复提交',
						icon: "none"
					})
					return
				}
				if (this.checkindex == 0 && this.addressList == null) {
					uni.showToast({
						title: '请设置收货地址',
						icon: "none"
					})
					return
				} else if (this.checkindex == 1 && this.selectedShopId == '') {
					uni.showToast({
						title: '请选择自提门店',
						icon: "none"
					})
					return
				} else if (this.checkindex == 1 && this.linkman == '') {
					uni.showToast({
						title: '请输入联系人姓名',
						icon: "none"
					})
					return
				} else if (this.checkindex == 1 && this.phone == '') {
					uni.showToast({
						title: '请填写联系人手机号',
						icon: "none"
					})
					return
				} else if (this.checkindex == 1 && this.phone.length != 11) {
					uni.showToast({
						title: '请填写正确的11位手机号码',
						icon: "none"
					})
					return
				}
				var that = this
				uni.showLoading({
					title: "提交订单"
				})

				this.btnUse = true //禁用按钮
				var urls, dataObj = {
					delivery: this.list[this.checkindex].id || 0,
					shop_id: this.selectedShopId || 0,
					coupon_id: this.coupon_id || 0,
					is_use_points: this.isPoints ? 1 : 0,
					pay_type: this.pay[this.payIndex].id,
					linkman: this.linkman || '',
					phone: this.phone || '',
					remark: this.remark || '',
					zt_time: this.zt_time || ''

				}
				//获取确认订单信息  1就是加入购物车，2就是立即购买 3是精选商品的立即购买
				if (this.option.order_type == 1) {
					urls = 'orderCartPost'
					dataObj.cart_ids = this.option.cart_ids
				} else if (this.option.order_type == 2) {
					urls = 'orderbuyNowPost'
					dataObj.goods_id = this.option.goods_id || ''
					dataObj.goods_num = this.option.goods_num
					dataObj.goods_sku_id = this.option.goods_sku_id
					dataObj.experience_id = this.option.experience_id || ''
				} else if (this.option.order_type == 3) {
					urls = 'sharpOrderPost'
					dataObj.active_time_id = this.option.active_time_id || ''
					dataObj.sharp_goods_id = this.option.goods_id || ''
					dataObj.goods_num = this.option.goods_num
					dataObj.goods_sku_id = this.option.goods_sku_id

				}
				try {
					const {
						data,
						code,
						msg
					} = await this.$api[urls](dataObj)
					uni.hideLoading()
					console.log(code, "code")
					if (code == 1) {
						// 微信支付
						if (data.pay_type == 20) {
							app.wxPayment({
								payment: data.payment,
								success: res => {
									uni.getSetting({
										success(res) {
											console.log(res.authSetting)
											uni.requestSubscribeMessage({
												tmplIds: [
													'3fN6eCRHtxmU9B-ZsUBsUx3YDBIcYdYHE4RP6aRGH9U'
												],
												success(res) {

												}
											})
										}
									})
									that.redirectToOrderIndex();
								},
								fail: res => {
									app.showError(msg.error, () => {
										that.redirectToOrderIndex();
									});
								},
							});
						} else if (data.pay_type == 10) {
							//余额支付
							app.showError(msg.success, () => {
								this.redirectToOrderIndex();
							});
						}
					}

				} catch (err) {
					if (err.code == -10) {
						app.showError(err.msg, () => {
							that.redirectToOrderIndex();
						});
						return false;
					} else {
						that.btnUse = false
					}
				}


			},
			//跳转订单页
			redirectToOrderIndex() {
				this.btnUse = false
				uni.redirectTo({
					url: '/pagesbranchuser/Individualorder/Individualorder'
				})
			},


			// 立即购买
			async getOrderbuyNow() {
				var that = this
				uni.showLoading({
					title: "加载订单信息"
				})
				var urls, dataObj = {
					delivery: this.list.length > 0 ? this.list[this.checkindex].id : 0,
					shop_id: this.selectedShopId || 0,
					coupon_id: this.coupon_id || 0,
					is_use_points: this.isPoints ? 1 : 0,

				}
				//获取确认订单信息  1就是加入购物车，2就是立即购买 3是精选商品的立即购买
				if (this.option.order_type == 1) {
					urls = 'orderCart'
					dataObj.cart_ids = this.option.cart_ids
				} else if (this.option.order_type == 2) {
					urls = 'orderbuyNow'
					dataObj.goods_id = this.option.goods_id || ''
					dataObj.goods_num = this.option.goods_num
					dataObj.goods_sku_id = this.option.goods_sku_id
					dataObj.experience_id = this.option.experience_id || ''

				} else if (this.option.order_type == 3) {
					urls = 'sharpOrder'
					dataObj.active_time_id = this.option.active_time_id || ''
					dataObj.sharp_goods_id = this.option.goods_id || ''
					dataObj.goods_num = this.option.goods_num
					dataObj.goods_sku_id = this.option.goods_sku_id
				}
				const {
					data,
					code
				} = await this.$api[urls](dataObj)
				uni.hideLoading()
				if (code == 1) {
					this.detail = data
					this.couponList = data.coupon_list
					this.addressList = data.address
					that.list = []
					var list = [{
						name: "快递配送",
						id: "10",
					}, {
						name: "门店自提",
						id: "20",
					}]
					list.forEach((item, key) => {
						if (data.deliverySetting.indexOf(item.id) > -1) {
							that.list.push(list[key])
						}
					})
					this.linkman = data.last_extract.linkman || ''
					this.phone = data.last_extract.phone || ''
				}
			},
			radioChange(e) {
				console.log(e);
				this.coupon_id = e.detail.value
				this.show = false
				this.getOrderbuyNow()
			},
			tochange(index) {
				this.checkindex = index
			},


			//选择收货地址
			toaddress() {
				uni.navigateTo({
					url: "/pagesbranchuser/Receivingaddress/Receivingaddress?type=1"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.popupi-list {
		max-height: 560rpx;
	}

	.address-name {
		max-width: 30%;
	}

	.pay-left {
		image {
			width: 32rpx;
			height: 32rpx;
			margin-right: 20rpx;
		}
	}

	.pay {
		height: 80rpx;

		>image {
			width: 30rpx;
			height: 30rpx;
		}
	}

	.bgwhite {
		background-color: white;
	}

	.coupon-left {
		width: 31%;
		padding: 0 5rpx;
		box-sizing: border-box;
		height: 100%;
	}

	.coupon-right {
		width: 69%;
		padding: 0 24rpx;
		box-sizing: border-box;
	}

	.border-youhui {
		border-bottom: 2rpx solid #DDDDDD;
		box-sizing: border-box;

	}

	.popuptitle {
		width: 100%;
		height: 44rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #202020;
		line-height: 44rpx;
		// box-sizing: border-box;
		// padding:8rpx 0 0 0 ;
	}

	.popcanuse {
		height: 34rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #202020;
		line-height: 34rpx;
	}

	.zindex {
		z-index: 3;
	}

	.zindex5 {
		z-index: 99;
	}

	.distance {
		top: 0;
		left: 0;
	}

	.youhuipadding {
		padding: 20rpx;
		max-height: 800rpx;
	}

	.youhuiquan {
		width: 100%;
		height: 100%;
		z-index: -1;
		position: absolute;
		top: 0;
		left: 0;
	}

	.youhuiquancontent {
		width: 710rpx;
		height: 192rpx;
		z-index: 11;
		// box-sizing: border-box;
		// padding: 0rpx 24rpx 0 46rpx;
	}


	.shoproottwo {
		padding-bottom: 150rpx;
	}


	.ff {
		height: 40rpx;
		font-size: 28rpx;
		font-family: DINPro-Medium, DINPro;
		font-weight: 500;
		line-height: 40rpx;
		color: #FF7200;
	}

	.normalmoney {
		height: 40rpx;
		font-size: 28rpx;
		font-family: DINPro-Medium, DINPro;
		font-weight: 500;
		color: #202020;
		line-height: 40rpx;
	}

	.more {
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		box-sizing: border-box;
		padding: 22rpx;
	}

	.w185 {
		width: 200rpx;
		margin-top: 10rpx;
	}



	.mendianaddress {
		width: 658rpx;
		height: 112rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #202020;
		line-height: 56rpx;
	}

	.rightimg {
		width: 20rpx;
		height: 34rpx;
	}

	.leftimg24 {
		width: 24rpx;
		height: 24rpx;
		margin-left: 8rpx;
	}

	.leftimg28 {
		width: 28rpx;
		height: 28rpx;
		margin-left: 8rpx;
	}

	.w112 {
		width: 112rpx;
	}

	.shopaddress {
		height: 32rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #202020;
		line-height: 32rpx;
	}

	.orderroot {
		padding: 20rpx;
		padding-top: 36rpx;
	}

	.toplisttitle {
		width: 100%;
		height: 84rpx;
		border-radius: 16rpx 16rpx 0px 0px;
	}

	.bg-green {
		background: #CBEEDC;
	}

	.ordertitle {
		height: 84rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #202020;
		padding: 0 32rpx;
		box-sizing: border-box;

	}

	.shoppingCarttop {
		width: 100%;
		height: 32rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.shoppingCarttopthree {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.shoppingCartlistflexstart {
		width: 100%;
		height: 32rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.shoppingCartlisttwo {
		width: 100%;
		height: 32rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.shopsettlement {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 100rpx;
		background: #FEFFFE;
		box-sizing: border-box;
		box-shadow: 0px -4rpx 24rpx 0px rgba(0, 0, 0, 0.05);
		padding: 0 32rpx;
		z-index: 11;

		.btn {
			width: 200rpx;
			height: 72rpx;
			background: linear-gradient(119deg, #5BD897 0%, #0BB65D 100%);
			border-radius: 40rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 72rpx;
			text-align: center;
		}

		.total {
			height: 48rpx;
			margin-left: 20rpx;
		}
	}

	.totaltetx {
		height: 40rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #202020;
		line-height: 40rpx;
	}

	.address-left image {
		width: 48rpx;
		height: 48rpx;
	}

	.graytitle {
		width: 470rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		line-height: 40rpx;
	}

	.leftimg28 {
		width: 28rpx;
		height: 28rpx;
		margin-left: 8rpx;
	}

	.shoppingPay {
		box-sizing: border-box;
		margin: 20rpx 0;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 0 24rpx;
	}

	.shoppingCartlist {
		box-sizing: border-box;
		margin: 20rpx 0;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 32rpx 24rpx;

		.shopimg {
			margin: 0 24rpx 0 0;
			width: 160rpx;
			height: 160rpx;
			border-radius: 8rpx;
		}
	}

	.fonttwo {
		font-size: 30rpx;
		width: 40rpx;
		height: 40rpx;
		background: #FFFFFF;
		border-radius: 4rpx 0px 0px 4rpx;
		border: 1rpx solid #DDDDDD;
	}

	.shownumbor {
		width: 64rpx;
		height: 40rpx;
		background: #FFFFFF;
		font-size: 28rpx;
		display: flex;

		box-sizing: border-box;
		border: 1rpx solid #E7E7E7;
	}

	.wid467 {
		width: 467rpx;
	}

	.no-user-coupon {
		height: 76rpx;
		line-height: 76rpx;
		text-align: center;
		color: #888;
		border: 1rpx solid #e3e3e3;
		border-radius: 76rpx;
		margin-top: 20rpx;
	}

	.baseline:nth-child(1) {
		border-bottom: 1px #F5F5F5 solid;
	}
</style>
