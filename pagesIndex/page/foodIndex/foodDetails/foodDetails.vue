<template>
	<view>
		<!-- 轮播图 -->
		<view class="pos-r">
			<view class="">
				<u-swiper :list="img" radius="0" height="400rpx"></u-swiper>
			</view>

			<!-- 右上角分享按钮 -->
			<!-- <view class="flex-al-c foodCombo-tips-pos">
				<view class="foodCombo-tips flex-c-c">
					<image class="wh-44" src="@/pagesIndex/static/shop-icon03.png" mode=""></image>
				</view>
				<button type="" class="foodCombo-tips flex-c-c m-l-32" @tap.stop="shareShow=true">
					<image class="wh-44" src="@/pagesIndex/static/shop-icon05.png" mode=""></image>
				</view>
			</view> -->
		</view>
		<!-- 套餐标题信息 -->
		<view class="foodCombo-title">
			<view class="flex-jus-spa">
				<view class="color-20 f-36 fw-700">
					{{info.name}}
				</view>
			</view>
			<view class="foodCombo-title-price">
				<text class="color-D93038 f-28 fw-700">¥</text>
				<text class="color-D93038 f-48 fw-700">{{info.price}}</text>
				<text class="f-28 color-888 m-l-14 text-line">¥{{info.scribe_price}}</text>
			</view>
			<view class="flex-jus-spa m-t-12">
				<view class="color-888 f-24 flex-al-c">
					<image class="m-r-14 wh-32" src="/pagesIndex/static/shop-detail03.png" mode=""></image>
					随时退 过期自动退
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="padd-24-32 bgc-fe m-t-20">
			<view class="f-32 color-20 fw-700">
				商品详情
			</view>
			<view class="m-t-40">
				{{info.introduce}}
			</view>
		</view>
		<!-- 推荐套餐 -->
		<view class="padd-t24-lr32-b34 m-t-20 bgc-ff">
			<view class="flex-jus-spa flex-al-c m-t-32">
				<view class="f-32 color-20 fw-700">
					推荐套餐
				</view>
				<view class="flex-al-c">
					<view class="f-24 color-8E8F8E" @tap="store(infox.merchant_id)">
						查看全部
					</view>
					<view class="wh-28">
						<image class="wh-28 m-l-8" src="/pagesIndex/static/ico-gengduo.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="flex m-t-20">
				<view class="m-l-20" v-for="(item,index) in goodx" :key="index"
					@click="goCombox(item.goods_id,item.merchant_id)">
					<view class="wh-216 bor-r-16">
						<image class="wh-216 bor-r-16" :src="item.img" mode=""></image>
					</view>
					<view class="m-t-12 f-24 color-20">
						{{item.name}}
					</view>
					<view class="m-t-6">
						<text class="f-24 color-D93038 fw-700 m-r-8">¥{{item.price}}</text>
						<text class="f-20 color-888 text-line">¥{{item.scribe_price}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 加入购物车结束 -->
		<shareWin :shopShow="shareShow" @cancel="cancelShare" :shareContent="shareContent"></shareWin>
	</view>
</template>
<script>
	import urlConfig from '@/config/index.js'
	export default {
		data() {
			return {
				img: [],
				count: "",
				shopList: [],
				goodx: [],
				id: "",
				isCollected: '',
				dishes: [],
				info: {},
				infox: {},
				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				shareShow: false,
				shareContent: {},
				suit: [],
			}
		},
		onShareAppMessage() {
			return {
				title: this.info.name,
				path: '/pagesIndex/page/foodIndex/foodDetails/foodDetails?id=' + this.id,
				imageUrl: this.info.logo,
				success() {
					console.log('分享成功')
				},
			}
		},
		onShareTimeline() {
			return {
				title: this.info.name,
				path: '/pagesIndex/page/foodIndex/foodDetails/foodDetails?id=' + this.id,
				imageUrl: this.info.logo,
				success() {
					console.log('分享成功')
				},
			}
		},
		onShow() {
			this.getCartListsx()

		},

		onLoad(e) {
			this.id = e.ids
			this.getStorecateIndex(e.id)
			this.getStorecateIndexr()
			this.getMerchantLists()
			this.getCartListsx()
		},
		methods: {
			//获取商家详情
			async getStorecateIndex(id) {
				var that = this
				const {
					data,
					status
				} = await that.$api.delicacyetails({
					goods_id: id,
				})
				if (status == 200) {
					this.info = data
					this.goodx = data.goods
					console.log(data, 'taaa')
					if (data.dishes != '') {
						this.dishes = data.new_dishes
					}
					this.suit = this.info.suit_time.split(',')
					this.img = this.info.img.split(',')
					console.log(this.img, "vthis.img");
					this.shareContent.title = data.name;
					this.shareContent.summary = '校园美食，来自校U'
					this.shareContent.imageUrl = data.img;
					this.shareContent.href = urlConfig + 'h5';
				}
			},
			//获取商家详情
			async getStorecateIndexr() {
				var that = this
				const {
					data,
					status
				} = await that.$api.merchantInfo({
					merchant_id: this.id,
				})
				if (status == 200) {
					this.infox = data
					this.isCollected = data.user_is_collect
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
					// this.goodx = shopList
					if (data.list.length == 0) {
						that.status = 'nomore'
					}
					that.isLoad = false
				}
			},
			//取消分享
			cancelShare() {
				this.shareShow = false;
			},
			//收藏
			async getJoininfoAdd() {
				var that = this
				const result = await that.$api.collection({
					collection_id: this.info.merchant_id,
					type: 2,
				})
				if (result.status == 200) {
					this.isCollected = this.isCollected == 0 ? 1 : 0
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
					console.log(data.list)
				}
			},
			//跳转美食购物车
			mycart() {
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/delicacymycart/delicacymycart'
				});
			},
			callTel() {
				uni.makePhoneCall({
					phoneNumber: this.infox.contacts //仅为示例
				});
			},

			//推荐套餐
			goCombox(goods_id, merchant_id) {
				uni.redirectTo({
					url: '/pagesIndex/page/foodIndex/foodCombo/foodCombo?id=' + goods_id + '&ids=' + merchant_id
				})
			},
			//适用商铺跳转
			store(merchant_id) {
				uni.redirectTo({
					url: '/pagesIndex/page/foodIndex/homepage/homepage?id=' + merchant_id
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
			//抢购
			snapup() {
				console.log(this.info.goods_id)
				console.log(this.id)
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/order/order?store=' + this.id + '&goods=' + this.info
						.goods_id + '&type=' + 2
				});

			},

		}
	}
</script>
<style>
	.foodCombo-tips-pos {
		position: absolute;
		right: 32rpx;
		top: 30rpx;
	}

	.foodCombo-tips {
		width: 72rpx;
		height: 72rpx;
		background-color: #000000;
		opacity: 0.7;
		border-radius: 36rpx;
	}

	.foodCombo-title {
		box-sizing: border-box;
		padding: 24rpx 24rpx 24rpx 34rpx;
		background-color: #fefefe;
	}

	.foodCombo-title-price {
		margin-top: 10rpx;
	}

	.shopCart-btn {
		width: 216rpx;
		height: 80rpx;
		background: linear-gradient(140deg, #FFC933 0%, #FF9308 100%);
		border-radius: 200rpx 0rpx 0rpx 200rpx;
	}

	.shopCart-btn1 {
		width: 216rpx;
		height: 80rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 0rpx 200rpx 200rpx 0rpx;
	}

	.shopCart-tips {
		width: 28rpx;
		height: 28rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 25rpx;
		border: 2rpx solid #FFFFFF;
		position: absolute;
		top: -14rpx;
		right: -14rpx;
	}

	.shopCart-box {
		position: fixed;
		bottom: 0;
		z-index: 22;
	}
</style>