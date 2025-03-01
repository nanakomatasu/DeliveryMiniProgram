<template>
	<view class="dis-flex flex-dir-column" :class="shareShow?'over-hide':''" @tap="isMore=false">
		<view class="dis-flex flex-dir-column" id="top">
			<!-- 当导航条固定在顶部时 一个盒子占位  防止页面闪烁 -->
			<view :style="{height:navHeight+'px'}" v-if="bgColor!=='rgba(255,255,255,0)'"></view>
			<!-- <view :style="{height:tabHeight+'px'}" v-if="isTabTop"></view> -->
			<!-- 顶部的评论类型 -->
			<view v-if="scrollTop>navHeight+tabHeight&&commTop>130&&tabAct==2"
				class="dis-flex  flex-y-center pt24 pb24 bg-white-ff pr24 pl24 fixed-top box-size"
				:style="{top:navHeight+tabHeight+'px'}">
				<view class="f-24 comment-tab-item "
					:class="commentTabAct==item.id?'bg-red-d6-ec col-white-ff':'col-brank-10 bg-gray-ea'"
					v-for="(item,index) in commentTab" :key="index" @tap.stop="changeCommentTab(item.id)">
					{{item.name}}<text v-if="item.num">{{item.num}}</text>
				</view>
			</view>

			<!-- 顶部-->
			<image class="shop-head-bg" mode="aspectFill" :src="detail.front_img"></image>
			<!-- 顶部固定内容  -->
			<view class="fixed-top dis-flex flex-dir-column">
				<!-- 导航栏 -->
				<view id="nav" class="p-r">
					<u-navbar leftIconSize="36rpx"  :safeAreaInsetTop="true" :fixed="false" :bgColor="bgColor"
						leftIconColor="#fff" :autoBack="true">

						<view class="dis-flex flex-y-center p-r" style="{marginRight: mr+'px'}" slot="right">
							<!-- <image class="wh44 mr32" src="/pagesIndex/static/shop-icon01.png"
								@tap.stop="onLink('/pagesIndex/page/campusTakeout/index/search/search?id='+id)"></image> -->

							<!-- <image v-if="isCollected==0" @tap="getJoininfoAdd" class="wh44 mr32"
								src="/pagesIndex/static/shop-icon02.png"></image> -->

							<!-- <image v-if="isCollected==1" @tap="getJoininfoAdd" class="wh44 mr32"
								src="/pagesIndex/static/icoyishoucangx.png"></image> -->

							<image class="wh44 mr32" src="/pagesIndex/static/shop-icon03.png" @tap.stop="tochat">
							</image>
							<image class="wh44 mr32" id="more" @tap.stop="isMore=true"
								src="/pagesIndex/static/shop-icon04.png">
							</image>
						</view>
					</u-navbar>
					<!-- 更多的弹窗 -->
					<!-- <view class="more-win radio-16 pt12 pb12 pl24 pr24 box-size bg-white-ff" v-if="isMore" id="moreWin">
						<view class="dis-flex flex-y-center pt20 pb20" @tap.stop="isMore=false;shareShow=true">
							<image class="wh32 mr16" src="/pagesIndex/static/more-win01.png"></image>
							<view class="f-24 col-brank-20">分享商家</view>
						</view>
						<view class="dis-flex flex-y-center pt20 pb20"
							@tap.stop="onLink('/pagesIndex/page/campusTakeout/index/report/report?id='+id)">
							<image class="wh32 mr16" src="/pagesIndex/static/more-win02.png"></image>
							<view class="f-24 col-brank-20">投诉举报</view>
						</view>
					</view> -->
				</view>
			</view>
			<view class="shop-detail  bg-white-ff" :class="isOpen?'':'border-b-f7 '">
				<!-- 店铺头部基础信息 -->
				<view class="dis-flex flex-center flex-x-between shop-head">
					<image class="wh128 radio-8" :src="detail.logo"></image>
					<view class="shop-r dis-flex flex-x-center flex-dir-column">
						<view class="w-100 f-40 f-b onelist-hidden " :class="isOpen?'mb16':'mb5'">{{detail.name}}</view>
						<!-- <view class="f-30">桌号：{{table}}</view> -->
						<view class="price-l dis-flex flex-y-center w-100 col-gray-88 f-24">
							<view class="dis-flex flex-y-center f-24 col-orange-ff95 mr20 case">
								<image class="wh24 mr10" src="/static/img/case.png"></image>
								<view class="f-b">{{detail.score}}</view>
							</view>
							<view class=" onelist-hidden ">月售{{detail.month_sales}}</view>
							<view class="ml20 onelist-hidden">人均¥{{Number.parseInt(detail.per_capita_order_price)}}
							</view>
						</view>
						<view class="dis-flex flex-y-center mt5" v-if="isOpen==false">
							<view class="label radio-4 mr16  f-22 border-red-eb col-red-dd" v-for="(item,index) in detail.reduce" :key="index">{{item}}</view>
						</view>
					</view>
				</view>
				<view class="m-t-20 flex-al-c">
					<view  class="redPokect" v-for="(item,index) in detail.redPacket" :key="index" @click="redpocketShow =true">
						<view class="left">￥{{item.amount}}</view>
						<view class="right" v-if="item.is_received==0">领</view>
						<view class="right" v-else>已领</view>
					</view>
				</view>
				<!-- 展开店铺信息的时候不显示 -->
				<block v-if="isOpen==false">
					<!-- 店铺标签 -->
					<!-- <view class="dis-flex flex-y-center col-red-d9 f-22 mt24">
						<view class="label-bg bg-red-F7 radio-4 mr8">金牌店铺</view>
						<view class="label-bg bg-red-F7 radio-4 mr8">放心吃</view>
						<view class="label-bg bg-red-F7 radio-4 mr8">优选好店</view>
					</view> -->
					
					<!-- 店铺介绍 -->
					<!-- <view class="dis-flex flex-y-center mt12 flex-x-between" >
						<view class="w-85 onelist-hidden f-24 col-gray-88">{{detail.notice||'暂无公告'}}</view>
						<image class="wh28" src="/pagesIndex/static/bottom.png"></image>
					</view> -->
					<!-- <view class="dis-flex flex-y-center w-90" @tap="openMap">
						<image class="wh32 mr20" src="/pagesIndex/static/shop-detail01.png"></image>
						<view class="w-85">{{detail.city+ detail.area+detail.address}}</view>
					</view> -->
					<!-- tab切换-->
					<view class="dis-flex flex-y-center tab-box mt8" id="tab">
						<view class="f-32 mr80 f-b " :class="tabAct==item.id?'tab-act col-brank-20':'col-gray-8e'"
							v-for="(item,index) in tabList" :key="index" @tap.stop="tabAct=item.id">{{item.name}}</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 店家信息展开的时候不显示 -->
		<block v-if="isOpen==false">
			<view class=" box-size" :class="tabAct==1?'dis-flex':''"
				:style="{height:scrollHeight+'px' ,paddingBottom:bottomHeight+'px'}">
				<!-- 商品模块 -->
				<block v-if="tabAct==1">
					<block v-if="typeList.length>0">
						<!-- 商品分类 -->
						<scroll-view :scroll-y="isTabTop?true:false" class="goods-l bg-gray-f7">
							<view class="type-item f-24 t-c col-brank-20" :id="item.type_id"
								:class="[typeIndex==index?'bg-white-ff f-b f-24 type-act':'',(index==typeIndex-1)?'radio-rb-16':'',(index==typeIndex+1)?'radio-rt-16':'']"
								v-for="(item,index) in typeList" :key="index" @tap.stop="changeType(index)">
								{{item.name}}
							</view>
						</scroll-view>
						<!-- 商品 -->
						<scroll-view :scroll-y="isTabTop?true:false" class="goods-r bg-white-ff"
							:scroll-into-view="scrollGoodsId" :scroll-with-animation="true" @scroll="goodsScroll">
							<view v-for="(item,index) in typeList" class="select-goods-item" :key="index"
								:id="'a'+item.type_id">
								<view class="pt20 pl20 pb10 box-size col-gray-88 f-28">{{item.name}}</view>
								<view class="goods-item flex-x-between dis-flex flex-y-center "
									v-for="(items,indexs) in item.goods" :key="indexs"
									@tap.stop="onLinkx(items.goods_id)">
									<image v-if="items.img" class="radio-8 wh180"
										:src="items.img.split(',')[0]||items.img" mode="aspectFill"></image>
									<image v-else class="radio-8 wh180"
										src="../../../../static/img/food_default.png" mode="aspectFill"></image>
									<view class="goods-item-r dis-flex flex-dir-column flex-x-between ">
										<view>
											<view class="f-28 col-brank-20 w-100 onelist-hidden mb10 f-b">
												{{items.name}}
											</view>
											<view class="label-num dis-flex flex-y-center mb10" v-if="items.attribute">
												<view class="bg-gray-ee  onelist-hidden  f-20 radio-4 mr8"
													v-for="(itemLabel,indexLabel) in items.attribute.split(',')"
													:key="indexLabel" v-if="indexLabel<2">{{itemLabel}}</view>
											</view>
											<view class="f-22 col-gray-88 w-100  onelist-hidden">
												<text class="mr20">月售{{items.month_sales||'0'}}</text>
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
											<view class="" v-if="detail.time_open==1">
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
											
											<view class="f-14 c-88" style="width: 200rpx;" v-if="detail.time_open==0">
												店铺已打烊
											</view>


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
				</block>
			
				<block v-else>
					<scroll-view class="f-28 h-100 col-brank-22" :scroll-y="isTabTop?true:false">
						<!-- 地址\档案-->
						<view class="bg-white-ff pl32 pt12 pb12 box20-f7  pr32 box-size">
							<view class="dis-flex pt20 pb20 flex-y-center flex-x-between">
								<view class="dis-flex flex-y-center w-90" @tap="openMap">
									<image class="wh32 mr20" src="/pagesIndex/static/shop-detail01.png"></image>
									<view class="w-85">{{detail.city+ detail.area+detail.address}}</view>
								</view>
								<image class="wh32 mr12" src="/pagesIndex/static/shop-detail02.png"
									@tap.stop="callMobile(detail.contacts_tel)"></image>
							</view>
							<view class="dis-flex pt20 pb20 flex-y-center flex-x-between"
								@tap.stop="onLink('/pagesIndex/page/campusTakeout/index/safetyArchives/safetyArchives?id='+id)">
								<view class="dis-flex flex-y-center w-90">
									<image class="wh32 mr20" src="/pagesIndex/static/shop-detail03.png"></image>
									<view class="w-85">查看食品安全档案</view>
								</view>
								<image class="wh28" src="/pagesIndex/static/shop-detail08.png"></image>
							</view>
						</view>
						
						<!-- 公告和服务 -->
						<view class="bg-white-ff pl32 box20-f7 pt12 pb12   pr32 box-size">
							<view class="dis-flex pt20 pb20 flex-y-center flex-x-between" >
								<view class="dis-flex flex-y-center w-90">
									<image class="wh32 mr20" src="/pagesIndex/static/shop-detail06.png"></image>
									<view class="w-85 onelist-hidden">{{detail.notice||'暂无公告'}}</view>
								</view>
							</view>
							
						</view>
						<!-- 商家相册 -->
						<view class="bg-white-ff  pl32 pt32 pb32 mb20  pr32 box-size">
							<view class="f-32 col-brank-22 f-b mb20">商家相册</view>
							<view class="dis-flex flex-y-center flex-wrap comment-item-cover">
								<image class="radio-8 mb20 wh216" mode="aspectFill" :src="item"
									v-for="(item,index) in detail.album" :key="index" @tap.stop="previewImage(index)">
								</image>
							</view>
						</view>
					</scroll-view>
				</block>
			</view>


			<!-- 多规格弹窗 -->
			<sku :show="skuShow" @skuCanel="skuCanel" @addCard="addSpecCard" :specsObject="specsObject"></sku>
			<!-- 固定在底部的购物车 -->
			<view class="" v-if="detail.time_open==1">
				<view id="bottom" v-show="typeList.length>0" >
					<riderBottom :type="0" :cardData="cardData" @clearCart="clearCart" @delNum="delNumBottom"
						@addNum="addNumBottom">
					</riderBottom>
				</view>
			</view>
		</block>
		<!-- 购物车 -->
		<view class="">
			<view id="bottom" v-show="typeList.length>0" >
				<riderBottom :type="1" :dy="detail.time_open" :tableId="tableId" :cardData="cardData" @clearCart="clearCart" @delNum="delNumBottom" @addNum="addNumBottom">
				</riderBottom>
			</view>
		</view>
		<u-popup :show="redpocketShow" round="32rpx" @close="redpocketShow=false" zIndex="997">
			<view style="height: 500rpx;background-color:#f2f2f2;" class="dis-flex  flex-dir-column paddall3624">
				<view class="f-30 w-100 flex-center mb30">本店代金券</view>
				<view class="dis-flex w-100 flex-space flex-y-center bg-white-ff paddall24 radio-16 mt20"
				  v-for="(item,index) in detail.redPacket" :key="index">
					<view class="dis-flex flex-dir-column" >
						<view class="dis-flex flex-dir-row"> 
							<view class="col-red-d3 mr15">￥{{item.amount}}</view>
							<view>{{item.amount}}元代金券（满{{item.use_threshold}}元可用）</view>
						</view>
						<view class="f-24 c-20">有效期至{{formateTime(item.end_time)}}</view>
					</view>
					<view v-if="item.is_received==0" class="col-red-d3  m-tb-40" @click="getRedPocket(item)">领取</view>
					<view v-else class="col-gray-33  m-tb-40">已领取</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import * as Util from '@/common/util.js'
	import urlConfig from '@/config/index.js'
	export default {
		data() {
			return {
				isCollected: "",
				mr: 0, //距离右边胶囊的宽度
				skuShow: false, //是否显示多规格弹窗
				isMore: false, //是否显示更多的弹窗
				scrollTop: 0, //页面滚动距离
				navHeight: 0, //导航条高度 包含状态栏
				topHeight: 0, //id为top元素的高度
				bottomHeight: 0, //id为bottom元素的高度
				tabHeight: 0, //id为tab的高度 单位px
				id: "", //店铺id
				bgColor: "rgba(255,255,255,0)", //导航栏背景颜色
				isTabTop: false, //是否显示顶部的切换栏
				detail: {}, //商家详情
				tabList: [{
					name: "商品",
					id: 1
				}, {
					name: "商家",
					id: 2
				}, ],
				tabAct: 1, //当前选中的tab页id 对应tablist
				scrollHeight: 0, //滚动条高度
				typeList: [], //商品列表
				scrollGoodsId: '', //当前滚动到的商品id
				HeightArr: [], //商品滚动条里面的每一项的高度区间
				typeIndex: 0, //选中的分类下标
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
				commentTabAct: 0, //选中的评论类型id
				commentList: [], //评论相关数据
				status: "loadmore", //评论的加载更多
				commTop: 0, //评论滚动条距离顶部的距离
				shareShow: false, //是否显示分享弹窗
				isOpen: false, //是否展开商家信息
				cardData: {}, //购物车数据
				specsObject: {
					name: "",
					specs: [],
					specs1: [],
					price: 0,
					attribute: [],
				}, //规格弹窗的数据
				orderId: '',
				shareContent: {}, //分享店铺内容
				type: 1, //不同页面跳进来的标识
				xself_lifting: "",
				spec: "",
				spec1: "",
				table: '',
				tableId: 0,
				orderId: '',
				redpocketShow: false,
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.table = option.table;
			this.shopName = option.name;
			this.tableId = option.tableId;
			this.orderId = option.orderId;
			console.log(this.orderId)
			if (this.orderId) {
				this.getOrderAgain()
			}
			//#ifdef  MP-WEIXIN
			this.mr = uni.getMenuButtonBoundingClientRect().width + 16
			//#endif	
		},
		onShow() {
			this.getMerchantInfo()
			this.getTakeoutGoodsLists()
		},
		mounted() {

			//h5放在这个生命周期才生效 初始化滚动高度
		},
		onPageScroll(e) {
			this.isMore = false
			// this.scrollTop = e.scrollTop
			console.log(e.scrollTop, this.topHeight - this.navHeight, "滚动")
			if (e.scrollTop >= 50) {
				this.bgColor = "#D93038"
			} else {
				this.bgColor = "rgba(255,255,255,0)"
			}

			// if (e.scrollTop >= this.topHeight - this.tabHeight) {
			// 	this.isTabTop = true
			// } else {
			// 	this.isTabTop = false
			// }
			this.$forceUpdate()
		},
		methods: {
			onLinkx(goods_id){
				if(this.detail.time_open==1){
					uni.navigateTo({
						url: '/pagesIndex/page/campusTakeout/index/goodsDetail/goodsDetail?id='+goods_id+'&time_open='+this.detail.time_open+'&types=1'
					})
				}else{
					this.$u.toast("店铺已打烊")
				}
			},
			
			formateTime(time) {
				return Util.formatDay(time*1000)
			},
			//领取红包
			async getRedPocket(item) {
				let that = this;
				const {
					data,
					status
				} = await that.$api.getRedPokect({
					red_packet_id: item.red_packet_id,
				})
				if(status == 200) {
					this.getMerchantInfo();
				} 
			},

			//再来一单
			async getOrderAgain() {
				var that = this
				const {
					data,
					status
				} = await that.$api.orderAgain({
					order_type: 3, 
					order_id: this.orderId,
				})
				if (status == 200) {
							
				}
			},
			//跳转聊天
			tochat() {
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/chat/chat?id=' +
						'merchant' + this.id +
						'&name=' + this.detail.name +
						'&icon=' + this.detail.logo
				})
			},
			//清空了购物车 刷新购物车列表和商家商品列表
			clearCart() {
				this.getTakeoutGoodsLists()
				this.getTakeoutCartLists()
			},
			//获取商家商品列表
			async getTakeoutGoodsLists() {
				var that = this
				const {
					data,
					status
				} = await that.$api.takeoutGoodsLists({
					merchant_id: this.id,
					type: 1
				})
				if (status == 200) {
					this.typeList = data.list
					if (data.list.length > 0) {
						this.scrollGoodsId = 'a' + data.list[0].type_id
					}
					setTimeout(function() {
						that.initHeight()
					}, 700)

				}
			},
			//获取商家评价列表
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
				var commentList = this.commentList;
				const {
					data,
					status
				} = await that.$api.orderCommentList({
					store_id: this.id,
					order_type: 1, //1外卖，2附近，3优选
					limit: 10,
					page: this.page,
					type: this.commentTabAct, //评论类型 0全部，1最新，2好评，3差评
				})
				uni.hideLoading()
				if (status == 200) {
					this.commentTab[0].num = data.total_count
					this.commentTab[2].num = data.hp_count
					this.commentTab[3].num = data.cp_count
					if (!data.list.data) {
						that.status = 'nomore'
						return
					}
					commentList = commentList.concat(data.list.data)
					that.commentList = commentList


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
					this.isCollected = data.user_is_collect
					console.log(data)
					uni.setNavigationBarTitle({
						title: data.name
					});
					this.shareContent.title = data.name;
					this.shareContent.summary = '好店分享，来自校U'
					this.shareContent.imageUrl = data.logo;
					this.shareContent.href = urlConfig+'h5';
					this.getTakeoutCartLists()

				}
			},
			//点击关闭规格弹窗
			skuCanel() {
				this.skuShow = false
			},
			//点击打开地图
			openMap() {
				uni.openLocation({
					latitude: Number(this.detail.lat),
					longitude: Number(this.detail.lng),
					name: "商家位置",
					address: this.detail.address,
					success: function() {
						console.log('success');
					}
				});
			},

			//加入购物车
			addCard(items, item) {
				console.log(items, "=====-----")
				var attribute = items.attribute
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
				// this.getTakeoutCartAdd(e.items, e.spec, e.attribute)

				// if(e.type==1){
				// 	this.spec1=''
				// 	this.spec=	e.spec
				// 	this.getTakeoutCartAdd(e.items, e.attribute)
				// }else if(e.type==2){
				// 	this.spec=''
				// 	this.spec1= e.spec1
				// 	this.getTakeoutCartAdd(e.items,  e.attribute)
				// }

				this.spec = e.spec
				this.spec1 = e.spec1

				this.getTakeoutCartAdd(e.items, e.attribute)

				console.log(e.attribute, "-==")


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
				console.log(items, "123")

				this.getTakeoutCartAddx(items, items.spec, items.attribute)

			},
			//获取加入购物车接口
			async getTakeoutCartAdd(items, attribute, spec1) {
				console.log(items, attribute, spec1, "--===")
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
					attribute: attribute || "",
					type: this.type
				})
				if (status == 200) {
					this.clearCart()
				}
			},

			//获取加入购物车接口
			async getTakeoutCartAddx(items, attribute, spec1) {
				console.log(items, attribute, spec1, "--===")
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
					attribute: items.attribute || "",
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
					data.starting_price = this.detail.starting_price
					this.cardData = data
					console.log('购物车数据')
					console.log(this.cardData)
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
			//跳转链接
			onLink(url) {
				uni.navigateTo({
					url: url
				})
			},
			//拨打商家电话
			callMobile(mobile) {
				uni.showModal({
					title: "温馨提示",
					content: "请确认联系商家" + mobile,
					confirmText: "拨打",
					cancelText:"取消",
					success(res) {
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: mobile
							})
						}
					}
				})

			},
			//预览评论图片
			previewImage(index, cover) {
				uni.previewImage({
					urls: this.detail.album,
					current: index,
					indicator: true,
					loop: true,
					fail(e) {
						console.log(e)
					}
				});
			},
			//评论滚动
			commScroll(e) {
				this.commTop = e.detail.scrollTop //记录评论滚动 滚动到一定距离固定在顶部
			},
			//修改当前选中的评论类型
			changeCommentTab(id) {
				this.commentTabAct = id
				this.getOrderCommentList()
			},
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
				console.log(this.HeightAr, "1212")

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
			//初始化商品滚动条的高度
			initHeight() {
				var that = this
				uni.getSystemInfo({
					success: function(res) {
						// 获取可使用窗口高度
						let clientHeight = res.windowHeight;
						const query = uni.createSelectorQuery().in(that);
						//获取顶部固定元素和底部的高度
						query.select('#bottom').boundingClientRect()
						console.log(query.select('#bottom').boundingClientRect(), "=-=")
						query.select('#nav').boundingClientRect()
						query.select('#tab').boundingClientRect()
						query.select('#top').boundingClientRect()
						query.selectAll('.select-goods-item').boundingClientRect()
						query.exec(function(r) {
							that.calculateHeight(r[4]) //获取每一个分类的商品区域高度
							that.topHeight = r[3].height
							that.navHeight = r[1].height
							that.bottomHeight = r[0].height
							that.tabHeight = r[2].height
							//滚动的高度等于整个页面的高度  等滚动到一定高度时 将顶部固定内容导航条和tab的高度  还有底部固定内容的高度 作为上下边距
							//这样子就不会遮挡内容
							console.log(clientHeight, "clientHeight")
							that.scrollHeight = clientHeight - r[1].height - r[2].height
						})
					}
				});

			},
			//取消分享
			cancelShare() {
				this.shareShow = false;
			},

			//收藏
			async getJoininfoAdd() {
				var that = this
				const result = await that.$api.collection({
					collection_id: this.detail.merchant_id,
					type: 1,
				})
				if (result.status == 200) {
					this.isCollected = this.isCollected == 0 ? 1 : 0
				}
			},
		}
	}
</script>

<style>
	page {
		background: #fff;
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
	.redPokect{
		height: 5.6vw;
		background: #FF473D;
		color: #FFFFFF;
		border-radius: 0.53333333vw;
		margin-right: 1.06666667vw;
		display: flex;
		flex-direction: row;
	}
	.redPokect .left{
		padding: 0 1.6vw 0 2.666vw;
		height: 100%;
		border-right: 1px dashed #FFFFFF;
		box-sizing: border-box;
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
	}
	.redPokect .right{
		padding: 0 1.6vw 0 2.666vw;
		height: 100%;
		box-sizing: border-box;
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
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
		padding-top: 20rpx;
		padding-bottom: 20rpx;
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
