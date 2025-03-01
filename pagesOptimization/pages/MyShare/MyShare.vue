<template>
	<view style="padding: 20rpx;">
		<view class="nav" v-for="item in ShareLists" :key="item.id">
			<view class="nav_show">
				<view class="nav_left">
					<image src="../shopDetails/static/ico_dingwei_cai@2x.png" mode="" class="nva_img"></image>
					<view style="margin: 0 20rpx;color: #202020;font-size: 32rpx;font-weight: 600;">
						{{item.name}}
					</view>
					<view class="" style="color: #888888;">
						{{item.phone}}
					</view>
				</view>
				<view class="" style="color: #888888;">
					{{item.submit_time}}
				</view>
			</view>
			<view class="share_content" v-for="item2 in item.goodsList">
				<image :src="item2.picture" mode="" class="goods_img"></image>
				<view class="" style="flex: 1;">
					<view class="share_content_head">
						<view class="" style="color: #202020; font-size: 28rpx;font-weight: 600;">
							{{item2.goods_name}}
						</view>
						<view class="">
							¥{{item.buy_type==1?item2.goods_price:item2.group_buy_price}}
						</view>
					</view>
					<view class="share_content_head" style="margin-top: 64rpx;">
						<!-- 						<view class="" style="color: #888888; font-size: 24rpx;">
							黑色经典（原味）2盒
						</view> -->
						<view class="child_type">
							<view class="child_type_style" v-for="item3 in item2.styles">
								{{item3.name}}
							</view>
						</view>
						<view class="" style="color: #888888; font-size: 24rpx;">
							共{{item2.num}}件
						</view>
					</view>

				</view>
			</view>
			<view class="brokerage">
				<view class="" style="margin-right: 24rpx;color: #888888;">
					佣金
				</view>
				<view class="" style="color: #D93038;">
					¥
				</view>
				<view class="" style="color: #D93038;font-size: 36rpx;font-weight: 600;">
					{{item.commission}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ShareLists: [], //分享列表
			}
		},
		onShow() {
			this.getShareOrderLists()
		},
		methods: {
			// /api/user/listShareOrders
			//获取分享订单列表
			getShareOrderLists() {
				const data = {
					userId: uni.getStorageSync('userInfo').id,
					page: 1,
					num: 10000,
				}
				this.$http.post('/api/user/listShareOrders', data)
					.then(res => {
						if (res.code == 200) {
							this.ShareLists = res.data.list
							this.ShareLists.forEach(item => {
								item.goodsList.forEach(item2 => {
									item2.styles = JSON.parse(item2.styles)
								})
							})
						}
					})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		padding: 20rpx;
		background-color: #fff;
		border-radius: 24rpx;
		margin-top: 20rpx;
	}

	.nav_show {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.nav_left {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.nva_img {
		width: 48rpx;
		height: 48rpx;
	}

	.share_content {
		display: flex;
		justify-content: flex-start;
		margin-top: 24rpx;
	}

	.share_content_head {
		flex: 1;
		display: flex;
		justify-content: space-between;
	}

	.goods_img {
		width: 148rpx;
		height: 148rpx;
		margin-right: 24rpx;
	}

	.brokerage {
		display: flex;
		justify-content: flex-end;
		align-items: baseline;
	}

	.child_type {
		display: flex;
		font-size: 12px;
		color: #8e8f8e;
	}

	.child_type_style {
		padding: 10rpx 10rpx 10rpx 0;
	}
</style>
