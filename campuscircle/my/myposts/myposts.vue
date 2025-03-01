<template>
	<view>
		<view class="contentx">
			<view class="contentr m-b-20 " v-for="(item,index) in shopList" :key="index">
				<view class="flex-centerd">
					<view>
						<image class="imgx" :src="item.member.portrait" mode=""></image>
					</view>
					<view class="m-l-20">
						<view>{{item.member.user_name}}</view>  
						<view>{{formatMsgTime(new Date(item.create_time))}} {{item.school.school_name}}</view>
					</view>
				</view>
				
				<view class="m-t-25" @tap="details(item.id)">
					{{item.content}}
				</view>
				
				<view class="flex-wr m-t-15" v-if="item.pics" @tap="details(item.id)">
					<view class="flex-space m-l-15 "  v-for="(items,indexs) in item.pics" :key="indexs">
						<view class="">
							<image class="imgs bor-r-16" :src="items" mode="" ></image>
						</view>
					</view>
				</view>
				
				<view class="flex-about flex-centerd m-t-20">
					<view class="flex-space">
						<view class="flex-centerd">
							<image class="ico" src="../../static/ico_transmit.png" mode=""></image>
							<view class="">{{item.forward_num}}</view>
						</view>
						<view class="flex-centerd" style="margin-left:60rpx;">
							<image class="ico" src="../../static/ico_like.png" mode=""></image>
							<view class="">{{item.likes_num}}</view>
						</view>
						<view class="flex-centerd" style="margin-left:60rpx;" @tap.stop="details(item.id)">
							<image class="ico" src="../../static/ico_comment.png" mode=""></image>
							<view class="">{{item.comment_num}}</view>
						</view>
					</view>
					<image class="ico" src="../../static/ico-shanchu.png" mode="" @tap.stop="excise(item.id,index)"></image>
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
			async getMerchantLists(isPage) {
				let that = this
				this.isLoad = true
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
			
				const {
					data,
					status
				} = await that.$api.circleMypostList({
					limit: 10,
					page: this.page,
				})
				uni.hideLoading()
				if (status == 200) {
					shopList = shopList.concat(data.data)
					that.shopList = shopList
					this.shopList.forEach((item,index)=>{
						if(item.pics){
							this.shopList[index].pics=item.pics.split(',')
						}
					})
					if (data.data.length == 0) {
						that.status = 'nomore'
					}
				}
			},
			
			formatMsgTime (timespan) {
			  var dateTime = new Date(timespan) // 将传进来的字符串或者毫秒转为标准时间
			  var year = dateTime.getFullYear()
			  var month = dateTime.getMonth() + 1
			  var day = dateTime.getDate()
			  var hour = dateTime.getHours()
			  var minute = dateTime.getMinutes()
			  // var second = dateTime.getSeconds()
			  var millisecond = dateTime.getTime() // 将当前编辑的时间转换为毫秒
			  var now = new Date() // 获取本机当前的时间
			  var nowNew = now.getTime() // 将本机的时间转换为毫秒
			  var milliseconds = 0
			  var timeSpanStr
			  milliseconds = nowNew - millisecond
			  if (milliseconds <= 1000 * 60 * 1) { // 小于一分钟展示为刚刚
			    timeSpanStr = '刚刚'
			  } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) { // 大于一分钟小于一小时展示为分钟
			    timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前'
			  } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) { // 大于一小时小于一天展示为小时
			    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
			  } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) { // 大于一天小于十五天展示位天
			    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
			  } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
			    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute
			  } else {
			    timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
			  }
			  return timeSpanStr
			},
			
			excise(id,index){
				let _this=this
				uni.showModal({
					title: '温馨提示',
					content: '是否删除帖子',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							_this.circledeletePost(id,index)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			
			// 删除帖子
			async circledeletePost(id,index) {
				var that = this
				const result = await that.$api.circledeletePost({
					post_id: id
				})
				if(result.status == 200) {
					this.shopList.splice(index, 1);
				}
			},
		
			details(id){
				uni.navigateTo({
					url: '/campuscircle/index/postDetails/postDetails?id='+id
				});
			},
			
		
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
	.bar{
			width: 20rpx;
			height: 6rpx;
			background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
			border-radius: 3rpx;
	}
	
	.contentx{
		padding: 32rpx 25rpx 28rpx 25rpx;
		
	}
	
	.contentr{
		padding: 32rpx 25rpx 28rpx 25rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}
	.imgx{
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
	}
	.imgs{
		width: 204rpx;
		height: 204rpx;
	}
	.ico{
		width: 40rpx;
		height: 40rpx;
	}
</style>
