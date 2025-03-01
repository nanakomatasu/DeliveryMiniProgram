<template>
	<view class="">
		<nav-head></nav-head>
		<view class="body">
			<view class="top-tab">
				<u-tabs :list="topTabList" @click="tabsChange" keyName="label" lineWidth="10" lineColor="#D62E36"
					:activeStyle="{
            color: '#202020',
            fontWeight: 'bold',
            transform: 'scale(1.05)'
        }" itemStyle="padding-left: 46rpx; padding-right:46rpx; height: 72rpx;" scrollable></u-tabs>
			</view>
			<view class="wrap">
				<view class="order" v-for="item of orderList" :key="item.id" @click="toOrderDetail(item.id)">
					<order-item class="order-item" :status="activeName" :item="item"></order-item>
				</view>
				<view class="bottom-tips">数据加载完成！</view>
			</view>
		</view>
		<!-- 底部导航 -->
		<view class="tabbar">
			<u-tabbar :value="activeName" @change="tabbarChange" :fixed="false" :placeholder="false"
				activeColor="#D93038" :safeAreaInsetBottom="false">
				<u-tabbar-item text="校U优选" name="shop">
					<image class="u-page__item__slot-icon" slot="active-icon"
						src="@/static/img/icon-act02.png"></image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" src="@/static/img/icon02.png">
					</image>
				</u-tabbar-item>
				<u-tabbar-item text="订单" name="order">
					<image class="u-page__item__slot-icon" slot="active-icon"
						src="@/static/img/ico_dingdan_sel@2x.png"></image>
					<image class="u-page__item__slot-icon" slot="inactive-icon"
						src="@/static/img/ico_dingdan_nor@2x.png"></image>
				</u-tabbar-item>
				<u-tabbar-item text="我的" name="my">
					<image class="u-page__item__slot-icon" slot="active-icon"
						src="@/static/img/icon-act04.png"></image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" src="@/static/img/icon04.png">
					</image>
				</u-tabbar-item>
			</u-tabbar>
		</view>
		<view class="scan" @click="toCheckOrderPage">
			<image src="@/static/img/ico_saoyisao@2x.png"></image>
		</view>
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'order',
				topTabList: [{
						id: 1,
						label: '待提货'
					},
					{
						id: 2,
						label: '已提货'
					},
					{
						id: 3,
						label: '退款售后'
					},
					{
						id: 0,
						label: '全部'
					}
				],
				locationId: '',
				userInfo: {},
				status: '',
				pick_status: 1,
				page: 1,
				orderList: []
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo')
			this.locationId = uni.getStorageSync('default_location')
			if (!this.locationId) {
				this.$nextTick(() => {
					this.$refs.uNotify.error('请先选择默认自提点')
				})
				return
			}
			this.getOrderList()
		},
		methods: {
			toCheckOrderPage() {
				uni.navigateTo({
					url: "/pagesUser/page/group/checkOutOrder/checkOutOrder"
				})
			},
			tabbarChange(e) {
				if (e === 'order') {
					uni.navigateTo({
						url: '/pagesUser/page/group/order/order'
					})
				}
				if (e === 'shop') {
					uni.navigateTo({
						url: '/pagesUser/page/group/My/My'
					})
				}
				if (e === 'my') {
					uni.navigateTo({
						url: '/pagesUser/page/group/group'
					})
				}
			},
			async getOrderList() {
				const data = {
					userId: this.userInfo.id,
					pick_up_location_id: this.locationId,
					page: this.page,
					num: 10
				}
				if (this.status) {
					data.status = this.status
				}
				if (this.pick_status) {
					data.pick_status = this.pick_status
				}
				const res = await this.$http.get('/api/user/listOrdersForGrouper', data)
				if (res.code == 200) {
					this.orderList = [...res.data.list, ...this.orderList]
				} else {
					this.$refs.uNotify.error(res.message)
				}
			},
			tabsChange(e) {
				switch (e.id) {
					case 0:
						this.status = ''
						this.pick_status = ''
						this.page = 1
						this.orderList = []
						this.getOrderList()
						break
					case 1:
						this.status = ''
						this.pick_status = 1
						this.page = 1
						this.orderList = []
						this.getOrderList()
						break
					case 2:
						this.status = ''
						this.pick_status = 2
						this.page = 1
						this.orderList = []
						this.getOrderList()
						break
					case 3:
						this.status = 7
						this.pick_status = ''
						this.page = 1
						this.orderList = []
						this.getOrderList()
						break
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.u-page__item__slot-icon {
		width: 48rpx;
		height: 48rpx;
	}

	.body {
		.top-tab {
			background: #ffffff;
			padding-bottom: 24rpx;
		}

		.wrap {
			margin-top: 20rpx;
			box-sizing: border-box;
			padding: 0 20rpx;

			.cancel-btn {
				display: flex;
				font-size: 24rpx;
				margin-bottom: 24rpx;

				.active {
					background: linear-gradient(313deg, #d62e36 6%, #ec434b);
					color: #ffffff;
				}
			}

			.order {
				box-sizing: border-box;
				background: #ffffff;
				border-radius: 16rpx;
				padding: 24rpx;
				margin-bottom: 30rpx;

				.order-item {
					// margin-bottom: 30rpx;
				}
			}

			.bottom-tips {
				text-align: center;
				padding-bottom: 20rpx;
				color: #888888;
				font-size: 28rpx;
			}
		}


	}

	.scan {
		width: 108rpx;
		height: 108rpx;
		background: linear-gradient(313deg, #d62e36 6%, #ec434b);
		border-radius: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		right: 20rpx;
		bottom: 148rpx;

		image {
			width: 44rpx;
			height: 44rpx;
		}
	}
</style>
