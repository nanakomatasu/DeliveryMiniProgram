<template>
	<view>
		<view class="padd-b-160">
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
					<view class="foodCombo-tips flex-c-c m-l-32" @tap.stop="shareShow=true">
						<image class="wh-44" src="@/pagesIndex/static/shop-icon05.png" mode=""></image>
					</view>
				</view> -->
				<!-- 右上角分享按钮结束 -->
			</view>
			<!-- 轮播图结束 -->
			<!-- 套餐标题信息 -->
			<view class="foodCombo-title">
				<view class="flex-jus-spa">
					<view class="color-20 f-36 fw-700">
						{{info.name}}
					</view>
					<view class="flex-al-c flex-column">
						<image v-if="isCollected==0" @tap="getJoininfoAdd" class="wh44"
							src="/pagesIndex/static/ico-shoucang.png"></image>
						<image v-if="isCollected==1" @tap="getJoininfoAdd" class="wh44"
							src="/pagesIndex/static/icoyishoucangx.png"></image>
						<view class="f-24 color-888">
							收藏
						</view>

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
					<view class="f-24 color-888">
						月售{{info.month_sales||'0'}}
					</view>
				</view>
			</view>
			<!-- 套餐标题信息结束 -->
			<!-- 限制 须知 -->
			<view class="foodCombo-limit m-t-20">
				<view class="f-28">
					<text class="fw-700 color-20 m-r-20">限制</text>
					<text class="color-888">{{info.limit_quantity}}张</text>
				</view>
				<view class="f-28 m-t-24">
					<text class="fw-700 color-20 m-r-20">有效期</text>
					<text class="color-888">{{info.number_of_people}}天</text>
				</view>
			</view>
			<!-- 限制 须知结束 -->
			<!-- 团购详情 -->
			<view class="padd-24-32 bgc-fe m-t-20">
				<view class="f-32 color-20 fw-700">
					团购详情
				</view>
				<view class="m-t-40" v-for="(item,index) in dishes">
					<view class="">
						<view class="flex-al-c flex-jus-spa padd-l-24 m-t-30">
							<view class="f-28 color-20">
								{{item.name}}
							</view>
							<view class="">
								<text class="f-28 color-888 m-r-12">({{item.num}}份)</text>
								<text class="f-24 color-20 fw-700 m-r-4">¥</text>
								<text class="f-32 color-20 fw-700">{{item.price}}</text>
							</view>
						</view>
					</view>
					<!-- <view class="flex-al-c">
						<view class="text-dot"></view>
						<text class="m-l-10 f-28 color-20 fw-700">菜品</text>
					</view>
					<view class="">
						<view class="flex-al-c flex-jus-spa padd-l-24 m-t-30" v-for="(item,index) in dishes">
							<view class="f-28 color-20">
								酸包菜肉末
							</view>
							<view class="">
								<text class="f-28 color-888 m-r-12">(1份)</text>
								<text class="f-24 color-20 fw-700 m-r-4">¥</text>
								<text class="f-32 color-20 fw-700">15.9</text>
							</view>
						</view>
					</view> -->
				</view>
			</view>
			<!-- 团购详情结束 -->
			<!-- 购买须知 -->
			<view class="padd-24-32 bgc-fe m-t-20">
				<view class="f-32 color-20 fw-700">
					购买须知
				</view>
				<view class="m-t-32 ">
					<view class="flex-al-c f-28 color-20">
						<image class="wh-28 m-r-8" src="/pagesIndex/static/ico-youxiaoqi.png" mode=""></image>
						适用时间
					</view>
					<!-- <view class="f-28 color-20 m-l-36 m-t-20">
						2022年6月20日-2022年10月20日 23:59
					</view> -->

					<view class="flex">
						<view class="m-t-15" v-for="(item,index) in suit" :key="index">
							<view class="m-r-15" v-if="item==0">星期日</view>
							<view class="m-r-15" v-if="item==1">星期一</view>
							<view class="m-r-15" v-if="item==2">星期二</view>
							<view class="m-r-15" v-if="item==3">星期三</view>
							<view class="m-r-15" v-if="item==4">星期四</view>
							<view class="m-r-15" v-if="item==5">星期五</view>
							<view v-if="item==6">星期六</view>
						</view>
					</view>

				</view>
				<view class="m-t-40">
					<view class="flex-al-c f-28 color-20">
						<!-- <image class="wh-28 m-r-8" src="/pagesIndex/static/ico-youxiaoqi.png" mode=""></image> -->
						适用人数
					</view>
					<view class="f-28 color-20  m-t-20">
						{{info.number_of_people}}人
					</view>
				</view>
			</view>
			<!-- 购买须知结束 -->
			<!-- 适用商铺 -->
			<view class="padd-t24-lr32-b34 m-t-20 bgc-ff">
				<view class="f-32 color-20 fw-700">
					适用商铺
				</view>
				<view class="flex m-t-20" @tap="store(infox.merchant_id)">
					<!-- 商铺头像 -->
					<view class="">
						<image class="wh-96 bor-r-10" :src="infox.logo" mode=""></image>
					</view>
					<!-- 商铺头像结束 -->
					<!-- 左边部分 -->
					<view class="flex-jus-spa flex-column m-l-20" style="flex:1;">
						<!-- 商铺名称 -->
						<view class="f-32 color-20 fw-700">
							{{infox.name}}
						</view>
						<!-- 商铺名称结束 -->
						<!-- 评分、营业时间 -->
						<view class="flex-al-c flex-jus-spa">
							<view class="">
								<image class="wh-24 m-r-8" src="@/static/img/case.png" mode=""></image>
								<text class="color-FF9531 f-28 fw-600">{{infox.score}}</text>
								<text class="f-24 color-888 m-l-16">人均¥{{infox.per_capita_order_price}}</text>
								<text class="f-24 color-888 m-l-18">营业时间：9:00-23:00</text>
							</view>
							<view class="wh-32" @tap="callTel">
								<image class="wh-32" src="@/pagesIndex/static/shop-detail02.png" mode=""></image>
							</view>
						</view>
						<!-- 评分、营业时间结束 -->
					</view>
					<!-- 左边部分结束 -->
				</view>
				<!-- 推荐套餐 -->
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
				<!-- 推荐套餐结束 -->
			</view>
			<!-- 适用商铺结束 -->
			<!-- 套餐评价 -->
			<view class=" m-t-20">
				<!-- <commentOne title="套餐评价"></commentOne> -->
			</view>
			<!-- 套餐评价结束 -->
		</view>
		<!-- 加入购物车 -->
		<view class="flex-al-c flex-jus-spa padd-14-32 padd-flex bgc-ff shopCart-box w-100">
			<view class="flex-al-c flex-column" @tap="mycart">
				<view class="pos-r">
					<image class="wh-48" src="@/static/img/gouwuche-nor.png" mode=""></image>
					<view class="shopCart-tips flex-c-c color-fff f-20" v-if="count!==0">
						{{count}}
					</view>
				</view>
				<view class="">
					购物车
				</view>
			</view>
			<view class="flex">
				<view class="shopCart-btn flex-c-c color-fff f-28" @tap="addition(info.goods_id,info.merchant_id)">
					加入购物车
				</view>
				<view class="shopCart-btn1 flex-c-c flex-column" @tap="snapup">
					<view class="f-28 color-fff fw-600">
						立即抢购
					</view>
					<view class="f-22 color-fff">
						折后 ¥{{info.price}}
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
				options: {},
			}
		},
		onShow() {
			this.getCartListsx()
		},
		onShareAppMessage() {
			return {
				title: this.info.name,
				path: '/pagesIndex/page/foodIndex/foodCombo/foodCombo?id=' + this.options.id + '&ids=' + this.options.ids,
				imageUrl: this.info.logo,
				success() {
					console.log('分享成功')
				},
			}
		},
		onShareTimeline() {
			return {
				title: this.info.name,
				path: '/pagesIndex/page/foodIndex/foodCombo/foodCombo?id=' + this.options.id + '&ids=' + this.options.ids,
				imageUrl: this.info.logo,
				success() {
					console.log('分享成功')
				},
			}
		},

		onLoad(e) {
			this.options = e;
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
					this.goodx = shopList[1].goods
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
		margin-top: -10rpx;
	}

	.foodCombo-limit {
		box-sizing: border-box;
		padding: 24rpx 32rpx;
		background-color: #fefefe;
	}

	.text-dot {
		width: 12rpx;
		height: 12rpx;
		border-radius: 6rpx;
		background-color: #000000;
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