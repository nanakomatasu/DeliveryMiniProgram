export default {
	data() {
		return {}
	},
	onShareAppMessage() {
		return {
			title: "分分钟校园送",
			path: "/pages/index/index",
			imageUrl: "https: //api.yzgl.top/h5/static/favicon.png",
			success() {
				console.log('分享成功')
			},
		}
	},
	onShareTimeline() {
		return {
			title: "分分钟校园送",
			path: "/pages/index/index",
			imageUrl: "https://api.yzgl.top/h5/static/favicon.png",
			success() {
				console.log('分享成功')
			},
		}
	}
}