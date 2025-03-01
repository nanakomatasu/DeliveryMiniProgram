<template>
	<view class="p-t-25 p-l-25 p-r-25">
		<view class="spread">
			<view class="f-32">
				商家执照信息公示
			</view>

			<view class="flex-about m-t-25">
				<image class="img" :src="picture" mode=""></image>
				<!-- <image class="img" src="../../static/c2.png" mode=""></image> -->
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				picture: '' //营业执照
			}
		},
		onLoad(item) {
			console.log(item);
			this.picture = JSON.parse(item.business)
		},
		methods: {

		}
	}
</script>

<style>
	.spread {
		padding: 20rpx;
		background: #fff;
		border-radius: 8rpx;
	}

	.img {
		width: 324rpx;
		height: 236rpx;
	}


	/* .spread{
	    width: 324rpx;
	    height: 236rpx;
			background-color: red;
} */
</style>
