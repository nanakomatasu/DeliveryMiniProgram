<template>
	<view>
		<view class="padd-0-24">
			<view class="flex-al-c box1 m-t-20">
				<view class="">
					<image class="wh-128 bor-r-10" src="../../../static/favicon.png" mode=""></image>
				</view>
				<view class="m-l-36">
					<view class="f-32 color-20 fw-700">
						{{main.super_topic_name}}
					</view>
					<view class="flex-al-c m-t-36 f-28 color-888">
						<view class="">
							<text>帖子数：</text>
							<text>{{main.post_num}}</text>
						</view>
						<view class="m-l-40">
							<text>粉丝数：</text>
							<text>{{main.fans_num}}</text>
						</view>
					</view>
				</view>
			</view>
			<circleList :postList="postList" @like="likes" @attention="attentionBtn" @transmit="transmitBtn"></circleList>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				main: {},
				postList: [],
			}
		},
		onLoad(id) {
			this.id = id.id
			this.PostcirclesuperTopicInfo()
			this.circlepostsList()
			console.log('123-----------', this.id);
		
		},
		methods: {
			// 朋友圈喜欢
			likes(item) {
				console.log(item,'喜欢状态奥奥奥')
				this.GetcirclepostsLike(item.id,item.is_like)
			},
			attentionBtn(item) {
				this.GetcircleFollow(item.id,item.is_follow)
				console.log(item,'关注状态奥奥奥')
			},
			transmitBtn(item) {
					console.log(item.id,'转发状态奥奥奥')
				// uni.navigateTo({
				// 	url: '/campuscircle/index/transmit/transmit?id=' + id
				// })
			
			},
			// 超话详情
			async PostcirclesuperTopicInfo() {
				var that = this
				const result = await that.$api.circlesuperTopicInfo({
					topic_id: this.id
				})
				if (result.status) {
					this.main = result.data
				}
			},

			// 帖子列表
			async circlepostsList() {
				var that = this
				const result = await that.$api.circlepostsList({
					super_topic_id: this.id
				})
				if (result.status == 200) {
					this.postList = result.data.data
					this.postList.forEach((item, index) => {
						if (item.pics) {
							this.postList[index].pics = item.pics.split(',')
						}
					})
				}
			},
			// 点赞,取消点赞接口
			async GetcirclepostsLike(id, is_like) {
				var that = this
				const result = await that.$api.circlepostsLike({
					post_id: id
				})
				console.log(id, '123id奥奥奥');
				if (result.status == 200) {
					if (is_like == 1) {
						this.$u.toast("取消点赞")
					} else if (is_like != 1) {
						this.$u.toast("👍赞一个~")
					}
					this.circlepostsList()
				}
			},
			
			// 关注接口
			async GetcircleFollow(id,is_follow) {
				var that = this
				const result = await that.$api.circleFollow({
					follow_id: id
				})
				if (result.status == 200) {
					if(is_follow == 1) {
						this.$u.toast("取消成功")
					}else if (is_follow != 1) {
						this.$u.toast("关注成功")
					}
					this.circlepostsList()
				}
			},
			

		}
	}
</script>

<style>
	.box1 {
		box-sizing: border-box;
		padding: 24rpx;
		background-color: #fff;
		border-radius: 16rpx;
	}
</style>
