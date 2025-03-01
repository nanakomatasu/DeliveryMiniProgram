<template>
	<view class="page">
		<!-- 固定顶部 -->
		<view class="bg-white-ff fixed-top">
			<!-- 导航栏 -->
			<indexNav :navStyle="pagex.style" :school="school" :weather="weather" :weatherImg="weatherImg" :type="1">
			</indexNav>
			<!-- <u-navbar leftIconSize="32rpx" :safeAreaInsetTop="true" :fixed="false" :autoBack="true">
				<view class="u-nav-slot" slot="left">
					<view class="dis-flex flex-y-center" @tap="back">
						<u-icon name="arrow-left" size="34rpx"></u-icon>
						<view class="f-34 f-b col-brank-20">校园外卖</view>
					</view>

				
					<view class="dis-flex flex-y-center ml20" @tap="changeAddress">
						<image class="wh32 mr5" src="@/pagesIndex/static/address.png"></image>
						<view class="address-school onelist-hidden">{{school.school_name}}</view>
						<image class="wh28" src="@/pagesIndex/static/right.png"></image>
					</view>
				</view>
			</u-navbar> -->
			<!-- 热搜词-->
			<view v-if="showSearch" class="pl26 pr26 box-size p-t-10 p-b-10" :style="{
						backgroundColor	:searchStyle.backgroundcolor }">
				<view class="flex flex-jus-spa flex-al-c">
					<view style="width: 100%;margin: 8rpx;background-color: transparent;" @tap.stop="goSearch">
						<u-search class="u-search-test" :borderColor="searchStyle.borderColor" searchIconSize=" 32rpx"
							searchIcon="/static/img/search.png" :placeholder="searchParams.placeholder"
							@custom="goSearch" searchIconColor="#909399" v-model="screen.keyword" color="#202020"
							:showAction="true" :actionText="searchParams.btnText" height="55rpx" bgColor="white"
							:actionStyle="{
									width: searchParams.btnstatus ==1?  '104rpx' :'0',
									height: searchParams.btnstatus ==1?'64rpx':'0',
									background: searchStyle.btnColor,
									borderRadius: '40rpx',
									textAlign: 'center',
									lineHeight: '63rpx',
									color: searchStyle.btnfontColor,
									boxSize:'border-box',
									fontSize:'24rpx',
									paddingLeft:'4rpx' 
								}"></u-search>
					</view>

					<!-- #ifdef APP-PLUS -->
					<view v-if="searchParams.qrstatus ==1" class="wh-44 m-l-32" @tap="scanCode">
						<image class="wh-44" src="@/static/img/ico-saoyisao.png" mode=""></image>
					</view>
					<!-- #endif -->
					<view v-if="searchParams.kfstatus==1" class="wh-44 m-l-40" @tap="UmobileShow=true">
						<image class="wh-44" src="@/static/img/ico-kefu.png" mode=""></image>
					</view>
				</view>

				<view v-if="showHot" class="hot-text f-24 pt12 pb12 onelist-hidden w-100 pl12 box-size col-gray-90">
					<text>热搜：</text>
					<text class="pl12 pr12" v-for="(item,index) in hotText" :key="index"
						@tap="hotChange(item)">{{item.title}}</text>
				</view>
			</view>
		</view>

		<!-- 内容 -->
		<view class="cont24-20 " :style="{marginTop:marginTop}">
			<view class="   " v-for="(page,pageIndex) in pageItems" :key="pageIndex">
				<!-- 辅助空白 -->
				<!-- 	<view v-if="page.type == 'blank'" style="height: 20rpx;background-color: white">
				</view> -->
				<!-- 辅助线 -->
				<view v-if="page.type == 'guide'"
					style="width: 100%;height: 1px;margin-bottom: 10px;margin-top: 10px; background-color: black;">
				</view>
				<!-- banner -->
				<indexBanner v-if="page.type == 'banner'" :swiperList="page.data" :interval="page.params.interval">
				</indexBanner>
				<!-- 通知 -->
				<view v-if="page.type == 'notice'" class="flex-al-c  w-100 bgc-ff padd-18-22 bor-r-8">
					<image class="wh-5628 m-r-16" src="@/static/img/notice.png" mode=""></image>
					<u-notice-bar :text="newsListText" fontSize="24rpx" @click="clickNews" color="#333"
						bgColor="transparent" direction="column"></u-notice-bar>
				</view>
				<!-- 单行图 -->
				<view v-if="page.type== 'imageSingle'" style="width: 100%;height: auto;">
					<image v-for="(image, imgIndex) in page.data" :key="imgIndex" :src="image.imgUrl"
						style="width: 100%;margin-top: 10rpx;"></image>
				</view>

				<!-- 导航图标 -->
				<indexNavItems v-if="page.type == 'navBar'" :menuArr="page.data" :data="page.data" :st="page.style">
				</indexNavItems>

				<!-- 图片橱窗 -->
				<!-- <indexCalendar v-if="page.type == 'window'" :images="page.data" :st="page.style"></indexCalendar> -->
				<!-- 外卖商品 -->
				<indexSpecialList v-if="page.type == 'special_goods'" :goods="page.data" :st="page.style"></indexSpecialList>
			</view>
			<view class="" style="padding: 8px 5px;box-sizing: border-box;">
				<view class="   " v-for="(page,pageIndex) in pageItems" :key="pageIndex">
					<indexCalendar v-if="page.type == 'window'" :images="page.data" :st="page.style"></indexCalendar>
				</view>
			</view>
			<block v-if="showShop">
				<view class="bg-white-ff pt20 pb10 radio-16 mb20" v-if="menuArr.length>0">
					<swiper class="menu-swiper" :current="current" @change="changeMenuSwiper">
						<swiper-item v-for="(item, index) in menuArr" :key="index">
							<view class="dis-flex flex-y-center flex-wrap">
								<view class="dis-flex flex-dir-column flex-x-center mb40  flex-y-center w-20"
									@tap="toLink('/pagesIndex/page/campusTakeout/index/listNext/listNext?id='+items.id+'&name='+items.name)"
									v-for="(items,indexs) in item" :key="indexs">
									<image class="wh88" :src="items.icon" mode=""></image>
									<view class="f-24 t-c w-100 onelist-hidden mt16">{{ items.name }}</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<view class="indicator-dots mb30 dis-flex flex-y-center flex-x-center" v-if="menuArr.length>1">
						<view v-for="(item, index) in menuArr" :key="index"
							:class="index==current?'act-swiper':'def-swiper'"></view>
					</view>
				</view>
				<!-- 向右滑动的筛选tab -->
				<!--  -->
				<view class="dis-flex flex-y-center flex-x-between pt12 pb20" v-if="screenList.length>0">
					<scroll-view scroll-x="true" class="tab-scroll">
						<view class="tab-item f-28" @tap="changeTabAct(item.id)" :class="tabAct==item.id?'tab-actx':''"
							v-for="(item,index) in screenList" :key="index">{{item.name}}</view>
					</scroll-view>
					<image class="wh32 ml34 mr16 ml50" @tap="show=true" src="@/pagesIndex/static/tab-more.png"></image>
				</view>
				<!-- 排序 -->
				<view class="dis-flex flex-y-center ">
					<view class="sort-item dis-flex flex-y-center flex-x-center" v-for="(item,index) in sortList"
						:key="index" @tap="changeSort(item,index)">
						<view class="mr5 f-24" :class="sortId==item.id?'col-red-d9':''">{{item.name}}</view>
						<block v-if="index==0">
							<image class="wh20" v-if="sortId!=1" src="/static/img/screen-bottom.png"></image>
							<image class="wh20" v-else
								:src="item.sort?'/static/img/screen-bottom02.png':'/static/img/screen-top.png'"></image>
						</block>
					</view>
				</view>
				<!-- 商家列表 -->
				<view class="bg-white-ff mt20 radio-16 cont24" v-for="(item,index) in shopList" :key="index"
					@tap="shopDetail(item.merchant_id,item.labels)">
          <view class="dis-flex">
            <view class="p-r mr20">
              <image class="wh180 radio-8" :src="item.logo"></image>
              <view class="reserve-tag" v-if="item.status==1 && item.time_open==0 && item.is_support_yd == 1">可预定</view>
              <view class="rest-tag" v-if="item.status==1 && item.time_open==0 && item.is_support_yd == 0">休息中</view>
              <view class="rest-tag" v-if="item.status==0">已打烊</view>
            </view>
            <view class="dis-flex flex-dir-column flex-space shop-r w-70">
              <view class="dis-flex flex-y-center mb12">
                <!-- <view class="bg-orange-fa-f2 radio-4 mr10 f-22 col-white-ff pl5 pr5 ">神券</view> -->
                <view class="onelist-hidden w-80 f-32 f-b">{{item.name}}</view>
              </view>
              <view class="dis-flex flex-y-center flex-x-between mb5 price">
                <view class="price-l dis-flex flex-y-center w-75">
                  <view class="dis-flex flex-y-center f-28 col-orange-ff95 m-r-10 case">
                    <image class="wh24 mr10" src="/static/img/case.png"></image>
                    <view class="f-b">{{item.score}}</view>
                  </view>
                  <view class="col-gray-88 f-22  mr10 box-size onelist-hidden ">月售{{item.month_sales}}
                  </view>
                  <view class="col-gray-88 f-22 w-45 onelist-hidden">
                    ¥{{item.per_capita_order_price}}/人</view>
                </view>
                <view class="price-r col-red-d9 f-22">{{item.distribution_type==2?'商家配送':'平台配送'}}</view>
              </view>
              <view class="col-gray-88   dis-flex flex-y-center flex-x-between f-22">
                <view class="w-50 onelist-hidden">
                  <text class="mr20">起送¥{{item.starting_price}}</text>
                  <text>配送¥{{item.delivery_money}}</text>
                </view>
                <view class="w-50 t-r onelist-hidden">
                  <text class="mr10">{{item.delivery_time}}分钟</text>
                  <!-- <text v-if=" item.juli != '附近' ">距</text> -->
                  距
                  <text class="ml5">{{item.juli}}</text>
                </view>
              </view>
              <view class="dis-flex mt15 flex-y-center">
                <scroll-view scroll-x="true" class="tab-scroll" style="width: 460rpx;">
                  <view class="flex">
                    <template v-if="item.labels&&item.labels.length">
                      <view class="label radio-4 m-l-8  f-22 bg-red-F7 col-red-dd "
                      v-for="(n,i) in item.labels" :key="i">{{n}}</view>
                    </template>
                    <template v-if="item.reduce&&item.reduce.length">
                      <view class="label radio-4 m-l-8  f-22 bg-red-F7 col-red-dd "
                      v-for="(n,i) in item.reduce" :key="i">{{n}}</view>
                    </template>
                    <template v-if="item.redPacket&&item.redPacket.length">
                      <view class="label radio-4 m-l-8  f-22 bg-red-F7 col-red-dd "
                      v-for="(n,i) in item.redPacket" :key="i">
                      {{n.amount}}元红包满{{n.use_threshold}}可用
                    </view>
                    </template>
                  </view>
                </scroll-view>
              </view>
              <view class="dis-flex flex-y-center mt15 f-22" v-if="item.status==1 && item.time_open==0 && item.is_support_yd == 1">
                <view class="bg-orange-ff9c pt1 pb1 col-white-ff radio-lt-lb-8 pr5 pl5">可预定</view>
                <view class="border-o-ff9c col-orange-ff9c radio-rt-rb-8 pr10 pl0">{{item.next_delivery_time}}后开始配送</view>
              </view>
            </view>
          </view>
          <view class="dis-flex mt15 flex-y-center" v-if="item.is_recommend_goods&&item.is_recommend_goods.length">
              <scroll-view scroll-x="true" class="tab-scroll" style="width: 100%;">
                <view class="flex">
                  <view class="dis-flex flex-dir-column mr20 p-r"
                    v-for="(n,i) in item.is_recommend_goods" :key="i">
                    <img class="imgsx radio-16" :src="n.img" alt="">
                    <view class="goods-name onelist-hidden f-28" style="width: 160rpx;">{{ n.name }}</view>
                    <view class="color-D93038 col-gray-33 f-28">
                      <text>
                        ¥{{ n.price }}
                      </text>
                      <text class="f-24 col-gray-88 ml10 text-line">{{ n.scribe_price }}</text>
                    </view>
                  </view>
                </view>
              </scroll-view>
            </view>
				</view>

				<null-data title="暂无商家" v-if="shopList.length==0"></null-data>
				<u-loadmore v-else-if="shopList.length>1" :status="status" fontSize="26rpx" color="#999" />
			</block>

		</view>

		<!-- 购物车弹窗 -->
		<!-- <view class="cart dis-flex flex-x-center flex-y-center">
			<image class="wh48" src="/pagesIndex/static/cart-fixed.png"></image>
		</view> -->
		<!-- 导航菜单栏 -->

		<takeMenu></takeMenu>
		<!-- 筛选弹窗 -->
		<u-popup :show="show" mode="top" round="16rpx" @close="show=false">
			<view class="pb20">
				<u-navbar leftIconSize="32rpx" :safeAreaInsetTop="true" :fixed="false">
					<view class="u-nav-slot" slot="left">
						<view class="dis-flex flex-y-center" @tap="back">
							<u-icon name="arrow-left" size="34rpx"></u-icon>
							<view class="f-34 f-b col-brank-20">校园外卖</view>
						</view>
						<view class="dis-flex flex-y-center ml20" @tap="goLocation">
							<image class="wh32 mr5" src="@/pagesIndex/static/address.png"></image>
							<view class="address-school onelist-hidden">{{school.school_name}}</view>
							<image class="wh28" src="@/pagesIndex/static/right.png"></image>
						</view>
					</view>
				</u-navbar>
				<!-- 筛选内容 -->
				<view class="pl26 pr26 box-size ">
					<!-- 热搜词-->
					<u-search searchIconSize="32rpx" searchIcon="/static/img/search.png" placeholder="请输入关键词"
						searchIconColor="#909399" color="#202020" :showAction="false" v-model="screen.keyword"
						height="60rpx" bgColor="#F6F6F6" @search="search" @clear="clearSearch"></u-search>
					<view class="hot-text f-24 pt12 mb16 pb12 onelist-hidden w-100 pl12 box-size col-gray-90">
						<text>热搜：</text>
						<text class="pl12 pr12" v-for="(item,index) in hotText" :key="index"
							@tap="hotChange(item)">{{item.title}}</text>
					</view>
					<!-- 按钮筛选部分 -->
					<scroll-view class="scroll-win" scroll-y="true">
						<!-- 人均价格筛选 -->
						<view class="col-gray-88 f-24 mb16">人均价格筛选</view>
						<view class="dis-flex flex-y-center price-screen flex-x-between mb34">
							<input class="f-24 t-c bg-gray-f6 radio-8 price-input" v-model="screen.minPrice"
								type="number" placeholder="最低价" placeholder-style="color:#888888" />
							<view class="col-gray-c3">-</view>
							<input class="f-24 t-c bg-gray-f6 radio-8 price-input" v-model="screen.maxPrice"
								type="number" placeholder="最高价" placeholder-style="color:#888888" />
						</view>

						<!--速度-->
						<view class="mt20" v-for="(item,index) in screenWinList" :key="index"
							v-if="index!=0 && index==1">
							<view class="col-gray-88 f-24 mb16">{{item.title}}</view>
							<view class="dis-flex flex-y-center flex-wrap">
								<view class="screen-item mb16 onelist-hidden mr16 t-c f-24 radio-8 "
									@tap="velocity(item,items,index,indexs)"
									:class="delivery==items.value ?'bg-red-d6-ec col-white-ff' :'bg-gray-f6 col-brank-20'"
									v-for="(items,indexs) in item.data" :key="indexs">{{items.title||items.value}}
								</view>
							</view>
						</view>

						<!--时间-->
						<view class="mt20" v-for="(item,index) in screenWinList" :key="index"
							v-if="index!=0 && index==2">
							<view class="col-gray-88 f-24 mb16">{{item.title}}</view>
							<view class="dis-flex flex-y-center flex-wrap">
								<view class="screen-item mb16 onelist-hidden mr16 t-c f-24 radio-8 "
									@tap="stimej(item,items,index,indexs)"
									:class="juli==items.value ?'bg-red-d6-ec col-white-ff' :'bg-gray-f6 col-brank-20'"
									v-for="(items,indexs) in item.data" :key="indexs">{{items.title||items.value}}
								</view>
							</view>
						</view>

						<view class="mt20" v-for="(item,index) in screenWinList" :key="index"
							v-if="index!=0 && index==3 || index==4 || index==5">
							<view class="col-gray-88 f-24 mb16">{{item.title}}</view>
							<view class="dis-flex flex-y-center flex-wrap">
								<view class="screen-item mb16 onelist-hidden mr16 t-c f-24 radio-8 "
									@tap="changeScreenWinx(item,items,index,indexs,item.title)"
									:class="cooperatiox.indexOf(items.title) != -1?'bg-red-d6-ec col-white-ff' :'bg-gray-f6 col-brank-20'"
									v-for="(items,indexs) in item.data" :key="indexs">{{items.title||items.value}}
								</view>
							</view>
						</view>
					</scroll-view>
					<!-- 按钮 -->
					<view class="dis-flex flex-y-center flex-x-between">
						<view class="btn t-c radio-8 col-brank-20 bg-gray-ea" @tap="clearWin">重置</view>
						<view class="btn t-c radio-8 col-white-ff bg-red-d6-ec" @tap="confirmWin">完成</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup :show="UmobileShow" mode="center" :safeAreaInsetBottom="false" round="32rpx">
			<view class="win-box-mobile  box-size bg-white-ff radio-30">
				<view class="f-32 w-100 t-c f-b">客服电话</view>
				<view class="f-56 t-c f-b f-DINPro mt20">{{Umobile}}</view>
				<view class="dis-flex flex-y-center flex-x-between mt40">
					<view class="btn t-c bg-gray-ef radio-40" @tap="UmobileShow=false">取消</view>
					<view class="btn t-c bg-red-d6-ec col-white-ff radio-40" @tap="callUmobile">立即拨打</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import MapLoader from "@/utils/map.js"
	import WeatherImg from "@/common/weather.js"
	import MapUtil from '@/common/mapUtil.js'
	const app = getApp()
	export default {
		data() {
			return {
				menuArrx: [
					[],
					[]
				],
				identifiex: [],
				cooperatiox: [],
				cooperatioxs: [],
				screenWinList: [],
				school: {
					school_name: "手动定位"
				}, //学校地址
				show: false, //是否显示筛选弹窗
				marginTop: "", //菜单栏距离顶部的距离
				hotText: [{ //热搜词
					title: "美食",
				}, {
					title: "水果",
				}, {
					title: "蜜雪冰城",
				}, {
					title: "蛋糕",
				}, {
					title: "渔人码头",
				}],
				menuArr: [], //菜单栏
				current: 0, //当前轮播菜单选中的下标 对应menuArr
				screenList: [],
				tabAct: 0, //选中的筛选id
				sortList: [{
					name: "综合排序",
					id: 1,
					sort: true, //true是正序 向下  false是倒序 向上
				}, {
					name: "销量优先",
					id: 3,
				}, {
					name: "距离优先",
					id: 2,
				}, ],
				shopList: [], //商家列表
				page: 1,
				status: "loadmore",
				sortId: "", //当前选中的筛选
				screenWinList: [{ //筛选弹窗的条件
					title: "速度",
					key: "speed",
					list: [{
						name: "30分钟内",
						id: 1
					}, {
						name: "40分钟内",
						id: 2
					}, {
						name: "50分钟内",
						id: 3
					}, {
						name: "60分钟内",
						id: 4
					}]
				}, { //筛选弹窗的条件
					title: "距离",
					key: "speedx",
					list: [{
						name: "1km内",
						id: 5
					}, {
						name: "2km内",
						id: 6
					}, {
						name: "3km内",
						id: 7
					}, {
						name: "4km内",
						id: 8
					}]
				}, { //筛选弹窗的条件
					title: "商家特色",
					key: "characteristic",
					list: [{
						name: "新商家",
						id: 1
					}, {
						name: "0元起送",
						id: 2
					}, {
						name: "跨天订购",
						id: 3
					}, {
						name: "开发票",
						id: 4
					}]
				}, { //筛选弹窗的条件
					title: "品质",
					key: "quality",
					list: [{
						name: "5星以上",
						id: 1
					}, {
						name: "4星以上",
						id: 2
					}, {
						name: "点评高分",
						id: 3
					}]
				}, { //筛选弹窗的条件
					title: "优惠活动",
					key: "activity",
					list: [{
						name: "满减活动",
						id: 1
					}, {
						name: "首单立减",
						id: 2
					}],
				}],
				isLoad: false, //是否正在请求商家列表接口 
				screen: { //弹窗里面的筛选条件
					keyword: '', //搜索字段
					minPrice: "", //最低价
					maxPrice: "", //最高价
					speedx: "",
					speed: '', //配送时间
					characteristic: '', //商家特色
					quality: '', //品质
					activity: '', //优惠活动
					price: '',
				},
				cooperationt: [],
				feature: [],
				quality: [],
				juli: "",
				delivery: "",
				full: "",
				frist: "",
				pagex: {},
				pageInfo: {},
				pageItems: [], //页面items
				showSearch: false,
				showHot: false, //是否有热搜
				showShop: false,
				searchStyle: {},
				searchParams: {},
				category: "",
				weather: "", //天气
				weatherImg: "", //天气图标
				school: {
					school_name: "手动定位"
				}, //选中的学校
				UmobileShow: false,
				Umobile: '',
			}
		},
		onLoad(e) {
			this.initMap();
			this.category = e.category
			this.marginTop = uni.$u.addUnit(uni.$u.getPx('90rpx') + 44 + uni.$u.sys().statusBarHeight, 'px')
			this.getPage();
		},
		onReachBottom() {
			if (this.status != 'nomore' && this.isLoad == false) {
				this.getMerchantLists(true)
			}
		},
		onShow() {
			this.school = uni.getStorageSync('school')
			// this.getStorecateIndex()
			this.getStorelabelIndex()
			this.getMerchantLists()
			this.selectionlist()
			this.getPage();
			this.getPlatformCustomerPhone();
			// this.getPagex();
		},
		methods: {
			//天气查询
			initMap() {
				MapUtil.getWeather(res => {
					this.weather = res.weather.data + ' ' + res.temperature.data + '℃';
					this.weatherImg = WeatherImg(res.weather.data);
				})
			},
			//获取校U客服电话
			async getPlatformCustomerPhone() {
				var that = this
				const {
					data,
					status
				} = await that.$api.configGetInfo({
					ident: "baseset"
				})
				if (status == 200) {
					this.Umobile = data.mobile
				}
			},

			//获取首页数据
			async getPagex() {
				const res = await this.$api.getPage({
					school_id: uni.getStorageSync('school').id || 1,
					type: 20
				})
				if (res.status == 200) {
					this.pagex = res.data.page;
				}
			},


			//是否有搜索栏 与商家
			isShowSearch() {
				this.pageItems.forEach(item => {
					if (item.type == 'search') {
						this.showSearch = true;
						this.searchStyle = item.style;
						this.searchParams = item.params;
						if (item.params.needhotkeys == 1) {
							this.showHot = true;
							this.marginTop = uni.$u.addUnit(uni.$u.getPx('120rpx') + 44 + uni.$u.sys()
								.statusBarHeight, 'px')
						}
					}
					if (item.type == 'shop') {
						this.showShop = true;
					}
				})
			},
			//获取首页数据
			async getPage() {
				const res = await this.$api.getPage({
					school_id: uni.getStorageSync('school').id || 1,
					type: 20
				})
				if (res.status == 200) {
					this.pagex = res.data.page;
					this.menuArrx = [
						[],
						[]
					]

					this.pageInfo = res.data.page;
					this.pageItems = res.data.items;


					// this.pageItems.forEach(item => {
					// 	if (item.name == '导航组') {
					// 		item.data.forEach((items, indes) => {
					// 			if (indes <10) {
					// 				this.menuArrx[0].push(item.data[indes])
					// 			}
					// 			if (indes > 9) {
					// 				this.menuArrx[1].push(item.data[indes])
					// 			}
					// 		})
					// 	}
					// })



					// res.data.items[2].data.forEach((item, index) => {
					// 	if (index < 10) {
					// 		this.menuArrx[0].push(this.pageItems[2].data[index])
					// 	}
					// 	if (index > 9) {
					// 		this.menuArrx[1].push(this.pageItems[2].data[index])
					// 	}
					// })
					this.isShowSearch()
				}
			},

			//轮播菜单跳转
			toLink(url) {
				uni.navigateTo({
					url: url
				})
			},
			//轮播菜单切换
			changeMenuSwiper(e) {
				this.current = e.detail.current
			},
			//获取商家分类列表
			async getStorecateIndex() {
				var that = this
				const {
					data,
					status
				} = await that.$api.storecateIndex({
					pid: 1, //外卖固定为1，周边固定为2，优选固定为3
					limit: 100,
				})
				if (status == 200) {
					if (data.data.length > 0) {
						this.menuArr = app.arraySlice(data.data)
					} else {
						this.menuArr = []
					}
				}
			},
			//获取商家标签列表
			async getStorelabelIndex() {
				var that = this
				const {
					data,
					status
				} = await that.$api.storelabelIndex({
					cate_id: 1, //外卖固定为1，周边固定为2，优选固定为3
					limit: 100,
				})
				if (status == 200) {
					this.screenList = data.data
					this.tabAct = 0
					// console.log(this.screenList)
					this.screenList.unshift({
						cate_id: 0,
						delete_time: 0,
						id: 0,
						name: "全部",
						sort: "0",
						status: 0,
					})
				}
			},
			//获取商家列表
			async getMerchantLists(isPage) {
				if (this.isLoad) {
					return
				}
				this.isLoad = true
				uni.showLoading({
					title: "正在加载中"
				})
				let that = this
				if (isPage) {
					this.page = this.page + 1
					that.status = "loading"
				} else {
					this.page = 1
					this.shopList = []
					this.status = 'loadmore'
				}

				var shopList = this.shopList;
				const {
					data,
					status
				} = await that.$api.merchantLists({
					sort: this.sortId, //1综合，2距离，3销量
					school_id: this.school.id, //学校id
					name: this.screen.keyword, //外卖固定为1，周边固定为2，优选固定为3
					category: this.category || 1, //商家分类id
					page: this.page,
					delivery_time: this.delivery, //配送时间
					per_capita_order_price_start: this.screen.minPrice, //人均价最低
					per_capita_order_price_end: this.screen.maxPrice, //人均价最高
					lng: uni.getStorageSync('lng') || '',
					lat: uni.getStorageSync('lat') || '',
					store_labels: this.tabAct || this.feature.toString(','), //标签id
					score: this.screen.quality || this.quality.toString(','), //分数
					juli: this.juli,
					full_minus_open: this.full,
					frist_full_minus_open: this.frist,
				})
				uni.hideLoading()
				if (status == 200) {
					shopList = shopList.concat(data.list)
					that.shopList = shopList
					if (data.list.length == 0) {
						that.status = 'nomore'
					}
					that.isLoad = false
				}
			},
			//跳转定位
			goLocation() {
				uni.navigateTo({
					url: '/pagesIndex/page/location/location'
				})
			},
			//修改外卖地址
			changeAddress() {
				uni.navigateTo({
					url: "/pagesIndex/page/location/location"
				})
			},
			//跳转商家详情
			shopDetail(id, labels) {
				uni.navigateTo({
					url: "/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id=" + id + '&type=1' +
						'&labels=' + JSON.stringify(labels)
				})
			},

			async selectionlist() {
				var that = this
				const {
					data,
					status
				} = await that.$api.selection({
					category: 1,
				})
				if (status == 200) {
					let a = data
					a.forEach((item, index) => {
						// a[0].key = "price"
						a[1].key = "speed"
						a[2].key = "speed"
						a[3].key = "characteristic"
						a[4].key = "quality"
						a[5].key = "activity"
						a[index].data.forEach((itmx, indes) => {
							a[index].data[indes].id = indes
						})
					})
					this.screenWinList = a
				}
			},
			//更改弹窗的筛选
			velocity(item, items, index, indexs) {
				this.delivery = items.value
			},

			stimej(item, items, index, indexs) {
				this.juli = items.value
			},

			//更改弹窗的筛选下部分多选
			changeScreenWinx(item, items, index, indexs, title) {
				let c = []
				if (index == 3) {
					if (this.feature.indexOf(items.value) != -1) { //如果当前点击的已经选择  就取消选择
						var index = this.feature.indexOf(items.value)
						this.feature.splice(index, 1)
					} else {
						//如果不存在就添加进去列表
						this.feature.push(items.value)
					}
				} else if (index == 4) {
					if (this.quality.indexOf(items.value) != -1) { //如果当前点击的已经选择  就取消选择
						var index = this.quality.indexOf(items.value)
						this.quality.splice(index, 1)

					} else {
						//如果不存在就添加进去列表
						this.quality.push(items.value)
					}
				}
				if (this.cooperatiox.indexOf(items.title) != -1) { //如果当前点击的已经选择  就取消选择
					var index = this.cooperatiox.indexOf(items.title)
					this.cooperatiox.splice(index, 1)
					var index = this.identifiex.indexOf(items.value)
					this.identifiex.splice(index, 1)

					if (item.title == title && indexs == 0 && index == 5) {
						this.full = ''
					} else if (item.title == title && indexs == 1 && index == 5) {
						this.frist = ''
					}
				} else {
					//如果不存在就添加进去列表
					this.cooperatiox.push(items.title)
					// console.log(this.cooperatiox)
					this.identifiex.push(items.value)
					// console.log(this.identifiex)
					if (item.title == title && indexs == 0 && index == 5) {
						this.full = items.value
					} else if (item.title == title && indexs == 1 && index == 5) {
						this.frist = items.value
					}
				}
			},

			//更改排序筛选
			changeSort(item, index) {
				if (this.sortId == 1 && index == 0) {
					this.sortList[0].sort = !this.sortList[0].sort
				} else {
					this.sortList[0].sort = 1
				}
				this.sortId = item.id
				this.getMerchantLists()
			},
			//重置弹窗里面的数据
			clearWin() {
				this.screen = { //弹窗里面的筛选条件
					keyword: '', //搜索字段
					minPrice: "", //最低价
					maxPrice: "", //最高价
					speed: '', //速度
					characteristic: '', //商家特色
					quality: '', //品质
					activity: '', //优惠活动
				}
				// this.quality = ""
				this.feature = []
				this.cooperatiox = []
				this.identifiex = []
				this.full = ''
				this.frist = ''
				this.sortId = ""
				this.screen.quality = ""
				this.tabAct = ""
				this.screen.keyword = ""
				this.juli = ""
				this.delivery = ""
				this.screen.minPrice = ""
				this.screen.maxPrice = ""
			},

			//返回
			back() {
				uni.switchTab({
					url: '/pages/index/index'
				});
				// uni.navigateTo({
				// 	delta: 2
				// });
			},
			//完成
			confirmWin() {
				this.show = false
				this.getMerchantLists()
			},
			//更改选中的筛选tab
			changeTabAct(id) {
				this.tabAct = id
				this.getMerchantLists()
			},
			//搜索框清空内容
			// clearSearch() {
			// 	this.screen.keyword = ""
			// 	this.getMerchantLists()
			// },
			//点击热搜词
			hotChange(item) {
				// this.screen.keyword = item.title
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/newSearch/newSearch?keyword=' + item.title
				})
				// this.getMerchantLists()
			},
			callUmobile() {
				uni.makePhoneCall({
					phoneNumber: this.Umobile
				})
			},
			//搜索点击回车
			// search() {
			// 	this.getMerchantLists()
			// },
			// 跳转搜索页面
			goSearch() {
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/newSearch/newSearch'
				})
			}
		}
	}
</script>

<style>
	.page {
		background: #f7f7f7;
	}

	.title-img {
		width: 144rpx;
		height: 36rpx;
	}

	.u-nav-slot {
		flex: 1;
		align-items: center;
		display: flex;
	}

	/*  #ifdef H5 || APP-PLUS */
	.u-nav-slot {
		width: 698rpx;
		justify-content: space-between;
	}

	/*  #endif  */
	.address-school {
		max-width: 80%;
	}


	.tab-scroll {
		white-space: nowrap;
		width: 86%;
	}

	.tab-item {
		font-weight: 500;
		box-sizing: border-box;
		display: inline-block;
		/* margin-right: 56rpx; */
		margin-right: 20rpx;
		text-align: center;
		border-radius: 8rpx;
		position: relative;
		/* z-index: 2; */
		font-family: PingFangSC-Medium, PingFang SC;
	}

	.tab-act {
		font-size: 32rpx;
	}

	.tab-act::after {
		position: absolute;
		content: '';
		width: 100%;
		height: 8rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		bottom: 4rpx;
		z-index: -1;
		left: 0;
		font-weight: bold;
	}

	.tab-actx {
		padding: 4rpx 10px;
		/* font-size: 30rpx; */
		color: #FFFFFF;
		background-image: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
	}

	/* 	.tab-actx::after {
		position: absolute;
		content: '';
		width: 100%;
		height: 8rpx;
		background: red;
		bottom: 4rpx;
		z-index: -1;
		left: 0;
		font-weight: bold;
	} */




	.sort-item {
		width: 168rpx;
		height: 54rpx;
		line-height: 54rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin-right: 20rpx;
	}

	/* .shop-r {
		height: 180rpx;
	} */

	.cart {
		width: 80rpx;
		height: 80rpx;
		background: #FFFFFF;
		box-shadow: 0px 8rpx 20rpx 0px rgba(0, 0, 0, 0.12);
		border-radius: 40rpx;
		position: fixed;
		bottom: 158rpx;
		right: 24rpx;
		margin-bottom: var(--safe-area-inset-bottom);
	}

	.price-input {
		width: 316rpx;
		height: 64rpx;
		line-height: 64rpx;
	}

	.scroll-win {
		height: 810rpx;
	}

	.screen-item {
		width: 160rpx;
		height: 64rpx;
		line-height: 64rpx;
	}

	.screen-item:nth-child(4n) {
		margin-right: 0;
	}

	.btn {
		width: 332rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.menu-swiper {
		padding: 20rpx 0;
		box-sizing: border-box;
		height: 380rpx;
		box-sizing: border-box;
	}

	.indicator-dots view {
		height: 10rpx;
		border-radius: 6rpx;
		margin: 0 4rpx;
	}

	.def-swiper {
		background: #DBDBDB;
		width: 10rpx;
	}

	.act-swiper {
		width: 32rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
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

	.u-search-test {
		height: 64rpx;
		border-radius: 34rpx;
		border: 4rpx solid #d93139;
		box-sizing: border-box;

	}

	.win-box-mobile {
		width: 560rpx;
		height: 328rpx;
		padding: 40rpx 60rpx;

	}
  .imgsx {
		width: 160rpx;
		height: 160rpx;
	}
  .reserve-tag {
    position: absolute;
    top: 160rpx;
    left: 0rpx;
    width: 100%;
    background-color: rgb(28,182,120);
    border-radius: 0% 0% 20rpx 20rpx;
    text-align: center;
    color: #FFFFFF;
  }
  .rest-tag {
    position: absolute;
    top: 160rpx;
    left: 0rpx;
    width: 100%;
    background-color: rgb(93,78,45, 0.7);
    border-radius: 0% 0% 20rpx 20rpx;
    text-align: center;
    color: #FFFFFF;
  }
  .goods-name {
    position: absolute;
    top: 125rpx;
    left: 0rpx;
    width: 100%;
    background-color: rgb(93,78,45, 0.8);
    border-radius: 0% 0% 20rpx 20rpx;
    text-align: center;
    color: #FFFFFF;
  }
</style>