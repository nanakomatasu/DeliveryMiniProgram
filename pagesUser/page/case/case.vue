<template>
	<view>
		<u-sticky>
			<view class="top  bg-white-ff box-shad-b">
				<view class="dis-flex  pt24 pb30 flex-y-center  pl40 pr40 box-size flex-x-between">
					<view class="col-brank-20 f-28 pl40 pr40 tab-item" :class="tabAct1==item1.id?'tab-sel f-b':''"
						v-for="(item1,index) in tabList1" :key="index" @tap.stop="changeTab1(item1.id)">{{item1.name}}
					</view>
				</view>
			</view>
		</u-sticky>
		<view class="pl24 pr24 box-size" v-if="tabAct1 == 1">
			<view class="mt22 bg-white-ff cont24 radio-16 " v-for="(item,index) in shopList" :key="index">
				<view class="shop-name flex-x-between mb20 pb20 border-b-f7 dis-flex flex-y-center " v-if="item.type==1"
					@tap="onLink('/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id='+item.collection_id)">
					<view>{{item.info.name}}</view>
					<u-icon name="arrow-right" size="28rpx" color="#8E8F8E"></u-icon>
				</view>
				<view class="dis-flex flex-y-center" @tap.stop="wares(item)">
					<image class="wh180 radio-8 mr24" :src="item.info.logo||item.info.img"></image>
					<view class="w-75 dis-flex flex-column flex-x-between right">
						<view>
							<view class="dis-flex flex-y-center mb5 flex-x-between">
								<view class="f-32 f-b col-gray-33 onelist-hidden w-90">{{item.info.name}}</view>
								<image class="wh28" src="/pagesUser/static/del.png" @tap.stop="cancel(item)"></image>
							</view>
							<view class="dis-flex flex-y-center label-num">
								<view class="bg-gray-ee  f-20 radio-4 mr8"
									v-for="(itemLabel,indexLabel) in item.info.specs" :key="indexLabel">
									{{itemLabel.name}}
								</view>
							</view>
							<!-- <view class="dis-flex flex-y-center mb14" >
								<image class="wh24" src="/static/img/case.png"></image>
								<view class="col-orange-ff ml8 f-b mr16">4.5</view>
								<view class="col-gray-88 f-24">¥20/人</view>
							</view> -->

						</view>
						<view class="">
							<!-- <view class="dis-flex flex-y-center">
								<view class="label radio-4 mr16 pl5 pr5 f-22 border-red-eb col-red-d9">30减15</view>
							</view> -->
							<view class="t-b" v-if="item.info.price&&item.info.scribe_price">
								<text class="col-red-d9 f-24 mr8 f-b">¥<text
										class="f-32">{{item.info.price}}</text></text>
								<text class="text-line f-24 col-gray-88">¥{{item.info.scribe_price}}</text>
							</view>
						</view>
						<view class="f-22 col-gray-88" v-if="!item.info.price&&!item.info.scribe_price">
							本地生活
						</view>
					</view>
				</view>
			</view>


			<view class="m-t-60" v-if="shopList.length==0">
				<view class="flex-center">
					<image class="zanwu " src="/pagesUser/static/zanwu.png"></image>
				</view>
				<view class="flex-center">
					暂无收藏
				</view>
			</view>
		</view>

		<!-- 校U优选 -->
		<view class="collection_list" v-for="(item,index) in CollectList" v-if="tabAct1 == 3"
			@click="toClassDetail(item)">
			<image :src="item.picture" mode="" class="collection_img"></image>
			<view class="collection_content">
				<view class="collection_title">
					{{item.name}}
				</view>
				<view style="font-size: 24rpx;color: #8e8f8e;margin-top: 20rpx;margin-bottom: 20rpx;">
					已拼{{item.sales_num}}件
				</view>
				<view class="collection_price">
					<view class="" style="display: flex;justify-content: space-between;align-items: baseline;">
						<view class="" style="display: flex;justify-content: flex-start;align-items: baseline;">
							<view class=""
								style="font-size: 24rpx;color: #d93038;font-weight: 600; margin-right: 4rpx;">
								¥
							</view>
							<view class=""
								style="font-size: 36rpx;color: #d93038;;font-weight: 600;margin-right: 4rpx;">
								{{item.price}}
							</view>
						</view>
						<image src="../../../static/img/ico_jiagouwuche.png" mode="" class="Carico"></image>
					</view>
				</view>
			</view>

			<view class="m-t-60" v-if="CollectList.length==0">
				<view class="flex-center">
					<image class="zanwu " src="/pagesUser/static/zanwu.png"></image>
				</view>
				<view class="flex-center">
					暂无收藏
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				status: "loadmore",
				shopList: [],

				// 校U优选
				tabAct1: 1,
				tabList1: [{
						name: "校园外卖",
						id: 1
					},
					// {
					// 	name: "本地生活",
					// 	id: 2
					// },
					// {
					// 	name: "校U优选",
					// 	id: 3
					// }
				],
				CollectList: [], //收藏列表
			};
		},
		onReachBottom() {
			this.getMerchantLists(true)
		},
		onLoad() {
			this.getMerchantLists()
		},
		onShow() {
			this.getCollectList()
		},
		methods: {
			//跳转链接
			onLink(url) {
				uni.navigateTo({
					url: url
				})
			},

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
				} = await that.$api.collectionlist({
					limit: 10,
					page: this.page,
				})
				uni.hideLoading()
				if (status == 200) {
					shopList = shopList.concat(data.data)
					that.shopList = shopList

					if (data.data.length == 0) {
						that.status = 'nomore'
					}
					that.isLoad = false

				}
			},


			//取消收藏	
			cancel(item) {
				var that = this
				uni.showModal({
					title: '提示',
					content: '是否取消收藏',
					success: function(res) {
						if (res.confirm) {
							that.cancelx(item)
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			//取消收藏接口
			async cancelx(item) {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const result = await that.$api.collection({
					collection_id: item.collection_id,
					type: item.type,
				})
				uni.hideLoading()
				if (result.status == 200) {
					this.$u.toast("提交成功")
					this.getMerchantLists()
				}

			},

			//商品跳转
			wares(item) {
				if (item.type == 1) {
					uni.navigateTo({
						url: '/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id=' + item.collection_id
					})
				} else if (item.type == 2) {
					uni.navigateTo({
						url: '/pagesIndex/page/campusTakeout/index/goodsDetail/goodsDetail?id=' + item
							.collection_id
					})
				}
			},


			// 校U优选
			//更改id
			changeTab1(id) {
				this.tabAct1 = id
				if (this.tabAct1 == 1) {
					this.getMerchantLists()
				}
				if (this.tabAct1 == 3) {
					this.getCollectList()
				}
			},

			//收藏列表
			getCollectList() {
				const data = {
					userId: uni.getStorageSync('userInfo').id
				}
				this.$http.post('/api/user/listCollects', data)
					.then(res => {
						if (res.code == 200) {
							this.CollectList = res.data.list
						}
					})
			},
			// 跳转商品详情
			toClassDetail(item) {
				console.log(item);
				uni.navigateTo({
					url: `/pagesOptimization/pages/shopDetails/shopDetails?goods_id=${item.id}`
				})
			},

		}
	}
</script>

<style lang="scss">
	.right {
		height: 180rpx;
	}

	.label {
		height: 28rpx;
		line-height: 28rpx;
	}

	.label-num view {
		height: 28rpx;
		line-height: 28rpx;
		padding: 0 6rpx;
	}

	.zanwu {
		width: 304rpx;
		height: 304rpx;
	}

	// 校U优选
	.collection_list {
		display: flex;
		justify-content: flex-start;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 20rpx;
		margin-top: 20rpx;
	}

	.collection_img {
		width: 180rpx;
		height: 180rpx;
		margin-right: 24rpx;
	}

	.collection_content {
		flex: 1;
	}

	.collection_title {
		font-size: 28rpx;
		font-weight: 600;
		color: #202020;
	}

	.collection_text {
		display: flex;
	}

	.Carico {
		width: 48rpx;
		height: 48rpx;
	}
</style>
