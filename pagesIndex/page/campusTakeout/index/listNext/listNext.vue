<template>
	<view>
		<u-sticky>
			<view class="bgc-ff padd-0-32 padd-b-20">
				<!-- 搜索框 -->
				<view class="flex-al-c padd-t-20">
					<view class="w-100 m-r-22">
						<u-search placeholder="请输入关键词" v-model="screen.keyword" :showAction="false" :clearabled="false"
							@search="search" @clear="clearSearch">
						</u-search>
					</view>
					<view class="flex-column flex-c-c ww-44" @tap="mapsx">
						<image class="wh-32-34" src="@/static/img/ico-ditu.png" mode=""></image>
						<view class=""><text class="f-22">地图</text></view>
					</view>
				</view>
			</view>
			<view class="pl50 pr50 pt24 pb24 bg-gray-f6 dis-flex flex-y-center flex-x-between">
				<view class="sort-item dis-flex f-b flex-y-center flex-x-center" v-for="(item,index) in sortList"
					:key="index" @tap="changeSort(item,index)">
					<view class="mr5 f-28" :class="sortId==item.id?'col-red-d9':''">{{item.name}}</view>
					<block v-if="index!=2">
						<image class="wh20" v-if="sortId!=item.id" src="/static/img/screen-bottom.png"></image>
						<image v-else class="wh20"
							:src="item.sort?'/static/img/screen-bottom02.png':'/static/img/screen-top.png'"></image>
					</block>
				</view>
			</view>
		</u-sticky>
		<view class="pl24 pr24  box-size">
			<!-- 商家列表 -->
			<view class="dis-flex   bg-white-ff mb10 radio-16 pt24 pl24  box-size" v-for="(item,index) in shopList"
				:key="index" @tap="shopDetail(item.merchant_id)">
				<image class="wh96 radio-8 mr20" :src="item.logo"></image>
				<view class="dis-flex flex-dir-column shop-r w-80 ">
					<view class="pr24 box-size w-100">
						<view class="dis-flex flex-y-center mb12">
							<view class="bg-orange-fa-f2 radio-4 mr10 f-22 col-white-ff pl5 pr5 ">神券</view>
							<view class="onelist-hidden w-80 f-32 f-b">{{item.name}}</view>
						</view>
						<view class="dis-flex flex-y-center flex-x-between mb5 price">
							<view class="price-l dis-flex flex-y-center w-75">
								<view class="dis-flex flex-y-center f-28 col-orange-ff95 mr20 case">
									<image class="wh24 mr10" src="/static/img/case.png"></image>
									<view class="f-b">{{item.score}}</view>
								</view>
								<view class="col-gray-88 f-22 w-35 mr10 box-size onelist-hidden ">月售{{item.month_sales}}
								</view>
								<view class="col-gray-88 f-22 w-45 onelist-hidden">
									¥{{Number.parseInt(item.per_capita_order_price)}}/人</view>
							</view>
							<view class="price-r col-red-d9 f-22">{{item.distribution_type==2?'商家配送':'平台配送'}}</view>
						</view>
						<view class="col-gray-88 mb15  dis-flex flex-y-center flex-x-between f-22">
							<view class="w-40 onelist-hidden">
								<text class="mr20">起送¥{{Number.parseInt(item.starting_price)}}</text>
								<text>配送¥{{item.delivery_money}}</text>
							</view>
							<view class="w-60 t-r onelist-hidden">
								<text class="mr10">{{item.delivery_time}}分钟</text>
								<text>距{{item.juli}}</text>
							</view>
						</view>
						<view class="dis-flex flex-y-center mb20">
							<!-- <view class="label radio-4 mr16 pl5 pr5 f-22 bg-red-d6-ec col-white-ff" v-for="(itemr,indet) in item.labels" :key="indet">{{itemr}}</view> -->
							<view class="label radio-4 mr16 pl5 pr5 f-22 border-red-eb col-red-d9"
								v-for="(itemx,inder) in item.reduce" :key="inder">{{itemx}}</view>

							<!-- <view class="label radio-4 mr16 pl5 pr5 f-22 border-red-eb  col-red-d9">首单满减</view> -->
						</view>
					</view>
					<scroll-view scroll-x="true" class="goods-scroll" v-if="item.goods!=''">
						<view class="goods-item flex-dir-column dis-flex flex-y-center flex-x-center mr20"
							v-for="(items,indes) in item.goods" :key="indes">
							<image class="wh148 radio-16" :src="items.img"></image>
							<view class="f-24 w-100 onelist-hidden mt12 mb5">{{items.name}}</view>
							<view class="onelist-hidden t-b ">
								<text class="col-red-d9 f-24 f-b">
									¥
									<text class="f-28">{{items.price}}</text>
								</text>
								<text class="col-gray-88 f-24 text-line">¥{{items.scribe_price}}</text>
							</view>
						</view>
					</scroll-view>

				</view>
			</view>

			<null-data title="暂无商家" v-if="shopList.length==0"></null-data>
			<u-loadmore v-else-if="shopList.length>1" :status="status" fontSize="26rpx" color="#999" />

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				keyword: "", //搜索字段
				shopList: [],
				sortList: [{
					name: "综合排序",
					id: 1,
					sort: true, //true是正序 向下  false是倒序 向上
				}, {
					name: "销量优先",
					id: 2,
					sort: true, //true是正序 向下  false是倒序 向上
				}, {
					name: "距离优先",
					id: 3,
				}, ],
				sortId: 1, //当前选中的筛选
				id: '',
				page: 1,
				screen: { //弹窗里面的筛选条件
					keyword: '', //搜索字段
					minPrice: "", //最低价
					maxPrice: "", //最高价
					speed: '', //配送时间
					characteristic: '', //商家特色
					quality: '', //品质
					activity: '', //优惠活动
				},
				
				
				
			};
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title: e.name
			})
			this.id = e.id
		},
		onShow() {
			this.getMerchantLists()
		},
		
		onReachBottom() {
				this.getMerchantLists(true)
		},
		methods: {
			//更改排序筛选
			changeSort(item, index) {
				if (this.sortId != 3) {
					this.sortList[index].sort = !this.sortList[index].sort
				} else {
					this.sortList[index].sort = 1
				}
				this.sortId = item.id
				this.getMerchantLists()
			},
			//获取商家列表
			async getMerchantLists(isPage) {
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
				} = await that.$api.subcategory({
					school_id: uni.getStorageSync('school').id || '',
					keyword: this.screen.keyword,
					cate: this.id, //商家分类id
					sort:this.sortId,
					lng: uni.getStorageSync('lng') || '',
					lat: uni.getStorageSync('lat') || '',
					limit:10,
					page: this.page,
				})
				uni.hideLoading()
				if (status == 200) {
					console.log(data.data)
					shopList = shopList.concat(data.data)
					that.shopList = shopList
					if (data.data.length == 0) {
						that.status = 'nomore'
					}

				}
			},
			clearSearch() {
				this.screen.keyword = ""
				this.getMerchantLists()
			},
			//搜索点击回车
			search() {
				this.getMerchantLists()
			},
			shopDetail(id) {
				uni.navigateTo({
					url: "/pagesIndex/page/campusTakeout/index/shopDetail/shopDetail?id=" + id + '&type=2'
				})
			},
			mapsx(){
				uni.navigateTo({
					url: '/pagesIndex/page/location/location'
				})
			},

		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f6f6f8;
		padding-bottom: 80rpx;
	}

	.goods-scroll {
		height: 260rpx;
		white-space: nowrap;
	}

	.goods-item {
		display: inline-block;
	}
</style>
