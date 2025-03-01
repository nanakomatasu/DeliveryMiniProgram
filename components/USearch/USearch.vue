<template>
	<view class=" head-top m-t-20" :style="{background: st.backgroundcolor}">
		<!-- 搜索栏 -->
		<view class="flex flex-jus-spa flex-al-c">
			<view @click.stop="goSearch" style="flex: 1;">
				<!-- :style="
					{border: `2px solid st.borderColor`}" -->
				<u-search :clearabled="false" :placeholder="placeholder.placeholder" bgColor="transparent"
					searchIconColor="#000" @custom="goSearch" color="#000" height="64rpx" placeholderColor="#909399"
					:show-action="true" :actionStyle="actionStyle" :inputStyle="{}"
					:style="{border:  `4rpx solid ${st.borderColor}`}">
				</u-search>
			</view>

			<!-- #ifdef APP-PLUS -->
			<view class="wh-44 m-l-32" @tap="scanCode">
				<image class="wh-44" src="@/static/img/ico-saoyisao.png" mode=""></image>
			</view>
			<!-- #endif -->
			<view class="wh-44 m-l-40" @tap="scanCode">
				<image class="wh-44" src="@/static/img/ico-kefu.png" mode=""></image>
			</view>
		</view>
		<!-- 热搜 -->
		<view class=" scroll-search f-24  col-gray-90 ml8 mt16 dis-flex ">
			<!-- 			<view class="mr15 h-40">热搜:</view>
			<swiper class="h-40" style="width: 90%;align-items: center;" circular :vertical="true"
				:indicator-dots="false" :autoplay="true" :interval="2500" :duration="2500">
				<swiper-item v-for="(item1,index1) in hotText" :key="index1" :vertical="true">
					<text class="padd-12 f-26" v-for="(item2, index2) in item1" :key="index2"
						@click="choseKeyword(item2)">{{ item2 }} </text>
				</swiper-item>
			</swiper> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: "USearch",
		props: {
			placeholder: {
				type: Object,
				placeholder: '请输入关键字'
			},
			st: {
				type: Object,
				default: function() {
					return {
						background: '#F6F6F6',
						// column: '1',
						// display: 'list'
					}
				}
			}
		},
		data() {
			return {
				bgColor: 'linear-gradient(313deg, #D62E36 0%, #EC434B 100%)', //导航条背景颜色
				actionStyle: {
					width: ' 104rpx',
					height: '64rpx',
					background: this.st.btnColor,
					borderRadius: '40rpx',
					textAlign: 'center',
					lineHeight: '64rpx',
					color: this.st.btnfontColor,
					boxSize: 'border-box',
					fontSize: '24rpx',
					paddingLeft: '4rpx',
				},
			};
		},
		methods: {
			scanCode() {
				console.log('扫码')
				console.log(this.st, 'sss')
			},
			goSearch() {
				uni.navigateTo({
					url: '/pagesOptimization/pages/Search/Search'
				})
			},
		}

	}
</script>

<style>
	.head-top {
		background: #f7f7f7;
		/* border-radius: 24rpx 24rpx 0 0; */
		z-index: 2;
		padding-top: 22rpx;
	}

	.u-search {
		height: 64rpx;
		border-radius: 34rpx;
		/* border: 4rpx solid #d93139; */
		box-sizing: border-box;

	}
</style>
