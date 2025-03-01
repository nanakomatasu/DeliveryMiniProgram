<template>
	<view class="dis-flex flex-dir-column padd-16-34 bgff">
		<commentItem :list="commentList" :commentTab="commentTab"
			@changeCommentTab="changeCommentTab"></commentItem>
		<u-loadmore v-if="commentList.length!=0" color="#888" fontSize="28rpx" :status="status" />
	</view>
</template>

<script>
	import * as callUtil from "@/common/makePhoneCall.js"
	export default {
		data() {
			return {
				page: 1,
				status: "loadmore",
				commTop: 0,
				id: "", //店铺id
				isTabTop: false, //是否显示顶部的切换栏
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
				commentList: [],
				commentTabAct: 0, //选中的评论类型id
				
			}
		},
		onLoad(option) {
			this.id = option.store_id;
		},
		onShow() {
			this.getOrderCommentList(false)
		},
		onReachBottom() {
			this.getOrderCommentList(true)
		},
		
		methods: {
			//评论滚动
			commScroll(e) {
				this.commTop = e.detail.scrollTop //记录评论滚动 滚动到一定距离固定在顶部
			},
			//修改当前选中的评论类型
			changeCommentTab(id) {
				console.log(id)
				this.commentTabAct = id
				this.getOrderCommentList()
			},
			//获取评价列表
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
				const {
					data,
					status
				} = await that.$api.orderCommentList({
					store_id: this.id,
					order_type: 2, //1外卖，2附近，3优选
					limit: 10,
					page: this.page,
					type: this.commentTabAct, //评论类型 0全部，1最新，2好评，3差评
				})
				uni.hideLoading()
				if (status == 200) {
					this.commentTab[0].num = data.total_count
					this.commentTab[2].num = data.hp_count
					this.commentTab[3].num = data.cp_count
					console.log(data)
					if (!data.list.data) {
						that.status = 'nomore'
						return
					}
					that.commentList = that.commentList.concat(data.list.data)
					if(data.total_count <= 10) {
						that.status = 'nomore'
					}
					
				}
			}
		}
	}
</script>

<style>
	
</style>
