<template>
	<view>

		<view class="head">
			<u-tabs :list="list" @click="click" keyName="name"></u-tabs>
		</view>


		<view class="p-l-25 p-r-25 p-t-128">

			<view class="parade flex m-b-15" v-for="(item,index) in shopList" :key="index" @tap="details(item.id)">
				<view class="before f-46 flex-center p-l-20 c-FD" :style="{background: item.color, opacity: 0.7}">
					{{item.type.name}}
				</view>

				<view class="flex-juse" style="padding: 25rpx;">
					<view>{{item.content}}</view>
					<view class="flex-about c-99">
						<view>局长：{{item.member.user_name}}</view>
						
						<image class="ico" src="../../static/ico-shanchu.png" mode="" @tap.stop="excise(item.id,index)"></image>
						<!-- <view>{{formatMsgTime(new Date(item.create_time))}}</view> -->
					</view>
				</view>

			</view>

		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:-1,
				list:[],
				page: 1,
				status: "loadmore",
				shopList: [],
			}
		},
		
		onShow(){
			this.getMyWalletx()
			this.getMerchantLists()
		},
		
		onReachBottom() {
			this.getMerchantLists(true)
		},
		methods: {
			click(item) {
				console.log('item', item);
			this.type=	item.id
				this.getMerchantLists()
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
			
				const {
					data,
					status
				} = await that.$api.circlegameList({
					type: this.type,
					limit: 10,
					page: this.page,
				})
				uni.hideLoading()
				if (status == 200) {
					shopList = shopList.concat(data.data)
					that.shopList = shopList
					this.shopList.forEach((item) => {
						item.color = this.makeColor();
					})
					if (data.data.length == 0) {
						that.status = 'nomore'
					}
				}
			},
			
			makeColor() {
				let arr = [6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
				let color = "#";
				for (let i = 0; i < 3; i++) {
					color += arr[Math.floor(Math.random() * 10)];
				}
				return color;
			},
			
			formatMsgTime(timespan) {
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
				} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 *
					15) { // 大于一天小于十五天展示位天
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
				} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
					timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute
				} else {
					timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
				}
				return timeSpanStr
			},
			
			async getMyWalletx() {
				let that = this
				const {
					data,
					status
				} = await that.$api.circlegameTypeList({})
				if (status == 200) {
					this.list = data
					this.list.unshift({name:'全部'})
				}
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
			
			// 删除赞局
			async circledeletePost(id,index) {
				var that = this
				const result = await that.$api.circledeleteGame({
					game_id: id
				})
				if(result.status == 200) {
					this.shopList.splice(index, 1);
				}
			},
	
			details(id) {
				uni.navigateTo({
					url: '/campuscircle/gathergame/situation/situation?id=' + id
				});
			},
	
	
		}
	}
</script>

<style>
	.head {
		position: fixed;
		/* top: 88rpx; */
		width: 100%;
		background: #FFFFFF;
		padding-bottom: 10rpx;
	}

	.parade {
		width: 702rpx;
		height: 200rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}

	.before {
		writing-mode: tb;
		width: 120rpx;
		height: 200rpx;
		background: #FF645A;
		border-radius: 16rpx 0rpx 0rpx 16rpx;
	}
	.ico{
		width: 40rpx;
		height: 40rpx;
	}
</style>
