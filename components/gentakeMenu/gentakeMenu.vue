<template>
	<view>
		<view class="tabbar">
			<!-- 外卖的自定义菜单栏 -->


			<u-tabbar :value="actTabbar" @change="changeTab" :fixed="true" :placeholder="true" activeColor="#D93038"
				:border="false" :safeAreaInsetBottom="true">
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
				more:'',
				actTabbar: 0,
				tabList: [{
					name: "首页", 
					actIcon: "/pagesUser/static/tab-icon01.png",
					icon: "/pagesUser/static/tab-icon-act01.png",
					path: "/pagesUser/page/datawall/datawall"
				}, {
					name: "发布",
					actIcon: "/pagesUser/static/tab-icon02.png",
					icon: "/pagesUser/static/tab-icon-act02.png",
					path: "/pagesUser/page/datawall/publish/publish"
				}, {
					name: "订单",
					actIcon: "/pagesUser/static/tab-icon03.png",
					icon: "/pagesUser/static/tab-icon-act03.png",
					path: "/pagesUser/page/datawall/detailorder/detailorder"
				}, {
					name: "我的",
					actIcon: "/pagesUser/static/tab-icon04.png",
					icon: "/pagesUser/static/tab-icon-act04.png",
					path: "/pagesUser/page/datawall/my/my"
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
				console.log(index,"111")

				
					uni.redirectTo({
						url: this.tabList[index].path
					})
				
			},

			click(index) {
				if (index === 3) {
					this.moreShow = 1 == 1 ? (!this.moreShow) : true
				}
				console.log(this.moreShow)
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

<style>
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
		left:585rpx;
		z-index: 9999;
		background-color: #ffffff;
		border-radius: 16rpx;
	}
</style>
