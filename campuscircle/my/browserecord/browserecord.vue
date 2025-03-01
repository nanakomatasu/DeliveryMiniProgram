<template>
	<view>
		<view class="contentx">
			<view class="contentr m-t-20" v-for="(item,index) in list" :key="index" @click="goDetails(item.post_id)">
				<view class="flex-centerd">
					<view v-if="item.post != null">
						<image class="imgx" :src="item.post.member.portrait" mode=""></image>
					</view>
					<view class="m-l-20">
						<view v-if="item.post == null">已删除</view>
						<view class="" v-if="item.post != null">
							{{item.post.member.user_name}}
						</view>
						<view>{{item.create_time.substring(0,16)}}</view>
					</view>
				</view>

				<view class="m-t-25" v-if="item.post != null">
					{{item.post.content}}
				</view>

				<view class="m-t-15 scroll_img_box" v-if="item.post != null">
					<!-- <view class="flex-space m-l-15 " >
						<view class="" v-for="(items,indexs) in item.pics" :key="indexs">
							<image class="imgs" :src="items" mode=""></image>
						</view>
					</view> -->
					
					<u-scroll-list :indicator="indicator">
						<view class="flex ">
							<view style="margin-right: 20rpx;" v-for="(items, indexs) in item.pics" :key="indexs">
								<image class="wh-204 bor-r-10" :src="items"></image>
							</view>
						</view>
					</u-scroll-list>
					
				</view>
				
				

				<view class="flex-about flex-centerd m-t-20" v-if="item.post != null">
					<view class="flex-space">
						<view class="flex-centerd">
							<image class="ico" src="../../static/ico_transmit.png" mode=""></image>
							<view class="">{{item.post.forward_num}}</view>
						</view>
						<view class="flex-centerd" style="margin-left:60rpx;">
							<image class="ico" src="../../static/ico_like.png" mode=""></image>
							<view class="">{{item.post.likes_num}}</view>
						</view>
						<view class="flex-centerd" style="margin-left:60rpx;">
							<image class="ico" src="../../static/ico_comment.png" mode=""></image>
							<view class="">{{item.post.comment_num}}</view>
						</view>
					</view>
					<view>
						<!-- <view class="flex-centerd" @click="coin()">
							<image class="ico" src="../../static/ico_coin.png" mode=""></image>
							<view class="">投币</view>
						</view> -->
					</view>
				</view>
			</view>
		</view>
		<null-data v-if="list.length==0"></null-data>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				list1: {},
				pics: [],
				indicator: false,
			}
		},
		onLoad() {
			this.PostcircleHistoryList()
		},
		methods: {
			coin() {
				console.log('点击了投币');
        this.$u.toast("功能开发中")
			},

			async PostcircleHistoryList() {
				let that = this
				const result = await that.$api.circleHistoryList({

				})
				if(result.status == 200) {
					this.list = result.data.data

					console.log(this.list1,'result.data.data');
					
					this.list.forEach((item,index)=>{
						if(item.post.pics){
							this.list[index].pics=item.post.pics.split(',')
						}
					})
					
					
					
				}
			},
			
			goDetails(post_id) {
				uni.navigateTo({
					url: '/campuscircle/index/postDetails/postDetails?id=' + post_id
				})
			}
		}
	}
</script>

<style>
	.menu {
		width: 85%;
		padding: 20rpx 56rpx 28rpx 56rpx;
		background-color: #ffffff;
		position: fixed;
		top: 86rpx;
	}

	.bar {
		width: 20rpx;
		height: 6rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 3rpx;
	}

	.contentx {
		padding: 0rpx 25rpx 40rpx 25rpx;

	}

	.contentr {
		padding: 32rpx 25rpx 28rpx 25rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}

	.imgx {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
	}

	.imgs {
		width: 204rpx;
		height: 204rpx;
	}

	.ico {
		width: 40rpx;
		height: 40rpx;
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
