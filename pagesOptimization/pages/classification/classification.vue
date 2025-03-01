<template>
	<view>
		<view class="" style="padding: 20rpx;">
			<view class="contectList" v-for="(item,index) in contectList" :key="item.id">
				<view class="classifier">
					{{item.name}}
				</view>
				<view class="classifier_child">
					<view class="child_style" v-for="(item2,index2) in item.child" :key="item2.id"
						@click="toClassDetails(item2)">
						{{item2.name }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopid: null, //店铺ID
				contectList: [], //店铺类目列表
			};
		},
		onLoad(item) {
			this.shopid = item.shopid
			console.log(this.shopid);
		},
		onShow() {
			this.getlistShopCates()
		},
		methods: {
			// 店铺类目列表
			getlistShopCates() {
				const data = {
					shop_id: this.shopid
				}
				this.$http.post('/api/shop/listShopCates', data)
					.then(res => {
						if (res.code == 200) {
							this.contectList = res.data.list
						}
					})
			},
			// 分类详情
			toClassDetails(item) {
				uni.navigateTo({
					url: `/pagesOptimization/pages/ClassificationDetails/ClassificationDetails?name=${item.name}&cate_id=${item.id}&shop_id=${item.shop_id}&type=2`
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.contectList {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 20rpx;
		margin-top: 20rpx;
	}

	.classifier {
		font-size: 32rpx;
		font-weight: 700;
		color: #202020;
	}

	.classifier_child {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin-top: 20rpx;
	}

	.child_style {
		width: 45%;
		text-align: center;
		background: #f7f7f7;
		margin-top: 20rpx;
		padding: 20rpx 0;
		border-radius: 8rpx;

	}

	.child_right {
		width: 45%;
		text-align: center;
		background: #f7f7f7;
		margin-top: 20rpx;
		border-radius: 8rpx;
	}
</style>
