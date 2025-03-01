<template>
	<view>
		<view class="pl32 pr32 box-size p-b-120" v-if="detail" style="padding-bottom: 130rpx;">

			<view class="head pt32 pb24 ">
				<view style="width: 100%;height: 400rpx;" v-if="detail.order_status==3||detail.order_status==4">
					<!-- 地图 -->
					<map style="width: 100%;height: 100%;" :latitude="myLat" :longitude="myLng" :markers="covers"
						:scale="12" :polyline="polyline"></map>
				</view>
				<view class="dis-flex flex-y-center flex-x-between">

					<view class="dis-flex flex-y-center">

						<view class="data-time f-36 f-b dis-flex flex-y-center" v-if="detail.order_status==1">待支付，剩余
							<u-count-down :time="detail.remaining_time * 1000" format="HH:mm:ss" @finish="finish">
							</u-count-down>
						</view>
						<view class="f-36 f-b" v-else>{{detail.state_text ||""}}</view>
					</view>
					<!--  1未付款,2已付款,3已接单,4配送中/待取货,5已收货,6已评价,7已取消,8.拒单，9申请退款,10已退款，11退款拒绝 -->
					<block v-if="detail.delivery_mode==1">
						<view class="f-24 col-brank-20"
							v-if="detail.order_status==1||detail.order_status==2||detail.order_status==3||detail.order_status==4">
							预计<text class="f-28 f-b ml5 mr5 col-red-d9">{{detail.service_at}}</text>送达</view>
					</block>

				</view>
				<view class="mt12 dis-flex flex-y-center flex-x-between f-24 col-gray-88">
					<view v-if="detail.order_status==1">逾期未支付订单将自动取消</view>
					<view v-else-if="detail.order_status==2">商家暂未接单</view>
					<view v-else-if="detail.order_status==3">正在火速赶往商家</view>
					<view v-else-if="detail.order_status==4">正在火速配送中 骑手距您:{{distance}}</view>
					<view v-else-if="detail.order_status==5||detail.order_status==6">感谢您的光临，欢迎下次再来</view>
					<block v-if="detail.delivery_mode==1">
						<view
							v-if="detail.order_status==1||detail.order_status==2||detail.order_status==3||detail.order_status==4">
							{{detail.platform_delivery_money_mode.text}}
						</view>
					</block>
				</view>
			</view>
			<view class="bg-white-ff radio-16 mb20 cont24" v-if="detail.delivery_mode==2&&detail.order_status==3">
				<view class="dis-flex flex-y-center flex-x-between mb10">
					<view class="f-32 col-gray-33 f-b">取餐码</view>
					<view class="f-24 col-brank-20">预计<text
							class="f-28 f-b ml5 mr5 col-red-d9">{{detail.service_at}}</text>取餐</view>
				</view>
				<view class="f-40 f-b col-gray-88">{{detail.self_code}}</view>
			</view>
			<view class="bg-white-ff radio-16 mb20  " v-if="detail.delivery_mode==2">
				<view class="address radio-16 cont24">
					<view class="f-28 f-b col-gray-33">门店信息</view>
					<view class="pt32 dis-flex flex-y-center flex-x-between">
						<view class="f-28 col-gray-88">门店名称</view>
						<view class="f-28 col-brank-22">{{detail.store.name}}</view>
					</view>
					<view class="pt32 dis-flex flex-x-between">
						<view class="f-28 col-gray-88">用餐地址</view>
						<view class="f-28 col-brank-22 w-75 t-r">
							{{detail.store.address}}
						</view>
					</view>
					<view class="pt32 dis-flex flex-y-center flex-x-between">
						<view class="f-28 col-gray-88">就餐方式</view>
						<view class="f-28 col-brank-22">{{detail.is_out==1?'打包带走':'在店堂食'}}</view>
					</view>
				</view>
				<view class="dis-flex flex-y-center shop pt24 pb20 flex-x-center"
					@tap="callMobile(detail.store.contacts_tel)">
					<image class="wh28 mr10" src="/pagesUser/static/mobile.png"></image>
					<view class="col-brank-22 ">联系商家</view>
				</view>
			</view>
			<!-- 这里是校u优选的收货地址 暂时屏蔽 -->
			<!-- <view class="bg-white-ff radio-16 dis-flex flex-y-center mb20 cont24">
			<image src="/pagesUser/static/address-order.png" class="wh48 mr24"></image>
			<view class="w-90 ">
				<view class="f-28 f-b mb16">
					<text class="mr8">{{detail.received_name}}</text>
					<text>{{detail.received_tel}}</text>
				</view>
				<view class="twolist-hidden f-24 w-100">{{detail.received_address}}</view>
			</view>

		</view> -->
			<view class="bg-white-ff radio-16">
				<view class="bg-white-ff radio-16 cont24 address">
					<view class="col-gray-33 f-b f-32 mb24" @tap="storeDetail">{{detail.store.name}}</view>
					<view class="dis-flex  flex-x-between goods-item mb40" v-for="(item,index) in detail.goods"
						:key="index" @tap.stop="goodsDetail(item.goods_id)">
						<image class="wh112" :src="item.icon" mode="aspectFill"></image>
						<view class="w-78 ">
							<view class="dis-flex flex-y-center flex-x-between w-100">
								<view class="f-b f-28 w-70 onelist-hidden">{{item.name}}</view>
								<view class="t-b f-32 f-b f-DINPro"><text class="f-24">¥</text>{{item.money}}</view>
							</view>
							<view class="mt5 f-24 col-gray-88">
								<text class="mr10" v-if="item.attribute">{{item.attribute}}</text>
								<text v-if="item.material">{{item.material}}</text>
								<text class="ml10" v-if="item.spec1">{{item.spec1}}</text>
							</view>
							<view class="f-24 col-gray-88">x{{item.num}}</view>
						</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between mb32">
						<view class="col-brank-22">商品金额</view>
						<view class="t-b f-32 col-brank-20 f-b f-DINPro"><text
								class="f-24">¥</text>{{detail.origin_money}}
						</view>
					</view>
					<!-- 这里是校u优选的运费 -->
					<!-- <view class="dis-flex flex-y-center flex-x-between mb32">
					<view class="col-brank-22">运费</view>
					<view class="t-b f-32 col-brank-20 f-b f-DINPro"><text class="f-24">¥</text>15.9</view>
				</view> -->
					<view class="dis-flex flex-y-center flex-x-between mb32">
						<view class="col-brank-22">打包费</view>
						<view class="t-b f-32 col-brank-20 f-b f-DINPro"><text
								class="f-24">¥</text>{{detail.box_money || '0'}}
						</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between mb32">
						<view class="col-brank-22">配送费</view>
						<view class="t-b f-32 col-brank-20 f-b f-DINPro"><text
								class="f-24">¥</text>{{detail.delivery_money}}</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between mb32">
						<view class="col-brank-22">店铺满减</view>
						<view class="t-b f-32 col-red-d9 f-b f-DINPro"><text
								class="f-24">-¥</text>{{detail.preferential_money}}</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between mb32">
						<view class="col-brank-22">店铺红包</view>
						<view class="t-b f-32 col-red-d9 f-b f-DINPro"><text
								class="f-24">-¥</text>{{detail.coupon_preferential}}</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-between mb32">
						<view class="col-brank-22">平台红包</view>
						<view class="t-b f-32 col-red-d9 f-b f-DINPro"><text
								class="f-24">-¥</text>{{detail.platform_coupon_preferential}}</view>
					</view>
					<!-- <view class="dis-flex flex-y-center mt30 flex-x-between">
						<view class="dis-flex flex-y-center">
							<image class="wh28 mr10" src="/static/img/red-back.png"></image>
							<view class="f-28 col-brank-20">校U送红包</view>
						</view>
						<view class="f-24 col-red-d9 f-b mr5 f-DINPro"><text>-¥</text><text class="f-32">0</text></view>
					</view> -->
					<view class="border-t-f7 pt25 mt24 col-gray-33 dis-flex flex-y-center flex-x-end">
						<text class="mr15">合计</text>
						<text class="t-b f-40 col-red-d9 f-b f-DINPro"><text
								class="f-28">¥</text>{{detail.money}}</text>
					</view>
				</view>
				<!-- 这里是校u优选 联系商家-->
				<!-- <view class="dis-flex flex-y-center shop pt24 pb20 flex-x-center">
				<image class="wh28 mr10" src="/pagesUser/static/mobile.png"></image>
				<view class="col-brank-22 ">联系商家</view>
			</view> -->
			</view>
			<view class="bg-white-ff radio-16 mt24 " v-if="detail.delivery_mode==1">
				<view class="address radio-16 cont24">
					<view class="f-28 f-b col-gray-33">配送信息</view>
					<view class="pt32 dis-flex flex-x-between">
						<view class="f-28 col-gray-88">配送地址</view>
						<view class="f-28 col-brank-22 w-70 t-r">{{detail.received_address}}</view>
					</view>
					<view class="t-r mt5  f-28 col-brank-22">
						<text class="mr16">{{detail.received_name}}</text>
						{{detail.received_tel}}
					</view>
					<view class="pt32 dis-flex flex-y-center flex-x-between" v-if="detail.qs_address">
						<view class="f-28 col-gray-88">配送寝室</view>
						<view class="f-28 col-brank-22">{{detail.sex}}寝 {{detail.qs_address}}</view>
					</view>
					<view class="pt32 dis-flex flex-y-center flex-x-between">
						<view class="f-28 col-gray-88">配送方式</view>
						<view class="f-28 col-brank-22">{{detail.platform_delivery_money_mode.text}}</view>
					</view>
				</view>
				<view class="dis-flex flex-y-center shop pt24 pb20 flex-x-center">
					<view class="dis-flex flex-y-center flex-x-center w-50"
						@tap="callMobile(detail.store.contacts_tel)">
						<image class="wh28 mr10" src="/pagesUser/static/mobile.png"></image>
						<view class="col-brank-22 ">联系商家</view>
					</view>
					<view class="dis-flex flex-y-center flex-x-center w-50 bo">
						<view class="dis-flex flex-y-center" @tap="callMobile(detail.rider_mobile)">
							<image class="wh28 mr10" src="/pagesUser/static/mobile.png"></image>
							<view class="col-brank-22 ">联系骑手</view>
						</view>

						<image v-if="detail.order_status==3||detail.order_status==4 && detail.rider_id != 0"
							class="wh44 ml18" src="/pagesUser/static/message_fill.png" @tap.stop="tochat" />
					</view>
				</view>
			</view>
			<view class="bg-white-ff radio-16 mt24  cont24" v-if="detail.delivery_mode==2">
				<view class="f-28 f-b col-gray-33">就餐信息</view>
				<!-- 没有用餐人 暂时屏蔽 -->
				<!-- <view class="pt32 dis-flex flex-y-center flex-x-between">
				<view class="f-28 col-gray-88">用餐人</view>
				<view class="f-28 col-brank-22">沈生生</view>
			</view> -->
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 col-gray-88">用餐人联系方式</view>
					<view class="f-28 col-brank-22">{{detail.received_tel}}</view>
				</view>
			</view>
			<view class="bg-white-ff radio-16 mt24  cont24">
				<view class="f-28 f-b col-gray-33">订单信息</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 col-gray-88">订单号</view>
					<view class="f-28 col-brank-22" @tap="copy(detail.out_trade_no)">
						{{detail.out_trade_no}}
						<text class="f-24 ml15 col-red-d9">复制</text>
					</view>
				</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between" v-if="detail.pay_mode.text">
					<view class="f-28 col-gray-88">支付方式</view>
					<view class="f-28 col-brank-22">{{detail.pay_mode.text}}</view>
				</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 col-gray-88">下单时间</view>
					<view class="f-28 col-brank-22">{{detail.create_time}}</view>
				</view>
			</view>
			<view class="bg-white-ff radio-16 mt24  cont24">
				<view class="dis-flex flex-x-between">
					<view class="f-28 ">订单备注</view>
					<view class="f-28 t-r col-brank-22 w-70">{{detail.user_note||'暂无备注'}}</view>
				</view>
				<view class="pt32 dis-flex flex-y-center flex-x-between">
					<view class="f-28 ">餐具数量</view>
					<view class="f-28 col-brank-22">{{detail.tableware_num}}份</view>
				</view>
			</view>
			<view class="btn w-100 bg-white-ff dis-flex fixed-bottom box-shad-t flex-y-center flex-x-between">
				<view class="t-b" v-if="detail.order_status==1">
					<text class="f-24 col-brank-20 mr16">待支付:</text>
					<text class=" f-40 col-red-d9 f-b f-DINPro"><text class="f-28">¥</text>{{detail.money}}</text>
				</view>
				<!--  1未付款,2已付款,3已接单,4配送中/待取货,5已收货,6已评价,7已取消,8.拒单，9申请退款,10已退款，11退款拒绝 -->
				<view class="dis-flex flex-y-center  flex-x-end " :class="detail.order_status!=1?'w-100':''">
					<!-- 待支付和商家未接单都是取消订单 不需要经过商家同意 申请退款 -->
					<view class="btn-order border-dd col-brank-20 f-24" @tap="applyRefund(2)"
						v-if="detail.order_status==1||detail.order_status==2">
						取消订单</view>
					<!-- 商家已接单  商品配送  已收货都可以申请退款  已经评论了不能申请退款 -->
					<view class="btn-order border-dd col-brank-20 f-24" @tap="applyRefund(1)"
						v-if=" (detail.order_status==3||detail.order_status==4)&&detail.before_refund_state!=11">
						申请退款</view>
					<!--只有待支付有立即支付按钮 -->
					<view class="btn-order bg-red-d6-ec col-white-ff f-24" v-if="detail.order_status==1" @tap="pay">立即支付
					</view>
					<view class="btn-order border-dd col-brank-20 f-24"
						v-if="detail.order_status==6||detail.order_status==7||detail.order_status==8||detail.order_status==10||detail.order_status==11"
						@tap="delOrder(detail)">删除订单</view>
					<!-- 只要不是待支付  退款拒绝的状态都可以再来一单 -->
					<view class="btn-order border-dd col-brank-20 f-24"
						v-if="detail.order_status!=1&&detail.order_status!=2&&detail.order_status!=3&&detail.order_status!=4&&detail.order_status!=11&&detail.order_status!=12"
						@tap="anotherOrder">再来一单</view>
					<!-- 只有自提且商家已接单取货才有确认取餐按钮 -->
					<view class="btn-order bg-red-d6-ec col-white-ff f-24"
						v-if="detail.delivery_mode==2&&detail.order_status==4" @tap="confirmReceivingOrder">确认取餐
					</view>
					<view class="btn-order bg-red-d6-ec col-white-ff f-24" v-if="detail.order_status==5"
						@tap.stop="addComment">
						评价</view>
					<!-- 这里是校u优选订单的状态 暂时注释-->
					<!-- <block v-else-if="detail.order_status!=1&&detail.order_status!=11">
					<view class="btn-order border-dd col-brank-20 f-24" v-if="id==2">查看物流</view>
					<view class="btn-order border-dd col-brank-20 f-24" v-if="id==3">查看券码</view> 	
				</block> -->

					<view class="btn-order border-dd col-brank-20 f-24"
						v-if="detail.before_refund_state==11&&detail.order_status<6" @click="terrace(detail)">
						<!-- v-if="detail.order_status!=9&&detail.order_status!=12&&detail.order_status!=14&&detail.order_status!=13" -->
						平台介入
					</view>


					<view class="btn-order border-dd col-brank-20 f-24"
						v-if="detail.order_status==9||detail.order_status==10||detail.order_status==11"
						@click="tkjd(detail.id)">退款进度</view>

				</view>
			</view>
			<!-- 退款取消弹窗 -->
			<view :catchtouchmove="true">
				<u-popup :show="cancelShow" mode="center" :safeAreaInsetBottom="false" round="32rpx">
					<view class="win-box-mobile  box-size bg-white-ff radio-30">
						<view class="f-32 w-100 t-c f-b">取消订单</view>
						<view class="f-28 t-c mt20">{{content}}</view>
						<view class="dis-flex flex-y-center flex-x-between mt40">
							<view class="btn-win t-c bg-gray-ef radio-40" @tap="cancelClick">确认取消</view>
							<view class="btn-win t-c bg-red-d6-ec col-white-ff radio-40" @tap="cancelShow=false">我在想想
							</view>
						</view>
					</view>
				</u-popup>
			</view>
      <u-popup
      :show="cancelNextShow"
      mode="center"
      :safeAreaInsetBottom="false"
      round="32rpx"
      @close="cancelNextShow = false"
      closeable
    >
      <view class="win-box-mobile box-size bg-white-ff radio-30">
        <view class="f-32 w-100 t-c f-b">联系商家退款</view>
        <view class="f-28 t-c mt20">{{detail.take_no ? `【${detail.take_no}号单】` : ''}}美食可能已经下锅,如需退款请及时联系商家</view>
        <view class="dis-flex flex-y-center flex-x-center mt40">
          <view
            class="t-c bg-red-d6-ec col-white-ff radio-40 pl40 pr40 pt20 pb20"
            @tap="sureClickPhone()"
            >电话联系商家退款
          </view>
        </view>
      </view>
    </u-popup>
		</view>
		<null-data :title="msg" v-else></null-data>
	</view>
</template>

<script>
	import MapUtil from "@/common/mapUtil.js"
	export default {
		data() {
			return {
				id: '', //订单id
				detail: null,
				cancelShow: false,
				order_type: '', //订单类型
				msg: "",
				content: "", //取消退款的提示语
				mapUrl: '',
				myLat: '',
				myLng: '',
				riderLat: '',
				riderLng: '',
				store: {},
				// 标记点
				covers: [{
					id: 1, //用户位置
					iconPath: '../../../../static/img/user-menu01.png',
					width: 30,
					height: 30,
					callout: {
						// content: "我的位置", 
						display: "ALWAYS",
						fontWeight: "bold",
						color: "#5A7BEE", //文本颜色
						fontSize: "12px",
						bgColor: "#ffffff", //背景色
						padding: 5, //文本边缘留白
						textAlign: "center",
					},
					anchor: {
						x: 0.5,
						y: 0.5,
					},
				}, {
					id: 2, //骑手位置
					// iconPath: '../../../../pagesIndex/static/shop-cart-act.png',
					iconPath: 'https://api.yzgl.top/h5/pagesIndex/static/shop-cart-act.png',
					width: 30,
					height: 30,
					callout: {
						content: "骑手已接单",
						display: "ALWAYS",
						fontWeight: "bold",
						color: "#090a0e", //文本颜色
						fontSize: "12px",
						bgColor: "#ffffff", //背景色
						padding: 5, //文本边缘留白
						textAlign: "center",
					},
					anchor: {
						x: 0.5,
						y: 0.5,
					},
				}, {
					id: 3, //商家位置
					width: 30,
					height: 30,
					// iconPath: '../../../../pagesIndex/static/ico-tangshi-act.png',
					iconPath: 'https://api.yzgl.top/h5/pagesIndex/static/ico-tangshi-act.png',
					callout: {
						content: "商家位置",
						display: "ALWAYS",
						fontWeight: "bold",
						color: "#090a0e", //文本颜色
						fontSize: "12px",
						bgColor: "#ffffff", //背景色
						padding: 5, //文本边缘留白
						textAlign: "center",
					},
					anchor: {
						x: 0.5,
						y: 0.5,
					},
				}],
				// 路线
				polyline: [],
				//距离
				distance: 0,
        cancelNextShow: false,
			};
		},
		onLoad(e) {
			this.id = e.id
			this.order_type = e.order_type || ''
			this.myLat = uni.getStorageSync('lat');
			this.myLng = uni.getStorageSync('lng');

		},
		onShow() {
			this.getOrderTakeOutInfo()
			// this.initMap()
		},
		methods: {
			// 退款进度
			tkjd(id) {
				uni.navigateTo({
					url: '/pagesUser/page/orderList/afterSalesList/progress/progress?id=' + id
				})
			},
			//跳转聊天
			tochat() {
				let passUser = {
					uuid: 'rider' + this.detail.rider_id,
					name: this.detail.rider_name,
					avatar: this.detail.rider_head_img,
				}
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/chat/chat?toUser=' +
						encodeURIComponent(JSON.stringify(passUser))
				})
			},
			//再来一单
			anotherOrder() {
				//外卖再来一单
				if (this.order_type == 1) {
					uni.navigateTo({
						url: "/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?orderId=" + this.id +
							'&id=' +
							this.detail.store.merchant_id
					})
				}

			},
			//确认取餐
			confirmReceivingOrder() {
				var that = this
				uni.showModal({
					title: "温馨提示",
					content: "请确认是否已取餐",
					async success(res) {
						if (res.confirm) {
							uni.showLoading({
								title: "正在加载中"
							})
							const {
								data,
								status
							} = await that.$api.receivingOrder({
								order_id: that.id,
								order_type: that.order_type, //1外卖，2附近，3优选
							})
							uni.hideLoading()
							if (status == 200) {
								that.$u.toast("取餐成功")
								that.getOrderTakeOutInfo()
							}
						}
					}
				})

			},
			//跳转商品详情
			goodsDetail(id) {
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/goodsDetail/goodsDetail?id=' + id + '&idx=' + this
						.detail.store_id
				})
			},
			//跳转商家详情
			storeDetail() {
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id=' + this.detail.store
						.merchant_id
				})
			},
			initMap() {
				//定义地图中心点坐标
				var center = new TMap.LatLng(39.984120, 116.307484)
				//定义map变量，调用 TMap.Map() 构造函数创建地图
				var map = new TMap.Map(document.getElementById('container'), {
					center: center, //设置地图中心点坐标
					zoom: 17.2, //设置地图缩放级别
				});
			},
			//type=2取消订单或者申请退款type=1
			applyRefund(type) {
				if (type == 2) {
					this.content = this.detail.order_status == 1 ? '是否确认取消待付款订单' : '退款将原路退回至支付账户。'
				} else {
					this.content = '商家已接单，如需退款请先与商家联系。'
				}
				this.cancelShow = true
			},
			//订单取消（未支付）
			async getOrderCancelOrder() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status
				} = await that.$api.ordercancelled({
					order_id: this.id,
					order_type: this.order_type, //1外卖，2附近，3优选
				})
				uni.hideLoading()
				if (status == 200) {
					this.$u.toast("订单已取消")
					setTimeout(function() {
						that.getOrderTakeOutInfo()
						that.cancelShow = false
					}, 500)
				}
			},
			//删除订单
			delOrder(detail) {
				console.log(detail.order_type)
				var that = this
				uni.showModal({
					title: "温馨提示",
					content: "是否删除订单,删除之后不可恢复",
					async success(res) {
						if (res.confirm) {
							uni.showLoading({
								title: "正在加载中"
							})
							const {
								data,
								status
							} = await that.$api.orderDeleteOrder({
								order_id: detail.id,
								order_type: that.order_type, //1外卖，2附近，3优选
							})
							uni.hideLoading()
							if (status == 200) {
								that.$u.toast("删除成功")
								uni.navigateBack()
							}
						}
					}
				})

			},
			addComment() {
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/order/addComment/addComment?id=' + this.id +
						'&order_type=' + this.order_type + '&merchant_id=' + this.detail.store.merchant_id
				})
			},
			//立即支付
			pay() {
				uni.navigateTo({
					url: '/pagesIndex/page/pay/pay?id=' + this.id
				})
			},
			//订单详情接口
			async getOrderTakeOutInfo() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status,
					msg
				} = await that.$api.orderTakeOutInfo({
					order_id: this.id,

				})
				uni.hideLoading()
				if (status == 200) {
					console.log(data);
					this.detail = data
					this.msg = msg
					this.riderLat = data.rider_lat;
					this.riderLng = data.rider_lng;
					this.myLat = data.lat;
					this.myLng = data.lng;
					this.store = data.store;
					//地图标点
					this.covers[0].latitude = this.myLat;
					this.covers[0].longitude = this.myLng;
					this.covers[1].latitude = this.riderLat;
					this.covers[1].longitude = this.riderLng;
					this.covers[2].latitude = this.store.lat;
					this.covers[2].longitude = this.store.lng;
					this.getDirection();
					this.getDistance()
				}
			},
			finish() {
				this.getOrderTakeOutInfo()
			},
			//复制
			copy(data) {
				uni.setClipboardData({
					data: data
				})
				this.$u.toast("复制成功")
			},
			//联系商家
			callMobile(mobile) {
				uni.makePhoneCall({
					phoneNumber: mobile
				})
			},
			cancelClick() {
				if (this.detail.order_status == 1 || this.detail.order_status == 2) {
					//订单取消（未支付）
					this.getOrderCancelOrder()
					return
				}
        if (this.isWithinLastMinute(this.detail.pay_time)) {
          this.cancelNextShow = true
        } else {
          //取消订单
          uni.navigateTo({
              url: '/pagesUser/page/orderList/cancelList/cancelList?order_id=' + this.id + '&order_type=' +
                this.order_type
            })
          this.cancelShow = false
        }
			},
      sureClickPhone() {
        uni.makePhoneCall({
          phoneNumber: this.detail.store.contacts_tel, // 电话号码
          success: function () {
            console.log('拨号成功');
            this.cancelNextShow = false
            this.cancelShow = false;
          },
          fail: function () {
            console.log('拨号失败');
          }
        });
      },
      //判断目标时间是否在当前时间的前一分钟内
      isWithinLastMinute(targetTime) {
          const now = new Date();
          const oneMinuteAgo = new Date(now.getTime() - 60000); // 当前时间减去一分钟的毫秒数
          return targetTime >= oneMinuteAgo && targetTime <= now;
      },
			//获取路线
			async getDirection() {
				let rider = {
					latitude: this.riderLat,
					longitude: this.riderLng,
				}
				let store = {
					latitude: this.store.lat,
					longitude: this.store.lng
				}
				let my = {
					latitude: this.myLat,
					longitude: this.myLng
				}
				console.log('获取路线')
				console.log(my)
				console.log(store)
				let getFirstPoints = MapUtil.qqDirection(this, rider, store);
				let getSecondPoints = MapUtil.qqDirection(this, store, my);
				let firstPoints = await getFirstPoints;
				console.log("first:")
				let secondPoints = await getSecondPoints;
				console.log("second:")
				this.polyline = [{
					points: firstPoints.concat(secondPoints),
					color: '#025ADD',
					width: 4,
					dottedLine: false,
				}];
			},
			//获取距离
			async getDistance() {
				let rider = {
					latitude: this.riderLat,
					longitude: this.riderLng,
				}
				let my = [{
					latitude: this.myLat,
					longitude: this.myLng
				}]
				const res = await MapUtil.qqDistance(this, rider, my);
				// console.log(res)
				//距离
				this.distance = res.result.elements[0].distance;
				if (this.distance > 1000) {
					this.distance = parseFloat(this.distance / 1000).toFixed(2) + 'km'
				} else {
					this.distance = this.distance + 'm'
				}
			},

			terrace(item) {
				console.log(item.id)
				var that = this
				uni.showModal({
					title: "温馨提示",
					content: "是否平台介入退款",
					async success(res) {
						if (res.confirm) {
							uni.showLoading({
								title: "正在加载中"
							})
							const {
								data,
								status
							} = await that.$api.refundPlatOrder({
								order_id: item.id,
								order_type: that.order_type, //1外卖，2附近，3优选
							})
							uni.hideLoading()
							if (status == 200) {
								that.$u.toast("提交成功")
								that.getOrderTakeOutInfo()
							}
						}
					}
				})
			},

		},



	}
</script>

<style lang="scss">
	.goods-item:last-child {
		margin-bottom: 32rpx;
	}

	.address {
		box-shadow: 0 44rpx 44rpx #F7F7F7;
	}

	page {
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
	}

	.btn-order {
		width: 160rpx;
		height: 56rpx;
		border-radius: 28rpx;
		line-height: 56rpx;
		text-align: center;
		margin-left: 20rpx;
	}

	.btn {
		width: 100%;
		padding: 18rpx 32rpx;
		box-sizing: border-box;
		padding-bottom: calc(1rpx + env(safe-area-inset-bottom));
		background: #FEFFFE;
		box-shadow: 0px -4rpx 20rpx 0px rgba(0, 0, 0, 0.0400);
	}

	.win-box-mobile {
		width: 560rpx;
		min-height: 292rpx;
		padding: 40rpx 60rpx;

	}

	.btn-win {
		width: 210rpx;
		height: 64rpx;
		line-height: 64rpx;
	}

	::v-deep .u-count-down__text {
		font-size: 36rpx !important;
	}
</style>