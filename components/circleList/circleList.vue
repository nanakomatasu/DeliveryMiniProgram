<template>
	<view>
		<view class="circle_box" v-for="(item,index) in postList" :key="index">
			<view class="flex-jus-spa flex-al-c">
				<view class="flex">
					<view class="">
						<image class="wh-64" :src="item.member.portrait" mode=""></image>
					</view>
					<view class="m-l-22">
						<view class="f-28 color-18 fw-700">{{item.member.user_name}}</view>
						<view class="f-24 color-7A7B84 m-t-16">
							<text>{{item.create_time.substring(0,16)}}</text>
							<text class="m-l-20">来自{{item.school.school_name}}</text>
						</view>
					</view>
				</view>
				<view class="attention_user_box" @tap.stop="attention(item)">
					<text v-if="item.is_follow == 1">已关注</text>
					<text v-if="item.is_follow != 1">关注</text>
				</view>
			</view>
			<view class="f-28 color-18 m-t-16">
				{{item.content}}
			</view>
			<view class="scroll_img_box">
				<u-scroll-list :indicator="indicator">
					<view class="flex">
						<view style="margin-right: 20rpx;" v-for="(items, indexs) in item.pics" :key="indexs">
							<image class="wh-204 bor-r-10" :src="items"></image>
						</view>
					</view>
				</u-scroll-list>
			<!-- 	<view class="scroll_tips_box flex-c-c flex-column ">
					共
					<br>
					7
					<br>
					张
				</view> -->
			</view>
			<view class="color-7A7B84 f-24 flex flex-jus-spa">
				<view class="flex">
					<view class="flex-al-c" @tap.stop="transmit(item)">
						<image class="wh-40" src="@/campuscircle/static/ico_transmit.png" mode=""></image>
						<view class="m-l-8">{{item.forward_num}}</view>
					</view>
					<!-- @click="like(item.id,item.is_like)" -->
					<view class="flex-al-c m-l-60"  @tap.stop="like(item)">
						<image class="wh-40" v-if="item.is_like == 1" src="@/campuscircle/static/ico_likes.png" mode=""></image>
						<image class="wh-40" v-if="item.is_like != 1" src="@/campuscircle/static/ico_like.png" mode=""></image>
						<view class="m-l-8">{{item.likes_num}}</view>
					</view>
					<view class="flex-al-c m-l-60" @click="comment()">
						<image class="wh-40" src="@/campuscircle/static/ico_comment.png" mode=""></image>
						<view class="m-l-8">{{item.comment_num}}</view>
					</view>
				</view>
				<!-- <view class="flex-al-c" @click="coin()">
					<image class="wh-40" src="@/campuscircle/static/ico_coin.png" mode=""></image>
					<view class="m-l-8">投币</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"circleList",
		props: {
			postList: {
				type: String,
			},
			// postList: [type: String,],

		},
		data() {
			return {
				// postList: [], //朋友圈列表
				indicator: false,
			};
		},
		methods: {
			// 朋友圈关注
			attention(item) {
				this.$emit("attentionBtn", item)
				console.log('点击了关注',this.$emit("attentionBtn", item));
				this.GetcircleFollow(item)
			},
			
			//喜欢
			like(item) {
				this.$emit("likes", item)
				console.log('点击了喜欢',this.$emit("like", item));
			},
			
				
			// 朋友圈转发
			transmit(item) {
				this.$emit("transmitBtn", item)
				console.log('点击了转发',item.id,this.$emit("transmitBtn", item));
				uni.navigateTo({
					url: '/campuscircle/index/transmit/transmit?id=' + item.id
				})
			},
			
			// // 朋友圈喜欢
			// like(id,is_like) {
			// 	this.GetcirclepostsLike(id,is_like)
			// },
			
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
			
			// 帖子列表
			async circlepostsList() {
				var that = this
				const result = await that.$api.circlepostsList({
					school_id:uni.getStorageSync('school').id,
					keyword: this.keyword
				})
			
				if (result.status == 200) {
					this.postList = result.data.data
					this.postList.forEach((item,index)=>{
						if(item.pics){
							this.postList[index].pics=item.pics.split(',')
						}
					})
				}
			},
			
			// 关注接口
			async GetcircleFollow(item) {
				var that = this
				const result = await that.$api.circleFollow({
					follow_id: item.member.id
				})
				if (result.status == 200) {
					if(item.is_follow == 1) {
						this.$u.toast("取消成功")
					}else if (item.is_follow != 1) {
						this.$u.toast("关注成功")
					}
					this.circlepostsList()
				}
			},

			
			
		}
		
	}
</script>

<style>
	.circle_box {
		box-sizing: border-box;
		padding: 32rpx 24rpx 28rpx 24rpx;
		background-color: #ffffff;
		border-radius: 16rpx;
		margin-top: 20rpx;
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
	.scroll_img_box {
		position: relative;
		margin-top: 28rpx;
	}
	
	.scroll_tips_box {
		position: absolute;
		top: 0;
		right: 0;
		width: 60rpx;
		height: 204rpx;
		background-color: #ffffff;
		color: #202020;
		font-size: 28rpx;
		text-align: center;
		opacity: 0.9;
	}
</style>