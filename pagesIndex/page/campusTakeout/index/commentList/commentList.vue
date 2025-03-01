<template>
	<view style="background-color: #fff;height: 100%;">
		<view class="" style="padding: 20px;">
			<commentItem :list="commentList" :commentTab="commentTab" @changeCommentTab="changeCommentTab">
			</commentItem>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentList: [],
				commentTabAct: 0, //选中的评论类型id
				commentTab: [{ //评价类型
					name: "全部",
					id: 0,
					num: 0,
				}, {
					name: "最新",
					id: 1,
					num: 0,
				}, {
					name: "好评",
					id: 2,
					num: 0
				}, {
					name: "差评",
					id: 3,
					num: 0
				}],
				id: '',
			};
		},

		onLoad(e) {
			this.id = e.id
			console.log(e)
			this.getOrderCommentList()
		},
		methods: {
			changeCommentTab(id) {
				console.log(id)
				this.commentTabAct = id
				this.getOrderCommentList()
			},
			//获取商家商品列表
			async getOrderCommentList(isPage) {
				uni.showLoading({
					title: "正在加载中"
				})
				let that = this
				if (isPage) {
					this.page = this.page + 1
					that.status = "loading"
				} else {
					this.page = 1
					this.commentList = []
					this.status = 'loadmore'
				}
				var commentList = this.commentList;
				const {
					data,
					status
				} = await that.$api.orderCommentList({
					store_id: this.id,
					order_type: 1, //1外卖，2附近，3优选
					limit: 10,
					page: this.page,
					type: this.commentTabAct, //评论类型 0全部，1最新，2好评，3差评
				})
				uni.hideLoading()
				if (status == 200) {
					if (data.total_count > 0) {
						commentList = commentList.concat(data.list.data)
						that.commentList = commentList
					}

				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #fff !important;
	}
</style>