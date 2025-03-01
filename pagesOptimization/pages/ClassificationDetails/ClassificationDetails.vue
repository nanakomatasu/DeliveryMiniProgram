<template>
	<view style="padding: 20rpx;">
		<!-- 商品列表 -->
		<view class="ProductList">
			<view class="ProductList_title">
				<view v-for="(item,index) in tablist" :key="item.id" class="ProductList_title_style"
					:class="tabindex === index?'ProductList_title_style color_red':'ProductList_title_style'"
					@click="ProductListSwitch(index)">
					{{item.name}}
					<image :src="UrlImg" class="ProductList_price_ico" v-if="item.id === 2"></image>
				</view>
			</view>
			<view class="ProductList_content" v-if="ShopGoodsList.length > 0">
				<view class="ProductList_content_list" v-for="(item,index) in ShopGoodsList"
					@click="toShopdetail(item)">
					<image :src="item.picture" mode="" class="content_list_img"></image>
					<view class="content_list_show">
						<view class="content_list_title">
							{{item.goodsName}}
						</view>
						<view class="content_list_discount">
							<view class="list_Crowdordering_total">
								已拼{{item.sales_num}}件
							</view>
						</view>
						<view class="content_list_price">
							<view class="list_price_show">
								<view class="list_price_flexend">
									<view style="font-size: 24rpx;">
										￥
									</view>
									<view style="font-size:36rpx;font-weight: 600;">
										{{item.price}}
									</view>
								</view>
								<!-- 								<view style="font-size: 24rpx;text-decoration: line-through;color: #888888;">
									¥{{item.price}}
								</view> -->
							</view>
							<image src="../../static/ico_jiagouwuche@2x.png" mode="" class="content_list_car"
								@click="add_car">
							</image>
						</view>
					</view>
				</view>
			</view>
			<view class="" v-if="ShopGoodsList.length == 0">
				<null-data title="暂无商品"></null-data>
			</view>
			<view>
				<u-gap height="40" bgColor="#f5f5f5"></u-gap>
			</view>
			<!-- 购物车悬浮 -->
			<!-- 			<view class="showCar">
				<view class="showCar_num">
					2
				</view>
				<image src="../../static/shopCar.png" mode="" class="showCar_img"></image>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				UrlImg: require('../../static/ico_zhankai@2x.png'), //价格排序图标
				tabindex: 0,
				tablist: [{
						id: 0,
						name: '综合排序',
					},
					{
						id: 1,
						name: '销量优先',
					},
					{
						id: 2,
						name: '价格',
					},
				],
				type: '', // 1、平台类目，2、店铺类目
				shop_id: '', //店铺Id
				cate_id: '', //店铺或平台类目ID
				ShopGoodsList: [], //商品列表
				column: '', //排序字段 sales_num（销量）create_time（创建时间，新品用这个倒序）  price（价格）
				sort: '', //ASC（顺序） DESC（倒序）
				curSrcImgIndex: 0,
			}

		},
		onLoad(item) {
			console.log(item);
			if (item.type == 2) {
				console.log(item.type, 'item.type');
				this.shop_id = item.shop_id
			}
			this.type = item.type
			this.cate_id = item.cate_id //类目Id

			uni.setNavigationBarTitle({
				title: item.name
			})
		},
		onShow() {
			if (this.type == 1) { //平台类目
				this.getlistGoods()
			} else { //店铺类目
				this.getShopGoodsList()
			}
			// this.getShopGoodsList()
			// this.getlistGoods()

		},
		methods: {
			//获取店铺类目列表 /api/shop/listShopGoods
			getShopGoodsList(item) {
				if (item) {
					this.column = item
				} else {
					this.column = ''
				}
				const data = {
					shop_id: this.shop_id,
					page: 1,
					num: 2000,
					column: this.column, //排序字段 sales_num（销量）create_time（创建时间，新品用这个倒序）  price（价格）
					sort: this.sort, //ASC（顺序） DESC（倒序）
				}
				this.$http.post('/api/shop/listShopGoods', data)
					.then(res => {
						if (res.code == 200) {
							this.ShopGoodsList = res.data.list
						}
					})
			},

			//获取平台类目商品列表 /api/shop/listGoods
			getlistGoods(item) {
				if (item) {
					this.column = item
				} else {
					this.column = ''
				}
				let list = []
				const data = {
					cate_id: this.cate_id,
					page: 1,
					num: 2000,
					column: this.column, //排序字段 sales_num（销量）create_time（创建时间，新品用这个倒序）  price（价格）
					sort: this.sort, //ASC（顺序） DESC（倒序）
				}
				this.$http.post('/api/shop/listGoods', data)
					.then(res => {
						this.ShopGoodsList = res.data.list
					})
			},

			//价格排序
			ProductListSwitch(index) {
				this.tabindex = index
				console.log(index);
				let item = ''
				if (index == 0) {
					if (this.type == 1) { //平台类目
						this.getlistGoods(item)
					} else { //店铺类目
						this.getShopGoodsList(item)
					}
				}
				if (index == 1) { //sales_num（销量）
					item = "sales_num"
					let sales_num = {
						sales_num: 'sales_num'
					}
					item = sales_num.sales_num
					this.sort = 'DESC'

					if (this.type == 1) { //平台类目
						this.getlistGoods(item)
					} else { //店铺类目
						this.getShopGoodsList(item)
					}
				}
				if (index == 2) {
					this.curSrcImgIndex++
					if (this.curSrcImgIndex % 2 == 0) {
						this.UrlImg = require('../../static/ico_zhankaiup2x.png')
						this.sort = 'ASC'
					} else {
						this.UrlImg = require('../../static/ico_zhankai_down@2x.png')
						this.sort = 'DESC'
					}
					let column = {
						column: 'price'
					}
					item = column.column
					if (this.type == 1) { //平台类目
						this.getlistGoods(item)
					} else { //店铺类目
						this.getShopGoodsList(item)
					}
				} else {
					this.UrlImg = require('../../static/ico_zhankai@2x.png')
					this.sort = ''
				}

			},
			//前往商品详情
			toShopdetail(item) {
				uni.navigateTo({
					url: `/pagesOptimization/pages/shopDetails/shopDetails?goods_id=${item.id}`,
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.ProductList {
		margin-top: 20rpx;
	}

	.ProductList_title {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.ProductList_title_style {
		font-size: 32rpx;
		font-weight: 600;
	}

	.color_red {
		color: #D93038;
	}

	.ProductList_price_ico {
		width: 20rpx;
		height: 20rpx;
	}

	.ProductList_content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 30rpx;
	}

	.ProductList_content_list {
		width: 342rpx;
		margin-bottom: 32rpx;
		padding-bottom: 14rpx;
		background-color: #fff;
	}

	.content_list_img {
		width: 342rpx;
		height: 342rpx;
	}

	.content_list_show {
		padding-right: 24rpx;
		padding-left: 24rpx;
	}

	.content_list_title {
		font-weight: 600;
		font-size: 28rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.content_list_discount {
		display: flex;
		margin-top: 14rpx;
	}

	.list_discount_price {
		height: 28rpx;
		line-height: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-size: 22rpx;
		padding: 0 6rpx;
		border-radius: 4rpx;
		border: 1rpx solid #eb979b;
		color: #dd343c;
		max-width: 50%;
		margin-right: 8rpx;
	}

	.list_Crowdordering_total {
		height: 28rpx;
		line-height: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-size: 22rpx;
		padding: 0 6rpx;
		border-radius: 4rpx;
		border: 1rpx solid #888888;
		color: #888888;
		max-width: 50%;
		margin-right: 8rpx;
	}

	.content_list_price {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
		color: #e51860;
	}

	.list_price_show {
		display: flex;
		align-items: baseline;
	}

	.list_price_text {
		font-size: 24rpx;
	}

	.list_price_flexend {
		display: flex;
		align-items: flex-end;
	}

	.list_car_box {
		display: flex;
		align-items: center;
	}

	.content_list_car {
		width: 50rpx;
		height: 50rpx;
		// margin-top: 20rpx;
	}

	.showCar {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80rpx;
		height: 80rpx;
		position: fixed;
		bottom: 100rpx;
		right: 30rpx;
		border-radius: 40rpx;
		background-color: #fff;
	}

	.showCar_num {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40rpx;
		height: 40rpx;
		background: linear-gradient(313deg, #d62e36, #ec434b);
		border-radius: 28rpx;
		border: 2rpx solid #fff;
		position: absolute;
		top: -22rpx;
		right: -8rpx;
		color: #fff;
	}

	.showCar_img {
		width: 48rpx;
		height: 48rpx;
	}
</style>
