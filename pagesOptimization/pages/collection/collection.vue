<template>
	<view style="padding: 20rpx;">
		<view class="collection_list" v-for="(item,index) in CollectList">
			<image :src="item.picture" mode="" class="collection_img"></image>
			<view class="collection_content" @click="toClassDetail(item)">
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
						<image src="../../static/ico_jiagouwuche@2x.png" mode="" class="Carico"></image>
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
				CollectList: [], //收藏列表
			};
		},
		onShow() {
			this.getCollectList()
		},
		methods: {
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
