<template>
	<view>
		<view class="p-l-25 p-r-25 p-t-25 p-b-150">
			<view class="member">
				<view class="">
					局内成员
				</view>

				<view class="flex-wr m-t-20 ">
					<view class="flex-center m-b-40"
						style="position: relative; margin-right: 15rpx; margin-left: 15rpx;"
						v-for="(item,index) in info.join" :key="index">
						<image class="img" :src="item.member.portrait" mode="" style="position: relative;"></image>
						<!-- 	<view class="sign flex-center" style="position: absolute;top:72rpx; left: 12rpx;">
							{{item.id}}
						</view> -->
					</view>
				</view>

				<view class="flex-center p-b-15" v-if="info.join.length==0">
					<view class="">
						<view class="">
							<image class="zanwu" :src="`${baseImageUrl}resource/img/null-data.png`"></image>
						</view>
						<view class="c-88 flex-center">
							暂无成员
						</view>
					</view>
				</view>


			</view>

			<view class="contentx m-t-25">
				<view class="f-28 f-600">
					局情
				</view>
				<view class="flex m-t-20">
					<view class="flex-center">
						<image class="tximg" :src="info.member.portrait" mode=""></image>
					</view>
					<view class="m-l-12 flex-juse">
						<view class="f-24 f-600">{{info.member.user_name}}</view>
						<view class="c-88 f-24">2022-12-23 12:00</view>
					</view>
				</view>
				<view class="m-t-25">
					<view class="f-600 f-28" style="text-indent:60rpx;">
						{{info.content}}
					</view>

					<view class="m-t-15">
						<image style="width: 100%;" :src="item" mode="" v-for="(item,index) in info.pics" :key="index">
						</image>
					</view>

					<view class="flex-about m-t-15" v-if="info.is_join!==1">
						<view class="enrich flex-center c-FD" @tap.stop="joinnow(info.id)">立即加入</view>
						<view class="share flex-center c-FD">分享</view>
					</view>
				</view>
			</view>

			<view class="discuss m-t-25">
				<view class="f-600">
					公开讨论
				</view>

				<!-- <view class="flex m-t-15" v-for="(item,index) in list" :key="index">
					<view class="">
						<image class="tximg" :src="item.member.portrait" mode=""></image>
					</view>
					<view class="m-l-12 flex-juse w-100">
						<view class="flex-about flex-centerd ">
							<view class="f-24 f-600">{{item.member.user_name}}</view>
							<view class="f-24 c-88">{{formatMsgTime(new Date(item.create_time))}}</view>
						</view>
						<view class="c-88 f-24 m-t-20">{{item.content}}</view>
					</view>
				</view> -->
				<view class="m-t-15 w100" v-for="(item,index) in list" :key="index">
					<u-swipe-action>
						<u-swipe-action-item :options="options1" @click="godel(item.id)">
							<view class="flex m-t-15">
								<view class="">
									<image class="tximg" :src="item.member.portrait" mode=""></image>
								</view>
								<view class="m-l-12 flex-juse w-100">
									<view class="flex-about flex-centerd ">
										<view class="f-24 f-600">{{item.member.user_name}}</view>
										<view class="f-24 c-88">{{formatMsgTime(new Date(item.create_time))}}</view>
									</view>
									<view class="c-88 f-24 m-t-20">{{item.content}}</view>
								</view>
							</view>
						</u-swipe-action-item>
					</u-swipe-action>
				</view>





				<null-data v-if="list.length==0"></null-data>

			</view>
		</view>

		<view class="publish ">
			<view class="flex-about">
				<view class="flex-vertical p-l-20 sx">
					<u--input placeholder="请输入内容" border="none" v-model="content"></u--input>
				</view>
				<view class="send flex-center" @tap.stop="sendout">发送</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: "",
				info: {},
				id: "",
				list: [],
				options1: [{
					text: '删除',
					style: {
						backgroundColor: '#EC434B'
					}
				}],
        baseImageUrl: this.$url
			}
		},

		onLoad(e) {
			this.id = e.id
			this.getMyWalletx(e.id)
			this.circlecommentListx()
		},

		methods: {

			sendout() {
				this.circlesaveCommentx()

			},

			joinnow(id) {
				let _this = this
				uni.showModal({
					title: '温馨提示',
					content: '是否加入该局',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							_this.circlejoinGamex(id)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			async circlejoinGamex(id) {
				let that = this
				const {
					data,
					status
				} = await that.$api.circlejoinGame({
					game_id: id,
				})
				if (status == 200) {
					this.$u.toast("加入成功")
					this.getMyWalletx(this.id)

				}
			},

			async getMyWalletx(id) {
				let that = this
				const {
					data,
					status
				} = await that.$api.circleinfo({
					game_id: id,
				})
				if (status == 200) {
					this.info = data
					this.info.pics = data.pics.split(',')
				}
			},

			async circlesaveCommentx() {
				let that = this
				const {
					data,
					status
				} = await that.$api.circlesaveComment({
					game_id: this.id,
					content: this.content,
				})
				if (status == 200) {
					this.$u.toast("评论成功")
					this.circlecommentListx()
					this.content = ""
				}
			},

			//评论列表
			async circlecommentListx() {
				let that = this
				const {
					data,
					status
				} = await that.$api.circlecommentList({
					game_id: this.id,
				})
				if (status == 200) {
					this.list = data.data
					console.log(this.list)
				}
			},

			godel(id) {
				this.GetcirclegamedeleteComment(id)
			},
			//删除评论
			async GetcirclegamedeleteComment(id) {
				let that = this
				const {
					data,
					status
				} = await that.$api.circlegamedeleteComment({
					comment_id: id
				})
				if (status == 200) {
					this.circlecommentListx()
					this.$u.toast("删除成功")
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

		}
	}
</script>

<style>
	.member {
		padding: 25rpx 32rpx 0rpx 32rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}

	.sign {
		width: 72rpx;
		height: 32rpx;
		background: #D93038;
		border-radius: 16rpx;
		font-size: 22rpx;
		color: #FFFFFF;
	}

	.img {
		width: 96rpx;
		height: 96rpx;
		border-radius: 50%;
	}

	.contentx {
		padding: 25rpx 32rpx 25rpx 32rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}

	.tximg {
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
	}

	.enrich {
		width: 492rpx;
		height: 72rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 40rpx;
	}

	.share {
		width: 134rpx;
		height: 72rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 40rpx;
	}

	.discuss {
		padding: 32rpx 30rpx 32rpx 30rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}

	.publish {
		width: 94%;
		position: fixed;
		bottom: 0rpx;
		padding: 25rpx;
		background: #FEFFFE;
		z-index: 999;
	}

	.send {
		width: 134rpx;
		height: 72rpx;
		background: linear-gradient(313deg, #D62E36 0%, #EC434B 100%);
		border-radius: 40rpx;
		color: #FFFFFF;
		font-size: 28rpx;
	}

	.sx {
		width: 520rpx;
		height: 72rpx;
		background: #F7F7F7;
		border-radius: 39rpx;
	}

	.zanwu {
		width: 250rpx;
		height: 250rpx;
	}
</style>
