<template>
	<view class="padd-0-24">
		<view class="bgc-ff padd-t24-lr32-b1 bor-r-16 m-t-20">
			<view class="f-28 color-20 m-b-20 fw-500">
				商家菜品
			</view>
			<view class="flex m-b-40 " v-for="(item,index) in shopList[0].goods" @click="goAll(item.goods_id,item.merchant_id)">
				<view class="bor-r-16">
					<image class="wh-148 bor-r-16" :src="item.img" mode=""></image>
				</view>
				<view class="flex-jus-spa flex-column m-l-24">
					<text class="f-28 color-20 fw-500">{{item.name}}</text>
					<view class="fw-700">
						<text class="f-24 color-20">¥</text>
						<text class="f-32 color-20">{{item.price}}</text>
					</view>
				</view>
			</view>
			
			<view class="" v-if="shopList[0].goods.length==0">
				
				<null-data></null-data>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				id:"",
				shopList:[],
				page: 1,
				status: "loadmore",
			}
		},
		
		onLoad(e){
			this.id=e.id
			console.log(e.id)
			this.getMerchantLists()
		},
		
		
		onReachBottom() {
			this.getMerchantLists(true)
		},
		methods: {
			goAll(id,merchant_id) {
				console.log(id)
				uni.navigateTo({
					url: '/pagesIndex/page/foodIndex/foodDetails/foodDetails?id=' + id+ '&ids=' + merchant_id
				})
			},
			//商品列表减少加入购物车的数量
			delNum(items, item) {
				this.getTakeoutCartSub(items.cart_id)
			},
			//商品列表添加加入购物车的数量
			addNum(items, item) {
				// console.log(items, item)
				this.getTakeoutCartAdd(items)
			},
			
			addCard(items, item) {
				// console.log(items, "=====-----")
				// var attribute = items.attribute
				// if (attribute != null && attribute != 'null' && attribute != '') {
				// 	attribute = items.attribute.split(',')
				// } else {
				// 	attribute = []
				// }
				// // 有规格的加入展示弹框
				// if ((items.specs && JSON.parse(items.specs).length > 0) || attribute.length > 0) {
				// 	//判断是不是多规格属性商品 是就改变skuShow=true
				// 	this.$set(this.specsObject, 'goods_id', items.goods_id)
				// 	this.$set(this.specsObject, 'name', items.name)
				// 	this.$set(this.specsObject, 'price', items.price)
				// 	this.$set(this.specsObject, 'specs', JSON.parse(items.specs) || [])
				// 	this.$set(this.specsObject, 'specs1', JSON.parse(items.specs1) || [])
				// 	this.$set(this.specsObject, 'attribute', attribute)
				// 	this.skuShow = true
				// } else {
				// 	//没有规格的直接加入购物车
				// 	this.getTakeoutCartAdd(items)
				// }
			
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
					console.log(shopList,'2324')
					that.shopList = shopList
					if (data.list.length == 0) {
						that.status = 'nomore'
					}
					that.isLoad = false
			
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}
	
	.del {
		width: 40rpx;
		line-height: 36rpx;
		text-align: center;
		height: 40rpx;
	}
	
	.cart-num {
		width: 40rpx;
		text-align: center;
	}
	
	.cart-sku-num {
		transform: scale(0.85);
		position: absolute;
		min-width: 15px;
		height: 15px;
		background: #F7D6D7;
		border-radius: 7px;
		border: 1px solid #D93038;
		padding: 0 3px;
		box-sizing: border-box;
		font-size: 10px;
		text-align: center;
		line-height: 15px;
		color: #D93038;
		right: -8px;
		top: -8px;
	}
	
</style>
