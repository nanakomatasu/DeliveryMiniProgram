<template>
	<view>
		<view class="sticky">
			<u-navbar :placeholder="true" :autoBack="true">
				<view  class="w-85 ml15 flex flex-y-center h-100" slot="center">
					<u-search placeholder="请输入关键词" v-model="keyword" @search="search"
					:showAction="false" :clearabled="false">
					</u-search>
				</view>
			</u-navbar>
			<!-- 向右滑动的筛选tab -->
			<view class="dis-flex flex-y-center flex-x-start pt12 pb20 bg-white-ff">
				<scroll-view scroll-x="true" class="tab-scroll padd-0-32">
					<view class="tab-item f-28" @tap="changeType(item.type)" :class="type==item.type?'tab-act':''"
						v-for="(item,index) in screenList" :key="index">{{item.name}}</view>
				</scroll-view>
				<view class="flex-dir-row flex-c-c" @tap="changeAddress">
					<image class="wh-32-34" src="@/static/img/ico-ditu.png" mode=""></image>
					<text class="onelist-hidden " style="width: 160rpx;font-size: 20rpx;">{{school.school_name}}</text>
					<image class="wh-32-34" src="@/static/img/ico_gengduo.png"> </image>
				</view>
			</view>
			<view class="dis-flex  flex-y-center padd-0-26 padd-tb20 bgc-ff" >
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
						<view class="dis-flex flex-dir-column">
							
							<view class="dis-flex flex-y-center mb12">
								<view class="onelist-hidden  f-32 f-b" style="width: 400rpx;"> {{item.name}}</view>
							</view>
							<view class="dis-flex flex-y-center flex-x-between mb5 price">
								<view class="price-l dis-flex flex-y-center ">
									<view class="dis-flex flex-y-center f-28 col-orange-ff95 mr20 case">
										<image class="wh24 mr10" src="/static/img/case.png"></image>
										<view class="f-b">{{item.score}}</view>
									</view>
									<view class="col-gray-88 f-20  mr10 box-size onelist-hidden ">月售{{item.month_sales}}</view>
									<view class="col-gray-88 f-20  onelist-hidden">
										¥{{Number.parseFloat(item.per_capita_order_price).toFixed(1)}}/人</view>
								</view>

							</view>
							<view class="col-gray-88 mb15  dis-flex flex-y-center  f-22" v-if="item.channel_type ==1">
								<view class=" onelist-hidden" >
									<text class="mr12">满{{Number.parseFloat(item.starting_price).toFixed(0)}}元起送</text>
									<text class="mr12">配送费¥{{Number.parseFloat(item.delivery_money).toFixed(0)}}</text>
								</view>
								<view class=" t-r onelist-hidden">
									<!-- <text class="mr10">{{item.delivery_time}}分钟</text> -->
									<text>距{{item.juli}}</text>
								</view>
							</view>
						</view>
						<view>
							<view class="shop-tag type1 mr10" v-if="item.channel_type ==1">
								<view class="type">外卖</view>
								<view class="time onelist-hidden">{{item.delivery_time}}分钟</view>
							</view>
						</view>
						<view>
							<view class="shop-tag type2 mr10" v-if="item.channel_type ==2">
								<view class="type">到店</view>
								<view class="time onelist-hidden">{{item.juli}}</view>
							</view>
						</view>
						
					</view>

					<scroll-view scroll-x="true" class="goods-scroll" v-if="item.goods.length >0">
						<view class="goods-item flex-dir-column dis-flex flex-y-center flex-x-center mr20"
							v-for="(items,indes) in item.goods" :key="indes">
							<image class="wh148 radio-16" :src="items.img"></image>
							<view class="f-24  onelist-hidden mt12 mb5 caoshus">{{items.name}}</view>
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
				school:{},
				shopList: [], //商家列表
				type: 0, //选中的筛选id
				screenList: [{
						type: 0,
						name: '全部'
					},
					{
						type: 1,
						name: '外卖'
					},
					{
						type: 2,
						name: '到店'
					}
				],
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
				sortId :1,
				page: 1,
				isLoading:false,
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
			//修改店铺类型
			changeType(id) {
				this.type = id;
				this.getSearchResult(false);
			},
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
					page:that.page,
					limit: 10,
				})
				uni.hideLoading();
				that.isLoading =false;
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
		background-color: #f6f6f6;
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

	.shop-tag {
		/* display: flex;
		flex-direction: column; */
		border-radius: 10%;
		border-style: solid;
		font-size: 18rpx;
		height: 62rpx;
		width: 110rpx;
		text-align: center;
	}
	.type1 {
		border: 2rpx solid #f59c19;
	}
	
	.type1 .type {
		background-color: #f59c19;
		padding: 0 10rpx;
		color: white;
	}
	.type1 .time {
		padding: 0 10rpx;
		color: #f59c19;
	}
	
	.type2 {
		border: 2rpx solid #cd1a2b;
	}
	
	.type2 .type {
		background-color: #cd1a2b;
		padding: 0 10rpx;
		color: white;
	}
	.type2 .time {
		padding: 0 10rpx;
		color: #cd1a2b;
	}
	
	
</style>
