<template>
	<view class="pl24 pr24 box-size">
		<view class="mt22 bg-white-ff cont24 radio-16 dis-flex flex-y-center" v-for="(item,index) in shopList"
			:key="index" @click="toStoreHome(item)">
			<image class="wh148 radio-8 mr24" :src="item.logo"></image>
			<view class="" style="width: 100%;" @click="toStoreHome">
				<view class="w-75 dis-flex   right flex-about">
					<view class="f-32 f-b col-gray-33 onelist-hidden w-100 flex-about caoshus">
						{{item.name}}
					</view>
				</view>
				<view class="">
					关注时间：{{item.date}}
				</view>
			</view>


		</view>

		<view class="m-t-60" v-if="shopList.length==0">
			<view class="flex-center">
				<image class="zanwu " src="/pagesUser/static/zanwu.png"></image>
			</view>
			<view class="flex-center">
				暂无收藏
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				// status: "loadmore",
				shopList: [],


			};
		},
		onReachBottom() {},
		onLoad() {

			this.getlistFollowShop()
		},
		methods: {
			//获取关注店铺列表
			getlistFollowShop() {
				const data = {
					userId: uni.getStorageSync('userInfo').id
				}
				this.$http.post('/api/user/listFollowShop', data)
					.then(res => {
						if (res.code == 200) {
							this.shopList = res.data.list
						}
					})
			},
			toStoreHome(item) {
				uni.navigateTo({
					url: `/pagesOptimization/pages/storehome/storehome?shopid=${item.shop_id}`
				})
			},
		},

	}
</script>

<style lang="scss">
	.right {
		height: 148rpx;
	}

	.label {
		height: 28rpx;
		line-height: 28rpx;
	}

	.zanwu {
		width: 304rpx;
		height: 304rpx;
	}
</style>
