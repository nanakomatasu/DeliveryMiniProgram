<template>
	<view>
		<!-- 热搜词-->
		<u-sticky>
			<view v-if="showSearch" class="pl26 pr26  pt12 pb12  box-size bg-white-ff dis-flex flex-y-center">
				<u-search searchIconSize="32rpx" searchIcon="/static/img/search.png" placeholder="请输入关键词"
					searchIconColor="#909399" color="#202020" :showAction="false" v-model="keyword" height="60rpx"
					bgColor="#F6F6F6" @search="search" @clear="clearSearch"></u-search>
				<view class="dis-flex flex-y-center m-l-32">
					<view class="flex-column flex-c-c ww-44 mr40" @tap="onMap">
						<image class="wh-32-34" src="@/static/img/ico-ditu.png" mode=""></image>
						<view class=""><text class="f-22">地图</text></view>
					</view>
					<view class="flex-column flex-c-c" @click="goOrderlist">
						<image class="wh-32-34" src="@/static/img/ico-dingdan.png" mode=""></image>
						<view class=""><text class="f-22">订单</text></view>
					</view>
				</view>
			</view>
		</u-sticky>
		<!-- 内容 -->
		<view class="cont24-20 pb140">
			<view class="" v-for="(page,pageIndex) in pageItems">
				<!-- 辅助空白 -->
				<!-- <view v-if="page.type == 'blank'" style="height: 20rpx;background-color: white">
				</view> -->
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
					<image v-for="(image, imgIndex) in page.data" :src="image.imgUrl"
						style="width: 100%;margin-top: 10rpx;"></image>
				</view>
				<!-- 导航图标 -->
				<indexNavItems v-if="page.type == 'navBar'" :data="page.data" :st="page.style"> </indexNavItems>
				<!-- 图片橱窗 -->
				<indexCalendar v-if="page.type == 'window'" :images="page.data" :st="page.style"></indexCalendar>
			</view>
			<!-- <view class="bg-white-ff pt20 pb10 radio-16 mb20" v-if="menuArr.length>0">
				<swiper class="menu-swiper" :current="current" @change="changeMenuSwiper">
					<swiper-item v-for="(item, index) in menuArr" :key="index">
						<view class="dis-flex flex-y-center flex-wrap">
							<view class="dis-flex flex-dir-column flex-x-center mb40  flex-y-center w-20"
								@tap="toLink('/pagesIndex/page/localLife/classification/classification?id='+items.id+'&name='+items.name,items.id)"
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
			</view> -->
			<block v-if="showShop">
				<!-- 向右滑动的筛选tab -->
				<scroll-view scroll-x="true" class="tab-scroll pt12 pb20" v-if="screenList.length>0">
					<view class="tab-item f-28" @tap="changeTabAct(item.id)" :class="tabAct==item.id?'tab-act':''"
						v-for="(item,index) in screenList" :key="index">{{item.name}}</view>
				</scroll-view>
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
				<view class="dis-flex   bg-white-ff mt20 radio-16 cont24" v-for="(item,index) in shopList" :key="index"
					@tap="shopDetail(item.merchant_id)">
					<image class="wh180 radio-8 mr20" :src="item.logo"></image>
					<view class="dis-flex flex-dir-column flex-x-between shop-r w-70">
						<view>
							<view class="mb12 onelist-hidden w-100 f-32 f-b">
								{{item.name}}
							</view>
							<view class="dis-flex flex-y-center flex-x-between mb5 price">
								<view class="price-l dis-flex flex-y-center w-70">
									<view class="dis-flex flex-y-center f-28 col-orange-ff95  case">
										<image class="wh24 mr10" src="/static/img/case.png"></image>
										<view class="f-b">{{item.score}}</view>
									</view>
									<view class="col-gray-88 f-22 w-40 pl10 m-r mr10 box-size onelist-hidden ">
										月售{{item.month_sales}}
									</view>
									<view class="col-gray-88 f-22 w-45 onelist-hidden">
										¥{{Number.parseInt(item.per_capita_order_price)}}/人</view>
								</view>
								<view class="col-gray-88 f-24 w-40 onelist-hidden t-r">
									距{{item.juli}}</view>
							</view>
						</view>
						<view class="dis-flex flex-y-center">
							<view class="label radio-4 mr16 pl5 pr5 f-22 border-red-eb col-red-d9"
								v-for="(label,i) in item.labels" :key="i">{{label}}</view>
						</view>
					</view>
				</view>

				<null-data title="暂无商家" v-if="shopList.length==0"></null-data>
				<u-loadmore v-else-if="shopList.length>1" :status="status" fontSize="26rpx" color="#999" />
			</block>
		</view>
		<!-- 购物车弹窗 -->
		<view class="cart dis-flex flex-x-center flex-y-center" @tap="cart">
			<image class="wh48" src="/pagesIndex/static/cart-fixed.png"></image>
		</view>

	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				school: {
					school_name: "手动定位"
				}, //学校地址
				show: false, //是否显示筛选弹窗
				menuArr: [], //菜单栏
				current: 0, //当前轮播菜单选中的下标 对应menuArr
				screenList: [],
				tabAct: 1, //选中的筛选id
				sortList: [{
					name: "综合排序",
					id: 1,
					sort: true, //true是正序 向下  false是倒序 向上
				}, {
					name: "销量优先",
					id: 2,
				}, {
					name: "距离优先",
					id: 3,
				}, ],
				sortId: 1,
				shopList: [], //商家列表
				page: 1,
				status: "loadmore",
				keyword: "", //搜索关键词
				pageInfo: {},
				pageItems: [],
				showSearch: false,
				showShop: false,
			}
		},
		onLoad() {

		},
		onReachBottom() {
			if (this.status != 'nomore') {
				this.getMerchantLists(true)
			}

		},
		onShow() {
			var that = this
			this.school = uni.getStorageSync('school')
			uni.$on('onAddressChange', (res) => {
				uni.setStorageSync('lat', res.latlng.lat)
				uni.setStorageSync('lng', res.latlng.lng)
			})
			this.$nextTick(function() {
					that.getStorecateIndex()
					that.getStorelabelIndex()
					that.getMerchantLists()
				}),
				this.getPage();
		},
		methods: {
			//是否有搜索栏 与商家
			isShowSearch() {
				this.pageItems.forEach(item => {
					if (item.type == 'search') {
						this.showSearch = true;
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
					type: 30
				})
				if (res.status == 200) {
					this.pageInfo = res.data.page;
					this.pageItems = res.data.items;
					this.isShowSearch();
				}
			},
			goOrderlist() {
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/orderList/orderList'
				})
			},
			//跳转地图
			onMap() {
				uni.navigateTo({
					url: '/pages/map/map'
				})
			},
			//轮播菜单跳转
			toLink(url, id) {
				if (id == 4) { //美食的id是独立的
					uni.navigateTo({
						url: '/pagesIndex/page/foodIndex/foodIndex'
					})
					return
				}
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
					pid: 2, //外卖固定为1，周边固定为2，优选固定为3
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
					cate_id: 2, //外卖固定为1，周边固定为2，优选固定为3
					limit: 100,
				})
				if (status == 200) {
					this.screenList = data.data
					this.tabAct = data.data.length > 0 ? data.data[0].id : ''
				}
			},
			//获取商家列表
			async getMerchantLists(isPage) {
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
					school_id: this.school.id,
					name: this.keyword, //
					category: 2, //商家分类id 外卖固定为1，周边固定为2，优选固定为3
					page: this.page,
					sort: this.sortId,
					lng: uni.getStorageSync('lng') || '',
					lat: uni.getStorageSync('lat') || '',
				})
				uni.hideLoading()
				if (status == 200) {
					shopList = shopList.concat(data.list)
					that.shopList = shopList
					if (data.list.length == 0) {
						that.status = 'nomore'
					}
				}
			},
			//跳转商家详情
			shopDetail(id) {
				uni.navigateTo({
					url: "/pagesIndex/page/foodIndex/homepage/homepage?id=" + id
				})
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
			//更改选中的筛选tab
			changeTabAct(id) {
				this.tabAct = id
				this.getMerchantLists()
			},
			//搜索框清空内容
			clearSearch() {
				this.keyword = ""
				this.getMerchantLists()
			},
			//搜索点击回车
			search() {
				this.getMerchantLists()
			},

			cart() {
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/delicacymycart/delicacymycart'
				})
			}
		}
	}
</script>

<style>
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
		width: 100%;
	}

	.tab-item {
		font-weight: 500;
		box-sizing: border-box;
		display: inline-block;
		margin-right: 56rpx;
		text-align: center;
		border-radius: 8rpx;
		position: relative;
		z-index: 2;
		font-family: PingFangSC-Medium, PingFang SC;
	}

	.tab-item:last-child {
		margin-right: 0;
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
</style>