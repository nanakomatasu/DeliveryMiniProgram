<template>
	<view>
		<view class="menu flex">
			<view class="m-r-30 f-30" v-for="(item,index) in list" :key="index" @tap="spot(item.name,index)">
				{{item.name}}
				<view class="flex-center" v-if="types==index">
					<view class="bar"></view>
				</view>
			</view>
		</view>
		
		
		<view class="contentx" style="padding-top:90rpx;" >
			<view class="contentr m-t-20" v-for="(item,index) in shopList" :key="index">
				<view class="flex-centerd">
					<view>
						<image class="imgx" :src="item.post.member.portrait" mode=""></image>
					</view>
					<view class="m-l-20">
						<view>{{item.post.member.user_name}}</view>
						<view>1分钟前 {{item.post.school.school_name}}</view>
					</view>
				</view>

				<view class="m-t-25" @tap.stop="details(item.post.id)">
					{{item.post.content}}
				</view>

				<view class="flex-wr m-t-15" @tap.stop="details(item.post.id)">
					<view class="flex-space m-l-15 " v-for="(items,indexs) in item.post.pics" :key="indexs">
						<view class="">
							<image class="imgs" :src="items" mode=""></image>
						</view>
					</view>
				</view>

				<view class="flex-about flex-centerd m-t-20">
					<view class="flex-space">
						<view class="flex-centerd">
							<image class="ico" src="../../static/ico_transmit.png" mode=""></image>
							<view class="">{{item.post.forward_num}}</view>
						</view>
						<view class="flex-centerd" style="margin-left:60rpx;" v-if="types==0" @tap="GetcirclepostsLike(item.post_id,index)">
							<image class="ico" src="@/campuscircle/static/ico_likes.png" mode=""></image>
							<view class="">{{item.post.likes_num}}</view>
						</view>
						<view class="flex-centerd" style="margin-left:60rpx;" @tap.stop="details(item.post.id)">
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
		
		<null-data v-if="shopList.length==0"></null-data>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: "赞"
				}, {
					name: "收藏"
				}, ],
				types: 0,
				page: 1,
				status: "loadmore",
				shopList: [],
			}
		},
		
		onShow() {
			this.getMerchantLists()
		},

		onReachBottom() {
			this.getMerchantLists(true)
		},

		methods: {
      coin() {
				console.log('点击了投币');
        this.$u.toast("功能开发中")
			},
			spot(name, index) {
				this.types = index
				this.getMerchantLists()
			},
			
			// 点赞,取消点赞接口
			async GetcirclepostsLike(id,index) {
				var that = this
				const result = await that.$api.circlepostsLike({
					post_id: id
				})
				console.log(id,'123id奥奥奥');
				if(result.status == 200) {
					this.shopList.splice(index, 1);
				}
			},

			async getMerchantLists(isPage) {
				let that = this
				// uni.showLoading({
				// 	title: "正在加载中"
				// })
				if (isPage) {
					this.page = this.page + 1
					that.status = "loading"
				} else {
					this.page = 1
					this.shopList = []
					this.status = 'loadmore'
				}
				var shopList = this.shopList;
				var url = this.types == 0 ? 'circlelikeList' : 'circlecollectList'
				const {
					data,
					status
				} = await that.$api[url]({
					limit: 10,
					page: this.page,
				})
				uni.hideLoading()
				if (status == 200) {
					
					shopList = shopList.concat(data.data)
					that.shopList = shopList
					
					this.shopList.forEach((item,index)=>{
						if(item.post.pics){
							this.shopList[index].post.pics=item.post.pics.split(',')
						}
					})
					console.log(that.shopList,"-=-=-");
					
					if (data.data.length == 0) {
						that.status = 'nomore'
					}
				}
			},
			
			details(id){
				uni.navigateTo({
					url: '/campuscircle/index/postDetails/postDetails?id='+id
				});
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
		z-index: 9999;
	}

	.bar {
		width: 20rpx;
		height: 6rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 3rpx;
	}

	.contentx {
		padding: 32rpx 25rpx 28rpx 25rpx;

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
</style>
