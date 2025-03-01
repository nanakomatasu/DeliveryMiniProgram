<template>
	<view>
		<u-sticky>
			<view class="bgc-ff padd-0-32 padd-b-20">
				<!-- 搜索框 -->
				<view class=" dis-flex flex-y-center">
					<u-search searchIconSize="32rpx" searchIcon="/static/img/search.png" placeholder="请输入关键词"
						searchIconColor="#909399" color="#202020" :showAction="false" v-model="keyword" height="60rpx"
						bgColor="#F6F6F6" @search="search" @clear="clearSearch"></u-search>
					<view class="dis-flex flex-y-center m-l-32">
						<view class="flex-column flex-c-c ww-44 mr40" @tap="onMap">
							<image class="wh-32-34" src="@/static/img/ico-ditu.png" mode=""></image>
							<view class=""><text class="f-22">地图</text></view>
						</view>
						<view class="flex-column flex-c-c" @click="goOrderlist">
							<image class="wh-32-34" src="@/static/img/ico-dingdan.png" mode=""></image>
							<view class=""><text class="f-22">订单</text></view>
						</view>
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
						<view class="onelist-hidden w-100 mb8 f-32 f-b">{{item.name}}</view>
						<view class="dis-flex flex-y-center flex-x-between mb8 price">
							<view class="price-l dis-flex flex-y-center w-70">
								<view class="dis-flex flex-y-center f-28 col-orange-ff95 mr20 case">
									<image class="wh24 mr10" src="/static/img/case.png"></image>
									<view class="f-b">4.5</view>
								</view>
								<view class="col-gray-88 f-22 w-35 mr10 box-size onelist-hidden ">月售{{item.month_sales}}
								</view>
								<view class="col-gray-88 f-22 w-45 onelist-hidden">
									¥{{Number.parseInt(item.per_capita_order_price)}}/人</view>
							</view>
							<view class="w-30 onelist-hidden t-r col-gray-88 f-24">距{{item.juli}}</view>
						</view>
						<view class="dis-flex flex-y-center mb20">
							<view class="label radio-4 mr16 pl5 pr5 f-22 border-red-eb col-red-d9 "
								v-for="(label,i) in item.labels" :key="i">{{label}}</view>
						</view>
					</view>
					<scroll-view scroll-x="true" class="goods-scroll" v-if="item.goods.length">
						<view class="goods-item flex-dir-column dis-flex flex-y-center flex-x-center mr20"
							v-for="(good,goodsIndex) in item.goods" :key="goodsIndex">
							<image class="wh148 radio-16" :src="good.img"></image>
							<view class="f-24 w-100 onelist-hidden mt12 mb5">{{good.name}}</view>
							<view class="onelist-hidden t-b ">
								<text class="col-red-d9 f-24 f-b">
									¥
									<text class="f-28">{{good.price}}</text>

								</text>
								<text class="col-gray-88 f-24 text-line">¥{{good.scribe_price}}</text>
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
		methods: {
			//跳转地图
			onMap() {
				uni.navigateTo({
					url: '/pages/map/map'
				})
			},
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
			//搜索框清空内容
			clearSearch() {
				this.keyword = ""
				this.getMerchantLists()
			},
			//搜索点击回车
			search() {
				this.getMerchantLists()
			},
			//跳转商家详情
			shopDetail(id) {
				uni.navigateTo({
					url: "/pagesIndex/page/foodIndex/homepage/homepage?id=" + id
				})
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
				} = await that.$api.merchantLists({
					school_id: uni.getStorageSync('school').id || '',
					name: this.keyword,
					category: this.id, //商家分类id
					page: this.page,
					sort: this.sortId,
					lng: uni.getStorageSync('lng') || '',
					lat: uni.getStorageSync('lat') || '',
				})
				uni.hideLoading()
				if (status == 200) {
					console.log(data.list)
					shopList = shopList.concat(data.list)
					that.shopList = shopList
					if (data.list.length == 0) {
						that.status = 'nomore'
					}

				}
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