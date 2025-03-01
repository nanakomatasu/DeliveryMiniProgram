<template>
	<view class="dis-flex flex-dir-column flex-x-center flex-y-center null-data">
		<image class="" :src="`${baseImageUrl}resource/img/null-data.png`"></image>
		<view class="f-28 col-gray-88">{{title}}</view>
	</view>
</template>

<script>
	export default {
		name: "null-data",
		props: {
			title: {
				type: String,
				default: "暂无数据"
			}
		},
		data() {
			return {
        baseImageUrl: this.$url
			};
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7 !important;
	}
	.null-data {
		padding: 120rpx 0;
		height: max-content;
	}

	.null-data image {
		width: 304rpx;
		height: 304rpx;

	}
</style>
