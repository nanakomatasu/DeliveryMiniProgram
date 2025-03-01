<template>
	<view class="p-l-32 p-r-32 p-t-30">
		<view class="flex-about flex-centerd m-b-20" v-for="(item,index) in shopList" :key="index">
			<view class="flex-centerd " v-if="item.follow != null">
				<view>
					<image class="img br-50" src="../../static/touxiang.png" mode="" v-if="!item.follow.portrait">
					</image>
					<image class="img br-50" :src="item.follow.portrait" mode="" v-if="item.follow.portrait"></image>
				</view>
				<view class="m-l-15">
					<view>{{item.follow.user_name}}</view>
					<view>忘不掉的是回忆，继续的是生活</view>
				</view>
			</view>

			<view class="shelve flex-center" v-if="item.follow != null" @tap="GetcircleFollow(item.follow_id,index)">已关注</view>
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
			  // if (milliseconds <= 1000 * 60 * 1) { // 小于一分钟展示为刚刚
			  //   timeSpanStr = '刚刚'
			  // } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) { // 大于一分钟小于一小时展示为分钟
			  //   timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前'
			  // } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) { // 大于一小时小于一天展示为小时
			  //   timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
			  // } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) { // 大于一天小于十五天展示位天
			  //   timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
			  // } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
			  //   timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute
			  // } else {
			  //   timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
			  // }
			  // return timeSpanStr
			  
			  
			},
			
			
			
			
			
			
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
				} = await that.$api.circleMyFollow({
					limit: 10,
					page: this.page,
				})
				// uni.hideLoading()
				if (status == 200) {
					shopList = shopList.concat(data.data)
					that.shopList = shopList
					if (data.data.length == 0) {
						that.status = 'nomore'
					}
				}
			},
		
			// 关注接口
			async GetcircleFollow(id,index) {
				var that = this
				const result = await that.$api.circleFollow({
					follow_id: id
				})
				if (result.status == 200) {
					this.shopList.splice(index, 1);
				}
			},
		
		}
	}
</script>

<style>
	page {
		background: #FFFFFF !important;
	}

	.img {
		width: 80rpx;
		height: 80rpx;
	}

	.shelve {
		width: 128rpx;
		height: 52rpx;
		background: #E4E7ED;
		border-radius: 8rpx;
	}
</style>
