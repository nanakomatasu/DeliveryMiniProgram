<template>
	<view>
		<view class="sticky">
			<!-- 向右滑动的筛选tab -->
			<view class="dis-flex flex-y-center flex-x-start pt12 pb20 bg-white-ff">
				<view class="w-80">
					<u-search placeholder="请输入关键词" v-model="keyword" @search="search" :showAction="false"
						:clearabled="false">
					</u-search>
				</view>
				<view class="flex-dir-column flex-c-c ml10" @tap="changeAddress">
					<image class="wh-32-34" src="@/static/img/ico-ditu.png" mode=""></image>
					<text class="onelist-hidden " style="width: 140rpx;font-size: 20rpx;">{{school.school_name}}</text>
				</view>
			</view>
			<view class="dis-flex  flex-y-center padd-0-26 padd-tb20 bgc-f6">
				<view class="sort-item" v-for="(item,index) in sortList" @tap="changeSort(item,index)">
					<view class="sort-item" :class="sortId==item.id?'col-red-d9':''">{{item.name}}</view>
				</view>
			</view>
		</view>

		<view class="padd-0-14">
			<!-- 商家列表 -->
			<view class="dis-flex  bg-white-ff mt20 radio-16 cont24" v-for="(item,index) in shopList" :key="index"
				@tap="shopDetail(item.merchant_id)">
				<view>
					<image class="wh148 radio-8 mr20" :src="item.logo"></image>
				</view>
				<view class="dis-flex flex-dir-column flex-space w-80">
					<view class="dis-flex flex-dir-row flex-space">
						<view class="dis-flex flex-dir-column w-100">
							<view class="dis-flex flex-y-center mb12">
								<view class="onelist-hidden  f-32 f-b"> {{item.name}}</view>
							</view>
							<view class="dis-flex flex-y-center flex-x-between mb5 price">
								<view class="price-l dis-flex flex-y-center ">
									<view class="dis-flex flex-y-center f-28 col-orange-ff95 mr20 case">
										<image class="wh24 mr10" src="/static/img/case.png"></image>
										<view class="f-b">{{item.score}}</view>
									</view>
									<view class="col-gray-88 f-22  mr10 box-size onelist-hidden ">月售{{item.month_sales}}
									</view>
									<view class="col-gray-88 f-22  onelist-hidden">
										¥{{Number.parseFloat(item.per_capita_order_price).toFixed(1)}}/人</view>
								</view>
								<view class="col-gray-88 f-22 onelist-hidden">距离{{item.juli}}</view>
							</view>
						</view>


					</view>

					<scroll-view scroll-x="true" class="goods-scroll" v-if="item.goods.length >0">
						<view class="goods-item flex-dir-column dis-flex flex-y-center flex-x-center mr20"
							v-for="(items,indes) in item.goods" :key="indes">
							<image class="wh148 radio-16" :src="items.img"></image>
							<view class="f-24 w-100 onelist-hidden mt12 mb5">{{items.name}}</view>
							<view class="onelist-hidden t-b ">
								<text class="col-red-d9 f-24 f-b">
									¥<text class="f-28">{{items.price}}</text>
								</text>
								<text class="col-gray-88 f-24 text-line">¥{{items.scribe_price}}</text>
							</view>
						</view>
					</scroll-view>
				</view>

			</view>
			<null-data title="暂无搜索结果" v-if="shopList.length==0"></null-data>
			<u-loadmore v-else-if="shopList.length>1" :status="status" fontSize="26rpx" color="#999" />
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '', //搜索
				lat: '',
				lng: '',
				school: {},
				shopList: [], //商家列表
				type: 2, //选中的筛选id 选择到店
				sortList: [{
					name: "综合排序",
					id: 1,
					sort: true, //true是正序 向下  false是倒序 向上
				}, {
					name: "距离优先",
					id: 2,
				}, {
					name: "销量优先",
					id: 3,
				}, ],
				sortId: 1,
				page: 1,
				isLoading: false,
				status: "loadmore",
			}
		},
		onReachBottom() {
			if (this.status != 'nomore' && this.isLoading == false) {
				this.getSearchResult(true)
			}
		},
		onLoad(option) {
			this.keyword = option.keyword;
			this.lat = uni.getStorageSync('lat');
			this.lng = uni.getStorageSync('lng');

		},
		onShow() {
			this.school = uni.getStorageSync('school');
			this.getSearchResult(false);
		},
		methods: {
			//获取搜索结果
			async getSearchResult(isLoadMore) {
				let that = this;
				if (that.isLoading) {
					return
				}
				that.isLoading = true
				uni.showLoading({
					title: "正在加载中"
				})
				if (isLoadMore) {
					that.status = "loading"
				} else {
					that.page = 1
					that.shopList = []
					that.status = 'loadmore'
				}

				uni.showLoading({
					title: "正在加载中"
				})
				const {
					data,
					status
				} = await that.$api.getSearchResult({
					type: that.type, //0表示全部，1表示外卖，2表示到店
					lat: that.lat,
					lng: that.lng,
					keyword: that.keyword,
					sort: that.sortId, //1表示综合，2表示距离，3表示销量
					school_id: that.school.id,
					page: that.page,
					limit: 10,
				})
				uni.hideLoading();
				that.isLoading = false;
				if (status == 200) {
					console.log(data);
					that.shopList = that.shopList.concat(data.data);
					if (data.data.length < 10 && that.page == 1) {
						that.status = 'nomore'
					}
					if (data.data.length == 0) {
						that.status = 'nomore'
					}
					that.page = that.page + 1;
				}
			},
			//跳转商家详情
			shopDetail(id) {
				uni.navigateTo({
					url: "/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id=" + id
				})
			},
			back() {
				uni.navigateBack({});
			},
			search() {
				this.getSearchResult();
			},
			//修改地址
			changeAddress() {
				uni.navigateTo({
					url: "/pagesIndex/page/location/location"
				})
			},
			//更改排序筛选
			changeSort(item, index) {
				this.sortId = item.id;
				this.getSearchResult()
			},
		}
	}
</script>

<style>
	.sticky {
		/* 兼容chorme */
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 99;
	}

	.sort-item {
		background-color: #ffffff;
		padding: 5rpx 12rpx;
		margin-right: 30rpx;
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

	.goods-scroll {
		height: 260rpx;
		white-space: nowrap;
	}

	.goods-item {
		display: inline-block;
		margin-top: 10rpx;
	}
</style>
