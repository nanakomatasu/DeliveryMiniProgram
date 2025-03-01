<template>
	<view>
		<movable-area class="movable-area">
			<movable-view class="movable-view" :x="x" :y="y" direction="all">
				<image style="width: 140rpx; height: 140rpx;" :src="homeimg" mode=""></image>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
	export default {
		name: "my-home",
		props: {
			homeimg: {
				type: String,
			},
			x: {
				type: String,
			},
			y: {
				type: String,
			}
		},
		data() {
			return {
				// x: 295, //x坐标
				// y: 480, //y坐标
			};
		}
	}
</script>


<style lang="scss">
	$all_width: 96rpx;
	$all_height:96rpx;

	.movable-area {
		z-index: 1;
		height: 85vh;
		width: 750rpx;
		top: 100;
		position: fixed;
		pointer-events: none; //此处要加，鼠标事件可以渗透

		.movable-view {
			width: $all_width;
			height: $all_height;
			pointer-events: auto; //恢复鼠标事件

			image {
				width: $all_width;
				height: $all_height;
			}
		}
	}
</style>
