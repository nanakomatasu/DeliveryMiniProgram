<template>
	<view class="dis-flex flex-dir-column">
		<!-- 自定义导航栏 -->
		<u-navbar :bgColor="bgColor" height="65" :safeAreaInsetTop="true" :placeholder="true" fixed>
			<view class="flex-juse xxx" slot="left" style="width: 350px;">
				<view class="m-t-20 flex">
					<image class="software" src="../../../../static/img/software.png" mode=""></image>
					<view class="">
						<u--input shape="circle" fontSize="12" placeholder="请输入关键词" prefixIcon="search" @focus='Onfocus'
							prefixIconStyle="font-size: 22px;color: #909399">
						</u--input>
					</view>
				</view>

				<view class="flex p-t-20 p-b-25 flex-space">
					<view class="flex-end" v-for="(item,index) in navigmenu" :key="index">
						<image class="menu m-r-10" :src="item.img" mode=""></image>
						<view class="c-FD f-24">{{item.name}}</view>
					</view>
				</view>

			</view>
		</u-navbar>

		<view class="" style="margin-bottom: 60rpx;">
			<view class="such">
				<view class="p-t-25 p-r-25 p-l-25" style="border-radius: 13px 13px 0 0; background: #f7f7f7;">
					<u-swiper indicatorMode="dot" keyName="pic" :list="list1" height="240rpx" radius="8rpx"
						:indicator="true">
					</u-swiper>
					<view class="">
						<u-tabs :list="list4" :lineColor="bgColor">
						</u-tabs>
					</view>

					<!-- 滑动列表 -->
					<view class="b-fff p-b-15 m-t-20">
						<swiper class="menu-swiper" :current="current" @change="changeMenuSwiper">
							<swiper-item v-for="(item, index) in menuArr" :key="index">
								<view class="dis-flex flex-y-center flex-wrap">
									<view class="dis-flex flex-dir-column flex-x-center mb40 flex-y-center w-20"
										@tap="toLink(items.url)" v-for="(items,indexs) in item" :key="indexs">
										<image class="wh80" :src="items.icon" mode=""></image>
										<view class="f-24 t-c w-100 onelist-hidden mt16">{{ items.name }}</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
						<view class="indicator-dots  dis-flex flex-y-center flex-x-center">
							<view v-for="(item, index) in menuArr" :key="index"
								:class="index==current?'act-swiper':'def-swiper'"></view>
						</view>
					</view>


					<!--商品-->
					<view class="flex-wr p-b-40 flex-about m-t-30">
						<view class="b-fff w-342 m-b-32 p-b-15" v-for="(item,index) in 3">
							<!-- <image class="wh-342 bor-r-t16" src="@/static/img/index-shenghuo3.png" mode=""></image> -->
							<view class="p-l-20 p-r-20" @tap="toshopDetails">
								<view class="text-chaochu f-600">
									真臣雪媚娘蛋黄酥糕点
								</view>

								<view class="flex m-t-15">
									<view class="labels onelist-hidden m-r-8 f-22">
										30减15
									</view>
									<view class="labels onelist-hidden f-22">
										已拼3万件
									</view>
								</view>

								<view class="flex-about flex-centerd c-E5" @tap="toshopDetails">
									<view class="flex-bas">
										<view class="f-24">券后</view>
										<view class="flex-end">
											<view class="f-24">¥</view>
											<view class="f-36 f-600">39.8</view>
										</view>
										<view class="f-24 c-88" style="text-decoration:line-through">¥78.8</view>
									</view>
									<view class="flex-centerd">
										<image class="nor" src="/static/img/gouwuche-nor.png" mode=""></image>
									</view>
								</view>

							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="widgets flex-center">
			<image class="nor" src="/static/img/gouwuche-nor.png" mode=""></image>
		</view>
		<!-- 底部导航 -->
		<view class="tabbar">
			<u-tabbar :value="activeName" @change="tabbarChange" :fixed="false" :placeholder="false"
				activeColor="#D93038" :safeAreaInsetBottom="false">
				<u-tabbar-item text="校U优选" name="shop">
					<image class="u-page__item__slot-icon" slot="active-icon"
						src="../../../../static/img/icon-act02.png">
					</image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../../../static/img/icon02.png">
					</image>
				</u-tabbar-item>
				<u-tabbar-item text="订单" name="order">
					<image class="u-page__item__slot-icon" slot="active-icon"
						src="../../../../static/img/ico_dingdan_sel@2x.png"></image>
					<image class="u-page__item__slot-icon" slot="inactive-icon"
						src="../../../../static/img/ico_dingdan_nor@2x.png"></image>
				</u-tabbar-item>
				<u-tabbar-item text="我的" name="my">
					<image class="u-page__item__slot-icon" slot="active-icon"
						src="../../../../static/img/icon-act04.png">
					</image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../../../static/img/icon04.png">
					</image>
				</u-tabbar-item>
			</u-tabbar>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgColor: 'linear-gradient(313deg, #D62E36 0%, #EC434B 100%)', //导航条背景颜色
				activeName: 'shop',
				navigmenu: [{
					name: "订单",
					img: "/static/img/ordersd.png"
				}, {
					name: "消息",
					img: "/static/img/newsxsx.png"
				}, {
					name: "我的券包",
					img: "/static/img/rollbag.png"
				}, {
					name: "收藏",
					img: "/static/img/Collections.png"
				}, {
					name: "招商入驻",
					img: "/static/img/investmentx.png"
				}, ],

				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],

				list4: [{
					name: '关注'
				}, {
					name: '推荐',
				}, {
					name: '电影',
				}, {
					name: '科技'
				}, {
					name: '音乐'
				}, {
					name: '美食'
				}, {
					name: '文化'
				}, {
					name: '财经'
				}, {
					name: '手工'
				}],
				current: 0, //当前轮播菜单选中的下标 对应menuArr
				menuArr: [
					[{
							name: '校园外卖',
							icon: '/static/img/ico-tips1.png',
							url: '/pagesIndex/page/campusTakeout/index/index',
						},
						{
							name: '校园美食',
							icon: '/static/img/ico-tips2.png',
							url: '/pagesIndex/page/foodIndex/foodIndex',
						},
						{
							name: '酒店民宿',
							icon: '/static/img/ico-tips3.png'
						},
						{
							name: '电影演出',
							icon: '/static/img/ico-tips4.png'
						},
						{
							name: '美容美发',
							icon: '/static/img/ico-tips5.png'
						},
						{
							name: '饮品小吃',
							icon: '/static/img/ico-tips6.png'
						},
						{
							name: '教育培训',
							icon: '/static/img/ico-tips7.png'
						},
						{
							name: '休闲娱乐',
							icon: '/static/img/ico-tips8.png'
						},
						{
							name: '家政服务',
							icon: '/static/img/ico-tips9.png'
						},
						{
							name: '汽车服务',
							icon: '/static/img/ico-tips10.png'
						}
					],
					[{
							name: '酒店民宿',
							icon: '/static/img/ico-tips3.png'
						},
						{
							name: '电影演出',
							icon: '/static/img/ico-tips4.png'
						},
						{
							name: '美容美发',
							icon: '/static/img/ico-tips5.png'
						},
						{
							name: '饮品小吃',
							icon: '/static/img/ico-tips6.png'
						},
					],

				],

			}
		},
		methods: {
			toshopDetails() {
				uni.navigateTo({
					url: `/pagesOptimization/pages/shopDetails/shopDetails?goods_id=2`,
				})
			},
			changeMenuSwiper(e) {
				this.current = e.detail.current
			},

			//跳转链接
			toLink(url) {
				uni.navigateTo({
					url: url
				})
			},
			//获取焦点
			Onfocus() {
				// console.log(11111);
				uni.navigateTo({
					url: `/pagesOptimization/pages/Search/Search`,
				});
			},
			tabbarChange(e) {
				if (e === 'order') {
					uni.navigateTo({
						url: '/pagesUser/page/group/order/order'
					})
				}
				if (e === 'shop') {
					uni.navigateTo({
						url: '/pagesUser/page/group/My/My'
					})
				}
				if (e === 'my') {
					uni.navigateTo({
						url: '/pagesUser/page/group/group'
					})
				}
			}
		}
	}
</script>

<style>
	.menu {
		width: 28rpx;
		height: 28rpx;
	}

	.u-input {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		flex: 1;
		width: 326rpx;
		height: 25rpx;
		background: #FFFFFF;
	}

	.such {
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
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

	.nor {
		width: 50rpx;
		height: 50rpx;
	}

	.widgets {
		width: 80rpx;
		height: 80rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 8rpx 20rpx 0rpx rgba(0, 0, 0, 0.1200);
		border-radius: 40rpx;
		position: fixed;
		bottom: 74px;
		right: 0px;
		z-index: 999;
	}

	.software {
		width: 176rpx;
		height: 44rpx;
	}

	.tabbar {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.u-page__item__slot-icon {
		width: 48rpx;
		height: 48rpx;
	}
</style>