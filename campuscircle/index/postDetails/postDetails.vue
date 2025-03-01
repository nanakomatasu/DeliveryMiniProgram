<template>
	<view>
		<view class="padd-b-160">
			<view class="padd-0-32">
				<view class="flex-jus-spa flex-al-c">
					<view class="flex">
						<view class="">
							<image class="wh-64 bor-r-100" :src="conter.member.portrait" mode=""></image>
						</view>
						<view class="m-l-22">
							<view class="f-28 color-18 fw-700">{{conter.member.user_name}}</view>
							<view class="f-24 color-7A7B84 m-t-16">
								<view>{{conter.create_time? conter.create_time.substring(0,16) : conter.create_time}}</view>
								<view class="m-t-10">来自{{conter.school.school_name}}</view>
							</view>
						</view>
					</view>
					<view class="flex-al-c" style="margin-top: -20rpx;">
						<view class="attention_user_box" @click="collect(conter.id)">
							<text class="color-7A7B84" v-if="conter.is_collect == 1">已收藏</text>
							<text v-if="conter.is_collect != 1">收藏</text>
						</view>
						<view class=" m-l-20" :class="conter.is_follow == 1 ? 'attention_user_box' : 'attention_user_boxs' " @click="attention_user(conter.member.id)">
							<text class="color-7A7B84" v-if="conter.is_follow == 1">已关注</text>
							<text v-if="conter.is_follow != 1">关注</text>
						</view>
					</view>
				</view>
				<!-- 朋友圈文案 -->
				<view class="f-28 color-18 m-t-24">{{conter.content}}</view>
				<!-- 朋友圈图片 -->
				<view class="m-t-24" v-for="(items,index) in conterImg" :key="index">
					<image class="bor-r-8" style="width: 100%;" mode="aspectFill" @tap="previewImage(index)"
						:src="items"></image>
				</view>
				<!-- 转发 点赞 留言 投币 -->
				<view class="color-7A7B84 f-24 flex flex-jus-spa m-t-24 padd-b-20">
					<view class="flex">
						<view class="flex-al-c" @click="transmit(conter.id)">
							<image class="wh-40" src="@/campuscircle/static/ico_transmit.png" mode=""></image>
							<view class="m-l-8">{{conter.forward_num}}</view>
						</view>
						<view class="flex-al-c m-l-60" @click="like()">
							<image class="wh-40" v-if="conter.is_like==1" src="@/campuscircle/static/ico_likes.png"
								mode=""></image>
							<image class="wh-40" v-if="conter.is_like!=1" src="@/campuscircle/static/ico_like.png"
								mode=""></image>
							<view class="m-l-8">{{conter.likes_num}}</view>
						</view>
						<view class="flex-al-c m-l-60" @click="comment()">
							<image class="wh-40" src="@/campuscircle/static/ico_comment.png" mode=""></image>
							<view class="m-l-8">{{conter.comment_num}}</view>
						</view>
					</view>
					<!-- <view class="flex-al-c" @click="coin()">
						<image class="wh-40" src="@/campuscircle/static/ico_coin.png" mode=""></image>
						<view class="m-l-8">投币</view>
					</view> -->
				</view>
			</view>
			<!-- 评论区 -->
			<view class="w100">
				<u-gap height="10" bgColor="#F6F6FA"></u-gap>
			</view>
			<view class="m-t-20 padd-0-32">
				<view class="f-28 color-20 fw-700">全部评论</view>
				<view class="m-t-24">
					<view class="flex padd-b-40" v-for="(item,index) in commentList">
						<u-swipe-action>
							<u-swipe-action-item :options="options1" @click="godel(item.id)">
								<view class="flex">
									<view class="m-r-24">
										<image class="wh-80 bor-r-100" :src="item.member.portrait" mode=""></image>
									</view>
									<view class="" style="width: 582rpx; line-height: 40rpx;">
										<view class="m-t-8">
											<view class="flex-jus-spa flex-al-c">
												<view class="f-28 color-20">{{item.member.user_name}}</view>
												<view class="f-24 color-7A7B84">{{item.create_time}}</view>
											</view>
											<view class="flex m-t-22"
												@click="reply(item.member.id,item.member.user_name)">
												<view class="f-24 color-20" v-if="item.reply != null">回复</view>
												<view class="f-24 color-D93038 m-l-12" v-if="item.reply != null">
													{{item.reply.user_name}}：
												</view>
												<view class="f-24 color-20">
													{{item.content}}
												</view>
											</view>
										</view>
									</view>
								</view>
							</u-swipe-action-item>
						</u-swipe-action>
					</view>
				</view>
			</view>
		</view>
		<!-- 评论按钮 -->
		<view class="send_box">
			<view class="flex-al-c">
				<view class="m-r-20" style="width: 548rpx;">
					<u-search :placeholder="placeholders" v-model="keyword" :showAction="false" height="36"></u-search>
				</view>
				<view class="send_btn" @click="send()">发送</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				attention_type: false, //关注状态
				list: [{
						img: '/static/favicon.png'
					},
					{
						img: '/static/favicon.png'
					},
					{
						img: '/static/favicon.png'
					},
					{
						img: '/static/favicon.png'
					},
					{
						img: '/static/favicon.png'
					}
				],
				liketype: false, //点赞状态
				keyword: '',
				post_id: '', //帖子id
				conter: {},
				commentList: [],
				placeholders: '我也来说两句~',
				aaaa: '#',
				reply_id: '',
				options1: [
					{
						text: '删除',
						style: {
							backgroundColor: '#EC434B'
						}
					}
				],
				conterImg: [],
			}
		},
		onLoad(id) {
			this.post_id = id.id
			console.log(id.id);
			this.PostcirclepostsInfo()
			this.GetcircleCommentList()
		},
		methods: {
			// 收藏
			collect(id) {
				this.GetcircleCollect(id)
				console.log('点击了收藏',id);
			},
			// 朋友圈关注
			attention_user(id) {
				this.GetcircleFollow(id)
				this.attention_type = !this.attention_type
				console.log('点击了关注');
			},
			previewImage(index) {
        console.log('图片地址', index, this.conterImg);
				//uniapp预览轮播图
				uni.previewImage({
					current: index, //预览图片的下标
					urls: this.conterImg //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
				})
			},
			// 朋友圈转发
			transmit(id) {
				uni.navigateTo({
					url: '/campuscircle/index/transmit/transmit?id=' + id
				})
				console.log('点击了转发');
			},
			// 朋友圈喜欢
			like() {
				// this.liketype = !this.liketype
				this.GetcirclepostsLike()
				console.log('点击了喜欢', this.liketype);
			},
			// 朋友圈评论
			comment() {
				console.log('点击了评论');
        this.$u.toast("功能开发中")
			},
			// 朋友圈投币
			coin() {
				console.log('点击了投币');
        this.$u.toast("功能开发中")
			},
			send() {
				this.GetcircleSaveComment()
				this.keyword = ''
				this.placeholders = '我也来说两句~'
				console.log('点击发送');
			},
			// 回复
			reply(id, user_name) {
				this.placeholders = this.aaaa + user_name
				this.reply_id = id
				console.log(this.reply_id, '评论id是多少撒啊啊');
			},

			godel(id) {
				this.GetcircleDeleteComment(id)
				console.log('删除', id);
			},

			// 帖子详情接口
			async PostcirclepostsInfo() {
				var that = this
				const result = await that.$api.circlepostsInfo({
					post_id: this.post_id
				})
				uni.hideLoading()
				if (result.status == 200) {
					this.conter = result.data		
					this.conterImg=result.data.pics?.split(',')
					console.log(result.data.pics,"====");
				}
			},
			// 点赞,取消点赞接口
			async GetcirclepostsLike() {
				var that = this
				const result = await that.$api.circlepostsLike({
					post_id: this.conter.id
				})
				if (result.status == 200) {
					this.PostcirclepostsInfo()
				}
			},
			// 评论帖子接口
			async GetcircleSaveComment() {
				var that = this
				const result = await that.$api.circleSaveComment({
					post_id: this.post_id,
					content: this.keyword,
					reply_id: this.reply_id
				})
				if (result.status == 200) {
					this.GetcircleCommentList()
				}
			},
			// 评论列表接口
			async GetcircleCommentList() {
				var that = this
				const result = await that.$api.circleCommentList({
					post_id: this.post_id,
					content: this.keyword
				})
				if (result.status == 200) {
					this.commentList = result.data.data
					console.log(this.commentList, '哈哈哈哈哈哈');
				}

			},
			// 删除帖子评论接口
			async GetcircleDeleteComment(id) {
				console.log(id, '123id123123');
				var that = this
				const result = await that.$api.circleDeleteComment({
					comment_id: id
				})
				if (result.status == 200) {
					this.GetcircleCommentList()
					this.$u.toast("删除成功")
				}
			},
			// 收藏接口
			async GetcircleCollect(id) {
				var that = this
				const result = await that.$api.circleCollect({
					post_id: id
				})
				if (result.status == 200) {
					if(this.conter.is_collect == 1) {
						this.$u.toast("取消收藏")
					}else if (this.conter.is_collect != 1) {
						this.$u.toast("收藏成功")
					}
					this.PostcirclepostsInfo()
				}
			},
			// 关注接口
			async GetcircleFollow(id) {
				var that = this
				const result = await that.$api.circleFollow({
					follow_id: id
				})
				if (result.status == 200) {
					if(this.conter.is_follow == 1) {
						this.$u.toast("取消关注")
					}else if (this.conter.is_follow != 1) {
						this.$u.toast("关注成功")
					}
					this.PostcirclepostsInfo()
				}
			},
		}
	}
</script>

<style>
	page {
		background-color: #fff !important;
	}

	.attention_user_box {
		width: 96rpx;
		height: 48rpx;
		border-radius: 24rpx;
		border: 1rpx solid #D5D5D5;
		text-align: center;
		line-height: 48rpx;
		color: #202020;
		font-size: 24rpx;
	}
	.attention_user_boxs {
		width: 96rpx;
		height: 48rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 28rpx;
		color: #fff;
		text-align: center;
		line-height: 48rpx;
		font-size: 24rpx;
	}

	.send_box {
		box-sizing: border-box;
		padding: 20rpx 24rpx;
		background-color: #fff;
		box-shadow: 0px -6px 20px 0px rgba(0, 0, 0, 0.03);
		position: fixed;
		bottom: 0;
		z-index: 999;
	}

	.send_btn {
		width: 134rpx;
		height: 72rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 40rpx;
		text-align: center;
		line-height: 72rpx;
		color: #fff;
		font-size: 28rpx;
	}
</style>
