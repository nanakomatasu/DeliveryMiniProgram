<template>
	<view>
		<!-- 固定顶部 -->
		<view class="bg-white-ff fixed-top">
			<!-- 导航栏 -->

			<!-- 热搜词-->
			<view v-if="showSearch" class="pl26 pr26 box-size" style="margin-top: 100rpx;">
				<u-search searchIconSize="32rpx" searchIcon="/static/img/search.png" placeholder="请输入关键词"
					searchIconColor="#909399" color="#202020" :showAction="false" v-model="screen.keyword"
					height="60rpx" bgColor="#F6F6F6" @search="search" @clear="clearSearch"></u-search>
				<view class="hot-text f-24 pt12 pb12 onelist-hidden w-100 pl12 box-size col-gray-90">
					<text>热搜：</text>
					<text class="pl12 pr12" v-for="(item,index) in hotText" :key="index"
						@tap="hotChange(item)">{{item.title}}</text>
				</view>
			</view>
		</view>


		<!-- 内容 -->
		<view class=" " :style="{marginTop:marginTop}">
			<block v-if="showShop">
				<!-- 商家列表 -->
				<view class="dis-flex   bg-white-ff mt20 radio-16 cont24" v-for="(item,index) in shopList" :key="index"
					@tap="shopDetail(item.merchant_id,item.labels)">
					<image class="wh180 radio-8 mr20" :src="item.logo"></image>
					<view class="dis-flex flex-dir-column shop-r w-70">
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
						<view class="col-gray-88 mb15  dis-flex flex-y-center flex-x-between f-22">
							<view class="w-50 onelist-hidden">
								<text class="mr20">起送¥{{item.starting_price}}</text>
								<text>配送¥{{item.delivery_money}}</text>
							</view>
							<view class="w-50 t-r onelist-hidden">
								<text class="mr10">{{item.delivery_time}}分钟</text>
								<text>距{{item.juli}}</text>
							</view>
						</view>
						<view class="dis-flex flex-y-center">
							<scroll-view scroll-x="true" class="tab-scroll" style="width: 460rpx;">
								<view class="flex">
									<view class="label radio-4 m-l-8  f-22 bg-red-F7 col-red-dd " v-show="index<4"
										v-for="(item,index) in item.labels" :key="index">{{item}}</view>
									<view class="label radio-4 m-l-8  f-22 bg-red-F7 col-red-dd " v-show="index<4"
										v-for="(item,index) in item.reduce" :key="index">{{item}}</view>
									<view class="label radio-4 m-l-8  f-22 bg-red-F7 col-red-dd " v-show="index<4"
										v-for="(item,index) in item.redPacket" :key="index">
										{{item.amount}}元红包满{{item.use_threshold}}可用
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>

				<null-data title="暂无商家" v-if="shopList.length==0"></null-data>
				<u-loadmore v-else-if="shopList.length>1" :status="status" fontSize="26rpx" color="#999" />
			</block>

		</view>

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
					id: 2,
				}, {
					name: "距离优先",
					id: 3,
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
				showShop: false,
				category: "",
				weather: "", //天气
				weatherImg: "", //天气图标
				school: {
					school_name: "手动定位"
				}, //选中的学校
			}
		},
		onLoad(e) {
			this.initMap();
			this.category = e.category
			this.screen.keyword = e.keyword;
			this.marginTop = uni.$u.addUnit(uni.$u.getPx('60rpx') + 44 + uni.$u.sys().statusBarHeight, 'px')
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
			console.log(this.screenWinList)
			this.getPage();
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
					this.menuArrx = [
						[],
						[]
					]

					this.pageInfo = res.data.page;
					this.pageItems = res.data.items;
					console.log(this.menuArrx, "1231")
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
				console.log(this.sortId)
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
					// console.log(data.list)
					shopList = shopList.concat(data.list)
					that.shopList = shopList
					if (data.list.length == 0) {
						that.status = 'nomore'
					}
					that.isLoad = false

				}
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
						console.log(item)
					})
					this.screenWinList = a
					// screenWinList
					console.log(this.screenWinList)
					// console.log(data)
					// console.log(this.screenWinList)
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
						console.log(this.feature.toString(','))
					}
				} else if (index == 4) {
					if (this.quality.indexOf(items.value) != -1) { //如果当前点击的已经选择  就取消选择
						var index = this.quality.indexOf(items.value)
						this.quality.splice(index, 1)

					} else {
						//如果不存在就添加进去列表
						this.quality.push(items.value)
						console.log(this.quality)
					}
				}
				if (this.cooperatiox.indexOf(items.title) != -1) { //如果当前点击的已经选择  就取消选择
					var index = this.cooperatiox.indexOf(items.title)
					this.cooperatiox.splice(index, 1)
					var index = this.identifiex.indexOf(items.value)
					this.identifiex.splice(index, 1)

					if (item.title == title && indexs == 0 && index == 5) {
						console.log(items.value)
						this.full = ''
					} else if (item.title == title && indexs == 1 && index == 5) {
						console.log(items.value)
						this.frist = ''
					}
				} else {
					//如果不存在就添加进去列表
					this.cooperatiox.push(items.title)
					// console.log(this.cooperatiox)
					this.identifiex.push(items.value)
					// console.log(this.identifiex)
					if (item.title == title && indexs == 0 && index == 5) {
						console.log(items.value)
						this.full = items.value
					} else if (item.title == title && indexs == 1 && index == 5) {
						console.log(items.value)
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
				console.log('返回');
			},
			//完成
			confirmWin() {
				this.show = false
				this.getMerchantLists()

				console.log(this.screen)

			},
			//更改选中的筛选tab
			changeTabAct(id) {
				this.tabAct = id
				console.log(this.tabAct)
				this.getMerchantLists()
			},
			//搜索框清空内容
			clearSearch() {
				this.screen.keyword = ""
				this.getMerchantLists()
			},
			//点击热搜词
			hotChange(item) {
				this.screen.keyword = item.title
				this.getMerchantLists()
			},
			//搜索点击回车
			search() {
				this.getMerchantLists()
			},
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
</style>