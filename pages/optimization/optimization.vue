<template>
	<view class="dis-flex flex-dir-column">
		<!-- 自定义导航栏 -->
		<u-navbar :bgColor="bgColor" height="65" :safeAreaInsetTop="true" :placeholder="true" fixed>
			<view class="flex-juse xxx flex-about " slot="left" style="width: 350px;">

				<view class="m-t-20 flex" style="width: 350px;">
					<image class="software" src="../../static/img/software.png" mode=""></image>
					<view class="m-l-16">
						<u--input shape="circle" fontSize="12" placeholder="请输入关键词" prefixIcon="search" @focus='Onfocus'
							prefixIconStyle="font-size: 22px;color: #909399">
						</u--input>
					</view>
				</view>

				<view class="flex p-t-20 p-b-25 flex-space">
					<view class="flex-end flex-y-center" v-for="(item,index) in navigmenu" :key="index" @tap="select(item.url,index)">
						<image class="menu m-r-10" :src="item.img" mode=""></image>
						<view class="c-FD f-24">{{item.name}}</view>
					</view>
				</view>
			</view>
		</u-navbar>

		<view class="padd-0-24" v-for="(item,index) in pageItems" :key="index">

			<!-- 辅助空白 -->
			<view v-if="item.type == 'blank'" style="height: 20rpx;background-color: white">
			</view>

			<!-- 搜索 -->
			<!-- <USearch v-if="item.type == 'search'" :st="item.style" :placeholder="item.params"></USearch> -->

			<!-- banner -->
			<view class="m-t-20">
				<indexBanner v-if="item.type == 'banner'" :swiperList="item.data" :interval="item.params.interval">
				</indexBanner>
			</view>

			<!-- 导航图标 -->
			<indexNavItems v-if="item.type == 'navBar'" :data="item.data" :st="item.style"> </indexNavItems>

			<!-- 外卖商品 -->
			<UGoodsList v-if="item.type == 'goods'" :goods="item.data" :st="item.style"></UGoodsList>

			<!-- 单行图 -->
			<view v-if="item.type== 'imageSingle'" style="width: 100%;height: auto;">
				<image v-for="(image, imgIndex) in item.data" :src="image.imgUrl"
					style="width: 100%;margin-top: 10rpx;"></image>
			</view>

		</view>

		<view class="widgets flex-center" @click="toShopCar">
			<view class="shoptip" v-if="shopNum">
				{{shopNum}}
			</view>
			<image class="nor" src="/static/img/gouwuche-nor.png" mode=""></image>
		</view>
	
	
	
	
	
	
		<u-popup :show="show" mode="center" bgColor="transparent" round="32rpx">
			<view class="dis-flex flex-dir-column flex-x-center flex-y-center">
				<form @submit="submitAdd">
					<view class="win-box bg-white-ff dis-flex flex-dir-column flex-x-center flex-y-center radio-30">
						<view class="f-32 w-100 t-c f-b mb30">{{formName}}</view>
						<view 
							class="pt20 dis-flex w-100 flex-x-between flex-y-center pb20 pl24 pr24 box-size bg-gray-f7 radio-8 mb20">
							<image class="wh32" mode="widthFix" src="/static/img/user-form01.png"></image>
							<input class="f-28 w-90" name="name" placeholder-class="col-gray-88"
								placeholder="请输入名称" />
						</view>
						<view 
							class="pt20 dis-flex  w-100 flex-x-between flex-y-center pb20 pl24 pr24 box-size bg-gray-f7 radio-8 mb20">
							<image class="wh32" mode="widthFix" src="/static/img/user-form02.png"></image>
							<input class="f-28 w-90" name="mobile" placeholder-class="col-gray-88" type="number"
								placeholder="请输入手机号码" />
						</view>
						<view 
							class="pt20 dis-flex  w-100 flex-x-between flex-y-center pb20 pl24 pr24 box-size bg-gray-f7 radio-8 mb20">
							<image class="wh32" mode="widthFix" src="/static/img/user-form03.png"></image>
							<input class="f-28 w-90" name="address" placeholder-class="col-gray-88"
								placeholder="请输入地址" />
						</view>
						<button class="bg-red-d6-ec col-white-ff radio-40 t-c form-btn" 
							form-type="submit">立即提交</button>
					</view>
				</form>
				<image class="wh72 mt60" @tap.stop="show=false" src="/static/img/cancel.png"></image>
			</view>
		</u-popup>

		<indexHenu :tabAct="1"></indexHenu>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false, //是否显示商家入驻弹窗
				formName: "电商招商",
				bgColor: 'linear-gradient(313deg, #D62E36 0%, #EC434B 100%)', //导航条背景颜色
				navigmenu: [{
					name: "订单",
					img: "/static/img/ordersd.png",
					url: "/pagesUser/page/orderList/orderList"
				}, {
					name: "消息",
					img: "/static/img/newsxsx.png",
					url: "/pagesUser/page/newsList/newsList"
				}, {
					name: "我的券包",
					img: "/static/img/rollbag.png",
					url: "/pagesUser/page/couponList/couponList"
				}, {
					name: "收藏",
					img: "/static/img/Collections.png",
					url: "/pagesUser/page/case/case"
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
							icon: `${this.$url}resource/img/ico-tips1.png`,
							url: '/pagesIndex/page/campusTakeout/index/index',
						},
						{
							name: '校园美食',
							icon: `${this.$url}resource/img/ico-tips2.png`,
							url: '/pagesIndex/page/foodIndex/foodIndex',
						},
						{
							name: '酒店民宿',
							icon: `${this.$url}resource/img/ico-tips3.png`
						},
						{
							name: '电影演出',
							icon: `${this.$url}resource/img/ico-tips4.png`
						},
						{
							name: '美容美发',
							icon: `${this.$url}resource/img/ico-tips5.png`
						},
						{
							name: '饮品小吃',
							icon: `${this.$url}resource/img/ico-tips6.png`
						},
						{
							name: '教育培训',
							icon: `${this.$url}resource/img/ico-tips7.png`
						},
						{
							name: '休闲娱乐',
							icon: `${this.$url}resource/img/ico-tips8.png`
						},
						{
							name: '家政服务',
							icon: `${this.$url}resource/img/ico-tips9.png`
						},
						{
							name: '汽车服务',
							icon: `${this.$url}resource/img/ico-tips10.png`
						}
					],
					[{
							name: '酒店民宿',
							icon: `${this.$url}resource/img/ico-tips3.png`
						},
						{
							name: '电影演出',
							icon: `${this.$url}resource/img/ico-tips4.png`
						},
						{
							name: '美容美发',
							icon: `${this.$url}resource/img/ico-tips5.png`
						},
						{
							name: '饮品小吃',
							icon: `${this.$url}resource/img/ico-tips6.png`
						},
					],

				],
				AllShopCarList: [], //购物车列表
				shopNum: '', //购物车数量
				pageItems: [], //首页列表
			}
		},
		onShow() {
			this.getShopCat() //购物车列表
			this.getshopHome() //获取首页配置
		},
		methods: {
			toshopDetails() {
				uni.navigateTo({
					url: `/pagesOptimization/pages/shopDetails/shopDetails?goods_id=2`,
				})
			},
			changeMenuSwiper(e) {
				console.log(e, "qqqqqqqqqqqqqqq");
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
			//获取购物车列表
			getShopCat() {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
				}
				this.$http.post('/api/user/listShoppingCart', data)
					.then(res => {
						if (res.code == 200) {
							this.AllShopCarList = res.data.list
							console.log(res.data.num, );
							this.shopNum = res.data.num
						}
					})
			},

			//获取首页配置
			getshopHome() {
				const data = {
					school_id: uni.getStorageSync('school').id,
					type: 9,
				}
				this.$http.post('/api/shop/shopHome', data)
					.then(res => {
						if (res.code == 200) {
							this.pageItems = res.data.items
						}
					})
			},
			//前往校U购物车
			toShopCar() {
				uni.navigateTo({
					url: "/pagesOptimization/pages/shopCar/shopCar"
				})
			},

			select(url,index) {
				if(index!=4){
					uni.navigateTo({
						url: url
					})
				}else{
					this.show=true
				}
			},
			
			//提交加盟
			submitAdd(e) {
				console.log(e)
				var formData = e.detail.value
				formData.type = 3
				if (formData.name == '') {
					this.$u.toast("请输入姓名")
				} else if (formData.mobile == '') {
					this.$u.toast("请输入手机号")
				} else if (!this.$u.test.mobile(formData.mobile)) {
					this.$u.toast("请输入正确的11位手机号")
				} else if (formData.address == '') {
					this.$u.toast("请输入地址")
				} else {
					this.getJoininfoAdd(formData)
				}
			},
			//加盟接口
			async getJoininfoAdd(formData) {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const result = await that.$api.joininfoAdd(formData)
				uni.hideLoading()
				if (result.status == 200) {
					this.$u.toast("提交成功")
					this.show = false
				}
			},
			
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
		bottom: 148rpx;
		right: 20rpx;
		z-index: 999;
	}

	.software {
		width: 176rpx;
		height: 44rpx;
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
		right: 0rpx;
		color: #fff;
		font-size: 20rpx;
	}
	.win-box {
		padding: 40rpx;
		padding-top: 10rpx;
		width: 560rpx;
		height: 620rpx;
		box-sizing: border-box;
	}
	
	.form-btn {
		width: 320rpx;
		height: 72rpx;
		line-height: 72rpx;
		margin-top: 50rpx;
		font-size: 28rpx;
	}
	
	.win-box-mobile {
		width: 560rpx;
		height: 328rpx;
		padding: 40rpx 60rpx;
	
	}
	
	.btn {
		width: 210rpx;
		height: 64rpx;
		line-height: 64rpx;
	}
	
	
	
	
</style>
