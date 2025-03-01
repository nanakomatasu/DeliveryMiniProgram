<template>
	<view>
		<!-- 导航栏 -->
		<u-navbar :bgColor="bgColor" :title="title" :safeAreaInsetTop="true" :placeholder="true" fixed :autoBack="true">
		</u-navbar>
		<view class="dis-flex mt8 flex-y-center ml30 pl26">
			<view class="f-40 f-b mr8">
				<text class="mr16">开通会员</text>
				<text class="mr8">预计可省</text>
				<text class="col-red-ff2a f-40 f-b mr8">{{news.coupon_money*news.coupon_stock}}元</text>
				<text class="f-28">/月</text>
			</view>
			<image class="vip-icon" src="/pagesIndex/static/vip-icon.png"></image>
		</view>
		<view class="pl24 pr24 box-size">
			<view class="bg-white-ff content radio-16 pl32 pr30">
				<view class="dis-flex flex-y-center flex-x-between mb40">
					<view class="f-32 f-b ">每月享<text class="col-red-d9">{{news.coupon_stock}}</text>张红包 价值<text
							class="col-red-d9">{{news.coupon_money*news.coupon_stock}}</text>元</view>
					<view class="dis-flex flex-y-center"
						@tap="onLink('/pagesUser/page/setting/agreementDetail/agreementDetail?title=权益说明&name=vip')">
						<view class="col-gray-88 mr5">权益说明</view>
						<u-icon name="question-circle" color="#888888" size="28rpx"></u-icon>
					</view>
				</view>
				<scroll-view scroll-y="true" class="dis-flex flex-y-center  flex-wrap">
					<view class="red-back-item  p-r" v-for="(item,index) in  Number.parseInt(news.coupon_stock)"
						:key="index">
						<image class="vip-back" src="/pagesIndex/static/vip-back.png"></image>
						<view class="dis-flex w-100 vip-text flex-y-center col-red-d9 flex-x-center flex-dir-column">
							<view class="t-b f-48"><text class="f-32">¥</text>{{news.coupon_money}}</view>
							<view class="f-22">无门槛</view>
							<view class="f-22 c-FD m-t-20">{{news.coupon_name}}</view>
						</view>
					</view>
				</scroll-view>
				<view class="t-c dis-flex btn flex-y-center flex-x-center w-100 f-32 f-b col-brank-20" @tap="show=true"
					v-if="news.is_vip==0">
					<text>¥</text>
					<text class="f-48 ml4 mr4">{{news.money}}</text>
					元立即开通
				</view>

				<!-- <view class="t-c dis-flex btn flex-y-center flex-x-center w-100 f-32 f-b col-brank-20" @tap="show=true"
					v-if="news.is_vip==1">
					<text>¥</text>
					<text class="f-48 ml4 mr4">{{news.money}}</text>
					元立即续费
				</view> -->
				<view class="t-c dis-flex btn flex-y-center flex-x-center w-100 f-32 f-b col-brank-20"
					v-if="news.is_vip==1">
					已经是会员啦
				</view>
			</view>
		</view>

		<u-popup :show="show" mode="bottom" @close="show=false" :round="10">
			<view class="contents">
				<text class="flex-center"> {{news.is_vip==0?'是否开通会员':'是否续费会员'}}</text>
				<view class="t-c dis-flex btn flex-y-center flex-x-center w-100 f-32 f-b col-brank-20 m-t-50"
					@tap="clear" v-if="news.is_vip==0">
					{{news.is_vip==0?'立即开通':'立即续费'}}
				</view>
			</view>
		</u-popup>

		<!-- 导航菜单栏 -->
		<takeMenu v-if="!isUser" :tabAct="1"></takeMenu>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				isUser: false, //是否是从个人中心进来的 个人中心进来的不能展示底部导航栏
				bgColor: "rgba(0,0,0,0)",
				title: "",
				news: {},
			};
		},
		onLoad(e) {

			this.isUser = e.isUser || false
			this.getStorelabelIndex()
		},
		methods: {
			onLink(url) {
				uni.navigateTo({
					url: url
				})
			},
			//开通会员
			async clear() {
				var that = this
				const {
					data,
					status
				} = await that.$api.substance({
					origin: 2,
				})
				if (status == 200) {
					uni.navigateTo({
						url: '/pagesIndex/page/campusTakeout/vipCenter/vipOrder/vipOrder?id=' + data
					});
				}
			},



			//会员卡开通信息
			async getStorelabelIndex() {
				var that = this
				const {
					data,
					status
				} = await that.$api.vipmessage()
				if (status == 200) {
					this.news = data
				}
			},


		}
	}
</script>

<style lang="scss">
	page {
		height: 100vh;
		background: linear-gradient(117deg, #FEE883 0%, #FEC321 100%) !important;
	}

	.vip-icon {
		width: 199rpx;
		height: 161rpx;
	}

	.content {
		height: 67vh;
		padding-top: 42rpx;
		padding-bottom: 61rpx;
		box-sizing: border-box;
		margin-top: -20rpx;
		position: relative;
		z-index: 11;
	}

	.red-back-item {
		width: 200rpx;
		height: 174rpx;
		margin-right: 20rpx;
		margin-bottom: 40rpx;
		padding-top: 5rpx;
		box-sizing: border-box;
		display: inline-block;
	}

	.vip-back {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.red-back-item:nth-child(3n) {
		margin-right: 0;
	}

	.vip-text {
		position: relative;
		z-index: 22;
	}

	scroll-view {
		height: 45vh;
	}

	.btn {
		background: linear-gradient(117deg, #FEE883 0%, #FEC321 100%);
		height: 96rpx;
		line-height: 96rpx;
		border-radius: 60rpx;
	}

	.contents {
		padding: 25rpx;
		height: 200rpx;
	}
</style>