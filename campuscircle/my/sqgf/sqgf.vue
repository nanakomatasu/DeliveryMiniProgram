<template>
	<view>
		<view class="box-main" v-html="content">
			<!-- {{content}} -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ''
			}
		},
		onLoad() {
			this.getSqgf()
		},
		methods: {
			
			async getSqgf() {
				let that = this
				const {
					data,
					status
				} = await that.$api.circleConfigGetInfo({
			
				})
				if (status == 200) {
					this.content = data[0].content
				}
			},
			
			
		
		}
	}
</script>

<style>
	.box-main {
		box-sizing: border-box;
		padding: 20rpx;
		/* background-color: #fff; */
	}
</style>
