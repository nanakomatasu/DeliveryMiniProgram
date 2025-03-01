<template>
	<u-navbar :bgColor="navStyle.titleBackgroundColor" :safeAreaInsetTop="true" :placeholder="true" fixed>
		<view class="color-fff flex-centerd " slot="left">

			<view class="dis-flex flex-y-center" @click="back" v-if="type==1">
				<u-icon name="arrow-left" :color="navStyle.titleTextColor"></u-icon>
				<view class="f-34 f-b  c-FD" :style="{color: navStyle.titleTextColor}">校园外卖</view>
			</view>

			<view class="dis-flex m-l-20" :class="type==1?'w':''" @click="goLocation">
				<image src="@/static/img/ico-dingwei.png" class="wh-30 mr8" mode="">
					<view class="dis-flex">
						<view class="dis-flex flex-y-center mr32">
							<text class="f-24 m-r-4 f-b "
								:style="{color: navStyle.titleTextColor}">{{school.school_name}}</text>
							<image class="wh28" src="@/static/img/ico-zhankai.png" mode=""></image>
						</view>
						<view v-if="navStyle.weatherstatus == 1" class="dis-flex flex-y-center">
							<image class="wh32" :src="weatherImg" mode=""></image>
							<view class="f-24 " :style="{color: navStyle.titleTextColor}">{{weather}}</view>
						</view>
					</view>
			</view>


		</view>
	</u-navbar>
</template>

<script>
	export default {
		name: "indexNav",
		props: {
			navStyle: {
				type: Object,
				default: function() {
					return {
						positionstatus: 0,
						titleBackgroundColor: "#ff0000",
						titleTextColor: "",
						weatherstatus: 0,
					}
				}
			},
			style: {
				type: Object,
				default: function() {
					return {
						background: ""
					}
				}
			},
			school: {
				type: Object,
				default: function() {
					return {
						school_name: '学校名称'
					}
				}
			},
			weather: {
				type: String,
				default: ''
			},
			weatherImg: {
				type: String,
				default: ''
			},
			type: {
				type: Number,
				default: '0'
			}
		},
		data() {
			return {

			};
		},
		methods: {
			//返回
			back() {
				// uni.navigateBack()
				console.log('返回')
				// #ifdef H5
				uni.redirectTo({
					url: '/'
				});
				// #endif
				// #ifdef MP-WEIXIN
				uni.redirectTo({
					url: "/pages/index/index"
				})
				// #endif

			},
			//跳转定位
			goLocation() {
				uni.navigateTo({
					url: '/pagesIndex/page/location/location'
				})
			},
		}
	}
</script>

<style>
	.w {
		width: 242px;
	}
</style>