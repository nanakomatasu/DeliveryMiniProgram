<template>
	<view class="p-l-32 p-r-32 p-t-30">
		<view class="flex-about flex-centerd m-b-20" v-for="(item,index) in shopList" :key="index">
			<view class="flex-centerd ">
				<view>
					<image class="img br-50" src="../../static/touxiang.png" mode="" v-if="!item.member.portrait">
					</image>
					<image class="img br-50" :src="item.member.portrait" mode="" v-if="item.member.portrait"></image>
				</view>
				<view class="m-l-15">
					<view>{{item.member.user_name}}</view>
					<view>忘不掉的是回忆，继续的是生活</view>
				</view>
			</view>

			<view class="shelve flex-center" @tap="GetcircleFollow(item.member.id,index)" v-if="item.is_follow==0">关注
			</view>

			<view class="shelvex flex-center" @tap="GetcircleFollow(item.member.id,index)" v-if="item.is_follow==1">已关注
			</view>

		</view>
		<null-data v-if="shopList.length==0"></null-data>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				status: "loadmore",
				shopList: [],
			}
		},

		onShow() {
			this.getMerchantListsx()
		},

		onReachBottom() {
			this.getMerchantLists(true)
		},

		methods: {

			async getMerchantListsx() {
				let that = this
				const {
					data,
					status
				} = await that.$api.circleMyFans({
					limit: 10,
					page: this.page,
				})
				uni.hideLoading()
				if (status == 200) {
					that.shopList = data.data
					if (data.data.length == 0) {
						that.status = 'nomore'
					}
				}
			},

			async getMerchantLists(isPage) {
				let that = this
				this.isLoad = true
				// uni.showLoading({
				// 	title: "正在加载中"
				// })
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
				} = await that.$api.circleMyFans({
					limit: 10,
					page: this.page,
				})
				uni.hideLoading()
				if (status == 200) {
					shopList = shopList.concat(data.data)
					that.shopList = shopList
					if (data.data.length == 0) {
						that.status = 'nomore'
					}
				}
			},

			// 关注接口
			async GetcircleFollow(id, index) {
				var that = this
				const result = await that.$api.circleFollow({
					follow_id: id
				})
				if (result.status == 200) {
					this.getMerchantListsx()
				}
			},

		}
	}
</script>

<style>
	page {
		background: #FFFFFF !important;
	}

	.img {
		width: 80rpx;
		height: 80rpx;
	}

	.shelve {
		width: 128rpx;
		height: 52rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 8rpx;
		color: #FFFFFF;
	}

	.shelvex {
		width: 128rpx;
		height: 52rpx;
		background: #E4E7ED;
		border-radius: 8rpx;
		color: #202020;
	}
</style>
