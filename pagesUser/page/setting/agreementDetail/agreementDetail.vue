<template>
	<view>
		<u-parse :content="content"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				name: ""
			};
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title: e.title
			})
			this.name = e.name

		},
		onShow() {
			if (this.name == 'vip') {
				this.vipInfo();
			} else {
				this.getConfigGetInfo()
			}

		},
		methods: {
			async vipInfo() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status
				} = await that.$api.vipInfo({

				})
				uni.hideLoading()
				if (status == 200) {
					this.content = data.introduction

				}
			},
			//获取配置接口
			async getConfigGetInfo() {
				uni.showLoading({
					title: "正在加载中"
				})
				var that = this
				const {
					data,
					status
				} = await that.$api.configGetInfo({
					ident: "agreement"
				})
				uni.hideLoading()
				if (status == 200) {
					this.content = data[this.name]

				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}
</style>