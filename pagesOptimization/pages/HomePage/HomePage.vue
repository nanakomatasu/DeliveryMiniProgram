<template>
	<view :class="{popupScroll:popupScroll}">
		//导航栏
		<view class="" style="height: 80rpx;">
			<view class="nav">
				<view class="nav_header">
					<image src="../../static/loge.png" mode="" class="nav_img"></image>
					<view>
						<u--input placeholder="请输入关键词" prefixIcon="search"
							prefixIconStyle="font-size: 44rpx;color: #909399" shape="circle" fontSize="14"
							style="background-color: #ffffff;" @focus="Onfocus"></u--input>
					</view>
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="Swiper_contect">
			<template>
				<u-swiper :list="list3" indicator indicatorMode="line" circular></u-swiper>
			</template>
		</view>
		<!-- 一级菜单标签 -->
		<view>
			<template>
				<u-tabs :list="list1" @click="click"></u-tabs>
			</template>
		</view>
		<!-- 二级菜单 -->
		<view class="" style="padding: 20rpx;">
			<view class="child_meau">
				<view class="child_meau_show" v-for="item in list2" :key="item.id" @click="toClassDetails(item)">
					<image :src="item.urlimg" mode="" class="child_meau_ico"></image>
					<view class="child_meau_nice">
						{{item.child_nick}}
					</view>
				</view>
			</view>
		</view>
		<!-- 商品内容 -->
		<view class="" style="padding: 20rpx;">
			<view class="ProductList_content">
				<view class="ProductList_content_list" v-for="(item,index) in productList" :key="item.id" @click="toshopDetails(item)">
					<image :src="item.productListImg" mode="" class="content_list_img"></image>
					<view class="content_list_show">
						<view class="content_list_title">
							{{item.name}}
						</view>
						<view class="content_list_discount">
							<view class="list_discount_price">
								{{item.discount_card}}
							</view>
							<view class="list_Crowdordering_total">
								{{item.Crowdordering_total}}
							</view>
						</view>
						<view class="content_list_price">
							<view class="list_price_show">
								<view class="list_price_text">
									劵后
								</view>
								<view class="list_price_flexend">
									<view style="font-size: 24rpx;">
										￥
									</view>
									<view style="font-size:36rpx;font-weight: 600;">
										{{item.discount_price}}
									</view>
								</view>
								<view style="font-size: 24rpx;text-decoration: line-through;color: #888888;">
									¥{{item.price}}
								</view>
							</view>
							<image src="../../static/ico_jiagouwuche@2x.png" mode="" class="content_list_car"
								@click="add_car">
							</image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 购物车悬浮 -->
		<view class="showCar">
			<view class="showCar_num">
				2
			</view>
			<image src="../../static/shopCar.png" mode="" class="showCar_img"></image>
		</view>
		<!-- 加入购物车弹窗 -->
		<template>
			<u-popup :show="showAddcar" mode="bottom" @close="close" @open="open" :round="10" bgColor="#f3f3f3"
				height="700" :closeable="true">
				<view class="Order_title">
					添加购物车
				</view>
				<view style="padding: 20rpx;">
					<view class="Order_content_Show">
						<image src="../../static/foods.jpg" mode="" class="Order_shopping_img"></image>
						<view class="Order_content_text">
							<view class="Order_price">
								<text class="Order_price_before">劵后</text>
								<text>
									<text class="Order_price_ico">￥</text>
									<text class="Order_price_text">39.8</text>
								</text>
								<view class="Order_price_text2">
									￥78.8
								</view>
							</view>
							<view class="Order_choose">
								已选择：{{radio3}}{{radio3}}
							</view>
							<view class="Order_num">
								<uni-number-box :min="1" :max="99" @change="changeValue" />
							</view>
						</view>
					</view>
					<view class="Specification"
						style="margin-bottom: 20rpx; background-color: #fff;border-radius: 8rpx;">
						<view class="Specification_title">
							规格
						</view>
						<view>
							<uni-data-checkbox mode="tag" v-model="radio3" :localdata="box_show" selectedColor="#D93038">
							</uni-data-checkbox>
						</view>
					</view>
					<view class="Specification"
						style="margin-bottom: 20rpx; background-color: #fff;border-radius: 8rpx;">
						<view class="Specification_title">
							属性
						</view>
						<view>
							<uni-data-checkbox mode="tag" v-model="radio3" :localdata="box_show" selectedColor="#D93038">
							</uni-data-checkbox>
						</view>
					</view>
				</view>
				<u-gap height="60" bgColor="#f5f5f5"></u-gap>
				<view class="goods-carts">
					<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup"
						@buttonClick="buttonClick" />
				</view>
			</u-popup>
		</template>
		
		<indexHenu :tabAct="1"></indexHenu>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popupScroll: false,
				keyword: '',
				value: '',
				list1: [{
					name: '关注',
				}, {
					name: '推荐',
				}, {
					name: '电影'
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
				list2:[{
					id:0,
					urlimg:'../../static/c1.png',
					child_nick:'外卖1',
				},
				{
					id:1,
					urlimg:'../../static/c1.png',
					child_nick:'外卖2',
				},
				{
					id:2,
					urlimg:'../../static/c1.png',
					child_nick:'外卖3',
				},
				{
					id:3,
					urlimg:'../../static/c1.png',
					child_nick:'外卖4',
				},
				{
					id:4,
					urlimg:'../../static/c1.png',
					child_nick:'外卖5',
				},
				{
					id:5,
					urlimg:'../../static/c1.png',
					child_nick:'外卖6',
				},],
				list3: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],
				radio3: '黑色经典（原味）2盒',
				box_show: [{
						id: 0,
						text: '黑色经典（原味）2盒',
						value: '黑色经典（原味）2盒'
					}, {
						id: 1,
						text: '黑色经典（原味）1盒',
						value: '黑色经典（原味）1盒',
					}, {
						id: 2,
						text: '香辣味',
						value: '香辣味',
					},
					{
						id: 3,
						text: '盲盒口味',
						value: '盲盒口味',
					},
					{
						id: 4,
						text: '好欢螺螺狮粉',
						value: '好欢螺螺狮粉',
					}
				],
				productList: [{
						id: 1,
						name: '好欢螺螺狮粉6包装',
						productListImg: require('../../static/pic_hd@2x.png'),
						discount_card: '30减15',
						Crowdordering_total: '已拼3万件',
						discount_price: '39.9',
						price: '78.8',
				
					},
					{
						id: 2,
						name: '好欢螺螺狮粉6包装',
						productListImg: require('../../static/pic_hd@2x.png'),
						discount_card: '30减15',
						Crowdordering_total: '已拼3万件',
						discount_price: '39.9',
						price: '78.8',
				
					},
					{
						id: 3,
						name: '好欢螺螺狮粉6包装',
						productListImg: require('../../static/pic_hd@2x.png'),
						discount_card: '30减15',
						Crowdordering_total: '已拼3万件',
						discount_price: '39.9',
						price: '78.8',
				
					}
				],
				showAddcar:false,
				options: [],
				buttonGroup: [{
					text: '确认',
					backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
					color: '#fff'
				}],
			};
		},
		methods: {
			test(){
				uni.request({
					url:"xiaou.tenghuiwangxiao.com/api/shop/shopHome",
					method:'POST',
					data:{
						school_id:-1,
						type:9,
					}
				})	
			},
			// 导航搜索
			Onfocus(){},
			//二级菜单跳转
			toClassDetails(item){
				uni.navigateTo({
					url: `/pages/ClassificationDetails/ClassificationDetails?nick=${item.child_nick}`,
				});
			},
			toshopDetails(item){
				// console.log(item);
				uni.navigateTo({
					url: `/pages/shopDetails/shopDetails`,
				});
			},
			Onfocus() {
				uni.navigateTo({
					// url: '/pages/Search/Search',
					url:'/test/test/test'
				});
			},
			//添加购物车
			add_car() {
				this.showAddcar = true
			},
			open() {
				// this.popupScroll = true
			},
			close() {
				this.showAddcar = false
				// this.popupScroll = false
			},
		}
	}
</script>

<style lang="scss">
	.popupScroll {
		overflow: hidden;
		position: fixed;
	}
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 80rpx;
		background: linear-gradient(313deg, #d62e36 6%, #ec434b);
		padding: 20rpx;
		z-index: 999;
	}

	.nav_header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.nav_img {
		width: 176rpx;
		height: 44rpx;
		margin-right: 20rpx;
	}

	.nav_search {
		width: 326rpx;
		height: 60rpx;
		background: #ffffff;
		border-radius: 34rpx;
		padding: 2rpx;
		text-align: center;
		color: #909399;
	}

	.Swiper_contect {
		padding: 20rpx;
	}

	.child_meau {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		margin-top: 20rpx;
		border-radius: 16rpx;
		background-color: #ffffff;
	}

	.child_meau_show {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.child_meau_ico {
		width: 80rpx;
		height: 80rpx;
	}

	.child_meau_nice {
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
		font-size: 24rpx;
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
	}
	.Order_title {
		text-align: center;
		font-weight: 700;
		font-size: 32rpx;
		color: #202020;
		margin-top: 40rpx;
		margin-bottom: 30rpx;
	}
	.Order_content_Show {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 220rpx;
		background: #ffffff;
		border-radius: 16rpx;
		padding: 24rpx;
		margin-bottom: 20rpx;
	}
	
	.Order_shopping_img {
		width: 148rpx;
		height: 148rpx;
		border-radius: 8rpx;
	}
	
	.Order_content_text {
		width: 75%;
		height: 148rpx;
	}
	
	.Order_price {
		display: flex;
		align-items: center;
	
	}
	
	.Order_price_before {
		color: #d93038;
		font-size: 24rpx;
	}
	
	.Order_price_ico {
		color: #d93038;
		font-size: 24rpx;
		font-weight: 700;
	}
	
	.Order_price_text {
		color: #d93038;
		font-size: 32rpx;
		font-weight: 700;
	}
	
	.Order_price_text2 {
		font-size: 24rpx;
		color: #8e8f8e;
		text-decoration: line-through;
	}
	
	.Order_choose {
		height: 88rpx;
		font-size: 24rpx;
		text-align: left;
		color: #202020;
	}
	
	.Order_num {
		display: flex;
		justify-content: flex-end;
		margin-top: 8rpx;
	}
	
	.Order_num_contect {
		display: flex;
		align-items: center;
	}
	
	.Order_num_del {
		width: 40rpx;
		height: 40rpx;
		line-height: 36rpx;
		text-align: center;
		border: 2rpx solid #d4d4d4;
		border-radius: 8rpx;
	}
	
	.Order_num_total {
		min-width: 40rpx;
		text-align: center;
		font-size: 32rpx;
		color: #202020;
	}
	
	.Order_num_add {
		width: 40rpx;
		height: 40rpx;
		line-height: 36rpx;
		text-align: center;
		color: #fff;
		border: 2rpx solid #d4d4d4;
		border-radius: 8rpx;
		background: linear-gradient(313deg, #d62e36, #ec434b);
	}
</style>
