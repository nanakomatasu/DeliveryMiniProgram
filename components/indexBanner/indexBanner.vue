<template>
	<view class="padd-0-24">
		<u-swiper indicatorMode="dot" keyName="imgUrl" @click="clickSwiper" :list="swiperList" height="240rpx"
			radius="8rpx" :indicator="true" :interval="interval" >
		</u-swiper>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		name:"indexBanner",
		props: {
			swiperList: {
				type: Array,
				default: function() {
					return []
				}
			},
			interval: {
				type: String,
				default: '3000'
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			clickSwiper(index) {
				console.log(index)
				app.navTo(this.swiperList[index].linkUrl)
				//this.$emit('clickSwiper', index);
			}
		}
	}
</script>

<style>

</style>