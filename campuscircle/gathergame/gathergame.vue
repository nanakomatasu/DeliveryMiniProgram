<template>
	<view>
		<view class="search">
			<view class="flex-about flex-centerd">
				<view class="flex-centerd">
					已攒<view class="c-D9">{{people}}</view>人
				</view>
				<view class="rake">
					<u--input shape="circle" v-model="keyword" placeholder="请输入关键词" prefixIcon="search"
						prefixIconStyle="font-size: 22px;color: #909399" @change="change"></u--input>
				</view>
			</view>
			<view></view>
		</view>

		<view class="p-l-25 p-r-25" style="padding-top:170rpx;">
			<!-- <view class="">
				<u-swiper height="100" :list="list1"></u-swiper>
			</view> -->
			<view class="flex-about m-t-25">
				<view class="mygame flex-center flex-centerd" @tap.stop="enrol">
					<view class="">
						<image class="imgx flex-centerd" src="../static/mygame.png" mode=""></image>
					</view>
					<view class="m-l-10 f-32 c-FD">
						我加入的局
					</view>
				</view>
				<view class="launch flex-center flex-centerd" @tap.stop="launch">
					<view class="">
						<image class="imgx flex-centerd" src="../static/launch.png" mode=""></image>
					</view>
					<view class="m-l-10 f-32 c-FD">
						发起攒局
					</view>
				</view>
			</view>
			<view class="m-t-40 flex-wr">
				<!-- <view class="empty flex-center">
					<image class="crochet" src="../static/crochet.png" mode=""></image>
					<view class="c-99 f-28">
						有空位
					</view>
				</view> -->

				<view class="spread flex m-l-10 m-b-10" :class="indes==index?'scer':'' " v-for="(item,index) in list"
					:key="index" @tap.stop="choice(item,index)">
					<view class="kuai" :class="indes==index?'scerx':'' "
						:style="{background: item.color, opacity: 0.7}"></view>
					<view class="flex-center m-l-15 f-28">
						{{item.name}}
						<view class="f-20">({{item.game_num}})</view>
					</view>
				</view>
			</view>
		</view>

		<view class="p-b-40">
			<view class="p-l-25 p-r-25 m-t-25 ">
				<view class="parade flex m-b-15" v-for="(item,index) in shopList" :key="index" @tap="details(item.id)">
					<view class="before f-46 flex-center c-FD" :style="{background: item.color, opacity: 0.7}">
						{{item.type.name}}
					</view>
					<view class="flex-juse" style="padding: 25rpx; width: 80%;">
						<view class="" style="width: 100%;">{{item.content}}</view>
						<view class="flex-about c-99">
							<view>局长：{{item.member.user_name}}</view>
							<view>{{formatMsgTime(new Date(item.create_time))}}</view>
						</view>
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
				user_info:{},
				people:"",
				type: "",
				indes: -1,
				keyword: "",
				page: 1,
				status: "loadmore",
				shopList: [],
				list: [],
				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				]
			}
		},

		onShow() {
			this.Postcircleuserinfo()
			this.getMerchantLists()
			this.getMyWalletx()
			this.circlejoinNumx()
			this.page=1
		},

		onReachBottom() {
			this.getMerchantLists(true)
		},
		methods: {
			change() {
				this.getMerchantLists()
			},

			choice(item, index) {
				this.indes = index
				this.type = item.id
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
				} = await that.$api.circlelist({
					keyword: this.keyword,
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


			async getMyWalletx() {
				let that = this
				const {
					data,
					status
				} = await that.$api.circlegameTypeList({})
				if (status == 200) {
					this.list = data
					this.list.forEach((item) => {
						item.color = this.makeColor();
					})
				}
			},

			//赞局人数1
			async circlejoinNumx() {
				let that = this
				const {
					data,
					status
				} = await that.$api.circlejoinNum({})
				if (status == 200) {
					this.people = data
					
				}
			},
			
			// 获取用户信息接口
			async Postcircleuserinfo() {
				var that = this
				const result = await that.$api.circleuserinfo()
				uni.hideLoading()
				if (result.status == 200) {
					this.user_info=result.data.circle_info
					// if (result.data.circle_info != '') {
					// 	this.isGroup = 1
					// }
				}
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

			details(id) {
				uni.navigateTo({
					url: '/campuscircle/gathergame/situation/situation?id=' + id
				});
			},

			enrol() {
				uni.navigateTo({
					url: '/campuscircle/gathergame/bureaujoined/bureaujoined'
				});
			},

			launch() {
				
				if (JSON.stringify(this.user_info)==="{}") {
					this.$u.toast("请先加入圈子")
				}else{
					uni.navigateTo({
						url: '/campuscircle/gathergame/launchaveju/launchaveju'
					});
				}
			},
		}
	}
</script>

<style>
	.search {
		width: 94%;
		padding: 28rpx 25rpx 28rpx 25rpx;
		position: fixed;
		/* top: 88rpx; */
		background: #FFFFFF;
		z-index: 999;
	}

	.rake {
		width: 540rpx;
		height: 74rpx;
		background: #F7F7F7;
		border-radius: 34rpx;
	}

	.mygame {
		width: 342rpx;
		height: 88rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 55px;
	}

	.launch {
		width: 342rpx;
		height: 88rpx;
		background: linear-gradient(140deg, #FFC933 0%, #FF9308 100%);
		border-radius: 55px;
	}

	.imgx {
		width: 32rpx;
		height: 32rpx;
	}

	.spread {
		width: 128rpx;
		height: 68rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
	}

	.kuai {
		width: 12rpx;
		height: 68rpx;
		background: #3E92FB;
		border-radius: 8rpx 0rpx 0rpx 8rpx;
	}

	.empty {
		width: 128rpx;
		height: 68rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
	}

	.crochet {
		width: 28rpx;
		height: 28rpx;
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
		border-radius: 16rpx 0rpx 0rpx 16rpx;
	}

	.scer {
		width: 128rpx;
		height: 68rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #FFFFFF;
	}

	.scerx {
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
	}
</style>
