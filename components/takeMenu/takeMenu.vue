<template>
	<view>
		<view class="tabbar">
			<!-- 外卖的自定义菜单栏 -->


			<u-tabbar :value="actTabbar" @change="changeTab" :fixed="true" :placeholder="true" activeColor="#FF6201"
				:border="false" :safeAreaInsetBottom="true">
				<u-tabbar-item :text="item.name" v-for="(item,index) in tabList" :key="index" @click="click">

					<image class="wh48" slot="active-icon" :src="item.actIcon"></image>
					<image class="wh48" slot="inactive-icon" :src="item.icon"></image>

				</u-tabbar-item>
			</u-tabbar>

			<view class="more" v-if="moreShow">
				<view class="t-c f-24 " style="padding-top: 5rpx;padding-bottom: 5rpx;" :class="index==1?'first':''"
					v-for="(item,index) in more" :key="index" @tap="onLink(item.url)">{{item.name}}
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		name: "takeMenu",
		props: {
			tabAct: {
				tpye: false,
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				moreShow: false, //是否显示更多的弹窗
				more: [{
					name: "红包卡券",
					url: "/pagesUser/page/couponList/couponList",
				}, {
					name: "我的收藏",
					url: "/pagesUser/page/case/case",
				}, {
					name: "管理地址",
					url: "/pagesUser/page/addressList/addressList",
				}],
				actTabbar: 0,
				tabList: [{
					name: "首页",
					icon: "/static/img/tab-icon01.png",
					actIcon: "/static/img/tab-icon-act01.png",
					path: "/pagesIndex/page/campusTakeout/index/index"
				}, {
					name: "会员",
					icon: "/pagesIndex/static/tab-icon02.png",
					actIcon: "/pagesIndex/static/tab-icon-act02.png",
					path: "/pagesIndex/page/campusTakeout/vipCenter/vipCenter"
				}, {
					name: "订单",
					icon: "/pagesIndex/static/tab-icon03.png",
					actIcon: "/pagesIndex/static/tab-icon-act03.png",
					path: "/pagesIndex/page/campusTakeout/order/order"
				}, {
					name: "更多",
					actIcon: "/static/img/tab-icon04.png",
					icon: "/static/img/tab-icon-act04.png",
					path: "/pagesIndex/page/campusTakeout/order/order?status=1"
				}]

			};
		},
		watch: {
			tabAct: {
				handler(newVal, oldVal) {
					this.actTabbar = newVal
				},
				immediate: true,
			}
		},
		methods: {
			changeTab(index) {
				this.actTabbar = index
				if (index != 3) {
					uni.redirectTo({
						url: this.tabList[index].path
					})
				}
			},

			click(index) {
				if (index === 3) {
					this.moreShow = 1 == 1 ? (!this.moreShow) : true
				}
			},

			//跳转链接
			onLink(url) {
				uni.navigateTo({
					url: url
				})
			},

		}

	}
</script>

<style scoped>
	::v-deep .u-tabbar__content {
		box-sizing: border-box;
		height: 120rpx;
		background: #FEFFFE;
		box-shadow: 0rpx -4rpx 20rpx 0rpx rgba(0, 0, 0, 0.04);
	}

	::v-deep .u-tabbar__content__item-wrapper {
		box-sizing: border-box;
		height: 120rpx;
		background: #FEFFFE;
		box-shadow: 0rpx -4rpx 20rpx 0rpx rgba(0, 0, 0, 0.04);
	}

	.smis {
		position: fixed;
		left: 10rpx;
		top: 10rpx;
	}

	.more {
		padding-left: 20rpx;
		padding-right: 20rpx;
		position: fixed;
		bottom: 125rpx;
		left: 585rpx;
		z-index: 9999;
		background-color: #ffffff;
		border-radius: 16rpx;
	}

	.first {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}
</style>