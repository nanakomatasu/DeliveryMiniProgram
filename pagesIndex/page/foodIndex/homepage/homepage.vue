<template>
	<view class="dis-flex flex-dir-column">
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
			<image class="shop-head-bg" :src="info.instore_img"></image>

			<!-- 顶部固定内容  -->
			<view class="fixed-top dis-flex flex-dir-column">
				<!-- 导航栏 -->
				<view id="nav" class="p-r">
					<u-navbar leftIconSize="36rpx" :safeAreaInsetTop="true" @leftClick="leftClick" :fixed="false" :bgColor="bgColor"
						leftIconColor="#fff">
						<view class="dis-flex flex-y-center p-r" slot="right" :style="{marginRight: mr+'px'}">
							<!-- <view class=" mr32 " style="color: white;">{{info.name}}</view> -->
							<image class="wh44 mr32" src="/pagesIndex/static/shop-icon01.png"
								@tap.stop="onLink('/pagesIndex/page/campusTakeout/index/search/search?id='+id)"></image>

							<image v-if="isCollected==0" @tap="getJoininfoAdd" class="wh44 mr32"
								src="/pagesIndex/static/shop-icon02.png"></image>

							<image v-if="isCollected==1" @tap="getJoininfoAdd" class="wh44 mr32"
								src="/pagesIndex/static/icoyishoucangx.png"></image>

							<image class="wh44 mr32" src="/pagesIndex/static/shop-icon03.png" @tap.stop="toChat">
							</image>
							<image class="wh44 mr32" id="more" @tap.stop="isMore=true"
								src="/pagesIndex/static/shop-icon04.png">
							</image>
						</view>
					</u-navbar>
					<!-- 更多的弹窗 -->
					<view class="more-win radio-16 pt12 pb12 pl24 pr24 box-size bg-white-ff" v-if="isMore" id="moreWin">
						<!-- <view class="dis-flex flex-y-center pt20 pb20" @tap.stop="isMore=false;shareShow=true">
							<image class="wh32 mr16" src="/pagesIndex/static/more-win01.png"></image>
							<view class="f-24 col-brank-20">分享商家</view>
						</view> -->
						<view class="dis-flex flex-y-center pt20 pb20"
							@tap.stop="onLink('/pagesIndex/page/campusTakeout/index/report/report?id='+id)">
							<image class="wh32 mr16" src="/pagesIndex/static/more-win02.png"></image>
							<view class="f-24 col-brank-20">投诉举报</view>
						</view>
					</view>
				</view>
			</view>
			<view class="shop-detail  bg-white-ff" :class="isOpen?'':'border-b-f7 '">
				<!-- 店铺头部基础信息 -->
				<view class="dis-flex flex-center flex-x-between shop-head">

					<image class="wh128 radio-8" :src="info.logo"></image>

					<view class="shop-r dis-flex flex-x-center flex-dir-column">
						<view class="w-100 f-40 f-b onelist-hidden " :class="isOpen?'mb16':'mb5'">{{info.name}}</view>
						<view class="price-l dis-flex flex-y-center w-100 col-gray-88 f-24">
							<view class="dis-flex flex-y-center f-24 col-orange-ff95 mr20 case">
								<image class="wh24 mr10" src="/static/img/case.png"></image>
								<view class="f-b">{{info.score}}</view>
							</view>
							<!-- 							<view class="w-35 onelist-hidden pl10">月售1290</view>
							<view class="w-45 onelist-hidden">配送约35分钟</view> -->
							<view class="w-25 onelist-hidden">人均¥{{info.per_capita_order_price}}</view>
						</view>
						<!-- <view class="dis-flex flex-y-center mt5" v-if="isOpen==false">
							<view class="label radio-4 mr16  f-22 border-red-eb col-red-dd">满30减15</view>
							<view class="label radio-4 mr16  f-22 border-red-eb  col-red-dd">60减28</view>
						</view> -->
					</view>
				</view>
				<view class="f-24 color-20 fw-500 m-t-20 flex-al-c">
					<text>营业时间：</text>
					<view v-if="info.am_business_hours_start">
						上午
						<text>{{info.am_business_hours_start}}</text>
						-
						<text>{{info.am_business_hours_end}}</text>
						下午
						<text>{{info.pm_business_hours_start}}</text>
						-
						<text>{{info.pm_business_hours_end}}</text>
					</view>

					<!-- <image class="wh-28 m-l-8" src="@/pagesIndex/static/shop-detail08.png" mode=""></image> -->
				</view>
				<view class="m-t-18 flex-al-c flex-jus-spa">
					<view class="flex-al-c" @tap="location">
						<text class="f-24 color-20 fw-500">{{info.province +info.city + info.area+info.address}}</text>
						<image class="wh-28 m-l-8" src="@/pagesIndex/static/shop-detail08.png" mode=""></image>
					</view>
					<view class="" @click="callTel">
						<image class="wh-32" src="@/pagesIndex/static/shop-detail02.png" mode=""></image>
					</view>
				</view>

			</view>
			<!-- tab切换-->
			<view class="dis-flex flex-y-center tab-box mt8" :class="tabClass" id="tab">
				<view class="f-32 mr80 f-b ml18" :class="tabAct==item.id?'tab-act col-brank-20':'col-gray-8e'"
					v-for="(item,index) in tabList" :key="index" @tap.stop="changeTab(item.id)">{{item.name}}
				</view>
			</view>
			<block v-if="isOpen==false">
				<view id='menu-top' class=" box-size dis-flex"
					:style="{height:scrollHeight+'px' ,paddingBottom:bottomHeight+'px'}">
					<!-- 套餐模块 -->
					<view class="w-100 pad20 bgc-ff">
						<view class="f-28 color-20 fw-700 pt15">
							套餐抢购
						</view>
            <template v-if="shopList&&shopList.length">
              <view class="flex w-100 pt40 " v-for="(item,index) in shopList[1].goods" :key="index">
                <view class="" @click="goCombo(item.goods_id,info.merchant_id)">
                  <image class="wh-148" :src="item.img.split(',')[0]" mode="aspectFill"></image>
                </view>
                <view class="m-l-24 w-80">
                  <view class="f-28 color-20 fw-700" @click="goCombo(item.goods_id,info.merchant_id)">
                    {{item.name}}
                  </view>
                  <view class="f-22 color-888 m-t-8" @click="goCombo(item.goods_id,info.merchant_id)">
                    月售{{item.month_sales||'0'}}
                  </view>
                  <view class="flex w-100 flex-y-end flex-x-between">
                    <view class="" style="" cc>
                      <text class="f-24 color-D93038 fw-700">¥</text>
                      <text class="f-32 color-D93038 fw-700 m-l-4">{{item.price}}</text>
                      <text class="f-24 color-8E8F8E m-l-8 text-line">¥{{item.scribe_price}}</text>
                    </view>
                    <view class="flex">
                      <view class="add-cart f-24 color-D93038 flex-c-c"
                        @tap="addition(item.goods_id,info.merchant_id)">
                        添加购物车
                      </view>
                      <view class="add-cart2 f-28 color-fff fw-700 flex-c-c m-l-20"
                        @click="goCombo(item.goods_id,info.merchant_id)">
                        抢购
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </template>

					</view>
					<!-- 套餐模块结束 -->
				</view>
			</block>
			<!-- 推荐菜系 -->
			<view id="menu-center" class="  bg-gray-f5 ">
				<view class="flex-al-c flex-jus-spa padd-24-32" @click="goAll(info.merchant_id)">
					<view class="f-28 color-20 fw-700">
						推荐菜系
					</view>

					<view class="f-24 color-8E8F8E flex-al-c">
						查看全部
						<image class="wh-28 m-l-8" src="@/pagesIndex/static/shop-detail08.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="paddall3624 bgc-ff">
					<scroll-view scroll-x="true">
						<view class="flex"  v-if="shopList&&shopList.length">
							<view class="w-148 m-r-20" v-for="(item,index) in shopList[0].goods"
								@click="goCombo1(item.goods_id,info.merchant_id)">
								<image class="wh-148 bor-r-16" :src="item.img" mode="aspectFill"></image>
								<view class=" text-shenglue">
									<text class="f-24 color-20  ">{{item.name}}</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>

				<view class="" v-if="shopList&&shopList.length&&shopList[0].goods.length==0">
					<null-data></null-data>
				</view>
			</view>
			<!-- 推荐菜系结束 -->
			<!-- 店铺评价 -->
			<view id='menu-bottom' class="bg-gray-f5" style="padding-bottom: 1000rpx;">
				<view class="flex-al-c flex-jus-spa padd-24-32" @click="toAllComment">
					<view class="f-28 color-20 fw-700">
						店铺评价
					</view>

					<view class="f-24 color-8E8F8E flex-al-c">
						查看全部
						<image class="wh-28 m-l-8" src="@/pagesIndex/static/shop-detail08.png" mode=""></image>
					</view>
				</view>

				<scroll-view :scroll-y="isTabTop?true:false" class="pl32 h-100 pt20 pb20 bg-white-ff pr32 box-size"
					@scroll="commScroll" @scrolltolower="getOrderCommentList(true)">
					<view id="comment-type">
						<view class="dis-flex flex-y-center mb28">
							<view class="f-64 mr16 f-DINPro f-b">{{info.score}}</view>
							<view class="">
								<view class="f-24 col-gray-88">商家评分</view>
								<view class="dis-flex  mt5 flex-y-center">
									<image class="wh28 mr5" v-for="(item,index) in 5" :key="index"
										src="/static/img/case.png"></image>
								</view>
							</view>
						</view>
					</view>
					<commentItem :list="commentList" @changeCommentTab="changeCommentTab"></commentItem>
				</scroll-view>
			</view>
			<!-- 店铺评价结束 -->
		</view>
		<!-- 		<shareWin :shopShow="shareShow" @cancel="cancelShare" :shareContent="shareContent"></shareWin> -->

		<view class="cart wh-80 bor-r-40 flex-c-c" @tap="goCeshi">
			<view class="digit flex-center" v-if="count!=0">
				{{count}}
			</view>
			<image class="wh-48" src="/static/img/gouwuche-nor.png" mode=""></image>
		</view>

	</view>
</template>

<script>
	import * as callUtil from "@/common/makePhoneCall.js"
	import urlConfig from '@/config/index.js'
	export default {
		data() {
			return {
				scrollTop: 0, //页面滚动距离
				navHeight: 0, //导航条高度 包含状态栏
				topHeight: 0, //id为top元素的高度
				bottomHeight: 0, //id为bottom元素的高度
				tabHeight: 0, //id为tab的高度 单位px
				count: "",
				isCollected: '',
				page: 1,
				status: "loadmore",
				shopList: [],
				info: {}, //商家详情
				commTop: 0,
				scrollHeight: "",
				skuShow: false, //是否显示多规格弹窗
				isMore: false, //是否显示更多的弹窗
				scrollTop: 0, //页面滚动距离
				navHeight: 0, //导航条高度 包含状态栏
				mr: 0, //距离右边胶囊的宽度
				topHeight: 0, //id为top元素的高度
				bottomHeight: 0, //id为bottom元素的高度
				tabHeight: 0, //id为tab的高度 单位px
				id: "", //店铺id
				bgColor: "rgba(255,255,255,0)", //导航栏背景颜色
				isTabTop: false, //是否显示顶部的切换栏
				tabList: [{
					name: "套餐",
					id: 1
				}, {
					name: "菜品",
					id: 2
				}, {
					name: "评价",
					id: 3
				}, ],
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
				commentList: [],
				commentTabAct: 0, //选中的评论类型id
				tabAct: 1, //当前选中的tab页id 对应tablist
				isOpen: false, //是否展开商家信息
				shareShow: false,
				shareContent: {},
				tabClass: '', //tabs class
				menuTopHeight: 0, //套餐距离顶部高度
				menuCenterHeight: 0, //菜品距离顶部高度
				menuBottomHeight: 0, //评价距离顶部高度
			}
		},
		onShareAppMessage() {
			return {
				title: this.info.name,
				path: "/pagesIndex/page/foodIndex/homepage/homepage?id=" + this.id,
				imageUrl: this.info.logo,
				success() {
					console.log('分享成功')
				},
			}
		},
		onShareTimeline() {
			return {
				title: this.info.name,
				path: "/pagesIndex/page/foodIndex/homepage/homepage?id=" + this.id,
				imageUrl: this.info.logo,
				success() {
					console.log('分享成功')
				},
			}
		},
		onLoad(e) {
			console.log(e, "res");
			this.id = e.id
			this.getStorecateIndex()
			this.getMerchantLists()
			//#ifdef  MP-WEIXIN
			this.mr = uni.getMenuButtonBoundingClientRect().width + 16
			//#endif
			this.getOrderCommentList()
			// this.initHeight()
		},
		onShow() {
			this.getCartListsx()
		},
		onReachBottom() {
			// this.getMerchantLists(true)
		},
		onPageScroll(e) {
			// console.log(e, "e");
			this.isMore = false
			this.scrollTop = e.scrollTop
			if (e.scrollTop >= 50) {
				this.bgColor = "#D93038"
			} else {
				this.bgColor = "rgba(255,255,255,0)"
			}
			if (e.scrollTop >= 260) {
				this.tabClass = 'tab-sticky'
			} else {
				this.tabClass = ''
			}
			if (e.scrollTop >= this.topHeight - this.navHeight) {
				this.isTabTop = true
			} else {
				this.isTabTop = false
			}
			this.scrollToChange(this.scrollTop);
			// this.$forceUpdate()
		},
		methods: {
      leftClick() {
        uni.navigateBack();
      },
			//跳转全部评价
			toAllComment() {
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/allComment/allComment?store_id=' + this.id
				})
			},
			//点击tab Item
			changeTab(id) {
				let scrollTop = 0;
				if (id == 1) {
					scrollTop = this.menuTopHeight - 80
				}
				if (id == 2) {
					scrollTop = this.menuCenterHeight - 70
				}
				if (id == 3) {
					scrollTop = this.menuBottomHeight - 90
				}
				uni.pageScrollTo({
					duration: 80 * Math.abs(id - this.tabAct),
					scrollTop,
				})
				this.tabAct = id;

			},
			//滑动变化菜单
			scrollToChange(scrollTop) {
				// console.log(scrollTop)
				// console.log('top:' + this.menuTopHeight)
				// console.log('bottom:' + this.menuCenterHeight)
				// console.log('center:' + this.menuBottomHeight)
				if (scrollTop <= this.menuTopHeight) {
					this.tabAct = this.tabList[0].id;
				} else if (scrollTop <= this.menuCenterHeight) {
					this.tabAct = this.tabList[1].id;
				} else if (scrollTop <= this.menuBottomHeight) {
					this.tabAct = this.tabList[2].id;
				}
			},
			//获取订单列表
			async getCartListsx() {
				let that = this
				const {
					data,
					status
				} = await that.$api.delicacycartlist({})
				if (status == 200) {
					that.count = data.count
				}
			},
			//跳转聊天
			toChat() {

				let passUser = {
					uuid: 'merchant' + this.id,
					name: this.info.name,
					avatar: this.info.logo,
				}
				uni.navigateTo({
					url: '/pagesIndex/page/campusTakeout/index/chat/chat?toUser=' +
						encodeURIComponent(JSON.stringify(passUser))
				})
			},

			goAll(merchant_id) {
				console.log(merchant_id)
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/foodDishes/foodDishes?id=' + merchant_id
				})
			},
			goCombo(goods_id, merchant_id) {
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/foodCombo/foodCombo?id=' + goods_id + '&ids=' + merchant_id
				})
			},
			goCombo1(goods_id, merchant_id) {
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/foodDetails/foodDetails?id=' + goods_id + '&ids=' +
						merchant_id
				})
			},
			//拨号
			callTel() {
				callUtil.callMobile(this.info.contacts_tel);

			},
			onLink(url) {
				console.log(url);
				uni.navigateTo({
					url: url
				})
			},

			//套餐抢购添加购物车
			async addition(goods_id, merchant_id) {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status
				} = await that.$api.delicacyaddcart({
					merchant_id: merchant_id,
					goods_id: goods_id,
					num: 1,
				})
				uni.hideLoading()
				if (status == 200) {
					this.$u.toast("添加购物车成功")
					this.getCartListsx()

				}
			},

			//获取商家详情
			async getStorecateIndex() {
				var that = this
				const {
					data,
					status
				} = await that.$api.merchantInfo({
					merchant_id: this.id
				})
				if (status == 200) {
					this.info = data
					this.list1 = data.album.split(',')

					this.isCollected = data.user_is_collect
					uni.setNavigationBarTitle({
						title: data.name
					});
					this.shareContent.title = data.name;
					this.shareContent.summary = '校园美食，来自校U'
					this.shareContent.imageUrl = data.logo;
					this.shareContent.href = urlConfig + 'h5';
				}
			},

			//获取商家商品列表
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
				} = await that.$api.delicacywares({
					merchant_id: this.id,
					page: this.page,
				})
				uni.hideLoading()
				if (status == 200) {
					shopList = shopList.concat(data.list)
					that.shopList = shopList

					if (data.list.length == 0) {
						that.status = 'nomore'
					}
					that.isLoad = false
					setTimeout(function() {
						that.initHeight()
					}, 700)
				}
			},
			//评论滚动
			commScroll(e) {
				this.commTop = e.detail.scrollTop //记录评论滚动 滚动到一定距离固定在顶部
			},
			//修改当前选中的评论类型
			changeCommentTab(id) {
				console.log(id)
				this.commentTabAct = id
				this.getOrderCommentList()
			},
			//获取评价列表
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
				const {
					data,
					status
				} = await that.$api.orderCommentList({
					store_id: this.id,
					order_type: 2, //1外卖，2附近，3优选
					limit: 4,
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
					console.log(data)
					that.commentList = that.commentList.concat(data.list.data)
				}
			},
			//收藏
			async getJoininfoAdd() {
				var that = this
				const result = await that.$api.collection({
					collection_id: this.info.merchant_id,
					type: 1,
				})
				if (result.status == 200) {
					this.isCollected = this.isCollected == 0 ? 1 : 0
				}
			},
			//取消分享
			cancelShare() {
				this.shareShow = false;
			},

			//查看地址
			location() {
				uni.chooseLocation({
					latitude: this.info.lat,
					longitude: this.info.lng,
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
			},
			goCeshi() {
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/delicacymycart/delicacymycart'
				});
			},
			//计算菜单高度
			initHeight() {
				var that = this
				uni.getSystemInfo({
					success: function(res) {
						// 获取可使用窗口高度
						let clientHeight = res.windowHeight;
						const query = uni.createSelectorQuery().in(that);
						//获取顶部固定元素和底部的高度
						query.select('#menu-top').boundingClientRect()
						query.select('#menu-center').boundingClientRect()
						query.select('#menu-bottom').boundingClientRect()
						query.exec(function(r) {
							console.log(r)
							that.menuTopHeight = r[0].top;
							that.menuCenterHeight = r[1].top;
							that.menuBottomHeight = r[2].top;
						})
					}
				});

			},
		}
	}
</script>

<style>
	.shop-head-bg {
		width: 100%;
		height: 260rpx;
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

	.label {
		height: 28rpx;
		line-height: 28rpx;
		padding: 0 6rpx;
		font-family: PingFangSC-Regular, PingFang SC;
	}

	.tab-box {
		padding: 26rpx 0;
		background-color: #f5f5f5;
	}

	.tab-sticky {
		position: sticky;
		top: 50rpx;
		z-index: 10;
	}

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

	.add-cart {
		width: 160rpx;
		height: 56rpx;
		border-radius: 28rpx;
		border: 1rpx solid #EB979B;
	}

	.add-cart2 {
		width: 96rpx;
		height: 56rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 28rpx;
	}


	.cart {
		position: fixed;
		bottom: 100rpx;
		right: 30rpx;
		background-color: #fff;
	}

	.digit {
		width: 40rpx;
		height: 40rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 14px;
		border: 1px solid #FFFFFF;
		position: absolute;
		top: -22rpx;
		right: -8rpx;
		color: #ffffff;
	}
</style>