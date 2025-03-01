<template>
	<view class="dis-flex flex-dir-column pb140">
		<indexNav :navStyle="page.style" :school="school" :weather="weather" :weatherImg="weatherImg" :type="0">
		</indexNav>
		<view v-for="(item, index) in pageItems" :key="index">
			<!-- 辅助空白 -->
			<view v-if="item.type == 'blank'" style="height: 20rpx;">
			</view>
			<!-- 搜索 -->
			<indexSearch v-if="item.type == 'search'" :hotText="hotText" :params="item.params" :searchStyle="item.style"
				:Umobile="Umobile">
			</indexSearch>
			<!-- banner -->
			<indexBanner class="m-t-10" v-if="item.type == 'banner'" :swiperList="item.data"
				:interval="item.params.interval">
			</indexBanner>
			<!-- 通知 -->
			<view v-if="item.type == 'notice'" class="padd-0-24">
				<view class="flex-al-c  w-100 bgc-ff padd-18-22 bor-r-8 m-t-20">
					<image class="wh-5628 m-r-16" src="@/static/img/notice.png" mode=""></image>
					<u-notice-bar :text="newsListText" fontSize="24rpx" @click="clickNews" color="#333"
						bgColor="transparent" direction="column"></u-notice-bar>
				</view>
			</view>
			<!-- 单行图 -->
			<view class="padd-0-24" v-if="item.type == 'imageSingle'" style="width: 100%;height: auto;">
				<image v-for="(image, imgIndex) in item.data" :src="image.imgUrl" @tap="toLink(image.linkUrl)"
					style="width: 100%;margin-top: 10rpx;" :key="imgIndex">
				</image>
			</view>
			<view class="m-t-20" v-if="item.type == 'navBar'">
				<!-- 导航图标 -->
				<indexNavItems :data="item.data" :menuArr="menuArrx" :st="item.style"> </indexNavItems>
				<!-- 红包 -->
				<!-- 	<view class="m-t-20">
					<takeRedPacket :tc_lists="tc_lists"></takeRedPacket>
				</view> -->
			</view>
			<takeRedPacket v-if=" item.type == 'coupon' " :tc_lists="item.data.list"></takeRedPacket>
			<!-- 本地生活 -->
			<div class="padd-0-24 ">
				<indexLocalLife v-if="item.type == 'sharpGoods'" :goods="item.data" :st="item.style">
				</indexLocalLife>
			</div>

			<!-- 图片橱窗 -->
			<div class="padd-0-24 m-t-20">
				<indexCalendar v-if="item.type == 'window'" :images="item.data" :st="item.style">
				</indexCalendar>
			</div>

			<!-- 外卖商品 -->
			<indexGoodsList v-if="item.type == 'goods'" :goods="item.data" :st="item.style">
			</indexGoodsList>
			<indexSpecialList v-if="item.type == 'special_goods'" :goods="item.data" :st="item.style"></indexSpecialList>
			<!-- 推荐门店 -->
			<view class="padd-0-24" v-if="item.type == 'guide'"
				style="width: 100%;height: 1px;margin-bottom: 10px;margin-top: 10px; background-color: black;"></view>
			<!-- <view class="padd-0-24" v-if="item.type == 'shop'">
				<indextjdp :shops="item.data"></indextjdp>
			</view> -->
			<view class="padd-0-24" v-if="item.type == 'shop'">
				<indexShop :shopList="item.data" v-if="item.data&&item.data.length"></indexShop>
			</view>
		</view>
		<!--公告弹窗 -->
		<view :catchtouchmove="true">
			<u-popup :show="show" mode="center" :safeAreaInsetBottom="false" round="32rpx">
				<view
					class="win-box-mobile dis-flex flex-x-center flex-y-center flex-dir-column  box-size bg-white-ff radio-30">
					<view class="f-32 w-100 t-c f-b">通知</view>
					<scroll-view scroll-y="true" class="scroll-news f-28 t-c mt20">{{ text }}</scroll-view>
					<view class="btn-win t-c bg-red-d6-ec col-white-ff radio-40" @tap="show = false">我知道了</view>
				</view>
			</u-popup>
		</view>
		<!-- 红包弹窗 -->
		<u-popup :show="showred" @open="openred" mode="center" bgColor="transparent" v-if="pttj_lists.length>0">
			<view class="redimg" style="width: 750rpx; height: 846rpx;" @touchmove.stop.prevent="preventHandle">
				<scroll-view scroll-y="true" class="scroll-Y" v-if="pttj_lists.length > 0" style="margin-top:200rpx;">
					<view class="flex-c-c flex-column ">
						<view class="flex bgc-ff bor-r-16 redbao_box m-t-20" v-for="(item, index) in pttj_lists" :key="index">
							<view class="color-D93038" style="width: 150rpx;">
								<view class="f-20 redbao_xywm redbao_left">{{ item.type_str }}</view>
								<view class="m-l-24 m-t-20">
									<text class="f-28 fw-700">￥</text>
									<text class="f-32 fw-700">{{ item.amount }}</text>
								</view>
								<view class="f-20 color-D93038 m-l-24 m-t-10">满{{ item.use_threshold }}可用
								</view>
							</view>
							<view class="flex-al-c m-l-43 ">
								<view class="">
									<view class="f-32 color-20 fw-700">
										平台优惠券
									</view>
									<view class="f-24 color-8E8F8E m-t-12">
										有效期至{{ item.registration_deadline }}
									</view>
								</view>
								<view class="redbao_btn m-l-16" v-if="item.has_gain == 0" @click="redbtn(item.id)">
									领取
								</view>
								<view class="redbao_btn m-l-16" v-if="item.has_gain == 1" @click="Gored(item.id)">
									去使用
								</view>
							</view>
						</view>
					</view>
				</scroll-view>

				<view class="flex-c-c flex-column" style="margin-top: 200rpx;" v-else-if="pttj_lists.length <= 3">
					<template v-if="item.registration_deadline > dateTimeStrs">
						<view class="flex bgc-ff bor-r-16 redbao_box m-t-20" style=""
							 v-for="(item, index) in pttj_lists" :key="index">
							<view class="color-D93038">
								<view class="f-20 redbao_xywm redbao_left">{{ item.type_str }}</view>
								<view class="m-l-24 m-t-10">
									<text class="f-28 fw-700">￥</text>
									<text class="f-32 fw-700">{{ item.amount }}</text>
								</view>
								<view class="f-20 color-D93038 m-l-24">满{{ item.use_threshold }}可用</view>
							</view>
							<view class="flex-al-c m-l-43 ">
								<view class="">
									<view class="f-32 color-20 fw-700">
										外卖通用券
									</view>
									<view class="f-24 color-8E8F8E m-t-12">
										有效期至{{ item.registration_deadline }}
									</view>
								</view>
								<view class="redbao_btn m-l-16" v-if="item.has_gain == 0" @click="redbtn(item.id)">
									领取
								</view>
								<view class="redbao_btn m-l-16" v-if="item.has_gain == 1" @click="Gored(item.id)">
									去使用
								</view>
							</view>
						</view>
					</template>
					<null-data v-if="pttj_lists.length == 0"></null-data>
				</view>
				<view class="redbao_tips ">
					<view class="flex-c-c">
						券可在【我的】-【红包卡券】中查看
					</view>
				</view>
				<view class=" redbao_guanbi">
					<view class="flex-c-c">
						<image class="wh-72" @click="closered" src="/static/img/ico_redguanbi.png" mode=""></image>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- // 抽奖弹窗 -->
		<u-popup :show="showPtdraw" mode="center" bgColor="transparent">
			<image @click="goDrawPage"  style="width: 750rpx; height: 846rpx;" :src="`${baseImageUrl}resource/draw-dialog.png`"></image>
			<view class="redbao_guanbi">
					<view class="flex-c-c">
						<image class="wh-72" @click="closeShowPtdraw" src="/static/img/ico_redguanbi.png" mode=""></image>
					</view>
				</view>
		</u-popup>
		<u-popup :show="addTips" @open="open_add" @close="close_add" mode="center" bgColor="transparent">
			<view class="bgc-ff" style="width: 500rpx; padding: 20rpx;">
				<view class="f-42 fw-700 flex-c-c m-t-20">
					提示
				</view>
				<view class="flex-c-c flex-column m-t-20 f-32 fw-700">
					<view class="">
						当前定位校区为：
					</view>
					<view class="">
						{{ add_schoolName }}
					</view>
					<view class="">
						是否需要切换
					</view>
				</view>
				<view class="flex-c-c m-t-40">
					<view class="add_tips_btn" @click="close_add">
						不切换
					</view>
					<view class="m-l-20 add_tips_btn" @click="goLocation()">
						切换
					</view>
				</view>
			</view>
		</u-popup>
		<indexHenu :tabAct="0"></indexHenu>
	</view>
</template>

<script>
	const app = getApp()
	import MapLoader from "@/utils/map.js"
	import WeatherImg from "@/common/weather.js"
	import MapUtil from '@/common/mapUtil.js'
	import {
		dateTimeStr
	} from '@/utils/time.js'
	import urlConfig from '@/config/index.js'

	export default {
		name: 'navbar',
		data() {
			return {
				dateTimeStrs: "",
				school: {
					school_name: "手动定位"
				}, //选中的学校
				bgColor: 'linear-gradient(313deg, #D62E36 0%, #EC434B 100%)', //导航条背景颜色
				newsList: [], //通知列表数据
				newsListText: [], //通知列表纯文字
				text: '', //公告弹窗内容
				show: false, //是否显示公告弹窗
				swiperList: [], //轮播图列表
				hotText: [
					["奶茶", "水果", "口水鸡", "黄焖鸡米饭", "奶", "一点点", "哈哈哈", "口水鸡", "美食", "奶茶"]
				],
				current: 0, //当前轮播菜单选中的下标 对应menuArr
				menuArr: [],
				life: [],
				lng: "", //经度
				lat: "", //纬度
				showAddresss: false,
				weather: "", //天气
				weatherImg: "", //天气图标
				page: {},
				pageItems: [],
				showred: false, //是否显示红包弹窗
				pttj_lists: [], //天降红包弹窗列表
				tc_lists: [], //套餐红包列表
				ptdraw_lists: [], // 抽奖活动列表
				showPtdraw: false, //是否显示抽奖活动弹窗
				Umobile: "",
				menuArrx: [
					[],
					[]
				],
				tokens: '',
				addTips: false,
				add_schoolName: '',
				add_type: '',
				baseImageUrl: this.$url
			};
		},

		onLoad() {
			//this.getHotKeywords();
			this.initMap();
			//this.getPage()
			//this.Gettc_lists()
			this.tokens = uni.getStorageSync('tokens')
			uni.setStorageSync('addTips', this.addTips)
		},
		onShow() {
			uni.hideTabBar()
			this.add_schoolName = uni.getStorageSync('school').school_name
			this.add_type = uni.getStorageSync('add_type', this.add_type)
			if (this.tokens == '') {
				uni.removeStorageSync('add_type');
			}

			if (this.tokens != '') {
				if (this.add_type == '') {
					this.addTips = true
				}
				if (this.add_type == 1) {
					this.addTips = false
					// this.Getpttj_lists()
					this.Getptdraw_lists()
				}

			}


			this.getPage()
			this.getHotKeywords();
			this.dateTimeStrs = dateTimeStr('y-m-d')
			// #ifdef H5
			if (uni.getStorageSync('userInfo').is_bind_wx == 0 && this.isWxBrowser()) {
				if (uni.getStorageSync('userInfo')) {
					this.getmemberinfo()
				}
				//this.getWxOauthRedirect();
			}
			// #endif
			this.lng = uni.getStorageSync('lng') || ''
			this.lat = uni.getStorageSync('lat') || ''
			this.showAddresss = uni.getStorageSync('school') ? false : true
			this.getNoticeGetList()
			if (!uni.getStorageSync('school')) {
				console.log('没有学校')
				if (this.tokens != '') {
					this.getLocationAddress()
				} else {
					this.getLocationAddress()
				}
			} else {
				console.log('有学校')
				// if( this.tokens != '' ) {
				this.getSchoolGetList()
				// }
			}

			//获取热词
			this.initChat();
			this.indexsortlistx()
			this.locallifex()
			//获取首页

			//获取外卖订单订阅群聊
			// this.getOrderTakeOutList()
			this.getPlatformCustomerPhone()
		},
		methods: {
			//禁止滑动
			preventHandle() {
				return
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


			// 第一次进入客户端提示校区选择是否一样弹窗
			open_add() {

			},
			close_add() {
				this.addTips = false
				this.add_type = 1
				uni.setStorageSync('add_type', this.add_type)
				// this.Getpttj_lists()
				this.Getptdraw_lists()
			},
			goLocation() {
				uni.navigateTo({
					url: '/pagesIndex/page/location/location'
				})
			},
			// 红包弹窗
			openred() {
				// console.log('open');
			},
			closered() {
				this.showred = false

			},
			// 领取红包
			redbtn(id) {
				this.Gettj_gain(id)
			},
			Gored(id) {
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/redindex/redindex?id=' + id
				})
			},
			//领取红包接口
			async Gettj_gain(id) {
				const res = await this.$api.tj_gain({
					id: id
				})
				if (res.status == 200) {
					this.$u.toast("领取成功")
					this.Getpttj_lists()
				}

			},

			//天气查询
			initMap() {
				MapUtil.getWeather(res => {
					this.weather = res.weather.data + ' ' + res.temperature.data + '℃';
					this.weatherImg = WeatherImg(res.weather.data);
				})
			},
			//连接聊天服务器
			async initChat() {
				//用户UUID为  user +{ID} 
				//商户UUID为  merchant+{ID}
				//骑手UUID为  rider+{ID}
				let user = uni.getStorageSync('userInfo');
				let connectionStatus = this.$chat.getConnectionStatus();
				// console.log(connectionStatus);
				if (!user) { //禁止未登录连接聊天服务器
					console.log('未登录成功无法连接');
					return
				}
				if (connectionStatus === 'disconnected') {
					await this.$chat.connect({
						uuid: 'user' + user.id, //用户UUID
						name: user.user_name, //用户名字
						avatar: user.portrait //用户头像
					});
					// let channel = 'user' + user.id;
					// //订阅消息
					// this.$chat.subscribe(channel, message => {
					// 	console.log('收到一条消息:' + message)
					// 	// uni.createPushMessage({
					// 	// 	content:message,
					// 	// 	title:'您有一条新的消息'
					// 	// })
					// })
				} else {
					console.log('已经连接成功，无需重新连接')
				}
			},
			//获取首页数据
			async getPage() {
				const res = await this.$api.getPage({
					school_id: uni.getStorageSync('school').id || 1,
					type: 10
				})
				this.menuArrx = [
					[],
					[]
				]
				if (res.status == 200) {

					this.page = res.data.page;
					this.pageItems = res.data.items;

					this.pageItems.forEach(item => {
						if (item.name == '导航组') {
							item.data.forEach((items, indes) => {
								if (indes < 10) {
									this.menuArrx[0].push(item.data[indes])
								}
								if (indes > 9) {
									this.menuArrx[1].push(item.data[indes])
								}
							})
						}
            if (item.type == 'shop') {
              // item.data.forEach(items => {
              //   item.is_recommend_goods = JSON.parse(items.is_recommend_goods)
              // })
            }
					})
				}
			},
			//获取外卖订单列表
			async getOrderTakeOutList() {
				const {
					data,
					status
				} = await this.$api.orderTakeOutList({
					page: 1,
					order_status: 0
				})
				if (status == 200) {
					let list = data.data;
					let groupIds = [];
					list.forEach(item => {
						groupIds.push(item.id)
					})
					//根据返回订单ID订阅群聊
					this.$chat.subscribeGroup(groupIds);
				}
			},
			//获取定位
			getLocationAddress() {
				var that = this
				uni.getLocation({
					type: "wgs84",
					altitude: true,
					highAccuracyExpireTime: 100,
					success: (res) => {
						// console.log(res, "111")
						//获取经纬度
						console.log('获取定位' + res)
						that.lng = res.longitude
						that.lat = res.latitude
						uni.setStorageSync('lng', res.longitude)
						uni.setStorageSync('lat', res.latitude)
						that.getSchoolGetList()
					},
				});
			},
			//学校列表
			async getSchoolGetList() {
				var that = this
				const {
					data,
					status
				} = await that.$api.schoolGetList({
					lat: this.lat,
					lng: this.lng,
				})
				if (status == 200) {
					this.school = data.data[0]
					uni.setStorageSync('school', this.school)
					this.getPage();
				}
			},
			//点击轮播图跳转链接
			clickSwiper(index) {
				app.navTo(this.swiperList[index].linkUrl)
			},
			//

			//轮播菜单切换
			changeMenuSwiper(e) {
				this.current = e.detail.current
			},
			//通知列表
			async getNoticeGetList() {
				var that = this
				const {
					data,
					status
				} = await that.$api.noticeGetList()
				if (status == 200) {
					this.newsListText = []
					data.data.forEach(item => {
						this.newsListText.push(item.title)
					})
					this.newsList = data.data
				}
			},
			//点击通知
			clickNews(index) {
				this.text = this.newsList[index].body
				this.show = true
			},

			//跳转链接
			toLink(url) {
				uni.navigateTo({
					url: url
				})
			},

			//
			toLinkx(itmes) {
				if (itmes.channel_type == 1) {
					uni.navigateTo({
						url: '/pagesIndex/page/campusTakeout/index/index'
					})
				} else if (itmes.channel_type == 2) {
					uni.navigateTo({
						url: '/pagesIndex/page/foodIndex/foodIndex'
					})
				}
			},

			//
			lifex(item) {
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/foodCombo/foodCombo?id=' + item.goods_id + '&ids=' + item
						.merchant_id,
				})
			},

			//跳转堂食
			forhere() {
				uni.navigateTo({
					url: "/pagesIndex/page/diningroom/diningroom"
				})
			},
			//获取搜索热词
			async getHotKeywords() {
				var that = this
				const {
					data,
					status
				} = await that.$api.getHotKeyword({
					cate: 0,
					school_id: this.school.id || '',
				})
				if (status == 200) {
					if (data.length > 5) {
						that.hotText[0] = data.slice(0, 5);
						that.hotText[1] = data.slice(5, 10);
						that.hotText[2] = data.slice(0, 5);
						that.hotText[3] = data.slice(5, 10);
					} else {
						that.hotText[0] = data;
						that.hotText[1] = data;
						that.hotText[2] = data;
						that.hotText[3] = data;
					}
				}
			},
			//是否微信内部浏览器
			async isWxBrowser() {
								let ua = await wx.getRendererUserAgent()
				// let ua = navigator.userAgent.toLowerCase();
				let isWeixin = ua.indexOf("micromessenger") != -1;
				return isWeixin;
			},
			async getmemberinfo() {
				const res = await this.$api.getmemberinfo();
				if (res.status == 200 && res.data.is_bind_wx == 0) {
					this.getWxOauthRedirect();
				} else {
					uni.setStorageSync('userInfo', res.data)
				}
			},
			async getWxOauthRedirect() {
				const res = await this.$api.getWxOauthRedirect({
					url: urlConfig + 'h5'
				});
				if (res.status == 200) {
					window.location.href = res.data;
				} else {
					// console.log(res);
				}
			},

			async indexsortlistx() {
				const res = await this.$api.indexsortlist({});
				if (res.status == 200) {
					this.menuArr = []
					this.menuArr.push(res.data)
				}
			},
			async locallifex() {
				const res = await this.$api.locallife({
					school_id: uni.getStorageSync('school').id
				});
				if (res.status == 200) {
					this.life = res.data
				}
			},

			// 平台天降红包列表接口
			async Getpttj_lists() {
				const res = await this.$api.pttj_lists({
					school_id: uni.getStorageSync('school').id || 1
				})
				if (res.status == 200) {
					console.log('8888888888');
					this.pttj_lists = res.data.list;
					this.showred = true;
				}
			},
			// 抽奖列表接口
			async Getptdraw_lists () {
				const res = await this.$api.ptdraw_lists({
					school_id: uni.getStorageSync('school').id || 1
				})
				if (res.status == 200) {
					if (res.data.list&&res.data.list.length > 0) {
						this.ptdraw_lists = res.data.list[0];
						this.showPtdraw = true;
					} else {
						this.Getpttj_lists()
					}
				}
			},
			goDrawPage() {
				uni.navigateTo({
					url: `/pagesUser/page/draw/draw?id=${this.ptdraw_lists.id}`
				})
			},
			closeShowPtdraw() {
				this.showPtdraw = false
				this.Getpttj_lists()
			},
			// 红包套餐列表接口
			async Gettc_lists() {
				const res = await this.$api.tc_lists({
					school_id: uni.getStorageSync('school').id || 1
				})
				if (res.status == 200) {
					this.tc_lists = res.data.list
				}
			}

		}
	};
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7 !important;
	}

	.head-bg {
		width: 750rpx;
		height: 248rpx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.head-top {
		background: #f7f7f7;
		border-radius: 24rpx 24rpx 0 0;
		z-index: 2;
		padding-top: 22rpx;
	}

	.cont {
		z-index: 2;
	}

	.u-search__content {
		border-width: 0;
		border-style: '';
	}



	.scroll-search {
		white-space: nowrap;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
		width: 600rpx;
		height: auto;
	}


	.menu-swiper {
		padding: 20rpx 0;
		box-sizing: border-box;
		height: 354rpx;
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


	.index-search {
		width: 80%;
		height: 64rpx;
		border-radius: 44rpx !important;
		// background-color: transparent;
		background-color: #EB979B;
	}

	.index-search /deep/ .u-search__action--active {
		width: 104rpx !important;
		height: 72rpx !important;
		border-radius: 44rpx !important;
	}

	.wh-20-50 {
		width: 20rpx;
		height: 50rpx;
	}

	.wh-92-50 {
		width: 92rpx;
		height: 50rpx;
	}

	.waimai {
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.delivery {
		height: 50rpx;
		box-sizing: border-box;
		// padding: 0rpx 14rpx 8rpx 0rpx;
		padding-left: 10rpx;
		padding-right: 16rpx;
		background: rgba(51, 51, 51, 0.8);
		border-radius: 0rpx 16rpx 0rpx 0rpx;
		line-height: 50rpx;
	}

	.waimai-bg {
		background-color: rgba(51, 51, 51, 0.8);
	}

	.dingwei {
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		padding-left: 16rpx;
		box-sizing: border-box;
		height: 50rpx;
		line-height: 50rpx;
	}

	.fenge {
		width: 1rpx;
		height: 24rpx;
		background-color: #80808c
	}

	.labels {
		height: 28rpx;
		line-height: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		padding: 0 6rpx;
		border-radius: 4rpx;
		border: 1rpx solid #EB979B;
		color: #DD343C;
		max-width: 50%;
	}

	.u-notice-bar {
		padding: 0 0 0 16rpx !important;
		border-left: 1px solid #F0F0F0;
		box-sizing: border-box;
	}

	.u-notice__left-icon {
		display: none !important;
	}

	.win-box-mobile {
		width: 560rpx;
		// min-height: 600rpx;
		padding: 40rpx 60rpx;

	}

	.scroll-news {
		max-height: 600rpx;
		margin-bottom: 20rpx;
	}

	.btn-win {
		width: 210rpx;
		height: 64rpx;
		line-height: 64rpx;
	}

	.toast-win {
		position: absolute;
		width: 700rpx;
		bottom: -86rpx;
		left: 24rpx;
		background: rgba(51, 51, 51, 0.9);
		border-radius: 16rpx;
		padding: 0 24rpx;
		height: 86rpx;
		box-sizing: border-box;
	}

	.toast-win::before {
		content: '';
		width: 0px;
		height: 0px;
		border-bottom: 16rpx solid rgba(51, 51, 51, 0.9);
		border-right: 18rpx solid transparent;
		border-left: 18rpx solid transparent;
		position: absolute;
		top: -15rpx;
		left: 80rpx;
	}

	.scanning {
		padding: 24rpx 16rpx;
		border-radius: 8rpx;
	}

	.imgsx {
		width: 200rpx;
		height: 200rpx;
	}

	.redimg {
		background-image: url('https://api.yzgl.top/h5/static/img/redbao.png');
		background-repeat: no-repeat;
		background-size: 750rpx 846rpx;
	}

	.redbao_box {
		width: 566rpx;
		height: 100%;
		// box-sizing: border-box;
		padding-bottom: 8rpx;

	}

	.redbao_left {
		// width: 104rpx;
		// height: 32rpx;
		box-sizing: border-box;
		padding: 2rpx 12rpx;
		text-align: center;
		line-height: 32rpx;
	}

	.redbao_xywm {
		border-top-left-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
		background-color: #F7D6D7;
	}

	.redbao_btn {
		width: 112rpx;
		height: 48rpx;
		// box-sizing: border-box;
		// padding: 6rpx 18rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 28px;
		color: #fff;
		text-align: center;
		line-height: 48rpx;
		font-size: 24rpx;
	}

	.redbao_tips {
		color: #fff;
		font-size: 24rpx;
		position: absolute;
		bottom: 38rpx;
		// margin-left: 176rpx;
		width: 100%;

	}

	.redbao_guanbi {
		position: absolute;
		bottom: -134rpx;
		width: 100%;
	}

	.scroll-Y {
		margin-top: 180rpx;
		height: 560rpx;
	}

	.scroll-view-item {
		height: 520rpx;
		text-align: center;
	}

	.add_tips_btn {
		width: 180rpx;
		height: 60rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		color: #fff;
		border-radius: 100rpx;
		text-align: center;
		line-height: 60rpx;
	}
</style>