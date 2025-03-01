<template>
	<view>
		<view :class="{popupScroll:popupScroll}" style="padding: 24rpx;">
			<!-- 主页 -->
			<view class="PageHome">
				<view class="PageHome_text" @click="HomepageShow">
					<image :src="ShopInfo.logo" mode="" class="PageHome_img"></image>
					<view class="">
						<view class="PageHome_title">
							{{ShopInfo.name}}
							<image src="../../static/ico_gengduo@2x.png" mode="" class="PageHome_title_img"></image>
						</view>
						<view class="PageHome_title_text">
							<view class="Shop_services" style="padding-right: 10rpx; width: 400rpx;">
								<!-- {{item.desc}} -->
								{{Servicename}}
							</view>
						</view>
						<view class="PageHome_title_total">
							已拼{{SalesNum.sum}}件
						</view>
					</view>
				</view>
				<template>
					<view style="width: 44rpx;height: 44rpx;" @click="favClick()">
						<image src="../../static/icoyishoucangx.png" mode="" style="width:100%;height: 100%;"
							v-if="checkList"></image>
						<image src="../../static/like.png" mode="" style="width:100%;height: 100%;" v-else></image>
					</view>
				</template>

			</view>
			<!-- 评价 -->
			<view class="evaluate_style">
				<view class="evaluate" @click="toStoreEvaluation">
					<view class="evaluate_infor">
						<view class="evaluate_infor">
							<text class="evaluate_title">
								评价
							</text>
							<view class="evaluate_contect">
								<text class="evaluate_contect_text">全部</text>
								<text class="evaluate_contect_text">最新</text>
								<text class="evaluate_contect_text">好评</text>
							</view>
						</view>
					</view>
					<image src="../../static/ico_gengduo@2x.png" mode="" class="evaluate_Moreimg"></image>
				</view>
				<!-- 				<view class="contect_img_style">
										<image src="https://cdn.uviewui.com/uview/album/1.jpg" mode="" class="evaluate_contect_img"></image>
					<image src="https://cdn.uviewui.com/uview/album/2.jpg" mode="" class="evaluate_contect_img"></image>
					<image src="https://cdn.uviewui.com/uview/album/3.jpg" mode="" class="evaluate_contect_img"></image>
					<image src="https://cdn.uviewui.com/uview/album/4.jpg" mode="" class="evaluate_contect_img"></image>
					<null-data title="暂无评论"></null-data>
				</view> -->
				<view class="evaluate discount" @click="RedpacketList">
					<view class="evaluate_infor">
						<view class="evaluate_infor">
							<text class="evaluate_title">
								优惠
							</text>
							<view class="evaluate_contect_discount" v-if="RedPacket.length>0">
								<text class="discount_text" v-for="(item,index) in RedPacket" v-show="index<3">
									{{item.limit_amount}}减{{item.amount}}
								</text>
							</view>
						</view>
					</view>
					<image src="../../static/ico_gengduo@2x.png" mode="" class="evaluate_Moreimg"></image>
				</view>
			</view>
			<!-- 商品列表 -->
			<view class="ProductList">
				<view class="ProductList_title">
					<view v-for="(item,index) in tablist" :key="item.id" class="ProductList_title_style"
						:class="tabindex === index?'ProductList_title_style color_red':'ProductList_title_style'"
						@click="ProductListSwitch(index)">
						{{item.name}}
						<image :src="UrlImg" class="ProductList_price_ico" v-if="item.id === 3"></image>
					</view>
				</view>
				<view class="ProductList_content">
					<view class="ProductList_content_list" v-for="(item2,index) in productList" :key="item2.id">
						<image :src="item2.picture" mode="" class="content_list_img" @click="togoodsDetail(item2)">
						</image>
						<view class="content_list_show">
							<view class="" @click="togoodsDetail(item2)">
								<view class="content_list_title">
									{{item2.goodsName}}
								</view>
								<view class="content_list_discount">
									<view class="list_discount_price" v-if="RedPacket.length>0">
										{{minPacket.limit_amount}}减{{minPacket.amount}}
									</view>
									<view class="list_Crowdordering_total">
										已拼{{item2.sales_num}}件
									</view>
								</view>
							</view>
							<view class="content_list_price">
								<view class="list_price_show">
									<!-- 									<view class="list_price_text">
										劵后
									</view> -->
									<view class="list_price_flexend">
										<view style="font-size: 24rpx;">
											￥
										</view>
										<view style="font-size:36rpx;font-weight: 600;">
											<!-- {{item2.afterPrices}} -->
											{{item2.price}}
										</view>
									</view>
									<!-- 									<view style="font-size: 24rpx;text-decoration: line-through;color: #888888;">
										¥{{item2.price}}
									</view> -->
								</view>
								<image src="../../static/ico_jiagouwuche@2x.png" mode="" class="content_list_car"
									@click="add_car(item2)">
								</image>
							</view>
						</view>
					</view>
				</view>
				<view>
					<u-gap height="40" bgColor="#f5f5f5"></u-gap>
				</view>
			</view>
		</view>
		<!-- 底部拼单按钮 -->
		<view class="">
			<view class="" v-if="AlreadycarList.length == 0">
				<view class="add_pay_btn">
					<view class="ShopCar">
						<view class="shopping_car">
							<view class="shopping_car_ico">
								点击
							</view>
							<image src="../../static/ico_jiagouwuche@2x.png" mode="" class="content_list_car"></image>
							<view>
								购物车,添加商品
							</view>
						</view>
					</view>
					<view class="ShopBtn ">
						<view class="ShopBtn_right">
							<view class="ShopBtn_style">
								去结算
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="add_pay_btn">
					<view class="ShopCar">
						<view class="shopping_car" @click="alreadyCar">
							<view class="shopping_car_ico" style="color: #888888;font-size: 24rpx;">
								已选{{AlreadycarList.length}}款
							</view>
							<u-icon name="arrow-up"></u-icon>
						</view>
					</view>
					<view class="statistics">
						<view class="" style="font-size: 24rpx;">
							合计：
						</view>
						<view class="list_price_flexend">
							<view style="font-size: 24rpx;color:#e51860;">
								￥
							</view>
							<view style="font-size:36rpx;font-weight: 600;color:#e51860;">
								{{AlreadyshopCar}}
							</view>
						</view>
					</view>
					<view class="ShopBtn ">
						<view class="ShopBtn_right" @click="toSubmitOrder">
							<view class="ShopBtn_style">
								提交订单
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 加入购物车弹窗 -->
		<template>
			<u-popup :show="showAddcar" mode="bottom" @close="closeshowAddcar" :round="10" bgColor="#f3f3f3"
				height="700" :closeable="true">
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
									<view class="Order_num_del" @click="delNum">
										-
									</view>
									<view class="Order_num_total">
										{{GoodsNums}}
									</view>
									<view class="Order_num_add" @click="addNum">
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
						v-if="StyleList.attribute_name && Attributestyle.length > 0">
						<view class="Specification_title">
							{{StyleList.attribute_name}}
						</view>
						<view class="Specification_contect">
							<view class="Specification_contect_item " v-for="(item,index) in Attributestyle"
								:class="Attribute_styles === index?'Specification_contect_style':''"
								@click="OnChooseAttribute(index,item)">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
				<u-gap height="60" bgColor="#f5f5f5"></u-gap>
				<view class="goods-carts">
					<view class="goods-carts-btn" @click="buttonClick()">
						确认
					</view>
				</view>
			</u-popup>
		</template>
		<!-- 已加购购物车弹窗 -->
		<template>
			<u-popup :show="showAlreadycar" mode="bottom" @close="close" :round="10" bgColor="#f3f3f3" height="700"
				:closeable="true">
				<view class="Order_title">
					购物车
				</view>
				<scroll-view scroll-y="true" class="scroll-Y">
					<view style="padding: 10px;">
						<view class="Order_content_Show" v-for="item in AlreadycarList">
							<image :src="item.picture" mode="" class="Order_shopping_img"></image>
							<view class="Order_content_text">
								<view class="Order_price">
									<view style="font-size: 28rpx;font-weight: 600;">
										{{item.name}}
									</view>
								</view>
								<view class="Order_choose" v-for="item2 in item.styles" @click="reelectshopCar(item)">
									{{item2.name}}
								</view>
								<view class="" v-if="item.status == 2"
									style="display: flex;justify-content: space-between;align-items: center; margin-top: 20rpx;">
									<view class="" style='color: #888888;font-size: 28rpx;font-weight: 500;'>
										商品规格失效，请重新选择
									</view>
									<view class="" style='color: #e51860;font-size: 28rpx;font-weight: 500;'
										@click="reelectshopCar(item)">
										重选
									</view>
								</view>
								<view style="display: flex;justify-content: space-between;align-items: center;"
									v-if="item.status == 1">
									<text>
										<text class="Order_price_ico">￥</text>
										<text class="Order_price_text">{{item.total}}</text>
									</text>
									<view class="Order_num">
										<view class="Order_num">
											<view class="Order_num_contect">
												<view class="Order_num_del" @click="delAlreadyNum(item)">
													-
												</view>
												<view class="Order_num_total">
													{{item.num}}

												</view>
												<view class="Order_num_add" @click="addAlreadyNum(item)">
													+
												</view>
											</view>
										</view>
									</view>
								</view>

							</view>
						</view>
					</view>
					<view class="">
						<null-data title="暂无商品" v-if="AlreadycarList.length == 0"></null-data>
					</view>
				</scroll-view>
				<u-gap height="60" bgColor="#f5f5f5"></u-gap>
				<view class="" v-if="true">
					<view class="add_pay_btn">
						<view class="ShopCar">
							<view class="shopping_car" @click="alreadyCar">
								<view class="shopping_car_ico" style="color: #888888;font-size: 24rpx;">
									已选{{AlreadycarList.length}}款
								</view>
								<u-icon name="arrow-up"></u-icon>
							</view>
						</view>
						<view class="">
							<view class="statistics">
								<view class="" style="font-size: 24rpx;">
									合计：
								</view>
								<view class="list_price_flexend">
									<view style="font-size: 24rpx;color:#e51860;">
										￥
									</view>
									<view style="font-size:36rpx;font-weight: 600;color:#e51860;">
										{{AlreadyshopCar}}
									</view>
								</view>
							</view>
						</view>
						<view class="ShopBtn ">
							<view class="ShopBtn_right">
								<view class="ShopBtn_style" @click="toSubmitOrder">
									提交订单
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</template>
		<!-- 重选购物车弹窗 -->
		<template>
			<u-popup :show="showAlreadyGoods" mode="bottom" @close="closeAlreadyGoods" :round="10" bgColor="#f3f3f3"
				height="700" :closeable="true" zIndex='10076'>
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
									<view class="Order_num_del" @click="delNum">
										-
									</view>
									<view class="Order_num_total">
										{{GoodsNums}}
									</view>
									<view class="Order_num_add" @click="addNum">
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
						v-if="StyleList.attribute_name && Attributestyle.length > 0">
						<view class="Specification_title">
							{{StyleList.attribute_name}}
						</view>
						<view class="Specification_contect">
							<view class="Specification_contect_item " v-for="(item,index) in Attributestyle"
								:class="Attribute_styles === index?'Specification_contect_style':''"
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
		<!-- 店铺介绍 -->
		<template>
			<u-popup :show="Homepage" mode="bottom" @close="close" @open="open" :round="10" bgColor="#ffffff"
				height="700" :closeable="true">
				<view class="store_introduce">
					<image :src="ShopInfo.logo" mode="" class="introduce_img"></image>
					<view class="introduce_title">
						<view class="introduce_title_head">
							{{ShopInfo.name}}
						</view>
						<view class="introduce_rate">
							<text style="color: #888888;font-size: 24rpx;">综合评分</text>
							<uni-rate :readonly="true" :value="ShopRate" size="18" active-color="#FF9531" />
							<text style="color: #FF9531;font-size: 28rpx;font-weight: 700;">{{ShopInfo.score}}</text>
						</view>
					</view>
				</view>
				<view class="store_introduce_body">
					<view style="margin-bottom: 20rpx">
						<view style="font-size: 28rpx;font-weight: 700;color: #333333;">
							服务保障
						</view>
						<view v-for="item in authentication">
							<view style="font-size: 28rpx;color:#333333;margin-top: 28rpx;">
								• {{item.name}}
							</view>
							<view style="font-size: 24rpx;color: #888888;margin-top: 12rpx;margin-left: 20rpx;">
								{{item.desc}}
							</view>
						</view>
					</view>
					<template>
						<u-line></u-line>
					</template>
					<view style="display: flex; justify-content: space-between; margin-top: 20rpx;margin-bottom: 20rpx;"
						@click="toBusiness">
						<view style="font-size: 28rpx;font-weight: 700;color: #333333;">
							经营证照
						</view>
						<view style="margin-top: 8rpx;">
							<image src="../../static/ico_gengduo@2x.png" mode="" class="evaluate_Moreimg"></image>
						</view>
					</view>
					<template>
						<u-line></u-line>
					</template>

					<view style="margin-top: 40rpx;">
						<view style="font-size: 28rpx;font-weight: 700;color: #333333;">
							店铺公告
						</view>
						<view style="font-size: 24rpx;color: #888888;margin-top: 12rpx;">
							{{ShopInfo.notice}}
						</view>
					</view>
				</view>
				<u-gap height="60" bgColor="#ffffff"></u-gap>
			</u-popup>
		</template>
		<!-- 商店红包列表 -->
		<template>
			<view>
				<u-popup :show="showPacket" @close="closePacket" @open="open" mode="bottom" height="700"
					:closeable="true" zIndex='998'>
					<view>
						<view class="Order_title">
							优惠明细
						</view>
						<scroll-view scroll-y="true" class="scroll-Y">
							<view style="padding: 20rpx;">
								<view class="" style="color: #ef5248; font-size: 28rpx;font-weight: 600">
									店铺优惠券
								</view>
								<view class="packetList" v-for="item in RedPacket" v-if="RedPacket.length>0">
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
									<null-data title="暂无优惠" v-if="RedPacket.length == 0"></null-data>
								</view>

							</view>
						</scroll-view>
					</view>
				</u-popup>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopid: '', //店铺id
				ShopInfo: '', //店铺信息
				authentication: [], //认证信息
				Servicename:'',//认证服务
				SalesNum: '', //店铺销量
				ShopRate: '', //店铺评分
				RedPacket: [], //红包列表
				minPacket: '', //红包展示
				checkList: false, //关注/取消店铺
				picture: '', //选择商品加入购物车
				StyleList: '', //商品规格属性
				attribute_show: '', //商品属性展示
				Attributestyle: [], //商品属性
				Sizestyle: [], //商品规格
				size_show: '', //商品规格展示
				Size_styles: '', //规格样式
				Attribute_styles: '', //属性样式
				attributeId: '', //属性id/
				sizeId: '', //规格id
				objSizeStyle: '', //规格
				objAttributeStyle: '', //属性
				GoodsNums: 1, //添加购物车数量
				AlreadyGoodsNums: '', //已添加购物车商品数量
				goods_id: '', //商品Id
				column: '', //排序字段
				sort: '', //排列顺序
				AlreadycarList: [], //商店购物车列表
				AlreadyCarStyle: [], //已选购物车商品规格属性
				attributePrice: '0', //属性价格
				sizePrice: '0', //规格价格
				shopCarid: '', //购物车id
				showAlreadyGoods: false, //编辑购物车弹窗
				showPacket: false,
				showClassify: false,
				Homepage: false,
				collectionindex: 0,
				collectionUrlImg: require("../../static/like.png"),
				popupScroll: false,
				showAddcar: false,
				showAlreadycar: false,
				curSrcImgIndex: 0, //店铺商品价格排序
				UrlImg: require('../../static/ico_zhankai@2x.png'),
				tabindex: 0,
				productList: [], //店铺商品列表
				tablist: [{
						id: 0,
						name: '默认',
					},
					{
						id: 1,
						name: '销量',
					},
					{
						id: 2,
						name: '上新',
					},
					{
						id: 3,
						name: '价格',
					},
					{
						id: 4,
						name: '分类',
					},
				],
			}
		},
		onShow() {
			this.getlistRedPacket() //获取店铺红包列表
			this.getShopGoodList()
			this.getShopInfo() //获取店铺信息
			this.getShopSalesNum() //获取店铺销量
			this.isFollow() //是否关注店铺
			this.getShopCat() //店铺购物车列表
			this.getShopaddList() //自提地址列表
		},

		onLoad: function(item) { //option为object类型，会序列化上个页面传递的参数
			this.shopid = item.shopid

		},
		computed: {
			//添加购物车
			addCarPrice() {
				let totalPrice = 0
				// let beforePrice = 0
				let attributePrice = this.attributePrice * 1
				let sizePrice = this.sizePrice * 1
				totalPrice += (attributePrice + sizePrice) * this.GoodsNums
				return totalPrice
			},
			//已选购物车列表总金额
			AlreadyshopCar() {
				let AlreadytotalPrice = 0
				if (this.AlreadycarList.length > 0) {
					for (var i = 0; i < this.AlreadycarList.length; i++) {
						AlreadytotalPrice += this.AlreadycarList[i].total * 1
					}
				}
				return AlreadytotalPrice
			},

		},
		methods: {
			//获取店铺信息
			getShopInfo() {
				const data = {
					shop_id: this.shopid
				}
				this.$http.post('/api/shop/getShopInfo', data)
					.then(res => {
						if (res.code == 200) {
							this.ShopInfo = res.data
							this.authentication = res.data.services //认证
							this.ShopRate = res.data.score
							if (res.data.services !== null && res.data.services.length > 0) {
								let name = res.data.services.map((item) => {
									return item.name
								}).join(' ')
							
								this.Servicename = name
							}
						}
					})
			},
			//获取店铺销量 
			getShopSalesNum() {
				const data = {
					shop_id: this.shopid
				}
				this.$http.post('/api/shop/getShopSalesNum', data)
					.then(res => {
						if (res.code == 200) {
							this.SalesNum = res.data
						}
					})
			},
			//获取店铺红包列表
			getlistRedPacket() {
				const data = {
					shop_id: this.shopid
				}
				this.$http.post('/api/shop/listRedPacket', data)
					.then(res => {
						if (res.code == 200) {
							this.RedPacket = res.data.list
							this.minPacket = res.data.list[0]
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
			// 店铺商品列表
			getShopGoodList(item) {
				if (item) {
					this.column = item
				}
				const data = {
					shop_id: this.shopid, //店铺id
					cate_id: "", //店铺类目id
					page: 1, //页码
					num: 1000, //条数
					key: '', //商品名称搜索
					column: this.column, //排序字段 sales_num（销量）create_time（创建时间，新品用这个倒序）  price（价格）
					sort: this.sort, //ASC（顺序） DESC（倒序）
				}
				this.$http.post('/api/shop/listShopGoods', data)
					.then(res => {
						if (res.code == 200) {
							this.productList = res.data.list
						}

					})
			},
			// 跳转营业执照
			toBusiness() {
				uni.navigateTo({
					url: `/pagesOptimization/pages/businesslicense/businesslicense?business=${JSON.stringify(this.ShopInfo.business_license)}`
				})
			},
			// 跳转店铺评价
			toStoreEvaluation() {
				uni.navigateTo({
					url: "/pagesOptimization/pages/StoreEvaluation/StoreEvaluation"
				})
			},
			//店铺介绍
			HomepageShow() {
				this.Homepage = true
			},
			// 是否关注店铺
			isFollow() {
				const data = {
					shop_id: this.shopid,
					userId: uni.getStorageSync('userInfo').id
				}
				this.$http.post('/api/user/isFollow', data)
					.then(res => {
						if (res.code == 200) {
							this.checkList = res.data.follow
						}
					})
			},
			//收藏店铺
			favClick() {
				this.checkList = !this.checkList
				const data = {
					shop_id: this.shopid,
					userId: uni.getStorageSync('userInfo').id
				}
				this.$http.post('/api/user/followShop', data)
			},
			// 店铺红包列表
			RedpacketList() {
				this.showPacket = true
			},
			//关闭商店红包列表
			closePacket() {
				this.showPacket = false
				this.popupScroll = false
			},
			//店铺商品排序
			ProductListSwitch(index) {
				console.log(index)
				let item = ''
				this.tabindex = index
				if (index == 0) {
					this.getShopGoodList(item, index)
				}
				if (index == 1) {
					let sales_num = {
						sales_num: 'sales_num'
					}
					item = sales_num.sales_num
					this.getShopGoodList(item, index)
				}
				if (index == 2) {
					let create_time = {
						create_time: 'create_time'
					}
					item = create_time.create_time
					this.getShopGoodList(item, index)
				}
				if (index == 3) {
					this.curSrcImgIndex++
					if (this.curSrcImgIndex % 2 == 0) {
						this.UrlImg = require('../../static/ico_zhankaiup2x.png')
						this.sort = 'ASC'
					} else {
						this.sort = 'DESC'
						this.UrlImg = require('../../static/ico_zhankai_down@2x.png')
					}
					let column = {
						column: 'price'
					}
					item = column.column
					this.getShopGoodList(item, index)
				} else {
					this.UrlImg = require('../../static/ico_zhankai@2x.png')
					this.sort = ''
				}
				if (index == 4) {
					uni.navigateTo({
						url: `/pagesOptimization/pages/classification/classification?shopid=${this.shopid}`
					});
				}
			},
			//添加购物车
			add_car(item) {
				this.goods_id = item.id
				this.picture = item.picture
				this.size_show = ''
				this.attribute_show = ''
				this.GoodsNums = 1
				this.objSizeStyle = ''
				this.objAttributeStyle = ''
				this.sizePrice = '0'
				this.attributePrice = '0'
				this.Size_styles = ''
				this.Attribute_styles = ''
				this.StyleList = ''
				this.Attributestyle = []
				this.Sizestyle = []
				this.getSizeStyle(item.id)
				this.showAddcar = true

			},
			//关闭购物车弹框
			closeshowAddcar() {
				this.showAddcar = false
				this.popupScroll = false
			},
			//查询商品规格/属性
			async getSizeStyle(id) {
				const data = {
					goods_id: id
				}
				await this.$http.post('/api/shop/getSize', data)
					.then(res => {
						if (res.code == 200) {
							this.StyleList = res.data
							this.Sizestyle = res.data.size

							if (res.data.attribute_name && res.data.size[0].attr.length > 0) {
								this.Attributestyle = res.data.size[0].attr
							}
						}
					})
			},
			// 数量加减
			delNum() {
				if (this.GoodsNums > 1) {
					this.GoodsNums--
				}
			},
			addNum() {
				this.GoodsNums++
			},
			// 关闭添加购物车弹窗
			closeAddcar() {
				this.showAddcar = false

				this.popupScroll = false
			},
			//选择商品版本
			OnChooseSize(index, item) {
				this.Size_styles = index
				this.size_show = item.name
				this.sizePrice = item.price
				this.sizeId = item.id
				let objSize = {
					id: item.id,
					name: item.name,
					url: item.url
				}
				this.objSizeStyle = objSize

				if (item.url) {
					this.picture = item.url //选择商品图片
				}
				//选择size,重置Attribute
				this.Attribute_styles = ''
				this.attribute_show = ''
				this.attributeId = ''
				this.attributePrice = '0'
				this.objAttributeStyle = ''
				this.Attributestyle = item.attr
			},
			//选择商品属性
			OnChooseAttribute(index, item) {
				this.Attribute_styles = index
				this.attribute_show = item.name
				this.attributeId = item.id
				this.attributePrice = item.price

				if (item.url) {
					this.picture = item.url //选择商品图片
				}

				let objAttribute = {
					id: item.id,
					name: item.name,
					url: item.url
				}
				this.objAttributeStyle = objAttribute
			},
			// 确定添加购物车按钮
			buttonClick() {
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
					goods_id: this.goods_id,
					num: this.GoodsNums,
					styles: JSON.stringify(arr)
				}

				this.$http.post('/api/user/addToShoppingCart', data)
					.then(res => {
						if (res.code == 200) {
							this.getShopCat()
							uni.showToast({
								title: '添加成功',
								icon: 'none',
								duration: 2000
							})
							this.showAddcar = false
						}
					})
			},
			//购物车列表
			getShopCat() {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					shop_id: this.shopid
				}
				this.$http.post('/api/user/listShoppingCart', data)
					.then(res => {
						if (res.code == 200) {
							if (res.data.list.length > 0) {
								this.AlreadycarList = res.data.list[0].list
							} else {
								this.AlreadycarList = []
							}

						}
					})
			},
			// 已加购列表
			alreadyCar() {
				this.showAlreadycar = true
			},
			// 编辑购物车
			delAlreadyNum(item) { //删除
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
				console.log(num);
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
			//重选商品规格
			reelectshopCar(item) {
				this.picture = item.picture
				this.shopCarid = item.id //购物车id
				this.size_show = ''
				this.attribute_show = ''
				this.GoodsNums = 1
				this.objSizeStyle = ''
				this.objAttributeStyle = ''
				this.sizePrice = '0'
				this.attributePrice = '0'
				this.Size_styles = ''
				this.Attribute_styles = ''
				this.StyleList = ''
				this.Attributestyle = []
				this.Sizestyle = []
				this.getSizeStyle(item.shop_goods_id)
				this.showAlreadyGoods = true
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
			closeAlreadyGoods() {
				this.showAlreadyGoods = false
			},

			open() {
				this.popupScroll = true
			},
			//提交订单
			toSubmitOrder() {
				uni.navigateTo({
					url: `/pagesOptimization/pages/SubmitOrder/SubmitOrder?total=${this.AlreadyshopCar}&&shop_id=${this.shopid}&&styleId=1`
				})
			},
			close() {
				this.showAlreadycar = false
				this.Homepage = false
				this.popupScroll = false
			},
			//商品详情页
			togoodsDetail(item) {
				uni.navigateTo({
					url: `/pagesOptimization/pages/shopDetails/shopDetails?goods_id=${item.id}`
				})
			},
			//自提点列表
			getShopaddList() {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					school_id: uni.getStorageSync('school').id,
				}
				this.$http.post('/api/user/listPickLocation', data)
					.then(res => {

					})
			},
		}
	}
</script>

<style lang="scss" scoped>
	// ::v-deep uni-modal {
	// 	z-index: 19999;
	// }

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

	.popupScroll {
		overflow: hidden;
		position: fixed;
	}

	.PageHome {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 20rpx;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.PageHome_text {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.PageHome_img {
		width: 140rpx;
		height: 140rpx;
		margin-right: 10rpx;
	}

	.PageHome_like_img {
		width: 60rpx;
		height: 60rpx;
	}

	.PageHome_title {
		display: flex;
		align-items: center;
		font-size: 32rpx;
		font-weight: 600;
	}

	.PageHome_title_text {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #888888;
		margin-top: 4rpx;
	}

	.Shop_services{
		width: 260px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.PageHome_title_img {
		width: 28rpx;
		height: 28rpx;
		margin-right: 8rpx;
		margin-top: 8rpx;
	}

	.PageHome_title_total {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #888888;
		margin-top: 12rpx;
	}

	.evaluate_style {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		background-color: #fff;
		margin-top: 20rpx;
		border-radius: 20rpx;
	}

	.evaluate {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.evaluate_infor {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.evaluate_title {
		font-size: 24rpx;
		color: #888888;
		margin-right: 20rpx;
	}

	.evaluate_contect {
		display: flex;
		align-items: center;
	}

	.evaluate_contect_text {
		margin-right: 20rpx;
		color: #202020;
		font-size: 28rpx;
	}

	.evaluate_Moreimg {
		width: 34rpx;
		height: 34rpx;
	}

	.contect_img_style {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.evaluate_contect_img {
		width: 160rpx;
		height: 160rpx;
	}

	.discount {
		margin-top: 20rpx;
	}

	.evaluate_contect_discount {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.discount_text {
		font-size: 22rpx;
		color: #D93038;
		border: 2rpx solid #D93038;
		padding: 0 4rpx 0;
		margin-right: 8rpx;
	}

	.ProductList {
		margin-top: 20rpx;
	}

	.ProductList_title {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.ProductList_title_style {
		font-size: 32rpx;
		font-weight: 600;
	}

	.color_red {
		color: #D93038;
	}

	.ProductList_price_ico {
		width: 20rpx;
		height: 20rpx;
	}

	.ProductList_content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 30rpx;
	}

	.ProductList_content_list {
		width: 342rpx;
		margin-bottom: 32rpx;
		padding-bottom: 14rpx;
		background-color: #fff;
	}

	.content_list_img {
		width: 342rpx;
		height: 342rpx;
	}

	.content_list_show {
		padding-right: 24rpx;
		padding-left: 24rpx;
	}

	.content_list_title {
		font-weight: 600;
		font-size: 28rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.content_list_discount {
		display: flex;
		margin-top: 14rpx;
	}

	.list_discount_price {
		height: 28rpx;
		line-height: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-size: 22rpx;
		padding: 0 6rpx;
		border-radius: 4rpx;
		border: 1rpx solid #eb979b;
		color: #dd343c;
		margin-right: 8rpx;
	}

	.list_Crowdordering_total {
		height: 28rpx;
		line-height: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-size: 22rpx;
		padding: 0 6rpx;
		border-radius: 4rpx;
		border: 1rpx solid #888888;
		color: #888888;
		// max-width: 50%;
		margin-right: 8rpx;
	}

	.content_list_price {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
		color: #e51860;
	}

	.list_price_show {
		display: flex;
		align-items: baseline;
	}

	.list_price_text {
		font-size: 24rpx;
	}

	.list_price_flexend {
		display: flex;
		align-items: flex-end;
	}

	.list_car_box {
		display: flex;
		align-items: center;
	}

	.content_list_car {
		width: 50rpx;
		height: 50rpx;
		// margin-top: 20rpx;
	}

	.Order_title {
		text-align: center;
		font-weight: 700;
		font-size: 32rpx;
		color: #202020;
		margin-top: 40rpx;
		margin-bottom: 30rpx;
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

	.store_introduce {
		display: flex;
		justify-content: flex-start;
		padding: 26rpx;
	}

	.introduce_img {
		width: 108rpx;
		height: 108rpx;
		margin-right: 16rpx;
	}

	.introduce_title {
		display: flex;
		flex-direction: column;
	}

	.introduce_title_head {
		font-size: 32rpx;
		font-weight: 700;
		text-align: left;
		color: #333333;
	}

	.introduce_rate {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 18rpx;
	}

	.store_introduce_body {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding: 26rpx;
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
