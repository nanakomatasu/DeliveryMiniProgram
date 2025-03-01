<template>
	<view>
		<view class="tabbar">
			<!-- 外卖的自定义菜单栏 -->
			<u-tabbar :value="actTabbar" @change="changeTab" :fixed="true" :placeholder="true" activeColor="#FF6201"
				:border="false" :safeAreaInsetBottom="true" style="padding-top: 10px;">
				<u-tabbar-item :text="item.name" v-for="(item,index) in tabList" :key="index" @click="click">
					<image class="wh48" slot="active-icon" :src="item.actIcon"></image>
					<image class="wh48" slot="inactive-icon" :src="item.icon"></image>
				</u-tabbar-item>
			</u-tabbar>
		</view>
	</view>
</template>

<script>
	export default {
		name: "indexHenu",
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
				more: '',
				actTabbar: 0,
				tabList: [{
						name: "首页",
						icon: "/static/img/tab-icon01.png",
						actIcon: "/static/img/tab-icon-act01.png",
						path: "/pages/index/index"
					},
					{
						name: "校U优选",
						actIcon: "/static/img/tab-icon02.png",
						icon: "/static/img/tab-icon-act02.png",
						path: "/pages/optimization/optimization"
					},
					{
						name: "校园圈子",
						actIcon: "/static/img/circle.png",
						icon: "/static/img/ashcircle.png",
						path: "/campuscircle/index/index"
					}, 
					{
						name: "购物车",
						actIcon: "/static/img/icon-act03.png",
						icon: "/static/img/icon03.png",
						path: "/pages/cart/cart"
					}, {
						name: "我的",
						actIcon: "/static/img/tab-icon04.png",
						icon: "/static/img/tab-icon-act04.png",
						path: "/pages/user/user"
					}
				]
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
				uni.redirectTo({
					url: this.tabList[index].path
				})
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
</style>