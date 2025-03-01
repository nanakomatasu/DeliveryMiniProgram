<template>
	<view class="">
		<!-- 搜索栏 -->
		<view class="flex flex-jus-spa flex-al-c " style="padding: 10rpx;" :style="{
						backgroundColor: searchStyle.backgroundcolor}">
			<view @click.stop="goSearch" style="width: 100%;background-color: transparent;margin: 8rpx;">
				<u-search class="u-search" :clearabled="false" :style="{
						borderColor: searchStyle.borderColor}" :borderColor="searchStyle.borderColor" :placeholder="params.placeholder"
					bgColor="white" searchIconColor="#000" @custom="goSearch" color="#000" height="55rpx"
					placeholderColor="#909399" :show-action="true" :actionText="params.btnText" :actionStyle="{
							width: params.btnstatus ==1?  '104rpx' :'0',
							height: params.btnstatus ==1?'60rpx':'0',
							background: searchStyle.btnColor,
							borderRadius: '40rpx',
							textAlign: 'center',
							lineHeight: '60rpx',
							color: searchStyle.btnfontColor,
							boxSize:'border-box',
							fontSize:'24rpx',
							paddingLeft:'-100rpx',
							marginRight:'-2px'
							
						}" :inputStyle="{}"></u-search>
			</view>

			<!-- #ifdef APP-PLUS -->
			<view v-if="params.qrstatus ==1" class="wh-44 m-l-32" @tap="scanCode">
				<image class="wh-44" src="@/static/img/ico-saoyisao.png" mode=""></image>
			</view>
			<!-- #endif -->
			<view v-if="params.kfstatus==1" class="wh-44 m-l-40" @tap="UmobileShow=true">
				<image class="wh-44" src="@/static/img/ico-kefu.png" mode=""></image>
			</view>
		</view>
		<!-- 热搜 -->
		<view v-if="params.needhotkeys == 1" class=" scroll-search f-24  col-gray-90 ml8 mt16 dis-flex "
			@tap.stop="add()">
			<view class="mr15 h-40">热搜:</view>
			<swiper class="h-40" style="width: 90%;align-items: center;" circular :vertical="true"
				:indicator-dots="false" :autoplay="true" :interval="2500" :duration="2500">
				<swiper-item v-for="(item1,index1) in hotText" :key="index1" :vertical="true">
					<text class="padd-12 f-26" v-for="(item2, index2) in item1" :key="index2"
						@click="choseKeyword(item2)">{{ item2 }} </text>
				</swiper-item>
			</swiper>
		</view>


		<u-popup :show="UmobileShow" mode="center" :safeAreaInsetBottom="false" round="32rpx">
			<view class="win-box-mobile  box-size bg-white-ff radio-30">
				<view class="f-32 w-100 t-c f-b">客服电话</view>
				<view class="f-56 t-c f-b f-DINPro mt20">{{Umobile}}</view>
				<view class="dis-flex flex-y-center flex-x-between mt40">
					<view class="btn t-c bg-gray-ef radio-40" @tap="UmobileShow=false">取消</view>
					<view class="btn t-c bg-red-d6-ec col-white-ff radio-40" @tap="callUmobile">立即拨打</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "indexSearch",
		props: {
			placeholder: {
				type: String,
				default: '请输入关键字1'
			},
			hotText: {
				type: Array,
				default: function() {
					return []
				}
			},
			Umobile: {
				type: String,
				default: ''
			},
			params: {
				type: Object,
				default: {

				}
			},
			searchStyle: {
				type: Object,
				default: {

				}
			}
		},
		data() {
			return {
				UmobileShow: false, //校U客服
				bgColor: 'linear-gradient(313deg, #D62E36 0%, #EC434B 100%)', //导航条背景颜色
			};
		},

		onShow() {
			// this.getHotKeywords()	
		},

		methods: {
			//扫码进入堂食
			scanCode() {
				uni.scanCode({
					success(res) {
						console.log(res)
						if (res.result.indexOf('#') != -1 && res.result.indexOf('diningroom') != -1) {
							uni.navigateTo({
								url: res.result.substring(res.result.indexOf('#') + 1)
							})
						}
					}
				})
			},
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			//直接搜索热词
			choseKeyword(keyword) {
				this.keyword = keyword;
				uni.navigateTo({
					url: "../search/searchResult/searchResult?keyword=" + keyword
				})
			},
			callUmobile() {
				uni.makePhoneCall({
					phoneNumber: this.Umobile
				})
			},

			async getHotKeywords() {
				var that = this
				const {
					data,
					status
				} = await that.$api.getHotKeyword({
					cate: 0,
					school_id: uni.getStorageSync('school').id || '',
				})
				if (status == 200) {
					console.log("111")
				}
			},

		}

	}
</script>

<style scoped>
	.head-top {
		/* background: #f7f7f7; */
		border-radius: 24rpx 24rpx 0 0;
		z-index: 2;
		padding-top: 22rpx;
	}

	.u-search {
		height: 64rpx;
		border-radius: 34rpx;
		border: 4rpx solid;
		box-sizing: border-box;
	}


	.btn {
		width: 210rpx;
		height: 64rpx;
		line-height: 64rpx;
	}

	.form-btn {
		width: 320rpx;
		height: 72rpx;
		line-height: 72rpx;
		margin-top: 50rpx;
		font-size: 28rpx;
	}

	.win-box-mobile {
		width: 560rpx;
		height: 328rpx;
		padding: 40rpx 60rpx;

	}
</style>